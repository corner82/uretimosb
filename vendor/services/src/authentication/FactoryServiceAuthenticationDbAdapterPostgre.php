<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceAuthenticationDbAdapterPostgre  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        
        // postgre db adapter service manager üzerinden çağırılıyor
        $dbAdapter = $serviceLocator->get('dbAdapterPostgre');
        
        /*
         *  Authentication db adapter constructed
         *  necessary variables are being get from global config file
         */
        $authDbAdapter = new \Zend\Authentication\Adapter\DbTable\CredentialTreatmentAdapter($dbAdapter);
        $authDbAdapter ->setTableName($config['authentication']['database']['table'])
                       ->setIdentityColumn($config['authentication']['database']['identityColumn'])
                       ->setCredentialColumn($config['authentication']['database']['credentialColumn'])
                       ->setCredentialTreatment(' MD5(?) AND active=0 AND deleted=0')
        ;
        return $authDbAdapter;
    }

}
