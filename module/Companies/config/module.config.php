<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Companies\Controller\Companies' => 'Companies\Controller\CompaniesController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'companies' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '[/:lang]/ostim/sanalfabrika/companies[/:action][/:id]',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                         'lang' => '((en)|(tr)|(ru)|(zh)|(de)|(ar)|(fa))',
                     ),
                     'defaults' => array(
                         'controller' => 'Companies\Controller\Companies',
                         'action'     => 'index',
                     ),
                 ),
             ),
         ),
     ),
     'view_manager' => array(
         /*'template_path_stack' => array(
             'admin' => __DIR__ . '/../view',  
         ),*/  
         'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/companies.phtml',   
            'companies/index/index' => __DIR__ . '/../view/companies/companies/index.phtml', 
            'companies/index/registration' => __DIR__ . '/../view/companies/companies/registration.phtml', 
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

