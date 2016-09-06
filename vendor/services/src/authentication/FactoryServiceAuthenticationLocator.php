<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceAuthenticationLocator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        $dbTableAuthAdapter = $serviceLocator->get('authenticationDbAdapterPostgre');
        $authService = new \Zend\Authentication\AuthenticationService(new \Zend\Authentication\Storage\Session(),
                                                                $dbTableAuthAdapter);

        return $authService;
    }

}
