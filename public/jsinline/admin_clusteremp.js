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
 * Cluster employees datagrid is being filled
 * @since 31/08/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillUrgePersonListGrid_sysOsbPerson',
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
            {field:'name',title:'Ad',sortable:true,width:100},
            {field:'surname',title:'Soyad',sortable:true,width:100},
            {field:'osb_name',title:'OSB',sortable:true,width:100},
            {field:'cluster_name',title:'Küme',sortable:true,width:200},
            {field:'role_name_tr',title:'Rol',sortable:true,width:100},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveClusterEmpWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveClusterEmpWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteClusterEmpUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateClusterEmpDialog('+row.id+', { name : \''+row.name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                       surname : \''+row.surname+'\',\n\
                                                                                                                                                                       auth_email : \''+row.auth_email+'\',\n\
                                                                                                                                                                       role_id : '+row.role_id+',\n\
                                                                                                                                                                       cluster_id : \''+row.osb_cluster_id+'\'} );"><i class="fa fa-arrow-circle-up"></i></button>';
                    return e+d+u;    
                }
            },
        ]]   
});
$('#tt_grid_dynamic').datagrid('enableFilter');


 /*
* 
* @type @call;$@call;loadImager
* @Since 31/08/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for organized industrial 
* zones dropdown. Loading image will be removed when dropdown filled data.
*/
$("#loading-image-osb").loadImager();
$("#loading-image-osb").loadImager('appendImage');

/*
* 
* @type @call;$@call;loadImager
* @Since 31/08/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for Cluster employee roles
*  dropdown. Loading image will be removed when dropdown filled data.
*/
$("#roles-loading-image").loadImager();
$("#roles-loading-image").loadImager('appendImage');


/**
 * Cluster Employees roles dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 31/08/2016
 */
var ajaxConsultantRoles = $('#roles-loading-image').ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillClusterRolesDdlist_sysAclRoles' ,
                    pk : $("#pk").val() 
            }
   })
ajaxConsultantRoles.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                $('#roles-loading-image').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Küme Çalışanı Rolü  Bulunamamıştır...',
                                  'Sistemde kayıtlı küme çalışanı rolü  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#roles-loading-image').loadImager('removeLoadImage');
         $('#dropdownClusterRoles').ddslick({
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
                $('#roles-loading-image').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Küme Çalışanı Rolü Bulunamamıştır...',
                                  'Küme çalışanı rolü  bulunamamıştır...');
     },
}) 
ajaxConsultantRoles.ajaxCallWidget('call');

/**
 * Clusters dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 31/08/2016
 */
var ajaxClusters = $(window).ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillOsbClustersDdlist_sysOsbClusters' ,
                    pk : $("#pk").val() ,
                    language_code : $('#langCode').val(),
            }
   })
ajaxClusters.ajaxCallWidget ({
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
         $('#dropdownCluster').ddslick({
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
 * Cluster Employee form validation engine attached to work
 * @since 31/08/2016
 */
$('#clusterEmpForm').validationEngine();

 /**
* reset button function for cluster employee insert form
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 31/08/2016
*/
window.resetClusterEmpForm = function () {
   $('#clusterEmpForm').validationEngine('hide');
   return false;
}
                                            
// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();
  
/**
 * wrapper class for pop up and delete cluster employee ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 01/09/2016
 */
window.deleteClusterEmpUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteClusterEmpUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Küme Çalışanı  Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Küme çalışanı silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete cluster employee
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 01/09/2016
*/
window.deleteClusterEmpUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysOsbPerson' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Küme  Çalışanı Silme İşlemi Başarısız...',
                                     'Küme çalışanı silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysOsbPerson" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    loaderGridBlock.loadImager('removeLoadImage');
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Küme Çalışanı Silme İşleminiz Başarılı...',
                                      'Küme  çalışanı silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
/**
 * insert cluster employee
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 31/08/2016
 */
window.insertClusterEmpWrapper = function (e) {
 e.preventDefault();

 
 if ($("#clusterEmpForm").validationEngine('validate')) {
     
     var ddDataRoles = $('#dropdownClusterRoles').data('ddslick');
     if(!ddDataRoles.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Küme Rolü Seçiniz', 'Lütfen küme rolü seçiniz!');
         return false;
     }
     
     var ddDataCluster = $('#dropdownCluster').data('ddslick');
     if(!ddDataCluster.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Küme Seçiniz', 'Lütfen küme seçiniz!');
         return false;
     }
     
     
     insertClusterEmp();
 }
 return false;
}

/**
 * insert cluster employee
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 31/08/2016
 */
window.insertClusterEmp = function () {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');
     
     var name = $('#name').val();
     var surname = $('#surname').val();
     var auth_email = $('#auth_email').val();
     
     var ddDataCluster = $('#dropdownCluster').data('ddslick');
     var cluster_id = ddDataCluster.selectedData.value; 
     
     var ddDataClusterRole = $('#dropdownClusterRoles').data('ddslick');
     var role_id = ddDataClusterRole.selectedData.value; 
      
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsertUrgePerson_infoUsers' ,
                         pk : $("#pk").val(),
                         role_id : role_id,
                         cluster_id : cluster_id,
                         name : name,
                         surname : surname,
                         auth_email : auth_email
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Küme  Ekleme İşlemi Başarısız...', 
                                       'Küme ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsertUrgePerson_infoUsers" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#clusterEmpForm')[0].reset();  

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillUrgePersonListGrid_sysOsbPerson',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Küme Çalışanı Kayıt İşlemi Başarılı...', 
                                       'Küme çalışanı kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Küme Çalışanı Kayıt İşlemi Başarısız...', 
                                       'Küme çalışanı kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsertUrgePerson_infoUsers" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Çalışanı Kayıt İşlemi Başarısız...', 
                                     'Küme çalışanı kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsertUrgePerson_infoUsers" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#clusterEmpForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Küme Çalışanı Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile küme çalışanı kaydı yapılmıştır, yeni bir küme çalışanı deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
 
/**
 * wrapper for cluster employee update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 31/08/2016
 */
window.updateClusterEmpDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" Küme Çalışanını güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="clusterEmpFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Ad</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required,custom[onlyLetterSp]]" type="text" value="'+row.name+'" name="name_popup" id="name_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Soyad</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required,custom[onlyLetterSp]]" type="text" value="'+row.surname+'" name="surname_popup" id="surname_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Kullanıcı Adı(e-posta)</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required,custom[email]]" type="text" value="'+row.auth_email+'" name="auth_email_popup" id="auth_email_popup"   />\n\
                                                                     </div>\n\
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
                                                                 <div id="dropdownClusterRolesPopup" ></div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Küme</label>\n\
                                                             <div  class="col-sm-10">\n\
                                                                 <div id="loading-image-cluster-popup"  class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div id="dropdownClusterPopup" ></div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button  class="btn btn-primary" type="submit" onclick="return updateClusterEmpWrapper(event, '+id+');">\n\
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
            $('#clusterEmpFormPopup').validationEngine();
             
            $("#loading-image-role-popup").loadImager();
            $("#loading-image-role-popup").loadImager('appendImage');
            
            $("#loading-image-cluster-popup").loadImager();
            $("#loading-image-cluster-popup").loadImager('appendImage');
            
            var ajaxClustersRolePopup = $("#loading-image-role-popup").ajaxCallWidget({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'pkFillClusterRolesDdlist_sysAclRoles' ,
                                pk : $("#pk").val(),
                                language_code : $('#langCode').val()
                        }
           });
            ajaxClustersRolePopup.ajaxCallWidget ({
                onError : function (event, textStatus,errorThrown) {
                    dm.dangerMessage({
                       onShown : function() {
                           //$('#loading-image-osb').loadImager('removeLoadImage'); 
                       }
                    });
                    dm.dangerMessage('show', 'Küme Rolü Bulunamamıştır...',
                                             'Küme rolü bulunamamıştır...');
                },
                onSuccess : function (event, data) {
                    var data = $.parseJSON(data);
                        $('#loading-image-role-popup').loadImager('removeLoadImage');
                        $('#dropdownClusterRolesPopup').ddslick({
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
                        $('#dropdownClusterRolesPopup').ddslick('selectByValue', 
                                                    {index: ''+row.role_id+''});
                    },
                    onErrorDataNull : function (event, data) {
                         dm.dangerMessage({
                            onShown : function() {
                                //$('#loading-image-osb-popup').loadImager('removeLoadImage'); 
                            }
                         });
                         dm.dangerMessage('show', 'Küme Rolü Bulunamamıştır...',
                                                  'Küme rolü bulunamamıştır...');
                     },
                }) 
            ajaxClustersRolePopup.ajaxCallWidget('call');
            
            var ajaxClustersPopup = $("#loading-image-cluster-popup").ajaxCallWidget({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'pkFillOsbClustersDdlist_sysOsbClusters' ,
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
                    dm.dangerMessage('show', 'Küme  Bulunamamıştır...',
                                             'Küme  bulunamamıştır...');
                },
                onSuccess : function (event, data) {
                    var data = $.parseJSON(data);
                        $('#loading-image-cluster-popup').loadImager('removeLoadImage');
                        $('#dropdownClusterPopup').ddslick({
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
                        $('#dropdownClusterPopup').ddslick('selectByValue', 
                                                    {index: ''+row.cluster_id+''});
                    },
                    onErrorDataNull : function (event, data) {
                         dm.dangerMessage({
                            onShown : function() {
                                //$('#loading-image-osb-popup').loadImager('removeLoadImage'); 
                            }
                         });
                         dm.dangerMessage('show', 'Küme  Bulunamamıştır...',
                                                  'Küme  bulunamamıştır...');
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
 * update cluster employee wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 01/09/2016
 */
window.updateClusterEmpWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#clusterEmpFormPopup").validationEngine('validate')) {
    var ddDataRoles = $('#dropdownClusterRolesPopup').data('ddslick');
     if(!ddDataRoles.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Küme Rolü Seçiniz', 'Lütfen küme rolü seçiniz!');
         return false;
     }
     
     var ddDataCluster = $('#dropdownClusterPopup').data('ddslick');
     if(!ddDataCluster.selectedData.value > 0) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Küme Seçiniz', 'Lütfen küme seçiniz!');
         return false;
     }
    //updateClusterEmp(id);
    return false;
 }
 return false;
}

/**
 * update cluster employee
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 01/09/2016
 */
window.updateClusterEmp = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var name = $('#name_popup').val();
     var surname = $('#surname_popup').val();
     var auth_email = $('#auth_email_popup').val();
     
     var ddDataCluster = $('#dropdownClusterPopup').data('ddslick');
     var cluster_id = ddDataCluster.selectedData.value; 
     
     var ddDataClusterRole = $('#dropdownClusterRolesPopup').data('ddslick');
     var role_id = ddDataClusterRole.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysOsbClusters' ,
                         pk : $("#pk").val(),
                         language_code : $('#langCode').val(),
                         id : id,
                         name : name,
                         surname : surname,
                         auth_email : auth_email,
                         cluster_id : cluster_id,
                         role_id : role_id,
                         
                         
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Çalışanı Güncelleme İşlemi Başarısız...', 
                                      'Küme çalışanı güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysOsbClusters" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Küme Çalışanı Güncelleme İşlemi Başarılı...', 
                                       'Küme çalışanı güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Çalışanı Güncelleme İşlemi Başarısız...', 
                                      'Küme çalışanı güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysOsbClusters" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Çalışanı Güncelleme İşlemi Başarısız...', 
                                      'Küme çalışanı güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Küme Çalışanı Güncelleme İşlemi Başarısız...', 
                                      'Aynı Küme ismi ve çalışanıyla adıyla kayıt bulunmaktadır, \n\
                                        bu nedenle güncelleme işlemine devam edilmeyecektir...... ');
              loader.loadImager('removeLoadImage');
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * active/passive cluster employee
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 01/09/2016
 */
window.activePassiveClusterEmpWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activeClusterEmp(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Küme Çalışanı Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Küme çalışanı aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive cluster employee
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 01/09/2016
 */
window.activeClusterEmp = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysOsbPerson' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Çalışanı Aktif/Pasif İşlemi Başarısız...', 
                                      'Küme çalışanı aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysOsbPerson" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Küme Çalışanı Aktif/Pasif İşlemi Başarılı...', 
                                       'Küme çalışanı aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Küme Çalışanı Aktif/Pasif İşlemi Başarısız...', 
                                      'Küme çalışanı aktif/pasif işlemi  başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysOsbPerson" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Küme Çalışanı Aktif/Pasif İşlemi Başarısız...', 
                                      'Küme çalışanı aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
