<?php

namespace Custom\Services\Authentication;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class FactoryServiceAuthenticatedRedirectManager  implements FactoryInterface{

    public function createService(ServiceLocatorInterface $serviceLocator) {

        $roleResult = $serviceLocator->get('serviceAclRoleFinder');
        print_r($roleResult);
        if(isset($roleResult['found'])) {
            $role = strtolower(trim($roleResult['resultSet'][0]['name']));
            //remove all whitespace from user role
            $role = preg_replace('/\s+/', '', $role);
            switch ($role) {
                case 'admin':
                    $serviceLocator->get('serviceAuthenticatedRedirectAdmin');
                    break;
                case 'supervisor':
                    $serviceLocator->get('serviceAuthenticatedRedirect');
                    break;
                case 'danışman':
                    $serviceLocator->get('serviceAuthenticatedRedirect');
                    break;
                case 'urge':
                    $serviceLocator->get('serviceAuthenticatedRedirectCluster');
                    break;
                case 'firmakullanıcıısı':
                    $serviceLocator->get('serviceAuthenticatedRedirectUser');
                    break;
                case 'firmasahibi':
                    $serviceLocator->get('serviceAuthenticatedRedirectUser');
                    break;
                case 'firmaçırak':
                    $serviceLocator->get('serviceAuthenticatedRedirectUser');
                    break;
                case 'ziyaretçi':
                    break;
                case 'yenikullanıcı':
                    break;
                default:
                    break;
            }
            return true;
        } else {
            return false;
        }  
        return false;
    }

}
