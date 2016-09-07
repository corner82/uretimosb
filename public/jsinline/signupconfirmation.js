$(document).ready(function () {


var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});


/*
 * Show or hide password content
 * @author: Bahram Lotfi Sadigh
 * @Since: 2016.2.1
 * 
 */
window.showPassword = function() {

    if ($('#password').attr('type') === 'text') {
        $('#password').attr('type', 'password');
        $('#password_repeat').attr('type', 'password');
    } else {
        $('#password').attr('type', 'text');
        $('#password_repeat').attr('type', 'text');
    }
}

window.confirmPass = function() {
    if ($('#password').val() !== '') {
        if ($('#password').val() === $('#password_repeat').val()) {
            
            insertPassword();
            return true;
        } else {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show',
                "Oops"
//                  window.lang.translate("Oops")
                ,
                "Please check your password. Repeated password must be exactely similar to your provided password..."
//                  window.lang.translate("Please check your password. Repeated password must be exactely similar to your provided password...")
            );
            return false;
        }
    } else {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', "Oops"
//          window.lang.translate("Oops")
                ,
            "Please select a password..."
//          window.lang.translate("Please select a password...")
        );
        return false;
    }
}

window.insertPassword = function () {
    //alert('insert password');
     var loaderInsertBlock = $("#form-loading-image").loadImager();
     loaderInsertBlock.loadImager('appendImage');

     var password = $('#password').val();
     

     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.uretimosb.com/SlimProxyBoot.php',   
                     data : {
                         url:'setPersonPassword_infoUsers' ,
                         key : $("#key").val(),
                         password : password,
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Şifre Ekleme İşlemi Başarısız...', 
                                       'Şifre ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"setPersonPassword_infoUsers" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#userConformationForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Şifre Kayıt İşlemi Başarılı...', 
                                       'Şifre kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Firma Kayıt İşlemi Başarısız...', 
                                       'Firma kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"setPersonPassword_infoUsers" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Şifre Kayıt İşlemi Başarısız...', 
                                      'Şifre kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"setPersonPassword_infoUsers" servis hatası->'+data.errorInfo);
          },
          onError23502 : function (event, data) {
              wm.warningMessage('resetOnShown');
              wm.warningMessage('show', 
                                'Şifre Kayıt İşlemi Tamamlanmıştır!', 
                                'Şifrenizi değiştirmek için profil sayfanızdan şifre değiştirme isteği yollayınız!')
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#userConformationForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Şifre Kayıt İşlemi Başarısız...', 
                                       'Aynı şifre kaydı yapılmıştır, yeni bir şifre deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}


});