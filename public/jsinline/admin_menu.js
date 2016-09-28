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
* Menu tree
* Mustafa Zeynel Dağlı
* 29/03/2016
*/

$('#tt_tree_menu').tree({
//url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val()+'&menu_types_id='+menu_types_id,
method: 'get',
animate: true,
checkbox: true,
cascadeCheck: false,
lines: true,
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
     if(data.length>0) {
        loader.loadImager('removeLoadImage'); 
     }
 },
 onClick: function (node) {
     selectedNode = node;
     selectedRoot = $(this).tree('getRoot', node.target);
     selectedItem = $(this).tree('getData', node.target);
     //console.log(selectedItem);
     $('#menu_name').val(selectedItem.text);
     $('#menu_name_eng').val(selectedItem.attributes.text_eng);
     $('#url').val(selectedItem.attributes.url);
     $('#icon_class').val(selectedItem.attributes.icon_class);
     $('#updateMenu').attr('disabled', false);
     $('#insertMenu').attr('disabled', true);

 },
 formatter: function (node) {
     var s = node.text;
     var id = node.id;
     if (node.attributes.active == 0) {
         s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="menü sil" onclick="deleteMenuDialog('+id+')"></i>&nbsp;\n\
              <i class="fa fa-fw fa-ban" title="pasif yap" onclick="passiveMenuDialog('+id+');"></i>&nbsp;&nbsp;\n\
             <i class="fa fa-level-down" title="alt kırılıma menü ekle" onclick="insertMenuDialog('+id+', \''+node.text+'\')"></i>';
         return s;

     } else if (node.attributes.active == 1) {
         s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="menü sil" onclick="deleteMenuDialog('+id+')"></i>&nbsp;\n\
         <i class="fa fa-fw fa-check-square-o" title="aktif yap" onclick="activeMenuDialog('+id+');"></i>';
         s = "<font color = '#B6B6B4'>" + s + "</font>"
         //buda koşullu kullanım için örnek satır    
         /*if (node.children) {
             s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
         }*/
         return s;
     }
 }
});
    
    
    
    /**
     * menu types  select box filling
     * @author Mustafa Zeynel Dağlı
     * @since 19/07/2016
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkFillMenuTypeList_sysMenuTypes' ,
                language_code : 'tr',
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                $('#dropdownMenuTypes').ddslick({
                    height : 200,
                    data : data, 
                    //data : [{"text":"Admin Yönetim","value":1,"selected":false,"description":"Admin Yönetim"},{"text":"Firma Yönetim","value":2,"selected":false,"description":"Firma Yönetim"},{"text":"Firma Profil","value":3,"selected":false,"description":"Firma Profil"}],
                    width:'98%',
                    search : true,
                    //selectText: "Select your preferred social network",
                    imagePosition:"right",
                    onItemClicked : function(target) {
                        //console.log(target.value);
                        loader.loadImager('removeLoadImage');
                        $("#loading-image").loadImager();
                        $("#loading-image").loadImager('appendImage');
                        if(target.value>0){
                            var ddDataMenuTypes = $('#dropdownRoles').data('ddslick');
                            menu_types_id = ddDataMenuTypes.selectedData.value;
                            if(ddDataMenuTypes.selectedData.value>0) {
                               
                                $('#tt_tree_menu').tree({ 
                                    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+target.value+'&language_code='+$("#langCode").val()+'&menu_types_id='+menu_types_id,
                                });
                            } else {
                                BootstrapDialog.show({
                                    title: 'Lütfen Rol Seçiniz',
                                    message: 'Lütfen rol seçiniz!',
                                    type: BootstrapDialog.TYPE_WARNING,
                                });
                            }
                        } else {
                            BootstrapDialog.show({
                                title: 'Lütfen Menü Tipi Seçiniz',
                                message: 'Lütfen menü tipi seçiniz!',
                                type: BootstrapDialog.TYPE_WARNING,
                            });
                        }
                        
                    },   
                });
            } else {
                console.error('"pkFillMenuTypeList_sysMenuTypes" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkFillMenuTypeList_sysMenuTypes" servis hatası->'+textStatus);
        }
    });

    var selectedNode;

    /**
     * user roles  select box filling
     * @author Mustafa Zeynel Dağlı
     * @since 28/03/2016
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkFillComboBoxRoles_sysAclRoles' ,
                language_code : 'tr',
                main_group : 2,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                $('#dropdownRoles').ddslick({
                    height : 200,
                    data : data, 
                    width:'98%',
                    search : true,
                    //selectText: "Select your preferred social network",
                    imagePosition:"right",
                    onItemClicked : function(target) {
                        //console.log(target.value);
                        loader.loadImager('removeLoadImage');
                        $("#loading-image").loadImager();
                        $("#loading-image").loadImager('appendImage');
                        if(target.value>0){
                            var ddDataMenuTypes = $('#dropdownMenuTypes').data('ddslick');
                            menu_types_id = ddDataMenuTypes.selectedData.value;
                            if(ddDataMenuTypes.selectedData.value>0) {
                                $('#tt_tree_menu').tree({ 
                                    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+target.value+'&language_code='+$("#langCode").val()+'&menu_types_id='+menu_types_id,
                                });
                            } else {
                                BootstrapDialog.show({
                                    title: 'Lütfen Menü Tipi Seçiniz',
                                    message: 'Lütfen menü tipi seçiniz!',
                                    type: BootstrapDialog.TYPE_WARNING,
                                });
                            }
                        } else {
                            BootstrapDialog.show({
                                title: 'Lütfen Rol Seçiniz',
                                message: 'Lütfen rol seçiniz!',
                                type: BootstrapDialog.TYPE_WARNING,
                            });
                        }
                        
                    },
                    onSelected: function(selectedData){
                    }   
                });
            } else {
                console.error('"pkFillComboBoxRoles_sysAclRoles" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkFillComboBoxRoles_sysAclRoles" servis hatası->'+textStatus);
        }
    });

    // Left menuyu oluşturmak için çağırılan fonksiyon...
    //$.fn.leftMenuFunction();

    //Validation forms binded...
    jQuery("#menuForm").validationEngine();
    


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
    loader.loadImager('appendImage');

    //$('#menuForm').submit(newRoleSubmission);
    
   /**
    * wrapper class for pop up and active menu item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 28/03/2016
    */
   window.deleteMenuDialog= function(nodeID){
       var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Menü Silme İşlemi Gerçekleştirmek Üzeresiniz!',
            message: 'Menü Öğesini silmek üzeresiniz, menü silme işlemi geri alınamaz!! ',
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
                    deleteMenu(nodeID);
                }
            }]
        });
   }
   
   /**
    * set menu item delete
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 28/03/2016
    */
   window.deleteMenu = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkDelete_leftnavigation' ,
                id : nodeID,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                if(data.found) {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Menü Silme İşlemi Başarılı...',
                        message: 'Menü Silme işlemini gerçekleştirdiniz... ',
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
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Menü Silme İşlemi Başarısız...',
                        message: 'Menü Silme işlemini gerçekleştiremediniz,Sistem Yneticisi ile temasa geçiniz... ',
                        buttons: [ {
                            icon: 'glyphicon glyphicon-ban-circle',
                            label: 'Kapat',
                            cssClass: 'btn-danger',
                            action: function(dialogItself){
                                dialogItself.close();
                            }
                        }]
                    });
                    console.error('"pkDelete_leftnavigation" unknown error!!');
                }
                
                            
            } else {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Menü Silme İşlemi Başarısız...',
                    message: 'Menü Silme işlemini gerçekleştiremediniz,Sistem Yneticisi ile temasa geçiniz... ',
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
    * wrapper class for pop up and passive menu item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 28/03/2016
    */
   window.passiveMenuDialog= function(nodeID){
        var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Menü Ögesini Pasifleştirmek Üzeresiniz!',
            message: 'Menü öğesini pasifleştirmek üzeresiniz !! ',
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
                    passiveMenu(nodeID);
                }
            }]
        });
   }
   
   /**
    * set menu item passive
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 28/03/2016
    */
   window.passiveMenu = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       var ddData = $('#dropdownRoles').data('ddslick');
       role_id = ddData.selectedData.value;
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       var ddDataMenuTypes = $('#dropdownMenuTypes').data('ddslick');
       menu_types_id = ddDataMenuTypes.selectedData.value;
       
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
                        title: 'Menü Pasif İşlemi Başarılı...',
                        message: 'Menü Pasifleştirme işlemini gerçekleştirdiniz... ',
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
                                                text_eng: node.attributes.text_eng, 
                                                active: 1, 
                                                url: node.attributes.url, 
                                                menu_types_id : menu_types_id,
                                                role_id : role_id,
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
                            
                    
                } else {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Menü Pasifleştirme İşlemi Başarısız...',
                        message: 'Menü pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
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
                    title: 'Menü Pasifleştirme İşlemi Başarısız...',
                    message: 'Menü pasifleştirme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ',
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
    * wrapper class for pop up and active menu item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 28/03/2016
    */
   window.activeMenuDialog= function(nodeID){
        var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Menü Ögesini Aktifleştirmek Üzeresiniz!',
            message: 'Menü öğesini aktifleştirmek üzeresiniz !! ',
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
                    activeMenu(nodeID);
                }
            }]
        });
   }
   
   /**
    * set menu item active
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 28/03/2016
    */
   window.activeMenu = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       
       var ddData = $('#dropdownRoles').data('ddslick');
       role_id = ddData.selectedData.value;
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       var ddDataMenuTypes = $('#dropdownMenuTypes').data('ddslick');
       menu_types_id = ddDataMenuTypes.selectedData.value;
       
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
                    title: 'Menü Aktifleştirme İşlemi Başarılı...',
                    message: 'Menü aktifleştirme işlemini gerçekleştirdiniz... ',
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
                                            text_eng: node.attributes.text_eng, 
                                            active: 0, 
                                            url: node.attributes.url, 
                                            menu_types_id : menu_types_id,
                                            role_id : role_id,
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
                
                
                } 
                else {
                   BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Menü Aktifleştirme İşlemi Başarısız...',
                        message: 'Menü aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
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
                    title: 'Menü Aktifleştirme İşlemi Başarısız...',
                    message: 'Menü aktifleştirme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ',
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
       $('#updateMenu').attr('disabled', true);
       $('#insertMenu').attr('disabled', false);
       /*var node = $('#tt_tree_menu').tree('getSelected');
       $('#tt_tree_menu').tree('unselect', node.target);*/
       //$('#tt_tree_menu').tree('unselect');
   }
   
   /**
    * insert menu item
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 28/03/2016
    */
   window.insertMenuWrapper = function (e, nodeID, nodeName) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#menuFormInsert").validationEngine('validate')) {
        var ddData = $('#dropdownRoles').data('ddslick');
        if(ddData.selectedData.value>0) {
            insertMenu(nodeID, nodeName);
        } else {
            BootstrapDialog.show({
                title: 'Rol Seçiniz',
                message: 'Lütfen Kullanıcı Rolü Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
        //        closable: false
            });
        }
    }
    return false;
   }
   
   window.insertMenuDialog = function (nodeID, nodeName) {
    var nodeID = nodeID;
    var nodeName = nodeName;
    BootstrapDialog.show({
        title: '"'+ nodeName + '" Menü katmanına menü item eklemektesiniz...',
        message: function (dialogRef) {
                    var dialogRef = dialogRef;
                    var $message = $(' <div class="row">\n\
                                            <div class="col-md-12">\n\
                                                <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                    <form id="menuFormInsert" method="get" class="form-horizontal">\n\
                                                    <div class="hr-line-dashed"></div>\n\
                                                        <div class="form-group" style="margin-top: 20px;">\n\
                                                            <label class="col-sm-2 control-label">Menü</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="menu_name_popup" id="menu_name_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">İngilizce Menü</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="menu_name_eng_popup" id="menu_name_eng_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Url</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="url_popup" id="url_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Menü İkon</label>\n\
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
                                                            <button id="insertMenuPopUp" class="btn btn-primary" type="submit" onclick="return insertMenuWrapper(event, '+nodeID+', \''+nodeName+'\');">\n\
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
            $("#menuFormInsert").validationEngine();
        },
        onhide : function() {
            $('#menuForm')[0].reset();
            regulateButtons();
        },
    });
    
    return false;
   }
   
   
   window.insertMenu = function (nodeID, nodeName) {  
        var loader = $("#loading-image-crud-popup").loadImager();
        loader.loadImager('appendImage');
        menu_name = $('#menu_name_popup').val();
        menu_name_eng = $('#menu_name_eng_popup').val();
        icon_class = $('#icon_class_popup').val();
        url = $('#url_popup').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownRoles').data('ddslick');
        role_id = ddData.selectedData.value;
        selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
        var ddDataMenuTypes = $('#dropdownMenuTypes').data('ddslick');
        menu_types_id = ddDataMenuTypes.selectedData.value;
        //console.log(ddData);
        parent = nodeID;
       $.ajax({
           url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
           data: { url:'pkInsert_leftnavigation' ,
                   language_code : language_code,
                   icon_class : icon_class,
                   menu_name_eng : menu_name_eng,
                   menu_name : menu_name,
                   urlx : url,
                   parent : parent,
                   role_id : role_id,
                   menu_types_id : menu_types_id,
                   pk : $("#pk").val()},  
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Menü Kayıt İşlemi Başarılı...',
                            message: 'Menü kayıt işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#menuFormInsert')[0].reset();
                                    $('#menuForm')[0].reset();
                                    loader.loadImager('removeLoadImage');
                                    regulateButtons();
                                }
                            }]
                        });
                        $('#tt_tree_menu').tree('append', {
                            parent: selectedTreeItem.target,
                            data: [{
                                    attributes:{notroot: true, 
                                                text_eng: menu_name_eng, 
                                                active: 0, 
                                                url: url, 
                                                menu_types_id : menu_types_id,
                                                role_id : role_id,
                                                icon_class: icon_class},
                                    id: data.lastInsertId,
                                    text: menu_name,
                                    checked: false,
                                    state : 'open',
                                },]
                        });
                        
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Menü Kayıt İşlemi Başarısız...',
                            message: 'Menü kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-danger',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#menuForm')[0].reset();
                                }
                            }]
                        });
                   }
               } else {
                   console.error('"pkInsert_leftnavigation" servis datası boştur!!');
               }
           },
           error: function (jqXHR, textStatus, errorThrown) {           
               console.error('"pkInsert_leftnavigation" servis hatası->'+textStatus);
           }
       });
   }
   
   /**
    * insert menu item
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 28/03/2016
    */
   window.insertMenuRootWrapper = function (e) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#menuForm").validationEngine('validate')) {
        var ddData = $('#dropdownRoles').data('ddslick');
        var ddDataMenuTypes = $('#dropdownMenuTypes').data('ddslick');
        if(ddData.selectedData.value>0 && ddDataMenuTypes.selectedData.value>0) {
            insertMenuRoot();
        } else {
            if(!ddData.selectedData.value>0) {
                BootstrapDialog.show({
                    title: 'Rol Seçiniz',
                    message: 'Lütfen Kullanıcı Rolü Seçiniz!',
                    type: BootstrapDialog.TYPE_WARNING,
                });
            } else if(!ddDataMenuTypes.selectedData.value>0) {
                BootstrapDialog.show({
                    title: 'Menü Tipi Seçiniz',
                    message: 'Lütfen Menü Tipi Seçiniz!',
                    type: BootstrapDialog.TYPE_WARNING,
                });
            }
            
        }
    }
    return false;
   }
   
   window.insertMenuRoot = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        menu_name = $('#menu_name').val();
        menu_name_eng = $('#menu_name_eng').val();
        icon_class = $('#icon_class').val();
        url = $('#url').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownRoles').data('ddslick');
        role_id = ddData.selectedData.value;
        var ddDataMenuTypes = $('#dropdownMenuTypes').data('ddslick');
        menu_types_id = ddDataMenuTypes.selectedData.value;
        //console.log(ddData);
        
       $.ajax({
           url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
           data: { url:'pkInsert_leftnavigation' ,
                   language_code : language_code,
                   icon_class : icon_class,
                   menu_name_eng : menu_name_eng,
                   menu_name : menu_name,
                   menu_types_id : menu_types_id,
                   urlx : url,
                   parent : 0,
                   role_id : role_id,
                   pk : $("#pk").val()},  
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Menü Kayıt İşlemi Başarılı...',
                            message: 'Menü kayıt işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#menuForm')[0].reset();
                                    loader.loadImager('removeLoadImage');
                                }
                            }]
                        });
                        $('#tt_tree_menu').tree('append', {
                            //parent: selectedTreeItem.target,
                            data: [{
                                    attributes:{notroot: false, 
                                                text_eng: menu_name_eng, 
                                                active: 0, 
                                                url: url, 
                                                menu_types_id : menu_types_id,
                                                icon_class: icon_class},
                                    id: data.lastInsertId,
                                    text: menu_name,
                                    checked: false,
                                    state : 'open',
                                },]
                        });
                        
                        
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Menü Kayıt İşlemi Başarısız...',
                            message: 'Menü kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
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
                   console.error('"pkInsert_leftnavigation" servis datası boştur!!');
               }
           },
           error: function (jqXHR, textStatus, errorThrown) {           
               console.error('"pkInsert_leftnavigation" servis hatası->'+textStatus);
           }
       });
   }
   
   /**
    * update menu item
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 28/03/2016
    */
   window.updateMenuWrapper = function (e) {
    e.preventDefault();
    if ($("#menuForm").validationEngine('validate')) {

        var ddData = $('#dropdownRoles').data('ddslick');
        var ddDataMenuTypes = $('#dropdownMenuTypes').data('ddslick');
        
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        if(selectedTreeItem == null) {
            BootstrapDialog.show({
                title: 'Menü Öğesi Seçiniz',
                message: 'Lütfen Menü Öğesi Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
            });
            return false;
        }
        
        if(ddData.selectedData.value>0 && ddDataMenuTypes.selectedData.value>0) {
            //alert(ddData.selectedData.text);
            updateMenu();
        } else {
            if(!ddData.selectedData.value>0) {
                BootstrapDialog.show({
                    title: 'Rol Seçiniz',
                    message: 'Lütfen Kullanıcı Rolü Seçiniz!',
                    type: BootstrapDialog.TYPE_WARNING,
                });
            } else if(!ddDataMenuTypes.selectedData.value>0) {
                BootstrapDialog.show({
                    title: 'Menü Tipi Seçiniz',
                    message: 'Lütfen Menü Tipi Seçiniz!',
                    type: BootstrapDialog.TYPE_WARNING,
                });
            }
        }
    }
    return false;
   }
   
   window.updateMenu = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        menu_name = $('#menu_name').val();
        menu_name_eng = $('#menu_name_eng').val();
        icon_class = $('#icon_class').val();
        url = $('#url').val();
        language_code = $('#langCode').val();
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        console.log(selectedTreeItem);
        var ddData = $('#dropdownRoles').data('ddslick');
        role_id = ddData.selectedData.value;
        var ddDataMenuTypes = $('#dropdownMenuTypes').data('ddslick');
        menu_types_id = ddDataMenuTypes.selectedData.value;
        console.log(ddData);
        id = selectedTreeItem.id;
        
       $.ajax({
           url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
           data: { url:'pkUpdate_leftnavigation' ,
                   language_code : language_code,
                   icon_class : icon_class,
                   menu_name_eng : menu_name_eng,
                   menu_name : menu_name,
                   menu_types_id : menu_types_id,
                   urlx : url,
                   id : id,
                   role_id : role_id,
                   pk : $("#pk").val()}, 
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            closable : false,
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Menü Güncelleme İşlemi Başarılı...',
                            message: 'Menü güncelleme işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#menuForm')[0].reset();
                                    loader.loadImager('removeLoadImage');
                                    
                                }
                            }]
                        });
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Menü Güncelleme İşlemi Başarısız...',
                            message: 'Menü güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
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
                     text: menu_name
                });
               } else {
                   console.error('"pkUpdate_leftnavigation" servis datası boştur!!');
               }
           },
           error: function (jqXHR, textStatus, errorThrown) {           
               console.error('"pkUpdate_leftnavigation" servis hatası->'+textStatus);
           }
       });
   }
   
   
   
});
