using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports.Engine;
using cha.utils;

public partial class inventory : System.Web.UI.Page
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

            BindInventoryDropdownlist(DDepartment);
            BindInventoryDropdownlist(DDivision);
            BindInventoryDropdownlist(DDWarehouse);
            

            if (string.IsNullOrEmpty(Request.QueryString["ID"]) == false)
            {

                if (Request.QueryString["ID"].ToString() == "110")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(View_Entry);

                    lblMenu.Text = "/ <i class='fa fa-share fa-fw'></i>Receipting Entry ";
                    HttpContext.Current.Session["module"] = "IC";
                    HttpContext.Current.Session["trx_type"] = "RS";
                    HttpContext.Current.Session["search_status"] = "Draft";
                    hidden_useraccess.Value = HttpContext.Current.Session["access_level"].ToString();
                    txtUserEntry.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_username.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_trx_type.Value = "RS";
                    div_po.Visible = true;


                }
                else if (Request.QueryString["ID"].ToString() == "120")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(View_Entry);

                    lblMenu.Text = "/ <i class='fa fa-reply fa-fw'></i>Issuance Entry ";
                    HttpContext.Current.Session["module"] = "IC";
                    HttpContext.Current.Session["trx_type"] = "IS";
                    HttpContext.Current.Session["search_status"] = "Draft";
                    hidden_useraccess.Value = HttpContext.Current.Session["access_level"].ToString();
                    txtUserEntry.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_username.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_trx_type.Value = "IS";


                }
                else if (Request.QueryString["ID"].ToString() == "131")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(View_Entry);

                    lblMenu.Text = "/ <i class='fa fa-retweet fa-fw'></i><i class='fa fa-share fa-fw'></i>Adjustment - Receipting ";
                    HttpContext.Current.Session["module"] = "IC";
                    HttpContext.Current.Session["trx_type"] = "RA";
                    HttpContext.Current.Session["search_status"] = "Draft";
                    hidden_useraccess.Value = HttpContext.Current.Session["access_level"].ToString();
                    txtUserEntry.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_username.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_trx_type.Value = "RA";


                }
                else if (Request.QueryString["ID"].ToString() == "132")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(View_Entry);

                    lblMenu.Text = "/ <i class='fa fa-retweet fa-fw'></i><i class='fa fa-reply fa-fw'></i>Adjustment - Issuance ";
                    HttpContext.Current.Session["module"] = "IC";
                    HttpContext.Current.Session["trx_type"] = "IA";
                    HttpContext.Current.Session["search_status"] = "Draft";
                    hidden_useraccess.Value = HttpContext.Current.Session["access_level"].ToString();
                    txtUserEntry.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_username.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_trx_type.Value = "IA";



                }
                else if (Request.QueryString["ID"].ToString() == "140")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(View_Entry);

                    lblMenu.Text = "/ <i class='fa fa-exchange fa-fw'></i>Transfer Entry ";
                    HttpContext.Current.Session["module"] = "IC";
                    HttpContext.Current.Session["trx_type"] = "IT";
                    HttpContext.Current.Session["search_status"] = "Draft";
                    hidden_useraccess.Value = HttpContext.Current.Session["access_level"].ToString();
                    txtUserEntry.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_username.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_trx_type.Value = "IT";
                    div_transfer.Visible = true;

                    BindInventoryDropdownlist(DDTransfer_Company);
                    BindInventoryDropdownlist(DDTransfer_Warehouse);


                }
                else if (Request.QueryString["ID"].ToString() == "151")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(View_Entry);

                    lblMenu.Text = "/ <i class='fa fa-ban fa-fw'></i><i class='fa fa-share fa-fw'></i>Quarantine - Receipting";
                    HttpContext.Current.Session["module"] = "IC";
                    HttpContext.Current.Session["trx_type"] = "RQ";
                    HttpContext.Current.Session["search_status"] = "Draft";
                    hidden_useraccess.Value = HttpContext.Current.Session["access_level"].ToString();
                    txtUserEntry.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_username.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_trx_type.Value = "RQ";
                    div_po.Visible = true;
                    div_qc_process.Visible = true;

                }
                else if (Request.QueryString["ID"].ToString() == "152")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(View_Entry);

                    lblMenu.Text = "/ <i class='fa fa-ban fa-fw'></i><i class='fa fa-reply fa-fw'></i>Quarantine - For Sampling Issuance";
                    HttpContext.Current.Session["module"] = "IC";
                    HttpContext.Current.Session["trx_type"] = "IQ";
                    HttpContext.Current.Session["search_status"] = "Draft";
                    hidden_useraccess.Value = HttpContext.Current.Session["access_level"].ToString();
                    txtUserEntry.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_username.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_trx_type.Value = "IQ";
                    div_po.Visible = true;
                    div_qc_process.Visible = true;

                }
                else if (Request.QueryString["ID"].ToString() == "190")
                {
                    MultiView1.SetActiveView(ViewNothing);
                    MultiView2.SetActiveView(View_Print);

                    lblMenu.Text = "/ <i class='fa fa-print fa-fw'></i>Inventory Listing / Reports";
                    HttpContext.Current.Session["module"] = "IC";
                    hidden_useraccess.Value = HttpContext.Current.Session["access_level"].ToString();
                    txtUserEntry.Value = HttpContext.Current.Session["username"].ToString();
                    hidden_username.Value = HttpContext.Current.Session["username"].ToString();
                    
                    BindInventoryDropdownlist(DDReport_Warehouse);

                  
                
                   
                }
                
            }
        }
        try
        {
            hidden_company.Value = HttpContext.Current.Session["company_code"].ToString();
            hidden_warehouse.Value = HttpContext.Current.Session["warehouse_cd"].ToString();
        }
        catch { }



    }

    private void BindInventoryDropdownlist(DropDownList _obj)
    {


        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);

        DataTable dt = new DataTable();
        string sql = "";

        ListItem listitem = new ListItem();

        _obj.Items.Clear();


        switch (_obj.ID)
        {
            case "DDepartment":
                sql = "SELECT code, descs FROM cf_department WHERE (status = 1)  AND (code = '" + HttpContext.Current.Session["department_code"] + "') ORDER BY descs";

                break;
            case "DDivision":
                sql = "SELECT code, descs FROM cf_division WHERE (status = 1) ORDER BY descs";
                listitem = new ListItem();
                listitem.Text = "";
                listitem.Value = "";
                _obj.Items.Add(listitem);

                break;
            case "DDWarehouse":
                sql = "SELECT        cf_warehouse.code, cf_warehouse.descs ";
                sql = sql + "FROM            cfs_user_warehouse INNER JOIN ";
                sql = sql + "cf_warehouse ON cfs_user_warehouse.warehouse_code = cf_warehouse.code ";
                sql = sql + "WHERE        (cfs_user_warehouse.username = '" + HttpContext.Current.Session["username"] + "') ";
                sql = sql + "ORDER BY cf_warehouse.descs ";

                break;
            case "DDReport_Company":
                sql = "SELECT        cf_company.code, cf_company.descs ";
                sql = sql + "FROM            cf_company INNER JOIN ";
                sql = sql + "cfs_user_company ON cf_company.code = cfs_user_company.company_code ";
                sql = sql + "WHERE        (cf_company.status = 1) AND (cfs_user_company.username = '" + HttpContext.Current.Session["username"] + "') ";
                sql = sql + "ORDER BY cf_company.descs asc ";

                listitem = new ListItem();
                listitem.Text = "All";
                listitem.Value = "All";
                _obj.Items.Add(listitem);

                break;
            case "DDReport_Warehouse":
                sql = "SELECT        cf_warehouse.code, cf_warehouse.descs ";
                sql = sql + "FROM            cfs_user_warehouse INNER JOIN ";
                sql = sql + "cf_warehouse ON cfs_user_warehouse.warehouse_code = cf_warehouse.code ";
                sql = sql + "WHERE        (cfs_user_warehouse.username = '" + HttpContext.Current.Session["username"] + "') ";
                sql = sql + "ORDER BY cf_warehouse.descs asc ";

                listitem = new ListItem();
                listitem.Text = "All";
                listitem.Value = "All";
                _obj.Items.Add(listitem);

                break;
            case "DDTransfer_Company":
                sql = "SELECT        cf_company.code, cf_company.descs ";
                sql = sql + "FROM            cf_company INNER JOIN ";
                sql = sql + "cfs_user_company ON cf_company.code = cfs_user_company.company_code ";
                sql = sql + "WHERE        (cf_company.status = 1) AND (cfs_user_company.username = '" + HttpContext.Current.Session["username"] + "') ";
                sql = sql + "ORDER BY cf_company.descs asc ";

                break;
            case "DDTransfer_Warehouse":
                sql = "SELECT        cf_warehouse.code, cf_warehouse.descs ";
                sql = sql + "FROM            cfs_user_warehouse INNER JOIN ";
                sql = sql + "cf_warehouse ON cfs_user_warehouse.warehouse_code = cf_warehouse.code ";
                sql = sql + "WHERE        (cfs_user_warehouse.username = '" + HttpContext.Current.Session["username"] + "') ";
                sql = sql + "ORDER BY cf_warehouse.descs asc ";

                break;
            case "DDUOMFrom":
            case "DDUOMTo":

                sql = "SELECT        code, RTRIM(code) + ' - ' + RTRIM(descs) AS _descs ";
                sql = sql + "FROM            item_uom ";
                sql = sql + "WHERE        (status = 1) ";
                sql = sql + "ORDER BY descs DESC ";

                break;
        }


        SqlDataAdapter da = new SqlDataAdapter(sql, cn);
        cn.Open();
        da.Fill(dt);
        cn.Close();

        if (dt.Rows.Count > 0)
        {

            for (int i = 0; i <= dt.Rows.Count - 1; i++)
            {
                switch (_obj.ID)
                {
                    case "DDUOMFrom":
                    case "DDUOMTo":

                        listitem = new ListItem();
                        listitem.Text = dt.Rows[i]["_descs"].ToString().Trim();
                        listitem.Value = dt.Rows[i]["code"].ToString().Trim();
                        _obj.Items.Add(listitem);

                        break;
                    default:

                        listitem = new ListItem();
                        listitem.Text = dt.Rows[i]["descs"].ToString().Trim();
                        listitem.Value = dt.Rows[i]["code"].ToString().Trim();
                        _obj.Items.Add(listitem);

                        break;
                }

            }
        }

        switch (_obj.ID)
        {

            case "DDWarehouse":
            case "DDReport_Warehouse":
                if (HttpContext.Current.Session["warehouse_cd"] == null)
                {
                    HttpContext.Current.Session["warehouse_cd"] = _obj.SelectedValue;
                }
                else
                {
                    _obj.SelectedValue = HttpContext.Current.Session["warehouse_cd"].ToString();
                }

                break;
        }

    }


   
   

   
}