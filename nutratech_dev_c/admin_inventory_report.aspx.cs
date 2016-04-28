using cha.utils;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class admin_inventory_report : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {


        if (Session.IsNewSession == true | User.Identity.Name == "")
        {
            Response.Redirect("Logout.aspx");
        }
        if (HttpContext.Current.Session["username"] == null)
        {
            Response.Redirect("Logout.aspx");
        }

        if (!IsPostBack)
        {
            HttpContext.Current.Session["table_name"] = null;

            MultiView1.SetActiveView(View1);

           

        }

    }


    public void GenerateOSExcelReport(object sender, EventArgs e)
    {

        if (os_report_as_of_date.Text != "")
        {
            int report_details = Convert.ToInt32(DD_Report_Details.SelectedValue);
            DateTime as_of_date = Convert.ToDateTime(os_report_as_of_date.Text);
            string company_cd = Convert.ToString(hidden_company.Value).Trim();
            System.Diagnostics.Debug.WriteLine("value is: " + hidden_company.Value);
           
            bool highlight = Convert.ToBoolean(HighLight.SelectedValue);
            string inout_mode = "";
            string title = "";
            int monthly = 1;

            String connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

            CostingDataSet stk_ds = new CostingDataSet();
            DataTable dtFromDataSet = stk_ds.Tables["stock_inventory"];
            EndingInventoryDataTable endingInventoryDataTable = new EndingInventoryDataTable();
            endingInventoryDataTable.clone(dtFromDataSet);

            switch (report_details)
            {
                //monthly issuance
                case 1:
                    inout_mode = "O";
                    title = "ISSUED SUPPLIES";
                    break;
                //monthly received
                case 2:
                    inout_mode = "I";
                    title = "RECEIVED SUPPLIES";
                    break;
                //ending balance
                default:
                    endingInventoryDataTable.ReportType = EndingInventoryDataTable.Details.Summarized;
                    inout_mode = "%";
                    monthly = 0;
                    break;

            }



            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    DataTable dataTable = new DataTable();
                    SqlDataAdapter adapter = new SqlDataAdapter("sp_inventory_os_list", con);
                    adapter.SelectCommand.Parameters.AddWithValue("@companyCd", company_cd);
                    adapter.SelectCommand.Parameters.AddWithValue("@date", as_of_date);
                    adapter.SelectCommand.Parameters.AddWithValue("@inOutMode", inout_mode);
                    adapter.SelectCommand.Parameters.AddWithValue("@monthly", monthly);
                    adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                    adapter.Fill(dataTable);

                    foreach (DataRow dr in dataTable.Rows)
                    {
                        endingInventoryDataTable.addRow(dr);
                    }

                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("error: " + ex.Message);
                Context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
                Context.Response.StatusDescription = ex.Message;
            }



            ReportDocument cryRpt = new ReportDocument();
            dtFromDataSet.Merge(endingInventoryDataTable);
            if (report_details == 0)
            {
                cryRpt.Load(Server.MapPath("report/os_ending_inventory.rpt"));
            }
            else
            {
                cryRpt.Load(Server.MapPath("report/os_monthly_request.rpt"));
            }


            Crystal_datasource.SetupReport(cryRpt);

            cryRpt.SetDataSource(stk_ds.Tables["stock_inventory"]);
            cryRpt.ParameterFields["user"].CurrentValues.AddValue(HttpContext.Current.Session["username"].ToString());
            cryRpt.ParameterFields["highlight_enabled"].CurrentValues.AddValue(highlight);
            cryRpt.ParameterFields["title"].CurrentValues.AddValue(title);
            cryRpt.ParameterFields["as_of_date"].CurrentValues.AddValue(as_of_date.ToString("MMM-dd-yyyy"));


            cryRpt.ExportOptions.ExportDestinationType = ExportDestinationType.DiskFile;
            cryRpt.ExportOptions.ExportFormatType = ExportFormatType.Excel;

            ExcelFormatOptions objExcelOptions = new ExcelFormatOptions();
            objExcelOptions.ExcelUseConstantColumnWidth = false;
            cryRpt.ExportOptions.FormatOptions = objExcelOptions;
            DiskFileDestinationOptions objOptions = new DiskFileDestinationOptions();

            string xdate = Session["username"].ToString().Trim() + "_os_ending_inventory_" + System.DateTime.Now.ToString("(MM-dd-yyyy_hh.mm.ss)");
            objOptions.DiskFileName = Server.MapPath("pdf\\" + Session["username"].ToString().Trim() + "\\" + xdate + ".xls");
            cryRpt.ExportOptions.DestinationOptions = objOptions;

            try
            {
                string sDirPath = Server.MapPath("pdf\\" + Session["username"].ToString().Trim());
                DirectoryInfo ObjSearchDir = new DirectoryInfo(sDirPath);
                if (!ObjSearchDir.Exists)
                {
                    ObjSearchDir.Create();
                }


                System.IO.DirectoryInfo downloadedMessageInfo = new DirectoryInfo(Server.MapPath("pdf\\" + HttpContext.Current.Session["username"].ToString().Trim()));

                foreach (FileInfo file in downloadedMessageInfo.GetFiles())
                {
                    file.Delete();
                }
                cryRpt.Export();
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
            }
            cryRpt = null;
            Response.Redirect("pdf\\" + Session["username"].ToString().Trim() + "\\" + xdate + ".xls");

        }


    }
}