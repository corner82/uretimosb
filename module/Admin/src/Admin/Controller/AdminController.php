<?php

 namespace Admin\Controller;

 use Zend\Mvc\Controller\AbstractActionController;
 use Zend\View\Model\ViewModel;
 use Zend\Session\Container;

 class AdminController extends AbstractActionController
 {
     public function indexAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
     }
     
     
     /**
      * admin menu operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 29/03/2016
      */
     public function menuAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
     }
     
     /**
      * machine categories admin operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 30/03/2016
      */
     public function machctgAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
     }
     
     
     /**
      * machine properties admin operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 31/03/2016
      */
     public function machpropAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
     }
     
     /**
      * machine property  admin crud operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 23/06/2016
      */
     public function machpropdefAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * machine  admin operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 31/03/2016
      */
     public function machAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
     }
     
     /**
      * system units definitions admin panel
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 04/05/2016
      */
     public function untAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
     }
     
     /**
      * system units definitions admin panel
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 04/05/2016
      */
     public function prodtypesAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
     }
     
     /**
      * system machine attributes definitions admin panel
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 21/04/2016
      */
     public function machattrAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
     }
     
     /**
      * unique machine property admin operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 03/06/2016
      */
     public function uniquemachpropAction()
     {
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        return $view;
     }
     
     /**
      * resources action page for ACL operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 13/07/2016
      */
     public function aclresourcesAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * roles action page for ACL operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 13/07/2016
      */
     public function aclrolesAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * privileges action page for ACL operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 13/07/2016
      */
     public function aclprivilegesAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * assign role and privileges due to ACL resources action page for ACL operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 15/07/2016
      */
     public function aclroleprivilegeAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * action attach rest service api and privileges
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 19/07/2016
      */
     public function aclprivilegeservicesAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * action for menu types CRUD operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 21/07/2016
      */
     public function menutypesAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * action for zend modules operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 26/07/2016
      */
     public function modulesAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * action for zend module actions operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 26/07/2016
      */
     public function actionsAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * action that attaches menu types and module actions
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 26/07/2016
      */
     public function actionmenusAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * Rest services are introduced to system 
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 27/07/2016
      */
     public function servicesAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * Rest service groups operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 27/07/2016
      */
     public function servicegroupsAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * admin action for assignment types definitios 
      * for consultant assignment operations
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 01/08/2016
      */
     public function assigndefAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * action to attach role and assignments on interface
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 01/08/2016
      */
     public function assignroleAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * action for operation types definitions
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 01/08/2016
      */
     public function operationdefAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * Consultants define, active, passive and delete operations page
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 09/08/2016
      */
     public function consultantsAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view; 
     }
     
     /**
      * admin page to assign or non-assign 
      * consultants to companies
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 10/08/2016
      */
     public function assignconsAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * admin page to create connection with action resource, privilege
      * and rest services
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 11/08/2016
      */
     public function actionprivilegeserviceAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * admin page to create connection with action resource and privilege
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 11/08/2016
      */
     public function actionprivilegeAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * machine producers CRUD admin page
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 15/08/2016
      */
     public function macproducersAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * admin page for Organized Industri zones definitions
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 23/08/2016
      */
     public function osbAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * Admin clusters operations action
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 25/08/2016
      */
     public function clustersAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }
     
     /**
      * admin page for cluster employees
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 31/08/2016
      */
     public function clusterempAction()
     {
        $langCode = $this->getServiceLocator()
                         ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                                    ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                          ->get('servicePublicKeyReader'); 
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode'            => $langCode,
            'publicKey'           => $publicKey,
        ));
        return $view;
     }

 }

