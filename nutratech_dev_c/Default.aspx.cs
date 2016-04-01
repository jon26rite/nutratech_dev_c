
using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Web;
using System.Web.Security;
partial class _Default : System.Web.UI.Page
{

	protected void Page_Load(object sender, EventArgs e)
	{
        lblProgramName.Text = System.Configuration.ConfigurationManager.AppSettings["program_name"].ToString().Trim();
        lblVersion.Text = System.Configuration.ConfigurationManager.AppSettings["version"].ToString().Trim();
        txtConstring.Value = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString.ToString().Replace("sa", "**").Replace("nidaros", "*******");
		if (Session.IsNewSession==false & User.Identity.Name.ToString().Trim() != "") {
			Response.Redirect("home.aspx");
		}


	}

	protected void LoginButton_Click(object sender, EventArgs e)
	{
		bool sfind = false;
		if (string.IsNullOrEmpty(username.Value.Trim())) {
			sfind = true;
		}
		if (string.IsNullOrEmpty(Password.Value.Trim())) {
			sfind = true;
		}
		if (sfind == true) {
			FailureText.Text = "Username and Password is required.";
			return;
		}

		Security oManager = new Security();
		oManager.Open();


		if (oManager.LogIn(username.Value.Trim(), Password.Value.Trim()) == true) {
			if (Password.Value.Trim() == "123456") {
				HttpContext.Current.Session["password"] = "change";
				oManager.Close();
				Response.Redirect("changepassword.aspx");
			} else {
				oManager.Close();
				FormsAuthentication.SetAuthCookie(username.Value.Trim(), true);
				Response.Redirect("home.aspx");
			}

		} else {
			FailureText.Text = "Log-in Failed...";
		}
		oManager.Close();
	}
	public _Default()
	{
		Load += Page_Load;
	}


   
}
