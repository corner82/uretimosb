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
 * prepare request uri for usage and prepare links for usage in js and user interfaces
 * @author Mustafa Zeynel Dağlı
 * @since 23/12/2015
 */
class FactoryServiceUrlRegulator implements FactoryInterface{
    
    public function createService(ServiceLocatorInterface $serviceLocator){
        $lang = $serviceLocator->get('serviceTranslator');
        
        $requestUri = $_SERVER['REQUEST_URI'];
        //print_r('--request uri-->'.$requestUri);
        if($requestUri!='/' || $requestUri!=null) {
            $patterns = array('/\/'.SystemLanguages::ENG.'/',
                          '/\/'.SystemLanguages::AR.'/',
                          '/\/'.SystemLanguages::DE.'/',
                          '/\/'.SystemLanguages::FA.'/',
                          '/\/'.SystemLanguages::RU.'/',
                          '/\/'.SystemLanguages::TR.'/',
                          '/\/'.SystemLanguages::ZH.'/',
                          /*'/\/([a-z]{2})\//',*/);
        
            $requestUri = preg_replace($patterns, '/--dil--', $requestUri); 
        }
         
        //print_r('-- değiştirilen request uri-->'.$requestUri);
        return $requestUri;
    }
}

