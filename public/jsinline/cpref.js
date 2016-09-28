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
     * Page consultant for box-header
     */

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'pkGetFirmVerbalConsultant_infoFirmVerbal',
            language_code: $("#langCode").val(),
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
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

                $('#consultant_div').attr('data-balloon', 'Tel:' + tel_number);
                $('#consultant_div').attr('email_address', data[0].auth_email);
                $('#consultant_div').attr('page_consultant', data[0].name + " " + data[0].surname);
                $('#cons_image_ph').attr('src', cons_image_url);
                $('#cons_name_ph').empty();
                $('#cons_name_ph').append(data[0].name + " " + data[0].surname);

            } else {
                console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"consultants" servis hatasÃ„Â±->' + textStatus);
        }
    });

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

    



});


var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: 'VazgeÃ§',
    actionButtonLabel: 'Ä°ÅŸleme devam et'});

/*
 * hides hidden sections of all tabs
 */

function hide_hidden_sections() {

    $('#hidden_send_ref').css('display', 'none');
    $('#hidden_send_ref').css('visibility', 'hidden');

    $('#sel_customer').val('');
    if ($('#hidden_send_ref').css('visibility') === 'hidden') {
        $('html, body').animate({
            scrollTop: $(".box-title").offset().top
        }, 1000);
    }
}
