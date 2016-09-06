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
        
        
        $('#formProcess').submit(function(e) {
            //e.preventDefault();
            var vars = $("#formProcess").serialize();
            if ($("#formProcess").validationEngine('validate')) {
                $('#companyProcessBlock').block({ 
                    message: '<h1>İşlem yapılıyor..</h1>', 
                    css: { border: 'none', 
                        padding: '15px', 
                        backgroundColor: '#000', 
                        '-webkit-border-radius': '10px', 
                        '-moz-border-radius': '10px', 
                        opacity: .5, 
                        color: '#fff' } 
                }); 
                var row = $('#tt_grid_dynamic').datagrid('getSelected');
                console.log(row);
                $.ajax({
                    url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
                    data : {
                            form : vars,
                            firm_id : row.id,
                            url : 'setFirmProcess_process'
                    },
                    type: 'GET',
                    dataType : 'json',
                    success: function(data, textStatus, jqXHR) {


                        $('#process_name').val('');
                        $('#description').val('');
                        getCompanyProcesses();
                         $('#companyProcessBlock').unblock();
                         if(data['errorInfo'][0]=='00000') {
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
                      $('#companyProcessBlock').unblock();
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
        

        $('#formWorkflow').submit(function(e) {
                //e.preventDefault();
                var vars = $("#formWorkflow").serialize();
                if ($("#formWorkflow").validationEngine('validate')) {
                    $('#companyWorkflowBlock').block({ 
                        message: '<h1>İşlem yapılıyor..</h1>', 
                        css: { border: 'none', 
                            padding: '15px', 
                            backgroundColor: '#000', 
                            '-webkit-border-radius': '10px', 
                            '-moz-border-radius': '10px', 
                            opacity: .5, 
                            color: '#fff' } 
                    }); 
                    var row = $('#tt_grid_dynamic').datagrid('getSelected');
                    console.log(row);
                    $.ajax({
                        url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
                        data : {
                                form : vars,
                                firm_id : row.id,
                                url : 'setFirmWorkflowDefinition_workflow'
                        },
                        type: 'GET',
                        dataType : 'json',
                        success: function(data, textStatus, jqXHR) {
                            
                            
                            $('#workflow_name').val('');
                            $('#description').val('');
                            getCompanyWorkflows();
                             $('#companyWorkflowBlock').unblock();
                             if(data['errorInfo'][0]=='00000') {
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
                          $('#companyWorkflowBlock').unblock();
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
            url: '../slimProxyEkoOstim/SlimProxyBoot.php?url=getGTIPCodes_gtip',
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
    
        // firma süreç bilgileri grid
        $('#tt_grid_cmpn_surec').datagrid({
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
                    {field:'id',title:'ID',width:300},
                    {field:'firm_name',title:'Firma',width:300,sortable:true},
                    {field:'workflow_name',title:'İş Süreci',width:300,sortable:true},
                    {field:'description',title:' Açıklama',width:500},
                ]]   
        });
        
        // firma process bilgileri grid
        $('#tt_grid_cmpn_process').datagrid({
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
                    {field:'id',title:'ID',width:300},
                    {field:'firm_name',title:'Firma',width:300,sortable:true},
                    {field:'process_name',title:'İş Süreci',width:300,sortable:true},
                    {field:'description',title:' Açıklama',width:500},
                ]]   
        });
                
        // firma genel bilgileri
        $('#tt_grid_dynamic').datagrid({
        onDblClickRow : function (index, row) {
            $('#companyWorkflowTitle').html(row.firm_name+' firmasına süreç bilgisi eklemektesiniz');
            $('#companyWorkflowsTitle').html(row.firm_name+' Firması Süreç Bilgileri');
            $('#companyProcessesTitle').html(row.firm_name+' Firması Proses Bilgileri');
            $('#companyProcessTitle').html(row.firm_name+' firmasına proses bilgisi eklemektesiniz');
            
            getCompanyWorkflows(); 
            getCompanyProcesses();
        },  
        url : '../slimProxyEkoOstim/SlimProxyBoot.php?url=getCompaniesInfo_company',
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
                {field:'firm_name',title:'Firma',sortable:true,width:300},
                {field:'foundation_year',title:'Kuruluş Yılı',sortable:true, width:100},
                {field:'firm_web',title:'Web Adresi', width:200},
                {field:'tax_office',title:'Vergi Dairesi', width:200},
                {field:'tax_no',title:' Vergi Numarası',sortable:true,width:200},
                {field:'sgk_sicil_no',title:'SGK Sicil No', width:200}, 
            ]]   
  });
          
          // Datagrid filter
            var dg = $('#tt_grid_dynamic').datagrid();
            dg.datagrid('enableFilter', [
                {field:'dis_ticaret_personel_sayisi',
                type:'numberbox',
                options:{precision:1},
                op:['equal','notequal','less','greater'] 
                },
                {field:'fanafa',
                type:'combobox',
                options:{
                    panelHeight:'auto',
                    data:[{value:'',text:'Hepsi'},{value:'0',text:'Bilgi Alınmayanlar'},
                                                  {value:'1',text:'Depo'},
                                                  {value:'2',text:'Diğer'},
                                                  {value:'3',text:'Hizmet'},
                                                  {value:'4',text:'Sanayi'},
                                                  {value:'5',text:'Ticaret'},
                                                    ],
                    onChange:function(value){
                        if (value == ''){
                            dg.datagrid('removeFilterRule', 'fanafa');
                        } else {
                            dg.datagrid('addFilterRule', {
                                field: 'fanafa',
                                op: 'equal',
                                value: value
                            });
                        }
                        dg.datagrid('doFilter');
                    }
                    } 
                },
                {field:'csayisi',
                type:'combobox',
                options:{
                    panelHeight:'auto',
                    data:[{value:'',text:'Hepsi'},{value:'0',text:'Eleman Çalıştırmayanlar'},
                                                  {value:'1',text:'1-9 Eleman'},
                                                  {value:'2',text:'10-19 Eleman'},
                                                  {value:'3',text:'20-49 Eleman'},
                                                  {value:'4',text:'50-99 Eleman'},
                                                  {value:'5',text:'100+ Eleman'},
                                                  {value:'6',text:'Çalışan sayısı girilmemiş'},
                                                    ],
                    onChange:function(value){
                        if (value == ''){
                            dg.datagrid('removeFilterRule', 'csayisi');
                        } else {
                            dg.datagrid('addFilterRule', {
                                field: 'csayisi',
                                op: 'equal',
                                value: value
                            });
                        }
                        dg.datagrid('doFilter');
                    }
                    } 
                },
                {field:'osermaye',
                type:'numberbox',
                options:{precision:1},
                op:['equal','notequal','less','greater'] 
                },
                {field:'isayisi',
                type:'numberbox',
                options:{precision:1},
                op:['equal','notequal','less','greater'] 
                },
                {field:'satis_personeli_sayisi',
                type:'numberbox',
                options:{precision:1},
                op:['equal','notequal','less','greater'] 
                },
                {field:'kumeye_dahil_mi',
                type:'combobox',
                options:{
                    panelHeight:'auto',
                    data:[{value:'',text:'Hepsi'},{value:'1',text:'Kümeye dahil olanlar'},{value:'0',text:'Kümeye dahil olmayanlar'}],
                    onChange:function(value){
                        if (value == ''){
                            dg.datagrid('removeFilterRule', 'kumeye_dahil_mi');
                        } else {
                            dg.datagrid('addFilterRule', {
                                field: 'kumeye_dahil_mi',
                                op: 'equal',
                                value: value
                            });
                        }
                        dg.datagrid('doFilter');
                    }
                    }
                }
                ]);
                
       
    
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
