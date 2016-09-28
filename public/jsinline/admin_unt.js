$(document).ready(function () {

    /**
     * easyui tree extend for 'unselect' event
     * @author Mustafa Zeynel Dağlı
     * @since 04/04/2016
     */
    $.extend($.fn.tree.methods,{
            unselect:function(jq,target){
                    return jq.each(function(){
                            var opts = $(this).tree('options');
                            $(target).removeClass('tree-node-selected');
                            if (opts.onUnselect){
                                    opts.onUnselect.call(this, $(this).tree('getNode',target));
                            }
                    });
            }
    });

    /**
     * multilanguage plugin 
     * @type Lang
     */
    var lang = new Lang();
    lang.dynamic($('#ln').val(), '/plugins/jquery-lang-js-master/langpack/'+$('#ln').val()+'.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#ln').val());
    
    var selectedNode;
    
    
    /*
    * 
    * @type @call;$@call;tree
    * Menu tree
    * Mustafa Zeynel Dağlı
    * 04/04/2016
    */

   $('#tt_tree_menu').tree({
       url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillUnitsTree_sysUnits&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
       method: 'get',
       animate: true,
       checkbox: true,
       cascadeCheck: false,
       lines: true,
       onBeforeCheck : function (node) {        
       },
       onDblClick: function (node) {
       },
       onAfterEdit: function (node) { 
        },
       onLoadSuccess: function (node, data) {
            loader.loadImager('removeLoadImage');
        },
       onClick: function (node) {
            selectedNode = node;
            selectedRoot = $(this).tree('getRoot', node.target);
            selectedItem = $(this).tree('getData', node.target);
            //console.log(selectedItem);
            $('#updateUnit').attr('disabled', false);
            $('#insertUnit').attr('disabled', true);
            if(selectedItem.attributes.notroot == true ) {
                $('#unit').attr('disabled',false);
                $('#unit_eng').attr('disabled',false);
                $('#abbreviation').attr('disabled',false);
                $('#abbreviation_eng').attr('disabled',false);

                $('#unitcode').val(selectedItem.text);
                $('#unitcode_eng').val(selectedItem.attributes.unitcode_eng);
                $('#abbreviation').val(selectedItem.attributes.abbreviation);
                $('#abbreviation_eng').val(selectedItem.attributes.abbreviation_eng);
                $('#unit').val(selectedItem.attributes.unit);
                $('#unit_eng').val(selectedItem.attributes.unit_eng);
                /*$('#dropdownUnitSystems').ddslick('select', 
                                            {index: selectedItem.attributes.system_id }
                                                );*/
                $('#dropdownUnitSystems').ddslick('selectByValue', 
                                            {index: selectedItem.attributes.system_id,
                                            text : selectedItem.text}
                                                );
                //console.warn($('#dropdownUnitSystems').data('ddslick'));
                
            } else {
                $('#dropdownUnitSystems').ddslick('selectByValue', 
                                            {index: 0,
                                            text : selectedItem.text}
                                                );
                $('#unit').val('');
                $('#unit_eng').val('');
                $('#abbreviation').val('');
                $('#abbreviation_eng').val('');
                
                $('#unitcode').val(selectedItem.text);
                $('#unitcode_eng').val(selectedItem.attributes.unitcode_eng);
                $('#unit').attr('disabled',true);
                $('#unit_eng').attr('disabled',true);
                $('#abbreviation').attr('disabled',true);
                $('#abbreviation_eng').attr('disabled',true);
                /*$('#dropdownUnitSystems').ddslick('select', 
                                            {index: -1 }
                                                );*/
               //console.warn($('#dropdownUnitSystems').data('ddslick'));
            }
        },
       onCheck: function (node) {

        },
       formatter: function (node) {
           if(node.attributes.system != null) {
               var s = node.text+' ('+node.attributes.system+')';
           } else {
               var s = node.text;
           }
            var id = node.id;
            if (node.attributes.active == 0) {
                
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="birim sil" onclick="deleteUnitDialog('+id+')"></i>&nbsp;\n\
                     <i class="fa fa-fw fa-ban" title="pasif yap" onclick="passiveUnitDialog('+id+');"></i>&nbsp;&nbsp;\n\
                    ';
                if(node.attributes.notroot == false) {
                   s += '<i class="fa fa-level-down" title="alt kırılıma birim ekle" onclick="insertUnitDialog('+id+', \''+node.text+'\')"></i>' 
                }
                return s;

            } else if (node.attributes.active == 1) {
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="birim sil" onclick="deleteUnitDialog('+id+')"></i>&nbsp;\n\
                <i class="fa fa-fw fa-check-square-o" title="aktif yap" onclick="activeUnitDialog('+id+');"></i>';
                s = "<font color = '#B6B6B4'>" + s + "</font>"
                
                return s;
            }
        }
    });
    
    /**
     * user roles  select box filling
     * @author Mustafa Zeynel Dağlı
     * @since 04/04/2016
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkGetUnitSystems_sysUnitSystems' ,
                language_code : 'tr',
                main_group : 2,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                $('#dropdownUnitSystems').ddslick({
                    height : 200,
                    data : data, 
                    width:'98%',
                    selectText: "Select your preferred social network",
                    //showSelectedHTML : false,
                    defaultSelectedIndex: 3,
                    //imagePosition:"right",
                    onSelected: function(selectedData){
                        if(selectedData.selectedData.value>0) {
                            /*$('#tt_tree_menu').tree({
                                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                            });*/
                        }
                    }   
                });
            } else {
                console.error('"pkGetUnitSystems_sysUnitSystems" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkGetUnitSystems_sysUnitSystems" servis hatası->'+textStatus);
        }
    });

    // Left menuyu oluşturmak için çağırılan fonksiyon...
    //$.fn.leftMenuFunction();

    //Validation forms binded...
    jQuery("#unitForm").validationEngine();
    
    /*
     * 
     * @type @call;$@call;loadImager
     * @Since 2016.01.16
     * @Author Mustafa Zeynel Dagli
     * @Purpose this variable is to create loader image for roles tree 
     * this imager goes to #loading-image div in html.
     * imager will be removed on roles tree onLoadSuccess method.
     */
    var loader = $("#loading-image").loadImager();

    var sm  = $(window).successMessage();
    var dm  = $(window).dangerMessage();
    var wm  = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                                actionButtonLabel : 'İşleme devam et'});

    //$('#menuForm').submit(newRoleSubmission);
    
   /**
    * wrapper class for pop up and active menu item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.deleteUnitDialog= function(nodeID){
       var nodeID = nodeID;
       wcm.warningComplexMessage({onConfirm : function(event, data) {
           deleteUnit(nodeID);
       }
       });
       wcm.warningComplexMessage('show', 'Birim Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                         'Birim Öğesini silmek üzeresiniz, birim silme işlemi geri alınamaz!! ');
   }
   
   /**
    * set unit item delete
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.deleteUnit = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkDelete_sysUnits' ,
                            id : nodeID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Silme İşlemi Başarısız...', 
                                         'Birim Silme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ');
                console.error('"pkDelete_sysUnits" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({ onShown : function(event, data) {
                        loader.loadImager('removeLoadImage');
                        regulateButtonsForCRUD();
                    }
                });
                sm.successMessage('show', 'Birim Silme İşlemi Başarılı...', 
                                          'Birim Silme işlemini gerçekleştirdiniz... ')
                selectedTreeItem = $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
             },
             onErrorDataNull : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Silme İşlemi Başarısız...', 
                                         'Birim Silme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ');
                regulateButtonsForCRUD();
                console.error('"pkDelete_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Silme İşlemi Başarısız...', 
                                         'Birim Silme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ');
                regulateButtonsForCRUD();
             },
             onError23503 : function (event, data) {
                 dm.dangerMessage({ onShown : function(event, data) {
                        loader.loadImager('removeLoadImage');
                        regulateButtonsForCRUD(); 
                    }
                });
                dm.dangerMessage('show', 'Birim Silme İşlemi Başarısız...', 
                                         'Birim kategorisi altında kayıtlı birim olduğu için işlemi gerçekleştiremezsiniz, önce birim kaydının silinmasi gerekmektedir... ' );
             },
             onError23505 : function (event, data) {
             }
       }) 
       aj.ajaxCall('call');
   }
   
   /**
    * wrapper class for pop up and passive unit item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.passiveUnitDialog= function(nodeID){
        var nodeID = nodeID;
        wcm.warningComplexMessage({ 
            onConfirm : function() {
                passiveUnit(nodeID);
            }
       });
       wcm.warningComplexMessage('show', 'Birim Ögesini Pasifleştirmek Üzeresiniz!',
                                 'Birim öğesini pasifleştirmek üzeresiniz !! ');
   }
   
   /**
    * set unit item passive
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.passiveUnit = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkUpdateMakeActiveOrPassive_sysUnits' ,
                            id : nodeID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Pasifleştirme İşlemi Başarısız...', 
                                     'Birim pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz...' );
                console.error('"pkUpdateMakeActiveOrPassive_sysUnits" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({
                            onShown : function (event, data) {
                                loader.loadImager('removeLoadImage');
                            }
                });
                sm.successMessage('show', 'Birim Pasif İşlemi Başarılı...', 
                                          'Birim Pasifleştirme işlemini gerçekleştirdiniz... ')                   
                var nodeState;
                if($('#tt_tree_menu').tree('isLeaf', selectedTreeItem.target)) {
                    nodeState = 'open';
                } else {
                    nodeState = 'closed';
                }

                var parentNode = $('#tt_tree_menu').tree('getParent', selectedTreeItem.target);
                var node = selectedTreeItem;
                $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
                if(jQuery.type(parentNode) === "null") { 
                    $('#tt_tree_menu').tree('append', {
                        data: [{
                                attributes:{notroot: selectedTreeItem.attributes.notroot, 
                                            unitcode_eng : selectedTreeItem.attributes.unitcode_eng, 
                                            system_id : selectedTreeItem.attributes.system_id,
                                            system : selectedTreeItem.attributes.system,
                                            system_eng : selectedTreeItem.attributes.system_eng,
                                            abbreviation : selectedTreeItem.attributes.abbreviation,
                                            abbreviation_eng : selectedTreeItem.attributes.abbreviation_eng,
                                            unit_eng : selectedTreeItem.attributes.unit_eng,
                                            unit : selectedTreeItem.attributes.unit,
                                            active: 1,},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                } else {
                    $('#tt_tree_menu').tree('append', {
                        parent: parentNode.target,
                        data: [{
                                attributes:{notroot: node.attributes.notroot, 
                                            text_eng: node.attributes.text_eng, 
                                            active: 1, 
                                            url: node.attributes.url, 
                                            icon_class: node.attributes.icon_class},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                }
             },
             onErrorDataNull : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Pasifleştirme İşlemi Başarısız...', 
                                         'Birim pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz...' );
                console.error('"pkUpdateMakeActiveOrPassive_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage({ onShown : function(event, data) {
                            loader.loadImager('removeLoadImage');
                            }
                });
                dm.dangerMessage('show', 'Birim Pasifleştirme İşlemi Başarısız...', 
                                         'Birim pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz...' );
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
             }
       }) 
       aj.ajaxCall('call');
   }
   
   /**
    * wrapper class for pop up and active unit item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.activeUnitDialog= function(nodeID){
        var nodeID = nodeID;
        wcm.warningComplexMessage({onConfirm : function(event, data) {
            activeUnit(nodeID);
        }
        });
        wcm.warningComplexMessage('show', 'Birim Ögesini Aktifleştirmek Üzeresiniz!', 
                                          'Birim öğesini aktifleştirmek üzeresiniz !! ');
   }
   
   /**
    * set unit item active
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.activeUnit = function(nodeID) {

       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url : 'pkUpdateMakeActiveOrPassive_sysUnits' ,
                            id : nodeID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Birim Aktifleştirme İşlemi Başarısız...', 
                                         'Birim aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
                 console.error('"pkUpdateMakeActiveOrPassive_sysUnits" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 sm.successMessage({ onShown : function(event, data){
                            loader.loadImager('removeLoadImage');
                        }
                    });
                sm.successMessage('show', 'Birim Aktifleştirme İşlemi Başarılı...', 
                                          'Birim aktifleştirme işlemini gerçekleştirdiniz... ')
                var nodeState;
                if($('#tt_tree_menu').tree('isLeaf', selectedTreeItem.target)) {
                    nodeState = 'open';
                } else {
                    nodeState = 'closed';
                }

                var parentNode = $('#tt_tree_menu').tree('getParent', selectedTreeItem.target);
                var node = selectedTreeItem;
                $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
                if(jQuery.type(parentNode) === "null") { 
                    $('#tt_tree_menu').tree('append', {
                        data: [{
                                attributes:{notroot: selectedTreeItem.attributes.notroot, 
                                            unitcode_eng : selectedTreeItem.attributes.unitcode_eng, 
                                            system_id : selectedTreeItem.attributes.system_id,
                                            system : selectedTreeItem.attributes.system,
                                            system_eng : selectedTreeItem.attributes.system_eng,
                                            abbreviation : selectedTreeItem.attributes.abbreviation,
                                            abbreviation_eng : selectedTreeItem.attributes.abbreviation_eng,
                                            unit_eng : selectedTreeItem.attributes.unit_eng,
                                            unit : selectedTreeItem.attributes.unit,
                                            active: 0,},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                } else {
                    $('#tt_tree_menu').tree('append', {
                        parent: parentNode.target,
                        data: [{
                                attributes:{notroot: node.attributes.notroot, 
                                            text_eng: node.attributes.text_eng, 
                                            active: 0, 
                                            url: node.attributes.url, 
                                            icon_class: node.attributes.icon_class},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                }
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Birim Aktifleştirme İşlemi Başarısız...', 
                                         'Birim aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkUpdateMakeActiveOrPassive_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Birim Aktifleştirme İşlemi Başarısız...', 
                                             'Birim aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             }
       }) 
       aj.ajaxCall('call');
   }
   
   /**
    * reset button function setting disabled/ enabled
    * for 'insert' and 'update' form buttons
    * @returns null
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.regulateButtons = function () {
       $('#updateUnit').attr('disabled', true);
       $('#insertUnit').attr('disabled', false);
       
       $('#unit').val('');
       $('#unit_eng').val('');
       $('#abbreviation').val('');
       $('#abbreviation_eng').val('');
       
       $('#unit').attr('disabled',true);
       $('#unit_eng').attr('disabled',true);
       $('#abbreviation').attr('disabled',true);
       $('#abbreviation_eng').attr('disabled',true);
       
       $('#dropdownUnitSystems').ddslick('close');
   }
   
   /**
    * reset button function setting disabled/ enabled
    * for 'insert' and 'update' form buttons
    * @returns null
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.regulateButtonsForCRUD = function () {
       $('#updateUnit').attr('disabled', true);
       $('#insertUnit').attr('disabled', false);
       
       $('#unit').val('');
       $('#unit_eng').val('');
       $('#abbreviation').val('');
       $('#abbreviation_eng').val('');
       
       $('#unitcode').val('');
       $('#unitcode_eng').val('');
       
       $('#unit').attr('disabled',true);
       $('#unit_eng').attr('disabled',true);
       $('#abbreviation').attr('disabled',true);
       $('#abbreviation_eng').attr('disabled',true);
   }
   
   /**
    * insert unit item
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertUnitWrapper = function (e, nodeID, nodeName) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#unitFormInsert").validationEngine('validate')) {
        var ddData = $('#dropdownUnitSystemsPopup').data('ddslick');
        if(ddData.selectedData.value>0) {
            insertUnit(nodeID, nodeName);
        } else {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Metrik Sistem Seçiniz', 'Lütfen Metrik sistem Seçiniz!');
        }
    }
    return false;
   }
   
   /**
    * wrapper for unit insert process
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertUnitDialog = function (nodeID, nodeName) {
    var nodeID = nodeID;
    var nodeName = nodeName;
    BootstrapDialog.show({
        title: '"'+ nodeName + '" Birim katmanına yeni birim eklemektesiniz...',
        message: function (dialogRef) {
                    var dialogRef = dialogRef;
                    var $message = $(' <div class="row">\n\
                                            <div class="col-md-12">\n\
                                                <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                    <form id="unitFormInsert" method="get" class="form-horizontal">\n\
                                                    <div class="hr-line-dashed"></div>\n\
                                                        <div class="form-group" style="margin-top:20px;">\n\
                                                            <label class="col-sm-2 control-label">Birim Sistemi</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownUnitSystemsPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Birim</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="unit_popup" id="unit_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">İngilizce Birim</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="unit_eng_popup" id="unit_eng_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Birim Kodu</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="unitcode_popup" id="unitcode_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">İngilizce Birim Kodu</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="unitcode_eng_popup" id="unitcode_eng_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Birim Kısaltması</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="abbreviation_popup" id="abbreviation_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">İngilizce Birim Kısaltması</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="abbreviation_eng_popup" id="abbreviation_eng_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="hr-line-dashed"></div>\n\
                                                        <div class="form-group">\n\
                                                            <div class="col-sm-10 col-sm-offset-2">\n\
                                                            <button id="insertUnitPopUp" class="btn btn-primary" type="submit" onclick="return insertUnitWrapper(event, '+nodeID+', \''+nodeName+'\');">\n\
                                                                <i class="fa fa-save"></i> Kaydet </button>\n\
                                                            <button id="resetForm" class="btn btn-flat" type="reset" " >\n\
                                                                <i class="fa fa-remove"></i> Reset </button>\n\
                                                        </div>\n\
                                                    </div>\n\
                                                </form>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>');
                    return $message;
                },
        type: BootstrapDialog.TYPE_PRIMARY,
        onshown : function () {
            $("#unitFormInsert").validationEngine();
            
            var aj = $(window).ajaxCallWidget({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkGetUnitSystems_sysUnitSystems' ,
                            language_code : 'tr',
                            main_group : 2,
                            pk : $("#pk").val(),
                        }
       })
       aj.ajaxCallWidget ({
             onError : function (event, textStatus, errorThrown) {
                 console.error('"pkGetUnitSystems_sysUnitSystems" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 console.log(data);
                 var data = $.parseJSON(data);
                 
                 $('#dropdownUnitSystemsPopup').ddslick({
                        height : 200,
                        data : data, 
                        width:'100%',
                        selectText: "Select your preferred social network",
                        //showSelectedHTML : false,
                        defaultSelectedIndex: 3,
                        //imagePosition:"right",
                        onSelected: function(selectedData){
                            if(selectedData.selectedData.value>0) {

                            }
                        }   
                });
             },
             onErrorDataNull : function (event, data) {
                 console.error('"pkGetUnitSystems_sysUnitSystems" servis datası boştur!!');
             },
       }) 
       aj.ajaxCallWidget('call');
        },
        onhide : function() {
            $('#unitForm')[0].reset();
            regulateButtons();
        },
    });
    
    return false;
   }
   
   /**
    * insert unit item
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertUnit = function (nodeID, nodeName) {
        var loader = $("#loading-image-crud-popup").loadImager();
        loader.loadImager('appendImage');
        unit = $('#unit_popup').val();
        unit_eng = $('#unit_eng_popup').val();
        unitcode = $('#unitcode_popup').val();
        unitcode_eng = $('#unitcode_eng_popup').val();
        abbreviation = $('#abbreviation_popup').val();
        abbreviation_eng = $('#abbreviation_eng_popup').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownUnitSystemsPopup').data('ddslick');
        system_id = ddData.selectedData.value;
        system = ddData.selectedData.text;
        system_eng = ddData.selectedData.description;
        selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
        //console.log(ddData);
        parent = nodeID;
        
        var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkInsert_sysUnits' ,
                            language_code : language_code,
                            unit : unit,
                            unit_eng : unit_eng,
                            unitcode : unitcode,
                            unitcode_eng : unitcode_eng,
                            abbreviation : abbreviation,
                            abbreviation_eng : abbreviation_eng,
                            parent_id : parent,
                            system_id : system_id,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Birim Aktifleştirme İşlemi Başarısız...', 
                                          'Birim aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
                 console.error('"pkUpdateMakeActiveOrPassive_sysUnits" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({
                    onShown: function( event, data ) {
                        $('#unitFormInsert')[0].reset();
                        $('#unitForm')[0].reset();
                        regulateButtons();
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'Birim Kayıt İşlemi Başarılı...', 
                                          'Birim kayıt işlemini gerçekleştirdiniz... ');
                $('#tt_tree_menu').tree('append', {
                    parent: selectedTreeItem.target,
                    data: [{
                            attributes:{notroot: true, 
                                        unitcode_eng : unitcode_eng, 
                                        system_id : system_id,
                                        system : system,
                                        system_eng : system_eng,
                                        abbreviation : abbreviation,
                                        abbreviation_eng : abbreviation_eng,
                                        unit_eng : unit_eng,
                                        unit : unit,
                                        active: 0,
                                        },
                            id: data.lastInsertId,
                            text: unitcode,
                            checked: false,
                            state : 'open',
                        },]
                });
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Birim Kayıt İşlemi Başarısız...', 
                                          'Birim kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                 console.error('"pkInsert_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Kayıt İşlemi Başarısız...', 
                                        'Birim kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysUnits" servis hatası->'+textStatus);
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
                 dm.dangerMessage({
                    onShown : function(event, data) {
                        $('#unitFormInsert')[0].reset();
                        $('#unitForm')[0].reset();
                        loader.loadImager('removeLoadImage');
                    }
                 });
                 dm.dangerMessage('show', 'Birim Kayıt İşlemi Başarısız...', 
                                          'Aynı isim ile birim kaydı yapılmıştır, yeni bir isim deneyiniz... ');
             }
       }) 
       aj.ajaxCall('call');
   }
   
   /**
    * insert unit item for root
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertUnitRootWrapper = function (e) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#unitForm").validationEngine('validate')) {
        insertUnitRoot();
    }
    return false;
   }
   
   /**
    * insert unit for root level
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertUnitRoot = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        unit = $('#unit').val();
        unit_eng = $('#unit_eng').val();
        unitcode = $('#unitcode').val();
        unitcode_eng = $('#unitcode_eng').val();
        abbreviation = $('#abbreviation').val();
        abbreviation_eng = $('#abbreviation_eng').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownUnitSystems').data('ddslick');
        system_id = ddData.selectedData.value;
        //console.log(ddData);
        
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkInsert_sysUnits' ,
                            language_code : language_code,
                            unit : unit,
                            unit_eng : unit_eng,
                            unitcode : unitcode,
                            unitcode_eng : unitcode_eng,
                            abbreviation : abbreviation,
                            abbreviation_eng : abbreviation_eng,
                            //parent : 0,
                            system_id : '',
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Kayıt İşlemi Başarısız...', 
                                         'Birim kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysUnits" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 var data = data;
                sm.successMessage({
                    onShown: function( event, data ) {
                        $('#unitForm')[0].reset();
                        regulateButtons();
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'Birim Kayıt İşlemi Başarılı...', 
                                          'Birim kayıt işlemini gerçekleştirdiniz... ');                      
                $('#tt_tree_menu').tree('append', {
                    //parent: selectedTreeItem.target,
                    data: [{
                        attributes:{notroot: false, 
                                    unitcode_eng : unitcode_eng, 
                                    system_id : '',
                                    system : null,
                                    system_eng : null,
                                    abbreviation : null,
                                    abbreviation_eng : null,
                                    unit_eng : null,
                                    unit : null,
                                    active: 0,
                                    },
                        id: data.lastInsertId,
                        text: unitcode,
                        checked: false,
                        state : 'open',
                    },]
                });
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Birim Kayıt İşlemi Başarısız...', 
                                            'Birim kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                 console.error('"pkInsert_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Kayıt İşlemi Başarısız...', 
                                         'Birim kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
                 dm.dangerMessage({
                    onShown : function(event, data) {
                      $('#unitForm')[0].reset();
                      loader.loadImager('removeLoadImage');
                    }
                 });
                 dm.dangerMessage('show', 'Birim Kayıt İşlemi Başarısız...', 
                                          'Aynı isim ile birim kaydı yapılmıştır, yeni bir isim deneyiniz... ');
             }
       }) 
       aj.ajaxCall('call');
       
   }
   
   /**
    * update unit item
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.updateUnitWrapper = function (e) {
    e.preventDefault();
    if ($("#unitForm").validationEngine('validate')) {
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        if(selectedTreeItem == null) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Birim Öğesi Seçiniz', 'Lütfen Birim Öğesi Seçiniz!')
            return false;
        }
        
        if(selectedTreeItem.attributes.notroot == true) {
            var ddData = $('#dropdownUnitSystems').data('ddslick');
            if(ddData.selectedData.value>0) {
                updateUnit();
            } else {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', 'Metrik Sistem Seçiniz', 'Lütfen Metrik Sistem Seçiniz!')
            }
            return false;
        }
        updateUnit();
    }
    return false;
   }
   
   /**
    * update unit item
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 05/04/2016
    */
   window.updateUnit = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        unit = $('#unit').val();
        unit_eng = $('#unit_eng').val();
        unitcode = $('#unitcode').val();
        unitcode_eng = $('#unitcode_eng').val();
        abbreviation = $('#abbreviation').val();
        abbreviation_eng = $('#abbreviation_eng').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownUnitSystems').data('ddslick');
        system_id = ddData.selectedData.value;
        system = ddData.selectedData.text;
        system_eng = ddData.selectedData.description;
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        id = selectedTreeItem.id;
        if(selectedTreeItem.attributes.notroot == false) {
            system_id = 0;
        }
        
        var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkUpdate_sysUnits' ,
                            language_code : language_code,
                            unit : unit,
                            unit_eng : unit_eng,
                            unitcode : unitcode,
                            unitcode_eng : unitcode_eng,
                            abbreviation : abbreviation,
                            abbreviation_eng : abbreviation_eng,
                            id : id,
                            system_id : system_id,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Güncelleme İşlemi Başarısız...', 
                                              'Birim güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdate_sysUnits" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({
                    onShown: function( event, data ) {
                        $('#unitForm')[0].reset();
                        regulateButtons();
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'Birim Güncelleme İşlemi Başarılı...', 
                                          'Birim güncelleme işlemini gerçekleştirdiniz... ');
                $('#tt_tree_menu').tree('update', {
                    target: selectedTreeItem.target,
                    text: unitcode,
                    attributes:{notroot: selectedTreeItem.attributes.notroot, 
                                unitcode_eng : unitcode_eng, 
                                system_id : system_id,
                                system : system,
                                system_eng : system_eng,
                                abbreviation : abbreviation,
                                abbreviation_eng : abbreviation_eng,
                                unit_eng : unit_eng,
                                unit : unit,
                                active: 0,}
               });
             },
             onErrorDataNull : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Güncelleme İşlemi Başarısız...', 
                                              'Birim güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdate_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Güncelleme İşlemi Başarısız...', 
                                         'Birim güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
             }
       }) 
       aj.ajaxCall('call');
   }
   
   
   
});
