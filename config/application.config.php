<?php
/**
 * If you need an environment-specific system or application configuration,
 * there is an example in the documentation
 * @see http://framework.zend.com/manual/current/en/tutorials/config.advanced.html#environment-specific-system-configuration
 * @see http://framework.zend.com/manual/current/en/tutorials/config.advanced.html#environment-specific-application-configuration
 */
return array(
    // This should be an array of module namespaces used in the application.
    'modules' => array(
        'Application',
        'Admin',
        'Login',
        'SFDM',
        'SanalFabrika',
        'Companies',
        'Error',
        'Supervisor',
        'Definitions',
        'Signup',
        'Cluster',
//        'Uretimosb'
    ),
    
    // These are various options for the listeners attached to the ModuleManager
    'module_listener_options' => array(
        // This should be an array of paths in which modules reside.
        // If a string key is provided, the listener will consider that a module
        // namespace, the value of that key the specific path to that module's
        // Module class.
        'module_paths' => array(
            './module',
            './vendor',
        ),

        // An array of paths from which to glob configuration files after
        // modules are loaded. These effectively override configuration
        // provided by modules themselves. Paths may use GLOB_BRACE notation.
        'config_glob_paths' => array(
            'config/autoload/{{,*.}global,{,*.}local}.php',
        ),

        // Whether or not to enable a configuration cache.
        // If enabled, the merged configuration will be cached and used in
        // subsequent requests.
        //'config_cache_enabled' => $booleanValue,

        // The key used to create the configuration cache file name.
        //'config_cache_key' => $stringKey,

        // Whether or not to enable a module class map cache.
        // If enabled, creates a module class map cache which will be used
        // by in future requests, to reduce the autoloading process.
        //'module_map_cache_enabled' => $booleanValue,

        // The key used to create the class map cache file name.
        //'module_map_cache_key' => $stringKey,

        // The path in which to cache merged configuration.
        //'cache_dir' => $stringPath,

        // Whether or not to enable modules dependency checking.
        // Enabled by default, prevents usage of modules that depend on other modules
        // that weren't loaded.
        // 'check_dependencies' => true,
    ),

    // Used to create an own service manager. May contain one or more child arrays.
    //'service_listener_options' => array(
    //     array(
    //         'service_manager' => $stringServiceManagerName,
    //         'config_key'      => $stringConfigKey,
    //         'interface'       => $stringOptionalInterface,
    //         'method'          => $stringRequiredMethodName,
    //     ),
    // ),

   // Initial configuration with which to seed the ServiceManager.
   // Should be compatible with Zend\ServiceManager\Config.
   // 'service_manager' => array(),
    'service_manager' => array(
        'invokables' => array(
            // Keys are the service names
            // Values are valid class names to instantiate.
            'serviceSession' => 'Custom\Services\Session\serviceSession',
        ),
        'factories' => [
            'translator' => 'Zend\Mvc\Service\TranslatorServiceFactory',
            'sessionExpireControler' => 'Custom\Services\Session\FactoryServiceSessionExpireControlerLocator',
            'sessionManagerDefault' => 'Custom\Services\Session\FactoryServiceSessionManagerDefaultLocator',
            'dbAdapterPostgre' => 'Custom\Services\Database\FactoryServiceDbAdapterPostgre',
            'servicePostgrePdo' => 'Custom\Services\Database\FactoryServicePostgreSQLConnectPDO',
            'sessionDbSaveHandler' => 'Custom\Services\Session\FactoryServiceSessionDbSaveLocator',
            'serviceUserIDFinder' => 'Custom\Services\Session\FactoryServiceUserIDFinder',
            'authenticationDbAdapterPostgre' => 'Custom\Services\Authentication\FactoryServiceAuthenticationDbAdapterPostgre',
            'authenticationManagerDefault' => 'Custom\Services\Authentication\FactoryServiceAuthenticationLocator',
            'authenticationControlerLocator' => 'Custom\Services\Authentication\FactoryServiceAuthenticationControlerLocator',
            'serviceAuthenticate' => 'Custom\Services\Authentication\FactoryServiceAuthenticate',
            'serviceAuthenticatedRedirect' => 'Custom\Services\Authentication\FactoryServiceAuthenticatedRedirect',
            'serviceAuthenticatedRedirectAdmin' => 'Custom\Services\Authentication\FactoryServiceAuthenticatedRedirectAdmin',
            'serviceAuthenticatedRedirectUser' => 'Custom\Services\Authentication\FactoryServiceAuthenticatedRedirectUser',
            'serviceAuthenticatedRedirectManager' => 'Custom\Services\Authentication\FactoryServiceAuthenticatedRedirectManager',
            'serviceTranslator' => 'Custom\Services\MultiLanguage\FactoryServiceTranslator', 
            'textBaseFilter' => 'Custom\Services\Services\Filter\TextBaseFilter',
            'textBaseFilterNotToLowerCase' => 'Custom\Services\Filter\TextBaseFilterNotToLowerCase',
            'textBaseFilterWithSQLReservedWords' => 'Custom\Services\Filter\TextBaseFilterWithSQLReservedWords',
            'filterSQLReservedWords' => 'Custom\Services\Filter\FilterSQLReservedWords',
            'filterHTMLTagsAdvanced' => 'Custom\Services\Filter\FilterHTMLTagsAdvanced',
            'filterHexadecimalBase' => 'Custom\Services\Filter\FilterHexadecimalBase',
            'filterHexadecimalAdvanced' => 'Custom\Services\Filter\FilterHexadecimalAdvanced',
            'serviceTranslatorUrlRegulator' => 'Custom\Services\MultiLanguage\FactoryServiceUrlRegulator', 
            'serviceTranslator404ResponseRegulator' => 'Custom\Services\MultiLanguage\FactoryService404ResponseRegulator',
            'servicePublicKeyGenerator' => 'Custom\Services\Authentication\FactoryServicePublicKeyGenerator',
            'servicePublicKeySaver' => 'Custom\Services\Authentication\FactoryServicePublicKeySaver',
            'servicePublicKeyReader' => 'Custom\Services\Authentication\FactoryServicePublicKeyReader',
            'serviceCompanyPublicKeyGenerator' => 'Custom\Services\Authentication\FactoryServiceCompanyPublicKeyGenerator',
            'serviceCompanyPublicKeySaver' => 'Custom\Services\Authentication\FactoryServiceCompanyPublicKeySaver',
            'serviceCompanyPublicKeyReader' => 'Custom\Services\Authentication\FactoryServiceCompanyPublicKeyReader',
            'serviceNpkSaver' => 'Custom\Services\Authentication\FactoryServiceNpkSaver',
            'serviceNpkReader' => 'Custom\Services\Authentication\FactoryServiceNpkReader',
            'serviceRoleSessionWriter' => 'Custom\Services\Acl\FactoryServiceRoleSessionWriter',
            'serviceAclRolePagesCreator' => 'Custom\Services\Acl\FactoryServiceACLRolePagesCreator',
            'serviceAclRoleFinder' => 'Custom\Services\Acl\FactoryServiceACLRoleFinder',  
            'serviceLogoutRedirect' => 'Custom\Services\Authentication\FactoryServiceLogoutRedirect',
            'servicePageLogRabbitMQ' => 'Utill\MQ\Factory\FactoryServicePageLog',
            'serviceLoginLogRabbitMQ' => 'Utill\MQ\Factory\FactoryServiceLoginLog',
            'serviceLogoutLogRabbitMQ' => 'Utill\MQ\Factory\FactoryServiceLogoutLog',
            'serviceAclPrivilegeFinder' => 'Custom\Services\Acl\FactoryServiceACLPrivilegeFinder', 
            'serviceAclPrivilegeCreator' => 'Custom\Services\Acl\FactoryServiceACLPrivilegeCreator',
            'serviceAuthenticatedRedirectCluster' => 'Custom\Services\Authentication\FactoryServiceAuthenticatedRedirectCluster',
            'serviceAuthKeyControler' => 'Custom\Services\Authentication\FactoryServiceAuthKeyControler',
            'serviceAuthKeyRedirect' => 'Custom\Services\Authentication\FactoryServiceAuthKeyRedirect',
        ],  
        
    ),
);
