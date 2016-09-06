<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/slim_test for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */
namespace SFDM;

 use Zend\ModuleManager\Feature\AutoloaderProviderInterface;
 use Zend\ModuleManager\Feature\ConfigProviderInterface;
 use Zend\Mvc\ModuleRouteListener;
 use Zend\Mvc\MvcEvent;
 use Zend\Session\SessionManager;
 use Zend\Session\Container;

 class Module implements AutoloaderProviderInterface, ConfigProviderInterface
 {
     
     public function init() {

     }
     
     public function onBootstrap(MvcEvent $e)
    {
        $eventManager = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);

        
        // session expire control event
        $eventManager->attach('route', array($this, 'sessionExpireControl'));
        
        // auth control event
        $eventManager->attach('route', array($this, 'authControl'));
        
        // translator service attaching to dispatch 
        $eventManager->attach('dispatch', array($this, 'translaterControl'));
        
        // acl for page restrictiones attaching to dispatch
        $eventManager->attach('dispatch', array($this, 'pageAccessControler'));
        
        // acl privileges dıe to role of authenticated user attaching to dispatch
        $eventManager->attach('dispatch', array($this, 'privilegeCreater'));
        
        /**
         * page entry log 
         * @author Mustafa Zeynel Dağlı
         * @since 17/03/2016  
         */
        $eventManager->attach('dispatch', array($this, 'pageLogControl'));
        
        // translator service attaching to dispatch error event
        $eventManager->attach('dispatch.error', array($this, 'Error404PageTranslatorControl')); 

        $eventManager->getSharedManager()->attach('Zend\Mvc\Controller\AbstractActionController', 
                                                    'dispatch', 
                                                    function($e) {
            /**
             * added for layout control due to module action
             * @author Mustafa Zeynel Dağlı
             * @since 16/12/2015
             */
            $controlerName = $e->getRouteMatch()->getParam('action');
            //print_r($controlerName);
            $controller = $e->getTarget();
            $controllerClass = get_class($controller);
            $moduleNamespace = substr($controllerClass, 0, strpos($controllerClass, '\\'));
            //print_r(strtolower(trim($moduleNamespace)));
            
            $viewModel = $e->getApplication()->getMvcEvent()->getViewModel();
            $viewModel->module = $moduleNamespace;
            $viewModel->controller = $controlerName;
            /*print_r($viewModel->controller);
            print_r($viewModel->module);*/
             
            $config = $e->getApplication()->getServiceManager()->get('config');
            /**
             *  added for layout control due to module action
             *  @author Mustafa Zeynel Dağlı
             *  @since 16/12/2015
             */
            if (isset($config['action_layouts'][$moduleNamespace][$controlerName])) {
                $controller->layout($config['action_layouts'][$moduleNamespace][$controlerName]);
                //print_r($config['action_layouts'][$moduleNamespace][$controlerName]);
            } else  if (isset($config['module_layouts'][$moduleNamespace])) {
                //$error = $e->getError(); 
                //print_r($e->getResponse()->getStatusCode());
                //print_r($e->getRequest()->getHeaders());
                /**
                 * error 404 page layout has been overridden when controller is
                 * wrong written, so this control has been put in place,
                 * if action method not right , do not put layout dynamically
                 * @author Mustafa Zeynel Dağlı
                 * @since 25/12/2015
                 */
                if(method_exists($controllerClass,
                            $controlerName.'Action')) {
                    //print_r('-- method found--');
                    $controller->layout($config['module_layouts'][$moduleNamespace]);
                } else {
                    //print_r('-- method not found--');
                    //throw new \Zend\Mvc\Exception\BadMethodCallException('404 Page not found',404);
                    //throw new \Exception();
                    /**
                     * When controller not found in the request somehow not triggering
                     * 'Dispatch.error' event, son in control structure or action not found ,
                     * 'dispatch.error' event triggrede function is called again,
                     * before this update, when you have requested an  controller which does not exist,
                     * the request header status was set '404', but 'dispatch.error' was not triggering and 
                     * blank page was displyed
                     * @author Mustafa Zeynel Dağlı
                     * @since 19/01/2016
                     */
                    $this->Error404PageTranslatorControl($e);
                }
                
            }
            
        }, 500);
        
        /**
         * written for test purposes
         * @author Mustafa Zeynel Dağlı
         */
        $eventManager->getSharedManager()->attach('Zend\Mvc\Controller\AbstractActionController', 
                                                    'render.error', 
                                                    function($e) {
            print_r('--render error--');

        }, 200);
        
        /**
         * written for test purposes
         * @author Mustafa Zeynel Dağlı
         */
        $eventManager->getSharedManager()->attach('Zend\Mvc\Controller\AbstractActionController', 
                                                    'finish', 
                                                    function($e) {
            print_r('--finish--');
        }, 300);

        $moduleRouteListener->attach($eventManager);  
        
    }
    
    /**
     * page entry log
     * @param MvcEvent $e
     * @author Mustafa Zeynel Dağlı
     * @since 17/03/2016
     */
    public function pageLogControl(MvcEvent $e) {
        $e->getApplication()
            ->getServiceManager()
            ->get('servicePageLogRabbitMQ');
    }

    
    /**
     * ACL privilege creator for specific role
     * @author Mustafa Zeynel Dağlı
     * @since 18/07/2016
     */
    public function privilegeCreater(MvcEvent $e) {
        //print_r('--dispatch event privilege creater--');
        $privilegesResult = $e->getApplication()->getServiceManager()->get('serviceAclPrivilegeCreator');
        
    }
    
    /**
     * 
     * @param MvcEvent $e
     * @author Mustafa Zeynel Dağlı
     * @since 12/08/2016
     * @todo will be implemented for 'dispach' event  for 'aclCreater' function
     */
    public function pageAccessControler(MvcEvent $e) {
        $acl = $e->getApplication()
                 ->getServiceManager()
                 ->get('serviceAclPrivilegeCreator');
        $sessionManager = $e->getApplication()
                            ->getServiceManager()
                            ->get('SessionManagerDefault');
        $sessionData = $sessionManager->getStorage()->getMetadata();
        //if(isset($sessionData['__ZY']['role'])) {
        if(isset($sessionData['__ZY'])) {
            //$role = $sessionData['__ZY']['role'];
            $role = $sessionData['__ZY'];
        
            $controlerName = $e->getRouteMatch()->getParam('action');
            //print_r($controlerName);
            $controller = $e->getTarget();
            $controllerClass = get_class($controller);
            $moduleNamespace = substr($controllerClass, 0, strpos($controllerClass, '\\'));
            $moduleNamespace = strtolower(trim($moduleNamespace));
            //print_r($role);
            //print_r($acl);
            //print_r($acl->isAllowed($role, 'SayfaErişim', $moduleNamespace.'-'.$controlerName));
            if ( !$acl->isAllowed($role, 'SayfaErişim', $moduleNamespace.'-'.$controlerName)){
                //print_r('--acl not allowed--');
                $route = $e ->getRouteMatch()
                                ->getMatchedRouteName();
                if($route !== 'error') {   
                   $router = $e->getRouter();
                    // $url    = $router->assemble(array(), array('name' => 'Login/auth')); // assemble a login route
                   $url    = $router->assemble(array('action' => 'index'), 
                                               array('name' => 'error'));
                   $response = $e->getResponse();
                   $response->setStatusCode(302);
                   // redirect to login page or other page.
                   $response->getHeaders()->addHeaderLine('Location', $url);
                   $e->stopPropagation(); 
                } 
            }
        }
        
        
    }

    /**
     * page access control directly working with global config array
     * @param MvcEvent $e
     * @author Mustafa Zeynel Dağlı
     * @deprecated since 15/08/2016 'pageAccessControler' function used instead
     */
    public function aclCreater(MvcEvent $e) {
        //print_r('--dispatch event acl creater--');
        $roleResult = $e->getApplication()
                        ->getServiceManager()
                        ->get('serviceRoleSessionWriter');
        $acl = $e->getApplication()
                 ->getServiceManager()
                 ->get('serviceAclRolePagesCreator');
        $controlerName = $e->getRouteMatch()->getParam('action');
        //print_r($controlerName);
        $controller = $e->getTarget();
        $controllerClass = get_class($controller);
        $moduleNamespace = substr($controllerClass, 0, strpos($controllerClass, '\\'));
        $moduleNamespace = strtolower(trim($moduleNamespace));
        //print_r($moduleNamespace);

        if ( !$acl->isAllowed(strtolower(trim($roleResult['name'])), $moduleNamespace, $controlerName)){
            print_r('--acl not allowed--');
            $route = $e ->getRouteMatch()
                            ->getMatchedRouteName();
            if($route !== 'error') {   
               $router = $e->getRouter();
                // $url    = $router->assemble(array(), array('name' => 'Login/auth')); // assemble a login route
               $url    = $router->assemble(array('action' => 'index'), 
                                           array('name' => 'error'));
               $response = $e->getResponse();
               $response->setStatusCode(302);
               // redirect to login page or other page.
               $response->getHeaders()->addHeaderLine('Location', $url);
               $e->stopPropagation(); 
            } 
        }
    }


    public function Error404PageTranslatorControl(MvcEvent $e) {
        //print_r('--dispatch error--');
        $e->getApplication()
          ->getServiceManager()
          ->get('serviceTranslator404ResponseRegulator');
        $vm = $e->getViewModel();
        $vm->setTemplate('layout/error');
        /**
         * different approach for same purpose, not moved to be cpnsiered later maybe
         * @author Mustafa Zeynel Dağlı
         * @since 19/01/2016
         * @todo Maybe added to sanalfabrika wiki under bitrix24 application
         */
        /*$noroutefoundstrategy = $sm->get('ViewManager')->getRouteNotFoundStrategy(); 
        $noroutefoundstrategy->setNotFoundTemplate('error/nameoferrorpage');*/ 
    }
    
    /**
     * Translater service has been launched on 'dispatch' event 
     * in this function scope
     * @param MvcEvent $e
     * @author Mustafa Zeynel Dağlı
     * @since 17/12/2015
     */
    public function translaterControl(MvcEvent $e) {
        //print_r('--dispatch event translater control--');
        $e->getApplication()
          ->getServiceManager()
          ->get('serviceTranslator');
    }

    public function sessionExpireControl(MvcEvent $e) { 
        $serviceManager = $e->getApplication()->getServiceManager();
        $sessionManager = $serviceManager ->get('SessionManagerDefault');
        $serviceManager ->get('sessionExpireControler');
    }


    public function authControl(MvcEvent $e) {
        //print_r('--dispatch event authControl--');
        /* 
         * sessionManager servis çağırılıyor
         */ 
        $serviceManager = $e->getApplication()->getServiceManager();
        
        
        // if auth control will be made block
        if($serviceManager->get('authenticationControlerLocator')) {
            // calling auth service and makes auth control inside service
            $serviceManager->get('serviceAuthenticate');
        } 
    }

    public function getServiceConfig()
    {
         
    }
    
     public function getAutoloaderConfig()
     {
         return array(
             'Zend\Loader\ClassMapAutoloader' => array(
                 __DIR__ . '/autoload_classmap.php',
             ),
             'Zend\Loader\StandardAutoloader' => array(
                 'namespaces' => array(
                     __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                 ),
             ),
         );
     }

     public function getConfig()
     {
         return include __DIR__ . '/config/module.config.php';
     }
 }

