<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="costing.aspx.cs" Inherits="stock" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <!-- DataTables CSS -->
    <link href="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet" />
    <!-- DataTables Responsive CSS -->
    <link href="bower_components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet" />
    <!-- JQuery Confirm CSS -->
    <link href="bower_components/jquery-confirm/jquery-confirm.min.css" rel="stylesheet" />
    <link href="css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="css/select2-skins.css" rel="stylesheet" type="text/css" />

    
    <link href="css/cha/submenu.css" rel="stylesheet" type="text/css" />
   




    <style>
        div.dataTables_scrollHead thead tr {
            height: 30px;
        }
        .icon-arrow-right {
            float: right;
        }

        .right {
            float: right;
            /*  font-size: 20px;*/
            text-align: right;
        }

        td.details-control {
            cursor: pointer;
        }

        table.dataTable tbody td.no-padding {
            padding: 0;
        }

        .alignRight {
            text-align: right;
        }

        table.display {
            margin: 0 auto;
            width: 100%;
            clear: both;
            border-collapse: collapse;
            table-layout: fixed;
            word-wrap: break-word;
        }

        .dataTable td {
            text-overflow: ellipsis;
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-align: left;
            padding: 0px;
        }

        .dataTable tr td.details{
            padding:0; margin:0;
        }

        .dataTable tr td.details > div > .dataTables_scroll > .dataTables_scrollHead {
             height: 0px;
        }
        .details {
            background-color: #e7e7e7;
        }

        .error-header {
            padding: 9px 15px;
            border-bottom: 1px solid #eee;
            background-color: #cc0000;
            color: #f2f2f2;
        }

        .error-body {
            background-color: rgba(255, 224, 224, 0.68);
        }

        .form-control {
            height: inherit !important;
        }

        .table-settings {
            background-color: transparent;
            border-color:transparent;
        }

        .select2-container {
            border-top-right-radius: 4px !important;
            border-bottom-right-radius: 4px !important;
        }

            .select2-container > a > span.select2-arrow {
                width: 15px !important;
            }

        .select2-drop {
            border-radius: 4px !important;
        }

     
    </style>


    <!-- Title Header-->


    <div class="row">
        <div class="col-lg-12">
            <div>
                <ul class="my-header-ul">
                    <li>
                        <h3><i class="fa fa-fw">&#8369</i>Costing</h3>
                    </li>

                </ul>
            </div>
        </div>
        <!-- /.col-lg-12 -->
    </div>

    <asp:MultiView ID="MultiView1" runat="server">

        <asp:View ID="View_StockReport" runat="server">
            <div class="col-lg-12">

                
                    <div class="btn-toolbar my-toolbar" role="toolbar">
                        <div class="btn-group btn-group-sm">
                            <button id="btn_Report" type="button" class="btn btn-primary btn-sm" title="Create report">Create Report</button>
                        </div>


                        <div class="pull-right">

                            <div class="dropdown btn-group">
                                <!--
                                <label class="switch">
                                    <input type="checkbox" class="switch-input" id="admin_view"/>
                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                    <span class="switch-handle"></span>
                                </label>-->
                                <button type="button" class="table-settings btn btn-default btn-sm dropdown-toggle" title="Show table settings" data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span></button>

                                <ul class="dropdown-menu dropdown-menu-right" role="menu">

                                    <li><a href="#" class="small" data-value="99" tabindex="-1" title="Show items by referrence no">
                                        <input type="checkbox" value="true" id="showByRef" />&nbsp;By Ref No</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li class="dropdown-submenu pull-left disabled" id="li_show_hide_col">
                                        <a href="#" class="small" tabindex="-1">&nbsp;Show/Hide Columns</a>
                                        <ul class="dropdown-menu">
                                            <li><a href="#" class="small" data-value="6" tabindex="-1">
                                                <input type="checkbox" value="true" id="6" />&nbsp;Total Cost</a></li>
                                            <li><a href="#" class="small" data-value="7" tabindex="-1">
                                                <input type="checkbox" id="7" />&nbsp;RR No</a></li>
                                            <li><a href="#" class="small" data-value="8" tabindex="-1">
                                                <input type="checkbox" id="8" />&nbsp;Control No</a></li>
                                            <li><a href="#" class="small" data-value="9" tabindex="-1">
                                                <input type="checkbox" id="9" />&nbsp;PO No</a></li>
                                            <li><a href="#" class="small" data-value="10" tabindex="-1">
                                                <input type="checkbox" id="10" />&nbsp;Ref No</a></li>
                                            <li><a href="#" class="small" data-value="11" tabindex="-1">
                                                <input type="checkbox" id="11" />&nbsp;Warehouse</a></li>
                                            <li><a href="#" class="small" data-value="12" tabindex="-1">
                                                <input type="checkbox" id="12" />&nbsp;Status</a></li>
                                            <li><a href="#" class="small" data-value="13" tabindex="-1">
                                                <input type="checkbox" id="13" />&nbsp;Doc No</a></li>
                                            <li><a href="#" class="small" data-value="14" tabindex="-1">
                                                <input type="checkbox" id="14" />&nbsp;Doc Date</a></li>
                                            <li><a href="#" class="small" data-value="15" tabindex="-1">
                                                <input type="checkbox" id="15" />&nbsp;Doc Description</a></li>
                                            <li><a href="#" class="small" data-value="16" tabindex="-1">
                                                <input type="checkbox" id="16" />&nbsp;Lot No</a></li>
                                            <li><a href="#" class="small" data-value="17" tabindex="-1">
                                                <input type="checkbox" id="17" />&nbsp;Mfg Date</a></li>
                                            <li><a href="#" class="small" data-value="18" tabindex="-1">
                                                <input type="checkbox" id="18" />&nbsp;Exp Date</a></li>
                                            <li><a href="#" class="small" data-value="19" tabindex="-1">
                                                <input type="checkbox" id="19" />&nbsp;Department</a></li>
                                            <li><a href="#" class="small" data-value="20" tabindex="-1">
                                                <input type="checkbox" id="20" />&nbsp;Item Remarks</a></li>
                                        </ul>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </div>
                
            </div>

            <div id="dropdown_menus">
                 <div class="row xrow">
                <div class="col-sm-4">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">PO No. : </span>
                        <asp:DropDownList ID="DD_Po_No" CssClass="form-control searchable" runat="server" OnSelectedIndexChanged="selectedIndexChange">
                        </asp:DropDownList>

                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">RR No. : </span>
                        <asp:DropDownList ID="DD_RR_No" CssClass="form-control" runat="server" OnSelectedIndexChanged="selectedIndexChange">
                        </asp:DropDownList>
                    </div>
                </div>


                <div class="col-sm-4">
                    <div class="right">
                        <b>Receipting Total: </b>
                        &#8369<span id="received_total"></span>
                    </div>
                </div>

            </div>

            <div class="row xrow">
                <div class="col-sm-4">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Control No. : </span>
                        <asp:DropDownList ID="DD_Control_No" CssClass="form-control" runat="server" OnSelectedIndexChanged="selectedIndexChange">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <div class="right">

                        <!--   <b>Issuance Total:</b>  &#8369<span id="issuance_total"></span>-->

                    </div>
                </div>

            </div>

            <div class="row xrow">
                <div class="col-sm-2">
                </div>
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                </div>
            </div>

            </div>

           <div id="by_ref_no_dropdowns">

               <div class="row xrow">
                <div class="col-sm-4">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Ref No. : </span>
                        <asp:DropDownList ID="DD_ByRefNo" CssClass="form-control" runat="server" >
                        </asp:DropDownList>

                    </div>
                </div>
                   </div>
           </div>

            <div class="row xrow dataTable_wrapper">
                <!-- <table id="tbl_stock_card" class="table-bordered table-hover item_report table-font">-->
                <table id="tbl_stock_card" class="display table-bordered table-hover table-font item_report">
                    <thead class="GridHeader" />
                </table>
            </div>








        </asp:View>
    </asp:MultiView>

    <table id="iss" class="">
    </table>

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
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Item Category : </span>
                            <asp:DropDownList ID="DD_Item_Category" CssClass="form-control" runat="server">
                                <asp:ListItem Value="RM" Selected="True">Raw Material</asp:ListItem>
                                <asp:ListItem Value="PM">Packaging Material</asp:ListItem>
                                 
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">As of Date : </span>
                            <input type="text" id="date" class="form-control" placeholder="Date" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-sm">
                            <span class="input-group-addon span-addon-pw" style="color: #286090; text-align: left;">Report Details : </span>
                            <asp:DropDownList ID="DD_Report_Details" CssClass="form-control" runat="server">
                                <asp:ListItem Value="1" Selected="True">Complete</asp:ListItem>
                                <asp:ListItem Value="0">Summarized</asp:ListItem>
                            </asp:DropDownList>
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
                    <div class="row xrow">
                        <div class="alert alert-info">
                            <strong>Note:</strong> For office supply reports, please go to the <strong><a href="admin_inventory_report.aspx" id="">Admin Inventory Reports.</a></strong>
                        </div>
                    </div>

                </div>


                <div class="modal-footer">
                    <button type="button" id="btnViewReport" class="btn btn-sm btn-primary disabled  ">Generate Report</button>
                    <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="ConfirmUpdateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"><i class="fa fa-exclamation-triangle fa-fw"></i>Warning</h4>
                </div>
                <div class="modal-body">
                    <h4>Found entries with the same Control No. Click 'OK' to continue.</h4>
                    <div class="row xrow dataTable_wrapper">
                        <table id="same_rows_table" class="display table-bordered table-hover table-font item_report">
                            <thead class="GridHeader" />
                        </table>
                    </div>
                </div>


                <div class="modal-footer">
                    <button type="button" id="btn_update_yes" class="btn btn-sm btn-primary " style="width: 100px;">OK</button>
                    <button type="button" class="btn btn-sm btn-secondary " style="width: 100px;" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="ErrorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="alert">
            <div class="modal-content">
                <div class="modal-header error-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 id="error-title" class="modal-title"><i class="fa fa-warning fa-fw"></i></h4>
                </div>
                <div class="modal-body error-body">
                    <label id="error-msg"></label>
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

    <script src="javascript/cha/jquery.formatCurrency-1.4.0.min.js" type="text/javascript"></script>
    <script src="javascript/cha/jquery.dataTables.editable.js" type="text/javascript"></script>
    <script src="javascript/cha/jquery.jeditable.mini.js" type="text/javascript"></script>
   
    <script src="javascript/cha/stock_update.js" type="text/javascript" lang="javascript"></script>
  

</asp:Content>

