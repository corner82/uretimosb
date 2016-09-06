<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/slim_test for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */

namespace Custom\Services\MultiLanguage;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;
use Custom\Services\MultiLanguage\SystemLanguages;

/**
 * prepare response header for 404 pages to get language variable in zend translator template
 * @author Mustafa Zeynel Dağlı
 * @since 25/12/2015
 */
class FactoryService404ResponseRegulator implements FactoryInterface{
    
    public function createService(ServiceLocatorInterface $serviceLocator){
         $event = $serviceLocator->get('Application') 
                                ->getMvcEvent();
        
         /**
          * istenirse response ve request nesnelerine erişip header vs değişkenlerine
          * müdahale edilebilir
          */
        /*$response = $event->getResponse();
                $response->getHeaders()->addHeaderLine('lang', '12');*/
                
        $translator = $event->getApplication()
                            ->getServiceManager()
                            ->get('translator');
        
        $requestUri = $_SERVER['REQUEST_URI'];
        //print_r('--request uri-->'.$requestUri);
        if($requestUri!='/' || $requestUri!=null) {     
            $pattern = '/\/(('.SystemLanguages::ENG.'\/)|('.SystemLanguages::AR.'\/)'
                    . '|('.SystemLanguages::RU.'\/)'
                    . '|('.SystemLanguages::FA.'\/)'
                    . '|('.SystemLanguages::DE.'\/)'
                    . '|('.SystemLanguages::TR.'\/)'
                    . '|('.SystemLanguages::ZH.'\/))/';  
        
            preg_match($pattern, $requestUri, $matches); 
            //print_r($matches);
            
            if(!empty($matches)) {
                switch ($matches[0]) {
                    case '/'.SystemLanguages::ENG : 
                        $translator->setLocale(SystemLanguages::ENG_LOCALE);
                        break;
                    case '/'.SystemLanguages::AR : 
                        $translator->setLocale(SystemLanguages::AR_LOCALE);
                        break;
                    case '/'.SystemLanguages::DE : 
                        $translator->setLocale(SystemLanguages::DE_LOCALE);
                        break;
                    case '/'.SystemLanguages::RU : 
                        $translator->setLocale(SystemLanguages::RU_LOCALE);
                        break;
                    case '/'.SystemLanguages::TR : 
                        $translator->setLocale(SystemLanguages::TR_LOCALE);
                        break;
                    case '/'.SystemLanguages::FA : 
                        $translator->setLocale(SystemLanguages::FA_LOCALE);
                        break;
                    case '/'.SystemLanguages::ZH : 
                        $translator->setLocale(SystemLanguages::ZH_LOCALE); 
                        break;
                    case '/'.SystemLanguages::ENG.'/' : 
                        $translator->setLocale(SystemLanguages::ENG_LOCALE);
                        break;
                    case '/'.SystemLanguages::AR.'/' : 
                        $translator->setLocale(SystemLanguages::AR_LOCALE);
                        break;
                    case '/'.SystemLanguages::DE.'/' : 
                        $translator->setLocale(SystemLanguages::DE_LOCALE);
                        break;
                    case '/'.SystemLanguages::RU.'/' : 
                        $translator->setLocale(SystemLanguages::RU_LOCALE);
                        break;
                    case '/'.SystemLanguages::TR.'/' : 
                        $translator->setLocale(SystemLanguages::TR_LOCALE);
                        break;
                    case '/'.SystemLanguages::FA.'/' : 
                        $translator->setLocale(SystemLanguages::FA_LOCALE);
                        break;
                    case '/'.SystemLanguages::ZH.'/' : 
                        $translator->setLocale(SystemLanguages::ZH_LOCALE); 
                        break;
                    default:
                        $translator->setLocale(SystemLanguages::TR_LOCALE);
                }
            } else {
                $translator->setLocale(SystemLanguages::TR_LOCALE);
            }
        
        } else {
            $translator->setLocale(SystemLanguages::TR_LOCALE);
        }
        return $requestUri;
    }
}

