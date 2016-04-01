<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="masterfiles.aspx.cs" Inherits="masterfiles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <!-- DataTables CSS -->
    <link href="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet" />
    <!-- DataTables Responsive CSS -->
    <link href="bower_components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet" />
    <script type="text/javascript">

            function StartClick() {
                var rowsCount = <%=GV_Company1.Rows.Count%>;
                var gvDrv = document.getElementById("ContentPlaceHolder1_GV_Company1");
              
                for (i = 0; i < rowsCount; i++) {
                    var cell = gvDrv.rows[i+1].cells;
                    var HTML = cell[1].innerHTML;
                    if (HTML == "&nbsp;") {
                        document.getElementById("ContentPlaceHolder1_GV_Company1_CBx").checked = false;
                        
                    }
                    else {
                        document.getElementById("ContentPlaceHolder1_GV_Company1_CB_" + i).checked = document.getElementById("ContentPlaceHolder1_GV_Company1_CBx").checked;
                    };
                }
            }

            function StartClick2() {
                var rowsCount = <%=GV_Company2.Rows.Count%>;
                var gvDrv = document.getElementById("ContentPlaceHolder1_GV_Company2");

                for (i = 0; i < rowsCount; i++) {
                    var cell = gvDrv.rows[i+1].cells;
                    var HTML = cell[1].innerHTML;
                    if (HTML == "&nbsp;") {
                        document.getElementById("ContentPlaceHolder1_GV_Company2_CBx").checked = false;
                    }
                    else {
                        document.getElementById("ContentPlaceHolder1_GV_Company2_CB_" + i).checked = document.getElementById("ContentPlaceHolder1_GV_Company2_CBx").checked;
                    };
                }
            }

        function StartClick3() {
            var rowsCount = <%=GVItem1.Rows.Count%>;
            var gvDrv = document.getElementById("ContentPlaceHolder1_GVItem1");

            for (i = 0; i < rowsCount; i++) {
                var cell = gvDrv.rows[i+1].cells;
                var HTML = cell[1].innerHTML;
                if (HTML == "&nbsp;") {
                    document.getElementById("ContentPlaceHolder1_GVItem1_CBx").checked = false;
                }
                else {
                    document.getElementById("ContentPlaceHolder1_GVItem1_CB_" + i).checked = document.getElementById("ContentPlaceHolder1_GVItem1_CBx").checked;
                };
            }
        }

        function StartClick4() {
            var rowsCount = <%=GVItem2.Rows.Count%>;
            var gvDrv = document.getElementById("ContentPlaceHolder1_GVItem2");

            for (i = 0; i < rowsCount; i++) {
                var cell = gvDrv.rows[i+1].cells;
                var HTML = cell[1].innerHTML;
                if (HTML == "&nbsp;") {
                    document.getElementById("ContentPlaceHolder1_GVItem2_CBx").checked = false;
                }
                else {
                    document.getElementById("ContentPlaceHolder1_GVItem2_CB_" + i).checked = document.getElementById("ContentPlaceHolder1_GVItem2_CBx").checked;
                };
            }
        }
       
    </script>
    <div class="row">
        <div class="col-lg-12">
            <div>
                <ul class="my-header-ul">
                    <li><h3><i class="fa fa-gear fa-fw"></i> General Masterfiles </h3></li>
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
        <asp:View ID="ViewMF" runat="server"> 
            <div class="col-lg-4">
                <div class="row xrow" id="div_group" runat="server" visible="false">
                    
                        <strong><asp:Label ID="lblGroup" runat="server"></asp:Label></strong>
                        <asp:DropDownList ID="DDGroup" runat="server" >
                        </asp:DropDownList>
                    
                    
                </div> 

                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Code : </span>
                        <input type="text" id="txt_code" runat="server" class="form-control" placeholder="Code" disabled readonly required autofocus maxlength="10"  />
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Description : </span>
                        <input type="text" id="txt_description" runat="server" class="form-control" placeholder="Description" disabled required autofocus maxlength="250" />
                    </div>
                </div>
                
                <div class="row xrow">
                    <br />
                    <div class="form-group xfont-style">
                        <label>Status : </label> 
                        <asp:RadioButtonList ID="rb_status" runat="server" RepeatDirection="Horizontal" Enabled="false">
                            <asp:ListItem Value="1" Selected="True">Active&nbsp;</asp:ListItem>
                            <asp:ListItem Value="0">In-Active</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                    
                </div> 
            </div>
            
            <div class="col-lg-8">
                <div class="row xrow dataTable_wrapper">
                    <table id="tbl_mf" class="table table-bordered  table-hover table-font">
                        <thead class="GridHeader">
                            <tr>
               
                                <th>Code</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                       </thead>
                       <tbody></tbody>
                    </table>
                           
                </div>
            </div>  
            
            <input id="hidden_entry" type="hidden" runat="server" />      
            
            <script src="javascript/masterfiles_option.js" type="text/javascript" lang="javascript"></script>

        </asp:View>
        <asp:View ID="ViewUser" runat="server"> 
            <div class="col-lg-12">
                <div class="col-lg-4">
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">First Name : </span>
                        <input type="text" id="txtUserFName" runat="server" class="form-control" placeholder="First Name" disabled required autofocus maxlength="100"  />
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Middle Name : </span>
                        <input type="text" id="txtUserMName" runat="server" class="form-control" placeholder="Middle Name" disabled required autofocus maxlength="100"  />
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Last Name : </span>
                        <input type="text" id="txtUserLName" runat="server" class="form-control" placeholder="Last Name" disabled required autofocus maxlength="100"  />
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Suffix : </span>
                         <asp:DropDownList ID="DDUserSuffix" CssClass="form-control" runat="server" Enabled="false" >
                             <asp:ListItem>NA</asp:ListItem>
                             <asp:ListItem>Sr.</asp:ListItem>
                             <asp:ListItem>Jr.</asp:ListItem>
                             <asp:ListItem>III</asp:ListItem>
                             <asp:ListItem>IV</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>

            </div>
            <div class="col-lg-4">
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Employee ID : </span>
                        <input type="text" id="txtUserEmployeeID" runat="server" class="form-control" placeholder="Employee ID" disabled required autofocus maxlength="20" />
                    </div>
                </div>

                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Username : </span>
                        <input type="text" id="txtUsername" runat="server" class="form-control" placeholder="UserName" disabled required autofocus maxlength="20" />
                    </div>
                </div>

                
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Department : </span>
                         <asp:DropDownList ID="DDUserDepartment" CssClass="form-control" runat="server" Enabled="false" >
                        </asp:DropDownList>
                    </div>
                </div>

                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Group Menus Access : </span>
                         <asp:DropDownList ID="DDUserGroupAccess" CssClass="form-control" runat="server" Enabled="false" >
                        </asp:DropDownList>
                    </div>
                </div>

                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">User Access Level : </span>
                         <asp:DropDownList ID="DDUserAccessLevel" CssClass="form-control" runat="server" Enabled="false" >
                             <asp:ListItem>User</asp:ListItem>
                             <asp:ListItem>Manager</asp:ListItem>
                             <asp:ListItem>Administrator</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                
            </div>    
            <div class="col-lg-4">
                <div class="row xrow">
                
                    <div class="form-group xfont-style">
                        <label>Status : </label>
                        <asp:RadioButtonList ID="RBUserStatus" runat="server" RepeatDirection="Horizontal" Enabled="false">
                            <asp:ListItem Value="1" Selected="True">Active</asp:ListItem>
                            <asp:ListItem Value="0">In-Active</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="row xrow">
                    <div class="form-group xfont-style">
                        <label>Password Reset : </label>
                        <asp:RadioButtonList ID="RBUserResetPassword" runat="server" RepeatDirection="Horizontal" Enabled="false">
                            <asp:ListItem Value="1">Yes</asp:ListItem>
                            <asp:ListItem Value="0" Selected="True">No</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
            </div>
                
                <div class="row xrow dataTable_wrapper">
                   
                    <table id="tbl_MFUser" class="table table-bordered table-hover table-font" >
                        <thead class="GridHeader">
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Group Access</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                           
                </div>
            </div>
            
            <script src="javascript/masterfiles_user.js" type="text/javascript" lang="javascript"></script>

        </asp:View>
        <asp:View ID="ViewUserCompany" runat="server"> 
            <div class="col-lg-12">
                <div class="row xrow">
                    <div class="col-lg-6">
                    
                        <strong>User :</strong>
                        <asp:DropDownList ID="DDUSer" runat="server" AutoPostBack="true" OnSelectedIndexChanged="DDUSer_SelectedIndexChanged">
                        </asp:DropDownList>
                    
                    </div> 
                </div>

                <div class="row xrow">
                
                   
                    <table class="table">
                        <thead>
                            <tr>
                                <th>
                                    <label>Assigned <asp:Label ID="lblAssign1" runat="server" Text="Company"></asp:Label></label>
                                </th>
                                <th style="min-width:80px;">
                                    &nbsp;
                                </th>
                                <th>
                                    <label>Un-Assigned <asp:Label ID="lblAssign2" runat="server" Text="Company"></asp:Label></label>
                                </th>
                            </tr>
                        </thead>
                        <tbody style="height:200px;">
                            <tr>
                                <td>
                                     <asp:Panel ID="pnl_App2" runat="server" ScrollBars="Auto" Height="300px" Width="100%" >
                                        <asp:GridView ID="GV_Company2" runat="server" AutoGenerateColumns="False" Width="100%" >
                                            <Columns>
                                                <asp:TemplateField>
                                                    <HeaderTemplate>
                                                        <input type="checkbox" id="CBx" name="xx" runat="server" onchange="StartClick2();return false;">
                                                    </HeaderTemplate>
                                                    <ItemTemplate>
                                                        <asp:CheckBox ID="CB" runat="server"></asp:CheckBox>
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="GridIteml" Width="15px" />
                                                    <HeaderStyle CssClass="GridHeader2" Width="15px" />
                                                </asp:TemplateField>
                                                <asp:BoundField DataField="x0" HeaderText="Code">
                                                    <ItemStyle CssClass="GridItem" Width="100px" />
                                                    <HeaderStyle CssClass="GridHeader2" Width="100px"/>
                                                </asp:BoundField>
                                                <asp:BoundField DataField="x1" HeaderText="Company Name">
                                                    <ItemStyle CssClass="GridItemr" />
                                                    <HeaderStyle CssClass="GridHeader2" />
                                                </asp:BoundField>
                                            </Columns>
                                        </asp:GridView>
                                        <asp:Button ID="btnCheck2" style="visibility:hidden;" runat="server" />
                                    </asp:Panel>
                                </td>
                                <td style="min-width:80px;">
                                    <asp:Button ID="btnSelect" OnClick="btnSelect_Click" runat="server" Text="< Add" CssClass="btn btn-sm btn-info btn-block" />
                                    <asp:Button ID="btnUnSelect" OnClick="btnUnSelect_Click" runat="server" Text="Remove >" CssClass="btn btn-sm btn-info btn-block" />
                                </td>
                                <td>
                                    <asp:Panel ID="pnl_App1" runat="server" ScrollBars="Auto" Height="300px" Width="100%"  >
                                        <asp:GridView ID="GV_Company1" runat="server" AutoGenerateColumns="False" Width="100%" >
                                            <Columns>
                                                <asp:TemplateField>
                                                    <HeaderTemplate>
                                                        <input type="checkbox" id="CBx" name="xx" runat="server" onchange="StartClick();return false;">
                                                    </HeaderTemplate>
                                                    <ItemTemplate>
                                                        <asp:CheckBox ID="CB" runat="server"></asp:CheckBox>
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="GridIteml" Width="15px" />
                                                    <HeaderStyle CssClass="GridHeader2" Width="15px" />
                                                </asp:TemplateField>
                                                <asp:BoundField DataField="x0" HeaderText="Code">
                                                    <ItemStyle CssClass="GridItem" Width="100px" />
                                                    <HeaderStyle CssClass="GridHeader2" Width="100px"/>
                                                </asp:BoundField>
                                                <asp:BoundField DataField="x1" HeaderText="Company Name">
                                                    <ItemStyle CssClass="GridItemr" />
                                                    <HeaderStyle CssClass="GridHeader2" />
                                                </asp:BoundField>
                                            </Columns>
                                        </asp:GridView>
                                        <asp:Button ID="btnCheck" style="visibility:hidden;" runat="server" />
                                    </asp:Panel>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                
            </div>
            
           
        </asp:View>
        <asp:View ID="ViewItem" runat="server"> 
            <div class="col-lg-12">
                <div class="row xrow">
                <div class="col-lg-4">
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Code : </span>
                        <input type="text" id="txtItem_code" runat="server" class="form-control" placeholder="Code" disabled required autofocus maxlength="20"  />
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Description : </span>
                        <input type="text" id="txtItem_descs" runat="server" class="form-control" placeholder="Description" disabled required autofocus maxlength="250"  />
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Unit of Measure : </span>
                        <asp:DropDownList ID="ddItem_UOM" CssClass="form-control" runat="server" Enabled="false" >
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-xs ">
                        <span class="input-group-addon span-addon">Standard Cost : </span>
                        <input type="text" id="txtItem_StandardCost" runat="server" class="form-control money-align" value="0" placeholder="Amount" disabled required autofocus maxlength="30"  />
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-xs ">
                        <span class="input-group-addon span-addon">Latest Cost : </span>
                        <input type="text" id="txtItem_LatestCost" runat="server" class="form-control money-align" value="0" placeholder="Amount" readonly required autofocus maxlength="30"  />
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-xs ">
                        <span class="input-group-addon span-addon">Weight/Value : </span>
                        <input type="text" id="txtItem_Weight" runat="server" class="form-control money-align" value="0" placeholder="Value" disabled required autofocus maxlength="30"  />
                    </div>
                </div>
               
            </div>
            <div class="col-lg-4">
               <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Item Type : </span>
                         <asp:DropDownList ID="DD_ItemType" CssClass="form-control" runat="server" Enabled="false" >
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Item Class : </span>
                         <asp:DropDownList ID="DD_ItemClass" CssClass="form-control" runat="server" Enabled="false">
                        </asp:DropDownList>
                    </div>
                </div>

                <div class="row xrow">
                    <div class="input-group input-group-xs">
                        <span class="input-group-addon span-addon">Item Category : </span>
                         <asp:DropDownList ID="DD_ItemCategory" CssClass="form-control" runat="server" Enabled="false">
                        </asp:DropDownList>
                    </div>
                </div>
                
                <div class="row xrow">
                
                    <div class="form-group xfont-style">
                        <label>Status : </label>
                        <asp:RadioButtonList ID="RB_ItemStatus" runat="server" RepeatDirection="Horizontal" Enabled="false">
                            <asp:ListItem Value="1" Selected="True">Active&nbsp;</asp:ListItem>
                            <asp:ListItem Value="0">In-Active</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                    
                </div> 
                 <div class="row xrow">
                    <div class="input-group input-group-xs ">
                        <span class="input-group-addon span-addon">Remarks : </span>
                        <input type="text" id="txtItem_Remarks" runat="server" class="form-control" placeholder="Remarks" disabled required autofocus maxlength="250"  />
                    </div>
                </div>
            </div>
               </div>
                <div class="row xrow dataTable_wrapper">
                    <br />
               
                    <table id="tbl_MFITem" class="table table-bordered table-hover item_datatable table-font">
                        <thead class="GridHeader">
                            <tr>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Unit of Measure</th>
                                <th>Standard Cost</th>
                                <th>Latest Cost</th>
                                <th>Weight/Value</th>
                                <th>Type</th>
                                <th>Class</th>
                                <th>Category</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                           
                </div>
            </div>
             <script src="javascript/masterfiles_item.js" type="text/javascript" lang="javascript"></script>
        </asp:View>
        <asp:View ID="ViewConversion" runat="server"> 
            <div class="col-lg-12">
                <div class="row xrow">
                    <div class="col-lg-4">
                        <div class="row xrow">
                            <div class="input-group input-group-xs">
                                <span class="input-group-addon span-addon">UOM From : </span>
                                <asp:DropDownList ID="DDUOMFrom" CssClass="form-control" runat="server" Enabled="false" >
                                </asp:DropDownList>
                            </div>
                        </div>
                        <div class="row xrow">
                            <div class="input-group input-group-xs">
                                <span class="input-group-addon span-addon">UOM To : </span>
                                <asp:DropDownList ID="DDUOMTo" CssClass="form-control" runat="server" Enabled="false" >
                                </asp:DropDownList>
                            </div>
                        </div>
                        <div class="row xrow">
                            <div class="input-group input-group-xs ">
                                <span class="input-group-addon span-addon">Conversion Factor : </span>
                                <input type="text" id="txtFactor" runat="server" class="form-control money-align" value="1" placeholder="Amount" disabled required autofocus maxlength="30"  />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="row xrow dataTable_wrapper">
                            <table id="tbl_Conversion" class="table table-bordered table-hover item_datatable table-font">
                                <thead class="GridHeader">
                                    <tr>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Factor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                           
                        </div>
                    </div>
                </div>
                
            </div>
          
            <script src="javascript/masterfiles_uom.js" type="text/javascript" lang="javascript"></script>
        </asp:View>

        <asp:View ID="ViewWarehouseItem" runat="server"> 
            <div class="col-lg-12">
                <div class="row xrow">
                    <div class="col-lg-6">
                        <div class="row xrow">
                            <strong>Warehouse :</strong>
                            <asp:DropDownList ID="DD_Item_Warehouse" runat="server" AutoPostBack="true" OnSelectedIndexChanged="DD_Item_Warehouse_SelectedIndexChanged" >
                            </asp:DropDownList>
                        </div>
                        <div class="row xrow">
                            <strong>Item Class :</strong>
                            <asp:DropDownList ID="DD_Item_Class" runat="server" AutoPostBack="true" OnSelectedIndexChanged="DD_Item_Class_SelectedIndexChanged" >
                            </asp:DropDownList>
                        </div>
                    </div> 
                </div>

                <div class="row xrow">
                
                   
                    <table class="table">
                        <thead>
                            <tr>
                                <th>
                                    <label>Assigned Warehouse Item Category</label>
                                </th>
                                <th style="min-width:80px;">
                                    &nbsp;
                                </th>
                                <th>
                                    <label>Un-Assigned Warehouse Item Category</label>
                                </th>
                            </tr>
                        </thead>
                        <tbody style="height:200px;">
                            <tr>
                                <td>
                                     <asp:Panel ID="Panel1" runat="server" ScrollBars="Auto" Height="300px" Width="100%" >
                                        <asp:GridView ID="GVItem1" runat="server" AutoGenerateColumns="False" Width="100%" >
                                            <Columns>
                                                <asp:TemplateField>
                                                    <HeaderTemplate>
                                                        <input type="checkbox" id="CBx" name="xx" runat="server" onchange="StartClick3();return false;">
                                                    </HeaderTemplate>
                                                    <ItemTemplate>
                                                        <asp:CheckBox ID="CB" runat="server"></asp:CheckBox>
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="GridIteml" Width="15px" />
                                                    <HeaderStyle CssClass="GridHeader2" Width="15px" />
                                                </asp:TemplateField>
                                                <asp:BoundField DataField="x0" HeaderText="Code">
                                                    <ItemStyle CssClass="GridItem" Width="100px" />
                                                    <HeaderStyle CssClass="GridHeader2" Width="100px"/>
                                                </asp:BoundField>
                                                <asp:BoundField DataField="x1" HeaderText="Description">
                                                    <ItemStyle CssClass="GridItemr" />
                                                    <HeaderStyle CssClass="GridHeader2" />
                                                </asp:BoundField>
                                            </Columns>
                                        </asp:GridView>
                                        <asp:Button ID="Button1" style="visibility:hidden;" runat="server" />
                                    </asp:Panel>
                                </td>
                                <td style="min-width:80px;">
                                    <asp:Button ID="btnSelect2" OnClick="btnSelect2_Click" runat="server" Text="< Add" CssClass="btn btn-sm btn-info btn-block" />
                                    <asp:Button ID="btnUnSelect3" OnClick="btnUnSelect3_Click" runat="server" Text="Remove >" CssClass="btn btn-sm btn-info btn-block" />
                                </td>
                                <td>
                                    <asp:Panel ID="Panel2" runat="server" ScrollBars="Auto" Height="300px" Width="100%"  >
                                        <asp:GridView ID="GVItem2" runat="server" AutoGenerateColumns="False" Width="100%" >
                                            <Columns>
                                                <asp:TemplateField>
                                                    <HeaderTemplate>
                                                        <input type="checkbox" id="CBx" name="xx" runat="server" onchange="StartClick4();return false;">
                                                    </HeaderTemplate>
                                                    <ItemTemplate>
                                                        <asp:CheckBox ID="CB" runat="server"></asp:CheckBox>
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="GridIteml" Width="15px" />
                                                    <HeaderStyle CssClass="GridHeader2" Width="15px" />
                                                </asp:TemplateField>
                                                <asp:BoundField DataField="x0" HeaderText="Code">
                                                    <ItemStyle CssClass="GridItem" Width="100px" />
                                                    <HeaderStyle CssClass="GridHeader2" Width="100px"/>
                                                </asp:BoundField>
                                                <asp:BoundField DataField="x1" HeaderText="Description">
                                                    <ItemStyle CssClass="GridItemr" />
                                                    <HeaderStyle CssClass="GridHeader2" />
                                                </asp:BoundField>
                                            </Columns>
                                        </asp:GridView>
                                        <asp:Button ID="Button4" style="visibility:hidden;" runat="server" />
                                    </asp:Panel>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                
            </div>
            
           
        </asp:View>
    </asp:MultiView>

            
    <input id="hidden_entry_new" type="hidden" runat="server" />
    <input id="hidden_group" type="hidden" runat="server" />
    <input id="hidden_active_form" type="hidden" runat="server" />
    <div id="xfooter" class="row xrow"></div>

    <script type="text/javascript">
         
        $(document).ready( function () 
        {
            var activeViewIndex = $("#ContentPlaceHolder1_hidden_active_form").val();
          
            switch (activeViewIndex) {
                case "0":
                case "1":
                case "3": 
                case "4": 
                    LoadRecords();
                    break; 

                default: 
                   // alert('none selected...');
                    break;
                    
            }

            $("#ContentPlaceHolder1_DDGroup").select2({
                containerCssClass: "my-newdd-dropdown",
                dropdownCssClass: "my-newdd-dropdown-li"
            });
            
            $("#ContentPlaceHolder1_DDUSer").select2({
                containerCssClass: "my-newdd-dropdown",
                dropdownCssClass: "my-newdd-dropdown-li"
            });

            $("#ContentPlaceHolder1_DD_Item_Warehouse").select2({
                containerCssClass: "my-newdd-dropdown",
                dropdownCssClass: "my-newdd-dropdown-li"
            });

            $("#ContentPlaceHolder1_DD_Item_Class").select2({
                containerCssClass: "my-newdd-dropdown",
                dropdownCssClass: "my-newdd-dropdown-li"
            });

        } );

    </script> 
   

    <script type="text/javascript">
        $(document).ready(function () {

            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 5 second for example

            //on keyup, start the countdown
            $('#txtsearch').keyup(function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            });

            //on keydown, clear the countdown 
            $('#txtsearch').keydown(function () {
                clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function doneTyping() {
                var activeViewIndex = $("#ContentPlaceHolder1_hidden_active_form").val();
                switch (activeViewIndex) {
                    case "0":
                    case "1":
                    case "3": 
                        disable_Form();
                        LoadRecords();
                        break; 

                    default: 
                        alert('none selected...');
                        break;
                    
                }
                
            }

            //$("#ContentPlaceHolder1_txtUserEmployeeID").mask("a99-9999-9999");
            

            $('#ContentPlaceHolder1_txtItem_StandardCost').priceFormat({
                prefix: '',
                centsLimit: 4
            });
            
        });
    </script>

    <!-- DataTables JavaScript -->
    <script src="bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
    <script src="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js"></script>
    
    <!-- MaskEdit JavaScript -->
    <script src="bower_components/maskedit/jquery.maskedinput.min.js" type="text/javascript"></script>
    <script src="bower_components/maskedit/jquery.price_format.2.0.min.js" type="text/javascript"></script>
    
</asp:Content>

