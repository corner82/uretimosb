$(document).ready(function() { 
        
        // binds form submission and fields to the validation engine
        jQuery("#formCompany").validationEngine();
        
        $('#tt_tree').tree({
            url: '../slimProxyEkoOstim/SlimProxyBoot.php?url=getNaceCodes_nace',
            //queryParams : { url:'getNaceCodes_nace' },
            method:'get',
            animate:true,  
            checkbox:true,
            cascadeCheck : false,
        });
        

        $('#formCompany').submit(function(e) {
                //e.preventDefault();
                alert("test");  
                checkedArray = $("#tt_tree").tree("getChecked");
                console.log(checkedArray);
                var vars = $("#formCompany").serialize();
                if ($("#formCompany").validationEngine('validate')) {
                    console.log(vars);
                    alert("test 2 ");
                    /*$.ajax({
                            url:"sample.php"
                    });*/

                }
                return false;
            });
              

            // firma genel bilgileri
            $('#tt_grid_dynamic').datagrid({
            onDblClickRow : function (index, row) {  
                //alert(row.sirket_id);
                $("#firmaGenelBilgi").html(row.firm_name+' firmasında işlem yapıyorsunuz');
                $('#isim').val(row.firm_name);
                $('#sgk_sicil_no').val(row.sgk_sicil_no);
                $('#vno').val(row.tax_no);
                $('#vdairesi').val(row.tax_office);
            },
            url : '../slimProxyEkoOstim/SlimProxyBoot.php?url=getCompaniesInfo_company',
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
