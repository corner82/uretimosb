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


    var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Confirm')});

    window.invitation_text =
            "Dear Sir/Madam,\n"
            + "\n"
            + "We (as " + $('#selectedCompanyShN').val().toUpperCase() + " company) are looking for your support to provide us an online reference highlighting our good business relationship and your views about our company. "
            + "This reference will be viewed by OSTIM virtual enterprise users and visitors to analyse and get some clues about comapnies like ours. "
            + "If you have any questions, please do not hesitate to contact us.\n"
            + "\n"
            + "Thanks in advance for your support.\n"
            + "\n"
            + "\n"
            + "Sincerely,\n"
            + $('#selectedCompanyShN').val().toUpperCase();
    $('#inv_lett_text').append(window.invitation_text);

    var dataSet = {"total": 5, "rows": [
            {'buyer_name': 'Buyer A', 'company_name': 'Company A', 'email_address': 'companya@companya.com', 'status': 'Satisfied', 'comments': 'Get orders on time with required quality'},
            {'buyer_name': 'Buyer B', 'company_name': 'Company B', 'email_address': 'companyb@companyb.com', 'status': 'Satisfied', 'comments': 'Get orders on time with required quality'},
            {'buyer_name': 'Buyer C', 'company_name': 'Company C', 'email_address': 'companyc@companyc.com', 'status': 'Normal', 'comments': 'Get orders with required quality'},
            {'buyer_name': 'Buyer D', 'company_name': 'Company D', 'email_address': 'companyd@companyd.com', 'status': 'Normal', 'comments': 'Get orders on time'},
            {'buyer_name': 'Buyer E', 'company_name': 'Company E', 'email_address': 'companye@companye.com', 'status': 'Satisfied', 'comments': 'Get orders on time with required quality'}

        ]};

    $('#dg').datagrid({
        data: dataSet,
        singleSelect: true,
        pagination: true,
        collapsible: true,
        method: 'get',
        idField: 'id',
        toolbar:'#tb5',
        fit:true,
        fitColumns : true,
        remoteFilter: true,
        remoteSort: true,
        multiSort: false,
        columns: [[
                {field: 'buyer_name', title: 'buyer_name', width: 100},
                {field: 'company_name', title: 'company_name', width: 100},
                {field: 'email_address', title: 'email_address', width: 100},
                {field: 'status', title: 'status', width: 100},
                {field: 'comments', title: 'comments', width: 100}
            ]]
    });

    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillCompanyLists_infoFirmProfile',
            language_code: $("#langCode").val(),
//            component_type: 'ddslick',
            pk: $('#pk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
//                console.log(data);
                var new_data_set = [];
                var i;
                for (i = 0; i < data.rows.length; i++) {
//                   
                    new_data_set.push({'description': data.rows[i].firm_name_short, 'selected': false, 'text': data.rows[i].firm_names, 'value': i, 'imageSrc': 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/' + data.rows[i].logo});
                }
//                console.log(new_data_set);
                $('#list_reg_customers').ddslick({
                    data: new_data_set,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select your customer from list..."),
                    imagePosition: 'left',
                    onSelected: function (selectedData) {
//                        console.log(selectedData);
                        $("#sel_customer").val(selectedData.selectedData.text);
                        control_send_btn();
                    }
                });
            } else {
                console.error('"fillComboBox_syscountrys" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syscountrys" servis hatasÄ±->' + textStatus);
        }
    });
});

function view_send_invitation() {

    $('#hidden_send_ref').css('display', 'block');
    $('#hidden_send_ref').css('visibility', 'visible');

    if ($('#hidden_send_ref').css('visibility') === 'visible') {
        $('html, body').animate({
            scrollTop: $("#hidden_send_ref").offset().top
        }, 1000);
    }
}

function control_send_btn() {

    if ($('#sel_customer').val() !== '' && $('#inv_lett_text').val() !== '') {
        $('#approve_sel_cust_btn').removeAttr('disabled');
    } else {
        $('#approve_sel_cust_btn').attr('disabled', 'disabled');
    }

    if ($('#inv_lett_text').val() !== window.invitation_text) {
        $('#reset_inv_text_btn').removeAttr('disabled');
    } else {
        $('#reset_inv_text_btn').attr('disabled', 'disabled');
    }
}

function reset_inv_text() {
    wcm.warningComplexMessage({
        onConfirm: function () {
            $('#inv_lett_text').val(window.invitation_text);
        }
    });
    wcm.warningComplexMessage('show', 'Invitation letter changes!!',
            'All changes for in invitation letter text will be lost. Do you want to continue?');

}

function send_invitation() {
    wcm.warningComplexMessage({
        onConfirm: function () {

        }
    });
    wcm.warningComplexMessage('show', 'Sending Invitation Letter',
            'Company "'
            + $('#sel_customer').val()
            + '" is going to get your invitation letter with the content of;\n\n'
            + $('#inv_lett_text').val()
            + '\n\n\nDo you want to continue?');

}

