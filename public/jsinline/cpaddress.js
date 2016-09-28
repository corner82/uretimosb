$(document).ready(function () {

    /*
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
     * Left menuyu olusturmak icin Ã§aÄŸÄ±rÄ±lan fonksiyon...
     */
    //$.fn.leftMenuFunction();

    window.sel_count_id;
    window.sel_comp_count_id;
    window.cityList;
    window.boroughList;

    /*
     * Page consultant for box-header
     */
//    $.ajax({
//        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//        data: {
//            url: '',
//            language_code: $("#langCode").val(),
//            pk: $('#pk').val(),
//            npk: $('#selectedCompanyNpk').val()
//        },
//        type: 'GET',
//        dataType: 'json',
//        //data: 'rowIndex='+rowData.id,
//        success: function (data, textStatus, jqXHR) {
//            if (data.length !== 0) {
//
//                var cons_image_url = "https://" + window.location.hostname + "/onyuz/standard/assets/img/sfClients/" + data[0].cons_picture;
//
//                if (data[0].communications_no) {
//                    var tel_number = data[0].communications_no;
//                } else {
//                    var tel_number = '';
//                }
//                
//                $('#consultant_div').css('display', 'block');
//                $('#consultant_div').css('visibility', 'visible');
//                $('#consultant_div').attr('data-balloon', 'Tel:' + tel_number);
//                $('#consultant_div').attr('email_address', data[0].auth_email);
//                $('#consultant_div').attr('page_consultant', data[0].name + " " + data[0].surname);
//                $('#cons_image_ph').attr('src', cons_image_url);
//                $('#cons_name_ph').empty();
//                $('#cons_name_ph').append(data[0].name + " " + data[0].surname);
//
//            } else {
//            $('#consultant_div').css('display', 'none');
//                  $('#consultant_div').css('visibility', 'hidden');
//                console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
//            }
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            console.error('"consultants" servis hatasÃ„Â±->' + textStatus);
//        }
//    });

    /*
     * Bootstrap modals variables
     * @type @call;$@call;successMessage
     */
    $("#new_mt_details_form").validationEngine({promptPosition: "topLeft:100%,0"});

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Confirm')});

    $('#reg_address_table').datagrid({
        onDblClickRow: function (index, row) {

        },
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
        queryParams: {
            url: 'pkFillSingularFirmAddress_infoFirmAddress',
            pk: $('#pk').val(),
            subject: 'datagrid',
            npk: $('#selectedCompanyNpk').val()
                    /*machine_groups_id : null,
                     filterRules:null*/
        },
        width: '100%',
        singleSelect: true,
        pagination: true,
        collapsible: true,
        method: 'get',
        idField: 'firm_id',
        //toolbar:'#tb5',
        //fit:true,
        //fitColumns : true,
        remoteFilter: true,
        remoteSort: true,
        multiSort: false,
        columns: [[
                {field: 'id', title: 'id', width: 80, hidden: true}, // 
                {field: 'firm_id', title: 'Company Id', width: 80, hidden: true}, //                    
                {field: 'firm_name', title: 'Company Name', width: 180}, //  
                {field: 'firm_building_type', title: 'Building Type', width: 80}, //                    
//                {field: 'firm_building_name', title: 'Building Name', width: 80, align: 'left', editor: {type: 'text', options: {precision: 1}}},
                {field: 'country_name', title: 'Country', width: 80, align: 'left'
//                    ,editor: {
//                        type: 'combobox',
//                        options: {
//                            valueField: 'id',
//                            textField: 'country',
//                            data: window.countries_data,
//                            required: true
//                        }
//                    }
                },
                {field: 'city_name', title: 'City', width: 80, align: 'center'},
                {field: 'borough_name', title: 'District', width: 80, align: 'center', editor: 'text'},
                {field: 'address', title: 'Address', width: 250, align: 'left', editor: {type: 'text', options: {precision: 1}}},
                {field: 'osb_name', title: 'Organized Industrial Zone', width: 80, align: 'left', editor: 'text'},
                {field: 'action', title: 'Action', width: 80, align: 'center',
                    formatter: function (value, row, index) {
                        if (row.editing) {
                            var s = '<a href="javascript:void(0)" onclick="saverow(this)">' + window.lang.translate('Save') + '</a> ';
                            var c = '<a href="javascript:void(0)" onclick="cancelrow(this)">' + window.lang.translate('Cancel') + '</a>';
                            return s + c;
                        } else {
                            var e = '<a href="javascript:void(0)" onclick="editrow(this)">' + window.lang.translate('Edit') + '</a> ';
                            var d = '<a href="javascript:void(0)" onclick="deleterow(this)">' + window.lang.translate('Delete') + '</a>';
                            return e + d;
                        }
                    }
                }
            ]],
        onEndEdit: function (index, row) {
            var ed = $(this).datagrid('getEditor', {
                index: index,
                field: 'firm_id'
            });
            row.productname = $(ed.target).combobox('getText');
        },
        onBeforeEdit: function (index, row) {
            row.editing = true;
            $(this).datagrid('refreshRow', index);
        },
        onAfterEdit: function (index, row) {
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        },
        onCancelEdit: function (index, row) {
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        }
    });
    $('#reg_address_table').datagrid('enableFilter');


    /*
     * Get Building types service
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'fillBuildingType_sysSpecificDefinitions',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            window.building_type_data = data;
            if (data.length !== 0) {
                $('#building_type_ph').ddslick({
                    data: data,
                    width: '100%',
                    background: false,
                    selectText: window.lang.translate("Select an Address Type"),
                    imagePosition: "right",
                    onSelected: function (selectedData) {
                        selectedBuildingTypeId = selectedData.selectedData.value;
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
     * Get countries list for address 
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
                window.countries_data = [];
                for (var i = 0; i < data.length; i++) {
                    window.countries_data.push({'id': data[i].value, 'country': data[i].text});
                }
                $('#company_country_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a country from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        window.sel_count_id = selectedData.selectedData.value;
                    }
                });
                $('#company_country_address_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a country from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        window.sel_comp_count_id = selectedData.selectedData.value;
                        if (selectedData.selectedData.value !== 0) {

                            window.cityList = selectedData.selectedData.attributes.citylist;
                            window.boroughList = false;
                        }
                        window.sel_count_id = selectedData.selectedData.value;
//                    selectedCountryList = selectedData                    
                        companyCityDropDownUpdate();
                        //callback function: do something with selectedData;
                    }
                });



            } else {
                console.error('"fillComboBox_syscountrys" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syscountrys" servis hatasÃ„Â±->' + textStatus);
        }
    });

    /*
     * Address drop down list for cities
     * @returns {undefined}
     */
    function companyCityDropDownUpdate() {

        $("#company_city").empty();
        $("#company_district").empty();
        if (window.cityList === true) {
            $('#company_city_address_ph').hide();
            $('#city_dropdown').show();
        } else {
            $('#company_city_address_ph').show();
            $('#city_dropdown').hide();
        }

        $.ajax({
            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: {
                url: 'fillComboBox_syscity',
                country_id: window.sel_count_id,
                language_code: $("#langCode").val(),
                component_type: 'ddslick'
            },
            type: 'GET',
            dataType: 'json',
            //data: 'rowIndex='+rowData.id,
            success: function (data, textStatus, jqXHR) {
                window.city_data = data;
                if (data.length !== 0) {

                    $('#company_city').ddslick('destroy');
                    $('#company_city').ddslick({
                        data: data,
                        width: '100%',
                        height: '500%',
                        background: false,
                        selectText: window.lang.translate("Please select a city from list..."),
                        imagePosition: 'right',
                        onSelected: function (selectedData) {
//                        console.log(selectedData.selectedData);
                            window.sel_city_id = selectedData.selectedData.value;
                            if (window.sel_city_id !== 0) {
                                window.boroughList = selectedData.selectedData.attributes.boroughlist;
                            }
//                            console.log(selectedData);
//                            console.log(selectedCityId);
                            districtDropDownUpdate();
                            //callback function: do something with selectedData;
                        }
                    });
                } else {
                    console.error('"fillComboBox_syscity" servis datasÃ„Â± boÃ…Å¸tur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"fillComboBox_syscity" servis hatasÃ„Â±->' + textStatus);
            }
        });
    }

    /*
     * Address drop down list for districts
     * @returns {undefined}
     */
    function districtDropDownUpdate() {

        $("#company_district").empty();
        if (window.boroughList === true) {
            $('#district_dropdown').show();
        } else {
            $('#district_dropdown').hide();
        }

        $.ajax({
            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: {
                url: 'fillComboBox_sysborough',
                country_id: window.sel_count_id,
                city_id: window.sel_city_id,
                language_code: $("#langCode").val(),
                component_type: 'ddslick'
            },
            type: 'GET',
            dataType: 'json',
            //data: 'rowIndex='+rowData.id,
            success: function (data, textStatus, jqXHR) {
                window.district_data = data;
                if (data.length !== 0) {
//                console.log(data);
                    $('#company_district').ddslick('destroy');
                    $('#company_district').ddslick({
                        data: data,
                        width: '100%',
                        height: '500%',
                        background: false,
                        selectText: window.lang.translate("Please select a district from list..."),
                        imagePosition: 'right',
                        onSelected: function (selectedData) {
                            window.sel_dis_id = selectedData.selectedData.value;
//                            console.log(selectedData);
//                            console.log(selectedDistrictId);
                            //callback function: do something with selectedData;
                        }
                    });
                } else {
                    console.error('"fillComboBox_sysborough" servis datasÃ„Â± boÃ…Å¸tur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"fillComboBox_sysborough" servis hatasÃ„Â±->' + textStatus);
            }
        });
    }

    /*
     * Company's registrered but not approved social media links
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        //                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',            
        data: {url: "pkFillSingularFirmSocialMedia_infoFirmSocialmedia",
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $("#pk").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);
            $('#ava_med_ph').empty();
            var i;
            for (i = 0; i < data.rows.length; i++) {

                var social_media_name = data.rows[i].socialmedia_name;

                if (social_media_name === 'googleplus') {
                    social_media_name = 'google-plus';
                }

                var social_url = data.rows[i].firm_link;
                var appending =
                        "<div class='btn-group' id='"
                        + social_media_name
                        + "_btn_group_"
                        + data.rows[i].id
                        + "' url_value='"
                        + social_url
                        + "' selected_soc_id='"
//                        + data[i].
                        + "'>"
                        + "<a id='"
                        + social_media_name
                        + "_button_"
                        + data.rows[i].id
                        + "' class='btn btn-social-icon dropdown-toggle btn-"
                        + social_media_name
                        + "' data-toggle='dropdown' aria-expanded='false' target='_newtab' "
                        + " "
                        + "style='margin-left:5px'>"
                        + "<i class='fa fa-"
                        + social_media_name
                        + "'></i>"
                        + "</a>"
                        + "<button type='button' class='btn dropdown-toggle btn-"
                        + social_media_name
                        + "' data-toggle='dropdown' aria-expanded='false'>"
                        + "<span class='caret'></span>"
                        + "<span class='sr-only'>Toggle Dropdown</span>"
                        + "</button>"
                        + "<ul class='dropdown-menu' role='menu'>"
                        + "<li class='btn' id='"
                        + social_media_name
                        + "_goto_btn_"
                        + data.rows[i].id
                        + "' onclick='goto_social(this)'>"
                        + window.lang.translate('Goto')
                        + "</li><br/>"
//                        + "<li class='btn' id='"
//                        + social_media_name
//                        + "_edit_btn' onclick='edit_social(this)'>"
//                        + window.lang.translate('Edit')
//                        + "</li><br/>"
                        + "<li class='btn' id='"
                        + social_media_name
                        + "_remove_btn_"
                        + data.rows[i].id
                        + "' soc_id_val='"
                        + data.rows[i].id
                        + "' onclick='remove_social(this)'>"
                        + window.lang.translate('Delete')
                        + "</li>"
                        + "</ul>"
                        + "</div>";
                $('#ava_med_ph').append(appending);
            }
        }
    });

    /*
     * Fill system social media list drop down
     * ddslick drop down
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillSocicalMediaDdList_sysSocialMedia',
            language_code: $("#langCode").val(),
            component_type: 'ddslick',
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

                var i;
                for (i = 0; i < data.length; i++) {
                    var new_imagesrc = data[i].imageSrc.replace('/Logos/', '');
                    data[i].imageSrc = "https://" + window.location.hostname + "/onyuz/standard/assets/img/icons/social/socialmediav2/" + new_imagesrc;
                }

                $('#social_media_ph').ddslick('destroy');
                $('#social_media_ph').ddslick({
                    data: data,
                    imagePosition: "left",
                    width: '100%',
                    height: '500%',
                    background: true,
                    selectText: window.lang.translate("Please select a social media from list..."),
                    onSelected: function (selectedData) {

                        var selected = selectedData.selectedData.text;
                        if (selected === 'googleplus') {
                            selected = 'google-plus';
                        }

                        if ($('#sel_med_ph').find('.form-control').length) {

                            var remained_soc_med = $('#sel_med_ph').find('.form-control').attr('id').replace('_input_field', ''),
                                    default_url = "https://www." + remained_soc_med + ".com/",
                                    found_value = $('#sel_med_ph').find('.form-control').attr('value'),
                                    remained_soc_med_id = $('#sel_med_ph').find('.btn').attr('selected_soc_id');

                            window.remaining_temp_url = $("#" + remained_soc_med + "_input_field").val();

                            if (window.remaining_temp_url !== default_url && window.remaining_temp_url.indexOf((default_url)) > -1) {

                                wcm.warningComplexMessage({
                                    onConfirm: function () {
                                        $('#sel_med_ph').empty();
                                        var appending
                                                =
                                                "<div id='"
                                                + selected
                                                + "_ph' style='margin-top: 20px'>"
                                                + "<a id='"
                                                + selected
                                                + "_long' selected_soc_id='"
                                                + selectedData.selectedData.value
                                                + "' class='btn btn-block btn-social btn-"
                                                + selected
                                                + "' onclick='changecontent(this)'>"
                                                + "<i class='fa fa-"
                                                + selected
                                                + "'></i>"
                                                + "<span id='"
                                                + selected
                                                + "_span'>"
                                                + window.lang.translate("Enter your account")
                                                + "</span>"
                                                + "</a>"
                                                + "<div id='"
                                                + selected
                                                + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
                                                + "<span class='input-group-btn'>"
                                                + "<a id='"
                                                + selected
                                                + "_input_button' class='btn btn-social-icon btn-"
                                                + selected
                                                + "' onclick='checkContent(this)'><i class='fa fa-"
                                                + selected
                                                + "'></i></a>"
                                                + "</span>"
                                                + "<input id='"
                                                + selected
                                                + "_input_field' type='text' class='form-control' value='https://www."
                                                + selected
                                                + ".com/'>"
                                                + "</div>"
                                                + "</div>";
                                        $('#sel_med_ph').append(appending);
                                    }
                                });
                                wcm.warningComplexMessage('show', remained_soc_med + ' changes!!',
                                        'Changes for ' + remained_soc_med + ' will be lost. Do you want to continue?');
                            } else {
                                $('#sel_med_ph').empty();
                                var appending
                                        =
                                        "<div id='"
                                        + selected
                                        + "_ph' style='margin-top: 20px'>"
                                        + "<a id='"
                                        + selected
                                        + "_long' selected_soc_id='"
                                        + selectedData.selectedData.value
                                        + "' class='btn btn-block btn-social btn-"
                                        + selected
                                        + "' onclick='changecontent(this)'>"
                                        + "<i class='fa fa-"
                                        + selected
                                        + "'></i>"
                                        + "<span id='"
                                        + selected
                                        + "_span'>"
                                        + window.lang.translate("Enter your account")
                                        + "</span>"
                                        + "</a>"
                                        + "<div id='"
                                        + selected
                                        + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
                                        + "<span class='input-group-btn'>"
                                        + "<a id='"
                                        + selected
                                        + "_input_button' class='btn btn-social-icon btn-"
                                        + selected
                                        + "' onclick='checkContent(this)'><i class='fa fa-"
                                        + selected
                                        + "'></i></a>"
                                        + "</span>"
                                        + "<input id='"
                                        + selected
                                        + "_input_field' type='text' class='form-control' value='https://www."
                                        + selected
                                        + ".com/'>"
                                        + "</div>"
                                        + "</div>";
                                $('#sel_med_ph').append(appending);
                            }
                        } else {

                            $('#sel_med_ph').empty();
                            var appending
                                    =
                                    "<div id='"
                                    + selected
                                    + "_ph' style='margin-top: 20px'>"
                                    + "<a id='"
                                    + selected
                                    + "_long' selected_soc_id='"
                                    + selectedData.selectedData.value
                                    + "' class='btn btn-block btn-social btn-"
                                    + selected
                                    + "' onclick='changecontent(this)'>"
                                    + "<i class='fa fa-"
                                    + selected
                                    + "'></i>"
                                    + "<span id='"
                                    + selected
                                    + "_span'>"
                                    + window.lang.translate("Enter your account")
                                    + "</span>"
                                    + "</a>"
                                    + "<div id='"
                                    + selected
                                    + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
                                    + "<span class='input-group-btn'>"
                                    + "<a id='"
                                    + selected
                                    + "_input_button' class='btn btn-social-icon btn-"
                                    + selected
                                    + "' onclick='checkContent(this)'><i class='fa fa-"
                                    + selected
                                    + "'></i></a>"
                                    + "</span>"
                                    + "<input id='"
                                    + selected
                                    + "_input_field' type='text' class='form-control' value='https://www."
                                    + selected
                                    + ".com/'>"
                                    + "</div>"
                                    + "</div>";
                            $('#sel_med_ph').append(appending);
                        }
                    }
                });
            } else {
                console.error('"pkFillSocicalMediaDdList_sysSocialMedia" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"pkFillSocicalMediaDdList_sysSocialMedia" servis hatasÃ„Â±->' + textStatus);
        }
    });


});


var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
    actionButtonLabel: window.lang.translate('Continue')});

/*
 * Change social media shape to edit content of url
 */
function changecontent(element) {
    window.selected_soc_med_id = $('#' + element.id).attr('selected_soc_id');
//    console.log(window.selected_soc_med_id);
    var social_media_name = element.id.replace('_long', '');
    $("#" + element.id).hide();
    $("#" + social_media_name + "_input").fadeIn('');
}

/*
 * After editing url checks for changes and edit or insert new social media link
 */
function checkContent(element) {

    var social_media_name = element.id.replace('_input_button', '');
    var social_media_name_ph = element.id.replace('_button', '');

    if ($("#" + social_media_name_ph + "_field").val() !== "https://www." + social_media_name + ".com/" && $("#" + social_media_name_ph + "_field").val().indexOf(("https://www." + social_media_name + ".com/")) > -1) {

        window.temp_url = $("#" + social_media_name_ph + "_field").val();
        $("#" + social_media_name + "_long").html("<i class='fa fa-" + social_media_name + "'></i>" + $("#" + social_media_name_ph + "_field").val());
        $("#" + social_media_name + "_long").hide();
        $("#" + social_media_name + "_input").hide();
        window.temp_soc_med_name = social_media_name;

        /*
         * Insert new url
         */

        $.ajax({
            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_infoFirmSocialmedia',
                pk: $("#pk").val(),
                npk: $("#selectedCompanyNpk").val(),
                language_code: $("#langCode").val(),
                sys_socialmedia_id: window.selected_soc_med_id,
                firm_link: window.temp_url,
                profile_public: 0
            },
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data['errorInfo'][0] === '00000') {

                    var appending =
                            "<div class='btn-group' id='"
                            + social_media_name
                            + "_btn_group_"
                            + data.lastInsertId
                            + "' url_value='"
                            + window.temp_url
                            + "'>"
                            + "<a id='"
                            + social_media_name
                            + "_button_"
                            + data.lastInsertId
                            + "' class='btn btn-social-icon dropdown-toggle btn-"
                            + social_media_name
                            + "' data-toggle='dropdown' aria-expanded='false' target='_newtab' "
                            + " "
                            + "style='margin-left:5px'>"
                            + "<i class='fa fa-"
                            + social_media_name
                            + "'></i>"
                            + "</a>"
                            + "<button type='button' class='btn dropdown-toggle btn-"
                            + social_media_name
                            + "' data-toggle='dropdown' aria-expanded='false'>"
                            + "<span class='caret'></span>"
                            + "<span class='sr-only'>Toggle Dropdown</span>"
                            + "</button>"
                            + "<ul class='dropdown-menu' role='menu'>"
                            + "<li class='btn' id='"
                            + social_media_name
                            + "_goto_btn_'"
                            + data.lastInsertId
                            + "' onclick='goto_social(this)'>"
                            + window.lang.translate('Goto')
                            + "</li><br/>"
//                            + "<li class='btn' id='"
//                            + social_media_name
//                            + "_edit_btn' onclick='edit_social(this)'>"
//                            + window.lang.translate('Edit')
//                            + "</li><br/>"
                            + "<li class='btn' id='"
                            + social_media_name
                            + "_remove_btn_'"
                            + data.lastInsertId
                            + "' soc_id_val='"
                            + data.lastInsertId
                            + "' onclick='remove_social(this)'>"
                            + window.lang.translate('Delete')
                            + "</li>"
                            + "</ul>"
                            + "</div>";

                    $('#ava_med_ph').append(appending);
                }
            }
        });


    } else {

        $("#" + social_media_name + "_long").show();
        $("#" + social_media_name + "_input").hide();
        var default_value = "https://www." + social_media_name + ".com/";
        $("#" + social_media_name_ph + "_field").val(default_value);
    }
}

/*
 * function to redirect to the entered social media adderss
 */
function goto_social(element) {
//    var selected = element.id.replace('_goto_btn_', '');
//    var selected = element.id.substring(0, element.id.indexOf("_goto_btn_"));
//    console.log(selected);
    var parent_grp_btn_id = element.id.replace('_goto_btn_', '_btn_group_');
    var sel_med_url = $('#' + parent_grp_btn_id).attr('url_value');
    if (sel_med_url.indexOf('google-plus') > -1) {
        sel_med_url = sel_med_url.replace('google-plus', 'googleplus');
    }
    window.open(sel_med_url, '_newtab');
}

/*
 * removes selected social media link
 */
function remove_social(element) {
//    var selected = element.id.replace('_remove_btn', '');
//    var selected = element.id.substring(0, element.id.indexOf("_remove_btn"));
    var parent_grp_btn_id = element.id.replace('_remove_btn_', '_btn_group_');
    console.log(parent_grp_btn_id);
    var soc_id_val = $('#' + element.id).attr('soc_id_val');
//    console.log($('#element.id'));
    console.log(soc_id_val);
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
        data: {
            url: 'pkDeletedAct_infoFirmSocialmedia',
            pk: $("#pk").val(),
            npk: $("#selectedCompanyNpk").val(),
            language_code: $("#langCode").val(),
            sys_socialmedia_id: window.selected_soc_med_id,
            firm_link: window.temp_url,
            profile_public: 0,
            id: soc_id_val
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data['errorInfo'][0] === '00000') {

                $('#sel_med_ph').empty();
                $('#' + parent_grp_btn_id).remove();

            }
        }
    });
}

/*
 * Easyui functions
 * 
 */
function getRowIndex(target) {
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}

function editrow(target) {
    $('#reg_address_table').datagrid('beginEdit', getRowIndex(target));

}

function deleterow(target) {
    wcm.warningComplexMessage({onConfirm: function (event, data) {
            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                //                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',         
                data: {
                    url: '',
                    pk: $("#pk").val(),
                    npk: $("#selectedCompanyNpk").val(),
                    language_code: $("#langCode").val()
                },
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log('deleted', data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('"delete function error" servis hatasÃ„Â±->' + textStatus);
                }
            });
            $('#reg_address_table').datagrid('deleteRow', getRowIndex(target));
        }
    });
    wcm.warningComplexMessage('show', window.lang.translate('Are you sure?'), window.lang.translate('Are You Sure?'));
}

function saverow(target) {


    $('#reg_address_table').datagrid('endEdit', getRowIndex(target));
//    console.log(target.closest('tr'));

    var rows = $('#reg_address_table').datagrid('getRows');
    console.log($('#reg_address_table').datagrid('endEdit', i));
    $.each(rows, function (i, target) {
        $('#reg_address_table').datagrid('endEdit', i);
        console.log(i);
    });


//    console.log($('#reg_address_table').datagrid('getRowIndex'));

//    $.ajax({
//        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//        //                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',         
//        data: {
//            url: 'pkcpkUpdate_infoFirmAddress',
//            pk: $("#pk").val(),
//            cpk: $("#cpk").val(),
//            language_code: $("#langCode").val(),
////            id:$('#reg_address_table').datagrid('getRows')[getRowIndex(target)].id ,
//            profile_public: 0,
//            firm_building_type_id: 2,
//            address: '',
//            borough_id: 111,
//            city_id: 64,
//            country_id: 91,
//            osb_id: 5,
//            tel: ' ',
//            fax: '',
//            email: ''
//        },
//        method: "GET",
//        dataType: "json",
//        success: function (data) {
//            console.log('Updated', data);
//            sm.successMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information saved successfully'));
//
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            console.error('"update function error" servis hatasÃ„Â±->' + textStatus);
//            wm.warningMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Update failed'));
//        }
//    });

}

function cancelrow(target) {
    $('#reg_address_table').datagrid('cancelEdit', getRowIndex(target));
}

function submitNewAddress() {

    if (!$('#new_address_form').validationEngine()) {
        $.ajax({
            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            //                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',         
            data: {
                url: 'pkInsert_infoFirmAddress',
                pk: $("#pk").val(),
                npk: $("#selectedCompanyNpk").val(),
                language_code: $("#langCode").val()
            },
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log('deleted', data);
                sm.successMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information submitted successfully'));

            },
            error: function (jqXHR, textStatus, errorThrown) {
                event.preventDefault();
                console.error('"delete function error" servis hatasÃ„Â±->' + textStatus);
                wm.warningMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Submittion failed...'));
            }
        });
    } else {
        event.preventDefault();
        wm.warningMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Fill required places first please...'));
    }
}


