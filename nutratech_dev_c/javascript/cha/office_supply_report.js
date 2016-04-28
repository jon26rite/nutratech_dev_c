var webservicepath = "masterfile.asmx";
var oTable;

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
        "bAutoWidth": false,
        "sAjaxSource": webservicepath + "/GetAdminItems",
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            /*
            var rowId = cell.context._DT_RowIndex;
            var rowData = oTable.fnGetData(rowId);

            if (aData.unit_cost == 0) {
                $(nRow).css('background-color', 'rgba(255, 224, 224, 0.68);')
            }

            if (rowData.issuance_stat >= 1) {
                var cell_value = rowData.unit_cost;
                cell[0].innerHTML = '<div>' + cell_value + '<span class="icon-arrow-right"><img title="New issuance without unit cost" src="images/warn.png"></span></div>'
            }*/

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
            });


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
            { "mDataProp": "status", "sTitle": "Status", "sWidth": "100px" },
            { "mDataProp": "doc_no", "sTitle": "Document No.", "sWidth": "80px" },
            { "mDataProp": "doc_date", "sTitle": "Document Date", "sWidth": "80px" },
            { "mDataProp": "stk_descs", "sTitle": "Description", "sWidth": "200px" }
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