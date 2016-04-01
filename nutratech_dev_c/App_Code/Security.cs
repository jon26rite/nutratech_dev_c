using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Data.SqlClient;
using CrystalDecisions.Shared;

public class Security : ConnectionManager
{
    public bool LogIn(string xusername, string xpassword)
    {
        SqlCommand oCommand = new SqlCommand();
        oCommand.Connection = this.Connection;


        string sql = "SELECT     username, password, employee_id, name, department_code, group_access, status, access_level ";
        sql = sql + "FROM cf_users ";
        sql = sql + "WHERE     (username = '" + xusername + "') ";
        sql = sql + "AND (password = '" + Ascii(xpassword) + "') ";
        sql = sql + "AND (status = 1) ";

        oCommand.CommandText = sql;

        DataSet ds = new DataSet();
        SqlDataAdapter oAdapter = new SqlDataAdapter();
        oAdapter.SelectCommand = oCommand;
        oAdapter.Fill(ds);

        int iCount = ds.Tables[0].Rows.Count;
        if (iCount > 0)
        {
            //UserID, UserPassword, DefaultCurrency, CompanyCode, CompanyName, Department, AccessCode
            HttpContext.Current.Session["username"] = ds.Tables[0].Rows[0]["username"].ToString().Trim();
            HttpContext.Current.Session["employee_id"] = ds.Tables[0].Rows[0]["employee_id"].ToString().Trim();
            HttpContext.Current.Session["name"] = ds.Tables[0].Rows[0]["name"].ToString().Trim();
            HttpContext.Current.Session["username"] = ds.Tables[0].Rows[0]["username"].ToString().Trim();
            HttpContext.Current.Session["department_code"] = ds.Tables[0].Rows[0]["department_code"].ToString().Trim();
            HttpContext.Current.Session["group_access"] = ds.Tables[0].Rows[0]["group_access"].ToString().Trim();
            HttpContext.Current.Session["access_level"] = ds.Tables[0].Rows[0]["access_level"].ToString().Trim();
            return true;
        }
        else
        {
            return false;
        }


    }

    public static string Ascii(string pwd)
    {
        string x = pwd.ToUpper().Trim();
        string ASC_PWD = "";

        int xLen = pwd.ToUpper().Length;
        int[] arrayCode = new int[xLen];
        for (int i = 0; i < xLen; i++)
        {
            arrayCode[i] = (int)(x[i]) + 10;
            ASC_PWD = ASC_PWD + Convert.ToChar(arrayCode[i]);
        }
        //int CTR = 0;
        //int LEN_PWD = 0;
        //string POS_PWD = "";
        //string ASC_PWD = "";
        

        //LEN_PWD = pwd.Length;
        //for (CTR = 1; CTR <= LEN_PWD; CTR++)
        //{
            
        //    int i = (int)pwd.ToUpper().Substring(CTR, 1);

        //    ASC_PWD = POS_PWD.ToCharArray(              );
                
        //    x = x + ASC_PWD;
        //}
        return ASC_PWD;
    }

    public static string DecAscii(string pwd)
    {
        string x = pwd.ToUpper().Trim();
        string ASC_PWD = "";

        int xLen = pwd.ToUpper().Length;
        int[] arrayCode = new int[xLen];
        for (int i = 0; i < xLen; i++)
        {
            arrayCode[i] = (int)(x[i]) - 10;
            ASC_PWD = ASC_PWD + Convert.ToChar(arrayCode[i]);
        }

        //int CTR = 0;
        //int LEN_PWD = 0;
        //string POS_PWD = "";
        //string ASC_PWD = "";
        //dynamic x = "";

        //LEN_PWD = Strings.Len(pwd);
        //for (CTR = 1; CTR <= LEN_PWD; CTR++)
        //{
        //    POS_PWD = Strings.Mid(pwd, CTR, 1);
        //    ASC_PWD = Strings.Chr(Strings.Asc(POS_PWD) - 10);
        //    x = x + ASC_PWD;
        //}
        return ASC_PWD;
    }

    public static long Get_ID(string ID_Type)
    {

        long x = 0;
        string sql = "Select xno FROM cf_ID WHERE     (ID = '" + ID_Type + "') ";

        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr = null;
        cn.Open();
        dtr = cmd.ExecuteReader();


        if (dtr.Read())
        {
            
            if (Convert.IsDBNull(dtr["xno"])) {
	            x = 0;
            } else {
                x = Convert.ToInt64(dtr["xno"]) + 1;
            };

        }
        dtr.Close();
        cn.Close();
        cn.Dispose();
        if (x == 0)
            x = 1;

        return x;

    }


    public static void Write_ID(string ID_Type, double batch_no)
    {
        string sql = "Select xno FROM cf_ID WHERE     (ID = '" + ID_Type + "') ";
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr = null;
        cn.Open();
        dtr = cmd.ExecuteReader();
        bool sfind = false;

        if (dtr.Read())
        {
            sfind = true;

        }
        dtr.Close();
        cn.Close();



        if (sfind == false)
        {
            sql = "INSERT INTO cf_ID (ID, xno) VALUES('" + ID_Type + "', " + batch_no + " )";
            cmd = new SqlCommand(sql, cn);
            cn.Open();
            cmd.ExecuteNonQuery();
            cn.Close();


        }
        else
        {
            sql = "UPDATE    cf_ID SET  xno = " + batch_no + " WHERE ID = '" + ID_Type + "' ";
            cmd = new SqlCommand(sql, cn);
            cn.Open();
            cmd.ExecuteNonQuery();
            cn.Close();

        }


    }

}

public class Class_Variables
{
    public static string Server = System.Configuration.ConfigurationManager.AppSettings["server"].ToString();
    public static string DBO = System.Configuration.ConfigurationManager.AppSettings["owner"].ToString();
    public static string UID = System.Configuration.ConfigurationManager.AppSettings["uid"].ToString();
    public static string PWD = System.Configuration.ConfigurationManager.AppSettings["pwd"].ToString();
    public static string Database = System.Configuration.ConfigurationManager.AppSettings["catalog"].ToString();
    public static string Provider = System.Configuration.ConfigurationManager.AppSettings["provider"].ToString();
}
public class Crystal_datasource
{
    //
    public static System.Boolean SetupReport(CrystalDecisions.CrystalReports.Engine.ReportDocument objCrystalReportDocument)
	{

		// a heck of a lot of objects used
        System.Boolean blnTest = false;
        System.String strLocation = null;


		CrystalDecisions.Shared.TableLogOnInfo crTableLogOnInfo;
		CrystalDecisions.Shared.ConnectionInfo crConnectionInfo = GetConnectionInfo();
		CrystalDecisions.CrystalReports.Engine.Database crDatabase = objCrystalReportDocument.Database;
		CrystalDecisions.CrystalReports.Engine.Tables crTables = crDatabase.Tables;

		//For intCounter = 0 To objCrystalReportDocument.Database.Tables.Count - 1

		foreach (CrystalDecisions.CrystalReports.Engine.Table aTable in  crTables) {
			crTableLogOnInfo = aTable.LogOnInfo;


			crTableLogOnInfo.ConnectionInfo = crConnectionInfo;
			aTable.ApplyLogOnInfo(crTableLogOnInfo);
			strLocation = crConnectionInfo.DatabaseName + ".dbo." + aTable.Location.Substring(aTable.Location.LastIndexOf(".") + 1);

			try {
				aTable.Location = strLocation;

			} catch (Exception ex) {
			}


			try {
				blnTest = aTable.TestConnectivity();

			} catch (Exception ex) {
			}

			//// THIS STUFF HERE IS FOR REPORTS HAVING SUBREPORTS 
			//// set the sections object to the current report's section 
			CrystalDecisions.CrystalReports.Engine.Sections crSections = objCrystalReportDocument.ReportDefinition.Sections;

			//// loop through all the sections to find all the report objects 

			foreach (CrystalDecisions.CrystalReports.Engine.Section crSection in crSections) {
				CrystalDecisions.CrystalReports.Engine.ReportObjects crReportObjects = crSection.ReportObjects;

				////loop through all the report objects in there to find all subreports 

				foreach (CrystalDecisions.CrystalReports.Engine.ReportObject crReportObject in crReportObjects) {

					if (crReportObject.Kind == ReportObjectKind.SubreportObject) {
						CrystalDecisions.CrystalReports.Engine.SubreportObject crSubreportObject = (CrystalDecisions.CrystalReports.Engine.SubreportObject)crReportObject;
						////open the subreport object and logon as for the general report 
						CrystalDecisions.CrystalReports.Engine.ReportDocument crSubreportDocument = crSubreportObject.OpenSubreport(crSubreportObject.SubreportName);
						crDatabase = crSubreportDocument.Database;
						crTables = crDatabase.Tables;


                        foreach (CrystalDecisions.CrystalReports.Engine.Table bTable in crTables)
                        {
							crTableLogOnInfo = bTable.LogOnInfo;


							crTableLogOnInfo.ConnectionInfo = crConnectionInfo;
							bTable.ApplyLogOnInfo(crTableLogOnInfo);
							strLocation = crConnectionInfo.DatabaseName + ".dbo." + bTable.Location.Substring(bTable.Location.LastIndexOf(".") + 1);
							try {
								bTable.Location = strLocation;

							} catch (Exception ex) {
							}

							try {
								blnTest = bTable.TestConnectivity();

							} catch (Exception ex) {
							}

						}

						//crSubreportDocument.SetParameterValue("@group_code", "PFAI")
						//crSubreportDocument.SetParameterValue("@username", "admin")
						//crSubreportDocument.SetParameterValue("@date_from", "6/1/2013")
						//crSubreportDocument.SetParameterValue("@date_to", "10/9/2013")
						//crSubreportDocument.SetParameterValue("@view", Security.sales_agent_account("admin"))
						//crSubreportDocument.SetParameterValue("@report", 0)

					}

				}

			}

		}

		return false;

	}
    // --------------------------------------------------------------------------

    public static CrystalDecisions.Shared.ConnectionInfo GetConnectionInfo()
    {

        CrystalDecisions.Shared.ConnectionInfo objConnectionInfo = default(CrystalDecisions.Shared.ConnectionInfo);

        // create new crystal connection info object
        objConnectionInfo = new CrystalDecisions.Shared.ConnectionInfo();

        // populate it
        objConnectionInfo.IntegratedSecurity = false;
        objConnectionInfo.ServerName = Class_Variables.Server;
        objConnectionInfo.UserID = Class_Variables.UID;
        objConnectionInfo.Password = Class_Variables.PWD;
        objConnectionInfo.DatabaseName = Class_Variables.Database;

        // return object
        return objConnectionInfo;

    }
}

