//SAVE=================================================================
$('#btnSave').click(function () {
   
    SaveRecords();
    
});

function SaveRecords() {
    var _username;
    var _password;
    var _confirm_password;
    
    _username = $('#ContentPlaceHolder1_lblUsername').val();
    _password = $('#txt_new').val();
    _confirm_password = $('#txt_confirm').val();
    
    if (_password != _confirm_password) {
        $('#div_msg').html('');
        $('#div_msg').html("<span style='color:red'>Password is not match...</span>");

        $("#div_msg").hide().fadeIn('slow'); //.slideDown();
        setTimeout(function () {
            $("#div_msg").fadeOut('slow');
        }, 10000);

    }
    else if (_password == "123456" || _password == "12345" || _password == "1234" || _password == "123") {
        $('#div_msg').html('');
        $('#div_msg').html("<span style='color:red'>Password is not valid...</span>");

        $("#div_msg").hide().fadeIn('slow'); //.slideDown();
        setTimeout(function () {
            $("#div_msg").fadeOut('slow');
        }, 10000);
    }
    else {
        $.ajax({
            type: "POST",
            url: "masterfile.asmx/Password_Changed",
            data: "{'_username':'" + _username + "', '_password':'" + _password + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {
                    $('#div_msg').html('');
                    $('#div_msg').html(data.d);

                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                        window.location = "home.aspx";
                    }, 3000);


                }
            }
        })
    }

};