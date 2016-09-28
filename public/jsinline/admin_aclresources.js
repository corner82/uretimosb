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
 * ACL resources datagrid is being filled
 * @since 13/07/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillPropertieslist_sysAclResources',
            sort : 'id',
            order : 'desc',
            /*machine_groups_id : null,
            filterRules:null*/
    },
    width : '100%',
    singleSelect:true,
    pagination : true,
    collapsible:true,
    method:'get',
    idField:'id',
    //fit:true,
    //fitColumns : true,
    remoteFilter: true,
    remoteSort:true,
    multiSort:false,
    columns:
        [[
            {field:'id',title:'ID'},
            {field:'name',title:'Resource',sortable:true,width:300},
            {field:'parent_name',title:'Bağlı Resource',sortable:true,width:300},
            {field:'description',title:'Açıklama',sortable:true, width:300},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveACLResourcesWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveACLResourcesWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteACLResourceUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateACLResourceDialog('+row.id+', { name : \''+row.name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                           description : \''+row.description+'\'} );"><i class="fa fa-arrow-circle-up"></i></button>';
                    return e+d+u;    
                }
            },
        ]]   
});
$('#tt_grid_dynamic').datagrid('enableFilter');




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
 * !! Important , do not delete
 * @type node
 */
var selectedNode;

/*
* 
* @type @call;$@call;loadImager
* @Since 16/05/2016
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
                                            
/**
 * machine insert form validation engine attached to work
 * @since 16/05/2016
 */
$('#aclResourcesForm').validationEngine();

 /**
* reset button function for machine property insert form
* property insert
* for 'insert' and 'update' form buttons
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 23/06/2016
*/
window.resetMachinePropForm = function () {
   $('#aclResourcesForm').validationEngine('hide');
   return false;
}
                                            
   
/*
* 
* units category tree
* Mustafa Zeynel Dağlı
* 23/06/2016
*/
$('#tt_tree_menu2').tree({  
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillResourcesTree_sysAclResources&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
    method: 'get',
    animate: true,
    checkbox: false,
    cascadeCheck: false,
    lines: true,
    onLoadSuccess: function (node, data) {
         loader.loadImager('removeLoadImage');
    },
    onSelect: function(node) {
         
    },
});
      

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

//Validation forms binded...
jQuery("#machinePropForm").validationEngine();
    
/**
 * wrapper class for pop up and delete ACL resource ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.deleteACLResourceUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteACLResourceUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'ACL Resource (Kaynak) Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'ACL Resource (Kaynak) silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete ACL resource
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 13/07/2016
*/
window.deleteACLResourceUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysAclResources' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'ACL Resource (Kaynak) Silme İşlemi Başarısız...',
                                     'ACL Resource (Kaynak) silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysAclResources" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    loaderGridBlock.loadImager('removeLoadImage');
                    
                    var node = $('#tt_tree_menu2').tree('find', id);
                    $('#tt_tree_menu2').tree('remove', node.target);
                    
                    $('#tt_grid_dynamic').datagrid('reload');
                    //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                }
            });
            sm.successMessage('show', 'ACL Resource (Kaynak) Silme İşleminiz Başarılı...',
                                      'ACL Resource (Kaynak) silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert ACL resource
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.insertACLResourcesWrapper = function (e) {
 e.preventDefault();
 if ($("#aclResourcesForm").validationEngine('validate')) {
     insertACLResource();
 }
 return false;
}
   
   
   
/**
 * wrapper for ACL resource update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.updateACLResourceDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" ACL kaynağını güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="aclResourceFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Resource (Kaynak)</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.name+'" name="name_popup" id="name_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Açıklama</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="description_popup" id="description_popup" placeholder="Açıklama ...">'+row.description+'</textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateACLResourceWrapper(event, '+id+');">\n\
                                                                 <i class="fa fa-save"></i> Güncelle </button>\n\
                                                             <!--<button id="resetForm" onclick="regulateButtonsPopupInsert();" class="btn btn-flat" type="reset" " >\n\
                                                                 <i class="fa fa-remove"></i> Reset </button>-->\n\
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
            $('#aclResourceFormPopup').validationEngine();
         },
         onhide : function() {
             if(window.gridReloadController == true) {
                 $('#tt_grid_dynamic').datagrid('reload');
             }

         },
     });
     return false;
}

/**
 * update ACL resource wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.updateACLResourceWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#aclResourceFormPopup").validationEngine('validate')) {   
    updateACLResource(id);
    return false;
 }
 return false;
}

/**
 * update ACL resource
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.updateACLResource = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysAclResources' ,
                         id : id,
                         name : $('#name_popup').val(),
                         description : $('#description_popup').val(),
                         parent : 0,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Resource (Kaynak) Güncelleme İşlemi Başarısız...', 
                                      'ACL Resource (Kaynak) güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclResources" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'ACL Resource (Kaynak) Güncelleme İşlemi Başarılı...', 
                                       'ACL Resource (Kaynak) güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Resource (Kaynak) Güncelleme İşlemi Başarısız...', 
                                      'ACL Resource (Kaynak) güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclResources" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Resource (Kaynak) Güncelleme İşlemi Başarısız...', 
                                      'ACL Resource (Kaynak) güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert ACL resource
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.insertACLResource = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var name = $('#name').val();
     var description = $('#description').val();
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysAclResources' ,
                         name : name,
                         description : description,
                         parent : 0,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'ACL Resource (Kaynak) Ekleme İşlemi Başarısız...', 
                                       'ACL resource (kaynak) ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysAclResources" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#aclResourcesForm')[0].reset();  
                     
                     $('#tt_tree_menu2').tree('append', {
                        data: [{
                                attributes:{ active: 0 },
                                active: 0,
                                id: data.lastInsertId,
                                text: name,
                                checked: false,
                                state : 'open',
                            },]
                    });

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillPropertieslist_sysAclResources',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'ACL Resource (Kaynak) Kayıt İşlemi Başarılı...', 
                                       'ACL resource (kaynak) kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'ACL Resource (Kaynak) Kayıt İşlemi Başarısız...', 
                                       'ACL resource (kaynak) kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysAclResources" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Resource (Kaynak) Kayıt İşlemi Başarısız...', 
                                     'ACL resource (kaynak) kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysAclResources" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#machinePropForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'ACL Resource (Kaynak) Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile ACL resource (kaynak) kaydı yapılmıştır, yeni bir ACL resource (kaynak) deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive ACL resource
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.activePassiveACLResourcesWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveACLResource(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'ACL Resource (Kaynak) Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'ACL resource (kaynak) aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive ACL resource
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 13/07/2016
 */
window.activePassiveACLResource = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysAclResources' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Resource (Kaynak) Aktif/Pasif İşlemi Başarısız...', 
                                      'ACL resource (kaynak) aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAclResources" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'ACL Resource (Kaynak) Aktif/Pasif İşlemi Başarılı...', 
                                       'ACL resource (kaynak) aktif/pasif işlemini gerçekleştirdiniz... ',
                                       data);
            if($(domElement).hasClass("fa-minus-circle")){
                $(domElement).removeClass("fa-minus-circle");
                $(domElement).addClass("fa-plus-circle");
                
                $(domElement).parent().removeClass("btn-primary");
                $(domElement).parent().addClass("btn-warning");
            } else if($(domElement).hasClass("fa-plus-circle" )) {
                $(domElement).removeClass("fa-plus-circle");
                $(domElement).addClass("fa-minus-circle");
                
                $(domElement).parent().removeClass("btn-warning");
                $(domElement).parent().addClass("btn-primary");
            }
                
                
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Resource (Kaynak) Aktif/Pasif İşlemi Başarısız...', 
                                      'ACL resource (kaynak) aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAclResources" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Resource (Kaynak) Aktif/Pasif İşlemi Başarısız...', 
                                      'ACL resource (kaynak) aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
