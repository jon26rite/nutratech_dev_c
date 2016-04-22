<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="inventory.aspx.cs" Inherits="inventory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <!-- DataTables CSS -->
    <link href="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet" />
    <!-- DataTables Responsive CSS -->
    <link href="bower_components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet" />
    <!-- JQuery Confirm CSS -->
    <link href="bower_components/jquery-confirm/jquery-confirm.min.css" rel="stylesheet" />

    <script src="javascript/inventory_option.js" type="text/javascript" lang="javascript"></script>
    <div class="row">
        <div class="col-lg-12">
            <div>
                <ul class="my-header-ul">
                    <li>
                        <h3><i class="fa fa-bar-chart fa-fw"></i>Inventory Control </h3>
                    </li>
                    <li>
                        <h3><span class="sub-header">
                            <asp:Label ID="lblMenu" runat="server" Text=""></asp:Label></span></h3>
                    </li>
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
                            <button id="btnAdd" type="button" class="btn btn-primary"><span class="fa fa-plus fa-fw" aria-hidden="true"></span>Add</button>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <button id="btnSave" type="button" class="btn btn-primary disabled"><span class="fa fa-floppy-o fa-fw" aria-hidden="true"></span>Save</button>
                            <button id="btnCancel" type="button" class="btn btn-primary disabled"><span class="fa fa-remove fa-fw" aria-hidden="true"></span>Cancel</button>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <button id="btnOption" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="fa fa-hand-o-right fa-fw" aria-hidden="true"></span>Option <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href="#" id="link_print"><span class="fa fa-print fa-fw" aria-hidden="true"></span>Reports</a></li>
                                <li id="li_email" class="disabled"><a href="#"><span class="fa fa-paper-plane fa-fw" aria-hidden="true"></span>E-mail</a></li>
                                <li role="separator" class="divider"></li>
                                <li id="li_approved" class="disabled"><a href="#"><span class="fa fa-thumbs-o-up fa-fw" aria-hidden="true"></span>Approve</a></li>
                                <li id="li_disapproved" class="disabled"><a href="#"><span class="fa fa-thumbs-o-down fa-fw" aria-hidden="true"></span>Disapprove</a></li>
                            </ul>
                        </div>
                        <div class="pull-right">
                            <div id="xsearch_mf" class="input-group input-group-sm">
                                <span class="input-group-addon"><span class="fa fa-search fa-fw"></span></span>
                                <input type="text" id="txtsearch" class="form-control" placeholder="Search" />
                            </div>
                            <div id="search_document" class="list-group search_hide"></div>
                        </div>

                    </div>
                </div>
            </div>
        </asp:View>
        <asp:View ID="ViewNothing" runat="server">
        </asp:View>
    </asp:MultiView>
    <asp:MultiView ID="MultiView2" runat="server">
        <asp:View ID="View_Entry" runat="server">
            <div class="row xrow">
                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Warehouse : </span>
                            <asp:DropDownList ID="DDWarehouse" CssClass="form-control" runat="server">
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Document No. : </span>
                            <input type="text" id="txtDocNo" runat="server" class="form-control" placeholder="Document No" disabled readonly required maxlength="20" />
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Description : </span>
                            <input type="text" id="txtDocDescs" runat="server" class="form-control" placeholder="Description" disabled required maxlength="250" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row xrow">
                <div class="col-sm-4">

                    <div class="row xrow">

                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="text-align: left;">Reference No. : </span>
                            <input type="text" id="txtReferenceNo" runat="server" class="form-control" placeholder="Reference No." disabled required maxlength="20" />
                        </div>
                        <div id="search_reference" class="list-group search_hide"></div>

                    </div>

                    <div id="div_po" class="row xrow" runat="server" visible="false">

                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">PO No. : </span>
                            <input type="text" id="txtPONo" runat="server" class="form-control" placeholder="PO No." disabled required maxlength="20" />
                        </div>

                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Department : </span>
                            <asp:DropDownList ID="DDepartment" CssClass="form-control" runat="server" Enabled="false">
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="text-align: left;">Division : </span>
                            <asp:DropDownList ID="DDivision" CssClass="form-control" runat="server" Enabled="false">
                            </asp:DropDownList>
                        </div>
                    </div>

                </div>
                <div class="col-sm-3 pull-right">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Posting Date : </span>
                            <input type="text" id="txtPostingDate" runat="server" class="form-control" placeholder="Posting Date" disabled readonly required maxlength="100" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Status : </span>
                            <input type="text" id="txtStatus" runat="server" class="form-control" placeholder="Status" disabled readonly required maxlength="20" />
                        </div>
                    </div>
                    <%--<div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color:#286090;text-align: left;">Total Cost : </span>
                            <input type="text" id="txtTotalCost" class="form-control money-align" placeholder="Total" disabled readonly required maxlength="20"  />
                        </div>
                    </div>--%>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">User Name : </span>
                            <input type="text" id="txtUserEntry" runat="server" class="form-control" placeholder="User name" disabled readonly required maxlength="20" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row xrow" id="div_transfer" runat="server" visible="false">

                <div class="col-sm-12">
                    <h5>Inventory Stock Transfer to : </h5>
                </div>
                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Company : </span>
                            <asp:DropDownList ID="DDTransfer_Company" CssClass="form-control" runat="server" Enabled="false">
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Warehouse : </span>
                            <asp:DropDownList ID="DDTransfer_Warehouse" CssClass="form-control" runat="server" Enabled="false">
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 pull-right">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Transfer Status : </span>
                            <asp:DropDownList ID="DDTransfer_Status" CssClass="form-control" runat="server" Enabled="false">
                                <asp:ListItem>Encoding</asp:ListItem>
                                <asp:ListItem>In-Transit</asp:ListItem>
                                <asp:ListItem>Recieved</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row xrow div_ref_hide" id="div_reference" runat="server">

                <div class="col-sm-12">
                    <h5>Reference Details : </h5>
                </div>
                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Tracking No. : </span>
                            <input type="text" id="txtReference_TrackingNo" runat="server" class="form-control" placeholder="Inventory Tracking No" required maxlength="20" />
                            <span class="input-group-btn">
                                <button id="btnRefNo" class="btn btn-primary" type="button">...</button>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row xrow" id="div_qc_process" runat="server" visible="false">

                <div class="col-sm-12">
                    <h5>Quarantine Process : </h5>
                </div>
                <div class="col-sm-12">
                    <div class="row xrow">
                        <small>
                            <asp:RadioButtonList ID="RB_QC_Process" runat="server"
                                RepeatDirection="Horizontal" Enabled="false">
                                <asp:ListItem Value="0" Selected="True">New Entry&nbsp;==>&nbsp;</asp:ListItem>
                                <asp:ListItem Value="1">QC No. Updated&nbsp;==>&nbsp;</asp:ListItem>
                                <asp:ListItem Value="2">For Sampling&nbsp;==>&nbsp;</asp:ListItem>
                                <asp:ListItem Value="3">With Sample Result</asp:ListItem>
                            </asp:RadioButtonList>
                        </small>
                    </div>
                </div>

            </div>
            <div class="row xrow">
                <div class="col-lg-12">
                    <div class="row xrow">
                        <div class="btn-toolbar my-toolbar" role="toolbar">
                            <div class="btn-group btn-group-sm">
                                <button id="btnAddItem" type="button" class="btn btn-success disabled" data-toggle="modal"><span class="fa fa-plus fa-fw" aria-hidden="true"></span>Add Item</button>
                            </div>
                            <div class="btn-group btn-group-sm">
                                <button id="btnCancelItem" type="button" class="btn btn-success disabled"><span class="fa fa-remove fa-fw" aria-hidden="true"></span>Cancel Item</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row xrow dataTable_wrapper">

                    <table id="tbl_MFITem_inventory" class="table table-bordered table-hover item_inventory table-font">
                        <thead class="GridHeader">
                            <tr>
                                <th>Item Code</th>
                                <th>Description</th>
                                <th>Weight / Value</th>
                                <th>Unit of Measure</th>
                                <th>Quantity</th>
                                <th>Receiving Receipt</th>
                                <th>Lot No.</th>
                                <th>QC No.</th>
                                <th>MFG Date</th>
                                <th>Expiry Date</th>
                                <th>Remaining Balance</th>
                                <th>Conversion UOM</th>
                                <th>Conversion Factor</th>
                                <th>Item Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>

                </div>
            </div>



        </asp:View>
        <asp:View ID="View_Print" runat="server">

            <div class="row xrow">
                <div class="col-sm-4">

                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Warehouse : </span>
                            <asp:DropDownList ID="DDReport_Warehouse" CssClass="form-control" runat="server" >
                            </asp:DropDownList>
                        </div>
                    </div>

                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Status : </span>
                            <asp:DropDownList ID="DDReport_Status" CssClass="form-control" runat="server">
                                <asp:ListItem>All</asp:ListItem>
                                <asp:ListItem>Approved</asp:ListItem>
                                <%--<asp:ListItem>Disapprove</asp:ListItem>--%>
                                <asp:ListItem>Draft</asp:ListItem>
                                <asp:ListItem>Posted</asp:ListItem>
                                <asp:ListItem>Expired</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Document No. : </span>
                            <%--<input type="text" id="txtReport_DocNo" runat="server" class="form-control" value="All" placeholder="Document No" required  maxlength="20"  />--%>
                            <asp:DropDownList ID="DDReport_DocNo" CssClass="form-control" runat="server">
                                <asp:ListItem>All</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>

                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Item Code : </span>
                            <%--<input type="text" id="txtReport_Item_Code" runat="server" class="form-control" value="All" placeholder="Item No" required  maxlength="4"  />--%>
                            <asp:DropDownList ID="DDReport_Item_Code" CssClass="form-control" runat="server">
                                <asp:ListItem>All</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row xrow">
                <div class="col-sm-2">
                    <div class="row xrow">
                        <button id="btnPost" type="button" class="btn btn-primary btn-sm btn-block"><span class="fa fa-check-circle fa-fw" aria-hidden="true"></span>Post Listing</button>
                    </div>

                </div>
                <div class="col-sm-2">
                    <div class="row xrow">
                        <button id="btnReport" type="button" class="btn btn-primary btn-sm btn-block"><span class="fa fa-file-pdf-o fa-fw" aria-hidden="true"></span>PDF Report</button>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="row xrow">
                        <button id="btnOSExcelReport" type="button"  class="btn btn-primary btn-sm btn-block"  runat="server" onclick="onbtnOSExcelReportClick()"><span class="fa fa-file-excel-o fa-fw" aria-hidden="true"></span> OS Excel Report</button>
                    </div>
                </div>
            </div>
            <div class="row xrow dataTable_wrapper">

                <table id="tbl_MFITem_Report" class="table table-bordered table-hover item_report table-font">

                    <thead class="GridHeader">
                        <tr>
                            <th>Transaction Type</th>
                            <th>Document No.</th>
                            <th>Document Date</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Item Code</th>
                            <th>Item Description</th>
                            <th>Quantity</th>
                            <th>Unit of Measure</th>
                            <th>Receiving Receipt</th>
                            <th>Lot No.</th>
                            <th>QC No.</th>
                            <th>MFG Date</th>
                            <th>Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

            </div>

            <script src="javascript/inventory_report.js" type="text/javascript" lang="javascript"></script>
        </asp:View>
    </asp:MultiView>

    <input id="hidden_useraccess" type="hidden" runat="server" />
    <input id="hidden_username" type="hidden" runat="server" />
    <input id="hidden_available_qty" type="hidden" />
    <input id="hidden_org_qty" type="hidden" />
    <input id="hidden_trx_type" type="hidden" runat="server" />
    <input id="hidden_ref_trx_type" type="hidden" runat="server" />

    <input id="hidden_company" type="hidden" runat="server" />
    <input id="hidden_warehouse" type="hidden" runat="server" />
    <%--<input id="hidden_get_lot_no" type="hidden" />
    <input id="hidden_get_item_cd" type="hidden" />--%>

    <div id="xfooter" class="row xrow"></div>

    <div class="modal fade" id="ItemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="exampleModalLabel"><i class="fa fa-pencil fa-fw"></i>Item Entry</h4>
                </div>
                <div class="modal-body">
                    <div class="row xrow">
                        <div class="input-group input-group-sm" id="unified-inputs">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Item : </span>
                            <input type="text" id="txtItemCode" class="form-control" placeholder="Code" readonly required autofocus maxlength="20" />
                            <input type="text" id="txtItemDescs" class="form-control" placeholder="Search Item..." required maxlength="250" />
                        </div>
                        <div id="search_list" class="list-group search_hide">
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Weight / Value : </span>
                            <input type="text" id="txtItemWeight" class="form-control money-align" placeholder="Weight / Value" readonly required maxlength="20" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-sm" id="unified-inputs-uom">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Unit of Measure : </span>
                            <input type="text" id="txtItemUOM" class="form-control" placeholder="Code" readonly required maxlength="20" />
                            <input type="text" id="txtItemUOMDescs" class="form-control" placeholder="Description" readonly required maxlength="250" />
                        </div>
                    </div>
                    <%-- <div class="row xrow">
                    <div class="input-group  input-group-sm">
                        <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left;">Quantity :</span>
                        <input type="text" id="txtItemQuantity" class="form-control money-align" placeholder="Quantity" required  maxlength="20" />
                        <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left; border-left: 0; border-right: 0;">Unit Cost :</span>
                        <input type="text" id="txtItemUnitCost" class="form-control money-align" placeholder="Unit Cost" required  maxlength="20" />
                    </div>
                </div>--%>
                    <div class="row xrow">
                        <div class="input-group  input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Quantity :</span>
                            <input type="text" id="txtItemQuantity" class="form-control money-align" placeholder="Quantity" required maxlength="20" />
                        </div>
                    </div>
                    <%--<div class="row xrow">
                    <div class="input-group  input-group-sm">
                        <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left;">Unit Cost :</span>
                        <input type="text" id="txtItemUnitCost" class="form-control money-align" placeholder="Unit Cost" required  maxlength="20" />
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-sm">
                        <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left;">Total Cost : </span>
                        <input type="text" id="txtItemTotalCost" class="form-control money-align" placeholder="Total Cost" required readonly maxlength="20"  />
                    </div>
                </div>--%>
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Receiving Receipt : </span>
                            <input type="text" id="txtItemReceivingReceipt" class="form-control" placeholder="Receiving Receipt" required maxlength="20" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Lot No. : </span>
                            <input type="text" id="txtItemLotNo" class="form-control" placeholder="Lot No." required maxlength="20" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Quality Control No. : </span>
                            <input type="text" id="txtItemQCNo" class="form-control" placeholder="Quality Control No." required maxlength="20" />
                        </div>
                    </div>
                    <%--<div class="row xrow">
                    <div class="input-group  input-group-sm">
                        <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left;">MFG Date :</span>
                        <input type="text" id="txtItemMFGDate" class="form-control" placeholder="Manufacturing Date" required  maxlength="30" />
                        <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left; border-left: 0; border-right: 0;">Expiry Date : </span>
                        <input type="text" id="txtItemExpiryDate" class="form-control" placeholder="Expiry Date" required  maxlength="30" />
                    </div>
                </div>--%>
                    <div class="row xrow">
                        <div class="input-group  input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">MFG Date :</span>
                            <input type="text" id="txtItemMFGDate" class="form-control" placeholder="Manufacturing Date" required maxlength="30" />
                            <%--<span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left; border-left: 0; border-right: 0;">Expiry Date : </span>
                        <input type="text" id="txtItemExpiryDate" class="form-control" placeholder="Expiry Date" required  maxlength="30" />--%>
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group  input-group-sm">
                            <%--<span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left;">MFG Date :</span>
                        <input type="text" id="txtItemMFGDate" class="form-control" placeholder="Manufacturing Date" required  maxlength="30" />--%>
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Expiry Date : </span>
                            <input type="text" id="txtItemExpiryDate" class="form-control" placeholder="Expiry Date" required maxlength="30" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Remarks : </span>
                            <input type="text" id="txtItemRemarks" class="form-control" placeholder="Remarks" required maxlength="255" />
                        </div>
                    </div>
                    <div id="div_conversion" class="row xrow div_ref_hide">
                        <div class="col-sm-8">
                            <label>Allow Unit Conversion? </label>
                            <asp:RadioButtonList ID="RBConversion" runat="server" RepeatDirection="Horizontal">
                                <asp:ListItem Value="1">Yes&nbsp;</asp:ListItem>
                                <asp:ListItem Value="0" Selected="True">No</asp:ListItem>
                            </asp:RadioButtonList>
                        </div>
                        <div class="col-sm-4 btn-popup">
                            <a href="#" class="btn btn-sm btn-primary" tabindex="0" data-toggle="popover" data-trigger="focus" data-popover-content="#a1"><i class="fa fa-search fa-fw"></i>Show other item sources</a>
                        </div>
                    </div>
                    <div id="div_conversion_dd" class="row xrow div_ref_hide">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Conversion UOM : </span>
                            <asp:DropDownList ID="DDConversion_UOM" CssClass="form-control" runat="server">
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div id="div_conversion_txt" class="row xrow div_ref_hide">
                        <div class="input-group  input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Conversion Factor : </span>
                            <input type="text" id="txtConversion_factor" class="form-control money-align" placeholder="Conversion Factor" readonly required maxlength="30" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal"><i class="fa fa-remove fa-fw"></i>Close</button>
                    <button type="button" id="btnAddRowItem" class="btn btn-sm btn-success"><span class="fa fa-plus fa-fw" aria-hidden="true"></span>Add Item</button>
                </div>
            </div>
        </div>
    </div>

    <div id="a1" class="hidden">
        <div class="popover-heading"><span style="color: #286090;">Other Item sources</span></div>

        <div id="div_source" class="popover-body">
        </div>

    </div>

    <div class="modal fade" id="ViewReportModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"><i class="fa fa-print fa-fw"></i>Reports</h4>
                </div>
                <div class="modal-body">

                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Viewing Option : </span>
                            <asp:DropDownList ID="DDView" CssClass="form-control" runat="server">
                                <asp:ListItem Selected="True">All</asp:ListItem>
                                <asp:ListItem>Selected Document</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Viewing Status : </span>
                            <asp:DropDownList ID="DDStatus" CssClass="form-control" runat="server">
                                <asp:ListItem>All</asp:ListItem>
                                <asp:ListItem Selected="True">Draft</asp:ListItem>
                                <asp:ListItem>Approved</asp:ListItem>
                                <asp:ListItem>Disapprove</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group  input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Date From :</span>
                            <input type="text" id="txtReportFrom" class="form-control" placeholder="Date From" required maxlength="30" />
                            <%--<span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left; border-left: 0; border-right: 0;">Date To : </span>
                        <input type="text" id="txtReportTo" class="form-control" placeholder="Date To" required  maxlength="30" />--%>
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group  input-group-sm">
                            <%-- <span class="input-group-addon span-addon-pw" style="color:#286090;text-align: left;">Date From :</span>
                        <input type="text" id="txtReportFrom" class="form-control" placeholder="Date From" required  maxlength="30" />--%>
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left; border-left: 0; border-right: 0;">Date To : </span>
                            <input type="text" id="txtReportTo" class="form-control" placeholder="Date To" required maxlength="30" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Document No. : </span>
                            <asp:DropDownList ID="DDDocuments" CssClass="form-control" runat="server">
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal"><i class="fa fa-remove fa-fw"></i>Close</button>
                    <button type="button" id="btnViewReport" class="btn btn-sm btn-success"><span class="fa fa-print fa-fw" aria-hidden="true"></span>PDF Report</button>
                </div>
            </div>
        </div>
    </div>

    <!--OS REPORT MODAL -->
      <div class="modal fade" id="OSReportModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"><i class="fa fa-print fa-fw"></i>Office Supply Reports</h4>
                </div>
                <div class="modal-body">
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Report Type : </span>
                            <asp:DropDownList ID="DD_Report_Details" CssClass="form-control" runat="server">
                                <asp:ListItem Value="1" Selected="True">Monthly Issuance</asp:ListItem>
                                <asp:ListItem Value="2" >Monthly Received</asp:ListItem>
                                <asp:ListItem Value="0">Ending Balance</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                   
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">As of Date : </span>
                           <asp:TextBox  id="os_report_as_of_date" class="form-control" placeholder="Date" runat="server" ></asp:TextBox>
                     
                        </div>
                    </div>

                     <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Highlight Unit Cost : </span>
                            <asp:DropDownList ID="HighLight" CssClass="form-control" runat="server">
                                <asp:ListItem Value="true" Selected="True">Enable</asp:ListItem>
                                <asp:ListItem Value="false">Disable</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>

                  
                    
                </div>

    
                <div class="modal-footer">
                  
                    
                    <button id="Button1" class="btn btn-sm btn-success" runat="server"   onserverclick="GenerateOSExcelReport">Generate Report</button>
                  <!--  <button type="button" id="btnGenerateOSReport" class="btn btn-sm btn-success disabled" runat="server" onserverclick="GenerateOSExcelReport"><span class="fa fa-print fa-fw" aria-hidden="true"></span>Generate Report</button>-->
                    <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal"><i class="fa fa-remove fa-fw"></i>Close</button>
                </div>
            </div>
        </div>
    </div>



    <!-- DataTables JavaScript -->
    <script src="bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
    <script src="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js"></script>


    <!-- MaskEdit JavaScript -->
    <script src="bower_components/maskedit/jquery.maskedinput.min.js" type="text/javascript"></script>
    <script src="bower_components/maskedit/jquery.price_format.2.0.min.js" type="text/javascript"></script>

    <!-- JQuery Confirm -->
    <script src="bower_components/jquery-confirm/jquery-confirm.min.js" type="text/javascript"></script>

    <!--script for excel report (office supplies only) -->
     <script src="javascript/cha/office_supply_report.js" type="text/javascript"></script>

</asp:Content>
