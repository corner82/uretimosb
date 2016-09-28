$(document).ready(function () {

        
//alert($('input[name=iCheckv]:checked', '#machineForm').val());

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
 * Machine datagrid is being filled
 * @since 22/08/2016
 */
$('#tt_grid_dynamic').datagrid({
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
    queryParams: {
            pk: $('#pk').val(),
            url : 'pkFillConsCompanyMachineLists_infoFirmMachineTool',
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
            {field:'machine_tool_name',title:'Makina', width:200},
            {field:'machine_tool_grup_name',title:'Makina Kat.', width:150},
            {field:'firm_name',title:'Firma',sortable:true,width:300},
            {field:'state_ownership',title:'Makina Sahipliği',sortable:true, width:50},
            {field:'state_availability',title:'Siparişe Uygun mu?',sortable:true, width:50},
            {field:'state_profile_public',title:'Makina Sorgulanabilir mi?',sortable:true, width:50},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveMachineWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveMachineWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    
                    //var d = '<a href="javascript:void(0)" onclick="deleteISScenario(this);">Delete</a>';
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteMachUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateMachDialog('+row.id+', { machine_tool_name : \''+row.machine_tool_name+'\',\n\
                                                                                                                                                      ownership_id : '+row.ownership_id+',\n\
                                                                                                                                                      profile_public : '+row.profile_public+',\n\
                                                                                                                                                      total : \''+row.total+'\',\n\
                                                                                                                                                      availability_id : '+row.availability_id+',\n\                                                                                                                        \n\
                                                                                                                                                      firm_name : \''+row.firm_name+'\' } );"><i class="fa fa-arrow-circle-up"></i></button>';
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

/*
* 
* @type @call;$@call;loadImager
* @Since 19/08/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for machine categories tree 
* this imager goes to #loading-image div in html.
* imager will be removed on roles tree onLoadSuccess method.
*/
$("#machine-categories-loading-image").loadImager();
$("#machine-categories-loading-image").loadImager('appendImage');

var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});
 
/*
* 
* machine category tree
* Mustafa Zeynel Dağlı
* 25/04/2016
*/
$('#tt_tree_menu2').tree({  
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillJustMachineToolGroupsBootstrap_sysMachineToolGroups&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
    method: 'get',
    animate: true,
    checkbox: false,
    cascadeCheck: false,
    lines: true,
    onLoadSuccess: function (node, data) {
        $("#machine-categories-loading-image").loadImager('removeLoadImage');
    },
    onSelect : function(node) {
    },
    onCheck: function (node, checked) {
    },
    formatter: function (node) {
         var s = node.text;
         var id = node.id;
         var parent = $(this).tree('getParent', node.target);
         if(node.state == 'open') {
             s += '&nbsp;\n\
                 <i class="fa fa-level-down" title="Kategoriye makina özelliği ekle" onclick="fillMachinesDatagrid('+id+')"></i>';
             return s;
         }
         return s;
     }
});

/**
 *  tree category changed machines datagrid
 * @author Mustafa Zeynel Dağlı
 * @since 18/08/2016
 */
$('#tt_grid_dynamic_machines').datagrid({  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkGetMachineToolsGrid_sysMachineTools',
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
            {field:'machine_tool_name',title:'Makina',sortable:true,width:200},
            {field:'manufacturer_name',title:'Üretici',sortable:true,width:100},
            {field:'group_name',title:'Makina Grubu',sortable:true,width:200},
            {field:'model',title:'Model',sortable:true,width:100},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    var u = '<button style="padding : 2px 4px;" title="Makinayı Seçilen Firmaya Ata"  class="btn btn-info" type="button" onclick="return insertMachDialog('+row.id+', { machine_tool_name : \''+row.machine_tool_name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                                                     role_name_tr : \''+row.role_name_tr+'\',\n\
                                                                                                                                                                                                     resource_name : \''+row.resource_name+'\'} );"><i class="fa fa-check-square"></i></button>';
                     var z = '<button style="padding : 2px 4px;" title="Makina Özelliklerini Gör"  class="btn btn-info" type="button" onclick="return exploreMachProperties('+row.id+', { machine_tool_name : \''+row.machine_tool_name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                                                     role_name_tr : \''+row.role_name_tr+'\',\n\
                                                                                                                                                                                                     resource_name : \''+row.resource_name+'\'} );"><i class="fa fa-tags"></i></button>';
                    return u + z;    
                }
            },
        ]],
});
$('#tt_grid_dynamic_machines').datagrid('enableFilter');

/**
 * machine category tree last node triggers machines grid to be filled
 * @param {type} id
 * @param {type} resource_id
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 18/08/2016
 */
window.fillMachinesDatagrid = function(id) {
    var loaderInsertBlock = $("#loading-image-crud").loadImager();
    loaderInsertBlock.loadImager('appendImage');
    
    var id = id;
    $('#tt_grid_dynamic_machines').datagrid({  
        url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        queryParams: {
            pk: $('#pk').val(),
            url : 'pkGetMachineToolsGrid_sysMachineTools',
            machine_groups_id : id,
        }, 
        onLoadSuccess : function(data) {
            loaderInsertBlock.loadImager('removeLoadImage');
        },
    });
    $('#tt_grid_dynamic_machines').datagrid('enableFilter');

    //detailview.bindEvents($('#tt_grid_dynamic_machines').datagrid());
}

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();


    
/**
 * wrapper class for pop up and delete company machine ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.deleteMachUltimatelyDialog= function(id, index){
    var nodeID = nodeID;
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteMachUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Firma Makinası Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Firma Makinası  silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete company machine 
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 22/08/2016
*/
window.deleteMachUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDeleteConsAct_infoFirmMachineTool' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Firma Makinası Silme İşlemi Başarısız...',
                                      'Firma makinası  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDeleteConsAct_infoFirmMachineTool" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    loaderGridBlock.loadImager('removeLoadImage');
                    //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                    $('#tt_grid_dynamic').datagrid('reload');
                    
                }
            });
            sm.successMessage('show', 'Firma Makinası  Silme İşleminiz Başarılı...',
                                      'Firma makinası  silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}

/**
 * explore machine properties in a popup window on easyui datagrid
 * @param {type} id
 * @param {type} row
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.exploreMachProperties = function (id, row) {
BootstrapDialog.show({  
     title: '"'+ row.machine_tool_name + '" makinası özelliklerini görüntülemektesiniz...',
     message: function (dialogRef) {
                 var dialogRef = dialogRef;
                 var $message = $(' <div class="row">\n\
                                         <div class="col-md-12">\n\
                                             <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                 <form id="insertMachFormPopup" method="get" class="form-horizontal">\n\
                                                 <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                 <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group" style="padding-top: 10px;" >\n\
                                                         <label class="col-sm-2 control-label">Makina Özellikleri</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <table  id="tt_grid_mach_properties" title="'+ row.machine_tool_name + '" ></table>\n\
                                                             </div>\n\
                                                         </div>\n\
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
         $('#tt_grid_mach_properties').datagrid({
           url:'https://proxy.uretimosb.com/SlimProxyBoot.php',
            queryParams: {
                    pk: $('#pk').val(),
                    machine_tool_id: id,
                    url : 'pkFillMachinePropertiesSubGridList_sysMachineToolProperties',
                    pk : $("#pk").val(),
                    language_code : $("#langCode").val(),
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
                    {field:'property_name',title:'Özellik',sortable:true,width:200},
                    {field:'property_value',title:'Değer',sortable:true,width:100},
                    {field:'unitcode',title:'Birim',sortable:true,width:50}
                ]],
        });
     },
     onhide : function() {
     },
 });
 return false;
}

  
/**
 * machine insert popup dialog
 * @param {type} id
 * @param {type} row
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 18/08/2016
 */   
window.insertMachDialog = function (id, row) {
console.log(row);
BootstrapDialog.show({  
     title: '"'+ row.machine_tool_name + '" makinasında çalışmaktasınız...',
     message: function (dialogRef) {
                 var dialogRef = dialogRef;
                 var $message = $(' <div class="row">\n\
                                         <div class="col-md-12">\n\
                                             <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                 <form id="insertMachFormPopup" method="get" class="form-horizontal">\n\
                                                 <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                 <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group" style="padding-top: 10px;" >\n\
                                                         <label class="col-sm-2 control-label">Makina Adeti</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required, custom[onlyNumberSp], min[1.0]]" type="text" name="totalPopup" id="totalPopup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Firmalar</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div  id="cons-machine-dropdown-loading-image" class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div id="dropdownConsProducersPopup" ></div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Makina Sahipliği</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-check"></i>\n\
                                                                 </div>\n\
                                                                 <div style="padding-left:20px;">\n\
                                                                    <input type="radio" name="macOwnerRadio" value="1" checked> <label style="padding-left:2px;padding-right: 15px;" >Firma</label>\n\
                                                                    <input type="radio" name="macOwnerRadio" value="2" > <label style="padding-left: 2px;">Leasing</label>\n\
                                                                </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Makina Siparişe Uygun Mu?</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-check"></i>\n\
                                                                 </div>\n\
                                                                 <div style="padding-left:20px;">\n\
                                                                    <input type="radio" name="macOrderRadio" value="1" checked> <label style="padding-left:2px;padding-right: 15px;" >Evet</label>\n\
                                                                    <input type="radio" name="macOrderRadio" value="2" > <label style="padding-left: 2px;">Hayır</label>\n\
                                                                </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Firma Sayfasında Gözüksün Mü?</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-check"></i>\n\
                                                                 </div>\n\
                                                                 <div style="padding-left:20px;">\n\
                                                                    <input type="radio" name="macPublicRadio" value="0" checked> <label style="padding-left:2px;padding-right: 15px;" >Evet</label>\n\
                                                                    <input type="radio" name="macPublicRadio" value="1" > <label style="padding-left: 2px;">Hayır</label>\n\
                                                                </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group">\n\
                                                         <div class="col-sm-10 col-sm-offset-2">\n\
                                                         <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return insertMachWrapper(event, '+id+');">\n\
                                                             <i class="fa fa-save"></i> Kaydet </button>\n\
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
         $('input').iCheck({
            checkboxClass: 'icheckbox_flat-blue',
            radioClass: 'iradio_flat-blue'
          });
          
         
        $('#insertMachFormPopup').validationEngine();
        
        $('#cons-machine-dropdown-loading-image').loadImager();
        $('#cons-machine-dropdown-loading-image').loadImager('appendImage');
        /**
        * consultant machine producers dropdown ajax call
        * @type @call;$@call;ajaxCallWidget
        * @since 19/08/2016
        */
       var ajaxConsProducersPopup = $(window).ajaxCallWidget({
           proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                   data: { url:'pkFillConsultantAllowFirmListDds_infoFirmProfile' ,
                           pk : $("#pk").val() 
                   }
          })
       ajaxConsProducersPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       $('#cons-machine-dropdown-loading-image').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'Makina Üreticisi Bulunamamıştır...',
                                         'Makina üreticisi firma bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                $('#cons-machine-dropdown-loading-image').loadImager('removeLoadImage');
                $('#dropdownConsProducersPopup').ddslick({
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
                       $('#cons-machine-dropdown-loading-image').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'Makina Üreticisi Bulunamamıştır...',
                                         'Makina üreticisi firma bulunamamıştır...');
            },
       }) 
       ajaxConsProducersPopup.ajaxCallWidget('call');
     },
     onhide : function() {
     },
 });
 return false;
}


/**
 * Company machine insert wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 19/08/2016
 */
window.insertMachWrapper = function (e, id) {
    e.preventDefault();
    var id = id;
    if ($("#insertMachFormPopup").validationEngine('validate')) {
           var ddData = $('#dropdownConsProducersPopup').data('ddslick');
           if(ddData.selectedData.value>0) {
               insertMach(id);
           } else {
               wm.warningMessage('resetOnShown');
               wm.warningMessage('show', 'Üretici Firma Seçiniz', 'Lütfen üretici firma seçiniz!')
           }
           return false;
    }
    return false;
}

/**
 * insert company machine 
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 19/08/2016
 */
window.insertMach = function (id) {
     var loaderInsertBlock = $("#loading-image-crud-popup").loadImager();
     loaderInsertBlock.loadImager('appendImage');

     var ownership_id = $('input[name=macOwnerRadio]:checked', '#insertMachFormPopup').val();
     var availability_id = $('input[name=macOrderRadio]:checked', '#insertMachFormPopup').val();
     var profile_public = $('input[name=macPublicRadio]:checked', '#insertMachFormPopup').val();

     var ddData = $('#dropdownConsProducersPopup').data('ddslick')
     var firm_id = ddData.selectedData.value;
     
     var total = $('#totalPopup').val();

     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsertCons_infoFirmMachineTool' ,
                         pk : $("#pk").val(),
                         language_code: $('#langCode').val(),
                         machine_id : id,
                         total : total,
                         firm_id : firm_id,
                         availability_id : availability_id,
                         ownership_id : ownership_id,
                         profile_public : profile_public, 
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Makina Ekleme İşlemi Başarısız...', 
                                       'Makina ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsertCons_infoFirmMachineTool" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#insertMachFormPopup')[0].reset();
                     $('#dropdownConsProducersPopup').ddslick('select', {index: '0' });
                     //var nodeSelected = $('#tt_tree_menu2').tree('find', machine_tool_grup_id);  

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 url : 'pkFillConsCompanyMachineLists_infoFirmMachineTool',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Makina Kayıt İşlemi Başarılı...', 
                                       'Makina kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Makina Kayıt İşlemi Başarısız...', 
                                       'Makina kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsertCons_infoFirmMachineTool" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Kayıt İşlemi Başarısız...', 
                                     'Makina kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsertCons_infoFirmMachineTool" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#machineForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Makina Kayıt İşlemi Başarısız...', 
                                       'Aynı makina - firma kaydı yapılmıştır, Mevcut kaydı güncelleyebilirsiniz yada başka  bir makina girişi deneyebilirsiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}

    
/**
 * wrapper for company / machine update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.updateMachDialog = function (id, row) {
console.log(row);
BootstrapDialog.show({  
     title: '"'+ row.machine_tool_name + '" makinasını güncellemektesiniz...',
     message: function (dialogRef) {
                 var dialogRef = dialogRef;
                 var $message = $(' <div class="row">\n\
                                         <div class="col-md-12">\n\
                                             <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                 <form id="updateMachFormPopup" method="get" class="form-horizontal">\n\
                                                 <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                 <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group" style="padding-top: 10px;" >\n\
                                                         <label class="col-sm-2 control-label">Makina Adeti</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required, custom[onlyNumberSp], min[1.0]]" type="text" name="totalPopup" id="updateTotalPopup" value="'+row.total+'" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Makina Sahipliği</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-check"></i>\n\
                                                                 </div>\n\
                                                                 <div style="padding-left:20px;">\n\
                                                                    <input type="radio" name="macOwnerRadioPopup" value="1" > <label style="padding-left:2px;padding-right: 15px;" >Firma</label>\n\
                                                                    <input type="radio" name="macOwnerRadioPopup" value="2" > <label style="padding-left: 2px;">Leasing</label>\n\
                                                                </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Makina Siparişe Uygun Mu?</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-check"></i>\n\
                                                                 </div>\n\
                                                                 <div style="padding-left:20px;">\n\
                                                                    <input type="radio" name="macOrderRadioPopup" value="1" > <label style="padding-left:2px;padding-right: 15px;" >Evet</label>\n\
                                                                    <input type="radio" name="macOrderRadioPopup" value="2" > <label style="padding-left: 2px;">Hayır</label>\n\
                                                                </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Firma Sayfasında Gözüksün Mü?</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-check"></i>\n\
                                                                 </div>\n\
                                                                 <div style="padding-left:20px;">\n\
                                                                    <input type="radio" name="macPublicRadioPopup" value="0" > <label style="padding-left:2px;padding-right: 15px;" >Evet</label>\n\
                                                                    <input type="radio" name="macPublicRadioPopup" value="1" > <label style="padding-left: 2px;">Hayır</label>\n\
                                                                </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group">\n\
                                                         <div class="col-sm-10 col-sm-offset-2">\n\
                                                         <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateMachWrapper(event, '+id+');">\n\
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
         window.dataGridControler = false;
        //console.log(row);
        $('#updateMachFormPopup').validationEngine();
        
        $("input[name='macPublicRadioPopup'][value='"+parseInt(row.profile_public)+"']").prop("checked", true);
        
        $("input[name='macOrderRadioPopup'][value='"+parseInt(row.availability_id)+"']").prop("checked", true);
        
        $("input[name='macOwnerRadioPopup'][value='"+parseInt(row.ownership_id)+"']").attr("checked", 'checked');
        
        $('input').iCheck({
            checkboxClass: 'icheckbox_flat-blue',
            radioClass: 'iradio_flat-blue'
          });
     },
     onhide : function() {
         if(window.dataGridControler) {
             $('#tt_grid_dynamic').datagrid('reload');
         }
     },
 });
 return false;
}

/**
 * update company machine
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.updateMachWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#updateMachFormPopup").validationEngine('validate')) {
    updateMach(id);
 }
 return false;
}

/**
 * update company machine
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.updateMach = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var ownership_id = $('input[name=macOwnerRadioPopup]:checked', '#updateMachFormPopup').val();
     var availability_id = $('input[name=macOrderRadioPopup]:checked', '#updateMachFormPopup').val();
     var profile_public = $('input[name=macPublicRadioPopup]:checked', '#updateMachFormPopup').val();
     
     var total = $('#updateTotalPopup').val();
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateCons_infoFirmMachineTool' ,
                         language_code : $('#langCode').val(),
                         pk : $("#pk").val(),
                         id : id,
                         profile_public : profile_public,
                         availability_id : availability_id,
                         ownership_id : ownership_id,
                         total : total
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Güncelleme İşlemi Başarısız...', 
                                           'Makina güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMachineTools" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Makina Güncelleme İşlemi Başarılı...', 
                                       'Makina güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
                                       $('#tt_grid_dynamic').datagrid('reload');
            window.dataGridControler = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Güncelleme İşlemi Başarısız...', 
                                      'Makina güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMachineTools" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Güncelleme İşlemi Başarısız...', 
                                      'Makina güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive company machine
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.activePassiveMachineWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveMachine(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Makina Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Makina aktif/pasif işlemi gerçekleştirmek  üzeresiniz, Firma makinası üzerinde işlem yapılacaktır!! ');
 return false;
}

/**
 * update company machine
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 22/08/2016
 */
window.activePassiveMachine = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);
    
     
    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_infoFirmMachineTool' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Aktif/Pasif İşlemi Başarısız...', 
                                      'Makina aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_infoFirmMachineTool" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Makina Aktif/Pasif İşlemi Başarılı...', 
                                       'Makina aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'Makina Aktif/Pasif İşlemi Başarısız...', 
                                      'Makina aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_infoFirmMachineTool" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Aktif/Pasif İşlemi Başarısız...', 
                                      'Makina aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
