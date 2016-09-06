var Masking = function () {

    return {
        //Masking
        
        
        initMasking: function () {
            $("#date1").mask('99/99/9999', {placeholder: 'X'});
            $("#phone").mask('(999) 999-9999', {placeholder: 'X'});
            $("#card").mask('9999-9999-9999-9999', {placeholder: 'X'});
            $("#serial").mask('***-***-***-***-***-***', {placeholder: '_'});
            $("#tax").mask('99-9999999', {placeholder: 'X'});
                        
            /*
             * User form masks
             * @author: Bahram Lotfi Sadigh
             * @since: 2016.1.21
             * 
             */
            
            /*
             * Post code masks
             */
//            $("#userPostalCode").mask('99999', {placeholder: 'X'});
            
            /*
             * Phone number masks
             */
            $("#userPhone").mask('(999) 999-9999', {placeholder: 'X'});
            $("#userGSM").mask('(999) 999-9999', {placeholder: 'X'});
            $("#userFax").mask('(999) 999-9999', {placeholder: 'X'}); 
            $("#contactNumber").mask('(0999) 999-9999', {placeholder: 'X'});
            
            /*
             * Id numbers masks
             */
            $("#userIdNumber").mask('99999999999', {placeholder: 'X'}); 
            
            
            /*
             * DUNS numbers masks
             */
            $("#companyDUNSNumber").mask('99-999-9999', {placeholder: 'X'}); 
            
            /*
             * Data Masks
             */
            $("#companyFoundationDate").mask('9999/99/99', {placeholder: 'X'});
            
//            if(selectedCountry == 'Turkey'){
//                
//            }

            /*
             * Company form masks
             * @author: Bahram Lotfi Sadigh
             * @since: 2016.1.21
             * 
             */


            $("#companyTaxNumber").mask('9999999999', {placeholder: 'X'});
                        
//            if (selectedCountry == 'Turkey') {
              
//            }
        }

    };

}();