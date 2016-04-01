<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="changepassword.aspx.cs" Inherits="changepassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="row">
        <div class="col-lg-12">
            <div>
                <ul class="my-header-ul">
                    <li><h3><i class="fa fa-user fa-fw"></i> Change Password </h3></li>
                </ul>
            </div>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <div class="col-lg-12">
        <div class="row xrow">
            <div class="btn-toolbar my-toolbar" role="toolbar">
                        
                    <button id="btnSave" type="button" class="btn btn-sm btn-primary"><span class="fa fa-floppy-o fa-fw" aria-hidden="true"></span> Change Password</button>
                        
            </div>
        </div>
    </div>
    <div class="col-lg-6">
            <div class="row xrow">
                <div class="input-group input-group-sm">
                    <span class="input-group-addon span-addon-pw">Username : </span>
                    <input type="text" id="lblUsername" class="form-control" runat="server" placeholder="Username" readonly required autofocus maxlength="20"  />
                </div>
            </div> 

            <div class="row xrow">
                <div class="input-group input-group-sm">
                    <span class="input-group-addon span-addon-pw">New Password : </span>
                    <input type="password" id="txt_new" class="form-control" placeholder="New Password" required autofocus maxlength="20"  />
                </div>
            </div>
            <div class="row xrow">
                <div class="input-group input-group-sm">
                    <span class="input-group-addon span-addon-pw">Confirm Password : </span>
                    <input type="password" id="txt_confirm" class="form-control" placeholder="Confirm Password" required autofocus maxlength="20" />
                </div>
            </div>
    </div>

    <script src="javascript/change_password.js" type="text/javascript" lang="javascript"></script>

</asp:Content>

