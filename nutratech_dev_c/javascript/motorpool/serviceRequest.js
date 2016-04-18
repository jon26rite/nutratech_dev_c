
var input_vehicle_id,
    input_driver_username,
    input_mileage,
    input_service_type,
    input_req_date,
    input_req_descs,
    input_action_taken,
    input_remarks,
    input_date_started,
    input_date_completed,
    input_audit_user,
    input_is_new_entry,
    buttonAdd,
    buttonSave,
    buttonCancel

$(document).ready(function () {
    initializeButtons();
    initializeBindings();
    initializeInput();
    loadDropDownList('#ContentPlaceHolder1_DD_vehicle_plate_number');
    loadDropDownList('#ContentPlaceHolder1_DD_driver_username');
    loadDropDownList('#ContentPlaceHolder1_DD_service_type');
})

var initializeBindings = function () {

    //initialize datatable
   // initTable();
    //initTableOnClick();

    //ADD=============================================================
    buttonAdd.click(function () {
        buttonAdd.disable(true);
        buttonSave.disable(false);
        buttonCancel.disable(false);
        enable_Form();
        input_is_new_entry = true;

        clear_form();
        //loadVehicleLogTable($("#ContentPlaceHolder1_DD_vehicle_plate_number option:selected").val());
    });

    //SAVE============================================================
    buttonSave.click(function () {
        console.log('button save is clicked!');
        saveServiceRequest();
        disable_form();
        //insertVehicleLog();
    });

    //CANCEL==========================================================
    buttonCancel.click(function () {
        disable_form();
    });

    //initialize datatable
    initTable();
    //initTableOnClick();


    $('#mileage').priceFormat({
        prefix: '',
        centsLimit: 0
    });

    var today = new Date();
    $('#req_date').datepicker({
        maxDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        yearRange: '-5:+20'
    });

    $('#date_started').datepicker({
        maxDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        yearRange: '-5:+20'
    });

    $('#date_completed').datepicker({
        maxDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        yearRange: '-5:+20'
    });

    $("#txtsearch").on("keyup", function () {
        delay(function () {
            initTable();
        }, 500);
    })
}

var initializeInput = function () {
    input_vehicle_id = $("#ContentPlaceHolder1_DD_vehicle_plate_number");
    input_driver_username = $("#ContentPlaceHolder1_DD_driver_username");
    input_mileage = $("#mileage");
    input_service_type = $("#ContentPlaceHolder1_DD_service_type");
    input_req_date = $("#req_date");
    input_req_descs = $("#req_descs");
    input_action_taken = $("#action_taken");
    input_remarks = $("#remarks"); 
    input_date_started = $("#date_started");
    input_date_completed = $("#date_completed");
    input_audit_user = $('#ContentPlaceHolder1_hidden_username');
    input_is_new_entry = true; 
}

var initializeButtons = function () {
    buttonAdd = $('#btnAdd');
    buttonSave = $('#btnSave');
    buttonCancel = $('#btnCancel');
}

var initTable = function () {

    var search = $('#txtsearch').val();
    console.log('the txtsearch is : ' + search);
    vTable = $('#T_Service_Request').dataTable({
        "autoWidth": true,
        "bLengthChange": false,
        "filter": false,
        "responsive": true,
        "pagingType": "simple_numbers",
        "orderClasses": false,
        "info": false,
        "scrollY": "400px",
        "scrollX": true,
        "scrollCollapse": true,
        "bProcessing": true,
        "bPaginate": true,
        "bDestroy": true,
        "bServerSide": true,
        "sAjaxSource": "masterfile.asmx/getServiceRequestDT",
        // "aaData": tblData,
        "fnServerData": function (sSource, aoData, fnCallback) {
            aoData.push({ "name": "roleId", "value": "admin" });
            aoData.push({ "name": "searchValue", "value": search });
            $.ajax({
                "dataType": 'json',
                "contentType": "application/json; charset=utf-8",
                "type": "GET",
                "url": sSource,
                "data": aoData,
                "success": function (msg) {
                    var json = jQuery.parseJSON(msg.d);
                    console.log("the data that comes bck from datatable is : " + JSON.stringify(msg));
                    fnCallback(json);
                }
            })
        },
       
        "aoColumns": [
            { "mDataProp": "vehicle_id", "sTitle": "Plate No.", "bSearchable": true },
            { "mDataProp": "mileage", "sTitle": "Mileage" },
            { "mDataProp": "driver_username", "sTitle": "Driver" },
            { "mDataProp": "service_type", "sTitle": "Service Type" },
            { "mDataProp": "request_date", "sTitle": "Request Date" },
            { "mDataProp": "request_descs", "sTitle": "Request Description" },
            { "mDataProp": "action_taken", "sTitle": "Action Taken" },
            { "mDataProp": "date_started", "sTitle": "Date Started" },
            { "mDataProp": "date_completed", "sTitle": "Date Completed" }
           
        ]
    });
}

var initTableOnClick = function () {
    vTable.on('click', 'tr', function () {
        input_is_new_entry = false;
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            vTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //disableInputFields();
        var rowData = vTable.api().rows('tr.selected').data()[0];
        viewTableRowData(rowData)
        update_form();
    });
}

jQuery.fn.extend({
    disable: function (state) {
        return this.each(function () {
            var $this = $(this);
            $this.toggleClass('disabled', state);
        });
    }
});

var loadDropDownList = function (obj) {
    var parameter = '{ Obj: "' + obj + '"}';
    ajaxHelper('masterfile.asmx/getDropDownListItems', 'POST',
                parameter).done(function (data) {
                    var datad = data.d;
                    $.each(datad, function (key, value) {
                        $(obj).append($("<option></option>").val(value.code).html(value.descs));
                    });
                    
                });
}

function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? data : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("the error is : " + jqXHR.responseText);
    });
}

var saveServiceRequest = function () {
    var vehicle_id = input_vehicle_id.val();
    var driver_username = input_driver_username.val();
    var mileage = input_mileage.val();
    var service_type = input_service_type.children("option:selected").text();
    var req_date = input_req_date.val();
    var req_descs = input_req_descs.val();
    var action_taken = input_action_taken.val();
    var remarks = input_remarks.val();
    var date_started = input_date_started.val();
    var date_completed = input_date_completed.val();
    var audit_user = input_audit_user.val();
    var is_new_entry = input_is_new_entry;

    var ServiceRequest = {
        vehicle_id: vehicle_id,
        driver_username: driver_username,
        mileage: Number(mileage.replace(/[^0-9\.]+/g, "")),
        service_type: service_type,
        request_date: req_date,
        request_descs: req_descs,
        action_taken: action_taken,
        remarks: remarks,
        date_started: date_started,
        date_completed: date_completed,
        audit_user: audit_user,
        is_new_entry: is_new_entry
    }

    var params = { ServiceRequest: ServiceRequest };

    console.log('the parameters of saveServiceRequest are : ' + JSON.stringify(params));
    ajaxHelper('masterfile.asmx/saveServiceRequest', 'POST', JSON.stringify(params)).done(function (data) {
        console.log('the received from insertVehicleLog data is : ' + JSON.stringify(data));
        if (data.d != '') {
            $('#div_msg').html('');
            $('#div_msg').html(data.d);

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);
        }
        initTable();
        //vTable.api().ajax.reload();
        //loadVehicleLogTable(vehicle_plate_no);
    });
    //clearFields();
}

function viewTableRowData(rowData) {
    if (rowData) {
        input_code.val(rowData.code)
        input_descs.val(rowData.descs)
    }
}

var enable_Form = function () {
    input_vehicle_id.removeAttr('disabled');
    input_driver_username.removeAttr('disabled');
    input_mileage.removeAttr('disabled');
    input_service_type.removeAttr('disabled');
    input_req_date.removeAttr('disabled');
    input_req_descs.removeAttr('disabled');
    input_action_taken.removeAttr('disabled');
    input_remarks.removeAttr('disabled');
    input_date_started.removeAttr('disabled');
    input_date_completed.removeAttr('disabled');
    //input_code.removeAttr('disabled');
    //input_descs.removeAttr('disabled');
    buttonAdd.removeClass('disabled');
    buttonAdd.disable(true);
};

var disable_form = function () {
    buttonAdd.disable(false);
    buttonSave.disable(true);
    buttonCancel.disable(true);

    input_vehicle_id.attr('disabled', true);
    input_driver_username.attr('disabled', true);
    input_mileage.attr('disabled', true);
    input_service_type.attr('disabled', true);
    input_req_date.attr('disabled', true);
    input_req_descs.attr('disabled', true);
    input_action_taken.attr('disabled', true);
    input_remarks.attr('disabled', true);
    input_date_started.attr('disabled', true);
    input_date_completed.attr('disabled', true);
}

var update_form = function () {
    buttonAdd.disable(true);
    buttonSave.disable(false);
    buttonCancel.disable(false);

    //input_code.attr('disabled', true);
    //input_descs.removeAttr('disabled');
}

var clear_form = function () {
    input_mileage.val(0);
    input_req_date.val('');
    input_req_descs.val('');
    input_action_taken.val('');
    input_remarks.val('');
    input_date_started.val('');
    input_date_completed.val('');
}

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();