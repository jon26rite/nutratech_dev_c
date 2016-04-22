using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.IO;

using CrystalDecisions.Web;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports.Engine;

using System.Data.SqlClient;
using System.Data;
using cha.utils;

public partial class CostingReportViewer : System.Web.UI.Page
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

            string company_cd = Request.QueryString["company_cd"].ToString();
           // List<int> months = Request.QueryString["months[]"].Split(',').Select(Int32.Parse).ToList();
            string item_category_cd = Request.QueryString["item_category_cd"].ToString();
            DateTime as_of_date = Convert.ToDateTime(Request.QueryString["as_of_date"].ToString());
            string item_category_descs = Request.QueryString["item_category_descs"].ToString();
            int report_details = Convert.ToInt32(Request.QueryString["report_details"].ToString());
            bool highlight = Convert.ToBoolean(Request.QueryString["hightlight"].ToString());

            String connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

            CostingDataSet stk_ds = new CostingDataSet();
            LinkedList<String> inventoryItemList = new LinkedList<string>();
            DataTable dtFromDataSet = stk_ds.Tables["stock_inventory"];
            EndingInventoryDataTable endingInventoryDataTable = new EndingInventoryDataTable();
            endingInventoryDataTable.generateDefaultColumns();
            if (report_details == 0) { endingInventoryDataTable.ReportType = EndingInventoryDataTable.Details.Summarized; }
            

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    DataTable dataTable = new DataTable();
                    SqlDataAdapter adapter = new SqlDataAdapter("sp_ending_inventory", con);
                    adapter.SelectCommand.Parameters.AddWithValue("@companyCd", company_cd);
                    adapter.SelectCommand.Parameters.AddWithValue("@date", as_of_date);
                    adapter.SelectCommand.Parameters.AddWithValue("@itemCategoryCd", item_category_cd);
                    adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                    adapter.Fill(dataTable);
                    foreach (DataRow dr in dataTable.Rows)
                    {
                        endingInventoryDataTable.addRow(dr);
                    }
                }
            }
            catch (Exception ex) {
                System.Diagnostics.Debug.WriteLine("error: " + ex.Message);
                Context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
                Context.Response.StatusDescription = ex.Message;
            }
           
         

            ReportDocument cryRpt = new ReportDocument();
            dtFromDataSet.Merge(endingInventoryDataTable);
            if (report_details == 0)
            {
                cryRpt.Load(Server.MapPath("report/ending_inventory_summary.rpt"));
            }
            else
            {
                cryRpt.Load(Server.MapPath("report/ending_inventory.rpt"));
            }


            Crystal_datasource.SetupReport(cryRpt);

            cryRpt.SetDataSource(stk_ds.Tables["stock_inventory"]);
            cryRpt.ParameterFields["user"].CurrentValues.AddValue(HttpContext.Current.Session["username"].ToString());
            cryRpt.ParameterFields["year"].CurrentValues.AddValue("change this year");
            cryRpt.ParameterFields["date"].CurrentValues.AddValue(as_of_date.ToString("MMM-dd-yyyy"));
            cryRpt.ParameterFields["item_category_descs"].CurrentValues.AddValue(item_category_descs);
            cryRpt.ParameterFields["highlight_enabled"].CurrentValues.AddValue(highlight);
            
            cryRpt.ExportOptions.ExportDestinationType = ExportDestinationType.DiskFile;
            cryRpt.ExportOptions.ExportFormatType = ExportFormatType.Excel;

            ExcelFormatOptions objExcelOptions = new ExcelFormatOptions();
            objExcelOptions.ExcelUseConstantColumnWidth = false;
            cryRpt.ExportOptions.FormatOptions = objExcelOptions;
            DiskFileDestinationOptions objOptions = new DiskFileDestinationOptions();

            string xdate = Session["username"].ToString().Trim() + "_ending_inventory_" + System.DateTime.Now.ToString("(MM-dd-yyyy_hh.mm.ss)");
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