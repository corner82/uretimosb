<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        /*$translator = $e->getApplication()->getServiceManager()->get('translator');
        $translator->setLocale('ru_RU');*/
        
        /**
         * that code block is an example of advanced usage of dispath error event
         * types, do not erase code block!!!!!!
         * @author Mustafa Zeynel Dağlı
         * @since 25/12/2015
         *
         */
        /*$eventManager->attach(MvcEvent::EVENT_DISPATCH_ERROR, function($e) {
        $error = $e->getError();
        switch ($error) {
            case \Zend\Mvc\Application::ERROR_CONTROLLER_NOT_FOUND:
            case \Zend\Mvc\Application::ERROR_CONTROLLER_INVALID:
            case \Zend\Mvc\Application::ERROR_ROUTER_NO_MATCH:
                print_r('ERROR_ROUTER_NO_MATCH');
                $response = $e->getResponse();
               /* $lang = $e->getRouter()
                          //->getParam('lang');
                        //->getParams();*/
                //$e->getRouter()->getRoute();
                
                /*$request = $e->getRequest();
                $requestMeta = $request->getMetadata();
                $requesturi = $request->getUri();
                print_r($requesturi);
                $response = $e->getResponse();
                $response->getHeaders()->addHeaderLine('Location', '/?lang=12');
                $response->getHeaders()->addHeaderLine('lang', '12');
                //$response->setStatusCode(302);
                print_r($response->getHeaders('Location'));
                return $response;
            break;
        }
    }, 100);*/
        
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }
}
