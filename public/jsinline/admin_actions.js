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
 * ACL privileges datagrid is being filled
 * @since 14/07/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillActionList_sysAclActions',
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
            {field:'name',title:'Action',sortable:true,width:300},
            {field:'module_name',title:'Modül',sortable:true,width:300},
            {field:'description',title:'Açıklama',sortable:true,width:200},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveActionsWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveActionsWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteActionUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateActionDialog('+row.id+', { name : \''+row.name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                       description : \''+row.description+'\',\n\
                                                                                                                                                                       module_id : '+row.module_id+',\n\
                                                                                                                                                                       role_ids : '+row.role_ids+',\n\
                                                                                                                                                                       module_name : \''+row.module_name+'\',\n\
                                                                                                                                                                       } );"><i class="fa fa-arrow-circle-up"></i></button>';
                    return e+d+u;    
                }
            },
        ]]   
});
$('#tt_grid_dynamic').datagrid('enableFilter');


 /*
* 
* @type @call;$@call;loadImager
* @Since 26/07/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for Zend Modules
*  dropdown. Loading image will be removed when dropdown filled data.
*/
$("#mach-prod-box").loadImager();
$("#mach-prod-box").loadImager('appendImage');

/**
 * loading image for roles dropdown
 * @author Mustafa Zeynel Dağlı
 * @since 11/08/2016
 */
$("#loading-image-roles").loadImager();
$("#loading-image-roles").loadImager('appendImage');


/**
 * Zend Modules dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 26/07/2016
 */
var ajaxACLResources = $('#mach-prod-box').ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillModulesDdList_sysAclModules' ,
                    pk : $("#pk").val() 
            }
   })
ajaxACLResources.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                $('#mach-prod-box').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Zend Modül  Bulunamamıştır...',
                                  'Sistemde kayıtlı Zend modül  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#mach-prod-box').loadImager('removeLoadImage');
         $('#dropdownModules').ddslick({
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
                $('#mach-prod-box').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Zend Modül Bulunamamıştır...',
                                  'Zend modül  bulunamamıştır...');
     },
}) 
ajaxACLResources.ajaxCallWidget('call');


/**
 * Roles dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 11/08/2016
 */
var ajaxACLResources = $('#loading-image-roles').ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillRolesDdlist_sysAclRoles' ,
                    pk : $("#pk").val() 
            }
   })
ajaxACLResources.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                $('#loading-image-roles').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Rol Bulunamamıştır...',
                                  'Rol  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#loading-image-roles').loadImager('removeLoadImage');
         $('#dropdownRoles').ddslick({
            height : 200,
            data : data, 
            width:'98%',
            selectText: "Select your preferred social network",
            //showSelectedHTML : false,
            defaultSelectedIndex: 3,
            search : true,
            multiSelect : true,
            tagBox : 'tag-container',
            //multiSelectTagID : 'deneme',
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
                $('#loading-image-roles').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Rol Bulunamamıştır...',
                                  'Rol  bulunamamıştır...');
     },
}) 
ajaxACLResources.ajaxCallWidget('call');


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
 * Zend Module-Action insert form validation engine attached to work
 * @since 26/07/2016
 */
$('#actionsForm').validationEngine();

 /**
* reset button function for Zned Module-Action insert form
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 26/07/2016
*/
window.resetActionsForm = function () {
   $('#actionsForm').validationEngine('hide');
   return false;
}

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

    
/**
 * wrapper class for pop up and delete Zend Module-Action ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.deleteActionUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteActionUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Zend Action Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Zend action silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
 
 /**
  * delete action with related data upon user approval
  * @param {type} id
  * @param {type} index
  * @returns {undefined}
  * @author Mustafa Zeynel Dağlı
  * @since 27/07/2016
  */
 window.deleteActionUltimatelyWithRelatedData = function (id, index) {
      var ajDeleteAllWithRelatedData = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDeleteAct_sysAclActions' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAllWithRelatedData.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Zend Action  Silme İşlemi Başarısız...',
                                     'Zend action  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysAclActions" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Zend Action Silme İşleminiz Başarılı...',
                                      'Zend action ilgili tüm datalarla beraber silinmiştir,  silme işleminiz başarılı...')
        }, 
       
    });
    ajDeleteAllWithRelatedData.ajaxCall('call');
 }
 
 
/**
* delete Zend Module-Action
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 26/07/2016
*/
window.deleteActionUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysAclActions' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Zend Action  Silme İşlemi Başarısız...',
                                     'Zend action  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysAclActions" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    loaderGridBlock.loadImager('removeLoadImage');
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Zend Action Silme İşleminiz Başarılı...',
                                      'Zend action  silme işleminiz başarılı...')
        }, 
        onError23503 : function (event, data) {
            /*wcm.warningComplexMessage('resetOnShown');
            wcm.warningComplexMessage({onConfirm : function(event, data) {
                deleteActionUltimatelyWithRelatedData(id, index);
            }
            });
            wcm.warningComplexMessage('show', 'Silme İşlemine Devam Etmek İstiyormusunuz?', 
                                              'Action  bağlı Menü Tipi tanımlandığı için silme işlemi bağlı veriyide etkileyecektir.\n\
                                  Yinede silme işlemine devam etmek istiyormusunuz? ');*/
            
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Silme İşlemi Gerçekleştiremezsiniz!', 'Action  Servis tanımlandığı için silme işlemi\n\
                               gerçekleştiremezsiniz, önce Action ile ilişkili Servis silinmelidir!');
            loaderGridBlock.loadImager('removeLoadImage');
        }
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert Zend Module-Action
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 * @version 11/08/2016
 */
window.insertActionsWrapper = function (e) {
 e.preventDefault();
 
 
 if ($("#actionsForm").validationEngine('validate')) {
     
    
    var ddData = $('#dropdownModules').data('ddslick');
    if(!ddData.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Zend MVC Modül Seçiniz', 'Lütfen modül seçiniz!');
         return false;
    }
    
    var ddDataRoles = $('#dropdownRoles').data('ddslick');
    var multiSelectedRoles = $('#dropdownRoles').ddslick('selectedValues',
                                                                {id: ''+ddDataRoles.settings.multiSelectTagID+'' 
                                                                });
    
    if(multiSelectedRoles.length == 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Rol Seçiniz', 'Lütfen rol seçiniz!');
         return false;
     }
    
    insertAction();
 }
 return false;
}
   
   
   
/**
 * wrapper for Zend Module-Action update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 * @version 11/08/2016
 */
window.updateActionDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" Zend Module-Action güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="actionsFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Action</label>\n\
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
                                                            <label class="col-sm-2 control-label">Zend Modül</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownModulesPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Rol</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div id="loading-image-role-popup" class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownRolesPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Açıklama</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
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
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateActionWrapper(event, '+id+');">\n\
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
            $('#actionsFormPopup').validationEngine();
             
            $("#mach-prod-box-popup").loadImager();
            $("#mach-prod-box-popup").loadImager('appendImage');
            
            $("#loading-image-role-popup").loadImager();
            $("#loading-image-role-popup").loadImager('appendImage');
            
            
            var ajaxACLResourcesPopup = $('#mach-prod-box-popup').ajaxCallWidget({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'pkFillModulesDdList_sysAclModules' ,
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
                    dm.dangerMessage('show', 'Zend Modül Bulunamamıştır...',
                                             'Zend modül bulunamamıştır...');
                },
                onSuccess : function (event, data) {
                    var data = $.parseJSON(data);
                        $('#mach-prod-box-popup').loadImager('removeLoadImage');
                        $('#dropdownModulesPopup').ddslick({
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
                        $('#dropdownModulesPopup').ddslick('selectByValue', 
                                                    {index: ''+row.module_id+'' ,
                                                     text : ''+row.module_name+''}
                                                    );
                    },
                    onErrorDataNull : function (event, data) {
                         dm.dangerMessage({
                            onShown : function() {
                                //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                            }
                         });
                         dm.dangerMessage('show', 'Zend Modül Bulunamamıştır...',
                                                  'Zend modül bulunamamıştır...');
                     },
                }) 
            ajaxACLResourcesPopup.ajaxCallWidget('call');
            
            var ajaxRolesPopup = $('#loading-image-role-popup').ajaxCallWidget({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'pkFillRolesDdlist_sysAclRoles' ,
                                pk : $("#pk").val() 
                        }
           })
            ajaxRolesPopup.ajaxCallWidget ({
                onError : function (event, textStatus,errorThrown) {
                    dm.dangerMessage({
                       onShown : function() {
                           //$('#mach-prod-box').loadImager('removeLoadImage'); 
                       }
                    });
                    dm.dangerMessage('show', 'Rol Bulunamamıştır...',
                                             'Rol bulunamamıştır...');
                },
                onSuccess : function (event, data) {
                    var data = $.parseJSON(data);
                        $('#loading-image-role-popup').loadImager('removeLoadImage');
                        $('#dropdownRolesPopup').ddslick({
                                height : 200,
                                data : data, 
                                width:'98%',
                                search : true,
                                multiSelect : true,
                                multiSelectTagID : 'rolesTag',
                                tagBox : 'tag-container-pop',
                                //imagePosition:"right",
                                onSelected: function(selectedData){
                                    if(selectedData.selectedData.value>0) {
                                 }
                             }   
                        }); 
                        
                        ddData = $('#dropdownRolesPopup').data('ddslick');
                        //var resources ='[{"id" : "23", "text" : "test"}, {"id" :"34", "text" : "test2"}]';
                        var multiSelectTagID = $('#dropdownRolesPopup').ddslick('getMultiSelectTagID');
                        var tagBox = $('#dropdownRolesPopup').ddslick('getTagBox');
                        $('#dropdownRolesPopup').ddslick('selectByMultiValues', 
                                                    {
                                                    id : multiSelectTagID,
                                                    tagBox : ''+tagBox+''},
                                                     data,
                                                     row.role_ids
                                                    );
                    },
                    onErrorDataNull : function (event, data) {
                         dm.dangerMessage({
                            onShown : function() {
                                //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                            }
                         });
                         dm.dangerMessage('show', 'Rol Bulunamamıştır...',
                                                  'Rol bulunamamıştır...');
                     },
                }) 
                ajaxRolesPopup.ajaxCallWidget('call');
            
            
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
 * update Zend Module-Action wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 * @version 11/08/2016
 */
window.updateActionWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#actionsFormPopup").validationEngine('validate')) {
     
    var ddData = $('#dropdownModulesPopup').data('ddslick');
    if(!ddData.selectedData.value>0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'ZEND Modül Seçiniz', 'Lütfen Zend modül seçiniz!');
        return false;
    } 
    
    var ddDataRolesPopup = $('#dropdownRolesPopup').data('ddslick');
    var multiSelectedRolesPopup = $('#dropdownRolesPopup').ddslick('selectedValues',
                                                                {id: ''+ddDataRolesPopup.settings.multiSelectTagID+'' 
                                                                });
    
    if(multiSelectedRolesPopup.length == 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Rol Seçiniz', 'Lütfen rol seçiniz!');
         return false;
    }
    updateAction(id);
    return false;
 }
 return false;
}

window.updateActionAct = function (id,role_ids, module_id) {
    var ajUpdateACT = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateAct_sysAclActions' ,
                         id : id,
                         name : $('#name_popup').val(),
                         description : $('#description_popup').val(),
                         module_id : module_id,
                         role_ids : role_ids,
                         pk : $("#pk").val()
                     }
    })
    ajUpdateACT.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Zend Action Güncelleme İşlemi Başarısız...', 
                                      'Zend action güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclActions" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Zend Action Güncelleme İşlemi Başarılı...', 
                                       'Zend action güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Zend Action Güncelleme İşlemi Başarısız...', 
                                      'Zend action güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclActions" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Zend Action Güncelleme İşlemi Başarısız...', 
                                      'Zend action güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
             
            },
          onError23505 : function (event, data) {
          }
    }) 
    ajUpdateACT.ajaxCall('call');
}

/**
 * update Zend Module-Action
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 * @version 11/08/2016
 */
window.updateAction = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var ddData = $('#dropdownModulesPopup').data('ddslick');
     var module_id = ddData.selectedData.value;
     
     var ddDataRolesPopup = $('#dropdownRolesPopup').data('ddslick');
     var multiSelectedValues = $('#dropdownRolesPopup').ddslick('selectedValues',
                                                                {id: ''+ddDataRolesPopup.settings.multiSelectTagID+'' 
                                                                });
     var rolesID = $.extend({}, multiSelectedValues);
     var role_ids = JSON.stringify(rolesID);
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysAclActions' ,
                         id : id,
                         name : $('#name_popup').val(),
                         description : $('#description_popup').val(),
                         module_id : module_id,
                         role_ids : role_ids,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Zend Action Güncelleme İşlemi Başarısız...', 
                                      'Zend action güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclActions" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Zend Action Güncelleme İşlemi Başarılı...', 
                                       'Zend action güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Zend Action Güncelleme İşlemi Başarısız...', 
                                      'Zend action güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclActions" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Zend Action Güncelleme İşlemi Başarısız...', 
                                      'Zend action güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
              if(data.errorInfoColumn == 'haveRecordsActionPrivilegRestServices') {
                  wm.warningMessage('resetOnShown');
                  wm.warningMessage('show', 'Silme İşlemi Gerçekleştiremezsiniz!', 'Action  bağlı servis tanımlandığı için silme işlemi\n\
                                   gerçekleştiremezsiniz, önce Action / Servis  ilişkisi silinmelidir!');
                  loader.loadImager('removeLoadImage');
              } else if(data.errorInfoColumn == 'haveRecordsAclPrivileg') {
                  wcm.warningComplexMessage({onConfirm : function(event, data) {
                        loader.loadImager('removeLoadImage');
                        window.updateActionAct(id, role_ids, module_id);
                  }
                  });
                  wcm.warningComplexMessage({onGiveup : function(event, data) {
                        loader.loadImager('removeLoadImage');
                  }
                  });
                  wcm.warningComplexMessage('show', 'Action Bağlı Yetkiler Bulunmaktadır!', 
                                                    'Action Bağlı Yetkiler Bulunmaktadır, güncelleme işlemi ile bu yetkilerde güncellenecektir, güncelleme işlemine devam etmek istediğinize emin misiniz? ');
                              }
                
        },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert Zend Module-Action
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 * @version 11/08/2016
 */
window.insertAction = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var name = $('#name').val();
     var description = $('#description').val();
     
     var ddData = $('#dropdownModules').data('ddslick')
     var module_id = ddData.selectedData.value;
     
     var ddDataRoles = $('#dropdownRoles').data('ddslick');
     var multiSelectedValues = $('#dropdownRoles').ddslick('selectedValues',
                                                                {id: ''+ddDataRoles.settings.multiSelectTagID+'' 
                                                                });
     var rolesID = $.extend({}, multiSelectedValues);
     var role_ids = JSON.stringify(rolesID);
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysAclActions' ,
                         name : name,
                         description : description,
                         module_id : module_id,
                         role_ids: role_ids, 
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Zend Action  Ekleme İşlemi Başarısız...', 
                                       'Zend Action ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysAclPrivilege" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#actionsForm')[0].reset();  

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillActionList_sysAclActions',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Zend Action Kayıt İşlemi Başarılı...', 
                                       'Zend cction kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Zend Action Kayıt İşlemi Başarısız...', 
                                       'Zend action  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysAclPrivilege" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Zend Action  Kayıt İşlemi Başarısız...', 
                                     'Zend action  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysAclRoles" servis hatası->'+data.errorInfo);
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#actionsForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Zend Action Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile Zend action  kaydı yapılmıştır, yeni bir action deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive Zend Module-Action
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.activePassiveActionsWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveAction(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Zend Action Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Zend action aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive Zend Module-Action
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.activePassiveAction = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysAclActions' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Zend Action Aktif/Pasif İşlemi Başarısız...', 
                                      'Zend action aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAclActions" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Zend Action Aktif/Pasif İşlemi Başarılı...', 
                                       'Zend action aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Zend Action Aktif/Pasif İşlemi Başarısız...', 
                                      'Zend action aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAclActions" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Zend Action Aktif/Pasif İşlemi Başarısız...', 
                                      'Zend action aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
