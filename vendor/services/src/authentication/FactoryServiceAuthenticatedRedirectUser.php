<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceAuthenticatedRedirectUser  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {

        $event = $serviceLocator->get('Application')
                                ->getMvcEvent();
        $route = $event ->getRouteMatch()
                        ->getMatchedRouteName();
        $url = $event->getRouter()
//                     ->assemble(array('action' => 'cmt'), 
                     ->assemble(array('action' => 'clientspage'), 
                                         array('name' => 'sanalfabrika'));
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
