$(document).ready(function () {

    /*
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
     * Left menuyu olusturmak icin Ã§aÄŸÄ±rÄ±lan fonksiyon...
     */
    //$.fn.leftMenuFunction();

    window.sel_sex_type;
    window.sel_sex_type_edit;
    window.sel_uni_country_id;
    window.sel_uni_id;

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
                $('#cons_name_ph').append(data[0].name + " " + data[0].surname);

            } else {
                console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"consultants" servis hatasÃ„Â±->' + textStatus);
        }
    });

    /*
     * Sex types
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'fillSexTypes_sysSpecificDefinitions',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

//                console.log(data);
                $('#psex').ddslick('destroy');
                $('#psex').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a category from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        window.sel_sex_type = selectedData.selectedData.value;
                    }
                });
            } else {
                console.error('sex types servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('sex types servis hatasÃ„Â±->' + textStatus);
        }
    });

    /*
     * Countries
     */
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
                $('#member_university_country_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a country from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        window.sel_uni_country_id = selectedData.selectedData.value;
                    }
                });
            } else {
                console.error('"fillComboBox_syscountrys" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syscountrys" servis hatasÄ±->' + textStatus);
        }
    });

    /*
     * Universities
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillUniversityDdList_sysUniversities',
            language_code: $("#langCode").val(),
            component_type: 'ddslick',
            pk: $('#pk').val(),
            country_id: 91
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

//                console.log(data);
                $('#member_university_ph').ddslick('destroy');
                $('#member_university_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a university from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        window.sel_uni_id = selectedData.selectedData.value;

                    }
                });
            } else {
                console.error('list of universities servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('list of universities servis hatasÃ„Â±->' + textStatus);
        }
    });

    /*
     * form validation
     */
    $("#personnel_gen_info").validationEngine();

    /*
     * Bootstrap modals variables
     * @type @call;$@call;successMessage
     */
    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Confirm')});

    /*
     * Get already registered addresses as Easyui Grid 
     */
    $('#reg_members_table').datagrid({
        onDblClickRow: function (index, row) {
            $('#diploma_grid_ph').css('visibility', 'visible');
            $('#diploma_grid_ph').css('display', 'block');
            $('#langs_grid_ph').css('visibility', 'visible');
            $('#langs_grid_ph').css('display', 'block');
            $('#cert_grid_ph').css('visibility', 'visible');
            $('#cert_grid_ph').css('display', 'block');

//            loadDiplomaGrid(row.id);
//            loadLangGrid(row.id);
//            loadCertGrid(row.id);

        },
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url: 'pkFillFirmWorkingPersonalListGrid_infoFirmWorkingPersonnel',
            sort: 'id',
            order: 'id'
                    /*machine_groups_id : null,
                     filterRules:null*/
        },
        width: '100%',
        singleSelect: true,
        pagination: true,
        collapsible: true,
        method: 'get',
        idField: 'id',
        //fit:true,
        //fitColumns : true,
        remoteFilter: true,
        remoteSort: true,
        multiSort: false,
        columns:
                [[
                        {field: 'id', title: 'ID', sortable: true, width: 30},
                        {field: 'title', title: 'Title', sortable: true, width: 80},
                        {field: 'title_eng', title: 'Title English', sortable: true, width: 80, hidden: true},
                        {field: 'name', title: 'Name', sortable: true, width: 150},
                        {field: 'surname', title: 'Last Name', sortable: true, width: 150},
                        {field: 'positions', title: 'Position', sortable: true, width: 150},
                        {field: 'positions_eng', title: 'Position English', sortable: true, width: 150, hidden: true},
                        {field: 'sex_name', title: 'Sex', sortable: true, width: 80},
                        {field: 'sex_id', title: 'Sex Id', sortable: true, width: 80, hidden: true},
                        {field: 'actions', title: 'Actions', width: 80, align: 'center',
                            formatter: function (value, row, index) {
                                if (row.attributes.active === 0) {
                                    var e = '<button style="padding : 2px 4px;" title="Make Passive"  class="btn btn-primary" type="button" onclick="return activePassivePersonnelWrapper(event, ' + row.id + ');"><i class="fa fa-minus-circle"></i></button>';
                                } else {
                                    var e = '<button style="padding : 2px 4px;" title="Make Active"  class="btn btn-warning" type="button" onclick="return activePassivePersonnelWrapper(event, ' + row.id + ');"><i class="fa fa-plus-circle"></i></button>';
                                }
                                var d = '<button style="padding : 2px 4px;" title="Delete"  class="btn btn-danger" type="button" onclick="return deletePersonnelUltimatelyDialog(' + row.id + ', ' + index + ');"><i class="fa fa-eraser"></i></button>';
                                var u = '<button style="padding : 2px 4px;" title="Edit"  class="btn btn-info" type="button" onclick="return updatePersonnelDialog('
                                        + row.id
                                        + ', {    name : \''
                                        + row.name
                                        + '\',  lastname : \''
                                        + row.surname
                                        + '\',  personnel_title : \''
                                        + row.title
                                        + '\',  personnel_title_eng : \''
                                        + row.title_eng
                                        + '\', position : \''
                                        + row.positions
                                        + '\', position_eng: \''
                                        + row.positions_eng
                                        + '\', sex_id: \''
                                        + row.sex_id
                                        + '\', sex_name: \''
                                        + row.sex_name
                                        + '\'} );"><i class="fa fa-arrow-circle-up"></i></button>';
                                return e + d + u;
                            }
                        }
                    ]]
    });
    $('#reg_members_table').datagrid('enableFilter');


    window.activePassivePersonnelWrapper = function (e, id) {
        e.preventDefault();
        var id = id;
        var domElement = e.target;
        wcm.warningComplexMessage({onConfirm: function (event, data) {
                activePassivePersonnel(id, domElement);
            }
        });
        wcm.warningComplexMessage('show', window.lang.translate('You are going to activate/passivate your company personnel!'),
                window.lang.translate('You are going to activate/passivate your company personnel!'));
        return false;
    };

    /**
     * active or passive ACL privilege
     * @returns {undefined}
     * @author Mustafa Zeynel Dağlı
     * @since 14/07/2016
     */
    window.activePassivePersonnel = function (id, domElement) {
        var loader = $("#loading-image-grid-container").loadImager();
        loader.loadImager('appendImage');
        var id = id;
        //console.log(domElement);

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: {
                url: 'pkUpdateMakeActiveOrPassive_sysAclPrivilege',
                id: id,
                pk: $("#pk").val()
            }
        });
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', window.lang.translate('Unsuccessful activate/passivate action!'),
                        window.lang.translate('Please contact system administrator!'));
                console.error('"pkUpdateMakeActiveOrPassive_sysAclPrivilege" servis hatası->' + textStatus);
            },
            onSuccess: function (event, data) {
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', window.lang.translate('Successful activate/passivate action!'),
                        window.lang.translate('Personnel activate/passivate action done successfully!'),
                        data);
                if ($(domElement).hasClass("fa-minus-circle")) {
                    $(domElement).removeClass("fa-minus-circle");
                    $(domElement).addClass("fa-plus-circle");

                    $(domElement).parent().removeClass("btn-primary");
                    $(domElement).parent().addClass("btn-warning");
                } else if ($(domElement).hasClass("fa-plus-circle")) {
                    $(domElement).removeClass("fa-plus-circle");
                    $(domElement).addClass("fa-minus-circle");

                    $(domElement).parent().removeClass("btn-warning");
                    $(domElement).parent().addClass("btn-primary");
                }


            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', window.lang.translate('Unsuccessful activate/passivate action!'),
                        window.lang.translate('Please contact system administrator!'));
                console.error('"pkUpdateMakeActiveOrPassive_sysAclPrivilege" servis datası boştur!!');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', window.lang.translate('Unsuccessful activate/passivate action!'),
                        window.lang.translate('Please contact system administrator!'));
            },
            onError23503: function (event, data) {
            },
            onError23505: function (event, data) {
            }
        });
        aj.ajaxCall('call');
    };

    /**
     * wrapper class for pop up and delete ACL privilege ultimately
     * @param {integer} nodeID
     * @returns {null}
     * @author Mustafa Zeynel Dağlı
     * @since 14/07/2016
     */
    window.deletePersonnelUltimatelyDialog = function (id, index) {
        var id = id;
        var index = index;
        wcm.warningComplexMessage({onConfirm: function (event, data) {
                deletePersonnelUltimately(id, index);
            }
        });
        wcm.warningComplexMessage('show', window.lang.translate('You are going to remove your company personnel!'),
                window.lang.translate('You are going to remove your company personnel! You will be unable to undo this action'));
    };

    /**
     * delete ACL privilege
     * @param {type} id
     * @param {type} element
     * @param {type} machine_group_id
     * @returns {undefined}
     * @since 14/07/2016
     */
    window.deletePersonnelUltimately = function (id, index) {
        var loaderGridBlock = $("#loading-image-grid-container").loadImager();
        loaderGridBlock.loadImager('appendImage');

        var id = id;
        var index = index;
        var ajDeleteAll = $(window).ajaxCall({
            proxy: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: {
                url: 'pkcpkDeletedAct_infoFirmWorkingPersonnel',
                id: id,
                pk: $("#pk").val(),
                cpk: $("#cpk").val()
            }
        });
        ajDeleteAll.ajaxCall({
            onError: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', window.lang.translate('Unsuccessful personnel remove action!'),
                        window.lang.translate('Unsuccessful personnel remove action! Please contact system administrator'));
                console.error('"personnel silme servisi" servis hatası->' + data.errorInfo);
            },
            onSuccess: function (event, data) {
                sm.successMessage({
                    onShown: function () {
                        //console.warn(index);
                        loaderGridBlock.loadImager('removeLoadImage');

                        /*var node = $('#tt_tree_menu2').tree('find', id);
                         $('#tt_tree_menu2').tree('remove', node.target);*/

                        $('#reg_members_table').datagrid('reload');
                    }
                });
                sm.successMessage('show', window.lang.translate('Successful personnel remove action!'),
                        window.lang.translate('Successful personnel remove action!'));
            }
        });
        ajDeleteAll.ajaxCall('call');
    };

    /**
     * wrapper for ACL privilege update process
     * @param {type} nodeID
     * @param {type} nodeName
     * @returns {Boolean}
     * @author Mustafa Zeynel Dağlı
     * @since 14/07/2016
     */
    window.updatePersonnelDialog = function (id, row) {

        window.gridReloadController = false;
        BootstrapDialog.show({
            title: '"' + row.name + '"' + window.lang.translate('You are going to update personnel information'),
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(
//                        '<div class="box box-solid">' +
//                            '<div class="box-header with-border">' +
////                          '<div class="box" id="loader-div">' +
//                                '<h3 class="box-title">' + window.lang.translate('Update Information') + '</h3>' +
//                            '</div>' +
//                            '<!-- /.box-header -->' +
//                            '<div class="box-body" >' +
//                                '<div class="box-group" id="accordion">' +
                        '<!-- we are adding the .panel class so bootstrap.js collapse plugin detects it -->' +
                        '<div class="panel box box-primary">' +
                        '<div class="box-header with-border">' +
                        '<h4 class="box-title">' +
                        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" class="">' +
                        window.lang.translate('General Information') +
                        '</a>' +
                        '</h4>' +
                        '</div>' +
                        '<div class="box-body" id="popup_loader">' +
                        '<form id="personnel_gen_info_edit">' +
                        '<label for="ptitle" style="margin-top: 20px">' +
                        window.lang.translate("Title") +
                        '</label>' +
                        '<div class="input-group">' +
                        '<div class="input-group-addon">' +
                        '<i class="icon-prepend fa fa-flag-o"></i>' +
                        '</div>' +
                        '<input type="text" class="form-control validate[required, maxSize[30]]" ' +
                        'id="ptitle_edit" value="' + row.personnel_title + '">' +
                        '</div>' +
                        '<label for="ptitle_edit_eng" style="margin-top: 20px">' +
                        window.lang.translate("Title (English)") +
                        '</label>' +
                        '<div class="input-group"> ' +
                        '<div class="input-group-addon">' +
                        '<i class="icon-prepend fa fa-flag-o"></i>' +
                        '</div>' +
                        '<input type="text" class="form-control validate[required, maxSize[30]]"' +
                        'id="ptitle_edit_eng" value="' + row.personnel_title_eng + '">' +
                        '</div>' +
                        '<label for="pname_edit" style="margin-top: 20px">' +
                        window.lang.translate("First Name") +
                        '</label>' +
                        '<div class="input-group">' +
                        '<div class="input-group-addon">' +
                        '<i class="icon-prepend fa fa-flag-o"></i>' +
                        '</div>' +
                        '<input type="text" class="form-control validate[required, maxSize[200]]"' +
                        'id="pname_edit" value="' + row.name + '">' +
                        '</div>' +
                        '<label for="plast_edit" style="margin-top: 20px">' +
                        window.lang.translate("Last Name") +
                        '</label>' +
                        '<div class="input-group">' +
                        '<div class="input-group-addon">' +
                        '<i class="icon-prepend fa fa-flag-o"></i>' +
                        '</div>' +
                        '<input type="text" class="form-control validate[required, maxSize[200]]"' +
                        'id="plast_edit" value="' + row.lastname + '">' +
                        '</div>' +
                        '<label for="ppos_edit" style="margin-top: 20px">' +
                        window.lang.translate("Position") +
                        '</label>' +
                        '<div class="input-group">' +
                        '<div class="input-group-addon">' +
                        '<i class="icon-prepend fa fa-flag-o"></i>' +
                        '</div>' +
                        '<input type="text" class="form-control validate[required, maxSize[200]]"' +
                        'id="ppos_edit" value="' + row.position + '">' +
                        '</div>' +
                        '<label for="ppos_edit_eng" style="margin-top: 20px">' +
                        window.lang.translate("Position (English)") +
                        '</label>' +
                        '<div class="input-group">' +
                        '<div class="input-group-addon">' +
                        '<i class="icon-prepend fa fa-flag-o"></i>' +
                        '</div>' +
                        '<input type="text" class="form-control validate[required, maxSize[200]]"' +
                        'id="ppos_edit_eng" value="' + row.position_eng + '">' +
                        '</div>' +
                        '<br/>' +
                        '<div class="form-group">' +
                        '<label for="psex_edit">' +
                        window.lang.translate("Sex") +
                        '</label>' +
                        '<div id="psex_edit">' +
                        '</div>' +
                        '</div>' +
                        '<br/>' +
                        '<div class="box-footer col-lg-12">' +
                        '<button type="button" class="btn btn-primary" style="margin-bottom: 150px" onclick="update_personnel_gen_info(' + id + ')">' +
                        window.lang.translate("Update General Information") +
                        '</button>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '</div>'
//                                    '<!-- language section -->' +
//                                    '<div class="panel box box-success">' +
//                                        '<div class="box-header with-border">' +
//                                            '<h4 class="box-title">' +
//                                                '<a data-toggle="collapse" data-parent="#accordion" href="#collapseThree" class="collapsed" aria-expanded="false">' +
//                                                     window.lang.translate("Language Information") +
//                                                '</a>' +
//                                            '</h4>' +
//                                        '</div>' +
//                                        '<div id="collapseThree" class="panel-collapse collapse" aria-expanded="false">' +
//                                            '<div class="box-body">' +
//                                                '<form id="personnel_lang_info_edit">' +
//                                                    '<label for="member_language_ph_edit" style="margin-top: 20px">' +
//                                                        window.lang.translate("Language") +
//                                                    '</label>' +
//                                                    '<div class="input-group">' +
//                                                        '<div class="input-group-addon">' +
//                                                            '<i class="icon-prepend fa fa-flag-o"></i>' +
//                                                        '</div>' +
//                                                        '<input type="text" class="form-control"' +
//                                                                'id="member_language_ph_edit" placeholder="Enter member language here please">' +
//                                                    '</div>' +
//                                                    '<br/>' +
//                                                    '<div class="box-footer col-lg-12">' +
//                                                        '<button type="button" class="btn btn-primary" onclick="update_personnel_lang_info()">' +
//                                                            window.lang.translate("Update Language Information") +
//                                                        '</button>' +
//                                                    '</div>' +
//                                                '</form>' +
//                                            '</div>' +
//                                        '</div>' +
//                                    '</div>' +
//                                    '<!-- certificate section -->' +
//                                    '<div class="panel box box-success">' +
//                                        '<div class="box-header with-border">' +
//                                            '<h4 class="box-title">' +
//                                                '<a data-toggle="collapse" data-parent="#accordion" href="#collapseFour" class="collapsed" aria-expanded="false">' +
//                                                    window.lang.translate("Certificate Information") +
//                                                '</a>' +
//                                            '</h4>' +
//                                        '</div>' +
//                                        '<div id="collapseFour" class="panel-collapse collapse" aria-expanded="false">' +
//                                            '<div class="box-body">' +
//                                                '<form id="personnel_cert_info_edit">' +
//                                                    '<label for="member_certificate_ph_edit" style="margin-top: 20px">' +
//                                                        window.lang.translate("Certificate") +
//                                                    '</label>' +
//                                                    '<div class="input-group">' +
//                                                        '<div class="input-group-addon">' +
//                                                            '<i class="icon-prepend fa fa-flag-o"></i>' +
//                                                        '</div>' +
//                                                        '<input type="text" class="form-control" ' +
//                                                                'id="member_certificate_ph_edit" placeholder="Enter member certificate here please">' +
//                                                    '</div>' +
//                                                    '<br/>' +
//                                                    '<div class="box-footer col-lg-12">' +
//                                                        '<button type="button" class="btn btn-primary" onclick="update_personnel_cert_info()">' +
//                                                            window.lang.translate("Update Certificate Information") +
//                                                        '</button>' +
//                                                    '</div> ' +
//                                                '</form>' +
//                                            '</div>' +
//                                        '</div>' +
//                                    '</div>' +
//                                '</div>' +
//                            '</div>' +
////                            '</div>' +
//                            '<!-- /.box-body -->' +
//                        '</div>'
                        );

                /*
                 * Sex types
                 */
                $.ajax({
                    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: {
                        url: 'fillSexTypes_sysSpecificDefinitions',
                        language_code: $("#langCode").val(),
                        component_type: 'ddslick'
                    },
                    type: 'GET',
                    dataType: 'json',
                    //data: 'rowIndex='+rowData.id,
                    success: function (data, textStatus, jqXHR) {
                        if (data.length !== 0) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].value == row.sex_id) {
                                    var index = i;
                                }
                            }

                            $('#psex_edit').ddslick('destroy');
//                            $("#psex_edit  option[value='" + row.sex_id + "']").attr('selected', 'selected');
                            $('#psex_edit').ddslick({
                                data: data,
                                width: '100%',
                                height: '500%',
                                background: false,
                                selectText: window.lang.translate("Please select a category from list..."),
                                imagePosition: 'right',
                                onSelected: function (selectedData) {
                                    window.sel_sex_type_edit = selectedData.selectedData.value;
                                }
                            });
                            $('#psex_edit').ddslick('select', {index: index});

                        } else {
                            console.error('sex types servis datasÃ„Â± boÃ…Å¸tur!!');
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error('sex types servis hatasÃ„Â±->' + textStatus);
                    }
                });

                return $message;
            }
        });
        return false;
    };

    /**
     * update personnel general information
     * @author Bahram Lotfi Sadigh
     * @since 21/07/2016
     */
    window.update_personnel_gen_info = function (id) {
        var loader = $('#popup_loader').loadImager();
        loader.loadImager('appendImage');

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: {
                pk: $("#pk").val(),
                cpk: $("#cpk").val(),
                url: 'pkcpkUpdate_infoFirmWorkingPersonnel',
                language_code: $("#langCode").val(),
                profile_public: 0,
                name: $('#pname_edit').val(),
                surname: $('#plast_edit').val(),
                title: $('#ptitle_edit').val(),
                title_eng: $('#ptitle_eng_edit').val(),
                positions: $('#ppos_edit').val(),
                positions_eng: $('#ppos_eng_edit').val(),
                sex_id: window.sel_sex_type_edit,
                id: id
            }
        });
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Personel Genel Bilgi Güncelleme İşlemi Başarısız...',
                        'Personel Genel Bilgi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"Personel Genel Bilgi güncelleme" servis hatası->' + textStatus);
            },
            onSuccess: function (event, data) {
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'Personel Genel Bilgi Güncelleme İşlemi Başarılı...',
                        'Personel Genel Bilgi güncelleme işlemini gerçekleştirdiniz... ',
                        data);
//                window.gridReloadController = true;
                $('#reg_members_table').datagrid('reload');
            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Personel Genel Bilgi Güncelleme İşlemi Başarısız...',
                        'Personel Genel Bilgi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"Personel Genel Bilgi güncelleme" servis datası boştur!!');
                loader.loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Personel Genel Bilgi güncelleme İşlemi Başarısız...',
                        'Personel Genel Bilgi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                loader.loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Personel Genel Bilgi güncelleme İşlemi Başarısız... (Error 23503)',
                        'Personel Genel Bilgi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                loader.loadImager('removeLoadImage');

            },
            onError23505: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Personel Genel Bilgi güncelleme İşlemi Başarısız... (Error 23505)',
                        'Personel Genel Bilgi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                loader.loadImager('removeLoadImage');
            }
        });
        aj.ajaxCall('call');
        $('#reg_members_table').datagrid('reload');
    };

});


/*
 * Changes Date String to Milliseconds
 * @param {type} date
 * @returns {Number|Window.date_on_milliseconds}
 * @author: Bahram Lotfi Sadigh
 * 
 */
function milliseconds(date) {
    var input_date = date;
    var entered_date = new Date(input_date);
    window.date_value = entered_date.getTime();
    window.date_on_milliseconds = Math.round(window.date_value / 1000.0);
//    console.log(window.date_value);
//    console.log(okan);
    return window.date_on_milliseconds;
}

/*
 * Change Milliseconds to string
 * @param {type} date
 * @returns {date String}
 * @author: Bahram Lotfi Sadigh
 */
function milli_to_date(date) {
    if (date) {
        var new_date = new Date(date * 1000);
        var year = new_date.getFullYear().toString();
        var month = (new_date.getMonth() + 1).toString();
        var day = new_date.getDate().toString();

    } else {
        var year = '';
        var month = '';
        var day = '';
    }
    var st_date = (day < 10 ? ('0' + day) : day) + '/' + (month < 10 ? ('0' + month) : month) + '/' + year;

    return st_date;
}

var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
    actionButtonLabel: window.lang.translate('Confirm')});

function send_personel_general_info() {

    var loader = $('#popup_loader').loadImager();
    loader.loadImager('appendImage');
    if ($('#pname').val() && $('#plast').val()) {
        if ($('#personnel_gen_info').validationEngine('validate')) {
            /*
             * Service cagirilip ve kayit yapilacak, 
             * kaydin yapilmasi ile bir personnel id geri donecek
             * bu personnel id #gen_info_tab in personnel_id attributuna yazilip
             * tekrar bu taba geri donus yapildiginda eger mevcutsa update degilse 
             * insert komutu calistirilacak
             */

            if ($('#gen_info_tab').attr('personnel_id')) {

                /*
                 * update service
                 */

                $('#gen_info_tab').removeClass('active');
                $('#edu_info_tab').addClass('active');

                $('#gen_info_tab_btn').removeClass('active');
                $('#edu_info_tab_btn').addClass('active');

            } else {
                /*
                 * insert service
                 */

                $.ajax({
                    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//        url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                    data: {
                        pk: $("#pk").val(),
                        cpk: $("#cpk").val(),
                        url: 'pkcpkInsert_infoFirmWorkingPersonnel',
                        language_code: $("#langCode").val(),
                        profile_public: 0,
                        name: $('#pname').val(),
                        surname: $('#plast').val(),
                        title: $('#ptitle').val(),
                        title_eng: $('#ptitle_eng').val(),
                        positions: $('#ppos').val(),
                        positions_eng: $('#ppos_eng').val(),
                        sex_id: window.sel_sex_type
                    },
                    method: "GET",
                    //async: false,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                        if (data.errorInfo === '23505') {
                            wm.warningMessage('resetOnShown');
                            wm.warningMessage('show', 'Personel Genel Bilgi ekleme İşlemi Başarısız...',
                                    'Personel Genel Bilgi ekleme işlemi başarısız, sistemde aynı özelliklere sahip kayıt bulunmaktadır... ');

                            $('#reg_members_table').datagrid('reload');
                        } else if (data.errorInfo[0] === '00000') {
                            window.last_insert_id = data.lastInsertId;
                            console.log(window.last_insert_id);

                            sm.successMessage({
                                onShown: function (event, data) {
                                    loader.loadImager('removeLoadImage');
                                }
                            });
                            sm.successMessage('show', 'Personel Genel Bilgi Ekleme İşlemi Başarılı...',
                                    'Personel Genel Bilgi ekleme işlemini gerçekleştirdiniz... ',
                                    data);
                            $('#reg_members_table').datagrid('reload');
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                        console.error('"consultants" servis hatasÃ„Â±->' + textStatus);
                    }
                });
                /*
                 * personnel id must be written in #gen_info_tab 's personnel_id attr
                 */

//            $('#gen_info_tab').attr('personnel_id', '');
//
//            $('#gen_info_tab').removeClass('active');
//            $('#edu_info_tab').addClass('active');
//
//            $('#edu_tab_toggle').attr('href', '#edu_info_tab');
//            $('#edu_tab_toggle').attr('data-toggle', 'tab');
//
//            $('#gen_info_tab_btn').removeClass('active');
//            $('#edu_info_tab_btn').addClass('active');
//            $('#edu_info_tab_btn').removeClass('disabled');
            }
        } else {
            $('.control-sidebar').hide();
        }
    }else{
        wm.warningMessage('resetOnShown');
                            wm.warningMessage('show', 'Personel Genel Bilgi ekleme İşlemi Başarısız...',
                                    'Personel Genel Bilgi ekleme işlemi başarısız, personel adı ve soyadı girilmelidir... ');
    }
}

function add_new_personnel_grad() {

    /*
     * update education service
     */

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//        url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
        data: {
            pk: $("#pk").val(),
            cpk: $("#cpk").val(),
            url: 'pkcpkInsert_infoFirmWorkingPersonnelEducation',
            language_code: $("#langCode").val(),
            working_personnel_id: window.last_insert_id,
            profile_public: 0,
            diploma_name: $('#member_diploma_ph').val(),
            country_id: window.sel_uni_country_id,
            university_id: window.sel_uni_id,
            graduation_date: $('#grad_date_ph').val()
        },
        method: "GET",
        async: false,
        dataType: "json",
        success: function (data) {

            $('#reg_members_table').datagrid('reload');
        }
    });

    $('#edu_info_tab').removeClass('active');
    $('#lang_info_tab').addClass('active');

    $('#lang_tab_toggle').attr('href', '#lang_info_tab');
    $('#lang_tab_toggle').attr('data-toggle', 'tab');

    $('#edu_info_tab_btn').removeClass('active');
    $('#lang_info_tab_btn').addClass('active');
    $('#lang_info_tab_btn').removeClass('disabled');


}

function add_new_personnel_lang() {

    /*
     * update lang service
     */

    $('#lang_info_tab').removeClass('active');
    $('#cert_info_tab').addClass('active');

    $('#cert_tab_toggle').attr('href', '#cert_info_tab');
    $('#cert_tab_toggle').attr('data-toggle', 'tab');

    $('#lang_info_tab_btn').removeClass('active');
    $('#cert_info_tab_btn').addClass('active');
    $('#cert_info_tab_btn').removeClass('disabled');
}

function send_personnel_cert_info() {

//    $('#personnel_gen_info').reset();
    $('#personnel_gen_info')[0].reset();
    $('#cert_info_tab').removeClass('active');
    $('#gen_info_tab').addClass('active');
    $('#cert_info_tab_btn').removeClass('active');
    $('#gen_info_tab_btn').addClass('active');

    $('#edu_tab_toggle').removeAttr('href');
    $('#edu_tab_toggle').removeAttr('data-toggle');
    $('#edu_info_tab_btn').addClass('disabled');
    $('#lang_tab_toggle').removeAttr('href');
    $('#lang_tab_toggle').removeAttr('data-toggle');
    $('#lang_info_tab_btn').addClass('disabled');
    $('#cert_tab_toggle').removeAttr('href');
    $('#cert_tab_toggle').removeAttr('data-toggle');
    $('#cert_info_tab_btn').addClass('disabled');

    sm.successMessage('show', window.lang.translate('Congratulations...'),
            'Personnel information submitted successfully...');

}

function loadDiplomaGrid(id) {
    $('#diploma_grid').datagrid({
        onDblClickRow: function (index, row) {

        },
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url: 'pkFillFirmWorkingPersonalEducationListGrid_infoFirmWorkingPersonnelEducation',
            sort: 'id',
            order: 'id',
            working_personnel_id: id
        },
        width: '100%',
        singleSelect: true,
        pagination: true,
        collapsible: true,
        method: 'get',
        idField: 'id',
        //fit:true,
        //fitColumns : true,
        remoteFilter: true,
        remoteSort: true,
        multiSort: false,
        columns:
                [[
                        {field: 'id', title: 'ID', sortable: true, width: 30},
                        {field: 'name', title: 'Name', sortable: true, width: 150},
                        {field: 'diploma_name', title: 'Diploma', sortable: true, width: 150},
                        {field: 'working_personnel_id', title: 'Personnel ID', sortable: true, width: 150, hidden: true},
                        {field: 'profile_public', title: 'Position English', sortable: true, width: 150, hidden: true},
                        {field: 'country_id', title: 'Country ID', sortable: true, width: 80, hidden: true},
                        {field: 'country_name', title: 'Country', sortable: true, width: 80},
                        {field: 'university_id', title: 'University ID', sortable: true, width: 80, hidden: true},
                        {field: 'university_name', title: 'University', sortable: true, width: 180},
                        {field: 'graduation_date', title: 'Graduation Date', formatter: function (val) {
                                if (val !== null) {
                                    return milli_to_date(val);
                                } else {
                                    return null;
                                }
                            }, sortable: true, width: 80},
                        {field: 'actions', title: 'Actions', width: 80, align: 'center',
                            formatter: function (value, row, index) {
//                                if (row.attributes.active === 0) {
//                                    var e = '<button style="padding : 2px 4px;" title="Make Passive"  class="btn btn-primary" type="button" onclick="return (event, ' + row.id + ');"><i class="fa fa-minus-circle"></i></button>';
//                                } else {
//                                    var e = '<button style="padding : 2px 4px;" title="Make Active"  class="btn btn-warning" type="button" onclick="return (event, ' + row.id + ');"><i class="fa fa-plus-circle"></i></button>';
//                                }
                                var d = '<button style="padding : 2px 4px;" title="Delete"  class="btn btn-danger" type="button" onclick="return  deletePersonnelDiplomaDialog(' + row.id + ', ' + index + ');"><i class="fa fa-eraser"></i></button>';
                                var u = '<button style="padding : 2px 4px;" title="Edit"  class="btn btn-info" type="button" onclick="return updatePersonnelDiplomaDialog('
                                        + row.id
                                        + ', {  name : \''
                                        + row.name
                                        + '\', diploma: \''
                                        + row.diploma_name
                                        + '\',  profile_public : \''
                                        + row.profile_public
                                        + '\',  country_id : \''
                                        + row.country_id
                                        + '\',  country_name : \''
                                        + row.country_name
                                        + '\', university_id : \''
                                        + row.university_id
                                        + '\', university_name : \''
                                        + row.university_name
                                        + '\', graduation_date : \''
                                        + row.graduation_date
                                        + '\', working_personnel_id : \''
                                        + row.working_personnel_id
                                        + '\'} '
                                        + ');"><i class="fa fa-arrow-circle-up"></i></button>';
//                                return e + d + u;
                                return d + u;
                            }
                        }
                    ]]
    });

    $('#diploma_grid').datagrid('reload');
    $('#diploma_grid').datagrid('enableFilter');
}

function deletePersonnelDiplomaDialog(id, index) {

    var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
        proxy: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'pkcpkDeletedAct_infoFirmWorkingPersonnelEducation',
            id: id,
            pk: $("#pk").val(),
            cpk: $("#cpk").val()
        }
    });
    ajDeleteAll.ajaxCall({
        onError: function (event, data) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', window.lang.translate('Unsuccessful personnel diploma remove action!'),
                    window.lang.translate('Unsuccessful personnel diploma remove action! Please contact system administrator'));
            console.error('"personnel diploma silme servisi" servis hatası->' + data.errorInfo);
        },
        onSuccess: function (event, data) {
            sm.successMessage({
                onShown: function () {
                    //console.warn(index);
                    loaderGridBlock.loadImager('removeLoadImage');

                    $('#diploma_grid').datagrid('reload');
                }
            });
            sm.successMessage('show', window.lang.translate('Successful personnel diploma remove action!'),
                    window.lang.translate('Successful personnel diploma remove action!'));
        }
    });
    ajDeleteAll.ajaxCall('call');
}

function updatePersonnelDiplomaDialog(id, row) {

    window.gridReloadController = false;
    window.working_personnel_id = row.working_personnel_id;
    window.sel_diploma_id = id;
    BootstrapDialog.show({
        title: '"' + +'"' + window.lang.translate('You are going to update personnel diploma information'),
        message: function (dialogRef) {
            var dialogRef = dialogRef;
            var $message =
                    $('<!-- we are adding the .panel class so bootstrap.js collapse plugin detects it -->' +
                            '<div class="panel box box-primary" id="popup_loader">' +
                            '<div class="box-header with-border">' +
                            '<h4 class="box-title">' +
                            window.lang.translate('Education Information') +
                            '</h4>' +
                            '</div>' +
                            '<div class="box-body">' +
                            '<form id="personnel_edu_info_edit">' +
                            '<label for="member_diploma_ph_edit" style="margin-top: 20px">' +
                            window.lang.translate("Diploma") +
                            '</label>' +
                            '<div class="input-group">' +
                            '<div class="input-group-addon">' +
                            '<i class="icon-prepend fa fa-flag-o"></i>' +
                            '</div>' +
                            '<input type="text" class="form-control validate[required, maxSize[200]]"' +
                            'id="member_diploma_ph_edit" value="' + row.diploma + '">' +
                            '</div>' +
                            '<br/>' +
                            '<div class="form-group">' +
                            '<label for="member_university_country_ph_edit">' +
                            window.lang.translate("Country of Graduation") +
                            '</label>' +
                            '<div id="member_university_country_ph_edit">' +
                            '</div>' +
                            '</div>' +
                            '<br/>' +
                            '<div class="form-group">' +
                            '<label for="member_university_ph_edit">' +
                            window.lang.translate("University or Institute") +
                            '</label>' +
                            '<div id="member_university_ph_edit">' +
                            '</div>' +
                            '</div>' +
                            '<label for="grad_date_ph_edit" style="margin-top: 20px">' +
                            window.lang.translate("Graduation Date") +
                            '</label>' +
                            '<div class="input-group">' +
                            '<div class="input-group-addon">' +
                            '<i class="icon-prepend fa fa-flag-o"></i>' +
                            '</div>' +
                            '<input type="date" class="form-control" id="grad_date_ph_edit">' +
                            '</div>' +
                            '<br/>' +
                            '<div class="box-footer col-lg-12">' +
                            '<button type="button" class="btn btn-primary" onclick="updatePersonnelDiploma()">' +
                            window.lang.translate("Update Education Information") +
                            '</button>' +
                            '</div>' +
                            '</form>' +
                            '</div>' +
                            '<!-- /.box-body -->' +
                            '</div>' +
                            '</div>' +
                            '<div class="panel box box-primary">' +
                            '<div class="box-header with-border">' +
                            '<h4 class="box-title">' +
                            window.lang.translate('Add New Diploma') +
                            '</h4>' +
                            '</div>' +
                            '<div class="box-body">' +
                            '<form role="form" id="add_personel_edu_info">' +
                            '<!-- Middle Column Start -->' +
                            '<div">' +
                            '<br/>' +
                            '<label for="add_member_diploma_ph_edit" style="margin-top: 20px">' + window.lang.translate("Diploma") + '</label>' +
                            '<div class="input-group"> ' +
                            '<div class="input-group-addon">' +
                            '<i class="icon-prepend fa fa-flag-o"></i>' +
                            '</div>' +
                            '<input type="text" class="form-control validate[required, maxSize[200]]"' +
                            'id="add_member_diploma_ph_edit" placeholder="Enter diploma name in english here please">' +
                            '</div>' +
                            '<br/>' +
                            '<div class="form-group">' +
                            '<label for="add_member_university_country_ph_edit">' + window.lang.translate("Country of Graduation") + '</label>' +
                            '<div id="add_member_university_country_ph_edit">' +
                            '</div>' +
                            '</div>' +
                            '<br/>' +
                            '<div class="form-group">' +
                            '<label for="add_member_university_ph_edit">' + window.lang.translate("University or Institute") + '</label>' +
                            '<div id="add_member_university_ph_edit">' +
                            '</div>' +
                            '</div>' +
                            '<label for="add_grad_date_ph" style="margin-top: 20px">' + window.lang.translate("Graduation Date") + '</label>' +
                            '<div class="input-group">' +
                            '<div class="input-group-addon">' +
                            '<i class="icon-prepend fa fa-flag-o"></i>' +
                            '</div>' +
                            '<input type="date" class="form-control" id="add_grad_date_ph">' +
                            '</div>' +
                            '<br/>' +
                            '</div>' +
                            '<!-- Middle Column End -->' +
                            '<!-- Education Information Footer End -->' +
                            '</form>' +
                            '<br/>' +
                            '<div class="box-footer col-lg-12">' +
                            '<button type="button" class="btn btn-primary" onclick="addPersonnelDiploma()">' +
                            window.lang.translate("Add Education Information") +
                            '</button>' +
                            '</div>' +
                            '</div>');

            /*
             * Countries
             */
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
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].value == row.country_id) {
                                var index = i;
                            }
                        }
                        $('#add_member_university_country_ph_edit').ddslick('destroy');
                        $('#add_member_university_country_ph_edit').ddslick({
                            data: data,
                            width: '100%',
                            height: '500%',
                            background: false,
                            selectText: window.lang.translate("Please select a country from list..."),
                            imagePosition: 'right',
                            onSelected: function (selectedData) {
                                window.sel_add_country_edit = selectedData.selectedData.value;
                            }
                        });
                        $('#add_member_university_country_ph_edit').ddslick('select', {index: index});


                        $('#member_university_country_ph_edit').ddslick('destroy');
                        $('#member_university_country_ph_edit').ddslick({
                            data: data,
                            width: '100%',
                            height: '500%',
                            background: false,
                            selectText: window.lang.translate("Please select a country from list..."),
                            imagePosition: 'right',
                            onSelected: function (selectedData) {
                                window.sel_country_edit = selectedData.selectedData.value;
                            }
                        });
                        $('#member_university_country_ph_edit').ddslick('select', {index: index});

                    } else {
                        console.error('"fillComboBox_syscountrys" servis datasÄ± boÅŸtur!!');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('"fillComboBox_syscountrys" servis hatasÄ±->' + textStatus);
                }
            });

            /*
             * Universities
             */
            $.ajax({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data: {
                    url: 'pkFillUniversityDdList_sysUniversities',
                    language_code: $("#langCode").val(),
                    component_type: 'ddslick',
                    pk: $('#pk').val(),
                    country_id: 91
                },
                type: 'GET',
                dataType: 'json',
                //data: 'rowIndex='+rowData.id,
                success: function (data, textStatus, jqXHR) {
                    if (data.length !== 0) {
                        if (data.length !== 0) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].value == row.university_id) {
                                    var index = i;
                                }
                            }
                        }
                        //                console.log(data);

                        $('#add_member_university_ph_edit').ddslick('destroy');
                        $('#add_member_university_ph_edit').ddslick({
                            data: data,
                            width: '100%',
                            height: '500%',
                            background: false,
                            selectText: window.lang.translate("Please select a university from list..."),
                            imagePosition: 'right',
                            onSelected: function (selectedData) {
                                window.sel_add_university_edit = selectedData.selectedData.value;
                            }
                        });
                        $('#ad_member_university_ph_edit').ddslick('select', {index: index});

                        $('#member_university_ph_edit').ddslick('destroy');
                        $('#member_university_ph_edit').ddslick({
                            data: data,
                            width: '100%',
                            height: '500%',
                            background: false,
                            selectText: window.lang.translate("Please select a university from list..."),
                            imagePosition: 'right',
                            onSelected: function (selectedData) {
                                window.sel_university_edit = selectedData.selectedData.value;
                            }
                        });
                        $('#member_university_ph_edit').ddslick('select', {index: index});

                    } else {
                        console.error('list of universities servis datasÃ„Â± boÃ…Å¸tur!!');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('list of universities servis hatasÃ„Â±->' + textStatus);
                }
            });
            return $message;
        }
    });
    return false;
}

function updatePersonnelDiploma() {

    var loader = $('#popup_loader').loadImager();
    loader.loadImager('appendImage');
//   var diploma_id = id;
    if ($('#grad_date_ph_edit').val() !== null) {
        var date_on_milliseconds = milliseconds($('#grad_date_ph_edit').val());
    } else {
        var date_on_milliseconds = null;
    }

    var aj = $(window).ajaxCall({
        proxy: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            pk: $("#pk").val(),
            cpk: $("#cpk").val(),
            url: 'pkcpkUpdate_infoFirmWorkingPersonnelEducation',
            language_code: $("#langCode").val(),
            profile_public: 0,
            working_personnel_id: window.working_personnel_id,
            diploma_name: $('#diploma_name_edit').val(),
            country_id: window.sel_country_edit,
            university_id: window.sel_university_edit,
            id: window.sel_diploma_id,
            graduation_date: date_on_milliseconds
        }
    });
    aj.ajaxCall({
        onError: function (event, textStatus, errorThrown) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Personel Diplomasi Bilgi Güncelleme İşlemi Başarısız...',
                    'Personel Diplomasi Bilgi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            console.error('"Personel Diplomasi Bilgi güncelleme" servis hatası->' + textStatus);
        },
        onSuccess: function (event, data) {
            var data = data;
            sm.successMessage({
                onShown: function (event, data) {
                    loader.loadImager('removeLoadImage');
                }
            });
            sm.successMessage('show', 'Personel Diplomasi Bilgi Güncelleme İşlemi Başarılı...',
                    'Personel Diplomasi Bilgi güncelleme işlemini gerçekleştirdiniz... ',
                    data);
//                window.gridReloadController = true;
            $('#diploma_grid').datagrid('reload');
        },
        onErrorDataNull: function (event, data) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Personel Diplomasi Bilgi Güncelleme İşlemi Başarısız...',
                    'Personel Diplomasi Bilgi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            console.error('"Personel Diplomasi Bilgi güncelleme" servis datası boştur!!');
            loader.loadImager('removeLoadImage');
        },
        onErrorMessage: function (event, data) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Personel Diplomasi Bilgi güncelleme İşlemi Başarısız...',
                    'Personel Diplomasi Bilgi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            loader.loadImager('removeLoadImage');
        },
        onError23503: function (event, data) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Personel Diplomasi Bilgi güncelleme İşlemi Başarısız... (Error 23503)',
                    'Personel Diplomasi Bilgi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            loader.loadImager('removeLoadImage');

        },
        onError23505: function (event, data) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Personel Diplomasi Bilgi güncelleme İşlemi Başarısız... (Error 23505)',
                    'Personel Diplomasi Bilgi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            loader.loadImager('removeLoadImage');
        }
    });
    aj.ajaxCall('call');
    $('#diploma_grid').datagrid('reload');
}

function addPersonnelDiploma() {

    if ($('#add_grad_date_ph').val() !== null) {
        var date_on_milliseconds = milliseconds($('#add_grad_date_ph').val());
    } else {
        var date_on_milliseconds = null;
    }

    var aj = $(window).ajaxCall({
        proxy: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            pk: $("#pk").val(),
            cpk: $("#cpk").val(),
            url: 'pkcpkInsert_infoFirmWorkingPersonnelEducation',
            language_code: $("#langCode").val(),
            working_personnel_id: window.working_personnel_id,
            profile_public: 0,
            diploma_name: $('#add_member_diploma_ph_edit').val(),
            country_id: window.sel_add_country_edit,
            university_id: window.sel_add_university_edit,
            graduation_date: date_on_milliseconds
        }
    });
    aj.ajaxCall({
        onError: function (event, textStatus, errorThrown) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Personel Diplomasi Ekleme İşlemi Başarısız...',
                    'Personel Diplomasi Ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            console.error('"Personel Diplomasi Ekleme" servis hatası->' + textStatus);
        },
        onSuccess: function (event, data) {
            var data = data;
            sm.successMessage({
                onShown: function (event, data) {
                    loader.loadImager('removeLoadImage');
                }
            });
            sm.successMessage('show', 'Personel Diplomasi Ekleme İşlemi Başarılı...',
                    'Personel Diplomasi Ekleme işlemini gerçekleştirdiniz... ',
                    data);
//                window.gridReloadController = true;
            $('#diploma_grid').datagrid('reload');
        },
        onErrorDataNull: function (event, data) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Personel Diplomasi Ekleme İşlemi Başarısız...',
                    'Personel Diplomasi Ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            console.error('"Personel Diplomasi Ekleme" servis datası boştur!!');
            loader.loadImager('removeLoadImage');
        },
        onErrorMessage: function (event, data) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Personel Diplomasi Ekleme İşlemi Başarısız...',
                    'Personel Diplomasi Ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            loader.loadImager('removeLoadImage');
        },
        onError23503: function (event, data) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Personel Diplomasi Ekleme İşlemi Başarısız... (Error 23503)',
                    'Personel Diplomasi Ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            loader.loadImager('removeLoadImage');

        },
        onError23505: function (event, data) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Personel Diplomasi Ekleme İşlemi Başarısız... (Error 23505)',
                    'Personel Diplomasi Ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            loader.loadImager('removeLoadImage');
        }
    });
    aj.ajaxCall('call');
    $('#diploma_grid').datagrid('reload');
}
