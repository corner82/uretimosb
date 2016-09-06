(function(a) {
    function g(a, b) {
        var c = a.data("ddslick");
        var d = a.find(".dd-selected"),
            e = d.siblings(".dd-selected-value"),
            f = a.find(".dd-options"),
            g = d.siblings(".dd-pointer"),
            h = a.find(".dd-option").eq(b),
            k = h.closest("li"),
            l = c.settings,
            m = c.settings.data[b];
        //console.warn(h);
        a.find(".dd-option").removeClass("dd-option-selected");
        h.addClass("dd-option-selected");
        c.selectedIndex = b;
        c.selectedItem = k;
        c.selectedData = m;
        if (l.showSelectedHTML) {
            d.html((m.imageSrc ? '<img class="dd-selected-image' + (l.imagePosition == "right" ? " dd-image-right" : "") + '" src="' + m.imageSrc + '" />' : "") + (m.text ? '<label class="dd-selected-text">' + m.text + "</label>" : "") + (m.description ? '<small class="dd-selected-description dd-desc' + (l.truncateDescription ? " dd-selected-description-truncated" : "") + '" >' + m.description + "</small>" : ""))
        } else d.html(m.text);
        e.val(m.value);
        c.original.val(m.value);
        a.data("ddslick", c);
        i(a);
        j(a);
        if (typeof l.onSelected == "function") {
            l.onSelected.call(this, c)
        }
    }
    
    /**
     * get tag widget id
     * @param {type} a
     * @returns {window.data.settings.multiSelectTagID|a@call;data.settings.multiSelectTagID}
     * @author Mustafa Zeynel Dağlı
     * @since 12/08/2016
     */
    function getTagID(a) {  
        var data = a.data("ddslick");
        return data.settings.multiSelectTagID;
    }
    
    /**
     * get tag widget container id
     * @param {type} a
     * @returns {a@call;data.settings.tagBox|window.data.settings.tagBox}
     * @author Mustafa Zeynel Dağlı
     * @since 12/08/2016
     */
    function getTagBoxID(a) {  
        var data = a.data("ddslick");
        return data.settings.tagBox;
    }
    
    /**
     * get selected items for multiselect dropbox , triggered by function 'selectedValues'
     * @param {type} b
     * @returns {unresolved}
     * @author Mustafa Zeynel Dağlı
     * @since 04/08/2016
     */
    function getSelectedValues (b) {
        //console.log('tag cabin id-->'+b.id);
        if(typeof $('#'+b.id+'').tagCabin() === 'object') {
            var values = $('#'+b.id+'').tagCabin('getAllTagsValues', 'data-attribute');
        }
        
        return values;
    }
    
    /**
     * add already selected item tags for multi select dropdowm function, triggered by 'selectByMultiValues' function
     * @param {type} a
     * @param {type} b
     * @param {type} tags
     * @returns {undefined}
     * @author Mustafa Zeynel Dağlı
     * @since 04/08/2016
     */
    function selectItemsByMultiValues (a, b, tags, selectedItems) {
        /*console.log(tags);
        console.log(b);*/
        //console.log(selectedItems);
        $('#'+b.id+'').tagCabin({
                                    tagCopy         : false,
                                    tagDeletable    : true,
                                    tagDeletableAll : false, 
                                    tagBox          : $('.'+b.tagBox+'').find('ul'),
                                    //dataMapper      : {attributes : Array('role_id', 'resource_id', 'privilege_id')}
                                    
                    });
        $('#'+b.id+'').tagCabin({ 
                            onTagRemoved : function(event, data) {
                                var elementData = data.element;
                                $('#'+b.id+'').tagCabin('removeTag', elementData);
                            }
                         });
        $.each(tags , function(key, value) {
            /*console.log(key);
            console.log(value);*/
            if($.inArray(value.value, selectedItems) >= 0 ) {
                $('#'+b.id+'').tagCabin('addTagManuallyDataAttr', 
                                                            value.value, 
                                                            value.text
                                                            );
            }
        })
        
    }
    
    /**
     * select by value function triggered by 'selectByValue' event described
     * @param {type} a
     * @param {type} b
     * @returns {undefined}
     * @author Zeynel Dağlı
     * @since 01/03/2016
     */
    function selectItemByValue (a, b) {
        //console.warn(a.find(".dd-option >.dd-option-value [value='" + b + "']"));
        //h = a.find(".dd-option >.dd-option-value [value='" + b + "']").parent();
        //console.warn(a.find(".dd-option>.dd-option-value "));
        //console.warn(a.find("input[value^='" + b + "']").closest('a[class^="dd-option"]'));
        //h = a.find(".dd-option .dd-option-value>[value='" + b + "']").parent();
        //var h = a.find("input[value^='" + b + "']").closest('a[class^="dd-option"]');
        //console.warn(h);
        var c = a.data("ddslick");
        //console.warn(c.settings);
        var d = a.find(".dd-selected"),
            e = d.siblings(".dd-selected-value"),
            f = a.find(".dd-options"),
            g = d.siblings(".dd-pointer"),
            //h = a.find(".dd-option").eq(b),
            h = a.find("input[value^='" + b + "']").closest('a[class^="dd-option"]'),
            k = h.closest("li"),
            l = c.settings;
            //m = c.settings.data[b];
            var m;
        $.each(c.settings.data, function(index, obj) {
            if(obj.value== b) {
                m = obj;
            }
        })
    
        a.find(".dd-option").removeClass("dd-option-selected");
        h.addClass("dd-option-selected");
        c.selectedIndex = b;
        c.selectedItem = k;
        c.selectedData = m;
        if (l.showSelectedHTML) {
            d.html((m.imageSrc ? '<img class="dd-selected-image' + (l.imagePosition == "right" ? " dd-image-right" : "") + '" src="' + m.imageSrc + '" />' : "") + (m.text ? '<label class="dd-selected-text">' + m.text + "</label>" : "") + (m.description ? '<small class="dd-selected-description dd-desc' + (l.truncateDescription ? " dd-selected-description-truncated" : "") + '" >' + m.description + "</small>" : ""))
        } else d.html(m.text);
        e.val(m.value);
        c.original.val(m.value);
        a.data("ddslick", c);
        i(a);
        j(a);
        if (typeof l.onSelected == "function") {
            l.onSelected.call(this, c)
        }
    }
    
    function h(b) {
        var c = b.find(".dd-select"),
            d = c.siblings(".dd-options"),
            e = c.find(".dd-pointer"),
            f = d.is(":visible");
        a(".dd-click-off-close").not(d).slideUp(50);
        a(".dd-pointer").removeClass("dd-pointer-up");
        if (f) {
            d.slideUp("fast");
            e.removeClass("dd-pointer-up")
        } else {
            d.slideDown("fast");
            e.addClass("dd-pointer-up")
        }
        k(b)
    }

    function i(a) {
        a.find(".dd-options").slideUp(50);
        a.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up")
    }

    function j(a) {
        var b = a.find(".dd-select").css("height");
        var c = a.find(".dd-selected-description");
        var d = a.find(".dd-selected-image");
        if (c.length <= 0 && d.length > 0) {
            a.find(".dd-selected-text").css("lineHeight", b)
        }
    }

    function k(b) {
        b.find(".dd-option").each(function() {
            var c = a(this);
            var d = c.css("height");
            var e = c.find(".dd-option-description");
            var f = b.find(".dd-option-image");
            if (e.length <= 0 && f.length > 0) {
                c.find(".dd-option-text").css("lineHeight", d)
            }
        })
    }
    a.fn.ddslick = function(c) {
        if (b[c]) {
            return b[c].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof c === "object" || !c) {
            return b.init.apply(this, arguments)
        } else {
            a.error("Method " + c + " does not exists.")
        }
    };
    var b = {},
        c = {
            data: [],
            keepJSONItemsOnTop: true,
            width: 260,
            height: null,
            background: "#eee",
            selectText: "",
            defaultSelectedIndex: null,
            truncateDescription: true,
            imagePosition: "left",
            showSelectedHTML: true,
            clickOffToClose: true,
            search : false,
            searchTextClass : 'search-text',
            searchTemplate : '<div  class="form-group" style="margin-bottom:0px;margin-left:-4px;margin-top:10px;" >\n\
                                <div class="col-sm-10">\n\
                                    <div class="input-group">\n\
                                        <div class="input-group-addon">\n\
                                            <i class="fa  fa-search-plus"></i>\n\
                                        </div>\n\
                                        <input  class="form-control {searchTextClass}"  type="text" value="Ara"  />\n\
                                    </div>\n\
                                </div>\n\
                            </div>',
            onSelected: function() {},
            /**
             * Selected item double click callback function
             * @returns {undefined}
             * @author Mustafa Zeynel Dağlı
             * @since 21/07/2016
             */
            onDoubleClicked: function() {},
            /**
             * Selected item click callback function declared
             * @returns {undefined}
             * @author Mustafa Zeynel Dağlı
             * @since 21/07/2016
             */
            onItemClicked : function() {},
            tagBuilder : null,
            
            tagBox     : null,
            /**
             * multiselect property
             * @author Mustafa Zeynel Dağlı
             * @since 02/08/2016
             */
            multiSelect : false,
            /**
             * multi select tags class name
             * @author Mustafa Zeynel Dağlı
             * @since 02/08/2016
             */
            multiSelectTagID : 'test-cabin',
            /**
             * multi select html template
             * @author Mustafa Zeynel Dağlı
             * @since 02/08/2016
             */
            multiSelectTemplate : '<div  class="form-group" style="margin-bottom:0px;margin-left:-4px;margin-top:10px;" >\n\
                                <div class="col-sm-10">\n\
                                    <div class="input-group">\n\
                                        <div class="input-group-addon">\n\
                                            <i class="fa   fa-check"></i>\n\
                                        </div>\n\
                                        <!--<div style="margin-bottom: -10px;" class="tag-container multi-select"></div>-->\n\
                                        <div style="margin-bottom: -10px;" class="{tagBox}">\n\
                                            <ul id="{multiSelectTagID}" class="tag-box"></ul>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                            </div>',
            
        };
        
        /*d = '<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"> </span></div>',
        e = '<ul class="dd-options"></ul>',
        f = '<style id="css-ddslick" type="text/css">' + ".dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}" + ".dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }" + ".dd-selected{ overflow:hidden; display:block; padding:10px; font-weight:bold;}" + ".dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}" + ".dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }" + ".dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}" + ".dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}" + ".dd-option{ padding:10px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }" + ".dd-options > li:last-child > .dd-option{ border-bottom:none;}" + ".dd-option:hover{ background:#f3f3f3; color:#000;}" + ".dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }" + ".dd-option-selected { background:#f6f6f6; }" + ".dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}" + ".dd-image-right { float:right; margin-right:15px; margin-left:5px;}" + ".dd-container{ position:relative;}​ .dd-selected-text { font-weight:bold}​</style>";*/
    if (a("#css-ddslick").length <= 0) {
        d = '<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"> </span></div>';
        e = '<ul class="dd-options"></ul>';
        f = '<style id="css-ddslick" type="text/css">' + ".dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}" + ".dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }" + ".dd-selected{ overflow:hidden; display:block; padding:10px; font-weight:bold;}" + ".dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}" + ".dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }" + ".dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}" + ".dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}" + ".dd-option{ padding:10px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }" + ".dd-options > li:last-child > .dd-option{ border-bottom:none;}" + ".dd-option:hover{ background:#f3f3f3; color:#000;}" + ".dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }" + ".dd-option-selected { background:#f6f6f6; }" + ".dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}" + ".dd-image-right { float:right; margin-right:15px; margin-left:5px;}" + ".dd-container{ position:relative;}​ .dd-selected-text { font-weight:bold}​</style>";
        //console.error(c);
        a(f).appendTo("head")
    }
    b.init = function(b) {
        var b = a.extend({}, c, b);
        return this.each(function() {
            var c = a(this),
                f = c.data("ddslick");
            if (!f) {
                var i = [],
                    j = b.data;
                c.find("option").each(function() {
                    var b = a(this),
                        c = b.data();
                    i.push({
                        text: a.trim(b.text()),
                        value: b.val(),
                        selected: b.is(":selected"),
                        description: c.description,
                        imageSrc: c.imagesrc
                    })
                });
                if (b.keepJSONItemsOnTop) a.merge(b.data, i);
                else b.data = a.merge(i, b.data);
                var k = c,
                    l = a('<div id="' + c.attr("id") + '"></div>');
                c.replaceWith(l);
                c = l;
                
                var searchTemplate = '';
                //console.error(b);
                /**
                * set search elements due to options
                * @author Zeynel Dağlı
                * @since 18/05/2016
                */
                if(b.search) {
                    searchTemplate = b.searchTemplate;
                    searchTemplate = searchTemplate.replace("{searchTextClass}", b.searchTextClass);
                }
                
                var multiSelectTemplate = '';
                /**
                * set multi select elements due to options
                * @author Zeynel Dağlı
                * @since 02/08/2016
                */
                if(b.multiSelect) {
                    var multiSelectTemplate = b.multiSelectTemplate;
                    multiSelectTemplate = multiSelectTemplate.replace("{multiSelectTagID}", b.multiSelectTagID);
                    multiSelectTemplate = multiSelectTemplate.replace("{tagBox}", b.tagBox);
                    
                }
                
                /**
                 * multiselect and search elements added
                 */
                d = '<div class="dd-select">\n\
                    '+searchTemplate+'\n\
                    '+multiSelectTemplate+'\n\
                    <input class="dd-selected-value" type="hidden" />\n\
                    <a class="dd-selected"></a>\n\
                    <span class="dd-pointer dd-pointer-down"> </span>\n\
                </div>';
                
                c.addClass("dd-container").append(d).append(e);
                var i = c.find(".dd-select"),
                    m = c.find(".dd-options");
                
               
                m.css({
                    width: b.width
                });
                i.css({
                    width: b.width,
                    background: b.background
                });
                c.css({
                    width: b.width
                });
                if (b.height != null) m.css({
                    height: b.height,
                    overflow: "auto"
                });
                a.each(b.data, function(a, c) {
                    if (c.selected) b.defaultSelectedIndex = a;
                    m.append("<li>" + '<a class="dd-option">' + (c.value ? ' <input class="dd-option-value" type="hidden" value="' + c.value + '" />' : "") + (c.imageSrc ? ' <img class="dd-option-image' + (b.imagePosition == "right" ? " dd-image-right" : "") + '" src="' + c.imageSrc + '" />' : "") + (c.text ? ' <label class="dd-option-text">' + c.text + "</label>" : "") + (c.description ? ' <small class="dd-option-description dd-desc">' + c.description + "</small>" : "") + "</a>" + "</li>")
                });
                var n = {
                    settings: b,
                    original: k,
                    selectedIndex: -1,
                    selectedItem: null,
                    selectedData: null
                };
                c.data("ddslick", n);
                if (b.selectText.length > 0 && b.defaultSelectedIndex == null) {
                    c.find(".dd-selected").html(b.selectText)
                } else {
                    var o = b.defaultSelectedIndex != null && b.defaultSelectedIndex >= 0 && b.defaultSelectedIndex < b.data.length ? b.defaultSelectedIndex : 0;
                    g(c, o)
                }
                c.find(".dd-select").on("click.ddslick", function() {
                    h(c);
                    /*if (typeof l.onDoubleClicked == "function") {
                        //l.onDoubleClicked.call(this, c)
                    }*/
                });
                
                /**
                 * selected item double click event handler
                 * @author Zeynel Dağlı
                 * @since 18/05/2016
                 */
                c.find(".dd-select").on("dblclick.ddslick", function() {
                    /*console.warn(b.onDoubleClicked);
                    console.log(c.data.settings);*/
                    l = c.settings;
                    if (typeof b.onDoubleClicked == "function") {
                        b.onDoubleClicked.call(this, c)
                    }
                    
                    //c.find(".dd-selected-text").text('Arama yapmak için tıklayınız...');
                    //c.find(".dd-selected-text").hide();
                    
                    /*c.find(".dd-selected-description").text('Arama yapmak için tıklayınız...');
                    c.find(".dd-selected-value").val('-1');*/
                    
                    //c.find(".dd-pointer").hide();
                    //c.find(".dd-selected-text").append('<input class="search-text" type="text"></input>');

                });
                
                /**
                 * search box keyup event binder
                 * @author Zeynel Dağlı
                 * @since 18/05/2016
                 */
                c.find(".dd-select ."+b.searchTextClass+"").keyup(function() {
                    var items = c.find(".dd-options>li");
                    //console.log($(this).val());
                    var searchText = $(this).val();
                    searchText = $.trim(searchText).toLowerCase();
                    if(searchText == '') {
                        $.each(items, function(index, item) {
                            $(item).show();
                        });
                    } else {
                        c.find(".dd-options>li").show();
                        $.each(items, function(index, item) {
                            var str = $(item).find('a').text();
                            if(str.toLowerCase().indexOf(searchText) == -1) {
                                $(item).hide();
                            }

                        });
                    }
                });
                 
                /**
                 * search text focus event binder
                 * @author Zeynel Dağlı
                 * @since 18/05/2016
                 */
                c.find(".dd-select ."+b.searchTextClass+"").focus(function() {
                    

                });
                
                
                
                /**
                 * selected item focus event handler
                 * @author Zeynel Dağlı
                 * @since 18/05/2016
                 */
                c.find(".dd-select").on("focus.ddslick", function() {
                    //c.find(".dd-options>li").show();
                });
                
                
                /**
                 * list item <li> click event handler
                 */        
                c.find(".dd-option").on("click.ddslick", function() {
                    clickedIndex = a(this).closest("li").index();
                    //console.log($(this).parent().parent().closest('.form-group').find('.multi-search').val());
                    
                    /**
                     * if object is multiselect then tagcabin class activated
                     * @author Mustafa Zeynel Dağlı
                     * @since 02/08/2016
                     */
                    if(b.multiSelect) {
                        var clickedItem = b.data[clickedIndex];
                        
                        var tagBuilder = $('#'+b.multiSelectTagID+'').tagCabin({
                                    tagCopy         : false,
                                    tagDeletable    : true,
                                    tagDeletableAll : false, 
                                    tagBox          : $('.'+b.tagBox+'').find('ul'),
                                    //dataMapper      : {attributes : Array('role_id', 'resource_id', 'privilege_id')}

                    });
                        
                        $('#'+b.multiSelectTagID+'').tagCabin({ 
                            onTagRemoved : function(event, data) {
                                var elementData = data.element;
                                tagBuilder.tagCabin('removeTag', elementData);
                            }
                         });

                        if($('#'+b.multiSelectTagID+'').tagCabin('findSpecificTags', clickedItem.value, 'data-attribute')) {
                            /**
                             * 'please select' tag control
                             * @author Mustafa Zeynel Dağlı
                             * @since 12/08/2016
                             */
                            if(clickedItem.value>0) {
                                $('#'+b.multiSelectTagID+'').tagCabin('addTagManuallyDataAttr', 
                                                            clickedItem.value, 
                                                            clickedItem.text
                                                            );
                            }
                            
                        }
                    }
                    
                    /**
                     * Selected item click callback function
                     * @author Mustafa Zeynel Dağlı
                     * @since 21/07/2016
                     */
                    if (typeof b.onItemClicked == "function") {
                        //alert('click event');
                        b.onItemClicked.call($(this), b.data[clickedIndex])
                    }
                    g(c, a(this).closest("li").index())
                });
                if (b.clickOffToClose) {
                    m.addClass("dd-click-off-close");
                    c.on("click.ddslick", function(a) {
                        a.stopPropagation()
                    });
                    a("body").on("click", function() {
                        a(".dd-click-off-close").slideUp(50).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up")
                    })
                }
            }
        })
    };
    b.select = function(b) {
        return this.each(function() {
            if (b.index) g(a(this), b.index)
        })
    };
    
    /**
     * wrapper for multi selected tag widget id for 'getTagID' function
     * @returns {window.data.settings.multiSelectTagID|a@call;data.settings.multiSelectTagID}
     * @author Mustafa Zeynel Dağlı
     * @since 12/08/2016
     */
    b.getMultiSelectTagID = function() {
           return getTagID(a(this));
    };
    
    /**
     * wrapper for tags parent html element id for (getTagBoxID) function
     * @returns {a@call;data.settings.tagBox|window.data.settings.tagBox}
     * @author Mustafa Zeynel Dağlı
     * @since 12/08/2016     */
    b.getTagBox = function() {
           return getTagBoxID(a(this));
    };
    
    /**
     * wrapper for multiselected tags values for 'getSelectedValues' function
     * @param {type} b
     * @returns {ddslick_L1.b@call;each}
     * @author Mustafa Zeynel Dağlı
     * @since 02/08/2016
     */
    b.selectedValues = function(b) {
        return getSelectedValues(b);
        
    };
    
    /**
     * add tags for multiselect dropbox
     * @param {type} b
     * @param {type} tags
     * @returns {undefined}
     * @author Mustafa Zeynel Dağlı
     * @since 04/08/2016
     */
    b.selectByMultiValues = function(b, tags, selectedItems) {
        selectItemsByMultiValues(this, b, tags, selectedItems);
    };
    
    /**
     * for select by value functionality added code
     * @param {type} b
     * @returns {ddslick_L1.b@call;each}
     * @author Zeynel Dağlı
     * @since 01/03/2016
     */
    b.selectByValue = function(b) {
        return this.each(function() {
            selectItemByValue(a(this), b.index);
        })
    };
    b.open = function() {
        return this.each(function() {
            var b = a(this),
                c = b.data("ddslick");
            if (c) h(b)
        })
    };
    b.close = function() {
        return this.each(function() {
            var b = a(this),
                c = b.data("ddslick");
            if (c) i(b)
        })
    };
    b.destroy = function() {
        return this.each(function() {
            var b = a(this),
                c = b.data("ddslick");
            if (c) {
                var d = c.original;
                b.removeData("ddslick").unbind(".ddslick").replaceWith(d)
            }
        })
    }
})(jQuery)

