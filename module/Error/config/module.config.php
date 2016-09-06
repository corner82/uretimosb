<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Error\Controller\Error' => 'Error\Controller\ErrorController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             
             'error' => array(
                 'type'    => 'segment',
                 'options' => array(
                     //'route'    => '/ostim/sanalfabrika/error/[:lang][/:action]',   
                     'route'    => '/ostim/sanalfabrika/error/[/:action]',   
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         //'lang' => '((en)|(tr)|(ru)|(zh)|(de)|(ar)|(fa))',     
                     ),
                     'defaults' => array(
                         'controller' => 'Error\Controller\Error',
                         'action'     => 'index',
                     ),
                 ),
             ),
         ),
     ),
     'translator' => array(
        //'locale' => 'en_US',
        'locale' => 'tr_TR',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../../language',
                'pattern'  => '%s.mo',
            ),
        ),
    ),
     'view_manager' => array(
         /*'template_path_stack' => array(
             'admin' => __DIR__ . '/../view',  
         ),*/ 
         'not_found_template'       => 'error/404',
         'exception_template'       => 'error/index',
         'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/error.phtml',   
            'error/index/index' => __DIR__ . '/../view/errorview/error/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            /*'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

