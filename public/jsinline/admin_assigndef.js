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
 * Assignment types datagrid is being filled
 * @since 01/08/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillAssignDefinitionList_sysAssignDefinition',
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
            {field:'name',title:'Atama Tipi',sortable:true,width:300},
            {field:'description',title:'Açıklama',sortable:true,width:200},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveAssignmentTypeWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveAssignmentTypeWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteAssignmentTypeUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateAssignmentTypeDialog('+row.id+', { name : \''+row.name+'\',\n\                                                                                                                   \n\
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
 * Assignment type insert form validation engine attached to work
 * @since 01/08/2016
 */
$('#assignmentTypeForm').validationEngine();

 /**
* reset button function for Assignment type insert form
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 01/08/2016
*/
window.resetAssignmentTypesForm = function () {
   $('#assignmentTypeForm').validationEngine('hide');
   return false;
}
                                                

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

    
/**
 * wrapper class for pop up and delete Assignment type ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
window.deleteAssignmentTypeUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteAssignmentTypeUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Atama Tipi Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Atama tipi silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete Assignment type
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 01/08/2016
*/
window.deleteAssignmentTypeUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysAssignDefinition' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Atama Tipi  Silme İşlemi Başarısız...',
                                     'Atama tipi  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysAssignDefinition" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    loaderGridBlock.loadImager('removeLoadImage');
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Atama Tipi Silme İşleminiz Başarılı...',
                                      'Atama tipi  silme işleminiz başarılı...')
        },  
        onError23503 : function (event, data) {
            wcm.warningComplexMessage('resetOnShown');
            wcm.warningComplexMessage({onConfirm : function(event, data) {
                deleteAssignmentTypeUltimatelyBruteForce(id, index);
            }
            });
            wcm.warningComplexMessage('show', 'Silme İşlemine Devam Etmek İstiyor musunuz?', 
                                              'Atama Tipine  bağlı veri tanımlandığı için silme işlemi bağlı veriyide etkileyecektir.\n\
                                  Yinede silme işlemine devam etmek istiyormusunuz? ');
            loaderGridBlock.loadImager('removeLoadImage');
        }
    });
    ajDeleteAll.ajaxCall('call');
}

 /**
  * Assignment Type is being deleted with related data (brute delete)
  * @param {type} id
  * @param {type} index
  * @returns {undefined}
  * @author Mustafa Zeynel Dağlı
  * @since 01/08/2016
  */
 window.deleteAssignmentTypeUltimatelyBruteForce = function(id, index) {
     var ajDeleteAllWithRelatedData = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDeleteAct_sysAssignDefinition' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAllWithRelatedData.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Atama Tipi Silme İşlemi Başarısız...',
                                     'Atama tipi silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDeleteAct_sysAssignDefinition" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Atama Tipi Ve ilgili Data Silme İşleminiz Başarılı...',
                                      'Atama tipi  silme işleminiz sildiğiniz veri ile ilgili datalarla beraber silinmiştir...')
        },  
    });
    ajDeleteAllWithRelatedData.ajaxCall('call');
 }
   
 
/**
 * insert Assignment type
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
window.insertAssignmentTypeWrapper = function (e) {
 e.preventDefault();
 
 if ($("#assignmentTypeForm").validationEngine('validate')) {
     insertAssignmentType();
 }
 return false;
}
   
   
   
/**
 * wrapper for Assignment type update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
window.updateAssignmentTypeDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" Atama Tipini güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="assignmentTypeFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Atama Tipi</label>\n\
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
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateAssignmentTypeWrapper(event, '+id+');">\n\
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
            $('#assignmentTypeFormPopup').validationEngine(); 
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
 * update assignmnet type wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
window.updateAssignmentTypeWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#assignmentTypeFormPopup").validationEngine('validate')) {
    updateAssignmnenType(id);
    return false;
 }
 return false;
}

/**
 * update Assignment type
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
window.updateAssignmnenType = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysAssignDefinition' ,
                         id : id,
                         name : $('#name_popup').val(),
                         description : $('#description_popup').val(),
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Atama Tipi Güncelleme İşlemi Başarısız...', 
                                      'Atama tipi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAssignDefinition" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Atama Tipi Güncelleme İşlemi Başarılı...', 
                                       'Atama tipi güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Atama Tipi Güncelleme İşlemi Başarısız...', 
                                      'Atama tipi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAssignDefinition" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Atama Tipi Güncelleme İşlemi Başarısız...', 
                                      'Atama tipi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert Assignment type
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
window.insertAssignmentType = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var name = $('#name').val();
     var description = $('#description').val();
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysAssignDefinition' ,
                         name : name,
                         description : description,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Atama Tipi  Ekleme İşlemi Başarısız...', 
                                       'Atama tipi ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysAssignDefinition" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#assignmentTypeForm')[0].reset();  

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillAssignDefinitionList_sysAssignDefinition',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Atama Tipi Kayıt İşlemi Başarılı...', 
                                       'Atama tipi kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Atama Tipi Kayıt İşlemi Başarısız...', 
                                       'Atama tipi  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysAssignDefinition" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Atama Tipi  Kayıt İşlemi Başarısız...', 
                                     'Atama tipi  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysAssignDefinition" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#assignmentTypeForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Atama Tipi Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile atama tipi  kaydı yapılmıştır, yeni bir atama tipi deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive Assignment type
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
window.activePassiveAssignmentTypeWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveAssignmentType(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Atama Tipi Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Atama tipi aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive Assignment type
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 01/08/2016
 */
window.activePassiveAssignmentType = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysAssignDefinition' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Atama Tipi Aktif/Pasif İşlemi Başarısız...', 
                                      'Atama tipi aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAssignDefinition" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Atama Tipi Aktif/Pasif İşlemi Başarılı...', 
                                       'Atama tipi aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Atama Tipi Aktif/Pasif İşlemi Başarısız...', 
                                      'Atama tipi aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysAssignDefinition" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Atama Tipi Aktif/Pasif İşlemi Başarısız...', 
                                      'Atama tipi aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
