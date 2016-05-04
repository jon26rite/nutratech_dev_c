var webservicepath = "masterfile.asmx";

var oTable;
var iTableCounter = 1;
var options = [];
var minimal_view = false;
var inout_mode = "I";
var webservice_method = "/GetTableData_Cost";
$(document).ready(function () {

    

    addNewInputType();
    InitTable();
    table_slider();
    setDropDownCssClass();
    bindDropDownList();

    //new
    settingsConfiguration();
    defaultSettingsConf();

    $('#date').keyup(function () {
        var d = $(this).val() // get the current value of the input field.
        if (!isValidDate(d)) {
            $('#btnViewReport').addClass("disabled");
        } else {
            $('#btnViewReport').removeClass("disabled");
        }
    });


    $('#btnViewReport').on('click', function () {

        var queryString = {
            company_cd: $('#DD_UserCompany option:selected').val(),
            item_category_cd: $('#ContentPlaceHolder1_DD_Item_Category option:selected').val(),
            //  months: monthsArray,
            as_of_date: $('#date').val(),
            report_details: $('#ContentPlaceHolder1_DD_Report_Details option:selected').val(),
            item_category_descs: $('#ContentPlaceHolder1_DD_Item_Category option:selected').text(),
            hightlight: $('#ContentPlaceHolder1_HighLight option:selected').val()

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
        yearRange: '-5:+20',
        onSelect: function (d, i) {
            if (isValidDate(d)) {
                $('#btnViewReport').removeClass("disabled");
            }
        }
    });
});



function toggleMinimalView() {
    
    minimal_view = minimal_view ? false : true;
    inout_mode = (inout_mode == "I") ? "%" : "I";
    

    if (!minimal_view) {

        $('#dropdown_menus').show();
        $('#by_ref_no_dropdowns').hide();
        $('#li_show_hide_col').addClass("disabled");
        defaultSettingsConf();
        oTable.api().ajax.reload();
        return;
    }

    $('#dropdown_menus').hide();
    $('#by_ref_no_dropdowns').show();
    $('#li_show_hide_col').removeClass("disabled");
   
    oTable.api().ajax.reload();

}

function settingsConfiguration() {



    $('.dropdown-menu a').on('click', function (event) {

        var $target = $(event.currentTarget),
            val = $target.attr('data-value'),
            $inp = $target.find('input'),
            idx;

        if (val != 99) {
            if ((idx = options.indexOf(val)) > -1) {
                options.splice(idx, 1);
                $inp.prop('checked', false);
                fnHide(val, oTable);
            } else {
                options.push(val);
                $inp.prop('checked', true);
                fnShow(val, oTable);
            }
        }


        else {
            var checked = $inp.prop('checked');
            $inp.prop('checked', checked ? false : true);
            toggleMinimalView();
        }



        $(event.target).blur();


        return false;
    });

}

function fnShow(iCol, table) {
    var bVis = table.fnSettings().aoColumns[iCol].bVisible;
    table.fnSetColumnVis(iCol, true);
}

function fnHide(iCol, table) {
    var bVis = table.fnSettings().aoColumns[iCol].bVisible;
    table.fnSetColumnVis(iCol, false);

}
function fnShowHide(iCol, table) {
    var bVis = table.fnSettings().aoColumns[iCol].bVisible;
    table.fnSetColumnVis(iCol, bVis ? false : true);
}


function defaultSettingsConf() {
    options.length = 0;
    $('#by_ref_no_dropdowns').hide();
    for (i = 1; i <= 20; i++) {
        options.push("" + i + "");
        fnShow(i, oTable);
        $('#' + i).prop('checked', true);
    }
}


function bindDropDownList() {
    $("select[id*='DD_Po_No']").bind("change", function () {
        oTable.api().ajax.reload();
    });
    $("select[id*='DD_RR_No']").bind("change", function () {
        oTable.api().ajax.reload();
    });
    $("select[id*='DD_Control_No']").bind("change", function () {
        oTable.api().ajax.reload();
    });
    $("select[id*='DD_ByRefNo']").bind("change", function () {
        oTable.api().ajax.reload();
    });
}

function setDropDownCssClass() {
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

    $("#ContentPlaceHolder1_DD_ByRefNo").select2({
        containerCssClass: 'tpx-select2-container',
        dropdownCssClass: 'tpx-select2-drop'
    });
}


function isValidDate(dateString) {
    var regEx = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    return dateString.match(regEx) != null;
}

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
        "sAjaxSource": webservicepath + webservice_method,
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            if (minimal_view == true) {
                var cell0 = $(nRow).find("td").eq(0);
                var rowId = cell0.context._DT_RowIndex;
                var rowData = oTable.fnGetData(rowId);

                if (aData.unit_cost == 0) {
                    $(nRow).css('background-color', 'rgba(255, 224, 224, 0.68);')
                }

                if (rowData.inout_mode == "I") {
                    cell0[0].innerHTML = '<div><img title="Received" src="images/plus.png" ></div>'
                    cell0.removeClass('details-control')
                } else {
                    cell0[0].innerHTML = '<div><img title="Issuance" src="images/minus.png" ></div>'
                    cell0.removeClass('details-control')
                }
            }
            else {
                var cell = $(nRow).find("td").eq(5);
                var rowId = cell.context._DT_RowIndex;
                var rowData = oTable.fnGetData(rowId);

                if (aData.unit_cost == 0) {
                    $(nRow).css('background-color', 'rgba(255, 224, 224, 0.68);')
                }

                if (rowData.issuance_stat >= 1) {
                    var cell_value = rowData.unit_cost;
                    cell[0].innerHTML = '<div>' + cell_value + '<span class="icon-arrow-right"><img title="New issuance without unit cost" src="images/warn.png"></span></div>'
                }
            }


        },
        "fnServerData": function (sSource, aoData, fnCallback) {
            var poNo, receivingReceipt, controlNo, ref_no, company_cd;
            company_cd = $('#DD_UserCompany option:selected').val();

            if (!minimal_view) {
                poNo = $('#ContentPlaceHolder1_DD_Po_No option:selected').val();
                receivingReceipt = $('#ContentPlaceHolder1_DD_RR_No option:selected').val();
                controlNo = $('#ContentPlaceHolder1_DD_Control_No option:selected').val();
                ref_no = "%%";
               
            } else {
                poNo = "%%";
                receivingReceipt = "%%";
                controlNo = "%%";
                ref_no = $('#ContentPlaceHolder1_DD_ByRefNo option:selected').val();
               
            }
           
            
            $.ajax({
                "async": true,
                "dataType": 'json',
                "contentType": "application/json; charset=utf-8",
                "type": "GET",
                "url": sSource,
                "data": params = {
                    po_no: JSON.stringify(poNo),
                    receiving_receipt: JSON.stringify(receivingReceipt),
                    control_no: JSON.stringify(controlNo),
                    company_cd: JSON.stringify(company_cd),
                    inout_mode: JSON.stringify(inout_mode),
                    ref_no: JSON.stringify(ref_no)
                },
                "success": function (msg) {
                    var json = jQuery.parseJSON(msg.d);
                    fnCallback(json);

                    var receipting_total = json.received_total;
                    var issuance_total = json.issued_total;
                    $('#received_total').text(receipting_total).formatCurrency({
                        symbol: ""
                    });

                }
            });


        },

        "aoColumns": [
            {
                // "mDataProp": "inout_mode",
                "class": 'details-control',
                "orderable": false,
                "data": null,
                "sWidth": "5px",
                "sDefaultContent": '<img title="View issuance history" src="images/plus.png">'

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
            { "mDataProp": "receiving_receipt", "sTitle": "RR No.", "sWidth": "80px" },
            { "mDataProp": "control_no", "sTitle": "Control No.", "sWidth": "80px" },
            { "mDataProp": "po_no", "sTitle": "PO No.", "sWidth": "60px" },
             { "mDataProp": "ref_no", "sTitle": "Ref. No", "sWidth": "80px" },
              { "mDataProp": "warehouse_name", "sTitle": "Warehouse", "sWidth": "150px" },
            { "mDataProp": "status", "sTitle": "Status", "sWidth": "100px" },
            { "mDataProp": "doc_no", "sTitle": "Document No.", "sWidth": "80px" },
            { "mDataProp": "doc_date", "sTitle": "Document Date", "sWidth": "80px" },
            { "mDataProp": "stk_descs", "sTitle": "Description", "sWidth": "200px" },
            { "mDataProp": "lot_no", "sTitle": "Lot No", "sWidth": "80px" },
            { "mDataProp": "mfg_date", "sTitle": "Mfg. Date", "sWidth": "80px" },
            { "mDataProp": "expiry_date", "sTitle": "Expiry Date", "sWidth": "80px" },
            { "mDataProp": "department_descs", "sTitle": "Department", "sWidth": "100px" },
                 { "mDataProp": "item_remarks", "sTitle": "Remarks", "sWidth": "120px" }
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

                     callback: function (sValue, settings) { },
                     onblur: 'cancel',
                     type: 'numeric',
                     sUpdateURL: function (value, settings) {
                         var rowId = oTable.fnGetPosition(this)[0];
                         // var columnId = oTable.fnGetPosition(this)[2];
                         var rowData = oTable.fnGetData(rowId);

                         var sentObject = {};
                         sentObject["value"] = value;
                         sentObject["rowData"] = rowData;
                         if (rowData.item_category_cd == "RM" || rowData.item_category_cd == "PM") {
                             sentObject["byDocNo"] = 0;
                             var update_confirmed = getSameRows(sentObject)
                             if (update_confirmed == 1) {
                                 return value;
                             } else {
                                 return rowData.unit_cost;
                             }
                         } else  {

                             sentObject["byDocNo"] = 1;
                             var r = UpdateData(sentObject);
                             if (r == 1) {
                                 return value;
                             } else {
                                 return rowData.unit_cost;
                             }

                         } /*else {
                             alert("Update for item category: " + rowData.item_category_cd + " is not yet implemented.");
                             return rowData.unit_cost;
                         }
                         */

                     }
                 }  //unit_cost
        ]
    });
  
}



function getSameRows(sentObject) {

    var DTO = {
        selected_row: sentObject.rowData
    };

    var rows_length;
    var value = sentObject.value;
    var result = 0;
    var sameRowsTable = $('#same_rows_table').dataTable({
        "bStateSave": false,
        "bLengthChange": false,
        "filter": false,
        "responsive": true,
        "orderClasses": false,
        "info": false,
        "scrollY": "auto",
        "scrollX": "100%",
        "scrollCollapse": true,
        "bProcessing": true,
        "bPaginate": false,
        "bDestroy": true,
        "bServerSide": false,
        "bAutoWidth": false,
        "sAjaxSource": webservicepath + "/GetSameRows",
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            item_cd_match = aData.complete_item_cd == sentObject.rowData.complete_item_cd;
            rr_match = aData.receiving_receipt == sentObject.rowData.receiving_receipt;
            control_match = aData.control_no == sentObject.rowData.control_no;
            warehouse_match = aData.warehouse_cd == sentObject.rowData.warehouse_cd;
            lot_match = aData.lot_no == sentObject.rowData.lot_no;
            if (!(item_cd_match && control_match && warehouse_match && lot_match)) {
                $(nRow).css('background-color', 'rgba(255, 224, 224, 0.68);')
            }
            else {
                $(nRow).css('background-color', 'rgba(72,250,101,0.64);')

            }
        },
        "fnServerData": function (sSource, aoData, fnCallback) {
            $.ajax({
                "async": true,
                "dataType": 'json',
                "contentType": "application/json; charset=utf-8",
                "type": "POST",
                "url": sSource,
                "data": JSON.stringify(DTO),
                "success": function (msg) {
                    var json = jQuery.parseJSON(msg.d);
                    fnCallback(json);
                }
            }).done(function (data) {

                var rows_length = sameRowsTable.fnSettings().fnRecordsTotal();
                if (rows_length > 1) {
                    $('#ConfirmUpdateModal').modal('show');
                    $('#btn_update_yes').unbind();
                    $('#btn_update_yes').click(function () {
                        // $('#btn_update_yes').bind("click", UpdateData(sentObject));
                        $('#ConfirmUpdateModal').modal('hide');
                        $('#btn_update_yes').unbind("click", UpdateData(sentObject));
                        result = 1;
                    });
                } else {
                    $('#btn_update_yes').unbind("click", UpdateData(sentObject));
                    result = 1;
                }
            })
        },


        "aoColumns": [
            {
                "mDataProp": "complete_item_cd", "sTitle": "Item Code",
                "sWidth": "100px"
            },
            { "mDataProp": "item_descs", "sTitle": "Item Description", "sWidth": "210px" },
            { "mDataProp": "qty", "sTitle": "Quantity", "sWidth": "60px" },
            { "mDataProp": "c_uom_conversion", "sTitle": "UOM", "sWidth": "60px" },
            { "mDataProp": "unit_cost", "sTitle": "Unit Cost", "sWidth": "60px" },
            { "mDataProp": "total_cost", "sTitle": "Total Cost", "sWidth": "60px" },
            { "mDataProp": "receiving_receipt", "sTitle": "RR No.", "sWidth": "80px" },
            { "mDataProp": "control_no", "sTitle": "Control No.", "sWidth": "80px" },
            { "mDataProp": "po_no", "sTitle": "PO No.", "sWidth": "60px" },
             { "mDataProp": "ref_no", "sTitle": "Ref. No", "sWidth": "80px" },
              { "mDataProp": "warehouse_name", "sTitle": "Warehouse", "sWidth": "150px" },
            { "mDataProp": "status", "sTitle": "Status", "sWidth": "100px" },
            { "mDataProp": "doc_no", "sTitle": "Document No.", "sWidth": "80px" },
            { "mDataProp": "doc_date", "sTitle": "Document Date", "sWidth": "80px" },
            { "mDataProp": "stk_descs", "sTitle": "Description", "sWidth": "200px" },
            { "mDataProp": "lot_no", "sTitle": "Lot No", "sWidth": "80px" },
            { "mDataProp": "mfg_date", "sTitle": "Mfg. Date", "sWidth": "80px" },
            { "mDataProp": "expiry_date", "sTitle": "Expiry Date", "sWidth": "80px" }
        ]
    });
    return result;
}

function UpdateData(sentObject) {

    if (sentObject.value == '') {
        sentObject.value = 0;
    }
    var DTO = {
        value: sentObject.value,
        selected_row: sentObject.rowData,
        by_doc_no: sentObject.byDocNo
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
            $('#error-title').text("Status (Code:" + msg.status + ")");
            $('#error-msg').text(msg.statusText);
            $('#ErrorModal').modal('show');
            return 0;
        }
    });
}


function table_slider() {


    var TableHtml;

    TableHtml = $("#iss").html();


    $('#tbl_stock_card tbody').on('click', 'td.details-control', function () {
        if (minimal_view == false) {
            var tr = $(this).closest('tr');
            var row = oTable.api().row(tr);
            var rowData = row.data();

            var receivingReceipt = rowData.receiving_receipt;
            var controlNo = rowData.control_no;
            var nTr = $(this).closest('tr');
            var nTds = this;
            var params = { selected_row: rowData }

            if (oTable.fnIsOpen(nTr)) {
                this.innerHTML = '<img title="View issuance history" src="images/plus.png">'
                oTable.fnClose(nTr);
            }
                //show slider
            else {

                this.innerHTML = '<img title="Close" src="images/minus.png">'
                var rowIndex = oTable.fnGetPosition($(nTds).closest('tr')[0]);

                oTable.fnOpen(nTr, fnFormatDetails(iTableCounter, TableHtml), 'details');

                var oInnerTable = $("#iss_" + iTableCounter).dataTable({

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
                            "data": JSON.stringify(params),
                            "success": function (msg) {
                                var json = jQuery.parseJSON(msg.d);
                                fnCallback(json);
                            }
                        })
                    },
                    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                        switch (aData.unit_cost) {
                            case 0:
                                $(nRow).css('background-color', 'rgba(255, 224, 224, 0.68);')
                                break;

                        }
                    },
                    "fnDrawCallback": function (oSettings) {
                    },

                    "aoColumns": [
                             {
                                 // "mDataProp": "inout_mode",
                                 "sWidth": "5px",
                                 "sClass": "control center",
                                 "sDefaultContent": '', "bVisible": true
                             },
                    {
                        "mDataProp": "complete_item_cd", "sTitle": "Item Code",
                        "sWidth": "100px", "bVisible": true
                    },
                    { "mDataProp": "item_descs", "sTitle": "Item Description", "sWidth": "210px", "bVisible": true },
                        { "mDataProp": "qty", "sTitle": "Quantity", "sWidth": "60px", "bVisible": true },
                    { "mDataProp": "c_uom_conversion", "sTitle": "UOM", "sWidth": "60px", "bVisible": true },
                    { "mDataProp": "unit_cost", "sTitle": "Unit Cost", "sWidth": "60px", "bVisible": true },
                    { "mDataProp": "total_cost", "sTitle": "Total Cost", "sWidth": "60px", "bVisible": true },
                    { "mDataProp": "receiving_receipt", "sTitle": "RR No.", "sWidth": "80px", "bVisible": true },
                    { "mDataProp": "control_no", "sTitle": "Control No.", "sWidth": "80px", "bVisible": true },
                    { "mDataProp": "po_no", "sTitle": "PO No.", "sWidth": "60px", "bVisible": true },
                     { "mDataProp": "ref_no", "sTitle": "Ref. No", "sWidth": "80px", "bVisible": true },
                     { "mDataProp": "warehouse_name", "sTitle": "Warehouse", "sWidth": "150px", "bVisible": true },
                    { "mDataProp": "status", "sTitle": "Status", "sWidth": "100px", "bVisible": true },
                    { "mDataProp": "doc_no", "sTitle": "Document No.", "sWidth": "80px", "bVisible": true },
                    { "mDataProp": "doc_date", "sTitle": "Document Date", "sWidth": "80px", "bVisible": true },
                    { "mDataProp": "stk_descs", "sTitle": "Description", "sWidth": "200px", "bVisible": true },
                    { "mDataProp": "lot_no", "sTitle": "Lot No", "sWidth": "80px", "bVisible": true },
                    { "mDataProp": "mfg_date", "sTitle": "Mfg. Date", "sWidth": "80px", "bVisible": true },
                    { "mDataProp": "expiry_date", "sTitle": "Expiry Date", "sWidth": "80px", "bVisible": true },
                       { "mDataProp": "department_descs", "sTitle": "Department", "sWidth": "100px", "bVisible": true },
                 { "mDataProp": "item_remarks", "sTitle": "Remarks", "sWidth": "120px", "bVisible": true }
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
        }//minimal_view is set to false
        else {
            alert("Not supported.");
        }





    });
}




function fnFormatDetails(table_id, html) {
    var sOut = "<p><b>Issuance:</b></p><table id=\"iss_" + table_id + "\" class=\"display table-bordered table-hover table-font\" >";

    sOut += html;
    sOut += "</table>";
    return sOut;
}
