<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Definitions\Controller\Definitions' => 'Definitions\Controller\DefinitionsController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'definitions' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '[/:lang]/ostim/sanalfabrika/definitions[/:action][/:id]',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                         'lang' => '((en)|(tr)|(ru)|(zh)|(de)|(ar)|(fa))',
                     ),
                     'defaults' => array(
                         'controller' => 'Definitions\Controller\Definitions',
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
            'layout/layout'           => __DIR__ . '/../view/layout/definitions.phtml',   
            'definitions/index/index' => __DIR__ . '/../view/definitions/definitions/index.phtml',  
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

