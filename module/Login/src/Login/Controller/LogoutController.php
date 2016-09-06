<?php

 namespace Login\Controller;

 use Zend\Mvc\Controller\AbstractActionController;
 use Zend\View\Model\ViewModel;
 use Zend\Session\Container;

 class LogoutController extends AbstractActionController
 {
     public function indexAction()
     { 
        $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
        $authManager->getStorage()->clear();
        return $this->redirect()->toRoute('login');   
         
     }  

     public function addAction()
     {
     }

     public function editAction()
     {
     }

     public function deleteAction()
     {
     }
 }

