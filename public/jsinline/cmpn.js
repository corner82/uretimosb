$(document).ready(function() { 
        
        // binds form submission and fields to the validation engine
        jQuery("#formCompany").validationEngine();

        $('#formCompany').submit(function(e) {
                //e.preventDefault();
                var vars = $("#formCompany").serialize();
                if ($("#formCompany").validationEngine('validate')) {
                    console.log(vars);
                    /*$.ajax({
                            url:"sample.php"
                    });*/

                }
                return false;
            });
              
        /*$.extend($.fn.datagrid.defaults, {
              width: getMainWidth()
        });

        function getMainWidth(){
            return $("#tt_grid_other_machinery_Main").width();  
         }*/
        
                // firma genel bilgileri
                $('#tt_grid_dynamic').datagrid({
                onDblClickRow : function (index, row) {
                    //alert(row.sirket_id);
                    $.ajax({
                        url : '../ostim_anket_slim/firma.php/getCompanyByID',   
                        data : {
                                id : row.sirket_id
                        },
                        type: 'GET',
                        dataType : 'json',
                        success: function(data, textStatus, jqXHR) {
                            console.log(data);
                            //console.log(data['company']);
                            //console.log(data['company'].anketor_adi);
                            console.log(data[0].anketor_adi);
                            $('#isim').val(data[0].isim);
                            $('#kume_bilgisi').val(data[0].kume_bilgisi);
                            $('#ssitesi').val(data[0].ssitesi);
                            $('#imerkezi').val(data[0].imerkezi);
                            $('#cadde').val(data[0].cadde);
                            $('#sokak').val(data[0].sokak);
                            $('#dkapino').val(data[0].dkapino);
                            $('#ikapino').val(data[0].ikapino);
                            $('#sgk_sicil_no').val(data[0].sgk_sicil_no);
                            $('#vno').val(data[0].vno);
                            $('#vdairesi').val(data[0].vdairesi);
                            $('#kyili').val(data[0].kyili);
                            $('#mdurumu').val(data[0].mdurumu);
                            $('#email').val(data[0].email);
                            $('#web_sayfasi').val(data[0].web_sayfasi);
                            $('#telefon').val(data[0].telefon);
                            $('#faks').val(data[0].faks);
                            $('#ctelefon').val(data[0].ctelefon);
                            $('#csayisi').val(data[0].csayisi);
                            $('#isayisi').val(data[0].isayisi);
                            $('#tsayisi').val(data[0].tsayisi);
                            $('#msayisi').val(data[0].msayisi);
                            $('#ipsayisi').val(data[0].ipsayisi);
                            $('#satis_personeli_sayisi').val(data[0].satis_personeli_sayisi);
                            $('#dıs_ticaret_personel_sayisi').val(data[0].dıs_ticaret_personel_sayisi);
                            //var obj = jQuery.parseJSON(data);
                            //console.log(obj.anketor_adi);
                            if(!data['notFound']) {

                            } else {
                                /*console.warn('data notfound-->'+textStatus);
                                $.messager.alert('Pick sub flow and company','Please select  a sub flow from flow tree!','warning');*/
                            }
                        },
                        error: function(jqXHR , textStatus, errorThrown) {
                          console.warn('error text status-->'+textStatus);
                        }
                    });
                },
                url : '../ostim_anket_slim/firma.php/getCompanies',
                //url : 'datagrid_data1.json',
                singleSelect:true,
                pagination : true,
                collapsible:true,
                method:'get',
                idField:'sirket_id',
                //toolbar:'#tb5',
                //remoteSort:false,
                //multiSort:false,
                //fit:true,
                fitColumns : true,
                remoteFilter: true,
                remoteSort:true,
                multiSort:false,
                columns:
                        [[
                            {field:'sirket_id',title:'ID',width:300},
                            {field:'isim',title:'Firma',width:300,sortable:true},
                            {field:'gorusme_yapilan_kisi',title:' Görüşme Yapıl. Kiş.',width:300},
                            {field:'osermaye',title:'Özsermaye',width:100,sortable:true},
                            {field:'fanafa',title:'Faaliyet Alan.',width:100},
                            {field:'kategori_id',title:'Kategori Bil.',width:100},
                            {field:'kume_bilgisi',title:' Küme Bilgisi',width:100,sortable:true},
                            {field:'kumeye_dahil_mi',title:'Kümeye Dahilmi',width:100},
                            {field:'csayisi',title:'Çalışan Say.',width:100},
                            {field:'isayisi',title:'İşçi Say.',width:100,sortable:true},
                            {field:'dis_ticaret_personel_sayisi',title:'Dış Ticaret Pers. Say.',width:100,sortable:true},
                            {field:'satis_personeli_sayisi',title:'Satış Pers. Say.',width:100,sortable:true},
                            
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
