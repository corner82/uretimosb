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
 * Machine producers datagrid is being filled
 * @since 15/08/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillManufacturerListGrid_sysManufacturer',
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
            {field:'name',title:'Üretici',sortable:true,width:150},
            {field:'name_eng',title:'Üretici İng.',sortable:true,width:150},
            {field:'abbreviation',title:'Kısaltma',sortable:true,width:100},
            {field:'abbreviation_eng',title:'Kısaltma İng',sortable:true,width:100},
            {field:'description',title:'Açıklama',sortable:true, width:200},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveMacProducersWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveMacProducersWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteMacProducerUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateMacProducerDialog('+row.id+', { name : \''+row.name+'\',\n\
                                                                                                                                                                            name_eng : \''+row.name_eng+'\',\n\
                                                                                                                                                                            about : \''+row.about+'\',\n\
                                                                                                                                                                            about_eng : \''+row.about_eng+'\',\n\
                                                                                                                                                                            abbreviation : \''+row.abbreviation+'\',\n\
                                                                                                                                                                            abbreviation_eng : \''+row.abbreviation_eng+'\',\n\
                                                                                                                                                                            description : \''+row.description+'\',\n\                                                                                                 \n\
                                                                                                                                                                           description_eng : \''+row.description_eng+'\'} );"><i class="fa fa-arrow-circle-up"></i></button>';
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
 * machine producer insert form validation engine attached to work
 * @since 15/08/2016
 */
$('#macProducersForm').validationEngine();

 /**
* reset button function for machine producer insert form
* property insert
* for 'insert' and 'update' form buttons
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 15/08/2016
*/
window.resetMacProducersForm = function () {
   $('#macProducersForm').validationEngine('hide');
   return false;
}
                                            
// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

//Validation forms binded...
jQuery("#machinePropForm").validationEngine();
    
/**
 * wrapper class for pop up and delete machine producer ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 15/08/2016
 */
window.deleteMacProducerUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteMacProducerUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Makina Üreticisi Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Makina Üreticisi silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete machine producer
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 15/08/2016
*/
window.deleteMacProducerUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysManufacturer' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Makina Üreticisi Silme İşlemi Başarısız...',
                                     'Makina Üreticisi silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysAclResources" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    loaderGridBlock.loadImager('removeLoadImage');
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Makina Üreticisi Silme İşleminiz Başarılı...',
                                      'Makina Üreticisi silme işleminiz başarılı...')
        },
        onError23503: function (event, data) {
                wm.dangerMessage('resetOnShown');
                wm.dangerMessage('show', 'Makina Üreticisini silemezsiniz!',
                        'Makina üreticisi bir makina ile eşleştirildiği için üreticiyi silemezsiniz, \n\
                                    Öncelikle ilgili makinayı silmeniz gerekmektedir, '+data.errorInfoColumnCount+' makinanın\n\
                                    üreticiye bağlı olduğu görülüyor... ');
                loaderGridBlock.loadImager('removeLoadImage');

            },
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert machine producer
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 15/08/2016
 */
window.insertMacProducersWrapper = function (e) {
 e.preventDefault();
 if ($("#macProducersForm").validationEngine('validate')) {
     insertMacProducer();
 }
 return false;
}
   
   
   
/**
 * wrapper for machine producer update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 15/08/2016
 */
window.updateMacProducerDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" ACL kaynağını güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="macProducerFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Üretici</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  >\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.name+'" name="name_popup" id="name_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Üretici İng.</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  >\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.name_eng+'" name="name_eng_popup" id="name_eng_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Kısaltma Kodu</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  >\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.abbreviation+'" name="abbreviation_popup" id="abbreviation_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Kısaltma Kodu İng.</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  >\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.abbreviation_eng+'" name="abbreviation_eng_popup" id="abbreviation_eng_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Hakkında</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control " rows="3" name="about_popup" id="about_popup" placeholder="Hakkında...">'+row.about+'</textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Hakkında İng</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control " rows="3" name="about_eng_popup" id="about_eng_popup" placeholder="Hakkında İng...">'+row.about_eng+'</textarea>\n\
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
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control " rows="3" name="description_popup" id="description_popup" placeholder="Açıklama ...">'+row.description+'</textarea>\n\
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
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control " rows="3" name="description_eng_popup" id="description_eng_popup" placeholder="Açıklama İng...">'+row.description_eng+'</textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateMacProducerWrapper(event, '+id+');">\n\
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
            $('#macProducerFormPopup').validationEngine();
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
 * update machine producer wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 15/08/2016
 */
window.updateMacProducerWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#macProducerFormPopup").validationEngine('validate')) {   
    updateMacProducer(id);
    return false;
 }
 return false;
}

/**
 * update machine producer
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 15/08/2016
 */
window.updateMacProducer = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var name_popup = $('#name_popup').val();
     var name_eng_popup = $('#name_eng_popup').val();
     
     var abbreviation_popup = $('#abbreviation_popup').val();
     var abbreviation_eng_popup = $('#abbreviation_eng_popup').val();
     
     var about_popup = $('#about_popup').val();
     var about_eng_popup = $('#about_eng_popup').val();
     
     var description_popup = $('#description_popup').val();
     var description_eng_popup = $('#description_eng_popup').val();
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysManufacturer' ,
                         name : name_popup,
                         name_eng : name_eng_popup,
                         abbreviation : abbreviation_popup,
                         abbreviation_eng : abbreviation_eng_popup,
                         about : about_popup,
                         about_eng : about_eng_popup,
                         description : description_popup,
                         description_eng : description_eng_popup,
                         pk : $("#pk").val(),
                         language_code : $('#langCode').val(),
                         id : id
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Üreticisi Güncelleme İşlemi Başarısız...', 
                                      'Makina üreticisi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysManufacturer" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Makina Üreticisi Güncelleme İşlemi Başarılı...', 
                                       'Makina üreticisi güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Üreticisi Güncelleme İşlemi Başarısız...', 
                                      'Makina üreticisi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysManufacturer" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Üreticisi Güncelleme İşlemi Başarısız...', 
                                      'Makina üreticisi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert machine producer
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 15/08/2016
 */
window.insertMacProducer = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var name = $('#name').val();
     var name_eng = $('#name_eng').val();
     
     var abbreviation = $('#abbreviation').val();
     var abbreviation_eng = $('#abbreviation_eng').val();
     
     var about = $('#about').val();
     var about_eng = $('#about_eng').val();
     
     var description = $('#description').val();
     var description_eng = $('#description_eng').val();
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysManufacturer' ,
                         name : name,
                         name_eng : name_eng,
                         abbreviation : abbreviation,
                         abbreviation_eng : abbreviation_eng,
                         about : about,
                         about_eng : about_eng,
                         description : description,
                         description_eng : description_eng,
                         pk : $("#pk").val(),
                         language_code : $('#langCode').val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Makina Üreticisi Ekleme İşlemi Başarısız...', 
                                       'Makina üreticisi ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysManufacturer" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#macProducersForm')[0].reset();  

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillManufacturerListGrid_sysManufacturer',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Makina Üreticisi Kayıt İşlemi Başarılı...', 
                                       'Makina üreticisi kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Makina Üreticisi Kayıt İşlemi Başarısız...', 
                                       'Makina üreticisi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysManufacturer" servis datası boştur!!');

                     loaderInsertBlock.loadImager('removeLoadImage');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Üreticisi Kayıt İşlemi Başarısız...', 
                                     'Makina üreticisi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysManufacturer" servis hatası->'+data.errorInfo);

                     loaderInsertBlock.loadImager('removeLoadImage');
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
              dm.dangerMessage('show', 'Makina Üreticisi Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile makina üreticisi kaydı yapılmıştır, yeni bir makina üreticisi deneyiniz... ');

                     loaderInsertBlock.loadImager('removeLoadImage');
          },
          onError22001 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#machinePropForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Makina Üreticisi Kayıt İşlemi Başarısız...', 
                                       'Üretici kısaltılmış adı 20 karakterden fazla olmamalı. Lütfen bilgilerinizi kontrol edip tekrar giriniz... ');

                     loaderInsertBlock.loadImager('removeLoadImage');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive machine producer
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 15/08/2016
 */
window.activePassiveMacProducersWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveMacProducer(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Makina Üreticisi Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Makina üreticisi aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive machine producer
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 15/08/2016
 */
window.activePassiveMacProducer = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysManufacturer' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Üreticisi Aktif/Pasif İşlemi Başarısız...', 
                                      'Makina üreticisi aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysManufacturer" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Makina Üreticisi Aktif/Pasif İşlemi Başarılı...', 
                                       'Makina üreticisi aktif/pasif işlemini gerçekleştirdiniz... ',
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
             console.error('"pkUpdateMakeActiveOrPassive_sysManufacturer" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Üreticisi Aktif/Pasif İşlemi Başarısız...', 
                                      'Makina üreticisi aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
