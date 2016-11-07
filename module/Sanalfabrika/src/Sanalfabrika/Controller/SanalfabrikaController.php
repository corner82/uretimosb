<?php

/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/sanalfabrika for the canonical source repository
 * @copyright Copyright (c) 2016 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */

namespace Sanalfabrika\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Session\Container;

class SanalfabrikaController extends AbstractActionController {

    public function indexAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');


        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
    }

    public function registrationAction() {

        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');


        $sessionManager = $this->getServiceLocator()
                ->get('SessionManagerDefault');
        $sessionID = $sessionManager->getId();

//        print_r($sessionID);
        /*
          $tabActivationController = $this->success last insert Id from okan first insert call
         * then based on this id i have to update data
         */

        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'sessionId' => $sessionID
        ));
        return $view;
    }

    public function loginAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        /*
          $tabActivationController = $this->success last insert Id from okan first insert call
         * then based on this id i have to update data
         */

        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        $this->ifLoggedinRedirect();
        $this->authenticate(null, $view);
        return $view;
    }

    public function signupconfirmationAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');

        $authKey = $this->params()->fromQuery('key', null);
        $authControl = $this->getServiceLocator()
                ->get('serviceAuthKeyControler');


        /*
          $tabActivationController = $this->success last insert Id from okan first insert call
         * then based on this id i have to update data
         */

        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'key' => $authKey
        ));
//        $this->authenticate(null, $view);
        return $view;
    }

    public function cmtAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyNpk');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
        ));
        $this->authenticate(null, $view);
        return $view;
    }

    public function prodsercatAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        $this->authenticate(null, $view);
        return $view;
    }

    public function userprofileAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        $this->authenticate(null, $view);
        return $view;
    }

    public function uprofsetAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        $this->authenticate(null, $view);
        return $view;
    }

    public function userprofilepersonalAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
    }

    public function userprofileusersAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
    }

    public function userprofileprojectsAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
    }

    public function userprofilecommentsAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
    }

    public function userprofilehistoryAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
    }

    public function userprofilesettingsAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
    }

//    public function cprofilesetAction() {
//        $langCode = $this->getServiceLocator()
//                ->get('serviceTranslator');
//        $requestUriRegulated = $this->getServiceLocator()
//                ->get('serviceTranslatorUrlRegulator');
//        $selectedCompanyShN = $this->getEvent()
//                        ->getRouteMatch()->getParam('selectedCompanyShN');
//        $selectedCompanyNpk = $this->getEvent()
//                        ->getRouteMatch()->getParam('selectedCompanyNpk');
//        $publicKey = $this->getServiceLocator()
//                ->get('servicePublicKeyReader');
//
//        $view = new ViewModel(array(
//            'requestUriRegulated' => $requestUriRegulated,
//            'langCode' => $langCode,
//            'selectedCompanyShN' => $selectedCompanyShN,
//            'selectedCompanyNpk' => $selectedCompanyNpk,
//            'publicKey' => $publicKey
//        ));
//        return $view;
//    }

    public function cpgeneralsetAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');

        $selectedCompanyNpk = $this->getServiceLocator()
                ->get('serviceNpkReader');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');
        $companyPublicKey = $this->getServiceLocator()
                ->get('serviceCompanyPublicKeyGenerator');


        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
        $sessionArr = $authManager->getStorage()->read();
        $sessionArr['npk'] = $selectedCompanyNpk;
        $sessionArr['cpk'] = $companyPublicKey;
        $authManager->getStorage()->write(
                $sessionArr
        );

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey,
            'companyPublicKey' => $companyPublicKey
        ));

        return $view;
    }

    public function cpaddresssetAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getServiceLocator()
                ->get('serviceNpkReader');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');
        $companyPublicKey = $this->getServiceLocator()
                ->get('serviceCompanyPublicKeyGenerator');

        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
        $sessionArr = $authManager->getStorage()->read();
        $sessionArr['npk'] = $selectedCompanyNpk;
//        $sessionArr['cpk'] = $companyPublicKey;
        $authManager->getStorage()->write(
                $sessionArr
        );

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey,
            'companyPublicKey' => $companyPublicKey
        ));

        return $view;
    }

    public function cpreferenceAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getServiceLocator()
                ->get('serviceNpkReader');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');


        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
        $sessionArr = $authManager->getStorage()->read();
        $sessionArr['npk'] = $selectedCompanyNpk;
        $authManager->getStorage()->write(
                $sessionArr
        );

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey,
            'companyPublicKey' => $companyPublicKey
        ));
        return $view;
    }

    public function cpmembersetAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getServiceLocator()
                ->get('serviceNpkReader');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');
        $companyPublicKey = $this->getServiceLocator()
                ->get('serviceCompanyPublicKeyGenerator');



        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
        $sessionArr = $authManager->getStorage()->read();
        $sessionArr['npk'] = $selectedCompanyNpk;
        $authManager->getStorage()->write(
                $sessionArr
        );

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey,
            'companyPublicKey' => $companyPublicKey
        ));
        return $view;
    }

    public function cpmpAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getServiceLocator()
                ->get('serviceNpkReader');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');
        $companyPublicKey = $this->getServiceLocator()
                ->get('serviceCompanyPublicKeyGenerator');



        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);


        $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
        $sessionArr = $authManager->getStorage()->read();
        $sessionArr['npk'] = $selectedCompanyNpk;
        $authManager->getStorage()->write(
                $sessionArr
        );

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey,
            'companyPublicKey' => $companyPublicKey
        ));
        return $view;
    }

    public function cpprodsetAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getServiceLocator()
                ->get('serviceNpkReader');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');
        $companyPublicKey = $this->getServiceLocator()
                ->get('serviceCompanyPublicKeyGenerator');



        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
        $sessionArr = $authManager->getStorage()->read();
        $sessionArr['npk'] = $selectedCompanyNpk;
        $authManager->getStorage()->write(
                $sessionArr
        );

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey,
            'companyPublicKey' => $companyPublicKey
        ));
        return $view;
    }

    public function companyprofileAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');
        /*
         * get npk from url
         */
        $selectedCompanyNpk = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyNpk');
        if ($selectedCompanyNpk == NULL) {
            $selectedCompanyNpk = $this->getServiceLocator()
                    ->get('serviceNpkReader');
        }
        /**
         * @author Mustafa Zeynel Dağlı
         * @since 12/07/2016
         * resource, role and privilege ACL class called
         */
        /* $acl = $this->getServiceLocator()
          ->get('serviceAclPrivilegeFinder'); */

        /**
         * @author Mustafa Zeynel Dağlı
         * @since 12/07/2016
         * acl class test in view layer
         */
//        $acl = $this->getServiceLocator()
//                    ->get('serviceAclRolePagesCreator');


        /*
         * write npk to session
         */
        $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
        $sessionArr = $authManager->getStorage()->read();
        $sessionArr['npk'] = $selectedCompanyNpk;
        $authManager->getStorage()->write(
                $sessionArr
        );



        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey,
                /**
                 * @author Mustafa Zeynel Dağlı
                 * @since 12/07/2016
                 * acl class test in view layer
                 */
                //'acl' => $acl
        ));
        return $view;
    }

    public function companyperformancemetersprofileAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyNpk');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    public function companyproductsprofileAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyNpk');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    public function companymembersprofileAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyNpk');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    public function companycommentsprofileAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyNpk');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    public function companyhistoryprofileAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $selectedCompanyNpk = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyNpk');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    public function companyprofilesettingsAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    public function companyprojectsprofileAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    public function companymtprofileAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $selectedCompanyShN = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyShN');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');
        $selectedCompanyNpk = $this->getEvent()
                        ->getRouteMatch()->getParam('selectedCompanyNpk');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
            'selectedCompanyShN' => $selectedCompanyShN,
            'selectedCompanyNpk' => $selectedCompanyNpk,
        ));
        return $view;
    }

    public function clientspageAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    public function sfmachinesAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    public function projregAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');
        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    public function projpoolAction() {
        $langCode = $this->getServiceLocator()
                ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                ->get('servicePublicKeyReader');
        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);

        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey
        ));
        return $view;
    }

    /**
     * if user logged in and still trying to hit login page,
     * system redirects to role main page
     * @author Mustafa Zeynel Dağlı
     * @since 18/08/2016
     */
    private function ifLoggedinRedirect() {
        $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
        if (!$authManager->getStorage()->isEmpty()) {
            $this->getServiceLocator()->get('serviceAuthenticatedRedirectManager');
        }
    }

    /** this function called by indexAction to reduce complexity of function */
    protected function authenticate($form = null, $viewModel = null) {
        $request = $this->getRequest();
        if ($request->isPost()) {
            $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
            // Create a validator chain and add validators to it
            $validatorChain = new \Zend\Validator\ValidatorChain();
            $validatorChain->attach(
                            new \Zend\Validator\StringLength(array('min' => 6,
                        'max' => 100)))
                    /* ->attach(new \Zend\I18n\Validator\Alnum()) */
                    ->attach(new \Zend\Validator\NotEmpty())
                    ->attach(new \Zend\Validator\EmailAddress());

            // Validate the email
            if ($validatorChain->isValid($_POST['eposta'])) {

                $authManager->getAdapter()
                        ->setIdentity($_POST['eposta'])
                        ->setCredential($_POST['sifre']);
                $result = $authManager->authenticate();
                //print_r($result);

                if ($result->getCode() == 1) {
                    /**
                     * creating a public key for every login operation
                     * @author Mustafa Zeynel Dağlı
                     * @since 04/01/2016
                     */
                    $publicKey = $this->getServiceLocator()->get('servicePublicKeyGenerator');
                    $npk = '';
                    $companyPublicKey = '';
                    //print_r($publicKey);

                    /**
                     * when public key not created service returns true,
                     * if public key true we should logout
                     * @author Mustafa Zeynel Dağlı
                     * @since 27/01/2016
                     */
                    if ($publicKey != true) {
                        $event = $this->getEvent();
                        $authManager->getStorage()->clear();
                        $response = $this->getResponse();
                        $url = $event->getRouter()->assemble(array('action' => 'index'), array('name' => 'sanalfabrika'));
                        $response->setHeaders($response->getHeaders()->addHeaderLine('Location', $url));
                        $response->setStatusCode(302);
                        $response->sendHeaders();
                        $event->stopPropagation();
                        exit();
                    }
                    //print_r($publicKey);
                    $this->getServiceLocator()->setService('identity', $result->getIdentity());
                    //print_r($this->getServiceLocator()->get('identity'));
                    $userID = null;
                    $userIDService = $this->getServiceLocator()->get('serviceUserIDFinder');
                    if (is_integer($userIDService))
                        $userID = $userIDService;
                    $userID = $userIDService;
                    $authManager->getStorage()->write(
                            array('id' => $userID,
                                'username' => $result->getIdentity(),
                                'ip_address' => $this->getRequest()->getServer('REMOTE_ADDR'),
                                'user_agent' => $request->getServer('HTTP_USER_AGENT'),
                                'pk' => $publicKey,
                                'npk' => $npk,
                                'cpk' => $companyPublicKey)
                    );


                    /**
                     * user role service will be tested
                     * @author Mustafa Zeynel Dağlı
                     * @since 28/01/2016
                     */
                    $this->getServiceLocator()->get('serviceRoleSessionWriter');
                    //print_r('---serviceRoleSessionWriter çağırıldı');


                    /**
                     * the public key cretaed is being inserted to database
                     * @author Mustafa Zeynel Dağlı
                     * @since 04/01/2016
                     */
                    $this->getServiceLocator()->get('servicePublicKeySaver');
                    //print_r('---servicePublicKeySaver çağırıldı');
                    //exit();

                    /**
                     * user login logged by rabbitMQ messaging
                     * @author Mustafa Zeynel Dağlı
                     * @since 17/03/2016
                     */
                    $this->getServiceLocator()->get('serviceLoginLogRabbitMQ');

                    /**
                     * redirecting after success
                     */
                    $this->getServiceLocator()->get('serviceAuthenticatedRedirectManager');
                }
            } else {
                $authManager->getStorage()->clear();
                $viewModel->notValidated = true;
            }
        }
    }

    public function addAction() {
        
    }

    public function editAction() {
        
    }

    public function deleteAction() {
        
    }

}
