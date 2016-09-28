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
    
    
var treeMachine = $('.tree2').machineTree();
    treeMachine.machineTree('option', 'url', 'pkFillMachineToolGroups_sysMachineToolGroups');
    treeMachine.machineTree('option', 'pk', $("#pk").val());
    treeMachine.machineTree('option', 'baseNodeCollapsedIcon', 'fa-hand-o-right');
    treeMachine.machineTree('option', 'baseNodeExpandedIcon', 'fa-hand-o-down');
    treeMachine.machineTree('setMainRoot');
    
    treeMachine.machineTree({
        getMachineProp : function(event, tree, node) {
            //alert('getMachineProp triggerred');
            //alert(node.parent('li.parent_li').parent('ul').prev().attr('id'));
            var machineGroupID = node.parent('li.parent_li').parent('ul').prev().attr('id');
            var machineID = node.attr('id');
            
            $('html, body').stop().animate({
                'scrollTop': $('.scrollTree').offset().top
           }, 900, 'swing');
            
            $('#tt_tree_menu2').tree({  
                checkbox : false,  
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillMachineGroupProperties_sysMachineToolPropertyDefinition&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val()+'&machine_grup_id='+machineGroupID+'&machine_id='+machineID,
            });
            
            $('#machID').val(machineID);
            $('#machName').val(node.text());
        }
    });
   

/**
 * Machine datagrid is being filled
 * @since 16/05/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkGetMachineTools_sysMachineTools',
            /*machine_groups_id : null,
            filterRules:null*/
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
            {field:'group_name',title:'Mak. Kategorisi', width:100},
            {field:'manufacturer_name',title:'Üretici', width:150},
            {field:'machine_tool_name',title:'Makina',sortable:true,width:300},
            {field:'machine_tool_name_eng',title:'İng. Makina',sortable:true, width:300},
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
                                                                                                                                                      group_name : \''+row.group_name+'\',\n\
                                                                                                                                                      machine_tool_name_eng : \''+row.machine_tool_name_eng+'\',\n\
                                                                                                                                                      model : \''+row.attributes.model+'\',\n\
                                                                                                                                                      model_year : \''+row.attributes.model_year+'\',\n\
                                                                                                                                                      machine_code : \''+row.attributes.machine_code+'\',\n\
                                                                                                                                                      machine_tool_grup_id : \''+row.attributes.machine_tool_grup_id+'\',\n\
                                                                                                                                                      manufactuer_id : \''+row.attributes.manufactuer_id+'\',\n\
                                                                                                                                                      manufacturer_name : \''+row.manufacturer_name+'\' } );"><i class="fa fa-arrow-circle-up"></i></button>';
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
* @Since 16/05/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for roles tree 
* this imager goes to #loading-image div in html.
* imager will be removed on roles tree onLoadSuccess method.
*/
//var loader = $("#loading-image").loadImager();

var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});
                                            
 
 /*
* 
* @type @call;$@call;loadImager
* @Since 16/05/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for machine 
* producers dropdown. Loading image will be removed when dropdown filled data.
*/
$("#mach-prod-box").loadImager();
$("#mach-prod-box").loadImager('appendImage');

/**
 * machine insert form validation engine attached to work
 * @since 16/05/2016
 */
//$('#machineForm').validationEngine();

  
/*
* 
* machine category tree
* Mustafa Zeynel Dağlı
* 25/04/2016
*/
$('#tt_tree_menu2').tree({  
    //url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillJustMachineToolGroupsBootstrap_sysMachineToolGroups&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
    method: 'get',
    animate: true,
    checkbox: true,
    cascadeCheck: false,
    lines: true,
    onLoadSuccess: function (node, data) {
         //loader.loadImager('removeLoadImage');
    },
    onSelect : function(node) {
    },
    
    formatter: function (node) {
        //console.log(node);
         var s = node.text;
         var propertyID = node.id;
         var parent = $(this).tree('getParent', node.target);
         
         if(node.attributes.active == true) {
             s += '&nbsp;\n\
                 <i class="fa fa-level-down" title="Özelliği güncelle" onclick="updateMachPropDialog('+propertyID+', { machine_grup_id : \''+node.attributes.machine_grup_id+'\',\n\
                                                                                                                        property_name : \''+node.text+'\',\n\
                                                                                                                        unit_id : \''+node.attributes.unit_id+'\',\n\
                                                                                                                        machine_tool_id : \''+node.attributes.machine_tool_id+'\',\n\
                                                                                                                        property_value :  \''+node.attributes.property_value+'\'})"></i>';
             s += '&nbsp;\n\
                 <i class="fa fa-fw fa-check-square-o" title="özellik sil" onclick="deleteIndMachPropUltimatelyDialog('+propertyID+', '+$('#machID').val()+')"></i>';
         } else if(node.attributes.active == false) {
              s += '&nbsp;\n\
                 <i class="fa fa-fw fa-ban" title="aktif yap" onclick="insertIndMachPropDialog('+propertyID+', \''+node.text+'\', \''+$('#machName').val()+'\');"></i>';
         }
         return s;
     }
});

/**
 * wrapper for indivigual machine property update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 27/06/2016
 */
window.updateMachPropDialog = function (propertyID, row) {
//console.log(row);  
var row = row;
var machName = $('#machName').val();
BootstrapDialog.show({  
     title: ' "'+machName+'" makinasında,  "'+ row.property_name + '" özelliğini güncellemektesiniz...',
     message: function (dialogRef) {
                 var dialogRef = dialogRef;
                 var $message = $(' <div class="row">\n\
                                         <div class="col-md-12">\n\
                                             <div id="loading-image-update-popup" class="box box-primary">\n\
                                                 <form id="machPropUpdateFormPopup" method="get" class="form-horizontal">\n\
                                                 <div class="hr-line-dashed"></div>\n\
                                                    <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Birim Değeri</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group" style="margin-top: 20px;">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input  data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="property_value_popup_update" id="property_value_popup_update" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                     <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Birimler</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div id="loading-image-unit" class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                        <div id="dropdownUnitsUpdatePopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group">\n\
                                                         <div class="col-sm-10 col-sm-offset-2">\n\
                                                         <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateMachPropWrapper(event, '+propertyID+', { machine_grup_id : \''+row.machine_grup_id+'\',\n\
                                                                                                                                                                                            property_name : \''+row.text+'\',\n\
                                                                                                                                                                                            unit_id : \''+row.unit_id+'\',\n\
                                                                                                                                                                                            machine_tool_id : \''+row.machine_tool_id+'\',\n\
                                                                                                                                                                                            property_value :  \''+row.property_value+'\'});">\n\
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
        $('#machine_tool_group_id_popup').val(''+row.machine_tool_grup_id+'');

        $('#machPropUpdateFormPopup').validationEngine();
        $('#property_value_popup_update').val(row.property_value);
         
        var ajaxMacPropUpdateUnitsPopup = $(window).ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: { url:'pkFillPropertyUnits_sysMachineToolProperties' ,
                            language_code : 'tr',
                            pk : $("#pk").val(),
                            property_id : propertyID 
                    }
       })
        ajaxMacPropUpdateUnitsPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       //$('#mach-prod-box').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'Makina Üreticisi Bulunamamıştır...',
                                         'Makina üreticisi firma bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                    //$('#mach-prod-box').loadImager('removeLoadImage');
                    $('#dropdownUnitsUpdatePopup').ddslick({
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
                    $('#dropdownUnitsUpdatePopup').ddslick('selectByValue', 
                                                {index: ''+row.unit_id+'' ,
                                                 /*text : ''+row.manufacturer_name+''*/}
                                                );
                },
                onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#mach-prod-box').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'Birim Bulunamamıştır...',
                                              'Birim değerleri bulunamamıştır...');
                 },
            }) 
        ajaxMacPropUpdateUnitsPopup.ajaxCallWidget('call');
     },
     onhide : function() {
     },
 });
 return false;
}

/**
 * update indivigual machine property item
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 27/06/2016
 */
window.updateMachPropWrapper = function (e, id, row) {
 e.preventDefault();
 var id = id;
 if ($("#machPropUpdateFormPopup").validationEngine('validate')) {
        var ddData = $('#dropdownUnitsUpdatePopup').data('ddslick');
        if(ddData.selectedData.value>0) {
            updateMachProp(id, { machine_grup_id : row.machine_grup_id,
                                property_name : row.text,
                                unit_id : row.unit_id,
                                machine_tool_id : row.machine_tool_id,
                                property_value :  row.property_value });
        } else {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Birim Seçiniz', 'Lütfen birim seçiniz!')
        }
        return false;
 
 }
 return false;
}

/**
 * update indivigual machine property item
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 27/06/2016
 */
window.updateMachProp = function (property_id, row) {
    console.log(row);
     var loader = $('#loading-image-update-popup').loadImager();
     loader.loadImager('appendImage');
     
     var property_value = $('#property_value_popup_update').val();
     var ddData = $('#dropdownUnitsUpdatePopup').data('ddslick');
     var unit_id = ddData.selectedData.value;
     var machine_tool_id = row.machine_tool_id;
     var property_id = property_id;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysMachineToolProperties' ,
                         language_code : $('#langCode').val(),
                         machine_tool_id : machine_tool_id,
                         property_id : property_id,
                         property_value : property_value,
                         unit_id : unit_id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Tekil Makina Özelliği Güncelleme İşlemi Başarısız...', 
                                           'Tekil makina özelliği güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMachineTools" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Tekil Makina Özelliği Güncelleme İşlemi Başarılı...', 
                                       'Tekil makina güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
            selectedTreeItem = $('#tt_tree_menu2').tree('find', property_id);
            var clickedNode = selectedTreeItem;
            $('#tt_tree_menu2').tree('remove', selectedTreeItem.target);
            $('#tt_tree_menu2').tree('append', {
                    data: [{
                        attributes:{machine_grup_id: clickedNode.attributes.machine_grup_id, 
                                    property_name_eng: clickedNode.attributes.property_name_eng, 
                                    active: true,
                                    unit_id : unit_id,
                                    machine_tool_id : clickedNode.attributes.machine_tool_id,
                                    property_value : property_value},
                        id: clickedNode.id,
                        text: clickedNode.text,
                        checked: clickedNode.checked,
                        state : 'open',
                    }]
            });
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Tekil Makina Özelliği Güncelleme İşlemi Başarısız...', 
                                      'Tekil makina özelliği güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMachineTools" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Tekil Makina Özelliği Güncelleme İşlemi Başarısız...', 
                                      'Tekil makina özelliği güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
            dm.dangerMessage('resetOnShown');
            dm.dangerMessage('show', 'Tekil Makina Özelliği Güncelleme İşlemi Başarısız...', 
                                      'Tekil makina özelliği daha önce sisteme girilmiştir, Lütfen farklı bir özellik değeri veya birim giriniz... ');
          }
    }) 
    aj.ajaxCall('call');
}




 /**
    * wrapper for machine property insert process
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 21/06/2016
    */
   window.insertIndMachPropDialog = function (propertyID, propertyName, machineName) {
    var propertyID = propertyID;
    var propertyName = propertyName;
    var machineName = machineName;
    var dialog = BootstrapDialog.show({  
        title: '"'+ machineName + '" makinasına "'+propertyName+'" özelliği eklemektesiniz...',
        message: function (dialogRef) {
                    var dialogRef = $(dialogRef);
                    var $message = $(' <div class="row">\n\
                                            <div class="col-md-12">\n\
                                                <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                    <form id="machPropFormInsertPopup" method="get" class="form-horizontal">\n\
                                                    <div class="hr-line-dashed"></div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Birim Değeri</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group" style="margin-top: 20px;">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="property_value_popup" id="property_value_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Birimler</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div id="loading-image-unit" class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                        <div id="dropdownUnits" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="hr-line-dashed"></div>\n\
                                                        <div class="form-group">\n\
                                                            <div class="col-sm-10 col-sm-offset-2">\n\
                                                            <button id="insertUnitPopUp" class="btn btn-primary" type="submit" onclick="return insertIndMachPropWrapper(event, '+propertyID+', \''+propertyName+'\', '+dialog+');">\n\
                                                                <i class="fa fa-save"></i> Kaydet </button>\n\
                                                            <button id="resetForm" onclick="regulateButtonsPopupInsert();" class="btn btn-flat" type="reset" " >\n\
                                                                <i class="fa fa-remove"></i> Reset </button>\n\
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
           $("#machPropFormInsertPopup").validationEngine();
           var loader = $("#loading-image-unit").loadImager();
           loader.loadImager('appendImage');
           /**
            * machine property unit dropdown ajax call
            * @type @call;$@call;ajaxCallWidget
            * @since 21/06/2016
            */
           var ajaxMacunits = $(window).ajaxCallWidget({
               proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                       data: { url:'pkFillPropertyUnits_sysMachineToolProperties' ,
                               language_code : 'tr',
                               pk : $("#pk").val(),
                               property_id : propertyID
                       }
              })
           ajaxMacunits.ajaxCallWidget ({
                onError : function (event, textStatus,errorThrown) {
                    dm.dangerMessage({
                       onShown : function() {
                           $('#loading-image-unit').loadImager('removeLoadImage'); 
                       }
                    });
                    dm.dangerMessage('show', 'Birim bulunamamıştır...',
                                             'Makina özelliğine ait birim bulunamamıştır...');
                },
                onSuccess : function (event, data) {
                    var data = $.parseJSON(data);
                    $('#loading-image-unit').loadImager('removeLoadImage');
                    $('#dropdownUnits').ddslick({
                       height : 200,
                       data : data, 
                       width:'98%',
                       selectText: "Select your preferred social network",
                       //showSelectedHTML : false,
                       //defaultSelectedIndex: 3,
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
                           $('#loading-image-unit').loadImager('removeLoadImage'); 
                       }
                    });
                    dm.dangerMessage('show', 'Birim bulunamamıştır...',
                                             'Makina özelliğine ait birim bulunamamıştır...');
                },
           }) 
           ajaxMacunits.ajaxCallWidget('call');

           
        },
        onhide : function() {
        },
    });
    return false;
   }
   
   /**
    * insert indiviqual mach prop
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 21/06/2016
    */
   window.insertIndMachPropWrapper = function (e, propertyID, propertyName, dialogRef) {
    e.preventDefault();
    var propertyID = propertyID;
    var propertyName = propertyName;
    var dialogRef = dialogRef;

    if ($("#machPropFormInsertPopup").validationEngine('validate')) {
        var ddData = $('#dropdownUnits').data('ddslick');
        if(ddData.selectedData.value>0) {
            insertIndMachProp(propertyID, propertyName, dialogRef);
        } else {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Birim Seçiniz', 'Lütfen Birim Seçiniz!');
        }
        
    }
    return false;
   }
   
   /**
    * insert indiviqual machine property item
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 21/06/2016
    */
   window.insertIndMachProp = function (propertyID, propertyName, dialogRef) {
        var loader = $("#loading-image-crud-popup").loadImager();
        loader.loadImager('appendImage');
        var dialogRef = dialogRef;
        
        var property_value = $('#property_value_popup').val();
        var ddData = $('#dropdownUnits').data('ddslick');
        var unit_id = ddData.selectedData.value;
        var machine_tool_id = $('#machID').val();     
        var language_code = $('#langCode').val();
        var property_id = propertyID;

        var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                        data : {
                            url:'pkInsert_sysMachineToolProperties' ,
                            language_code : language_code,
                            property_id : property_id,
                            machine_tool_id : machine_tool_id,
                            unit_id : unit_id,
                            property_value : property_value,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({  
             onError : function (event, textStatus, errorThrown) {   
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Makinaya özellik ekleyemediniz...', 
                                          'Makinaya özellik ekleyeme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
                 console.error('"pkInsert_sysMachineToolProperties" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 console.log(data);
                 var data = data;
                sm.successMessage({
                    onShown: function( event, data ) {
                        console.log(data);
                        $('#machPropFormInsertPopup')[0].reset();
                        //regulateButtonsPopupInsert();
                        loader.loadImager('removeLoadImage');
                        //dialogRef.close();
                        BootstrapDialog.closeAll();
                        
                        selectedTreeItem = $('#tt_tree_menu2').tree('find', property_id);
                        var clickedNode = selectedTreeItem;
                        $('#tt_tree_menu2').tree('remove', selectedTreeItem.target);
                        $('#tt_tree_menu2').tree('append', {
                                data: [{
                                    attributes:{machine_grup_id: clickedNode.attributes.machine_grup_id, 
                                                property_name_eng: clickedNode.attributes.property_name_eng, 
                                                active: true,
                                                unit_id : clickedNode.attributes.unit_id,
                                                machine_tool_id : clickedNode.attributes.machine_tool_id,
                                                property_value : clickedNode.attributes.property_value},
                                    id: clickedNode.id,
                                    text: clickedNode.text,
                                    checked: clickedNode.checked,
                                    state : 'open',
                                }]
                        });
                    }
                });
                sm.successMessage('show', 'Makina Özelliği Kayıt İşlemi Başarılı...', 
                                          'Makina özellik ekleme  işlemini gerçekleştirdiniz... ',
                                          data);
                
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Makina Özelliği Kayıt İşlemi Başarısız...', 
                                          'Makina özelliği kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                 console.error('"pkUpdateMakeActiveOrPassive_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Özelliği Kayıt İşlemi Başarısız...', 
                                        'Makina özelliği kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdateMakeActiveOrPassive_sysUnits" servis hatası->'+textStatus);
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
                 dm.dangerMessage({
                    onShown : function(event, data) {
                        $('#machPropFormInsertPopup')[0].reset();
                        loader.loadImager('removeLoadImage');
                    }
                 });
                 dm.dangerMessage('show', 'Makina Özelliği Kayıt İşlemi Başarısız...', 
                                          'Aynı isim ile kayıt yapılmıştır, yeni bir kayıt deneyiniz... ');
             }
       }) 
       aj.ajaxCall('call');
   }
    
/**
 * set machine due to machine categories
 * @param {type} node
 * @param {type} treeObj
 * @param {type} tagBuilder
 * @returns {undefined}
 * @since 17/05/2016
 */
window.getMachineDueCategories = function(node, treeObj) {
    //alert('getMachineDueCategories');
    var nodeID = node.id;
    var checkedArray = [];
    var checked = treeObj.tree('getChecked');
    if(checked.length >0) {
        $.each(checked, function(index, item) {
            checkedArray.push(parseInt(item.id));
        });
        var objChecked = $.extend({}, checkedArray);
        var json=JSON.stringify(objChecked);
        //console.log(json);;
        //console.log(JSON.parse(json)); 

        //$('#tt_grid_dynamic').datagrid('disableFilter');
        $('#tt_grid_dynamic').datagrid({  
            queryParams: {
                    pk: $('#pk').val(),
                    subject: 'datagrid',
                    url : 'pkGetMachineTools_sysMachineTools',
                    machine_groups_id : json,
                    //filterRules:[{"field":"machine_tool_name","op":"contains","value":"e"}]
            },
        });
        $('#tt_grid_dynamic').datagrid('enableFilter');
    } 
}

/**
 * get all machines and fill to datagrid
 * @param {type} node
 * @param {type} treeObj
 * @returns {undefined}
 * @since 20/05/2016
 */
window.getAllMachinesToDatagrid = function(node, treeObj) {
    //alert('getAllMachinesToDatagrid');
    var nodeID = node.id;
    var checkedArray = [];
    var checked = treeObj.tree('getChecked');
    if(checked.length == 0) {
        $('#tt_grid_dynamic').datagrid({  
            queryParams: {
                    pk: $('#pk').val(),
                    subject: 'datagrid',
                    url : 'pkGetMachineTools_sysMachineTools',
            },
        });
        $('#tt_grid_dynamic').datagrid('enableFilter');
    } 
}
    

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();
   
/**
 * wrapper class for pop up and delete indiviqual machine property
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 20/06/2016
 */
window.deleteIndMachPropUltimatelyDialog= function(nodeID, index){
    var nodeID = nodeID;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteIndMachPropUltimately(nodeID, index);
    }
    });
    wcm.warningComplexMessage('show', 'Tekil Makina Özelliği Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Tekil makina özelliği  silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete machine 
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 20/05/2016
*/
window.deleteIndMachPropUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');
    var machine_id = $('#machID').val(); 

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDeletePropertyMachine_sysMachineToolProperties' ,
                    property_id : id,
                    machine_id : machine_id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Tekil Makina Özelliği Silme İşlemi Başarısız...',
                                      'Tekil makina özelliği silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDeletePropertyMachine_sysMachineToolProperties" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    loaderGridBlock.loadImager('removeLoadImage');
                    //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                    
                    selectedTreeItem = $('#tt_tree_menu2').tree('find', id);
                    var clickedNode = selectedTreeItem;
                    $('#tt_tree_menu2').tree('remove', selectedTreeItem.target);
                    $('#tt_tree_menu2').tree('append', {
                            data: [{
                                attributes:{machine_grup_id: clickedNode.attributes.machine_grup_id, 
                                            property_name_eng: clickedNode.attributes.property_name_eng, 
                                            active: false,
                                            unit_id : clickedNode.attributes.unit_id,
                                            machine_tool_id : clickedNode.attributes.machine_tool_id,
                                            property_value : clickedNode.attributes.property_value},
                                id: clickedNode.id,
                                text: clickedNode.text,
                                checked: clickedNode.checked,
                                state : 'open',
                            }]
                    });
                    
                }
            });
            sm.successMessage('show', 'Tekil Makina Özelliği Silme İşleminiz Başarılı...',
                                      'Tekil makina özelliği silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
   
/**
 * wrapper for machine update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 27/06/2016
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
                                                 <form id="machFormPopup" method="get" class="form-horizontal">\n\
                                                 <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                 <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group" style="padding-top: 10px;" >\n\
                                                         <label class="col-sm-2 control-label">Birim Sistemi</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <ul id="tt_tree_menu2_popup" class="easyui-tree" ></ul>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Mevcut Makina Kategorisi</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div  class="tag-container-popup">\n\
                                                                     <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.group_name+'" name="group_name_popup" id="group_name_popup" disabled="true"  />\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Makina Adı</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.machine_tool_name+'" name="machine_tool_name_popup" id="machine_tool_name_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">İngilizce Makina Adı</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.machine_tool_name_eng+'" name="machine_tool_name_eng_popup" id="machine_tool_name_eng_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Üretici Firma</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div id="dropdownProducersPopup" ></div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Model</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.model+'" name="model_popup" id="model_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Model Yılı</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.model_year+'" name="model_year_popup" id="model_year_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Makina Kodu</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control" type="text" value="'+row.machine_code+'" name="machine_code_popup" id="machine_code_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group">\n\
                                                         <div class="col-sm-10 col-sm-offset-2">\n\
                                                         <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateMachWrapper(event, '+id+');">\n\
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
        $('#machine_tool_group_id_popup').val(''+row.machine_tool_grup_id+'');
        
        //alert($("input[name=machine_tool_group_id]:hidden").val());
        $('#machFormPopup').validationEngine();
        $('#tt_tree_menu2_popup').tree({  
            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillJustMachineToolGroupsBootstrap_sysMachineToolGroups&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
            method: 'get',
            animate: true,
            checkbox: false,
            cascadeCheck: false,
            lines: true,
            onLoadSuccess: function (node, data) {
                 //loader.loadImager('removeLoadImage');
            },
            onSelect : function(node) {
                var self = $(this);
                if(!self.tree('isLeaf', node.target)) {
                    wm.warningMessage( {
                        onShown : function (event ,data ) {
                           self.tree('unselect', node.target); 
                        }
                    });
                    wm.warningMessage('show','Alt Kategori Seçiniz',
                                             'Lütfen alt kategori seçiniz...');
                } else {
                    $('#group_name_popup').val(node.text);
                    $('#machine_tool_group_id_popup').val(''+node.id+'');
                }
            },
            onCheck: function (node, checked) {
                 var self = $(this);
                 if(checked) {
                     if(!self.tree('isLeaf', node.target)) {
                         wm.warningMessage( {
                             onShown : function (event ,data ) {
                                self.tree('uncheck', node.target); 
                             }
                         });
                         wm.warningMessage('show','Alt Kategori Seçiniz',
                                                  'Lütfen alt kategori seçiniz...');

                     } else {
                         window.getMachineDueCategories(node, self);
                     }
                 } else if(checked == false){
                     if(self.tree('isLeaf', node.target) && node.state=='open') {
                         //window.getMachineDueCategories(node, self);  
                         window.getAllMachinesToDatagrid(node, self);
                     }
                 }
             },
        });
         
        var ajaxMacProducersPopup = $(window).ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: { url:'pkFillManufacturerList_sysManufacturer' ,
                            language_code : 'tr',
                            pk : $("#pk").val() 
                    }
       })
        ajaxMacProducersPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       //$('#mach-prod-box').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'Makina Üreticisi Bulunamamıştır...',
                                         'Makina üreticisi firma bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                    //$('#mach-prod-box').loadImager('removeLoadImage');
                    $('#dropdownProducersPopup').ddslick({
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
                    $('#dropdownProducersPopup').ddslick('selectByValue', 
                                                {index: ''+row.manufactuer_id+'' ,
                                                text : ''+row.manufacturer_name+''}
                                                );
                },
                onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#mach-prod-box').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'Makina Üreticisi Bulunamamıştır...',
                                              'Makina üreticisi firma bulunamamıştır...');
                 },
            }) 
            ajaxMacProducersPopup.ajaxCallWidget('call');
     },
     onhide : function() {
     },
 });
 return false;
}

/**
 * update machine item
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 27/06/2016
 */
window.updateMachWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#machFormPopup").validationEngine('validate')) {
     /*selectedTreeItem = $('#tt_tree_menu2_popup').tree('getSelected');
     if(selectedTreeItem == null) {
         wm.warningMessage('resetOnShown');
         wm.warningMessage('show', 'Makina Kategorisi Seçiniz', 'Lütfen Makina Kategorisi Seçiniz!')
         return false;
     }*/

        var ddData = $('#dropdownProducersPopup').data('ddslick');
        if(ddData.selectedData.value>0) {
            updateMach(id);
        } else {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Üretici Firma Seçiniz', 'Lütfen üretici firma seçiniz!')
        }
        return false;
        updateMach(id);
 }
 return false;
}

/**
 * update machine item
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 27/06/2016
 */
window.updateMach = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     var machine_tool_group_id_popup = $('#machine_tool_group_id_popup').val();
     var machine_tool_name = $('#machine_tool_name_popup').val();
     var machine_tool_name_eng = $('#machine_tool_name_eng_popup').val();
     var ddData = $('#dropdownProducersPopup').data('ddslick');
     var manufactuer_id = ddData.selectedData.value;
     var model = $('#model_popup').val();
     var model_year = $('#model_year_popup').val();
     var machine_code = $('#machine_code_popup').val();
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysMachineTools' ,
                         language_code : $('#langCode').val(),
                         machine_tool_grup_id : machine_tool_group_id_popup,
                         machine_tool_name : machine_tool_name,
                         machine_tool_name_eng : machine_tool_name_eng,
                         manufactuer_id : manufactuer_id,
                         model : model,
                         model_year : model_year,
                         id : id,
                         machine_code : machine_code,
                         pk : $("#pk").val()
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
 * active/passive machine
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 20/05/2016
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
                                  'Makina aktif/pasif işlemi gerçekleştirmek  üzeresiniz, silme işlemi geri alınamaz!! ');
 return false;
}

/**
 * update machine item active or passive
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 27/06/2016
 */
window.activePassiveMachine = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    console.log(domElement);
    
     
    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysMachineTools' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Aktif/Pasif İşlemi Başarısız...', 
                                      'Makina aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysMachineTools" servis hatası->'+textStatus);
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
             console.error('"pkUpdateMakeActiveOrPassive_sysMachineTools" servis datası boştur!!');
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

/**
 * wrapper class for pop up and delete machine ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 27/06/2016
 */
window.deleteMachUltimatelyDialog= function(id, index){
    var nodeID = nodeID;
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteMachUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Makina Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Makina  silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete machine 
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 27/06/2016
*/
window.deleteMachUltimately = function(id, index) {
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
            dm.dangerMessage('show', 'Makina Silme İşlemi Başarısız...',
                                      'Makina özelliği silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysMachineTools" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    loaderGridBlock.loadImager('removeLoadImage');
                    //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                    $('#tt_grid_dynamic').datagrid('reload');
                    
                }
            });
            sm.successMessage('show', 'Makina  Silme İşleminiz Başarılı...',
                                      'Makina  silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}

   
   
   
});
