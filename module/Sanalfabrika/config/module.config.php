<?php

return array(
    'controllers' => array(
        'invokables' => array(
            'Sanalfabrika\Controller\Sanalfabrika' => 'Sanalfabrika\Controller\SanalfabrikaController',
        //'Sanalfabrika\Controller\Sanalfabrika' => Controller\SanalfabrikaController::class
        ),
    ),
    // The following section is new and should be added to your file
    'router' => array(
        'routes' => array(
            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route' => '/',
                    'defaults' => array(
                        'controller' => 'Sanalfabrika\Controller\Sanalfabrika',
                        'action' => 'index',
                    ),
                ),
            ),
            /* 'sanalfabrika' => array(
              'type'    => 'Literal',
              'options' => array(
              'route'    => '/ostim/sanalfabrika',
              'defaults' => array(
              '__NAMESPACE__' => 'Sanalfabrika\Controller',
              'controller'    => 'Sanalfabrika',
              'action'        => 'index',
              ),
              ),
              'may_terminate' => true,
              'child_routes' => array(
              'default' => array(
              'type'    => 'Segment',
              'options' => array(
              'route'    => '/[:controller[/:action]]',
              'constraints' => array(
              'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
              'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
              ),
              'defaults' => array(
              ),
              ),
              ),
              ), */
            'sanalfabrika' => array(
                'type' => 'segment',
                'options' => array(
                    'route' => '[/:lang]/imalat/OSB[/:action][/:id][/:selectedCompanyShN][/:selectedCompanyNpk]', 
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id' => '[0-9]+',
//                        'id' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        //'lang' => '[a-zA-Z]{2}+',
                        //'lang' => '(([en])|(tr)|(fa)|[ru]|[ar]|[de]|[zh]){2}+',
                        'lang' => '((en)|(tr)|(ru)|(zh)|(de)|(ar)|(fa))',
                        'selectedCompanyNpk' => '[a-zA-Z][a-zA-Z0-9_-]*',
                    ),
                    'defaults' => array(
                        'controller' => 'Sanalfabrika\Controller\Sanalfabrika',
                        'action' => 'index',
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
                'type' => 'gettext',
                'base_dir' => __DIR__ . '/../../language',
                'pattern' => '%s.mo',
            ),
        ),
    ),
    'view_manager' => array(
        /* 'template_path_stack' => array(
          'admin' => __DIR__ . '/../view',
          ), */
        'template_map' => array(
            'layout/layout' => __DIR__ . '/../view/layout/sanalfabrika.phtml',
            'sanalfabrika/index/index' => __DIR__ . '/../view/sanalfabrika/sanalfabrika/index.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
    ),
);

