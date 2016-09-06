<?php

return array(
    'controllers' => array(
        'invokables' => array(
            'Signup\Controller\Signup' => 'Signup\Controller\SignupController',
        ),
    ),
    // The following section is new and should be added to your file
    'router' => array(
        'routes' => array(
            'signup' => array(
                'type' => 'segment',
                //'type'    => 'literal',  
                'options' => array(
                    'route' => '/signup[/:action]',
                    //'route'    => '/',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                    //'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Signup\Controller\Signup',
                        'action' => 'index',
                    ),
                ),
            ),
        ),
    ),
    'view_manager' => array(
        /* 'template_path_stack' => array(
          'admin' => __DIR__ . '/../view',
          ), */
        'template_map' => array(
            'layout/layout' => __DIR__ . '/../view/layout/signup.phtml',
            'signup/index/index' => __DIR__ . '/../view/signup/signup/index.phtml',
        /* 'error/404'               => __DIR__ . '/../view/error/404.phtml',
          'error/index'             => __DIR__ . '/../view/error/index.phtml', */
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
    ),
);

