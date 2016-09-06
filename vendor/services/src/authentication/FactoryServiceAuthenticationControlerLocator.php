<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceAuthenticationControlerLocator  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $config = $serviceLocator->get('config');
        $routeMatch = $serviceLocator->get('Application')->getMvcEvent()->getRouteMatch();
        $controller = $routeMatch->getParam('controller');
        $action = $routeMatch->getParam('action');
        // if no action found in the request object then no authentication
        if($controller == null) return true;
        
        foreach ($config['ControlorsTobeAuthenticated'] as $value) {
           if (0 === strpos($controller, $value, 0)) {
               /**
                * action control for some modules like 'Sanalfabrika'
                * some actions are public and some are not
                * @author Mustafa Zeynel Dağlı
                * @since 29/02/2016
                */
               if(isset($config['ActionsTobeAuthenticated'][$value])){
                  if(!in_array($action,
                               $config['ActionsTobeAuthenticated'][$value])) {
                      return false;  
                    }
                } else {
                    return true;
                }
                return true;
            }
            //print_r('test');
        } 
        return false;
        
    }

}
