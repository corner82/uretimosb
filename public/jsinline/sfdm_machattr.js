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
     * multilanguage plugin 
     * @type Lang
     */
    var lang = new Lang();
    lang.dynamic($('#ln').val(), '/plugins/jquery-lang-js-master/langpack/'+$('#ln').val()+'.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#ln').val());
    
    var selectedNode;
    
    
    /*
    * 
    * @type @call;$@call;tree
    * Menu tree
    * Mustafa Zeynel Dağlı
    * 04/04/2016
    */

   $('#tt_tree_menu').tree({
       url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillMachineToolDefinitionsAttributes_sysMachineToolDefinitionAttribute&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
       method: 'get',
       animate: true,
       checkbox: true,
       cascadeCheck: false,
       lines: true,
       onBeforeCheck : function (node) {        
       },
       onDblClick: function (node) {
       },
       onAfterEdit: function (node) { 
        },
       onLoadSuccess: function (node, data) {
            loader.loadImager('removeLoadImage');
        },
       onClick: function (node) {
            selectedNode = node;
            selectedRoot = $(this).tree('getRoot', node.target);
            selectedItem = $(this).tree('getData', node.target);
            //console.log(selectedItem);
            $('#updateMachAttr').attr('disabled', false);
            $('#insertMachAttr').attr('disabled', true);

            $('#attribute_name').val(selectedItem.text);
            $('#attribute_name_eng').val(selectedItem.attributes.attribute_name_eng);
            $('#description').val(selectedItem.attributes.description);
            $('#description_eng').val(selectedItem.attributes.description_eng);
            
        },
       onCheck: function (node) {
        },
       formatter: function (node) {
           if(node.attributes.system != null) {
               var s = node.text+' ('+node.attributes.system+')';
           } else {
               var s = node.text;
           }
            
            var id = node.id;
            if (node.attributes.active == 0) {
                
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="birim sil" onclick="deleteMachAttrDialog('+id+')"></i>&nbsp;\n\
                     <i class="fa fa-fw fa-ban" title="pasif yap" onclick="passiveMachAttrDialog('+id+');"></i>&nbsp;&nbsp;\n\
                    ';
                if(node.attributes.notroot == false) {
                   s += '<i class="fa fa-level-down" title="alt kırılıma birim ekle" onclick="insertUnitDialog('+id+', \''+node.text+'\')"></i>' 
                }
                return s;

            } else if (node.attributes.active == 1) {
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="birim sil" onclick="deleteMachAttrDialog('+id+')"></i>&nbsp;\n\
                <i class="fa fa-fw fa-check-square-o" title="aktif yap" onclick="activeMachAttrDialog('+id+');"></i>';
                s = "<font color = '#B6B6B4'>" + s + "</font>"
                
                return s;
            }
        }
    });
    
    // Left menuyu oluşturmak için çağırılan fonksiyon...
    //$.fn.leftMenuFunction();

    //Validation forms binded...
    jQuery("#machAttrForm").validationEngine();
    
    /*
     * 
     * @type @call;$@call;loadImager
     * @Since 2016.01.16
     * @Author Mustafa Zeynel Dagli
     * @Purpose this variable is to create loader image for roles tree 
     * this imager goes to #loading-image div in html.
     * imager will be removed on roles tree onLoadSuccess method.
     */
    var loader = $("#loading-image").loadImager();

    var sm  = $(window).successMessage();
    var dm  = $(window).dangerMessage();
    var wm  = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                                actionButtonLabel : 'İşleme devam et'});

    //$('#menuForm').submit(newRoleSubmission);
    
   /**
    * wrapper class for pop up and delete machine attr
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 21/04/2016
    */
   window.deleteMachAttrDialog= function(nodeID){
       var nodeID = nodeID;
       wcm.warningComplexMessage({onConfirm : function(event, data) {
           deleteMachAttr(nodeID);
       }
       });
       wcm.warningComplexMessage('show', 'Makina Özniteliği Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                         'Makina özniteliği Öğesini silmek üzeresiniz, öznitelik silme işlemi geri alınamaz!! ');
   }
   
   /**
    * set machine attr item delete
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 21/04/2016
    */
   window.deleteMachAttr = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkDelete_sysMachineToolDefinitionAttribute' ,
                            id : nodeID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Öznitelik Silme İşlemi Başarısız...', 
                                         'Makina öznitelik silme işlemini gerçekleştiremediniz,sistem yöneticisi ile temasa geçiniz... ');
                regulateButtons();
                console.error('"pkDelete_sysMachineToolDefinitionAttribute" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({ onShown : function(event, data) {
                        loader.loadImager('removeLoadImage');
                        regulateButtons();
                    }
                });
                sm.successMessage('show', 'Makina Öznitelik Silme İşlemi Başarılı...', 
                                          'Makina öznitelik Silme işlemini gerçekleştirdiniz... ');
                selectedTreeItem = $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
             },
             onErrorDataNull : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Öznitelik Silme İşlemi Başarısız...', 
                                         'Makina öznitelik Silme işlemini gerçekleştiremediniz,sistem yöneticisi ile temasa geçiniz... ');
                regulateButtons();
                console.error('"pkDelete_sysMachineToolDefinitionAttribute" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Öznitelik Silme İşlemi Başarısız...', 
                                         'Makina öznitelik Silme işlemini gerçekleştiremediniz,sistem yöneticisi ile temasa geçiniz... ');
                regulateButtons();
             },
             onError23503 : function (event, data) {
                 dm.dangerMessage({ onShown : function(event, data) {
                        loader.loadImager('removeLoadImage');
                        regulateButtons();
                    }
                });
                dm.dangerMessage('show', 'Makina Öznitelik Silme İşlemi Başarısız...', 
                                         'Makina öznitelik sistemde makinaya atanmış olduğu için işlemi gerçekleştiremezsiniz, önce makinaya bağlı öznitelik kaydının silinmasi gerekmektedir... ' );
             },
             onError23505 : function (event, data) {
             }
       }) 
       aj.ajaxCall('call');
   }
   
   /**
    * wrapper class for pop up and passive machina attr item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 21/04/2016
    */
   window.passiveMachAttrDialog= function(nodeID){
        var nodeID = nodeID;
        wcm.warningComplexMessage({ 
            onConfirm : function() {
                passiveMachAttr(nodeID);
            }
       });
       wcm.warningComplexMessage('show', 'Makina Öznitelik Ögesini Pasifleştirmek Üzeresiniz!',
                                 'Makina öznitelik öğesini pasifleştirmek üzeresiniz !! ');
   }
   
   /**
    * set machine attr item passive
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 21/04/2016
    */
   window.passiveMachAttr = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkUpdateMakeActiveOrPassive_sysMachineToolDefinitionAttribute' ,
                            id : nodeID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Öznitelik Pasifleştirme İşlemi Başarısız...', 
                                         'Makina öznitelik pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz...' );
                regulateButtons();
                console.error('"pkUpdateMakeActiveOrPassive_sysMachineToolDefinitionAttribute" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({
                            onShown : function (event, data) {
                                loader.loadImager('removeLoadImage');
                                regulateButtons();
                            }
                });
                sm.successMessage('show', 'Makina Öznitelik Pasif İşlemi Başarılı...', 
                                          'Makina öznitelik Pasifleştirme işlemini gerçekleştirdiniz... ')                   
                var nodeState;
                if($('#tt_tree_menu').tree('isLeaf', selectedTreeItem.target)) {
                    nodeState = 'open';
                } else {
                    nodeState = 'closed';
                }

                var parentNode = $('#tt_tree_menu').tree('getParent', selectedTreeItem.target);
                var node = selectedTreeItem;
                $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
                if(jQuery.type(parentNode) === "null") { 
                    $('#tt_tree_menu').tree('append', {
                        data: [{
                                attributes:{notroot: selectedTreeItem.attributes.notroot, 
                                            attribute_name_eng : selectedTreeItem.attributes.attribute_name_eng, 
                                            description : selectedTreeItem.attributes.description,
                                            description_eng : selectedTreeItem.attributes.description_eng,
                                            active: 1,},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                } else {
                    $('#tt_tree_menu').tree('append', {
                        parent: parentNode.target,
                        data: [{
                                attributes:{notroot: node.attributes.notroot, 
                                            active: 1, 
                                            attribute_name_eng : selectedTreeItem.attributes.attribute_name_eng, 
                                            description : selectedTreeItem.attributes.description,
                                            description_eng : selectedTreeItem.attributes.description_eng},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                }
             },
             onErrorDataNull : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Öznitelik Pasifleştirme İşlemi Başarısız...', 
                                         'Makina öznitelik pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz...' );
                console.error('"pkUpdateMakeActiveOrPassive_sysMachineToolDefinitionAttribute" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage({ onShown : function(event, data) {
                            loader.loadImager('removeLoadImage');
                            regulateButtons();
                            }
                });
                dm.dangerMessage('show', 'Makina Öznitelik Pasifleştirme İşlemi Başarısız...', 
                                         'Makina öznitelik pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz...' );
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
             }
       }) 
       aj.ajaxCall('call');
   }
   
   /**
    * wrapper class for pop up and active machine attr item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 21/04/2016
    */
   window.activeMachAttrDialog= function(nodeID){
        var nodeID = nodeID;
        wcm.warningComplexMessage({onConfirm : function(event, data) {
            activeMachAttr(nodeID);
        }
        });
        wcm.warningComplexMessage('show', 'Makina Öznitelik Ögesini Aktifleştirmek Üzeresiniz!', 
                                          'Makina öznitelik öğesini aktifleştirmek üzeresiniz !! ');
   }
   
   /**
    * set machine attr item active
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 21/04/2016
    */
   window.activeMachAttr = function(nodeID) {

       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url : 'pkUpdateMakeActiveOrPassive_sysMachineToolDefinitionAttribute' ,
                            id : nodeID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Makina Öznitelik Aktifleştirme İşlemi Başarısız...', 
                                         'Makina öznitelik aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                 regulateButtons();
                 console.error('"pkUpdateMakeActiveOrPassive_sysMachineToolDefinitionAttribute" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 sm.successMessage({ onShown : function(event, data){
                            loader.loadImager('removeLoadImage');
                            regulateButtons();
                        }
                    });
                sm.successMessage('show', 'Makina Öznitelik Aktifleştirme İşlemi Başarılı...', 
                                          'Makina öznitelik aktifleştirme işlemini gerçekleştirdiniz... ')
                var nodeState;
                if($('#tt_tree_menu').tree('isLeaf', selectedTreeItem.target)) {
                    nodeState = 'open';
                } else {
                    nodeState = 'closed';
                }

                var parentNode = $('#tt_tree_menu').tree('getParent', selectedTreeItem.target);
                var node = selectedTreeItem;
                $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
                if(jQuery.type(parentNode) === "null") { 
                    $('#tt_tree_menu').tree('append', {
                        data: [{
                                attributes:{notroot: selectedTreeItem.attributes.notroot, 
                                            attribute_name_eng : selectedTreeItem.attributes.attribute_name_eng, 
                                            description : selectedTreeItem.attributes.description,
                                            description_eng : selectedTreeItem.attributes.description_eng,
                                            active: 0,},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                } else {
                    $('#tt_tree_menu').tree('append', {
                        parent: parentNode.target,
                        data: [{
                                attributes:{notroot: node.attributes.notroot, 
                                            active: 0, 
                                            attribute_name_eng : selectedTreeItem.attributes.attribute_name_eng, 
                                            description : selectedTreeItem.attributes.description,
                                            description_eng : selectedTreeItem.attributes.description_eng,},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                }
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Makina Öznitelik Aktifleştirme İşlemi Başarısız...', 
                                          'Makina öznitelik aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                regulateButtons();
                console.error('"pkUpdateMakeActiveOrPassive_sysMachineToolDefinitionAttribute" servis datası boştur!!');
                
             },
             onErrorMessage : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Makina Öznitelik Aktifleştirme İşlemi Başarısız...', 
                                          'Makina öznitelik aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                 regulateButtons();
             }
       }) 
       aj.ajaxCall('call');
   }
   
   /**
    * reset button function setting disabled/ enabled
    * for 'insert' and 'update' form buttons
    * @returns null
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.regulateButtons = function () {
       $('#updateMachAttr').attr('disabled', true);
       $('#insertMachAttr').attr('disabled', false);
       
       $('#attribute_name').val('');
       $('#attribute_name_eng').val('');
       $('#description').val('');
       $('#description_eng').val('');
   }
   
   /**
    * insert machine attr item for root
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 21/04/2016
    */
   window.insertMachAttrRootWrapper = function (e) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#machAttrForm").validationEngine('validate')) {
        insertMachAttrRoot();
    }
    return false;
   }
   
   /**
    * insert machine attr for root level
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 21/04/2016
    */
   window.insertMachAttrRoot = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        attribute_name = $('#attribute_name').val();
        attribute_name_eng = $('#attribute_name_eng').val();
        description = $('#description').val();
        description_eng = $('#description_eng').val();
        language_code = $('#langCode').val();
        //console.log(ddData);
        
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkInsert_sysMachineToolDefinitionAttribute' ,
                            language_code : language_code,
                            attribute_name : attribute_name,
                            attribute_name_eng : attribute_name_eng,
                            description : description,
                            description_eng : description_eng,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Öznitelik Kayıt İşlemi Başarısız...', 
                                         'Makina öznitelik kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysUnits" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({
                    onShown: function( event, data ) {
                        $('#machAttrForm')[0].reset();
                        regulateButtons();
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'Makina Öznitelik Kayıt İşlemi Başarılı...', 
                                          'Makina öznitelik kayıt işlemini gerçekleştirdiniz... ');

                $('#tt_tree_menu').tree('append', {
                    //parent: selectedTreeItem.target,
                    data: [{
                        attributes:{notroot: false, 
                                    attribute_name_eng : attribute_name_eng, 
                                    description_eng : description_eng,
                                    description : description,
                                    active: 0,
                                    },
                        id: data.lastInsertId,
                        text: attribute_name,
                        checked: false,
                        state : 'open',
                    },]
                });
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Makina Öznitelik Kayıt İşlemi Başarısız...', 
                                           'Makina öznitelik kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                 console.error('"pkInsert_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Öznitelik Kayıt İşlemi Başarısız...', 
                                         'Makina öznitelik kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
                 dm.dangerMessage({
                    onShown : function(event, data) {
                      $('#machAttrForm')[0].reset();
                      loader.loadImager('removeLoadImage');
                    }
                 });
                 dm.dangerMessage('show', 'Makina Öznitelik Kayıt İşlemi Başarısız...', 
                                          'Aynı isim ile  öznitelik kaydı yapılmıştır, yeni bir isim deneyiniz... ');
             }
       }) 
       aj.ajaxCall('call');
       
   }
   
   /**
    * update machine attr item wrapper
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 21/04/2016
    */
   window.updateMachAttrWrapper = function (e) {
    e.preventDefault();
    if ($("#machAttrForm").validationEngine('validate')) {
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        if(selectedTreeItem == null) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Makina Özniteliği Öğesi Seçiniz', 'Lütfen Öznitelik Öğesi Seçiniz!')
            return false;
        }
        updateMachAttr();  
    }
    return false;
   }
   
   /**
    * update machine attr item
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 05/04/2016
    */
   window.updateMachAttr = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        attribute_name = $('#attribute_name').val();
        attribute_name_eng = $('#attribute_name_eng').val();
        description = $('#description').val();
        description_eng = $('#description_eng').val();
        language_code = $('#langCode').val();
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        id = selectedTreeItem.id;
        
        var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkUpdate_sysMachineToolDefinitionAttribute' ,
                            language_code : language_code,
                            attribute_name : attribute_name,
                            attribute_name_eng : attribute_name_eng,
                            description : description,
                            description_eng : description_eng,
                            id : id,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Öznitelik Güncelleme İşlemi Başarısız...', 
                                         'Makina öznitelik güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdate_sysMachineToolDefinitionAttribute" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({
                    onShown: function( event, data ) {
                        $('#machAttrForm')[0].reset();
                        regulateButtons();
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'Makina Öznitelik Güncelleme İşlemi Başarılı...', 
                                          'Makina öznitelik güncelleme işlemini gerçekleştirdiniz... ');
                $('#tt_tree_menu').tree('update', {
                    target: selectedTreeItem.target,
                    text: attribute_name,
                    attributes:{notroot: selectedTreeItem.attributes.notroot, 
                                attribute_name_eng : attribute_name_eng,
                                description : description,
                                description_eng : description_eng,
                                active: 0,}
               });
             },
             onErrorDataNull : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Öznitelik Güncelleme İşlemi Başarısız...', 
                                         'Makina öznitelik güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdate_sysMachineToolDefinitionAttribute" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Öznitelik Güncelleme İşlemi Başarısız...', 
                                         'Makina öznitelik güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
             }
       }) 
       aj.ajaxCall('call');
   }
   
   
   
});
