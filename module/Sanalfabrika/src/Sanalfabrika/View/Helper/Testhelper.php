<?php

namespace Sanalfabrika\View\Helper;

use Zend\View\Helper\AbstractHelper;
use Zend\ServiceManager\ServiceLocatorAwareInterface;
use Zend\ServiceManager\ServiceLocatorInterface as ServiceLocatorInterface;

class Testhelper extends AbstractHelper implements ServiceLocatorAwareInterface {

    public $serviceLocator;

    public function __invoke() {

        $serviceLocator = $this->getServiceLocator();
        $sessionManager = $serviceLocator->getServiceLocator()
                ->get('SessionManagerDefault');
        $sessionData = $sessionManager->getStorage()->getMetadata();
        
        $unserializedacl = unserialize(base64_decode($sessionData['__ACL']));
        $role = $sessionManager->getStorage()->getMetadata()['__ZY']['role'];
//        $resource = $sessionManager->getStorage()->getMetadata()['__ZY']['role'];
        
        if ($role !== null) {
            $firmaOwnerAllowance = $unserializedacl->isAllowed($role, 'firmaİşlemleri', 'firmakullanıcısıekleme') ?
                    "allowed" : "denied";
            return ($firmaOwnerAllowance);
        }else{
            print_r('hata');
        }
    }

        function getServiceLocator() {
            return $this->serviceLocator;
        }

        function setServiceLocator(ServiceLocatorInterface $serviceLocator) {
            $this->serviceLocator = $serviceLocator;
            return $this;
        }

    }
    