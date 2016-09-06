<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Cluster\Controller\Cluster' => 'Cluster\Controller\ClusterController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'cluster' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/cluster[/:action][/:id]',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '([en]|[tr]|[fa]|[ru]|[ar]|[de]|[zh]){2}+',
                     ),
                     'defaults' => array(
                         'controller' => 'Cluster\Controller\Cluster',
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
            'layout/layout'           => __DIR__ . '/../view/layout/cluster.phtml',   
            'cluster/index/index' => __DIR__ . '/../view/cluster/cluster/index.phtml',
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

