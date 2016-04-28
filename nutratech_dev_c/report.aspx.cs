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

public partial class report : System.Web.UI.Page
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
            
                string sDirPath = Server.MapPath("pdf\\" + Session["username"].ToString().Trim());
                DirectoryInfo ObjSearchDir = new DirectoryInfo(sDirPath);
                if (!ObjSearchDir.Exists)
                {
                    ObjSearchDir.Create();
                }

          

            try
            {
                System.IO.DirectoryInfo downloadedMessageInfo = new DirectoryInfo(Server.MapPath("pdf\\" + HttpContext.Current.Session["username"].ToString().Trim()));

                foreach (FileInfo file in downloadedMessageInfo.GetFiles())
                {
                    file.Delete();
                }


            }
            catch (Exception ex)
            {
            }

            if (Request.QueryString["Report"] == null)
            {
                return;
            }

            ReportDocument cryRpt = new ReportDocument();


            if (Request.QueryString["Report"] == "listing")
            {
                cryRpt.Load(Server.MapPath("report/inventory.rpt"));
                Crystal_datasource.SetupReport(cryRpt);
                cryRpt.ParameterFields["company_cd"].CurrentValues.AddValue(HttpContext.Current.Session["company_code"]);
                cryRpt.ParameterFields["warehouse_cd"].CurrentValues.AddValue(Request.QueryString["WareHouse_code"].ToString());
                cryRpt.ParameterFields["trx_type"].CurrentValues.AddValue(HttpContext.Current.Session["trx_type"]);
                cryRpt.ParameterFields["doc_no"].CurrentValues.AddValue(Request.QueryString["Doc_No"].ToString());
                cryRpt.ParameterFields["status"].CurrentValues.AddValue(Request.QueryString["Status"].ToString());
                cryRpt.ParameterFields["date_from"].CurrentValues.AddValue(Convert.ToDateTime(Request.QueryString["DateFrom"].ToString()));
                cryRpt.ParameterFields["date_to"].CurrentValues.AddValue(Convert.ToDateTime(Request.QueryString["DateTo"].ToString()));


            }
            else if (Request.QueryString["Report"] == "bystocks")
            {
                if (Request.QueryString["Status"].ToString() == "Expired")
                {
                    process_listing(Request.QueryString["Status"].ToString(), Request.QueryString["WareHouse_code"].ToString());
                    //CDate(Request.QueryString["DateFrom"].ToString()).ToShortDateString, CDate(Request.QueryString["DateTo"].ToString()).ToShortDateString
                    cryRpt.Load(Server.MapPath("report/stock_inventory_expired.rpt"));
                }
                else if (Request.QueryString["Status"].ToString() == "Posted")
                {
                    cryRpt.Load(Server.MapPath("report/stock_inventory_posted.rpt"));
                }
                else
                {
                    process_listing(Request.QueryString["Status"].ToString(), Request.QueryString["WareHouse_code"].ToString());
                    //CDate(Request.QueryString["DateFrom"].ToString()).ToShortDateString, CDate(Request.QueryString["DateTo"].ToString()).ToShortDateString
                    cryRpt.Load(Server.MapPath("report/stock_inventory.rpt"));
                }
                Crystal_datasource.SetupReport(cryRpt);

                if (Request.QueryString["WareHouse_code"].ToString() == "All")
                {
                    cryRpt.ParameterFields["company_cd"].CurrentValues.AddValue("All");
                }
                else
                {
                    cryRpt.ParameterFields["company_cd"].CurrentValues.AddValue(HttpContext.Current.Session["company_code"]);
                }
                cryRpt.ParameterFields["warehouse_cd"].CurrentValues.AddValue(Request.QueryString["WareHouse_code"].ToString());
                cryRpt.ParameterFields["doc_no"].CurrentValues.AddValue(Request.QueryString["Doc_No"].ToString());
                cryRpt.ParameterFields["status"].CurrentValues.AddValue(Request.QueryString["Status"].ToString());
                cryRpt.ParameterFields["audit_user"].CurrentValues.AddValue(HttpContext.Current.Session["username"].ToString().Trim());
                //cryRpt.ParameterFields["date_from"].CurrentValues.AddValue(CDate(Request.QueryString["DateFrom"].ToString()))
                //cryRpt.ParameterFields["date_to"].CurrentValues.AddValue(CDate(Request.QueryString["DateTo"].ToString()))
                cryRpt.ParameterFields["item_code"].CurrentValues.AddValue(Request.QueryString["Item_Code"].ToString());

            }

            string xdate = Session["username"].ToString().Trim() + "_" + System.DateTime.Now.ToString("MMddyyyy_hhmmss");

            try
            {
                cryRpt.ExportToDisk(ExportFormatType.PortableDocFormat, Server.MapPath("pdf\\" + Session["username"].ToString().Trim() + "\\" + xdate + ".pdf"));

            }
            catch (Exception ex)
            {
            }
            cryRpt = null;
            //  CrystalReportViewer1.ReportSource = cryRpt


            Response.Redirect("pdf\\" + Session["username"].ToString().Trim() + "\\" + xdate + ".pdf");

        }
    }

        //ByVal date_from As String, ByVal date_to As String
        private void process_listing(string status, string warehouse_cd)
        {
            SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
            SqlCommand cmd = new SqlCommand();

            SqlDataAdapter adapter = new SqlDataAdapter();

            adapter.InsertCommand = cmd;
            adapter.InsertCommand.Connection = cn;
            if (status == "Expired")
            {
                adapter.InsertCommand.CommandText = "sp_inventory_report_summary_expired";
                adapter.InsertCommand.CommandType = CommandType.StoredProcedure;
                adapter.InsertCommand.CommandTimeout = 300;

                SqlParameter _param = new SqlParameter("@company_cd", SqlDbType.NChar, 5);
                if (warehouse_cd == "All")
                {
                    _param.Value = "All";
                }
                else
                {
                    _param.Value = HttpContext.Current.Session["company_code"];
                }
                _param.Direction = ParameterDirection.Input;
                adapter.InsertCommand.Parameters.Add(_param);

                _param = new SqlParameter("@warehouse_cd", SqlDbType.NChar, 5);
                _param.Value = warehouse_cd;
                _param.Direction = ParameterDirection.Input;
                adapter.InsertCommand.Parameters.Add(_param);

                _param = new SqlParameter("@audit_user", SqlDbType.NVarChar, 20);
                _param.Value = HttpContext.Current.Session["username"];
                _param.Direction = ParameterDirection.Input;
                adapter.InsertCommand.Parameters.Add(_param);
            }
            else
            {
                adapter.InsertCommand.CommandText = "sp_inventory_report_summary";
                adapter.InsertCommand.CommandType = CommandType.StoredProcedure;
                adapter.InsertCommand.CommandTimeout = 300;

                SqlParameter _param = new SqlParameter("@company_cd", SqlDbType.NChar, 5);
                if (warehouse_cd == "All")
                {
                    _param.Value = "All";
                }
                else
                {
                    _param.Value = HttpContext.Current.Session["company_code"];
                }
                _param.Direction = ParameterDirection.Input;
                adapter.InsertCommand.Parameters.Add(_param);

                _param = new SqlParameter("@audit_user", SqlDbType.NVarChar, 20);
                _param.Value = HttpContext.Current.Session["username"];
                _param.Direction = ParameterDirection.Input;
                adapter.InsertCommand.Parameters.Add(_param);
            }

            adapter.InsertCommand.Connection.Open();
            adapter.InsertCommand.ExecuteNonQuery();

            adapter.InsertCommand.Connection.Close();
            adapter.InsertCommand.Connection.Dispose();

            cn.Close();
            cn.Dispose();
        }


}