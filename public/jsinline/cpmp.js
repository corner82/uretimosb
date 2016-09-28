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
     * Left menuyu oluÅŸturmak icin Ã§aÄŸÄ±rÄ±lan fonksiyon...
     */

    //$.fn.leftMenuFunction();

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


    /*
     * Fill machine tools categories
     * @type @call;$@call;successMessage
     */

    var mt_cats = [
        {'description': 'Talaşlı İmalat', 'selected': false, 'text': 'Metal Cutting', 'value': '1'},
        {'description': 'Metal Şekillendirme', 'selected': false, 'text': 'Metal Forming', 'value': '2'},
        {'description': 'Dökümm', 'selected': false, 'text': 'Casting', 'value': '3'},
        {'description': 'Birleştime', 'selected': false, 'text': 'Joining', 'value': '4'}
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
                $('#machine_categories').ddslick('destroy');
                $('#machine_categories').ddslick({
                    data: mt_cats,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a category from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        $("#selected_mt_category").empty();
                        $("#selected_mt_type").empty();
                        $("#selected_mt_brand").empty();
                        $("#selected_mt_series").empty();

                        $('#machine_types').ddslick('destroy');
                        $('#machine_brands').ddslick('destroy');
                        $('#machine_series').ddslick('destroy');

                        $("#show_sel_mt_btn").css('display', 'none');
                        $("#show_sel_mt_btn").css('visibility', 'hidden');
                        $("#reset_sel_mt_btn").css('display', 'none');
                        $("#reset_sel_mt_btn").css('visibility', 'hidden');

                        $("#selected_mt_category").val(selectedData.selectedData.text);
                        $("#selected_mt_category").append(selectedData.selectedData.text);
                        get_mt_types();
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

    var mt_set = {"total": 5, "rows": [
            {"manufacturer_name": "A", "series": "serie A", "model": "model A", "model_year": "2000", "number": "1", "available": "yes"},
            {"manufacturer_name": "B", "series": "serie B", "model": "model B", "model_year": "2000", "number": "2", "available": "yes"},
            {"manufacturer_name": "C", "series": "serie C", "model": "model C", "model_year": "2000", "number": "3", "available": "yes"},
            {"manufacturer_name": "D", "series": "serie D", "model": "model D", "model_year": "2000", "number": "2", "available": "yes"},
            {"manufacturer_name": "E", "series": "serie E", "model": "model E", "model_year": "2000", "number": "1", "available": "No"}
        ]};

    $('#mt_grid').empty();
    $('#mt_grid').datagrid({
        data: mt_set,
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
                {field: 'manufacturer_name', title: 'manufacturer_name', width: 100},
                {field: 'series', title: 'series', width: 100},
                {field: 'model', title: 'model', width: 100},
                {field: 'model_year', title: 'model_year', width: 100},
                {field: 'number', title: 'number', width: 100},
                {field: 'available', title: 'available', width: 100}
            ]]
    });


});


var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: 'VazgeÃ§',
    actionButtonLabel: 'Ä°ÅŸleme devam et'});


/*
 * hides hidden sections of all tabs
 */

function hide_hidden_sections() {

    $('#hidden_mt_section').css('display', 'none');
    $('#hidden_mt_section').css('visibility', 'hidden');

    $('#sel_customer').val('');
    
    if ($('#hidden_mt_section').css('visibility') === 'hidden') {
        $('html, body').animate({
            scrollTop: $(".box-title").offset().top
        }, 1000);
    }
}

/*
 * shows new machine tool adding section
 */

function unhide_mt_section() {
    $('#hidden_mt_section').css('display', 'block');
    $('#hidden_mt_section').css('visibility', 'visible');

    if ($('#hidden_mt_section').css('visibility') === 'visible') {
        $('html, body').animate({
            scrollTop: $("#hidden_mt_section").offset().top
        }, 1000);
    }
}

/*
 * Fill machine tools categories
 */

function get_mt_types() {

    var metal_cutting_types = [
        {'description': 'Torna', 'selected': false, 'text': 'Turning Lathe', 'value': '1'},
        {'description': 'Freze', 'selected': false, 'text': 'Milling', 'value': '2'},
        {'description': 'Çok fonksiyonlu CNC', 'selected': false, 'text': 'Multi Tasking', 'value': '3'},
        {'description': 'Delme', 'selected': false, 'text': 'Drilling', 'value': '4'},
        {'description': 'Taşlama', 'selected': false, 'text': 'Grinding', 'value': '5'},
        {'description': 'Borlama', 'selected': false, 'text': 'Boring', 'value': '6'}
    ];

    var metal_forming_types = [
        {'description': 'Pres', 'selected': false, 'text': 'Press', 'value': '1'},
        {'description': 'Dövme', 'selected': false, 'text': 'Forging', 'value': '2'},
        {'description': 'Ekstrüzyon', 'selected': false, 'text': 'Extrusion', 'value': '3'},
        {'description': 'Haddeleme', 'selected': false, 'text': 'Roll Forming ', 'value': '4'}
    ];

    var casting_types = [
        {'description': 'Basınçlı döküm', 'selected': false, 'text': 'Die Casting', 'value': '1'},
        {'description': 'Merkezkaç döküm', 'selected': false, 'text': 'Centrifuge Casting', 'value': '2'},
    ]

    var joining_types = [
        {'description': 'TIG Kaynak', 'selected': false, 'text': 'TIG Welding', 'value': '1'},
        {'description': 'MIG Kaynak', 'selected': false, 'text': 'MIG Welding', 'value': '2'},
        {'description': 'Lehimleme', 'selected': false, 'text': 'Brazing', 'value': '3'}
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
                var dataset;
                if ($("#selected_mt_category").val() === 'Metal Cutting') {
                    dataset = metal_cutting_types;
                } else if ($("#selected_mt_category").val() === 'Metal Forming') {
                    dataset = metal_forming_types;
                } else if ($("#selected_mt_category").val() === 'Casting') {
                    dataset = casting_types;
                } else if ($("#selected_mt_category").val() === 'Joining') {
                    dataset = joining_types;
                }

//                console.log(data);
                $('#machine_types').ddslick('destroy');
                $('#machine_types').ddslick({
                    data: dataset,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a category from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        $("#selected_mt_type").empty();
                        $("#selected_mt_brand").empty();
                        $("#selected_mt_series").empty();

                        $('#machine_brands').ddslick('destroy');
                        $('#machine_series').ddslick('destroy');

                        $("#show_sel_mt_btn").css('display', 'none');
                        $("#show_sel_mt_btn").css('visibility', 'hidden');
                        $("#reset_sel_mt_btn").css('display', 'none');
                        $("#reset_sel_mt_btn").css('visibility', 'hidden');

                        $("#selected_mt_type").val(selectedData.selectedData.text);
                        $("#selected_mt_type").append(selectedData.selectedData.text);

                        get_mt_brands();
                    }
                });
            } else {
                console.error('"machine tools types" servis datası boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"machine tools types" servis hatası->' + textStatus);
        }
    });
}

/*
 * Get the category machine tool brands
 */

function get_mt_brands() {

    var brands = [
        {'description': 'Mazak', 'selected': false, 'text': 'Yamazaki Mazak', 'value': '1'},
        {'description': 'Goodway', 'selected': false, 'text': 'Yama Seiki Goodway ', 'value': '2'},
        {'description': 'Chevalier', 'selected': false, 'text': 'Chevalier', 'value': '3'},
        {'description': 'DMG Mori', 'selected': false, 'text': 'DMG Mori', 'value': '4'},
        {'description': 'Kasuga Seiki', 'selected': false, 'text': 'Kasuga Seiki', 'value': '5'},
        {'description': 'Datron Dynamics', 'selected': false, 'text': 'Datron Dynamics', 'value': '6'},
        {'description': 'Mitsubishi', 'selected': false, 'text': 'Mitsubishi Heavy Ind. ', 'value': '7'},
        {'description': 'Amada', 'selected': false, 'text': 'Amada', 'value': '8'}
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
                $('#machine_brands').ddslick('destroy');
                $('#machine_brands').ddslick({
                    data: brands,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a brand from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        $("#selected_mt_brand").empty();
                        $("#selected_mt_series").empty();

                        $('#machine_series').ddslick('destroy');

                        $("#show_sel_mt_btn").css('display', 'none');
                        $("#show_sel_mt_btn").css('visibility', 'hidden');
                        $("#reset_sel_mt_btn").css('display', 'none');
                        $("#reset_sel_mt_btn").css('visibility', 'hidden');

                        $("#selected_mt_brand").val(selectedData.selectedData.text);
                        $("#selected_mt_brand").append(selectedData.selectedData.text);

                        get_mt_series();
                    }
                });
            } else {
                console.error('"machine tools brands" servis datası boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"machine tools brands" servis hatası->' + textStatus);
        }
    });

}

/*
 * Get the brand machine tool series
 */

function get_mt_series() {

    var series = [
        {'description': 'Serie 1', 'selected': false, 'text': 'Serie 1', 'value': '1'},
        {'description': 'Serie 2', 'selected': false, 'text': 'Serie 2', 'value': '2'},
        {'description': 'Serie 3', 'selected': false, 'text': 'Serie 3', 'value': '3'},
        {'description': 'Serie 4', 'selected': false, 'text': 'Serie 4', 'value': '4'},
        {'description': 'Serie 5', 'selected': false, 'text': 'Serie 5', 'value': '5'},
        {'description': 'Serie 6', 'selected': false, 'text': 'Serie 6', 'value': '6'},
        {'description': 'Serie 7', 'selected': false, 'text': 'Serie 7', 'value': '7'},
        {'description': 'Serie 8', 'selected': false, 'text': 'Serie 8', 'value': '8'}
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
                $('#machine_series').ddslick('destroy');
                $('#machine_series').ddslick({
                    data: series,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a serie from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        $("#selected_mt_series").empty();
                        $("#selected_mt_series").val(selectedData.selectedData.text);
                        $("#selected_mt_series").append(selectedData.selectedData.text);

                        $("#show_sel_mt_btn").css('display', 'block');
                        $("#show_sel_mt_btn").css('visibility', 'visible');
                        $("#reset_sel_mt_btn").css('display', 'block');
                        $("#reset_sel_mt_btn").css('visibility', 'visible');

                    }
                });
            } else {
                console.error('"machine tools series" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"machine tools series" servis hatasÃ„Â±->' + textStatus);
        }
    });

}
/*
 * unhide selected machine tool properties section
 */

function show_sel_mt() {

    $('#sel_mt_title').empty();
    $('#sel_mt_title').append($('#selected_mt_brand').val() + " " + $('#selected_mt_series').val());

    $('#sel_mt_props_div').css('display', 'block');
    $('#sel_mt_props_div').css('visibility', 'visible');

    if ($('#sel_mt_props_div').css('visibility') === 'visible') {
        $('html, body').animate({
            scrollTop: $("#sel_mt_props_div").offset().top
        }, 1000);
    }

    call_sel_mt_props();

    event.preventDefault();
}

/*
 * reset all selected machine tools
 */

function reset_sel_mt() {

    $("#selected_mt_category").empty();
    $("#selected_mt_type").empty();
    $("#selected_mt_brand").empty();
    $("#selected_mt_series").empty();

    $('#machine_types').ddslick('destroy');
    $('#machine_brands').ddslick('destroy');
    $('#machine_series').ddslick('destroy');

    $("#show_sel_mt_btn").css('display', 'none');
    $("#show_sel_mt_btn").css('visibility', 'hidden');
    $("#reset_sel_mt_btn").css('display', 'none');
    $("#reset_sel_mt_btn").css('visibility', 'hidden');

    $("#sel_mt_props_div").css('display', 'none');
    $("#sel_mt_props_div").css('visibility', 'hidden');

    $('html, body').animate({
        scrollTop: $("#hidden_mt_section").offset().top
    }, 1000);

    event.preventDefault();
}

/*
 * Call all machine properties
 */

function call_sel_mt_props() {

    $('#pg').propertygrid({
        url: '../../../../jsinline/props.json',
        showGroup: true,
        scrollbarSize: 0
    });
}


function cont_add_mt_btn() {
    if ($("#number_of_avai_mt").validationEngine('validate') === false) {
        $('#add_machine').removeAttr('disabled');
    } else {
        $('#add_machine').attr('disabled', 'disabled');
    }
}

function reset_all(){
    reset_sel_mt();
}

function prop_mt(){
    
}