$(document).ready(function () {


/**
 * Rest Services datagrid is being filled
 * @since 27/07/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillRestServicesList_sysAclRestservices',
            sort : 'id',
            order : 'desc',
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
            {field:'name',title:'Servis',sortable:true,width:300},
            {field:'services_groups_name',title:'Servis Tip',sortable:true,width:300},
            {field:'description',title:'Açıklama',sortable:true,width:200},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveServicesWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveServicesWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteServiceUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateServiceDialog('+row.id+', { name : \''+row.name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                       description : \''+row.description+'\',\n\
                                                                                                                                                                       services_group_id : '+row.services_group_id+',\n\
                                                                                                                                                                       services_groups_name : \''+row.services_groups_name+'\',\n\
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
* @Since 27/07/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for Service 
* Types dropdown. Loading image will be removed when dropdown filled data.
*/
$("#mach-prod-box").loadImager();
$("#mach-prod-box").loadImager('appendImage');

/**
 * Service Types dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 27/07/2016
 */
var ajaxACLResources = $(window).ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillServicesGroupsDdList_sysServicesGroups' ,
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
         dm.dangerMessage('show', 'Servis Tip Bulunamamıştır...',
                                  'Servis tip  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#mach-prod-box').loadImager('removeLoadImage');
         $('#dropdownServiceTypes').ddslick({
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
         dm.dangerMessage('show', 'Servis Tip Bulunamamıştır...',
                                  'Servis tip  bulunamamıştır...');
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
 * Rest Service insert form validation engine attached to work
 * @since 27/07/2016
 */
$('#serviceForm').validationEngine();

 /**
* reset button function for Rest service insert form
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 27/07/2016
*/
window.resetServicesForm = function () {
   $('#serviceForm').validationEngine('hide');
   return false;
}
                                            

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

    
/**
 * wrapper class for pop up and delete Rest Service ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 27/07/2016
 */
window.deleteServiceUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteServiceUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Rest Servis Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Rest servis silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
  
  
 /**
  * Rest Service is being deleted with related data (brute delete)
  * @param {type} id
  * @param {type} index
  * @returns {undefined}
  * @author Mustafa Zeynel Dağlı
  * @since 27/07/2016
  */
 window.deleteServiceUltimatelyBruteForce = function(id, index) {
     var ajDeleteAllWithRelatedData = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDeleteAct_sysAclRestservices' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAllWithRelatedData.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Rest Servis  Silme İşlemi Başarısız...',
                                     'Rest servis  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDeleteact_sysAclRestservices" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Rest Servis Ve ilgili Data Silme İşleminiz Başarılı...',
                                      'Rest servis  silme işleminiz sildiğiniz veri ile ilgili datalarla beraber silinmiştir...')
        },  
    });
    ajDeleteAllWithRelatedData.ajaxCall('call');
 }
  
/**
* delete Rest service
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 27/07/2016
*/
window.deleteServiceUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysAclRestservices' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Rest Servis  Silme İşlemi Başarısız...',
                                     'Rest servis  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysAclRestservices" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    loaderGridBlock.loadImager('removeLoadImage');
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Rest Servis Silme İşleminiz Başarılı...',
                                      'Rest servis  silme işleminiz başarılı...')
        },  
        onError23503 : function (event, data) {
            wcm.warningComplexMessage('resetOnShown');
            wcm.warningComplexMessage({onConfirm : function(event, data) {
                deleteServiceUltimatelyBruteForce(id, index);
            }
            });
            wcm.warningComplexMessage('show', 'Silme İşlemine Devam Etmek İstiyor musunuz?', 
                                              'Servis\'e  bağlı veri tanımlandığı için silme işlemi bağlı veriyide etkileyecektir.\n\
                                  Yinede silme işlemine devam etmek istiyormusunuz? ');
            loaderGridBlock.loadImager('removeLoadImage');
        }
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert Rest Service
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 27/07/2016
 */
window.insertServicesWrapper = function (e) {
 e.preventDefault();
 var ddData = $('#dropdownServiceTypes').data('ddslick');
 
 if ($("#serviceForm").validationEngine('validate')) {
     
     if(!ddData.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Servis Tipi Seçiniz', 'Lütfen servis tipi seçiniz!');
         return false;
     }
     insertService();
 }
 return false;
}
   
   
   
/**
 * wrapper for Rest service update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 27/07/2016
 */
window.updateServiceDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" Servisini güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="serviceFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Servis Adı</label>\n\
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
                                                         <label class="col-sm-2 control-label">Servis Tipleri</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group" id="mach-prod-box-popup">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div id="dropdownServiceTypesPopup" ></div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Açıklama</label>\n\
                                                             <div  class="col-sm-10">\n\
                                                                 <div class="input-group" >\n\
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
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateServiceWrapper(event, '+id+');">\n\
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
            $('#serviceFormPopup').validationEngine();
             
            $("#mach-prod-box-popup").loadImager();
            $("#mach-prod-box-popup").loadImager('appendImage');
            
            var ajaxACLResourcesPopup = $(window).ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: { url:'pkFillServicesGroupsDdList_sysServicesGroups' ,
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
                dm.dangerMessage('show', 'Servis Tipi Bulunamamıştır...',
                                         'Servis tipi bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                    $('#mach-prod-box-popup').loadImager('removeLoadImage');
                    $('#dropdownServiceTypesPopup').ddslick({
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
                    $('#dropdownServiceTypesPopup').ddslick('selectByValue', 
                                                {index: ''+row.services_group_id+'' ,
                                                 text : ''+row.services_groups_name+''}
                                                );
                },
                onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'Servis Tipi Bulunamamıştır...',
                                              'Servis tipi bulunamamıştır...');
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
 * update Rest service wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 27/07/2016
 */
window.updateServiceWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#serviceFormPopup").validationEngine('validate')) {
     
     var ddData = $('#dropdownServiceTypesPopup').data('ddslick');
    if(ddData.selectedData.value>0) {
        updateService(id);
    } else {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Servis Tipi Seçiniz', 'Lütfen Servis tipi seçiniz!')
    }
    return false;
 }
 return false;
}

/**
 * update Rest Service
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 27/07/2016
 */
window.updateService = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var ddData = $('#dropdownServiceTypesPopup').data('ddslick');
     var services_group_id = ddData.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysAclRestservices' ,
                         id : id,
                         name : $('#name_popup').val(),
                         services_group_id : services_group_id,
                         description : $('#description_popup').val(),
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Güncelleme İşlemi Başarısız...', 
                                      'Rest Servis güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclRestservices" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Rest Servis Güncelleme İşlemi Başarılı...', 
                                       'Rest servis güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Güncelleme İşlemi Başarısız...', 
                                      'Rest servis güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclRestservices" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Güncelleme İşlemi Başarısız...', 
                                      'Rest servis güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert Rest Service
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 27/07/2016
 */
window.insertService = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var name = $('#name').val();
     var description = $('#description').val();
     
     var ddData = $('#dropdownServiceTypes').data('ddslick')
     var services_group_id = ddData.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysAclRestservices' ,
                         name : name,
                         description : description,
                         services_group_id : services_group_id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Rest Servis  Ekleme İşlemi Başarısız...', 
                                       'Rest servis ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysAclRestservices" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#serviceForm')[0].reset();  
                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillRestServicesList_sysAclRestservices',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Rest Servis Kayıt İşlemi Başarılı...', 
                                       'Rest servis kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Rest Servis Kayıt İşlemi Başarısız...', 
                                       'Rest servis  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysAclRestservices" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis  Kayıt İşlemi Başarısız...', 
                                     'Rest servis  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysAclRestservices" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#serviceForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Rest Servis Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile Rest servis kaydı yapılmıştır, yeni bir servis deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive Rest service wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 27/07/2016
 */
window.activePassiveServicesWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveService(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Rest Servis Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Rest servis aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive Rest Service
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 27/07/2016
 */
window.activePassiveService = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysAclRestservices' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Aktif/Pasif İşlemi Başarısız...', 
                                      'Rest servis aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAclRestservices" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Rest Servis Aktif/Pasif İşlemi Başarılı...', 
                                       'Rest servis aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Rest Servis Aktif/Pasif İşlemi Başarısız...', 
                                      'Rest servis aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAclRestservices" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Aktif/Pasif İşlemi Başarısız...', 
                                      'Rest servis aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
