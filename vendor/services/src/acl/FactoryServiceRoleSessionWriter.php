<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/slim_test for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */
namespace Custom\Services\Acl;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

/**
 * service layer for user role determination
 * @author Mustafa Zeynel Dağlı
 * @since 29/01/2016
 */
class FactoryServiceRoleSessionWriter  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $app = $serviceLocator->get('Application');  
        $sessionManager = $app ->getServiceManager()
                               ->get('SessionManagerDefault');
        $sessionID = $sessionManager->getId();
        $roleInfo = $sessionManager->getStorage()->getMetadata('__ZY');
        $authManager = $serviceLocator->get('authenticationManagerDefault');
        
        print_r('testttttt????');
        /**
         * if role info is not displayed and user not registered , then user is guest
         */
        if($authManager->getStorage()->isEmpty()) { 
            print_r('testttttt');
            //$sessionManager->getStorage()->setMetadata('__ZY',array('role'=>'guest', 'roleID'=>7));
            $sessionManager->getStorage()->setMetadata('__ZY','ziyaretçi');
            $sessionManager->getStorage()->setMetadata('__ROLEID', 7);
            return array('name'=>'ziyaretçi', 'id' => 7);
        } else {
            /**
             * if role info is not set and user is registered, then get
             * user role due to user name
             */
            $roleResult = $serviceLocator->get('serviceAclRoleFinder');
            if($roleResult['found']) {
                print_r($roleResult['resultSet']);
                /*$sessionManager->getStorage()->setMetadata('__ZY',array('role'=>  ''.strtolower(trim($roleResult['resultSet'][0]['name']).''), 
                                                          'roleID'=>$roleResult['resultSet'][0]['id']));*/
                $sessionManager->getStorage()->setMetadata('__ZY',$roleResult['resultSet'][0]['name']);
                $sessionManager->getStorage()->setMetadata('__ROLEID',$roleResult['resultSet'][0]['id']);
                return $roleResult['resultSet'][0];
            } else {
                //$sessionManager->getStorage()->setMetadata('__ZY',array('role'=>'guest', 'roleID'=>7));
                $sessionManager->getStorage()->setMetadata('__ZY','ziyaretçi');
                $sessionManager->getStorage()->setMetadata('__ROLEID', 7);
                return array('name'=>'ziyaretçi', 'id' => 7);
            }
        }
    }

}
