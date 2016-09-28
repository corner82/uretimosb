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
 * Machine datagrid is being filled
 * @since 16/05/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillPropertieslist_sysMachineToolPropertyDefinition',
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
    //toolbar:'#tb5',
    //fit:true,
    //fitColumns : true,
    remoteFilter: true,
    remoteSort:true,
    multiSort:false,
    columns:
        [[
            {field:'id',title:'ID'},
            {field:'property_name',title:'Makina Özelliği',sortable:true,width:300},
            {field:'property_name_eng',title:'İng. Makina Özel.',sortable:true, width:300},

            {field:'unitcode',title:'Birim Grubu', width:200},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveMachinePropWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveMachinePropWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteMachPropUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateMachPropDialog('+row.id+', { property_name : \''+row.property_name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                        property_name_eng : \''+row.property_name_eng+'\',\n\
                                                                                                                                                                        unit_grup_id : '+row.unit_grup_id+'} );"><i class="fa fa-arrow-circle-up"></i></button>';
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
                                            
 
 /*
* 
* @type @call;$@call;loadImager
* @Since 16/05/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for machine 
* producers dropdown. Loading image will be removed when dropdown filled data.
*/
$("#mach-prod-box").loadImager();
$("#mach-prod-box").loadImager('appendImage');

/**
 * machine insert form validation engine attached to work
 * @since 16/05/2016
 */
$('#machinePropForm').validationEngine();

 /**
* reset button function for machine property insert form
* property insert
* for 'insert' and 'update' form buttons
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 23/06/2016
*/
window.resetMachinePropForm = function () {
   $('#machinePropForm').validationEngine('hide');
   return false;
}
                                            
   
/*
* 
* units category tree
* Mustafa Zeynel Dağlı
* 23/06/2016
*/
$('#tt_tree_menu2').tree({  
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
            wm.warningMessage('show','Ana Kategori Birim Seçiniz',
                                     'Lütfen birimi  ana kategoriden seçiniz...');

        } 
    },
});
      
/**
 * set machine due to machine categories
 * @param {type} node
 * @param {type} treeObj
 * @param {type} tagBuilder
 * @returns {undefined}
 * @since 17/05/2016
 */
window.getMachineDueCategories = function(node, treeObj) {
    //alert('getMachineDueCategories');
    var nodeID = node.id;
    var checkedArray = [];
    var checked = treeObj.tree('getChecked');
    if(checked.length >0) {
        $.each(checked, function(index, item) {
            checkedArray.push(parseInt(item.id));
        });
        var objChecked = $.extend({}, checkedArray);
        var json=JSON.stringify(objChecked);
        //console.log(json);;
        //console.log(JSON.parse(json)); 

        //$('#tt_grid_dynamic').datagrid('disableFilter');
        $('#tt_grid_dynamic').datagrid({  
            queryParams: {
                    pk: $('#pk').val(),
                    subject: 'datagrid',
                    url : 'pkFillPropertieslist_sysMachineToolPropertyDefinition',
                    machine_groups_id : json,
                    //filterRules:[{"field":"machine_tool_name","op":"contains","value":"e"}]
            },
        });
        $('#tt_grid_dynamic').datagrid('enableFilter');
    } 
}

/**
 * get all machines properties and fill to datagrid
 * @param {type} node
 * @param {type} treeObj
 * @returns {undefined}
 * @since 23/06/2016
 */
window.getAllMachinePropsToDatagrid = function(node, treeObj) {
    var nodeID = node.id;
    var checkedArray = [];
    var checked = treeObj.tree('getChecked');
    if(checked.length == 0) {
        $('#tt_grid_dynamic').datagrid({  
            queryParams: {
                    pk: $('#pk').val(),
                    subject: 'datagrid',
                    url : 'pkFillPropertieslist_sysMachineToolPropertyDefinition',
            },
        });
        $('#tt_grid_dynamic').datagrid('enableFilter');
    } 
}
    

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

//Validation forms binded...
jQuery("#machinePropForm").validationEngine();
    
/**
 * wrapper class for pop up and delete machine property ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 23/06/2016
 */
window.deleteMachPropUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteMachPropUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Makina Özellik Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Makina Özelliği silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete machine property
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 23/06/2016
*/
window.deleteMachPropUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysMachineToolPropertyDefinition' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Makina Özelliği Silme İşlemi Başarısız...',
                                     'Makina özelliği silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysMachineToolPropertyDefinition" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    console.warn(index);
                    loaderGridBlock.loadImager('removeLoadImage');
                    $('#tt_grid_dynamic').datagrid('reload');
                    //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                }
            });
            sm.successMessage('show', 'Makina Özelliği Silme İşleminiz Başarılı...',
                                      'Makina Özelliği silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert machine property item
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 23/06/2016
 */
window.insertMachPropWrapper = function (e) {
 e.preventDefault();
 if ($("#machinePropForm").validationEngine('validate')) {
     if($('#tt_tree_menu2').tree('getSelected') == null) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Birim Seçiniz', 'Lütfen birim kategorisi seçiniz!');
         return false;
     }
     insertMachProp();
 }
 return false;
}
   
   
   
/**
 * wrapper for machine property update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 24/06/2016
 */
window.updateMachPropDialog = function (id, row) {
    window.gridReloadController = false;
//console.log(row);
BootstrapDialog.show({  
     title: '"'+ row.property_name + '" makina özelliğini güncellemektesiniz...',
     message: function (dialogRef) {
                 var dialogRef = dialogRef;
                 var $message = $(' <div class="row">\n\
                                         <div class="col-md-12">\n\
                                             <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                 <form id="machPropFormPopup" method="get" class="form-horizontal">\n\
                                                 <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                 <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group" style="padding-top: 10px;" >\n\
                                                         <label class="col-sm-2 control-label">Birim Sistemi</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <ul id="tt_tree_menu2_popup" class="easyui-tree" ></ul>\n\
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
                                                                 <div  class="tag-container-popup">\n\
                                                                     <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.property_name+'" name="property_name_popup" id="property_name_popup"   />\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">İng. Makina Özelliği</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.property_name_eng+'" name="property_name_eng_popup" id="property_name_eng_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group">\n\
                                                         <div class="col-sm-10 col-sm-offset-2">\n\
                                                         <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateMachWrapper(event, '+id+');">\n\
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
        $('#machPropFormPopup').validationEngine();
        $('#tt_tree_menu2_popup').tree({  
            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillUnitsTree_sysUnits&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
            method: 'get',
            animate: true,
            checkbox: false,
            cascadeCheck: false,
            lines: true,
            onLoadSuccess: function (node, data) {
                //loader.loadImager('removeLoadImage');
                var node = $('#tt_tree_menu2_popup').tree('find', parseInt(row.unit_grup_id));
                $('#tt_tree_menu2_popup').tree('select', node.target);
            },
            onSelect : function(node) {
                var self = $(this);
                if(self.tree('isLeaf', node.target)) {
                    wm.warningMessage( {
                        onShown : function (event ,data ) {
                           var parent = self.tree('getParent', node.target);
                           self.tree('select', parent.target);
                        }
                    });
                    wm.warningMessage('show','Ana Kategori Birim Seçiniz',
                                             'Lütfen birimi  ana kategoriden seçiniz...');
                } 
            },
        });
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
 * update unit item
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 23/05/2016
 */
window.updateMachWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#machPropFormPopup").validationEngine('validate')) {
     selectedTreeItem = $('#tt_tree_menu2_popup').tree('getSelected');
     if(selectedTreeItem == null) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Birim Seçiniz', 'Lütfen birim kategorisi seçiniz!');
         return false;
     }   
    updateMach(id);
    return false;
 }
 return false;
}

/**
 * update unit item
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 23/06/2016
 */
window.updateMach = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     selectedTreeItem = $('#tt_tree_menu2_popup').tree('getSelected');
     var unit_grup_id = selectedTreeItem.id;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysMachineToolPropertyDefinition' ,
                         language_code : $('#langCode').val(),
                         id : id,
                         property_name : $('#property_name_popup').val(),
                         property_name_eng : $('#property_name_eng_popup').val(),
                         unit_grup_id : unit_grup_id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Özelliği Güncelleme İşlemi Başarısız...', 
                                      'Makina özelliği güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMachineToolPropertyDefinition" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Makina Özelliği Güncelleme İşlemi Başarılı...', 
                                       'Makina özelliği güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Özelliği Güncelleme İşlemi Başarısız...', 
                                      'Makina özelliği güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMachineToolPropertyDefinition" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Özelliği Güncelleme İşlemi Başarısız...', 
                                      'Makina özelliği güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert machine property
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 23/06/2016
 */
window.insertMachProp = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var selectedTreeItem = $('#tt_tree_menu2').tree('getSelected');
     //var unit_grup_id = selectedTreeItem.id;
     
      var unitGroupIDArray = [];
      unitGroupIDArray.push(parseInt(selectedTreeItem.id));
    
     var objunitGroupID = $.extend({}, unitGroupIDArray);
     var jsonUnitGroupID = JSON.stringify(objunitGroupID);

     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysMachineToolPropertyDefinition' ,
                         property_name : $('#property_name').val(),
                         property_name_eng : $('#property_name_eng').val(),
                         unit_grup_id : jsonUnitGroupID,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Makina Ekleme İşlemi Başarısız...', 
                                       'Makina ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysMachineToolPropertyDefinition" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              //console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#machinePropForm')[0].reset();
                     $('#dropdownProducers').ddslick('select', {index: '0' });
                     //var nodeSelected = $('#tt_tree_menu2').tree('find', machine_tool_grup_id); 
                     var nodeSelected = $('#tt_tree_menu2').tree('getSelected');
                     $('tt_tree_menu2').tree('unselect', nodeSelected); 

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillPropertieslist_sysMachineToolPropertyDefinition',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Makina Özelliği Kayıt İşlemi Başarılı...', 
                                       'Makina özelliği kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Makina Özelliği Kayıt İşlemi Başarısız...', 
                                       'Makina özelliği kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysMachineToolPropertyDefinition" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Özelliği Kayıt İşlemi Başarısız...', 
                                     'Makina özelliği kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysMachineTools" servis hatası->'+data.errorInfo);
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
              dm.dangerMessage('show', 'Makina Özelliği Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile makina özelliği kaydı yapılmıştır, yeni bir makina özelliği deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive machine property
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 23/06/2016
 */
window.activePassiveMachinePropWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveMachine(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Makina Özelliği Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Makina özelliği aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive mach property item
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 23/06/2016
 */
window.activePassiveMachine = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysMachineToolPropertyDefinition' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Özelliği Aktif/Pasif İşlemi Başarısız...', 
                                      'Makina özelliği aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysMachineToolPropertyDefinition" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Makina Özelliği Aktif/Pasif İşlemi Başarılı...', 
                                       'Makina özelliği aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Makina Özelliği Aktif/Pasif İşlemi Başarısız...', 
                                      'Makina özelliği aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysMachineToolPropertyDefinition" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Özelliği Aktif/Pasif İşlemi Başarısız...', 
                                      'Makina özelliği aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
