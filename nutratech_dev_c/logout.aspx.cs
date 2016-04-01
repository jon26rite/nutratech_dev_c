using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

public partial class logout : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if ((Request.Cookies["PBLOGIN"] != null))
        {
            //Expire the cookie
            Response.Cookies["PBLOGIN"].Expires = DateTime.Now.AddDays(-30);
        }
        Session.RemoveAll();
        FormsAuthentication.SignOut();
        Response.Redirect("Default.aspx");
    }
}