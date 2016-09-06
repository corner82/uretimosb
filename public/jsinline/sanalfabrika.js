$(document).ready(function () {
    
    /**
     * Multi language bar is being formed
     * @author Mustafa Zeynel Dağlı
     * @since 23/12/2015
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',              
        data: {
            //pk : '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url : 'fillComboBox_syslanguage',                          
            },
        method: "GET",
        //async: false,
        dataType: "json",
        success: function (data) {
            var data = data;
            
            $.fn.multiLanguageBarSetter.defaults.requestUriTranslated = $("#requestUriRegulated").val();
            $.fn.multiLanguageBarSetter.defaults.langCode = $("#langCode").val();
            $.fn.multiLanguageBarSetter.defaults.basePath = 'ostim/sanalfabrika';
            $.fn.multiLanguageBarSetter.defaults.baseLanguage = 'tr';
            $(".languages").multiLanguageBarSetter(data); 
            
        }   
    });  
    
    /**
     * widget usage for links opening in new tab
     * @author Mustafa Zeynel Dağlı
     * @since 29/12/2015
     */
    $('.js-newTab').linkOpenerInNewTab(); 
    
    /**
     * widget usage for links opening in new tab
     * @author Mustafa Zeynel Dağlı
     * @since 30/12/2015
     */
    $('.js-newTabClients').linkOpenerInNewTab();
    
    $('.js-sociaLinks').linkOpenerInNewTab(); 
});