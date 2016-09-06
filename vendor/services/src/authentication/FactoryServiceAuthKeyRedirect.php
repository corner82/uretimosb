<?php
namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

/**
 * if auth key not found, user will be redirected to home page
 * @author Mustafa Zeynel Dağlı
 * @since 01/09/2016
 */
class FactoryServiceAuthKeyRedirect  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {

        $event = $serviceLocator->get('Application')
                                ->getMvcEvent();
        $route = $event ->getRouteMatch()
                        ->getMatchedRouteName();
        $url = $event->getRouter()
                     ->assemble(array('action' => 'index'), 
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
