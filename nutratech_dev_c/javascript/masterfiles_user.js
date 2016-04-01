function LoadRecords() {

    $.ajaxSetup({
        cache: false
    });

    var sub;
    var sub_data;

    var _search;
    _search = $("#txtsearch").val();;
   
    sub = "GetTableData";
    sub_data = "f3";
    


    var table = $('#tbl_MFUser').DataTable({
        "bLengthChange": false,
        "responsive": true,
        "filter": false,
        "pagingType": "simple_numbers",
        "orderClasses": false,
        "order": [[0, "asc"]],
        "info": false,
        "scrollY": "400px",
        "scrollX": true,
        "scrollCollapse": true,
        "bProcessing": true,
        "bServerSide": true,
        "bDestroy": true,
        "sAjaxSource": "masterfile.asmx/GetTableData",
        "fnServerData": function (sSource, aoData, fnCallback) {
            aoData.push({ "name": "roleId", "value": "admin" });
            aoData.push({ "name": "parmsVals", "value": sub_data + "," + _search });
            $.ajax({
                "dataType": 'json',
                "contentType": "application/json; charset=utf-8",
                "type": "GET",
                "url": sSource,
                "data": aoData,
                "success": function (msg) {
                    var json = jQuery.parseJSON(msg.d);
                    fnCallback(json);
                    $("#tbl_MFUser").show();
                    $(".dataTables_scrollBody th").removeAttr('class');
                },
                error: function (xhr, textStatus, error) {
                    if (typeof console == "object") {
                        console.log(xhr.status + "," + xhr.responseText + "," + textStatus + "," + error);
                    }
                }
            });
        },
        "columns": [
                    { "type": "string" },
                    { "type": "string" },
                    { "type": "string" },
                    { "type": "string" },
                    { "type": "string" }
                    ]

    });

    $('#tbl_MFUser tbody').on('click', 'tr', function () {

        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        select_code(this.cells[0].innerHTML, this.cells[4].innerHTML);
    });

};


function SaveRecords() {
    var _username;
    var _firstname;
    var _lastname;
    var _middlename;
    var _suffix;
    var _employeeid;
    var _dept;
    var _group;
    var _level;
    var _password;
    var _status;

    _username = $('#ContentPlaceHolder1_txtUsername').val();
    _firstname = $('#ContentPlaceHolder1_txtUserFName').val();
    _lastname = $('#ContentPlaceHolder1_txtUserLName').val();
    _middlename = $('#ContentPlaceHolder1_txtUserMName').val();
    _suffix = $("#ContentPlaceHolder1_DDUserSuffix option:selected").val();
    _employeeid = $('#ContentPlaceHolder1_txtUserEmployeeID').val();
    _dept = $("#ContentPlaceHolder1_DDUserDepartment option:selected").val();
    _group = $("#ContentPlaceHolder1_DDUserGroupAccess option:selected").val();
    _level = $("#ContentPlaceHolder1_DDUserAccessLevel option:selected").val();
    _password = $('#ContentPlaceHolder1_RBUserResetPassword input:checked').val();
    _status = $('#ContentPlaceHolder1_RBUserStatus input:checked').val();
    _new_entry = $('#ContentPlaceHolder1_hidden_entry_new').val();
    
        sub = "Save_Masterfile_User";
        sub_data = '{"_username":"' + _username + 
            '", "_firstname":"' + _firstname + 
            '", "_lastname":"' + _lastname + 
            '", "_middlename":"' + _middlename + 
            '", "_suffix":"' + _suffix + 
            '", "_employeeid":"' + _employeeid + 
            '", "_dept":"' + _dept + 
            '", "_group":"' + _group + 
            '", "_password":"' + _password + 
            '", "_status":"' + _status + 
            '", "xhidden_entry":"' + _new_entry +
            '", "_level":"' + _level +
            '"}';
    
    $.ajax({
        type: "POST",
        url: "masterfile.asmx/" + sub,
        data: sub_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data.d != null) {
                $('#div_msg').html('');
                $('#div_msg').html(data.d);

                $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                setTimeout(function () {
                    $("#div_msg").fadeOut('slow');
                }, 10000);

                LoadRecords();
            }

            //else { window.location = "logout.aspx" }
        }//,
        //error: function (xhr, err) {
        //  $('#div_msg').html(xhr.responseText);
        // window.location = "GoogleLogout.aspx";
        //}
    })

};

function enable_Form() {

    var activeViewIndex = $("#ContentPlaceHolder1_hidden_active_form").val();
   
    $("#txtsearch").val("")

        if (activeViewIndex == 1) {

        $('#ContentPlaceHolder1_txtUserFName').removeAttr('disabled');
        $('#ContentPlaceHolder1_txtUserMName').removeAttr('disabled');
        $('#ContentPlaceHolder1_txtUserLName').removeAttr('disabled');
        $('#ContentPlaceHolder1_txtUserEmployeeID').removeAttr('disabled');
        $('#ContentPlaceHolder1_txtUsername').removeAttr('disabled');

        $('#ContentPlaceHolder1_txtUserEmployeeID').removeAttr('readonly');
        $('#ContentPlaceHolder1_txtUsername').removeAttr('readonly');

        $('#ContentPlaceHolder1_RBUserResetPassword').find('*').each(function () {
            $(this).removeAttr("disabled");
        });
        $('#ContentPlaceHolder1_RBUserStatus').find('*').each(function () {
            $(this).removeAttr("disabled");
        });

        $("#ContentPlaceHolder1_DDUserSuffix").attr('disabled', false);
        $("#ContentPlaceHolder1_DDUserDepartment").attr('disabled', false);
        $("#ContentPlaceHolder1_DDUserGroupAccess").attr('disabled', false);
        $("#ContentPlaceHolder1_DDUserAccessLevel").attr('disabled', false);

        $('#ContentPlaceHolder1_txtUserFName').val("");
        $('#ContentPlaceHolder1_txtUserMName').val("");
        $('#ContentPlaceHolder1_txtUserLName').val("");
        $('#ContentPlaceHolder1_txtUserEmployeeID').val("");
        $('#ContentPlaceHolder1_txtUsername').val("");

        $('#ContentPlaceHolder1_RBUserResetPassword [type=radio][value=' + 0 + ']').prop('checked', true);
        $('#ContentPlaceHolder1_RBUserStatus [type=radio][value=' + 1 + ']').prop('checked', true);

        $("#ContentPlaceHolder1_DDUserSuffix option:selected").val("");
    
    }

};

function disable_Form() {

    var activeViewIndex = $("#ContentPlaceHolder1_hidden_active_form").val();
        if (activeViewIndex == 1) {

        $('#ContentPlaceHolder1_txtUserFName').attr('disabled', true);
        $('#ContentPlaceHolder1_txtUserMName').attr('disabled', true);
        $('#ContentPlaceHolder1_txtUserLName').attr('disabled', true);
        $('#ContentPlaceHolder1_txtUserEmployeeID').attr('disabled', true);
        $('#ContentPlaceHolder1_txtUsername').attr('disabled', true);


        $('#ContentPlaceHolder1_RBUserResetPassword').find('*').each(function () {
            $(this).attr("disabled", true);
        });
        $('#ContentPlaceHolder1_RBUserStatus').find('*').each(function () {
            $(this).attr("disabled", true);
        });

        $("#ContentPlaceHolder1_DDUserSuffix").attr('disabled', true);
        $("#ContentPlaceHolder1_DDUserDepartment").attr('disabled', true);
        $("#ContentPlaceHolder1_DDUserGroupAccess").attr('disabled', true);
        $("#ContentPlaceHolder1_DDUserAccessLevel").attr('disabled', true);
        $('#ContentPlaceHolder1_hidden_entry_new').val("");

    }
};

//ADD==================================================================
$('#btnAdd').click(function () {
    jQuery.fn.extend({
        disable: function (state) {
            return this.each(function () {
                var $this = $(this);
                $this.toggleClass('disabled', state);
            });
        }
    });

    $('#btnAdd').disable(true);
    $('#btnSave').disable(false);
    $('#btnCancel').disable(false);

    $('#ContentPlaceHolder1_hidden_entry_new').val("new");
    enable_Form();

});

//SAVE=================================================================
$('#btnSave').click(function () {
    jQuery.fn.extend({
        disable: function (state) {
            return this.each(function () {
                var $this = $(this);
                $this.toggleClass('disabled', state);
            });
        }
    });


    $('#btnAdd').disable(false);
    $('#btnSave').disable(true);
    $('#btnCancel').disable(true);

    SaveRecords();
    disable_Form();



});

//CANCEL==================================================================
$('#btnCancel').click(function () {
    jQuery.fn.extend({
        disable: function (state) {
            return this.each(function () {
                var $this = $(this);
                $this.toggleClass('disabled', state);
            });
        }
    });

    $('#btnAdd').disable(false);
    $('#btnSave').disable(true);
    $('#btnCancel').disable(true);

    disable_Form();

});

function select_code(username, status) {
    if (status == "Active") {
        status = 1;
    }
    else {
        status = 0;
    }

    $("#txtsearch").val("")
    $('#ContentPlaceHolder1_txtUserFName').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtUserMName').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtUserLName').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtUserEmployeeID').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtUsername').removeAttr('disabled');
    
    $('#ContentPlaceHolder1_RBUserResetPassword').find('*').each(function () {
        $(this).removeAttr("disabled");
    });
    $('#ContentPlaceHolder1_RBUserStatus').find('*').each(function () {
        $(this).removeAttr("disabled");
    });

    $("#ContentPlaceHolder1_DDUserSuffix").attr('disabled', false);
    $("#ContentPlaceHolder1_DDUserDepartment").attr('disabled', false);
    $("#ContentPlaceHolder1_DDUserGroupAccess").attr('disabled', false);
    $("#ContentPlaceHolder1_DDUserAccessLevel").attr('disabled', false);

    $.ajax({
        type: "POST",
        url: "masterfile.asmx/_searchuser",
        data: "{'_username':'" + username + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data.d != null) {
                var _username;
                var _firstname;
                var _lastname;
                var _middlename;
                var _suffix;
                var _employeeid;
                var _dept;
                var _group;
                var _level;

                var _return = data.d;

                _return.indexOf(",");

                _username = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_username + ",", "");

                _firstname = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_firstname + ",", "");

                _lastname = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_lastname + ",", "");

                _middlename = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_middlename + ",", "");

                _suffix = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_suffix + ",", "");

                _employeeid = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_employeeid + ",", "");

                _dept = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_dept + ",", "");

                _group = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_group + ",", "");

                _level = _return//.substring(0, _return.indexOf(","));

                $('#ContentPlaceHolder1_txtUserFName').val(_firstname);
                $('#ContentPlaceHolder1_txtUserMName').val(_middlename);
                $('#ContentPlaceHolder1_txtUserLName').val(_lastname);
                $('#ContentPlaceHolder1_txtUserEmployeeID').val(_employeeid);
                $('#ContentPlaceHolder1_txtUsername').val(_username);

                $('#ContentPlaceHolder1_RBUserResetPassword [type=radio][value=' + 0 + ']').prop('checked', true);
                $('#ContentPlaceHolder1_RBUserStatus [type=radio][value=' + status + ']').prop('checked', true);

                setDropDownList(document.getElementById('ContentPlaceHolder1_DDUserSuffix'), _suffix);
                setDropDownList(document.getElementById('ContentPlaceHolder1_DDUserDepartment'), _dept);
                setDropDownList(document.getElementById('ContentPlaceHolder1_DDUserGroupAccess'), _group);
                setDropDownList(document.getElementById('ContentPlaceHolder1_DDUserAccessLevel'), _level);
                
            }

            //else { window.location = "logout.aspx" }
        }//,
        //error: function (xhr, err) {
        //  $('#div_msg').html(xhr.responseText);
        // window.location = "GoogleLogout.aspx";
        //}
    })

    $('#ContentPlaceHolder1_txtUserEmployeeID').attr('readonly', true);
    $('#ContentPlaceHolder1_txtUsername').attr('readonly', true);

    jQuery.fn.extend({
        disable: function (state) {
            return this.each(function () {
                var $this = $(this);
                $this.toggleClass('disabled', state);
            });
        }
    });


    $('#btnAdd').disable(true);
    $('#btnSave').disable(false);
    $('#btnCancel').disable(false);

};

function setDropDownList(elementRef, valueToSetTo) {
    var isFound = false;


    for (var i = 0; i < elementRef.options.length; i++) {
        if (elementRef.options[i].value == valueToSetTo) {
            elementRef.options[i].selected = true;
            isFound = true;
        }
    }
}