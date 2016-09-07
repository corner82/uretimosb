$(document).ready(function () {
    
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
            url: 'pkFillFirmMachineGroupsCounts_infoFirmMachineTool',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $('#pk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            $('#collapse_mach_cats').empty();
            $('#filters-container').empty();
            $('#filters-container').append(
                    "<div data-filter='*' class='cbp-filter-item-active cbp-filter-item'>"
                    + window.lang.translate('All')
                    + "</div> |");
            var i;
            window.total_machines = parseFloat(0);
            $('#companymtprofile').attr('tot_mach_count', window.total_machines);
            for (i = 0; i < data.length; i++) {

                var appending =
                        "<li id='"
                        + data[i].machine_grup_id
                        + "' group_name='"
                        + data[i].group_name
                        + "' onclick=gotLink(this)>"
                        + "<span class='badge rounded badge-red'>"
                        + data[i].machine_count
                        + "</span>"
                        + "<a href='#' onmouseover='' style='cursor: pointer;'>"
                        + "<i class='fa fa-chevron-circle-right'>"
                        + "</i>"
                        + window.lang.translate(data[i].group_name)
                        + "</a>"
                        + "</li>";
                $('#collapse_mach_cats').append(appending);
                var appending2 =
                        "<div data-filter='."
                        + data[i].group_name
                        + "' class='cbp-filter-item'>"
                        + window.lang.translate(data[i].group_name)
                        + "</div> |";
                $('#filters-container').append(appending2);
                window.total_machines += parseFloat(data[i].machine_count);
            }

            /*
             * here total number of machines are populated
             * 
             * for getting number of cncs, unavailable and special machines machine attributes 
             * must be controled from service
             */

            $('#companymtprofile').attr('tot_mach_count', window.total_machines);
            $('#total_machs').empty();
            $('#total_machs').append(window.total_machines);
        }
    });
    
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
            $('#logoPlace1').attr('src', window.logosrc);
        }
    });
    $('#total_machs').append();
});
/*
 * 
 * here this function manages data table of machines on click event of company
 * machine tools sub menus
 * @author: Bahram
 * @Since: 2016.4.7
 */

function gotLink(clicked) {

    $('#companymtprofile').addClass('.active');
    if ($('#table_place_holder').css('visibility', 'hidden')) {
        $('#table_place_holder').css('visibility', 'visible');
        $('#table_place_holder').css('display', 'block');
        $('#machine_details_DIV').empty();
        $('#selectedMachineNamePH').empty();
        $('#machine_details_DIV').css('visibility', 'hidden');
        $('#machine_details_DIV').css('display', 'none');
        $('#selected_machine_divider').css('visibility', 'hidden');
        $('#selected_machine_divider').css('display', 'none');
    }

    $('#tab_header').empty();
    $('#tab_header').append($('#' + clicked.id).attr('group_name'));
    $('#machines_table').bootstrapTable("destroy");
    $('#machines_table').bootstrapTable({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        queryParams: {
            url: 'pkFillUsersFirmMachinesNpk_infoFirmMachineTool',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $('#pk').val(),
            machine_grup_id: clicked.id
        },
        toolbar: '#toolbar',
//                data: data.rows,
//                total: data.rows.length,
        pagination: true,
        search: true,
        showRefresh: true,
        showToggle: true,
//        showColumns: true,
//        detailView: true,
//        showPaginationSwitch: true,
        idField: "id",
        showFooter: false,
//        responseHandler:"responseHandler",
        pageList: '[10, 25, 50, 100, ALL]',
        undefinedText: '',
//        detailFormatter:
//          function (index, row, element) {
//              alert(row.id);
//          },
        columns: [
            {
                field: 'id',
                title: window.lang.translate('Id'),
                sortable: true,
                visible: false

            },
            {
                field: 'machine_id',
                title: window.lang.translate('Machine Id'),
                sortable: true,
                visible: false
            },
            {
                field: 'machine_tool_names',
                title: window.lang.translate('Machine Name'),
                sortable: true
            },
            {
                field: 'manufacturer_name',
                title: window.lang.translate('Manufacturer Name'),
                sortable: true
            },
            {
                field: 'model',
                title: window.lang.translate('Model'),
                sortable: true
            },
            {
                field: 'model_year',
                title: window.lang.translate('Model Year'),
                sortable: true
            },
            {
                field: 'total',
                title: window.lang.translate('Number'),
                sortable: true
            },
            {
                field: 'picture',
                title: window.lang.translate('picture'),
                sortable: true,
                visible: false
            }]
    });
}

$('#machines_table').on('click-row.bs.table', function (e, row, $element) {

    if ($('#machine_details_DIV').css('display') === 'block') {

        if ($('#machine_details_DIV').attr('lastIndex') === row.machine_id) {

            $('#selected_machine_divider').css('visibility', 'hidden');
            $('#selected_machine_divider').css('display', 'none');

            $('#machine_details_DIV').css('visibility', 'hidden');
            $('#machine_details_DIV').css('display', 'none');

        } else {

            $('#machine_details_DIV').empty();
            $('#machine_details_DIV').attr('lastIndex', row.machine_id);

            $('#selectedMachineNamePH').empty();
            $('#selectedMachineNamePH').append(row.machine_tool_names);

            var appending =
                    "<div class='funny-boxes funny-boxes-top-sea'>"
                    + "<div class='row'>"
                    + "<div class='left-inner'>"
                    + "<div class='progression'>"
                    + "<h3>"
                    + window.lang.translate('Machine Details')
                    + "</h3>"
                    + "<div class='row'>"
                    + "<a href="
                    + "https://" + window.location.hostname
                    + "/onyuz/standard/assets/img/sfClients/EMGE/"
                    + row.picture
                    + ">"
                    + "<img class='mach_sample' src="
                    + " https://" + window.location.hostname
                    + "/onyuz/standard/assets/img/sfClients/EMGE/"
                    + row.picture
                    + " alt=''>"
                    + "</a>"
                    + "</div>"
                    + "<div class='row'>"
                    + "<div class='panel panel-profile no-bg'>"
                    + "<div class='panel-heading overflow-h'>"
                    + "<h2 class='panel-title heading-sm pull-left'>"
                    + "<i class='fa fa-pencil'>"
                    + "</i>"
                    + row.manufacturer_name
                    + " "
                    + row.machine_tool_names
                    + " "
                    + window.lang.translate('detailed properties')
                    + "</h2>"
                    + "<a href='#'>"
                    + "<i class='fa fa-cog pull-right'></i>"
                    + "</a>"
                    + "</div>"
                    + "<div id='scrollbar' id='mach_det_prop' "
                    + "class='panel-body no-padding mCustomScrollbar' "
                    + "data-mcs-theme='minimal-dark'>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</div>";


            $('#machine_details_DIV').append(appending);

            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                //                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',            
                data: {
                    url: 'pkGetMachineProperities_sysMachineTools',
                    language_code: $("#langCode").val(),
//                    npk: $('#selectedCompanyNpk').val(),
                    pk: $('#pk').val(),
                    machine_id: row.machine_id
                },
                method: "GET",
                dataType: "json",
                success: function (data) {
                    window.colors = ["color-one", "color-two", "color-three", "color-four", "color-five", "color-six", "color-seven"];

                    for (var i = 0; i < data.length; i++) {
                        var picked_color = window.colors[Math.floor(Math.random() * window.colors.length)];

                        var appending2 =
                                "<div class='profile-post "
                                + picked_color
                                + "'>"
                                + "<span class='profile-post-numb' style='width:200px;font-size:12px'>"
                                + data[i].property_name
                                + "</span>"
                                + "<div class='profile-post-in'>"
                                + "<div class='col-md-6'>"
                                + "<h3 class='heading-xs'>"
                                + data[i].property_value
                                + "</h3>"
                                + "</div>"
                                + "<div class='col-md-6'>"
                                + "<h3 class='heading-xs'>"
                                + data[i].unitcode
                                + "</h3>"
                                + "</div>"
                                + "<p></p>"
                                + "</div>"
                                + "</div>";

                        $('#scrollbar').append(appending2);

                    }
                }
            });

            $('#machine_details_DIV').css('visibility', 'visible');
            $('#machine_details_DIV').css('display', 'block');

            if ($('#machine_details_DIV').css('visibility') === 'visible') {
                $('html, body').animate({
                    scrollTop: $("#machine_details_DIV").offset().top
                }, 1000);
            }
        }
    } else {

        $('#machine_details_DIV').empty();
        $('#machine_details_DIV').attr('lastIndex', row.machine_id);

        $('#selectedMachineNamePH').empty();
        $('#selectedMachineNamePH').append(row.machine_tool_names);

        $('#selected_machine_divider').css('visibility', 'visible');
        $('#selected_machine_divider').css('display', 'block');

        var appending =
                "<div class='funny-boxes funny-boxes-top-sea'>"
                + "<div class='row'>"
                + "<div class='left-inner'>"
                + "<div class='progression'>"
                + "<h3>"
                + window.lang.translate('Machine Details')
                + "</h3>"
                + "<div class='row'>"
                + "<a href="
                + "https://" + window.location.hostname
                + "/onyuz/standard/assets/img/sfClients/EMGE/"
                + row.picture
                + ">"
                + "<img class='mach_sample' src="
                + " https://" + window.location.hostname
                + "/onyuz/standard/assets/img/sfClients/EMGE/"
                + row.picture
                + " alt=''>"
                + "</a>"
                + "</div>"
                + "<div class='row'>"
                + "<div class='panel panel-profile no-bg'>"
                + "<div class='panel-heading overflow-h'>"
                + "<h2 class='panel-title heading-sm pull-left'>"
                + "<i class='fa fa-pencil'>"
                + "</i>"
                + row.manufacturer_name
                + " "
                + row.machine_tool_names
                + " "
                + window.lang.translate('detailed properties')
                + "</h2>"
                + "<a href='#'>"
                + "<i class='fa fa-cog pull-right'></i>"
                + "</a>"
                + "</div>"
                + "<div id='scrollbar' id='mach_det_prop' "
                + "class='panel-body no-padding mCustomScrollbar' "
                + "data-mcs-theme='minimal-dark'>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>";


        $('#machine_details_DIV').append(appending);

        $.ajax({
            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            //                url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',            
            data: {
                url: 'pkGetMachineProperities_sysMachineTools',
                language_code: $("#langCode").val(),
//                    npk: $('#selectedCompanyNpk').val(),
                pk: $('#pk').val(),
                machine_id: row.machine_id
            },
            method: "GET",
            dataType: "json",
            success: function (data) {
                window.colors = ["color-one", "color-two", "color-three", "color-four", "color-five", "color-six", "color-seven"];

                for (var i = 0; i < data.length; i++) {
                    var picked_color = window.colors[Math.floor(Math.random() * window.colors.length)];

                    var appending2 =
                            "<div class='profile-post "
                            + picked_color
                            + "'>"
                            + "<span class='profile-post-numb' style='width:200px;font-size:12px'>"
                            + data[i].property_name
                            + "</span>"
                            + "<div class='profile-post-in'>"
                            + "<div class='col-md-6'>"
                            + "<h3 class='heading-xs'>"
                            + data[i].property_value
                            + "</h3>"
                            + "</div>"
                            + "<div class='col-md-6'>"
                            + "<h3 class='heading-xs'>"
                            + data[i].unitcode
                            + "</h3>"
                            + "</div>"
                            + "<p></p>"
                            + "</div>"
                            + "</div>";

                    $('#scrollbar').append(appending2);
                }
            }
        });

        $('#machine_details_DIV').css('visibility', 'visible');
        $('#machine_details_DIV').css('display', 'block');

        if ($('#machine_details_DIV').css('visibility') === 'visible') {
            $('html, body').animate({
                scrollTop: $("#machine_details_DIV").offset().top
            }, 1000);
        }

    }

});





