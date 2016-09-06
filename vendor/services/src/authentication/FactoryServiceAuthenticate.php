<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceAuthenticate  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        $authManager = $serviceLocator->get('authenticationManagerDefault');
        if($authManager->getStorage()->isEmpty()) {
            $event = $serviceLocator->get('Application')
                                    ->getMvcEvent();
            $route = $event ->getRouteMatch()
                            ->getMatchedRouteName();  
           if($route !== 'sanalfabrika') {
                $url = $event->getRouter()
                             ->assemble(array('action' => 'login'), 
                                                 array('name' => 'sanalfabrika'));
                $response = $event->getResponse();  
                $response->setHeaders( $response->getHeaders ()
                                                ->addHeaderLine ('Location', $url));
                $response->setStatusCode(302);
                $response->sendHeaders();
                $event->stopPropagation();       
                exit ();
            }
        }
        return false;
        
        
    }

}
