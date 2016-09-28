$(document).ready(function () {

    /**
     * easyui tree extend for 'unselect' event
     * @author Mustafa Zeynel Dağlı
     * @since 30/03/2016
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
    
    
    
    /*
    * 
    * @type @call;$@call;tree
    * machine Category tree
    * Mustafa Zeynel Dağlı
    * 30/03/2016
    */

   $('#tt_tree_menu').tree({
       url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillJustMachineToolGroupsBootstrap_sysMachineToolGroups&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
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

           id = editNode.id;
           root = $(this).tree('getRoot', node.target);
           if (editNode.text === '') {

               testBlockuiRoleNameChangeNull.blockuiWrapper('option', 'fadeOut', 700);
               testBlockuiRoleNameChangeNull.blockuiWrapper('show');

               editNode.text = beforeEditTextValue;

               $('#tt_tree_menu').tree('update', {
                   target: node.target,
                   text: beforeEditTextValue
               });

           } else {

               testBlockuiRoleNameChangeApproval.blockuiApprovalWrapper('option', {
                   showOverlay: true
               });
               testBlockuiRoleNameChangeApproval.blockuiApprovalWrapper('show');
               active = editNode.attributes.active;
           }
           },
        onLoadSuccess: function (node, data) {
        loader.loadImager('removeLoadImage');
        },
        onClick: function (node) {
            selectedRoot = $(this).tree('getRoot', node.target);
            selectedItem = $(this).tree('getData', node.target);
            //console.log(selectedItem);
            $('#group_name').val(selectedItem.text);
            $('#group_name_eng').val(selectedItem.attributes.group_name_eng);
            //$('#url').val(selectedItem.attributes.url);
            $('#icon_class').val(selectedItem.attributes.icon_class);
            $('#updateMachineCategory').attr('disabled', false);
            $('#insertMachineCategory').attr('disabled', true);

        },
        onCheck: function (node) {

        },
        formatter: function (node) {
            var s = node.text;
            var id = node.id;
            if (node.attributes.active == 0) {
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="menü sil" onclick="deleteMachineCategoryDialog('+id+')"></i>&nbsp;\n\
                     <i class="fa fa-fw fa-ban" title="pasif yap" onclick="passiveMachineDialog('+id+');"></i>&nbsp;&nbsp;\n\
                    <i class="fa fa-level-down" title="alt kırılıma menü ekle" onclick="insertMachineCategoryDialog('+id+', \''+node.text+'\')"></i>';
                return s;

            } else if (node.attributes.active == 1) {
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="menü sil" onclick="deleteMachineCategoryDialog('+id+')"></i>&nbsp;\n\
                <i class="fa fa-fw fa-check-square-o" title="aktif yap" onclick="activeMachineCategoryDialog('+id+');"></i>';
                s = "<font color = '#B6B6B4'>" + s + "</font>"
                
                return s;
            }
        }
    });

    

    /*
     * Author: Abdullah A Almsaeed
     * Date: 4 Jan 2014
     * Description:
     *      This is a demo file used only for the main dashboard (index.html)
     **/
    "use strict";
    // Left menuyu oluşturmak için çağırılan fonksiyon...
    //$.fn.leftMenuFunction();

    //Validation forms binded...
    jQuery("#machineCategoryForm").validationEngine();
    


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

   
   
    //$('#machineCategoryForm').submit(newRoleSubmission);
    
   /**
    * wrapper class for pop up and active machine category item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 30/03/2016
    */
   window.deleteMachineCategoryDialog= function(nodeID){
       var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Makina Kategori Silme İşlemi Gerçekleştirmek Üzeresiniz!',
            message: 'Makina Kategorisini silmek üzeresiniz, kategori silme işlemi geri alınamaz!! ',
            buttons: [ {
                icon: 'glyphicon glyphicon-ban-circle',
                label: 'Vazgeç',
                cssClass: 'btn-warning',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }, {
                icon: 'glyphicon glyphicon-ok-sign',
                label: 'Sil',
                cssClass: 'btn-success',
                action: function(dialogItself){
                    dialogItself.close();
                    deleteMachineCategory(nodeID);
                }
            }]
        });
   }
   
   /**
    * set machine category delete
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 30/03/2016
    */
   window.deleteMachineCategory = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkDelete_sysMachineToolGroups' ,
                id : nodeID,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                if(data.found) {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Makina Kategori Silme İşlemi Başarılı...',
                        message: 'Makina kategorisi silme işlemini gerçekleştirdiniz... ',
                        buttons: [ {
                            icon: 'glyphicon glyphicon-ok-sign',
                            label: 'Kapat',
                            cssClass: 'btn-success',
                            action: function(dialogItself){
                                dialogItself.close();
                                loader.loadImager('removeLoadImage');
                            }
                        }]
                    });
                    selectedTreeItem = $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
                } else {
                    if(data.errorInfo == 23503) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Makina Kategori Silme İşlemi Başarısız...',
                            message: 'Makina kategorisi altında kayıtlı makina olduğu için işlemi gerçekleştiremezsiniz, önce makina kaydının silinmasi gerekmektedir... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ban-circle',
                                label: 'Kapat',
                                cssClass: 'btn-danger',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    loader.loadImager('removeLoadImage');
                                }
                            }]
                        });
                    }
                }           
            } else {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Makina Kategori Silme İşlemi Başarısız...',
                    message: 'Makina kategorisi silme işlemini gerçekleştiremediniz,Sistem Yneticisi ile temasa geçiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ban-circle',
                        label: 'Kapat',
                        cssClass: 'btn-danger',
                        action: function(dialogItself){
                            dialogItself.close();
                        }
                    }]
                });
                console.error('"pkDelete_sysMachineToolGroups" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkDelete_sysMachineToolGroups" servis hatası->'+textStatus);
        }
    });
   }
   
   /**
    * wrapper class for pop up and passive machine category item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 30/03/2016
    */
   window.passiveMachineDialog= function(nodeID){
        var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Makina Kategorisini Ögesini Pasifleştirmek Üzeresiniz!',
            message: 'Makina kategorisini pasifleştirmek üzeresiniz !! ',
            buttons: [ {
                icon: 'glyphicon glyphicon-ban-circle',
                label: 'Vazgeç',
                cssClass: 'btn-warning',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }, {
                icon: 'glyphicon glyphicon-ok-sign',
                label: 'Pasif Yap',
                cssClass: 'btn-success',
                action: function(dialogItself){
                    dialogItself.close();
                    passiveMachineCategory(nodeID);
                }
            }]
        });
   }
   
   /**
    * set machine category item passive
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 30/03/2016
    */
   window.passiveMachineCategory = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkUpdateMakeActiveOrPassive_leftnavigation' ,
                id : nodeID,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                if(data.found) {
                   BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Makina Kategori Pasif İşlemi Başarılı...',
                        message: 'Makina kategori pasifleştirme işlemini gerçekleştirdiniz... ',
                        buttons: [ {
                            icon: 'glyphicon glyphicon-ok-sign',
                            label: 'Kapat',
                            cssClass: 'btn-success',
                            action: function(dialogItself){
                                dialogItself.close();
                                loader.loadImager('removeLoadImage');
                            }
                        }]
                    });
                    var nodeState;
                    if($('#tt_tree_menu').tree('isLeaf', selectedTreeItem.target)) {
                        nodeState = 'open';
                    } else {
                        nodeState = 'closed';
                    }
                    
                    
                    var parentNode = $('#tt_tree_menu').tree('getParent', selectedTreeItem.target);
                    console.warn(jQuery.type(parentNode));
                    var node = selectedTreeItem;
                    $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
                    if(jQuery.type(parentNode) === "null") {
                       $('#tt_tree_menu').tree('append', {
                            data: [{
                                    attributes:{notroot: node.attributes.notroot, 
                                                group_name_eng: node.attributes.group_name_eng, 
                                                active: 1, 
                                                icon_class: node.attributes.icon_class},
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
                                                group_name_eng: node.attributes.group_name_eng, 
                                                active: 1, 
                                                icon_class: node.attributes.icon_class},
                                    id: node.id,
                                    text: node.text,
                                    checked: false,
                                    state : nodeState,
                                },]
                        });
                    }
                    
                } else {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Makina Kategori Pasif İşlemi Başarısız...',
                        message: 'Makina kategori pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                        buttons: [ {
                            icon: 'glyphicon glyphicon-ok-sign',
                            label: 'Kapat',
                            cssClass: 'btn-danger',
                            action: function(dialogItself){
                                dialogItself.close();
                            }
                        }]
                    });
                }           
            } else {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Makina Kategori Pasifleştirme İşlemi Başarısız...',
                    message: 'Makina kategori pasifleştirme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ban-circle',
                        label: 'Kapat',
                        cssClass: 'btn-danger',
                        action: function(dialogItself){
                            dialogItself.close();
                        }
                    }]
                });
                console.error('"pkDelete_leftnavigation" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkDelete_leftnavigation" servis hatası->'+textStatus);
        }
    });
   }
   
   /**
    * wrapper class for pop up and active machine category item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 30/03/2016
    */
   window.activeMachineCategoryDialog= function(nodeID){
        var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Makina Kategorı Ögesini Aktifleştirmek Üzeresiniz!',
            message: 'Makina kategorı öğesini aktifleştirmek üzeresiniz !! ',
            buttons: [ {
                icon: 'glyphicon glyphicon-ban-circle',
                label: 'Vazgeç',
                cssClass: 'btn-warning',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }, {
                icon: 'glyphicon glyphicon-ok-sign',
                label: 'Aktif Yap',
                cssClass: 'btn-success',
                action: function(dialogItself){
                    dialogItself.close();
                    activeMachineCategory(nodeID);
                }
            }]
        });
   }
   
   /**
    * set machine property item active
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 30/03/2016
    */
   window.activeMachineCategory = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkUpdateMakeActiveOrPassive_leftnavigation' ,
                id : nodeID,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                if(data.found) {
                    BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Makina Kategori Aktifleştirme İşlemi Başarılı...',
                    message: 'Makina kategori aktifleştirme işlemini gerçekleştirdiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ok-sign',
                        label: 'Kapat',
                        cssClass: 'btn-success',
                        action: function(dialogItself){
                            dialogItself.close();
                            loader.loadImager('removeLoadImage');
                        }
                    }]
                });
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
                                attributes:{notroot: node.attributes.notroot, 
                                            group_name_eng: node.attributes.group_name_eng, 
                                            active: 0, 
                                            icon_class: node.attributes.icon_class},
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
                                            group_name_eng: node.attributes.group_name_eng, 
                                            active: 0, 
                                            icon_class: node.attributes.icon_class},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                }
                
                
                } 
                else {
                   BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Makina Kategori Aktifleştirme İşlemi Başarısız...',
                        message: 'Makina kategori aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                        buttons: [ {
                            icon: 'glyphicon glyphicon-ok-sign',
                            label: 'Kapat',
                            cssClass: 'btn-danger',
                            action: function(dialogItself){
                                dialogItself.close();
                            }
                        }]
                    });
               }          
            } else {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Makina Kategori Aktifleştirme İşlemi Başarısız...',
                    message: 'Makina kategori aktifleştirme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ban-circle',
                        label: 'Kapat',
                        cssClass: 'btn-danger',
                        action: function(dialogItself){
                            dialogItself.close();
                        }
                    }]
                });
                console.error('"pkDelete_leftnavigation" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkDelete_leftnavigation" servis hatası->'+textStatus);
        }
    });
   }
   
   /**
    * reset button function setting disabled/ enabled
    * for 'insert' and 'update' form buttons
    * @returns null
    * @author Mustafa Zeynel Dağlı
    * @since 28/03/2016
    */
   window.regulateButtons = function () {
       $('#updateMachineCategory').attr('disabled', true);
       $('#insertMachineCategory').attr('disabled', false);
       /*var node = $('#tt_tree_menu').tree('getSelected');
       $('#tt_tree_menu').tree('unselect', node.target);*/
       //$('#tt_tree_menu').tree('unselect');
   }
   
   /**
    * insert menu item
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 30/03/2016
    */
   window.insertMachineCategoryWrapper = function (e, nodeID, nodeName) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#machineCategoryFormInsert").validationEngine('validate')) {
        insertMachineCategory(nodeID, nodeName);
        
    }
    return false;
   }
   
   /**
    * open pop up for inserting machine category
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 30/03/2016
    */
   window.insertMachineCategoryDialog = function (nodeID, nodeName) {
    var nodeID = nodeID;
    var nodeName = nodeName;
    BootstrapDialog.show({
        title: '"'+ nodeName + '" Makina kategorisi katmanına  item eklemektesiniz...',
        message: function (dialogRef) {
                    var dialogRef = dialogRef;
                    var $message = $(' <div class="row">\n\
                                            <div class="col-md-12">\n\
                                                <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                    <form id="machineCategoryFormInsert" method="get" class="form-horizontal">\n\
                                                    <div class="hr-line-dashed"></div>\n\
                                                        <div class="form-group" style="margin-top: 20px;">\n\
                                                            <label class="col-sm-2 control-label">Kategori</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="group_name_popup" id="group_name_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">İngilizce Kategori</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="group_name_eng_popup" id="group_name_eng_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Kategori İkon</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" value="fa-circle-o" class="form-control validate[required]" type="text" name="icon_class_popup" id="icon_class_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="hr-line-dashed"></div>\n\
                                                        <div class="form-group">\n\
                                                            <div class="col-sm-10 col-sm-offset-2">\n\
                                                            <button id="insertMachineCategoryPopUp" class="btn btn-primary" type="submit" onclick="return insertMachineCategoryWrapper(event, '+nodeID+', \''+nodeName+'\');">\n\
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
            $("#machineCategoryFormInsert").validationEngine();
        },
        onhide : function() {
            $('#machineCategoryForm')[0].reset();
            regulateButtons();
        },
    });
    
    return false;
   }
   
   /**
    * insert machne category
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.insertMachineCategory = function (nodeID, nodeName) {
        var loader = $("#loading-image-crud-popup").loadImager();
        loader.loadImager('appendImage');
        group_name = $('#group_name_popup').val();
        group_name_eng = $('#group_name_eng_popup').val();
        icon_class = $('#icon_class_popup').val();
        language_code = $('#langCode').val();
        //console.log(ddData);
        selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
        parent = nodeID;
       $.ajax({
           url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
           data: { url:'pkInsert_sysMachineToolGroups' ,
                   language_code : language_code,
                   icon_class : icon_class,
                   group_name_eng : group_name_eng,
                   group_name : group_name,
                   parent_id : parent,
                   pk : $("#pk").val()},  
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Makina Kategori Kayıt İşlemi Başarılı...',
                            message: 'Makina kategori kayıt işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#machineCategoryFormInsert')[0].reset();
                                    $('#machineCategoryForm')[0].reset();
                                    loader.loadImager('removeLoadImage');
                                    regulateButtons();
                                }
                            }]
                        });
                        $('#tt_tree_menu').tree('append', {
                            parent: selectedTreeItem.target,
                            data: [{
                                    attributes:{notroot: true, 
                                                group_eng: group_name_eng, 
                                                active: 0, 
                                                icon_class: icon_class},
                                    id: data.lastInsertId,
                                    text: group_name,
                                    checked: false,
                                    state : 'open',
                                },]
                        });
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Makina Kategori Kayıt İşlemi Başarısız...',
                            message: 'Makina kategori kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-danger',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#machineCategoryForm')[0].reset();
                                }
                            }]
                        });
                   }
               } else {
                   console.error('"pkInsert_sysMachineToolGroups" servis datası boştur!!');
               }
           },
           error: function (jqXHR, textStatus, errorThrown) {           
               console.error('"pkInsert_sysMachineToolGroups" servis hatası->'+textStatus);
           }
       });
   }
   
   /**
    * insert machine category
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 30/03/2016
    */
   window.insertMachineCategoryRootWrapper = function (e) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#machineCategoryForm").validationEngine('validate')) {
        insertMachineCategoryRoot();
    }
    return false;
   }
   
   /**
    * insert machine category to root
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.insertMachineCategoryRoot = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        group_name = $('#group_name').val();
        group_name_eng = $('#group_name_eng').val();
        icon_class = $('#icon_class').val();
        language_code = $('#langCode').val();
        //console.log(ddData);
        
       $.ajax({
           url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
           data: { url:'pkInsert_sysMachineToolGroups' ,
                   language_code : language_code,
                   icon_class : icon_class,
                   group_name_eng : group_name_eng,
                   group_name : group_name,
                   parent_id : 0,
                   pk : $("#pk").val()},  
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Makina Kategori Kayıt  İşlemi Başarılı...',
                            message: 'Makina kategori kayıt işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#machineCategoryForm')[0].reset();
                                    loader.loadImager('removeLoadImage');
                                }
                            }]
                        });
                        $('#tt_tree_menu').tree('append', {
                                //parent: selectedTreeItem.target,
                                data: [{
                                        attributes:{notroot: false, 
                                                    group_eng: group_name_eng, 
                                                    active: 0, 
                                                    icon_class: icon_class},
                                        id: data.lastInsertId,
                                        text: group_name,
                                        checked: false,
                                        state : 'open',
                                    },]
                        });
                        
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Makina Kategori Kayıt İşlemi Başarısız...',
                            message: 'Makina kategori kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-danger',
                                action: function(dialogItself){
                                    dialogItself.close();
                                }
                            }]
                        });
                   }
                
               } else {
                   console.error('"pkInsert_sysMachineToolGroups" servis datası boştur!!');
               }
           },
           error: function (jqXHR, textStatus, errorThrown) {           
               console.error('"pkInsert_sysMachineToolGroups" servis hatası->'+textStatus);
           }
       });
   }
   
   /**
    * update machine categori wrapper
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 30/03/2016
    */
   window.updateMachineCategoryWrapper = function (e) {
    e.preventDefault();
    if ($("#machineCategoryForm").validationEngine('validate')) {
        
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        if(selectedTreeItem == null) {
            BootstrapDialog.show({
                title: 'Makina Kategorisi Seçiniz',
                message: 'Lütfen makina kategorisi Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
            });
            return false;
        }
        updateMachineCategory();
    }
    return false;
   }
   
   /**
    * updates machine categories
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.updateMachineCategory = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        group_name = $('#group_name').val();
        group_name_eng = $('#group_name_eng').val();
        icon_class = $('#icon_class').val();
        language_code = $('#langCode').val();
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        //console.log(selectedTreeItem);
        id = selectedTreeItem.id;
        
       $.ajax({
           url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
           data: { url:'pkUpdate_sysMachineToolGroups' ,
                   language_code : language_code,
                   icon_class : icon_class,
                   group_name_eng : group_name_eng,
                   group_name : group_name,
                   id : id,
                   pk : $("#pk").val()}, 
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Makina Kategorisi Güncelleme İşlemi Başarılı...',
                            message: 'Makina kategorisi güncelleme işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#machineCategoryForm')[0].reset();
                                    loader.loadImager('removeLoadImage');
                                }
                            }]
                        });
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Makina Kategorisi Güncelleme İşlemi Başarısız...',
                            message: 'Makina kategorisi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-danger',
                                action: function(dialogItself){
                                    dialogItself.close();
                                }
                            }]
                        });
                   }
                $('#tt_tree_menu').tree('update', {
                     target: selectedTreeItem.target,
                     text: group_name
                });
               } else {
                   console.error('"pkUpdate_sysMachineToolGroups" servis datası boştur!!');
               }
           },
           error: function (jqXHR, textStatus, errorThrown) {           
               console.error('"pkUpdate_sysMachineToolGroups" servis hatası->'+textStatus);
           }
       });
   }
   
   
   
});













