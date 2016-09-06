<?php

namespace Custom\Services\Database;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceDbAdapterPostgre  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        $dbAdapter = new \Zend\Db\Adapter\Adapter($config['dbAdapterPostgre']);
        return $dbAdapter;
    }

}
