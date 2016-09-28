$(document).ready(function () {

    /**
     * while widget todolist is being filled, loading image is displayed
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */
    $('#todolistbox').loadImager();
    //$('#todolistbox').loadImager('appendImage');
    
    /**
     * todo list box widget is being filled
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */
    var filler = $('#todolistbox').todolistFiller();
    
    /**
     * operation type tool select box filling for please select item
     * @author Mustafa Zeynel Dağlı
     * @since 11/02/2016
     */
    window.getOperationTypeToolsPleaseSelect = function() {
        var dropdownOperationsToolsData = [
            {
                text: "Lütfen Onay Aracı Seçiniz",
                value: -1,
                selected: true,
                description: "Operasyon tipi 'Onay' olarak seçilirse bu alan dolacaktır...",
                imageSrc: ""
            }
        ];
        
        $('#dropdownOperationsTools').ddslick({
            data : dropdownOperationsToolsData, 
            width:'100%',
            //selectText: "Select your preferred social network",
            imagePosition:"right",
            onSelected: function(selectedData){
                //console.log(selectedData.selectedData.text);
            }   
        });
        if($('#dropdownOperationsToolsContainer').loadImager()!='undefined') {
            $('#dropdownOperationsToolsContainer').loadImager('removeLoadImage');
        }
        
    }
    window.getOperationTypeToolsPleaseSelect();

    /**
     * return operation type tools
     * @returns {boolean}
     * @author Mustafa Zeynel Dağlı
     * @since 10/02/2016
     */
    window.getOperationTypeTools = function () {
        
        /*try {
            writeMyFile(theData); //This may throw a error
          } catch(e) {  
            handleError(e); // If we got a error we handle it
          } finally {
            closeMyFile(); // always close the resource
          }*/
        
        
        $.ajax({
            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkFillConsultantOperationsToolsDropDown_sysOperationTypesTools' ,
                    language_code : 'tr',
                    main_group : 0,
                    pk : $("#pk").val()}, 
            type: 'GET',
            dataType: 'json',
            success: function (datas, textStatus, jqXHR) {
                if(datas.length!==0) {
                    $('#dropdownOperationsTools').ddslick('destroy');
                    $('#dropdownOperationsTools').ddslick({
                        data : datas,
                        width:'100%',
                        //selectText: "Select your preferred social network",
                        imagePosition:"right",

                    });
                } else {
                    console.error('"pkFillConsultantOperationsDropDown_sysOperationTypes" servis datası boştur!!');
                }
                $('#dropdownOperationsToolsContainer').loadImager('removeLoadImage');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                BootstrapDialog.show({
                    title: 'Servis Hatası- Hata Kodu : AAA11',
                    message: 'Servis hatası oluşmuştur, hata kodu sistem yöneticine yollanacaktır!!',
                    description: 'Servis hatası oluşmuştur, hata kodu sistem yöneticine yollanacaktır!!',
                    type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    closable: true, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ban-circle',
                        label: 'Tamam',
                        cssClass: 'btn-warning',
                        action: function(dialogItself){
                            var error = $(this).errorService();
                            error.errorService('option', 'url', 'pkInsert_infoError');
                            error.errorService('option', 'errorCode', 'AAA11');
                            error.errorService('option', 'errorInfo', textStatus);
                            error.errorService('option', 'errorUrl', 'sfdm/confirm');
                            error.errorService('option', 'page', 'Danışman Onay Sayfası');
                            error.errorService('option', 'pk', $("#pk").val());
                            error.errorService('option', 'service', 'pkFillConsultantOperationsToolsDropDown_sysOperationTypesTools');
                            error.errorService('send');
                            dialogItself.close();
                        }
                    }]
                });
                console.error('"pkFillConsultantOperationsToolsDropDown_sysOperationTypes" servis hatası->'+textStatus);
                $('#dropdownOperationsToolsContainer').loadImager('removeLoadImage');
            }
        });
    }
    
    /**
     * operation type select box filling
     * @author Mustafa Zeynel Dağlı
     * @since 10/02/2016
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkFillConsultantOperationsDropDown_sysOperationTypes' ,
                language_code : 'tr',
                main_group : 2,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                $('#dropdownOperations').ddslick({
                    data : data, 
                    width:'100%',
                    //selectText: "Select your preferred social network",
                    imagePosition:"right",
                    onSelected: function(selectedData){
                        //console.log(selectedData.selectedData.value);
                        if(selectedData.selectedData.value==6) {
                            $('#dropdownOperationsToolsContainer').loadImager();
                            $('#dropdownOperationsToolsContainer').loadImager('appendImage');
                            window.getOperationTypeTools();
                        } else {
                            $('#dropdownOperationsToolsContainer').loadImager();
                            $('#dropdownOperationsToolsContainer').loadImager('appendImage');
                            $('#dropdownOperationsTools').ddslick('destroy');
                            window.getOperationTypeToolsPleaseSelect();
                        }
                    }   
                });
            } else {
                console.error('"pkFillConsultantOperationsDropDown_sysOperationTypes" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkFillConsultantOperationsDropDown_sysOperationTypes" servis hatası->'+textStatus);
        }
    });
    
    /**
     * filling page content header widget with user confirmation statistics
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkGetConsWaitingForConfirm_blActivationReport' ,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            filler.todolistFiller('option','domObjectKey','span[data-fill="true"]');
            filler.todolistFiller('option','otherDomObjectKeys','small[data-fill-number="true"],small[data-fill-number2="true"]');
            filler.todolistFiller('option','otherDomObjectKeysDataLabels',new Array('sure'));
            filler.todolistFiller('option','data',data);
            filler.todolistFiller('fill');
            //$('#todolistbox').loadImager("removeLoadImage");
        },
        error: function (jqXHR, textStatus, errorThrown) {
//            console.error(textStatus);
        }
    });
    
    /**
     * consultant detail  tab click
     * @author Mustafa Zeynel Dağlı
     * @since 08/02/2016
     */
    $('#tab_confirm_container #tab_confirm_clicker').click(function (e) {
        if(!$('#tab_confirm').hasClass('active')) {
            BootstrapDialog.alert({
                title: 'Kulllanıcı seçiniz',
                message: 'Lütfen önce "kullanıcı onayı" tablosundan bir kullanıcı seçiniz...',
                description: 'Kullanıcı belirleyip onay için işlem yapınız.',
                type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                closable: true, // <-- Default value is false
                draggable: true, // <-- Default value is false
                buttonLabel: 'Tamam', // <-- Default value is 'OK',
            });
            $('#tab_confirm_image_loader').loadImager();
            $('#tab_confirm_image_loader').loadImager('appendImage');
            //$('#tab_confirm_container a:first').tab('show');
        }
        e.preventDefault();
     })
    
    /**
     * 'grid_confirm_registration' easyui grid detail click function
     * @param {type} target
     * @returns {undefined}
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */
    window.gridDetailClick= function (target) {
        var rows = $('#grid_confirm_registration').datagrid('getRows'); 
        var row = rows[getRowIndex(target)];
        //console.log(row);
        $.ajax({
            url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            data: { url:'pkGetConsConfirmationProcessDetails_sysOsbConsultants' ,
                    pk : $("#pk").val(),
                    profile_id : row.id}, 
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if(data.length!==0) {
                    $("#username").val(data[0]['username']);
                    $("#languagecode").val(data[0]['languagecode']);
                    $("#firmname").val(data[0]['firmname']);
                    $("#sgkno").val(data[0]['sgkno']);
                    $("#irtibattel").val(data[0]['irtibattel']);
                    $("#irtibatcep").val(data[0]['irtibatcep']);
                    $("#iletisimadresi").val(data[0]['iletisimadresi']);
                    $("#faturaadresi").val(data[0]['faturaadresi']);
                    $("#sdate").val(data[0]['sdate']);
                    
                    if($('#tab_confirm_image_loader').loadImager() != 'undefined') {
                        $('#tab_confirm_image_loader').loadImager('removeLoadImage');
                        $('#tab_confirm_container a[href="#tab_confirm"]').tab('show');
                    }
                } else {
                    BootstrapDialog.alert({
                        title: 'DİKKAT!! Kullanıcı detayları belirlenememiştir',
                        message: 'Kullanıcı dateyları belirlenememiştir, lütfen başka kullanıcı seçiniz!!',
                        type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                        closable: true, // <-- Default value is false
                        draggable: true, // <-- Default value is false
                        buttonLabel: 'Tamam', // <-- Default value is 'OK',
                    });
                } 
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.error(textStatus);
            }
        });  
    }
    
    /**
     * trying to get row index from easyui grid
     * @param {type} target
     * @returns integer
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */
    window.getRowIndex = function (target){
        var tr = $(target).closest('tr.datagrid-row');
        return parseInt(tr.attr('datagrid-row-index'));
    }

    /**
     * grid_confirm_registration easyui datagrid
     * user confirmation datagrid listing for confirmation
     * @author Mustafa Zeynel Dağlı
     * @since 10/02/2016
     */
    $('#grid_confirm_registration').datagrid({
            onDblClickRow : function (index, row) {
                //$('.nav-tabs a[href="#tab_1-1"]').tab('show');  
                //alert('test');
            },  
            url : 'https://proxy.uretimosb.com/SlimProxyBoot.php',
            queryParams : { url:'pkGetConsPendingFirmProfile_sysOsbConsultants' ,
                            pk : $('#pk').val()}, 
            //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
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
            sortable : true,
            columns:
                [[
                    {field:'id',title:'ID'},
                    {field:'username',title:'Kullanıcı Adı',sortable:true,width:350},
                    //{field:'operation_name',title:'İşlem',sortable:true, width:100},
                    {field:'company_name',title:'Firma',sortable:true, width:350},
                    //{field:'c_date',title:'Fat. Adres', width:200},
                    {field:'s_date',title:'Kayıt Tarihi',sortable:true, width:200},
                    {field:'detay',title:'Detay',sortable:false, align:'center', 
                        width:100,
                        formatter:function(value,row,index){
                            var e = '<a style="color:#f39c12" href="javascript:void(0)" onclick="gridDetailClick(this)">Detay</a> ';
                            return e;
                        }
                    },
                    /*{field:'c_date',title:'İşlem Tarihi', width:200},
                    {field:'c_date',title:'İlet. Adres', width:200},
                    {field:'c_date',title:'Fat. Adres', width:200},*/
                ]]   
      }); 
      
    /** 
     * grid_confirm_registration datagrid filter 
     * @author Mustafa Zeynel Dağlı
     * @since 11/02/2016  
     */  
    var grid_confirm_registration_filter = $('#grid_confirm_registration').datagrid();
    grid_confirm_registration_filter.datagrid('enableFilter');
      

    /**
     * page contetnt header widgets are filled here (small colorfull boxes)
     * @author Mustafa Zeynel Dağlı
     * @since 11/02/2016
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkGetConsultantUpDashBoardCount_blActivationReport' ,
                pk : $("#pk").val()},
        type: 'GET',
        dataType: 'json',
        language_id:647,
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            $("#toplam_header_1_container").headerSetter(data[0]);
            $("#toplam_header_2_container").headerSetter(data[1]);
            $("#toplam_header_3_container").headerSetter(data[2]);
            $("#toplam_header_4_container").headerSetter(data[3]);
            //$('#todolistbox').loadImager("removeLoadImage");
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
//            console.error(textStatus);
        }

    });

    /**
     * cretaes half donut graghic for display
     * @author Mustafa Zeynel Dağlı
     * @since 10/02/2016
     */
    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: { url:'pkGetConsultantOperation_blActivationReport' ,
                pk : $("#pk").val()},
        type: 'GET',
        dataType: 'json',
        language_id:647,
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
//            console.warn(data);
            var dataArr = [];
            var catArr = [];
            $.each(data, function (index) {
                catArr.push(data[index].aciklama, parseFloat(data[index].adet));
                dataArr.push(catArr);
                catArr = [];
                //dataArr.push({y:parseInt(data[index].adet)});

            });

            //console.error(dataArr);
            // 3-d column bar
            $('#container_machinerByResource').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                title: {
                    text: 'Danışman Operasyonları',
                    align: 'center',
                    verticalAlign: 'top',
                    y: 50
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false,
                            distance: 20,
                            style: {
                                /*fontWeight: 'bold',*/
                                color: 'black',
                                //textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '85%'],
                        showInLegend: true
                    }
                },
                series: [{
                        type: 'pie',
                        name: 'Danışman İşlem Toplamları',
                        innerSize: '80%',
                        data: dataArr,
                        /*data: [
                         //dataArr
                         ['50 tona kadar',853],
                         ['50-100 Ton',  499],
                         ['100-150 Ton', 418],
                         ['150-200 Ton', 325],
                         ['200-250 Ton', 141],
                         ['250-300 Ton', 122],
                         ['300-350 Ton', 81],
                         ['350-400 Ton', 36],
                         ['400-450 Ton', 109],
                         ['500 Ton ve üstü', 310],
                         
                         ]*/
                    }]
            });
        }

    });

    /*
     * Author: Abdullah A Almsaeed
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


    // Left menuyu oluşturmak için çağırılan fonksiyon...
    //$.fn.leftMenuFunction();
});