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
 * service layer to cretae acl and add roles
 * @author Mustafa Zeynel Dağlı
 * @since 29/01/2016
 * @todo user roles will be held from db or some other source will be implemented
 */
class FactoryServiceACLRolePagesCreator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        
        //print_r('--factoryserviceprivilegecreater'); 
        
        $config = $serviceLocator->get('config');
        $acl = new Acl();
        
        $moduleManager = $serviceLocator->get('ModuleManager');
        $modules = $moduleManager->getLoadedModules();
        $loadedModules = array_keys($modules);
        //print_r($loadedModules);
        
        if(!empty($loadedModules)) {
            foreach ($loadedModules as $key) {
                $acl->addResource(strtolower(trim($key)));
            }
        }
        
        if(isset($config['ACL_pages'])) {
            
            if(!empty($config['ACL_pages'])) {
                $aclArr = $config['ACL_pages'];
                foreach ($aclArr as $key => $value) {
                    $parent = null;
                    if(isset($value['parent'])) $parent = $value['parent'];
                    if(isset($parent)) {
                        $acl->addRole(new Role($key), $parent);
                    } else {
                        $acl->addRole(new Role($key));
                    }
                    if(isset($value['action'])) {
                        foreach ($value['action'] as $action => $actArr) {
                            foreach($actArr as $index) {
                                $acl->allow($key, $action, $index);
                            }
                        }
                        //print_r($value['action']);
                    }
                    
                  //print_r('--key-->'.$key.'--parent-->'.$parent);
                  $parent = null;
                }
            }
        } 
        
        /*$acl->addRole(new Role('Consultant'))
            ->addRole(new Role('Supervisor'), 'Consultant')
            ->addRole(new Role('Admin'), 'Supervisor')
            ->addRole(new Role('Guest'))
            ->addRole(new Role('New User'), 'Guest')
            ->addRole(new Role('Firm User'), 'New User')
            ->addRole(new Role('Firm Owner'), 'Firm User');*/
        /*$acl->addResource('consultant');
        $acl->addResource('login');
        $acl->addResource('sanalfabrika');*/  
        
        /*$acl->allow('consultant', 'sfdm', 'index'); 
        $acl->allow('consultant', 'sfdm', 'registration'); 
        $acl->allow('consultant', 'login', 'index'); */
        /*$acl->allow('anonymous', 'album', 'album:add'); 
        $acl->deny('anonymous', 'album', 'album:hello'); 
        $acl->allow('anonymous', 'album', 'album:view');
        $acl->allow('anonymous', 'album', 'album:edit'); */    
        return $acl;
    }

}
