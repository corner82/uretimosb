$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());

//    console.log($('#pk').val());
    $('#loging_ph').empty();

    if ($('#pk').val()) {
        var list_service_url = 'pkFillCompanyLists_infoFirmProfile';
        var loging_value = window.lang.translate('Log out');
    } else {
        var list_service_url = 'fillCompanyListsGuest_infoFirmProfile';
        var loging_value = window.lang.translate('Log in');
    }
    $('#loging_ph').append(loging_value);


    $("#pagination_content").empty();
    //    $("#pagination_content").html("Page " + num); // or some ajax content loading...
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        //                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',            
        data: {
            url: list_service_url,
            pk: $('#pk').val(),
            language_code: $("#langCode").val(),
            page: 1,
            rows: 10,
            sort: null,
            order: null
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);
            var i;
            // @companyperpage = 10 company will be shown per page
            window.companyperpage = 10;
            var numberofpages = ~~(data.total / window.companyperpage);
            var remainingcompanynumber = data.total % window.companyperpage;
            window.totalnumberofpages;
            if (remainingcompanynumber > 0) {
                window.totalnumberofpages = numberofpages + 1;
            } else {
                window.totalnumberofpages = numberofpages;
            }
            for (i = 0; i < window.companyperpage; i++) {
                $('#selectedCompanyNpk').val(data.rows[i].npk);
                var rep_firm_short_name = data.rows[i].firm_name_short.toString().replace(" ", "-");
                $('#selectedCompanyShN').val(rep_firm_short_name);
                var companyProfileLink = window.location.href.replace(/clientspage/, "companyprofile/" + $('#selectedCompanyShN').val() + "/" + $('#selectedCompanyNpk').val());

                var appending_html =
                        "<!-- Clients Block-->"
//                        + "<a href='#'>"
                        + "<div class='row clients-page'>"
                        + "<div class = 'col-md-2'>"
                        + "<img src='/onyuz/standard/assets/img/sfClients/"
                        + data.rows[i].logo
                        + "' "
                        + "class = 'img-responsive hover-effect' alt = '' / >"
                        + "</div>"
                        + "<div class = 'col-md-10' id='"
                        + data.rows[i].npk
                        + "'>"
                        + "<a href='"
                        + companyProfileLink
                        + "'>"
                        + "<h3>"
                        + data.rows[i].firm_names
                        + "</h3>"
                        + "</a>"
                        + "<ul class = 'list-inline'>"
                        + "<li>"
                        + "<i class = 'fa fa-map-marker color-green'></i>"
                        + data.rows[i].country_names
                        + "</li>"
                        + "<li><i class = 'fa fa-globe color-green'></i>"
                        + "<a class='linked' href='"
                        + data.rows[i].web_address
                        + "'>"
                        + data.rows[i].web_address
                        + "</a>"
                        + "</li>"
                        + "<li>"
                        + "<i class = 'fa fa-briefcase color-green'> </i>"
//                        + data[i].sectors
                        + "</li>"
                        + "</ul>"
                        + "<p>"
                        + data.rows[i].descriptions
                        + "</p>"
                        + "</div>"
//                                    + "</div>"
//                                    + "</a>"
                        + "<!-- End Clinets Block --> ";
//                            console.log(appending_html);
                var newappend = $(appending_html);
                $(newappend).appendTo($("#pagination_content"));

            }
            $("html, body").animate({scrollTop: $(".header").offset().top}, "slow");
            event.preventDefault();

            $('#paginationBar').paginator();
            $('#paginationBar').paginator('option', 'total', window.totalnumberofpages);
            $('#paginationBar').paginator('option', 'maxVisible', 5);
            $('#paginationBar').paginator('paginate');
        }
    });

});

