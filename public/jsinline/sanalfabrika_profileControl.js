
(function ($) {
    /*
     * 
     * @type @exp;window@pro;location@pro;href
     * Left Menu authentication by pk
     */

    if ($('#pk').val() === '') {

        /*
         * Left menu links control 
         */
        $('#companyperformancemetersprofilelink').css('visibility', 'hidden');
        $('#companyperformancemetersprofilelink').remove();
        $('#companyprojectsprofilelink').css('visibility', 'hidden');
        $('#companyprojectsprofilelink').remove();
        $('#companycommentsprofilelink').css('visibility', 'hidden');
        $('#companycommentsprofilelink').remove();
        
        /*
         * Div Controls
         */

        $('#company_performance_div').css('visibility', 'hidden');
        $('#company_performance_div').remove();
        $('#customers_div').css('visibility', 'hidden');
        $('#customers_div').remove();
    }


}( jQuery ));