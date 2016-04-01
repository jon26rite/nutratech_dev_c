<%@ Page Language="C#" AutoEventWireup="true" CodeFile="report.aspx.cs" Inherits="report" %>

<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" Namespace="CrystalDecisions.Web" TagPrefix="CR" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server"  AutoDataBind="True" 
                                    HasCrystalLogo="False" 
                                            HasDrilldownTabs="False" HasDrillUpButton="False" 
                                            ReuseParameterValuesOnRefresh="True"
                                            ToolPanelView="None"  
            ToolPanelWidth="200px" Width="100%"  />
    </div>
    </form>
</body>
</html>
