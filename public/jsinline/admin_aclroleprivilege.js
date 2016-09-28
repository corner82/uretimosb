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
    
    
/**
 * loader image for resource and rol tree loading process
 * @type @call;$@call;loadImager
 * @author Mustafa Zeynel Dağlı
 * @since 15/07/2016
 */
var loader_resource = $("#loading-image-resource").loadImager();
loader_resource.loadImager('appendImage');

var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});
    
/*
* 
* ACL resource and rol tree
* Mustafa Zeynel Dağlı
* 15/07/2016
*/
$('#tt_tree_menu2').tree({  
   url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillResourceGroups_sysAclResources&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
   method: 'get',
   animate: true,
   checkbox: false,
   cascadeCheck: false,
   lines: true,
   onLoadSuccess: function (node, data) {
        loader_resource.loadImager('removeLoadImage');
   },
   onClick: function (node) {
        selectedRoot = $(this).tree('getRoot', node.target);
        selectedItem = $(this).tree('getData', node.target);
    },
   onSelect : function(node) {
       var self = $(this);
       var tagBuilderNot;
       var tagBuilder = $('#test-cabin').tagCabin({
                tagCopy         : false,
                tagDeletable    : true,
                tagDeletableAll : false, 
                tagBox          : $('.tag-container').find('ul'),
                dataMapper      : {attributes : Array('role_id', 'resource_id', 'privilege_id')}

        }); 
        tagBuilder.tagCabin({
            onTagRemoved : function(event, data) {
                var self = $(this);
                var elementData = data.element;
                //console.log(elementData);
                var id = data.id;
                //self.tagCabin()
                window.deleteRolePrivilege(id, elementData, tagBuilderNot);

            }
        });
        
        
        tagBuilderNot = $('#test-cabin-not').tagCabin({
                tagCopy         : true,
                tagDeletable    : false,
                tagDeletableAll : false, 
                tagBox          : $('.tag-container-not').find('ul'),
                dataMapper      : {attributes : Array('role_id', 'resource_id', 'privilege_id')}

        });
        tagBuilderNot.tagCabin({
            onTagCopied : function(event, data) {
                var self = $(this);
                window.assignRolePrivilege(data.id, data.element, tagBuilder);
            }
        });
        
        
        if(!self.tree('isLeaf', node.target)) {
            wm.warningMessage( {
                onShown : function (event ,data ) {
                   self.tree('uncheck', node.target); 
                }
            });
            wm.warningMessage('show','ACL Rol Seçiniz',
                                     'ACL resource (kaynak) seçtiniz, Lütfen rol seçiniz...');

        } else {
            window.clearRolePrivilege(node, tagBuilder);
            window.getRolePrivileges(node, self, tagBuilder);
            window.clearRolePrivilege(node, tagBuilderNot);
            window.getRolePrivilegesNotAssigned(node, self, tagBuilderNot);
        }
        
   },
});

/**
 * assign privilege to role
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 15/07/2016
 */
window.assignRolePrivilege = function (property_id, tag, tagBuilder) {
    var tag = tag;
    var tagBuilder = tagBuilder;
    var loader = $("#rolePrivilegeBlock").loadImager();
    loader.loadImager('appendImage');
    
    console.log(tag.attr('data-attribute'));
    console.log(tag.text());
    console.log(tag.attr('data-resource_id'));
    console.log(tag.attr('data-privilege_id'));
    console.log(tag.attr('data-role_id'));
    var role_id = tag.attr('data-role_id');
    var privilege_id = tag.attr('data-privilege_id');
    var resource_id = tag.attr('data-resource_id');

    var aj = $(window).ajaxCall({
         proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
         data : {
             url:'pkTransferRolesPrivilege_sysAclRrp' ,
             role_id : role_id,
             resource_id : resource_id,
             privilege_id : privilege_id,
             pk : $("#pk").val()
         }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Yetki Ekleme İşlemi Başarısız...', 
                                       'Yetki ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkTransferRolesPrivilege_sysAclRrp" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              var data = data;
              var id = data.lastInsertId;
             tagBuilder.tagCabin('addTagManuallyDataAttr', id, 
                                                            tag.text(),
                                                            {role_id : role_id,
                                                             resource_id : resource_id,
                                                             privilege_id : privilege_id });
            tag.remove();                                               
            loader.loadImager('removeLoadImage');
            
             sm.successMessage('show', 'Yetki Ekleme İşlemi Başarılı...', 
                                       'Yetki ekleme İşlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Yetki Ekleme İşlemi Başarısız...', 
                                       'Yetki Eekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkTransferRolesPrivilege_sysAclRrp" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Yetki Ekleme İşlemi Başarısız...', 
                                     'Yetki ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkTransferRolesPrivilege_sysAclRrp" servis hatası->'+textStatus);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     //$('#machPropFormInsertPopup')[0].reset();
                     loader.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Yetki Ekleme İşlemi Başarısız...', 
                                       'Yetki daha önce eklenmiştir, yeni bir yetki deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}

/**
 * delete privilege from a specific role
 * @param {type} id
 * @param {type} element
 * @param {type} machine_group_id
 * @returns {undefined}
 * @since 15/07/2016
 */
window.deleteRolePrivilege = function(id, tag, tagBuilder) {
    var tag = tag;
    var tagBuilder = tagBuilder;
    var id = id;
    var loader = $("#rolePrivilegeBlock").loadImager();
    loader.loadImager('appendImage');
    
    console.log(tag.attr('data-attribute'));
    console.log(tag.text());
    console.log(tag.attr('data-resource_id'));
    console.log(tag.attr('data-privilege_id'));
    console.log(tag.attr('data-role_id'));
    var role_id = tag.attr('data-role_id');
    var privilege_id = tag.attr('data-privilege_id');
    var resource_id = tag.attr('data-resource_id');

    var ajPopUpDelete = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkDelete_sysAclRrp' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    });
    ajPopUpDelete.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {  
                 dm.dangerMessage('resetOnShown');  
                 dm.dangerMessage('show', 'Rol Yetki Silme İşlemi Başarısız...',
                                           'Rol yetkisi silinememiştir, sistem yöneticisi ile temasa geçiniz...');
                 console.error('"pkDelete_sysAclRrp" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 tagBuilder.tagCabin('addTagManuallyDataAttr',  0, 
                                                        tag.text(),
                                                        {role_id : role_id,
                                                         resource_id : resource_id,
                                                         privilege_id : privilege_id });
                     tag.remove();                                               
                     loader.loadImager('removeLoadImage');
                 sm.successMessage('show', 'Rol Yetki Silme İşleminiz Başarılı...',
                                           'Rol yetki silme işleminiz başarılı...')
             },                                   
     });
     ajPopUpDelete.ajaxCall('call');
}
    
    
/**
 * clear role privileges from interface
 * @param {type} node
 * @param {type} tagBuilder
 * @returns {undefined}
 * @since 15/07/2016
 */
window.clearRolePrivilege = function(node, tagBuilder) {
    var nodeID = node.id;
    /*$('#mach-prop-box').loadImager();
    $('#mach-prop-box').loadImager('appendImage');*/
    tagBuilder.tagCabin({
        onSpecificTagsRemoved : function(event) {
            //$('#mach-prop-box').loadImager('removeLoadImage');   
        }
    });
    tagBuilder.tagCabin('removeAllTags');
}

/**
 * clear role privileges not assigned from interface
 * @param {type} node
 * @param {type} tagBuilder
 * @returns {undefined}
 * @since 28/07/2016
 */
window.clearRolePrivilegeNotAssigned = function(node, tagBuilderNot) {
    var nodeID = node.id;
    tagBuilderNot.tagCabin({
        onSpecificTagsRemoved : function(event) {  
        }
    });
    tagBuilderNot.tagCabin('removeAllTags');
}
    
/**
 * set ACL role privileges tags
 * @param {type} node
 * @param {type} treeObj
 * @param {type} tagBuilder
 * @returns {undefined}
 * @since 15/07/2016
 */
window.getRolePrivileges = function(node, treeObj, tagBuilder) {

    var nodeID = node.id;
    $('#mach-prop-box').loadImager();
    $('#mach-prop-box').loadImager('appendImage');
    
    var resourceNode = $('#tt_tree_menu2').tree('getParent', node.target);
    var resource_id = resourceNode.id;
    //console.log(resourceNode);

    if(tagBuilder.tagCabin('findSpecificTags', nodeID, 'data-role_id')) {
        var ajaxMacProp = $('#test-cabin').ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data : {
                        url:'pkFillPrivilegesOfRoles_sysAclPrivilege' ,
                        language_code : $('#langCode').val(),
                        role_id : nodeID,
                        resource_id : resource_id,
                        pk : $("#pk").val()
                    }
           })
        ajaxMacProp.ajaxCallWidget ({
             onError : function (event, textStatus,errorThrown) {
                 dm.dangerMessage({
                    onShown : function() {
                        $('#mach-prop-box').loadImager('removeLoadImage'); 
                        //treeObj.tree('uncheck', node.target);
                    }
                 });
                 dm.dangerMessage('show', 'Rol Yetkileri Yüklenememiştir...',
                                          'Rol Yetkileri yüklenememiştir, sistem yöneticiniz ile temasa geçiniz...');
             },
             onSuccess : function (event, data) {
                 tagBuilder.tagCabin(
                    {tagsFound :function(event, item) { 
                    }  
                 });
                 tagBuilder.tagCabin(
                    {onTagRemovedUltimately :function(event, data) {
                        var element = data.element;
                        var id = data.id;
                        var role_id = element.attr('data-role_id');

                        window.deleteRolePrivilegeUltimatelyDialog(id, element, role_id);
                        return false;
                    }
                 });
                 //console.log(data);
                 tagBuilder.tagCabin('addTags', data);
                 $('#mach-prop-box').loadImager('removeLoadImage');

             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage({
                    onShown : function() {
                        $('#mach-prop-box').loadImager('removeLoadImage'); 
                        //treeObj.tree('uncheck', node.target);
                    }
                 });
                 dm.dangerMessage('show', 'Role Bağlı Yetki Bulunamamıştır...',
                                          'Seçtiğiniz role bağlı yetki kaydı bulunamamıştır...');
                 $('#mach-prop-box').loadImager('removeLoadImage');
             },
       }) 
       ajaxMacProp.ajaxCallWidget('call');
    } else {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Yetkiler Seçilmiştir!!!'
                                , 'Seçili rol yetkileri yüklenmiş durumdadır...');
        $('#mach-prop-box').loadImager('removeLoadImage');
    }
}
 
 
/**
 * set ACL resource privileges tags not assigned to role
 * @param {type} node
 * @param {type} treeObj
 * @param {type} tagBuilder
 * @returns {undefined}
 * @since 15/07/2016
 */
window.getRolePrivilegesNotAssigned = function(node, treeObj, tagBuilder) {

    var nodeID = node.id;
    $('#mach-prop-box-not').loadImager();
    $('#mach-prop-box-not').loadImager('appendImage');
    
    var resourceNode = $('#tt_tree_menu2').tree('getParent', node.target);
    var resource_id = resourceNode.id;

    if(tagBuilder.tagCabin('findSpecificTags', nodeID, 'data-role_id')) {
        var ajaxMacPropNot = $('#test-cabin-not').ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data : {
                        url:'pkFillNotInPrivilegesOfRoles_sysAclPrivilege' ,
                        language_code : $('#langCode').val(),
                        role_id : nodeID,
                        resource_id : resource_id,
                        pk : $("#pk").val()
                    }
           })
        ajaxMacPropNot.ajaxCallWidget ({
             onError : function (event, textStatus,errorThrown) {
                 dm.dangerMessage({
                    onShown : function() {
                        $('#mach-prop-box-not').loadImager('removeLoadImage'); 
                        //treeObj.tree('uncheck', node.target);
                    }
                 });
                 dm.dangerMessage('show', 'Resource Yetkileri Yüklenememiştir...',
                                          'Resource Yetkileri yüklenememiştir, sistem yöneticiniz ile temasa geçiniz...');
             },
             onSuccess : function (event, data) {
                 $('#mach-prop-box-not').loadImager('removeLoadImage');
                 tagBuilder.tagCabin(
                    {tagsFound :function(event, item) { 
                     //console.log($(item).attr('data-attribute'));
                     //console.log($(item).attr('data-tree-item'));
                    }  
                 });
                 
                 //console.log(data);
                 tagBuilder.tagCabin('addTags', data);
                 

             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage({
                    onShown : function() {
                        $('#mach-prop-box-not').loadImager('removeLoadImage'); 
                        //treeObj.tree('uncheck', node.target);
                    }
                 });
                 dm.dangerMessage('show', 'Resource (Kaynak) Bağlı Yetki Bulunamamıştır...',
                                          'Seçtiğiniz rol için atanmamış yetki kaydı bulunamamıştır...');
                $('#mach-prop-box-not').loadImager('removeLoadImage');

             },
       }) 
       ajaxMacPropNot.ajaxCallWidget('call');
    } else {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Yetkiler Seçilmiştir!!!'
                                , 'Seçili resource (kaynak) yetkileri yüklenmiş durumdadır...');
        $('#mach-prop-box-not').loadImager('removeLoadImage');
    }
}

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();
 
/**
 * wrapper class for pop up and delete privilege from 
 * specific role
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 15/07/2016
 */
window.deleteRolePrivilegeDialog= function(id, tag, tagBuilder){
    var nodeID = nodeID;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteRolePrivilege(id, tag, tagBuilder);
    }
    });
    wcm.warningComplexMessage('show', 'Rol Yetkisi Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Rol yetkisini  silmek üzeresiniz, yetki silme işlemi geri alınamaz!! ');
}
   

   
  
/**
 * wrapper for machine property insert process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 19/04/2016
 */
window.insertMachPropDialog = function (nodeID, nodeName) {
 var nodeID = nodeID;
 var nodeName = nodeName;
 BootstrapDialog.show({  
     title: '"'+ nodeName + '" makina katmanına yeni özellik eklemektesiniz...',
     message: function (dialogRef) {
                 var dialogRef = dialogRef;
                 var $message = $(' <div class="row">\n\
                                         <div class="col-md-12">\n\
                                             <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                 <form id="machPropFormInsertPopup" method="get" class="form-horizontal">\n\
                                                 <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group" style="padding-top: 10px;" >\n\
                                                         <label class="col-sm-2 control-label">Birim Sistemi</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <ul id="tt_tree_menu_popup" class="easyui-tree" ></ul>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Mevcut Kategori Özellikleri</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div style="margin-bottom: -10px;" class="tag-container-popup">\n\
                                                                     <ul id="test-cabin-popup" class="tag-box"></ul>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Kategoride Olmayan Özellikler</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div style="margin-bottom: -10px;" class="tag-container-popup-not">\n\
                                                                     <ul id="test-cabin-popup-not" class="tag-box"></ul>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Makina Özelliği</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="property_name_popup" id="property_name_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">İngilizce Makina Özelliği</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="property_name_eng_popup" id="property_name_eng_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group">\n\
                                                         <div class="col-sm-10 col-sm-offset-2">\n\
                                                         <button id="insertUnitPopUp" class="btn btn-primary" type="submit" onclick="return insertMachPropWrapper(event, '+nodeID+', \''+nodeName+'\');">\n\
                                                             <i class="fa fa-save"></i> Kaydet </button>\n\
                                                         <button id="resetForm" onclick="regulateButtonsPopupInsert();" class="btn btn-flat" type="reset" " >\n\
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
        $("#machPropFormInsertPopup").validationEngine();

        var ajPopUpMachProp = $('#test-cabin-popup').ajaxCallWidget({
                         proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                         data : {
                             url:'pkFillMachineGroupPropertyDefinitions_sysMachineToolPropertyDefinition' ,
                             language_code : $('#langCode').val(),
                             role_id : nodeID,
                             pk : $("#pk").val()
                         }
        })
        ajPopUpMachProp.ajaxCallWidget ({
              onError : function (event, textStatus, errorThrown) {
                  dm.dangerMessage({
                      onShown : function () {
                         var loader = $("#loading-image-crud-popup").loadImager();
                         loader.loadImager('appendImage');
                      }
                  });
                  dm.dangerMessage('show', 'Kategoriye Ait Makina Özellikleri Yüklenememiştir...',
                                           'Kategoriye ait makina özellikleri yüklenememiştir,msistem yöneticisi ile temasa geçiniz...');
              },
              onSuccess : function (event, data) {  
                 //alert('on success');
                 window.tagBuilderPopup = $('#test-cabin-popup').tagCabin({
                        tagCopy      : false,
                        tagDeletable : true,  
                        tagBox       : $('.tag-container-popup').find('ul'),
                        dataMapper   : {attributes : Array('role_id')} 
                });
                tagBuilderPopup.tagCabin({ 
                    onTagRemoved : function(event, data) {
                        var elementData = data.element;
                        var id = data.id;
                        window.deleteRolePrivilegeDialog(id, nodeID, elementData);

                    }
                 });
                tagBuilderPopup.tagCabin('addTags', data);
              },
        }) 
        ajPopUpMachProp.ajaxCallWidget('call');


        var ajPopUpMachPropNot = $("#loading-image-crud-popup").ajaxCallWidget({
                         proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                         data : {
                             url:'pkFillMachineGroupNotInPropertyDefinitions_sysMachineToolPropertyDefinition' ,
                             language_code : $('#langCode').val(),
                             role_id : nodeID,
                             pk : $("#pk").val()
                         }
        })
        ajPopUpMachPropNot.ajaxCallWidget ({
              onError : function (event, textStatus, errorThrown) {
                  dm.dangerMessage({
                      onShown : function () {
                         var loader = $("#loading-image-crud-popup").loadImager();
                         loader.loadImager('appendImage');
                      }
                  });
                  dm.dangerMessage('show', 'Kategoriye Ait Makina Özellikleri Yüklenememiştir...',
                                           'Kategoriye ait makina özellikleri yüklenememiştir,msistem yöneticisi ile temasa geçiniz...');
              },
              onSuccess : function (event, data) {  
                 //alert('on success');
                 window.tagBuilderPopupNot = $('#test-cabin-popup-not').tagCabin({
                        tagCopy      : true,
                        tagDeletable : false,  
                        tagBox       : $('.tag-container-popup-not').find('ul'),
                        dataMapper   : {attributes : Array('role_id')} 
                });
                tagBuilderPopupNot.tagCabin({ 
                    onTagCopied : function(event, data) {
                        var elementData = data.element;
                        var id = data.id;
                        console.warn(elementData.text());
                        var tagText = elementData.text();
                        window.addRolePrivilege(id, nodeID, elementData);
                        //window.deleteRolePrivilegeDialog(id, elementData);

                    }
                 });
                tagBuilderPopupNot.tagCabin('addTags', data);
              },
        }) 
        ajPopUpMachPropNot.ajaxCallWidget('call');

        $('#tt_tree_menu_popup').tree({
             url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillUnitsTree_sysUnits&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
             method: 'get',
             animate: true,
             checkbox: false,
             cascadeCheck: false,
             lines: true,
             onLoadSuccess: function (node, data) {
                  loader.loadImager('removeLoadImage');
              },
             onSelect: function(node) {
                 var self = $(this);
                 if(self.tree('isLeaf', node.target)) {
                     wm.warningMessage( {
                         onShown : function (event ,data ) {
                            var parent = self.tree('getParent', node.target);
                            self.tree('select', parent.target);
                         }
                     });
                     wm.warningMessage('show','Ana Kategori Seçiniz',
                                              'Lütfen ana kategori seçiniz...');

                 } 
             },
             formatter: function (node) {
                 if(node.attributes.system != null) {
                     var s = node.text+' ('+node.attributes.system+')';
                 } else {
                     var s = node.text;
                 }
                 return s;
              }
          });
     },
     onhide : function() {
     },
 });
 return false;
}
   
   
/**
 * add privilege to role
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 15/07/2016
 */
window.addRolePrivilege = function (property_id, role_id, tag) {
    var property_id = property_id;
    var role_id = role_id;
    var tagText = tagText;
    var loader = $("#lrolePrivilegeBlock").loadImager();
    loader.loadImager('appendImage');

    var aj = $(window).ajaxCall({
         proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
         data : {
             url:'pkTransferPropertyMachineGroup_sysMachineToolPropertyDefinition' ,
             property_id : property_id,
             role_id : role_id,
             pk : $("#pk").val()
         }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Role Yetki Ekleme İşlemi Başarısız...', 
                                       'Role yetki ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkTransferPropertyMachineGroup_sysMachineToolPropertyDefinition" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     window.tagBuilderPopup.tagCabin('addTagManually', property_id, 
                                                                     tag.text(),
                                                                     {role_id : role_id});
                     window.tagBuilderPopupNot.tagCabin('removeTag', tag);                                                
                     loader.loadImager('removeLoadImage');

                 }
             });
             sm.successMessage('show', 'Role Yetki Ekleme İşlemi Başarılı...', 
                                       'Role yetki ekleme İşlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Role Yetki Ekleme İşlemi Başarısız...', 
                                       'Role Yetki ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkTransferPropertyMachineGroup_sysMachineToolPropertyDefinition" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Role Yetki Ekleme İşlemi Başarısız...', 
                                     'Role yetki ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkTransferPropertyMachineGroup_sysMachineToolPropertyDefinition" servis hatası->'+textStatus);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     //$('#machPropFormInsertPopup')[0].reset();
                     loader.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Role Yetki Ekleme İşlemi Başarısız...', 
                                       'Yetki daha önce eklenmiştir, yeni bir yetki deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   
   

    
});
