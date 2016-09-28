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
    
    $('#product_form').validationEngine({promptPosition: "topLeft:100%,0"});

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
                $('#cons_name_ph').append(data[0].name + " " +  data[0].surname);

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

    var prod_set = {"total": 5, "rows": [
            {"prod_gtip": "12413241234", "prod_name": "Prod A", "prod_cat": "category A", "prod_price": "45.20 &#8378", "prod_capa": "10,000", "prod_avai": "yes"},
            {"prod_gtip": "46464565654", "prod_name": "Prod B", "prod_cat": "category B", "prod_price": "61.34 &#8378", "prod_capa": "24,000", "prod_avai": "yes"},
            {"prod_gtip": "34534534454", "prod_name": "Prod C", "prod_cat": "category C", "prod_price": "12.00 &#8378", "prod_capa": "40,000", "prod_avai": "yes"},
            {"prod_gtip": "62667563658", "prod_name": "Prod D", "prod_cat": "category D", "prod_price": "784.00 &#8378", "prod_capa": "2,000", "prod_avai": "yes"},
            {"prod_gtip": "24565776768", "prod_name": "Prod E", "prod_cat": "category E", "prod_price": "1,200.00 &#8378", "prod_capa": "1,500", "prod_avai": "No"}
        ]};


    $('#prod_grid').empty();
    $('#prod_grid').datagrid({
        data: prod_set,
        singleSelect: true,
        pagination: true,
        collapsible: true,
//        method: 'get',
//        idField: 'id',
//        toolbar:'#tb5',
        //fit:true,
        //fitColumns : true,
//        remoteFilter: true,
//        remoteSort: true,
//        multiSort: false,
        columns: [[
                {field: 'prod_gtip', title: 'Product GTIP', width: 100},
                {field: 'prod_name', title: 'Product Name', width: 100},
                {field: 'prod_cat', title: 'Product Category', width: 100},
                {field: 'prod_price', title: 'Product Price', width: 100},
                {field: 'prod_capa', title: 'Production Capacity', width: 100},
                {field: 'prod_avai', title: 'Product availability for order', width: 100}
            ]]
    });

    var prod_cats = [
        {'description': 'Category A', 'selected': false, 'text': 'Category A', 'value': '1'},
        {'description': 'Category B', 'selected': false, 'text': 'Category B', 'value': '2'},
        {'description': 'Category C', 'selected': false, 'text': 'Category C', 'value': '3'},
        {'description': 'Category D', 'selected': false, 'text': 'Category D', 'value': '4'}
    ];

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscountrys',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

//                console.log(data);
                $('#prod_categories').ddslick('destroy');
                $('#prod_categories').ddslick({
                    data: prod_cats,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a product category from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {


                    }
                });
            } else {
                console.error('"machine tools category" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"machine tools category" servis hatasÃ„Â±->' + textStatus);
        }
    });


    var gtip_cats = [
        {'description': 'Agricultural', 'selected': false, 'text': 'Agricultural', 'value': '1'},
        {'description': 'Defense Industry', 'selected': false, 'text': 'Defense Industry', 'value': '2'},
        {'description': 'Aviation', 'selected': false, 'text': 'Aviation', 'value': '3'},
        {'description': 'Textile', 'selected': false, 'text': 'Textile', 'value': '4'}
    ];

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscountrys',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

//                console.log(data);
                $('#gtip_no').ddslick('destroy');
                $('#gtip_no').ddslick({
                    data: gtip_cats,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a GTIP number from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {


                    }
                });
            } else {
                console.error('"machine tools category" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"machine tools category" servis hatasÃ„Â±->' + textStatus);
        }
    });

});

function unhide_new_prod_sec() {

    if ($('#add_new_prod_hidden').css('display') === 'none') {

        $('#add_new_prod_hidden').css('display', 'block');
        $('#add_new_prod_hidden').css('visibility', 'visible');

        $('html, body').animate({
            scrollTop: $("#add_new_prod_hidden").offset().top
        }, 1000);

    } else {

        $('#add_new_prod_hidden').css('display', 'none');
        $('#add_new_prod_hidden').css('visibility', 'hidden');

        $('html, body').animate({
            scrollTop: $(".content").offset().top
        }, 1000);
    }



    var $first_lev_cat_list = $("#first_lev_cat_list");
    for (i = 0; i < window.category_map['main_options'].length; i++) {
        $first_lev_cat_list.append(
                "<option value='" + window.category_map['main_options'][i] + "'>" + window.category_map['main_options'][i] + "</option>"
                );
    }

}

var selected_main_cat_index;
var selected_main_cat_value;
var selected_sec_cat_index;
var selected_sec_cat_value;
var selected_third_cat_index;
var selected_third_cat_value;
var selected_forth_cat_index;
var selected_forth_cat_value;

window.category_map =
        {'main_options': ["option_1"],
            'option_1': ["option 1_1", "option 1_2", "option 1_3", "option 1_4"],
            'option 1_1': ["option 1_1_1", "option 1_1_2", "option 1_1_3", "option 1_1_4", "option 1_1_5"],
            'option 1_2': ["option 1_2_1", "option 1_2_2"],
            'option 1_3': ["option 1_3_1", "option 1_3_2", "option 1_3_3"],
            'option 1_4': ["option 1_4_1", "option 1_4_2", "option 1_4_3", "option 1_4_4"],
            'option 1_1_1': ["option 1_1_1_1", "option 1_1_1_2", "option 1_1_1_3"],
            'option 1_1_2': ["option 1_1_2_1", "option 1_1_2_2", "option 1_1_2_3", "option 1_1_2_4"],
            'option 1_1_3': ["option 1_1_3_1", "option 1_1_3_2"],
            'option 1_1_4': ["option 1_1_4_1", "option 1_1_4_2"],
            'option 1_1_5': ["option 1_1_5_1"],
            'option 1_2_1': ["option 1_2_1_1", "option 1_2_1_2"],
            'option 1_2_2': ["option 1_2_2_1", "option 1_2_2_2", "option 1_2_2_3"],
            'option 1_3_1': ["option 1_3_1_1", "option 1_3_1_2", "option 1_3_1_3"],
            'option 1_3_2': ["option 1_3_2_1", "option 1_3_2_2", "option 1_3_2_3"],
            'option 1_3_3': ["option 1_3_3_1", "option 1_3_3_2", "option 1_3_3_3"],
            'option 1_4_1': ["option 1_4_1_1", "option 1_4_1_2", "option 1_4_1_3"],
            'option 1_4_2': ["option 1_4_2_1", "option 1_4_2_2", "option 1_4_2_3"],
            'option 1_4_3': ["option 1_4_3_1", "option 1_4_3_2", "option 1_4_3_3"],
            'option 1_4_4': ["option 1_4_4_1", "option 1_4_4_2", "option 1_4_4_3"]
        };



function first_cat_sel(clicked) {

    selected_main_cat_index = clicked.selectedIndex;
    selected_main_cat_value = clicked.value;

    if (selected_main_cat_index !== null) {

        var $sec_lev_cat_list = $("#sec_lev_cat_list");
        $sec_lev_cat_list.empty();
        for (i = 0; i < window.category_map[selected_main_cat_value].length; i++) {
            if ($.inArray(window.category_map[selected_main_cat_value][i], added_cats) < 0) {
                $sec_lev_cat_list.append(
                        "<option value='" +
                        window.category_map[selected_main_cat_value][i] +
                        "'>" +
                        window.category_map[selected_main_cat_value][i] +
                        "</option>"
                        );
            }
        }
        ;

        $('#sec_lev_cat').css('visibility', 'visible');
        $('#sec_lev_cat').css('display', 'block');
        $("#sec_lev_cat").fadeIn("slow");

        $('#thi_lev_cat').css('visibility', 'hidden');
        $('#thi_lev_cat').css('display', 'none');
        $("#thi_lev_cat").fadeOut("slow");

        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');
        $("#for_lev_cat").fadeOut("slow");

        $("#sec_lev_cat_label").empty();
        $("#sec_lev_cat_label").append(selected_main_cat_value);

        $('#add_cat_but').prop('disabled', true);

        selected_sec_cat_index = null;
        selected_sec_cat_value = null;
        selected_third_cat_index = null;
        selected_third_cat_value = null;
        selected_forth_cat_index = null;
        selected_forth_cat_value = null;

    } else {

        $('#sec_lev_cat').css('visibility', 'hidden');
        $('#sec_lev_cat').css('display', 'none');
        $("#sec_lev_cat").fadeOut("slow");

        $('#thi_lev_cat').css('visibility', 'hidden');
        $('#thi_lev_cat').css('display', 'none');
        $("#thi_lev_cat").fadeOut("slow");

        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');
        $("#for_lev_cat").fadeOut("slow");
    }
}

function sec_cat_sel(clicked) {

    selected_sec_cat_index = clicked.selectedIndex;
    selected_sec_cat_value = clicked.value;

    if (selected_sec_cat_index !== null) {

        var $thi_lev_cat_list = $("#thi_lev_cat_list");
        $thi_lev_cat_list.empty();
        for (i = 0; i < window.category_map[selected_sec_cat_value].length; i++) {

            if ($.inArray(window.category_map[selected_sec_cat_value][i], added_cats) < 0) {
                $thi_lev_cat_list.append(
                        "<option value='" +
                        window.category_map[selected_sec_cat_value][i] +
                        "'>" +
                        window.category_map[selected_sec_cat_value][i] +
                        "</option>"
                        );
            }
        }
        ;


        $('#thi_lev_cat').css('visibility', 'visible');
        $('#thi_lev_cat').css('display', 'block');
        $("#thi_lev_cat").fadeIn("slow");

        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');
        $("#for_lev_cat").fadeOut("slow");

        $("#thi_lev_cat_label").empty();
        $("#thi_lev_cat_label").append(selected_sec_cat_value);

        $('#add_cat_but').prop('disabled', true);


        selected_third_cat_index = null;
        selected_third_cat_value = null;
        selected_forth_cat_index = null;
        selected_forth_cat_value = null;


    } else {
        $('#thi_lev_cat').css('visibility', 'hidden');
        $('#thi_lev_cat').css('display', 'none');
        $("#thi_lev_cat").fadeOut("slow");

        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');
        $("#for_lev_cat").fadeOut("slow");
    }
}

function third_cat_sel(clicked) {

    selected_third_cat_index = clicked.selectedIndex;
    selected_third_cat_value = clicked.value;

    if (selected_third_cat_index !== null) {

        var $for_lev_cat_list = $("#for_lev_cat_list");
        $for_lev_cat_list.empty();
        for (i = 0; i < window.category_map[selected_third_cat_value].length; i++) {
            if ($.inArray(window.category_map[selected_third_cat_value][i], added_cats) < 0) {
                $for_lev_cat_list.append(
                        "<option value='" +
                        window.category_map[selected_third_cat_value][i] +
                        "'>" +
                        window.category_map[selected_third_cat_value][i] +
                        "</option>"
                        );
            }
        }
        ;

        $('#for_lev_cat').css('visibility', 'visible');
        $('#for_lev_cat').css('display', 'block');
        $("#for_lev_cat").fadeIn("slow");

        $("#for_lev_cat_label").empty();
        $("#for_lev_cat_label").append(selected_third_cat_value);

        $('#add_cat_but').prop('disabled', false);


        selected_forth_cat_index = null;
        selected_forth_cat_value = null;


    } else {

        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');
        $("#for_lev_cat").fadeOut("slow");

        $('#add_cat_but').prop('disabled', true);
    }
}

function forth_cat_sel(clicked) {

    selected_forth_cat_index = clicked.selectedIndex;
    selected_forth_cat_value = clicked.value;

    if (selected_forth_cat_index !== null) {


    } else {

        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');
        $("#for_lev_cat").fadeOut("slow");

        $('#add_cat_but').prop('disabled', true);
    }
}


var added_cats = [];

function add_sel_cat() {


    if (selected_forth_cat_index !== null) {

        if ($.inArray(selected_forth_cat_value, added_cats) < 0) {
            added_cats.push(selected_forth_cat_value);
//            $("#for_lev_cat_list option[value='" + selected_forth_cat_value + "']").remove();
            $("#for_lev_cat_list option[value='" + selected_forth_cat_value + "']").attr('disabled', true);

            $('#selected_prod_cat').val(
//                    window.lang.translate(selected_forth_cat_value)
                    selected_forth_cat_value
                    );
            $('#categories_div').slideUp();
            $('#categories_div').css('display', 'none');
            $('#categories_div').css('visibility', 'hidden');

            $('#add_cat_but').css('display', 'none');
            $('#add_cat_but').css('visibility', 'hidden');

            $('#change_cat_btn').css('display', 'block');
            $('#change_cat_btn').css('visibility', 'visible');
        }

    } else {

        if ($.inArray(selected_third_cat_value, added_cats) < 0) {
            added_cats.push(selected_third_cat_value);
//            $("#thi_lev_cat_list option[value='" + selected_third_cat_value + "']").remove();
            $("#for_lev_cat_list option[value='" + selected_forth_cat_value + "']").attr('disabled', true);

            $('#selected_prod_cat').val(
//                    window.lang.translate(selected_third_cat_value)
                    selected_third_cat_value
                    );
            $('#categories_div').slideUp();
            $('#categories_div').css('display', 'none');
            $('#categories_div').css('visibility', 'hidden');

            $('#add_cat_but').css('display', 'none');
            $('#add_cat_but').css('visibility', 'hidden');

            $('#change_cat_btn').css('display', 'block');
            $('#change_cat_btn').css('visibility', 'visible');

        }
    }

}

function change_sel_cat() {
    added_cats = [];

    $('#selected_prod_cat').val('');
    
    $('#categories_div').slideDown();
    $('#categories_div').css('display', 'block');
    $('#categories_div').css('visibility', 'visible');

    $('#add_cat_but').css('display', 'block');
    $('#add_cat_but').css('visibility', 'visible');

    $('#change_cat_btn').css('display', 'none');
    $('#change_cat_btn').css('visibility', 'hidden');

}