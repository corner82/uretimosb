<?php

 namespace Cluster\Controller;

 use Zend\Mvc\Controller\AbstractActionController;
 use Zend\View\Model\ViewModel;
 use Zend\Session\Container;

 class ClusterController extends AbstractActionController
 {
     /**
      * Cluster employee dashboard
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 31/08/2016
      */
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
      * company insert page for cluster employees
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 06/09/2016
      */
     public function cmpinsAction()
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
      * Company machine insert page for cluster employees
      * @return ViewModel
      * @author Mustafa Zeynel Dağlı
      * @since 06/09/2016
      */
     public function machinsAction()
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
 }

