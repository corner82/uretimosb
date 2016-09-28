$(document).ready(function () {
    //    console.log($('#sidebar-nav-1 li').length);
    for (var i = 1; i <= $('#sidebar-nav-1 li').length; i++) {

        var current_element = $("#sidebar-nav-1 li:nth-child(" + i + ")");

        var li_url = $("a", current_element).attr('href');
        if (li_url === window.location.href) {
            $('#' + current_element[0].id).siblings().removeClass('active');
            $('#' + current_element[0].id).addClass('active');
        }
    }


    if (window.location.href.indexOf('companymtprofile') > 0) {
//

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

                if (data.length > 0) {

                    $('#machine_park_menu').attr('visibility', 'visible');
                    $('#machine_park_menu').attr('display', 'block');
                    for (var j = 0; j < data.length; j++) {

//                        $('#sidebar-nav-2').append(data.group_name);

                        $("#collapse-timeline").append("<li id='"
                                + data[j].machine_grup_id
                                + "' group_name='" + data[j].group_name + "'"
                                + "' onclick='gotLink(this)'>"
                                + "<span class='badge badge-u'>"
                                + data[j].machine_count
                                + "</span><a><i class='fa fa-dot-circle-o'></i>"
                                + data[j].group_name
                                + "</li></a>");
                    }
                }
            }
        });
    } else {
        $('#machine_park_menu').attr('visibility', 'hidden');
        $('#machine_park_menu').attr('display', 'none');
    }
});

(function ($) {
//console.log($('#controller').val());

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//        url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
        data: {
            parent: 0,
            pk: $("#pk").val(),
            url: 'pkGetLeftMenu_leftnavigation',
            language_code: $("#langCode").val(),
            m: $("#module").val(),
            a: $("#controller").val()
        },
        method: "GET",
        //async: false,
        dataType: "json",
        success: function (data) {
            /*
             * Bu değişkenler url kontrol için kullanılmaktadır.
             */

            if (data.lenth !== null) {
                $('#sidebar-nav-1').empty();


                // Ana menü değişkenleri
                var currentPath = window.location.hostname
                        + $("#requestUriRegulated").val()
                        .replace('--dil--', $("#langCode").val());
                var currentPathArray = currentPath.split('/');

                var len = data.length;
                var i = 0;
                for (i; i < len; i++) {

                    if (data[i].collapse === 0) {
                        for (var c = 0; c < currentPathArray.length; c++) {
                            if (currentPathArray[c] === 'sanalfabrika') {
                                var changing = currentPathArray[c + 1];
                            }
                        }
                        var newurl = currentPath.replace(changing, data[i].url);

                        var appending_html = "<li id='" +
                                data[i].id + "' class='list-group-item' onclick=activateLink(this)><a href='https://" +
                                newurl + "' style='cursor: pointer; '>" +
//                                "<i class='fa " +
//                                data[i].icon_class + "'>" + 
                                "<span>" +
                                data[i].menu_name + "</span></a></li>";

                        var newappend = $(appending_html);

                    } else {
                        for (var c = 0; c < currentPathArray.length; c++) {
                            if (currentPathArray[c] === 'sanalfabrika') {
                                var changing = currentPathArray[c + 1];
                            }
                        }
                        var newurl = currentPath.replace(changing, data[i].url);

                        var appending_html = "<li id='" + "" +
                                data[i].id + "' tot_mach_count='' class='list-group-item list-toggle' onclick=getSubmenu(this)> \n\
                                                <a id='" +
                                data[i].id + "_a' class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#sidebar-nav' \n\
                                                href='" +
                                newurl + "' aria-expanded='false'>" +
//                                "<i class='fa " +
//                                data[i].icon_class + "'></i>" + 
                                "<span>" +
                                data[i].menu_name + "</span>\n\
                                                     </a><ul id='" +
                                data[i].id + "_ul' class='collapse'>\n\
                                                     </ul></li>";

                        var newappend = $(appending_html);
                    }

                    $(newappend).appendTo($("#sidebar-nav-1"));



                    /*
                     * Click fonksiyonu yeni append edilen şıkka eklenir
                     */
                   $(newappend).on("click", function (event) {
//                    console.log(event);
                    //alert(event.target);
                    //alert(this);
                           $.AdminLTE.dynamicTree(this);
                       });
                    // bir sonraki ekleme için append boşaltılır...
                    newappend = null;
                }
            }
        }
    });

}(jQuery));

function activateLink(clicked) {
    $('#' + clicked.id).siblings().removeClass('active');
    $('#' + clicked.id).addClass('active');
}

function getSubmenu(clicked) {

    if ($('#' + clicked.id).hasClass('active')) {
//        alert('aktif dir');
//        $('#' + clicked.id).removeClass('active');
        $('#' + clicked.id + '_a').attr('class', '');
        $('#' + clicked.id + '_a').removeClass('collapse in');
        $('#' + clicked.id + '_a').addClass('collapsed');
        $('#' + clicked.id + '_a').attr('aria-expanded', false);
        $('#' + clicked.id + '_ul').removeClass('collapse in');
        $('#' + clicked.id + '_ul').addClass('collapse');
    } else {
//        alert('aktif degil');
//        $('#' + clicked.id).addClass('active');
        $('#' + clicked.id + '_a').attr('class', 'active');
        $('#' + clicked.id + '_a').removeClass('collapsed');
        $('#' + clicked.id + '_a').addClass('collapse in');
        $('#' + clicked.id + '_a').attr('aria-expanded', true);
        $('#' + clicked.id + '_ul').removeClass('collapse');
        $('#' + clicked.id + '_ul').addClass('collapse in');
    }

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//        url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
        data: {
            parent: clicked.id,
            pk: $("#pk").val(),
            url: 'pkGetLeftMenu_leftnavigation',
            language_code: $("#langCode").val(),
            menu_types_id: 3
        },
        method: "GET",
        //async: false,
        dataType: "json",
        success: function (data) {
//            console.log(data);
            if (data.lenth !== null) {
                $('#' + clicked.id + '_ul').empty();

                // Ana menü değişkenleri
                var currentPath = window.location.hostname
                        + $("#requestUriRegulated").val()
                        .replace('--dil--', $("#langCode").val());
                var currentPathArray = currentPath.split('/');
                var len = data.length;
                var i = 0;
                for (i; i < len; i++) {

                    if (data[i].collapse === 0) {
                        for (var c = 0; c < currentPathArray.length; c++) {
                            if (currentPathArray[c] === 'sanalfabrika') {
                                var changing = currentPathArray[c + 1];
                            }
                        }
                        var newurl = currentPath.replace(changing, data[i].url);
                        var appending_html = "<li id='" +
                                data[i].id + "' class='list-group-item' onclick=activateLink(this)><a href='" +
                                data[i].url + "' style='cursor: pointer;'>" +
//                                "<i class='fa " +
//                                data[i].icon_class + "'>" + 
                                "<span>" +
                                data[i].menu_name + "</span></a></li>";

                        var newappend = $(appending_html);

                    } else {
                        for (var c = 0; c < currentPathArray.length; c++) {
                            if (currentPathArray[c] === 'sanalfabrika') {
                                var changing = currentPathArray[c + 1];
                            }
                        }
                        var newurl = currentPath.replace(changing, data[i].url);

                        var appending_html = "<li id='" + "" +
                                data[i].id + "' tot_mach_count='' class='list-group-item list-toggle' onclick=getSubmenu(this)> \n\
                                                <a id='" +
                                data[i].id + "_a' class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#sidebar-nav' \n\
                                                href='" +
                                newurl + "' aria-expanded='false'>" +
//                                "<i class='fa " +
//                                data[i].icon_class + "'></i>" + 
                                "<span>" +
                                data[i].menu_name + "</span>\n\
                                                     </a><ul id='" +
                                data[i].id + "_ul' class='collapse'>\n\
                                                     </ul></li>";

                        var newappend = $(appending_html);
                    }

                    $(newappend).appendTo($('#' + clicked.id + '_ul'));

//                        

                    /*
                     * Click fonksiyonu yeni append edilen şıkka eklenir
                     */

//                        $(newappend).on("click", function (event) {
//                    console.log(event);
                    //alert(event.target);
                    //alert(this);
//                            $.AdminLTE.dynamicTree(this);
//                        });
                    // bir sonraki ekleme için append boşaltılır...
                    newappend = null;
                }
            }
        }
    });
}


