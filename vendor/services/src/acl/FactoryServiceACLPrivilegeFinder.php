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
 * service layer to get privileges of registered user
 * @author Mustafa Zeynel Dağlı
 * @since 18/07/2016
 * @todo test code will be removed
 */
class FactoryServiceACLPrivilegeFinder  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        
        $pdo = $serviceLocator->get('servicePostgrePdo');
        
        $sessionManager = $serviceLocator->get('SessionManagerDefault');
        $sessionData = $sessionManager->getStorage()->getMetadata();
//        print_r($sessionData);
        //print_r($sessionData['__ZY']);
        //print_r($sessionData['__ZY']['roleID']);
        /*if(isset($sessionData['__ZY']['roleID'])) {
            $role_id = $sessionData['__ZY']['roleID'];
        } */
        if(isset($sessionData['__ROLEID'])) {
            $role_id = $sessionData['__ROLEID'];
        } else {
            $role_id = 7;
        }
        
        
        if(isset($role_id)) {
            try {
                $pdo->beginTransaction();
                $statement = $pdo->prepare(" 

                    SELECT sapr.id, 
                        trim(replace(a.name,' ','')) as resource_name,  
                        trim(replace(sapr.name,' ','')) AS privilege_name , 
                        trim(replace(sapr.name_eng,' ','')) AS privilege_name_eng
                    FROM sys_acl_resources a 
                    INNER JOIN sys_acl_resource_roles sarr ON sarr.resource_id = a.id AND sarr.deleted=0 AND sarr.active =0 
                    INNER JOIN sys_acl_roles saro ON saro.id = sarr.role_id AND saro.deleted=0 AND saro.active =0 
                    INNER JOIN sys_acl_rrp rrp ON rrp.resource_id = a.id AND rrp.role_id = saro.id  AND rrp.deleted=0 AND rrp.active =0
                    INNER JOIN sys_acl_privilege sapr ON sapr.id = rrp.privilege_id and sapr.deleted=0 AND sapr.active =0 
                    where a.deleted=0 AND a.active =0 
                    and rrp.role_id=:role_id");
                $statement->bindValue(':role_id', $role_id, \PDO::PARAM_INT);
                $statement->execute();
                $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
                $errorInfo = $statement->errorInfo();
                if ($errorInfo[0] != "00000" && $errorInfo[1] != NULL && $errorInfo[2] != NULL)
                    throw new \PDOException($errorInfo[0]);
                $pdo->commit();
                return array("found" => true, "errorInfo" => $errorInfo, "resultSet" => $result);
            } catch (\PDOException $e ) {
                $pdo->rollback();
                return array("found" => false, "errorInfo" => $e->getMessage());
            }
        } else {
            return array("found" => false, "errorInfo" => 'role id not found in session!!!');
        }
        
        return true;
        

    }

}
