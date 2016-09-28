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
 * ACL roles datagrid is being filled
 * @since 13/07/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillOperationTypesRrpList_sysOperationTypesRrp',
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
            {field:'operation_name',title:'Ope.',sortable:true,width:200},
            {field:'privilege_name',title:'Bağlı Yetki',sortable:true,width:200},
            {field:'role_name_tr',title:'Bağlı Rol',sortable:true,width:100},
            {field:'service_group_name',title:'Servis Grub',sortable:true,width:100},
            {field:'resource_name',title:'ACL Resource',sortable:true,width:100},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveOperationsWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveOperationsWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteOperationUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateOperationDialog('+row.id+', { name : \''+row.operation_name+'\',\n\ \n\
                                                                                                                                                                       name_eng : \''+row.operation_name_eng+'\',\n\                                                                                                                  \n\
                                                                                                                                                                       description : \''+row.description+'\',\n\
                                                                                                                                                                       description_eng : \''+row.description_eng+'\',\n\
                                                                                                                                                                       resource_id : \''+row.resource_id+'\',\n\
                                                                                                                                                                       role_id : \''+row.role_id+'\',\n\
                                                                                                                                                                       restservices_id : \''+row.restservices_id+'\',\n\
                                                                                                                                                                       resource_id : '+row.resource_id+',\n\
                                                                                                                                                                       resource_name : \''+row.resource_name+'\',\n\
                                                                                                                                                                       table_oid : \''+row.table_oid+'\',\n\
                                                                                                                                                                       services_group_id : \''+row.services_group_id+'\',\n\
                                                                                                                                                                       assign_definition_id : \''+row.assign_definition_id+'\'\n\
                                                                                                                                                                       } );"><i class="fa fa-arrow-circle-up"></i></button>';
                    return e+d+u;    
                }
            },
        ]]   
});
$('#tt_grid_dynamic').datagrid('enableFilter');

/**
 * assignments dropdown load imager
 * @type @call;$@call;loadImager
 * @author Mustafa Zeynel Dağlı
 * @since 05/08/2016
 */
var assignmentsLoadImage = $("#dropdown-assignments").loadImager();
assignmentsLoadImage.loadImager('appendImage');

/**
 * rest services tree load imager
 * @type @call;$@call;loadImager
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
var nonAttachedTreeLoadImage = $("#nonAttachedTree").loadImager();
nonAttachedTreeLoadImage.loadImager('appendImage');

/**
 * resources / roles tree load imager
 * @type @call;$@call;loadImager
 * @author Mustafa Zeynel Dağlı
 * @since 05/08/2016
 */
var resRolesLoadImage = $("#loading-image-resources-roles").loadImager();
resRolesLoadImage.loadImager('appendImage');

/**
 * Rest services tree due to rest service groups
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
$('#tt_tree_services').tree({
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillRestServicesOfPrivilegesTree_sysAclRrpRestservices&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val()+ '',
    method: 'get',
    animate: true,
    checkbox: false,
    cascadeCheck: false,
    lines: true,
    onLoadSuccess: function (node, data) {
         nonAttachedTreeLoadImage.loadImager('removeLoadImage');
     },
    onSelect: function(node) { 
        var self = $(this);
        if(!self.tree('isLeaf', node.target)) {
            wm.warningMessage( {
                onShown : function (event ,data ) {
                   self.tree('unselect', node.target); 
                }
            });
            wm.warningMessage('show','Servis Seçiniz',
                                     'Lütfen servis grubu altından tekil servis seçiniz...');
        }
    },
}); 


/*
* ACL resource and rol tree
* Mustafa Zeynel Dağlı
* 05/08/2016
*/
$('#tt_tree_menu2').tree({  
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillResourceGroups_sysAclResources&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
    method: 'get',
    animate: true,
    checkbox: false,
    cascadeCheck: false,
    lines: true,
    onLoadSuccess: function (node, data) {
         resRolesLoadImage.loadImager('removeLoadImage');
    },
    onSelect: function(node) { 
        var self = $(this);
        if(!self.tree('isLeaf', node.target)) {
            wm.warningMessage( {
                onShown : function (event ,data ) {
                   self.tree('unselect', node.target); 
                }
            });
            wm.warningMessage('show','Servis Seçiniz',
                                     'Lütfen servis grubu altından tekil servis seçiniz...');
        } else {
            nonAttachedTreeLoadImage.loadImager('appendImage');
            $('#tt_tree_services').tree({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillRestServicesOfPrivilegesTree_sysAclRrpRestservices&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val()+ '&role_id='+node.id+'&resource_id='+node.resource_id,
            });
        }
    },
    
});


/**
 * System database tables dropdown loading image
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
$("#tables-box").loadImager();
$("#tables-box").loadImager('appendImage');


/**
 * Assignments dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 01/08/2016
 */
var ajaxACLRoles = $('#dropdownAssignments').ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillAssignDefinitionRolesDdList_sysAssignDefinitionRoles' ,
                    pk : $("#pk").val() 
            }
   })
ajaxACLRoles.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                assignmentsLoadImage.loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'ACL Rol Bulunamamıştır...',
                                  'ACL rol  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         assignmentsLoadImage.loadImager('removeLoadImage');
         $('#dropdownAssignments').ddslick({
            height : 200,
            data : data, 
            width:'98%',
            selectText: "Select your preferred social network",
            //showSelectedHTML : false,
            defaultSelectedIndex: 3,
            search : true,
            //imagePosition:"right",
            onSelected: function(selectedData){
                if(selectedData.selectedData.value>0) {
                    /*$('#tt_tree_services').tree({
                        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillRestServicesOfPrivilegesTree_sysAclRrpRestservices&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val()+ '&role_id='+selectedData.selectedData.value,
                    });*/
                }
            }   
        });   
     },
     onErrorDataNull : function (event, data) {
         dm.dangerMessage({
            onShown : function() {
                assignmentsLoadImage.loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'ACL Rol Bulunamamıştır...',
                                  'ACL rol  bulunamamıştır...');
     },
}) 
ajaxACLRoles.ajaxCallWidget('call');


/**
 * Database tables dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 01/08/2016
 */
var ajaxTables = $('#dropdownTables').ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillInfoTablesDdList_pgClass' ,
                    pk : $("#pk").val() 
            }
   })
ajaxTables.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                $('#tables-box').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Veri Tabanı Tabloları Bulunamamıştır...',
                                  'Veri tabanı tabloları bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#tables-box').loadImager('removeLoadImage');
         $('#dropdownTables').ddslick({
            height : 200,
            data : data, 
            width:'98%',
            selectText: "Select your preferred social network",
            //showSelectedHTML : false,
            defaultSelectedIndex: 3,
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
                $('#tables-box').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Veri Tabanı Tabloları Bulunamamıştır...',
                                  'Veri tabanı tabloları bulunamamıştır...');
     },
}) 
ajaxTables.ajaxCallWidget('call');


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



var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});
                                            
/**
 * operation insert form validation engine attached to work
 * @since 01/08/2016
 */
$('#operationForm').validationEngine();

 /**
* reset button function for operation insert form
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 02/08/2016
*/
window.resetOperationsForm = function () {
   $('#operationForm').validationEngine('hide');
   return false;
}
                                            
// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

    
/**
 * wrapper class for pop up and delete operation ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 02/08/2016
 */
window.deleteOperationUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteOperationUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Sistem Operasyon Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Sistem operasyonu silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete operation
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 02/08/2016
*/
window.deleteOperationUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysOperationTypesRrp' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Sistem Operasyon Silme İşlemi Başarısız...',
                                     'Sistem operasyonu silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysOperationTypesRrp" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    loaderGridBlock.loadImager('removeLoadImage');
                    
                    $('#tt_grid_dynamic').datagrid('reload');
                    //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                }
            });
            sm.successMessage('show', 'Sistem Operasyon Silme İşleminiz Başarılı...',
                                      'Sistem operasyon  silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert operation
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 02/08/2016
 */
window.insertOperationsWrapper = function (e) {
 e.preventDefault();
 var ddDataRoles = $('#dropdownAssignments').data('ddslick');
 var ddDataTables = $('#dropdownTables').data('ddslick');
 
 if ($("#operationForm").validationEngine('validate')) {
     
     selectedResRolesTreeItem = $('#tt_tree_menu2').tree('getSelected');
     if(selectedResRolesTreeItem == null) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'ACL Rol Seçiniz', 'Lütfen ACL rol seçiniz!')
         return false;
     }
     
     selectedTreeItem = $('#tt_tree_services').tree('getSelected');
     if(selectedTreeItem == null) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Rest Servis Seçiniz', 'Lütfen rest servis seçiniz!')
         return false;
     }
     
     if(!ddDataRoles.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Atama Seçiniz', 'Lütfen atama  seçiniz!');
         return false;
     }
     
     if(!ddDataTables.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Veri Tabanı Tablosu Seçiniz', 'Lütfen veri tabanı tablosu  seçiniz!');
         return false;
     }
     insertOperation();
 }
 return false;
}
   
/**
 * insert Operation
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 02/08/2016
 */
window.insertOperation = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var operation_name = $('#name').val();
     var operation_name_eng = $('#name_eng').val();
     var description = $('#description').val();
     var description_eng = $('#description_eng').val();
     
     var ddDataRole = $('#dropdownAssignments').data('ddslick')
     var assign_definition_id = ddDataRole.selectedData.value;
     
    var ddDataTables = $('#dropdownTables').data('ddslick')
    var table_oid = ddDataTables.selectedData.value;
    
    var selectedTreeItem = $('#tt_tree_services').tree('getSelected');
    var rrp_restservice_id = selectedTreeItem.attributes.rrp_restservice_id;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysOperationTypesRrp' ,
                         operation_name : operation_name,
                         rrp_restservice_id : rrp_restservice_id,
                         table_oid : table_oid,
                         assign_definition_id : assign_definition_id,
                         operation_name_eng : operation_name_eng,
                         description : description,
                         description_eng : description_eng,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Operasyon  Ekleme İşlemi Başarısız...', 
                                       'Operasyon  ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysOperationTypesRrp" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#operationForm')[0].reset();  

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillOperationTypesRrpList_sysOperationTypesRrp',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Operasyon  Kayıt İşlemi Başarılı...', 
                                       'Operasyon  kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Operasyon Kayıt İşlemi Başarısız...', 
                                       'Operasyon kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysOperationTypesRrp" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Operasyon Kayıt İşlemi Başarısız...', 
                                     'Operasyon kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysOperationTypesRrp" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#operationForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Operasyon Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile operasyon kaydı yapılmıştır, yeni bir operasyon deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}   
   
/**
 * wrapper for operation update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 02/08/2016
 */
window.updateOperationDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" Sistem Operasyonunu güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="operationFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Operasyon</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.name+'" name="name_popup" id="name_popup"   />\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Operasyon İng.</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.name_eng+'" name="name_eng_popup" id="name_eng_popup"   />\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Mevcut Resource  ve Bağlı Roller</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group" id="loading-image-resources-roles-popup">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <ul id="tt_tree_menu2_popup" class="easyui-tree" ></ul>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Rest Servisler</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group" id="nonAttachedTreePopup">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <ul id="tt_tree_services_popup" class="easyui-tree" ></ul>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Atamalar</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group" id="dropdown-assignments-popup">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownAssignmentsPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Veri Tabanı Tablosu</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group" id="tables-box-popup">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownTablesPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Açıklama</label>\n\
                                                             <div  class="col-sm-10">\n\
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
                                                             <div  class="col-sm-10">\n\
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
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateOperationWrapper(event, '+id+');">\n\
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
            $('#operationFormPopup').validationEngine();
             
            $("#dropdown-assignments-popup").loadImager();
            $("#dropdown-assignments-popup").loadImager('appendImage');
            
            $("#tables-box-popup").loadImager();
            $("#tables-box-popup").loadImager('appendImage');
            
            $("#nonAttachedTreePopup").loadImager();
            $("#nonAttachedTreePopup").loadImager('appendImage');
            
            $("#loading-image-resources-roles-popup").loadImager();
            $("#loading-image-resources-roles-popup").loadImager('appendImage');
            
            /**
             * rest services tree
             */
            $('#tt_tree_services_popup').tree({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillRestServicesOfPrivilegesTree_sysAclRrpRestservices&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val()+ '',
                method: 'get',
                animate: true,
                checkbox: false,
                cascadeCheck: false,
                lines: true,
                onLoadSuccess: function (node, data) {
                    $("#nonAttachedTreePopup").loadImager('removeLoadImage');
                    var serviceGroupNode = $('#tt_tree_services_popup').tree('find', parseInt(row.services_group_id));
                    if(serviceGroupNode != null) {
                        $('#tt_tree_services_popup').tree('expand', serviceGroupNode.target);  
                    }
                    
                    

                 },
                 onExpand: function (node, data) {
                    if(node.id == row.services_group_id) { 
                       var serviceNode = $('#tt_tree_services_popup').tree('find', parseInt(row.restservices_id));
                        if(serviceNode!= null) {
                            $('#tt_tree_services_popup').tree('select', serviceNode.target); 
                        }
                    }
                 },
                onSelect: function(node) { 
                    var self = $(this);
                    if(!self.tree('isLeaf', node.target)) {
                        wm.warningMessage( {
                            onShown : function (event ,data ) {
                               self.tree('unselect', node.target); 
                            }
                        });
                        wm.warningMessage('show','Servis Seçiniz',
                                                 'Lütfen servis grubu altından tekil servis seçiniz...');
                    }
                },
            }); 
            
            /**
             * resource /roles tree
             */
            $('#tt_tree_menu2_popup').tree({  
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillResourceGroups_sysAclResources&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
                method: 'get',
                animate: true,
                checkbox: false,
                cascadeCheck: false,
                lines: true,
                onLoadSuccess: function (node, data) {
                    $("#loading-image-resources-roles-popup").loadImager('removeLoadImage');
                    var resourceNode = $('#tt_tree_menu2_popup').tree('find', parseInt(row.resource_id));
                    if(resourceNode != null) {
                        $('#tt_tree_menu2_popup').tree('expand', resourceNode.target); 
                    }
                },
                onExpand: function (node) {
                    console.log(node);
                    if(node.id == row.resource_id) {
                        var serviceNode = $('#tt_tree_menu2_popup').tree('find', parseInt(row.role_id));
                        if(serviceNode != null) {
                            $('#tt_tree_menu2_popup').tree('select', serviceNode.target); 
                        }
                    }
                    
                 },
                onSelect: function(node) { 
                    var self = $(this);
                    if(!self.tree('isLeaf', node.target)) {
                        wm.warningMessage( {
                            onShown : function (event ,data ) {
                               self.tree('unselect', node.target); 
                            }
                        });
                        wm.warningMessage('show','ACL Rol Seçiniz',
                                                 'Lütfen ACL Resource altından tekil ACL Rol seçiniz...');
                    } else {
                        $("#nonAttachedTreePopup").loadImager('appendImage');
                        $('#tt_tree_services_popup').tree({
                            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillRestServicesOfPrivilegesTree_sysAclRrpRestservices&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val()+ '&role_id='+node.id+'&resource_id='+node.resource_id,
                        });
                    }
                },

            });
            
            
            /**
             * assignments dropdown
             * @type @call;$@call;ajaxCallWidget
             */
            var ajaxRolesPopup = $("#dropdownAssignmentsPopup").ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'pkFillAssignDefinitionRolesDdList_sysAssignDefinitionRoles' ,
                                pk : $("#pk").val() 
                        }
           })
            ajaxRolesPopup.ajaxCallWidget ({
                onError : function (event, textStatus,errorThrown) {
                    dm.dangerMessage({
                       onShown : function() {
                           $('#dropdown-assignments-popup').loadImager('removeLoadImage'); 
                       }
                    });
                    dm.dangerMessage('show', 'ACL Rol Bulunamamıştır...',
                                             'ACL rol bulunamamıştır...');
                },
                onSuccess : function (event, data) {
                    var data = $.parseJSON(data);
                        $('#dropdown-assignments-popup').loadImager('removeLoadImage');
                        $('#dropdownAssignmentsPopup').ddslick({
                                height : 200,
                                data : data, 
                                width:'98%',
                                search : true,
                                //imagePosition:"right",
                                onSelected: function(selectedData){
                                    if(selectedData.selectedData.value>0) {
                                    }
                                }   
                        });  
                        $('#dropdownAssignmentsPopup').ddslick('selectByValue', 
                                                    {index: ''+row.assign_definition_id+''}
                                                    );
                    },
                    onErrorDataNull : function (event, data) {
                         dm.dangerMessage({
                            onShown : function() {
                                //$('#dropdown-assignments-popup').loadImager('removeLoadImage'); 
                            }
                         });
                         dm.dangerMessage('show', 'ACL Rol Bulunamamıştır...',
                                                  'ACL rol bulunamamıştır...');
                     },
                }) 
            ajaxRolesPopup.ajaxCallWidget('call');
            
            
            /**
             * database tables dropdown
             * @type @call;$@call;ajaxCallWidget|@call;$@call;ajaxCallWidget|@call;$@call;ajaxCallWidget
             */
            var ajaxTablesPopup = $("#tables-box-popup").ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'pkFillInfoTablesDdList_pgClass' ,
                                pk : $("#pk").val() 
                        }
           })
            ajaxTablesPopup.ajaxCallWidget ({
                onError : function (event, textStatus,errorThrown) {
                    dm.dangerMessage({
                       onShown : function() {
                           //$('#mach-prod-box').loadImager('removeLoadImage'); 
                       }
                    });
                    dm.dangerMessage('show', 'Veri Tabanı Tablosu Bulunamamıştır...',
                                             'Veri tabanı tablosu bulunamamıştır...');
                },
                onSuccess : function (event, data) {
                    var data = $.parseJSON(data);
                        $('#tables-box-popup').loadImager('removeLoadImage');
                        $('#dropdownTablesPopup').ddslick({
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
                        $('#dropdownTablesPopup').ddslick('selectByValue', 
                                                    {index: ''+row.table_oid+''}
                                                    );
                    },
                    onErrorDataNull : function (event, data) {
                         dm.dangerMessage({
                            onShown : function() {
                                //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                            }
                         });
                         dm.dangerMessage('show', 'Veri Tabanı Tablosu Bulunamamıştır...',
                                                  'Veri tabanı tablosu bulunamamıştır...');
                     },
                }) 
            ajaxTablesPopup.ajaxCallWidget('call');
            
            
         },
         onhide : function() {
             if(window.gridReloadController == true) {
                 //$('#tt_grid_dynamic').datagrid('reload');
             }

         },
     });
     return false;
}

/**
 * update Operation wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 02/08/2016
 */
window.updateOperationWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#operationFormPopup").validationEngine('validate')) {
     
    var ddDataAssignments = $('#dropdownAssignmentsPopup').data('ddslick');
    var ddDataTables = $('#dropdownTablesPopup').data('ddslick');
    
    selectedRoleTreePopup = $('#tt_tree_menu2_popup').tree('getSelected');
     if(selectedRoleTreePopup == null) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'ACL Rol Seçiniz', 'Lütfen ACL rol seçiniz!')
         return false;
     }
    
    
    selectedTreeItemPopup = $('#tt_tree_services_popup').tree('getSelected');
     if(selectedTreeItemPopup == null) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Rest Servis Seçiniz', 'Lütfen rest servis seçiniz!')
         return false;
     }
     
    if(!ddDataAssignments.selectedData.value>0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Atama Seçiniz', 'Lütfen atama seçiniz!');
        return false;
    } 
    
    if(!ddDataTables.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Veri Tabanı Tablosu Seçiniz', 'Lütfen veri tabanı tablosu  seçiniz!');
         return false;
     }
     
     
     
    
    updateOperation(id);
    return false;
    
 }
 return false;
}

/**
 * update operation
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 02/08/2016
 */
window.updateOperation = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var name = $('#name_popup').val();
     var name_tr = $('#name_eng_popup').val();
     var description = $('#description_popup').val();
     var description_eng = $('#description_eng_popup').val();
     
     var ddDataAssignments = $('#dropdownAssignmentsPopup').data('ddslick');
     var assign_definition_id = ddDataAssignments.selectedData.value;
     
     var ddDataTable = $('#dropdownTablesPopup').data('ddslick');
     var table_oid = ddDataTable.selectedData.value;
     
    var selectedTreeItem = $('#tt_tree_services_popup').tree('getSelected');
    var rrp_restservice_id = selectedTreeItem.attributes.rrp_restservice_id;
    
    var selectedResRolesTreeItem = $('#tt_tree_menu2_popup').tree('getSelected');
    var role_id = selectedResRolesTreeItem.id;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysOperationTypesRrp' ,
                         pk : $("#pk").val(),
                         id : id,
                         rrp_restservice_id : rrp_restservice_id,
                         table_oid : table_oid,
                         assign_definition_id : assign_definition_id,
                         operation_name : $('#name_popup').val(),
                         operation_name_eng : $('#name_eng_popup').val(),
                         description : $('#description_popup').val(),
                         description_eng: $('#description_eng_popup').val(),
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Operasyon Güncelleme İşlemi Başarısız...', 
                                      'Operasyon güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysOperationTypesRrp" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Operasyon Güncelleme İşlemi Başarılı...', 
                                       'Operasyon güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Operasyon Güncelleme İşlemi Başarısız...', 
                                      'Operasyon güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysOperationTypesRrp" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Operasyon Güncelleme İşlemi Başarısız...', 
                                      'Operasyon güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * active/passive operation
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 02/08/2016
 */
window.activePassiveOperationsWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveOperation(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Operasyon Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Operasyon aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive operation
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 02/08/2016
 */
window.activePassiveOperation = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysOperationTypesRrp' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Operasyon Rol Aktif/Pasif İşlemi Başarısız...', 
                                      'Operasyon aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAclRoles" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Operasyon Aktif/Pasif İşlemi Başarılı...', 
                                       'Operasyon aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Operasyon Aktif/Pasif İşlemi Başarısız...', 
                                      'Operasyon aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysOperationTypesRrp" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Operasyon Aktif/Pasif İşlemi Başarısız...', 
                                      'Operasyon aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
