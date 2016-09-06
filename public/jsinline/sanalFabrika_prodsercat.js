$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());

    var $first_lev_cat_list = $("#first_lev_cat_list");
    for (i = 0; i < window.category_map['main_options'].length; i++) {
        $first_lev_cat_list.append(
                "<option value='" + window.category_map['main_options'][i] + "'>" + window.category_map['main_options'][i] + "</option>"
                );
    }
    ;
});

var selected_main_cat_index;
var selected_main_cat_value;
var selected_sec_cat_index;
var selected_sec_cat_value;
var selected_third_cat_index;
var selected_third_cat_value;
var selected_forth_cat_index;
var selected_forth_cat_value;


var sel_cat_to_rem_index;
var sel_cat_to_rem_value;


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

            $('#selected_categories_list').append(
                    "<option value='" +
                    selected_forth_cat_value +
                    "'>" +
                    window.lang.translate(selected_forth_cat_value) +
                    "</option>");

//            $("#categories_div").load();

        }

    } else {

        if ($.inArray(selected_third_cat_value, added_cats) < 0) {
            added_cats.push(selected_third_cat_value);
//            $("#thi_lev_cat_list option[value='" + selected_third_cat_value + "']").remove();
            $("#for_lev_cat_list option[value='" + selected_forth_cat_value + "']").attr('disabled', true);

            $('#selected_categories_list').append(
                    "<option value='" +
                    selected_third_cat_value +
                    "'>" +
                    window.lang.translate(selected_third_cat_value) +
                    "</option>");
        }
    }

}

function sel_cat_list(clicked) {

    sel_cat_to_rem_index = clicked.selectedIndex;
    sel_cat_to_rem_value = clicked.value;

}

function del_sel_cat() {

    $("#selected_categories_list option[value='" + sel_cat_to_rem_value + "']").remove();    
    added_cats.splice($.inArray(sel_cat_to_rem_value, added_cats), 1 );
//    $('#categories_div').empty().load(window.location.href + '#categories_div');


}