$(document).ready(function () {

    window.i = 0;

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());
    
    $('#header_company_name').empty();
    $('#header_company_name').append("<i class='fa fa-user'></i>" + $('#selectedCompanyShN').val().toUpperCase());


    $('#loging_ph').empty();

    if ($('#pk').val()) {
        var loging_value = window.lang.translate('Log out');
    } else {
        var loging_value = window.lang.translate('Log in');
    }
    $('#loging_ph').append(loging_value);


    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        //                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',            
        data: {
            url: 'fillCompanyInfoEmployeesGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);
            
            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/logos/';
                                
            window.logosrc = imageFolAddress + data[0].logo;
            
            $('#profileLogosrc').attr('src', window.logosrc);
            $('#logoPlace1').attr('src', window.logosrc);

        }
    });
});