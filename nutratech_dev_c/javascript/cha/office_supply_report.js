$(document).ready(function () {
    /*
    var warehouse_cd = $('#ContentPlaceHolder1_DDReport_Warehouse option:selected').val();
   
    if (warehouse_cd == '00021') {
        $("#btnOSExcelReport").attr("visible", true);
    } else {
        $("#btnOSExcelReport").attr("visible", false);
    }

    $("select[id*='DDReport_Warehouse']").bind("change", function () {
        
        var warehouse_cd = $('#ContentPlaceHolder1_DDReport_Warehouse option:selected').val();

        if (warehouse_cd == '00021') {
            alert("yes")
            $("#btnOSExcelReport").attr("visible", true);
        } else {
            $("#btnOSExcelReport").attr("visible", false);
        }
    });
   /*
    $('#btnOSExcelReport').on('click', function () {
        $('#OSReportModal').modal('show');
    });

    $('<%= btnOSExcelReport.ClientID %>').on('click', function () {
        $('#OSReportModal').modal('show');
    });

     */

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

    
});

function isValidDate(dateString) {
    var regEx = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    return dateString.match(regEx) != null;
}

function onbtnOSExcelReportClick() {
    $('#OSReportModal').modal('show');
}