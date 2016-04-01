function LoadRecords() {

    LoadDropDown("#ContentPlaceHolder1_DDUOMFrom");
    LoadDropDown("#ContentPlaceHolder1_DDUOMTo");

    $.ajaxSetup({
        cache: false
    });

    var sub;
    var sub_data;

    var _search;
    _search = $("#txtsearch").val();;
   
    sub = "GetTableData";
    sub_data = "f5";
    
    var table = $('#tbl_Conversion').DataTable({
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
        "sAjaxSource": "masterfile.asmx/" + sub,
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
                    $("#tbl_Conversion").show();
                    $(".dataTables_scrollBody th").removeAttr('class');
                },
                error: function (xhr, textStatus, error) {
                    if (typeof console == "object") {
                        console.log(xhr.status + "," + xhr.responseText + "," + textStatus + "," + error);
                    }
                }
            });
        },
        "aaSorting": [[2, 'asc']]

    });

    $('#tbl_Conversion tbody').on('click', 'tr', function () {

        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        select_code(this.cells[0].innerHTML, this.cells[1].innerHTML, this.cells[2].innerHTML);
        $('#ContentPlaceHolder1_hidden_entry_new').val("");
    });

};

function LoadDropDown(_obj) {
    
    $.ajax({
        type: "POST",
        url: "masterfile.asmx/BindInventoryDropdownlist",
        data: "{'_obj': '" + _obj + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $(_obj).empty();

            var jsdata = JSON.parse(data.d);
            $.each(jsdata, function (key, value) {
                $(_obj).append($("<option></option>").val(value.Code).html(value.Descs));
            });

                   
        }//,
        //error: function (data) {
          //  alert("error found");
        //}
    });

    
};

function SaveRecords() {
    
    var _factor= $('#ContentPlaceHolder1_txtFactor').val();
    var _uom_from = $("#ContentPlaceHolder1_DDUOMFrom option:selected").val();
    var _uom_to = $("#ContentPlaceHolder1_DDUOMTo option:selected").val();
    var _new_entry = $('#ContentPlaceHolder1_hidden_entry_new').val();
 
    sub = "Save_Masterfile_UOM";
    sub_data = '{"_uom_from":"' + _uom_from +
            '", "_uom_to":"' + _uom_to +
            '", "_factor": "' + _factor +
            '", "xhidden_entry": "' + _new_entry + 
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

    $("#txtsearch").val("")
    $('#ContentPlaceHolder1_txtFactor').removeAttr('disabled');
    $("#ContentPlaceHolder1_DDUOMFrom").attr('disabled', false);
    $("#ContentPlaceHolder1_DDUOMTo").attr('disabled', false);
 
};

function disable_Form() {

        $('#ContentPlaceHolder1_txtFactor').attr('disabled', true);
        $("#ContentPlaceHolder1_DDUOMFrom").attr('disabled', true);
        $("#ContentPlaceHolder1_DDUOMTo").attr('disabled', true);
       
        $('#btnAdd').disable(false);
        $('#btnSave').disable(true);
        $('#btnCancel').disable(true);

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

function select_code(_uom_from, _uom_to, _factor) {
    
    $("#txtsearch").val("")
    $('#ContentPlaceHolder1_txtFactor').removeAttr('disabled');
    //$("#ContentPlaceHolder1_DDUOMFrom").attr('disabled', false);
    //$("#ContentPlaceHolder1_DDUOMTo").attr('disabled', false);

  
    setDropDownList(document.getElementById('ContentPlaceHolder1_DDUOMFrom'), _uom_from);
    setDropDownList(document.getElementById('ContentPlaceHolder1_DDUOMTo'), _uom_to);
    $('#ContentPlaceHolder1_txtFactor').val(_factor)

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