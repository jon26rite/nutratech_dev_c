using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class hr : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session.IsNewSession==true | User.Identity.Name == "")
        {
            Response.Redirect("Logout.aspx");
        }
        if (HttpContext.Current.Session["username"] == null)
        {
            Response.Redirect("Logout.aspx");
        }

        hidden_username.Value = HttpContext.Current.Session["username"].ToString().Trim();

        if (!IsPostBack)
        {
            HttpContext.Current.Session["table_name"] = null;


            if (!string.IsNullOrEmpty(Request.QueryString["ID"]))
            {

                if (Request.QueryString["ID"].ToString()== "310")
                {
                    MultiView1.SetActiveView(ViewButtons2);
                    MultiView2.SetActiveView(View_DTR);

                    lblMenu.Text = "/ <i class='fa fa-clock-o fa-fw'></i>Daily Time Record ";
                    BindDropdownlist(DDHR_Department);
                    //make_efile("30", "9/1/2015", "9/15/2015")
                    //read_efile()

                }
            }
        }
    }

    private void BindDropdownlist(DropDownList _obj)
    {
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionStringEDS"].ConnectionString);

        DataTable dt = new DataTable();
        string sql = "";

        ListItem listitem = new ListItem();

        _obj.Items.Clear();


        switch (_obj.ID)
        {
            case "DDHR_Department":

                sql = "SELECT        DepartmentNumber AS code, DepartmentName AS descs FROM            Departments ORDER BY descs";

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
                listitem = new ListItem();
                listitem.Text = dt.Rows[i]["descs"].ToString().Trim();
                listitem.Value = dt.Rows[i]["code"].ToString().Trim();
                _obj.Items.Add(listitem);

            }
        }

    }
}