<?php

namespace Custom\Services\Session;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceSessionDbSaveLocator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        /*
         * getting db adapter from service manager and returns session save handler
         * for database
         */
        $adapter = $serviceLocator->get('dbAdapterPostgre');
        $tableGateway = new \Zend\Db\TableGateway\TableGateway($config ['session']['savehandler']['database']['table'],
                                                                    $adapter);
        $saveHandler  = new \Zend\Session\SaveHandler\DbTableGateway($tableGateway, 
                                                                    new \Zend\Session\SaveHandler\DbTableGatewayOptions());
        return $saveHandler;
    }

}