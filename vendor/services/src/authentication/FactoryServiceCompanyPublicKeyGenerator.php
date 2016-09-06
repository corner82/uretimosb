<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceCompanyPublicKeyGenerator implements FactoryInterface {

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        $authManager = $serviceLocator->get('authenticationManagerDefault');
        $authStorage = $authManager->getStorage()->read();  
        $network_key = $authStorage['npk'];
        
        try {
            $pdo = $pdo = new \PDO($config['dbAdapterPostgre']['dsn'], $config['dbAdapterPostgre']['username'], $config['dbAdapterPostgre']['password']);
            $sql = "SELECT       
                     REPLACE(TRIM(SUBSTRING(crypt(sf_private_key_value,gen_salt('xdes')),6,20)),'/','*') AS company_public_key,
                     1=1 AS control
                FROM info_firm_keys a                            
                WHERE a.network_key = :network_key";            

            $statement = $pdo->prepare($sql);
            $statement->bindValue(':network_key', $network_key, \PDO::PARAM_STR);
//            echo debugPDO($sql, $parameters);
            $statement->execute();
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
//            print_r($sql);
//            print_r($result);
            $companyPublicKey = true;
            if (isset($result[0]['company_public_key']))
                $companyPublicKey = $result[0]['company_public_key'];
            $errorInfo = $statement->errorInfo();
            if ($errorInfo[0] != "00000" && $errorInfo[1] != NULL && $errorInfo[2] != NULL)
                throw new \PDOException($errorInfo[0]);
            //return array("found" => true, "errorInfo" => $errorInfo, "resultSet" => $result);

            return $companyPublicKey;
        } catch (\PDOException $e /* Exception $e */) {
            $pdo->rollback();
            return array("found" => false, "errorInfo" => $e->getMessage());
        }

        //return false;
    }

}
