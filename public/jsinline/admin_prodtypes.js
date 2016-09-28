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
       url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillProductionTypesTree_sysProductionTypes&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
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
            $('#updateProdType').attr('disabled', false);
            $('#insertProdType').attr('disabled', true);
            
            $('#name').val(selectedItem.text);
            $('#name_eng').val(selectedItem.attributes.name_eng);

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
                
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="üretim tipi sil" onclick="deleteProdTypeDialog('+id+')"></i>&nbsp;\n\
                     <i class="fa fa-fw fa-ban" title="pasif yap" onclick="passiveProdTypeDialog('+id+');"></i>&nbsp;&nbsp;\n\
                    ';
                
                return s;

            } else if (node.attributes.active == 1) {
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="birim sil" onclick="deleteProdTypeDialog('+id+')"></i>&nbsp;\n\
                <i class="fa fa-fw fa-check-square-o" title="aktif yap" onclick="activeProdTypeDialog('+id+');"></i>';
                s = "<font color = '#B6B6B4'>" + s + "</font>"
                
                return s;
            }
        }
    });
    


    // Left menuyu oluşturmak için çağırılan fonksiyon...
    //$.fn.leftMenuFunction();

    //Validation forms binded...
    jQuery("#prodTypeForm").validationEngine();
    
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
    * wrapper class for pop up and active menu item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.deleteProdTypeDialog= function(nodeID){
       var nodeID = nodeID;
       wcm.warningComplexMessage({onConfirm : function(event, data) {
           deleteProdType(nodeID);
       }
       });
       wcm.warningComplexMessage('show', 'Üretim Tipi Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                         'Üretim Tipi Öğesini silmek üzeresiniz,  silme işlemi geri alınamaz!! ');
   }
   
   /**
    * set production type item delete
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 20/04/2016
    */
   window.deleteProdType = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkDelete_sysProductionTypes' ,
                            id : nodeID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Üretim Tipi Silme Silme İşlemi Başarısız...', 
                                         'Üretim tipi silme işlemini gerçekleştiremediniz,sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkDelete_sysUnits" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({ onShown : function(event, data) {
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'Üretim Tipi Silme İşlemi Başarılı...', 
                                          'Üretim tipi silme işlemini gerçekleştirdiniz... ')
                selectedTreeItem = $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
             },
             onErrorDataNull : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Üretim Tipi Silme Silme İşlemi Başarısız...', 
                                         'Üretim tipi silme işlemini gerçekleştiremediniz,sistem yöneticisi ile temasa geçiniz...');
                console.error('"pkDelete_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Üretim Tipi Silme Silme İşlemi Başarısız...', 
                                         'Üretim tipi silme işlemini gerçekleştiremediniz,sistem yöneticisi ile temasa geçiniz...');
             },
             onError23503 : function (event, data) {
                 dm.dangerMessage({ onShown : function(event, data) {
                        loader.loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Üretim Tipi Silme Silme İşlemi Başarısız...', 
                                         'Üretim tipi kayıtlı  olduğu için işlemi gerçekleştiremezsiniz, önce aynı adlı üretim tipi kaydının silinmesi gerekmektedir... ' );
             },
             onError23505 : function (event, data) {
             }
       }) 
       aj.ajaxCall('call');
   }
   
   /**
    * wrapper class for pop up and passive product type item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 20/04/2016
    */
   window.passiveProdTypeDialog= function(nodeID){
        var nodeID = nodeID;
        wm.warningComplexMessage({ 
            onConfirm : function() {
                passiveProdType(nodeID);
            }
       });
       wm.warningComplexMessage('show', 'Üretim Tipi Ögesini Pasifleştirmek Üzeresiniz!',
                                 'Üretim tipi öğesini pasifleştirmek üzeresiniz !! ');
   }
   
   /**
    * set production type item passive
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 20/04/2016
    */
   window.passiveProdType = function(nodeID) {
       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkUpdateMakeActiveOrPassive_sysProductionTypes' ,
                            id : nodeID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Üretim Tipi Pasifleştirme İşlemi Başarısız...', 
                                     'Üretim Tipi pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz...' );
                console.error('"pkUpdateMakeActiveOrPassive_sysProductionTypes" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({
                            onShown : function (event, data) {
                                loader.loadImager('removeLoadImage');
                            }
                });
                sm.successMessage('show', 'Üretim Tipi Pasif İşlemi Başarılı...', 
                                          'Üretim Tipi pasifleştirme işlemini gerçekleştirdiniz... ')                   
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
                                            name_eng : selectedTreeItem.attributes.name_eng, 
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
                                            name_eng : selectedTreeItem.attributes.name_eng, },
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
                dm.dangerMessage('show', 'Üretim Tipi Pasifleştirme İşlemi Başarısız...', 
                                         'Üretim tipi pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz...' );
                console.error('"pkUpdateMakeActiveOrPassive_sysProductionTypes" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage({ onShown : function(event, data) {
                            loader.loadImager('removeLoadImage');
                            }
                });
                dm.dangerMessage('show', 'Üretim Tipi Pasifleştirme İşlemi Başarısız...', 
                                         'Üretim tipi pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz...' );
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
             }
       }) 
       aj.ajaxCall('call');
   }
   
   /**
    * wrapper class for pop up and active production type item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 20/04/2016
    */
   window.activeProdTypeDialog= function(nodeID){
        var nodeID = nodeID;
        wcm.warningComplexMessage({onConfirm : function(event, data) {
            activeProdType(nodeID);
        }
        });
        wcm.warningComplexMessage('show', 'Üretim Tipi Ögesini Aktifleştirmek Üzeresiniz!', 
                                          'Üretim tipi öğesini aktifleştirmek üzeresiniz !! ');
   }
   
   /**
    * set production type item active
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 20/04/2016
    */
   window.activeProdType = function(nodeID) {

       var loader = $("#loading-image-crud").loadImager();
       loader.loadImager('appendImage');
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url : 'pkUpdateMakeActiveOrPassive_sysProductionTypes' ,
                            id : nodeID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Üretim Tipi Aktifleştirme İşlemi Başarısız...', 
                                         'Üretim tipi aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
                 console.error('"pkUpdateMakeActiveOrPassive_sysProductionTypes" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 sm.successMessage({ onShown : function(event, data){
                            loader.loadImager('removeLoadImage');
                        }
                    });
                sm.successMessage('show', 'Üretim Tipi Aktifleştirme İşlemi Başarılı...', 
                                          'Üretim tipi aktifleştirme işlemini gerçekleştirdiniz... ')
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
                                            name_eng : selectedTreeItem.attributes.name_eng, 
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
                                            name_eng: node.attributes.text_eng, 
                                            active: 0, },
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
                 dm.dangerMessage('show', 'Üretim Tipi Aktifleştirme İşlemi Başarısız...', 
                                         'Üretim tipi aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkUpdateMakeActiveOrPassive_sysProductionTypes" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Üretim Tipi Aktifleştirme İşlemi Başarısız...', 
                                          'Üretim tipi aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             }
       }) 
       aj.ajaxCall('call');
   }
   
   /**
    * reset button function setting disabled/ enabled
    * for 'insert' and 'update' form buttons
    * @returns null
    * @author Mustafa Zeynel Dağlı
    * @since 20/04/2016
    */
   window.regulateButtons = function () {
       $('#updateProdType').attr('disabled', true);
       $('#insertProdType').attr('disabled', false);
       
       $('#name').val('');
       $('#name_eng').val('');
   }
    
   /**
    * insert production type item for root
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 20/04/2016
    */
   window.insertProdTypeWrapper = function (e) {
    e.preventDefault();

    if ($("#prodTypeForm").validationEngine('validate')) {
        insertProdTypeRoot();
    }
    return false;
   }
   
   /**
    * insert production type for root level
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 20/04/2016
    */
   window.insertProdTypeRoot = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        name = $('#name').val();
        name_eng = $('#name_eng').val();
        language_code = $('#langCode').val();
        
       var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkInsert_sysProductionTypes' ,
                            language_code : language_code,
                            name : name,
                            name_eng : name_eng,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Üretim Tipi Kayıt İşlemi Başarısız...', 
                                         'Üretim tipi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysProductionTypes" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({
                    onShown: function( event, data ) {
                        $('#prodTypeForm')[0].reset();
                        regulateButtons();
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'Üretim Tipi Kayıt İşlemi Başarılı...', 
                                          'Üretim tipi kayıt işlemini gerçekleştirdiniz... ');

                $('#tt_tree_menu').tree('append', {
                    //parent: selectedTreeItem.target,
                    data: [{
                        attributes:{notroot: false, 
                                    name_eng : name_eng, 
                                    active: 0,
                                    },
                        id: data.lastInsertId,
                        text: name,
                        checked: false,
                        state : 'open',
                    },]
                });
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Üretim Tipi Kayıt İşlemi Başarısız...', 
                                            'Üretim tipi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                 console.error('"pkInsert_sysProductionTypes" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Üretim Tipi Kayıt İşlemi Başarısız...', 
                                         'Üretim tipi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
                 dm.dangerMessage({
                    onShown : function(event, data) {
                      $('#prodTypeForm')[0].reset();
                      loader.loadImager('removeLoadImage');
                    }
                 });
                 dm.dangerMessage('show', 'Üretim Tipi Kayıt İşlemi Başarısız...', 
                                          'Aynı isim ile üretim tipi kaydı yapılmıştır, yeni bir kayıt deneyiniz... ');
             }
       }) 
       aj.ajaxCall('call');
       
   }
   
   /**
    * update production type item wrapper
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 20/04/2016
    */
   window.updateProdTypeWrapper = function (e) {
    e.preventDefault();
    if ($("#prodTypeForm").validationEngine('validate')) {
        updateProdType();
    }
    return false;
   }
   
   /**
    * update production type item
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 20/04/2016
    */
   window.updateProdType = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        name = $('#name').val();
        name_eng = $('#name_eng').val();
        language_code = $('#langCode').val();
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        id = selectedTreeItem.id;
        
        var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data : {
                            url:'pkUpdate_sysProductionTypes' ,
                            language_code : language_code,
                            name : name,
                            name_eng : name_eng,
                            id : id,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Üretim Tipi Güncelleme İşlemi Başarısız...', 
                                         'Üretim tipi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdate_sysProductionTypes" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                sm.successMessage({
                    onShown: function( event, data ) {
                        $('#prodTypeForm')[0].reset();
                        regulateButtons();
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'Üretim Tipi Güncelleme İşlemi Başarılı...', 
                                          'Üretim tipi güncelleme işlemini gerçekleştirdiniz... ');
                $('#tt_tree_menu').tree('update', {
                    target: selectedTreeItem.target,
                    text: name,
                    attributes:{notroot: selectedTreeItem.attributes.notroot, 
                                name_eng : name_eng, 
                                active: 0,}
               });
             },
             onErrorDataNull : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Üretim Tipi Güncelleme İşlemi Başarısız...', 
                                         'Üretim tipi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdate_sysProductionTypes" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Üretim Tipi Güncelleme İşlemi Başarısız...', 
                                         'Üretim tipi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
             }
       }) 
       aj.ajaxCall('call');
   }
   
   
   
});
