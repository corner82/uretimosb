<?php

 namespace Signup\Controller;

 use Zend\Mvc\Controller\AbstractActionController;
 use Zend\View\Model\ViewModel;
 use Zend\Session\Container;

 class SignupController extends AbstractActionController
 {
     public function indexAction()
     { 
         $viewModel = new \Zend\View\Model\ViewModel();
//         $this->authenticate(null, $viewModel);
         return $viewModel;
         
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

