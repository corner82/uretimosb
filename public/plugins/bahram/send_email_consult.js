
function send_email_to_consult(element) {
    var title_text = window.lang.translate('Message to Page Consultant') + " (" + $("#" + element.id).attr('page_consultant') + ")";

    BootstrapDialog.show({
        title: title_text,
        message: $('<textarea class="form-control" placeholder="' + window.lang.translate('Write your message to the consultant...') + '"></textarea>'),
        buttons: [{
                label: window.lang.translate('Send Message'),
                cssClass: 'btn-primary',
                hotkey: 13, // Enter.
                action: function () {

                    var email_address = $('#' + element.id).attr('email_address');
//                    console.log(email_address);
                    var data = {
//                        name: $("#form_name").val(),
//                        email: $("#form_email").val(),
//                        message: $("#msg_text").val()
                        name: 'name',
                        email: 'bahram@ostimteknoloji.com.tr',
                        message: 'hello'
                    };

                    $.ajax({
                        type: "POST",
                        url: "../../../../plugins/bahram/mail_sender.php",
                        data: data,
                        success: function () {
                            $('.success').fadeIn(1000);
                        }
                    });

                    return false;


                    sm.successMessage('show', window.lang.translate('Email Sending'), window.lang.translate('Your message has been sent to the consultant. System consultant will repsond you as sson as possible.'));
                }
            }]
    });
}