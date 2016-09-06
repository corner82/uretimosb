<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

return array(
    'module_layouts' => array(
       'Application' => 'layout/layout.phtml',
       'Admin' => 'layout/admin.phtml',      
       'Login' => 'layout/login.phtml',
       'SFDM' => 'layout/sfdm.phtml',
       'Sanalfabrika' => 'layout/sanalfabrika.phtml',
       'Companies' => 'layout/companies.phtml',
       'Error' => 'layout/error.phtml',
       'Definitions' => 'layout/definitions.phtml',
       'Supervisor' => 'layout/supervisor.phtml',
       'Signup' => 'layout/signup.phtml',
       'Cluster' => 'layout/cluster.phtml',
        
   ),
    'action_layouts' => array(
        'SFDM' => array(
            'acldefinition' => 'layout/acldefinitionLayout.phtml',
            'profile' => 'layout/profile.phtml',
            'confirm' => 'layout/confirm.phtml',
            'machinetest' => 'layout/machinetest.phtml',
            'imageupload' => 'layout/imageupload.phtml',
            'macproducers' => 'layout/macproducers.phtml',
            'machattr'  => 'layout/machattr.phtml',
            'uniquemachprop' => 'layout/uniquemachprop.phtml',
            'machpropdef' => 'layout/machpropdef.phtml',
            'machctg' => 'layout/machctg.phtml',
            'machprop' => 'layout/machprop.phtml',
            'mach' => 'layout/mach.phtml',
            'machinsert' => 'layout/machinsert.phtml',
            'cmpinsert' => 'layout/cmpinsert.phtml',
                        ),
        'Companies' => array(
            'companyregistration' => 'layout/companyregistrationLayout.phtml',
            'meeting' => 'layout/meetingLayout.phtml',
                        ),
        'Supervisor' => array(
            'coreg' => 'layout/coregLayout.phtml',
            'machinepark' => 'layout/machineparkLayout.phtml',
            'software' => 'layout/softwareLayout.phtml',
            'ureg' => 'layout/uregLayout.phtml',
            'umonitoring' => 'layout/umonitoringLayout.phtml',
            'cevaluation' => 'layout/cevaluationLayout.phtml',
                        ),
        'Signup' => array(
            'signup' => 'layout/signup.phtml',
                        ),
        'Sanalfabrika' => array(
            'registration' => 'layout/registrationLayout.phtml',
            'login' => 'layout/loginLayout.phtml',
            'cmt' => 'layout/cmtLayout.phtml',
            'prodsercat' => 'layout/prodsercatLayout.phtml',
            'userprofile' => 'layout/userprofileLayout.phtml',
            'userprofilepersonal' => 'layout/userprofilepersonalLayout.phtml',
            'userprofileusers' => 'layout/userprofileusersLayout.phtml',
            'userprofileprojects' => 'layout/userprofileprojectsLayout.phtml',
            'userprofilecomments' => 'layout/userprofilecommentsLayout.phtml',
            'userprofilehistory' => 'layout/userprofilehistoryLayout.phtml',
            'userprofilesettings' => 'layout/userprofilesettingsLayout.phtml',
            'companyprofile' => 'layout/companyprofileLayout.phtml',
            'companyperformancemetersprofile' => 'layout/companyperformancemetersprofileLayout.phtml',
            'companyproductsprofile' => 'layout/companyproductsprofileLayout.phtml',
            'companycommentsprofile' => 'layout/companycommentsprofileLayout.phtml',
            'companymembersprofile' => 'layout/companymembersprofileLayout.phtml',
            'companyhistoryprofile' => 'layout/companyhistoryprofileLayout.phtml',
            'companyprojectsprofile' => 'layout/companyprojectsprofileLayout.phtml',
            'companyprofilesettings' => 'layout/companyprofilesettingsLayout.phtml',
            'companymtprofile' => 'layout/companymtprofileLayout.phtml',
            'clientspage' => 'layout/clientspageLayout.phtml',
            'sfmachines' => 'layout/sfmachinesLayout.phtml',
            'cprofileset' => 'layout/cprofilesetLayout.phtml',
            'cpgeneralset' => 'layout/cpgeneralsetLayout.phtml',
            'cpaddressset' => 'layout/cpaddresssetLayout.phtml',
            'cpprodset' => 'layout/cpprodsetLayout.phtml',
            'cpmemberset' => 'layout/cpmembersetLayout.phtml',
            'cpmp' => 'layout/cpmpLayout.phtml',
            'cpreference' => 'layout/cpreferenceLayout.phtml',
            'projreg' => 'layout/projregLayout.phtml',
            'uprofset' => 'layout/uprofsetLayout.phtml',
            'projpool' => 'layout/projpoolLayout.phtml',
            'signupconfirmation' => 'layout/signupconfirmationLayout.phtml'
        ),
        'Admin' => array( 'index' => 'layout/admin.phtml',
                          'menu' => 'layout/menu.phtml',
                          'machctg' => 'layout/machctg.phtml',
                          'machprop' => 'layout/machprop.phtml',
                          'mach' => 'layout/mach.phtml',
                          'unt'  => 'layout/unt.phtml',
                          'prodtypes'  => 'layout/prodtypes.phtml',
                          'machattr'  => 'layout/machattr.phtml',
                          'uniquemachprop' => 'layout/uniquemachprop.phtml',
                          'machpropdef' => 'layout/machpropdef.phtml',
                          'aclresources' => 'layout/aclresources.phtml',
                          'aclroles' => 'layout/aclroles.phtml',
                          'aclprivileges' => 'layout/aclprivileges.phtml',
                          'aclroleprivilege' => 'layout/aclroleprivilege.phtml',
                          'aclprivilegeservices' => 'layout/aclprivilegeservices.phtml',
                          'menutypes' => 'layout/menutypes.phtml',
                          'modules' => 'layout/modules.phtml',
                          'actions' => 'layout/actions.phtml',
                          'actionmenus' => 'layout/actionmenus.phtml',
                          'services' => 'layout/services.phtml',
                          'servicegroups' => 'layout/servicegroups.phtml',
                          'assigndef' => 'layout/assigndef.phtml',
                          'assignrole' => 'layout/assignrole.phtml',
                          'operationdef' => 'layout/operationdef.phtml',
                          'consultants' => 'layout/consultants.phtml',
                          'assigncons' => 'layout/assigncons.phtml',
                          'actionprivilegeservice' => 'layout/actionprivilegeservice.phtml',
                          'actionprivilege' => 'layout/actionprivilege.phtml',
                          'macproducers' => 'layout/macproducers.phtml',
                          'osb' => 'layout/osb.phtml',
                          'clusters' => 'layout/clusters.phtml',
                          'clusteremp' => 'layout/clusteremp.phtml',
                        ),
        'Cluster' => array(
            'index' => 'layout/cluster.phtml',
            'cmpinsert' => 'layout/cmpinsert.phtml',
            'machinsert' => 'layout/machinsert.phtml',
                        ),
        'Error' => array(
            'index' => 'layout/401layout.phtml',
                        ),
   ),
    'session' => array(
        'config' => array(
            'class' => 'Zend\Session\Config\SessionConfig',     
            'options' => array(
                'name' => 'ostim',    
            ),
        ),
        'savehandler' => array(
            'database'=> array(
                    'table'=> 'act_session',
                    'savehandler' => 'sessionDbSaveHandler',
                ),
        ),
        'storage' => 'Zend\Session\Storage\SessionArrayStorage',
        'validators' => array(
            'Zend\\Session\\Validator\\RemoteAddr',   
            'Zend\\Session\\Validator\\HttpUserAgent',       
        ),
        'remember_me_seconds' => 2419200,
        'use_cookies' => true,
        'cookie_httponly' => true,
    ),
    'dbAdapterPostgre' => array(
        'driver'    => 'Pdo',    
        'dsn'       => "pgsql:host=localhost;dbname=ostim_development",
        'username'  => 'postgres',
        'password'  => '1Qaaal123',          
    ),
    'authentication' => array(
        'database' => array (
            'table' => 'info_users',
            'identityColumn' => 'username',
            'credentialColumn' => 'password',    
        )        
    ),
    'ControlorsTobeAuthenticated' => array(
        'Admin',
        'SFDM',
        'Supervisor',
        'Companies',
        'Sanalfabrika',
        'Cluster'

    ),
    'ActionsTobeAuthenticated' => array(
        'Sanalfabrika' => array(
            'cmt',
            'prodsercat',
            'cprofileset',
            'cpgeneralset',
            'cpaddressset',
            'cpprodset',
            'cpmp',
            'cpmemberset',
            'cpreference',
            'projreg',
            'uprofset',
            'projpool'
        ),

    ),
    /*'ACL_pages' => array(
        'guest' => array(
                         'action' => array('sanalfabrika' => array ('index',
                                                                    'registration',
                                                                    'login',
                                                                    'userprofile',
                                                                    'userprofilepersonal',
                                                                    'userprofileusers',
                                                                    'userprofileprojects',
                                                                    'userprofilecomments',
                                                                    'userprofilehistory',
                                                                    'userprofilesettings',
                                                                    'companyprofile',
                                                                    'companyperformancemetersprofile',
                                                                    'companyproductsprofile',
                                                                    'companycommentsprofile',
                                                                    'companymembersprofile',
                                                                    'companyhistoryprofile',
                                                                    'companyprojectsprofile', 
                                                                    'companyprofilesettings',
                                                                    'companymtprofile',
                                                                    'clientspage',
                                                                    'sfmachines',
                                                                    'cprofileset',
                                                                    'cpgeneralset',
                                                                    'cpaddressset',
                                                                    'cpprodset',
                                                                    'cpmp',
                                                                    'cpmemberset',
                                                                    'cpreference', 
                                                                    'cmt',
                                                                    'projreg',
                                                                    'uprofset',
                                                                    'projpool',
                                                                    'signupconfirmation'
                                                                    ),
                                     'login' => array('index'),)
                   ),
        'consultant' => array(
                         'parent' => 'guest',
                         'action' => array('sfdm' => array ('index',
                                                            'profile',
                                                            'confirm',
                                                            'machinetest',
                                                            'acldefinition',
                                                            'imageupload'),
                                     'admin' => array('index'),
                                     'login' => array('index','logout'),
                                     'sanalfabrika' => array ('index',
                                                              'registration',
                                                              'login',
                                                              'cmt',
                                                              'prodsercat',
                                                              'cprofileset',
                                                              'cpgeneralset',
                                                              'cpaddressset',
                                                              'cpprodset',
                                                              'cpmp',
                                                              'cpmemberset',
                                                              'cpreference',
                                                              'projreg',
                                                              'uprofset',
                                                              'projpool',
                                                              'signupconfirmation'
                                                              )),
                   ),
        'supervisor' => array(
                         'parent' => 'consultant',
                         'action' => array('sfdm' => array ('index'))
                   ),
        'admin' => array(
                         'parent' => 'supervisor',
                         'action' => array('admin' => array ('index',
                                                            'menu',
                                                            'machctg',
                                                            'machprop',
                                                            'mach',
                                                            'unt',
                                                            'prodtypes',
                                                            'machattr',
                                                            'uniquemachprop',
                                                            'machpropdef',
                                                            'aclresources',
                                                            'aclroles',
                                                            'aclprivileges',
                                                            'aclroleprivilege',
                                                            'aclprivilegeservices',         
                                                            'menutypes',
                                                            'modules',
                                                            'actions',
                                                            'actionmenus',
                                                            'services',
                                                            'servicegroups',
                                                            'assigndef',
                                                            'assignrole',
                                                            'operationdef',
                                                            'consultants',
                                                            'assigncons',
                                                            'actionprivilegeservice',
                                                            'actionprivilege'),
                                           )
                   ),
        
        'new user' => array(
                         'parent' => 'guest',
                         'action' => array('sanalfabrika' => array ('cmt' , 
                                                                    'prodsercat',
                                                                    'cprofileset',
                                                                    'cpgeneralset',
                                                                    'cpaddressset',
                                                                    'cpprodset',
                                                                    'cpmp',
                                                                    'cpmemberset',
                                                                    'cpreference',
                                                                    'projreg',
                                                                    'uprofset',
                                                                    'projpool'
                                                                    ))
                   ),
        
        'firm user' => array(
                         'parent' => 'new user',
                         //'action' => array('sanalfabrika' => array ('index'))
                   ),
        'company apprentice' => array(
                         'parent' => 'new user',
                         //'action' => array('sanalfabrika' => array ('index'))
                   ),
        'firm owner' => array(
                         'parent' => 'firm user',
                         //'action' => array('sanalfabrika' => array ('index'))
                   ),    
        
    )*/
); 
