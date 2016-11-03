<?php

return array(
    'controllers' => array(
        'invokables' => array(
            'Uretimosb\Controller\Uretimosb' => 'Uretimosb\Controller\UretimosbController',
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
                        'controller' => 'Uretimosb\Controller\Uretimosb',
                        'action' => 'index',
                    ),
                ),
            ),
            
            'uretimosb' => array(
                'type' => 'segment',
                'options' => array(
                    'route' => '[/:lang]/uretimosb[/:action][/:id][/:selectedCompanyShN][/:selectedCompanyNpk]', 
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
                        'controller' => 'Uretimosb\Controller\Uretimosb',
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
            'layout/layout' => __DIR__ . '/../view/layout/uretimosb.phtml',
            'comics/index/index' => __DIR__ . '/../view/comics/comics/index.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
    ),
);

