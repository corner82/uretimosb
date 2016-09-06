<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/sanalfabrika for the canonical source repository
 * @copyright Copyright (c) 2016 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */

namespace Utill\MQ\Factory;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServicePageLog  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {
        
        $publicKey = $serviceLocator->get('servicePublicKeyReader'); 
        
        $routeMatch = $serviceLocator->get('Application')->getMvcEvent()->getRouteMatch();
        $controller = $routeMatch->getParam('controller');
        $action = $routeMatch->getParam('action');
        
        $request = $serviceLocator->get('Request');
        $uri = $request->getUri();
        $scheme = $uri->getScheme();
        $host = $uri->getHost();   
        $base = sprintf('%s://%s', $scheme, $host);

        $remoteAddr = $request->getServer('REMOTE_ADDR');
        $params = $request->getContent();
        $method = $request->getMethod();
        
        /**
        * sends login info to message queue
        * @author Mustafa Zeynel Dağlı
        * @todo after tests ,  thif feature will be added as a service manager entity
        */
       $PageEntryLogMQ = new \Utill\MQ\PageEntryLogMQ();
       $PageEntryLogMQ->setChannelProperties(array('queue.name' => \Utill\MQ\AbstractMQ::PAGE_ENTRY_LOG_QUEUE_NAME));
       $message = new \Utill\MQ\MessageMQ\MQMessagePageEntryLog();
       ;

       $message->setMessageBody(array('message' => 'Kullanıcı sayfa giris log servis!', 
                                      //'s_date'  => date('l jS \of F Y h:i:s A'),
                                      'log_datetime'  => date('Y-m-d G:i:s '),
                                      'pk' => $publicKey,
                                      'url' => $base,
                                      'path' => $controller.'/'.$action,
                                      'method' => $method,
                                      'ip' => $remoteAddr,
                                      'params' => serialize($params),
                                      'type_id' => \Utill\MQ\MessageMQ\MQMessagePageEntryLog::PAGE_ENTRY_OPERATIN,
                                      'logFormat' => 'database'));
       $message->setMessageProperties(array('delivery_mode' => 2,
                                            'content_type' => 'application/json'));
       $PageEntryLogMQ->setMessage($message->setMessage());
       $PageEntryLogMQ->basicPublish();
        
        return true;
        
        
    }

}
