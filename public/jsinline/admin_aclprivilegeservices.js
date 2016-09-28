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
 * privileges datagrid
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
$('#tt_grid_dynamic_privileges').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillPrivilegesOfRolesList_sysAclPrivilege',
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
            {field:'privilege_name',title:'Yetki',sortable:true,width:200},
            {field:'role_name_tr',title:'Rol',sortable:true,width:200},
            {field:'resource_name',title:'Resource',sortable:true,width:100},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.resource_name!='Sayfa Erişim') {
                       var u = '<button style="padding : 2px 4px;" title="Servis Atamaları Yap"  class="btn btn-info" type="button" onclick="return privilegeServiceAttachDialog('+row.id+', { privilege_name : \''+row.privilege_name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                                                     role_name_tr : \''+row.role_name_tr+'\',\n\
                                                                                                                                                                                                     resource_name : \''+row.resource_name+'\'} );"><i class="fa fa-exchange"></i></button>'; 
                        return u;
                    } else if(row.resource_name == 'Sayfa Erişim') {
                        var u = '<button style="padding : 2px 4px;" title="Servis Atamaları Yap"  class="btn btn-danger" type="button" onclick="e.preventDefault();return false;"><i class="fa fa-minus"></i></button>'; 
                        return u;
                    }
                    
                        
                }
            },
        ]]   
});
$('#tt_grid_dynamic_privileges').datagrid('enableFilter');

/*
* 
* @type @call;$@call;loadImager
* @Since 28/07/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for roles tree 
* this imager goes to #loading-image div in html.
* imager will be removed on resource / roles tree onLoadSuccess method.
*/
var loader = $("#loading-image").loadImager();
loader.loadImager('appendImage');

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
                                            
/*
* ACL resource and rol tree
* Mustafa Zeynel Dağlı
* 28/07/2016
*/
$('#tt_tree_menu2').tree({  
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillResourceGroups_sysAclResources&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
    method: 'get',
    animate: true,
    checkbox: false,
    cascadeCheck: false,
    lines: true,
    onLoadSuccess: function (node, data) {
         loader.loadImager('removeLoadImage');
    },
    formatter: function (node) {
        var s = node.text;
        var id = node.id;
        
        if (node.attributes.root == 'false') {
            s += '&nbsp;<i class="fa fa-level-down" title="Role bağlı yetkileri tabloya doldur" onclick="fillPrivilegeDatagrid('+id+', '+node.resource_id+');"></i>';
            return s;

        } 
        return s;
    }
    
});

/**
 * privilege datagrid is filled due to Resource/role tree role id
 * @param {type} id
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.fillPrivilegeDatagrid = function(id, resource_id) {
    var loaderInsertBlock = $("#loading-image-crud").loadImager();
    loaderInsertBlock.loadImager('appendImage');
    
    var id = id;
    $('#tt_grid_dynamic_privileges').datagrid({  
        url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillPrivilegesOfRolesList_sysAclPrivilege',
            sort : 'id',
            order : 'desc',
            role_id : id,
            resource_id: resource_id,
        }, 
        onLoadSuccess : function(data) {
            loaderInsertBlock.loadImager('removeLoadImage');
        }
    });
    $('#tt_grid_dynamic_privileges').datagrid('reload');
    $('#tt_grid_dynamic_privileges').datagrid('enableFilter');
}
      

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();


/**
 * wrapper for ACL privilege and Rest Services attachment process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 28/07/2016
 */
window.privilegeServiceAttachDialog = function (id, row) {
    window.gridReloadController = false;
    
    var rrp_id = id;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.resource_name + '" Resource, "'+ row.role_name_tr + '" Rolü, "'+ row.privilege_name + '" Yetkisinde işlem yapmaktasınız ...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="aclServiceFormPopup" method="get" class="form-horizontal">\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="padding-top: 10px;" >\n\
                                                            <label class="col-sm-2 control-label">Servisler</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group" id="nonAttachedTree">\n\
                                                                    <div class="input-group-addon" >\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <ul id="tt_tree_services_popup" class="easyui-tree" ></ul>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Yetkiye Atanmış Servisler</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group" id="attachedTags">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div style="margin-bottom: -10px;" class="tag-container-popup">\n\
                                                                     <ul id="test-cabin-popup" class="tag-box"></ul>\n\
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
            window.tagBuilderPopup = $('#test-cabin-popup').tagCabin({
                tagCopy      : false,
                tagDeletable : true,  
                tagBox       : $('.tag-container-popup').find('ul'),
                dataMapper   : {attributes : Array('rrp_id',
                                                    'restservices_id',
                                                    'resource_id',
                                                    'role_id',
                                                    'privilege_id',
                                                    'services_group_id')} 
            });
        
            window.tagBuilderPopup.tagCabin({ 
                onTagRemoved : function(event, data) {
                    var elementData = data.element;
                    var id = data.id;
                    window.deleteServicePrivilegeDialog(id, elementData);

                }
             });
            
            var nonAttachedTreeLoadImage = $("#nonAttachedTree").loadImager();
            nonAttachedTreeLoadImage.loadImager('appendImage');
             
            var attachedTagsLoadImage = $("#attachedTags").loadImager();
            attachedTagsLoadImage.loadImager('appendImage');
            
            var ajPopUpMachProp = $('#test-cabin-popup').ajaxCallWidget({
                    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data : {
                        url:'pkFillRestServicesOfPrivileges_sysAclRrpRestservices' ,
                        language_code : $('#langCode').val(),
                        id : id,
                        pk : $("#pk").val()
                    }
            })
            ajPopUpMachProp.ajaxCallWidget ({
                  onError : function (event, textStatus, errorThrown) {
                      dm.dangerMessage({
                          onShown : function () {
                             var loader = $("#loading-image-crud-popup").loadImager();
                             loader.loadImager('appendImage');
                          }
                      });
                      dm.dangerMessage('show', 'Kategoriye Ait Makina Özellikleri Yüklenememiştir...',
                                               'Kategoriye ait makina özellikleri yüklenememiştir,msistem yöneticisi ile temasa geçiniz...');
                  },
                  onSuccess : function (event, data) {  
                     attachedTagsLoadImage.loadImager('removeLoadImage');
                     
                    
                    
                    window.tagBuilderPopup.tagCabin('addTags', data);
                  },
                  onErrorDataNull : function (event) {
                      wm.warningMessage('resetOnShown');
                      wm.warningMessage('show', 'Servis Bulunamamıştır', 'Yetkiye atanmış servis bulunamamıştır!');
                      attachedTagsLoadImage.loadImager('removeLoadImage');
                      
                  },
            }) 
            ajPopUpMachProp.ajaxCallWidget('call');
            
            $('#tt_tree_services_popup').tree({
                url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillNotInRestServicesOfPrivilegesTree_sysAclRrpRestservices&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val()+ '&rrp_id='+id,
                method: 'get',
                animate: true,
                checkbox: false,
                cascadeCheck: false,
                lines: true,
                onLoadSuccess: function (node, data) {
                     nonAttachedTreeLoadImage.loadImager('removeLoadImage');
                 },
                onSelect: function(node) { 
                },
                formatter: function (node) {
                    var s = node.text;
                    var id = node.id;
                    var services_group_id = node.attributes.services_group_id;
                    if (node.attributes.root == 'false') {
                        s += '&nbsp;<i class="fa fa-level-down" title="Servisi Yetkiye Bağla" onclick="attachServiceToPrivilege('+rrp_id+', '+id+' , '+services_group_id+', \''+node.text+'\');"></i>';
                        return s;

                    } 
                    return s;
                 }
             }); 
         },
         onhide : function() {
             /*if(window.gridReloadController == true) {
                 $('#tt_grid_dynamic').datagrid('reload');
             }*/
         },
     });
     return false;
}

/**
 * wrapper class for pop up and delete service from specific
 * ACL privilege
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 29/07/2016
 */
window.deleteServicePrivilegeDialog= function(id, element){
    var id = id;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteServicePrivilege(id, element);
    }
    });
    wcm.warningComplexMessage('show', 'Makina Özelliğini Kategoriden Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Makina özelliğini kategoriden  silmek üzeresiniz, makina özelliği silme işlemi geri alınamaz!! ');
}

/**
 * delete service from a specific ACL privilege
 * @param {type} id
 * @param {type} element
 * @param {type} machine_group_id
 * @returns {undefined}
 * @since 29/07/2016
 */
window.deleteServicePrivilege = function(id, element) {
    var loader = $("#loading-image-crud-popup").loadImager();  
    loader.loadImager('appendImage');
    //var ajPopUpDelete = $(window).ajaxCall({
    var ajPopUpDelete = $("#loading-image-crud-popup").ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkDelete_sysAclRrpRestservices' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    });
    ajPopUpDelete.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {  
                 dm.dangerMessage('resetOnShown');  
                 dm.dangerMessage('show', 'Yetki / Servis Silme İşlemi Başarısız...',
                                           'Yetkiden servis silinememiştir, sistem yöneticisi ile temasa geçiniz...');
                 console.error('"pkDelete_sysAclRrpRestservices" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 sm.successMessage({ 
                     onShown : function() {
                         loader.loadImager('removeLoadImage');
                         parentNode = $('#tt_tree_services_popup').tree('find', element.attr('data-services_group_id'));
                         $('#tt_tree_services_popup').tree('select', parentNode.target);
                         $('#tt_tree_services_popup').tree('expand', parentNode.target);
                         //$('#tt_tree_services_popup').tree('collapseAll');
                         
                         $('#tt_tree_services_popup').tree('append', {
                            parent: parentNode.target,
                            data: [{
                                    attributes:{
                                                active: 0, 
                                                description: '',
                                                last_node : 'true',
                                                root : 'false',
                                                service : 'true',
                                                services_group_id : element.attr('data-services_group_id'),
                                                },
                                    id: element.attr('data-restservices_id'),
                                    text: element.text(),
                                    checked: false,
                                    state : 'open',
                                },]
                        });
                        window.tagBuilderPopup.tagCabin('removeTag', element);
                     }
                 });
                 sm.successMessage('show', 'Yetki / Servis Silme İşleminiz Başarılı...',
                                           'Yetki / Servis  silme işleminiz başarılı...')
             },  
             onError23503 : function (event, data) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', 'Silme İşlemi Gerçekleştiremezsiniz !', 
                                            'Servise bağlı bir operasyon tanımlanmıştır, veri bütünlüğünün bozulmaması için\n\
                                            öncelikle servisin bağlı olduğu operasyonun silinmesi gerekmektedir');
                loader.loadImager('removeLoadImage');
            }
     });
     ajPopUpDelete.ajaxCall('call');
}


/**
 * attach rest service end point and ACL privilege
 * @param {type} rrp_id
 * @param {type} restservices_id
 * @param {type} service_name
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 29/07/2016
 */
window.attachServiceToPrivilege = function(rrp_id, restservices_id, services_group_id, service_name) {
    var loader = $("#loading-image-crud-popup").loadImager();
    loader.loadImager('appendImage');
    
    var ajServiceAttach = $(window).ajaxCall({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data : {
                url:'pkInsert_sysAclRrpRestservices' ,
                language_code : $('#langCode').val(),
                rrp_id : rrp_id,
                restservices_id : restservices_id,
                description : '',
                pk : $("#pk").val()
            }
    })
    ajServiceAttach.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
              dm.dangerMessage({
                  onShown : function () {
                     
                  }
              });
              dm.dangerMessage('show', 'Service Yetkiye Atanamamıştır!...',
                                       'Service ilgili yetkiye atanamamıştır,sistem yöneticisi ile temasa geçiniz...');
          },
          onSuccess : function (event, data) {
            var id = data.lastInsertId;
            sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                    window.tagBuilderPopup.tagCabin('addTagManuallyDataAttr', 
                                                            id, 
                                                            service_name,
                                                            {services_group_id : services_group_id,
                                                             rrp_id : rrp_id,
                                                             restservices_id : restservices_id,
                                                             description : ''});

                    selectedTreeItem = $('#tt_tree_services_popup').tree('find', restservices_id);
                    $('#tt_tree_services_popup').tree('remove', selectedTreeItem.target);
            
                 }
             });
             sm.successMessage('show', 'Servis Yetki Atama İşlemi Başarılı...', 
                                       'Servise yetki atama işlemi gerçekleştirdiniz... ',
                                       data);  
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     loader.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Servis Yetki İşlemi Başarısız...', 
                                       'Servis ilgili yetki ile daha önce ilişkilendirilmiştir, yeni bir servis deneyiniz... ');
          },
    }); 
    ajServiceAttach.ajaxCall('call');
}

     
});
