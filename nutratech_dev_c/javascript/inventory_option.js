//Object Decalaration===================================================
$(document).ready(function () {
     
    var table = $('#tbl_MFITem_inventory').DataTable({
        "bSort": false,
        "bLengthChange": false,
        "responsive": true,
        "filter": false,
        "pageLength": 100,
        "orderClasses": false,
        "info": false,
        "scrollY": "400px",
        "scrollX": true,
        "scrollCollapse": true,
        "bPaginate": false
    });

    var editrow;
    var org_qty = 0;
    //var _obj_data;
    //var _obj_item;

    var today = new Date();
    $('#txtItemMFGDate').datepicker({
        maxDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        yearRange:'-5:+20'
    });

    $('#txtItemExpiryDate').datepicker({
        minDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        yearRange: '-5:+20'
    });

    $('#txtReportFrom').datepicker({
        maxDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        yearRange: '-5:+20',
        onClose: function () {
            $.fn.LoadDropDown_Documents('#ContentPlaceHolder1_DDDocuments',
                               $("#ContentPlaceHolder1_DDWarehouse option:selected").val(),
                               $('#txtReportFrom').val(),
                               $('#txtReportTo').val(),
                               $("#ContentPlaceHolder1_DDStatus option:selected").val())
        }

    });

    $('#txtReportTo').datepicker({
        maxDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        yearRange: '-5:+20',
        onClose: function () {
            $.fn.LoadDropDown_Documents('#ContentPlaceHolder1_DDDocuments',
                               $("#ContentPlaceHolder1_DDWarehouse option:selected").val(),
                               $('#txtReportFrom').val(),
                               $('#txtReportTo').val(),
                               $("#ContentPlaceHolder1_DDStatus option:selected").val())
        }
    });
    
    $("#txtReportFrom").datepicker({ dateFormat: "dd/mm/yyyy" }).datepicker("setDate", new Date());
    $("#txtReportTo").datepicker({ dateFormat: "dd/mm/yyyy" }).datepicker("setDate", new Date());

    $('#txtItemWeight').priceFormat({
        prefix: '',
        centsLimit: 4
    });

    $('#txtItemQuantity').priceFormat({
        prefix: '',
        centsLimit: 4
    });

    $('#ContentPlaceHolder1_txtItem_StandardCost').priceFormat({
        prefix: '',
        centsLimit: 4
    });
   
    //SEARCH TIMER VARIABLE==================================================
    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 300;  //time in ms, 5 second for example


    //SEARCH DOCUMENT=======================================================================================================
    //on keyup, start the countdown
    $('#txtsearch').keyup(function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout($.fn.doneTypingSearch, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $('#txtsearch').keydown(function () {
        clearTimeout(typingTimer);
        var nav = $('#search_document');
        var xstr = null;

        if (nav.Class != 'search_show2') {
            xstr = "search_hide";
            nav.removeClass(xstr);

            xstr = "search_show2";
            nav.addClass(xstr);
            $('#search_document').html('');
            $('#search_document').html('<a href="#" class="list-group-item"><center><img src="images/loading.gif" alt="loading" /></center></a>').fadeIn("5000");
        }
    });

    $.fn.doneTypingSearch = function () {
        var str = $("#txtsearch").val();
        var nav = $('#search_document');
        var xstr = null;

        if (str == null) {
            xstr = "search_show2";
            nav.removeClass(xstr);

            xstr = "search_hide";
            nav.addClass(xstr);
        }
        else if (str == '') {
            xstr = "search_show2";
            nav.removeClass(xstr);

            xstr = "search_hide";
            nav.addClass(xstr);
        }
        else {

            xstr = "search_hide";
            nav.removeClass(xstr);

            xstr = "search_show2";
            nav.addClass(xstr);

         

            $.ajax({
                type: "POST",
                url: "masterfile.asmx/SearchInventoryDocument",
                data: "{'xsearch': '" + $("#txtsearch").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != "") {
                        $('#search_document').html('');
                        $('#search_document').html(data.d);
                    }
                }
                //,
                //error: function (xhr, err) {
                //  $('#search_list').html(xhr.responseText);
                // window.location = "GoogleLogout.aspx";
                //}
            })

        };
    };
    
    //SEARCH ITEM=======================================================================================================
    //on keyup, start the countdown
    $('#txtItemDescs').keyup(function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout($.fn.doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $('#txtItemDescs').keydown(function () {
        clearTimeout(typingTimer);
        var nav = $('#search_list');
        var xstr = null;

        if (nav.Class != 'search_show') {
            xstr = "search_hide";
            nav.removeClass(xstr);

            xstr = "search_show";
            nav.addClass(xstr);
            $('#search_list').html('');
            $('#search_list').html('<a href="#" class="list-group-item"><center><img src="images/loading.gif" alt="loading" /></center></a>').fadeIn("5000");
        }
    });

    $.fn.doneTyping = function () {

        var str = $("#txtItemDescs").val();
        var nav = $('#search_list');
        var xstr = null;

        if (str == null) {
            xstr = "search_show";
            nav.removeClass(xstr);

            xstr = "search_hide";
            nav.addClass(xstr);
        }
        else if (str == '') {
            xstr = "search_show";
            nav.removeClass(xstr);

            xstr = "search_hide";
            nav.addClass(xstr);
        }
        else {

            xstr = "search_hide";
            nav.removeClass(xstr);

            xstr = "search_show";
            nav.addClass(xstr);

            var _search_item = '';
            switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
                case 'IS':
                case 'IT':
                case 'RA':
                case 'IA':
                case 'IQ':
                    _search_item = $.fn.check_table_item_exist();
                    break;
            }

            $.ajax({
                type: "POST",
                url: "masterfile.asmx/SearchItem",
                data: "{'xsearch': '" + $("#txtItemDescs").val() + "', '_search_param':'" + _search_item + "', '_warehouse': '" + $("#ContentPlaceHolder1_DDWarehouse option:selected").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != "") {
                        $('#search_list').html('');
                        $('#search_list').html(data.d);
                        
                    }
                }
                //,
                //error: function (xhr, err) {
                //  $('#search_list').html(xhr.responseText);
                // window.location = "GoogleLogout.aspx";
                //}
            })

        };
    };

    ////Total QTY AND COST=======================================================================================================
    ////on keyup, start the countdown
    //$('#txtItemUnitCost').keyup(function () {
    //    clearTimeout(typingTimer);
    //    typingTimer = setTimeout($.fn.TotalQtyCost, doneTypingInterval);
    //});
    //on keyup, start the countdown
    $('#txtItemQuantity').keyup(function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout($.fn.TotalQtyCost, doneTypingInterval);
    });

    ////on keydown, clear the countdown 
    //$('#txtItemUnitCost').keydown(function () {
    //    clearTimeout(typingTimer);
    //});
    //on keydown, clear the countdown 
    $('#txtItemQuantity').keydown(function () {
        clearTimeout(typingTimer);
    });

    $.fn.TotalQtyCost = function () {
        var conversion_factor = $.fn.number_comma($("#txtConversion_factor").val());
        if (conversion_factor == 0) { conversion_factor = 1 }
        
        var val1 = $.fn.number_comma($("#txtItemQuantity").val()) / conversion_factor;
        //var val2 = $.fn.number_comma($("#txtItemUnitCost").val());
        var hidden_val = $.fn.number_comma($("#hidden_available_qty").val()) / conversion_factor;
        $('#btnAddRowItem').removeClass('disabled');
       
        //case 'RA':
        //case 'IA':
        switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
            case 'IS':
            case 'IT':
            case 'IQ':
                if (hidden_val > 0 && val1 > hidden_val) {

                    val1 = hidden_val;
                    $('#div_msg').html('');
                    $('#div_msg').html('<span style="color:red">Total Quantity Count should not be greater than ' + $("#hidden_available_qty").val() + '</span>');
                    $('#btnAddRowItem').addClass('disabled');
                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                    }, 5000);

                }
        }
        
        switch ( $("#ContentPlaceHolder1_hidden_ref_trx_type").val()) {
            case "IT":
                if (hidden_val > 0 && val1 > hidden_val) {

                    val1 = hidden_val;
                    $('#div_msg').html('');
                    $('#div_msg').html('<span style="color:red">Total Quantity Count should not be greater than ' + $("#hidden_available_qty").val() + '</span>');
                    $('#btnAddRowItem').addClass('disabled');
                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                    }, 5000);

                }
                
        }

       // var total = val1 * val2;
       // $("#txtItemTotalCost").val($.fn.addCommasWithDecimal(total.toString(), 4));//total.toFixed(4)
    };

    //SEARCH REFERENCE=======================================================================================================
    $('#ContentPlaceHolder1_txtReferenceNo').keyup(function (e) {
        var keyCode = e.keyCode || e.which;
        clearTimeout(typingTimer);
        if (keyCode == 9) {
            e.preventDefault();
            // call custom function here
            $('#search_reference').removeClass("search_show2");
            $('#search_reference').addClass("search_hide");

            $('#ContentPlaceHolder1_div_reference').removeClass("div_ref_show");
            $('#ContentPlaceHolder1_div_reference').addClass("div_ref_hide");

            //typingTimer = setTimeout($.fn.doneTypingSearchReference, doneTypingInterval);

        } else { 
        
        typingTimer = setTimeout($.fn.doneTypingSearchReference, doneTypingInterval);
        }
    });

    //on keydown, clear the countdown 
    $('#ContentPlaceHolder1_txtReferenceNo').keydown(function (e) {
        clearTimeout(typingTimer);
        var nav = $('#search_reference');
        var xstr = null;
        var keyCode = e.keyCode || e.which;

        if (keyCode == 9) {
            e.preventDefault();
            // call custom function here
            $('#search_reference').removeClass("search_show2");
            $('#search_reference').addClass("search_hide");

            $('#ContentPlaceHolder1_div_reference').removeClass("div_ref_show");
            $('#ContentPlaceHolder1_div_reference').addClass("div_ref_hide");
        }
        else {

            if (nav.Class != 'search_show2') {
                xstr = "search_hide";
                nav.removeClass(xstr);

                xstr = "search_show2";
                nav.addClass(xstr);
                $('#search_reference').html('');
                $('#search_reference').html('<a href="#" class="list-group-item"><center><img src="images/loading.gif" alt="loading" /></center></a>').fadeIn("5000");
            }

        };
    });

    $.fn.doneTypingSearchReference = function () {
        var str = $("#ContentPlaceHolder1_txtReferenceNo").val();
        var nav = $('#search_reference');
        var xstr = null;

        var new_doc = $("#ContentPlaceHolder1_txtDocNo").val();
        if (new_doc.indexOf("#") == -1) { str = null };
       

        if (str == null) {
            xstr = "search_show2";
            nav.removeClass(xstr);

            xstr = "search_hide";
            nav.addClass(xstr);
        }
        else if (str == '') {
            xstr = "search_show2";
            nav.removeClass(xstr);

            xstr = "search_hide";
            nav.addClass(xstr);
        }
        else {

            xstr = "search_hide";
            nav.removeClass(xstr);

            xstr = "search_show2";
            nav.addClass(xstr);


            $.ajax({
                type: "POST",
                url: "masterfile.asmx/SearchInventoryReference",
                data: "{'xsearch': '" + $("#ContentPlaceHolder1_txtReferenceNo").val() + "','warehouse_cd': '" + $("#ContentPlaceHolder1_DDWarehouse option:selected").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != "") {
                        if (data.d.indexOf("GetReferenceDetails") > -1) {
                            $('#search_reference').html('');
                            $('#search_reference').html(data.d);
                        }
                        else {
                            $('#search_reference').removeClass("search_show2");
                            $('#search_reference').addClass("search_hide");

                            $('#ContentPlaceHolder1_div_reference').removeClass("div_ref_show");
                            $('#ContentPlaceHolder1_div_reference').addClass("div_ref_hide");
                        }
                        
                    }
                }
                //,
                //error: function (xhr, err) {
                //  $('#search_list').html(xhr.responseText);
                // window.location = "GoogleLogout.aspx";
                //}
            })

        };
    };

    $('#btnAddRowItem').on('click', function () {
        
        var sfind = 0;
        if ($("#txtItemCode").val() == undefined || $("#txtItemCode").val() == '') { sfind=1 };
        if ($("#txtItemDescs").val() == undefined || $("#txtItemDescs").val() == '') { sfind = 1 };
        if ($("#txtItemWeight").val() == undefined || $("#txtItemWeight").val() == '') { sfind = 1 };
        if ($("#txtItemUOM").val() == undefined || $("#txtItemUOM").val() == '') { sfind = 1 };
        if ($("#txtItemQuantity").val() == undefined || $("#txtItemQuantity").val() == '') { sfind = 1 };
        // if ($("#txtItemUnitCost").val() == undefined || $("#txtItemUnitCost").val() == '') { sfind = 1 };
        //if ($("#txtItemTotalCost").val() == undefined || $("#txtItemTotalCost").val() == '') { sfind = 1 };
        if ($("#txtItemLotNo").val() == undefined || $("#txtItemLotNo").val() == '') { sfind = 1 };
        if ($("#txtItemRemarks").val() == undefined || $("#txtItemRemarks").val() == '') { sfind = 1 };
        if ($("#txtItemReceivingReceipt").val() == undefined || $("#txtItemReceivingReceipt").val() == '') { sfind = 1 };
        

        //switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
        //    case 'RQ':
        //        if ($("#txtItemQCNo").val() == undefined || $("#txtItemQCNo").val() == '') { sfind = 1 };
        //        break;
        //};

        var qc_no;
        if ($("#txtItemQCNo").val() == undefined || $("#txtItemQCNo").val() == '') { qc_no = ''; }
        else { qc_no = $("#txtItemQCNo").val(); };

        if ($("#txtItemMFGDate").val() == undefined || $("#txtItemMFGDate").val() == '') { $("#txtItemMFGDate").val('') };

        //if ($("#txtItemMFGDate").val() == undefined || $("#txtItemMFGDate").val() == '') { sfind = 1 };
        if ($("#txtItemExpiryDate").val() == undefined || $("#txtItemExpiryDate").val() == '') { sfind = 1 };

        if (sfind == 0) {
            if (editrow == 1) {
                
                $('#div_msg').html('');
                $('#div_msg').html('Item details updated...<br />ITEM DESCRIPTION : ' + $("#txtItemDescs").val());

                $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                setTimeout(function () {
                    $("#div_msg").fadeOut('slow');
                }, 10000);

                table.row('.selected').remove().draw(false);
                var rowCount = $('#tbl_MFITem_inventory >tbody >tr').length;
                if (rowCount == 1) {
                    $("#btnCancelItem").addClass('disabled');
                }
                $('#txtItemDescs').removeAttr('disabled');
                editrow = 0;
            }

            $.fn.check_table_item($("#txtItemCode").val(), $("#txtItemLotNo").val(), $("#txtItemReceivingReceipt").val());

            var _remaining = 0;

            var conversion_factor = $.fn.number_comma($("#txtConversion_factor").val());
            
            var _conversion_uom = $("#ContentPlaceHolder1_DDConversion_UOM option:selected").val();
            if (conversion_factor == 0) {
                conversion_factor = 1;
                _conversion_uom = '';
            }
            else {
                _conversion_uom = _conversion_uom.substring(0, _conversion_uom.indexOf("-"));
            };

            var qty_val = $.fn.number_comma($("#txtItemQuantity").val()) / conversion_factor;
            var hidden_val = $.fn.number_comma($("#hidden_available_qty").val()) / conversion_factor;
           
            //case 'RA':
            //case 'IA':
            //Disable warehouse selection if Item Added....==========================================
            switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
                case 'IS':
                case 'IT':
                case 'IQ':
                    $("#ContentPlaceHolder1_DDWarehouse").attr('disabled', true);

                    if (hidden_val > 0) {
                        _remaining = hidden_val - qty_val;
                    };
                    break;

            }

            switch ($("#ContentPlaceHolder1_hidden_ref_trx_type").val()) {
                case 'IT':
                    if (hidden_val > 0) {
                        _remaining = hidden_val - qty_val;
                    };
            }

            
                table.row.add([
                    $("#txtItemCode").val(),
                    $("#txtItemDescs").val(),
                    $("#txtItemWeight").val(),
                    $("#txtItemUOM").val(),
                    $("#txtItemQuantity").val(),
                    $("#txtItemReceivingReceipt").val(),
                    $("#txtItemLotNo").val(),
                    qc_no,
                    $("#txtItemMFGDate").val(),
                    $("#txtItemExpiryDate").val(),
                    $.fn.addCommasWithDecimal(_remaining, 4),
                    _conversion_uom,
                    $.fn.addCommasWithDecimal(conversion_factor, 4),
                    $("#txtItemRemarks").val()
                ]).draw();
                       
                $('#ItemModal').modal('hide');
                $(".dataTables_scrollBody th").removeAttr('class');
                //$.fn.TotalCost();

                $("#txtItemCode").val('');
                $("#txtItemDescs").val('');
                $("#txtItemWeight").val(0);
                $("#txtItemUOM").val('');
                $("#txtItemQuantity").val(0);
                
                $("#txtItemReceivingReceipt").val('');
                $("#txtItemLotNo").val('');
                $("#txtItemQCNo").val('');
                $("#txtItemMFGDate").val('');
                $("#txtItemExpiryDate").val('');
                $("#txtItemRemarks").val('');
               
                

        }
        else {
        
            if ($('#ItemModal').hasClass('in')) {
                    
                // will only come inside after the modal is shown
                $('#div_msg').html('');
                $('#div_msg').html('<span style="color:red">Required item fields need to be filled-up...</span>');

                $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                setTimeout(function () {
                    $("#div_msg").fadeOut('slow');
                }, 10000);
            }
        }
    });

    $('#tbl_MFITem_inventory tbody').on('click', 'tr', function () {
        if ($("#btnSave").hasClass('disabled')) {
            // will only come inside after the modal is shown
            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:red">Item Updating is disabled...</span>');

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);
        }
        else { 
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                $(this).addClass('selected');
            }
            $("#btnCancelItem").addClass('disabled'); 
            var rowCount = table.row('.selected').length;
            if (rowCount > 0) {
                $("#btnCancelItem").removeClass('disabled');
            }

            var ref_no = $('#ContentPlaceHolder1_txtReferenceNo').val();
            if (ref_no.indexOf('ST') > -1) {
                $("#btnCancelItem").addClass('disabled');
            };

            switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
                case 'IQ':
                    $("#btnCancelItem").addClass('disabled');
                    break;
                case 'RQ':
                    if ($('#ContentPlaceHolder1_RB_QC_Process input:checked').val() >= 2) { $("#btnCancelItem").addClass('disabled'); }
                    break;
            }

        }
    });

    $('#tbl_MFITem_inventory tbody ').on('dblclick', 'tr', function () {
        if ($("#btnSave").hasClass('disabled')) {
            // will only come inside after the modal is shown
            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:red">Item Updating is disabled...</span>');

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);
        }
        else {

            switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
                case 'RQ':
                    if ($('#ContentPlaceHolder1_RB_QC_Process input:checked').val() <= 1) {

                        var conversion_uom = $(this).find('td:eq(11)').text();
                        var conversion_factor = $.fn.number_comma($(this).find('td:eq(12)').text());


                        $('#ItemModal').modal('show');

                        $("#txtItemCode").val($(this).find('td:eq(0)').text());
                        $("#txtItemDescs").val($(this).find('td:eq(1)').text());
                        $("#txtItemWeight").val($(this).find('td:eq(2)').text());
                        $("#txtItemUOM").val($(this).find('td:eq(3)').text());
                        $("#txtItemUOMDescs").val($(this).find('td:eq(3)').text());
                        $("#txtItemQuantity").val($(this).find('td:eq(4)').text());
                        $("#txtItemReceivingReceipt").val($(this).find('td:eq(5)').text());
                        $("#txtItemLotNo").val($(this).find('td:eq(6)').text());
                        $("#txtItemQCNo").val($(this).find('td:eq(7)').text());
                        $("#txtItemMFGDate").val($(this).find('td:eq(8)').text());
                        $("#txtItemExpiryDate").val($(this).find('td:eq(9)').text());
                        $("#hidden_available_qty").val($.fn.addCommasWithDecimal((($.fn.number_comma($(this).find('td:eq(4)').text()) / conversion_factor) + $.fn.number_comma($(this).find('td:eq(10)').text())) * conversion_factor, 4));
                        $("#txtItemRemarks").val($(this).find('td:eq(13)').text());
                        
                        $('#search_list').removeClass("search_show");
                        $('#search_list').addClass("search_hide");

                        $("#txtItemQuantity").attr('disabled', false);
                        //$('#txtItemUnitCost').attr('disabled', false);
                        $('#txtItemExpiryDate').attr('disabled', false);
                        $('#txtItemMFGDate').attr('disabled', false);

                        $('#txtItemReceivingReceipt').attr('disabled', false);
                        $('#txtItemLotNo').attr('disabled', false);
                        $('#txtItemQCNo').attr('disabled', false);

                        //CONVERSION================================================================
                        $('#div_conversion').removeClass("div_ref_show");
                        $('#div_conversion').addClass("div_ref_hide");

                        $('#div_conversion_dd').removeClass("div_ref_show");
                        $('#div_conversion_dd').addClass("div_ref_hide");

                        $('#div_conversion_txt').removeClass("div_ref_show");
                        $('#div_conversion_txt').addClass("div_ref_hide");
                        //CONVERSION================================================================

                        switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
                            case 'IS':
                            case 'IT':
                            case 'RA':
                            case 'IA':
                            case 'IQ':
                                //$('#txtItemUnitCost').attr('disabled', true);
                                $('#txtItemExpiryDate').attr('disabled', true);
                                $('#txtItemMFGDate').attr('disabled', true);

                                $('#txtItemReceivingReceipt').attr('disabled', true);
                                $('#txtItemLotNo').attr('disabled', true);
                                $('#txtItemQCNo').attr('disabled', true);

                                //CONVERSION================================================================
                                $('#div_conversion').removeClass("div_ref_hide");
                                $('#div_conversion').addClass("div_ref_show");
                                $("#hidden_org_qty").val("");
                                if (conversion_factor > 1) {
                                    $('#div_conversion_dd').removeClass("div_ref_hide");
                                    $('#div_conversion_dd').addClass("div_ref_show");

                                    $('#div_conversion_txt').removeClass("div_ref_hide");
                                    $('#div_conversion_txt').addClass("div_ref_show");

                                    $("#hidden_org_qty").val(1);
                                    $('#ContentPlaceHolder1_RBConversion [type=radio][value=' + 1 + ']').prop('checked', true);

                                    if ($('#ContentPlaceHolder1_RBConversion input:checked').val() == 1) {
                                        var _uom = $("#txtItemUOM").val();
                                        if (_uom == undefined) { _uom = '' }
                                        else {
                                            $.fn.LoadDropDown_Conversion(_uom, 0, conversion_uom + '-' + conversion_factor.toFixed(4));

                                            $("#txtConversion_factor").val($.fn.addCommasWithDecimal(conversion_factor, 4));
                                        }
                                    }

                                }
                                //CONVERSION================================================================

                                break;
                        }

                        switch ($("#ContentPlaceHolder1_hidden_ref_trx_type").val()) {
                            case 'IT':
                                $("#txtItemQuantity").attr('disabled', true);
                                //$('#txtItemUnitCost').attr('disabled', true);
                                $('#txtItemExpiryDate').attr('disabled', true);
                                $('#txtItemMFGDate').attr('disabled', true);

                                $('#txtItemReceivingReceipt').attr('disabled', true);
                                $('#txtItemLotNo').attr('disabled', true);
                                $('#txtItemQCNo').attr('disabled', true);
                        }

                        $('#txtItemDescs').attr('disabled', true);

                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        editrow = 1;
                    };
                    break;

                default:

                    var conversion_uom = $(this).find('td:eq(11)').text();
                    var conversion_factor = $.fn.number_comma($(this).find('td:eq(12)').text());


                    $('#ItemModal').modal('show');

                    $("#txtItemCode").val($(this).find('td:eq(0)').text());
                    $("#txtItemDescs").val($(this).find('td:eq(1)').text());
                    $("#txtItemWeight").val($(this).find('td:eq(2)').text());
                    $("#txtItemUOM").val($(this).find('td:eq(3)').text());
                    $("#txtItemUOMDescs").val($(this).find('td:eq(3)').text());
                    $("#txtItemQuantity").val($(this).find('td:eq(4)').text());
                    $("#txtItemReceivingReceipt").val($(this).find('td:eq(5)').text());
                    $("#txtItemLotNo").val($(this).find('td:eq(6)').text());
                    $("#txtItemQCNo").val($(this).find('td:eq(7)').text());
                    $("#txtItemMFGDate").val($(this).find('td:eq(8)').text());
                    $("#txtItemExpiryDate").val($(this).find('td:eq(9)').text());
                    $("#hidden_available_qty").val($.fn.addCommasWithDecimal((($.fn.number_comma($(this).find('td:eq(4)').text()) / conversion_factor) + $.fn.number_comma($(this).find('td:eq(10)').text())) * conversion_factor, 4));
                    $("#txtItemRemarks").val($(this).find('td:eq(13)').text());
                    

                    $('#search_list').removeClass("search_show");
                    $('#search_list').addClass("search_hide");


                    $("#txtItemQuantity").attr('disabled', false);
                    //$('#txtItemUnitCost').attr('disabled', false);
                    $('#txtItemExpiryDate').attr('disabled', false);
                    $('#txtItemMFGDate').attr('disabled', false);

                    $('#txtItemReceivingReceipt').attr('disabled', false);
                    $('#txtItemLotNo').attr('disabled', false);
                    $('#txtItemQCNo').attr('disabled', false);

                    //CONVERSION================================================================
                    $('#div_conversion').removeClass("div_ref_show");
                    $('#div_conversion').addClass("div_ref_hide");

                    $('#div_conversion_dd').removeClass("div_ref_show");
                    $('#div_conversion_dd').addClass("div_ref_hide");

                    $('#div_conversion_txt').removeClass("div_ref_show");
                    $('#div_conversion_txt').addClass("div_ref_hide");
                    //CONVERSION================================================================

                    switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
                        case 'IS':
                        case 'IT':
                        case 'RA':
                        case 'IA':
                        case 'IQ':
                            //$('#txtItemUnitCost').attr('disabled', true);
                            $('#txtItemExpiryDate').attr('disabled', true);
                            $('#txtItemMFGDate').attr('disabled', true);

                            $('#txtItemReceivingReceipt').attr('disabled', true);
                            $('#txtItemLotNo').attr('disabled', true);
                            $('#txtItemQCNo').attr('disabled', true);

                            //CONVERSION================================================================
                            $('#div_conversion').removeClass("div_ref_hide");
                            $('#div_conversion').addClass("div_ref_show");
                            $("#hidden_org_qty").val("");
                            if (conversion_factor > 1) {
                                $('#div_conversion_dd').removeClass("div_ref_hide");
                                $('#div_conversion_dd').addClass("div_ref_show");

                                $('#div_conversion_txt').removeClass("div_ref_hide");
                                $('#div_conversion_txt').addClass("div_ref_show");

                                $("#hidden_org_qty").val(1);
                                $('#ContentPlaceHolder1_RBConversion [type=radio][value=' + 1 + ']').prop('checked', true);

                                if ($('#ContentPlaceHolder1_RBConversion input:checked').val() == 1) {
                                    var _uom = $("#txtItemUOM").val();
                                    if (_uom == undefined) { _uom = '' }
                                    else {
                                        $.fn.LoadDropDown_Conversion(_uom, 0, conversion_uom + '-' + conversion_factor.toFixed(4));

                                        $("#txtConversion_factor").val($.fn.addCommasWithDecimal(conversion_factor, 4));
                                    }
                                }

                            }
                            //CONVERSION================================================================

                            break;
                    }

                    switch ($("#ContentPlaceHolder1_hidden_ref_trx_type").val()) {
                        case 'IT':
                            $("#txtItemQuantity").attr('disabled', true);
                            //$('#txtItemUnitCost').attr('disabled', true);
                            $('#txtItemExpiryDate').attr('disabled', true);
                            $('#txtItemMFGDate').attr('disabled', true);

                            $('#txtItemReceivingReceipt').attr('disabled', true);
                            $('#txtItemLotNo').attr('disabled', true);
                            $('#txtItemQCNo').attr('disabled', true);
                    }

                    $('#txtItemDescs').attr('disabled', true);

                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    editrow = 1;

                    break;
            };

          
        }
    });
   
    $("#btnCancelItem").click(function () {
        $.confirm({
            title: 'Do you want to remove the selected item(s) in the List?',
            confirmButton: 'Proceed',
            confirmButtonClass: 'btn-info',
            icon: 'fa fa-question-circle',
            animation: 'scale',
            confirm: function () {
                table.row('.selected').remove().draw(false);
                var rowCount = $('#tbl_MFITem_inventory >tbody >tr').length;
                if (rowCount == 1) {
                    $("#btnCancelItem").addClass('disabled');
                }
                //$.fn.TotalCost();
            }
        });

       
    });

    //ADD==================================================================
    $('#btnAdd').click(function () {
        $('#btnAdd').disable(true);
        $('#btnSave').disable(false);
        $('#btnCancel').disable(false);
        $.fn.enable_Form(0);
        switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
            case 'IQ':
                $("#btnAddItem").addClass('disabled');
        }
    });

    //SAVE=================================================================
    $('#btnSave').click(function () {
        var rowCount = $('#tbl_MFITem_inventory >tbody >tr').length;
        if (rowCount == 1) {

            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:red">No Stock Item(s) in the List.<br/>Please add an item to continue...</span>');

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);

        }
        else {

            // var _batch_no = $('#ContentPlaceHolder1_txtBatchNo').val();
            var _posting_date = $('#ContentPlaceHolder1_txtPostingDate').val();
            var _document_no = $('#ContentPlaceHolder1_txtDocNo').val();
            var _description = $('#ContentPlaceHolder1_txtDocDescs').val();
            var _department_code = $('#ContentPlaceHolder1_DDepartment option:selected').val();
            //var _division_code = $('#ContentPlaceHolder1_DDivision option:selected').val();
            var _warehouse_code = $('#ContentPlaceHolder1_DDWarehouse option:selected').val();
            var _po_no = $('#ContentPlaceHolder1_txtPONo').val();
            var _reference_no = $('#ContentPlaceHolder1_txtReferenceNo').val();
            var _sfind = 0;
            // if (_batch_no == undefined || _batch_no == '') { _sfind = 1; }
            if (_posting_date == undefined || _posting_date == '') { _sfind = 1; }
            if (_document_no == undefined || _document_no == '') { _sfind = 1; }
            if (_description == undefined || _description == '') { _sfind = 1; }
            if (_department_code == undefined || _department_code == '') { _sfind = 1; }
            if (_document_no.indexOf("GR") > -1) {
                if (_reference_no.indexOf("ST") == -1) {
                    if (_po_no == undefined || _po_no == '') { _sfind = 1; }
                } 
            };
            if (_document_no.indexOf("SQ") > -1) {
                if (_reference_no.indexOf("ST") == -1) {
                    if (_po_no == undefined || _po_no == '') { _sfind = 1; }
                }
            };
            if (_warehouse_code == undefined || _warehouse_code == '') { _sfind = 1; }

            if (_sfind == 0) {

                $.confirm({
                    title: 'Do you want to save this entry?',
                    confirmButton: 'Yes',
                    confirmButtonClass: 'btn-info',
                    icon: 'fa fa-question-circle',
                    animation: 'scale',
                    confirm: function () {

                        $('#btnAdd').disable(false);
                        $('#btnSave').disable(true);
                        $('#btnCancel').disable(true);

                        $.fn.SaveRecords();
                        $.fn.disable_Form();

                        if (_document_no.indexOf("SQ") > -1) {
                            if (_document_no.indexOf("#") == -1) { 
                                $.fn.update_quarantine_process(_document_no, 1);
                            }
                        }
                        else if (_document_no.indexOf("IQ") > -1) {
                            $.fn.update_quarantine_process(_reference_no, 2);
                            $.fn.LoadQuarantine_reference(_reference_no);
                        };

                    }
                });

            }
            else {
                $('#div_msg').html('');
                $('#div_msg').html('<span style="color:red">Required header fields need to be filled-up to add an item details...</span>');

                $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                setTimeout(function () {
                    $("#div_msg").fadeOut('slow');
                }, 10000);
            }

        }

    });

    //CANCEL==================================================================
    $('#btnCancel').click(function () {

        var rowCount = $('#tbl_MFITem_inventory >tbody >tr').length;
        if (rowCount == 1) {

            $('#btnAdd').disable(false);
            $('#btnSave').disable(true);
            $('#btnCancel').disable(true);

            $.fn.disable_Form();

            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:red">Stock Entry Cancelled...</span>');

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);

        }
        else {
            $.confirm({
                title: 'Do you want to cancel any updates in this entry?',
                confirmButton: 'Proceed',
                confirmButtonClass: 'btn-info',
                icon: 'fa fa-question-circle',
                animation: 'scale',
                confirm: function () {
                    $('#btnAdd').disable(false);
                    $('#btnSave').disable(true);
                    $('#btnCancel').disable(true);

                    $.fn.disable_Form();

                    $('#div_msg').html('');
                    $('#div_msg').html('<span style="color:red">Stock Entry Cancelled...</span>');

                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                    }, 10000);
                }
            });

        }



    });

    $('#btnAddItem').on('click', function () {

        //var _batch_no = $('#ContentPlaceHolder1_txtBatchNo').val();
        var _posting_date = $('#ContentPlaceHolder1_txtPostingDate').val();
        var _document_no = $('#ContentPlaceHolder1_txtDocNo').val();
        var _description = $('#ContentPlaceHolder1_txtDocDescs').val();
        var _department_code = $('#ContentPlaceHolder1_DDepartment option:selected').val();
        //var _division_code = $('#ContentPlaceHolder1_DDivision option:selected').val();
        var _warehouse_code = $('#ContentPlaceHolder1_DDWarehouse option:selected').val();

        var _sfind = 0;
        //if (_batch_no == undefined || _batch_no == '') { _sfind = 1; }
        if (_posting_date == undefined || _posting_date == '') { _sfind = 1; }
        if (_document_no == undefined || _document_no == '') { _sfind = 1; }
        if (_description == undefined || _description == '') { _sfind = 1; }
        if (_department_code == undefined || _department_code == '') { _sfind = 1; }
        //if (_division_code == undefined || _division_code == '') { _sfind = 1; }
        if (_warehouse_code == undefined || _warehouse_code == '') { _sfind = 1; }

        if (_sfind == 0) {

            var _intial = 0;
            $('#ItemModal').modal('show');
            $("#txtItemCode").val('');
            $("#txtItemDescs").val('');
            $("#txtItemWeight").val('');
            $("#txtItemQuantity").val(_intial.toFixed(4));
            $("#txtItemUOM").val('');
            $("#txtItemUOMDescs").val('');
            
            $("#txtItemReceivingReceipt").val('');
            $("#txtItemLotNo").val('');
            $("#txtItemQCNo").val('');
            
            $("#txtItemMFGDate").val('');
            $("#txtItemExpiryDate").val('');
            $("#txtItemRemarks").val('');
            
            $('#txtItemDescs').removeAttr('disabled');
            editrow = 0;
            $("#txtItemQuantity").attr('disabled', false);
            //$('#txtItemUnitCost').attr('disabled', false);
            $('#txtItemExpiryDate').attr('disabled', false);
            $('#txtItemMFGDate').attr('disabled', false);
            $("#txtItemReceivingReceipt").attr('disabled', false);
            $('#txtItemLotNo').attr('disabled', false);
            $('#txtItemQCNo').attr('disabled', false);

            $('#search_list').removeClass("search_show");
            $('#search_list').addClass("search_hide");

            //CONVERSION================================================================
            $('#div_conversion').removeClass("div_ref_show");
            $('#div_conversion').addClass("div_ref_hide");

            $('#div_conversion_dd').removeClass("div_ref_show");
            $('#div_conversion_dd').addClass("div_ref_hide");

            $('#div_conversion_txt').removeClass("div_ref_show");
            $('#div_conversion_txt').addClass("div_ref_hide");
            
            $('#ContentPlaceHolder1_RBConversion [type=radio][value=' + 0 + ']').prop('checked', true);
            //CONVERSION================================================================

            switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
                case 'IS':
                case 'IT':
                case 'RA':
                case 'IA':
                case 'IQ':
                    //CONVERSION================================================================
                    $('#div_conversion').removeClass("div_ref_hide");
                    $('#div_conversion').addClass("div_ref_show");

                    //$('#div_conversion_dd').removeClass("div_ref_hide");
                    //$('#div_conversion_dd').addClass("div_ref_show");
                    //CONVERSION================================================================
                    break;
            }

        }
        else {
            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:red">Required header fields need to be filled-up to add an item details...</span>');

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);
        }
    })
   
jQuery.fn.extend({
    disable: function (state) {
        return this.each(function () {
            var $this = $(this);
            $this.toggleClass('disabled', state);
        });
    }
});

$.fn.check_table_item_exist = function () {
    var table = $("#tbl_MFITem_inventory tbody");
  
    var _item_cd = '';
    var sfind;
   

    table.find('tr').each(function (i) {
        var $tds = $(this).find('td'),
                item_code = $tds.eq(0).text(),
                item_descs = $tds.eq(1).text(),
                item_weight = $tds.eq(2).text(),
                item_uom = $tds.eq(3).text(),
                item_qty = $tds.eq(4).text(),
                item_receiving_receipt = $tds.eq(5).text(),
                item_lotno = $tds.eq(6).text(),
                item_qcno = $tds.eq(7).text(),
                item_mfgdate = $tds.eq(8).text(),
                item_expirydate = $tds.eq(9).text(),
                item_available = $tds.eq(10).text(),
                item_conversion_uom = $tds.eq(11).text(),
                item_conversion_factor = $tds.eq(12).text();

        sfind = 0;
       
        if (item_code == '') {
            sfind = 1;
        }
        if (item_code == '[object Object]') {
            sfind = 1;
        }
        if (item_code == undefined) {
            sfind = 1;
        }

      

        if (sfind == 0) {
            if (_item_cd == '') {
                _item_cd = _item_cd + '[' + item_code + '~' + item_lotno + '~' + item_receiving_receipt + '~' + item_available + ']'
                //_lot_no = _lot_no + '[' + item_lotno + ',' + item_available + ']'
               // _balance = _balance + '[' + item_available + ']'
            }
            else {
                _item_cd = _item_cd + ',' + '[' + item_code + '~' + item_lotno + '~' + item_receiving_receipt + '~' + item_available + ']'
               // _lot_no = _lot_no + ',' + '[' + item_lotno + ']'
               // _balance = _balance + ',' + '[' + item_available + ']'
            }
            
        }

    });

    _item_cd = _item_cd 
    //_lot_no = _lot_no 

    if (sfind == 0) {

        return _item_cd //+ _lot_no + _balance
    }
    else {
        return ''
    }

   
};

$.fn.check_table_item = function (to_add_item_cd, to_add_lot_no, to_add_receiving_receipt) {
    var table = $("#tbl_MFITem_inventory tbody");
    var _return = 0;
    table.find('tr').each(function (i) {
        var $tds = $(this).find('td'),
                item_code = $tds.eq(0).text(),
                item_descs = $tds.eq(1).text(),
                item_weight = $tds.eq(2).text(),
                item_uom = $tds.eq(3).text(),
                item_qty = $tds.eq(4).text(),
                item_receiving_receipt = $tds.eq(5).text(),
                item_lotno = $tds.eq(6).text(),
                item_qcno = $tds.eq(7).text(),
                item_mfgdate = $tds.eq(8).text(),
                item_expirydate = $tds.eq(9).text(),
                item_available = $tds.eq(10).text(),
                item_conversion_uom = $tds.eq(11).text(),
                item_conversion_factor = $tds.eq(12).text();

     
        var sfind;
        sfind = 0;
        if (item_code == '') {
            sfind = 1;
        }
        if (item_code == '[object Object]') {
            sfind = 1;
        }
        if (item_code == undefined) {
            sfind = 1;
        }

        if (item_code == to_add_item_cd && item_lotno == to_add_lot_no && item_receiving_receipt == to_add_receiving_receipt) {
            sfind = 2;
        }

        if (sfind == 2) {

            var $tds = $(this).find('td');

            $tds.remove();
            _return = 1;
        }

    });

    return _return
};

$.fn.check_table_item_for_qc = function (_doc_no, _warehouse_code) {
    var table = $("#tbl_MFITem_inventory tbody");
    var _return = 0;
    table.find('tr').each(function (i) {

        var $tds = $(this).find('td'),
                item_code = $tds.eq(0).text(),
                item_descs = $tds.eq(1).text(),
                item_weight = $tds.eq(2).text(),
                item_uom = $tds.eq(3).text(),
                item_qty = $tds.eq(4).text(),
                item_receiving_receipt = $tds.eq(5).text(),
                item_lotno = $tds.eq(6).text(),
                item_qcno = $tds.eq(7).text(),
                item_mfgdate = $tds.eq(8).text(),
                item_expirydate = $tds.eq(9).text(),
                item_available = $tds.eq(10).text(),
                item_conversion_uom = $tds.eq(11).text(),
                item_conversion_factor = $tds.eq(12).text();


        var sfind;
        sfind = 0;
        if (item_code == '') {
            sfind = 1;
        }
        if (item_code == '[object Object]') {
            sfind = 1;
        }
        if (item_code == undefined) {
            sfind = 1;
        }
        
        if (sfind == 0) {


            $.ajax({
                async: false,
                type: "POST",
                url: "masterfile.asmx/_get_check_qc_item",
                data: "{'_doc_no':'" + _doc_no + "','_warehouse_cd':'" + _warehouse_code + "','_item_cd':'" + item_code + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    if (data.d != null) {

                        if (data.d.indexOf('Session Time-out') > -1) {
                            window.location = "logout.aspx"
                        }
                        else {
                            if (data.d == "01") {
                                if (item_qcno == "" | item_qcno == undefined) {
                                    _return = 1;
                                }
                            }
                            else {
                                _return = 1;
                            }
                            
                        }
                    }

                    //else { window.location = "logout.aspx" }
                }//,
                //error: function (xhr, err) {
                //  $('#div_msg').html(xhr.responseText);
                // window.location = "GoogleLogout.aspx";
                //}
            });
            
        }

    });

    return _return
};

$.fn.enable_Form = function (edit_mode) {
    var qc_no;
    if ($("#txtItemQCNo").val() == undefined || $("#txtItemQCNo").val() == '') { qc_no = ''; };
    table.clear().draw();
    table.row.add([
       $("#txtItemCode").val(''),
       $("#txtItemDescs").val(''),
       $("#txtItemWeight").val(0),
       $("#txtItemUOM").val(''),
       $("#txtItemQuantity").val(0),
       $("#txtItemReceivingReceipt").val(''),
       $("#txtItemLotNo").val(''),
       qc_no,
       $("#txtItemMFGDate").val(''),
       $("#txtItemExpiryDate").val(''),
       '',
       '',
       0,
       $('#txtItemRemarks').val()
    ]).draw();
    $(".dataTables_scrollBody th").removeAttr('class');

    $("#txtsearch").val("")

    //$('#ContentPlaceHolder1_txtBatchNo').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtPostingDate').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtDocNo').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtDocDescs').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtReferenceNo').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtPONo').removeAttr('disabled');

    $('#ContentPlaceHolder1_txtStatus').removeAttr('disabled');
    //$('#txtTotalCost').removeAttr('disabled');
    $('#ContentPlaceHolder1_txtUserEntry').removeAttr('disabled');

    $("#ContentPlaceHolder1_DDepartment").attr('disabled', false);
    $("#ContentPlaceHolder1_DDivision").attr('disabled', false);
    $("#ContentPlaceHolder1_DDWarehouse").attr('disabled', false);

    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()

    // $('#ContentPlaceHolder1_txtBatchNo').val("##-####-####");
    $('#ContentPlaceHolder1_txtPostingDate').val(month + "/" + day + "/" + year);
    $('#ContentPlaceHolder1_txtDocNo').val("");
    $('#ContentPlaceHolder1_txtDocDescs').val("");
    $('#ContentPlaceHolder1_txtReferenceNo').val("");
    $('#ContentPlaceHolder1_txtPONo').val("");
    $('#ContentPlaceHolder1_txtStatus').val("New");
   // $('#txtTotalCost').val(0);
    $('#ContentPlaceHolder1_txtUserEntry').val($('#ContentPlaceHolder1_hidden_username').val());
    
    $('#ContentPlaceHolder1_txtReference_TrackingNo').val("")

    //$.fn.LoadDropDown("#ContentPlaceHolder1_DDepartment");
    //$.fn.LoadDropDown("#ContentPlaceHolder1_DDivision");
    //$.fn.LoadDropDown("#ContentPlaceHolder1_DDWarehouse");

    $('#search_reference').removeClass("search_show2");
    $('#search_reference').addClass("search_hide");

  
    
    $.fn.LoadTrxType(edit_mode);

    $("#btnAddItem").removeClass('disabled');

    if ($("#ContentPlaceHolder1_hidden_useraccess").val() == 'Administrator' || $("#ContentPlaceHolder1_hidden_useraccess").val() == 'Manager') {
        $('#li_email').removeClass('disabled');
        $('#li_approved').removeClass('disabled');
        $('#li_disapproved').removeClass('disabled');
    }

        $('#search_document').removeClass("search_show2");
        $('#search_document').addClass("search_hide");


        switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
            case 'IT':
                $("#ContentPlaceHolder1_DDTransfer_Company").attr('disabled', false);
                $("#ContentPlaceHolder1_DDTransfer_Warehouse").attr('disabled', false);
                //$("#ContentPlaceHolder1_DDTransfer_Status").attr('disabled', false);

                //$.fn.LoadDropDown("#ContentPlaceHolder1_DDTransfer_Company");
                //$.fn.LoadDropDown("#ContentPlaceHolder1_DDTransfer_Warehouse");
                //$.fn.setDropDownList(document.getElementById('ContentPlaceHolder1_DDTransfer_Status'), 'Encoding');
                $("#ContentPlaceHolder1_DDTransfer_Status").val('Encoding');

                $('#btnSave').disable(false);
                $('#btnAddItem').disable(false);
                if ($('#ContentPlaceHolder1_hidden_company').val() == $('#ContentPlaceHolder1_DDTransfer_Company option:selected').val() && $('#ContentPlaceHolder1_hidden_warehouse').val() == $('#ContentPlaceHolder1_DDTransfer_Warehouse option:selected').val()) {
                    $('#btnSave').disable(true);
                    $('#btnAddItem').disable(true);

                    $('#div_msg').html('');
                    $('#div_msg').html('<span style="color:red">Stock Transfer to same Company and Warehouse is not Allowed</span>');

                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                    }, 10000);

                }
        }

};

$.fn.disable_Form = function () {
    // $('#ContentPlaceHolder1_txtBatchNo').attr('disabled', true);
    $('#ContentPlaceHolder1_txtPostingDate').attr('disabled', true);
    $('#ContentPlaceHolder1_txtDocNo').attr('disabled', true);
    $('#ContentPlaceHolder1_txtDocDescs').attr('disabled', true);
    $('#ContentPlaceHolder1_txtReferenceNo').attr('disabled', true);
    $('#ContentPlaceHolder1_txtPONo').attr('disabled', true);
    $('#ContentPlaceHolder1_txtStatus').attr('disabled', true);
    //$('#txtTotalCost').attr('disabled', true);
    $('#ContentPlaceHolder1_txtUserEntry').attr('disabled', true);

    $("#ContentPlaceHolder1_DDepartment").attr('disabled', true);
    $("#ContentPlaceHolder1_DDivision").attr('disabled', true);
    //$("#ContentPlaceHolder1_DDWarehouse").attr('disabled', true);

    switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
        case 'IT':
            $("#ContentPlaceHolder1_DDTransfer_Company").attr('disabled', true);
            $("#ContentPlaceHolder1_DDTransfer_Warehouse").attr('disabled', true);
            $("#ContentPlaceHolder1_DDTransfer_Status").attr('disabled', true);
    }

    $('#search_reference').removeClass("search_show2");
    $('#search_reference').addClass("search_hide");

    $("#btnAddItem").addClass('disabled');
    $("#btnCancelItem").addClass('disabled');

    $('#btnAdd').disable(false);
    $('#btnSave').disable(true);
    $('#btnCancel').disable(true);

    $('#li_email').addClass('disabled');
    $('#li_approved').addClass('disabled');
    $('#li_disapproved').addClass('disabled');

};

$.fn.LoadDocument_Header = function (_doc_no) {

    $.ajax({
        type: "POST",
        url: "masterfile.asmx/_get_doc_header",
        data: "{'_doc_no':'" + _doc_no + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data.d != null) {

                if (data.d.indexOf('Session Time-out') > -1) {
                    window.location = "logout.aspx"
                }
                else {

                    $('#search_reference').removeClass("search_show2");
                    $('#search_reference').addClass("search_hide");

                    var _content;
                    var _return = data.d;

                    _content = _return.split("~");
                    
                    $('#ContentPlaceHolder1_txtDocNo').val(_content[0]);
                    $('#ContentPlaceHolder1_txtDocDescs').val(_content[1]);
                    $('#ContentPlaceHolder1_txtPostingDate').val(_content[2]);
                    $('#ContentPlaceHolder1_txtReferenceNo').val(_content[3]);
                    $("#ContentPlaceHolder1_txtPONo").val(_content[4]);
                    $("#ContentPlaceHolder1_DDepartment").val(_content[5]).attr("selected", "selected");
                    $("#ContentPlaceHolder1_DDivision").val(_content[6]).attr("selected", "selected");
                    $("#ContentPlaceHolder1_DDWarehouse").val(_content[7]).attr("selected", "selected");
                    var _warehouse_cd = _content[7];
                    $('#ContentPlaceHolder1_txtUserEntry').val(_content[8]);
                    
                    
                    switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
                        case 'IT':
                            $('#ContentPlaceHolder1_txtReference_TrackingNo').val(_content[9]);
                            $("#ContentPlaceHolder1_DDTransfer_Company").val(_content[11]).attr("selected", "selected");
                            $("#ContentPlaceHolder1_DDTransfer_Warehouse").val(_content[12]).attr("selected", "selected");
                            $("#ContentPlaceHolder1_DDTransfer_Status").val(_content[13]).attr("selected", "selected");
                           
                            break;
                        case 'RQ':
                            $('#ContentPlaceHolder1_txtReference_TrackingNo').val(_content[9])
                            $('#ContentPlaceHolder1_RB_QC_Process [type=radio][value=' + _content[10] + ']').prop('checked', true);
                            if (_content[10] >= 2) { 
                                $("#btnAddItem").addClass('disabled');
                                $("#ContentPlaceHolder1_DDWarehouse").attr('disabled', true);
                            };
                            break;
                        case 'IQ':
                            $.fn.LoadQuarantine_reference(_content[3]);
                            break;
                        default:
                            
                            $('#ContentPlaceHolder1_txtReference_TrackingNo').val(_content[9])
                            if (_content[10] != "") { 
                                $('#ContentPlaceHolder1_RB_QC_Process [type=radio][value=' + _content[10] + ']').prop('checked', true);
                            }
                            break;
                    }

                    

                    $('#ContentPlaceHolder1_div_reference').removeClass("div_ref_show");
                    $('#ContentPlaceHolder1_div_reference').addClass("div_ref_hide");
                    $("#ContentPlaceHolder1_hidden_ref_trx_type").val('')

                    var ref_no = $('#ContentPlaceHolder1_txtReferenceNo').val();
                    if (ref_no.indexOf('ST') > -1) {
                        $('#ContentPlaceHolder1_div_reference').removeClass("div_ref_hide");
                        $('#ContentPlaceHolder1_div_reference').addClass("div_ref_show");
                        $("#ContentPlaceHolder1_hidden_ref_trx_type").val('IT')
                        $("#btnAddItem").addClass('disabled');
                    };

                    $('#ContentPlaceHolder1_txtStatus').val("Draft");

                    $.fn.LoadDocument_Details(_doc_no, _warehouse_cd);

                }
            }

            //else { window.location = "logout.aspx" }
        }//,
        //error: function (xhr, err) {
        //  $('#div_msg').html(xhr.responseText);
        // window.location = "GoogleLogout.aspx";
        //}
    })


};

$.fn.LoadQuarantine_reference = function (_doc_no) {

    $.ajax({
        async:false,
        type: "POST",
        url: "masterfile.asmx/_get_quarantine_reference",
        data: "{'_doc_no':'" + _doc_no + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data.d != null) {

                if (data.d.indexOf('Session Time-out') > -1) {
                    window.location = "logout.aspx"
                }
                else {

                    var _return = data.d;

                    $('#ContentPlaceHolder1_RB_QC_Process [type=radio][value=' + _return + ']').prop('checked', true);

                };

            }

            //else { window.location = "logout.aspx" }
        }//,
        //error: function (xhr, err) {
        //  $('#div_msg').html(xhr.responseText);
        // window.location = "GoogleLogout.aspx";
        //}
    })


};

$.fn.LoadDocument_Details = function (_doc_no, _warehouse_cd) {
    var qc_no;
    if ($("#txtItemQCNo").val() == undefined || $("#txtItemQCNo").val() == '') { qc_no = ''; }
    else { qc_no = $("#txtItemQCNo").val(); };

    table.clear().draw();
    table.row.add([
     $("#txtItemCode").val(),
     $("#txtItemDescs").val(),
     $("#txtItemWeight").val(),
     $("#txtItemUOM").val(),
     $("#txtItemQuantity").val(),
     $("#txtItemReceivingReceipt").val(),
     $("#txtItemLotNo").val(),
     qc_no,
     $("#txtItemMFGDate").val(),
     $("#txtItemExpiryDate").val(),
     0,
     '',
     0,
     $("#txtItemRemarks").val()
    ]).draw();

    $.ajax({
        type: "POST",
        url: "masterfile.asmx/_get_doc_details",
        data: "{'_doc_no':'" + _doc_no + "','_warehouse_cd':'" + _warehouse_cd + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data.d != null) {

                if (data.d.indexOf('Session Time-out') > -1) {
                    window.location = "logout.aspx"
                }
                else {
                    var json = jQuery.parseJSON(data.d);

                    $(json).each(function (i, val) {

                        table.row.add([
                               val.item_cd,
                               val.descs,
                               val.item_weight,
                               val.uom,
                               val.qty,
                               val.receiving_receipt,
                               val.lot_no,
                               val.qc_no,
                               val.mfg_date,
                               val.expiry_date,
                               val.available_qty,
                               val.conversion_uom,
                               val.conversion_factor,
                               val.item_remarks
                        ]).draw();

                    });

                    //$.fn.TotalCost();

                }
            }

            //else { window.location = "logout.aspx" }
        }//,
        //error: function (xhr, err) {
        //  $('#div_msg').html(xhr.responseText);
        // window.location = "GoogleLogout.aspx";
        //}
    })

  
   
    $(".dataTables_scrollBody th").removeAttr('class');

      
    
};

$.fn.LoadDropDown = function (obj) {

        $.ajax({
            type: "POST",
            url: "masterfile.asmx/BindInventoryDropdownlist",
            data: "{'_obj': '" + obj + "'}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $(obj).empty();
                if (data.d != null) {
                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else {
                        var jsdata = JSON.parse(data.d);
                        $.each(jsdata, function (key, value) {
                            $(obj).append($("<option></option>").val(value.Code).html(value.Descs));
                        });
                    }
                }
              
            }//,
            //error: function (data) {
            //  alert("error found");
            //}
        });

    };

$.fn.SaveRecords = function () {
    var _doc_no = $('#ContentPlaceHolder1_txtDocNo').val();
    var _Transfer_Company = "";
    var _Transfer_Warehouse = "";
    var _Transfer_Status = "";
    var _Tracking_No = $('#ContentPlaceHolder1_txtReference_TrackingNo').val();
    switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
        case 'IT':
            _Transfer_Company = $('#ContentPlaceHolder1_DDTransfer_Company option:selected').val();
            _Transfer_Warehouse = $('#ContentPlaceHolder1_DDTransfer_Warehouse option:selected').val();
            _Transfer_Status = $('#ContentPlaceHolder1_DDTransfer_Status option:selected').val();
    }

    if (_doc_no.indexOf("#") > -1) { 
        
        $.ajax({
            async:false,
            type: "POST",
            url: "masterfile.asmx/_get_doc_no",
            data: "{'_Doc_No':'" + $('#ContentPlaceHolder1_txtDocNo').val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {
                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else {
                        $('#ContentPlaceHolder1_txtDocNo').val(data.d);

                        var table = $("#tbl_MFITem_inventory tbody");
                        var counter = -1;
                        table.find('tr').each(function (i) {
                            var $tds = $(this).find('td'),
                                    item_code = $tds.eq(0).text(),
                                    item_descs = $tds.eq(1).text(),
                                    item_weight = $tds.eq(2).text(),
                                    item_uom = $tds.eq(3).text(),
                                    item_qty = $tds.eq(4).text(),
                                    item_receiving_receipt = $tds.eq(5).text(),
                                    item_lotno = $tds.eq(6).text(),
                                    item_qcno = $tds.eq(7).text(),
                                    item_mfgdate = $tds.eq(8).text(),
                                    item_expirydate = $tds.eq(9).text(),
                                    item_available = $tds.eq(10).text(),
                                    item_conversion_uom = $tds.eq(11).text(),
                                    item_conversion_factor = $tds.eq(12).text(),
                                    item_remarks = $tds.eq(13).text();

                            counter++;
                            var sfind;
                            sfind = 0;
                            if (item_code == '') {
                                sfind = 1;
                            }
                            if (item_code == '[object Object]') {
                                sfind = 1;
                            }
                            if (item_code == undefined) {
                                sfind = 1;
                            }

                            if (sfind == 0) {
                                if (item_expirydate == '' || item_expirydate == undefined) { item_expirydate='12/31/9999' }

                                $.fn.SaveRecord_Itemlist(counter, $("#ContentPlaceHolder1_DDWarehouse option:selected").val(), $('#ContentPlaceHolder1_txtDocNo').val(),
                                    $('#ContentPlaceHolder1_txtPostingDate').val(),
                                    $('#ContentPlaceHolder1_txtDocDescs').val(), $('#ContentPlaceHolder1_txtReferenceNo').val(),
                                    $('#ContentPlaceHolder1_txtPONo').val(),
                                    item_code, item_qty, 0, 0, item_receiving_receipt, item_lotno, item_qcno, item_mfgdate, item_expirydate, 'Draft',
                                    $('#ContentPlaceHolder1_DDivision option:selected').val(), $('#ContentPlaceHolder1_DDepartment option:selected').val(),
                                    item_uom, item_weight, $('#ContentPlaceHolder1_txtUserEntry').val(),
                                    _Transfer_Company, _Transfer_Warehouse, _Transfer_Status, _Tracking_No,
                                    item_conversion_uom, item_conversion_factor, item_remarks)
                            }

                        });

                        $('#div_msg').html('');
                        $('#div_msg').html("New Stock Inventory record saved...<br /> Document No. : " + $('#ContentPlaceHolder1_txtDocNo').val());

                        $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                        setTimeout(function () {
                            $("#div_msg").fadeOut('slow');
                        }, 10000);
                    }
                }
                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        })

    }
    else {

        $.ajax({
            async: false,
            type: "POST",
            url: "masterfile.asmx/_delete_doc_no",
            data: "{'_Doc_No':'" + $('#ContentPlaceHolder1_txtDocNo').val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {
                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else {
                        var table = $("#tbl_MFITem_inventory tbody");
                        var counter = -1;
                        table.find('tr').each(function (i) {
                            var $tds = $(this).find('td'),
                                    item_code = $tds.eq(0).text(),
                                    item_descs = $tds.eq(1).text(),
                                    item_weight = $tds.eq(2).text(),
                                    item_uom = $tds.eq(3).text(),
                                    item_qty = $tds.eq(4).text(),
                                    item_receiving_receipt = $tds.eq(5).text(),
                                    item_lotno = $tds.eq(6).text(),
                                    item_qcno = $tds.eq(7).text(),
                                    item_mfgdate = $tds.eq(8).text(),
                                    item_expirydate = $tds.eq(9).text(),
                                    item_available = $tds.eq(10).text(),
                                        item_conversion_uom = $tds.eq(11).text(),
                                        item_conversion_factor = $tds.eq(12).text(),
                                        item_remarks = $tds.eq(13).text();
                            counter++;

                            var sfind;
                            sfind = 0;

                            if (item_code == '') {
                                sfind = 1;
                            }
                            if (item_code == '[object Object]') {
                                sfind = 1;
                            }
                            if (item_code == undefined) {
                                sfind = 1;
                            }

                            if (sfind == 0) {

                                if (item_expirydate == '' || item_expirydate == undefined) { item_expirydate = '12/31/9999' }

                                $.fn.SaveRecord_Itemlist(counter, $("#ContentPlaceHolder1_DDWarehouse option:selected").val(), $('#ContentPlaceHolder1_txtDocNo').val(),
                                    $('#ContentPlaceHolder1_txtPostingDate').val(),
                                    $('#ContentPlaceHolder1_txtDocDescs').val(), $('#ContentPlaceHolder1_txtReferenceNo').val(),
                                    $('#ContentPlaceHolder1_txtPONo').val(),
                                    item_code, item_qty, 0, 0, item_receiving_receipt, item_lotno, item_qcno, item_mfgdate, item_expirydate, 'Draft',
                                    $('#ContentPlaceHolder1_DDivision option:selected').val(), $('#ContentPlaceHolder1_DDepartment option:selected').val(),
                                    item_uom, item_weight, $('#ContentPlaceHolder1_txtUserEntry').val(),
                                    _Transfer_Company, _Transfer_Warehouse, _Transfer_Status, _Tracking_No, item_conversion_uom, item_conversion_factor, item_remarks)

                            }

                        });

                        $('#div_msg').html('');
                        $('#div_msg').html("Stock Inventory record updated...<br /> Document No. : " + $('#ContentPlaceHolder1_txtDocNo').val());

                        $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                        setTimeout(function () {
                            $("#div_msg").fadeOut('slow');
                        }, 10000);
                    }
                }
                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
        // window.location = "GoogleLogout.aspx";
            //}
        })

    }
};

$.fn.SaveRecord_Itemlist = function (item_sequence, warehouse_cd, doc_no, doc_date, descs, ref_no,
                                po_no,
                                item_cd, qty, unit_cost, total_cost,
                                receiving_receipt, lot_no, qc_no, mfg_date, expiry_date, status, div_cd, dept_cd, uom, item_weight, created_user,
                                transfer_company_cd, transfer_warehouse_cd, transfer_status_cd, _Tracking_No, item_conversion_uom, item_conversion_factor, item_remarks) {

        var _return;
        var _data;

        if (item_cd != '') {
            _data = "{"
            _data = _data + "'item_sequence':'" + item_sequence + "', "
            _data = _data + "'warehouse_cd':'" + warehouse_cd + "', "
            _data = _data + "'doc_no':'" + doc_no + "', "
            _data = _data + "'doc_date':'" + doc_date + "', "
            _data = _data + "'descs':'" + descs.replace("'", "") + "', "
            _data = _data + "'ref_no':'" + ref_no + "', "
            _data = _data + "'po_no':'" + po_no + "', "
            _data = _data + "'item_cd':'" + item_cd + "', "
            _data = _data + "'qty':'" + qty + "', "
            _data = _data + "'unit_cost':'" + unit_cost + "', "
            _data = _data + "'total_cost':'" + total_cost + "', "
            _data = _data + "'receiving_receipt':'" + receiving_receipt + "', "
            _data = _data + "'lot_no':'" + lot_no + "', "
            _data = _data + "'qc_no':'" + qc_no + "', "
            _data = _data + "'mfg_date':'" + mfg_date + "', "
            _data = _data + "'expiry_date':'" + expiry_date + "', "
            _data = _data + "'status':'" + status + "', "
            _data = _data + "'div_cd':'" + div_cd + "', "
            _data = _data + "'dept_cd':'" + dept_cd + "', "
            _data = _data + "'uom':'" + uom.replace("'", "") + "', "
            _data = _data + "'item_weight':'" + item_weight + "', "
            _data = _data + "'created_user':'" + created_user + "', "
            _data = _data + "'transfer_company_cd':'" + transfer_company_cd + "', "
            _data = _data + "'transfer_warehouse_cd':'" + transfer_warehouse_cd + "', "
            _data = _data + "'transfer_status_cd':'" + transfer_status_cd + "', "
            _data = _data + "'tracking_no':'" + _Tracking_No + "', "
            _data = _data + "'item_conversion_uom':'" + item_conversion_uom + "', "
            _data = _data + "'item_conversion_factor':'" + item_conversion_factor + "', "
            _data = _data + "'item_remarks':'" + item_remarks + "' "
            _data = _data + "}"

            $.ajax({
                async: false,
                type: "POST",
                url: "masterfile.asmx/Save_Inventory",
                data: _data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    if (data.d != null) {

                        _return = data.d;
                        
                    }

                    //else { window.location = "logout.aspx" }
                }//,
                //error: function (xhr, err) {
                //  $('#div_msg').html(xhr.responseText);
                // window.location = "GoogleLogout.aspx";
                //}
            })
        };
       
};

$.fn.LoadTrxType = function (edit_mode) {

        $.ajax({
            type: "POST",
            url: "masterfile.asmx/_get_trx_type",
            data: "{'edit_mode':'" + edit_mode + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {
                
                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else {
                        if (edit_mode == 0) { 
                            var _content;
                            var _return = data.d;

                                _content = _return.split(",");
                                $('#ContentPlaceHolder1_txtDocNo').val(_content[0]);
                                $('#ContentPlaceHolder1_txtDocDescs').val(_content[1]);
                        }
                    }
                }

                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        })


    };

$.fn.setDropDownList = function (elementRef, valueToSetTo) {
    var isFound = false;
    for (var i = 0; i < elementRef.options.length; i++) {
        if (elementRef.options[i].value == valueToSetTo) {
            elementRef.options[i].selected = true;
            isFound = true;
        }
    }
}

$.fn.UpdateRecord = function (warehouse_cd, doc_no, status, remarks, ref_no, tracking_no) {

    var _return;
    var _data;

    if (doc_no != '') {
        _data = "{"
        _data = _data + "'warehouse_cd':'" + warehouse_cd + "', "
        _data = _data + "'doc_no':'" + doc_no + "', "
        _data = _data + "'status':'" + status + "', "
        _data = _data + "'remarks':'" + remarks.replace("'", "") + "', "
        _data = _data + "'ref_no':'" + ref_no.replace("'", "") + "', "
        _data = _data + "'tracking_no':'" + tracking_no.replace("'", "") + "' "
        _data = _data + "}"

        $.ajax({
            async:false,
            type: "POST",
            url: "masterfile.asmx/Update_Inventory",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {

                    _return = data.d;

                    $('#div_msg').html('');
                    $('#div_msg').html(_return);

                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                    }, 10000);

                    $('#ContentPlaceHolder1_txtStatus').val("Approved");

                }

                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        })
    };

};

$.fn.UpdateRecord_Sampling = function (warehouse_cd, doc_no, status, remarks, ref_no, tracking_no) {

    var _return;
    var _data;

    if (doc_no != '') {
        _data = "{"
        _data = _data + "'warehouse_cd':'" + warehouse_cd + "', "
        _data = _data + "'doc_no':'" + doc_no + "', "
        _data = _data + "'status':'" + status + "', "
        _data = _data + "'remarks':'" + remarks.replace("'", "") + "', "
        _data = _data + "'ref_no':'" + ref_no.replace("'", "") + "', "
        _data = _data + "'tracking_no':'" + tracking_no.replace("'", "") + "' "
        _data = _data + "}"

        $.ajax({
            async: false,
            type: "POST",
            url: "masterfile.asmx/Update_Inventory_Sampling",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {

                    _return = data.d;

                    $('#div_msg').html('');
                    $('#div_msg').html(_return);

                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                    }, 10000);

                    $('#ContentPlaceHolder1_txtStatus').val("Approved");

                }

                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        })
    };

};

//APPROVED ENTRY=================================================================
$('#li_approved').click(function () {
    var _doc_no = $('#ContentPlaceHolder1_txtDocNo').val();
    if (_doc_no.indexOf("#") == -1) {
        if (!$('#li_approved').hasClass('disabled')) {

            var rowCount = $('#tbl_MFITem_inventory >tbody >tr').length;
            if (rowCount == 1) {

                $('#div_msg').html('');
                $('#div_msg').html('<span style="color:red">No Stock Item(s) in the List.<br/>Please add an item to continue...</span>');

                $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                setTimeout(function () {
                    $("#div_msg").fadeOut('slow');
                }, 10000);

            }
            else {

                // var _batch_no = $('#ContentPlaceHolder1_txtBatchNo').val();
                var _posting_date = $('#ContentPlaceHolder1_txtPostingDate').val();
                var _document_no = $('#ContentPlaceHolder1_txtDocNo').val();
                var _description = $('#ContentPlaceHolder1_txtDocDescs').val();
                var _department_code = $('#ContentPlaceHolder1_DDepartment option:selected').val();
                //var _division_code = $('#ContentPlaceHolder1_DDivision option:selected').val();
                var _warehouse_code = $('#ContentPlaceHolder1_DDWarehouse option:selected').val();
                var _reference_no = $('#ContentPlaceHolder1_txtReferenceNo').val();

                var _sfind = 0;
                // if (_batch_no == undefined || _batch_no == '') { _sfind = 1; }
                if (_posting_date == undefined || _posting_date == '') { _sfind = 1; }
                if (_document_no == undefined || _document_no == '') { _sfind = 1; }
                if (_description == undefined || _description == '') { _sfind = 1; }
                if (_department_code == undefined || _department_code == '') { _sfind = 1; }
                //if (_division_code == undefined || _division_code == '') { _sfind = 1; }
                if (_warehouse_code == undefined || _warehouse_code == '') { _sfind = 1; }

                if (_sfind == 0) {
                    
                    switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
                        case 'RQ':
                            if ($.fn.check_table_item_for_qc(_document_no, _warehouse_code) == 0) {
                                $.confirm({
                                    title: 'Do you want to approve this entry? <br /><b> Document No. : ' + _document_no + '</b>',
                                    confirmButton: 'Approve',
                                    confirmButtonClass: 'btn-info',
                                    content: '<div class="form-group"><label>Remarks</label><input type="text" id="input-remarks" placeholder="remarks" class="form-control"></div><p class="text-danger" style="display:none">Remarks is required!</p>',
                                    confirm: function () {
                                        var input = this.$b.find('input#input-remarks');
                                        var errorText = this.$b.find('.text-danger');
                                        if (input.val() == '') {
                                            errorText.show();
                                            return false;
                                        } else {
                                            $.fn.SaveRecords();
                                            $.fn.UpdateRecord($("#ContentPlaceHolder1_DDWarehouse option:selected").val(), $('#ContentPlaceHolder1_txtDocNo').val(),
                                                                'Approved', input.val(), $('#ContentPlaceHolder1_txtReferenceNo').val(),
                                                                $('#ContentPlaceHolder1_txtReference_TrackingNo').val());

                                            $('#btnAdd').disable(false);
                                            $('#btnSave').disable(true);
                                            $('#btnCancel').disable(true);

                                            $.fn.disable_Form();

                                            if (_document_no.indexOf("IQ") > -1) {
                                                $.fn.update_quarantine_process(_reference_no, 3);
                                                $.fn.UpdateQuarantineQuantity(_reference_no, $('#ContentPlaceHolder1_txtDocNo').val());
                                            };
                                        }
                                    }
                                });
                            }
                            else {
                                $('#div_msg').html('');
                                $('#div_msg').html('<span style="color:red">Quality Control No. not found or still no QC Sample Result...</span>');

                                $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                                setTimeout(function () {
                                    $("#div_msg").fadeOut('slow');
                                }, 10000);
                            };
                            break;
                        default:
                            $.confirm({
                                title: 'Do you want to approve this entry? <br /><b> Document No. : ' + _document_no + '</b>',
                                confirmButton: 'Approve',
                                confirmButtonClass: 'btn-info',
                                content: '<div class="form-group"><label>Remarks</label><input type="text" id="input-remarks" placeholder="remarks" class="form-control"></div><p class="text-danger" style="display:none">Remarks is required!</p>',
                                confirm: function () {
                                    var input = this.$b.find('input#input-remarks');
                                    var errorText = this.$b.find('.text-danger');
                                    if (input.val() == '') {
                                        errorText.show();
                                        return false;
                                    } else {
                                        $.fn.SaveRecords();
                                        $.fn.UpdateRecord($("#ContentPlaceHolder1_DDWarehouse option:selected").val(), $('#ContentPlaceHolder1_txtDocNo').val(),
                                                            'Approved', input.val(), $('#ContentPlaceHolder1_txtReferenceNo').val(),
                                                            $('#ContentPlaceHolder1_txtReference_TrackingNo').val());

                                        $('#btnAdd').disable(false);
                                        $('#btnSave').disable(true);
                                        $('#btnCancel').disable(true);

                                        $.fn.disable_Form();

                                        if (_document_no.indexOf("IQ") > -1) {
                                            $.fn.update_quarantine_process(_reference_no, 3);
                                            //$.fn.UpdateQuarantineQuantity(_reference_no, $('#ContentPlaceHolder1_txtDocNo').val());
                                        };
                                    }
                                }
                            });
                            break;
                    };
                      
                  
                }
                else {
                    $('#div_msg').html('');
                    $('#div_msg').html('<span style="color:red">Required header fields need to be filled-up to add an item details...</span>');

                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                    }, 10000);
                }

            }
        }
    }
    else {
        $('#div_msg').html('');
        $('#div_msg').html('<span style="color:red">Invalid Document No.</span>');

        $("#div_msg").hide().fadeIn('slow'); //.slideDown();
        setTimeout(function () {
            $("#div_msg").fadeOut('slow');
        }, 10000);
    };
    });

//DISAPPROVED ENTRY=================================================================
$('#li_disapproved').click(function () {
    if (!$('#li_disapproved').hasClass('disabled')) {

        var rowCount = $('#tbl_MFITem_inventory >tbody >tr').length;
        if (rowCount == 1) {

            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:red">No Stock Item(s) in the List.<br/>Please add an item to continue...</span>');

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);

        }
        else {

            // var _batch_no = $('#ContentPlaceHolder1_txtBatchNo').val();
            var _posting_date = $('#ContentPlaceHolder1_txtPostingDate').val();
            var _document_no = $('#ContentPlaceHolder1_txtDocNo').val();
            var _description = $('#ContentPlaceHolder1_txtDocDescs').val();
            var _department_code = $('#ContentPlaceHolder1_DDepartment option:selected').val();
            //var _division_code = $('#ContentPlaceHolder1_DDivision option:selected').val();
            var _warehouse_code = $('#ContentPlaceHolder1_DDWarehouse option:selected').val();
            var _reference_no = $('#ContentPlaceHolder1_txtReferenceNo').val();

            var _sfind = 0;
            // if (_batch_no == undefined || _batch_no == '') { _sfind = 1; }
            if (_posting_date == undefined || _posting_date == '') { _sfind = 1; }
            if (_document_no == undefined || _document_no == '') { _sfind = 1; }
            if (_description == undefined || _description == '') { _sfind = 1; }
            if (_department_code == undefined || _department_code == '') { _sfind = 1; }
            //if (_division_code == undefined || _division_code == '') { _sfind = 1; }
            if (_warehouse_code == undefined || _warehouse_code == '') { _sfind = 1; }

            if (_sfind == 0) {
                $.confirm({
                    title: 'Do you want to disapprove this entry? <br /><b> Document No. : ' + _document_no + '</b>',
                    confirmButton: 'disapprove',
                    confirmButtonClass: 'btn-info',
                    content: '<div class="form-group"><label>Remarks</label><input type="text" id="input-remarks" placeholder="remarks" class="form-control"></div><p class="text-danger" style="display:none">Remarks is required!</p>',
                    confirm: function () {
                        var input = this.$b.find('input#input-remarks');
                        var errorText = this.$b.find('.text-danger');
                        if (input.val() == '') {
                            errorText.show();
                            return false;
                        } else {
                            
                            if (_document_no.indexOf("IQ") > -1) {
                                $.fn.UpdateRecord($("#ContentPlaceHolder1_DDWarehouse option:selected").val(), $('#ContentPlaceHolder1_txtDocNo').val(),
                                                'Disapproved', input.val(), $('#ContentPlaceHolder1_txtReferenceNo').val(),
                                            $('#ContentPlaceHolder1_txtReference_TrackingNo').val());
                                $.fn.update_quarantine_process(_reference_no, 3);
                                $.fn.UpdateRecord_Sampling($("#ContentPlaceHolder1_DDWarehouse option:selected").val(), _reference_no,
                                                'Disapproved', input.val(), _document_no,
                                            $('#ContentPlaceHolder1_txtReference_TrackingNo').val());

                            }
                            else {

                                $.fn.UpdateRecord($("#ContentPlaceHolder1_DDWarehouse option:selected").val(), $('#ContentPlaceHolder1_txtDocNo').val(),
                                                'Disapproved', input.val(), $('#ContentPlaceHolder1_txtReferenceNo').val(),
                                            $('#ContentPlaceHolder1_txtReference_TrackingNo').val());
                            };


                            $('#btnAdd').disable(false);
                            $('#btnSave').disable(true);
                            $('#btnCancel').disable(true);

                            $.fn.disable_Form();

                        }
                    }
                });

            }
            else {
                $('#div_msg').html('');
                $('#div_msg').html('<span style="color:red">Required header fields need to be filled-up to add an item details...</span>');

                $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                setTimeout(function () {
                    $("#div_msg").fadeOut('slow');
                }, 10000);
            }

        }
    }
});

$('#link_print').on('click', function () {
    $('#ViewReportModal').modal('show');
    $.fn.LoadDropDown_Documents('#ContentPlaceHolder1_DDDocuments',
                              $("#ContentPlaceHolder1_DDWarehouse option:selected").val(),
                              $('#txtReportFrom').val(),
                              $('#txtReportTo').val(),
                              $("#ContentPlaceHolder1_DDStatus option:selected").val());
});

$('#btnViewReport').on('click', function () {
    
    var _document_no = $('#ContentPlaceHolder1_DDDocuments option:selected').val();
    var _view = $('#ContentPlaceHolder1_DDView option:selected').val();
    var _status = $('#ContentPlaceHolder1_DDStatus option:selected').val();
    var _warehouse_cd = $('#ContentPlaceHolder1_DDWarehouse option:selected').val();
    var _date_from = $('#txtReportFrom').val() + ' 00:00:00';
    var _date_to = $('#txtReportTo').val() + ' 23:59:59';

    //var _selected_doc = $('#ContentPlaceHolder1_txtDocNo').val();

    if (_view == "Selected Document") { if (_document_no == undefined ) { _document_no = 'All'; } 
                                        else if (_document_no == '' )  { _document_no = 'All'; } 
                                        else if (_document_no.indexOf("#") > -1) { _document_no = 'All'; } }
    else if (_view == 'All') { _document_no = 'All'; }

    if (_status == undefined || _status == 'Selected') { _status = 'All'; }
    if (_warehouse_cd == undefined) { _warehouse_cd = 'All'; }

    //var fill_doc = 0;
    //if (_selected_doc != undefined) { fill_doc = 1;}
    //else if (_selected_doc != '') { fill_doc = 1; }
    //else if (_selected_doc.indexOf("#") > -1) { fill_doc = 1; }

    //if (fill_doc == 0) { 
    //    _document_no = _selected_doc;
    //}

    var _report = "report.aspx?Report=listing&Doc_No=" + _document_no + "&Status=" + _status + "&WareHouse_code=" + _warehouse_cd + "&DateFrom=" + _date_from + "&DateTo=" + _date_to

    window.open(_report, "popupWindow", "width=1020,height=600,scrollbars=yes");

    $('#ViewReportModal').modal('hide');
});

$('#btnRefNo').click(function () {
    if ($('#ContentPlaceHolder1_txtReference_TrackingNo').val() != '') {
        $.fn.LoadReference_Details($('#ContentPlaceHolder1_txtReferenceNo').val(), $('#ContentPlaceHolder1_hidden_ref_trx_type').val(), $('#ContentPlaceHolder1_DDWarehouse option:selected').val(), $('#ContentPlaceHolder1_txtReference_TrackingNo').val());
    }
    else {
        $('#div_msg').html('');
        $('#div_msg').html('<span style="color:red">Tracking No. is Required to retrieve the item details...</span>');

        $("#div_msg").hide().fadeIn('slow'); //.slideDown();
        setTimeout(function () {
            $("#div_msg").fadeOut('slow');
        }, 10000);
    }
});

$.fn.clear_table = function () {
    var qc_no;
    if ($("#txtItemQCNo").val() == undefined || $("#txtItemQCNo").val() == '') { qc_no = ''; }
    else { qc_no = $("#txtItemQCNo").val(); };

    table.clear().draw();
    table.row.add([
     $("#txtItemCode").val(),
     $("#txtItemDescs").val(),
     $("#txtItemWeight").val(),
     $("#txtItemUOM").val(),
     $("#txtItemQuantity").val(),
     $("#txtItemReceivingReceipt").val(),
     $("#txtItemLotNo").val(),
     qc_no,
     $("#txtItemMFGDate").val(),
     $("#txtItemExpiryDate").val(),
     0,
     '',
     0,
     $("#txtItemRemarks").val()
    ]).draw();
   
    
};

$.fn.LoadReference_Details = function (_doc_no, _trx_type, _warehouse_cd, _tracking_no) {

    var qc_no;
    if ($("#txtItemQCNo").val() == undefined || $("#txtItemQCNo").val() == '') { qc_no = ''; }
    else { qc_no = $("#txtItemQCNo").val(); };

    table.clear().draw();
    table.row.add([
     $("#txtItemCode").val(),
     $("#txtItemDescs").val(),
     $("#txtItemWeight").val(),
     $("#txtItemUOM").val(),
     $("#txtItemQuantity").val(),
     $("#txtItemReceivingReceipt").val(),
     $("#txtItemLotNo").val(),
     qc_no,
     $("#txtItemMFGDate").val(),
     $("#txtItemExpiryDate").val(),
     0,
     '',
     0,
     $("#txtItemRemarks").val()
    ]).draw();

    $.ajax({
        type: "POST",
        url: "masterfile.asmx/_get_reference_details",
        data: "{'_doc_no':'" + _doc_no + "','_trx_type':'" + _trx_type + "','_warehouse_cd':'" + _warehouse_cd + "','_tracking_no':'" + _tracking_no + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data.d != null) {

                if (data.d.indexOf('Session Time-out') > -1) {
                    window.location = "logout.aspx"
                }
                else if (data.d.indexOf('Invalid Tracking No.') > -1) {
                    $('#div_msg').html('');
                    $('#div_msg').html(data.d);

                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                    }, 10000);
                }
                else {
                    var json = jQuery.parseJSON(data.d);

                    $(json).each(function (i, val) {

                        table.row.add([
                               val.item_cd,
                               val.descs,
                               val.item_weight,
                               val.uom,
                               val.qty,
                               val.receiving_receipt,
                               val.lot_no,
                               val.qc_no,
                               val.mfg_date,
                               val.expiry_date,
                               val.available_qty,
                               val.conversion_uom,
                               val.conversion_factor
                        ]).draw();

                    });

                    //$.fn.TotalCost();

                    $('#div_msg').html('');
                    $('#div_msg').html('Invetory Stock item details retrieved...');

                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                    }, 10000);
                }
            }

            //else { window.location = "logout.aspx" }
        }//,
        //error: function (xhr, err) {
        //  $('#div_msg').html(xhr.responseText);
        // window.location = "GoogleLogout.aspx";
        //}
    })

  
   
    $(".dataTables_scrollBody th").removeAttr('class');

      
    
};

$.fn.LoadDropDown_Documents = function (obj, _warehouse_cd, _date_from, _date_to, _status) {

    $.ajax({
        type: "POST",
        url: "masterfile.asmx/BindInventoryReportDocument",
        data: "{'_obj': '" + obj + "','_warehouse_cd': '" + _warehouse_cd + "','_date_from': '" + _date_from + "','_date_to': '" + _date_to + "','_status': '" + _status + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $(obj).empty();
            if (data.d != null) {
                if (data.d.indexOf('Session Time-out') > -1) {
                    window.location = "logout.aspx"
                }
                else {
                
                    var jsdata = JSON.parse(data.d);
                    $.each(jsdata, function (key, value) {
                        $(obj).append($("<option></option>").val(value.Code).html(value.Descs));
                    });
                }
            }

        }//,
        //error: function (data) {
        //  alert("error found");
        //}
    });

};

$("select[id*='DDStatus']").bind("change", function () {
    $.fn.LoadDropDown_Documents('#ContentPlaceHolder1_DDDocuments',
                                $("#ContentPlaceHolder1_DDWarehouse option:selected").val(),
                                $('#txtReportFrom').val(),
                                $('#txtReportTo').val(),
                                $("#ContentPlaceHolder1_DDStatus option:selected").val());
});

$("select[id*='DDConversion_UOM']").bind("change", function () {

    $.fn.Conversion_compute_minus();
    $.fn.Conversion_compute_plus();

});

$.fn.Conversion_compute_minus = function () {
    
    var _factor = $("#ContentPlaceHolder1_DDConversion_UOM option:selected").val();
    if (_factor != undefined) {
        _factor = _factor.substring(_factor.indexOf("-") + 1)

        if ($("#txtConversion_factor").val() != '') {
            var val = $.fn.number_comma($("#txtItemQuantity").val());
            val = val / $.fn.number_comma($("#txtConversion_factor").val());
            $("#txtItemQuantity").val($.fn.addCommasWithDecimal(val, 4));

            val = $.fn.number_comma($("#hidden_available_qty").val());
            val = val / $.fn.number_comma($("#txtConversion_factor").val());
            $("#hidden_available_qty").val($.fn.addCommasWithDecimal(val, 4));

        }
        $("#txtConversion_factor").val(0);
    };
};

$.fn.Conversion_compute_plus = function () {
    //if (parseFloat($.fn.number_comma($("#txtItemQuantity").val())) > parseFloat($.fn.number_comma($("#hidden_org_qty").val()))) {
    //    $("#txtItemQuantity").val($("#hidden_org_qty").val());
    //    $("#hidden_available_qty").val($("#hidden_org_qty").val());
    //}
    
    var _factor = $("#ContentPlaceHolder1_DDConversion_UOM option:selected").val();
    if (_factor != undefined) {
        _factor = _factor.substring(_factor.indexOf("-") + 1)

        $("#txtConversion_factor").val($.fn.addCommasWithDecimal(parseFloat(_factor), 4));
        
        var val = $.fn.number_comma($("#txtItemQuantity").val());
        val = val * $.fn.number_comma($("#txtConversion_factor").val());
        $("#txtItemQuantity").val($.fn.addCommasWithDecimal(val, 4));

        val = $.fn.number_comma($("#hidden_available_qty").val());
        val = val * $.fn.number_comma($("#txtConversion_factor").val());
        $("#hidden_available_qty").val($.fn.addCommasWithDecimal(val, 4));
    }
    else {
          $('#div_conversion_dd').removeClass("div_ref_show");
          $('#div_conversion_dd').addClass("div_ref_hide");
        
          $('#div_conversion_txt').removeClass("div_ref_show");
          $('#div_conversion_txt').addClass("div_ref_hide");

          $('#ContentPlaceHolder1_RBConversion [type=radio][value=' + 0 + ']').prop('checked', true);

          $('#div_msg').html('');
          $('#div_msg').html('<span style="color:red">Conversion of Item unit of measure is not available...</span>');

          $("#div_msg").hide().fadeIn('slow'); //.slideDown();
          setTimeout(function () {
              $("#div_msg").fadeOut('slow');
          }, 10000);
    }

};

$.fn.LoadDropDown_Conversion = function (_uom, _compute, _val) {

    $.ajax({
        type: "POST",
        url: "masterfile.asmx/BindInventoryConversion",
        data: "{'_obj': '#ContentPlaceHolder1_DDConversion_UOM','_uom':'" + _uom + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#ContentPlaceHolder1_DDConversion_UOM").empty();



            if (data.d != null) {

                if (data.d.indexOf('Session Time-out') > -1) {
                    window.location = "logout.aspx"
                }
                else if (data.d.indexOf('No Item Selected') > -1) {
                    $('#div_msg').html('');
                    $('#div_msg').html(data.d);

                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                    setTimeout(function () {
                        $("#div_msg").fadeOut('slow');
                    }, 10000);
                }
                else {

                    var jsdata = JSON.parse(data.d);
                    $.each(jsdata, function (key, value) {
                        $("#ContentPlaceHolder1_DDConversion_UOM").append($("<option></option>").val(value.Code).html(value.Descs));
                    });
                    if (_compute == 1) {
                        if ($("#hidden_org_qty").val() == "") {
                            $.fn.Conversion_compute_plus();
                            $("#hidden_org_qty").val(1);
                        };
                    }
                    else if (_compute == 0) {
                        //$.fn.setDropDownList(document.getElementById('ContentPlaceHolder1_DDConversion_UOM'), _val);
                        $("#ContentPlaceHolder1_DDConversion_UOM").val(_val);
                    }
                    
                }

            }

        }//,
        //error: function (data) {
        //  alert("error found");
        //}
    });

};

    $('#ContentPlaceHolder1_RBConversion input[type="radio"]').each(function () {
        $(this).click(function () {
            
            if ((this).value == 1) {
               
                $('#div_conversion_dd').removeClass("div_ref_hide");
                $('#div_conversion_dd').addClass("div_ref_show");

                $('#div_conversion_txt').removeClass("div_ref_hide");
                $('#div_conversion_txt').addClass("div_ref_show");
                var _uom = $("#txtItemUOM").val();
                if (_uom == undefined) { _uom = '' }
                else {
                    $.fn.LoadDropDown_Conversion(_uom, 1, '');
                }
                
            }
            else {
                
                if ($("#hidden_org_qty").val()==1) {
                    $.fn.Conversion_compute_minus();
                    $("#hidden_org_qty").val("");
                };

                $('#div_conversion_dd').removeClass("div_ref_show");
                $('#div_conversion_dd').addClass("div_ref_hide");

                $('#div_conversion_txt').removeClass("div_ref_show");
                $('#div_conversion_txt').addClass("div_ref_hide");

                
            }
            
        });
    });

    $.fn.addCommasWithDecimal = function (nStr, decPlcs) {

        nStr = parseFloat(nStr).toFixed(decPlcs);
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    };

    $.fn.number_comma = function (_num) {
        if (_num == "") { _num = "0" }

        while (_num.indexOf(",") > -1) {
            _num = _num.replace(",", "");
        }
        return parseFloat(_num)
    };

    $("[data-toggle=popover]").on('shown.bs.popover', function () {
        var popoverheight = parseInt($('.btn-popup').height());
        var position = parseInt($('.popover').position().top);
        var pos2 = parseInt($("[data-toggle=popover]").position().top);
        var x = pos2 - position;
        if (popoverheight < x)
            x = popoverheight;
        $('.popover.right .arrow').css('top', x+10 + 'px');
    });

    $("[data-toggle=popover]").popover({
        html: true,
        content: function () {

            var div_id = "tmp-id-" + $.now();
            return details_in_popup(div_id);

            //var content = $(this).attr("data-popover-content");
           
           

        },
        title: function () {
            var title = $(this).attr("data-popover-content");
            return $(title).children(".popover-heading").html();
        }
    });

    function details_in_popup(div_id) {
        var _item_cd = $("#txtItemCode").val();
       
        $.ajax({
            type: "POST",
            url: "masterfile.asmx/SearchInventory_other_sources",
            data: "{'_item_cd':'" + _item_cd + "'}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#div_source").empty();


                if (data.d != null) {

                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else if (data.d.indexOf('No Item Selected') > -1) {
                        $('#div_msg').html('');
                        $('#div_msg').html(data.d);

                        $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                        setTimeout(function () {
                            $("#div_msg").fadeOut('slow');
                        }, 10000);
                    }
                    else {
                        $('#' + div_id).html(data.d);
                        //_obj_data = data.d;
                        //_obj_item = _item_cd;
                        //$("#div_source").append(data.d);

                    }

                }

            }//,
            //error: function (data) {
            //  alert("error found");
            //}
        });

      
        return '<div id="' + div_id + '"><center><img src="images/loading.gif" alt="loading" /></center></div>';
    };

    $("select[id*='DDWarehouse']").bind("change", function () {

        $.ajax({
            type: "POST",
            url: "masterfile.asmx/Set_SessionVariable",
            data: '{"_warehouse_cd":"' + $("#ContentPlaceHolder1_DDWarehouse option:selected").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $('#ContentPlaceHolder1_hidden_warehouse').val($("#ContentPlaceHolder1_DDWarehouse option:selected").val())
                switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
                    case 'IT':
                   
                        $('#btnSave').disable(false);
                        $('#btnAddItem').disable(false);
                        if ($('#ContentPlaceHolder1_hidden_company').val() == $('#ContentPlaceHolder1_DDTransfer_Company option:selected').val() && $('#ContentPlaceHolder1_hidden_warehouse').val() == $('#ContentPlaceHolder1_DDTransfer_Warehouse option:selected').val()) {
                            $('#btnSave').disable(true);
                            $('#btnAddItem').disable(true);

                            $('#div_msg').html('');
                            $('#div_msg').html('<span style="color:red">Stock Transfer to same Company and Warehouse is not Allowed</span>');

                            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                            setTimeout(function () {
                                $("#div_msg").fadeOut('slow');
                            }, 10000);

                        }
                }

            }

            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        })


    });

    $("select[id*='DDTransfer_Company']").bind("change", function () {
        $('#btnSave').disable(false);
        $('#btnAddItem').disable(false);
        if ($('#ContentPlaceHolder1_hidden_company').val() == $('#ContentPlaceHolder1_DDTransfer_Company option:selected').val() && $('#ContentPlaceHolder1_hidden_warehouse').val() == $('#ContentPlaceHolder1_DDTransfer_Warehouse option:selected').val()) {
            $('#btnSave').disable(true);
            $('#btnAddItem').disable(true);

            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:red">Stock Transfer to same Company and Warehouse is not Allowed</span>');

                                    $("#div_msg").hide().fadeIn('slow'); //.slideDown();ContentPlaceHolder1_DDWarehouse
                                    setTimeout(function () {
                                        $("#div_msg").fadeOut('slow');
                                    }, 10000);
            
        }
    });
    
    $("select[id*='DDTransfer_Warehouse']").bind("change", function () {
        $('#btnSave').disable(false);
        $('#btnAddItem').disable(false);
        if ($('#ContentPlaceHolder1_hidden_company').val() == $('#ContentPlaceHolder1_DDTransfer_Company option:selected').val() && $('#ContentPlaceHolder1_hidden_warehouse').val() == $('#ContentPlaceHolder1_DDTransfer_Warehouse option:selected').val()) {
            $('#btnSave').disable(true);
            $('#btnAddItem').disable(true);

            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:red">Stock Transfer to same Company and Warehouse is not Allowed</span>');

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);

        }

    });

    $.fn.update_quarantine_process = function (doc_no, process) {

        var _return;
        var _data;


        _data = "{"
        _data = _data + "'doc_no':'" + doc_no + "', "
        _data = _data + "'process':'" + process + "' "
        _data = _data + "}"

        $.ajax({
            async: false,
            type: "POST",
            url: "masterfile.asmx/_update_quarantine_process",
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {

                    _return = data.d;
                    $('#ContentPlaceHolder1_RB_QC_Process [type=radio][value=' + _return + ']').prop('checked', true);
                }

                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        })
    };

    $.fn.LoadReference_Quarantine_Details = function (_doc_no, _warehouse_cd) {
        var qc_no;
        if ($("#txtItemQCNo").val() == undefined || $("#txtItemQCNo").val() == '') { qc_no = ''; }
        else { qc_no = $("#txtItemQCNo").val(); };

        table.clear().draw();
        table.row.add([
         $("#txtItemCode").val(),
         $("#txtItemDescs").val(),
         $("#txtItemWeight").val(),
         $("#txtItemUOM").val(),
         $("#txtItemQuantity").val(),
         $("#txtItemReceivingReceipt").val(),
         $("#txtItemLotNo").val(),
         qc_no,
         $("#txtItemMFGDate").val(),
         $("#txtItemExpiryDate").val(),
         0,
         '',
         0,
         $("#txtItemRemarks").val()
        ]).draw();

        $.ajax({
            type: "POST",
            url: "masterfile.asmx/_get_ref_quarantine_details",
            data: "{'_doc_no':'" + _doc_no + "','_warehouse_cd':'" + _warehouse_cd + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {

                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else {
                        var json = jQuery.parseJSON(data.d);

                        $(json).each(function (i, val) {

                            table.row.add([
                                   val.item_cd,
                                   val.descs,
                                   val.item_weight,
                                   val.uom,
                                   val.qty,
                                   val.receiving_receipt,
                                   val.lot_no,
                                   val.qc_no,
                                   val.mfg_date,
                                   val.expiry_date,
                                   val.available_qty,
                                   val.conversion_uom,
                                   val.conversion_factor,
                                   val.item_remarks
                            ]).draw();

                        });

                        //$.fn.TotalCost();

                    }
                }

                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        })



        $(".dataTables_scrollBody th").removeAttr('class');



    };

    $.fn.UpdateQuarantineQuantity = function (doc_no, ref_no) {
    
        var table = $("#tbl_MFITem_inventory tbody");
        var counter = -1;
        table.find('tr').each(function (i) {
            var $tds = $(this).find('td'),
                    item_code = $tds.eq(0).text(),
                    item_descs = $tds.eq(1).text(),
                    item_weight = $tds.eq(2).text(),
                    item_uom = $tds.eq(3).text(),
                    item_qty = $tds.eq(4).text(),
                    item_receiving_receipt = $tds.eq(5).text(),
                    item_lotno = $tds.eq(6).text(),
                    item_qcno = $tds.eq(7).text(),
                    item_mfgdate = $tds.eq(8).text(),
                    item_expirydate = $tds.eq(9).text(),
                    item_available = $tds.eq(10).text(),
                    item_conversion_uom = $tds.eq(11).text(),
                    item_conversion_factor = $tds.eq(12).text(),
                        item_remarks = $tds.eq(13).text();

            counter++;
            var sfind;
            sfind = 0;
            if (item_code == '') {
                sfind = 1;
            }
            if (item_code == '[object Object]') {
                sfind = 1;
            }
            if (item_code == undefined) {
                sfind = 1;
            }

            if (sfind == 0) {
                $.fn.UpdateQuarantine_Itemlist(doc_no, ref_no, item_code, item_available);
            }

        });
    };

    $.fn.UpdateQuarantine_Itemlist = function (doc_no, ref_no, item_cd, qty) {

        var _return;
        var _data;

        if (item_cd != '') {
            _data = "{"
            _data = _data + "'doc_no':'" + doc_no + "', "
            _data = _data + "'ref_no':'" + ref_no + "', "
            _data = _data + "'item_cd':'" + item_cd + "', "
            _data = _data + "'qty':'" + qty + "' "
            _data = _data + "}"

            $.ajax({
                async: false,
                type: "POST",
                url: "masterfile.asmx/_update_quarantine_qty",
                data: _data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    if (data.d != null) {

                        _return = data.d;

                    }

                    //else { window.location = "logout.aspx" }
                }//,
            })
        };

    };
});

function GetItemDetails(_item_cd, _descs, _uom, _uom_descs, _item_weight, _cost) {

    $("#txtItemCode").val(_item_cd);
    $("#txtItemDescs").val(_descs);
    $("#txtItemWeight").val(_item_weight);
    $("#txtItemUOM").val(_uom);
    $("#txtItemUOMDescs").val(_uom_descs);
    
    $("#hidden_available_qty").val(0);

    $('#txtItemExpiryDate').removeAttr('disabled');
    $('#txtItemMFGDate').removeAttr('disabled');
    
    $('#txtItemReceivingReceipt').removeAttr('disabled');
    $('#txtItemLotNo').removeAttr('disabled');
    $('#txtItemQCNo').removeAttr('disabled');
    $('#txtItemRemarks').removeAttr('disabled');
    
    //$.fn.TotalQtyCost();

    var nav = $('#search_list');
    var xstr = "search_show";
    nav.removeClass(xstr);

    xstr = "search_hide";
    nav.addClass(xstr);

};

function GetDocumentDetails(_doc_no) {
    $('#btnAdd').disable(true);
    $('#btnSave').disable(false);
    $('#btnCancel').disable(false);
    $('#btnOption').disable(false);
    
    $.fn.enable_Form(1);
    switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
        case 'IS':
            $("#ContentPlaceHolder1_DDWarehouse").attr('disabled', true);
            break;
        case 'IQ':
            $("#btnAddItem").addClass('disabled');
            $("#ContentPlaceHolder1_DDWarehouse").attr('disabled', true);
            break;
    }
   
    //$.fn.LoadDropDown("#ContentPlaceHolder1_DDepartment");
    //$.fn.LoadDropDown("#ContentPlaceHolder1_DDivision");
    //$.fn.LoadDropDown("#ContentPlaceHolder1_DDWarehouse");

    var nav = $('#search_document');
    var xstr = "search_show2";
    nav.removeClass(xstr);
    xstr = "search_hide";
    nav.addClass(xstr);

    $.fn.LoadDocument_Header(_doc_no);

};

function Get_IS_ItemDetails(_item_cd, _descs, _uom, _uom_descs, _item_weight, _cost, _available_qty, _expiry_date, _mfg_date, _receiving_receipt, _lot_no, _qc_no) {

    $("#txtItemCode").val(_item_cd);
    $("#txtItemDescs").val(_descs);
    $("#txtItemWeight").val(_item_weight);
    $("#txtItemUOM").val(_uom);
    $("#txtItemUOMDescs").val(_uom_descs);
    //$("#txtItemUnitCost").val($.fn.addCommasWithDecimal(_cost, 4));//.toFixed(4)
    $("#txtItemQuantity").val($.fn.addCommasWithDecimal(_available_qty, 4));//.toFixed(4)
    $("#txtItemExpiryDate").val(_expiry_date);
    $("#txtItemMFGDate").val(_mfg_date);
    $("#txtItemReceivingReceipt").val(_receiving_receipt),
    $("#txtItemLotNo").val(_lot_no);
    $("#txtItemQCNo").val(_qc_no);
    $('#txtItemRemarks').val('');

    $("#hidden_available_qty").val(_available_qty.toFixed(4));
    
    //$('#txtItemUnitCost').attr('disabled', true);
    $('#txtItemExpiryDate').attr('disabled', true);
    $('#txtItemMFGDate').attr('disabled', true);
    $('#txtItemReceivingReceipt').attr('disabled', true);
    $('#txtItemLotNo').attr('disabled', true);
    $('#txtItemQCNo').attr('disabled', true);

    
    //$.fn.TotalQtyCost();

    var nav = $('#search_list');
    var xstr = "search_show";
    nav.removeClass(xstr);

    xstr = "search_hide";
    nav.addClass(xstr);

       
        if ($('#ContentPlaceHolder1_RBConversion input:checked').val() == 1) {
            var _uom = $("#txtItemUOM").val();
            if (_uom == undefined) { _uom = '' }
            else {
                $.fn.LoadDropDown_Conversion(_uom, 1, '');
            }
        }


};

function GetReferenceDetails(_ref_no, _trx_type, _warehouse_cd) {
    $('#ContentPlaceHolder1_txtReferenceNo').val(_ref_no);
    $('#ContentPlaceHolder1_hidden_ref_trx_type').val(_trx_type);
    $("#ContentPlaceHolder1_DDWarehouse option:selected").val(_warehouse_cd);
    $('#ContentPlaceHolder1_txtReference_TrackingNo').val("")

    $('#search_reference').removeClass("search_show2");
    $('#search_reference').addClass("search_hide");
    switch ($("#ContentPlaceHolder1_hidden_trx_type").val()) {
        case 'IQ':
            $("#ContentPlaceHolder1_DDWarehouse").attr('disabled', true);
            $("#btnAddItem").addClass('disabled');
            $.fn.clear_table();
            $.fn.LoadReference_Quarantine_Details(_ref_no, _warehouse_cd);
            $.fn.LoadQuarantine_reference(_ref_no);
            break;
        default:
            $('#ContentPlaceHolder1_div_reference').removeClass("div_ref_hide");
            $('#ContentPlaceHolder1_div_reference').addClass("div_ref_show");
            $("#btnAddItem").addClass('disabled');
            $.fn.clear_table();
            break;
    }

    
};
