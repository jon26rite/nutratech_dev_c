﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MotorPoolServiceRequest : System.Web.UI.Page
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

        MultiView1.SetActiveView(ViewButtons);
        MultiView2.SetActiveView(ViewServiceRequestForm);
        lblMenu.Text = "/ <i class='fa fa-wrench fa-fw'></i>Service Request Form : ";

        hidden_username.Value = HttpContext.Current.Session["username"].ToString();
    }
}