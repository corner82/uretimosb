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
use Zend\Permissions\Acl\Resource\GenericResource as Resource;
use Zend\Permissions\Acl\Role\GenericRole as Role;

/**
 * service layer to set privileges of registered user
 * @author Mustafa Zeynel Dağlı
 * @since 18/07/2016
 * @todo code used for testing will be removed
 */
class FactoryServiceACLPrivilegeCreator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        
        $sessionManager = $serviceLocator->get('SessionManagerDefault');
        //print_r($sessionManager->getStorage()->getMetadata());  
        $aclSession = $sessionManager->getStorage()->getMetadata('__ACL');
        $aclResources = $sessionManager->getStorage()->getMetadata('__RES');
        
        if($aclSession!= NULL) {
            //print_r('acl nesnesi boş değil');
            $sessionData = $sessionManager->getStorage()->getMetadata();
            $acl = unserialize(base64_decode($sessionData['__ACL']));
            
            //print_r($acl);
            /*echo $acl->isAllowed($role, 'adminİşlemleri', 'prvrrrabc') ?
                "allowed" : "denied";
            echo $acl->isAllowed($role, 'adminİşlemleri', 'prvrrrabc  ') ?
                "--allowed" : "--denied";*/
            
            return $acl;
        } else {
            //print_r('acl nesnesi boş!!');
            $pdo = $serviceLocator->get('servicePostgrePdo');
        
            $privileges = $serviceLocator->get('serviceAclPrivilegeFinder');
            //print_r($privileges);
            $acl = new Acl();
            if(isset($privileges) and !empty($privileges['resultSet'])) {
                $sessionData = $sessionManager->getStorage()->getMetadata();
                //print_r($sessionData);
                //print_r($sessionData['__ZY']);
                
                //$role = new Role($sessionData['__ZY']['role']);
                if(isset($sessionData['__ROLEID'])) {
                    $role = $sessionData['__ZY'];
                } else {
                    $role = 'ziyaretçi';
                }
                $role = new Role($role);
                $acl->addRole($role);
                $resourceArray;
                foreach ($privileges['resultSet'] as $key => $value) {
                    //print_r($value);
                    if(!$acl->hasResource($value['resource_name'])) {
                        $acl->addResource(new Resource($value['resource_name']));
                        $resourceArray[] = $value['resource_name'];
                    }
                    $acl->allow($role, $value['resource_name'], $value['privilege_name']);
                }
                //print_r($resourceArray);
                //print_r($acl);
                $sessionManager->getStorage()->setMetadata('__RES',base64_encode(serialize($resourceArray)));
                //$sessionManager->getStorage()->setMetadata('__ACL',base64_encode(serialize($acl)));
                
                /*echo $acl->isAllowed($role, 'adminİşlemleri', 'prvrrrabc') ?
                    "allowed" : "denied";
                echo $acl->isAllowed($role, 'adminİşlemleri', 'prvrrrabc  ') ?
                    "--allowed" : "--denied";*/
            }
            return $acl;
        }
        
        
    }

}
