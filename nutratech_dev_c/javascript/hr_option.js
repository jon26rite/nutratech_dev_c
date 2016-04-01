$(document).ready(function () {
    var today = new Date();
    $('#txtHR_DateFrom').datepicker({
        maxDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        yearRange: '-5:+20'
    });

    $('#txtHR_DateTo').datepicker({
        minDate: new Date(today),
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        changeMonth: true,
        changeYear: true,
        yearRange: '-5:+20'
    });

    $("#txtHR_DateFrom").datepicker({ dateFormat: "dd/mm/yyyy" }).datepicker("setDate", new Date());
    $("#txtHR_DateTo").datepicker({ dateFormat: "dd/mm/yyyy" }).datepicker("setDate", new Date());

    $.fn.GenerateExcel = function (sender) {
        var department_code = $("#ContentPlaceHolder1_DDHR_Department option:selected").val();
        var datefrom = $('#txtHR_DateFrom').val();
        var dateto = $('#txtHR_DateTo').val();

        if (datefrom != '' && dateto != '') {

            $('#div_msg').html('');
            $('#div_msg').html('Generating Excel File (DTR)... <br />DEPARTMENT : ' + $("#ContentPlaceHolder1_DDHR_Department option:selected").text() +
                '<br />DATE RANGE : ' + $('#txtHR_DateFrom').val() + ' - ' + $('#txtHR_DateTo').val());

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);


            $.ajax({
                type: "POST",
                url: "masterfile.asmx/make_efile",
                data: "{'department_code':'" + department_code + "','datefrom':'" + datefrom + "','dateto':'" + dateto + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    if (data.d != null) {

                        if (data.d.indexOf('Session Time-out') > -1) {
                            window.location = "logout.aspx"
                        }
                        else {
                            $('#div_msg').html('');
                            $('#div_msg').html(data.d);

                            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                            setTimeout(function () {
                                $("#div_msg").fadeOut('slow');
                            }, 10000);

                            if (sender == 1) { 
                                var d = new Date();
                                window.open('pdf/' + $('#ContentPlaceHolder1_hidden_username').val() + '/Nutratech_DTR.xlsx?' + d.getTime());
                                myApp.hidePleaseWait();
                            }
                            else if (sender == 2) {
                                $.fn.EmailDTR();
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
        }
        else {
            $('#div_msg').html('');
            $('#div_msg').html("<span style='color:red'>Dates are required to generate excel file...</span>");

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);

        }

    };

    $.fn.EmailDTR = function () {
        var email_to = $('#txtEmailTo').val();
        var email_cc = $('#txtEmailCC').val();
        var department = $("#ContentPlaceHolder1_DDHR_Department option:selected").text();
        var date_range = $('#txtHR_DateFrom').val() + '-' + $('#txtHR_DateTo').val();

        if (email_to != '') {

            $('#div_msg').html('');
            $('#div_msg').html('Sending Email...');

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);


            $.ajax({
                type: "POST",
                url: "masterfile.asmx/email_alert",
                data: "{'email_to':'" + email_to +
                    "','email_cc':'" + email_cc +
                    "','department':'" + department +
                    "','date_range':'" + date_range +
                    "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    if (data.d != null) {

                        if (data.d.indexOf('Session Time-out') > -1) {
                            window.location = "logout.aspx"
                        }
                        else {
                            $('#div_msg').html('');
                            $('#div_msg').html(data.d);

                            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                            setTimeout(function () {
                                $("#div_msg").fadeOut('slow');
                            }, 10000);

                            $('#ViewEmailModal').modal('hide');
                            myApp.hidePleaseWait();
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
            $('#div_msg').html('');
            $('#div_msg').html("<span style='color:red'>Email To is required to send an email</span>");

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 10000);
        }
    };

    $('#link_dtr').on('click', function () {
        myApp.showPleaseWait();
        $.fn.GenerateExcel(1);
    });

    $('#link_dtr_email').on('click', function () {
        $('#ViewEmailModal').modal('show');
    });

    $('#btnEmail').on('click', function () {
        myApp.showPleaseWait();
        $.fn.GenerateExcel(2);
    });

    $('#link_dtr_sync').on('click', function () {
        var sfind = 0;
        for (i = 0; i <= 0; i++) {
            if ($("#div_dtr" + i).length != 0) {
                $('#ViewSyncModal').modal('show');
                sfind = 1;
            }
        };
        if (sfind == 0) {
            $('#div_msg').html('');
            $('#div_msg').html("<span style='color:red'>No DTR to Sync...</span>");

            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
            setTimeout(function () {
                $("#div_msg").fadeOut('slow');
            }, 5000);
        };
    });

    $('#link_employee').on('click', function () {
        $('#ViewEmailEmployee').modal('show');
    });

    $('#btnEmpEmail').on('click', function () {
        myApp.showPleaseWait();
        var department_code = $("#ContentPlaceHolder1_DDHR_Department option:selected").val();
        var department_name = $("#ContentPlaceHolder1_DDHR_Department option:selected").text();
        var email_to = $("#txtEmpEmailTo").val();
        var email_cc = $("#txtEmpEmailCC").val();

        $.ajax({
            type: "POST",
            url: "masterfile.asmx/make_employee_textfile",
            data: "{'_department_code':'" + department_code +
                "','_department_name':'" + department_name +
                "','email_to':'" + email_to +
                "','email_cc':'" + email_cc +
                "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d != null) {

                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else {

                        $('#div_msg').html('');
                        $('#div_msg').html(data.d);

                        $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                        
                        myApp.hidePleaseWait();
                        $('#ViewEmailEmployee').modal('hide');
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
        });
    });


    $('#btnSync').on('click', function () {
        readTableDTR();
        $("#div_dd").css("display", "block");
    });
    
    var myApp;
    myApp = myApp || (function () {
        var pleaseWaitDiv = $('<div class="modal fade bs-example-modal-sm" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="exampleModalProcess"><div class="modal-dialog  modal-sm" role="document"><div class="modal-content"><div class="modal-body"><h4><center>Processing... <img src="images/loading.gif" alt="Loading..."  /></center></h4></div></div></div></div>');
        //var pleaseWaitDiv = $('<div class="modal fade" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="exampleModalEmail"> ' +
          //                      ' ' +
            //                  '</div>')
        return {
            showPleaseWait: function () {
                pleaseWaitDiv.modal();
            },
            hidePleaseWait: function () {
                pleaseWaitDiv.modal('hide');
            },

        };
    })();

    $("#FileUpload1").change(function () {
        myApp.showPleaseWait();
        
        setTimeout(function () {
            save_efile(this);
        }, 1000);
        
    });

    $("#FileUpload_txt").change(function () {
        myApp.showPleaseWait();

        setTimeout(function () {
            save_textfile(this);
        }, 1000);

    });

    function clear(id) {
        // $(id).replaceWith($(id).clone());
        $(id).val(null);

    };

    function save_efile(sender) {
        var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;
        var file_exist;
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            file_exist = files[i].name;
            data.append(files[i].name, files[i]);
        }
        if (file_exist != undefined) {
            $.ajax({
                url: "FileUploader.ashx",
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                success: function (result) {
                    readHeader();
                    readURL();//sender
                }
                //error: function (err) {
                //    alert(err.statusText)
                //}
            });
        }
    };

    function save_textfile(sender) {
        var fileUpload = $("#FileUpload_txt").get(0);
        var files = fileUpload.files;
        var file_exist;
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            file_exist = files[i].name;
            data.append(files[i].name, files[i]);
        }
        if (file_exist != undefined) {
            $.ajax({
                url: "FileUploader.ashx",
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                success: function (result) {
                    readHeader_textfile();
                    //readURL();//sender
                }
                //error: function (err) {
                //    alert(err.statusText)
                //}
            });
        }
    };

    function readHeader() {
        //input if (input.files && input.files[0]) {
        $.ajax({
            async: false,
            type: "POST",
            url: "masterfile.asmx/read_excel_header",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d != null) {

                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else {

                        var json = jQuery.parseJSON(data.d);
                        var index = 0;
                        $(json).each(function (i, val) {

                       
                            setSelectByText("ContentPlaceHolder1_DDHR_Department", val.department);
                       
                            $('#txtHR_DateFrom').val(val.date_from);
                            $('#txtHR_DateTo').val(val.date_to);


                        });


                    }

                }
    
                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        });
        //}
    };

    function setSelectByText(eID, text) { //Loop through sequentially//
        var ele = document.getElementById(eID);
        for (var ii = 0; ii < ele.length; ii++)
            if (ele.options[ii].text.toUpperCase() == text.toUpperCase()) { //Found!
                ele.options[ii].selected = true;
                return true;
            }
        return false;
    }

    function readURL() {
        //input if (input.files && input.files[0]) {
        $('#div_msg').html('');
        //$('#div_msg').html("<span style='color:red'>" + data.d + "</span>");

        //$("#div_msg").hide().fadeIn('slow'); //.slideDown();
        
        setTimeout(function () {
            $("#div_msg").fadeOut('slow');
        }, 300);

            $.ajax({
                async: true,
                type: "POST",
                url: "masterfile.asmx/read_efile",
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    if (data.d != null) {

                        if (data.d.indexOf('Session Time-out') > -1) {
                            window.location = "logout.aspx"
                        }
                        if (data.d.indexOf('Error Message :') > -1) {
                            $('#div_msg').html('');
                            $('#div_msg').html("<span style='color:red'>" + data.d + "</span>");

                            $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                            clear("#FileUpload1");
                            myApp.hidePleaseWait();
                            //setTimeout(function () {
                            //    $("#div_msg").fadeOut('slow');
                            //}, 15000);
                        }
                        else {

                            LoadDTR_Employee();

                        }

                    }

                    //else { window.location = "logout.aspx" }
                }//,
                //error: function (xhr, err) {
                //  $('#div_msg').html(xhr.responseText);
                // window.location = "GoogleLogout.aspx";
                //}
            });
        //}
    };

    function LoadDTR_Employee() {
        $("#dtr_upload").empty();

        $.ajax({
            async: false,
            type: "POST",
            url: "masterfile.asmx/Load_Temp_Log_Employee",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {

                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else {

                        var json = jQuery.parseJSON(data.d);
                        var index = 0;
                        $(json).each(function (i, val) {

                            index = LoadDTR(index, val.employeeid, val.name);
                            
                        });

                    }

                }

                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        });

        clear("#FileUpload1");
        clear("#FileUpload_txt");
        myApp.hidePleaseWait();
        
    };

    function LoadDTR(index, employeeid, name) {
        
        $.ajax({
           async: false,
           type: "POST",
           url: "masterfile.asmx/Load_Temp_Log",
           data: "{'employeeid':'" + employeeid +
               "'}",
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           success: function (data) {

               if (data.d != null) {

                   if (data.d.indexOf('Session Time-out') > -1) {
                       window.location = "logout.aspx"
                   }
                   else {


                       
                       var json = jQuery.parseJSON(data.d);
                       var sfind = 0;
                       
                       var xstr = '<div id="div_dtr' + index + '"" class="row xrow"> ' +
                                   '<h6>Employee ID: <label class="myID' + index + '" id="lblID' + index + '">' + employeeid + '</label><br />Name : <label id="lblName' + index + '">' + name + '</label></h6> ' +
                                   '<table id="tbl_dtr' + index + '" style="width:100%" class="table-hover table-font" > ' +
                                       '<thead class="GridHeader3"> ' +
                                           '<tr> ' +
                                               '<th style="min-width:100px; text-align:center !important; vertical-align:middle;" rowspan="2">Date</th> ' +
                                               '<th style="width:200px; text-align:center !important; vertical-align:middle;" colspan="2">AM</th> ' +
                                               '<th style="width:200px; text-align:center !important; vertical-align:middle;" colspan="2">PM</th> ' +
                                               '<th style="min-width:100px; text-align:center !important; vertical-align:middle;" rowspan="2">Remarks</th> ' +
                                           '</tr> ' +
                                           '<tr> ' +
                                               '<th style="width:100px; text-align:center !important; vertical-align:middle;">Time IN</th> ' +
                                               '<th style="width:100px; text-align:center !important; vertical-align:middle;">Time OUT</th> ' +
                                               '<th style="width:100px; text-align:center !important; vertical-align:middle;">Time IN</th> ' +
                                               '<th style="width:100px; text-align:center !important; vertical-align:middle;">Time OUT</th> ' +
                                           '</tr> ' +
                                       '</thead> ' +
                                       '<tbody>';
                       
                       
                       $(json).each(function (i, val) {
                           var bk = '';
                           sfind = 1;
                           if (val.changes == 1) { bk = 'background-color:lightpink;'; }
                           xstr = xstr + '<tr> ' +
                                  '<td style="min-width:100px; text-align:left !important; vertical-align:middle;' + bk + '"><strong>' + val.Timedata + '</strong></td>' +
                                  '<td style="width:100px; text-align:center !important; vertical-align:middle;' + bk + '">' + val.Timein_am + '</td>' +
                                  '<td style="width:100px; text-align:center !important; vertical-align:middle;' + bk + '">' + val.Timeout_am + '</td>' +
                                  '<td style="width:100px; text-align:center !important; vertical-align:middle;' + bk + '">' + val.Timein_pm + '</td>' +
                                  '<td style="width:100px; text-align:center !important; vertical-align:middle;' + bk + '">' + val.Timeout_pm + '</td>' +
                                  '<td style="min-width:100px; text-align:left !important; vertical-align:middle;' + bk + '">' + val.Remarks + '</td>' +
                              '</tr>';

                           //'<th style="width:20px; text-align:center !important; vertical-align:middle;" rowspan="2"><a href="#" class="btnCheck"><i class="fa fa-check-circle-o fa-fw" style="font-size:14px;"></i></a></th> ' +
                           //'<td style="width:20px; text-align:center !important; vertical-align:middle;" ><a href="#" class="btnChecks"><i class="fa fa-check-circle-o fa-fw" style="font-size:14px;"></i></a></td>' +

                       });

                       
                       xstr = xstr + '</tbody></table></div>';
                       
                       if (sfind == 1) {
                           $("#dtr_upload").append(xstr);
                           index = index + 1;
                          
                           return index;
                       };

                       for (i = 0; i < 100; i++) {
                           if ($("#div_dtr" + i).length == 0) {
                               
                               $('#div_msg').html('');
                               $('#div_msg').html("<span style='color:red'>No DTR Attendance Log Found...</span>");

                               $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                               setTimeout(function () {
                                   $("#div_msg").fadeOut('slow');
                               }, 10000);

                               return false;
                           }
                           else {
                               return false;
                           }
                       };


                   }

               }

               //else { window.location = "logout.aspx" }
           }//,
           //error: function (xhr, err) {
           //  $('#div_msg').html(xhr.responseText);
           // window.location = "GoogleLogout.aspx";
           //}
        });

        
        
        return index;
    };

    function readTableDTR() {
        for (i = 0; i < 100; i++) {
            if ($("#div_dtr" + i).length == 0) {
                $('#ViewSyncModal').modal('hide');
                return false;
            }
            else {
                var employeeid = $('#div_dtr' + i).find('.myID' + i).text();

                var table = $("#tbl_dtr" + i + " tbody");

                table.find('tr').each(function (i) {

                    var timedata;
                    var time1;
                    var time2;
                    var time3;
                    var time4;
                    var remarks;

                    var $tds = $(this).find('td'),
                        timedata = $tds.eq(0).text(),
                        time1 = $tds.eq(1).text(),
                            time2 = $tds.eq(2).text(),
                            time3 = $tds.eq(3).text(),
                                time4 = $tds.eq(4).text(),
                                remarks = $tds.eq(5).text();

                    syncDTR(employeeid, timedata, time1, time2, time3, time4, remarks);

                });

            };
        };
        
    };

    function syncDTR(employeeid, timedata, time1, time2, time3, time4, remarks) {

        var sub;
        var sub_data;

        var _ob = $('[id*="chkOB"]:checked').map(function () { return $(this).val().toString(); }).get().join(",");
        var _ct = $('[id*="chkCT"]:checked').map(function () { return $(this).val().toString(); }).get().join(",");
        var _reg = $('[id*="chkAL"]:checked').map(function () { return $(this).val().toString(); }).get().join(",");

        sub = "Save_TimeLog";

        sub_data = '{"_stremployeeid":"' + employeeid +
            '", "_date":"' + timedata +
            '", "timein_am": "' + time1 +
            '", "timeout_am": "' + time2 +
            '", "timein_pm": "' + time3 +
            '", "timeout_pm": "' + time4 +
            '", "_remarks": "' + remarks +
            '", "_ob": "' + _ob +
            '", "_ct": "' + _ct +
            '", "_reg": "' + _reg +
            '"}';

        $.ajax({
            async: false,
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

                }

                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        });
    };
  
    function readHeader_textfile() {
        //input if (input.files && input.files[0]) {
        $.ajax({
            async: false,
            type: "POST",
            url: "masterfile.asmx/read_textfile",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d != null) {

                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else {

                        var json = jQuery.parseJSON(data.d);
                        var index = 0;
                        $(json).each(function (i, val) {


                            setSelectByText("ContentPlaceHolder1_DDHR_Department", val.department);

                            $('#txtHR_DateFrom').val(val.date_from);
                            $('#txtHR_DateTo').val(val.date_to);


                        });

                        LoadDTR_Employee();
                        //var json = jQuery.parseJSON(data.d);
                        //var index = 0;
                        //$(json).each(function (i, val) {


                        //    setSelectByText("ContentPlaceHolder1_DDHR_Department", val.department);

                        //    $('#txtHR_DateFrom').val(val.date_from);
                        //    $('#txtHR_DateTo').val(val.date_to);


                        //});


                    }

                }

                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        });
        //}
    };

    $('#link_ftp').on('click', function () {
        $('#ViewTextFile').modal('show');
        LoadFTP();
    });

    $('#btnSyncAll').on('click', function () {
        myApp.showPleaseWait();
        setTimeout(function () {
            syncFTP();
        }, 3000);
        
    });
    

    function LoadFTP() {

        $.ajax({
            async: false,
            type: "POST",
            url: "masterfile.asmx/read_ftp",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {

                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }
                    else {

                        var json = jQuery.parseJSON(data.d);
                        var table = $("#tbl_ftp tbody")
                        table.find("tr").remove();

                        $(json).each(function (i, val) {
                            table.append('<tr>' +

                                            '<td style="text-align:left !important; vertical-align:middle;">' + val.Name + '</td>' +
                                            '<td style="width:100px; text-align:center !important; vertical-align:middle;">' + val.Size + '</td>' +
                                            '<td style="width:100px; text-align:center !important; vertical-align:middle;">' + val.Date + '</td>' +
                                            '<td style="width:100px; text-align:center !important; vertical-align:middle;"><a href="' + val.Download + '" target="_blank" alt="Download"><i class="fa fa-download fa-fw" /></a></td>' +

                                        '</tr>');


                        });

                    };
                }

                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        });



       
    };

    function syncFTP() {
    
        deleteFTP();

        var table = $("#tbl_ftp tbody");
        var _filename = '';
        
        
        table.find('tr').each(function (i) {
            var $tds = $(this).find('td'),
                _filename = $tds.eq(0).text();


            $.ajax({
                async: false,
                type: "POST",
                url: "masterfile.asmx/sync_textile",
                data: "{'filename':'" + _filename + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    if (data.d != null) {

                        if (data.d.indexOf('Session Time-out') > -1) {
                            window.location = "logout.aspx"
                        }
                        else {

                            //readHeader_textfile();
                          

                        };

                    }

                    //else { window.location = "logout.aspx" }
                }//,
                //error: function (xhr, err) {
                //  $('#div_msg').html(xhr.responseText);
                // window.location = "GoogleLogout.aspx";
                //}
            });

        });

        LoadDTR_Employee();
        
        $('#ViewTextFile').modal('hide');

        for (i = 0; i < 100; i++) {
            if ($("#div_dtr" + i).length == 0) {

                $('#div_msg').html('');
                $('#div_msg').html("<span style='color:red'>No DTR Attendance Log Found...</span>");

                $("#div_msg").hide().fadeIn('slow'); //.slideDown();
                setTimeout(function () {
                    $("#div_msg").fadeOut('slow');
                }, 10000);

                return false;
            }
            else {
                $("#div_dd").css("display", "none");
                return false;
            }
        };

       
    };

    function deleteFTP() {
        
        $.ajax({
            async: false,
            type: "POST",
            url: "masterfile.asmx/delete_db_textfile",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d != null) {

                    if (data.d.indexOf('Session Time-out') > -1) {
                        window.location = "logout.aspx"
                    }

                }
                //else { window.location = "logout.aspx" }
            }//,
            //error: function (xhr, err) {
            //  $('#div_msg').html(xhr.responseText);
            // window.location = "GoogleLogout.aspx";
            //}
        });

    };

});