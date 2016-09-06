<?php

namespace Sanalfabrika;

use Zend\ModuleManager\Feature\AutoloaderProviderInterface;
use Zend\ModuleManager\Feature\ConfigProviderInterface;
use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Zend\Session\SessionManager;
use Zend\Session\Container;
use Zend\ModuleManager\Feature\ViewHelperProviderInterface;

class Module implements AutoloaderProviderInterface, ConfigProviderInterface, ViewHelperProviderInterface {

    public function init() {
        
    }

    public function onBootstrap(MvcEvent $e) {
        
    }

    public function sessionExpireControl(MvcEvent $e) {
        $serviceManager = $e->getApplication()->getServiceManager();
        $sessionManager = $serviceManager->get('SessionManagerDefault');
        $serviceManager->get('sessionExpireControler');
    }

    public function getServiceConfig() {
        
    }

    public function getAutoloaderConfig() {
        return array(
            'Zend\Loader\ClassMapAutoloader' => array(
                __DIR__ . '/autoload_classmap.php',
            ),
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }

    public function getConfig() {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getViewHelperConfig() {
        return array(
            'factories' => array(
                'test_helper' => function($sm) {
                    $helper = new View\Helper\Testhelper;
                    return $helper;
                }
            )
        );
    }

}
