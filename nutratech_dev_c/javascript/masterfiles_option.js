function LoadRecords() {
         
    $.ajaxSetup({
        cache: false
    });

    var _group;
    _group = $("#ContentPlaceHolder1_hidden_group").val();

    var sub;
    var sub_data;
            
    var _search;
    _search = $("#txtsearch").val();;
    //$('#tbl_mf').on('search.dt', function() {
    //    _search = $('.dataTables_filter input').val();
    //}); 

    if (_group == 'item_category') {
        var _select;
        _select = $("#ContentPlaceHolder1_DDGroup option:selected").val();
        sub = "GetTableData";
        sub_data = "f2,item_class_cd," + _select;
    }
    else {
        sub = "GetTableData";
        sub_data = "f1" ;
    }
    
    var table = $('#tbl_mf').DataTable({
        "bLengthChange": false,
        "responsive": false,
        "filter": false,
        "pagingType": "simple_numbers",
        "orderClasses": false,
        "order": [[0, "asc"]],
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
                "success": function (msg){
                    var json = jQuery.parseJSON(msg.d);
                    fnCallback(json);
                    $("#tbl_mf").show();
                    $(".dataTables_scrollBody th").removeAttr('class');
                },
                error: function (xhr, textStatus, error){
                    if (typeof console == "object") {
                        console.log(xhr.status + "," + xhr.responseText + "," + textStatus + "," + error); 
                    }
                }
            });
        }
                
    });
              
   

    $('#tbl_mf tbody').on( 'click', 'tr', function () {
                
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        select_code(this.cells[0].innerHTML,this.cells[1].innerHTML,this.cells[2].innerHTML);
    } );

};

function SaveRecords() {
    var _code;
    var _descs;
    var _status;
    var _new_entry;

    _code = $("#ContentPlaceHolder1_txt_code").val();
    _descs = $("#ContentPlaceHolder1_txt_description").val();
    _status = $('#ContentPlaceHolder1_rb_status input:checked').val()
    _new_entry = $("#ContentPlaceHolder1_hidden_entry_new").val();


    var _group;
    _group = $("#ContentPlaceHolder1_hidden_group").val();

    var sub;
    var sub_data;

    if (_group == 'item_category') {
        var _select;
        _select = $("#ContentPlaceHolder1_DDGroup option:selected").val();
        sub = "Save_Group_Masterfile";
        sub_data = '{"xcode":"' + _code + '", "xdescs":"' + _descs + '", "xstatus": "' + _status + '", "xhidden_entry": "' + _new_entry + '", "xGroup_field":"item_class_cd", "xGroup_entry":"' + _select + '"}';
    }
    else {
        sub = "Save_Masterfile";
        sub_data = '{"xcode":"' + _code + '", "xdescs":"' + _descs + '", "xstatus": "' + _status + '", "xhidden_entry": "' + _new_entry + '"}';
    }

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

$("select[id*='DDGroup']").bind("change", function () {
    LoadRecords();
});


function enable_Form() {
    
    var activeViewIndex = $("#ContentPlaceHolder1_hidden_active_form").val();
    //var activeViewIndex = <%=MultiView2.ActiveViewIndex%>;

    
    $("#txtsearch").val("")

    if (activeViewIndex == 0){
            
        var _entry;
        _entry = $("#ContentPlaceHolder1_hidden_entry").val();
           
        $('#ContentPlaceHolder1_hidden_entry_new').val("");
        if (_entry == "yes") {
            $('#ContentPlaceHolder1_txt_code').removeAttr('readonly');
            $('#ContentPlaceHolder1_hidden_entry_new').val("new");
        }
            
        $('#ContentPlaceHolder1_txt_code').removeAttr('disabled');
        $('#ContentPlaceHolder1_txt_description').removeAttr('disabled');
            
        $('#ContentPlaceHolder1_rb_status').find('*').each(function () {
            $(this).removeAttr("disabled");
        });

                
        $("#ContentPlaceHolder1_txt_code").val("");
        $("#ContentPlaceHolder1_txt_description").val("");
        $('#ContentPlaceHolder1_rb_status [type=radio][value=' + 1 + ']').prop('checked', true);

    }
    
};

function disable_Form() {
  
    var activeViewIndex = $("#ContentPlaceHolder1_hidden_active_form").val();
    //var activeViewIndex = <%=MultiView2.ActiveViewIndex%>;
           
    if (activeViewIndex == 0){
            
        $("#txtsearch").val("")
        $('#ContentPlaceHolder1_txt_code').attr('disabled', true);
        $('#ContentPlaceHolder1_txt_description').attr('disabled', true);
        $('#ContentPlaceHolder1_rb_status').find('*').each(function () {
            $(this).attr("disabled", true);
        });
        $('#ContentPlaceHolder1_txt_code').attr('readonly', true);
        $('#ContentPlaceHolder1_hidden_entry_new').val("");

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

function select_code(code, descs, status) {
    if (status=="Active"){
        status=1;
    }
    else{
        status=0;
    }
    $("#txtsearch").val("")
    $("#ContentPlaceHolder1_txt_code").val(code);
    $("#ContentPlaceHolder1_txt_description").val(descs);
    $('#ContentPlaceHolder1_rb_status [type=radio][value=' + status + ']').prop('checked', true);

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

    $('#ContentPlaceHolder1_txt_code').removeAttr('disabled');
    $('#ContentPlaceHolder1_txt_description').removeAttr('disabled');

    $('#ContentPlaceHolder1_rb_status').find('*').each(function () {
        $(this).removeAttr("disabled");
    });

};