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
 * Consultants datagrid is being filled
 * @since 09/08/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillOsbConsultantListGrid_sysOsbConsultants',
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
            {field:'name',title:'Ad',sortable:true,width:150},
            {field:'surname',title:'Soyad',sortable:true,width:150},
            {field:'username',title:'Kullanıcı',sortable:true,width:150},
            {field:'role_name_tr',title:'Rol',sortable:true,width:150},
            {field:'preferred_language_name',title:'Ana Dil',sortable:true,width:100},
            {field:'osb_name',title:'OSB',sortable:true,width:100},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveConsultantsWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveConsultantsWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteConsultantUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateConsultantDialog('+row.id+', { name : \''+row.name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                       surname : \''+row.surname+'\',\n\
                                                                                                                                                                       username : \''+row.username+'\',\n\
                                                                                                                                                                       osb_id : '+row.osb_id+',\n\
                                                                                                                                                                       role_id : '+row.role_id+',\n\
                                                                                                                                                                       preferred_language : '+row.preferred_language+',\n\
                                                                                                                                                                       preferred_language_json : '+row.preferred_language_json+'\n\
                                                                                                                                                                       } );"><i class="fa fa-arrow-circle-up"></i></button>';
                    return e+d+u; 
                    //return e+d;
                }
            },
        ]]   
});
$('#tt_grid_dynamic').datagrid('enableFilter');

/*
* 
* @type @call;$@call;loadImager
* @Since 09/08/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for Consultant roles
*  dropdown. Loading image will be removed when dropdown filled data.
*/
$("#roles-loading-image").loadImager();
$("#roles-loading-image").loadImager('appendImage');

/**
 * native language dropdown loading iamge
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
$("#native-language-loading-image").loadImager();
$("#native-language-loading-image").loadImager('appendImage');

/**
 * multilanguage drop down loading image
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
$("#languages-loading-image").loadImager();
$("#languages-loading-image").loadImager('appendImage');

/**
 * industrial site  drop down loading image
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
$("#osb-loading-image").loadImager();
$("#osb-loading-image").loadImager('appendImage');

/**
 * Consultant roles dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 09/08/2016
 */
var ajaxConsultantRoles = $('#roles-loading-image').ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillConsultantRolesDdlist_sysAclRoles' ,
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
         dm.dangerMessage('show', 'Danışman Rolü  Bulunamamıştır...',
                                  'Sistemde kayıtlı danışman rolü  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#roles-loading-image').loadImager('removeLoadImage');
         $('#dropdownConsultantRoles').ddslick({
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
         dm.dangerMessage('show', 'Danışman Rolü Bulunamamıştır...',
                                  'Danışman rolü  bulunamamıştır...');
     },
}) 
ajaxConsultantRoles.ajaxCallWidget('call');

/**
 * langauge dropdowns prepared
 * @type @call;$@call;ajaxCallWidget
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
var ajaxLanguage = $('#native-language-loading-image').ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillLanguageDdList_syslanguage' ,
                    pk : $("#pk").val(),
                    language_code : $("#langCode").val(),
            }
   })
ajaxLanguage.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                $('#languages-loading-image').loadImager('removeLoadImage');
                $('#native-language-loading-image').loadImager('removeLoadImage');
            }
         });
         dm.dangerMessage('show', 'Danışman Rolü  Bulunamamıştır...',
                                  'Sistemde kayıtlı danışman rolü  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#languages-loading-image').loadImager('removeLoadImage');
         $('#native-language-loading-image').loadImager('removeLoadImage');
         
         $('#dropdownMainLanguage').ddslick({
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
        
        $('#dropdownLanguages').ddslick({
            height : 200,
            data : data, 
            width:'98%',
            selectText: "Select your preferred social network",
            //showSelectedHTML : false,
            defaultSelectedIndex: 3,
            search : true,
            multiSelect : true,
            multiSelectTagID : 'languages',
            tagBox : 'tag-container',
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
                $('#languages-loading-image').loadImager('removeLoadImage');
                $('#native-language-loading-image').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Yabancı Diller Bulunamamıştır...',
                                  'Yabancı diller  bulunamamıştır...');
     },
}) 
ajaxLanguage.ajaxCallWidget('call');

/**
 * industrial site dropdown prepared
 * @type @call;$@call;ajaxCallWidget|@call;$@call;ajaxCallWidget|@call;$@call;ajaxCallWidget
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
var ajaxOSB = $('#osb-loading-image').ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillOsbDdlist_sysOsb' ,
                    pk : $("#pk").val(),
                    language_code : $("#langCode").val(),
            }
   })
ajaxOSB.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                $('#osb-loading-image').loadImager('removeLoadImage');
            }
         });
         dm.dangerMessage('show', 'Organize Sanayi Bölgesi  Bulunamamıştır...',
                                  'Sistemde kayıtlı organize sanayi bölgesi  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#osb-loading-image').loadImager('removeLoadImage');
          
        $('#dropdownOSB').ddslick({
            height : 200,
            data : data, 
            width:'98%',
            selectText: "Select your preferred social network",
            //showSelectedHTML : false,
            defaultSelectedIndex: 3,
            search : false,
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
                $('#osb-loading-image').loadImager('removeLoadImage');
            }
         });
         dm.dangerMessage('show', 'Organize Sanayi Bölgesi Bulunamamıştır...',
                                  'Organize Sanayi Bölgesi  bulunamamıştır...');
     },
}) 
ajaxOSB.ajaxCallWidget('call');

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
 * Consultants insert form validation engine attached to work
 * @since 09/08/2016
 */
$('#consultantsForm').validationEngine();

 /**
* reset button function for consultants insert form
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 09/08/2016
*/
window.resetActionsForm = function () {
   $('#consultantsForm').validationEngine('hide');
   return false;
}

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

    
/**
 * wrapper class for pop up and delete Consultant ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
window.deleteConsultantUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteConsultantUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Danışman Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Danışman silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
 
 /**
  * delete action with related data upon user approval
  * @param {type} id
  * @param {type} index
  * @returns {undefined}
  * @author Mustafa Zeynel Dağlı
  * @since 09/08/2016
  */
 window.deleteConsultantUltimatelyWithRelatedData = function (id, index) {
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
            dm.dangerMessage('show', 'Danışman  Silme İşlemi Başarısız...',
                                     'Danışman  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysAclActions" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Danışman Silme İşleminiz Başarılı...',
                                      'DAnışman ilgili tüm datalarla beraber silinmiştir,  silme işleminiz başarılı...')
        }, 
       
    });
    ajDeleteAllWithRelatedData.ajaxCall('call');
 }
 
 
/**
* delete Consultant
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 09/08/2016
*/
window.deleteConsultantUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysOsbConsultants' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Danışman  Silme İşlemi Başarısız...',
                                     'Danışman  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysOsbConsultants" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    loaderGridBlock.loadImager('removeLoadImage');
                    $('#tt_grid_dynamic').datagrid('reload');
                }
            });
            sm.successMessage('show', 'Danışman Silme İşleminiz Başarılı...',
                                      'Danışman  silme işleminiz başarılı...')
        }, 
        onError23503 : function (event, data) {
            wcm.warningComplexMessage('resetOnShown');
            wcm.warningComplexMessage({onConfirm : function(event, data) {
                deleteConsultantUltimatelyWithRelatedData(id, index);
            }
            });
            wcm.warningComplexMessage('show', 'Silme İşlemine Devam Etmek İstiyormusunuz?', 
                                              'Danışmana  bağlı işler ve firmalar tanımlandığı için silme işlemi bağlı veriyide etkileyecektir.\n\
                                  Yinede silme işlemine devam etmek istiyormusunuz? ');
            
            /*wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Silme İşlemi Gerçekleştiremezsiniz!', 'Action  bağlı Menü Tipi tanımlandığı için silme işlemi\n\
                               gerçekleştiremezsiniz, önce Action ile ilişkili Menü Tipi silinmelidir!');*/
            loaderGridBlock.loadImager('removeLoadImage');
        }
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert Consultant wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
window.insertConsultantWrapper = function (e) {
 e.preventDefault();

 
 if ($("#consultantsForm").validationEngine('validate')) {
     
    var ddDataRoles = $('#dropdownConsultantRoles').data('ddslick');
    var ddDataNativeLanguage = $('#dropdownMainLanguage').data('ddslick');
    var ddDataLanguagesSettings = $('#dropdownLanguages').data('ddslick');
    var ddDataLanguages = $('#dropdownLanguages').ddslick('selectedValues',
                                                                {id: ''+ddDataLanguagesSettings.settings.multiSelectTagID+'' 
                                                                });
     
    if(!ddDataRoles.selectedData.value > 0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Danışman Rolü Seçiniz', 'Lütfen danışman rolü seçiniz!');
        return false;
    }
    
    if(!ddDataNativeLanguage.selectedData.value > 0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Ana Dil Seçiniz', 'Lütfen danışman ana dili seçiniz!');
        return false;
    }
    
    if(ddDataLanguages.length == 0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Danışman Yabancı Dillerini Seçiniz', 'Lütfen danışman yabancı dillerini seçiniz!');
        return false;
    }
    insertConsultant();
    return false;
 }
 return false;
}
   
   
   
/**
 * wrapper for Consultant update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
window.updateConsultantDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + ' '+row.surname+'" Adlı Danışmanı güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="consultantsFormPopup" method="get" class="form-horizontal">\n\
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
                                                             <label class="col-sm-2 control-label">E-Posta(Kullanıcı Adı)</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required,custom[email]]" type="text" value="'+row.username+'" name="username_popup" id="username_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Rol</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div id="roles-loading-image-popup" class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownConsultantRolesPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Ana Dili</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div id="native-language-loading-image-popup" class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownMainLanguagePopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Yabancı Diller</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div id="languages-loading-image-popup" class="input-group">\n\
                                                                    <div  class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownLanguagesPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">OSB</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div id="osb-loading-image-popup" class="input-group">\n\
                                                                    <div  class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownOSBPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateConsultantWrapper(event, '+id+');">\n\
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
            $('#consultantsFormPopup').validationEngine();
             
            $("#roles-loading-image-popup").loadImager();
            $("#roles-loading-image-popup").loadImager('appendImage');

            $("#native-language-loading-image-popup").loadImager();
            $("#native-language-loading-image-popup").loadImager('appendImage');

            $("#languages-loading-image-popup").loadImager();
            $("#languages-loading-image-popup").loadImager('appendImage');
            
            $("#osb-loading-image-popup").loadImager();
            $("#osb-loading-image-popup").loadImager('appendImage');
            
            var ajaxConsultantRolesPopup = $('#roles-loading-image-popup').ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: { url:'pkFillConsultantRolesDdlist_sysAclRoles' ,
                            pk : $("#pk").val() 
                    }
            })
            ajaxConsultantRolesPopup.ajaxCallWidget ({
                 onError : function (event, textStatus,errorThrown) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#roles-loading-image').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'Danışman Rolü  Bulunamamıştır...',
                                              'Sistemde kayıtlı danışman rolü  bulunamamıştır...');
                 },
                 onSuccess : function (event, data) {
                     var data = $.parseJSON(data);
                     $('#roles-loading-image-popup').loadImager('removeLoadImage');
                     $('#dropdownConsultantRolesPopup').ddslick({
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
                    $('#dropdownConsultantRolesPopup').ddslick('selectByValue', 
                                                {index: ''+row.role_id+'' }
                                                );
                 },
                 onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#roles-loading-image-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'Danışman Rolü Bulunamamıştır...',
                                              'Danışman rolü  bulunamamıştır...');
                 },
            }) 
            ajaxConsultantRolesPopup.ajaxCallWidget('call');
            
            var ajaxLanguagePopup = $('#native-language-loading-image-popup').ajaxCallWidget({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'pkFillLanguageDdList_syslanguage' ,
                                pk : $("#pk").val(),
                                language_code : $("#langCode").val(),
                        }
               })
            ajaxLanguagePopup.ajaxCallWidget ({
                 onError : function (event, textStatus,errorThrown) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#languages-loading-image-popup').loadImager('removeLoadImage');
                            $('#native-language-loading-image-popup').loadImager('removeLoadImage');
                        }
                     });
                     dm.dangerMessage('show', 'Yabancı Dil  Bulunamamıştır...',
                                              'Sistemde kayıtlı yabancı dil  bulunamamıştır...');
                 },
                 onSuccess : function (event, data) {
                     var data = $.parseJSON(data);
                     $('#languages-loading-image-popup').loadImager('removeLoadImage');
                     $('#native-language-loading-image-popup').loadImager('removeLoadImage');

                     $('#dropdownMainLanguagePopup').ddslick({
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
                    $('#dropdownMainLanguagePopup').ddslick('selectByValue', 
                                                {index: ''+row.preferred_language+'' }
                                                );

                    $('#dropdownLanguagesPopup').ddslick({
                        height : 200,
                        data : data, 
                        width:'98%',
                        selectText: "Select your preferred social network",
                        //showSelectedHTML : false,
                        defaultSelectedIndex: 3,
                        search : true,
                        multiSelect : true,
                        multiSelectTagID : 'languagesPopup',
                        tagBox : 'tag-container-popup',
                        //imagePosition:"right",
                        onSelected: function(selectedData){
                            if(selectedData.selectedData.value>0) {
                                /*$('#tt_tree_menu').tree({
                                    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                                });*/
                            }
                        }   
                    });
                    ddDataLanguages = $('#dropdownLanguagesPopup').data('ddslick');
                    $('#dropdownLanguagesPopup').ddslick('selectByMultiValues', 
                                                {id: ''+ddDataLanguages.settings.multiSelectTagID+'',
                                                tagBox : ''+ddDataLanguages.settings.tagBox+''},
                                                 data,
                                                 row.preferred_language_json
                                                );
                    
                    
                 },
                 onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#languages-loading-image-popup').loadImager('removeLoadImage');
                            $('#native-language-loading-image-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'Yabancı Diller Bulunamamıştır...',
                                              'Yabancı diller  bulunamamıştır...');
                 },
            }) 
            ajaxLanguagePopup.ajaxCallWidget('call');
            
            var ajaxOSBPopup = $('#osb-loading-image-popup').ajaxCallWidget({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'pkFillOsbDdlist_sysOsb' ,
                                pk : $("#pk").val(),
                                language_code : $("#langCode").val(),
                        }
               })
            ajaxOSBPopup.ajaxCallWidget ({
                 onError : function (event, textStatus,errorThrown) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#osb-loading-image-popup').loadImager('removeLoadImage');
                        }
                     });
                     dm.dangerMessage('show', 'Organize Sanayi Bölgesi  Bulunamamıştır...',
                                              'Sistemde kayıtlı organize sanayi bölgesi  bulunamamıştır...');
                 },
                 onSuccess : function (event, data) {
                     var data = $.parseJSON(data);
                     $('#osb-loading-image-popup').loadImager('removeLoadImage');

                    $('#dropdownOSBPopup').ddslick({
                        height : 200,
                        data : data, 
                        width:'98%',
                        selectText: "Select your preferred social network",
                        //showSelectedHTML : false,
                        defaultSelectedIndex: 3,
                        search : false,
                        //imagePosition:"right",
                        onSelected: function(selectedData){
                            if(selectedData.selectedData.value>0) {
                                /*$('#tt_tree_menu').tree({
                                    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                                });*/
                            }
                        }   
                    });
                   $('#dropdownOSBPopup').ddslick('selectByValue', 
                                                {index: ''+row.osb_id+'' }
                                                );
                 },
                 onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#osb-loading-image-popup').loadImager('removeLoadImage');
                        }
                     });
                     dm.dangerMessage('show', 'Organize Sanayi Bölgesi Bulunamamıştır...',
                                              'Organize Sanayi Bölgesi  bulunamamıştır...');
                 },
            }) 
            ajaxOSBPopup.ajaxCallWidget('call');
            

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
 * update Consultant wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
window.updateConsultantWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#consultantsFormPopup").validationEngine('validate')) {
     
     var ddData = $('#dropdownConsultantRolesPopup').data('ddslick');
     
    var ddDataRolesPopup = $('#dropdownConsultantRolesPopup').data('ddslick');
    var ddDataNativeLanguagePopup = $('#dropdownMainLanguagePopup').data('ddslick');
    var ddDataLanguagesSettingsPopup = $('#dropdownLanguagesPopup').data('ddslick');
    var ddDataLanguagesPopup = $('#dropdownLanguagesPopup').ddslick('selectedValues',
                                                                {id: ''+ddDataLanguagesSettingsPopup.settings.multiSelectTagID+'' 
                                                                });
     
    if(!ddDataRolesPopup.selectedData.value > 0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Danışman Rolü Seçiniz', 'Lütfen danışman rolü seçiniz!');
        return false;
    }
    
    if(!ddDataNativeLanguagePopup.selectedData.value > 0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Ana Dil Seçiniz', 'Lütfen danışman ana dili seçiniz!');
        return false;
    }
    
    if(ddDataLanguagesPopup.length == 0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Danışman Yabancı Dillerini Seçiniz', 'Lütfen danışman yabancı dillerini seçiniz!');
        return false;
    }
     
    //updateConsultant(id);
    return false;
 }
 return false;
}

/**
 * update Consultant
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
window.updateConsultant = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
    var name = $('#name_popup').val();
    var surname = $('#surname_popup').val();
    var username = $('#username_popup').val();
     
    var ddDataRoles = $('#dropdownConsultantRolesPopup').data('ddslick')
    var role_id = ddDataRoles.selectedData.value;
     
    var ddDataNativeLanguage = $('#dropdownMainLanguagePopup').data('ddslick')
    var preferred_language = ddDataNativeLanguage.selectedData.value;
     
    var ddDataLanguages = $('#dropdownLanguagesPopup').data('ddslick');
    var multiSelectedLanguages = $('#dropdownLanguagesPopup').ddslick('selectedValues',
                                                                {id: ''+ddDataLanguages.settings.multiSelectTagID+'' 
                                                                });
    var languagesID = $.extend({}, multiSelectedLanguages);
    var preferred_language_json = JSON.stringify(languagesID);
     
    var ddDataOSB = $('#dropdownOSBPopup').data('ddslick')
    var osb_id= ddDataOSB.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysAclActions' ,
                         id : id,
                         preferred_language  : preferred_language ,
                         role_id : role_id,
                         username : username,
                         name : name,
                         surname : surname,
                         preferred_language_json : preferred_language_json,
                         osb_id : osb_id,
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
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert Consultant
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
window.insertConsultant = function () {
    var loaderInsertBlock = $("#loading-image-crud").loadImager();
    loaderInsertBlock.loadImager('appendImage');
     
    var name = $('#name').val();
    var surname = $('#surname').val();
    var username = $('#username').val();
     
    var ddDataRoles = $('#dropdownConsultantRoles').data('ddslick')
    var role_id = ddDataRoles.selectedData.value;
     
    var ddDataNativeLanguage = $('#dropdownMainLanguage').data('ddslick')
    var preferred_language = ddDataNativeLanguage.selectedData.value;
     
    var ddDataLanguages = $('#dropdownLanguages').data('ddslick');
    var multiSelectedLanguages = $('#dropdownLanguages').ddslick('selectedValues',
                                                                {id: ''+ddDataLanguages.settings.multiSelectTagID+'' 
                                                                });
    var languagesID = $.extend({}, multiSelectedLanguages);
    var preferred_language_json = JSON.stringify(languagesID);
     
    var ddDataOSB = $('#dropdownOSB').data('ddslick')
    var osb_id= ddDataOSB.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsertConsultant_infoUsers' ,
                         preferred_language  : preferred_language ,
                         role_id : role_id,
                         username : username,
                         name : name,
                         surname : surname,
                         osb_id : osb_id,
                         preferred_language_json : preferred_language_json,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Danışman  Ekleme İşlemi Başarısız...', 
                                       'Danışman ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsertConsultant_infoUsers" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#consultantsForm')[0].reset();  

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkFillOsbConsultantListGrid_sysOsbConsultants',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Danışman Kayıt İşlemi Başarılı...', 
                                       'Danışman kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Danışman Kayıt İşlemi Başarısız...', 
                                       'Danışman  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsertConsultant_infoUsers" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Danışman  Kayıt İşlemi Başarısız...', 
                                     'Danışman  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsertConsultant_infoUsers" servis hatası->'+data.errorInfo);
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#consultantsForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Danışman Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile danışman  kaydı yapılmıştır, yeni bir danışman deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive Consultant
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
window.activePassiveConsultantsWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveConsultant(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Danışman Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Danışman aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive Consultant
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 09/08/2016
 */
window.activePassiveConsultant = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysOsbConsultants' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Danışman Aktif/Pasif İşlemi Başarısız...', 
                                      'Danışman aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysOsbConsultants" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Danışman Aktif/Pasif İşlemi Başarılı...', 
                                       'Danışman aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Danışman Aktif/Pasif İşlemi Başarısız...', 
                                      'Danışman aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysOsbConsultants" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Danışman Aktif/Pasif İşlemi Başarısız...', 
                                      'Danışman aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
