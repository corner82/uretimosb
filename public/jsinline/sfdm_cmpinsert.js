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
 * Consultant companies datagrid is being filled
 * @since 22/08/2016
 */
$('#tt_grid_dynamic').datagrid({
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
    queryParams: {
            pk: $('#pk').val(),
            url : 'pkFillConsCompanyLists_infoFirmProfile',
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
            {field:'firm_name',title:'Firma', width:200},
            {field:'firm_name_short',title:'Firma Kısa Adı', width:200},
            {field:'firm_name_eng',title:'Firma İng',sortable:true,width:200},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveCompanyWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveCompanyWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    
                    //var d = '<a href="javascript:void(0)" onclick="deleteISScenario(this);">Delete</a>';
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteCmpUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateCmpDialog('+row.id+', { firm_name : \''+row.firm_name+'\',\n\
                                                                                                                                                                   firm_name_eng : \''+row.firm_name_eng+'\',\n\
                                                                                                                                                                   firm_name_short : \''+row.firm_name_short+'\',\n\
                                                                                                                                                                   osb_id : \''+row.osb_id+'\',\n\
                                                                                                                                                                   cluster_ids : '+row.cluster_ids+',\n\
                                                                                                                                                                   firm_name_short_eng : \''+row.firm_name_short_eng+'\' } );"><i class="fa fa-arrow-circle-up"></i></button>';
                    return e+d+u;    
                }
            },

        ]]   
});
$('#tt_grid_dynamic').datagrid('enableFilter');

/**
 * loading image for organized industrial zones dropdown
 * @author Mustafa Zeynel Dağlı
 * @since 25/08/2016
 */
$("#loading-image-osb").loadImager();
$("#loading-image-osb").loadImager('appendImage');

/**
 * loading image for clusters dropdown
 * @author Mustafa Zeynel Dağlı
 * @since 25/08/2016
 */
$("#loading-image-clusters").loadImager();
$("#loading-image-clusters").loadImager('appendImage');

/**
 * Organized industrial zones dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 25/08/2016
 */
var ajaxOsb = $('#loading-image-osb').ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillOsbDdlist_sysOsb' ,
                    pk : $("#pk").val() 
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
         $('#dropdownOSB').ddslick({
            height : 200,
            data : data, 
            width:'98%',
            selectText: "Select your preferred social network",
            //showSelectedHTML : false,
            defaultSelectedIndex: 3,
            search : true,
           /* multiSelect : true,
            tagBox : 'tag-container',
            multiSelectTagID : 'deneme',*/
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
 * Clusters dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 25/08/2016
 */
var ajaxClusters = $('#loading-image-clusters').ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillOsbClustersDdlist_sysOsbClusters' ,
                    pk : $("#pk").val() ,
                    language_code : $('#langCode').val(),
                    /*osb_id: 5, 
                    country_id: 91*/
            }
   })
ajaxClusters.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                $('#loading-image-clusters').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Küme Bulunamamıştır...',
                                  'Küme  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#loading-image-clusters').loadImager('removeLoadImage');
         $('#dropdownClusters').ddslick({
            height : 200,
            data : data, 
            width:'98%',
            selectText: "Select your preferred social network",
            //showSelectedHTML : false,
            defaultSelectedIndex: 3,
            search : true,
            multiSelect : true,
            tagBox : 'tag-container-clusters',
            multiSelectTagID : 'tagClusters',
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
                $('#loading-image-clusters').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Küme Bulunamamıştır...',
                                  'Küme  bulunamamıştır...');
     },
}) 
ajaxClusters.ajaxCallWidget('call'); 


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
 * company insert form validation engine attached to work
 * @since 22/08/2016
 */
$('#companyForm').validationEngine();

 /**
* reset button function for company insert form
* property insert
* for 'insert' and 'update' form buttons
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 22/08/2016
*/
window.resetCompanyForm = function () {
   $('#companyForm').validationEngine('hide');
   return false;
}

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

//Validation forms binded...
jQuery("#companyForm").validationEngine();
    
/**
 * wrapper class for pop up and delete company ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.deleteCmpUltimatelyDialog= function(id, index){
    var nodeID = nodeID;
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteCmpUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Firma Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Firma  silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete company 
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 22/08/2016
*/
window.deleteCmpUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysMachineTools' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Firma Silme İşlemi Başarısız...',
                                      'Firma silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysMachineTools" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    loaderGridBlock.loadImager('removeLoadImage');
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Firma  Silme İşleminiz Başarılı...',
                                      'Firma  silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert company wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.insertCmpWrapper = function (e) {
 e.preventDefault();


 if ($("#companyForm").validationEngine('validate')) {
    insertCmp();
 }
 return false;
}
   
   
   
/**
 * wrapper for company update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.updateCmpDialog = function (id, row) {
BootstrapDialog.show({  
     title: '"'+ row.firm_name + '" firmasını güncellemektesiniz...',
     message: function (dialogRef) {
                 var dialogRef = dialogRef;
                 var $message = $(' <div class="row">\n\
                                         <div class="col-md-12">\n\
                                             <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                 <form id="cmpFormPopup" method="get" class="form-horizontal">\n\
                                                 <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                 <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Firma</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.firm_name+'" name="firm_name_popup" id="firm_name_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Firma İng.</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.firm_name_eng+'" name="firm_name_eng_popup" id="firm_name_eng_popup" />\n\
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
                                                            <label class="col-sm-2 control-label">Küme</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div id="loading-image-clusters-popup" class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownClustersPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Kısa Firma Adı</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.firm_name_short+'" name="firm_name_short_popup" id="firm_name_short_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Kısa Firma Adı İng.</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.firm_name_short_eng+'" name="firm_name_short_eng_popup" id="firm_name_short_eng_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group">\n\
                                                         <div class="col-sm-10 col-sm-offset-2">\n\
                                                         <button id="insertCmpPopUp" class="btn btn-primary" type="submit" onclick="return updateCmpWrapper(event, '+id+');">\n\
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
        $('#cmpFormPopup').validationEngine();
        
        $("#loading-image-osb-popup").loadImager();
        $("#loading-image-osb-popup").loadImager('appendImage');
        
        $("#loading-image-clusters-popup").loadImager();
        $("#loading-image-clusters-popup").loadImager('appendImage');
        
        var ajaxOsbPopup = $('#loading-image-osb-popup').ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: { url:'pkFillOsbDdlist_sysOsb' ,
                            pk : $("#pk").val() 
                    }
       })
        ajaxOsbPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       //$('#loading-image-osb-popup').loadImager('removeLoadImage'); 
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
                            /*multiSelect : true,
                            multiSelectTagID : 'deneme',
                            tagBox : 'tag-container-pop',*/
                            //imagePosition:"right",
                            onSelected: function(selectedData){
                                if(selectedData.selectedData.value>0) {
                             }
                         }   
                    }); 
                    $('#dropdownOsbPopup').ddslick('selectByValue', 
                                                {index: ''+row.osb_id+'' }
                                                );
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
        ajaxOsbPopup.ajaxCallWidget('call');
        
        var ajaxClustersPopup = $('#loading-image-clusters-popup').ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: { url:'pkFillOsbClustersDdlist_sysOsbClusters' ,
                            pk : $("#pk").val() 
                    }
       })
        ajaxClustersPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       //$('#loading-image-clusters-popup').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'Küme Bulunamamıştır...',
                                         'Küme bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                    $('#loading-image-clusters-popup').loadImager('removeLoadImage');
                    $('#dropdownClustersPopup').ddslick({
                            height : 200,
                            data : data, 
                            width:'98%',
                            search : true,
                            multiSelect : true,
                            multiSelectTagID : 'tagClustersPopup',
                            tagBox : 'tag-container-popup',
                            //imagePosition:"right",
                            onSelected: function(selectedData){
                                if(selectedData.selectedData.value>0) {
                             }
                         }   
                    }); 

                    //ddData = $('#dropdownOsbPopup').data('ddslick');
                    //var resources ='[{"id" : "23", "text" : "test"}, {"id" :"34", "text" : "test2"}]';
                    var multiSelectTagID = $('#dropdownClustersPopup').ddslick('getMultiSelectTagID');
                    var tagBox = $('#dropdownClustersPopup').ddslick('getTagBox');
                    $('#dropdownClustersPopup').ddslick('selectByMultiValues', 
                                                {id: multiSelectTagID,
                                                tagBox : ''+tagBox+''},
                                                 data,
                                                 row.cluster_ids
                                                );
                },
                onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            //$('#loading-image-clusters-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'Küme Bulunamamıştır...',
                                              'Küme bulunamamıştır...');
                 },
            }) 
        ajaxClustersPopup.ajaxCallWidget('call');
        
        
     },
     onhide : function() {
     },
 });
 return false;
}

/**
 * update company wrapper function
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.updateCmpWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#cmpFormPopup").validationEngine('validate')) {
    updateCmp(id);
 }
 return false;
}

/**
 * update company
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.updateCmp = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var firm_name = $('#firm_name_popup').val();
     var firm_name_eng = $('#firm_name_eng_popup').val();
     var firm_name_short = $('#firm_name_short_popup').val();
     var firm_name_short_eng = $('#firm_name_short_eng_popup').val();
     
     var ddData = $('#dropdownClustersPopup').data('ddslick');
     var multiSelectedValues = $('#dropdownClustersPopup').ddslick('selectedValues',
                                                                {id: ''+ddData.settings.multiSelectTagID+'' 
                                                                });
     var clustersID = $.extend({}, multiSelectedValues);
     var jsonClustersID = JSON.stringify(clustersID);
     
     var osb_id = 0;
     var ddDataOsb = $('#dropdownOsbPopup').data('ddslick');
     if (typeof ddDataOsb != 'undefined'){
         osb_id  = ddDataOsb.selectedData.value;
     }
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateConsAct_infoFirmProfile' ,
                         pk : $("#pk").val(),
                         language_code : $('#langCode').val(),
                         firm_name : firm_name,
                         firm_name_eng : firm_name_eng,
                         firm_name_short : firm_name_short,
                         firm_name_short_eng : firm_name_short_eng,
                         clusters_id : jsonClustersID,
                         osb_id : osb_id,
                         id : id,
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Firma Güncelleme İşlemi Başarısız...', 
                                           'Firma güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateConsAct_infoFirmProfile" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Firma Güncelleme İşlemi Başarılı...', 
                                       'Firma güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
                                       $('#tt_grid_dynamic').datagrid('reload');
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Firma Güncelleme İşlemi Başarısız...', 
                                      'Firma güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateConsAct_infoFirmProfile" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Firma Güncelleme İşlemi Başarısız...', 
                                      'Firma güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert company 
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.insertCmp = function (nodeID, nodeName) {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');

     var firm_name = $('#firm_name').val();
     var firm_name_eng = $('#firm_name_eng').val();     
     var firm_name_short = $('#firm_name_short').val();
     var firm_name_short_eng = $('#firm_name_short_eng').val();
     
     var ddData = $('#dropdownClusters').data('ddslick');
     var multiSelectedValues = $('#dropdownClustersPopup').ddslick('selectedValues',
                                                                {id: ''+ddData.settings.multiSelectTagID+'' 
                                                                });
     var clustersID = $.extend({}, multiSelectedValues);
     var jsonClustersID = JSON.stringify(clustersID);
     
     var osb_id = 0;
     var ddDataOsb = $('#dropdownOsb').data('ddslick');
     if (typeof ddDataOsb != 'undefined'){
         osb_id  = ddDataOsb.selectedData.value;
     }

     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsertConsAct_infoFirmProfile' ,
                         pk : $("#pk").val(),
                         language_code : $("#langCode").val(),
                         firm_name : firm_name,
                         firm_name_eng : firm_name_eng,
                         firm_name_short : firm_name_short,
                         firm_name_short_eng : firm_name_short_eng,
                         clusters_id : jsonClustersID,
                         osb_id : osb_id
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Firma Ekleme İşlemi Başarısız...', 
                                       'Firma ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsertConsAct_infoFirmProfile" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#companyForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                     
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 url : 'pkFillConsCompanyLists_infoFirmProfile',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Firma Kayıt İşlemi Başarılı...', 
                                       'Firma kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Firma Kayıt İşlemi Başarısız...', 
                                       'Firma kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsertConsAct_infoFirmProfile" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Firma Kayıt İşlemi Başarısız...', 
                                     'Firma kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsertConsAct_infoFirmProfile" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#companyForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Firma Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile firma kaydı yapılmıştır, yeni bir firma ismi deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive company
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.activePassiveCompanyWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveCompany(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Firma Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Firma aktif/pasif işlemi gerçekleştirmek  üzeresiniz!! ');
 return false;
}

/**
 * update consultant company
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.activePassiveCompany = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
     
    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_infoFirmProfile' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Firma Aktif/Pasif İşlemi Başarısız...', 
                                      'Firma aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_infoFirmProfile" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Firma Aktif/Pasif İşlemi Başarılı...', 
                                       'Firma aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Firma Aktif/Pasif İşlemi Başarısız...', 
                                      'Firma aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_infoFirmProfile" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Firma Aktif/Pasif İşlemi Başarısız...', 
                                      'Firma aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
