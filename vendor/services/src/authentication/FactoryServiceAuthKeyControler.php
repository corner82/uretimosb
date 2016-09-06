<?php
namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

/**
 * factory service for auth key control
 * @author Mustafa Zeynel Dağlı
 * @since 01/09/2016
 */
class FactoryServiceAuthKeyControler  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        
        $params = $serviceLocator->get('ControllerPluginManager')->get('params');
        $authKey = $params->fromQuery('key');
        print_r('--auth key in service manager-->'.$authKey);
        if(isset($authKey)) {
            print_r('--ggg--');
            try {
                $pdo = $pdo = new \PDO($config['dbAdapterPostgre']['dsn'],
                                $config['dbAdapterPostgre']['username'],
                                $config['dbAdapterPostgre']['password']);
                $sql = "UPDATE info_users_sending_mail
                    SET                         
                        c_date =  timezone('Europe/Istanbul'::text, ('now'::text)::timestamp(0) with time zone)                     
                    WHERE key = :key 
                    and active =0 and deleted =0 
                    and auth_allow_id =0 
                    and  c_date is null";

                $statement = $pdo->prepare($sql);
                $statement->bindValue(':key', $authKey, \PDO::PARAM_STR);
                $statement->execute();
                $updatedRows = $statement->rowCount();
                $errorInfo = $statement->errorInfo();
                if ($errorInfo[0] != "00000" && $errorInfo[1] != NULL && $errorInfo[2] != NULL)
                    throw new \PDOException($errorInfo[0]);
                if($updatedRows>0) return array("found" => true, "errorInfo" => $errorInfo, "affectedRowsCount" => $updatedRows);
                $serviceLocator->get('serviceAuthKeyRedirect'); 
                
            } catch (\PDOException $e /* Exception $e */) {
                $pdo->rollback();
                $serviceLocator->get('serviceAuthKeyRedirect'); 
                return array("found" => false, "errorInfo" => $e->getMessage());
            }
        } else {
             print_r('--ddd--');
            $serviceLocator->get('serviceAuthKeyRedirect');
            return false;
        }
        return false;
    }
        
        
        
  
    }


