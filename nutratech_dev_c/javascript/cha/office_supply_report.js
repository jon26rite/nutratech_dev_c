var webservicepath = "masterfile.asmx";
var oTable;
var remarks;

$(document).ready(function () {
    $("select[id*='DD_Transaction']").bind("change", function () {
        oTable.api().ajax.reload();
    });
    $('#ContentPlaceHolder1_hidden_company').val($('#DD_UserCompany option:selected').val());

    var today = new Date();
    $("#ContentPlaceHolder1_os_report_as_of_date").datepicker({
        maxDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        //dateFormat: 'MM yy',
        yearRange: '-5:+20',
        onSelect: function (d, i) {
            if (isValidDate(d)) {
                //var textbox = document.getElementById('<%= TextBox1.ClientID %>');
                $('#btnGenerateOSReport').removeClass("disabled");
            }
        }
    });

    $("#ContentPlaceHolder1_os_report_as_of_date").keyup(function () {
        var d = $(this).val() // get the current value of the input field.
        if (!isValidDate(d)) {
            $('#btnGenerateOSReport').addClass("disabled");
        } else {
            $('#btnGenerateOSReport').removeClass("disabled");
        }
    });


    /*************************************DATA TABLE**************************/
    oTable = $('#tbl_inventory').dataTable({
        "bStateSave": false,
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
        "bServerSide": false,
        "bAutoWidth": true,
        "sAjaxSource": webservicepath + "/GetAdminItems",
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

        },
        "fnServerData": function (sSource, aoData, fnCallback) {

            var inout_mode = $('#ContentPlaceHolder1_DD_Transaction option:selected').val();
            var company_cd = $('#DD_UserCompany option:selected').val()

            $.ajax({
                "async": true,
                "dataType": 'json',
                "contentType": "application/json; charset=utf-8",
                "type": "GET",
                "url": sSource,
                "data": params = {
                    inout_mode: JSON.stringify(inout_mode),
                    company_cd: JSON.stringify(company_cd)
                },
                "success": function (msg) {
                    var json = jQuery.parseJSON(msg.d);
                    fnCallback(json);
                  
                }
            }).done(function (data) {
                var json = jQuery.parseJSON(data.d);
               var table_items =  json.aaData.length;
               if (table_items > 0) {
                   $('#btnOSExcelReport').removeClass("disabled");
               } else {
                   $('#btnOSExcelReport').addClass("disabled");
               }
               
            });


        },

        "aoColumns": [
            {
                "mDataProp": "complete_item_cd", "sTitle": "Item Code"
            },
            { "mDataProp": "item_descs", "sTitle": "Item Description" },
            { "mDataProp": "qty", "sTitle": "Quantity" },
            { "mDataProp": "c_uom_conversion", "sTitle": "UOM" },
             { "mDataProp": "department_descs", "sTitle": "Department" },
                 { "mDataProp": "item_remarks", "sTitle": "Remarks" },
            { "mDataProp": "unit_cost", "sTitle": "Unit Cost" },
            { "mDataProp": "total_cost", "sTitle": "Total Cost" },
            { "mDataProp": "status", "sTitle": "Status" },
            { "mDataProp": "doc_no", "sTitle": "Document No." },
            { "mDataProp": "doc_date", "sTitle": "Document Date" },
            { "mDataProp": "stk_descs", "sTitle": "Description" },

        ]
    })


});

function isValidDate(dateString) {
    var regEx = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    return dateString.match(regEx) != null;
}

function onbtnOSExcelReportClick() {
    $('#OSReportModal').modal('show');
}