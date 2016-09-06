<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Supervisor\Controller\Supervisor' => 'Supervisor\Controller\SupervisorController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'supervisor' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '[/:lang]/ostim/sanalfabrika/supervisor[/:action][/:id]',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                         'lang' => '((en)|(tr)|(ru)|(zh)|(de)|(ar)|(fa))', 
                     ),
                     'defaults' => array(
                         'controller' => 'Supervisor\Controller\Supervisor',
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
         'not_found_template'       => 'error/404',
         'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/supervisor.phtml',   
            'supervisor/index/index' => __DIR__ . '/../view/supervisor/supervisor/index.phtml',
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

