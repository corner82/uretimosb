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
    $('#general_firm_form').validationEngine({promptPosition: "topLeft:100%,0"});
//Datemask dd/mm/yyyy
    $("#found_date").inputmask("yyyy/mm/dd", {"placeholder": "yyyy/mm/dd"});
    window.sel_count_id;
    window.sel_comp_count_id;
    window.cityList;
    window.boroughList;
    /*
     * Fill form fields
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillFirmFullVerbal_infoFirmProfile',
            language_code: $("#langCode").val(),
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
//                console.log(data);
                /*
                 * change coming foundation date from milliseconds to year/month/day
                 * if there is not submitted found_date, it comes back empty
                 */

                if (data[0].foundation_yearx) {
                    var found_date = new Date(found_date);
                    var new_date = new Date(found_date);
                    var year = new_date.getFullYear().toString();
                    var month = (new_date.getMonth() + 1).toString();
                    var day = new_date.getDate().toString();
                } else {
                    var year = '';
                    var month = '';
                    var day = '';
                }

                window.sel_count_id = data[0].country_id;
                window.image_url = "https://"
                        + window.location.hostname
                        + "/onyuz/standard/assets/img/sfClients/"
                        + data[0].logo;
                $('#full_name_ph').val(data[0].firm_name);
                $('#full_name_en_ph').val(data[0].firm_name_eng);
                $('#short_name_ph').val(data[0].firm_name_short);
                $('#short_name_en_ph').val(data[0].firm_name_short_eng);
                $('#website').val(data[0].web_address);
                $('#company_logo').attr('src', window.image_url);
                $('#found_date').val(year + '/' + month + '/' + day);
                $('#tax_office').val(data[0].tax_office);
                $('#tex_number').val(data[0].tax_no);
                $('#desc_text').val(data[0].about);
                $('#desc_text_en').val(data[0].about_eng);
                $('#first_text_title').val(data[0].verbal1_title);
                $('#first_text_title_en').val(data[0].verbal1_title_eng);
                $('#verbal1_text').val(data[0].verbal1);
                $('#verbal1_text_en').val(data[0].verbal1_eng);
                $('#second_text_title').val(data[0].verbal2_title);
                $('#second_text_title_en').val(data[0].verbal2_title_eng);
                $('#verbal2_text').val(data[0].verbal2);
                $('#verbal2_text_en').val(data[0].verbal2_eng);
                $('#third_text_title').val(data[0].verbal3_title);
                $('#third_text_title_en').val(data[0].verbal3_title_eng);
                $('#verbal3_text').val(data[0].verbal3);
                $('#verbal3_text_en').val(data[0].verbal3_eng);
//                $('#company_country_ph').ddslick('select', {'value': '91'});
//                $('#company_country_ph').ddslick(data[0].country_id);
//                $('#company_country_ph li:has(.dd-option-text:contains("value"))').index();
//                $('#company_country_ph').ddslick('select', {index: $('#company_country_ph li:has(.dd-option-value:contains(' + window.sel_count_id + '))')});
//                $('#company_country_ph').ddslick('select', {value: 91 });
                window.verbal_id = data[0].id;
            } else {
                console.error('"fill verbal service" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fill verbal service" servis hatasÃ„Â±->' + textStatus);
        }
    });
    /*
     * 
     * Check textarea remaining characters
     */
    var desc_text_max = 3000;
//    var title_text_max = 150;
    var verbal_text_max = 2000;
    $('#desc_rem_char_alert').html(desc_text_max + ' characters remaining');
    $('#desc_en_rem_char_alert').html(desc_text_max + ' characters remaining');
    $('#verb1_rem_char_alert').html(verbal_text_max + ' characters remaining');
    $('#verb1_en_rem_char_alert').html(verbal_text_max + ' characters remaining');
    $('#verb2_rem_char_alert').html(verbal_text_max + ' characters remaining');
    $('#verb2_en_rem_char_alert').html(verbal_text_max + ' characters remaining');
    $('#verb2_rem_char_alert').html(verbal_text_max + ' characters remaining');
    $('#verb2_en_rem_char_alert').html(verbal_text_max + ' characters remaining');
    $('.text-area').keyup(function () {
        var desc_text_length = $('#desc_text').val().length;
        var desc_en_text_length = $('#desc_text_en').val().length;
        var verb1_text_length = $('#verbal1_text').val().length;
        var verb1_en_text_length = $('#verbal1_text_en').val().length;
        var verb2_text_length = $('#verbal2_text').val().length;
        var verb2_en_text_length = $('#verbal2_text_en').val().length;
        var verb3_text_length = $('#verbal3_text').val().length;
        var verb3_en_text_length = $('#verbal3_text_en').val().length;
        var desc_text_remaining = desc_text_max - desc_text_length;
        var desc_text_en_remaining = desc_text_max - desc_en_text_length;
        var verb1_text_remaining = verbal_text_max - verb1_text_length;
        var verb1_text_en_remaining = verbal_text_max - verb1_en_text_length;
        var verb2_text_remaining = verbal_text_max - verb2_text_length;
        var verb2_text_en_remaining = verbal_text_max - verb2_en_text_length;
        var verb3_text_remaining = verbal_text_max - verb3_text_length;
        var verb3_text_en_remaining = verbal_text_max - verb3_en_text_length;
        $('#desc_rem_char_alert').html(desc_text_remaining + ' characters remaining');
        $('#desc_en_rem_char_alert').html(desc_text_en_remaining + ' characters remaining');
        $('#verb1_rem_char_alert').html(verb1_text_remaining + ' characters remaining');
        $('#verb1_en_rem_char_alert').html(verb1_text_en_remaining + ' characters remaining');
        $('#verb2_rem_char_alert').html(verb2_text_remaining + ' characters remaining');
        $('#verb2_en_rem_char_alert').html(verb2_text_en_remaining + ' characters remaining');
        $('#verb3_rem_char_alert').html(verb3_text_remaining + ' characters remaining');
        $('#verb3_en_rem_char_alert').html(verb3_text_en_remaining + ' characters remaining');
    });
    /*
     * Page consultant for box-header
     */

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'pkcpkGetFirmVerbalConsultant_infoFirmVerbal',
            language_code: $("#langCode").val(),
            pk: $('#pk').val(),
            cpk: $('#cpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
                var cons_image_url = "https://" + window.location.hostname + "/onyuz/standard/assets/img/sfClients/" + data[0].cons_picture;
                if (data[0].communications_no) {
                    var tel_number = data[0].communications_no;
                } else {
                    var tel_number = '';
                }

                $('#consultant_div').css('display', 'block');
                $('#consultant_div').css('visibility', 'visible');
                $('#consultant_div').attr('data-balloon', 'Tel:' + tel_number);
                $('#consultant_div').attr('email_address', data[0].auth_email);
                $('#consultant_div').attr('page_consultant', data[0].name + " " + data[0].surname);
                $('#cons_image_ph').attr('src', cons_image_url);
                $('#cons_name_ph').empty();
                $('#cons_name_ph').append(data[0].name + " " + data[0].surname);
            } else {
                $('#consultant_div').css('display', 'none');
                $('#consultant_div').css('visibility', 'hidden');
                console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"consultants" servis hatasÃ„Â±->' + textStatus);

            $('#consultant_div').css('display', 'none');
            $('#consultant_div').css('visibility', 'hidden');
        }
    });
    /* 
     * Messages popups
     */
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
});
function send_general_info() {

    if ($('#general_firm_form').validationEngine('validate')) {
        if (window.verbal_id) {
//  console.log('update');
//  update url is used to update data
            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data: {
                    url: 'pkcpkUpdate_infoFirmVerbal',
                    pk: $("#pk").val(),
                    cpk: $("#cpk").val(),
                    lang_code: $('#langCode').val(),
                    profile_public: 0,
                    firm_name: $('#full_name_ph').val(),
                    firm_name_eng: $('#full_name_en_ph').val(),
                    firm_name_short: $('#short_name_ph').val(),
                    firm_name_en_short: $('#short_name_en_ph').val(),
                    about: $('#desc_text').val(),
                    about_eng: $('#desc_text_en').val(),
                    verbal1_title: $('#first_text_title').val(),
                    verbal2_title: $('#second_text_title').val(),
                    verbal3_title: $('#third_text_title').val(),
                    verbal1_title_eng: $('#first_text_title_en').val(),
                    verbal2_title_eng: $('#second_text_title_en').val(),
                    verbal3_title_eng: $('#third_text_title_en').val(),
                    verbal1: $('#verbal1_text').val(),
                    verbal2: $('#verbal2_text').val(),
                    verbal3: $('#verbal3_text').val(),
                    verbal1_eng: $('#verbal1_text_en').val(),
                    verbal2_eng: $('#verbal2_text_en').val(),
                    verbal3_eng: $('#verbal3_text_en').val(),
                    country_id: window.sel_count_id,
                    tax_office: $('#tax_office').val(),
                    tax_no: $('#tex_number').val(),
                    foundation_yearx: window.okan,
//                    duns_number: $('#tax_office').val(),
                    web_address: $('#website').val(),
                    id: window.verbal_id
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    sm.successMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information saved successfully'));
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    console.error(textStatus);
                    wm.warningMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information did not saved!!! Please check fiels and try again...'));
                }
            });
        } else {

//  console.log('insert');
//  insert url is used to insert data

            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data: {
                    url: 'pkcpkInsert_infoFirmVerbal',
                    pk: $("#pk").val(),
                    cpk: $("#cpk").val(),
                    lang_code: $('#langCode').val(),
                    profile_public: 0,
                    firm_name: $('#full_name_ph').val(),
                    firm_name_eng: $('#full_name_en_ph').val(),
                    firm_name_short: $('#short_name_ph').val(),
                    firm_name_short_eng: $('#short_name_en_ph').val(),
                    about: $('#desc_text').val(),
                    about_eng: $('#desc_text_en').val(),
                    verbal1_title: $('#first_text_title').val(),
                    verbal2_title: $('#second_text_title').val(),
                    verbal3_title: $('#third_text_title').val(),
                    verbal1_title_eng: $('#first_text_title_en').val(),
                    verbal2_title_eng: $('#second_text_title_en').val(),
                    verbal3_title_eng: $('#third_text_title_en').val(),
                    verbal1: $('#verbal1_text').val(),
                    verbal2: $('#verbal2_text').val(),
                    verbal3: $('#verbal3_text').val(),
                    verbal1_eng: $('#verbal1_text_en').val(),
                    verbal2_eng: $('#verbal2_text_en').val(),
                    verbal3_eng: $('#verbal3_text_en').val(),
                    country_id: window.sel_count_id,
                    tax_office: $('#tax_office').val(),
                    tax_no: $('#tex_number').val(),
                    foundation_yearx: window.okan,
//                    duns_number: $('#tax_office').val(),
                    web_address: $('#website').val()
//                    logo: $('#tax_office').val()
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    console.log('here');
                    sm.successMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information saved successfully'));
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    console.error(textStatus);
                    dm.successMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information did not saved!!! Please check fields and try again...'));
                }
            });
        }
    }
}

function reset_verbal_info() {
    wcm.warningComplexMessage('show', 'Are you sure?',
            'You are going to delete all verbal information. Do you want to continue?');

    wcm.warningComplexMessage({
        onConfirm: function () {
            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data: {
                    url: 'pkcpkDeletedAct_infoFirmVerbal',
                    id: window.verbal_id,
                    pk: $('#pk').val(),
                    cpk: $('#cpk').val()
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.length !== 0) {

                        sm.successMessage('show', window.lang.translate('Delete operation'), window.lang.translate('All verbal information erased successfully'))

                    } else {
                        console.error('"pkcpkDeletedAct_infoFirmVerbal" servis datasÃ„Â± boÃ…Å¸tur!!');
                        wm.warningMessage('show', window.lang.translate('Delete operation'), window.lang.translate('Unable to remove verbal information'))

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('"pkcpkDeletedAct_infoFirmVerbal" servis hatasÃ„Â±->' + textStatus);
                    wm.warningMessage('show', window.lang.translate('Delete operation'), window.lang.translate('Unable to remove verbal information'))

                }
            });
        }
    });

}

function milliseconds() {
    var input_date = $('#found_date').val();
    var entered_date = new Date(input_date);
    window.date_value = entered_date.getTime();
    window.okan = Math.round(window.date_value / 1000.0);
//    console.log(window.date_value);
//    console.log(okan);
}
