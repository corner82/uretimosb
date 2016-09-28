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
 * ACL privileges datagrid is being filled
 * @since 14/07/2016
 */
$('#tt_grid_dynamic').datagrid({  
    url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillOsbList_sysOsb',
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
            {field:'name',title:'OSB',sortable:true,width:200},
            {field:'city_name',title:'Şehir',sortable:true,width:100},
            {field:'country_name',title:'Ülke',sortable:true,width:100},
            {field:'address',title:'Adres',sortable:true,width:300},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveOsbWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveOsbWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteOSBUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateOsbDialog('+row.id+', { name : \''+row.name+'\',\n\                                                                                                                   \n\
                                                                                                                                                                       country_id : \''+row.country_id+'\',\n\
                                                                                                                                                                       city_id : \''+row.city_id+'\',\n\
                                                                                                                                                                       borough_id : \''+row.borough_id+'\',\n\
                                                                                                                                                                       city : \''+row.city+'\',\n\
                                                                                                                                                                       postal_code : \''+row.postal_code+'\',\n\
                                                                                                                                                                       address : \''+row.address+'\',\n\
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
* @Since 16/05/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for roles tree 
* this imager goes to #loading-image div in html.
* imager will be removed on roles tree onLoadSuccess method.
*/
//var loader = $("#loading-image").loadImager();

 /*
* 
* @type @call;$@call;loadImager
* @Since 23/08/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for countries 
* dropdown. Loading image will be removed when dropdown filled data.
*/
$("#load-imager-countries").loadImager();
$("#load-imager-countries").loadImager('appendImage');

/**
 * load imager for boroughs drop down
 * @author Mustafa Zeynel Dağlı
 * @since 23/08/2016
 */
/*$("#load-imager-boroughs").loadImager();
$("#load-imager-boroughs").loadImager('appendImage');*/


/**
 * Countries dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 23/08/2016
 */
var ajaxCountries = $(window).ajaxCallWidget({
    proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'fillComboBox_syscountrys' ,
                    pk : $("#pk").val(),
                    language_code : $('#langCode').val(),
                    component_type: 'ddslick'
            }
   })
ajaxCountries.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                $('#load-imager-countries').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Ülkeler Bulunamamıştır...',
                                  'Ülkeler  bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#load-imager-countries').loadImager('removeLoadImage');
         $('#dropdownCountries').ddslick({
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
                    //alert('seelcted data >0');
                    window.fillCities();
                } else if(selectedData.selectedData.value == 0) {
                    //alert('seelcted data 0');
                    $('#dropdownCities').ddslick('destroy');
                    //$("#city").toggleClass('form-control validate[required]');
                    $('#city').show();
                }
            }   
        });   
     },
     onErrorDataNull : function (event, data) {
         dm.dangerMessage({
            onShown : function() {
                $('#load-imager-countries').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Ülkeler Bulunamamıştır...',
                                  'Ülkeler  bulunamamıştır...');
     },
}) 
ajaxCountries.ajaxCallWidget('call');


/**
 * filling cities drop down
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 23/08/2016
 */
window.fillCities = function() {
    var ddData = $('#dropdownCountries').data('ddslick')
    var country_id = ddData.selectedData.value;
    var country = ddData.selectedData.text;
    country = $.trim(country).toLowerCase();
    
    if(country == 'türkiye') {
        $("#city").removeClass('validate[required]');
        $('#osbForm').validationEngine('hide');
        $('#dropdownCities').ddslick('destroy');
        $('#city').hide();
        
        $('#load-imager-cities').loadImager();
        $('#load-imager-cities').loadImager('appendImage');
        //alert(country);
        var ajaxCities = $('#load-imager-cities').ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: { url:'fillComboBox_syscity' ,
                            pk : $("#pk").val(),
                            language_code: $("#langCode").val(),
                            component_type: 'ddslick',
                            country_id : country_id
                    }
           })
        ajaxCities.ajaxCallWidget ({
             onError : function (event, textStatus,errorThrown) {
                 dm.dangerMessage({
                    onShown : function() {
                        $('#load-imager-cities').loadImager('removeLoadImage'); 
                    }
                 });
                 dm.dangerMessage('show', 'Şehirler Bulunamamıştır...',
                                          'Şehirler bulunamamıştır...');
             },
             onSuccess : function (event, data) {
                 var data = $.parseJSON(data);
                 $('#load-imager-cities').loadImager('removeLoadImage');
                 $('#dropdownCities').ddslick({
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
                            window.fillBoroughs();
                        } else {
                            $('#dropdownBoroughs').ddslick('destroy');
                            /*$('#load-imager-boroughs').loadImager(); 
                            $('#load-imager-boroughs').loadImager('removeLoadImage'); 
                            $('#load-imager-boroughs').loadImager('appendImage'); */
                        }
                    }   
                });   
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage({
                    onShown : function() {
                        $('#load-imager-cities').loadImager('removeLoadImage'); 
                    }
                 });
                 dm.dangerMessage('show', 'Şehirler Bulunamamıştır...',
                                          'Şehirler  bulunamamıştır...');
             },
        }) 
        ajaxCities.ajaxCallWidget('call');
    } else {
        $('#dropdownCities').ddslick('destroy');
        $('#dropdownBoroughs').ddslick('destroy');
        
        /*$('#load-imager-boroughs').loadImager(); 
        $('#load-imager-boroughs').loadImager('removeLoadImage'); 
        $('#load-imager-boroughs').loadImager('appendImage');*/ 
        
        $('#city').show();
        if(!$('#city').hasClass('validate[required]')) {
            $("#city").addClass('validate[required]');
        }
        $('#osbForm').validationEngine('hide');
    }
}

/**
 * filling boroughs drop down
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 23/08/2016
 */
window.fillBoroughs = function() {
    $('#dropdownBoroughs').ddslick('destroy');
    
    var ddData = $('#dropdownCities').data('ddslick')
    var city_id = ddData.selectedData.value;
    
    if(city_id>0) {
       $('#load-imager-boroughs').loadImager(); 
        $('#load-imager-boroughs').loadImager('removeLoadImage'); 
        $('#load-imager-boroughs').loadImager('appendImage'); 

        var ddData = $('#dropdownCountries').data('ddslick')
        var country_id = ddData.selectedData.value;

        var ddData = $('#dropdownCities').data('ddslick')
        var city_id = ddData.selectedData.value;

        var ajaxCities = $('#load-imager-boroughs').ajaxCallWidget({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'fillComboBox_sysborough' ,
                                pk : $("#pk").val(),
                                language_code: $("#langCode").val(),
                                component_type: 'ddslick',
                                country_id: country_id,
                                city_id: city_id,
                        }
               })
            ajaxCities.ajaxCallWidget ({
                 onError : function (event, textStatus,errorThrown) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#load-imager-boroughs').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'İlçeler Bulunamamıştır...',
                                              'İlçeler bulunamamıştır...');
                 },
                 onSuccess : function (event, data) {
                     var data = $.parseJSON(data);
                     $('#load-imager-boroughs').loadImager('removeLoadImage');
                     $('#dropdownBoroughs').ddslick({
                        height : 200,
                        data : data, 
                        width:'98%',
                        selectText: "Select your preferred social network",
                        //showSelectedHTML : false,
                        defaultSelectedIndex: 3,
                        search : true,
                        //imagePosition:"right",
                        onSelected: function(selectedData){
                        }   
                    });   
                 },
                 onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#load-imager-boroughs').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'İlçeler Bulunamamıştır...',
                                              'İlçeler  bulunamamıştır...');
                 },
            }) 
            ajaxCities.ajaxCallWidget('call');
    } else {
        /*$('#load-imager-boroughs').loadImager(); 
        $('#load-imager-boroughs').loadImager('removeLoadImage'); 
        $('#load-imager-boroughs').loadImager('appendImage'); */
    } 
}

/**
 * filling cities drop down for popup window (update operation)
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 24/08/2016
 */
window.fillCitiesPopup = function(row) {
    var ddData = $('#dropdownCountriesPopup').data('ddslick')
    var country_id = ddData.selectedData.value;
    var country = ddData.selectedData.text;
    country = $.trim(country).toLowerCase();
    
    if(country == 'türkiye') {
        $("#city_popup").removeClass('validate[required]');
        $('#osbFormPopup').validationEngine('hide');
        $('#dropdownCitiesPopup').ddslick('destroy');
        $('#city_popup').hide();
        
        $('#load-imager-cities-popup').loadImager();
        $('#load-imager-cities-popup').loadImager('appendImage');
        //alert(country);
        var ajaxCities = $('#load-imager-cities-popup').ajaxCallWidget({
            proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                    data: { url:'fillComboBox_syscity' ,
                            pk : $("#pk").val(),
                            language_code: $("#langCode").val(),
                            component_type: 'ddslick',
                            country_id : country_id
                    }
           })
        ajaxCities.ajaxCallWidget ({
             onError : function (event, textStatus,errorThrown) {
                 dm.dangerMessage({
                    onShown : function() {
                        $('#load-imager-cities-popup').loadImager('removeLoadImage'); 
                    }
                 });
                 dm.dangerMessage('show', 'Şehirler Bulunamamıştır...',
                                          'Şehirler bulunamamıştır...');
             },
             onSuccess : function (event, data) {
                 var data = $.parseJSON(data);
                 $('#load-imager-cities-popup').loadImager('removeLoadImage');
                 $('#dropdownCitiesPopup').ddslick({
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
                            window.fillBoroughsPopup(row);
                        } else {
                            $('#dropdownBoroughsPopup').ddslick('destroy');
                            /*$('#load-imager-boroughs-popup').loadImager(); 
                            $('#load-imager-boroughs-popup').loadImager('removeLoadImage'); 
                            $('#load-imager-boroughs-popup').loadImager('appendImage'); */
                        }
                    }   
                }); 
                if(window.dropdownCityControler) {
                    $('#dropdownCitiesPopup').ddslick('selectByValue', 
                                        {index: ''+row.city_id+''});
                    window.dropdownCityControler = false;
                }
                
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage({
                    onShown : function() {
                        $('#load-imager-cities-popup').loadImager('removeLoadImage'); 
                    }
                 });
                 dm.dangerMessage('show', 'Şehirler Bulunamamıştır...',
                                          'Şehirler  bulunamamıştır...');
             },
        }) 
        ajaxCities.ajaxCallWidget('call');
    } else {
        $('#dropdownCitiesPopup').ddslick('destroy');
        $('#dropdownBoroughsPopup').ddslick('destroy');
        
        /*$('#load-imager-boroughs-popup').loadImager(); 
        $('#load-imager-boroughs-popup').loadImager('removeLoadImage'); 
        $('#load-imager-boroughs-popup').loadImager('appendImage'); */
        
        $('#city_popup').show();
        if(!$('#city_popup').hasClass('validate[required]')) {
            $("#city_popup").addClass('validate[required]');
        }
        $('#osbFormPopup').validationEngine('hide');
    }
}

/**
 * filling boroughs drop down for poup window (update operation)
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 24/08/2016
 */
window.fillBoroughsPopup = function(row) {
    $('#dropdownBoroughsPopup').ddslick('destroy');
    
    var ddData = $('#dropdownCitiesPopup').data('ddslick')
    var city_id = ddData.selectedData.value;
    
    if(city_id>0) {
        $('#load-imager-boroughs-popup').loadImager(); 
        $('#load-imager-boroughs-popup').loadImager('removeLoadImage'); 
        $('#load-imager-boroughs-popup').loadImager('appendImage'); 

        var ddData = $('#dropdownCountriesPopup').data('ddslick')
        var country_id = ddData.selectedData.value;

        var ddData = $('#dropdownCitiesPopup').data('ddslick')
        var city_id = ddData.selectedData.value;

        var ajaxCities = $('#load-imager-boroughs-popup').ajaxCallWidget({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'fillComboBox_sysborough' ,
                                pk : $("#pk").val(),
                                language_code: $("#langCode").val(),
                                component_type: 'ddslick',
                                country_id: country_id,
                                city_id: city_id,
                        }
               })
            ajaxCities.ajaxCallWidget ({
                 onError : function (event, textStatus,errorThrown) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#load-imager-boroughs-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'İlçeler Bulunamamıştır...',
                                              'İlçeler bulunamamıştır...');
                 },
                 onSuccess : function (event, data) {
                     var data = $.parseJSON(data);
                     $('#load-imager-boroughs-popup').loadImager('removeLoadImage');
                     $('#dropdownBoroughsPopup').ddslick({
                        height : 200,
                        data : data, 
                        width:'98%',
                        selectText: "Select your preferred social network",
                        //showSelectedHTML : false,
                        defaultSelectedIndex: 3,
                        search : true,
                        //imagePosition:"right",
                        onSelected: function(selectedData){
                        }   
                    });
                    if(window.dropdownBoroughControler){
                        $('#dropdownBoroughsPopup').ddslick('selectByValue', 
                                        {index: ''+row.borough_id+''});
                        window.dropdownBoroughControler = false;
                    }
                    
                 },
                 onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#load-imager-boroughs-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'İlçeler Bulunamamıştır...',
                                              'İlçeler  bulunamamıştır...');
                 },
            }) 
            ajaxCities.ajaxCallWidget('call');
    } else {
       /* $('#load-imager-boroughs').loadImager(); 
        $('#load-imager-boroughs').loadImager('removeLoadImage'); 
        $('#load-imager-boroughs').loadImager('appendImage'); */
    } 
}

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
 * ACL privilege insert form validation engine attached to work
 * @since 23/08/2016
 */
$('#osbForm').validationEngine();

 /**
* reset button function for OSB insert form
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 23/08/2016
*/
window.resetOsbForm = function () {
   $('#osbForm').validationEngine('hide');
   return false;
}
     

// Left menuyu oluşturmak için çağırılan fonksiyon...
//$.fn.leftMenuFunction();

    
/**
 * wrapper class for pop up and delete organized industry zone ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 24/08/2016
 */
window.deleteOSBUltimatelyDialog= function(id, index){
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteOsbUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'OSB Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Tanımlanmış OSB verisini silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete organized industrial zone
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 23/08/2016
*/
window.deleteOsbUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysOsb' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'OSB  Silme İşlemi Başarısız...',
                                     'OSB  silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysOsb" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    //console.warn(index);
                    loaderGridBlock.loadImager('removeLoadImage');
                    
                    /*var node = $('#tt_tree_menu2').tree('find', id);
                    $('#tt_tree_menu2').tree('remove', node.target);*/
                    
                    $('#tt_grid_dynamic').datagrid('reload');
                    //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                }
            });
            sm.successMessage('show', 'OSB Silme İşleminiz Başarılı...',
                                      'OSB  silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert OSB wrapper function
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 23/08/2016
 */
window.insertOsbWrapper = function (e) {
 e.preventDefault();
 if ($("#osbForm").validationEngine('validate')) {
     
    var ddData = $('#dropdownCountries').data('ddslick');
     
    if(!ddData.selectedData.value > 0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Ülke Seçiniz', 'Lütfen ülke seçiniz!');
        return false;
    }
    var country = ddData.selectedData.text;
    country = $.trim(country).toLowerCase();
    if(country == 'türkiye') {
        var ddDataCities = $('#dropdownCities').data('ddslick');
        if(!ddDataCities.selectedData.value > 0) { 
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Şehir Seçiniz', 'Lütfen şehir seçiniz!');
            return false;
        }
        
        var ddDataBoroughs = $('#dropdownBoroughs').data('ddslick');
        if(!ddDataBoroughs.selectedData.value > 0) { 
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'İlçe Seçiniz', 'Lütfen ilçe seçiniz!');
            return false;
        }
    }
     insertOsb();
 }
 return false;
}


/**
 * insert OSB
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 23/08/2016
 */
window.insertOsb = function () {
     $("#osbInsertBlock").loadImager();
     $("#osbInsertBlock").loadImager('appendImage');
     
     var name = $('#name').val();
     var name_eng = $('#name_eng').val();
     var city = $('#city').val();
     var address = $('#address').val();
     var postal_code = $('#postal_code').val();
     
     var ddDataCountries = $('#dropdownCountries').data('ddslick');
     var country_id  = ddDataCountries.selectedData.value;
     
     var city_id = 0;
     var ddDataCities = $('#dropdownCities').data('ddslick');
     if (typeof ddDataCities != 'undefined'){
         city_id  = ddDataCities.selectedData.value;
     }
     
     var borough_id = 0;
     var ddDataBoroughs = $('#dropdownBoroughs').data('ddslick');
     if (typeof ddDataBoroughs != 'undefined'){
         borough_id  = ddDataBoroughs.selectedData.value;
     }
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysOsb' ,
                         pk : $("#pk").val(),
                         language_code : $('#langCode').val(),
                         name : name,
                         name_eng : name_eng,
                         city : city,
                         country_id : country_id,
                         city_id : city_id,
                         borough_id : borough_id,
                         address : address,
                         postal_code : postal_code
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'OSB  Ekleme İşlemi Başarısız...', 
                                       'OSB ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysOsb" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              //console.log(data);
              var data = data;
             sm.successMessage('resetOnShown');
             sm.successMessage('show', 'OSB Kayıt İşlemi Başarılı...', 
                                       'OSB kayıt işlemini gerçekleştirdiniz... ',
                                       data);
            
            $('#tt_grid_dynamic').datagrid({
                queryParams: {
                        pk: $('#pk').val(),
                        subject: 'datagrid',
                        url : 'pkFillOsbList_sysOsb',
                        sort : 'id',
                        order : 'desc',
                },
            });
            $('#tt_grid_dynamic').datagrid('enableFilter');
            $('#tt_grid_dynamic').datagrid('reload');
            
            $('#osbForm')[0].reset();  
            $("#osbInsertBlock").loadImager('removeLoadImage');
            /*$('#load-imager-boroughs').loadImager();
            $('#load-imager-boroughs').loadImager('removeLoadImage');*/

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'OSB Kayıt İşlemi Başarısız...', 
                                       'OSB  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysOsb" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'OSB  Kayıt İşlemi Başarısız...', 
                                     'OSB  kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysOsb" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#osbForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'OSB Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile OSB yetki  kaydı yapılmıştır, yeni bir OSB yetki deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   
     
/**
 * wrapper for organized ındustrial zone update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 23/08/2016
 */
window.updateOsbDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" OSB "sini güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="osbFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">OSB</label>\n\
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
                                                             <label class="col-sm-2 control-label">OSB Eng.</label>\n\
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
                                                            <label class="col-sm-2 control-label">Ülke</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div  id="load-imager-countries-popup" class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownCountriesPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Şehir</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div  id="load-imager-cities-popup" class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="city_popup" id="city_popup" value="'+row.city+'" /><div id="dropdownCitiesPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">İlçe</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div  id="load-imager-boroughs-popup" class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownBoroughsPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Adres</label>\n\
                                                             <div  class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="address_popup" id="address_popup" placeholder="Adres Giriniz ...">'+row.address+'</textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Posta Kodu</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.postal_code+'" name="postal_code_popup" id="postal_code_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateOsbWrapper(event, '+id+');">\n\
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
            window.dropdownCityControler = true;
            window.dropdownBoroughControler = true;
            $('#osbFormPopup').validationEngine();
             
            $("#load-imager-countries-popup").loadImager();
            $("#load-imager-countries-popup").loadImager('appendImage');
            
            var ajaxCountriesPopup = $('#load-imager-countries-popup').ajaxCallWidget({
                proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                        data: { url:'fillComboBox_syscountrys' ,
                                pk : $("#pk").val(),
                                language_code : $('#langCode').val(),
                                component_type: 'ddslick'
                        }
           })
            ajaxCountriesPopup.ajaxCallWidget ({
                onError : function (event, textStatus,errorThrown) {
                    dm.dangerMessage({
                       onShown : function() {
                           //$('#mach-prod-box').loadImager('removeLoadImage'); 
                       }
                    });
                    dm.dangerMessage('show', 'Şehir Bulunamamıştır...',
                                             'Şehir bulunamamıştır...');
                },
                onSuccess : function (event, data) {
                    var data = $.parseJSON(data);
                        $('#load-imager-countries-popup').loadImager('removeLoadImage');
                        $('#dropdownCountriesPopup').ddslick({
                                height : 200,
                                data : data, 
                                width:'98%',
                                search : true,
                                //imagePosition:"right",
                                onSelected: function(selectedData){
                                    if(selectedData.selectedData.value>0) {
                                        if(selectedData.selectedData.value>0) {
                                            //alert('seelcted data >0');
                                            
                                            window.fillCitiesPopup(row);
                                        } else if(selectedData.selectedData.value == 0) {
                                            //alert('seelcted data 0');
                                            $('#dropdownCitiesPopup').ddslick('destroy');
                                            //$("#city").toggleClass('form-control validate[required]');
                                            $('#city_popup').show();
                                        }
                                 }
                             }   
                        });  
                        $('#dropdownCountriesPopup').ddslick('selectByValue', 
                                                    {index: ''+row.country_id+''});
                    },
                    onErrorDataNull : function (event, data) {
                         dm.dangerMessage({
                            onShown : function() {
                                //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                            }
                         });
                         dm.dangerMessage('show', 'Şehir Bulunamamıştır...',
                                                  'Şehir bulunamamıştır...');
                     },
                }) 
                ajaxCountriesPopup.ajaxCallWidget('call');
            
            
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
 * update Organized industri zone wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 23/08/2016
 */
window.updateOsbWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#osbFormPopup").validationEngine('validate')) {
     
     
    var ddData = $('#dropdownCountriesPopup').data('ddslick');
     
    if(!ddData.selectedData.value > 0) {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'Ülke Seçiniz', 'Lütfen ülke seçiniz!');
        return false;
    }
    var country = ddData.selectedData.text;
    country = $.trim(country).toLowerCase();
    if(country == 'türkiye') {
        var ddDataCities = $('#dropdownCitiesPopup').data('ddslick');
        if(!ddDataCities.selectedData.value > 0) { 
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Şehir Seçiniz', 'Lütfen şehir seçiniz!');
            return false;
        }
        
        var ddDataBoroughs = $('#dropdownBoroughsPopup').data('ddslick');
        if(!ddDataBoroughs.selectedData.value > 0) { 
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'İlçe Seçiniz', 'Lütfen ilçe seçiniz!');
            return false;
        }
    }
    updateOsb(id);
    return false;
 }
 return false;
}

/**
 * update organized industri zone
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 23/08/2016
 */
window.updateOsb = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var name = $('#name_popup').val();
     var name_eng = $('#name_eng_popup').val();
     var city = $('#city_popup').val();
     var address = $('#address_popup').val();
     var postal_code = $('#postal_code_popup').val();
     
     var ddDataCountries = $('#dropdownCountriesPopup').data('ddslick')
     var country_id  = ddDataCountries.selectedData.value;
     
     var ddDataCities = $('#dropdownCitiesPopup').data('ddslick');
     var city_id = 0;
     if (typeof ddDataCities != 'undefined'){
         city_id  = ddDataCities.selectedData.value;
     }
     
     
     var ddDataBoroughs = $('#dropdownBoroughsPopup').data('ddslick');
     var borough_id = 0;
     if (typeof ddDataBoroughs != 'undefined'){
         borough_id = ddDataBoroughs.selectedData.value;
     }
     
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                        url:'pkUpdate_sysOsb' ,
                        pk : $("#pk").val(),
                        id : id,
                        language_code : $('#langCode').val(),
                        name : name,
                        name_eng : name_eng,
                        city : city,
                        country_id : country_id,
                        city_id : city_id,
                        borough_id : borough_id,
                        address : address,
                        postal_code : postal_code
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'OSB Güncelleme İşlemi Başarısız...', 
                                      'OSB güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysOsb" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage('resetOnShown');
             sm.successMessage('show', 'OSB Güncelleme İşlemi Başarılı...', 
                                       'OSB güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
            loader.loadImager('removeLoadImage');
            $('#loading-image-crud-popup').loadImager();
            $('#loading-image-crud-popup').loadImager('removeLoadImage');
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'OSB Güncelleme İşlemi Başarısız...', 
                                      'OSB güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysOsb" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'OSB Güncelleme İşlemi Başarısız...', 
                                      'OSB güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * active/passive organized industry zone
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 23/08/2016
 */
window.activePassiveOsbWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveOsb(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'OSB Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'OSB aktif/pasif işlemi gerçekleştirmek  üzeresiniz...');
 return false;
}

/**
 * active or passive organized industry zone
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 23/08/2016
 */
window.activePassiveOsb = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    //console.log(domElement);

    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysOsb' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'OSB Aktif/Pasif İşlemi Başarısız...', 
                                      'OSB aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysOsb" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'OSB Aktif/Pasif İşlemi Başarılı...', 
                                       'OSB aktif/pasif işlemini gerçekleştirdiniz... ',
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
             dm.dangerMessage('show', 'OSB Aktif/Pasif İşlemi Başarısız...', 
                                      'OSB aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysOsb" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'OSB Aktif/Pasif İşlemi Başarısız...', 
                                      'OSB aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
