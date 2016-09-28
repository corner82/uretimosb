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
 * Clusters datagrid is being filled
 * @since 25/08/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillOsbClusterLists_sysOsbClusters',
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
            {field:'name',title:'Küme',sortable:true,width:300},
            {field:'name_eng',title:'Küme Eng.',sortable:true,width:300},
            {field:'osb_name',title:'OSB',sortable:true,width:200},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveClusterWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveClusterWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteClusterUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateClusterDialog('+row.id+', { name : \''+row.name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                       description : \''+row.description+'\',\n\
                                                                                                                                                                       description_eng : \''+row.description_eng+'\',\n\
                                                                                                                                                                       osb_id : '+row.osb_id+',\n\
                                                                                                                                                                       name_eng : \''+row.name_eng+'\'} );"><i class="fa fa-arrow-circle-up"></i></button>';
                    return e+d+u;    
                }
            },
        ]]   
});
$('#tt_grid_dynamic').datagrid('enableFilter');


 /*
* 
* @type @call;$@call;loadImager
* @Since 25/08/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for organized industrial 
* zones dropdown. Loading image will be removed when dropdown filled data.
*/
$("#loading-image-osb").loadImager();
$("#loading-image-osb").loadImager('appendImage');

/**
 * Organized industrial zones dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 25/08/2016
 */
var ajaxOsb = $(window).ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillOsbDdlist_sysOsb' ,
                    pk : $("#pk").val(),
                    language_code: $('#langCode').val(),
            }
   })
ajaxOsb.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                $('#loading-image-osb').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'OSB Bulunamamıştır...',
                                  'OSB  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#loading-image-osb').loadImager('removeLoadImage');
         $('#dropdownOsb').ddslick({
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
                $('#loading-image-osb').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'OSB Bulunamamıştır...',
                                  'OSB  bulunamamıştır...');
     },
}) 
ajaxOsb.ajaxCallWidget('call');


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
 * Organized industrial zone insert form validation engine attached to work
 * @since 25/08/2016
 */
$('#clusterForm').validationEngine();

 /**
* reset button function for cluster insert form
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 25/08/2016
*/
window.resetClustersForm = function () {
   $('#clusterForm').validationEngine('hide');
   return false;
}
                                            
// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

    
/**
 * wrapper class for pop up and delete cluster ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 25/08/2016
 */
window.deleteClusterUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteClusterUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Küme Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Küme silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete cluster
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 25/08/2016
*/
window.deleteClusterUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysOsbClusters' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Küme  Silme İşlemi Başarısız...',
                                     'Küme  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysOsbClusters" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    loaderGridBlock.loadImager('removeLoadImage');
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Küme Silme İşleminiz Başarılı...',
                                      'Küme  silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert cluster
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 25/08/2016
 */
window.insertClustersWrapper = function (e) {
 e.preventDefault();
 var ddData = $('#dropdownOsb').data('ddslick');
 
 if ($("#clusterForm").validationEngine('validate')) {
     
     /*if(!ddData.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'OSB Seçiniz', 'Lütfen organize sanayi bölgesi seçiniz!');
         return false;
     }*/
     insertCluster();
 }
 return false;
}
   
   
   
/**
 * wrapper for cluster update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 25/08/2016
 */
window.updateClusterDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" Kümesini güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="clusterFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Küme</label>\n\
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
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Küme İng.</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.name_eng+'" name="name_eng_popup" id="name_eng_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">OSB</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div id="loading-image-osb-popup" class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div id="dropdownOsbPopup" ></div>\n\
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
                                                             <div id="loading-image-osb-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="description_eng_popup" id="description_eng_popup" placeholder="Açıklama ...">'+row.description_eng+'</textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button  class="btn btn-primary" type="submit" onclick="return updateClusterWrapper(event, '+id+');">\n\
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
            $('#clusterFormPopup').validationEngine();
             
            $("#loading-image-osb-popup").loadImager();
            $("#loading-image-osb-popup").loadImager('appendImage');
            
            var ajaxClustersPopup = $("#loading-image-osb-popup").ajaxCallWidget({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'pkFillOsbDdlist_sysOsb' ,
                                pk : $("#pk").val(),
                                language_code : $('#langCode').val()
                        }
           });
            ajaxClustersPopup.ajaxCallWidget ({
                onError : function (event, textStatus,errorThrown) {
                    dm.dangerMessage({
                       onShown : function() {
                           //$('#loading-image-osb').loadImager('removeLoadImage'); 
                       }
                    });
                    dm.dangerMessage('show', 'OSB Bulunamamıştır...',
                                             'OSB bulunamamıştır...');
                },
                onSuccess : function (event, data) {
                    var data = $.parseJSON(data);
                        $('#loading-image-osb-popup').loadImager('removeLoadImage');
                        $('#dropdownOsbPopup').ddslick({
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
                        $('#dropdownOsbPopup').ddslick('selectByValue', 
                                                    {index: ''+row.osb_id+''});
                    },
                    onErrorDataNull : function (event, data) {
                         dm.dangerMessage({
                            onShown : function() {
                                //$('#loading-image-osb-popup').loadImager('removeLoadImage'); 
                            }
                         });
                         dm.dangerMessage('show', 'OSB Bulunamamıştır...',
                                                  'OSB bulunamamıştır...');
                     },
                }) 
                ajaxClustersPopup.ajaxCallWidget('call');
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
 * update cluster wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 25/08/2016
 */
window.updateClusterWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#clusterFormPopup").validationEngine('validate')) {
    var ddData = $('#dropdownOsbPopup').data('ddslick');
    /*if(!ddData.selectedData.value>0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'ACL Resource Seçiniz', 'Lütfen ACL resource seçiniz!');
    }*/
    updateCluster(id);
    return false;
 }
 return false;
}

/**
 * update cluster
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 25/08/2016
 */
window.updateCluster = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var ddData = $('#dropdownOsbPopup').data('ddslick');
     var osb_id = ddData.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysOsbClusters' ,
                         id : id,
                         name : $('#name_popup').val(),
                         name_eng : $('#name_eng_popup').val(),
                         description : $('#description_popup').val(),
                         description_eng : $('#description_eng_popup').val(),
                         osb_id : osb_id,
                         pk : $("#pk").val(),
                         language_code : $('#langCode').val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Güncelleme İşlemi Başarısız...', 
                                      'Küme güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysOsbClusters" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Küme Güncelleme İşlemi Başarılı...', 
                                       'Küme güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Güncelleme İşlemi Başarısız...', 
                                      'Küme güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysOsbClusters" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Güncelleme İşlemi Başarısız...', 
                                      'Küme güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Küme Güncelleme İşlemi Başarısız...', 
                                      'Aynı Küme ismi ve OSB adıyla kayıt bulunmaktadır, \n\
                                        bu nedenle güncelleme işlemine devam edilmeyecektir...... ');
              loader.loadImager('removeLoadImage');
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert cluster
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 25/08/2016
 */
window.insertCluster = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var name = $('#name').val();
     var name_eng = $('#name_eng').val();
     var description = $('#description').val();
     var description_eng = $('#description_eng').val();
     
     var osb_id = 0;
     var ddData = $('#dropdownOsb').data('ddslick');
     osb_id = ddData.selectedData.value; 
     /*if(ddData.selectedData.value>0) {
        osb_id = ddData.selectedData.value; 
     }*/
      
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysOsbClusters' ,
                         name : name,
                         name_eng : name_eng,
                         description : description,
                         description_eng : description_eng,
                         osb_id : osb_id,
                         pk : $("#pk").val(),
                         language_code : $('#langCode').val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Küme  Ekleme İşlemi Başarısız...', 
                                       'Küme ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysOsbClusters" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#clusterForm')[0].reset();  

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillOsbClusterLists_sysOsbClusters',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Küme Kayıt İşlemi Başarılı...', 
                                       'Küme kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Küme Kayıt İşlemi Başarısız...', 
                                       'Küme  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysOsbClusters" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme  Kayıt İşlemi Başarısız...', 
                                     'Küme  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysOsbClusters" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#clusterForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Küme Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile küme  kaydı yapılmıştır, yeni bir küme deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive cluster
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 25/08/2016
 */
window.activePassiveClusterWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activeCluster(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Küme Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Küme aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive cluster
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 25/08/2016
 */
window.activeCluster = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysOsbClusters' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Aktif/Pasif İşlemi Başarısız...', 
                                      'Küme aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysOsbClusters" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Küme Aktif/Pasif İşlemi Başarılı...', 
                                       'Küme aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Küme Aktif/Pasif İşlemi Başarısız...', 
                                      'Küme aktif/pasif işlemi  başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysOsbClusters" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Aktif/Pasif İşlemi Başarısız...', 
                                      'Küme aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
