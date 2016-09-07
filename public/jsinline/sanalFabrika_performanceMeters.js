$(document).ready(function () {
    window.i = 0;

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());
//    console.log($('#selectedCompanyNpk').val());

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
        data: {url: 'fillCompanyInfoEmployeesGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);

            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/';

            window.logosrc = imageFolAddress + data[0].logo;

            $('#profileLogosrc').attr('src', window.logosrc);

            var total_employees = data[0].number_of_employees;
            $('#number_of_employees').append(total_employees);
            document.getElementById('employee_per_bar').style.width = '100%';

            var number_of_engineers = data[0].number_of_engineer;
            $('#number_of_engineers').append(number_of_engineers);
            var engineer_percentage = (number_of_engineers / total_employees) * 100;
            $('#eng_per_bar').attr('aria-valuenow', engineer_percentage);
            document.getElementById('eng_per_bar').style.width = engineer_percentage + '%';

            var number_of_technicians = data[0].number_of_technician;
            $('#number_of_technicians').append(number_of_technicians);
            var technician_percentage = (number_of_technicians / total_employees) * 100;
            $('#tech_per_bar').attr('aria-valuenow', technician_percentage);
            document.getElementById('tech_per_bar').style.width = technician_percentage + '%';

            var number_of_for_trd_staff = data[0].number_of_foreign_trade_staff;
            $('#number_of_for_trd_staff').append(number_of_for_trd_staff);
            var for_trd_staff_percentage = (number_of_for_trd_staff / total_employees) * 100;
            $('#for_per_bar').attr('aria-valuenow', for_trd_staff_percentage);
            document.getElementById('for_per_bar').style.width = for_trd_staff_percentage + '%';
        }
    });
});

function listOfCertificates() {

//    console.log('Available Certificates');
    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {
        var appending =
                "<hr>"
                + "<div class='col-xs-3'>"
                + "<img style='width:100px; height: 100px' "
                + "src='../../../../onyuz/standard/assets/img/sfClients/Images/Certificates/ISO_9001.jpg'"
                + "alt=''>"
                + "</div>"
                + "<div class='col-xs-9'>"
                + "<header>"
                + "<h3>"
                + window.lang.translate('ISO 9001')
                + "</h3>"
                + "</header>"
                + "<div>"
                + "<p>"
                + window.lang.translate('EMGE has ISO 9001 Quality Standard')
                + "</p>"
                + "</div>"
                + "</div>"
                + "<hr>";

        $("#qualityDetailsInsideDIV").append(appending);
        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }
}

function qualityHistory() {

//    console.log('Qulaity History');
    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {
        window.i++;
//        $("#qualityDetailsInsideDIV").append('history ' + i + ' , ');
        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }
}



function qualityPerformances() {

    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {

        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }

}


function performanceDetails() {

    if ($("#pastPerformanceDetailsDIV").hasClass('active')) {
        $("#pastPerformanceDetailsDIV").removeClass('active');
        $("#pastPerformanceDetailsDIV").slideUp('Slow');
        $("#pastPerformanceDetailsInsideDIV").empty();
    } else {

        $("#pastPerformanceDetailsDIV").addClass("active");
        $("#pastPerformanceDetailsDIV").slideDown("slow");
    }

}

function customerDetails() {

    if ($("#customerDetailsDIV").hasClass('active')) {
        $("#customerDetailsDIV").removeClass('active');
        $("#customerDetailsDIV").slideUp('Slow');
        $("#customerDetailsInsideDIV").empty();

    } else {

//        $("#customerDetailsInsideDIV").append();
        $("#customerDetailsDIV").addClass("active");
        $("#customerDetailsDIV").slideDown("slow");
    }

}