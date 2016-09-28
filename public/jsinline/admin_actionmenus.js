$(document).ready(function () {


/**
 * Actions / menu types datagrid is being filled
 * @since 26/07/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillMenuTypesActionLeftList_sysAclMenuTypesActions',
            //sort : 'module_name',
            //order : 'desc',
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
    rowStyler: function(index,row){
        if (row.menu_types_id == null){
            return 'background-color:#d2d6de;color:#444;font-weight:bold;';
        }
    },
    columns:
        [[
            {field:'id',title:'ID'},
            {field:'module_name',title:'Modül',sortable:true,width:150},
            {field:'action_name',title:'Action',sortable:true,width:150},
            {field:'menu_type_name',title:'Menü Tipi',sortable:true,width:200,align : 'center',
                formatter:function(value,row,index){
                    var u ;
                    if(row.menu_types_id == null) {
                        u = '<i title="Menü Tipi Belirlenmemiştir" class="fa fa-minus-square"></i>';
                    } else {
                        u = row.menu_type_name;
                    }
                    return u;    
                },
                styler:function(value,row,index){
                    if(row.menu_types_id == null) {
                        return 'background-color:#ffee00;color:red;';
                    }     
                },
            },
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.menu_types_id == null) {
                        var u = '<button style="padding : 2px 4px;" title="Menü Tipi Belirle"  class="btn btn-warning" type="button" onclick="return insertMenuTypeActionDialog('+row.id+', { action_id : \''+row.action_id+'\',\n\
                                                                                                                                                                                     action_name : \''+row.action_name+'\'} );"><i class="fa fa-code-fork"></i></button>';
                    } else {
                        var u = '<button style="padding : 2px 4px;" title="Menü Tipi Belirle"  class="btn btn-info" type="button" onclick="return updateMenuTypeActionDialog('+row.id+', { action_id : \''+row.action_id+'\',\n\
                                                                                                                                                                                            module_id : \''+row.module_id+'\',\n\
                                                                                                                                                                                            menu_types_id : \''+row.menu_types_id+'\',\n\
                                                                                                                                                                                            action_name : \''+row.action_name+'\',\n\
                                                                                                                                                                                            menu_type_name : \''+row.menu_type_name+'\',  } );"><i class="fa fa-arrow-circle-o-up"></i></button>';
                    }
                    return u;    
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


var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});
                                            
// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();


/**
 * wrapper for Zend Action / Menu Types insert process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.insertMenuTypeActionDialog = function (id, row) {
    window.gridReloadControllerInsert = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.action_name + '" Action için menü tipi atamaktasınız...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="actionsFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Menü Tipi</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group" id="mach-prod-box-popup-insert">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownMenuTypesInsertPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                            <div class="form-group">\n\
                                                                <div class="col-sm-10 col-sm-offset-2">\n\
                                                                <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return insertMenuTypeActionWrapper(event, '+row.action_id+');">\n\
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
             
            $("#mach-prod-box-popup-insert").loadImager();
            $("#mach-prod-box-popup-insert").loadImager('appendImage');
            
            var ajaxACLResourcesPopup = $(window).ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: { url:'pkFillMenuTypeList_sysMenuTypes' ,
                            pk : $("#pk").val() 
                    }
       })
        ajaxACLResourcesPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       //$('#mach-prod-box').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'Menü Tip Bulunamamıştır...',
                                         'Menü tip bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                    $('#mach-prod-box-popup-insert').loadImager('removeLoadImage');
                    $('#dropdownMenuTypesInsertPopup').ddslick({
                            height : 200,
                            data : data, 
                            width:'98%',
                            search : true,
                            //imagePosition:"right",
                            onSelected: function(selectedData){
                                if(selectedData.selectedData.value>0) {
                                    /*$('#tt_tree_menu').tree({
                                        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                                    });*/
                             }
                         }   
                    });  
                },
                onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'Menü Tip Bulunamamıştır...',
                                              'Menü tip bulunamamıştır...');
                 },
            }) 
            ajaxACLResourcesPopup.ajaxCallWidget('call');
         },
         onhide : function() {
             if(window.gridReloadControllerInsert == true) {
                 $('#tt_grid_dynamic').datagrid('reload');
             }

         },
     });
     return false;
}
   
 /**
 * attach (Insert) Action / Menu Type wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.insertMenuTypeActionWrapper = function (e, id) {
    e.preventDefault();
    var id = id;
    
   var ddData = $('#dropdownMenuTypesInsertPopup').data('ddslick');
   if(ddData.selectedData.value>0) {
       insertActionMenuType(id);
   } else {
       wm.warningMessage('resetOnShown');
       wm.warningMessage('show', 'Menü Tipi Seçiniz', 'Lütfen Menü Tip seçiniz!')
   }
   return false;
 

}

/**
 * insert (attach) Action / Menu Type
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.insertActionMenuType = function (id) {
     var loader = $('#loading-image-crud-popup-insert').loadImager();
     loader.loadImager('appendImage');
     
     var ddData = $('#dropdownMenuTypesInsertPopup').data('ddslick');
     var menu_types_id = ddData.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkInsert_sysAclMenuTypesActions' ,
                         action_id : id,
                         menu_types_id : menu_types_id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Action / Menü Tip Ekleme İşlemi Başarısız...', 
                                      'Action / Menü Tip ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysAclMenuTypesActions" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Action / Menü Tip Ekleme İşlemi Başarılı...', 
                                       'Action / Menü Tip ekleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadControllerInsert = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Action / Menü Tip Ekleme İşlemi Başarısız...', 
                                      'Action / Menü Tip ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysAclMenuTypesActions" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Action / Menü Tip Ekleme Güncelleme İşlemi Başarısız...', 
                                      'Action / Menü Tip ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * wrapper for Action / Menu Type update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.updateMenuTypeActionDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.action_name + '" Action üzerinde güncelleme yapmaktasınız...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="actionsFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Menü Tipi</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group" id="mach-prod-box-popup">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownMenuTypesPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                            <div class="form-group">\n\
                                                                <div class="col-sm-10 col-sm-offset-2">\n\
                                                                <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateMenuTypeActionWrapper(event, '+id+', '+row.action_id+');">\n\
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
             
            $("#mach-prod-box-popup").loadImager();
            $("#mach-prod-box-popup").loadImager('appendImage');
            
            var ajaxACLResourcesPopup = $(window).ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: { url:'pkFillMenuTypeList_sysMenuTypes' ,
                            pk : $("#pk").val() 
                    }
       })
        ajaxACLResourcesPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       //$('#mach-prod-box').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'Menü Tip Bulunamamıştır...',
                                         'Menü tip bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                    $('#mach-prod-box-popup').loadImager('removeLoadImage');
                    $('#dropdownMenuTypesPopup').ddslick({
                            height : 200,
                            data : data, 
                            width:'98%',
                            search : true,
                            //imagePosition:"right",
                            onSelected: function(selectedData){
                                if(selectedData.selectedData.value>0) {
                                    /*$('#tt_tree_menu').tree({
                                        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                                    });*/
                             }
                         }   
                    });  
                    $('#dropdownMenuTypesPopup').ddslick('selectByValue', 
                                                {index: ''+row.menu_types_id+'' ,
                                                 text : ''+row.menu_type_name+''}
                                                );
                },
                onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'Menü Tipi Bulunamamıştır...',
                                              'Menü tipi bulunamamıştır...');
                 },
            }) 
            ajaxACLResourcesPopup.ajaxCallWidget('call');
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
 * update Action / Menu Type wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 27/07/2016
 */
window.updateMenuTypeActionWrapper = function (e, id, action_id) {
 e.preventDefault();
 var id = id;
 var row = row;
   
var ddData = $('#dropdownMenuTypesPopup').data('ddslick');
if(ddData.selectedData.value>0) {
   updateActionMenuType(id, action_id);
   return false;
} else {
   wm.warningMessage('resetOnShown');
   wm.warningMessage('show', 'Menü Tip Seçiniz', 'Lütfen menü tip seçiniz!')
}
return false;

}

/**
 * update Action / Menu Type
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 27/07/2016
 */
window.updateActionMenuType = function (id, action_id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     console.warn(id);
     console.warn(action_id);
     
     var ddData = $('#dropdownMenuTypesPopup').data('ddslick');
     var menu_types_id = ddData.selectedData.value;
     
     var action_id = action_id;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysAclMenuTypesActions' ,
                         action_id : action_id,
                         menu_types_id : menu_types_id,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Action / Menü Tipi Güncelleme İşlemi Başarısız...', 
                                      'Action / Menü Tipi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclMenuTypesActions" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Action / Menü Tipi Güncelleme İşlemi Başarılı...', 
                                       'Action / Menü Tipi güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Action / Menü Tipi Güncelleme İşlemi Başarısız...', 
                                      'Action / Menü Tipi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclMenuTypesActions" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Action / Menü Tipi Güncelleme İşlemi Başarısız...', 
                                      'Action / Menü Tipi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   

   
   
   
});
