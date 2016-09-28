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
     * Left menuyu oluÅŸturmak iÃ§in Ã§aÄŸÄ±rÄ±lan fonksiyon...
     */

    //$.fn.leftMenuFunction();

    window.sel_count_id;
    window.sel_comp_count_id;
    window.cityList;
    window.boroughList;

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
//                console.log(data);
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
     * get the company's available social media links
     */

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillCompanyInfoSocialedia_infoFirmProfile',
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
                $('#social_media').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a social media from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        $('#social_media_name_ph').empty();
                        var appending =
                                "<label id='social_media_name_ph'></label>"
                                + "<div class='input-group'>"
                                + "<div class='input-group-addon'>"
                                + "<i id='social_icon' class=''></i>"
                                + "</div>"
                                + "<input id='social_address' type='text' class='form-control'>"
                                + "</div>";
                    }

                });
                var i;
                for (i = 0; i < data.length; i++) {

                    var social_media_name = data[i].text;
                    if (social_media_name === 'googleplus') {
                        social_media_name = 'google-plus';
                    }
                    var appending =
                            "<a class='btn btn-social-icon btn-"
                            + social_media_name
                            + "'>"
                            + "<i class='fa fa-"
                            + social_media_name
                            + "'></i>"
                            + "</a>";
                    if (appending.indexOf('undefined') < 0) {
                        $('#ava_med_ph').append(appending);
                    }

                }

            } else {
                console.error('"pkFillCompanyInfoSocialedia_infoFirmProfile" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"pkFillCompanyInfoSocialedia_infoFirmProfile" servis hatasÃ„Â±->' + textStatus);
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

    /*
     * Fill machine tools categories
     * @type @call;$@call;successMessage
     */

    var mt_cats = [
        {'description': 'Talaşlı İmalat', 'selected': false, 'text': 'Metal Cutting', 'value': '1'},
        {'description': 'Metal Şekillendirme', 'selected': false, 'text': 'Metal Forming', 'value': '2'},
        {'description': 'Dökümm', 'selected': false, 'text': 'Casting', 'value': '3'},
        {'description': 'Birleştime', 'selected': false, 'text': 'Joining', 'value': '4'}
    ];

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

//                console.log(data);
                $('#machine_categories').ddslick('destroy');
                $('#machine_categories').ddslick({
                    data: mt_cats,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a category from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        $("#selected_mt_category").empty();
                        $("#selected_mt_type").empty();
                        $("#selected_mt_brand").empty();
                        $("#selected_mt_series").empty();

                        $('#machine_types').ddslick('destroy');
                        $('#machine_brands').ddslick('destroy');
                        $('#machine_series').ddslick('destroy');

                        $("#show_sel_mt_btn").css('display', 'none');
                        $("#show_sel_mt_btn").css('visibility', 'hidden');
                        $("#reset_sel_mt_btn").css('display', 'none');
                        $("#reset_sel_mt_btn").css('visibility', 'hidden');

                        $("#selected_mt_category").val(selectedData.selectedData.text);
                        $("#selected_mt_category").append(selectedData.selectedData.text);
                        get_mt_types();
                    }
                });
            } else {
                console.error('"machine tools category" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"machine tools category" servis hatasÃ„Â±->' + textStatus);
        }
    });

    var mt_set = {"total": 5, "rows": [
            {"manufacturer_name": "A", "series": "serie A", "model": "model A", "model_year": "2000", "number": "1", "available": "yes"},
            {"manufacturer_name": "B", "series": "serie B", "model": "model B", "model_year": "2000", "number": "2", "available": "yes"},
            {"manufacturer_name": "C", "series": "serie C", "model": "model C", "model_year": "2000", "number": "3", "available": "yes"},
            {"manufacturer_name": "D", "series": "serie D", "model": "model D", "model_year": "2000", "number": "2", "available": "yes"},
            {"manufacturer_name": "E", "series": "serie E", "model": "model E", "model_year": "2000", "number": "1", "available": "No"}
        ]};

    $('#mt_grid').empty();
    $('#mt_grid').datagrid({
        data: mt_set,
        singleSelect: true,
        pagination: true,
        collapsible: true,
//        method: 'get',
//        idField: 'id',
//        toolbar:'#tb5',
        //fit:true,
        //fitColumns : true,
//        remoteFilter: true,
//        remoteSort: true,
//        multiSort: false,
        columns: [[
                {field: 'manufacturer_name', title: 'manufacturer_name', width: 100},
                {field: 'series', title: 'series', width: 100},
                {field: 'model', title: 'model', width: 100},
                {field: 'model_year', title: 'model_year', width: 100},
                {field: 'number', title: 'number', width: 100},
                {field: 'available', title: 'available', width: 100}
            ]]
    });



});


var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: 'VazgeÃ§',
    actionButtonLabel: 'Ä°ÅŸleme devam et'});

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
 * hides hidden sections of all tabs
 */

function hide_hidden_sections() {

    $('#hidden_send_ref').css('display', 'none');
    $('#hidden_send_ref').css('visibility', 'hidden');

    $('#hidden_mt_section').css('display', 'none');
    $('#hidden_mt_section').css('visibility', 'hidden');

    $('#sel_customer').val('');
    if ($('#hidden_send_ref').css('visibility') === 'hidden') {
        $('html, body').animate({
            scrollTop: $(".nav-tabs-custom").offset().top
        }, 1000);
    }
    if ($('#hidden_mt_section').css('visibility') === 'hidden') {
        $('html, body').animate({
            scrollTop: $(".nav-tabs-custom").offset().top
        }, 1000);
    }
}

/*
 * shows new machine tool adding section
 */

function unhide_mt_section() {
    $('#hidden_mt_section').css('display', 'block');
    $('#hidden_mt_section').css('visibility', 'visible');

    if ($('#hidden_mt_section').css('visibility') === 'visible') {
        $('html, body').animate({
            scrollTop: $("#hidden_mt_section").offset().top
        }, 1000);
    }
}

/*
 * Fill machine tools categories
 */

function get_mt_types() {

    var metal_cutting_types = [
        {'description': 'Torna', 'selected': false, 'text': 'Turning Lathe', 'value': '1'},
        {'description': 'Freze', 'selected': false, 'text': 'Milling', 'value': '2'},
        {'description': 'Çok fonksiyonlu CNC', 'selected': false, 'text': 'Multi Tasking', 'value': '3'},
        {'description': 'Delme', 'selected': false, 'text': 'Drilling', 'value': '4'},
        {'description': 'Taşlama', 'selected': false, 'text': 'Grinding', 'value': '5'},
        {'description': 'Borlama', 'selected': false, 'text': 'Boring', 'value': '6'}
    ];

    var metal_forming_types = [
        {'description': 'Pres', 'selected': false, 'text': 'Press', 'value': '1'},
        {'description': 'Dövme', 'selected': false, 'text': 'Forging', 'value': '2'},
        {'description': 'Ekstrüzyon', 'selected': false, 'text': 'Extrusion', 'value': '3'},
        {'description': 'Haddeleme', 'selected': false, 'text': 'Roll Forming ', 'value': '4'}
    ];

    var casting_types = [
        {'description': 'Basınçlı döküm', 'selected': false, 'text': 'Die Casting', 'value': '1'},
        {'description': 'Merkezkaç döküm', 'selected': false, 'text': 'Centrifuge Casting', 'value': '2'},
    ]

    var joining_types = [
        {'description': 'TIG Kaynak', 'selected': false, 'text': 'TIG Welding', 'value': '1'},
        {'description': 'MIG Kaynak', 'selected': false, 'text': 'MIG Welding', 'value': '2'},
        {'description': 'Lehimleme', 'selected': false, 'text': 'Brazing', 'value': '3'}
    ];

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
                var dataset;
                if ($("#selected_mt_category").val() === 'Metal Cutting') {
                    dataset = metal_cutting_types;
                } else if ($("#selected_mt_category").val() === 'Metal Forming') {
                    dataset = metal_forming_types;
                } else if ($("#selected_mt_category").val() === 'Casting') {
                    dataset = casting_types;
                } else if ($("#selected_mt_category").val() === 'Joining') {
                    dataset = joining_types;
                }

//                console.log(data);
                $('#machine_types').ddslick('destroy');
                $('#machine_types').ddslick({
                    data: dataset,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a category from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        $("#selected_mt_type").empty();
                        $("#selected_mt_brand").empty();
                        $("#selected_mt_series").empty();

                        $('#machine_brands').ddslick('destroy');
                        $('#machine_series').ddslick('destroy');

                        $("#show_sel_mt_btn").css('display', 'none');
                        $("#show_sel_mt_btn").css('visibility', 'hidden');
                        $("#reset_sel_mt_btn").css('display', 'none');
                        $("#reset_sel_mt_btn").css('visibility', 'hidden');

                        $("#selected_mt_type").val(selectedData.selectedData.text);
                        $("#selected_mt_type").append(selectedData.selectedData.text);

                        get_mt_brands();
                    }
                });
            } else {
                console.error('"machine tools types" servis datası boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"machine tools types" servis hatası->' + textStatus);
        }
    });
}

/*
 * Get the category machine tool brands
 */

function get_mt_brands() {

    var brands = [
        {'description': 'Mazak', 'selected': false, 'text': 'Yamazaki Mazak', 'value': '1'},
        {'description': 'Goodway', 'selected': false, 'text': 'Yama Seiki Goodway ', 'value': '2'},
        {'description': 'Chevalier', 'selected': false, 'text': 'Chevalier', 'value': '3'},
        {'description': 'DMG Mori', 'selected': false, 'text': 'DMG Mori', 'value': '4'},
        {'description': 'Kasuga Seiki', 'selected': false, 'text': 'Kasuga Seiki', 'value': '5'},
        {'description': 'Datron Dynamics', 'selected': false, 'text': 'Datron Dynamics', 'value': '6'},
        {'description': 'Mitsubishi', 'selected': false, 'text': 'Mitsubishi Heavy Ind. ', 'value': '7'},
        {'description': 'Amada', 'selected': false, 'text': 'Amada', 'value': '8'}
    ];

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

//                console.log(data);
                $('#machine_brands').ddslick('destroy');
                $('#machine_brands').ddslick({
                    data: brands,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a brand from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        $("#selected_mt_brand").empty();
                        $("#selected_mt_series").empty();

                        $('#machine_series').ddslick('destroy');

                        $("#show_sel_mt_btn").css('display', 'none');
                        $("#show_sel_mt_btn").css('visibility', 'hidden');
                        $("#reset_sel_mt_btn").css('display', 'none');
                        $("#reset_sel_mt_btn").css('visibility', 'hidden');

                        $("#selected_mt_brand").val(selectedData.selectedData.text);
                        $("#selected_mt_brand").append(selectedData.selectedData.text);

                        get_mt_series();
                    }
                });
            } else {
                console.error('"machine tools brands" servis datası boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"machine tools brands" servis hatası->' + textStatus);
        }
    });

}

/*
 * Get the brand machine tool series
 */

function get_mt_series() {

    var series = [
        {'description': 'Serie 1', 'selected': false, 'text': 'Serie 1', 'value': '1'},
        {'description': 'Serie 2', 'selected': false, 'text': 'Serie 2', 'value': '2'},
        {'description': 'Serie 3', 'selected': false, 'text': 'Serie 3', 'value': '3'},
        {'description': 'Serie 4', 'selected': false, 'text': 'Serie 4', 'value': '4'},
        {'description': 'Serie 5', 'selected': false, 'text': 'Serie 5', 'value': '5'},
        {'description': 'Serie 6', 'selected': false, 'text': 'Serie 6', 'value': '6'},
        {'description': 'Serie 7', 'selected': false, 'text': 'Serie 7', 'value': '7'},
        {'description': 'Serie 8', 'selected': false, 'text': 'Serie 8', 'value': '8'}
    ];

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

//                console.log(data);
                $('#machine_series').ddslick('destroy');
                $('#machine_series').ddslick({
                    data: series,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a serie from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        $("#selected_mt_series").empty();
                        $("#selected_mt_series").val(selectedData.selectedData.text);
                        $("#selected_mt_series").append(selectedData.selectedData.text);

                        $("#show_sel_mt_btn").css('display', 'block');
                        $("#show_sel_mt_btn").css('visibility', 'visible');
                        $("#reset_sel_mt_btn").css('display', 'block');
                        $("#reset_sel_mt_btn").css('visibility', 'visible');

                    }
                });
            } else {
                console.error('"machine tools series" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"machine tools series" servis hatasÃ„Â±->' + textStatus);
        }
    });

}
/*
 * unhide selected machine tool properties section
 */

function show_sel_mt() {

    $('#sel_mt_title').empty();
    $('#sel_mt_title').append($('#selected_mt_brand').val() + " " + $('#selected_mt_series').val());

    $('#sel_mt_props_div').css('display', 'block');
    $('#sel_mt_props_div').css('visibility', 'visible');

    if ($('#sel_mt_props_div').css('visibility') === 'visible') {
        $('html, body').animate({
            scrollTop: $("#sel_mt_props_div").offset().top
        }, 1000);
    }

    call_sel_mt_props();

    event.preventDefault();
}

/*
 * reset all selected machine tools
 */

function reset_sel_mt() {

    $("#selected_mt_category").empty();
    $("#selected_mt_type").empty();
    $("#selected_mt_brand").empty();
    $("#selected_mt_series").empty();

    $('#machine_types').ddslick('destroy');
    $('#machine_brands').ddslick('destroy');
    $('#machine_series').ddslick('destroy');

    $("#show_sel_mt_btn").css('display', 'none');
    $("#show_sel_mt_btn").css('visibility', 'hidden');
    $("#reset_sel_mt_btn").css('display', 'none');
    $("#reset_sel_mt_btn").css('visibility', 'hidden');

    $("#sel_mt_props_div").css('display', 'none');
    $("#sel_mt_props_div").css('visibility', 'hidden');

    $('html, body').animate({
        scrollTop: $("#hidden_mt_section").offset().top
    }, 1000);

    event.preventDefault();
}

/*
 * Call all machine properties
 */

function call_sel_mt_props() {

    $('#pg').propertygrid({
        url: '../../../../jsinline/props.json',
        showGroup: true,
        scrollbarSize: 0
    });
}


function cont_add_mt_btn() {
    if ($('#number_of_avai_mt').val() !== '') {
        $('#add_machine').removeAttr('disabled');
    } else {
        $('#add_machine').attr('disabled', 'disabled');
    }
}

function cancel_new_machine(){
    
}