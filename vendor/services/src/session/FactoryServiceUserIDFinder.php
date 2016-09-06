<?php

namespace Custom\Services\Session;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceUserIDFinder  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');

        try {
            $pdo = $pdo = new \PDO($config['dbAdapterPostgre']['dsn'],
                            $config['dbAdapterPostgre']['username'],
                            $config['dbAdapterPostgre']['password']);
            $sql = "                 
            SELECT   a.id as id
                FROM info_users a 
                where  
                a.username = :username ";

            $statement = $pdo->prepare($sql);
            //print_r('--user id-->'.$serviceLocator->get('identity'));
            $statement->bindValue(':username', $serviceLocator->get('identity'), \PDO::PARAM_STR);
            //echo debugPDO($sql, $parameters);
            $statement->execute();
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $userID = true;
            if(isset($result[0]['id'])) $userID = (int)$result[0]['id']; 

            $errorInfo = $statement->errorInfo();
            if ($errorInfo[0] != "00000" && $errorInfo[1] != NULL && $errorInfo[2] != NULL)
                throw new \PDOException($errorInfo[0]);
            //return array("found" => true, "errorInfo" => $errorInfo, "resultSet" => $result);
            return $userID;
        } catch (\PDOException $e /* Exception $e */) {
            $pdo->rollback();
            return array("found" => false, "errorInfo" => $e->getMessage());
        }
    }
        
        
        
  
    }


