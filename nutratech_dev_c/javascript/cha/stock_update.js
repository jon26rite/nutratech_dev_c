var webservicepath = "masterfile.asmx";
var oTable;



$(document).ready(function () {
    addNewInputType();
    InitTable();
    table_slider();

    $("#ContentPlaceHolder1_DD_Po_No").select2({
        containerCssClass: 'tpx-select2-container',
        dropdownCssClass: 'tpx-select2-drop'
    });

    $("#ContentPlaceHolder1_DD_RR_No").select2({
        containerCssClass: 'tpx-select2-container',
        dropdownCssClass: 'tpx-select2-drop'
    });

    $("#ContentPlaceHolder1_DD_Control_No").select2({
        containerCssClass: 'tpx-select2-container',
        dropdownCssClass: 'tpx-select2-drop'
    });

    $("select[id*='DD_Po_No']").bind("change", function () {
            oTable.api().ajax.reload();
    });
    $("select[id*='DD_RR_No']").bind("change", function () {
            oTable.api().ajax.reload();
    });
    $("select[id*='DD_Control_No']").bind("change", function () {
            oTable.api().ajax.reload();
    });

    $('#btnViewReport').on('click', function () {

            var queryString = {
                company_cd: $('#DD_UserCompany option:selected').val(),
                item_category_cd: $('#ContentPlaceHolder1_DD_Item_Category option:selected').val(),
                //  months: monthsArray,
                as_of_date: $('#date').val(),
                report_details: $('#ContentPlaceHolder1_DD_Report_Details option:selected').val(),
                item_category_descs : $('#ContentPlaceHolder1_DD_Item_Category option:selected').text()
            }

            var values = { values: queryString };
            $.ajax({
                type: "POST",
                url: webservicepath + "/isRecordsValid",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //async: false,
                data: JSON.stringify(values),
                success: function (response) {
                    var p = $.param(queryString)
                    window.open("CostingReportViewer.aspx?" + p, "_parent", "width=1020,height=600,scrollbars=yes");
                    $('#ViewReportModal').modal('hide');
                },
                error: function (msg) {
                    $('#error-title').text("Status (Code:" + msg.status + ")");
                    $('#error-msg').text(msg.statusText);
                    $('#ErrorModal').modal('show');
                    return 0;
                }
            });
    });


    $('#btn_Report').on('click', function () {
            $('#ViewReportModal').modal('show');
    });

    var today = new Date();
    $('#date').datepicker({
        maxDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        yearRange: '-5:+20'
    });
});

//add new input type in the editable plugin
function addNewInputType() {
    $.editable.addInputType('numeric', {
        element: function (settings, original) {
            var input = $('<input type="number" step="any"/>');
            if (settings.width != 'none') { input.width(settings.width); }
            if (settings.height != 'none') { input.height(settings.height); }
            input.attr('autocomplete', 'off');
            $(this).append(input);
            return (input);
        }
    });
}

function InitTable() {
    var disableConfirmation;

    oTable = $('#tbl_stock_card').dataTable({
        "bStateSave": false,
        "bLengthChange": false,
        "filter": false,
        "responsive": true,
        "pagingType": "simple_numbers",
        "orderClasses": false,
        "info": false,
        //  "scrollY": "400px",
        "scrollY": "300px",
        "scrollX": "100%",
        // "scrollCollapse": false,
        "scrollCollapse": false,
        "bProcessing": true,
        "bPaginate": true,
        "bDestroy": true,
        "bServerSide": false,
        "bAutoWidth": false,
        "sAjaxSource": webservicepath + "/GetTableData_Cost",
        "fnServerData": function (sSource, aoData, fnCallback) {

            var poNo = $('#ContentPlaceHolder1_DD_Po_No option:selected').val();
            var receivingReceipt = $('#ContentPlaceHolder1_DD_RR_No option:selected').val();
            var controlNo = $('#ContentPlaceHolder1_DD_Control_No option:selected').val();
            var company_cd = $('#DD_UserCompany option:selected').val()

            $.ajax({
                "async":'false',
                "dataType": 'json',
                "contentType": "application/json; charset=utf-8",
                "type": "GET",
                "url": sSource,
                "data": params = {
                    po_no: JSON.stringify(poNo),
                    receiving_receipt: JSON.stringify(receivingReceipt),
                    control_no: JSON.stringify(controlNo),
                    company_cd: JSON.stringify(company_cd)
                },
                "success": function (msg) {
                    var json = jQuery.parseJSON(msg.d);
                    fnCallback(json);
                    var receipting_total = json.received_total;
                    var issuance_total = json.issuance_total;
                    $('#received_total').text(receipting_total).formatCurrency({
                        symbol: ""
                    });
                }
            })
        },

        "aoColumns": [
            {
                // "mDataProp": "inout_mode",
                "class": 'details-control',
                "orderable": false,
                "data": null,
                "sWidth": "5px",
                "sDefaultContent": '<img src="images/plus.png">'
            },
            {
                "mDataProp": "complete_item_cd", "sTitle": "Item Code",
                "sWidth": "100px"
            },
            { "mDataProp": "item_descs", "sTitle": "Item Description", "sWidth": "210px" },
            { "mDataProp": "qty", "sTitle": "Quantity", "sWidth": "60px" },
            { "mDataProp": "c_uom_conversion", "sTitle": "UOM", "sWidth": "60px" },
            { "mDataProp": "unit_cost", "sTitle": "Unit Cost", "sWidth": "60px" },
            { "mDataProp": "total_cost", "sTitle": "Total Cost", "sWidth": "60px" },
            { "mDataProp": "receiving_receipt", "sTitle": "RR No.", "sWidth": "60px" },
            { "mDataProp": "control_no", "sTitle": "Control No.", "sWidth": "60px" },
            { "mDataProp": "po_no", "sTitle": "PO No.", "sWidth": "60px" },
              { "mDataProp": "warehouse_name", "sTitle": "Warehouse", "sWidth": "150px" },
            { "mDataProp": "status", "sTitle": "Status", "sWidth": "100px" },
            { "mDataProp": "doc_no", "sTitle": "Document No.", "sWidth": "80px" },
            { "mDataProp": "doc_date", "sTitle": "Document Date", "sWidth": "80px" },
            { "mDataProp": "stk_descs", "sTitle": "Description", "sWidth": "100px" },
            { "mDataProp": "lot_no", "sTitle": "Lot No", "sWidth": "80px" },
            { "mDataProp": "mfg_date", "sTitle": "Mfg. Date", "sWidth": "80px" },
            { "mDataProp": "expiry_date", "sTitle": "Expiry Date", "sWidth": "80px" }
        ]
    }).makeEditable({
        "aoColumns": [
           null,
                null,   //item_cd
                null,   //item descs
                null,   //qty
                null,   //c uom conversion
                 {
                     indicator: 'Saving ...',
                     tooltip: 'Click to edit',
                     onsubmit: function (settings, original) {
                         disableConfirmation = true;//confirmation is disabled
                     },
                     callback: function (sValue, settings) {

                     },
                     onblur: 'cancel',
                     type: 'numeric',
                     sUpdateURL: function (value, settings) {
                         var sentObject = {};
                         var rowId = oTable.fnGetPosition(this)[0];
                         // var columnId = oTable.fnGetPosition(this)[2];
                         var rowData = oTable.fnGetData(rowId);
                         sentObject["value"] = value;
                         sentObject["rowData"] = rowData;
                         sentObject["byDocNo"] = 0;


                         if (disableConfirmation == true) {
                             if (UpdateData(sentObject) == 1) {
                                 return value;
                             }

                             else { return rowData.unit_cost; }
                         }
                         else {
                             alert("update is not allowed");
                             return rowData.unit_cost
                         }
                     }
                 }  //unit_cost
        ]
    });


}

function UpdateData(sentObject) {
   

    var DTO = {
        value : sentObject.value,
        selected_row: sentObject.rowData,
        by_doc_no : sentObject.byDocNo
    };



    $.ajax({
        type: "POST",
        url: webservicepath + "/UpdateStockCardUnitCost",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //async: false,
        data: JSON.stringify(DTO),
        success: function (response) {
            oTable.api().ajax.reload(null, false);
            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:green">Unit cost updated</span>');
            $("#div_msg").hide().fadeIn('slow');
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 5000);
            return 1;
        },
        error: function (msg) {
                $('#error-title').text("Status (Code:" +msg.status+")" );
                $('#error-msg').text(msg.statusText);
                $('#ErrorModal').modal('show');
            return 0;
        }
    });


}


function table_slider() {

    var iTableCounter = 1;
    var TableHtml;
    var oInnerTable;
    TableHtml = $("#iss").html();


    $('#tbl_stock_card tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = oTable.api().row(tr);
        var rowData = row.data();

        var receivingReceipt = rowData.receiving_receipt;
        var controlNo = rowData.control_no;
        var nTr = $(this).closest('tr');
        var nTds = this;
        var params = {selected_row:rowData
        }

        if (oTable.fnIsOpen(nTr)) {
            this.innerHTML = '<img src="images/plus.png">'
            oTable.fnClose(nTr);
        }

        //show slider
        else {
           
                this.innerHTML = '<img src="images/minus.png">'
                var rowIndex = oTable.fnGetPosition($(nTds).closest('tr')[0]);

                oTable.fnOpen(nTr, fnFormatDetails(iTableCounter, TableHtml), 'details');
                
                oInnerTable = $("#iss_" + iTableCounter).dataTable({

                    "bStateSave": false,
                    "bLengthChange": false,
                    "filter": false,
                    "responsive": true,
                    "orderClasses": false,
                    "info": false,
                    "scrollY": "200px",
                    "scrollX": "100%",
                    "scrollCollapse": true,
                    "bProcessing": true,
                    "bPaginate": false,
                    "bDestroy": true,
                    "bServerSide": false,
                    "bAutoWidth": false,
                    "sDom": 'rt',
                    "sAjaxSource": webservicepath + "/GetIssuanceList",
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        var receivingReceipt = $('#ContentPlaceHolder1_DD_RR_No option:selected').val();
                        var controlNo = $('#ContentPlaceHolder1_DD_Control_No option:selected').val();
                        $.ajax({
                            "dataType": 'json',
                            "contentType": "application/json; charset=utf-8",
                            "type": "POST",
                            "url": sSource,
                            "data":JSON.stringify(params) ,
                            "success": function (msg) {
                                var json = jQuery.parseJSON(msg.d);
                                fnCallback(json);
                            }
                        })
                    },
                    "fnDrawCallback": function (oSettings) {
                        // $(oSettings.nTHead).hide();
                    },

                    "aoColumns": [
                             {
                                 // "mDataProp": "inout_mode",
                                 "sWidth": "5px",
                                 "sClass": "control center",
                                 "sDefaultContent": ''
                             },
                    {
                        "mDataProp": "complete_item_cd", "sTitle": "Item Code",
                        "sWidth": "100px"
                    },
                    { "mDataProp": "item_descs", "sTitle": "Item Description", "sWidth": "210px" },
                        { "mDataProp": "qty", "sTitle": "Quantity", "sWidth": "60px" },
                    { "mDataProp": "c_uom_conversion", "sTitle": "UOM", "sWidth": "60px" },
                    { "mDataProp": "unit_cost", "sTitle": "Unit Cost", "sWidth": "60px" },
                    { "mDataProp": "total_cost", "sTitle": "Total Cost", "sWidth": "60px" },
                    { "mDataProp": "receiving_receipt", "sTitle": "RR No.", "sWidth": "60px" },
                    { "mDataProp": "control_no", "sTitle": "Control No.", "sWidth": "60px" },
                    { "mDataProp": "po_no", "sTitle": "PO No.", "sWidth": "60px" },
                     { "mDataProp": "warehouse_name", "sTitle": "Warehouse", "sWidth": "150px" },
                    { "mDataProp": "status", "sTitle": "Status", "sWidth": "100px" },
                    { "mDataProp": "doc_no", "sTitle": "Document No.", "sWidth": "80px" },
                    { "mDataProp": "doc_date", "sTitle": "Document Date", "sWidth": "80px" },
                    { "mDataProp": "stk_descs", "sTitle": "Description", "sWidth": "100px" },
                    { "mDataProp": "lot_no", "sTitle": "Lot No", "sWidth": "80px" },
                    { "mDataProp": "mfg_date", "sTitle": "Mfg. Date", "sWidth": "80px" },
                    { "mDataProp": "expiry_date", "sTitle": "Expiry Date", "sWidth": "80px" }
                    ]
                }).makeEditable({
                    "aoColumns": [
                       null,
                            null,   //item_cd
                            null,   //item descs
                            null,   //qty
                            null,   //c uom conversion
                             {
                                 indicator: 'Saving ...',
                                 tooltip: 'Click to edit',
                                 onsubmit: function (settings, original) {
                                     disableConfirmation = true;//confirmation is disabled
                                 },
                                 callback: function (sValue, settings) {

                                 },
                                 onblur: 'cancel',
                                 type: 'numeric',
                                 sUpdateURL: function (value, settings) {
                                     var sentObject = {};
                                     var rowId = oInnerTable.fnGetPosition(this)[0];
                                     // var columnId = oTable.fnGetPosition(this)[2];
                                     var rowData = oInnerTable.fnGetData(rowId);
                                     sentObject["value"] = value;
                                     sentObject["rowData"] = rowData;
                                     sentObject["byDocNo"] = 1;

                                     if (disableConfirmation == true) {
                                         if (UpdateData(sentObject) == 1) {
                                             return value;
                                         }

                                         else { return rowData.unit_cost; }
                                     }
                                     else {
                                         alert("update is not allowed");
                                         return rowData.unit_cost
                                     }
                                 }
                             }  //unit_cost
                    ]
                });
                iTableCounter = iTableCounter + 1;
            
           

        }
    });
}




function fnFormatDetails(table_id, html) {
    var sOut = "<p><b>Issuance:</b></p><table id=\"iss_" + table_id + "\" class=\"display table-bordered table-hover table-font\" >";

    sOut += html;
    sOut += "</table>";
    return sOut;
}
