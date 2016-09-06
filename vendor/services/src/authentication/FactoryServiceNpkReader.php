<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceNpkReader implements FactoryInterface {

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        $authManager = $serviceLocator->get('authenticationManagerDefault');
        $authStorage = $authManager->getStorage()->read();
        if (isset($authStorage['npk'])) {
            $npk = $authStorage['npk'];
            return $npk;
        }
        //throw new \Exception('FactoryServicePublicKeyReader auth storage public key not found!!');
        return false;
    }

}
