/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscountrys',
            language_code: $("#langCode").val()

        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {
                    var appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newappendingOption = $(appending_option_html);
                    $(newappendingOption).appendTo($("#country1"));

//                    $(newappendingOption).on("click", function (event) {

//                    });

                    var appending_option_html_2 = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newappendingOption_2 = $(appending_option_html_2);
                    $(newappendingOption_2).appendTo($("#country2"));

//                    $(newappendingOption).on("click", function (event) {

//                    });
                }
            }
        }
    });

    // Left menuyu oluşturmak için çağırılan fonksiyon...
    $.fn.leftMenuFunction();
    
    /* 
     * ara yüzde kullanılan maskeler ve select 2 drop down fonksiyonları
     */   
    
    $(".select2").select2();
    //Datemask dd/mm/yyyy
    $("#datemask").inputmask("dd/mm/yyyy", {"placeholder": "dd/mm/yyyy"});
    //Money Euro
    $("[data-mask]").inputmask();

});

$("select#country1").on('change', function () {

    var selectedCountry1 = $('#country1 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedCountry1Id = $('#country1 :selected').val();

    $("#city1").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscity',
            country_id: selectedCountry1Id,
            language_code: $("#langCode").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var city_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newcityappendingOption = $(city_appending_option_html);
                    $(newcityappendingOption).appendTo($("#city1"));

//                    $(newappendingOption).on("click", function (event) {

//                    });

                }
            }
        }
    });
});

$("select#country2").on('change', function () {

    var selectedCountry2 = $('#country2 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedCountry2Id = $('#country2 :selected').val();

    $("#city2").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscity',
            country_id: selectedCountry2Id,
            language_code: $("#langCode").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var city_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newcityappendingOption = $(city_appending_option_html);
                    $(newcityappendingOption).appendTo($("#city2"));
//                    $(newappendingOption).on("click", function (event) {
//                    
//                    });
                }
            }
        }
    });
});

$("select#city1").on('change', function () {

    var selectedCity1 = $('#city1 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedCity1Id = $('#city1 :selected').val();
    var selectedCountry1Id = $('#country1 :selected').val();

    $("#district1").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_sysborough',
            country_id: selectedCountry1Id,
            city_id: selectedCity1Id,
            language_code: $("#langCode").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var district_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newdistrictappendingOption = $(district_appending_option_html);
                    $(newdistrictappendingOption).appendTo($("#district1"));

//                    $(newappendingOption).on("click", function (event) {

//                    });

                }
            }
        }
    });
});

$("select#city2").on('change', function () {

    var selectedCity2 = $('#city2 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedCity2Id = $('#city2 :selected').val();
    var selectedCountry2Id = $('#country2 :selected').val();

    $("#district2").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_sysborough',
            country_id: selectedCountry2Id,
            city_id: selectedCity2Id,
            language_code: $("#langCode").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var district_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newdistrictappendingOption = $(district_appending_option_html);
                    $(newdistrictappendingOption).appendTo($("#district2"));

//                    $(newappendingOption).on("click", function (event) {

//                    });

                }
            }
        }
    });
});

$("#district1").on('change', function () {

    var selectedDistrict1 = $('#district1 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedDistrict1Id = $('#district1 :selected').val();
    var selectedCity1Id = $('#city1 :selected').val();
    var selectedCountry1Id = $('#country1 :selected').val();

    $("#village1").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_sysvillage',
            country_id: selectedCountry1Id,
            city_id: selectedCity1Id,
            boroughs_id: selectedDistrict1Id,
            language_code: $("#langCode").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var district_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newdistrictappendingOption = $(district_appending_option_html);
                    $(newdistrictappendingOption).appendTo($("#village1"));

//                    $(newappendingOption).on("click", function (event) {

//                    });
                }
            }
        }
    });
});

$("#district2").on('change', function () {

//    var selectedDistrict2 = $('#district2 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedDistrict2Id = $('#district2 :selected').val();
    var selectedCity2Id = $('#city2 :selected').val();
    var selectedCountry2Id = $('#country2 :selected').val();

    $("#village2").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_sysvillage',
            country_id: selectedCountry2Id,
            city_id: selectedCity2Id,
            boroughs_id: selectedDistrict2Id,
            language_code: $("#langCode").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var district_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newdistrictappendingOption = $(district_appending_option_html);
                    $(newdistrictappendingOption).appendTo($("#village2"));

//                    $(newappendingOption).on("click", function (event) {

//                    });
                }
            }
        }
    });
});



