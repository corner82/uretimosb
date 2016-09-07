$(document).ready(function () {

    /**
     * multilanguage plugin 
     * @type Lang
     */

//    window.lang = new Lang();
//    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
//    lang.init({
//        defaultLang: 'en'
//    });
//    lang.change($('#langCode').val());

});

/*
 * Language bar on top of page...
 * @author:Bahram
 * @Since: 2016.2.12
 */

$.ajax({
    url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
    data: {
        url: 'fillComboBox_syslanguage',
        language_code: $("#langCode").val()
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {
        if (data.length !== 0) {
            $.fn.multiLanguageBarSetter.defaults.requestUriTranslated = $("#requestUriRegulated").val();
            $.fn.multiLanguageBarSetter.defaults.langCode = $("#langCode").val();
            $.fn.multiLanguageBarSetter.defaults.basePath = 'ostim/sanalfabrika';
            $.fn.multiLanguageBarSetter.defaults.baseLanguage = 'tr';
            $(".languages").multiLanguageBarSetter(data);

        } else {
            console.error('"fillComboBox_syslanguage" servis datasÄ± boÅŸtur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"fillComboBox_syslanguage" servis hatasÄ±->' + textStatus);
    }
});

