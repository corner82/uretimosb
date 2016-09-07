/*
 formBuilder - git@github.com:kevinchappell/formBuilder.git
 Version: 1.6.7
 Author: Kevin Chappell <kevin.b.chappell@gmail.com>
 */
'use strict';

(function ($) {
    'use strict';

    var Toggle = function Toggle(element, options) {

        var defaults = {
            theme: 'fresh',
            labels: {
                off: 'Off',
                on: 'On'
            }
        };

        var opts = $.extend(defaults, options),
                $kcToggle = $('<div class="kc-toggle"/>').insertAfter(element).append(element);

        $kcToggle.toggleClass('on', element.is(':checked'));

        var kctOn = '<div class="kct-on">' + opts.labels.on + '</div>',
                kctOff = '<div class="kct-off">' + opts.labels.off + '</div>',
                kctHandle = '<div class="kct-handle"></div>',
                kctInner = '<div class="kct-inner">' + kctOn + kctHandle + kctOff + '</div>';

        $kcToggle.append(kctInner);

        $kcToggle.click(function () {
            element.attr('checked', !element.attr('checked'));
            $(this).toggleClass('on');
        });
    };

    $.fn.kcToggle = function (options) {
        var toggle = this;
        return toggle.each(function () {
            var element = $(this);
            if (element.data('kcToggle')) {
                return;
            }
            var kcToggle = new Toggle(element, options);
            element.data('kcToggle', kcToggle);
        });
    };
})(jQuery);
'use strict';

(function ($) {
    'use strict';
    var FormBuilder = function FormBuilder(element, options) {

        var defaults = {
            // Uneditable fields or other content you would like to
            // appear before and after regular fields.
            disableFields: {
                // before: '<h2>Header</h2>',
                // after: '<h3>Footer</h3>'
            },
            // array of objects with fields values
            // ex:
            // defaultFields: [{
            //   label: 'First Name',
            //   name: 'first-name',
            //   required: 'true',
            //   description: 'Your first name',
            //   type: 'text'
            // }, {
            //   label: 'Phone',
            //   name: 'phone',
            //   description: 'How can we reach you?',
            //   type: 'text'
            // }],
            defaultFields: [],
            roles: {
                1: 'Administrator'
            },
            showWarning: false,
            serializePrefix: 'frmb',
            messages: {
                /*add: 'Add Item',
                 allowSelect: 'Allow Select',
                 autocomplete: 'Autocomplete',
                 cannotBeEmpty: 'This field cannot be empty',
                 checkboxGroup: 'Checkbox Group',
                 checkbox: 'Checkbox',
                 checkboxes: 'Checkboxes',
                 clearAllMessage: 'Are you sure you want to remove all items?',
                 clearAll: 'Clear All',
                 close: 'Close',
                 copy: 'Copy To Clipboard',
                 dateField: 'Date Field',
                 description: 'Help Text',
                 descriptionField: 'Description',
                 devMode: 'Developer Mode',
                 disableFields: 'These fields cannot be moved.',
                 editNames: 'Edit Names',
                 //editorTitle: 'Form Elements',
                 editorTitle: 'Makina Özelliği Ekle',
                 editXML: 'Edit XML',
                 fieldVars: 'Field Variables',
                 fieldRemoveWarning: 'Are you sure you want to remove this field?',
                 getStarted: 'Drag a field from the right to this area',
                 hide: 'Edit',
                 hidden: 'Hidden Input',
                 label: 'Label',
                 labelEmpty: 'Field Label cannot be empty',
                 limitRole: 'Limit access to one or more of the following roles:',
                 mandatory: 'Mandatory',
                 maxLength: 'Max Length',
                 minOptionMessage: 'This field requires a minimum of 2 options',
                 name: 'Name',
                 no: 'No',
                 off: 'Off',
                 on: 'On',
                 optional: 'optional',
                 optionLabelPlaceholder: 'Label',
                 optionValuePlaceholder: 'Value',
                 optionEmpty: 'Option value required',
                 paragraph: 'Paragraph',
                 preview: 'Preview',
                 radioGroup: 'Radio Group',
                 radio: 'Radio',
                 removeMessage: 'Remove Element',
                 remove: '&#215;',
                 required: 'Required',
                 richText: 'Rich Text Editor',
                 roles: 'Access',
                 save: 'Save Template',
                 selectOptions: 'Select Items',
                 select: 'Select',
                 selectionsMessage: 'Allow Multiple Selections',
                 text: 'Text Field',
                 textArea: 'Text Area',
                 toggle: 'Toggle',
                 warning: 'Warning!',
                 viewXML: 'View XML',
                 yes: 'Yes'*/

                add: window.lang.translate("Add element"),
                allowSelect: window.lang.translate('Allow Select'),
                autocomplete: 'Autocomplete',
                cannotBeEmpty: 'This field cannot be empty',
                checkboxGroup: 'Checkbox Group',
                checkbox: 'Checkbox',
                checkboxes: 'Checkboxes',
                clearAllMessage: 'Are you sure you want to remove all items?',
                clearAll: window.lang.translate('Clear All'),
                close: window.lang.translate("Close"),
                copy: 'Copy To Clipboard',
                dateField: 'Date Field',
                description: window.lang.translate("Unit"),
                descriptionField: window.lang.translate("Define"),
                devMode: window.lang.translate("Developer Mode"),
                disableFields: 'These fields cannot be moved.',
                editNames: window.lang.translate('Edit Names'),
                //editorTitle: 'Form Elements',
                editorTitle: window.lang.translate("Add a machine property"),
                editXML: window.lang.translate("Edit XML"),
                fieldVars: 'Field Variables',
                fieldRemoveWarning: 'Are you sure you want to remove this field?',
                getStarted: window.lang.translate("Drag and dropped a machine property to this section..."),
                hide: window.lang.translate("Edit"),
                hidden: 'Hidden Input',
                label: window.lang.translate("Property"),
                labelEmpty: window.lang.translate("Tagging field can not be empty"),
                limitRole: window.lang.translate("Only for allowed roles"),
                mandatory: window.lang.translate("required"),
                maxLength: window.lang.translate("Max length"),
                minOptionMessage: 'This field requires a minimum of 2 options',
                name: window.lang.translate("Name"),
                no: window.lang.translate("No"),
                off: window.lang.translate("Off"),
                on: window.lang.translate("On"),
                optional: window.lang.translate("Optional"),
                optionLabelPlaceholder: window.lang.translate('Label'),
                optionValuePlaceholder: window.lang.translate('Value'),
                optionEmpty: 'Option value required',
                paragraph: 'Paragraph',
                preview: 'Preview',
                radioGroup: 'Radio Group',
                radio: 'Radio',
                removeMessage: window.lang.translate('Remove Element'),
                remove: '&#215;',
                required: window.lang.translate("Mandatory field"),
                richText: 'Rich Text Editor',
                roles: window.lang.translate("Access"),
                save: window.lang.translate("Save Properties"),
                selectOptions: window.lang.translate("Select Options"),
                select: window.lang.translate("Field"),
                selectionsMessage: 'Allow Multiple Selections',
                text: window.lang.translate("Machine property"),
                textArea: 'Text Area',
                toggle: 'Toggle',
                warning: 'Warning!',
                viewXML: window.lang.translate("View XML"),
                yes: 'Yes'
            }
        };

        var startIndex,
                doCancel = false,
                _helpers = {};

        /**
         * Callback for when a drag begins
         * @param  {object} event
         * @param  {object} ui
         */
        _helpers.startMoving = function (event, ui) {
            event = event;
            ui.item.addClass('moving');
            startIndex = $('li', this).index(ui.item);
        };

        /**
         * Callback for when a drag ends
         * @param  {object} event
         * @param  {object} ui
         */
        _helpers.stopMoving = function (event, ui) {
            event = event;
            ui.item.removeClass('moving');
            if (doCancel) {
                $(ui.sender).sortable('cancel');
                $(this).sortable('cancel');
            } else {
                _helpers.save();
            }
        };

        /**
         * Make strings safe to be used as classes
         * @param  {string} str string to be converted
         * @return {string}     converter string
         */
        _helpers.safename = function (str) {
            return str.replace(/\s/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase();
        };

        /**
         * Strips non-numbers from a number only input
         * @param  {string} str string with possible number
         * @return {string}     string without numbers
         */
        _helpers.forceNumber = function (str) {
            return str.replace(/[^0-9]/g, '');
        };

        /**
         * hide and show mouse tracking tooltips, only used for disabled
         * fields in the editor.
         * @todo   remove or refactor to make better use
         * @param  {object} tt jQuery option with nexted tooltip
         * @return {void}
         */
        _helpers.initTooltip = function (tt) {
            var tooltip = tt.find('.tooltip');
            tt.mouseenter(function () {
                if (tooltip.outerWidth() > 200) {
                    tooltip.addClass('max-width');
                }
                tooltip.css('left', tt.width() + 14);
                tooltip.stop(true, true).fadeIn('fast');
            }).mouseleave(function () {
                tt.find('.tooltip').stop(true, true).fadeOut('fast');
            });
            tooltip.hide();
        };

        // saves the field data to our canvas (elem)
        _helpers.save = function () {
            $sortableFields.children('li').not('.disabled').each(function () {
                _helpers.updatePreview($(this));
            });
            elem.val($sortableFields.toXML());
            elem.trigger('change');
        };

        // updatePreview will generate the preview for radio and checkbox groups
        _helpers.updatePreview = function (field) {
            var fieldClass = field.attr('class'),
                    $prevHolder = $('.prev-holder', field);

            if (fieldClass.indexOf('ui-sortable-handle') !== -1) {
                return;
            }

            fieldClass = fieldClass.replace(' form-field', '');

            var preview,
                    previewData = {
                        type: fieldClass,
//                        label: $('.fld-label', field).val()
                        label: $('.fld-label', field).val()
                    };

            if (fieldClass === 'checkbox') {
                previewData.toggle = $('.checkbox-toggle', field).is(':checked');
            }

            if (fieldClass.match(/(select|checkbox-group|radio-group)/)) {
                previewData.values = [];

                $('.sortable-options li', field).each(function () {
                    var option = {};
                    option.selected = $('.select-option', $(this)).is(':checked');
                    option.value = $('.option-value', $(this)).val();
                    option.label = $('.option-label', $(this)).val();

                    previewData.values.push(option);
                });
            }

            preview = fieldPreview(previewData);

            $prevHolder.html(preview);

            $('input[toggle]', $prevHolder).kcToggle();
        };

        /**
         * form editor, dragged element add option (if element has option) click action binding
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         */
        // update preview to label
        _helpers.updateMultipleSelect = function () {
            //alert('_helpers.updateMultipleSelect fonk');
            $sortableFields.delegate('input[name="multiple"]', 'change', function () {
                var options = $(this).parents('.fields:eq(0)').find('.sortable-options input.select-option');
                if (this.checked) {
                    options.each(function () {
                        $(this).prop('type', 'checkbox');
                    });
                } else {
                    options.each(function () {
                        $(this).removeAttr('checked').prop('type', 'radio');
                    });
                }
            });
        };

        _helpers.htmlEncode = function (value) {
            return $('<div/>').text(value).html();
        };

        _helpers.htmlDecode = function (value) {
            return $('<div/>').html(value).text();
        };

        _helpers.validateForm = function () {
            var errors = [];
            // check for empty field labels
            $('input[name="label"], input[type="text"].option', $sortableFields).each(function () {
                if ($(this).val() === '') {
                    var field = $(this).parents('li.form-field'),
                            fieldAttr = $(this);
                    errors.push({
                        field: field,
                        error: opts.messages.labelEmpty,
                        attribute: fieldAttr
                    });
                }
            });

            // @todo add error = { noVal: opts.messages.labelEmpty }
            if (errors.length) {
                alert('Error: ' + errors[0].error);
                $('html, body').animate({
                    scrollTop: errors[0].field.offset().top
                }, 1000, function () {
                    var targetID = $('.toggle-form', errors[0].field).attr('id');
                    $('.toggle-form', errors[0].field).addClass('open').parent().next('.prev-holder').slideUp(250);
                    $('#' + targetID + '-fld').slideDown(250, function () {
                        errors[0].attribute.addClass('error');
                    });
                });
            }
        };

        _helpers.disabledTT = function (field) {
            var title = field.attr('data-tooltip');
            if (title) {
                field.removeAttr('title').data('tip_text', title);
                var tt = $('<p/>', {
                    'class': 'frmb-tt'
                }).html(title);
                field.append(tt);
                tt.css({
                    top: -tt.outerHeight(),
                    left: -15
                });
                field.mouseleave(function () {
                    $(this).attr('data-tooltip', field.data('tip_text'));
                    $('.frmb-tt').remove();
                });
            }
        };

        /**
         * machine property dilog opener method
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         */
        _helpers.machinePropertyOpener = function (event, invoker) {
            var invoker = invoker;
            var lastID = $(invoker).attr('data-last-id')
            console.log($(invoker).attr('data-last-id'));
            BootstrapDialog.show({
                data: {
                    'last-id': lastID},
                title: window.lang.translate("Define a machine property"),
                message: function (dialogRef) {
                    var $message = $('<div class="box box-success">\n\
                                        <div class="box-header">\n\
                                            <i class="fa fa-cart-arrow-down"></i>\n\
                                            <h3 class="box-title">'
                            + window.lang.translate("Select a machine property")
                            + '</h3>\n\
                                        </div>\n\
                                        <div class="box-body chat" id="chat-box">\n\
                                                <div class="box-body">\n\
                                                    <div class="form-group">\n\
                                                        <label>Özellikler</label>\n\
                                                        <span class="input-group-addon">\n\
                                                            <i class="fa fa-code-fork"></i>\n\
                                                        </span>\n\
                                                        <ul id="tt_tree_machine_prop" class="easyui-tree" ></ul> \n\
                                                    </div>\n\
                                                </div>\n\
                                        </div>\n\
                                 </div>');
                    return $message;
                },
                onshown: function (dialogRef) {
                    /**
                     * machine property easyui tree
                     * @author Mustafa Zeynel Dağlı
                     * @since 26/02/2016
                     */
                    $('#tt_tree_machine_prop').tree({
                        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillMachineToolFullProperties_sysMachineToolProperties&pk=' + $('#pk').val() + '',
                        queryParams: {url: 'pkFillMachineToolFullProperties_sysMachineToolProperties',
                            pk: $('#pk').val(),
                        },
                        method: 'get',
                        animate: true,
                        checkbox: false,
                        cascadeCheck: false,
                        onLoadSuccess: function (node, data) {

                        },
                        formatter: function (node) {
                            var s = node.text;
                            s += '&nbsp;<a href="#"><i class="fa fa-fw fa-trash-o"></i></a>&nbsp;<a href="#" ><i class="fa fa-fw fa-check-square-o"></i></a><a href="#" ><i class="fa fa-fw fa-ban"></i></a>';
                            //buda loşullu kullanım için örnek satır    
                            if (node.children) {
                                s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
                            }
                            return s;
                        },
                        onCheck: function (node, checked) {

                        },
                        onDblClick: function (node) {
                            //console.log($(this).tree('getChildren',node.target));
                            $(this).tree('expand', node.target);

                        },
                        onExpand: function (node) {

                        },
                        onSelect: function (node, data) {
                            //console.log($(this).tree('getRoot',node.target));
                            //console.log($(this).tree('getData',node.target));
                        }
                    });
                    //alert('tree test');
                },
                description: window.lang.translate("Define a machine property"),
                type: BootstrapDialog.TYPE_SUCCESS, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                closable: true, // <-- Default value is false
                draggable: true, // <-- Default value is false
                size: BootstrapDialog.SIZE_WIDE,
                buttons: [{
                        icon: 'glyphicon glyphicon-ok',
                        label: window.lang.translate("OK"),
                        cssClass: 'btn-success',
                        action: function (dialogItself) {
                            var id = dialogItself.getData('last-id');
                            var data = $('#tt_tree_machine_prop').tree('getSelected');
                            if (typeof data === 'undefined' || data === null) {
                                BootstrapDialog.show({
                                    message: window.lang.translate("Please select a property"),
                                    title: window.lang.translate("Select a machine property"),
                                });
                            } else {
                                $('#label' + id).val(data.text);
                                if ($('#save-' + id).hasClass('fa-clipboard')) {
                                    $('#save-' + id).removeClass('fa-clipboard').addClass('fa-save');
                                }
                                dialogItself.close();
                            }
                        }
                    }]
            });
        };

        /**
         * machine property units easyui tree
         * @author Mustafa Zeynel Dağlı
         * @since 29/02/2016
         */
        _helpers.machinePropertyUnitOpener = function (event, invoker) {
            var invoker = invoker;
            var lastID = $(invoker).attr('data-last-id')
            console.log($(invoker).attr('data-last-id'));
            BootstrapDialog.show({
                data: {
                    'last-id': lastID},
                title: window.lang.translate("Select property unit"),
                message: function (dialogRef) {
                    var $message = $('<div class="box box-success">\n\
                                        <div class="box-header">\n\
                                            <i class="fa fa-cart-arrow-down"></i>\n\
                                            <h3 class="box-title">'
                            + window.lang.translate("Select machine property")
                            + '</h3>\n\
                                        </div>\n\
                                        <div class="box-body chat" id="chat-box">\n\
                                                <div class="box-body">\n\
                                                    <div class="form-group">\n\
                                                        <label>'
                            + window.lang.translate("Properties")
                            + '</label>\n\
                                                        <span class="input-group-addon">\n\
                                                            <i class="fa fa-code-fork"></i>\n\
                                                        </span>\n\
                                                        <ul id="tt_tree_machine_unit_prop" class="easyui-tree" ></ul> \n\
                                                    </div>\n\
                                                </div>\n\
                                        </div>\n\
                                 </div>');
                    return $message;
                },
                onshown: function (dialogRef) {
                    /**
                     * machine property easyui tree
                     * @author Mustafa Zeynel Dağlı
                     * @since 29/02/2016
                     */
                    $('#tt_tree_machine_unit_prop').tree({
                        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php?url=pkFillUnitsTree_sysUnits&pk=' + $('#pk').val() + '',
                        queryParams: {url: 'pkFillMachineToolFullProperties_sysMachineToolProperties',
                            pk: $('#pk').val(),
                        },
                        method: 'get',
                        animate: true,
                        checkbox: false,
                        cascadeCheck: false,
                        onlyLeafCheck: true,
                        onLoadSuccess: function (node, data) {

                        },
                        formatter: function (node) {
                            var s = node.text;
                            s += '&nbsp;<a href="#"><i class="fa fa-fw fa-trash-o"></i></a>&nbsp;<a href="#" ><i class="fa fa-fw fa-check-square-o"></i></a><a href="#" ><i class="fa fa-fw fa-ban"></i></a>';
                            //buda loşullu kullanım için örnek satır    
                            if (node.children) {
                                s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
                            }
                            return s;
                        },
                        onCheck: function (node, checked) {
                            //alert('test check');
                            console.log($(this).tree("getChecked"));
                            self = $(this);
                            $.each($(this).tree("getChecked"), function (key, value) {
                                if (node.text == value.text) {
                                    //alert('eşleşme bulundu');
                                    console.log(value.text);
                                    //self.tree("check", value.target);
                                } else {
                                    self.tree("uncheck", value.target);
                                }
                            });
                        },
                        onDblClick: function (node) {
                            //console.log($(this).tree('getChildren',node.target));
                            $(this).tree('expand', node.target);

                        },
                        onExpand: function (node) {

                        },
                        onSelect: function (node, data) {
                            //console.log($(this).tree('getRoot',node.target));
                            var data = $(this).tree('getData', node.target);
                            console.log(data);
                            console.log(data.text);
                        }
                    });
                    //alert('tree test');
                },
                description: window.lang.translate("Select property unit"),
                type: BootstrapDialog.TYPE_SUCCESS, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                closable: true, // <-- Default value is false
                draggable: true, // <-- Default value is false
                size: BootstrapDialog.SIZE_WIDE,
                buttons: [{
                        icon: 'glyphicon glyphicon-ok',
                        label: window.lang.translate("Ok"),
                        cssClass: 'btn-success',
                        action: function (dialogItself) {
                            var id = dialogItself.getData('last-id');
                            var data = $('#tt_tree_machine_unit_prop').tree('getSelected');
                            if (typeof data === 'undefined' || data === null) {
                                BootstrapDialog.show({
                                    message: window.lang.translate("Select a unit"),
                                    title: window.lang.translate("Select a unit"),
                                });
                            } else {
                                $('#description-' + id).val(data.text);
                                if ($('#save-' + id).hasClass('fa-clipboard')) {
                                    $('#save-' + id).removeClass('fa-clipboard').addClass('fa-save');
                                }

                                dialogItself.close();
                            }


                        }
                    }]
            });
        };

        var opts = $.extend(true, defaults, options),
                elem = $(element),
                frmbID = 'frmb-' + $('ul[id^=frmb-]').length++;

        var field = '',
                lastID = 1,
                boxID = frmbID + '-control-box';

        /**
         * form element place holders are placed here(right elements column items)
         * @type Array
         * @author Mustafa Zeynel Dağlı
         */
        // create array of field objects to cycle through
        var frmbFields = [{
//                label: opts.messages.text,
                label: window.lang.translate('Machine property'),
                attrs: {
                    type: 'text',
                    className: 'text-input',
                    name: 'text-input'
                }
            }, {
//                label: opts.messages.select,
                label: window.lang.translate('Field'),
                attrs: {
                    type: 'select',
                    className: 'select',
                    name: 'select'
                }
            }, /* {
             label: opts.messages.textArea,
             attrs: {
             type: 'rich-text',
             className: 'rich-text',
             name: 'rich-text'
             }
             }, {
             label: opts.messages.radioGroup,
             attrs: {
             type: 'radio-group',
             className: 'radio-group',
             name: 'radio-group'
             }
             }, {
             label: opts.messages.hidden,
             attrs: {
             type: 'hidden',
             className: 'hidden-input',
             name: 'hidden-input'
             }
             }, {
             label: opts.messages.dateField,
             attrs: {
             type: 'date',
             className: 'calendar',
             name: 'date-input'
             }
             }, {
             label: opts.messages.checkboxGroup,
             attrs: {
             type: 'checkbox-group',
             className: 'checkbox-group',
             name: 'checkbox-group'
             }
             }, {
             label: opts.messages.checkbox,
             attrs: {
             type: 'checkbox',
             className: 'checkbox',
             name: 'checkbox'
             }
             }, {
             label: opts.messages.autocomplete,
             attrs: {
             type: 'autocomplete',
             className: 'autocomplete',
             name: 'autocomplete'
             }
             }*/];

        // Create draggable fields for formBuilder
        var cbUL = $('<ul/>', {
            id: boxID,
            'class': 'frmb-control'
        });

        /**
         * right column form elements are rendered due to attributes
         * @type Number|@exp;frmbFields@pro;length
         * @author Mustafa Zeynel Dağlı
         */
        // Loop through
        for (var i = frmbFields.length - 1; i >= 0; i--) {
            var $field = $('<li/>', {
                'class': 'icon-' + frmbFields[i].attrs.className,
                'type': frmbFields[i].type,
                'name': frmbFields[i].className,
                'label': frmbFields[i].label
            });
            for (var attr in frmbFields[i]) {
                if (frmbFields[i].hasOwnProperty(attr)) {
                    $field.data(attr, frmbFields[i][attr]);
                }
            }
            $field.html(frmbFields[i].label).appendTo(cbUL);
        }

        /**
         * right column header is being prepared
         * @type @call;form-builder_L53.$@call;html
         * @author Mustafa Zeynel Dağlı
         */
        // Build our headers and action links
        var cbHeader = $('<h4/>').html(opts.messages.editorTitle),
                viewXML = $('<a/>', {
                    id: frmbID + '-export-xml',
//                    text: opts.messages.viewXML,
                    text: window.lang.translate("View XML"),
                    href: '#',
                    'class': 'view-xml'
                }),
                allowSelect = $('<a/>', {
                    id: frmbID + '-allow-select',
//                    text: opts.messages.allowSelect,
                    text: window.lang.translate("Allow Select"),                    
                    href: '#',
                    'class': 'allow-select'
                }).prop('checked', 'checked'),
                editXML = $('<a/>', {
                    id: frmbID + '-edit-xml',
//                    text: opts.messages.editXML,
                    text: window.lang.translate("Edit XML"),
                    href: '#',
                    'class': 'edit-xml'
                }),
                editNames = $('<a/>', {
                    id: frmbID + '-edit-names',
//                    text: opts.messages.editNames,
                    text: window.lang.translate("Edit Names"),
                    href: '#',
                    'class': 'edit-names'
                }),
                clearAll = $('<a/>', {
                    id: frmbID + '-clear-all',
//                    text: opts.messages.clearAll,
                    text: window.lang.translate("Clear All"),
                    href: '#',
                    'class': 'clear-all'
                }),
                saveAll = $('<div/>', {
                    id: frmbID + '-save',
                    href: '#',
                    'class': 'save-btn-wrap',
//                    title: opts.messages.save
                    title: window.lang.translate('Save Properties')
                }).html('<a class="save fb-button primary"><span>' + window.lang.translate('Save Properties') + '</span></a>'),
//                }).html('<a class="save fb-button primary"><span>' + opts.messages.save + '</span></a>'),
                actionLinksInner = $('<div/>', {
                    id: frmbID + '-action-links-inner',
                    'class': 'action-links-inner'
                }).append(editXML, ' | ', editNames, ' | ', allowSelect, ' | ', clearAll, ' |&nbsp;'),
                devMode = $('<span/>', {
                    'class': 'dev-mode-link'
//                }).html(opts.messages.devMode + ' ' + opts.messages.off),
                }).html(window.lang.translate("Developer Mode") + ' ' + window.lang.translate("Off")),
                actionLinks = $('<div/>', {
                    id: frmbID + '-action-links',
                    'class': 'action-links'
                }).append(actionLinksInner, devMode);

        // Sortable fields
        var $sortableFields = $('<ul/>').attr('id', frmbID).addClass('frmb').sortable({
            cursor: 'move',
            opacity: 0.9,
            beforeStop: function beforeStop(event, ui) {
                var lastIndex = $('> li', $sortableFields).length - 1,
                        curIndex = ui.placeholder.index();
                if (opts.disableFields.before) {
                    doCancel = curIndex <= 1;
                } else if (opts.disableFields.after) {
                    doCancel = curIndex === lastIndex;
                } else {
                    doCancel = false;
                }
            },
            start: _helpers.startMoving,
            stop: _helpers.stopMoving,
            cancel: 'input, .disabled, .sortable-options, .add, .btn, .no-drag',
            // items: 'li:not(.no-fields)',
            receive: function receive(event, ui) {
                // if (doCancel) {
                //   $('li:nth-child(' + curIndex + ')', $(this)).remove();
                // }
            },
            placeholder: 'frmb-placeholder'
        });

        // ControlBox with different fields
        cbUL.sortable({
            helper: 'clone',
            opacity: 0.9,
            connectWith: $sortableFields,
            cursor: 'move',
            placeholder: 'ui-state-highlight',
            start: _helpers.startMoving,
            stop: _helpers.stopMoving,
            revert: 150,
            change: function change(event, ui) {
                //fix the logic on this to only hide placeholder for disabledFields.before and after
                // if (ui.placeholder.index() === 0 || ui.placeholder.index() === $('> li', $sortableFields).last().index()) {
                //   $(ui.placeholder).hide();
                // } else {
                //   $(ui.placeholder).show();
                // }
            },
            remove: function remove(event, ui) {
                if (startIndex === 0) {
                    cbUL.prepend(ui.item);
                } else {
                    $('li:nth-child(' + startIndex + ')', cbUL).after(ui.item);
                }
            },
            beforeStop: function beforeStop(event, ui) {
                if (ui.placeholder.parent().hasClass('frmb-control')) {
                    doCancel = true;
                }
            },
            update: function update(event, ui) {
                // _helpers.stopMoving;
                elem.stopIndex = $('li', $sortableFields).index(ui.item) === 0 ? '0' : $('li', $sortableFields).index(ui.item);
                if ($('li', $sortableFields).index(ui.item) < 0) {
                    $(this).sortable('cancel');
                } else {
                    prepFieldVars($(ui.item[0]), true);
                }
            },
            receive: function receive(event, ui) {
                if (ui.sender.hasClass('frmb') || ui.sender.hasClass('frmb-control')) {
                    $(ui.sender).sortable('cancel');
                }
            }
        });

        /**
         * stage-wrap class form div element prepared for drag-drop canvas
         * @type @call;$
         * @author Mustafa Zeynel Dağlı
         */
        var $stageWrap = $('<div/>', {
            id: frmbID + '-stage-wrap',
            // changed for mobile compliant
            //'class': 'stage-wrap'
            'class': 'col-lg-6 col-xs-12'
        });

        /**
         * form-wrap class form div element prepared for drag-drop canvas
         * @type @call;$
         * @author Mustafa Zeynel Dağlı
         */
        var $formWrap = $('<div/>', {
            id: frmbID + '-form-wrap',
            // changed for mobile compliant
            //'class': 'form-wrap'
            'class': 'form-wrap row'
        });

        elem.before($stageWrap).appendTo($stageWrap);

        // Replace the textarea with sortable list.
        //elem.before($sortableFields).parent().prepend(frmbHeader).addClass('frmb-wrap').append(actionLinks, viewXML, saveAll);

        var cbWrap = $('<div/>', {
            id: frmbID + '-cb-wrap',
            // changed for mobile compliant
            //'class': 'cb-wrap'
            'class': 'col-lg-6 col-xs-12'
        }).append(cbHeader, cbUL);

        /**
         * drag drop area added here
         * @author Mustafa Zeynel Dağlı
         */
        $stageWrap.append($sortableFields, cbWrap, actionLinks, viewXML, saveAll);
        $stageWrap.before($formWrap);
        $formWrap.append($stageWrap, cbWrap);

        var doSave = function doSave() {
            if ($(this).parents('li.disabled').length === 0) {
                if ($(this).name === 'label' && $(this).val() === '') {
                    return alert('Error: ' + opts.messages.labelEmpty);
                }
                _helpers.save();
            }
        };

        // Not pretty but we need to save a lot so users don't have to keep clicking a save button
        $('input, select', $sortableFields).on('change', doSave);
        $('input, select', $sortableFields).on('blur', doSave);

        // Parse saved XML template data
        elem.getTemplate = function () {
            /**
             * in the first opening page , some how 'elem.val()' filled with 
             * space characters, so even though xml is not fiiled , function was trying
             * to read xml data , so we trimmed data to check
             * @author Mustafa Zeynel Dağlı
             * @since 08/03/2016
             */
            var xml = $.trim(elem.val()) !== '' ? $.parseXML(elem.val()) : false,
                    fields = $(xml).find('field');

            if (fields.length > 0) {
                fields.each(function () {
                    prepFieldVars($(this));
                });
            } else if (!xml) {
                // Load default fields if none are set
                if (opts.defaultFields.length) {
                    opts.defaultFields.reverse();
                    for (var i = opts.defaultFields.length - 1; i >= 0; i--) {
                        appendNewField(opts.defaultFields[i]);
                    }
                } else {
                    $stageWrap.addClass('empty').attr('data-content', opts.messages.getStarted);
                }
                disabledBeforeAfter();
            }
        };

        var disabledBeforeAfter = function disabledBeforeAfter() {
            var li = '<li class="disabled __POSITION__">__CONTENT__</li>';
            if (opts.disableFields.before && !$('.disabled.before', $sortableFields).length) {
                $sortableFields.prepend(li.replace('__POSITION__', 'before').replace('__CONTENT__', opts.disableFields.before));
            }
            if (opts.disableFields.after && !$('.disabled.after', $sortableFields).length) {
                $sortableFields.append(li.replace('__POSITION__', 'after').replace('__CONTENT__', opts.disableFields.after));
            }
        };

        /**
         * drag dropped form elements name (id) attribute
         * form up here
         * @param {type} field
         * @returns {String}
         * @author Mustafa Zeynel Dağlı
         */
        var nameAttr = function nameAttr(field) {
            var epoch = new Date().getTime();
            return field.data('attrs').name + '-' + epoch;
        };

        var prepFieldVars = function prepFieldVars($field, isNew) {
            isNew = isNew || false;

            var fieldAttrs = $field.data('attrs') || {},
                    fType = fieldAttrs.type || $field.attr('type'),
                    isMultiple = fType.match(/(select|checkbox-group|radio-group)/),
                    values = {};

            values.label = _helpers.htmlEncode($field.attr('label'));
            values.name = isNew ? nameAttr($field) : fieldAttrs.name || $field.attr('name');
            values.role = $field.attr('role');
            values.required = $field.attr('required');
            values.maxLength = $field.attr('max-length');
            values.toggle = $field.attr('toggle');
            values.type = fType;
            values.description = $field.attr('description') !== undefined ? _helpers.htmlEncode($field.attr('description')) : '';

            if (isMultiple) {
                values.multiple = true;
                values.values = [];
                $field.children().each(function (i) {
                    var value = {
                        label: $(this).text(),
                        value: $(this).attr('value'),
                        selected: $field.attr('default') === i ? true : false
                    };
                    values.values.push(value);
                });
            }

            appendNewField(values);
            $stageWrap.removeClass('empty');
            disabledBeforeAfter();
        };

        /**
         * text area fields are being dropped to left editor here
         * @param {type} values
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         */
        // multi-line textarea
        var appendTextarea = function appendTextarea(values) {
            appendFieldLi(opts.messages.textArea, advFields(values), values);
        };

        /**
         * text fields are being dropped to left editor area here
         * @param {type} values
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         */
        var appendInput = function appendInput(values) {
            var type = values.type || 'text';
            appendFieldLi(opts.messages[type], advFields(values), values);
        };

        /**
         * select fields are being dropped to left area here
         * @param {type} values
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         */
        // add select dropdown
        var appendSelectList = function appendSelectList(values) {

            if (!values.values || !values.values.length) {
                values.values = [{
                        selected: 'false',
                        /*label: 'Option 1',
                         value: 'option-1'*/
                        label: window.lang.translate("option 1"),
                        value: window.lang.translate("option 2")
                    }, {
                        selected: 'false',
                        /*label: 'Option 2',
                         value: 'option-2'*/
                        label: window.lang.translate("option 1"),
                        value: window.lang.translate("option 2")
                    }];
            }

            var field = '',
                    name = _helpers.safename(values.name),
                    multiDisplay = values.type === 'checkbox-group' ? 'none' : 'none';

            field += advFields(values);
//            field += '<div class="false-label">' + opts.messages.selectOptions + '</div>';
            field += '<div class="false-label">' + window.lang.translate("Select Options") + '</div>';
            field += '<div class="fields">';

            field += '<div class="allow-multi" style="display:' + multiDisplay + '">';
            field += '<input type="checkbox" id="multiple_' + lastID + '" name="multiple"' + (values.multiple ? 'checked="checked"' : '') + '>';
            field += '<label class="multiple" for="multiple_' + lastID + '">' + opts.messages.selectionsMessage + '</label>';
            field += '</div>';
            field += '<ol class="sortable-options">';
            for (i = 0; i < values.values.length; i++) {
                field += selectFieldOptions(values.values[i], name, values.values[i].selected, values.multiple);
            }
            field += '</ol>';
            
            field += '<div class="field_actions"><a href="#" class="add add_opt"><strong>' + window.lang.translate("Add element") + '</strong></a> | <a href="#" class="close_field">' + window.lang.translate("Close") + '</a></div>';            
//            field += '<div class="field_actions"><a href="#" class="add add_opt"><strong>' + opts.messages.add + '</strong></a> | <a href="#" class="close_field">' + opts.messages.close + '</a></div>';
            field += '</div>';
            appendFieldLi(window.lang.translate("Field"), field, values);

            $('.sortable-options').sortable(); // making the dynamically added option fields sortable.
        };

        var appendNewField = function appendNewField(values) {

            if (values === undefined) {
                values = '';
            }

            // TODO: refactor to move functions into this object
            var appendFieldType = {
                // 'text': appendTextInput(values),
                // 'checkbox': appendCheckbox(values),
                // 'select': appendSelectList(values),
                // 'textarea': appendTextarea(values),
                '2': appendInput,
                'date': appendInput,
                'autocomplete': appendInput,
                'checkbox': appendInput,
                'select': appendSelectList,
                'rich-text': appendTextarea,
                'textarea': appendTextarea,
                'radio-group': appendSelectList,
                'checkbox-group': appendSelectList,
                'text': appendInput,
                'hidden': appendInput
            };

            if (typeof appendFieldType[values.type] === 'function') {
                appendFieldType[values.type](values);
            }
        };

        /**
         * build form editor form elements editable area for properties
         * Build the editable properties for the field
         * @param  {object} values configuration object for advanced fields
         * @return {string}        markup for advanced fields
         * @author Mustafa Zeynel Dağlı
         */
        var advFields = function advFields(values) {

            var advFields = '',
                    key,
                    roles = values.role !== undefined ? values.role.split(',') : [];
            /**
             * label field is prepared
             * @type @call;$
             * @author Mustafa Zeynel Dağlı
             */
            var fieldLabel = $('<div>', {
                'class': 'frm-fld label-wrap'
            });
//            $('<label/>').html(opts.messages.label + ' *').appendTo(fieldLabel);
            $('<label/>').html(window.lang.translate("Property") + ' *').appendTo(fieldLabel);
            $('<input>', {
                id: 'label' + lastID,
                type: 'text',
                name: 'label',
                value: values.label,
                'class': 'fld-label'
            }).appendTo(fieldLabel);
            advFields += fieldLabel[0].outerHTML;

            var fieldDesc = $('<div>', {
                'class': 'frm-fld description-wrap'
            });
//            $('<label/>').html(opts.messages.description + ' *').appendTo(fieldDesc);
            $('<label/>').html(window.lang.translate("Unit") + ' *').appendTo(fieldDesc);

            /**
             * dialog opener to get machine property
             * @author Mustafa Zeynel Dağlı
             */
            //advFields += '<form>';
            advFields += '<div><label>' + window.lang.translate("select") + '<span class="required">*</span></label>';
            advFields += '<button data-last-id="' + lastID + '" id="zeyn' + 
                    lastID + '"  class="pull-left btn btn-default machine-property-opener" >' + 
                    window.lang.translate("Find a property") + 
                    '<i class="fa fa-arrow-circle-right"></i></button>';
            advFields += '</div>';
            //advFields += '</form>';

//            advFields += '<div class="frm-fld description-wrap"><label>' + opts.messages.description + '</label>';
            advFields += '<div class="frm-fld description-wrap"><label>' + window.lang.translate("Unit") + '</label>';            
            advFields += '<input type="text" name="description" value="' + values.description + '" class="fld-description" id="description-' + lastID + '" /></div>';

            /**
             * dialog opener to get machine property units
             * @author Mustafa Zeynel Dağlı
             * @since 29/02/2016
             */
            advFields += '<div><label>' + window.lang.translate("unit") + '<span class="required">*</span></label>';
            advFields += '<button data-last-id="' + lastID + '" id="unit-dialog-opener-'
                    + lastID + '"  class="pull-left btn btn-default machine-property-unit-opener" >'
                    + window.lang.translate("Find a unit")
                    + '<i class="fa fa-arrow-circle-right"></i></button>';
            advFields += '</div>';

            /**
             * tex id name area prepared
             */
            /*advFields += '<div class="frm-fld name-wrap"><label>' + opts.messages.name + ' <span class="required">*</span></label>';
             advFields += '<input type="text" name="name" value="' + values.name + '" class="fld-name" id="title-' + lastID + '" /></div>';*/

            /**
             * roles checkbox prepared
             * @author Mustafa Zeynel Dağlı
             */
            /*advFields += '<div class="frm-fld access-wrap"><label>' + opts.messages.roles + '</label>';
             
             //advFields += '<input type="checkbox" name="enable_roles" value="" ' + (values.role !== undefined ? 'checked' : '') + ' id="enable_roles-' + lastID + '"/> <label for="enable_roles-' + lastID + '" class="roles_label">' + opts.messages.limitRole + '</label>';
             //advFields += '<div class="frm-fld available-roles" ' + (values.role !== undefined ? 'style="display:block"' : '') + '>';
             
             for (key in opts.roles) {
             if ($.inArray(key, ['date', '4']) === -1) {
             advFields += '<input type="checkbox" name="roles[]" value="' + key + '" id="fld-' + lastID + '-roles-' + key + '" ' + ($.inArray(key, roles) !== -1 ? 'checked' : '') + ' class="roles-field" /><label for="fld-' + lastID + '-roles-' + key + '">' + opts.roles[key] + '</label><br/>';
             }
             }
             //advFields += '</div></div>';*/

            /**
             * 'max length' text area is being prepared here
             * @author Mustafa Zeynel Dağlı
             */
            // if field type is not checkbox, checkbox/radio group or select list, add max length
            if ($.inArray(values.type, ['checkbox', 'select', 'checkbox-group', 'date', 'autocomplete', 'radio-group', 'hidden']) < 0) {
                /*advFields += '<div class="frm-fld"><label class="max-length-label">' + opts.messages.maxLength + '</label>';
                 advFields += '<input type="text" name="max-length" max-length="4" value="' + (values.maxLength !== undefined ? values.maxLength : '') + '" class="fld-max-length" id="max-length-' + lastID + '" /></div>';*/
                //advFields += '<div ><label >' + opts.messages.maxLength + ' test</label>';
                //advFields += '<select id="test" onchange="alert(\'test\');"><option value="volvo">Volvo hhhhhhhhhh</option><option value="saab">Saab</option></select></div>';
                /*advFields += '<div ><label >' + opts.messages.maxLength + ' test</label>';
                 advFields += '<ul onclick="alert(\'on focus\');"><li >test</li><li>test2</li></ul></div>';*/
            }

            return advFields;
        };

        /**
         * form element added to form editor for text , textarea vs
         * @param {type} title
         * @param {type} field
         * @param {type} values
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         */
        // Append the new field to the editor
        var appendFieldLi = function appendFieldLi(title, field, values) {
            var label = $(field).find('input[name="label"]').val() !== '' ? $(field).find('input[name="label"]').val() : title;

            var li = '',
//                    delBtn = '<a id="del_' + lastID + '" class="del-button btn delete-confirm" href="#" title="' + opts.messages.removeMessage + '">' + opts.messages.remove + '</a>',
                    delBtn = '<a id="del_' + lastID + '" class="del-button btn delete-confirm" href="#" title="' + window.lang.translate('Remove Element') + '">' + opts.messages.remove + '</a>',
                    //toggleBtn = '<a id="frm-' + lastID + '" class="toggle-form btn icon-pencil" href="#" title="' + opts.messages.hide + '"></a> ',
                    /**
                     * toogle buton icon change
                     * @author Mustafa Zeynel Dağlı
                     */
                    toggleBtn = '<a id="frm-' + lastID + '" style="margin-left:23px;" class="toggle-form" href="#" title="' + opts.messages.hide + '"><i class="fa fa-fw fa-folder"></i></a> ',
                    /**
                     * save toogle button for xml update when changes are made
                     * @type String|String
                     * @author Mustafa Zeynel Dağlı
                     */
                    toggleBtnSave = '<a   style="margin-left:5px;" class="toggle-form-save" href="#" title="' + opts.messages.hide + '"><i id="save-' + lastID + '" class="fa fa-fw fa-clipboard"></i></a> ',
                    required = values.required,
                    toggle = values.toggle || undefined,
                    tooltip = values.description !== '' ? '<span class="tooltip-element" tooltip="' + values.description + '">?</span>' : '';

            li += '<li id="frm-' + lastID + '-item" class="' + values.type + ' form-field">';
            li += '<div class="legend">';
            li += delBtn;
            /**
             * save toogle button has been added to appended list item
             * @author Mustafa Zeynel Dağlı
             */
            li += '<span id="txt-title-' + lastID + '" class="field-label">' + label + '</span>' + tooltip + '<span class="required-asterisk" ' + (required === 'true' ? 'style="display:inline"' : '') + '> *</span>' + toggleBtn + toggleBtnSave;
            li += '</div>';
            li += '<div class="prev-holder">' + fieldPreview(values) + '</div>';
            li += '<div id="frm-' + lastID + '-fld" class="frm-holder">';
            li += '<div class="form-elements">';
            li += '<div class="frm-fld">';
            li += '<label>&nbsp;</label>';
//            li += '<input class="required" type="checkbox" value="1" name="required-' + lastID + '" id="required-' + lastID + '"' + (required === 'true' ? ' checked="checked"' : '') + ' /><label class="required_label" for="required-' + lastID + '">' + opts.messages.required + '</label>';
            li += '<input class="required" type="checkbox" value="1" name="required-' + lastID + '" id="required-' + lastID + '"' + (required === 'true' ? ' checked="checked"' : '') + ' /><label class="required_label" for="required-' + lastID + '">' + window.lang.translate('Mandatory field') + '</label>';
            if (values.type === 'checkbox') {
                li += '<div class="frm-fld">';
                li += '<label>&nbsp;</label>';
                li += '<input class="checkbox-toggle" type="checkbox" value="1" name="toggle-' + lastID + '" id="toggle-' + lastID + '"' + (toggle === 'true' ? ' checked="checked"' : '') + ' /><label class="toggle-label" for="toggle-' + lastID + '">' + opts.messages.toggle + '</label>';
                li += '</div>';
            }
            li += '</div>';
            li += field;
            li += '</div>';
            li += '</div>';
            li += '</li>';

            if (elem.stopIndex) {
                $('li', $sortableFields).eq(elem.stopIndex).after(li);
            } else {
                $sortableFields.append(li);
            }

            $(document.getElementById('frm-' + lastID + '-item')).hide().slideDown(250);

            lastID++;
            _helpers.save();
        };

        /**
         * Generate preview markup
         * @param  {object} attrs
         * @return {string}       preview markup for field
         * @author Mustafa Zeynel Dağlı
         */
        var fieldPreview = function fieldPreview(attrs) {
            var i,
                    preview = '',
                    epoch = new Date().getTime();
            var toggle = attrs.toggle ? 'toggle' : '';
            switch (attrs.type) {
                case 'textarea':
                case 'rich-text':
                    preview = '<textarea class="form-control"></textarea>';
                    break;
                case 'select':
                    var options;
                    attrs.values.reverse();
                    for (i = attrs.values.length - 1; i >= 0; i--) {
                        options += '<option value="' + attrs.values[i].value + '">' + attrs.values[i].label + '</option>';
                    }
                    preview = '<' + attrs.type + ' class="no-drag form-control">' + options + '</' + attrs.type + '>';
                    break;
                case 'checkbox-group':
                case 'radio-group':
                    var type = attrs.type.replace('-group', '');
                    attrs.values.reverse();
                    for (i = attrs.values.length - 1; i >= 0; i--) {
                        preview += '<div><input type="' + type + '" id="' + type + '-' + epoch + '-' + i + '" value="' + attrs.values[i].value + '" /><label for="' + type + '-' + epoch + '-' + i + '">' + attrs.values[i].label + '</label></div>';
                    }
                    break;
                case 'text':
                case 'password':
                case 'email':
                case 'date':
                    preview = '<input type="' + attrs.type + '" placeholder="" class="form-control">';
                    break;
                case 'hidden':
                case 'checkbox':
                    preview = '<input type="' + attrs.type + '" ' + toggle + ' placeholder="">';
                    break;
                case 'autocomplete':
                    preview = '<input class="ui-autocomplete-input form-control" autocomplete="on" placeholder="">';
                    break;
                default:
                    preview = '<' + attrs.type + '></' + attrs.type + '>';
            }

            return preview;
        };

        /**
         * 
         * @param {type} values
         * @param {type} name
         * @param {type} selected
         * @param {type} multipleSelect
         * @returns {String}
         * @author Mustafa Zeynel Dağlı
         */
        // Select field html, since there may be multiple
        var selectFieldOptions = function selectFieldOptions(values, name, selected, multipleSelect) {
            var selectedType = multipleSelect ? 'checkbox' : 'radio';

            if (typeof values !== 'object') {
                values = {
                    label: '',
                    value: ''
                };
            } else {
                values.label = values.label || '';
                values.value = values.value || '';
            }

            field = '<li>';
            field += '<input type="' + selectedType + '" ' + selected + ' class="select-option" name="' + name + '" />';
//            field += '<input type="text" class="option-label" placeholder="' + opts.messages.optionLabelPlaceholder + '" value="' + values.label + '" />';
//            field += '<input type="text" class="option-value" placeholder="' + opts.messages.optionValuePlaceholder + '" value="' + values.value + '" />';
            field += '<input type="text" class="option-label" placeholder="' + window.lang.translate('Label') + '" value="' + values.label + '" />';
            field += '<input type="text" class="option-value" placeholder="' + window.lang.translate('Value') + '" value="' + values.value + '" />';
            field += '<a href="#" class="remove btn" title="' + window.lang.translate('Remove Element') + '">' + opts.messages.remove + '</a>';
            field += '</li>';

            return field;
        };

        // ---------------------- UTILITIES ---------------------- //
        /**
         * form editor, dragged element remove option (if element has option) click action binding
         * @author Mustafa Zeynel Dağlı
         */
        // delete options
        $sortableFields.delegate('.remove', 'click', function (e) {
            //alert('remove option element');  
            e.preventDefault();
            var optionsCount = $(this).parents('.sortable-options:eq(0)').children('li').length;
            if (optionsCount <= 2) {
                alert('Error: ' + opts.messages.minOptionMessage);
            } else {
                $(this).parent('li').slideUp('250', function () {
                    $(this).remove();
                });
            }
        });

        /**
         * delegate machine property opener dialog event
         * @param {type} button
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 23/02/2016
         */
        $sortableFields.on('click', '.machine-property-opener', function (e) {
            e.preventDefault();
            //alert('on click machine property');
            var invoker = $(this);
            _helpers.machinePropertyOpener(e, invoker);
        });

        /**
         * delegate machine property unit opener dialog event
         * @author Mustafa Zeynel Dağlı
         * @since 29/02/2016
         */
        $sortableFields.on('click', '.machine-property-unit-opener', function (e) {
            e.preventDefault();
            //alert('on click machine property');
            var invoker = $(this);
            _helpers.machinePropertyUnitOpener(e, invoker);
        });

        /**
         * form editor, dragged form element edit action binding
         * @author Mustafa Zeynel Dağlı
         */
        // toggle fields
        $sortableFields.on('click', '.toggle-form', function (e) {
            //alert('toogle form');
            e.preventDefault();
            var targetID = $(this).attr('id');
            if ($(this).find('i').hasClass('fa-folder-open-o')) {
                $(this).find('i').first().removeClass('fa-folder-open-o').addClass('fa-folder');
            } else if ($(this).find('i').hasClass('fa-folder')) {
                $(this).find('i').first().removeClass('fa-folder').addClass('fa-folder-open-o');
            }

            $(this).toggleClass('open').parent().next('.prev-holder').slideToggle(250);
            $(document.getElementById(targetID + '-fld')).slideToggle(250, function () {
                _helpers.save();
            });
        });

        /**
         * draggable form header save button event delegation
         * @author Mustafa Zeynel Dağlı
         * @since 25/02/2016
         */
        $sortableFields.on('click', '.toggle-form-save', function (e) {
            e.preventDefault();
            alert('toogle form save clicked');
            _helpers.save();
            var invoker = e.target
            if ($(this).find('i').hasClass('fa-save')) {
                $(this).find('i').first().removeClass('fa-save').addClass('fa-clipboard');
            }
        })


        /**
         * form editor, dragged form element edit 'label' preview action binding
         * when you write to label property of element editor, this triggers
         * @author Mustafa Zeynel Dağlı
         */
        // update preview to label
        $sortableFields.delegate('input[name="label"]', 'keyup', function () {
            //alert('label preview');
            $('.field-label', $(this).closest('li')).text($(this).val());
        });

        // remove error styling when users tries to correct mistake
        $sortableFields.delegate('input.error', 'keyup', function () {
            $(this).removeClass('error');
        });

        /**
         * form editor, dragged form element edit 'help text' preview action binding
         * @author Mustafa Zeynel Dağlı
         */
        // update preview for description
        $sortableFields.delegate('input[name="description"]', 'keyup', function () {
            //alert('help text preview');
            var closestToolTip = $('.tooltip-element', $(this).closest('li'));
            if ($(this).val() !== '') {
                if (!closestToolTip.length) {
                    var tt = '<span class="tooltip-element" tooltip="' + $(this).val() + '">?</span>';
                    $('.toggle-form', $(this).closest('li')).before(tt);
                    // _helpers.initTooltip(tt);
                } else {
                    closestToolTip.attr('tooltip', $(this).val()).css('display', 'inline-block');
                }
            } else {
                if (closestToolTip.length) {
                    closestToolTip.css('display', 'none');
                }
            }
        });

        /**
         * form editor, dragged element add option (if element has option) click action binding
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         */
        _helpers.updateMultipleSelect();

        /**
         * form editor, dragged form element edit 'name'  action binding
         * @author Mustafa Zeynel Dağlı
         */
        // format name attribute
        $sortableFields.delegate('input[name="name"]', 'keyup', function () {
            //alert('name preview');  
            $(this).val(_helpers.safename($(this).val()));
            if ($(this).val() === '') {
                $(this).addClass('field_error').attr('placeholder', opts.messages.cannotBeEmpty);
            } else {
                $(this).removeClass('field_error');
            }
        });

        /**
         * form editor, dragged form element edit 'max length'(if there is)  action binding
         * @author Mustafa Zeynel Dağlı
         */
        $sortableFields.delegate('input.fld-max-length', 'keyup', function () {
            //alert('max-length preview'); 
            $(this).val(_helpers.forceNumber($(this).val()));
        });

        /**
         * form editor, dragged form element remove from editor action binding
         * @author Mustafa Zeynel Dağlı
         */
        // Delete field
        $sortableFields.delegate('.delete-confirm', 'click', function (e) {
            //alert('delete confirm');
            e.preventDefault();

            // lets see if the user really wants to remove this field... FOREVER
            var fieldWarnH3 = $('<h3/>').html('<span></span>' + opts.messages.warning),
                    deleteID = $(this).attr('id').replace(/del_/, ''),
                    delBtn = $(this),
                    $field = $(document.getElementById('frm-' + deleteID + '-item')),
                    toolTipPageX = delBtn.offset().left - $(window).scrollLeft(),
                    toolTipPageY = delBtn.offset().top - $(window).scrollTop();

            if (opts.showWarning) {
                jQuery('<div />').append(fieldWarnH3, opts.messages.fieldRemoveWarning).dialog({
                    modal: true,
                    resizable: false,
                    width: 300,
                    dialogClass: 'ite-warning',
                    open: function open() {
                        $('.ui-widget-overlay').css({
                            'opacity': 0.0
                        });
                    },
                    position: [toolTipPageX - 282, toolTipPageY - 178],
                    buttons: [{
                            text: opts.messages.yes,
                            click: function click() {
                                $field.slideUp(250, function () {
                                    $(this).remove();
                                    _helpers.save();
                                });
                                $(this).dialog('close');
                            }
                        }, {
                            text: opts.messages.no,
                            'class': 'cancel',
                            click: function click() {
                                $(this).dialog('close');
                            }
                        }]
                });
            } else {
                $field.slideUp(250, function () {
                    $(this).remove();
                    _helpers.save();
                });
            }

            if ($('.form-field', $sortableFields).length === 1) {
                $stageWrap.addClass('empty');
            }
        });

        /**
         * form editor, dragged form element 'input required' checkbox action binding
         * @author Mustafa Zeynel Dağlı
         */
        // Attach a callback to toggle required asterisk
        $sortableFields.delegate('input.required', 'click', function () {
            //alert('input.required click');
            var requiredAsterisk = $(this).parents('li.form-field').find('.required-asterisk');
            requiredAsterisk.toggle();
        });

        /**
         * form editor, dragged form element 'Access' checkbox action binding
         * @author Mustafa Zeynel Dağlı
         */
        // Attach a callback to toggle roles visibility
        $sortableFields.delegate('input[name="enable_roles"]', 'click', function () {
            //alert('access enable roles');
            var roles = $(this).siblings('div.available-roles'),
                    enableRolesCB = $(this);
            roles.slideToggle(250, function () {
                if (!enableRolesCB.is(':checked')) {
                    $('input[type="checkbox"]', roles).removeAttr('checked');
                }
            });
        });

        // Attach a callback to add new checkboxes
        $sortableFields.delegate('.add_ck', 'click', function () {
            //alert('ad click event');
            $(this).parent().before(selectFieldOptions());
            return false;
        });

        $sortableFields.delegate('li.disabled .form-element', 'mouseenter', function () {
            _helpers.disabledTT($(this));
        });

        /**
         * form editor, dragged form element 'add option' (if there is option) action binding
         * @author Mustafa Zeynel Dağlı
         */
        // Attach a callback to add new options
        $sortableFields.delegate('.add_opt', 'click', function (e) {
            //alert('add option');
            e.preventDefault();
            var isMultiple = $(this).parents('.fields').first().find('input[name="multiple"]')[0].checked,
                    name = $(this).parents('.fields').find('.select-option:eq(0)').attr('name');
            $(this).parents('.fields').first().find('.sortable-options').append(selectFieldOptions(false, name, false, isMultiple));
            _helpers.updateMultipleSelect();
        });

        /**
         * form editor, dragged form element 'close option' (if there is option) action binding
         * @author Mustafa Zeynel Dağlı
         */
        // Attach a callback to close link
        $sortableFields.delegate('.close_field', 'click', function (e) {
            //alert('close option field action');
            e.preventDefault();
            $(this).parents('li.form-field').find('.toggle-form').trigger('click');
        });

        // Attach a callback to add new radio fields
        $sortableFields.delegate('.add_rd', 'click', function (e) {
            //alert('add new radio fields');
            e.preventDefault();
            $(this).parent().before(selectFieldOptions(false, $(this).parents('.frm-holder').attr('id')));
        });

        $('.form-elements .fields .remove, .frmb .del-button').on('hover', function () {
            $(this).parents('li.form-field').toggleClass('delete');
        });

        /**
         * view xml button action binding
         * @author Mustafa Zeynel Dağlı
         */
        // View XML
        $(document.getElementById(frmbID + '-export-xml')).click(function (e) {
            //alert('view xml action');
            e.preventDefault();
            var xml = elem.val(),
                    $pre = $('<pre />').text(xml);
            $pre.dialog({
                resizable: false,
                modal: true,
                width: 720,
                dialogClass: 'frmb-xml',
                overlay: {
                    color: '#333333'
                }
            });
        });

        // Clear all fields in form editor
        $(document.getElementById(frmbID + '-clear-all')).click(function (e) {
            e.preventDefault();
            if (window.confirm(opts.messages.clearAllMessage)) {
                $sortableFields.empty();
                elem.val('');
                _helpers.save();
                var values = {
                    label: [opts.messages.descriptionField],
                    name: ['content'],
                    required: 'true',
                    description: opts.messages.mandatory
                };

                appendNewField(values);
                $sortableFields.prepend(opts.disableFields.before);
                $sortableFields.append(opts.disableFields.after);
            }
        });

        /**
         * form editor, form save button action
         * @author Mustafa Zeynel Dağlı
         */
        // Save Idea Template
        $(document.getElementById(frmbID + '-save')).click(function (e) {
            //alert('form save action');
            if ($(this).find('.ldkInlineEdit').length === 0) {
                e.preventDefault();
                if (!$stageWrap.hasClass('edit-xml')) {
                    _helpers.save();
                }
                _helpers.validateForm(e);
            }
        });

        var triggerDevMode = false,
                keys = [],
                devCode = '68,69,86';
        // Super secret Developer Tools
        $('.save.fb-button').mouseover(function () {
            triggerDevMode = true;
        }).mouseout(function () {
            triggerDevMode = false;
        });
        $(document.documentElement).keydown(function (e) {
            keys.push(e.keyCode);
            if (keys.toString().indexOf(devCode) >= 0) {
                $('.action-links').toggle();
                $('.view-xml').toggle();
                keys = [];
            }
        });
        // Toggle Developer Mode
        $('.dev-mode-link').click(function (e) {
            e.preventDefault();
            var dml = $(this);
            $stageWrap.toggleClass('dev-mode');
            dml.parent().css('opacity', 1);
            if ($stageWrap.hasClass('dev-mode')) {
                dml.siblings('.action-links-inner').css('width', '100%');
//                dml.html(opts.messages.devMode + ' ' + opts.messages.on).css('color', '#8CC63F');
                dml.html(window.lang.translate("Developer Mode") + ' ' + window.lang.translate("On")).css('color', '#8CC63F');
            } else {
                dml.siblings('.action-links-inner').css('width', 0);
//                dml.html(opts.messages.devMode + ' ' + opts.messages.off).css('color', '#666666');
                dml.html(window.lang.translate("Developer Mode") + ' ' + window.lang.translate("Off")).css('color', '#666666');
                triggerDevMode = false;
                $('.action-links').toggle();
                $('.view-xml').toggle();
            }
        });

        // Toggle Edit Names
        $(document.getElementById(frmbID + '-edit-names')).click(function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.name-wrap', $sortableFields).slideToggle(250, function () {
                $stageWrap.toggleClass('edit-names');
            });
        });

        // Toggle Allow Select
        $(document.getElementById(frmbID + '-allow-select')).click(function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.allow-multi, .select-option', $sortableFields).slideToggle(250, function () {
                $stageWrap.toggleClass('allow-select');
            });
        });

        // Toggle Edit XML
        $(document.getElementById(frmbID + '-edit-xml')).click(function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('textarea.idea-template').show();
            $('.template-textarea-wrap').slideToggle(250);
            $stageWrap.toggleClass('edit-xml');
        });

        elem.parent().find('p[id*="ideaTemplate"]').remove();
        elem.wrap('<div class="template-textarea-wrap"/>');
        elem.getTemplate();
    };

    $.fn.formBuilder = function (options) {
        var form = this;
        return form.each(function () {
            var element = $(this);
            if (element.data('formBuilder')) {
                return;
            }
            var formBuilder = new FormBuilder(this, options);
            element.data('formBuilder', formBuilder);
        });
    };
})(jQuery);

// toXML is a jQuery plugin that turns our form editor into XML
(function ($) {
    'use strict';
    $.fn.toXML = function (options) {
        var defaults = {
            prepend: '',
            attributes: ['class']
        };
        var opts = $.extend(defaults, options);

        var serialStr = '';

        // Begin the core plugin
        this.each(function () {
            var liCount = 0;
            var c = 1;

            if ($(this).children().length >= 1) {
                serialStr += '<form-template>\n\t<fields>';
                
                var demoArray = [];
                // build new xml
                $(this).children().each(function () {
                    var $field = $(this);
                    if (!($field.hasClass('moving') || $field.hasClass('disabled'))) {
                        for (var att = 0; att < opts.attributes.length; att++) {
                            var test = [$('input.fld-label', $field).val(),$('input.fld-description', $field).val()];
                            demoArray.push(test);
                            var required = $('input.required', $field).is(':checked') ? 'required="true" ' : 'required="false" ',
                                    multipleChecked = $('input[name="multiple"]', $field).is(':checked'),
                                    multiple = multipleChecked ? 'style="multiple" ' : '',
                                    t = $field.attr(opts.attributes[att]).replace(' form-field', ''),
                                    // field type
                                    multipleField = t.match(/(select|checkbox-group|radio-group)/),
                                    type = 'type="' + t + '" ',
                                    fName = 'name="' + $('input.fld-name', $field).val() + '" ',
                                    fLabel = 'label="' + $('input.fld-label', $field).val() + '" ',
                                    roleVals = $.map($('input.roles-field:checked', $field), function (n) {
                                        return n.value;
                                    }).join(','),
                                    roles = roleVals !== '' ? 'role="' + roleVals + '" ' : '',
                                    desc = 'description="' + $('input.fld-description', $field).val() + '" ',
                                    maxLengthVal = $('input.fld-max-length', $field).val(),
                                    maxLength = 'max-length="' + (maxLengthVal !== undefined ? maxLengthVal : '') + '" ',
                                    fSlash = !multipleField ? '/' : '';

                            var fToggle = $('.checkbox-toggle', $field).is(':checked') ? 'toggle="true" ' : '';

                            serialStr += '\n\t\t<field ' + fName + fLabel + fToggle + multiple + roles + desc + (maxLengthVal !== '' ? maxLengthVal !== undefined ? maxLength : '' : '') + required + type + fSlash + '>';
                            if (multipleField) {
                                c = 1;
                                $('.sortable-options li', $field).each(function () {
                                    var $option = $(this),
                                            optionValue = 'value="' + $('.option-value', $option).val() + '"',
                                            optionLabel = $('.option-label', $option).val(),
                                            selected = $('.select-option', $option).is(':checked') ? ' selected="true"' : '';
                                    serialStr += '\n\t\t\t<option' + selected + ' ' + optionValue + '>' + optionLabel + '</option>';
                                    c++;
                                });
                                serialStr += '\n\t\t</field>';
                            }
                        }
                        //console.log(demoArray);
                        var objTest = $.extend({}, demoArray);
                        //console.log(objTest);
                        var json=JSON.stringify(objTest);
                        console.log(json);
                        //console.log(JSON.stringify(demoArray));
                        console.log(JSON.parse(json)); 
                    }
                    liCount++;
                });
                serialStr += '\n\t</fields>\n</form-template>';
            } // if "$(this).children().length >= 1"
        });
        return serialStr;
    };
})(jQuery);

$(document).ready(function () {


    /**
     * multilanguage plugin 
     * @type Lang
     */

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());
    });