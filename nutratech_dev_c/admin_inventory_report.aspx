<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="admin_inventory_report.aspx.cs" Inherits="admin_inventory_report" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
      <!-- DataTables CSS -->
    <link href="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet" />
    <!-- DataTables Responsive CSS -->
    <link href="bower_components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet" />
    <div class="row">
        <div class="col-lg-12">
            <div>
                <ul class="my-header-ul">
                    <li>
                        <h3><i class="fa fa-print fa-fw"></i>Admin Inventory Reports</h3>
                    </li>

                </ul>
            </div>
        </div>
        <!-- /.col-lg-12 -->
    </div>

    <asp:MultiView ID="MultiView1" runat="server">

        <asp:View ID="View1" runat="server">
            <div class="row xrow">
                <div class="col-sm-4">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Transaction : </span>
                        <asp:DropDownList ID="DD_Transaction" CssClass="form-control" runat="server" >
                             <asp:ListItem Value="I" Selected="True">Received</asp:ListItem>
                                <asp:ListItem Value="O" >Issuance</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            
              <div class="row xrow">
               <div class="col-sm-2">
                    <div class="row xrow">
                        <button id="btnOSExcelReport" type="button"  class="btn btn-primary btn-sm btn-success" title="Create Excel Report" runat="server" onclick="onbtnOSExcelReportClick()"><span class="fa fa-file-excel-o fa-fw" aria-hidden="true"></span>Excel Report</button>
                    </div>
                </div>
            </div>
          

            <div class="row xrow dataTable_wrapper">
                <!-- <table id="tbl_stock_card" class="table-bordered table-hover item_report table-font">-->
                <table id="tbl_inventory" class=" table-bordered table-hover table-font item_report ">
                    <thead class="GridHeader" />
                </table>
            </div>






        </asp:View>
    </asp:MultiView>

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

      <input id="hidden_company" type="hidden" runat="server" />
    
    <!-- DataTables JavaScript -->

    <script src="bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
    <script src="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js"></script>

     <!--script for excel report (office supplies only) -->
     <script src="javascript/cha/office_supply_report.js" type="text/javascript"></script>
</asp:Content>

