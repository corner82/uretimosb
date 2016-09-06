<?php

namespace Custom\Services\Acl;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

/**
 * @todo not used, will be completed if ACL object saved to another column
 * @author Mustafa Zeynel Dağlı
 * @since 18/07/2016
 */
class FactoryServiceACLObjectSaver  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        
        try {
            $pdo = $pdo = new \PDO($config['dbAdapterPostgre']['dsn'],
                            $config['dbAdapterPostgre']['username'],
                            $config['dbAdapterPostgre']['password']);
            $sql = "UPDATE act_session set acl=:acl where id=:sessionID ";
            
            $authManager = $serviceLocator->get('authenticationManagerDefault');
            $authStorage = $authManager->getStorage()->read();
            $publicKey = $authStorage['pk'];
            //print_r('--ph read-->'.$publicKey);  
            
            $sessionManager = $serviceLocator
                               ->get('SessionManagerDefault');
            $sessionID = $sessionManager->getId();
            //print_r('----'.$sessionID);  

            $statement = $pdo->prepare($sql);
            $statement->bindValue(':acl', $acl, \PDO::PARAM_STR);
            $statement->bindValue(':sessionID', $sessionID, \PDO::PARAM_STR);
            $statement->execute();

            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);

            $errorInfo = $statement->errorInfo();
            if ($errorInfo[0] != "00000" && $errorInfo[1] != NULL && $errorInfo[2] != NULL)
                throw new \PDOException($errorInfo[0]);
            return array("found" => true, "errorInfo" => $errorInfo, "resultSet" => $result);
        } catch (\PDOException $e /* Exception $e */) {
            $pdo->rollback();
            return array("found" => false, "errorInfo" => $e->getMessage());
        }
        
        //return false;
    }
        
        
        
  
    }


