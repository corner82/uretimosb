
$(document).ready(function () {


    $.ajax({
        url: 'https://proxy.uretimosb.com/SlimProxyBoot.php',
        data: {
            url: 'pkcpkGetAllFirmCons_sysOsbConsultants',
            language_code: $("#langCode").val(),
            pk: $('#pk').val(),
            cpk: $('#cpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            
//            console.log(data);
            if (data.length !== 0) {

                for (var i = 0; i < data.length; i++) {
                    var firm_consultant;
                    var cons_image_url = "https://" + window.location.hostname + "/onyuz/standard/assets/img/sfClients/" + data[i].cons_picture;
                    if (data[i].communications_no) {
                        var tel_number = data[i].communications_no;
                    } else {
                        var tel_number = '';
                    }

                    if (data[i].attributes.firm_consultant) {
                        firm_consultant =
                                "<br/><strong>"
                                + window.lang.translate("Assigned Firm Consultant")
                                + "</strong></p>";
                    } else {
                        firm_consultant = "</p>";
                    }

                    var appending_html =
                            "<li id='"
                            + "consultant_" +
                            i
                            + "' email_address='"
                            + data[i].auth_email
                            + "' page_consultant='"
                            + data[i].name + " " + data[i].surname
                            + "' onclick='send_email_to_consult(this)'><!-- start consultant -->"
                            + "<a href='#'>"
                            + "<div class='pull-left'>"
                            + "<img src='"
                            + cons_image_url
                            + "' class='img-circle' alt='User Image'/>"
                            + "</div>"
                            + "<h4>"
                            + data[i].name + " " + data[i].surname
                            + "</h4>"
                            + "<p>"
                            + data[i].title
                            + firm_consultant
                            + "</a>"
                            + "</li><!-- end message -->";
                    $('#list_consultants').append(appending_html);
                }
                $('#number_of_consultants').empty();
                $('#number_of_consultants_power').empty();
                $('#number_of_consultants').append(i + " " + window.lang.translate('Consultants'));
                $('#number_of_consultants_power').append(i);
            } else {
                console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"consultants" servis hatasÃ„Â±->' + textStatus);
        }
    });

});