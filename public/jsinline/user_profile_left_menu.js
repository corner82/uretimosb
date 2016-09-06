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
    var currentLink = window.location.href;
    var userprofilerootLink = window.location.host + "/ostim/sanalfabrika/";

    /*
     * due to problem in changing language in jquery plugin 
     * temporarily different language variables are assigned!!!
     *  
     */

    if ($('#langCode').val() === 'en') {
        window.userprofile = 'Profile';
//        window.connections = 'Connection';
        window.profile_setting = 'Profile Settings';
    } else if ($('#langCode').val() === 'tr') {
        window.userprofile = 'Profil';
//        window.connections = 'İlişkiler';
        window.profile_setting = 'Profil Ayarları';
    } else if ($('#langCode').val() === 'fa') {
        window.userprofile = 'پروفایل شرکت';
//        window.connections = 'ارتباطات';
        window.profile_setting = 'تنظیمات پروفایل';
    }

    /*
     * appendings left menu
     */
    var profilelink =
            "<li id='userprofile' class='list-group-item' onclick=changeMenu(this)>"
            + "<a href='#' onmouseover='' style='cursor: pointer;'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.userprofile
            + "</a>";
    +"</li>";
//    var connectionslink =
//            "<li id='userconnprof' class='list-group-item' onclick=changeMenu(this)>"
//            + "<a href='#' target='' onmouseover='' style='cursor: pointer;'>"
//            + "<i class='fa fa-bar-chart-o'>"
//            + "</i>"
//            + window.connections
//            + "</a>";
//    +"</li>";
    var settingslink =
            "<li id='uprofset' class='list-group-item' onclick=changeMenu(this)>"
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
                profilelink +
//                connectionslink +
                settingslink
                );
    } else {
        $('#sidebar-nav-1').empty();
        $('#sidebar-nav-1').append(
                profilelink +
//                connectionslink +
                settingslink
                );
    }

    /*
     * Check active link
     */
//    string.indexOf(substring)
    
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

    $('#' + active_action).siblings().removeClass('active');
    $('#' + active_action).addClass('active');
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
