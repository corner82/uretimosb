$(document).ready(function () {
    
 
    
/**
 * Sand-Signika theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
   href: '//fonts.googleapis.com/css?family=Signika:400,700',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

// Add the background image to the container
Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
   proceed.call(this);
   this.container.style.background = 'url(http://www.highcharts.com/samples/graphics/sand.png)';
});


Highcharts.theme = {
   colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: null,
      style: {
         fontFamily: "Signika, serif"
      }
   },
   title: {
      style: {
         color: 'black',
         fontSize: '16px',
         fontWeight: 'bold'
      }
   },
   subtitle: {
      style: {
         color: 'black'
      }
   },
   tooltip: {
      borderWidth: 0
   },
   legend: {
      itemStyle: {
         fontWeight: 'bold',
         fontSize: '13px'
      }
   },
   xAxis: {
      labels: {
         style: {
            color: '#6e6e70'
         }
      }
   },
   yAxis: {
      labels: {
         style: {
            color: '#6e6e70'
         }
      }
   },
   plotOptions: {
      series: {
         shadow: true
      },
      candlestick: {
         lineColor: '#404048'
      },
      map: {
         shadow: false
      }
   },

   // Highstock specific
   navigator: {
      xAxis: {
         gridLineColor: '#D0D0D8'
      }
   },
   rangeSelector: {
      buttonTheme: {
         fill: 'white',
         stroke: '#C0C0C8',
         'stroke-width': 1,
         states: {
            select: {
               fill: '#D0D0D8'
            }
         }
      }
   },
   scrollbar: {
      trackBorderColor: '#C0C0C8'
   },

   // General
   background2: '#E0E0E8'

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
    
    
    var data = [
[Date.UTC(2015,5,19),0.8808],
[Date.UTC(2015,5,21),0.8794],
[Date.UTC(2015,5,22),0.8818],
[Date.UTC(2015,5,23),0.8952],
[Date.UTC(2015,5,24),0.8924],
[Date.UTC(2015,5,25),0.8925],
[Date.UTC(2015,5,26),0.8955],
[Date.UTC(2015,5,28),0.9113],
[Date.UTC(2015,5,29),0.8900],
[Date.UTC(2015,5,30),0.8950]
]
    
    $('#timeSeries').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'USD to EUR exchange rate over time'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'USD to EUR',
                data: data
            }]
        });
    

     $('#todolistbox').loadImager();
     var filler = $('#todolistbox').todolistFiller();
    
    $.ajax({
        //url: '../slim_2/index.php/columnflows_json_test',
        //url: 'http://10.18.2.179/ostim_anket_slim/tezgah.php/getMachineryBySector',
        //url: 'https://slim.localhost.com/tezgah.php/getMachineryBySector',
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkGetConsWaitingForConfirm_blActivationReport' ,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        language_id:647,
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            filler.todolistFiller('option','domObjectKey','span[data-fill="true"]');
            filler.todolistFiller('option','otherDomObjectKeys','small[data-fill-number="true"],small[data-fill-number2="true"]');
            filler.todolistFiller('option','otherDomObjectKeysDataLabels',new Array('sure'));
            filler.todolistFiller('option','data',data);
            filler.todolistFiller('fill');
            $('#todolistbox').loadImager('removeLoadImage');  
        },
        error: function (jqXHR, textStatus, errorThrown) {
//            console.error(textStatus);
        }

    });

    
  

    // sektörlere göre tezgah sayıları grafiği (#container_tezgah)
    $.ajax({
        //url: '../slim_2/index.php/columnflows_json_test',
        //url: 'http://10.18.2.179/ostim_anket_slim/tezgah.php/getMachineryBySector',
        //url: 'https://slim.localhost.com/tezgah.php/getMachineryBySector',
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
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
            $('#todolistbox').loadImager("removeLoadImage");
        },
        error: function (jqXHR, textStatus, errorThrown) {
//            console.error(textStatus);
        }

    });

    // grafik machinery by resource (#container_machinerByResource)
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkGetConsultantOperation_blActivationReport' ,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
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
    $.fn.leftMenuFunction();
});