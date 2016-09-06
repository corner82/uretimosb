<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServicePublicKeyReader  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config'); 
        $authManager = $serviceLocator->get('authenticationManagerDefault');
        $authStorage = $authManager->getStorage()->read();
        if(isset($authStorage['pk'])) {
            $publicKey = $authStorage['pk'];
            return $publicKey;
        }
        //throw new \Exception('FactoryServicePublicKeyReader auth storage public key not found!!');
        return false;
    }
        
        
        
  
    }


