<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/slim_test for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */

namespace Custom\Services\Database;


/**
 * service manager layer for database connection
 * @author Mustafa Zeynel Dağlı
 */
class FactoryServicePostgreSQLConnectPDO implements \Zend\ServiceManager\FactoryInterface {
    
    /**
     * service ceration via factory on zend service manager
     * @param \Zend\ServiceManager\ServiceLocatorInterface $serviceLocator
     * @return boolean|\PDO
     */
    public function createService(\Zend\ServiceManager\ServiceLocatorInterface $serviceLocator) {
        try {
            $pdo = new \PDO('pgsql:dbname=ostim_development;host=localhost;',
                            'postgres',
                            '1Qaaal123');
            return $pdo;
        } catch (PDOException $e) {
            return false;
        } 


    }

}
