function LoadRecords() {

    $.ajaxSetup({
        cache: false
    });

    var sub;
    var sub_data;

    var _search;
    _search = $("#txtsearch").val();
   
    sub = "GetTableData";
    sub_data = "f4";
    
    var table = $('#tbl_MFITem').DataTable({
        "bLengthChange": false,
        "responsive": true,
        "filter": false,
        "pagingType": "simple_numbers",
        "orderClasses": false,
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
                    $("#tbl_MFITem").show();
                    $(".dataTables_scrollBody th").removeAttr('class');
                },
                error: function (xhr, textStatus, error) {
                    if (typeof console == "object") {
                        console.log(xhr.status + "," + xhr.responseText + "," + textStatus + "," + error);
                    }
                }
            });
        },
        aoColumnDefs: [
            { "aTargets": [ 0 ], "bSortable": true },
            { "aTargets": [ 1 ], "bSortable": true },
            { "aTargets": [ 2 ], "bSortable": true },
            { "aTargets": [ 3 ], "bSortable": false }
        ],
        "columns": [
            { "type": "num" },
            { "type": "string" },
            { "type": "string" },
            { "type": "num" },
            { "type": "num" },
            { "type": "num" },
            { "type": "string" },
            { "type": "string" },
            { "type": "string" },
            { "type": "string" }
                ]

    });

    $('#tbl_MFITem tbody').on('click', 'tr', function () {

        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        select_code(this.cells[0].innerHTML, this.cells[8].innerHTML);
    });

};

$("select[id*='DD_ItemClass']").bind("change", function () {
    var _item_class_cd;
    _item_class_cd = $("#ContentPlaceHolder1_DD_ItemClass option:selected").val();
    LoadDropDown(_item_class_cd, "");
});

function LoadDropDown(_item_class_cd, _item_category_cd) {
    
    $.ajax({
        type: "POST",
        url: "masterfile.asmx/BindDropdownlist",
        data: "{'_class_cd': '"+ _item_class_cd  +"'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#ContentPlaceHolder1_DD_ItemCategory').empty();

            var jsdata = JSON.parse(data.d);
            $.each(jsdata, function (key, value) {
                $('#ContentPlaceHolder1_DD_ItemCategory').append($("<option></option>").val(value.Code).html(value.Descs));
            });

            if (_item_category_cd != "") {
                setDropDownList(document.getElementById('ContentPlaceHolder1_DD_ItemCategory'), _item_category_cd);
            }
            
        }//,
        //error: function (data) {
          //  alert("error found");
        //}
    });

    
};

function SaveRecords() {
    
    var _item_cd;
    var _descs;
    var _uom;
    var _item_type_cd;
    var _item_category_cd;
    var _remarks;
    var _standard_cost;
    var _latest_cost;
    var _item_weight;
    var _item_class_cd;
    var _status;
    var _new_entry;

    _item_cd = $('#ContentPlaceHolder1_txtItem_code').val();
    _descs = $('#ContentPlaceHolder1_txtItem_descs').val();
    _uom = $("#ContentPlaceHolder1_ddItem_UOM option:selected").val();
    _item_type_cd = $("#ContentPlaceHolder1_DD_ItemType option:selected").val();
    _item_category_cd = $("#ContentPlaceHolder1_DD_ItemCategory option:selected").val();
    _remarks = $('#ContentPlaceHolder1_txtItem_Remarks').val();
    _standard_cost = $('#ContentPlaceHolder1_txtItem_StandardCost').val();
    _latest_cost = $('#ContentPlaceHolder1_txtItem_LatestCost').val();
    _item_weight = $('#ContentPlaceHolder1_txtItem_Weight').val();
    _item_class_cd = $("#ContentPlaceHolder1_DD_ItemClass option:selected").val();
    _status = $('#ContentPlaceHolder1_RB_ItemStatus input:checked').val();
    _new_entry = $('#ContentPlaceHolder1_hidden_entry_new').val();

    sub = "Save_Masterfile_Item";
    sub_data = '{"_item_cd":"' + _item_cd +
            '", "_descs":"' + _descs +
            '", "_uom":"' + _uom +
            '", "_item_type_cd":"' + _item_type_cd +
            '", "_item_category_cd":"' + _item_category_cd +
            '", "_remarks":"' + _remarks +
            '", "_standard_cost":"' + _standard_cost +
            '", "_latest_cost":"' + _latest_cost +
            '", "_item_weight":"' + _item_weight +
            '", "_item_class_cd":"' + _item_class_cd +
            '", "_status":"' + _status + 
            '", "xhidden_entry":"' + _new_entry +
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

    if (activeViewIndex == 3) { 
        
        $('#ContentPlaceHolder1_txtItem_code').removeAttr('disabled');
        $('#ContentPlaceHolder1_txtItem_descs').removeAttr('disabled');
        $('#ContentPlaceHolder1_txtItem_Remarks').removeAttr('disabled');
        $('#ContentPlaceHolder1_txtItem_StandardCost').removeAttr('disabled');
        $('#ContentPlaceHolder1_txtItem_LatestCost').removeAttr('disabled');
        $('#ContentPlaceHolder1_txtItem_Weight').removeAttr('disabled');

        $('#ContentPlaceHolder1_RB_ItemStatus').find('*').each(function () {
            $(this).removeAttr("disabled");
        });

        $("#ContentPlaceHolder1_DD_ItemClass").attr('disabled', false);
        $("#ContentPlaceHolder1_ddItem_UOM").attr('disabled', false);
        $("#ContentPlaceHolder1_DD_ItemType").attr('disabled', false);
        $("#ContentPlaceHolder1_DD_ItemCategory").attr('disabled', false);

        $('#ContentPlaceHolder1_txtItem_code').val("");
        $('#ContentPlaceHolder1_txtItem_descs').val("");
        $('#ContentPlaceHolder1_txtItem_Remarks').val("");
        $('#ContentPlaceHolder1_txtItem_StandardCost').val("0");
        $('#ContentPlaceHolder1_txtItem_LatestCost').val("0");
        $('#ContentPlaceHolder1_txtItem_Weight').val("0");

        $('#ContentPlaceHolder1_RB_ItemStatus [type=radio][value=' + 1 + ']').prop('checked', true);

    }

};

function disable_Form() {
    jQuery.fn.extend({
        disable: function (state) {
            return this.each(function () {
                var $this = $(this);
                $this.toggleClass('disabled', state);
            });
        }
    });

    var activeViewIndex = $("#ContentPlaceHolder1_hidden_active_form").val();
    if (activeViewIndex == 3) {

        $('#ContentPlaceHolder1_txtItem_code').attr('disabled' , true);
        $('#ContentPlaceHolder1_txtItem_descs').attr('disabled', true);
        $('#ContentPlaceHolder1_txtItem_Remarks').attr('disabled', true);
        $('#ContentPlaceHolder1_txtItem_StandardCost').attr('disabled', true);
        $('#ContentPlaceHolder1_txtItem_LatestCost').attr('disabled', true);
        $('#ContentPlaceHolder1_txtItem_Weight').attr('disabled', true);

        $('#ContentPlaceHolder1_RB_ItemStatus').find('*').each(function () {
            $(this).attr("disabled", true);
        });

        $("#ContentPlaceHolder1_DD_ItemClass").attr('disabled', true);
        $("#ContentPlaceHolder1_ddItem_UOM").attr('disabled', true);
        $("#ContentPlaceHolder1_DD_ItemType").attr('disabled', true);
        $("#ContentPlaceHolder1_DD_ItemCategory").attr('disabled', true);

        $('#ContentPlaceHolder1_hidden_entry_new').val("");

        $('#btnAdd').disable(false);
        $('#btnSave').disable(true);
        $('#btnCancel').disable(true);
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

function select_code(_item_code, _item_category_descs) {
    
    $("#txtsearch").val("")
    //$('#ContentPlaceHolder1_txtItem_code').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtItem_descs').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtItem_Remarks').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtItem_StandardCost').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtItem_LatestCost').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtItem_Weight').removeAttr('disabled');

    $('#ContentPlaceHolder1_RB_ItemStatus').find('*').each(function () {
        $(this).removeAttr("disabled");
    });

    $("#ContentPlaceHolder1_DD_ItemClass").attr('disabled', false);
    $("#ContentPlaceHolder1_ddItem_UOM").attr('disabled', false);
    $("#ContentPlaceHolder1_DD_ItemType").attr('disabled', false);
    $("#ContentPlaceHolder1_DD_ItemCategory").attr('disabled', false);

    $.ajax({
        type: "POST",
        url: "masterfile.asmx/_searchitem",
        data: "{'_item_code':'" + _item_code + "','_item_category_descs':'" + _item_category_descs + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data.d != null) {
                var _item_cd;
                var _descs;
                var _uom;
                var _item_type_cd;
                var _item_category_cd;
                var _remarks;
                var _standard_cost;
                var _latest_cost;
                var _item_weight;
                var _item_class_cd;
                var _status;

                var _return = data.d;

                _item_cd = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_item_cd + ",", "");

                _descs = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_descs + ",", "");

                _uom = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_uom + ",", "");

                _item_type_cd = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_item_type_cd + ",", "");

                _item_category_cd = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_item_category_cd + ",", "");

                _remarks = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_remarks + ",", "");

                _standard_cost = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_standard_cost + ",", "");

                _latest_cost = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_latest_cost + ",", "");

                _item_weight = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_item_weight + ",", "");

                _item_class_cd = _return.substring(0, _return.indexOf(","));
                _return = _return.replace(_item_class_cd + ",", "");

                _status = _return//.substring(0, _return.indexOf(","));
                if (_status == "True") {
                    _status = 1;
                }
                else {
                    _status = 0;
                }

                $('#ContentPlaceHolder1_txtItem_code').val(_item_cd);
                $('#ContentPlaceHolder1_txtItem_descs').val(_descs);
                $('#ContentPlaceHolder1_txtItem_Remarks').val(_remarks);
                $('#ContentPlaceHolder1_txtItem_StandardCost').val(_standard_cost);
                $('#ContentPlaceHolder1_txtItem_LatestCost').val(_latest_cost);
                $('#ContentPlaceHolder1_txtItem_Weight').val(_item_weight);

                $('#ContentPlaceHolder1_RB_ItemStatus [type=radio][value=' + _status + ']').prop('checked', true);

                setDropDownList(document.getElementById('ContentPlaceHolder1_ddItem_UOM'), _uom);
                setDropDownList(document.getElementById('ContentPlaceHolder1_DD_ItemType'), _item_type_cd);
                setDropDownList(document.getElementById('ContentPlaceHolder1_DD_ItemClass'), _item_class_cd);
                LoadDropDown(_item_class_cd, _item_category_cd);
                

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