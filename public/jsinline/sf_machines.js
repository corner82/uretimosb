$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());

//    console.log($('#pk').val());
    $('#loging_ph').empty();

    if ($('#pk').val()) {
        var loging_value = window.lang.translate('Log out');
    } else {
        var loging_value = window.lang.translate('Log in');
    }

    $('#loging_ph').append(loging_value);


    $('#reg_address_table').datagrid({
        onDblClickRow: function (index, row) {

        },
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
        queryParams: {
            url: 'pkFillAllCompanyMachineLists_infoFirmMachineTool',
            pk: $('#pk').val(),
            subject: 'datagrid'
                    /*machine_groups_id : null,
                     filterRules:null*/
        },
        width: '100%',
        singleSelect: true,
        pagination: true,
        collapsible: true,
        method: 'get',
        idField: 'firm_id',
        //toolbar:'#tb5',
        //fit:true,
        //fitColumns : true,
        remoteFilter: true,
        remoteSort: true,
        multiSort: false,
        columns: [[                
                {field: 'machine_tool_names', title: 'Machine Name', width: 200}, 
                {field: 'manufacturer_name', title: 'Manufacturer', width: 150, align: 'center'},
                {field: 'model', title: 'Model', width: 150, align: 'center'}  ,
                {field: 'firm_name', title: 'Firm Name', width: 200},                   
                {field: 'machine_tool_grup_names', title: 'Group', width: 150}, 
                {field: 'model_year', title: 'Year', width: 100, align: 'center'}, 
                {field: 'total', title: 'Number', width: 50, align: 'center'}                  
            ]]
    });
    $('#reg_address_table').datagrid('enableFilter');

});

