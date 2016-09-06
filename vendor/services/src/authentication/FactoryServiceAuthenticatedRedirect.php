<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceAuthenticatedRedirect  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {

        $event = $serviceLocator->get('Application')
                                ->getMvcEvent();
        $route = $event ->getRouteMatch()
                        ->getMatchedRouteName();
        $url = $event->getRouter()
                     ->assemble(array('action' => 'index'), 
                                         array('name' => 'sfdm'));
        $response = $event->getResponse();  
        $response->setHeaders( $response->getHeaders ()
                                        ->addHeaderLine ('Location', $url));
        $response->setStatusCode(302);
        $response->sendHeaders();
        $event->stopPropagation();       
        exit ();
           
        return false;
    }

}
