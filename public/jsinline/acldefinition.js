$(document).ready(function () {

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
     * blockUI wrappert test
     * @author Mustafa Zeynel Dağlı
     * @since 18/01/2016
     */
    var testBlockuiRoleNameChangeNull = $("#growlUI-nullRoleName").blockuiWrapper();
    var testBlockuiRoleNameChangeApproval = $("#growlUI-roleNameChangeApproval").blockuiApprovalWrapper();
    var aclProcessing = $("#roleForm").blockElement();
    var test = $("#roleForm").test();


    $.extend($.fn.tree.methods, {
        getRoot: function (jq, nodeEl) {
            if (nodeEl) {
                var target = nodeEl;
                var p = jq.tree('getParent', target);
                while (p) {
                    target = p.target;
                    p = jq.tree('getParent', p.target);
                }
                return jq.tree('getNode', target);
            } else {
                var roots = jq.tree('getRoots');
                return roots.length ? roots[0] : null;
            }
        }
    })

    /*
     * Author: Abdullah A Almsaeed
     * Date: 4 Jan 2014
     * Description:
     *      This is a demo file used only for the main dashboard (index.html)
     **/
    "use strict";
    // Left menuyu oluşturmak için çağırılan fonksiyon...
    $.fn.leftMenuFunction();

    //Validation forms binded...
    jQuery("#roleForm").validationEngine();
    jQuery("#resourceForm").validationEngine();
    jQuery("#privelegeForm").validationEngine();


    /*
     * 
     * @type @call;$@call;loadImager
     * @Since 2016.01.16
     * @Author Mustafa Zeynel Dagli
     * @Purpose this variable is to create loader image for roles tree 
     * this imager goes to #loading-image div in html.
     * imager will be removed on roles tree onLoadSuccess method.
     */
    var loader = $("#loading-image").loadImager();

    /*
     * 
     * @type @call;$@call;tree
     * Role Tree Fonksiyonu
     * Bahram Lotfi Sadigh
     * 2016.01.13
     */

    $('#tt_tree_roles').tree({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillComboBoxFullRoles_sysAclRoles&pk=' + $("#pk").val(),
        method: 'get',
        animate: true,
        checkbox: true,
        cascadeCheck: false,
        lines: true,
        onDblClick: function (node) {
            editNode = $(this).tree('getData', node.target);
            beforeEditTextValue = $(this).tree('getData', node.target).text;
            parent = $(this).tree('getParent', node.target);

            if (parent == null) {
                parentId = 0;
            } else {
                parentId = parent.id;
            }

            $(this).tree('beginEdit', node.target);
        },
        onAfterEdit: function (node) {

            id = editNode.id;
            root = $(this).tree('getRoot', node.target);
            if (editNode.text === '') {

                testBlockuiRoleNameChangeNull.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiRoleNameChangeNull.blockuiWrapper('show');

                editNode.text = beforeEditTextValue;

                $('#tt_tree_roles').tree('update', {
                    target: node.target,
                    text: beforeEditTextValue
                });

            } else {

                testBlockuiRoleNameChangeApproval.blockuiApprovalWrapper('option', {
                    showOverlay: true
                });
                testBlockuiRoleNameChangeApproval.blockuiApprovalWrapper('show');
                active = editNode.attributes.active;
            }
        },
        onLoadSuccess: function (node, data) {
            loader.loadImager('removeLoadImage');
        },
        onClick: function (node) {

            selectedRoot = $(this).tree('getRoot', node.target);
            selectedItem = $(this).tree('getData', node.target);

        },
        onCheck: function (node) {
            checkedNodes = $('#tt_tree_roles').tree('getChecked');
            var z;
            var q;

            if (checkedNodes) {

                for (z = 0; z < checkedNodes.length; z++) {

                    isLeaf = $(this).tree('isLeaf', checkedNodes[z].target);
                    if (!isLeaf) {

                        $('#tt_tree_roles').tree('expand', checkedNodes[z].target);

                        checkedNodesChildren = $('#tt_tree_roles')
                                .tree('getChildren', checkedNodes[z].target);

                        if (checkedNodesChildren) {

                            for (q = 0; q < checkedNodesChildren.length; q++) {
                                isLeaf = $(this).tree('isLeaf', checkedNodesChildren[q].target);
                                if (!isLeaf) {

                                    $('#tt_tree_roles').tree('expand', checkedNodesChildren[q].target);
                                }
                            }
                        }
                    }
                }
            }
        },
        formatter: function (node) {

            if (node.attributes.active == 0) {
                var s = node.text;
//                s += '&nbsp;<a href="#"><i class="fa fa-fw fa-trash-o"></i></a>&nbsp;<a href="#" ><i class="fa fa-fw fa-ban"></i></a>';
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" onclick="deleteRoleFunction()"></i>&nbsp;<i class="fa fa-fw fa-ban" onclick="roleActivationChangeFunction()"></i>';
                //buda koşullu kullanım için örnek satır    
//                if (node.children) {
//                    s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
//                }
                return s;

            } else if (node.attributes.active == 1) {

                var s = node.text;
                s += '&nbsp;<a href="#"><i class="fa fa-fw fa-trash-o" onclick="deleteRoleFunction()"></i></a>&nbsp;<i class="fa fa-fw fa-check-square-o" onclick="roleActivationChangeFunction()"></i>';

                s = "<font color = '#B6B6B4'>" + s + "</font>"
                //buda koşullu kullanım için örnek satır    
//                if (node.children) {
//                    s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
//                }
                return s;
            }
        }
    });

    $('#roleForm').submit(newRoleSubmission);
    $("#deleteRole").on('click', deleteRoleFunction);
    $("#activationRole").on('click', roleActivationChangeFunction);
    
    
    function newRoleSubmission() {

    enteredRoleName = $('#roleName').val();
    roleDescription = $('#roleDescription').val();

    if ($("#roleForm").validationEngine('validate')) {
        aclProcessing.blockElement('show');
        
        
        testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('option', {
            showOverlay: true,
        });
        testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('show');

        //var passiveControl = $('#tt_tree_roles').tree('getData', selectedItem.target);

        /*if (passiveControl.attributes.active == 0) {
            if (selectedItem == null) {
                parentId = 0;
                rootId = 0;
            } else {
                parentId = selectedItem.id;
                rootId = selectedRoot.id;
            }

            testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('show');

        } else {

            testBlockuiNewPassiveRoleSubmitPrevention.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiNewPassiveRoleSubmitPrevention.blockuiApprovalWrapper('show');

        }*/

    }
    return false;
}

    /*
    * new role submission rejection function
    * @auhtor: bahram lotfi sadigh
    * @since: 2016.01.18
    */
   window.newRoleSubmissionRejection = function () {
       test.test('hide',testBlockuiNewRoleSubmitApproval);
       //testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('hide');
       aclProcessing.blockElement('hide');
       testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('find');
       return false;
   }
    
});

/*
 * 
 * @type @call;$@call;tree
 * variables defintion outside scopes
 * @author: bahram lotfi sadigh
 * @since: 2016.01.18
 */
var selectedRoot;
var selectedItem;
var beforeEditValue;
var parent;
var parentId;
var checkedNodes;
var checkedNodesChildren;
var rootId;
var nodesToCheck;
var search_name;
var root;
var id;
var enteredRoleName;
var roleDescription;
var i;
var active;
var response;

/*
 * 
 * @type @call;$@call;blockuiWrapper
 * blockUI variable calls
 * @author: bahram lotfi sadigh
 * @since: 2016.01.18
 */

var testBlockuiSuccessfulRoleNameChange = $("#growlUI-successfulRoleNameChange").blockuiWrapper();
var testBlockuiFailedRoleNameChange = $("#growlUI-failedRoleNameChange").blockuiWrapper();
var testBlockuiFailedRoleNameChange23505 = $("#growlUI-failedRoleNameChange23505").blockuiWrapper();

var testBlockuiNewRoleSubmitApproval = $("#growlUI-newRoleSubmitApproval").blockuiApprovalWrapper();
var testBlockuiNewPassiveRoleSubmitPrevention = $("#growlUI-newPassiveRoleSubmitPrevention").blockuiApprovalWrapper();
var testBlockuiSuccessfulRoleSubmit = $("#growlUI-successfulRoleSubmit").blockuiWrapper();
var testBlockuiFailedRoleSubmit = $("#growlUI-failedRoleSubmit").blockuiWrapper();
var testBlockuiFailedRoleSubmit23505 = $("#growlUI-failedRoleSubmit23505").blockuiWrapper();

var testBlockuiRoleDeleteApproval = $("#growlUI-roleDeleteApproval").blockuiApprovalWrapper();
var testBlockuiSuccessfulRoleDelete = $("#growlUI-successfulRoleDelete").blockuiWrapper();
var testBlockuiFailedRoleDelete = $("#growlUI-failedRoleDelete").blockuiWrapper();
var testBlockuiFailedRoleDeleteNotChecked = $('#grwolUI-failedRoleDeleteNotChecked').blockuiWrapper();

var testBlockuiRoleActivationChangeApproval = $("#growlUI-roleActivationChangeApproval").blockuiApprovalWrapper();
var testBlockuiSuccessfulRoleActivationChange = $("#growlUI-successfulRoleActivationChange").blockuiWrapper();
var testBlockuiFailedRoleActivationChange = $("#growlUI-failedRoleActivationChange").blockuiWrapper();
var testBlockuiFailedRoleActivationChange23505 = $("#growlUI-failedRoleActivationChange23505").blockuiWrapper();


/* 
 * @returns {Boolean}
 * Role Tree de yeni role ekleme fonksiyonu
 * Bahram Lotfi Sadigh
 * 2016.01.13
 */

function newRoleSubmission1() {

    enteredRoleName = $('#roleName').val();
    roleDescription = $('#roleDescription').val();

    if ($("#roleForm").validationEngine('validate')) {
        aclProcessing.blockElement('show');
        /*$('#roleForm').block({
            message: '<h1 lang="en">Sure</h1>',
            css: {//border: 'none',
                padding: '15px',
                backgroundColor: '#008000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                'border-radius': '10px',
                opacity: .5,
                color: '#fff'}
        });*/
        
        testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('option', {
            showOverlay: true,
        });
        testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('show');

        //var passiveControl = $('#tt_tree_roles').tree('getData', selectedItem.target);

        /*if (passiveControl.attributes.active == 0) {
            if (selectedItem == null) {
                parentId = 0;
                rootId = 0;
            } else {
                parentId = selectedItem.id;
                rootId = selectedRoot.id;
            }

            testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('show');

        } else {

            testBlockuiNewPassiveRoleSubmitPrevention.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiNewPassiveRoleSubmitPrevention.blockuiApprovalWrapper('show');

        }*/

    }
    return false;
}

/* 
 * @returns {Boolean}
 * Role Tree de rol silme fonksiyonu
 * Bahram Lotfi Sadigh
 * 2016.01.13
 */
function deleteRoleFunction() {
    testBlockuiRoleDeleteApproval.blockuiApprovalWrapper('option', {
        showOverlay: true
    });
    testBlockuiRoleDeleteApproval.blockuiApprovalWrapper('show');

}

/* 
 * @returns {Boolean}
 * Role Tree de rol aktif veya pasif degistirme fonksiyonu
 * Bahram Lotfi Sadigh
 * 2016.01.13
 */
function roleActivationChangeFunction() {

    for (i = 0; i < checkedNodes.length; i++) {
        if (checkedNodes[i].attributes.active == 0) {
            active = 1;
            root = $('#tt_tree_roles').tree('getRoot', checkedNodes[i].target);
            rootId = root.id;
            parent = $('#tt_tree_roles').tree('getParent', checkedNodes[i].target);

            if (parent == null) {
                parentId = 0;
            } else {
                parentId = parent.id;
            }
            actChangeNode = $('#tt_tree_roles').tree('getData', checkedNodes[i].target);
            testBlockuiRoleActivationChangeApproval.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiRoleActivationChangeApproval.blockuiApprovalWrapper('show');


        } else if (checkedNodes[i].attributes.active == 1) {

            root = $('#tt_tree_roles').tree('getRoot', checkedNodes[i].target);
            rootId = root.id;

            parent = $('#tt_tree_roles').tree('getParent', checkedNodes[i].target);
            if (parent == null) {
                parentId = 0;
            } else {
                parentId = parent.id;
            }
            active = 0;

            actChangeNode = $('#tt_tree_roles').tree('getData', checkedNodes[i].target);
            testBlockuiRoleActivationChangeApproval.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiRoleActivationChangeApproval.blockuiApprovalWrapper('show');
        }
    }
}

/*
 * Role name change confirmation function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function roleNameChangeConfirmation() {
    response = 'confirm';
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            id: editNode.id,
            url: 'pkUpdate_sysAclRoles',
            name: editNode.text,
            root: root.id,
            parent: parentId,
            icon_class: null,
            active: active,
            start_date: null,
            end_date: null,
            user_id: 0,
            description: null,
            pk: $("#pk").val(),
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
//                $.unblockUI();
//                $('#roleFormBlock').unblock();

            if (data['errorInfo'][0] === '00000') {

                testBlockuiSuccessfulRoleNameChange.blockuiWrapper('option', 'backgroundColor', '0080000');
                testBlockuiSuccessfulRoleNameChange.blockuiWrapper('show');

                $('#tt_tree_roles').tree('update', {
                    target: editNode.target
                });

            } else if (data['errorInfo'] === '23505') {

                testBlockuiFailedRoleNameChange23505.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedRoleNameChange23505.blockuiWrapper('show');

                $('#tt_tree_roles').tree('update', {
                    target: editNode.target,
                    text: beforeEditTextValue
                });
            } else {
                testBlockuiFailedRoleNameChange.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedRoleNameChange.blockuiWrapper('show');

                $('#tt_tree_roles').tree('update', {
                    target: editNode.target,
                    text: beforeEditTextValue
                });
            }
            $.unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {

            testBlockuiFailedRoleNameChange.blockuiWrapper('option', 'fadeOut', 700);
            testBlockuiFailedRoleNameChange.blockuiWrapper('show');

            $('#tt_tree_roles').tree('update', {
                target: editNode.target,
                text: beforeEditTextValue
            });
        }
    });
    $.unblockUI();
}

/*
 * Role name change rejection function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */
function roleNameChangeRejection() {
    response = 'reject';
    $('#tt_tree_roles').tree('update', {
        target: editNode.target,
        text: beforeEditTextValue
    });
    $.unblockUI();
    return false;
}

/*
 * new role submission confirmation function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function newRoleSubmissionConfirmation() {

    response = 'confirm';
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkInsert_sysAclRoles',
            icon_class: null,
            start_date: null,
            end_date: null,
            root: rootId,
            parent: parentId,
            user_id: 0,
            name: enteredRoleName,
            description: roleDescription,
            pk: $("#pk").val(),
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {

            $('#roleFormBlock').unblock();
            if (data['errorInfo'][0] === '00000') {
                testBlockuiSuccessfulRoleSubmit.blockuiWrapper('option', 'backgroundColor', '0080000');
                testBlockuiSuccessfulRoleSubmit.blockuiWrapper('show');

            } else if (data['errorInfo'] === '23505') {
                testBlockuiFailedRoleSubmit23505.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedRoleSubmit23505.blockuiWrapper('show');

            } else {
                testBlockuiFailedRoleSubmit.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedRoleSubmit.blockuiWrapper('show');

            }
            return false;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#roleFormBlock').unblock();

            testBlockuiFailedRoleSubmit.blockuiWrapper('option', 'fadeOut', 700);
            testBlockuiFailedRoleSubmit.blockuiWrapper('show');

            return false;
        }
    });

    $('#tt_tree_roles').tree('reload');
    $.unblockUI();
}




function newPassiveRoleSubmissionPrevention() {

    $('#tt_tree_roles').tree('reload');
    $('#roleFormBlock').unblock();
    $.unblockUI();
}

/*
 * role remove confirmation function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function deleteRoleConfirmation() {

    response = 'confirm';
    console.log(response);

    if (checkedNodes.length == 0) {

        console.log('did not check');        
        console.log(checkedNodes.length);
        
        testBlockuiFailedRoleDeleteNotChecked.blockuiWrapper('option', 'fadeOut', 700);
        testBlockuiFailedRoleDeleteNotChecked.blockuiWrapper('show');

    } else {

        for (i = 0; i < checkedNodes.length; i++) {
            $.ajax({
                //url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    url: 'pkDelete_sysAclRoles',
                    id: checkedNodes[i].id,
                    user_id: 0,
                    pk: $("#pk").val(),
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {

                    console.log(checkedNodes + 'removed');
                    $('#roleFormBlock').unblock();
                    console.log('errorInfo is ' + data['errorInfo'][0]);
                    if (data['errorInfo'][0] === '00000') {

                        testBlockuiSuccessfulRoleDelete.blockuiWrapper('option', 'backgroundColor', '0080000');
                        testBlockuiSuccessfulRoleDelete.blockuiWrapper('show');

                    } else {

                        testBlockuiFailedRoleDelete.blockuiWrapper('option', 'fadeOut', 700);
                        testBlockuiFailedRoleDelete.blockuiWrapper('show');

                    }
                    return false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
//            console.log(errorThrown);
//            console.log(jqXHR);
//            console.log(textStatus);
//            console.warn('error text status-->' + textStatus);
                    $('#roleFormBlock').unblock();

                    testBlockuiFailedRoleDelete.blockuiWrapper('option', 'fadeOut', 700);
                    testBlockuiFailedRoleDelete.blockuiWrapper('show');
                }
            });
        }
    }
    $('#tt_tree_roles').tree('reload');
    $.unblockUI();
}

/*
 * role remove rejection function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function deleteRoleRejection() {
    response = 'reject';
    $('#tt_tree_roles').tree('reload');
    $.unblockUI();
}

/*
 * role activation change confirmation function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function roleActivationChangeConfirmation() {
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkUpdateChild_sysAclRoles',
            id: actChangeNode.id,
            name: actChangeNode.text,
            active: active,
            user_id: 0,
            pk: $("#pk").val()
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            $('#roleFormBlock').unblock();
            if (data['errorInfo'][0] == '00000') {
                testBlockuiSuccessfulRoleActivationChange.blockuiWrapper('option', 'backgroundColor', '0080000');
                testBlockuiSuccessfulRoleActivationChange.blockuiWrapper('show');

                $('#tt_tree_roles').tree('reload');

            } else if (data['errorInfo'] == '23505') {

                testBlockuiFailedRoleActivationChange23505.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedRoleActivationChange23505.blockuiWrapper('show');

                $('#tt_tree_roles').tree('reload');
            } else {
                testBlockuiFailedRoleActivationChange.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedRoleActivationChange.blockuiWrapper('show');

                $('#tt_tree_roles').tree('reload');
            }
            $('#tt_tree_roles').tree('update', {
                target: actChangeNode.target
            });       

        },
        error: function (jqXHR, textStatus, errorThrown) {

            testBlockuiFailedRoleActivationChange.blockuiWrapper('option', 'fadeOut', 700);
            testBlockuiFailedRoleActivationChange.blockuiWrapper('show');

            $('#tt_tree_roles').tree('reload');
        }

    });

    $.unblockUI();
}

/*
 * role activation change rejection function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function roleActivationChangeRejection() {
    response = 'reject';
    $('#tt_tree_roles').tree('reload');
    $.unblockUI();
}

