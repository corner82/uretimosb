<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/slim_test for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */

namespace Custom\Services\Filter;


/**
 * service manager layer for database connection
 * @author Mustafa Zeynel Dağlı
 */
class FilterSQLReservedWords implements \Zend\ServiceManager\FactoryInterface {
    
    /**
     * service ceration via factory on zend service manager
     * @param \Zend\ServiceManager\ServiceLocatorInterface $serviceLocator
     * @return boolean|\PDO
     */
    public function createService(\Zend\ServiceManager\ServiceLocatorInterface $serviceLocator) {
        // Create a filter chain and filter for usage
        $filterChain = new \Zend\Filter\FilterChain();
        $filterChain->attach(new \Zend\Filter\PregReplace(array(
                            'pattern'=> array("/(;)|(%3b)/",
                                            "/\/\*/",
                                            "/\*\//",
                                            "/\*/",
                                            "/@@/",
                                            "/([^A-Za-z0-9])(@)([^A-Za-z0-9])*/"
                                            ,"/nchar/"
                                            ,"/NCHAR/",
                                            "/nvarchar/",
                                            "/NVARCHAR/",
                                            "/varchar/",
                                            "/VARCHAR/",
                                            "/char/",
                                            "/CHAR/",
                                            "/(alter)(\s)*/",
                                            "/(ALTER)(\s)*/",
                                            "/(\s)+(begin)(\s)+/",
                                            "/(\s)+(BEGIN)(\s)+/",
                                            "/(\s)+(cast)(\s)+/",
                                            "/(\s)+(CAST)(\s)+/",
                                            "/(\s)+(create)(\s)+/",
                                            "/(\s)+(CREATE)(\s)+/",
                                            "/(\s)+(cursor)(\s)+/",
                                            "/(\s)+(CURSOR)(\s)+/",
                                            "/(\s)+(declare)(\s)*/",
                                            "/(\s)+(DECLARE)(\s)*/",
                                            "/([^A-Za-z0-9])(delete)([^A-Za-z0-9])*/",
                                            "/([^A-Za-z0-9])(DELETE)([^A-Za-z0-9])*/",
                                            "/([^A-Za-z0-9])(drop)([^A-Za-z0-9])*/",
                                            "/([^A-Za-z0-9])(DROP)([^A-Za-z0-9])*/",
                                            "/(\s)+(end)(\s)+/","/(\s)+(END)(\s)+/",
                                            "/(\s)+(execute)(\s)+/","/(\s)+(EXECUTE)(\s)+/",
                                            "/(\s)+(exec)(\s)+/","/(\s)+(EXEC)(\s)+/",
                                            "/fetch/","/FETCH/","/insert/","/INSERT/",
                                            "/(\s)+(kill)(\s)+/","/(\s)+(KILL)(\s)+/",
                                            "/(\s)+(open)(\s)+/","/(\s)+(OPEN)(\s)+/",
                                            "/select/",
                                            "/SELECT/",
                                            "/sysobjects/",
                                            "/SYSOBJECTS/",
                                            "/syscolumns/",
                                            "/SYSCOLUMNS/",
                                            "/(\s)+(sys)(\s)+/",
                                            "/(\s)+(SYS)(\s)+/",
                                            "/table/","/TABLE/",
                                            "/([^A-Za-z0-9])(update)([^A-Za-z0-9])+/"
                                            ,"/([^A-Za-z0-9])(UPDATE)([^A-Za-z0-9])+/",
                                            "/([^A-Za-z0-9])(or)([^A-Za-z0-9])+/",
                                            "/([^A-Za-z0-9])(OR)([^A-Za-z0-9])+/",
                                            "/([^A-Za-z0-9])(UNION)([^A-Za-z0-9])+/",
                                            "/([^A-Za-z0-9])(union)([^A-Za-z0-9])+/"),
                        'replacement' => '/*$0*/',
                    )));
        return $filterChain;

    }

}
