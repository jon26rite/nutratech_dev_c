<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="MotorPoolServiceRequest.aspx.cs" Inherits="MotorPoolServiceRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <div class="row">
        <div class="col-lg-12">
            <div>
                <ul class="my-header-ul">
                    <li>
                        <h3><i class="fa fa-truck fa-fw"></i>Motor Pool </h3>
                    </li>
                    <li>
                        <h3><span class="sub-header">
                            <asp:Label ID="lblMenu" runat="server" Text=""></asp:Label></span></h3>
                    </li>
                </ul>
            </div>
        </div>
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
                        <div id="xsearch_mf" class="input-group input-group-sm pull-right">
                            <span class="input-group-addon"><span class="fa fa-search fa-fw"></span></span>
                            <input type="text" id="txtsearch" class="form-control" placeholder="Search" />
                        </div> 
                    </div>
                </div>
            </div>           
        </asp:View>
        <asp:View ID="ViewNothing" runat="server"> 
        </asp:View>
    </asp:MultiView>

    <asp:MultiView ID="MultiView2" runat="server">
        <asp:View ID="ViewServiceRequestForm" runat="server">
            <div class="row xrow">
                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Vehicle : </span>
                            <asp:DropDownList ID="DD_vehicle_plate_number" CssClass="form-control" runat="server" Enabled="false">
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Driver : </span>
                            <asp:DropDownList ID="DD_driver_username" CssClass="form-control" runat="server" Enabled="false">
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Mileage : </span>
                            <input type="text" id="mileage" class="form-control money-align" value="0" placeholder="Mileage" disabled autofocus required maxlength="20" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Service Type : </span>
                            <asp:DropDownList ID="DD_service_type" CssClass="form-control" runat="server" Enabled="false">
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Request Date : </span>
                            <input type="text" id="req_date" class="form-control" placeholder="Request Date" disabled required maxlength="250" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Request Description : </span>
                            <input type="text" id="req_descs"  class="form-control"  placeholder="Request Description" disabled autofocus required maxlength="250" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Action Taken :* </span>
                            <textarea id="action_taken" class="form-control" disabled autofocus > </textarea>
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Remarks : </span>
                            <textarea id="remarks" class="form-control" disabled autofocus > </textarea>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Date Started : </span>
                            <input type="text" id="date_started" class="form-control" placeholder="Date Started" disabled required maxlength="250" />
                        </div>
                    </div>
                    <div class="row xrow">
                        <div class="input-group input-group-xs">
                            <span class="input-group-addon span-addon" style="color: #286090; text-align: left;">Date Completed : </span>
                            <input type="text" id="date_completed" class="form-control" placeholder="Date Completed" disabled required maxlength="250" />
                        </div>
                    </div>
                </div>

            </div>
           
            <div class="row xrow">
                <table id="T_Service_Request" class=" table-bordered table-hover item_inventory table-font dataTables_scrollBody" style="height: 20px; overflow-y: auto;">
                    <thead class="GridHeader">                       
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <script src="javascript/motorpool/serviceRequest.js"></script>
        </asp:View>
    </asp:MultiView>



    <script src="bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
    <script src="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js"></script>

     <!-- MaskEdit JavaScript -->
    <script src="bower_components/maskedit/jquery.maskedinput.min.js" type="text/javascript"></script>
    <script src="bower_components/maskedit/jquery.price_format.2.0.min.js" type="text/javascript"></script>

    
    <input id="hidden_username" type="hidden" runat="server" />
</asp:Content>

