<?php

 return array(
     'controllers' => array(
         'invokables' => array(
             'Login\Controller\Login' => 'Login\Controller\LoginController',
             'Login\Controller\Logout' => 'Login\Controller\LogoutController',
         ),
     ),
      // The following section is new and should be added to your file
     'router' => array(
         'routes' => array(
             'login' => array(
                 'type'    => 'segment',
                 //'type'    => 'literal',  
                 'options' => array(
                     'route'    => '/login[/:action]',
                     //'route'    => '/',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         //'id'     => '[0-9]+',
                     ),
                     'defaults' => array(
                         'controller' => 'Login\Controller\Login',
                         'action'     => 'index',
                     ),
                 ),   
                 'may_terminate' => true,
                 'child_routes' => array(  
                    'logout' => array(
                    'type' => 'segment',
                        'options' => array(
                            'route' => '/logout',
                            'defaults' => array(
                                'controller' => 'Login\Controller\Login',
                                'action' => 'logout',
                            ),
                        ),
                    ),      
            ),
             /*'logout' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/logout[/:action][/:id]',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                     ),
                     'defaults' => array(
                         'controller' => 'Login\Controller\LogoutController',
                         'action'     => 'index',
                     ),
                 ),
             ),*/
         ),  
        ),
         
    ),
     'view_manager' => array(
         /*'template_path_stack' => array(
             'admin' => __DIR__ . '/../view',  
         ), */
         'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/login.phtml', 
            'login/index/index' => __DIR__ . '/../view/login/login/index.phtml',
            /*'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',*/
        ),
         'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
     ),
 );

