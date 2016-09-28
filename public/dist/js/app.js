/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.1.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */

'use strict';

//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
    throw new Error("AdminLTE requires jQuery");
}

window.leftMenuWidget = $('#leftside-menu').leftMenu();
window.leftMenuWidget.leftMenu('setBaseMenu');

/**
 * page loading image fade out
 * @param {type} param
 * @author Mustafa Zeynel Dağlı
 * @since 28/09/2016
 */
$(window).load(function() {
        // Animate loader off screen
        $(".se-pre-con").fadeOut("slow");;
});

/* AdminLTE
 *
 * @type Object
 * @description $.AdminLTE is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.AdminLTE.options = {
    //Add slimscroll to navbar menus
    //This requires you to load the slimscroll plugin
    //in every page before app.js
    navbarMenuSlimscroll: true,
    navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
    navbarMenuHeight: "200px", //The height of the inner menu
    //Sidebar push menu toggle button selector
    sidebarToggleSelector: "[data-toggle='offcanvas']",
    //Activate sidebar push menu
    sidebarPushMenu: true,
    //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
    sidebarSlimScroll: true,
    //Enable sidebar expand on hover effect for sidebar mini
    //This option is forced to true if both the fixed layout and sidebar mini
    //are used together
    sidebarExpandOnHover: false,
    //BoxRefresh Plugin
    enableBoxRefresh: true,
    //Bootstrap.js tooltip
    enableBSToppltip: true,
    BSTooltipSelector: "[data-toggle='tooltip']",
    //Enable Fast Click. Fastclick.js creates a more
    //native touch experience with touch devices. If you
    //choose to enable the plugin, make sure you load the script
    //before AdminLTE's app.js
    enableFastclick: true,
    //Control Sidebar Options
    enableControlSidebar: true,
    controlSidebarOptions: {
        //Which button should trigger the open/close event
        toggleBtnSelector: "[data-toggle='control-sidebar']",
        //The sidebar selector
        selector: ".control-sidebar",
        //Enable slide over content
        slide: true
    },
    //Box Widget Plugin. Enable this plugin
    //to allow boxes to be collapsed and/or removed
    enableBoxWidget: true,
    //Box Widget plugin options
    boxWidgetOptions: {
        boxWidgetIcons: {
            //Collapse icon
            collapse: 'fa-minus',
            //Open icon
            open: 'fa-plus',
            //Remove icon
            remove: 'fa-times'
        },
        boxWidgetSelectors: {
            //Remove button selector
            remove: '[data-widget="remove"]',
            //Collapse button selector
            collapse: '[data-widget="collapse"]'
        }
    },
    //Direct Chat plugin options
    directChat: {
        //Enable direct chat by default
        enable: true,
        //The button to open and close the chat contacts pane
        contactToggleSelector: '[data-widget="chat-pane-toggle"]'
    },
    //Define the set of colors to use globally around the website
    colors: {
        lightBlue: "#3c8dbc",
        red: "#f56954",
        green: "#00a65a",
        aqua: "#00c0ef",
        yellow: "#f39c12",
        blue: "#0073b7",
        navy: "#001F3F",
        teal: "#39CCCC",
        olive: "#3D9970",
        lime: "#01FF70",
        orange: "#FF851B",
        fuchsia: "#F012BE",
        purple: "#8E24AA",
        maroon: "#D81B60",
        black: "#222222",
        gray: "#d2d6de"
    },
    //The standard screen sizes that bootstrap uses.
    //If you change these in the variables.less file, change
    //them here too.
    screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
    //Extend options if external options exist
    if (typeof AdminLTEOptions !== "undefined") {
        $.extend(true,
                $.AdminLTE.options,
                AdminLTEOptions);
    }

    //Easy access to options
    var o = $.AdminLTE.options;

    //Set up the object
    _init();

    //Activate the layout maker
    $.AdminLTE.layout.activate();

    //Enable sidebar tree view controls
    $.AdminLTE.tree('.sidebar');

    //Enable sidebar tree view controls
    $.AdminLTE.dynamicTree('.sidebar');

    //Enable control sidebar
    if (o.enableControlSidebar) {
        $.AdminLTE.controlSidebar.activate();
    }

    //Add slimscroll to navbar dropdown
    if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
        $(".navbar .menu").slimscroll({
            height: o.navbarMenuHeight,
            alwaysVisible: false,
            size: o.navbarMenuSlimscrollWidth
        }).css("width", "100%");
    }

    //Activate sidebar push menu
    if (o.sidebarPushMenu) {
        $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
    }

    //Activate Bootstrap tooltip
    if (o.enableBSToppltip) {
        $('body').tooltip({
            selector: o.BSTooltipSelector
        });
    }

    //Activate box widget
    if (o.enableBoxWidget) {
        $.AdminLTE.boxWidget.activate();
    }

    //Activate fast click
    if (o.enableFastclick && typeof FastClick != 'undefined') {
        FastClick.attach(document.body);
    }

    //Activate direct chat widget
    if (o.directChat.enable) {
        $(o.directChat.contactToggleSelector).on('click', function () {
            var box = $(this).parents('.direct-chat').first();
            box.toggleClass('direct-chat-contacts-open');
        });
    }

    /*
     * INITIALIZE BUTTON TOGGLE
     * ------------------------
     */
    $('.btn-group[data-toggle="btn-toggle"]').each(function () {
        var group = $(this);
        $(this).find(".btn").on('click', function (e) {
            group.find(".btn.active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
        });

    });
});

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
function _init() {

    /* Layout
     * ======
     * Fixes the layout height in case min-height fails.
     *
     * @type Object
     * @usage $.AdminLTE.layout.activate()
     *        $.AdminLTE.layout.fix()
     *        $.AdminLTE.layout.fixSidebar()
     */
    $.AdminLTE.layout = {
        activate: function () {
            var _this = this;
            _this.fix();
            _this.fixSidebar();
            $(window, ".wrapper").resize(function () {
                _this.fix();
                _this.fixSidebar();
            });
        },
        fix: function () {
            //Get window height and the wrapper height
            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
            var window_height = $(window).height();
            var sidebar_height = $(".sidebar").height();
            //Set the min-height of the content and sidebar based on the
            //the height of the document.
            if ($("body").hasClass("fixed")) {
                $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
            } else {
                var postSetWidth;
                if (window_height >= sidebar_height) {
                    $(".content-wrapper, .right-side").css('min-height', window_height - neg);
                    postSetWidth = window_height - neg;
                } else {
                    $(".content-wrapper, .right-side").css('min-height', sidebar_height);
                    postSetWidth = sidebar_height;
                }

                //Fix for the control sidebar height
                var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
                if (typeof controlSidebar !== "undefined") {
                    if (controlSidebar.height() > postSetWidth)
                        $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
                }

            }
        },
        fixSidebar: function () {
            //Make sure the body tag has the .fixed class
            if (!$("body").hasClass("fixed")) {
                if (typeof $.fn.slimScroll != 'undefined') {
                    $(".sidebar").slimScroll({destroy: true}).height("auto");
                }
                return;
            } else if (typeof $.fn.slimScroll == 'undefined' && console) {
                console.error("Error: the fixed layout requires the slimscroll plugin!");
            }
            //Enable slimscroll for fixed layout
            if ($.AdminLTE.options.sidebarSlimScroll) {
                if (typeof $.fn.slimScroll != 'undefined') {
                    //Destroy if it exists
                    $(".sidebar").slimScroll({destroy: true}).height("auto");
                    //Add slimscroll
                    $(".sidebar").slimscroll({
                        height: ($(window).height() - $(".main-header").height()) + "px",
                        color: "rgba(0,0,0,0.2)",
                        size: "3px"
                    });
                }
            }
        }
    };

    /* PushMenu()
     * ==========
     * Adds the push menu functionality to the sidebar.
     *
     * @type Function
     * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
     */
    $.AdminLTE.pushMenu = {
        activate: function (toggleBtn) {
            //Get the screen sizes
            var screenSizes = $.AdminLTE.options.screenSizes;

            //Enable sidebar toggle
            $(toggleBtn).on('click', function (e) {
                e.preventDefault();

                //Enable sidebar push menu
                if ($(window).width() > (screenSizes.sm - 1)) {
                    $("body").toggleClass('sidebar-collapse');
                }
                //Handle sidebar push menu for small screens
                else {
                    if ($("body").hasClass('sidebar-open')) {
                        $("body").removeClass('sidebar-open');
                        $("body").removeClass('sidebar-collapse');
                    } else {
                        $("body").addClass('sidebar-open');
                    }
                }
            });

            $(".content-wrapper").click(function () {
                //Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                    $("body").removeClass('sidebar-open');
                }
            });

            //Enable expand on hover for sidebar mini
            if ($.AdminLTE.options.sidebarExpandOnHover
                    || ($('body').hasClass('fixed')
                            && $('body').hasClass('sidebar-mini'))) {
                this.expandOnHover();
            }

        },
        expandOnHover: function () {
            var _this = this;
            var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
            //Expand sidebar on hover
            $('.main-sidebar').hover(function () {
                if ($('body').hasClass('sidebar-mini')
                        && $("body").hasClass('sidebar-collapse')
                        && $(window).width() > screenWidth) {
                    _this.expand();
                }
            }, function () {
                if ($('body').hasClass('sidebar-mini')
                        && $('body').hasClass('sidebar-expanded-on-hover')
                        && $(window).width() > screenWidth) {
                    _this.collapse();
                }
            });
        },
        expand: function () {
            $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
        },
        collapse: function () {
            if ($('body').hasClass('sidebar-expanded-on-hover')) {
                $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
            }
        }
    };

    /* Tree()
     * ======
     * Converts the sidebar into a multilevel
     * tree view menu.
     *
     * @type Function
     * @Usage: $.AdminLTE.tree('.sidebar')
     */
    $.AdminLTE.tree = function (menu) {
        var _this = this;

        $("li a", $(menu)).on('click', function (e) {
            //Get the clicked link and the next element
            var $this = $(this);
            var checkElement = $this.next();

            //Check if the next element is a menu and is visible
            if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                //Close the menu
                checkElement.slideUp('normal', function () {
                    checkElement.removeClass('menu-open');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    //_this.layout.fix();
                });
                checkElement.parent("li").removeClass("active");
            }
            //If the menu is not visible
            else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                //Get the parent menu
                var parent = $this.parents('ul').first();
                //Close all open menus within the parent
                var ul = parent.find('ul:visible').slideUp('normal');
                //Remove the menu-open class from the parent
                ul.removeClass('menu-open');
                //Get the parent li
                var parent_li = $this.parent("li");

                //Open the target menu and add the menu-open class
                checkElement.slideDown('normal', function () {
                    //Add the class active to the parent li
                    checkElement.addClass('menu-open');
                    parent.find('li.active').removeClass('active');
                    parent_li.addClass('active');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    _this.layout.fix();
                });
            }
            //if this isn't a link, prevent the page from being redirected
            if (checkElement.is('.treeview-menu')) {
                e.preventDefault();
            }
        });
    };

    /* DynamicTree()
     * ======
     * Converts the sidebar into a multilevel
     * dynamic tree view menu from database.
     *
     * @type Function
     * @Usage: $.AdminLTE.dynamicTree('.sidebar')
     * Auhtor: Bahram Lotfi
     * AdminLTE.dynamicTree function controls left menubar items...
     * Menubar items are called using services...
     * Unnecessary items are prevented from calling...
     * Date: 4.12.2015
     */


    $.AdminLTE.dynamicTree = function (clickedObject) {

        var currentPath = window.location.hostname
                + $("#requestUriRegulated").val()
                .replace('--dil--', $("#langCode").val());

        var currentPathArray = currentPath.split('/');

//        console.log(currentPathArray);

        if (typeof clickedObject.id === "undefined") {

            /*
             * catches page object event with undefined id
             */





        } else {

            var _this = this;
            var $this = $(this);
//            console.log(this);

            var clickedObject_query_id = clickedObject.id.replace("menu_", "");
//            console.error(clickedObject_query_id);
            var treeview_id = clickedObject.id + "_treeview-menu";
            var treeview_id_ref = "#" + treeview_id;

            var parent = $(treeview_id_ref).parents('ul').first();
            var parent_li = $(treeview_id_ref).parent("li");
            var ul = parent.find('ul:visible').slideUp('normal');
//            console.log("public key is " + $("#pk").val());

            if (!$(treeview_id_ref).hasClass('menu-open')) {
                //checks if the menu is open or not...
                if (!$(treeview_id_ref).hasClass('treeview-menu')) {
                    //checks if service has been called before or not...
                    $.ajax({
                        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
//                        url: 'http://proxy.uretimosb.com:9990/SlimProxyBoot.php',
                        data: {
                            parent: clickedObject_query_id,
                            url: 'pkGetLeftMenu_leftnavigation',
                            pk: $("#pk").val(),
                            language_code: $("#langCode").val(),
                            a: $("#controller").val(),
                            m: $("#module").val()
//                            menu_types_id: 1
                                    /*
                                     * clicked object id is being added to the query
                                     * to get the related object submenu
                                     */
                        },
                        method: "GET",
                        async: false,
                        dataType: "json",
                        success: function (data2) {

                            if (data2.length === 0) {
                                /*
                                 * checks if there are any submenu...
                                 * eliminates null responds
                                 */
                            } else {
                                var len = data2.length;
                                var j = 0;

                                /*
                                 * make an iteration pon response coming from 
                                 * query to get submenu information to create 
                                 * html code for appending                                 * 
                                 */

                                $(clickedObject).append($("<ul class='treeview-menu' id=" + treeview_id + "></ul>"));
                                for (j; j < len; j++) {

                                    if (data2[j].collapse === 0) {

                                        /*
                                         * Checks if the new coming submenu
                                         * has any submenus or not;
                                         * if new submenu does have its own submenus
                                         * (collapse == 1 )its html code should be like;
                                         * <li class='treeview' id='menu_" ....
                                         * otherwise collapse == 0 the code would be like:
                                         * <li id='menu_ ...
                                         */

                                        var appending_submenu_html = "<li id='menu_" +
                                                data2[j].id + "'><a href='" +
                                                data2[j].url + "'><i class='fa " +
                                                data2[j].icon_class + "'></i>" +
                                                data2[j].menu_name + "</a></li>";
                                        var submenu_newappend = $(appending_submenu_html);

                                        /*
                                         * appending_submenu_html is the created 
                                         * HTML code to be appended
                                         */

                                        $(treeview_id_ref).append(submenu_newappend);

                                        /*
                                         * created code is appended to the related
                                         * item with reference id of treeview_id_ref
                                         */

                                        $(submenu_newappend).on("click", function (clickedObject2) {
                                            $.AdminLTE.dynamicTree(this);
                                        });

                                        var targetItem = $('#menu_' + data2[j].id);

                                        if (currentPath === data2[j].url) {

                                            $(targetItem).trigger('click');
                                            $.AdminLTE.dynamicTree(this);

                                        }

                                        /*
                                         * Attach click event to the created submenu
                                         * @type String|String
                                         */

                                    } else {

                                        var appending_submenu_html = "<li class='treeview' id='menu_" +
                                                data2[j].id + "'><a href='" +
                                                data2[j].url + "'><i class='fa " +
                                                data2[j].icon_class + "'></i><span>" +
                                                data2[j].menu_name +
                                                "</span><i class='fa fa-angle-left pull-right'></i></a></li>";

                                        var submenu_newappend = $(appending_submenu_html);
                                        $(treeview_id_ref).append(submenu_newappend);
                                        $(submenu_newappend).on("click", function (clickedObject2) {
                                            $.AdminLTE.dynamicTree(this);
                                        });
                                        if (currentPath === data2[j].url) {
                                            var targetItem = $('#menu_' + data2[j].id);

                                            /*
                                             * Bu bölüm alt kırılımların url kontrolunu yapmaktadır. 
                                             * url menu iteminin url ile eşleşiyorsa o şıkkı 
                                             * açacaktır ve sayfa yüklendiğinde açık 
                                             * gözükecektir.
                                             */

                                            $(targetItem).slideDown('normal', function () {
                                                $(targetItem).trigger('click');
                                                $.AdminLTE.dynamicTree(this);
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    });
                }

                /*
                 * in this part it checks for opening and closing operations
                 * 
                 * @type @call;$@call;parents@call;first|@call;$@call;parents@call;first
                 */

                var parent = $(treeview_id_ref).parents('ul').first();
                // finds selected item's first ul parent
                var ul = parent.find('ul:visible').slideUp('normal');
                // finds selected item's existing ul tag


                ul.removeClass('menu-open');
                var parent_li = $(treeview_id_ref).parent("li");
                // finds selected item's first li parent
                // first removes all menu-open classes to close all other items

                $(treeview_id_ref).slideDown('normal', function () {
                    // opens selected item
                    $(treeview_id_ref).addClass('menu-open');
                    // changes its class to open
                    parent.find('li.active').removeClass('active');
                    // remove all other active item
                    parent_li.addClass('active');
                    // keep direct parent active form
                    _this.layout.fix();
                    // fix new menu layout
                });
                event.stopPropagation();
                // stop propagation of event to prevent the reselection of
                // direct parent(s)

            } else {
//                parent_li.removeClass('active');
                // remove all active tags

                $(treeview_id_ref).slideUp('normal', function () {
                    // close open items
                    $(treeview_id_ref).parent("li").removeClass("active");
                    // remove direct open li parents active tag
                    $(treeview_id_ref).removeClass('menu-open');
                    // removes menu-open class from item selected before
                    $(treeview_id_ref).removeClass('active');
                    // deactivates item selected before
                    _this.layout.fix();
                    // fix new menu layout

                });
                event.stopPropagation();
//                event.preventDefault();
            }
        }

        if ($(treeview_id_ref).is('.treeview-menu')) {
            event.preventDefault();
            // stop propagation of event to prevent the reselection of
            // direct parent(s)
        }
    };

    /* ControlSidebar
     * ==============
     * Adds functionality to the right sidebar
     *
     * @type Object
     * @usage $.AdminLTE.controlSidebar.activate(options)
     */
    $.AdminLTE.controlSidebar = {
        //instantiate the object
        activate: function () {
            //Get the object
            var _this = this;
            //Update options
            var o = $.AdminLTE.options.controlSidebarOptions;
            //Get the sidebar
            var sidebar = $(o.selector);
            //The toggle button
            var btn = $(o.toggleBtnSelector);

            //Listen to the click event
            btn.on('click', function (e) {
                e.preventDefault();
                //If the sidebar is not open
                if (!sidebar.hasClass('control-sidebar-open')
                        && !$('body').hasClass('control-sidebar-open')) {
                    //Open the sidebar
                    _this.open(sidebar, o.slide);
                } else {
                    _this.close(sidebar, o.slide);
                }
            });

            //If the body has a boxed layout, fix the sidebar bg position
            var bg = $(".control-sidebar-bg");
            _this._fix(bg);

            //If the body has a fixed layout, make the control sidebar fixed      
            if ($('body').hasClass('fixed')) {
                _this._fixForFixed(sidebar);
            } else {
                //If the content height is less than the sidebar's height, force max height
                if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
                    _this._fixForContent(sidebar);
                }
            }
        },
        //Open the control sidebar
        open: function (sidebar, slide) {
            var _this = this;
            //Slide over content
            if (slide) {
                sidebar.addClass('control-sidebar-open');
            } else {
                //Push the content by adding the open class to the body instead 
                //of the sidebar itself
                $('body').addClass('control-sidebar-open');
            }
        },
        //Close the control sidebar
        close: function (sidebar, slide) {
            if (slide) {
                sidebar.removeClass('control-sidebar-open');
            } else {
                $('body').removeClass('control-sidebar-open');
            }
        },
        _fix: function (sidebar) {
            var _this = this;
            if ($("body").hasClass('layout-boxed')) {
                sidebar.css('position', 'absolute');
                sidebar.height($(".wrapper").height());
                $(window).resize(function () {
                    _this._fix(sidebar);
                });
            } else {
                sidebar.css({
                    'position': 'fixed',
                    'height': 'auto'
                });
            }
        },
        _fixForFixed: function (sidebar) {
            sidebar.css({
                'position': 'fixed',
                'max-height': '100%',
                'overflow': 'auto',
                'padding-bottom': '50px'
            });
        },
        _fixForContent: function (sidebar) {
            $(".content-wrapper, .right-side").css('min-height', sidebar.height());
        }
    };

    /* BoxWidget
     * =========
     * BoxWidget is a plugin to handle collapsing and
     * removing boxes from the screen.
     *
     * @type Object
     * @usage $.AdminLTE.boxWidget.activate()
     *        Set all your options in the main $.AdminLTE.options object
     */
    $.AdminLTE.boxWidget = {
        selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
        icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
        activate: function () {
            var _this = this;
            //[data-widget="collapse"]
            //Listen for collapse event triggers
            $(_this.selectors.collapse).on('click', function (e) {
                e.preventDefault();
                _this.collapse($(this));
            });

            //Listen for remove event triggers
            $(_this.selectors.remove).on('click', function (e) {
                e.preventDefault();
                _this.remove($(this));
            });
        },
        collapse: function (element) {
            //alert('collapse');
            var _this = this;
            //Find the box parent
//            console.log(element.parents(".box"));
            var box = element.parents(".box").first();
            //Find the body and the footer
            var box_content = box.find("> .box-body, > .box-footer");
            if (!box.hasClass("collapsed-box")) {
                //Convert minus into plus
                element.children(":first")
                        .removeClass(_this.icons.collapse)
                        .addClass(_this.icons.open);
                //Hide the content
                box_content.slideUp(300, function () {
                    box.addClass("collapsed-box");
                });
            } else {
                //Convert plus into minus
                element.children(":first")
                        .removeClass(_this.icons.open)
                        .addClass(_this.icons.collapse);
                //Show the content
                box_content.slideDown(300, function () {
                    box.removeClass("collapsed-box");
                });
            }
        },
        remove: function (element) {
            //Find the box parent
            var box = element.parents(".box").first();
            box.slideUp();
        }
    };


    /**
     * zeynel dağlı
     * @param {type} $
     * @returns {undefined
     */
    $.AdminLTE.boxWidgetZeyn = {
        selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
        icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
        activate: function () {
            var _this = this;
            //[data-widget="collapse"]
            //Listen for collapse event triggers
            $(_this.selectors.collapse).on('click', function (e) {
                e.preventDefault();
                _this.collapse($(this));
            });

            //Listen for remove event triggers
            $(_this.selectors.remove).on('click', function (e) {
                e.preventDefault();
                _this.remove($(this));
            });
        },
        collapse: function (element) {
            alert('collapse');
            var _this = this;
            //Find the box parent
            console.log(element);
            console.log(element.closest('.box'));
            var box = $(".textZeyn");
            /*var box = element.parents(".box").first();
             //Find the body and the footer*/
            //var box_content = $(".textZeyn")[0];
            var box_content = box.find("> .box-body, > .box-footer");
            if (!box.hasClass("collapsed-box")) {
                //Convert minus into plus
                /*element.children(":first")
                 .removeClass(_this.icons.collapse)
                 .addClass(_this.icons.open);*/
                //Hide the content
                box_content.slideUp(300, function () {
                    box.addClass("collapsed-box");
                });
            } else {
                //Convert plus into minus
                element.children(":first")
                        .removeClass(_this.icons.open)
                        .addClass(_this.icons.collapse);
                //Show the content
                box_content.slideDown(300, function () {
                    box.removeClass("collapsed-box");
                });
            }
        },
        remove: function (element) {
            //Find the box parent
            var box = element.parents(".box").first();
            box.slideUp();
        }
    };
}



/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
(function ($) {

    $.fn.boxRefresh = function (options) {

        // Render options
        var settings = $.extend({
            //Refresh button selector
            trigger: ".refresh-btn",
            //File source to be loaded (e.g: ajax/src.php)
            source: "",
            //Callbacks
            onLoadStart: function (box) {
            }, //Right after the button has been clicked
            onLoadDone: function (box) {
            } //When the source has been loaded

        }, options);

        //The overlay
        var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

        return this.each(function () {
            //if a source is specified
            if (settings.source === "") {
                if (console) {
                    console.log("Please specify a source first - boxRefresh()");
                }
                return;
            }
            //the box
            var box = $(this);
            //the button
            var rBtn = box.find(settings.trigger).first();

            //On trigger click
            rBtn.on('click', function (e) {
                e.preventDefault();
                //Add loading overlay
                start(box);

                //Perform ajax call
                box.find(".box-body").load(settings.source, function () {
                    done(box);
                });
            });
        });

        function start(box) {
            //Add overlay and loading img
            box.append(overlay);

            settings.onLoadStart.call(box);
        }

        function done(box) {
            //Remove overlay and loading img
            box.find(overlay).remove();

            settings.onLoadDone.call(box);
        }

    };

})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $("#todo-widget").todolist( options );
 */
(function ($) {

    $.fn.todolist = function (options) {
// Render options
        var settings = $.extend({
//When the user checks the input
            onCheck: function (ele) {
            },
            //When the user unchecks the input
            onUncheck: function (ele) {
            }
        }, options);
        return this.each(function () {

            if (typeof $.fn.iCheck != 'undefined') {
                $('input', this).on('ifChecked', function (event) {
                    var ele = $(this).parents("li").first();
                    ele.toggleClass("done");
                    settings.onCheck.call(ele);
                });
                $('input', this).on('ifUnchecked', function (event) {
                    var ele = $(this).parents("li").first();
                    ele.toggleClass("done");
                    settings.onUncheck.call(ele);
                });
            } else {
                $('input', this).on('change', function (event) {
                    var ele = $(this).parents("li").first();
                    ele.toggleClass("done");
                    settings.onCheck.call(ele);
                });
            }
        });
    };


    /**
     * load imager widget for loading operations
     * @author Mustafa Zeynel Dağlı
     * @since 11/01/2016
     */

    $.widget("sanalfabrika.blockuiWrapper", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            message: '#growlUI-nullName',
            backgroundColor: 'FF0000',
            fadeOut: 700,
            showOverlay: false,
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            //this.element.append(this.options.overlay)
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        show: function () {
            //this.element.find(this.options.overlayKey).remove();
            $.blockUI({
                message: $(this.element),
                fadeIn: 700,
                fadeOut: this.options.fadeOut,
                timeout: 2000,
                showOverlay: this.options.showOverlay,
                centerY: true,
                css: {
                    width: '350px',
                    top: '20%',
                    left: '40%',
                    right: '60%',
                    border: 'none',
                    padding: '5px',
                    backgroundColor: '#' + this.options.backgroundColor,
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    'border-radius': '10px',
                    opacity: .6,
                    color: '#fff'
                }
            });
        }
    });


    $.widget("sanalfabrika.blockuiApprovalWrapper", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            message: '#growlUI-nameChangeApproval',
            backgroundColor: 'ecf0f5',
            showOverlay: false,
            top: '40%',
            left: '40%',
            right: '60%',
            width: '350px',
            border: 'none',
            padding: '5px',
            border_radius: '10px',
            opacity: .6,
            color: '#fff',
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            //this.element.append(this.options.overlay)
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        show: function () {
            //this.element.find(this.options.overlayKey).remove();
            $.blockUI({
                message: $(this.element),
                fadeIn: 700,
                showOverlay: this.options.showOverlay,
                centerX: true,
                css: {
                    width: this.options.width,
                    top: this.options.top,
                    left: this.options.left,
                    right: this.options.right,
                    border: this.options.border,
                    padding: this.options.padding,
                    backgroundColor: '#' + this.options.backgroundColor,
                    '-webkit-border-radius': this.options.border_radius,
                    '-moz-border-radius': this.options.border_radius,
                    'border-radius': this.options.border_radius,
                    opacity: this.options.opacity,
                    color: this.options.color,
                }
            });
        },
        hide: function () {
            $.unblockUI();
        },
        find: function () {
            this.element.find('.btn-danger:first').remove();
        }
    });



    $.widget("sanalfabrika.blockuiCentered", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            message: '#growlUI-nameChangeApproval',
            backgroundColor: 'ecf0f5',
            showOverlay: false,
            /*top : '50px',
             left: '50px',
             right: '50px',*/
            width: '350px',
            border: 'none',
            padding: '5px',
            border_radius: '10px',
            opacity: .6,
            color: '#fff',
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            //this.element.append(this.options.overlay)
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        show: function () {
            //this.element.find(this.options.overlayKey).remove();
            $.blockUI({
                message: $(this.element),
                fadeIn: 700,
                showOverlay: this.options.showOverlay,
                centerX: true,
                css: {
                    width: this.options.width,
                    /*top: this.options.top,
                     left: this.options.left,
                     right: this.options.right,*/
                    border: this.options.border,
                    padding: this.options.padding,
                    backgroundColor: '#' + this.options.backgroundColor,
                    '-webkit-border-radius': this.options.border_radius,
                    '-moz-border-radius': this.options.border_radius,
                    'border-radius': this.options.border_radius,
                    opacity: this.options.opacity,
                    color: this.options.color,
                }
            });
        },
        hide: function () {
            //this.element.find(this.options.overlayKey).remove();
            $(this.element).unblock();
        }

    });


    $.widget("sanalfabrika.blockElement", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            message: '<h1 lang="en">Progressing</h1>',
            backgroundColor: 'ecf0f5',
            showOverlay: false,
            width: '350px',
            border: 'none',
            padding: '5px',
            border_radius: '10px',
            opacity: .6,
            color: '#fff',
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            //this.element.append(this.options.overlay)
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        show: function () {
            //this.element.find(this.options.overlayKey).remove();
            $(this.element).block({
                message: this.options.message,
                showOverlay: this.options.showOverlay,
                css: {
                    width: this.options.width,
                    border: this.options.border,
                    padding: this.options.padding,
                    backgroundColor: '#' + this.options.backgroundColor,
                    '-webkit-border-radius': this.options.border_radius,
                    '-moz-border-radius': this.options.border_radius,
                    'border-radius': this.options.border_radius,
                    opacity: this.options.opacity,
                    color: this.options.color,
                }
            });
        },
        hide: function () {
            $(this.element).unblock();
        }
    });


    $.widget("sanalfabrika.test", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            message: '#growlUI-nameChangeApproval',
            backgroundColor: 'ecf0f5',
            showOverlay: false,
            /*top : '50px',
             left: '50px',
             right: '50px',*/
            width: '350px',
            border: 'none',
            padding: '5px',
            border_radius: '10px',
            opacity: .6,
            color: '#fff',
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            //this.element.append(this.options.overlay)
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        show: function () {

        },
        hide: function (element) {
            //this.element.find(this.options.overlayKey).remove();
            //element.blockuiApprovalWrapper('hide');
        }

    });



}(jQuery));

