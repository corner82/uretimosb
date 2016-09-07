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




    $('#loging_ph').empty();

    if ($('#pk').val()) {
        var prod_service_url = 'pkFillCompanyInfoProducts_infoFirmProfile';
        var loging_value = window.lang.translate('Log out');
    } else {
        var prod_service_url = 'fillCompanyInfoProductsGuest_infoFirmProfile';
        var loging_value = window.lang.translate('Log in');
    }
    $('#loging_ph').append(loging_value);

    /*
     * Signup.js variables
     * 
     */
    window.clickedButton;
    window.clickedForm;
    window.checked_specs = [];
    window.enteredEmailAddress;

    window.makePublicProfile = 0;
    window.makePublicAddress = 0;
    window.makeCommunicationPublic = 0;
    window.makePublicProject = 0;

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
     * Arrange buttons based on pk presence or absence
     * @author:Bahram
     * @Since: 2016.2.12
     */
    if (!$('#pk').val().length) {
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
                    text(window.lang.translate("Register and Continue to Project Information"));
        } else {
            $("#userCommunicationInfoFormSubmit").
                    text(window.lang.translate("Register and Continue to Project Information"));
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
                    text(window.lang.translate("Register and Continue to Project Information"));
        } else {
            $("#userCommunicationInfoFormSubmit").
                    text(window.lang.translate("Update and Continue to Project Information"));
        }
    }

    /*
     * Customer specific project requirements
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillCustomerCriterionDdList_sysCustomerCriterion',
            language_code: $("#langCode").val(),
            pk: $("#pk").val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
                $('#cust_proj_spec_req').empty();
                if (data.length % 2 === 1) {
                    for (var i = 0; i < (data.length / 2 + 0.5); i++) {
                        var appending1 =
                                "<div class='col-md-6'>"
                                + "<label class='checkbox'>"
                                + "<input id='"
                                + data[i].value
                                + "' type='checkbox' name='checkbox' onclick=check_box(this)>"
                                + "<i></i>"
                                + data[i].text
                                + "</label>"
                                + "</div>";

                        $('#cust_proj_spec_req').append(appending1);
                    }
                    for (var i = (data.length / 2 + 0.5); i < data.length; i++) {
                        var appending2 =
                                "<div class='col-md-6'>"
                                + "<label class='checkbox'>"
                                + "<input id='"
                                + data[i].value
                                + "' type='checkbox' name='checkbox' onclick=check_box(this)>"
                                + "<i></i>"
                                + data[i].text
                                + "</label>"
                                + "</div>";

                        $('#cust_proj_spec_req').append(appending2);
                    }
                } else if (data.length % 2 === 0) {
                    for (var i = 0; i < data.length / 2; i++) {
                        var appending =
                                "<div class='col-md-6'>"
                                + "<label class='checkbox'>"
                                + "<input id='"
                                + data[i].value
                                + "' type='checkbox' name='checkbox' onclick=check_box(this)>"
                                + "<i></i>"
                                + data[i].text
                                + "</label>"
                                + "</div>";

                        $('#cust_proj_spec_req').append(appending);
                    }
                    for (var i = data.length / 2 + 1; i < data.length; i++) {
                        var appending =
                                "<div class='col-md-6'>"
                                + "<label class='checkbox'>"
                                + "<input id='"
                                + data[i].value
                                + "' type='checkbox' name='checkbox' onclick=check_box(this)>"
                                + "<i></i>"
                                + data[i].text
                                + "</label>"
                                + "</div>";

                        $('#cust_proj_spec_req').append(appending);
                    }
                }
            } else {
                console.error('"fillComboBox_syscountrys" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syscountrys" servis hatasÄ±->' + textStatus);
        }
    });
});

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
    }
    else {
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
                    selectedProjectCountryId = selectedData.selectedData.value;
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
            $.fn.multiLanguageBarSetter.defaults.basePath = 'ostim/sanalfabrika';
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

        if ($("#pk").val().length) {
//            console.log('update' + $("#pk").val());
            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                data: {
                    url: 'pkUpdate_infoUsers',
                    language_code: $("#langCode").val(),
                    name: $("#userFirstName").val(),
                    surname: $('#userLastName').val(),
                    username: $('#preferedUsername').val(),
                    password: $('#userPreferedPassword').val(),
                    auth_email: $('#useremail').val(),
                    preferred_language: selectedPreferedLanguageId,
                    profile_public: makePublicProfile,
                    operation_type_id: 2,
                    active: 0,
                    act_parent_id: 0,
                    pk: $("#pk").val()
                },
                method: "GET",
                dataType: "json",
                success: function (data) {

                    if (data['errorInfo'][0] === '00000') {
                        $("#checkGeneralForm").val("1");
                        $("#pk").val(data.pk);
                        pk = data.pk;
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
                         * OKan pk servisi yazilacak************************
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

//            console.log('insert ' + $("#pk").val());
            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                data: {
                    url: 'tempInsert_infoUsers',
                    language_code: $("#langCode").val(),
                    name: $("#userFirstName").val(),
                    surname: $('#userLastName').val(),
                    username: $('#preferedUsername').val(),
                    password: $('#userPreferedPassword').val(),
                    auth_email: $('#useremail').val(),
                    preferred_language: selectedPreferedLanguageId,
                    profile_public: makePublicProfile
                },
                method: "GET",
                dataType: "json",
                success: function (data) {

                    if (data['errorInfo'][0] === '00000') {

                        $("#pk").val(data.pk);
                        pk = data.pk;
//                        console.log(pk);
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

    console.log(selectedAddTypeId);

    if (selectedAddTypeId != '-1') {
        if (selectedCountryId != '-1') {
            if ($('#userAddressInfoForm').validationEngine('validate')) {
                if (selectedCountryId === "91") {
                    $.ajax({
                        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                        data: {
                            url: 'pkInsert_infoUsersAddresses',
                            pk: $("#pk").val(),
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

//                        $("#pk").val(data.pk);
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
                    console.log('selectedCountryId is ' + selectedCountryId);
                    $.ajax({
                        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                        data: {
                            url: 'pkInsert_infoUsersAddresses',
                            pk: $("#pk").val(),
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

//                        $("#pk").val(data.pk);
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
                    url: 'pkInsert_infoUsersCommunications',
                    pk: pk,
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
            Please click on provided confirmation link to activate your account and login to the system.\n\
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
                                            "/ostim/sanalfabrika";
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
                                        "/ostim/sanalfabrika/registration#userAddressInfoForm";
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
                                    "/ostim/sanalfabrika/registration#userGeneralInfoForm";
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
            data: {url: 'pkInsert_infoFirmProfile',
                pk: pk,
                language_code: $("#langCode").val(),
                profile_public: makePublicProject,
                country_id: selectedProjectCountryId,
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
                        message: window.lang.translate('Project information submitted successfully. \n\
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
                            "/ostim/sanalfabrika";
                } else if (data['errorInfo'] === '23505') {
                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('Project information submission failed. There is already a registered company with the same name in the system. '),
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
                    message: window.lang.translate('Project information submission failed.'),
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

function changePublicProject() {

    if ($("#changePublicProject").attr('checked') === 'checked') {
        changePublicProject = '0';
    } else {
        changePublicProject = '1';
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
 * Okani bekleyecegiiiiiiizzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
 * @author:Bahram
 * @Since:2016.1.2
 */
/*
 * 
    $('#table_address_modal').bootstrapTable({
        url: "https://proxy.uretimosb.com/SlimProxyBoot.php?url=9***************",
        method: 'GET',
        locale: "'" + ($('#langCode').val() + '-' + $('#langCode').val().toUpperCase()) + "'",
        toggle: "table",
        width: "500",
        pagination: "true",
        search: "true",
        toolbar: "#toolbar", showColumns: true,
        showRefresh: true,
        showToggle: true,
        queryParams: function (p) {
            if ($('#pk').val() === null) {
                return false;
            } else {
                return {
                    language_code: $('#langCode').val(),
                    pk: $('#pk').val(),
                    component_type: 'bootstrap'
                };
            }
        }
        , columns:
                [
                    {checkbox: true},
                    {field: 'address_type', sortable: true, width: 100},
                    {field: 'tr_country_name', sortable: true, width: 100},
                    {field: 'tr_city_name', sortable: true, width: 100},
                    {field: 'tr_borough_name', sortable: true, width: 100},
                    {field: 'city_name', sortable: true, width: 100},
                    {field: 'address1', sortable: true, width: 200},
                    {field: 'address2', sortable: true, width: 200},
                    {field: 'postal_code', sortable: true, width: 50},
                    {field: 'description', width: 300}
                ]
    });
*/

/*
 * List of contacts Modal
 * Okani bekleyecegiiiiiiizzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
 * @author: Bahram Lotfi
 * @Since: 2016.2.11
 */

/*
 * 
 
$('#table_contacts_modal').bootstrapTable({
    url: "https://proxy.uretimosb.com/SlimProxyBoot.php?url=**************",
    method: 'GET',
    locale: "'" + ($('#langCode').val() + '-' + $('#langCode').val().toUpperCase()) + "'",
    toggle: "table",
    width: "500",
    pagination: "true",
    search: "true",
    toolbar: "#toolbar", showColumns: true,
    showRefresh: true,
    showToggle: true,
    queryParams: function (p) {
        if ($('#pk').val() === null) {
            return false;
        } else {
            return {
                language_code: $('#langCode').val(),
                pk: $('#pk').val(),
                component_type: 'bootstrap'
            };
        }
    }
    , columns: [
        {
            field: 'name',
            title: 'Name',
            align: 'right',
            valign: 'bottom',
            sortable: true
        }, {
            field: 'surname',
            title: 'Last Name',
            align: 'center',
            valign: 'middle',
            sortable: true
        }, {
            field: 'email',
            title: 'E mail',
            align: 'left',
            valign: 'top',
            sortable: true
        }, {
            field: 'communication_number1',
            title: 'Tel 1',
            align: 'left',
            valign: 'top',
            sortable: true
        }, {
            field: 'communication_number2',
            title: 'Tel 2',
            align: 'left',
            valign: 'top',
            sortable: true
        }]
});
*/

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


function hide_show_billing() {

    if ($('#billing_section').css('visibility') === 'hidden') {
        $('#billing_section').css('display', 'block');
        $('#billing_section').css('visibility', 'visible');
    } else {
        $('#billing_section').css('display', 'none');
        $('#billing_section').css('visibility', 'hidden');
    }
}

function check_box(element) {

    if ($('#' + element.id).attr('checked') === 'checked') {
        console.log(window.checked_specs);
        window.checked_specs.push(element.id);
    } else {
        var index = window.checked_specs.indexOf(element.id);
        window.checked_specs.splice(index, 1);
    }
    console.log(window.checked_specs);
}

function find_user_popup() {
    BootstrapDialog.show({
        title: window.lang.translate('Search with User Information'),
        message: function () {
            var $message = $(
                    "<form>"
                    + "<fieldset>"
                    + "<section>"
                    + "<label class='label' style='color:#000'>"
                    + window.lang.translate('Name')
                    + "</label>"
                    + "<div class='input-group'>"
                    + "<div class='input-group-addon'>"
                    + "<i class='fa fa-users'></i>"
                    + "</div>"
                    + "<input type='text' id='user_name'"
                    + " class='form-control validate[custom[onlyLetterSp]]'>"
                    + "</div>"
                    + "</section>"

                    + "<section>"
                    + "<label class='label' style='color:#000'>"
                    + window.lang.translate('Last Name')
                    + "</label>"
                    + "<div class='input-group'>"
                    + "<div class='input-group-addon'>"
                    + "<i class='fa fa-users'></i>"
                    + "</div>"
                    + "<input type='text' id='user_last_name'"
                    + " class='form-control validate[custom[onlyLetterSp]]'>"
                    + "</div>"
                    + "</section>"

                    + "<section>"
                    + "<label class='label' style='color:#000'>"
                    + window.lang.translate('Tel')
                    + "</label>"
                    + "<div class='input-group'>"
                    + "<div class='input-group-addon'>"
                    + "<i class='fa fa-phone'></i>"
                    + "</div>"
                    + "<input type='text' id='user_tel'"
                    + " class='form-control validate[custom[onlyNumberSp]]'>"
                    + "</div>"
                    + "</section>"

                    + "<section>"
                    + "<label class='label' style='color:#000'>"
                    + window.lang.translate('email')
                    + "</label>"
                    + "<div class='input-group'>"
                    + "<div class='input-group-addon'>"
                    + "<i class='fa fa-envelope'></i>"
                    + "</div>"
                    + "<input type='text' id='user_email'"
                    + " class='form-control validate[custom[email]]'>"
                    + "</div>"
                    + "</section>"

                    + "<section>"
                    + "<label class='label' style='color:#000'>"
                    + window.lang.translate('User Customer Id')
                    + "</label>"
                    + "<div class='input-group'>"
                    + "<div class='input-group-addon'>"
                    + "<i class='fa fa-envelope'></i>"
                    + "</div>"
                    + "<input type='text' id='user_customer_id'"
                    + " class='form-control validate[custom[onlyNumberSp]]'>"
                    + "</div>"
                    + "</section>"

                    + "<div style='margin-top:20px'>"
                    + "<div id='user_search_div'>"
                    + "<button type='button' id='user_search_cancel' "
                    + "style='float:right; margin-left:5px' "
                    + "class='btn-u' onclick=''>"
                    + window.lang.translate('Cancel')
                    + "</button>"
                    + "<button type='button' id='user_search_btn' "
                    + "style='float:right' "
                    + "class='btn-u btn-u-dark-blue' onclick='list_found_users()'>"
                    + window.lang.translate('Search')
                    + "</button>"
                    + "</div>"
                    + "</div>"
                    + "</fieldset>"
                    + "</form>"

                    );
            return $message;
        },
        type: BootstrapDialog.TYPE_PRIMARY,
        onshown: function () {

        },
        onhide: function () {

        }
    });
}

function list_found_users() {
    BootstrapDialog.show({
        title: window.lang.translate('Search Results'),
        message: function () {
            var $message = $(
                    "<div class='table' id='users_list_table' style='font-size:10px'>"
                    + "</div>"
                    );
            return $message;
        },
        type: BootstrapDialog.TYPE_PRIMARY,
        onshown: function () {

            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data: {
                    url: 'pkFillUsersListNpk_infoUsers',
                    language_code: $("#langCode").val(),
                    pk: $("#pk").val(),
                    npk: $("#user_customer_id").val(),
                    name: $("#user_name").val(),
                    surname: $("#last_name").val(),
                    email: $("#user_email").val(),
                    communication_number: $("#user_tel").val()
                },
                type: 'GET',
                dataType: 'json',
                //data: 'rowIndex='+rowData.id,
                success: function (data, textStatus, jqXHR) {
                    if (data.length !== 0) {

                        $('#users_list_table').bootstrapTable('destroy');
                        $('#users_list_table').bootstrapTable({
                            method: 'get',
                            data: data.rows,
                            height: 400,
                            striped: true,
                            pagination: true,
                            pageSize: 50,
                            pageList: [10, 25, 50, 100, 200],
                            search: true,
                            showColumns: true,
                            showRefresh: true,
                            minimumCountColumns: 2,
                            columns: [
                                {
                                    field: 'name',
                                    title: 'Name',
                                    align: 'right',
                                    valign: 'bottom',
                                    sortable: true
                                }, {
                                    field: 'surname',
                                    title: 'Last Name',
                                    align: 'center',
                                    valign: 'middle',
                                    sortable: true
                                }, {
                                    field: 'email',
                                    title: 'E mail',
                                    align: 'left',
                                    valign: 'top',
                                    sortable: true
                                }, {
                                    field: 'iletisimadresi',
                                    title: 'Address',
                                    align: 'left',
                                    valign: 'top',
                                    sortable: true
                                }, {
                                    field: 'faturaadresi',
                                    title: 'Billing Address',
                                    align: 'left',
                                    valign: 'top',
                                    sortable: true
                                }, {
                                    field: 'communication_number1',
                                    title: 'Tel 1',
                                    align: 'left',
                                    valign: 'top',
                                    sortable: true
                                }, {
                                    field: 'communication_number2',
                                    title: 'Tel 2',
                                    align: 'left',
                                    valign: 'top',
                                    sortable: true
                                }]
                        });
                    } else {
                        console.error('"fillComboBox_syscountrys" servis datasÄ± boÅŸtur!!');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('"fillComboBox_syscountrys" servis hatasÄ±->' + textStatus);
                }
            });
        },
        onhide: function () {

        }
    });
}