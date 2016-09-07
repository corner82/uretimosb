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
     * Start of left menu links
     */
    var npk = $('#selectedCompanyNpk').val();
    var currentLink = window.location.href;
    var companyprofilerootLink = window.location.host + "/ostim/sanalfabrika/";
    
    /*
     * due to problem in changing language in jquery plugin 
     * temporarily different language variables are assigned!!!
     *  
     */
    
    if($('#langCode').val() === 'en'){
        window.companyprofile = 'Profile';
        window.performance = 'Statistics and Meters';
        window.products = 'Products';
        window.machine_list = 'Machines List';
        window.members = 'Members';
        window.projects = 'Projects';
        window.comments = 'Comments';
        window.brief_history = 'History';
        window.profile_setting = 'Profile Settings';
    } else if($('#langCode').val() === 'tr'){
        window.companyprofile = 'Profil';
        window.performance = 'Göstergeler';
        window.products = 'Ürünler';
        window.machine_list = 'Makine Listesi';
        window.members = 'Çalışanlar';
        window.projects = 'Projeler';
        window.comments = 'Yorumlar';
        window.brief_history = 'Ticari Tarihçe';
        window.profile_setting = 'Profil Ayarları';
    } else if($('#langCode').val() === 'fa'){
        window.companyprofile = 'پروفایل شرکت';
        window.performance = 'معیارهای عملکرد';
        window.products = 'محصولات ';
        window.machine_list = 'لیست ماشین ابزار';
        window.members = 'کارکنان ';
        window.projects = 'پروژه ها ';
        window.comments = 'نظرات';
        window.brief_history = 'تاریخچه تجاری ';
        window.profile_setting = 'تنظیمات پروفایل';
    }

    /*
     * appendings left menu
     */
    

    var profilelink =
            "<li id='companyprofile' class='list-group-item' onclick=changeMenu(this)>"
            + "<a href='#' onmouseover='' style='cursor: pointer;'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.companyprofile
            + "</a>";
    +"</li>";
    var performancelink =
            "<li id='companyperformancemetersprofile' class='list-group-item' onclick=changeMenu(this)>"
            + "<a href='#' target='' onmouseover='' style='cursor: pointer;'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.performance
            + "</a>";
    +"</li>";
    var productslink =
            "<li id='companyproductsprofile' class='list-group-item' onclick=changeMenu(this)>"
            + "<a href='#' onmouseover='' style='cursor: pointer;'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.products
            + "</a>"
            + "</li>";
    var mtslink =
            "<li id='companymtprofile' tot_mach_count='' class='list-group-item list-toggle' onclick=ulActivation(this)>"
            + "<a id='companymtprofile_a' class='collapsed' data-toggle='collapse' "
            + "data-parent='#sidebar-nav-1'  href='#collapse_mach_cats'"
            + "aria-expanded='true'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.machine_list
            + "</a>"
            + "<ul id='collapse_mach_cats' class='collapse'>"
            + "</ul>"
            + "</li>";
    var memberslink =
            " <li id='companymembersprofile' class='list-group-item' onclick=changeMenu(this)>"
            + "<a href='#' onmouseover='' style='cursor: pointer;'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.members
            + "</a>"
            + "</li>";
    var projectslink =
            " <li id='companyprojectsprofile' class='list-group-item' onclick=changeMenu(this)>"
            + "<a href='#' onmouseover='' style='cursor: pointer;'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.projects
            + "</a>";
    +"</li>";
    var commentslink =
            "<li id='companycommentsprofile' class='list-group-item' onclick=changeMenu(this)>"
            + "<a href='#' onmouseover='' style='cursor: pointer;'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.comments
            + "</a>";
    +"</li>";
    var historylink =
            "<li id='companyhistoryprofile' class='list-group-item' onclick=changeMenu(this)>"
            + "<a href='#' onmouseover='' style='cursor: pointer;'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.brief_history
            + "</a>";
    +"</li>";
    var settingslink =
            "<li id='cpgeneralset' class='list-group-item' onclick=changeMenu(this)>"
            + "<a href='#' onmouseover='' style='cursor: pointer;'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.profile_setting
            + "</a>";
    +"</li>";

    /*
     * Check registered user and call required menu links
     */

    if ($('#pk').val() === '') {
        $('#sidebar-nav-1').empty();
        $('#sidebar-nav-1').append(
                profilelink
//                + productslink
                + mtslink
                + memberslink
//                + commentslink
//                + historylink
                );
    } else {
        $('#sidebar-nav-1').empty();
        $('#sidebar-nav-1').append(
                profilelink
                + performancelink
//                + productslink
                + mtslink
                + memberslink
//                + projectslink
//                + commentslink
//                + historylink
                + settingslink);
    }

    /*
     * Check active link
     */
//    string.indexOf(substring)
    var pagenpk = currentLink.replace('https://' + companyprofilerootLink, '');
    if (pagenpk.indexOf("#")) {
        pagenpk = pagenpk.substring(0, pagenpk.indexOf('#'));
    }
    var page = pagenpk.replace('/' + npk, '');

    $('.li').on('click', function () {
        $('.active').removeClass('active');
        $('.' + $(this).attr('class')).addClass('active');
    });

    /*
     * find which link is active according to url
     */

    var found_active = $('#requestUriRegulated').val().split('/');
    var active_action;

    if (found_active[1] === '--dil--') {
        active_action = found_active[4];
    } else {
        active_action = found_active[3];
    }

    if (active_action === 'companymtprofile') {
        $('#' + active_action).siblings().removeClass('active');
        $('#' + active_action).addClass('active');
//        console.log($('#companymtprofile_a').attr('aria-expanded'));
//        console.log($('#companymtprofile_a').attr('class'));

        $('#companymtprofile_a').attr('aria-expanded', true);
        $('#companymtprofile_a').attr('class', '');
        $('#collapse_mach_cats').addClass('in');
        $('#collapse_mach_cats').attr('aria-expanded', true);

//        console.log($('#companymtprofile_a').attr('aria-expanded'));
//        console.log($('#companymtprofile_a').attr('class'));

    } else {

        $('#' + active_action).siblings().removeClass('active');
        $('#' + active_action).addClass('active');
    }
});


function changeMenu(clicked_link) {
    var divided = $('#requestUriRegulated').val().split('/');
    var action;

    if (divided[1] === '--dil--') {
        action = divided[4];
    } else {
        action = divided[3];
    }

    $(clicked_link).siblings().removeClass('active');
    $(clicked_link).addClass('active');
//    console.log(window.location.href);

    var newURL = window.location.href.replace(action, clicked_link.id);
    window.location.replace(newURL);

}

function ulActivation(clicked) {
    if (!$('#companymtprofile').hasClass('.active')) {

        $('#companymtprofile').siblings().removeClass('active');
        $('#companymtprofile').addClass('.active');

        var divided = $('#requestUriRegulated').val().split('/');
        var action;

        if (divided[1] === '--dil--') {
            action = divided[4];
        } else {
            action = divided[3];
        }

        $(clicked).siblings().removeClass('active');
        $(clicked).addClass('active');

        var newURL = window.location.href.replace(action, clicked.id);
        window.location.replace(newURL);
    }

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
            var i;
            for (i = 0; i < data.length; i++) {
                
                var total_machines = 0;
                var appending =
                        "<li id='"
                        + data[i].machine_grup_id
                        + "' group_name='"
                        + data[i].group_name
//                        "<li id='"
//                        + id_name
//                        + "' group_id="
//                        + data[i].machine_grup_id
                        + "' onclick=gotLink(this)>"
                        + "<span class='badge rounded badge-red'>"
                        + data[i].machine_count
                        + "</span>"
                        + "<a href='#' onmouseover='' style='cursor: pointer;'>"
                        + "<i class='fa fa-chevron-circle-right'>"
                        + "</i>"
                        + data[i].group_name
//                        + window.lang.translate(data[i].group_name)
                        + "</a>"
                        + "</li>";

                $('#collapse_mach_cats').append(appending);
            }
        }
    });

}
