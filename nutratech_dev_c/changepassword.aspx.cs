using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class changepassword : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (HttpContext.Current.Session["username"] == null)
        {
            Response.Redirect("Logout.aspx");
        }
        if (!IsPostBack)
        {
            lblUsername.Value = HttpContext.Current.Session["username"].ToString().Trim();
        }
    }
}