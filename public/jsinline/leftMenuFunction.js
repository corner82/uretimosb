
(function ($) {
    
    $.fn.leftMenuFunction = function (data) {

//       alert($("#pk").val());
//      console.log('publicKey is ' + $("#pk").val());
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
//                menu_types_id:
            },
            method: "GET",
            //async: false,
            dataType: "json",
            success: function (data) {
                /*
                 * Bu değişkenler url kontrol için kullanılmaktadır.
                 */

                var currentPath = window.location.hostname
                        + $("#requestUriRegulated").val()
                        .replace('--dil--', $("#langCode").val());

                var currentPathArray = currentPath.split('/');
                var current_action = $('#controller').val();

//            var langIndex = currentPathArray.indexOf($("#langCode").val());
//            var urlArraySize = currentPathArray.length;

                // Ana menü değişkenleri
                //console.log(data);
                var len = data.length;
                var i = 0;
                for (i; i < len; i++) {

                    if (data[i].collapse === 0) {   
                        
                        var target_link = currentPath.replace(current_action,data[i].url);
                        
                        var appending_html = "<li id='menu_" +
                                data[i].id + "'><a class='test' href='https://" +
                                target_link + "'><i class='fa " +
                                data[i].icon_class + "'></i><span>" +
                                data[i].menu_name + "</span></a></li>";
                        /*var appending_html = "<li id='menu_" +
                                data[i].id + "'><a ><i class='fa " +
                                data[i].icon_class + "'></i><span>" +
                                data[i].menu_name + "</span></a></li>";*/  

                        var newappend = $(appending_html);

                    } else {
                        var target_link = currentPath.replace(current_action,data[i].url);

                        var appending_html = "<li class='treeview' id='menu_" +
                                data[i].id + "'><a class='test' href='https://" +
                                target_link + "'><i class='fa " +
                                data[i].icon_class + "'></i><span>" +
                                data[i].menu_name +
                                "</span><i class='fa fa-angle-left pull-right'></i></a></li>";
                        
                        /*var appending_html = "<li class='treeview' id='menu_" +
                                data[i].id + "'><a href='#' ><i class='fa " +
                                data[i].icon_class + "'></i><span>" +
                                data[i].menu_name +
                                "</span><i class='fa fa-angle-left pull-right'></i></a></li>";*/

                        var newappend = $(appending_html);
                    }

                    $(newappend).appendTo($("#leftside-menu"));

                    /*
                     * Bu bölüm ana menü url kontrolunu yapmaktadır. 
                     * url menu iteminin url ile eşleşiyorsa o şıkkı 
                     * açacaktır ve sayfa yüklendiğinde açık 
                     * gözükecektir.
                     */

                    for (var c = 3; c < currentPathArray.length; c++) {

                        var data_url = data[i].url;
                        if (data[i].url) {

                            var sep_data_url = data_url.split('/');
                            var href_action = sep_data_url[sep_data_url.length - 1];
//                            var current_action = currentPathArray[currentPathArray.length - 1];
                            var current_action = $('#controller').val(); 

                            if (href_action === current_action) {
                                var targetParentinURL = currentPathArray[c];
                                var targetParentinURLId = data[i].id;
                                var targetItem = $('#menu_' + targetParentinURLId);

                                $(targetItem).slideDown('normal', function () {
                                    $(targetItem).addClass('active');
                                    $(targetItem).trigger('click');
                                    $.AdminLTE.dynamicTree(this);
                                });
                                event.stopPropagation();
                            }
                        }




                    }
                    /*
                     * Click fonksiyonu yeni append edilen şıkka eklenir
                     */

                    $(newappend).on("click", function (event) {
//                    console.log(event);
                        //alert(event.target);
                        //alert(this);
                        //$.AdminLTE.dynamicTree(this);
                    });

                    // bir sonraki ekleme için append boşaltılır...
                    newappend = null;
                }
            }
        });
    };
}(jQuery));


