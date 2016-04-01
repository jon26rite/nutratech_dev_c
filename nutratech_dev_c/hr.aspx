<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="hr.aspx.cs" Inherits="hr" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <!-- DataTables CSS -->
    <link href="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet" />
    <!-- DataTables Responsive CSS -->
    <link href="bower_components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet" />
    <!-- JQuery Confirm CSS -->
    <link href="bower_components/jquery-confirm/jquery-confirm.min.css" rel="stylesheet" />

    <div class="row">
        <div class="col-lg-12">
            <div>
                <ul class="my-header-ul">
                    <li><h3><i class="fa fa-suitcase fa-fw"></i> Human Resources </h3></li>
                    <li><h3><span class="sub-header"><asp:Label ID="lblMenu" runat="server" Text=""></asp:Label></span></h3></li>
                </ul>
            </div>
        </div>
        <!-- /.col-lg-12 -->
    </div>
   
    <asp:MultiView ID="MultiView1" runat="server">
        <asp:View ID="ViewButtons" runat="server"> 
            <div class="col-lg-12">
                <div class="row xrow">
                    <div class="btn-toolbar my-toolbar" role="toolbar">
                        <div class="btn-group btn-group-sm">
                            <button id="btnAdd" type="button" class="btn btn-primary"><span class="fa fa-plus fa-fw" aria-hidden="true"></span> Add</button>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <button id="btnSave" type="button" class="btn btn-primary disabled"><span class="fa fa-floppy-o fa-fw" aria-hidden="true"></span> Save</button>
                            <button id="btnCancel" type="button" class="btn btn-primary disabled"><span class="fa fa-remove fa-fw" aria-hidden="true"></span> Cancel</button>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <button id="btnOption" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="fa fa-hand-o-right fa-fw" aria-hidden="true"></span> Option <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href="#" id="link_print"><span class="fa fa-print fa-fw" aria-hidden="true"></span> Reports</a></li>
                                <li id="li_email" class="disabled"><a href="#"><span class="fa fa-paper-plane fa-fw" aria-hidden="true"></span> E-mail</a></li>
                                <li role="separator" class="divider"></li>
                                <li id="li_approved" class="disabled"><a href="#"><span class="fa fa-thumbs-o-up fa-fw" aria-hidden="true"></span> Approve</a></li>
                                <li id="li_disapproved" class="disabled"><a href="#"><span class="fa fa-thumbs-o-down fa-fw" aria-hidden="true"></span> Disapprove</a></li>
                            </ul>
                        </div>
                        <div class="pull-right">
                            <div id="xsearch_mf" class="input-group input-group-sm">
                                <span class="input-group-addon"><span class="fa fa-search fa-fw"></span></span>
                                <input type="text" id="txtsearch" class="form-control" placeholder="Search" />
                            </div>
                            <div id="search_document" class="list-group search_hide"> </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </asp:View>
        
        <asp:View ID="ViewButtons2" runat="server"> 
            <div class="col-lg-12">
                <div class="row xrow">
                    <div class="btn-toolbar my-toolbar" role="toolbar">
                        
                        <div class="btn-group btn-group-sm">
                            <button id="btnOption2" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="fa fa-hand-o-right fa-fw" aria-hidden="true"></span> Option <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href="#" id="link_dtr"><span class="fa fa-clock-o fa-fw" aria-hidden="true"></span> Generate DTR</a></li>
                                <li><a href="#" id="link_dtr_email"><span class="fa fa-envelope fa-fw" aria-hidden="true"></span> Generate DTR and E-mail</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#" id="link_dtr_sync"><span class="fa fa-refresh fa-fw" aria-hidden="true"></span> Sync DTR</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#" id="link_employee"><span class="fa fa-file-text fa-fw" aria-hidden="true"></span> Email Employee Info</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#" id="link_ftp"><span class="fa fa-folder-open-o fa-fw" aria-hidden="true"></span> FTP Attendance Logs</a></li>
                            </ul>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <div id="btnFileUpload" class="fileUpload btn btn-sm btn-success ">
                                <span class="fa fa-file-excel-o fa-fw" aria-hidden="true"></span> <span>Open Excel DTR</span>
                                <input id="FileUpload1" type="file" name="file"  class="upload" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                            </div>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <div id="btnFileUpload_txt" class="fileUpload btn btn-sm btn-warning ">
                                <span class="fa fa-file-text-o fa-fw" aria-hidden="true"></span> <span>Open TextFile DTR</span>
                                <input id="FileUpload_txt" type="file" name="file"  class="upload" accept="text/plain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </asp:View>
        <asp:View ID="ViewNothing" runat="server"> 
        </asp:View>
    </asp:MultiView>

    <asp:MultiView ID="MultiView2" runat="server">
        <asp:View ID="View_DTR" runat="server"> 
            <div class="row xrow">
                <div class="col-sm-4" id="div_dd">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color:#286090;text-align: left;">Department : </span>
                            <asp:DropDownList ID="DDHR_Department" CssClass="form-control" runat="server" >
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color:#286090;text-align: left;">Date From : </span>
                            <input type="text" id="txtHR_DateFrom" class="form-control" placeholder="Date From" required  maxlength="20"  />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color:#286090;text-align: left;">Date To : </span>
                            <input type="text" id="txtHR_DateTo" class="form-control" placeholder="Date To" required  maxlength="20"  />
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <hr />
                    <h5>Daily Time Record :</h5>
                    <div id="dtr_upload" class="row xrow">
                   
                   <%-- <div id="div_dtr" class="row xrow">
                        <h6><strong>Name :</strong> <label id="lblID"></label> <label id="lblName"></label></h6>
                        <table id="tbl_dtr" style="width:100%" class="table-hover" >
                            <thead class="GridHeader3">
                                <tr>
                                    <th style="width:20px; text-align:center; vertical-align:middle;" rowspan="2"><a href="#" class="btnCheck"><i class="fa fa-check-circle-o fa-fw" style="font-size:14px;"></i></a></th>
                                    <th style="text-align:center; vertical-align:middle;" rowspan="2">Date</th>
                                    <th style="width:200px; text-align:center; vertical-align:middle;" colspan="2">AM</th>
                                    <th style="width:200px; text-align:center; vertical-align:middle;" colspan="2">PM</th>
                                    <th style="text-align:center; vertical-align:middle;" rowspan="2">Remarks</th>
                                </tr>
                                <tr>
                                    <th style="width:100px; text-align:center; vertical-align:middle;">Time IN</th>
                                    <th style="width:100px; text-align:center; vertical-align:middle;">Time OUT</th>
                                    <th style="width:100px; text-align:center; vertical-align:middle;">Time IN</th>
                                    <th style="width:100px; text-align:center; vertical-align:middle;">Time OUT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="width:20px; text-align:center; vertical-align:middle;" ><a href="#" class="btnChecks"><i class="fa fa-check-circle-o fa-fw" style="font-size:14px;"></i></a></td>
                                    <td style="min-width:100px; text-align:left; vertical-align:middle;">w</td>
                                    <td style="width:100px; text-align:center; vertical-align:middle;">w</td>
                                    <td style="width:100px; text-align:center; vertical-align:middle;">w</td>
                                    <td style="width:100px; text-align:center; vertical-align:middle;">w</td>
                                    <td style="width:100px; text-align:center; vertical-align:middle;">w</td>
                                    <td style="min-width:100px; text-align:left; vertical-align:middle;">w</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>--%>

                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <script src="javascript/hr_option.js" type="text/javascript" lang="javascript"></script>

            <div class="modal fade" id="ViewEmailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalEmail">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title"><i class="fa fa-envelope fa-fw"></i> Email Daily Time Record</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row xrow">
                                <div class="input-group  input-group-sm">
                                    <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left;">TO :</span>
                                    <input type="text" id="txtEmailTo" class="form-control" placeholder="Email To" required  maxlength="100" />
                                    
                                </div>
                            </div>
                             <div class="row xrow">
                                <div class="input-group  input-group-sm">
                                    <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left;">CC :</span>
                                    <input type="text" id="txtEmailCC" class="form-control" placeholder="Email CC" required  maxlength="100" />
                                    
                                </div>
                            </div>
                         
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal"><i class="fa fa-remove fa-fw"></i> Close</button>
                            <button type="button" id="btnEmail" class="btn btn-sm btn-success"><span class="fa fa-paper-plane fa-fw" aria-hidden="true"></span> Send</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="ViewEmailEmployee" tabindex="-1" role="dialog" aria-labelledby="exampleModalEmail">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title"><i class="fa fa-envelope fa-fw"></i> Email Employee Info</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row xrow">
                                <div class="input-group  input-group-sm">
                                    <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left;">TO :</span>
                                    <input type="text" id="txtEmpEmailTo" class="form-control" placeholder="Email To" required  maxlength="100" />
                                    
                                </div>
                            </div>
                             <div class="row xrow">
                                <div class="input-group  input-group-sm">
                                    <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left;">CC :</span>
                                    <input type="text" id="txtEmpEmailCC" class="form-control" placeholder="Email CC" required  maxlength="100" />
                                    
                                </div>
                            </div>
                         
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal"><i class="fa fa-remove fa-fw"></i> Close</button>
                            <button type="button" id="btnEmpEmail" class="btn btn-sm btn-success"><span class="fa fa-paper-plane fa-fw" aria-hidden="true"></span> Send</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade bs-example-modal-sm" id="ViewSyncModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalSync">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title"><i class="fa fa-refresh fa-fw"></i> Sync Daily Time Record</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row xrow">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="chkAL" checked="checked"> Regular Attendance Log
                                    </label>
                                </div>
                            </div>
                            <div class="row xrow">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="chkOB"> OB - Official Business
                                    </label>
                                </div>
                            </div>
                            <div class="row xrow">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="chkCT"> CT - Change of Timekeeping
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal"><i class="fa fa-remove fa-fw"></i> Close</button>
                            <button type="button" id="btnSync" class="btn btn-sm btn-success"><span class="fa fa-refresh fa-fw" aria-hidden="true"></span> Sync</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal fade" id="ViewTextFile" tabindex="-1" role="dialog" aria-labelledby="exampleModalTextFile">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title"><i class="fa fa-folder-open-o fa-fw"></i> FTP Attendance Log</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row xrow">
                                <table id="tbl_ftp" style="width:100%" class=" table table-bordered table-hover" >
                                    <thead class="GridHeader3">
                                        <tr>
                                            <th style="text-align:center; vertical-align:middle;">File Name</th>
                                            <th style="width:100px; text-align:center; vertical-align:middle;">Size</th>
                                            <th style="width:100px; text-align:center; vertical-align:middle;">Created Date</th>
                                            <th style="width:100px; text-align:center; vertical-align:middle;">Download</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <%--<tr>
                                            <td style="text-align:center; vertical-align:middle;" rowspan="2">File Name</td>
                                            <td style="width:100px; text-align:center; vertical-align:middle;" colspan="2">Size/th>
                                            <td style="width:100px; text-align:center; vertical-align:middle;" colspan="2">Created Date</td>
                                            <td style="width:100px; text-align:center; vertical-align:middle;" colspan="2">Download</td>
                                        </tr>--%>
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal"><i class="fa fa-remove fa-fw"></i> Close</button>
                            <button type="button" id="btnSyncAll" class="btn btn-sm btn-success"><span class="fa fa-paper-plane fa-fw" aria-hidden="true"></span> Get Attendance Log</button>
                        </div>
                    </div>
                </div>
            </div>
            </asp:View>
    </asp:MultiView>
    <input id="hidden_username" type="hidden" runat="server" />
    <div id="xfooter" class="row xrow"></div>
    <!-- DataTables JavaScript -->
    <script src="bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
    <script src="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js"></script>
    
    
    <!-- MaskEdit JavaScript -->
    <script src="bower_components/maskedit/jquery.maskedinput.min.js" type="text/javascript"></script>
    <script src="bower_components/maskedit/jquery.price_format.2.0.min.js" type="text/javascript"></script>
     
    <!-- JQuery Confirm -->
    <script src="bower_components/jquery-confirm/jquery-confirm.min.js" type="text/javascript"></script>

</asp:Content>