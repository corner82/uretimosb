function getCompanyWorkflows () {
    var row = $('#tt_grid_dynamic').datagrid('getSelected');
    $.ajax({
            url : '../slimProxyEkoOstim/SlimProxyBoot.php',   
            data : {
                    id : row.id,
                    url : 'getCompaniesWorkflow_workflow',
            },
            type: 'GET',
            dataType : 'json',
            success: function(data, textStatus, jqXHR) {
                
                if(!data['notFound']) {
                } else {
                }
                $('#tt_grid_cmpn_surec').datagrid({
                    data : data,
                });
            },
            error: function(jqXHR , textStatus, errorThrown) {
              console.warn('error text status-->'+textStatus);
            }
        });  
}
function getCompanyProcesses () {
    var row = $('#tt_grid_dynamic').datagrid('getSelected');
    $.ajax({
            url : '../slimProxyEkoOstim/SlimProxyBoot.php',   
            data : {
                    id : row.id,
                    url : 'getCompaniesProcess_process',
            },
            type: 'GET',
            dataType : 'json',
            success: function(data, textStatus, jqXHR) {
                
                if(!data['notFound']) {
                } else {
                }
                $('#tt_grid_cmpn_process').datagrid({
                    data : data,
                });
            },
            error: function(jqXHR , textStatus, errorThrown) {
              console.warn('error text status-->'+textStatus);
            }
        });  
}
function setWorkflowProcess() {
    var rowCompany = null;
    var rowWorkFlow = null;
    var rowProcess = null;
    rowCompany = $('#tt_grid_dynamic').datagrid('getSelected');
    rowWorkFlow = $('#tt_grid_cmpn_surec').datagrid('getSelected');
    rowProcess = $('#tt_grid_cmpn_process').datagrid('getSelected');
    console.log(rowCompany);
    console.log(rowWorkFlow);
    console.log(rowProcess);
    if(rowCompany == null || rowWorkFlow == null || rowProcess == null
       || (rowCompany.firm_name!==rowWorkFlow.firm_name || rowCompany.firm_name!== rowProcess.firm_name)) {
        $.blockUI({ 
            message: $('#selectPopUp'), 
            fadeIn: 700, 
            fadeOut: 700, 
            timeout: 2000, 
            showOverlay: false, 
            centerY: false, 
            css: { 
                width: '350px', 
                top: '10px', 
                left: '', 
                right: '10px', 
                border: 'none', 
                padding: '5px', 
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .6, 
                color: '#fff' 
            } 
        });
    }
    
}

$(document).ready(function() { 
        
        // binds form submission and fields to the validation engine
        jQuery("#formWorkflow").validationEngine();
        jQuery("#formProcess").validationEngine();
        jQuery('input').attr('data-prompt-position','topLeft');
        jQuery('input').data('promptPosition','topLeft');
        jQuery('textarea').attr('data-prompt-position','topLeft');
        jQuery('textarea').data('promptPosition','topLeft');
        jQuery('select').attr('data-prompt-position','topLeft');
        jQuery('select').data('promptPosition','topLeft');
        
        
        // company treegrid
        $('#tt_treeGrid').treegrid({
            onSelect : function(row) {
                console.log(row);
            },
            height : 300,
            url:'../slimProxyEkoOstim/SlimProxyBoot.php',
            queryParams : { url:'getCompaniesTreegrid_treegrid' },
            idField:'id',
            treeField:'firm_name',
            columns:[[
                {title:'Firma',field:'firm_name',width:700},
                {title:'Tip', field :'type', width : 200},
                /*{field:'quantity',title:'Miktar',width:60,align:'right'},
                {field:'price',title:'fiyat',width:80},
                {field:'total',title:'Toplam',width:80}*/
            ]]
        });
        
        // emisyon ekleme formu
        $('#formEmulsion').submit(function(e) {
            //e.preventDefault();
            $('#companyEmulsionBlock').block({ 
                message: '<h1>İşlem yapılıyor..</h1>', 
                css: { border: 'none', 
                    padding: '15px', 
                    backgroundColor: '#000', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: .5, 
                    color: '#fff' } 
            }); 


            var nodeRawMaterialTree = $('#tt_tree_emission').tree('getSelected');
            var rowTreeGrid = $('#tt_treeGrid').treegrid('getSelected');
            // hammadde seçlmemişse
            if(nodeRawMaterialTree==null) {
                 $.blockUI({ 
                    message: $('#popUpChooseEmulsion'), 
                    fadeIn: 700, 
                    fadeOut: 700, 
                    timeout: 2000, 
                    showOverlay: false, 
                    centerY: false, 
                    css: { 
                        width: '350px', 
                        top: '10px', 
                        left: '', 
                        right: '10px', 
                        border: 'none', 
                        padding: '5px', 
                        backgroundColor: '#000', 
                        '-webkit-border-radius': '10px', 
                        '-moz-border-radius': '10px', 
                        opacity: .6, 
                        color: '#fff' 
                    } 
                });
                $('#companyEmulsionBlock').unblock();
            }
            // process seçilmemişse
           if(rowTreeGrid==null) {
                 $.blockUI({ 
                    message: $('#popUpChooseProcess'), 
                    fadeIn: 700, 
                    fadeOut: 700, 
                    timeout: 2000, 
                    showOverlay: false, 
                    centerY: false, 
                    css: { 
                        width: '350px', 
                        top: '10px', 
                        left: '', 
                        right: '10px', 
                        border: 'none', 
                        padding: '5px', 
                        backgroundColor: '#000', 
                        '-webkit-border-radius': '10px', 
                        '-moz-border-radius': '10px', 
                        opacity: .6, 
                        color: '#fff' 
                    } 
                });
                $('#companyEmulsionBlock').unblock();
            } else {
                var splitArr = rowTreeGrid['id'].split('-');
                if(splitArr.length!=4) {
                    $.blockUI({ 
                        message: $('#popUpChooseProcess'), 
                        fadeIn: 700, 
                        fadeOut: 700, 
                        timeout: 2000, 
                        showOverlay: false, 
                        centerY: false, 
                        css: { 
                            width: '350px', 
                            top: '10px', 
                            left: '', 
                            right: '10px', 
                            border: 'none', 
                            padding: '5px', 
                            backgroundColor: '#000', 
                            '-webkit-border-radius': '10px', 
                            '-moz-border-radius': '10px', 
                            opacity: .6, 
                            color: '#fff' 
                        } 
                    });
                    $('#companyEmulsionBlock').unblock();
                }
            }

            // kayıt yapıyoruz
            if(rowTreeGrid!=null && nodeRawMaterialTree!=null && splitArr.length==4) {
                console.log(nodeRawMaterialTree);
                $.ajax({
                 url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
                 data : {
                         firm_id : splitArr[0],
                         firm_workflow_id : splitArr[2],
                         firm_material_id : nodeRawMaterialTree.id,
                         material_type_id : 3,
                         amount: $('#emulsionQuantity').val(),
                         url : 'setEmulsion_workflowMater'
                 },
                 type: 'GET',
                 dataType : 'json',
                 success: function(data, textStatus, jqXHR) {


                     $('#emulsionQuantity').val('');
                      $('#companyEmulsionBlock').unblock();
                      if(data['errorInfo'][0]=='00000') {
                          $('#tt_treeGrid').treegrid('reload');
                          $.blockUI({ 
                             message: $('div.growlUI'), 
                             fadeIn: 700, 
                             fadeOut: 700, 
                             timeout: 2000, 
                             showOverlay: false, 
                             centerY: false, 
                             css: { 
                                 width: '350px', 
                                 top: '10px', 
                                 left: '', 
                                 right: '10px', 
                                 border: 'none', 
                                 padding: '5px', 
                                 backgroundColor: '#000', 
                                 '-webkit-border-radius': '10px', 
                                 '-moz-border-radius': '10px', 
                                 opacity: .6, 
                                 color: '#fff' 
                             } 
                         });
                     } else {
                         $.blockUI({ 
                             message: $('div.growlUI2'), 
                             fadeIn: 700, 
                             fadeOut: 700, 
                             timeout: 2000, 
                             showOverlay: false, 
                             centerY: false, 
                             css: { 
                                 width: '350px', 
                                 top: '10px', 
                                 left: '', 
                                 right: '10px', 
                                 border: 'none', 
                                 padding: '5px', 
                                 backgroundColor: '#000', 
                                 '-webkit-border-radius': '10px', 
                                 '-moz-border-radius': '10px', 
                                 opacity: .6, 
                                 color: '#fff' 
                             } 
                         });
                     }
                     return false;
                 },
                 error: function(jqXHR , textStatus, errorThrown) {
                   console.warn('error text status-->'+textStatus);
                   $('#companyEmulsionBlock').unblock();
                   $.blockUI({ 
                         message: $('div.growlUI2'), 
                         fadeIn: 700, 
                         fadeOut: 700, 
                         timeout: 2000, 
                         showOverlay: false, 
                         centerY: false, 
                         css: { 
                             width: '350px', 
                             top: '10px', 
                             left: '', 
                             right: '10px', 
                             border: 'none', 
                             padding: '5px', 
                             backgroundColor: '#000', 
                             '-webkit-border-radius': '10px', 
                             '-moz-border-radius': '10px', 
                             opacity: .6, 
                             color: '#fff' 
                         } 
                     });
                     return false;
                 }
             });
            }



            return false;
        });
        
        // atık ekleme formu
        $('#formWaste').submit(function(e) {
            //e.preventDefault();
            $('#companyWasteBlock').block({ 
                message: '<h1>İşlem yapılıyor..</h1>', 
                css: { border: 'none', 
                    padding: '15px', 
                    backgroundColor: '#000', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: .5, 
                    color: '#fff' } 
            }); 


            var nodeRawMaterialTree = $('#tt_tree_waste').tree('getSelected');
            var rowTreeGrid = $('#tt_treeGrid').treegrid('getSelected');
            // hammadde seçlmemişse
            if(nodeRawMaterialTree==null) {
                 $.blockUI({ 
                    message: $('#popUpChooseWaste'), 
                    fadeIn: 700, 
                    fadeOut: 700, 
                    timeout: 2000, 
                    showOverlay: false, 
                    centerY: false, 
                    css: { 
                        width: '350px', 
                        top: '10px', 
                        left: '', 
                        right: '10px', 
                        border: 'none', 
                        padding: '5px', 
                        backgroundColor: '#000', 
                        '-webkit-border-radius': '10px', 
                        '-moz-border-radius': '10px', 
                        opacity: .6, 
                        color: '#fff' 
                    } 
                });
                $('#companyWasteBlock').unblock();
            }
            // process seçilmemişse
           if(rowTreeGrid==null) {
                 $.blockUI({ 
                    message: $('#popUpChooseProcess'), 
                    fadeIn: 700, 
                    fadeOut: 700, 
                    timeout: 2000, 
                    showOverlay: false, 
                    centerY: false, 
                    css: { 
                        width: '350px', 
                        top: '10px', 
                        left: '', 
                        right: '10px', 
                        border: 'none', 
                        padding: '5px', 
                        backgroundColor: '#000', 
                        '-webkit-border-radius': '10px', 
                        '-moz-border-radius': '10px', 
                        opacity: .6, 
                        color: '#fff' 
                    } 
                });
                $('#companyWasteBlock').unblock();
            } else {
                var splitArr = rowTreeGrid['id'].split('-');
                if(splitArr.length!=4) {
                    $.blockUI({ 
                        message: $('#popUpChooseProcess'), 
                        fadeIn: 700, 
                        fadeOut: 700, 
                        timeout: 2000, 
                        showOverlay: false, 
                        centerY: false, 
                        css: { 
                            width: '350px', 
                            top: '10px', 
                            left: '', 
                            right: '10px', 
                            border: 'none', 
                            padding: '5px', 
                            backgroundColor: '#000', 
                            '-webkit-border-radius': '10px', 
                            '-moz-border-radius': '10px', 
                            opacity: .6, 
                            color: '#fff' 
                        } 
                    });
                    $('#companyWasteBlock').unblock();
                }
            }

            // kayıt yapıyoruz
            if(rowTreeGrid!=null && nodeRawMaterialTree!=null && splitArr.length==4) {
                console.log(nodeRawMaterialTree);
                $.ajax({
                 url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
                 data : {
                         firm_id : splitArr[0],
                         firm_workflow_id : splitArr[2],
                         firm_material_id : nodeRawMaterialTree.id,
                         material_type_id : 2,
                         amount: $('#wasteQuantity').val(),
                         url : 'setFirmRaw_workflowMater'
                 },
                 type: 'GET',
                 dataType : 'json',
                 success: function(data, textStatus, jqXHR) {


                     $('#wasteQuantity').val('');
                      $('#companyWasteBlock').unblock();
                      if(data['errorInfo'][0]=='00000') {
                          $('#tt_treeGrid').treegrid('reload');
                          $.blockUI({ 
                             message: $('div.growlUI'), 
                             fadeIn: 700, 
                             fadeOut: 700, 
                             timeout: 2000, 
                             showOverlay: false, 
                             centerY: false, 
                             css: { 
                                 width: '350px', 
                                 top: '10px', 
                                 left: '', 
                                 right: '10px', 
                                 border: 'none', 
                                 padding: '5px', 
                                 backgroundColor: '#000', 
                                 '-webkit-border-radius': '10px', 
                                 '-moz-border-radius': '10px', 
                                 opacity: .6, 
                                 color: '#fff' 
                             } 
                         });
                     } else {
                         $.blockUI({ 
                             message: $('div.growlUI2'), 
                             fadeIn: 700, 
                             fadeOut: 700, 
                             timeout: 2000, 
                             showOverlay: false, 
                             centerY: false, 
                             css: { 
                                 width: '350px', 
                                 top: '10px', 
                                 left: '', 
                                 right: '10px', 
                                 border: 'none', 
                                 padding: '5px', 
                                 backgroundColor: '#000', 
                                 '-webkit-border-radius': '10px', 
                                 '-moz-border-radius': '10px', 
                                 opacity: .6, 
                                 color: '#fff' 
                             } 
                         });
                     }
                     return false;
                 },
                 error: function(jqXHR , textStatus, errorThrown) {
                   console.warn('error text status-->'+textStatus);
                   $('#companyWasteBlock').unblock();
                   $.blockUI({ 
                         message: $('div.growlUI2'), 
                         fadeIn: 700, 
                         fadeOut: 700, 
                         timeout: 2000, 
                         showOverlay: false, 
                         centerY: false, 
                         css: { 
                             width: '350px', 
                             top: '10px', 
                             left: '', 
                             right: '10px', 
                             border: 'none', 
                             padding: '5px', 
                             backgroundColor: '#000', 
                             '-webkit-border-radius': '10px', 
                             '-moz-border-radius': '10px', 
                             opacity: .6, 
                             color: '#fff' 
                         } 
                     });
                     return false;
                 }
             });
            }



            return false;
        });
        
        // hammadde ekleme formu
        $('#formRawMaterial').submit(function(e) {

                $('#companyRawMaterialBlock').block({ 
                    message: '<h1>İşlem yapılıyor..</h1>', 
                    css: { border: 'none', 
                        padding: '15px', 
                        backgroundColor: '#000', 
                        '-webkit-border-radius': '10px', 
                        '-moz-border-radius': '10px', 
                        opacity: .5, 
                        color: '#fff' } 
                }); 
                
                
                var nodeRawMaterialTree = $('#tt_tree').tree('getSelected');
                var rowTreeGrid = $('#tt_treeGrid').treegrid('getSelected');
                // hammadde seçlmemişse
                if(nodeRawMaterialTree==null) {
                     $.blockUI({ 
                        message: $('#popUpChooseRawMaterial'), 
                        fadeIn: 700, 
                        fadeOut: 700, 
                        timeout: 2000, 
                        showOverlay: false, 
                        centerY: false, 
                        css: { 
                            width: '350px', 
                            top: '10px', 
                            left: '', 
                            right: '10px', 
                            border: 'none', 
                            padding: '5px', 
                            backgroundColor: '#000', 
                            '-webkit-border-radius': '10px', 
                            '-moz-border-radius': '10px', 
                            opacity: .6, 
                            color: '#fff' 
                        } 
                    });
                    $('#companyRawMaterialBlock').unblock();
                }
                // process seçilmemişse
               if(rowTreeGrid==null) {
                     $.blockUI({ 
                        message: $('#popUpChooseProcess'), 
                        fadeIn: 700, 
                        fadeOut: 700, 
                        timeout: 2000, 
                        showOverlay: false, 
                        centerY: false, 
                        css: { 
                            width: '350px', 
                            top: '10px', 
                            left: '', 
                            right: '10px', 
                            border: 'none', 
                            padding: '5px', 
                            backgroundColor: '#000', 
                            '-webkit-border-radius': '10px', 
                            '-moz-border-radius': '10px', 
                            opacity: .6, 
                            color: '#fff' 
                        } 
                    });
                    $('#companyRawMaterialBlock').unblock();
                } else {
                    var splitArr = rowTreeGrid['id'].split('-');
                    if(splitArr.length!=4) {
                        $.blockUI({ 
                            message: $('#popUpChooseProcess'), 
                            fadeIn: 700, 
                            fadeOut: 700, 
                            timeout: 2000, 
                            showOverlay: false, 
                            centerY: false, 
                            css: { 
                                width: '350px', 
                                top: '10px', 
                                left: '', 
                                right: '10px', 
                                border: 'none', 
                                padding: '5px', 
                                backgroundColor: '#000', 
                                '-webkit-border-radius': '10px', 
                                '-moz-border-radius': '10px', 
                                opacity: .6, 
                                color: '#fff' 
                            } 
                        });
                        $('#companyRawMaterialBlock').unblock();
                    }
                }
                
                // kayıt yapıyoruz
                if(rowTreeGrid!=null && nodeRawMaterialTree!=null && splitArr.length==4) {
                    console.log(nodeRawMaterialTree);
                    $.ajax({
                     url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
                     data : {
                             firm_id : splitArr[0],
                             firm_workflow_id : splitArr[2],
                             firm_material_id : nodeRawMaterialTree.id,
                             material_type_id : 1,
                             amount: $('#rawMaterialQuantity').val(),
                             url : 'setFirmRaw_workflowMater'
                     },
                     type: 'GET',
                     dataType : 'json',
                     success: function(data, textStatus, jqXHR) {


                          $('#rawMaterialQuantity').val('');
                          $('#companyRawMaterialBlock').unblock();
                          if(data['errorInfo'][0]=='00000') {
                              $('#tt_treeGrid').treegrid('reload');
                              $.blockUI({ 
                                 message: $('div.growlUI'), 
                                 fadeIn: 700, 
                                 fadeOut: 700, 
                                 timeout: 2000, 
                                 showOverlay: false, 
                                 centerY: false, 
                                 css: { 
                                     width: '350px', 
                                     top: '10px', 
                                     left: '', 
                                     right: '10px', 
                                     border: 'none', 
                                     padding: '5px', 
                                     backgroundColor: '#000', 
                                     '-webkit-border-radius': '10px', 
                                     '-moz-border-radius': '10px', 
                                     opacity: .6, 
                                     color: '#fff' 
                                 } 
                             });
                         } else {
                             $.blockUI({ 
                                 message: $('div.growlUI2'), 
                                 fadeIn: 700, 
                                 fadeOut: 700, 
                                 timeout: 2000, 
                                 showOverlay: false, 
                                 centerY: false, 
                                 css: { 
                                     width: '350px', 
                                     top: '10px', 
                                     left: '', 
                                     right: '10px', 
                                     border: 'none', 
                                     padding: '5px', 
                                     backgroundColor: '#000', 
                                     '-webkit-border-radius': '10px', 
                                     '-moz-border-radius': '10px', 
                                     opacity: .6, 
                                     color: '#fff' 
                                 } 
                             });
                         }
                         return false;
                     },
                     error: function(jqXHR , textStatus, errorThrown) {
                       console.warn('error text status-->'+textStatus);
                       $('#companyRawMaterialBlock').unblock();
                       $.blockUI({ 
                             message: $('div.growlUI2'), 
                             fadeIn: 700, 
                             fadeOut: 700, 
                             timeout: 2000, 
                             showOverlay: false, 
                             centerY: false, 
                             css: { 
                                 width: '350px', 
                                 top: '10px', 
                                 left: '', 
                                 right: '10px', 
                                 border: 'none', 
                                 padding: '5px', 
                                 backgroundColor: '#000', 
                                 '-webkit-border-radius': '10px', 
                                 '-moz-border-radius': '10px', 
                                 opacity: .6, 
                                 color: '#fff' 
                             } 
                         });
                         return false;
                     }
                 });
                }
                

                
                return false;
            });
              
        $('#tt_tree').tree({
            url: '../slimProxyEkoOstim/SlimProxyBoot.php?url=getRawMaterials_raw',
            //queryParams : { url:'getNaceCodes_nace' },
            method:'get',
            animate:true,  
            checkbox:false,
            cascadeCheck : false,    
        });
        
        $('#tt_tree_waste').tree({  
            url: '../slimProxyEkoOstim/SlimProxyBoot.php?url=getWasteCodes_waste',
            //queryParams : { url:'getNaceCodes_nace' },
            method:'get',
            animate:true,  
            checkbox:false,
            cascadeCheck : false,
        });
        
        $('#tt_tree_emission').tree({  
            url: '../slimProxyEkoOstim/SlimProxyBoot.php?url=getEmulsion_emulsion',
            //queryParams : { url:'getNaceCodes_nace' },
            method:'get',
            animate:true,  
            checkbox:false,
            cascadeCheck : false,
        });
        
        $('#tt_tree_unit').tree({  
            url: '../slimProxyEkoOstim/SlimProxyBoot.php?url=getUnitArea_combobox',
            //queryParams : { url:'getNaceCodes_nace' },
            method:'get',
            animate:true,  
            checkbox:false,
            cascadeCheck : false,
        });
    
        $( window ).resize(function() {
            $('#tt_grid_cmpn_process').datagrid('resize');
            $('#tt_grid_cmpn_surec').datagrid('resize');
            $('#tt_grid_dynamic').datagrid('resize');
        });
    
});
    
    
 /* Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/
"use strict";

$(function () {

  //Make the dashboard widgets sortable Using jquery UI
  $(".connectedSortable").sortable({
    placeholder: "sort-highlight",
    connectWith: ".connectedSortable",
    handle: ".box-header, .nav-tabs",
    forcePlaceholderSize: true,
    zIndex: 999999
  });
  $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");
  
  //jQuery UI sortable for the todo list
  $(".todo-list").sortable({
    placeholder: "sort-highlight",
    handle: ".handle",
    forcePlaceholderSize: true,
    zIndex: 999999
  });

  //bootstrap WYSIHTML5 - text editor
  $(".textarea").wysihtml5();

  $('.daterange').daterangepicker(
          {
            ranges: {
              'Today': [moment(), moment()],
              'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
              'Last 7 Days': [moment().subtract('days', 6), moment()],
              'Last 30 Days': [moment().subtract('days', 29), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
              'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
            },
            startDate: moment().subtract('days', 29),
            endDate: moment()
          },
  function (start, end) {
    alert("You chose: " + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  });

  /* jQueryKnob */
  $(".knob").knob();

  //jvectormap data
  var visitorsData = {
    "US": 398, //USA
    "SA": 400, //Saudi Arabia
    "CA": 1000, //Canada
    "DE": 500, //Germany
    "FR": 760, //France
    "CN": 300, //China
    "AU": 700, //Australia
    "BR": 600, //Brazil
    "IN": 800, //India
    "GB": 320, //Great Britain
    "RU": 3000 //Russia
  };
  //World map by jvectormap
  $('#world-map').vectorMap({
    map: 'world_mill_en',
    backgroundColor: "transparent",
    regionStyle: {
      initial: {
        fill: '#e4e4e4',
        "fill-opacity": 1,
        stroke: 'none',
        "stroke-width": 0,
        "stroke-opacity": 1
      }
    },
    series: {
      regions: [{
          values: visitorsData,
          scale: ["#92c1dc", "#ebf4f9"],
          normalizeFunction: 'polynomial'
        }]
    },
    onRegionLabelShow: function (e, el, code) {
      if (typeof visitorsData[code] != "undefined")
        el.html(el.html() + ': ' + visitorsData[code] + ' new visitors');
    }
  });

  //Sparkline charts
  var myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021];
  $('#sparkline-1').sparkline(myvalues, {
    type: 'line',
    lineColor: '#92c1dc',
    fillColor: "#ebf4f9",
    height: '50',
    width: '80'
  });
  myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921];
  $('#sparkline-2').sparkline(myvalues, {
    type: 'line',
    lineColor: '#92c1dc',
    fillColor: "#ebf4f9",
    height: '50',
    width: '80'
  });
  myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
  $('#sparkline-3').sparkline(myvalues, {
    type: 'line',
    lineColor: '#92c1dc',
    fillColor: "#ebf4f9",
    height: '50',
    width: '80'
  });

  //The Calender
  $("#calendar").datepicker();

  //SLIMSCROLL FOR CHAT WIDGET
  $('#chat-box').slimScroll({
    height: '250px'
  });



  /* The todo list plugin */
  $(".todo-list").todolist({
    onCheck: function (ele) {
      console.log("The element has been checked")
    },
    onUncheck: function (ele) {
      console.log("The element has been unchecked")
    }
  });

});
