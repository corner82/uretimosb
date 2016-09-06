<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/sanalfabrika for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */
namespace Custom\Services\Acl;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\Permissions\Acl\Acl;
use Zend\Permissions\Acl\Role\GenericRole as Role;

/**
 * service layer to get role of registered user
 * @author Mustafa Zeynel Dağlı
 * @since 29/01/2016
 * @todo user roles will be held from db or some other source will be implemented
 */
class FactoryServiceACLRoleFinder  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        
        $pdo = $serviceLocator->get('servicePostgrePdo');
        $authManager = $serviceLocator->get('authenticationManagerDefault');
        $authStorage = $authManager->getStorage()->read();
        //print_r('--auth storage-->'.$authStorage.'--');
        if(isset($authStorage['username'])) {
            $userName = $authStorage['username'];
            try {
                $pdo->beginTransaction();
                $statement = $pdo->prepare(" 

                    SELECT   a.role_id as id , LOWER(TRIM(r.name_tr)) as name
                    FROM info_users a
                    inner join sys_acl_roles r on r.id = a.role_id AND r.active =0 AND r.deleted =0    
                    where a.active = 0 AND a.deleted = 0 AND
                    username = :username");
                $statement->bindValue(':username', $userName, \PDO::PARAM_STR);
                $statement->execute();
                $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
                $errorInfo = $statement->errorInfo();
                if ($errorInfo[0] != "00000" && $errorInfo[1] != NULL && $errorInfo[2] != NULL)
                    throw new \PDOException($errorInfo[0]);
                $pdo->commit();
                return array("found" => true, "errorInfo" => $errorInfo, "resultSet" => $result);
            } catch (\PDOException $e /* Exception $e */) {
                $pdo->rollback();
                return array("found" => false, "errorInfo" => $e->getMessage());
            }
        } else {
            return array("found" => false, "errorInfo" => 'user name not found!!!');
        }
        
        
        

    }

}
