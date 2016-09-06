<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServicePublicKeyGenerator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');

        try {
            $pdo = $pdo = new \PDO($config['dbAdapterPostgre']['dsn'],
                            $config['dbAdapterPostgre']['username'],
                            $config['dbAdapterPostgre']['password']);
            $sql = "          
            SELECT                
                REPLACE(TRIM(SUBSTRING(crypt(sf_private_key_value,gen_salt('xdes')),6,20)),'/','*') AS public_key
                FROM info_users a 
                INNER JOIN sys_acl_roles sar ON sar.id = a.role_id AND sar.active=0 AND sar.deleted=0 
                WHERE a.username = :username 
                    AND a.password = :password   
                    AND a.deleted = 0 
                    AND a.active = 0 
                    Limit 1 
                
                                 ";

            $statement = $pdo->prepare($sql);
            $statement->bindValue(':username', $_POST['eposta'], \PDO::PARAM_STR);
            $statement->bindValue(':password', md5($_POST['sifre']), \PDO::PARAM_STR);
            //echo debugPDO($sql, $parameters);
            $statement->execute();
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $publicKey = true;
            if(isset($result[0]['public_key'])) $publicKey = $result[0]['public_key'];

            $errorInfo = $statement->errorInfo();
            if ($errorInfo[0] != "00000" && $errorInfo[1] != NULL && $errorInfo[2] != NULL)
                throw new \PDOException($errorInfo[0]);
            //return array("found" => true, "errorInfo" => $errorInfo, "resultSet" => $result);
            return $publicKey;
        } catch (\PDOException $e /* Exception $e */) {
            $pdo->rollback();
            return array("found" => false, "errorInfo" => $e->getMessage());
        }
        
        //return false;
    }
        
        
        
  
    }


