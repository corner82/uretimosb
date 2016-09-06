/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: 'Vazgeç',
    actionButtonLabel: 'İşleme devam et'});

function readURL(input) {
    if (input.files && input.files[0]) {


        var reader = new FileReader();
        var fake_reader = new FileReader();
        var uploadFile = input.files[0];
        var maxWidth = 300; // Max width for the image
        var maxHeight = 400; // Max height for the image
        var ratio = 3 / 4; // Used for aspect ratio
        var image_extension, image_size, image_width, image_height, image_ratio;

//        if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(uploadFile.name)) {
        if (!(/\.(png)$/i).test(uploadFile.name)) {

            image_extension = false;

            wm.warningMessage('resetOnShown');
            wm.warningMessage('show',
                    window.lang.translate('File Extension Probem'),
                    window.lang.translate('Please upload image with .png extension. Read example note...'));
        } else {
            image_extension = true;
        }

        if (uploadFile.size > 3000000) { // 3mb
            //common.notifyError('Please upload a smaller image, max size is 3 MB');
            image_size = false;

            wm.warningMessage('resetOnShown');
            wm.warningMessage('show',
                    window.lang.translate('File size is too big'),
                    window.lang.translate('Image file size should not exceed 3 Mbs. Read example note...'));
        } else {
            image_size = true;
        }

        /*
         * Create a fake photo placeholder (#company_logo_fake) with a class of (.fake_image_ph)to catch 
         * photo and check sizes
         */

        fake_reader.onload = function (event) {
            $('.fake_image_ph').attr('src', event.target.result);
            var theImage = new Image();
            theImage.src = $('.fake_image_ph').attr('src');
            // Get accurate measurements from that.
            var imageWidth = theImage.width;
            var imageHeight = theImage.height;
            console.log(imageWidth + " x " + imageHeight);

            if (imageWidth > maxWidth) {
                image_width = false;
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show',
                        window.lang.translate('Image size exceeds limits'),
                        window.lang.translate('Image maximum size should not be bigger than 300 pixels x 400 pixels. Minimum required resolution is 300 dpi.'));
            } else {
                image_width = true;
            }

            if (imageHeight > maxHeight) {
                image_height = false;
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show',
                        window.lang.translate('Image size exceeds limits'),
                        window.lang.translate('Image maximum size should not be bigger than 300 pixels x 400 pixels. Minimum required resolution is 300 dpi. Please note that image ration should be 3x4'));
            } else {
                image_height = true;
            }

            if ((imageWidth / imageHeight) / ratio !== 1) {
                image_ratio = false;
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show',
                        window.lang.translate('Image ratio problem'),
                        window.lang.translate('Please provide an image with a ratio of 3x4'));
            } else {
                image_ratio = true;
            }

            if (image_extension === true
                    && image_size === true
                    && image_width === true
                    && image_height === true
                    && image_ratio === true) {

                $('#file_input').text("Uploading " + uploadFile.name);
                reader.onload = function (e) {
                    $('.image_ph').attr('src', e.target.result).show();
                    $('#file_input').text(uploadFile.name);
                };
                reader.readAsDataURL(uploadFile);

            }            
        };
        fake_reader.readAsDataURL(uploadFile);
    }
}

$("#file_input").change(function () {
    readURL(this);
});

   