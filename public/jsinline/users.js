$(document).ready(function () {


    // Left menuyu oluşturmak için çağırılan fonksiyon...
    //$.fn.leftMenuFunction();  
    
    $(".select2").select2();
    //Datemask dd/mm/yyyy
    $("#datemask").inputmask("dd/mm/yyyy", {"placeholder": "dd/mm/yyyy"});
    //Money Euro
    $("[data-mask]").inputmask();
    
});