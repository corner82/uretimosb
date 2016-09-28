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
 * loader image for  rol tree loading process
 * @type @call;$@call;loadImager
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
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
* rol tree
* Mustafa Zeynel Dağlı
* 01/08/2016
*/
$('#tt_tree_menu2').tree({  
   url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillConsultantRolesTree_sysAssignDefinitionRoles&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
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
       var role_id = node.id;
       var self = $(this);
       var tagBuilderNot;
       var tagBuilder = $('#test-cabin').tagCabin({
                tagCopy         : false,
                tagDeletable    : true,
                tagDeletableAll : false, 
                tagBox          : $('.tag-container').find('ul'),
                dataMapper      : {attributes : Array('role_id', 'assign_definition_id')}

        }); 
        tagBuilder.tagCabin({
            onTagRemoved : function(event, data) {
                var self = $(this);
                var elementData = data.element;
                //console.log(elementData);
                var id = data.id;
                //self.tagCabin()
                window.deleteAssignTypeRole(id, elementData, tagBuilderNot);

            }
        });
        
        
        tagBuilderNot = $('#test-cabin-not').tagCabin({
                tagCopy         : true,
                tagDeletable    : false,
                tagDeletableAll : false, 
                tagBox          : $('.tag-container-not').find('ul'),
                dataMapper      : {attributes : Array('role_id', 'assign_definition_id')}

        });
        tagBuilderNot.tagCabin({
            onTagCopied : function(event, data) {
                var self = $(this);
                window.attachAssignTypeRole(role_id, data.element, tagBuilder);
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
            window.clearAssignTypeRole(node, tagBuilder);
            window.getAssignTypeRole(node, self, tagBuilder);
            window.clearAssignTypeRole(node, tagBuilderNot);
            window.getAssignTypeRoleNotAssigned(node, self, tagBuilderNot);
        }
        
   },
});

/**
 * attach assignment ytype to role
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
window.attachAssignTypeRole = function (role_id, tag, tagBuilder) {
    var tag = tag;
    var tagBuilder = tagBuilder;
    var loader = $("#assignTypeRoleBlock").loadImager();
    loader.loadImager('appendImage');
    
    //selectedTreeItem = $('#tt_tree_menu2').tree('find', property_id);
    
    var role_id = role_id;
    var assign_definition_id = tag.attr('data-assign_definition_id');

    var aj = $(window).ajaxCall({
         proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
         data : {
             url:'pkInsert_sysAssignDefinitionRoles' ,
             role_id : role_id,
             assign_definition_id : assign_definition_id,
             pk : $("#pk").val(),
             description : '',
         }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Rol\'e Atama Tipi Ekleme İşlemi Başarısız...', 
                                       'Rol\'e atama tipi ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysAssignDefinitionRoles" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              var data = data;
              var id = data.lastInsertId;
             tagBuilder.tagCabin('addTagManuallyDataAttr', id, 
                                                            tag.text(),
                                                            {role_id : role_id,
                                                             assign_definition_id : assign_definition_id,
                                                              });
            tag.remove();                                               
            loader.loadImager('removeLoadImage');
            
             sm.successMessage('show', 'Rol\'e Atama Tipi Ekleme İşlemi Başarılı...', 
                                       'Rol\'e atama tipi ekleme İşlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Rol\'e Atama Tipi Ekleme İşlemi Başarısız...', 
                                       'Rol\'e atama tipi Eekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysAssignDefinitionRoles" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rol\'e Atama Tipi Ekleme İşlemi Başarısız...', 
                                     'Rol\'e atama tipi ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysAssignDefinitionRoles" servis hatası->'+textStatus);
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
              dm.dangerMessage('show', 'Rol\'e Atama Tipi Ekleme İşlemi Başarısız...', 
                                       'Rol\'e atama tipi daha önce eklenmiştir, yeni bir özellik deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}

/**
 * delete assign type from a specific role
 * @param {type} id
 * @param {type} element
 * @param {type} machine_group_id
 * @returns {undefined}
 * @since 01/08/2016
 */
window.deleteAssignTypeRole = function(id, tag, tagBuilder) {
    var tag = tag;
    var tagBuilder = tagBuilder;
    var id = id;
    var loader = $("#assignTypeRoleBlock").loadImager();
    loader.loadImager('appendImage');
    
    /*console.log(tag.attr('data-attribute'));
    console.log(tag.attr('data-role_id'));*/
    var role_id = tag.attr('data-role_id');
    var assign_definition_id = tag.attr('data-assign_definition_id');

    var ajPopUpDelete = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkDelete_sysAssignDefinitionRoles' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    });
    ajPopUpDelete.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {  
                 dm.dangerMessage('resetOnShown');  
                 dm.dangerMessage('show', 'Atama Tipi / Rol Silme İşlemi Başarısız...',
                                           'Atama tipi / rol silinememiştir, sistem yöneticisi ile temasa geçiniz...');
                 console.error('"pkDelete_sysAssignDefinitionRoles" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 tagBuilder.tagCabin('addTagManuallyDataAttr',  null, 
                                                        tag.text(),
                                                        {role_id : null,
                                                         assign_definition_id : assign_definition_id,
                                                          });
                     tag.remove();                                               
                     loader.loadImager('removeLoadImage');
                 sm.successMessage('show', 'Atama Tipi / Rol Silme İşleminiz Başarılı...',
                                           'Atama tipi / rol silme işleminiz başarılı...')
             },                                   
     });
     ajPopUpDelete.ajaxCall('call');
}
    
    
/**
 * clear role attached assign type from interface
 * @param {type} node
 * @param {type} tagBuilder
 * @returns {undefined}
 * @since 01/08/2016
 */
window.clearAssignTypeRole = function(node, tagBuilder) {
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
 * set assignment type and role  tags
 * @param {type} node
 * @param {type} treeObj
 * @param {type} tagBuilder
 * @returns {undefined}
 * @since 01/08/2016
 */
window.getAssignTypeRole = function(node, treeObj, tagBuilder) {

    var nodeID = node.id;
    $('#mach-prop-box').loadImager();
    $('#mach-prop-box').loadImager('appendImage');

    if(tagBuilder.tagCabin('findSpecificTags', nodeID, 'data-role_id')) {
        var ajaxMacProp = $('#test-cabin').ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data : {
                        url:'pkFillAssignDefinitionOfRoles_sysAssignDefinitionRoles' ,
                        language_code : $('#langCode').val(),
                        id : nodeID,
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
                 dm.dangerMessage('show', 'Atama Tipi / Rol Yüklenememiştir...',
                                          'Atama Tipi ve rol  yüklenememiştir, sistem yöneticiniz ile temasa geçiniz...');
             },
             onSuccess : function (event, data) {
                 //$('#mach-prop-box').loadImager('removeLoadImage'); 
                 tagBuilder.tagCabin(
                    {tagsFound :function(event, item) { 
                    }  
                 });
                 tagBuilder.tagCabin(
                    {onTagRemovedUltimately :function(event, data) {
                        var element = data.element;
                        var id = data.id;
                        var role_id = element.attr('data-role_id');

                        window.deleteAssignTypeRoleUltimatelyDialog(id, element, role_id);
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
                 dm.dangerMessage('show', 'Role Atama Tipi Yetki Bulunamamıştır...',
                                          'Seçtiğiniz role bağlı atama tipi kaydı bulunamamıştır...');

             },
       }) 
       ajaxMacProp.ajaxCallWidget('call');
    } else {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Atama Tipi Seçilmiştir!!!'
                                , 'Seçili rol atama tipli yüklenmiş durumdadır...');
        $('#mach-prop-box').loadImager('removeLoadImage');
    }
}
 
 
/**
 * set assignmnet type tags not assigned to role
 * @param {type} node
 * @param {type} treeObj
 * @param {type} tagBuilder
 * @returns {undefined}
 * @since 01/08/2016
 */
window.getAssignTypeRoleNotAssigned = function(node, treeObj, tagBuilder) {

    var nodeID = node.id;
    $('#mach-prop-box-not').loadImager();
    $('#mach-prop-box-not').loadImager('appendImage');

    if(tagBuilder.tagCabin('findSpecificTags', nodeID, 'data-role_id')) {
        var ajaxMacPropNot = $('#test-cabin-not').ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data : {
                        url:'pkFillNotInAssignDefinitionOfRoles_sysAssignDefinitionRoles' ,
                        language_code : $('#langCode').val(),
                        id : nodeID,
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
                 dm.dangerMessage('show', 'Rol\'e Bağlı Atama Tipleri Yüklenememiştir...',
                                          'Rol\'e bağlı atama tipleri yüklenememiştir, sistem yöneticiniz ile temasa geçiniz...');
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
                 dm.dangerMessage('show', 'Rol\'e Bağlı Atama Tipleri Bulunamamıştır...',
                                          'Seçtiğiniz rol için ilşkilendirilmemiş atama kaydı bulunamamıştır...');

             },
       }) 
       ajaxMacPropNot.ajaxCallWidget('call');
    } else {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Atama Tipleri Seçilmiştir!!!'
                                , 'Seçili role / atama tipleri yüklenmiş durumdadır...');
        $('#mach-prop-box-not').loadImager('removeLoadImage');
    }
}

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();
   
});
