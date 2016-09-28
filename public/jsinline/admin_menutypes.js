$(document).ready(function () {



/**
 * Menu type datagrid is being filled
 * @since 21/07/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillMenuTypeListGrid_sysMenuTypes',
            language_code : $('#langCode').val()
    },
    width : '100%',
    singleSelect:true,
    pagination : true,
    collapsible:true,
    method:'get',
    idField:'id',
    //toolbar:'#tb5',
    //fit:true,
    //fitColumns : true,
    remoteFilter: true,
    remoteSort:true,
    multiSort:false,
    columns:
        [[
            {field:'id',title:'ID'},
            {field:'name',title:'Menü Tipi', width:300},
            {field:'description',title:'Açıklama', width:300},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveMenuTypeWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveMenuTypeWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    
                    //var d = '<a href="javascript:void(0)" onclick="deleteISScenario(this);">Delete</a>';
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteMenuTypeUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateMenuTypeDialog('+row.id+', { name : \''+row.name+'\',\n\
                                                                                                                                                                        description : \''+row.description+'\',\n\
                                                                                                                                                                        description_eng : \''+row.description_eng+'\',\n\
                                                                                                                                                                        name_eng : \''+row.name_eng+'\'} );"><i class="fa fa-arrow-circle-up"></i></button>';                                                                                                                 
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
 * menu  insert form validation engine attached to work
 * @since 21/07/2016
 */
$('#menuTypesForm').validationEngine();

 /**
* reset button function for menu type insert form
* property insert
* for 'insert' and 'update' form buttons
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 21/07/2016
*/
window.resetMenuTypesForm = function () {
   $('#menuTypesForm').validationEngine('hide');
   return false;
}
                                            


/**
 * get all menu types and fill to datagrid
 * @param {type} node
 * @param {type} treeObj
 * @returns {undefined}
 * @since 21/07/2016
 */
window.getAllMenuTypesToDatagrid = function(node, treeObj) {
    //alert('getAllMenuTypesToDatagrid');
    var nodeID = node.id;
    var checkedArray = [];
    var checked = treeObj.tree('getChecked');
    if(checked.length == 0) {
        $('#tt_grid_dynamic').datagrid({  
            queryParams: {
                    pk: $('#pk').val(),
                    subject: 'datagrid',
                    url : 'pkGetMachineTools_sysMachineTools',
            },
        });
        $('#tt_grid_dynamic').datagrid('enableFilter');
    } 
}
    

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

    
/**
 * wrapper class for pop up and delete menu type ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 25/07/2016
 */
window.deleteMenuTypeUltimatelyDialog= function(id, index){
    var nodeID = nodeID;
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteMenuTypeUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Menü Tip Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Menü tipi  silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete menu type
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 25/07/2016
*/
window.deleteMenuTypeUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysMenuTypes' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Menü Tip Silme İşlemi Başarısız...',
                                      'Menü tip  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysMenuTypes" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    loaderGridBlock.loadImager('removeLoadImage');
                    //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                    $('#tt_grid_dynamic').datagrid('reload');
                    
                }
            });
            sm.successMessage('show', 'Menü Tip  Silme İşleminiz Başarılı...',
                                      'Menü tip  silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert menu item
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.insertMenuTypesWrapper = function (e) {
 e.preventDefault();

 if ($("#menuTypesForm").validationEngine('validate')) {
     insertMenuType();
 }
 return false;
}
   
   
   
/**
 * wrapper for menu type update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.updateMenuTypeDialog = function (id, row) {
window.gridReloadController = false;
BootstrapDialog.show({  
     title: '"'+ row.name + '" menü tipini güncellemektesiniz...',
     message: function (dialogRef) {
                 var dialogRef = dialogRef;
                 var $message = $(' <div class="row">\n\
                                         <div class="col-md-12">\n\
                                             <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                 <form id="menuTypesFormPopup" method="get" class="form-horizontal">\n\
                                                 <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                 <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group" style="margin-top: 20px;">\n\
                                                         <label class="col-sm-2 control-label">Menü Tipi</label>\n\
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
                                                         <label class="col-sm-2 control-label">Menü Tipi İng.</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.name_eng+'" name="name_eng_popup" id="name_eng_popup" />\n\
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
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Açıklama İng.</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="description_eng_popup" id="description_eng_popup" placeholder="İngilizce Açıklama ...">'+row.description_eng+'</textarea>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group">\n\
                                                         <div class="col-sm-10 col-sm-offset-2">\n\
                                                         <button id="updateMenuTypePopUp" class="btn btn-primary" type="submit" onclick="return updateMenuTypeWrapper(event, '+id+');">\n\
                                                             <i class="fa fa-save"></i> Güncelle </button>\n\
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
        $('#menuTypesFormPopup').validationEngine();
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
 * update menu type
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.updateMenuTypeWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#menuTypesFormPopup").validationEngine('validate')) {

    updateMenuType(id);
 }
 return false;
}

/**
 * update menu type
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.updateMenuType = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     var name = $('#name_popup').val();
     var name_eng = $('#name_eng_popup').val();
     var description = $('#description_popup').val();
     var description_eng = $('#description_eng_popup').val();
     
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysMenuTypes' ,
                         language_code : $('#langCode').val(),
                         name : name,
                         name_eng : name_eng,
                         description : description,
                         description_eng : description_eng,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Menü Tip Güncelleme İşlemi Başarısız...', 
                                      'Menü tip güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMenuTypes" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Menü Tip Güncelleme İşlemi Başarılı...', 
                                       'Menü tip güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Menü Tip Güncelleme İşlemi Başarısız...', 
                                      'Menü tip güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMenuTypes" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Menü Tip Güncelleme İşlemi Başarısız...', 
                                      'Menü tip güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert menu type
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.insertMenuType = function (nodeID, nodeName) {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');

     var name = $('#name').val();
     var name_eng = $('#name_eng').val();     
     var description = $('#description').val();
     var description_eng = $('#description_eng').val();

     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysMenuTypes' ,
                         name : name,
                         name_eng : name_eng,
                         description : description,
                         description_eng : description_eng,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Menü Tipi Ekleme İşlemi Başarısız...', 
                                       'Menü tipi ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysMenuTypes" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#menuTypesForm')[0].reset(); 
                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillMenuTypeListGrid_sysMenuTypes',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Menü Tipi Kayıt İşlemi Başarılı...', 
                                       'Menü tipi kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Menü Tipi Kayıt İşlemi Başarısız...', 
                                       'Menü tipi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysMenuTypes" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Menü Tipi Kayıt İşlemi Başarısız...', 
                                     'Menü tipi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysMenuTypes" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#menuTypesForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Menü Tipi Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile menü tipi kaydı yapılmıştır, yeni bir menü tipi ismi deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive menu type
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.activePassiveMenuTypeWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveMenuType(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Menü Tipi Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Meni tipi aktif/pasif işlemi gerçekleştirmek  üzeresiniz.... ');
 return false;
}

/**
 * update menu type
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.activePassiveMenuType = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    console.log(domElement);
    
     
    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysMenuTypes' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Menü Tip Aktif/Pasif İşlemi Başarısız...', 
                                      'Menü tip aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMenuTypes" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Menü Tip Aktif/Pasif İşlemi Başarılı...', 
                                       'Menü tip aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Menü Tip Aktif/Pasif İşlemi Başarısız...', 
                                      'Menü tip aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysMenuTypes" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Menü Tip Aktif/Pasif İşlemi Başarısız...', 
                                      'Menü tip aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
