
$(document).ready(function () {
    /**
     * multilanguage plugin 
     * @type Lang
     */
    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());

    /*
     * Signup.js variables
     * 
     */

    window.clickedButton;
    window.clickedForm;

    window.enteredEmailAddress;

    window.makePublicProfile = 0;
    window.makePublicAddress = 0;
    window.makeCommunicationPublic = 0;
    window.makePublicCompany = 0;

    window.selectedCountryId;
    window.selectedCityId;
    window.selectedDistrictId;
    window.selectedPreferedLanguageId;
    window.selectedAddTypeId;
    window.selectedCommunicationTypeId;
    window.defaultContactNumber;

    window.userGeneralInformationProgress = "0";
    window.userAddressInformationProgress = "0";
    window.userCommunicationInformationProgress = "0";
    window.overallRegistrationProgress = "0";

    /*
     * Content blocker
     */

//    contentBlocker = $("#tabsContentsSection").blockuiCentered();
//    contentBlockerWText = $("#tabsContentsSection").blockElementWithoutText();

    /*
     * Hide and show city input fields based on country dropdown input
     */

    $('#cityNameSection').show();
    $('#cityDropdownSection').hide();
    $('#districtDropdownSection').hide();

    /*
     * Disable finalize registration and submit user info before checking 
     * agreement terms and conditions...
     * @author: Bahram Lotfi Sadigh
     * @Since:2016.1.25
     */

    $('#userCommunicationInfoFormFinalize').addClass('disabled');
    $('#userCommunicationInfoFormSubmit').addClass('disabled');
    $('#userCommunicationInfoFormFinalize').attr('disabled', true);
    $('#userCommunicationInfoFormSubmit').attr('disabled', true);

    /* 
     * Validation binder
     * 
     */

    $("#userGeneralInfoForm").validationEngine({promptPosition: "topLeft:100%,0"});
    $("#userAddressInfoForm").validationEngine({promptPosition: "topLeft:100%,0"});
    $("#userCommunicationInfoForm").validationEngine({promptPosition: "topLeft:100%,0"});
    $("#companyInfoForm").validationEngine({promptPosition: "topLeft:100%,0"});

    /*
     * Buttons function binder
     */

    $('#userGeneralInfoFormSubmit').submit(submitUserGeneralInfoForm);
    $('#userAddressInfoFormSubmit').submit(submitUserAddressInfoForm);
//    $('#submitContactNumber').on('click', submitUserContactNumber);
    $("#userGeneralInfoFormReset").on('click', resetForm);
    $("#userAddressInfoFormReset").on('click', resetForm);
    $("#userCommunicationInfoFormReset").on('click', resetForm);
//    $("#userCommunicationInfoFormFinalize").submit(completeUserSubmissionProcess);
//    $("#submitUserCommunicationInfoForm").on('click', submitUserInfoForm);


    /*
     * Arrange buttons based on pktemp presence or absence
     * @author:Bahram
     * @Since: 2016.2.12
     */

    if (!$('#pktemp').val().length) {
        if ($('#userGeneralInfoForm') === '0') {
            $("#userGeneralInfoFormSubmit").
                    text(window.lang.translate("Register and Continue to Address Information"));
        } else {
            $("#userGeneralInfoFormSubmit").
                    text(window.lang.translate("Register and Continue to Address Information"));
            event.preventDefault();
        }
        if ($('#userAddressInfoForm') === '0') {
            $("#userAddressInfoFormSubmit").
                    text(window.lang.translate("Register and Continue to Communication Information"));
        } else {
            $("#userAddressInfoFormSubmit").
                    text(window.lang.translate("Register and Continue to Communication Information"));
        }
        if ($('#userCommunicationInfoForm') === '0') {
            $("#userCommunicationInfoFormSubmit").
                    text(window.lang.translate("Register and Continue to Company Information"));
        } else {
            $("#userCommunicationInfoFormSubmit").
                    text(window.lang.translate("Register and Continue to Company Information"));
        }
    } else {
        if ($('#userGeneralInfoForm') === '0') {
            $("#userGeneralInfoFormSubmit").
                    text(window.lang.translate("Register and Continue to Address Information"));
        } else {
            $("#userGeneralInfoFormSubmit").
                    text(window.lang.translate("Update and Continue to Address Information"));
        }
        if ($('#userAddressInfoForm') === '0') {
            $("#userAddressInfoFormSubmit").
                    text(window.lang.translate("Register and Continue to Communication Information"));
        } else {
            $("#userAddressInfoFormSubmit").
                    text(window.lang.translate("Update and Continue to Communication Information"));
        }
        if ($('#userCommunicationInfoForm') === '0') {
            $("#userCommunicationInfoFormSubmit").
                    text(window.lang.translate("Register and Continue to Company Information"));
        } else {
            $("#userCommunicationInfoFormSubmit").
                    text(window.lang.translate("Update and Continue to Company Information"));
        }
    }

});

var pktemp = $('#pktemp').val();


function checkUserName() {

    enteredEmailAddress = $('#useremail').val();
    $('#preferedUsername').val(enteredEmailAddress);
//        $('#preferedUsername').prop('disabled',true);

}


/*
 * Show or hide password content
 * @author: Bahram Lotfi Sadigh
 * @Since: 2016.2.1
 * 
 */

$('#showPassword').change(function () {
    var isChecked = $(this).prop('checked');
    if (isChecked) {
        $('#userPreferedPassword').attr('type', 'text');
        $('#repeatedUserPreferedPassword').attr('type', 'text');
    } else {
        $('#userPreferedPassword').attr('type', 'password');
        $('#repeatedUserPreferedPassword').attr('type', 'password');
    }
});

/*
 * Address types
 */

$.ajax({
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    data: {
        url: 'fillAddressTypes_sysSpecificDefinitions',
        language_code: $("#langCode").val(),
        component_type: 'ddslick'
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {
        if (data.length !== 0) {
            $('#addressTypesCombo').ddslick('destroy');
            $('#addressTypesCombo').ddslick({
                data: data,
                width: '100%',
                background: false,
                selectText: window.lang.translate("Please select a communication type from list..."),
                imagePosition: "right",
                onSelected: function (selectedData) {
                    selectedAddTypeId = selectedData.selectedData.value;
//                    console.log(selectedAddTypeId);
                    taskProgressPerTabs();
                    //callback function: do something with selectedData;
                }
            });
        } else {
            console.error('"fillAddressTypes_sysSpecificDefinitions" servis datasÄ± boÅŸtur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"fillAddressTypes_sysSpecificDefinitions" servis hatasÄ±->' + textStatus);
    }
});

/*
 * List of countries combobox ajax
 */

$.ajax({
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    data: {
        url: 'fillComboBox_syscountrys',
        language_code: $("#langCode").val(),
        component_type: 'ddslick'
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {
        if (data.length !== 0) {
            $('#usercountry').ddslick({
                data: data,
                width: '100%',
                height: '500%',
                background: false,
                selectText: window.lang.translate("Please select a country from list..."),
                imagePosition: 'right',
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value !== 0) {

                        window.cityList = selectedData.selectedData.attributes.citylist;
                        window.boroughList = false;
                    }
                    selectedCountryId = selectedData.selectedData.value;
//                    selectedCountryList = selectedData                    
                    userCityDropDownUpdate();
                    //callback function: do something with selectedData;
                }
            });
            $('#companyCountry').ddslick({
                data: data,
                width: '100%',
                height: '500%',
                background: false,
                selectText: window.lang.translate("Please select a country from list..."),
                imagePosition: 'right',
                onSelected: function (selectedData) {
                    selectedCompanyCountryId = selectedData.selectedData.value;
                }
            });
        } else {
            console.error('"fillComboBox_syscountrys" servis datasÄ± boÅŸtur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"fillComboBox_syscountrys" servis hatasÄ±->' + textStatus);
    }
});

/*
 * List of provinces combobox ajax 
 * based on selected country
 */

function userCityDropDownUpdate() {

    $("#usercity").empty();
    $("#userdistrict").empty();

    if (window.cityList === true) {
        $('#cityNameSection').hide();
        $('#cityDropdownSection').show();

    } else {
        $('#cityNameSection').show();
        $('#cityDropdownSection').hide();
    }

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscity',
            country_id: selectedCountryId,
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

                $('#usercity').ddslick('destroy');
                $('#usercity').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a city from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
//                        console.log(selectedData.selectedData);
                        selectedCityId = selectedData.selectedData.value;
                        if (selectedCityId !== 0) {
                            window.boroughList = selectedData.selectedData.attributes.boroughlist;
                        }
//                            console.log(selectedData);
//                            console.log(selectedCityId);
                        districtDropDownUpdate();
                        //callback function: do something with selectedData;
                    }
                });
            } else {
                console.error('"fillComboBox_syscity" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syscity" servis hatasÄ±->' + textStatus);
        }
    });
}

/*
 * List of districts combobox ajax 
 * based on selected country and province
 */

function districtDropDownUpdate() {

    $("#userdistrict").empty();
    $("#uservillage").empty();

    if (window.boroughList === true) {
        $('#districtDropdownSection').show();
    } else {
        $('#districtDropdownSection').hide();
    }

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_sysborough',
            country_id: selectedCountryId,
            city_id: selectedCityId,
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
//                console.log(data);
                $('#userdistrict').ddslick('destroy');
                $('#userdistrict').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a district from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        selectedDistrictId = selectedData.selectedData.value;
//                            console.log(selectedData);
//                            console.log(selectedDistrictId);
                        //callback function: do something with selectedData;
                    }
                });
            } else {
                console.error('"fillComboBox_sysborough" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_sysborough" servis hatasÄ±->' + textStatus);
        }
    });
}

/*
 * List of System languages combobox ajax
 */

$.ajax({
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    data: {
        url: 'fillComboBox_syslanguage',
        language_code: $("#langCode").val(),
        component_type: 'ddslick'
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {

        if (data.length !== 0) {
            $('#userPreferedLanguage').ddslick({
                data: data,
                width: '100%',
                background: false,
                selectText: window.lang.translate("Please select your prefered language from list..."),
                imagePosition: "right",
                onSelected: function (selectedData) {
                    selectedPreferedLanguageId = selectedData.selectedData.value;
                }
            });

        } else {
            console.error('"fillComboBox_syslanguage" servis datasÄ± boÅŸtur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"fillComboBox_syslanguage" servis hatasÄ±->' + textStatus);
    }
});


$.ajax({
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    data: {
        url: 'fillOwnershipType_sysSpecificDefinitions',
        language_code: $("#langCode").val(),
        component_type: 'ddslick'
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {

        if (data.length !== 0) {
            $('#companyOwnershipStatus').ddslick({
                data: data,
                width: '100%',
                background: false,
                selectText: window.lang.translate("Please select company ownership situation from list..."),
                imagePosition: "right",
                onSelected: function (selectedData) {
                    selectedOwnershipId = selectedData.selectedData.value;
                }
            });

        } else {
            console.error('"fillOwnershipType_sysSpecificDefinitions" servis datasÄ± boÅŸtur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"fillOwnershipType_sysSpecificDefinitions" servis hatasÄ±->' + textStatus);
    }
});

/*
 * Language bar on top of page...
 * @author:Bahram
 * @Since: 2016.2.12
 */

$.ajax({
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    data: {
        url: 'fillComboBox_syslanguage',
        language_code: $("#langCode").val()
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {
        if (data.length !== 0) {
            $.fn.multiLanguageBarSetter.defaults.requestUriTranslated = $("#requestUriRegulated").val();
            $.fn.multiLanguageBarSetter.defaults.langCode = $("#langCode").val();
            $.fn.multiLanguageBarSetter.defaults.basePath = '/imalat/OSB';
            $.fn.multiLanguageBarSetter.defaults.baseLanguage = 'tr';
            $(".languages").multiLanguageBarSetter(data);

        } else {
            console.error('"fillComboBox_syslanguage" servis datasÄ± boÅŸtur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"fillComboBox_syslanguage" servis hatasÄ±->' + textStatus);
    }
});


/*
 * List of communication types combobox ajax
 */

$.ajax({
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    data: {
        url: 'fillCommunicationsTypes_sysSpecificDefinitions',
        language_code: $("#langCode").val(),
        component_type: 'ddslick'
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {

        if (data.length !== 0) {
            $('#communicationTypes').ddslick({
                data: data,
                width: '100%',
                background: false,
                selectText: window.lang.translate("Select a Communication Type"),
                imagePosition: "right",
                onSelected: function (selectedData) {
                    selectedCommunicationTypeId = selectedData.selectedData.value;
//                        console.log(selectedData);
//                        console.log(selectedCommunicationTypeId);
                    //callback function: do something with selectedData;
                }
            });
        } else {
            console.error('"fillCommunicationsTypes_sysSpecificDefinitions" servis datasÄ± boÅŸtur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"fillCommunicationsTypes_sysSpecificDefinitions" servis hatasÄ±->' + textStatus);
    }
});

/*
 * Reset Form Elements
 * @Author: Bahram Lotfi Sadigh
 * @Since: 2016.1.21
 */

function resetForm() {

    event.stopImmediatePropagation();
    clickedButton = event.target;
    clickedForm = clickedButton.closest('form');
//    contentBlocker.blockElement('show');

    /*
     * Changes Growl icon to warning...
     * @author:Bahram Lotfi Sadigh
     * @Since:2016/2/1
     */

//    contentBlockerWText.blockElementWithoutText('show');
//    $('div.growlUI')
//            .css("background",
//                    "url(../../plugins/jquery-BlockUI/newWarning-1.png) no-repeat 10px 10px");


    var loader = $('#tabsContentsSection').loadImager();
    $('#tabsContentsSection').loadImager('appendImage');

    BootstrapDialog.confirm({
        title: window.lang.translate("Form Reset"),
        message: window.lang.translate("Are you sure to erase all form fields?"),
        type: BootstrapDialog.TYPE_WARNING,
        closable: false,
        // <-- Default value is BootstrapDialog.TYPE_PRIMARY
//        closable: true, // <-- Default value is false
//        draggable: true, // <-- Default value is false
        btnCancelLabel: window.lang.translate("Cancel"), // <-- Default value is 'Cancel',
        btnOKLabel: window.lang.translate("Reset"), // <-- Default value is 'OK',
        btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
        callback: function (result) {
            // result will be true if button was click, while it will be false if users close the dialog directly.
            if (result) {
                resetConfirmation();
                $('#tabsContentsSection').loadImager('removeLoadImage');
            } else {
                resetRejection();
                $('#tabsContentsSection').loadImager('removeLoadImage');
            }
        }
    });
}

/*
 * Confirm reset operation
 * @author:Bahram lotfi sadigh
 * @since:2016.1.26
 */

function resetConfirmation() {

    clickedForm.reset();
//    $.unblockUI();
//    $("#tabsContentsSection").unblock();
    event.preventDefault();
//    $('div.growlUI')
//            .css("background",
//                    "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");


    BootstrapDialog.show({
        title: window.lang.translate('Form Reset'),
        message: window.lang.translate('Form fields cleared'),
        type: BootstrapDialog.TYPE_SUCCESS,
//        closable: false
    });
    taskProgressPerTabs();
}

/*
 * Reject reset operation
 * @author:Bahram lotfi sadigh
 * @since:2016.1.26
 * 
 */

function resetRejection() {

//    $.unblockUI();
//    $("#tabsContentsSection").unblock();
    event.preventDefault();

//    $('div.growlUI')
//            .css("background",
//                    "url(../../plugins/jquery-BlockUI/

    BootstrapDialog.show({
        title: window.lang.translate('Form Reset'),
        message: window.lang.translate('Reset operation failed...'),
        type: BootstrapDialog.TYPE_DANGER,
//        closable: false
    });
}

/*
 * Submit User general information
 * @Author: Bahram Lotfi Sadigh
 * @Since: 2016.1.21
 */

function submitUserGeneralInfoForm() {

    if ($('#userGeneralInfoForm').validationEngine('validate')) {

        if ($("#pktemp").val().length) {
//            console.log('update' + $("#pktemp").val());
            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                data: {
                    url: 'pktempUpdate_infoUsers',
                    language_code: $("#langCode").val(),
                    name: $("#userFirstName").val(),
                    surname: $('#userLastName').val(),
                    username: $('#preferedUsername').val(),
//                    password: $('#userPreferedPassword').val(),
                    auth_email: $('#useremail').val(),
                    preferred_language: selectedPreferedLanguageId,
                    profile_public: makePublicProfile,
                    operation_type_id: 2,
                    active: 0,
                    act_parent_id: 0,
                    sessionId: $("#sessionId").val(),
                    pktemp: $("#pktemp").val()
                },
                method: "GET",
                dataType: "json",
                success: function (data) {

                    if (data['errorInfo'][0] === '00000') {
                        $("#checkGeneralForm").val("1");
                        $("#pktemp").val(data.pktemp);
                        pktemp = data.pktemp;
                        $('#lastInsertId').val(data.lastInsertId);
//                        console.log('update success: ' + data);
                        /*
                         * Changes Growl icon to success check...
                         * @author:Bahram Lotfi Sadigh
                         * @Since:2016/2/1
                         */
//                        $('div.growlUI')
//                                .css("background",
//                                        "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");
                        BootstrapDialog.show({
                            title: window.lang.translate('Submission Process'),
                            message: window.lang.translate('General information submitted successfully'),
                            type: BootstrapDialog.TYPE_SUCCESS,
//                            closable: false
                        });

                        $('#userGeneralInfo').attr('class', "tab-pane fade");
                        $('#userAddressInfo').attr('class', "tab-pane fade in active");
                        $('#userGeneralInfoTab').removeClass('active');
                        $('#userAddressInfoTab').addClass('active');
                        $('#userAddressInfoTab').removeClass('disabled');
                        /*
                         * OKan pktemp servisi yazilacak************************
                         * *****************************************************
                         */

                        taskProgressPerTabs();
                    } else if (data['errorInfo'] === '23505') {

//                        console.log('insert success: ' + data['errorInfo']);
//                        console.log(data);
                        var errorInfoColumn = data['errorInfoColumn'];
//                        console.log('erroInfoColumn value is: ' + errorInfoColumn);
                        if (errorInfoColumn === 'auth_email') {
                            /*
                             * Changes Growl icon to fail cross...
                             * @author:Bahram Lotfi Sadigh
                             * @Since:2016/2/1
                             */
//                            $('div.growlUI')
//                                    .css("background",
//                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            BootstrapDialog.show({
                                title: window.lang.translate('Submission Process'),
                                message: window.lang.translate('This email address has already been registered in the system'),
                                type: BootstrapDialog.TYPE_DANGER,
//                            closable: false

                            });

                        } else if (errorInfoColumn === 'username') {
//                            $('div.growlUI')
//                                    .css("background",
//                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            BootstrapDialog.show({
                                title: window.lang.translate('Submission Process'),
                                message: window.lang.translate('This username has already been registered in the system'),
                                type: BootstrapDialog.TYPE_DANGER,
//                            closable: false
                            });
                        }
                    } else if (data['errorInfo'] === '23502') {

//                        console.log('insert success: ' + data['errorInfo']);
//                        console.log(data);
//                        $('div.growlUI')
//                                .css("background",
//                                        "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                        BootstrapDialog.show({
                            title: window.lang.translate('Submission Process'),
                            message: window.lang.translate('System is unable to find required information'),
                            type: BootstrapDialog.TYPE_DANGER,
//                            closable: false
                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                    console.error('update error: ' + jqXHR);
                    console.error('update error text : ' + textStatus);
                    console.error('update error thrown : ' + errorThrown);
//                    $('div.growlUI')
//                            .css("background",
//                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('System is unable to find required information'),
                        type: BootstrapDialog.TYPE_DANGER,
//                            closable: false
                    });
                }
            });

        } else {
//            console.log('insert ' + $("#pktemp").val());
            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                data: {
                    url: 'tempInsert_infoUsers',
                    language_code: $("#langCode").val(),
                    name: $("#userFirstName").val(),
                    surname: $('#userLastName').val(),
                    username: $('#preferedUsername').val(),
//                    password: $('#userPreferedPassword').val(),
                    auth_email: $('#useremail').val(),
                    sessionId: $("#sessionId").val(),
                    preferred_language: selectedPreferedLanguageId,
                    profile_public: makePublicProfile
                },
                method: "GET",
                dataType: "json",
                success: function (data) {

                    if (data['errorInfo'][0] === '00000') {

                        $("#pktemp").val(data.pktemp);
                        pktemp = data.pktemp;
//                        console.log(pktemp);
                        $('#lastInsertId').val(data.lastInsertId);
                        $("#checkGeneralForm").val("1");
//                        console.log('insert success: ' + data['errorInfo'][0]);
//                        $('div.growlUI')
//                                .css("background",
//                                        "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");
                        BootstrapDialog.show({
                            title: window.lang.translate('Submission Process'),
                            message: window.lang.translate('General information submitted successfully'),
                            type: BootstrapDialog.TYPE_SUCCESS,
//                            closable: false
                        });
                        $('#userGeneralInfo').attr('class', "tab-pane fade");
                        $('#userAddressInfo').attr('class', "tab-pane fade in active");
                        $('#userGeneralInfoTab').removeClass('active');
                        $('#userAddressInfoTab').addClass('active');
                        $('#userAddressInfoTab').removeClass('disabled');

                        taskProgressPerTabs();

                    } else if (data['errorInfo'] === '23505') {

//                        console.log('insert success: ' + data['errorInfo']);
//                        console.log(data);
                        var errorInfoColumn = data['errorInfoColumn'];
//                        console.log('erroInfoColumn value is: ' + errorInfoColumn);
                        if (errorInfoColumn === 'auth_email') {
//                            $('div.growlUI')
//                                    .css("background",
//                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            BootstrapDialog.show({
                                title: window.lang.translate('Submission Process'),
                                message: window.lang.translate('This email address has already been registered in the system'),
                                type: BootstrapDialog.TYPE_DANGER,
//                            closable: false
                            });
                        } else if (errorInfoColumn === 'username') {
//                            $('div.growlUI')
//                                    .css("background",
//                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            BootstrapDialog.show({
                                title: window.lang.translate('Submission Process'),
                                message: window.lang.translate('This username has already been registered in the system'),
                                type: BootstrapDialog.TYPE_DANGER,
//                            closable: false
                            });
                        }
                    } else if (data['errorInfo'] === '23502') {

//                        console.log('insert success: ' + data['errorInfo']);
//                        console.log(data);
//                        $('div.growlUI')
//                                .css("background",
//                                        "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                        BootstrapDialog.show({
                            title: window.lang.translate('Submission Process'),
                            message: window.lang.translate('System is unable to find required information'),
                            type: BootstrapDialog.TYPE_DANGER,
//                            closable: false
                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                    console.error('insert error: ' + jqXHR);
                    console.error('insert error text : ' + textStatus);
                    console.error('insert error thrown : ' + errorThrown);
                    $("#checkGeneralForm").val("0");
//                    $('div.growlUI')
//                            .css("background",
//                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
//                    $('div.growlUI')
//                            .css("background",
//                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('System is unable to find required information'),
                        type: BootstrapDialog.TYPE_DANGER,
//                            closable: false
                    });
                }
            });
        }
        $("html, body").animate({scrollTop: 0}, "slow");
        event.preventDefault();
    }
}

/*
 * Submit User address information
 * @Author: Bahram Lotfi Sadigh
 * @Since: 2016.1.23
 */
function submitUserAddressInfoForm() {

    if (selectedAddTypeId != '-1') {
        if (selectedCountryId != '-1') {
            if ($('#userAddressInfoForm').validationEngine('validate')) {
                if (selectedCountryId === 91) {
                    console.log("Yessss");
                    $.ajax({
                        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                        data: {
                            url: 'pktempInsert_infoUsersAddresses',
                            pktemp: $("#pktemp").val(),
                            profile_public: makePublicAddress,
                            language_code: $("#langCode").val(),
                            operation_type_id: '1',
                            address_type_id: selectedAddTypeId,
                            address1: $('#userAddress1').val(),
                            address2: $('#userAddress2').val(),
                            postal_code: $('#userPostalCode').val(),
                            country_id: selectedCountryId,
                            city_id: selectedCityId,
                            borough_id: selectedDistrictId,
                            city_name: "",
                            description: $('#addressDescription').val()
                        },
                        method: "GET",
                        dataType: "json",
                        success: function (data) {
                            if (data['errorInfo'][0] === '00000') {

//                        $("#pktemp").val(data.pktemp);
                                $('#lastInsertId').val(data.lastInsertId);
                                $("#checkGeneralForm").val("1");
//                        console.log('insert success: ' + data['errorInfo'][0]);
//                        
                                BootstrapDialog.show({
                                    title: window.lang.translate('Submission Process'),
                                    message: window.lang.translate('Address information submitted successfully'),
                                    type: BootstrapDialog.TYPE_SUCCESS,
//                            closable: false

                                });
                                $('#checkAddressForm').val('1');
                                $('#userAddressInfo').attr('class', "tab-pane fade");
                                $('#userCommunicationInfo').attr('class', "tab-pane fade in active");
                                $('#userAddressInfoTab').removeClass('active');
                                $('#userCommunicationInfoTab').addClass('active');
                                $('#userCommunicationInfoTab').removeClass('disabled');
                                taskProgressPerTabs();
                            }
                        }, error: function (jqXHR, textStatus, errorThrown) {

                            console.error(jqXHR);
                            console.error(textStatus);
                            console.error(errorThrown);
                            $("#checkAddressForm").val("0");

                            BootstrapDialog.show({
                                title: window.lang.translate('Submission Process'),
                                message: window.lang.translate('Address information submission failed'),
                                type: BootstrapDialog.TYPE_DANGER,
//                            closable: false

                            });
                        }
                    });
                } else {
                    console.log("Nooooo");
                    $.ajax({
                        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                        data: {
                            url: 'pktempInsert_infoUsersAddresses',
                            pktemp: $("#pktemp").val(),
                            profile_public: makePublicAddress,
                            language_code: $("#langCode").val(),
                            operation_type_id: '1',
                            address_type_id: selectedAddTypeId,
                            address1: $('#userAddress1').val(),
                            address2: $('#userAddress2').val(),
                            postal_code: $('#userPostalCode').val(),
                            country_id: selectedCountryId,
                            city_id: "0",
                            borough_id: "0",
                            city_name: $('#userCityName').val(),
                            description: $('#addressDescription').val()
                        },
                        method: "GET",
                        dataType: "json",
                        success: function (data) {

                            if (data['errorInfo'][0] === '00000') {

//                        $("#pktemp").val(data.pktemp);
                                $('#lastInsertId').val(data.lastInsertId);
                                $("#checkGeneralForm").val("1");
//                        console.log('insert success: ' + data['errorInfo'][0]);
                                BootstrapDialog.show({
                                    title: window.lang.translate('Submission Process'),
                                    message: window.lang.translate('Address information submitted sucessfully'),
                                    type: BootstrapDialog.TYPE_SUCCESS,
//                            closable: false

                                });
                                $('#checkAddressForm').val('1');
                                $('#userAddressInfo').attr('class', "tab-pane fade");
                                $('#userCommunicationInfo').attr('class', "tab-pane fade in active");
                                $('#userAddressInfoTab').removeClass('active');
                                $('#userCommunicationInfoTab').addClass('active');
                                $('#userCommunicationInfoTab').removeClass('disabled');
                                $('#primaryTabs a[href ="#userCommunicationInfo"]').tab('show');
                                taskProgressPerTabs();
                            }
                        }, error: function (jqXHR, textStatus, errorThrown) {

                            console.error(jqXHR);
                            console.error(textStatus);
                            console.error(errorThrown);
                            $("#checkAddressForm").val("0");
                            BootstrapDialog.show({
                                title: window.lang.translate('Submission Process'),
                                message: window.lang.translate('Address information submission failed'),
                                type: BootstrapDialog.TYPE_DANGER,
//                            closable: false
                            });
                        }
                    });
                }
                $("html, body").animate({scrollTop: 0}, "slow");
                event.preventDefault();
            }
        } else {
            BootstrapDialog.show({
                title: window.lang.translate('Submission Process'),
                message: window.lang.translate('Please select a country from list...'),
                type: BootstrapDialog.TYPE_WARNING,
//                            closable: false
            });
            $("html, body").animate({scrollTop: $("#usercountry").offset().top}, "slow");
            event.preventDefault();
        }
    } else {
        BootstrapDialog.show({
            title: window.lang.translate('Submission Process'),
            message: window.lang.translate('Please select an address type...'),
            type: BootstrapDialog.TYPE_WARNING,
//                            closable: false
        });
        $("html, body").animate({scrollTop: $("#addressTypesCombo").offset().top}, "slow");
        event.preventDefault();
    }
}

/*
 * Check default contact number check box
 * @author:Bahram
 * @Since: 2016.2.11
 */

function defContactNumber() {

    if ($('#defaultContactNumber').is(':checked')) {
        defaultContactNumber = 1;
    } else {
        defaultContactNumber = 0;
    }
}

/*
 * Submit User address information
 * @Author: Bahram Lotfi Sadigh
 * @Since: 2016.2.1
 */

function submitUserContactNumber() {
    event.preventDefault();
    event.stopImmediatePropagation();
    defContactNumber();

    if (selectedCommunicationTypeId != '-1') {
        if ($('#userCommunicationInfoForm').validationEngine('validate')) {

            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
////                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                data: {
                    url: 'pktempInsert_infoUsersCommunications',
                    pktemp: pktemp,
                    profile_public: makeCommunicationPublic,
                    language_code: $("#langCode").val(),
                    communications_type_id: selectedCommunicationTypeId,
                    communications_no: $('#contactNumber').val(),
                    description: $('#contactDescription').val(),
                    description_eng: '',
                    default_communication_id: defaultContactNumber
                },
                method: "GET",
                dataType: "json",
                success: function (data) {
                    if (data['errorInfo'][0] === '00000') {
//                    $('div.growlUI')
//                            .css("background",
//                                    "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");
                        BootstrapDialog.show({
                            title: window.lang.translate('Submission Process'),
                            message: window.lang.translate('Contact information submitted successfully'),
                            type: BootstrapDialog.TYPE_SUCCESS,
//                            closable: false
                        });
                        $('#userGeneralInfoForm').val('1');
                        $('#userAddressInfoForm').val('1');
                        $('#userCommunicationInfoForm').val('1');
                        $("#userCommunicationInfoForm").trigger('reset');
                        taskProgressPerTabs();
                    }
                }
                , error: function (jqXHR, textStatus, errorThrown) {
//
                    console.error(jqXHR);
                    console.error(textStatus);
                    console.error(errorThrown);
                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('Contact information submission failed'),
                        type: BootstrapDialog.TYPE_DANGER,
//                            closable: false
                    });
                }
            });

            $("html, body").animate({scrollTop: 0}, "slow");
            event.preventDefault();
        }
    } else {
        BootstrapDialog.show({
            title: window.lang.translate('Submission Process'),
            message: window.lang.translate('Please select contact type'),
            type: BootstrapDialog.TYPE_WARNING,
//                            closable: false
        });
        $("html, body").animate({scrollTop: $("#communicationTypes").offset().top}, "slow");
        event.preventDefault();
    }
}

/*
 * Submit User Info form and continues to company general info page
 * @author: Bahram
 * @Since: 2016.1.8
 */

function submitUserInfoForm() {

    if ($('#userCommunicationInfoForm').validationEngine('validate')) {

//        var loader = $('#tabsContentsSection').loadImager();
//        $('#tabsContentsSection').loadImager('appendImage');
        BootstrapDialog.show({
            title: window.lang.translate('Submission Process'),
            message: window.lang.translate('Congratulations! User information submitted sucessfully. \n\
            You will be directed to the system main page. \n\
            An email sent to your submitted email address.\n\
            Please click on provided confirmation link to activate your account and set your password to log in to the system.\n\
            System consultant will call you soon to proceed registration confirmation procedure.\n\
            '),
            type: BootstrapDialog.TYPE_SUCCESS,
//                            closable: false
//            buttons: [{
//                    label: 'OK',
//                    cssClass: 'btn-success',
//                    action: function () {
//                        $('#tabsContentsSection').loadImager('removeLoadImage');
//                    }
//                }]
        });

        $('#userCommunicationInfoForm').val('1');

        $('#userCommunicationInfo').attr('class', 'tab-pane fade');
        $('#companyInfo').attr('class', 'tab-pane fade in active');
        $('#userCommunicationInfoTab').removeClass('active');
        $('#companyInfoTab').addClass('active');
        $('#companyInfoTab').removeClass('disabled');
    }

    $("html, body").animate({scrollTop: 0}, "slow");
    event.preventDefault();
}

/*
 * Complete user information submission process and go to home page..
 * @author: Bahram Lotfi Sadigh
 * @Since: 2016.2.11
 */

function completeUserSubmissionProcess() {

    event.stopImmediatePropagation();

    if ($('#userCommunicationInfoForm').validationEngine('validate')) {


//        var loader = $('#tabsContentsSection').loadImager();
//        $('#tabsContentsSection').loadImager('appendImage');

        if ($('#userGeneralInfoForm').val() === '1') {

            if ($('#userAddressInfoForm').val() === '1') {

                if ($('#userCommunicationInfoForm').val() === '1') {

                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('User information submission completed successfully. \n\
            You will be directed to the system main page. \n\
            An email sent to your submitted email address.\n\
            Please click on provided confirmation link to activate your account and login to the system.\n\
            '),
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                                icon: 'glyphicon glyphicon-check',
                                label: 'OK',
                                cssClass: 'btn-success',
                                action: function () {
//                                    $('#tabsContentsSection').loadImager('removeLoadImage');
                                    window.location.href =
                                            "/imalat/OSB";
                                }
                            }],
                        closable: false
                    });
                } else {
                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('Please fill user communication information first'),
                        type: BootstrapDialog.TYPE_WARNING,
                        closable: false,
                        buttons: [{
                                icon: 'glyphicon glyphicon-check',
                                label: 'OK',
                                cssClass: 'btn-warning',
                                action: function () {
//                                    $('#tabsContentsSection').loadImager('removeLoadImage');
                                    $("html, body").animate({scrollTop: 0}, "slow");
                                    event.preventDefault();
                                }
                            }]
                    });
                }
            } else {
                BootstrapDialog.show({
                    title: window.lang.translate('Submission Process'),
                    message: window.lang.translate('Please fill user address information form first'),
                    type: BootstrapDialog.TYPE_WARNING,
                    closable: false,
                    buttons: [{
                            icon: 'glyphicon glyphicon-check',
                            label: 'OK',
                            cssClass: 'btn-warning',
                            action: function () {
//                                $('#tabsContentsSection').loadImager('removeLoadImage');
                                window.location.href =
                                        "/imalat/OSB/registration#userAddressInfoForm";
                                event.preventDefault();
                            }
                        }]
                });
            }
        } else {
            BootstrapDialog.show({
                title: window.lang.translate('Submission Process'),
                message: window.lang.translate('Please fill user general information form first'),
                type: BootstrapDialog.TYPE_WARNING,
                closable: false,
                buttons: [{
                        icon: 'glyphicon glyphicon-check',
                        label: 'OK',
                        cssClass: 'btn-warning',
                        action: function () {
//                            $('#tabsContentsSection').loadImager('removeLoadImage');
                            window.location.href =
                                    "/imalat/OSB/registration#userGeneralInfoForm";
                            event.preventDefault();
                        }
                    }]
            });
        }
    }
}

function companyInfoSubmission() {

    if ($('#companyInfoForm').validationEngine('validate')) {


//        var loader = $('#tabsContentsSection').loadImager();
//        $('#tabsContentsSection').loadImager('appendImage');

        $.ajax({
            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            //                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
            data: {url: 'pktempInsert_infoFirmProfile',
                pktemp: pktemp,
                language_code: $("#langCode").val(),
                profile_public: makePublicCompany,
                country_id: selectedCompanyCountryId,
                ownership_status_id: selectedOwnershipId,
                firm_name: $('#companyName').val(),
                firm_name_short: $('#companyShortName').val(),
                tax_office: $('#companyTaxOffice').val(),
                tax_no: $('#companyTaxNumber').val(),
                sgk_sicil_no: $('#companySocialSecurityNumber').val(),
                foundation_year: $('#companyFoundationDate').val(),
                foundation_yearx: window.okan,
                duns_number: $('#companyDUNSNumber').val(),
                description: $('#companyDescription').val(),
                web_address: $('#companyWebAddress').val()

            },
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data['errorInfo'][0] === '00000') {

//                    console.log('insert success: ' + data['errorInfo'][0]);

//                    $('div.growlUI')
//                            .css("background",
//                                    "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");
                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('Company information submitted successfully. \n\
            You will be directed to the system main page. \n\
            An email sent to your submitted email address.\n\
            Please click on provided confirmation link to activate your account and login to the system.\n\
            System consultant will call you soon to proceed registration confirmation procedure.\n\
            '),
                        type: BootstrapDialog.TYPE_SUCCESS,
//                            closable: false
//                        buttons: [{
//                                label: 'Ok',
//                                cssClass: 'btn-success',
//                                action: function () {
//                                    $('#tabsContentsSection').loadImager('removeLoadImage');
//                                }
//                            }]
                    });
                    taskProgressPerTabs();
                    window.location.href =
                            "/imalat/OSB";
                } else if (data['errorInfo'] === '23505') {
                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('Company information submission failed. There is already a registered company with the same name in the system. '),
                        type: BootstrapDialog.TYPE_WARNING,
//                  closable: false
                    });
                }
            }
            , error: function (jqXHR, textStatus, errorThrown) {

                console.error(jqXHR);
                console.error(textStatus);
                console.error(errorThrown);
                $("#checkAddressForm").val("0");
                BootstrapDialog.show({
                    title: window.lang.translate('Submission Process'),
                    message: window.lang.translate('Company information submission failed.'),
                    type: BootstrapDialog.TYPE_WARNING,
//                  closable: false
                });

            }
        });
    }
    $('#contactsListSection').html();
    $("html, body").animate({scrollTop: 0}, "slow");
    event.preventDefault();

}


function activateButtons() {
    if ($("#terms").attr("checked") === "checked") {
//        console.log('yes');
        $('#userCommunicationInfoFormFinalize').attr("disabled", false);
        $('#userCommunicationInfoFormSubmit').attr("disabled", false);
    } else {
//        console.log('no');
        $('#userCommunicationInfoFormFinalize').attr("disabled", true);
        $('#userCommunicationInfoFormSubmit').attr("disabled", true);
    }
}


/*
 * Function: Checks tabs (in this function user address info tab) activation, 
 * based on user general information form conditions. 
 * @author: bahram lotfi sadigh
 * @since: 2016.1.26
 */


function checkUGI() {

    if ($("#checkGeneralForm").val() === "1") {

    } else if ($("#checkGeneralForm").val() === "0") {

        if ($('#userAddressInfoTab').hasClass('active')) {

        } else if ($('#userAddressInfoTab').hasClass('disabled')) {

//            contentBlockerWText.blockElementWithoutText('show');

//            $('div.growlUI')
//                    .css("background",
//                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");

            var loader = $('#tabsContentsSection').loadImager();
            $('#tabsContentsSection').loadImager('appendImage');

            //alert('test');
            BootstrapDialog.show({
                title: window.lang.translate('Warning'),
                message: window.lang.translate('Please fill user general information form first'),
                type: BootstrapDialog.TYPE_WARNING,
                closable: false,
                buttons: [{
                        label: 'Close',
                        action: function (dialogItself) {
                            $('#tabsContentsSection').loadImager('removeLoadImage');
                            dialogItself.close();
                            onclick:{
                                preventTab();
                            }
                        }
                    }]
            });
        }
    }
}

/*
 * Function: Checks tabs (in this function user communication info tab) activation, 
 * based on user address information form conditions. 
 * @author: bahram lotfi sadigh
 * @since: 2016.1.26
 */

function checkUAI() {

    if ($("#checkAddressForm").val() === "1") {

    } else if ($("#checkAddressForm").val() === "0") {

        if ($('#userCommunicationInfoTab').hasClass('active')) {

        } else if ($('#userCommunicationInfoTab').hasClass('disabled')) {

//            contentBlockerWText.blockElementWithoutText('show');
//            $('div.growlUI')
//                    .css("background",
//                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");


            var loader = $('#tabsContentsSection').loadImager();
            $('#tabsContentsSection').loadImager('appendImage');

            BootstrapDialog.show({
                title: window.lang.translate('Warning'),
                message: window.lang.translate('Please fill user general and address information forms first'),
                type: BootstrapDialog.TYPE_WARNING,
                closable: false,
                buttons: [{
                        label: 'Close',
                        action: function (dialogItself) {
                            dialogItself.close();
                            onclick:{
                                preventTab();
                                $('#tabsContentsSection').loadImager('removeLoadImage');
                            }
                        }
                    }]
            });
        }
    }
}

/*
 * Function: Checks tabs (in this function user communication info tab) activation, 
 * based on user address information form conditions. 
 * @author: bahram lotfi sadigh
 * @since: 2016.1.26
 */

function checkCI() {

    if ($("#checkCommunicationForm").val() === "1") {

    } else if ($("#checkCommunicationForm").val() === "0") {

        if ($('#companyInfoTab').hasClass('disabled')) {

//            contentBlockerWText.blockElementWithoutText('show');
//            $('div.growlUI')
//                    .css("background",
//                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");


            var loader = $('#tabsContentsSection').loadImager();
            $('#tabsContentsSection').loadImager('appendImage');

            BootstrapDialog.show({
                title: window.lang.translate('Warning'),
                message: window.lang.translate('Please fill user information forms first'),
                type: BootstrapDialog.TYPE_WARNING,
                closable: false,
                buttons: [{
                        label: 'Close',
                        action: function (dialogItself) {
                            dialogItself.close();
                            onclick:{
                                preventTab();
                                $('#tabsContentsSection').loadImager('removeLoadImage');
                            }
                        }
                    }]
            });
        }
    }
}


/*
 * Function to prevent openning of unallowed tab and return to previous tab
 * @author:Bahram lotfi sadigh
 * @since:2016.1.26
 * 
 */

function preventTab() {

//    $.unblockUI();
//    $("#tabsContentsSection").unblock();
    event.preventDefault();
    if ($("#checkCommunicationForm").val() === "1") {
        $("#companyInfoTab").addClass('active');
    } else {
        $("#companyInfoTab").removeClass('active');
        $("#companyInfoTab").addClass('disabled');
        if ($("#checkAddressForm").val() === "1") {
            $("#userCommunicationInfoTab").addClass('active');
            $('#primaryTabs a[href ="#userCommunicationInfo"]').tab('show');
        } else {
            if ($("#checkGeneralForm").val() === "1") {
                $('#primaryTabs a[href ="#userAddressInfo"]').tab('show');
            } else {
                $('#primaryTabs li:eq(0) a').tab('show');
            }
        }
    }
}

function changePublicProfile() {

    if ($("#makePublicProfile").attr('checked') === 'checked') {
        makePublicProfile = '0';
    } else {
        makePublicProfile = '1';
    }
}

function changePublicAddress() {

    if ($("#makePublicAddress").attr('checked') === 'checked') {
        makePublicAddress = '0';
    } else {
        makePublicAddress = '1';
    }
}

function changePublicCommunication() {

    if ($("#makeCommunicationPublic").attr('checked') === 'checked') {
        makeCommunicationPublic = '0';
    } else {
        makeCommunicationPublic = '1';
    }

}

function changePublicCompany() {

    if ($("#changePublicCompany").attr('checked') === 'checked') {
        changePublicCompany = '0';
    } else {
        changePublicCompany = '1';
    }

}

/*
 * Task progress bars control function
 * @author: Bahram Lotfi
 * @Since: 2016.2.1
 * 
 */

function taskProgressPerTabs() {

    if ($('#checkGeneralForm').val() === '0') {

        userGeneralInformationProgressNumber = 0;
        overallRegistrationProgressNumber = 0;

        if ($('#userFirstName').val()) {
            userGeneralInformationProgressNumber += 20;
            overallRegistrationProgressNumber += 6;
//            console.log($('#userFirstName').val());
//            console.log(userGeneralInformationProgressNumber);
//            console.log(overallRegistrationProgressNumber);
        }
        if ($('#userLastName').val()) {
            userGeneralInformationProgressNumber += 20;
            overallRegistrationProgressNumber += 6;
//            console.log($('#userLastName').val());
//            console.log(userGeneralInformationProgressNumber);
//            console.log(overallRegistrationProgressNumber);
        }
        if ($('#preferedUsername').val()) {
            userGeneralInformationProgressNumber += 20;
            overallRegistrationProgressNumber += 6;
        }
        if ($('#useremail').val()) {
            if (!$('#useremail').validationEngine('validate')) {
                userGeneralInformationProgressNumber += 20;
                overallRegistrationProgressNumber += 6;
            }
        }
        if ($('#userPreferedPassword').val()) {
            if (!$('#userPreferedPassword').validationEngine('validate')) {
                userGeneralInformationProgressNumber += 20;
                overallRegistrationProgressNumber += 6;
            }
        }
        userGeneralInformationProgress = userGeneralInformationProgressNumber.toString();
        $("#userGeneralInfoRegistrationProgress").
                html(userGeneralInformationProgress + '%');
        $("#userGeneralInfoRegistrationProgressStyle").
                css({"width": userGeneralInformationProgress +
                            '%', "aria-valuenow": userGeneralInformationProgress});
        /*
         * popup a prompt on task progress and hide after 3 secs.
         */

        if (userGeneralInformationProgressNumber === 100) {

            $("#userGeneralInfoRegistrationProgress").validationEngine(
                    'showPrompt',
                    'You may now continue to Address section ...',
                    'load',
                    true);
            setTimeout(function () {
                $('#userGeneralInfoRegistrationProgress').validationEngine('hide');
            }, 3000);
        }
        overallRegistrationProgress = overallRegistrationProgressNumber.toString();
        $("#overallRegistrationProgress").
                html(overallRegistrationProgress + '%');
        $("#overallRegistrationProgressStyle").
                css({"width": overallRegistrationProgress +
                            '%', "aria-valuenow": overallRegistrationProgress});
    } else if ($('#checkGeneralForm').val() === '1') {
        if ($('#checkAddressForm').val() === '0') {

            userAddressInformationProgressNumber = 0;
            overallRegistrationProgressNumber = 30;
            if (selectedAddTypeId === "-1") {
                userAddressInformationProgressNumber += 25;
            }
            if (selectedCountryId === "91") {
                userAddressInformationProgressNumber += 25;
                if (selectedCityId >= 0) {
                    userAddressInformationProgressNumber += 15;
                }
                if (selectedDistrictId >= 0) {
                    userAddressInformationProgressNumber += 10;
                }
            } else if (selectedCountryId === "-1") {

            } else {
                userAddressInformationProgressNumber += 25;
                if ($('#userCityName').val()) {
                    userAddressInformationProgressNumber += 25;
                }
            }
            if ($('#userAddress1').val()) {
                userAddressInformationProgressNumber += 10;
            }
            if ($('#userAddress2').val()) {
                userAddressInformationProgressNumber += 10;
            }
            if ($('#userPostalCode').validationEngine('validate')) {
                userAddressInformationProgressNumber += 5;
            }
            userAddressInformationProgress = userAddressInformationProgressNumber.toString();
            $("#userAddressInfoRegistrationProgress").
                    html(userAddressInformationProgress + '%');
            $("#userAddressInfoRegistrationProgressStyle").
                    css({"width": userAddressInformationProgress +
                                '%', "aria-valuenow": userAddressInformationProgress});
            overallRegistrationProgress = overallRegistrationProgressNumber.toString();
            $("#overallRegistrationProgress").
                    html(overallRegistrationProgress + '%');
            $("#overallRegistrationProgressStyle").
                    css({"width": overallRegistrationProgress +
                                '%', "aria-valuenow": overallRegistrationProgress});
            /*
             * popup a prompt on task progress and hide after 3 secs.
             */

            if (userAddressInformationProgressNumber === 100) {

                $("#userAddressInfoRegistrationProgress").validationEngine(
                        'showPrompt',
                        'You may now continue to communication section ...',
                        'load',
                        true);
                setTimeout(function () {
                    $('#userAddressInfoRegistrationProgress').validationEngine('hide');
                }, 3000);
            }
        } else if ($('#checkGeneralForm').val() === '1') {
            if ($('#checkAddressForm').val() === '1') {
                if ($('#checkCommunicationForm').val() === '0') {


                    userCommunicationInformationProgressNumber = 0;
                    overallRegistrationProgressNumber = 60;
                    if (!selectedCommunicationTypeId === '-1') {
                        userCommunicationInformationProgressNumber += 50;
                        overallRegistrationProgressNumber += 15;
                    }

                    if ($('#contactNumber').val()) {
                        userCommunicationInformationProgressNumber += 50;
                        overallRegistrationProgressNumber += 15;
                    }

                    if ($("#terms").attr("checked") === "checked") {
                        overallRegistrationProgressNumber += 10;
                    }

                    userCommunicationInfoRegistrationProgress = userCommunicationInformationProgressNumber.toString();
                    overallRegistrationProgress = overallRegistrationProgressNumber.toString();
                    $("#userCommunicationInfoRegistrationProgress").
                            html(userCommunicationInfoRegistrationProgress + '%');
                    $("#userCommunicationInfoRegistrationProgressStyle").
                            css({"width": userCommunicationInfoRegistrationProgress +
                                        '%', "aria-valuenow": userCommunicationInfoRegistrationProgress});
                    overallRegistrationProgress = overallRegistrationProgressNumber.toString();
                    $("#overallRegistrationProgress").
                            html(overallRegistrationProgress + '%');
                    $("#overallRegistrationProgressStyle").
                            css({"width": overallRegistrationProgress +
                                        '%', "aria-valuenow": overallRegistrationProgress});
                    /*
                     * popup a prompt on task progress and hide after 3 secs.
                     */

                    if (userCommunicationInformationProgressNumber === 100) {

                        if ($("#terms").attr("checked") === "checked") {

                            $("#userCommunicationInfoRegistrationProgress").validationEngine(
                                    'showPrompt',
                                    'You may now continue to company section ...',
                                    'load',
                                    true);
                            setTimeout(function () {
                                $('#userCommunicationInfoRegistrationProgress').validationEngine('hide');
                            }, 3000);
                        } else {
                            $("#userCommunicationInfoRegistrationProgress").validationEngine(
                                    'showPrompt',
                                    'After accepting conditions and terms you may continue ...',
                                    'load',
                                    true);
                            setTimeout(function () {
                                $('#userCommunicationInfoRegistrationProgress').validationEngine('hide');
                            }, 3000);
                        }
                    }
                }
            }
        }
    }
}

/*
 * Contact information table pop up on modal
 * @author:Bahram
 * @Since:2016.1.2
 */


function find_registered_addresses() {
    if ($('#pktemp').val().length) {
        $('#table_address_modal').bootstrapTable({
            url: "https://proxy.uretimosb.com/SlimProxyBoot.php?url=pktempFillGridSingular_infoUsersAddresses",
            method: 'GET',
            locale: "'" + ($('#langCode').val() + '-' + $('#langCode').val().toUpperCase()) + "'",
            toggle: "table",
            width: "600",
            pagination: "true",
            search: "true",
            toolbar: "#toolbar",
            showColumns: true,
            showRefresh: true,
            showToggle: false,
            queryParams: function (p) {
//                if (pktemp === null) {
//                    return false;
//                } else {
                return {
                    language_code: $('#langCode').val(),
                    pktemp: $('#pktemp').val(),
                    component_type: 'bootstrap'
//                    };
                }
            }
            , columns:
                    [
//                        {checkbox: true},
                        /*        
                         editable: {
                         type: 'select',
                         source: [
                         {value: 1, text: 'Active'},
                         {value: 2, text: 'Blocked'},
                         {value: 3, text: 'Deleted'}
                         ],
                         //'title': 'Herd Tag',
                         'prepend': {none: "--------------"}
                         }
                         },
                         
                         update action will be done exactely like as sfdm-confirm page 
                         In this place a new tab will be opened based on selected row information 
                         with a filled form (like user addres form) and data could be changed and 
                         updated accordingly. 
                         
                         Second option is using bootstrap-table editable format which is given
                         as a sample here. reference for this option is on the link below:
                         
                         http://bootstrap-table.wenzhixin.net.cn/examples/
                         and 
                         https://github.com/wenzhixin/bootstrap-table/issues/986
                         and
                         http://jsfiddle.net/wenyi/e3nk137y/28/light/
                         
                         */
//                    {field: 'id', sortable: true, width: 100},
//                    {field: 'user_id', sortable: true, width: 100},
                        {field: 'name', title: 'Name', sortable: true, width: 100},
                        {field: 'surname', title: 'Surname', sortable: true, width: 100},
//                    {field: 'language_name', sortable: true, width: 200},
                        {field: 's_date', title: 'Sub. Date', sortable: true, width: 200},
//                    {field: 'c_date', sortable: true, width: 50},
//                    {field: 'address_type_id', width: 300},
                        {field: 'address_type', title: 'Address Type', width: 300},
                        {field: 'address1', title: 'Address Line 1', width: 300},
                        {field: 'address2', title: 'Address Line 1', width: 300},
                        {field: 'postal_code', title: 'Po. Box', width: 300},
//                    {field: 'country_id', width: 300},
                        {field: 'country_name', title: 'Country', width: 300},
//                    {field: 'city_id', width: 300},
                        {field: 'city_names', title: 'City', width: 300},
//                    {field: 'borough_id', width: 300},
                        {field: 'borough_name', title: 'District', width: 300},
                        {field: 'city_name', title: 'City', width: 300},
                        {field: 'description', title: 'Description', width: 300},
//                        {field: 'profile_public', width: 300}
                    ]
        });
        $('#table_address_modal').reload();
    }
}
;

/*
 * List of contacts Modal
 * @author: Bahram Lotfi
 * @Since: 2016.2.11
 */
function find_registered_contacts() {
    if ($('#pktemp').val().length) {
        $('#table_contacts_modal').bootstrapTable({
            onClickRow: function (row, $element) {
                //        row: the record corresponding to the clicked row, 
//                $element: the tr element.
                //        console.log($("#pktemp").val());
                //        console.log(pktemp);
            },
            onCheck: function (row, $element) {
                //        row: the record corresponding to the clicked row,          
                //        $element: the tr element.
                //        console.log(row.id);
            },
            url: "https://proxy.uretimosb.com/SlimProxyBoot.php?url=pktempFillGridSingular_infoUsersCommunications",
            method: 'GET',
            locale: "'" + ($('#langCode').val() + '-' + $('#langCode').val().toUpperCase()) + "'",
            toggle: "table",
            width: "500",
            pagination: "true",
            search: "true",
            toolbar: "#toolbar",
            showColumns: true,
            showRefresh: true,
            showToggle: true,
            queryParams: function (p) {                
                return {
                        language_code: $('#langCode').val(),
                        pktemp: $('#pktemp').val(),
                        component_type: 'bootstrap'
                };
            },
            columns:
                    [
                        {field: 'id', title: 'Id', checkbox: true},
                        {field: 'communications_type_id', title: 'communications_type_id', sortable: true, width: 100},
                        {field: 'comminication_type', title: 'comminication_type', sortable: true, width: 100},
                        {field: 'communications_no', title: 'communications_no', sortable: true, width: 100},
                        {field: 'default_communication_id', title: 'default_communication_id', sortable: true, width: 100},
                        {field: 'default_communication', title: 'default_communication', sortable: true, width: 100}
                    ]
        });
        $('#table_contacts_modal').reload();
    }
}
;

function milliseconds()
{
    var input_date = $('#companyFoundationDate').val();
    var entered_date = new Date(input_date);
    window.date_value = entered_date.getTime();
    window.okan = Math.round(window.date_value / 1000.0);
    console.log(window.date_value);
    console.log(okan);

}
;








