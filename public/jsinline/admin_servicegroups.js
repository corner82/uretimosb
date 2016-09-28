$(document).ready(function () {


/**
 * Rest Service groups datagrid is being filled
 * @since 28/07/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillServicesGroupsList_sysServicesGroups',
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
            {field:'name',title:'Servis Grubu',sortable:true,width:300},
            {field:'description',title:'Açıklama',sortable:true,width:350},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveServiceGroupsWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveServiceGroupsWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteServiceGroupUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateServiceGroupDialog('+row.id+', { name : \''+row.name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                       description : \''+row.description+'\',\n\
                                                                                                                                                                       } );"><i class="fa fa-arrow-circle-up"></i></button>';
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


var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});
                                            
/**
 * Rest Service group insert form validation engine attached to work
 * @since 28/07/2016
 */
$('#serviceGroupForm').validationEngine();

 /**
* reset button function for Rest service group insert form
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 28/07/2016
*/
window.resetServiceGroupsForm = function () {
   $('#serviceGroupForm').validationEngine('hide');
   return false;
}
                                            

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

    
/**
 * wrapper class for pop up and delete Rest Service group ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.deleteServiceGroupUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteServiceGroupUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Rest Servis Grup Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Rest servis grup silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
  
  
 /**
  * Rest Service group is being deleted with related data (brute delete)
  * @param {type} id
  * @param {type} index
  * @returns {undefined}
  * @author Mustafa Zeynel Dağlı
  * @since 28/07/2016
  */
 window.deleteServiceGroupUltimatelyBruteForce = function(id, index) {
     var ajDeleteAllWithRelatedData = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDeleteAct_sysServicesGroups' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAllWithRelatedData.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Rest Servis Grup Silme İşlemi Başarısız...',
                                     'Rest servis grubu  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDeleteact_sysAclRestservices" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Rest Servis Grup Ve ilgili Data Silme İşleminiz Başarılı...',
                                      'Rest servis grup  silme işleminiz sildiğiniz veri ile ilgili datalarla beraber silinmiştir...')
        },  
    });
    ajDeleteAllWithRelatedData.ajaxCall('call');
 }
  
/**
* delete Rest service group
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 28/07/2016
*/
window.deleteServiceGroupUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysServicesGroups' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Rest Servis Grup  Silme İşlemi Başarısız...',
                                     'Rest servis grubu  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysServicesGroups" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    loaderGridBlock.loadImager('removeLoadImage');
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Rest Servis Grup Silme İşleminiz Başarılı...',
                                      'Rest servis grubu  silme işleminiz başarılı...')
        },  
        onError23503 : function (event, data) {
            wcm.warningComplexMessage('resetOnShown');
            wcm.warningComplexMessage({onConfirm : function(event, data) {
                deleteServiceGroupUltimatelyBruteForce(id, index);
            }
            });
            wcm.warningComplexMessage('show', 'Silme İşlemine Devam Etmek İstiyor musunuz?', 
                                              'Servis grubuna  bağlı veri tanımlandığı için silme işlemi bağlı veriyide etkileyecektir.\n\
                                  Yinede silme işlemine devam etmek istiyormusunuz? ');
            loaderGridBlock.loadImager('removeLoadImage');
        }
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert Rest Service group
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.insertServiceGroupsWrapper = function (e) {
 e.preventDefault();
 
 if ($("#serviceGroupForm").validationEngine('validate')) {
     insertServiceGroup();
 }
 return false;
}
   
   
   
/**
 * wrapper for Rest service group update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.updateServiceGroupDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" Servisi grubunu güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="serviceGroupFormPopup" method="get" class="form-horizontal">\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Servis Grubu</label>\n\
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
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateServiceGroupWrapper(event, '+id+');">\n\
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
            $('#serviceGroupFormPopup').validationEngine();
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
 * update Rest service group wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.updateServiceGroupWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#serviceGroupFormPopup").validationEngine('validate')) {
    updateServiceGroup(id);
    return false;
 }
 return false;
}

/**
 * update Rest Service Group
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.updateServiceGroup = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysServicesGroups' ,
                         id : id,
                         name : $('#name_popup').val(),
                         description : $('#description_popup').val(),
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Grup Güncelleme İşlemi Başarısız...', 
                                      'Rest Servis Grup güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysServicesGroups" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Rest Servis Grup Güncelleme İşlemi Başarılı...', 
                                       'Rest servis grup güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Grup Güncelleme İşlemi Başarısız...', 
                                      'Rest servis grup güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysServicesGroups" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Grup Güncelleme İşlemi Başarısız...', 
                                      'Rest servis grup güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert Rest Service Group
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.insertServiceGroup = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var name = $('#name').val();
     var description = $('#description').val();
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysServicesGroups' ,
                         name : name,
                         description : description,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Rest Servis Grup Ekleme İşlemi Başarısız...', 
                                       'Rest servis grup ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysServicesGroups" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#serviceGroupForm')[0].reset();  
                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillServicesGroupsList_sysServicesGroups',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Rest Servis Grup Kayıt İşlemi Başarılı...', 
                                       'Rest servis grup kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Rest Servis Grup Kayıt İşlemi Başarısız...', 
                                       'Rest servis grup  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysServicesGroups" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Grup  Kayıt İşlemi Başarısız...', 
                                     'Rest servis grup  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysServicesGroups" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#serviceGroupForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Rest Servis Grup Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile Rest servis grup kaydı yapılmıştır, yeni bir servis grubu deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive Rest service group wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.activePassiveServiceGroupsWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveServiceGroup(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Rest Servis Grup Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Rest servis  grup aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive Rest Service group
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.activePassiveServiceGroup = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysServicesGroups' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Grup Aktif/Pasif İşlemi Başarısız...', 
                                      'Rest servis grup aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysServicesGroups" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Rest Servis Grup Aktif/Pasif İşlemi Başarılı...', 
                                       'Rest servis grup aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Rest Servis Grup Aktif/Pasif İşlemi Başarısız...', 
                                      'Rest servis grup aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysServicesGroups" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Rest Servis Grup Aktif/Pasif İşlemi Başarısız...', 
                                      'Rest servis grup aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
