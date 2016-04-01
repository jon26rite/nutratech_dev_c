$(document).ready(function () {

    $.fn.LoadReports = function (_warehouse_cd, _status, _doc_no, _item_cd) {
        sub = "GetTableData";
        sub_data = "f6";
        var table = $('#tbl_MFITem_Report').DataTable({
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
                aoData.push({ "name": "parmsVals", "value": sub_data + "," + _warehouse_cd + "," + _status + "," + _doc_no + "," + _item_cd });
                $.ajax({
                    "dataType": 'json',
                    "contentType": "application/json; charset=utf-8",
                    "type": "GET",
                    "url": sSource,
                    "data": aoData,
                    "success": function (msg) {
                        var json = jQuery.parseJSON(msg.d);
                        fnCallback(json);
                        $("#tbl_MFITem_Report").show();
                        $(".dataTables_scrollBody th").removeAttr('class');
                    },
                    error: function (xhr, textStatus, error) {
                        if (typeof console == "object") {
                            console.log(xhr.status + "," + xhr.responseText + "," + textStatus + "," + error);
                        }
                    }
                });
            }
        });

   

    };

    $.fn.PreLoader = function (_load) {
        if (_load == 1) {
            $('#divpre').removeClass("divloading_hide");
            $('#divpre').addClass("divloading");
        }
        else {
            $('#divpre').removeClass("divloading");
            $('#divpre').addClass("divloading_hide");
        }
    };
    $.fn.PreLoader(1);

    $.fn.LoadReport_Details = function (_warehouse_cd, _status, _doc_no, _item_cd) {//_date_from, _date_to,
        if (_warehouse_cd == '' || _warehouse_cd == undefined) { _warehouse_cd = 'wAll'; }
        if (_status == '' || _status == undefined) { _status = 'sAll'; }
        if (_doc_no == '' || _doc_no == undefined) { _doc_no = 'dAll'; }
        if (_item_cd == '' || _item_cd == undefined) { _item_cd = 'iAll'; }

        if (_warehouse_cd == 'All') { _warehouse_cd = 'wAll'; }
        if (_status == 'All') { _status = 'sAll'; }
        if (_doc_no == 'All') { _doc_no = 'dAll'; }
        if (_item_cd == 'All') { _item_cd = 'iAll'; }


        $.fn.LoadReports(_warehouse_cd, _status, _doc_no, _item_cd);
       // $.fn.TotalCost();
        $.fn.PreLoader(0);
    };


    $.fn.LoadDropDown_report = function (obj, _warehouse_cd, _status, _doc_no) {//_date_from, _date_to,
        
        if (_warehouse_cd == '' || _warehouse_cd == undefined) { _warehouse_cd = 'All'; }
        if (_status == '' || _status == undefined) { _status = 'All'; }
        
        $.ajax({
            type: "POST",
            url: "masterfile.asmx/BindInventoryDropdownlist_Report",
            data: "{'_obj':'" + obj + "','_warehouse_cd':'" + _warehouse_cd + "','_status':'" + _status + "','_doc_no':'" + _doc_no + "'}",//,'_date_from':'" + _date_from + "','_date_to':'" + _date_to + "'
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

   
    $.fn.LoadDropDown_report(
               "#ContentPlaceHolder1_DDReport_DocNo",
               $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
               $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
               'All'
               );
    $.fn.LoadDropDown_report(
       "#ContentPlaceHolder1_DDReport_Item_Code",
       $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
       $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
       $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val()
       );
    $.fn.LoadReport_Details(
        $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
        $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
        $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val(),
        $("#ContentPlaceHolder1_DDReport_Item_Code option:selected").val()
        );

    $("select[id*='DDReport_Warehouse']").bind("change", function () {
        $.fn.PreLoader(1);
        $.fn.LoadDropDown_report(
               "#ContentPlaceHolder1_DDReport_DocNo",
               $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
               $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
               'All'
               );
        $.fn.LoadDropDown_report(
           "#ContentPlaceHolder1_DDReport_Item_Code",
           $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val()
           );
        $.fn.LoadReport_Details(
           $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Item_Code option:selected").val()
           );

    });

    $("select[id*='DDReport_Status']").bind("change", function () {
        $.fn.PreLoader(1);
        $.fn.LoadDropDown_report(
                "#ContentPlaceHolder1_DDReport_DocNo",
                $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
                $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
                'All'
                );
        $.fn.LoadDropDown_report(
           "#ContentPlaceHolder1_DDReport_Item_Code",
           $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val()
           );
        $.fn.LoadReport_Details(
           $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Item_Code option:selected").val()
           );

    });

    $("select[id*='DDReport_DocNo']").bind("change", function () {
        $.fn.PreLoader(1);
        $.fn.LoadDropDown_report(
           "#ContentPlaceHolder1_DDReport_Item_Code",
           $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val()
           );
        $.fn.LoadReport_Details(
           $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Item_Code option:selected").val()
           );

    });

    $("select[id*='DDReport_Item_Code']").bind("change", function () {
        $.fn.PreLoader(1);
        $.fn.LoadReport_Details(
           $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val(),
           $("#ContentPlaceHolder1_DDReport_Item_Code option:selected").val()
           );
    });

    $('#btnReport').on('click', function () {
        $.fn.PreLoader(1);
        var _document_no = $('#ContentPlaceHolder1_DDReport_DocNo option:selected').val();
        var _item_code = $('#ContentPlaceHolder1_DDReport_Item_Code option:selected').val();

        var _warehouse_cd = $('#ContentPlaceHolder1_DDReport_Warehouse option:selected').val();
        var _company_cd = $('#DD_UserCompany option:selected').val();
        var _status = $('#ContentPlaceHolder1_DDReport_Status option:selected').val();

        if (_document_no == undefined || _document_no == '') { _document_no = 'All'; }
        if (_item_code == undefined || _item_code == '') { _item_code = 'All'; }

        if (_warehouse_cd == undefined) { _warehouse_cd = 'All'; }
        if (_status == undefined) { _status = 'All'; }
        if (_warehouse_cd == 'All') { var _company_cd = 'All'; };

        window.open("report.aspx?Report=bystocks&Doc_No=" + _document_no +
                                                "&Item_Code=" + _item_code +
                                                "&Status=" + _status +
                                                "&WareHouse_code=" + _warehouse_cd +
                                                "&Company_code=" + _company_cd +
                                                "", "popupWindow", "width=1020,height=600,scrollbars=yes");
      
        $.fn.PreLoader(0);
        
    });

    $.fn.UpdateRecord_in_report = function (warehouse_cd, doc_no, status, remarks, _trx_type) {

        var _return;
        var _data;

        if (doc_no != '') {
            _data = "{"
            _data = _data + "'warehouse_cd':'" + warehouse_cd + "', "
            _data = _data + "'doc_no':'" + doc_no + "', "
            _data = _data + "'status':'" + status + "', "
            _data = _data + "'remarks':'" + remarks.replace("'", "") + "', "
            _data = _data + "'trx_type':'" + _trx_type.replace("'", "") + "' "
            _data = _data + "}"

            $.ajax({
                type: "POST",
                url: "masterfile.asmx/Update_Inventory_in_report",
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


                        $.fn.LoadReport_Details(
                          $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
                          $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
                          $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val(),
                          $("#ContentPlaceHolder1_DDReport_Item_Code option:selected").val()
                          );
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

    $.fn.Post_Listing = function () {

        var _return;
        var _data;


            $.ajax({
                type: "POST",
                url: "masterfile.asmx/Post_Listing",
                data: '',
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


                        $.fn.LoadReport_Details(
                          $("#ContentPlaceHolder1_DDReport_Warehouse option:selected").val(),
                          $("#ContentPlaceHolder1_DDReport_Status option:selected").val(),
                          $("#ContentPlaceHolder1_DDReport_DocNo option:selected").val(),
                          $("#ContentPlaceHolder1_DDReport_Item_Code option:selected").val()
                          );
                    }

                    //else { window.location = "logout.aspx" }
                }//,
                //error: function (xhr, err) {
                //  $('#div_msg').html(xhr.responseText);
                // window.location = "GoogleLogout.aspx";
                //}
            })
        //};

    };

    $('#tbl_MFITem_Report tbody ').on('dblclick', 'tr', function () {

        var _trx_type = $(this).find('td:eq(0)').text();
        var _document_no = $(this).find('td:eq(1)').text();
        var _status = $(this).find('td:eq(4)').text();
        var _warehouse_code = $('#ContentPlaceHolder1_DDReport_Warehouse option:selected').val();

        if (_document_no.indexOf("IQ") > -1) {

            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:red">Go To Quarantine Sampling Issuance to Approved this document...</span>');

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);

        }
        else if (_document_no.indexOf("SQ") > -1) {

            $('#div_msg').html('');
            $('#div_msg').html('<span style="color:red">Go To Quarantine Receipting to Approved this document...</span>');

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);

        }
        else {

        

            var _sfind = 0;
            if ($("#ContentPlaceHolder1_hidden_useraccess").val() == 'User') {
                _sfind = 1;
            }

            if (_trx_type == undefined || _trx_type == '') { _sfind = 1; }
            if (_document_no == undefined || _document_no == '') { _sfind = 1; }
            if (_warehouse_code == undefined || _warehouse_code == '') { _sfind = 1; }
            if (_status == 'Approved') { _sfind = 1; }
            if (_status == 'Posted') { _sfind = 1; }
            if (_warehouse_code == 'All') {
                _sfind = 1;
                $('#div_msg').html('');
                $('#div_msg').html('<span style="color:red">Select a Warehouse to approved the selected inventory listing</span>');

                $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                setTimeout(function () {
                    $("#div_msg").fadeOut('slow');
                }, 10000);
            }



            if (_sfind == 0) {
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
                            //

                            $.fn.UpdateRecord_in_report(_warehouse_code, _document_no,
                                    'Approved', input.val(), _trx_type);

                        }
                    }
                });

            }

        };

    });

 
    $('#btnPost').on('click', function () {
       
        $.confirm({
            title: 'Do you want to post all approved inventory entries?',
            confirmButton: 'Post',
            confirmButtonClass: 'btn-info',
            confirm: function () {
            $.fn.Post_Listing()
            }
        });
    
    });

});