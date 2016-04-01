using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;


public partial class masterfiles : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session.IsNewSession ==true | User.Identity.Name == "")
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
            hidden_group.Value = null;



            if (string.IsNullOrEmpty(Request.QueryString["ID"]) == false)
            {

                if (Request.QueryString["ID"].ToString() == "220")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewMF);

                    lblMenu.Text = "/ <i class='fa fa-connectdevelop fa-fw'></i>Company : ";
                    HttpContext.Current.Session["table_name"] = "cf_company";
                    hidden_entry.Value = "no";
                    HttpContext.Current.Session["hidden_entry"] = hidden_entry.Value;


                }
                else if (Request.QueryString["ID"].ToString() == "230")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewMF);
                    lblMenu.Text = "/ <i class='fa fa-building fa-fw'></i>Department : ";
                    HttpContext.Current.Session["table_name"] = "cf_department";
                    hidden_entry.Value = "no";
                    HttpContext.Current.Session["hidden_entry"] = hidden_entry.Value;


                }
                else if (Request.QueryString["ID"].ToString() == "240")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewMF);
                    lblMenu.Text = "/ <i class='fa fa-building-o fa-fw'></i>Division : ";
                    HttpContext.Current.Session["table_name"] = "cf_division";
                    hidden_entry.Value = "no";
                    HttpContext.Current.Session["hidden_entry"] = hidden_entry.Value;


                }
                else if (Request.QueryString["ID"].ToString() == "250")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewMF);
                    lblMenu.Text = "/ <i class='fa fa-location-arrow fa-fw'></i>Warehouse : ";
                    HttpContext.Current.Session["table_name"] = "cf_warehouse";
                    hidden_entry.Value = "no";
                    HttpContext.Current.Session["hidden_entry"] = hidden_entry.Value;


                }
                else if (Request.QueryString["ID"].ToString() == "261")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewMF);
                    lblMenu.Text = "/ <i class='fa fa-th-list fa-fw'></i>Inventory - Item Type : ";
                    HttpContext.Current.Session["table_name"] = "item_type";
                    hidden_entry.Value = "yes";
                    HttpContext.Current.Session["hidden_entry"] = hidden_entry.Value;


                }
                else if (Request.QueryString["ID"].ToString() == "262")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewMF);
                    lblMenu.Text = "/ <i class='fa fa-th-large fa-fw'></i>Inventory - Item Class : ";
                    HttpContext.Current.Session["table_name"] = "item_class";
                    hidden_entry.Value = "yes";
                    HttpContext.Current.Session["hidden_entry"] = hidden_entry.Value;



                }
                else if (Request.QueryString["ID"].ToString() == "263")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewMF);
                    lblMenu.Text = "/ <i class='fa fa-th fa-fw'></i>Inventory - Item Category : ";
                    HttpContext.Current.Session["table_name"] = "item_category";
                    hidden_entry.Value = "yes";
                    HttpContext.Current.Session["hidden_entry"] = hidden_entry.Value;
                    fill_DD(DDGroup, "SELECT code, descs FROM item_class WHERE (status = 1) ORDER BY descs");
                    div_group.Visible = true;
                    lblGroup.Text = "Item Class : ";
                    hidden_group.Value = "item_category";


                }
                else if (Request.QueryString["ID"].ToString() == "264")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewMF);
                    lblMenu.Text = "/ <i class='fa fa-codepen fa-fw'></i>Inventory - Item Unit of Measure : ";
                    HttpContext.Current.Session["table_name"] = "item_uom";
                    hidden_entry.Value = "yes";
                    HttpContext.Current.Session["hidden_entry"] = hidden_entry.Value;


                }
                else if (Request.QueryString["ID"].ToString() == "265")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewItem);
                    lblMenu.Text = "/ <i class='fa fa-qrcode fa-fw'></i>Inventory - Item : ";
                    HttpContext.Current.Session["table_name"] = "item";
                    fill_DD(ddItem_UOM, "SELECT code, descs FROM item_uom WHERE (status = 1) ORDER BY descs");
                    fill_DD(DD_ItemType, "SELECT code, descs FROM item_type WHERE (status = 1) ORDER BY descs");
                    fill_DD(DD_ItemClass, "SELECT code, descs FROM item_class WHERE (status = 1) ORDER BY descs");
                    fill_DD(DD_ItemCategory, "SELECT code, descs FROM item_category WHERE (status = 1) AND (item_class_cd = '" + DD_ItemClass.SelectedValue + "') ORDER BY descs");


                }
                else if (Request.QueryString["ID"].ToString() == "266")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewConversion);
                    lblMenu.Text = "/ <i class='fa fa-arrows-h fa-fw'></i>Unit of Measure Conversion : ";
                    HttpContext.Current.Session["table_name"] = "item_uom_convesion_table";


                }
                else if (Request.QueryString["ID"].ToString() == "212")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewMF);
                    lblMenu.Text = "/ <i class='fa fa-link fa-fw'></i>Users - Group Access : ";
                    HttpContext.Current.Session["table_name"] = "cf_group_access";
                    hidden_entry.Value = "no";
                    HttpContext.Current.Session["hidden_entry"] = hidden_entry.Value;


                }
                else if (Request.QueryString["ID"].ToString() == "211")
                {
                    MultiView1.SetActiveView(ViewButtons);
                    MultiView2.SetActiveView(ViewUser);
                    lblMenu.Text = "/ <i class='fa fa-user-plus fa-fw'></i>Users - Account Entry : ";
                    HttpContext.Current.Session["table_name"] = "cf_users";
                    hidden_group.Value = "cf_users";
                    fill_DD(DDUserDepartment, "SELECT code, descs FROM cf_department WHERE (status = 1) ORDER BY descs");
                    fill_DD(DDUserGroupAccess, "SELECT code, descs FROM cf_group_access WHERE (status = 1) ORDER BY descs");


                }
                else if (Request.QueryString["ID"].ToString() == "213")
                {
                    MultiView1.SetActiveView(ViewNothing);
                    MultiView2.SetActiveView(ViewUserCompany);
                    lblMenu.Text = "/ <i class='fa fa-connectdevelop fa-fw'></i>Users - Company Assignment : ";
                    HttpContext.Current.Session["table_user_name"] = "cfs_user_company";
                    HttpContext.Current.Session["table_name"] = "cf_company";
                    fill_DD(DDUSer, "SELECT  username AS code, name AS descs FROM cf_users ORDER BY last_name, first_name, middle_name");
                    fill_company_list();
                    lblAssign1.Text = "Company";
                    lblAssign2.Text = "Company";


                }
                else if (Request.QueryString["ID"].ToString() == "214")
                {
                    MultiView1.SetActiveView(ViewNothing);
                    MultiView2.SetActiveView(ViewUserCompany);
                    lblMenu.Text = "/ <i class='fa fa-location-arrow fa-fw'></i>Users - Warehouse Assignment : ";
                    HttpContext.Current.Session["table_user_name"] = "cfs_user_warehouse";
                    HttpContext.Current.Session["table_name"] = "cf_warehouse";
                    fill_DD(DDUSer, "SELECT  username AS code, name AS descs FROM cf_users ORDER BY last_name, first_name, middle_name");
                    fill_company_list();
                    lblAssign1.Text = "Warehouse";
                    lblAssign2.Text = "Warehouse";


                }
                else if (Request.QueryString["ID"].ToString() == "267")
                {
                    MultiView1.SetActiveView(ViewNothing);
                    MultiView2.SetActiveView(ViewWarehouseItem);
                    lblMenu.Text = "/ <i class='fa fa-location-arrow fa-fw'></i>Warehouse Item Assignment : ";
                    HttpContext.Current.Session["table_user_name"] = "cfs_user_company";
                    HttpContext.Current.Session["table_name"] = "cf_company";
                    fill_DD(DD_Item_Warehouse, "SELECT code, descs FROM cf_warehouse WHERE (status = 1) ORDER BY descs");
                    fill_DD(DD_Item_Class, "SELECT code, descs FROM item_class WHERE (status = 1) ORDER BY descs");
                    fill_warehouse_item_list(DD_Item_Warehouse.SelectedValue, DD_Item_Class.SelectedValue);

                }
                hidden_active_form.Value = MultiView2.ActiveViewIndex.ToString();
            }
        }
        HttpContext.Current.Session["url"] = HttpContext.Current.Request.Url.AbsoluteUri;
    }


    protected void fill_DD(DropDownList dd, string sql)
    {
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr;

        cn.Open();
        dtr = cmd.ExecuteReader();
        dd.Items.Clear();
        while (dtr.Read())
        {
            ListItem x = new ListItem();
            x.Value = dtr["code"].ToString().Trim();
            x.Text = dtr["descs"].ToString().Trim();
            dd.Items.Add(x);
        }

        cn.Close();
        cn.Dispose();

    }

    protected void DDUSer_SelectedIndexChanged(object sender, EventArgs e)
    {
        fill_company_list();
    }

    #region "Company Assignment"

    protected void fill_company_list()
    {
        try
        {
            Session.Remove("check1");
            Session.Remove("check2");
            this.GV_Company1.DataSource = Fill_selected_company();
            this.GV_Company1.DataBind();
            this.GV_Company2.DataSource = Fill_unselected_company();
            this.GV_Company2.DataBind();
        }
        catch (Exception ex)
        {
            this.GV_Company1.DataSource = null;
            this.GV_Company1.DataBind();
            this.GV_Company2.DataSource = null;
            this.GV_Company2.DataBind();
        }
    }

    protected System.Collections.ICollection Fill_unselected_company()
    {

        string sql = "";


        if (HttpContext.Current.Session["table_user_name"] == "cfs_user_company")
        {
            sql = "SELECT        " + HttpContext.Current.Session["table_user_name"] + ".company_code AS code, " + HttpContext.Current.Session["table_name"] + ".descs ";
            sql = sql + "FROM            " + HttpContext.Current.Session["table_user_name"] + " INNER JOIN ";
            sql = sql + "" + HttpContext.Current.Session["table_name"] + " ON " + HttpContext.Current.Session["table_user_name"] + ".company_code = " + HttpContext.Current.Session["table_name"] + ".code ";
            sql = sql + "WHERE        (" + HttpContext.Current.Session["table_user_name"] + ".username = '" + DDUSer.SelectedValue + "') AND (" + HttpContext.Current.Session["table_name"] + ".status = 1) ";
            sql = sql + "ORDER BY " + HttpContext.Current.Session["table_name"] + ".descs";


        }
        else if (HttpContext.Current.Session["table_user_name"] == "cfs_user_warehouse")
        {
            sql = "SELECT        " + HttpContext.Current.Session["table_user_name"] + ".warehouse_code AS code, " + HttpContext.Current.Session["table_name"] + ".descs ";
            sql = sql + "FROM            " + HttpContext.Current.Session["table_user_name"] + " INNER JOIN ";
            sql = sql + "" + HttpContext.Current.Session["table_name"] + " ON " + HttpContext.Current.Session["table_user_name"] + ".warehouse_code = " + HttpContext.Current.Session["table_name"] + ".code ";
            sql = sql + "WHERE        (" + HttpContext.Current.Session["table_user_name"] + ".username = '" + DDUSer.SelectedValue + "') AND (" + HttpContext.Current.Session["table_name"] + ".status = 1) ";
            sql = sql + "ORDER BY " + HttpContext.Current.Session["table_name"] + ".descs";

        }


        DataTable dt = new DataTable();
        DataRow dr;

        for (int i = 0; i <= 1; i++)
        {
            dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
        }


        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr;

        cn.Open();
        dtr = cmd.ExecuteReader();

        while (dtr.Read())
        {
            dr = dt.NewRow();

            dr[0] = dtr.IsDBNull(dtr.GetOrdinal("code")) ? "" : dtr["code"].ToString().Trim().Replace("&", "&").Replace(" ", " ");
            dr[1] = dtr.IsDBNull(dtr.GetOrdinal("descs")) ? "" : dtr["descs"].ToString().Trim().Replace("&", "&").Replace(" ", " ");
        
            dt.Rows.Add(dr);

        }
        dtr.Close();
        cn.Close();


        if (dt.Rows.Count == 0)
        {
            dr = dt.NewRow();

            dr[0] = "";
            dr[1] = "";

            dt.Rows.Add(dr);


        }

        DataView dv = new DataView(dt);
        return dv;


    }

    protected System.Collections.ICollection Fill_selected_company()
           
    {

        string sql = "SELECT        code, descs ";
        sql = sql + "FROM            " + HttpContext.Current.Session["table_name"] + " ";
        sql = sql + "WHERE        (status = 1) ";

        if (HttpContext.Current.Session["table_user_name"] == "cfs_user_company")
        {
            sql = sql + "AND (code NOT IN ";
            sql = sql + "(SELECT        company_code ";
            sql = sql + "FROM            " + HttpContext.Current.Session["table_user_name"] + " ";
            sql = sql + "WHERE        (username = '" + DDUSer.SelectedValue + "'))) ";
        }
        else if (HttpContext.Current.Session["table_user_name"] == "cfs_user_warehouse")
        {
            sql = sql + "AND (code NOT IN ";
            sql = sql + "(SELECT        warehouse_code ";
            sql = sql + "FROM            " + HttpContext.Current.Session["table_user_name"] + " ";
            sql = sql + "WHERE        (username = '" + DDUSer.SelectedValue + "'))) ";
        }

        sql = sql + "ORDER BY descs";

        DataTable dt = new DataTable();
        DataRow dr;

        for (int i = 0; i <= 1; i++)
        {
            dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
        }

        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr;

        cn.Open();
        dtr = cmd.ExecuteReader();

        while (dtr.Read())
        {
            dr = dt.NewRow();

            dr[0] = dtr.IsDBNull(dtr.GetOrdinal("code")) ? "" : dtr["code"].ToString().Trim().Replace("&", "&").Replace(" ", " ");
            dr[1] = dtr.IsDBNull(dtr.GetOrdinal("descs")) ? "" : dtr["descs"].ToString().Trim().Replace("&", "&").Replace(" ", " ");

            dt.Rows.Add(dr);

        }
        dtr.Close();
        cn.Close();


        if (dt.Rows.Count == 0)
        {
            dr = dt.NewRow();

            dr[0] = "";
            dr[1] = "";

            dt.Rows.Add(dr);


        }
        DataView dv = new DataView(dt);
        return dv;

    }


    protected void Saved_User_Company()
    {
        string sql = "DELETE FROM " + HttpContext.Current.Session["table_user_name"] + " WHERE (username = '" + DDUSer.SelectedValue + "')";
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        cn.Open();
        cmd.ExecuteNonQuery();
        cn.Close();


        for (int ii = 0; ii <= (this.GV_Company2.Rows.Count - 1); ii++)
        {

            sql = "INSERT INTO " + HttpContext.Current.Session["table_user_name"] + " ";
            if (HttpContext.Current.Session["table_user_name"] == "cfs_user_company")
            {
                sql = sql + "(username, company_code, audit_user, audit_date) ";
            }
            else if (HttpContext.Current.Session["table_user_name"] == "cfs_user_warehouse")
            {
                sql = sql + "(username, warehouse_code, audit_user, audit_date) ";
            }
            sql = sql + "VALUES('" + DDUSer.SelectedValue + "', ";
            sql = sql + "'" + this.GV_Company2.Rows[ii].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ") + "', ";
            sql = sql + "'" + HttpContext.Current.Session["username"].ToString().Trim() + "', ";
            sql = sql + "'" + System.DateTime.Now + "') ";
            cmd = new SqlCommand(sql, cn);
            cn.Open();
            cmd.ExecuteNonQuery();
            cn.Close();

        }


        cn.Dispose();
        HttpContext.Current.Session["company_code"] = null;
    }


    #endregion

    #region "Warehouse Item Assignment"
    protected void  // ERROR: Handles clauses are not supported in C#
    DD_Item_Warehouse_SelectedIndexChanged(object sender, EventArgs e)
    {
        fill_warehouse_item_list(DD_Item_Warehouse.SelectedValue, DD_Item_Class.SelectedValue);
    }

    protected void  // ERROR: Handles clauses are not supported in C#
    DD_Item_Class_SelectedIndexChanged(object sender, EventArgs e)
    {
        fill_warehouse_item_list(DD_Item_Warehouse.SelectedValue, DD_Item_Class.SelectedValue);
    }
    protected void fill_warehouse_item_list(string warehouse_cd, string item_class_cd)
    {
        try
        {
            Session.Remove("check1");
            Session.Remove("check2");
            this.GVItem1.DataSource = Fill_selected_warehouse_item(warehouse_cd, item_class_cd);
            this.GVItem1.DataBind();
            this.GVItem2.DataSource = Fill_unselected_warehouse_item(warehouse_cd, item_class_cd);
            this.GVItem2.DataBind();
        }
        catch (Exception ex)
        {
            this.GVItem1.DataSource = null;
            this.GVItem1.DataBind();
            this.GVItem2.DataSource = null;
            this.GVItem2.DataBind();
        }
    }

    protected System.Collections.ICollection Fill_unselected_warehouse_item(string warehouse_cd, string item_class_cd)
    {

        string sql = "SELECT    DISTINCT    code, descs ";
        sql = sql + "FROM            item_category ";
        sql = sql + "WHERE        (status = 1) AND (item_class_cd = '" + item_class_cd + "') AND (code NOT IN ";
        sql = sql + "(SELECT        item_category_cd ";
        sql = sql + "FROM            cfs_warehouse_item_category ";
        sql = sql + "WHERE        (warehouse_cd = '" + warehouse_cd + "') AND (item_class_cd = '" + item_class_cd + "'))) ";
        sql = sql + "ORDER BY descs ";

        DataTable dt = new DataTable();
        DataRow dr;

        for (int i = 0; i <= 1; i++)
        {
            dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
        }


        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr;

        cn.Open();
        dtr = cmd.ExecuteReader();

        while (dtr.Read())
        {
            dr = dt.NewRow();

            dr[0] = dtr.IsDBNull(dtr.GetOrdinal("code")) ? "" : dtr["code"].ToString().Trim().Replace("&", "&").Replace(" ", " ");
            dr[1] = dtr.IsDBNull(dtr.GetOrdinal("descs")) ? "" : dtr["descs"].ToString().Trim().Replace("&", "&").Replace(" ", " ");

            dt.Rows.Add(dr);

        }
        dtr.Close();
        cn.Close();


        if (dt.Rows.Count == 0)
        {
            dr = dt.NewRow();

            dr[0] = "";
            dr[1] = "";

            dt.Rows.Add(dr);


        }

        DataView dv = new DataView(dt);
        return dv;


    }

    protected System.Collections.ICollection Fill_selected_warehouse_item(string warehouse_cd, string item_class_cd)
    {

        string sql = "SELECT DISTINCT cfs_warehouse_item_category.item_category_cd AS code, item_category.descs ";
        sql = sql + "FROM            cfs_warehouse_item_category INNER JOIN ";
        sql = sql + "item_category ON cfs_warehouse_item_category.item_class_cd = item_category.item_class_cd AND cfs_warehouse_item_category.item_category_cd = item_category.code ";
        sql = sql + "WHERE        (item_category.status = 1) AND (cfs_warehouse_item_category.warehouse_cd = '" + warehouse_cd + "') AND (cfs_warehouse_item_category.item_class_cd = '" + item_class_cd + "') ";
        sql = sql + "ORDER BY item_category.descs ";

        DataTable dt = new DataTable();
        DataRow dr;

        for (int i = 0; i <= 1; i++)
        {
            dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
        }

        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr;

        cn.Open();
        dtr = cmd.ExecuteReader();

        while (dtr.Read())
        {
            dr = dt.NewRow();

            dr[0] = dtr.IsDBNull(dtr.GetOrdinal("code")) ? "" : dtr["code"].ToString().Trim().Replace("&", "&").Replace(" ", " ");
            dr[1] = dtr.IsDBNull(dtr.GetOrdinal("descs")) ? "" : dtr["descs"].ToString().Trim().Replace("&", "&").Replace(" ", " ");

            dt.Rows.Add(dr);

        }
        dtr.Close();
        cn.Close();


        if (dt.Rows.Count == 0)
        {
            dr = dt.NewRow();

            dr[0] = "";
            dr[1] = "";

            dt.Rows.Add(dr);


        }
        DataView dv = new DataView(dt);
        return dv;

    }


    protected void Saved_warehouse_item()
    {
        string sql = "DELETE FROM cfs_warehouse_item_category WHERE (warehouse_cd = '" + DD_Item_Warehouse.SelectedValue + "') AND (item_class_cd = '" + DD_Item_Class.SelectedValue + "')";
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        cn.Open();
        cmd.ExecuteNonQuery();
        cn.Close();


        for (int ii = 0; ii <= (this.GVItem1.Rows.Count - 1); ii++)
        {
            sql = "INSERT INTO cfs_warehouse_item_category ";

            sql = sql + "(warehouse_cd, item_class_cd, item_category_cd, audit_user, audit_date) ";

            sql = sql + "VALUES('" + DD_Item_Warehouse.SelectedValue + "', ";
            sql = sql + "'" + DD_Item_Class.SelectedValue + "', ";
            sql = sql + "'" + this.GVItem1.Rows[ii].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ") + "', ";
            sql = sql + "'" + HttpContext.Current.Session["username"].ToString().Trim() + "', ";
            sql = sql + "'" + System.DateTime.Now + "') ";
            cmd = new SqlCommand(sql, cn);
            cn.Open();
            cmd.ExecuteNonQuery();
            cn.Close();

        }


        cn.Dispose();
        HttpContext.Current.Session["company_code"] = null;
    }

    protected void btnUnSelect3_Click(object sender, System.EventArgs e)
    {
        bool sfind1 = false;

        for (int i = 0; i <= (this.GVItem1.Rows.Count - 1); i++)
        {
            CheckBox myCB = this.GVItem1.Rows[i].FindControl("CB") as CheckBox;
            if (myCB.Checked == true)
            {
                sfind1 = true;
                break; // TODO: might not be correct. Was : Exit For
            }
        }
        if (sfind1 == false)
            return;

        Session.Remove("check1");
        Session.Remove("check2");
    
        string[] a = new string[200];
        string[] b = new string[200];
        int icount = -1;
        int xloop = -1;
        for (int i = 0; i <= (this.GVItem1.Rows.Count - 1); i++)
        {
            if (this.GVItem1.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
            {
                break; // TODO: might not be correct. Was : Exit For
            }
            CheckBox myCB = this.GVItem1.Rows[i].FindControl("CB") as CheckBox;
            if (myCB.Checked == true)
            {
                xloop += 1;
            }
        }
        icount = xloop;
        if (xloop > -1)
            xloop = 0;
        for (int i = 0; i <= (this.GVItem2.Rows.Count - 1); i++)
        {
            if (this.GVItem2.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
            {
                break; // TODO: might not be correct. Was : Exit For
            }
            xloop += 1;
        }
        icount = icount + xloop;

        if (icount > -1)
        {
            // ERROR: Not supported in C#: ReDimStatement

            // ERROR: Not supported in C#: ReDimStatement

            xloop = 0;
            for (int i = 0; i <= (this.GVItem1.Rows.Count - 1); i++)
            {
                if (this.GVItem1.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
                {
                    break; // TODO: might not be correct. Was : Exit For
                }
                CheckBox myCB = this.GVItem1.Rows[i].FindControl("CB") as CheckBox;
                if (myCB.Checked == true)
                {
                    a[xloop] = this.GVItem1.Rows[i].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    b[xloop] = this.GVItem1.Rows[i].Cells[2].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    xloop += 1;
                }
            }
            for (int i = 0; i <= (this.GVItem2.Rows.Count - 1); i++)
            {
                if (this.GVItem2.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
                {
                    break; // TODO: might not be correct. Was : Exit For
                }
                a[xloop] = this.GVItem2.Rows[i].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ");
                b[xloop] = this.GVItem2.Rows[i].Cells[2].Text.Trim().Replace("&", "&").Replace(" ", " ");
                xloop += 1;
            }

            DataTable dt = new DataTable();
            DataRow dr;
            for (int i = 0; i <= 1; i++)
            {
                dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
            }


            for (int i = 0; i <= (xloop - 1); i++)
            {
                dr = dt.NewRow();

                dr[0] = a[i].Replace("&", "&").Replace(" ", " ");
                dr[1] = b[i].Replace("&", "&").Replace(" ", " ");

                dt.Rows.Add(dr);

            }

            DataView dv = new DataView(dt);
            System.Collections.ICollection di =  dv ;

            this.GVItem2.DataSource = di;
            this.GVItem2.DataBind();

            //GVItem2============================================================
            string[] c = new string[200];
            string[] d = new string[200];
            if ((this.GVItem1.Rows.Count + xloop) > 2)
            {
                icount = (this.GVItem1.Rows.Count + xloop) - 2;
            }
            else if ((this.GVItem1.Rows.Count + xloop) > 1)
            {
                icount = (this.GVItem1.Rows.Count + xloop) - 1;
            }
            else
            {
                return;
            }

            // ERROR: Not supported in C#: ReDimStatement

            // ERROR: Not supported in C#: ReDimStatement

            int xloop2 = 0;

            for (int ii = 0; ii <= (this.GVItem1.Rows.Count - 1); ii++)
            {
                bool sfind = false;

                for (int i = 0; i <= (xloop - 1); i++)
                {
                    if (a[i] == this.GVItem1.Rows[ii].Cells[1].Text.Trim())
                    {
                        sfind = true;
                    }

                }
                if (sfind == false)
                {
                    c[xloop2] = this.GVItem1.Rows[ii].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    d[xloop2] = this.GVItem1.Rows[ii].Cells[2].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    xloop2 += 1;
                }
            }

            dt = new DataTable();
            for (int i = 0; i <= 1; i++)
            {
                dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
            }


            for (int i = 0; i <= (xloop2 - 1); i++)
            {
                dr = dt.NewRow();

                dr[0] = c[i].Replace("&", "&").Replace(" ", " ");
                dr[1] = d[i].Replace("&", "&").Replace(" ", " ");

                dt.Rows.Add(dr);

            }



            if (dt.Rows.Count == 0)
            {
                dr = dt.NewRow();

                dr[0] = "";
                dr[1] = "";

                dt.Rows.Add(dr);


            }

            dv = new DataView(dt);
            System.Collections.ICollection dii = dv;

            this.GVItem1.DataSource = dii;
            this.GVItem1.DataBind();

            Saved_warehouse_item();
        }
    }

    protected void btnSelect2_Click(object sender, System.EventArgs e)
    {
        bool sfind1 = false;

        for (int i = 0; i <= (this.GVItem2.Rows.Count - 1); i++)
        {
            CheckBox myCB = this.GVItem2.Rows[i].FindControl("CB") as CheckBox;
            if (myCB.Checked == true)
            {
                sfind1 = true;
                break; // TODO: might not be correct. Was : Exit For
            }
        }
        if (sfind1 == false)
            return;

        Session.Remove("check1");
        Session.Remove("check2");
        string[] a = new string[200];
        string[] b = new string[200];
        int icount = -1;
        int xloop = -1;
        for (int i = 0; i <= (this.GVItem2.Rows.Count - 1); i++)
        {
            if (this.GVItem2.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
            {
                break; // TODO: might not be correct. Was : Exit For
            }
            CheckBox myCB = this.GVItem2.Rows[i].FindControl("CB") as CheckBox;
            if (myCB.Checked == true)
            {
                xloop += 1;
            }
        }
        icount = xloop;
        if (xloop > -1)
            xloop = 0;
        for (int i = 0; i <= (this.GVItem1.Rows.Count - 1); i++)
        {
            if (this.GVItem1.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
            {
                break; // TODO: might not be correct. Was : Exit For
            }
            xloop += 1;
        }
        icount = icount + xloop;

        if (icount > -1)
        {
            // ERROR: Not supported in C#: ReDimStatement

            // ERROR: Not supported in C#: ReDimStatement

            xloop = 0;
            for (int i = 0; i <= (this.GVItem2.Rows.Count - 1); i++)
            {
                if (this.GVItem2.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
                {
                    break; // TODO: might not be correct. Was : Exit For
                }
                CheckBox myCB = this.GVItem2.Rows[i].FindControl("CB") as CheckBox;
                if (myCB.Checked == true)
                {
                    a[xloop] = this.GVItem2.Rows[i].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    b[xloop] = this.GVItem2.Rows[i].Cells[2].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    xloop += 1;
                }
            }
            for (int i = 0; i <= (this.GVItem1.Rows.Count - 1); i++)
            {
                if (this.GVItem1.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
                {
                    break; // TODO: might not be correct. Was : Exit For
                }
                a[xloop] = this.GVItem1.Rows[i].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ");
                b[xloop] = this.GVItem1.Rows[i].Cells[2].Text.Trim().Replace("&", "&").Replace(" ", " ");
                xloop += 1;
            }

            DataTable dt = new DataTable();
            DataRow dr;
            for (int i = 0; i <= 1; i++)
            {
                dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
            }


            for (int i = 0; i <= (xloop - 1); i++)
            {
                dr = dt.NewRow();

                dr[0] = a[i].Replace("&", "&").Replace(" ", " ");
                dr[1] = b[i].Replace("&", "&").Replace(" ", " ");

                dt.Rows.Add(dr);

            }

            DataView dv = new DataView(dt);
            System.Collections.ICollection di = dv;

            this.GVItem1.DataSource = di;
            this.GVItem1.DataBind();

            //GVItem2============================================================
            string[] c = new string[200];
            string[] d = new string[200];
            if ((this.GVItem2.Rows.Count + xloop) > 2)
            {
                icount = (this.GVItem2.Rows.Count + xloop) - 2;
            }
            else if ((this.GVItem2.Rows.Count + xloop) > 1)
            {
                icount = (this.GVItem2.Rows.Count + xloop) - 1;
            }
            else
            {
                return;
            }

            // ERROR: Not supported in C#: ReDimStatement

            // ERROR: Not supported in C#: ReDimStatement


            int xloop2 = 0;

            for (int ii = 0; ii <= (this.GVItem2.Rows.Count - 1); ii++)
            {
                bool sfind = false;

                for (int i = 0; i <= (xloop - 1); i++)
                {
                    if (a[i] == this.GVItem2.Rows[ii].Cells[1].Text.Trim())
                    {
                        sfind = true;
                    }

                }
                if (sfind == false)
                {
                    c[xloop2] = this.GVItem2.Rows[ii].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    d[xloop2] = this.GVItem2.Rows[ii].Cells[2].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    xloop2 += 1;
                }
            }

            dt = new DataTable();
            for (int i = 0; i <= 1; i++)
            {
                dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
            }


            for (int i = 0; i <= (xloop2 - 1); i++)
            {
                dr = dt.NewRow();

                dr[0] = c[i].Replace("&", "&").Replace(" ", " ");
                dr[1] = d[i].Replace("&", "&").Replace(" ", " ");

                dt.Rows.Add(dr);

            }



            if (dt.Rows.Count == 0)
            {
                dr = dt.NewRow();

                dr[0] = "";
                dr[1] = "";

                dt.Rows.Add(dr);

            }

            dv = new DataView(dt);
            System.Collections.ICollection dii = dv;

            this.GVItem2.DataSource = dii;
            this.GVItem2.DataBind();

            Saved_warehouse_item();
        }

    }


    #endregion

    protected void btnSelect_Click(object sender, System.EventArgs e)
    {
        bool sfind1 = false;

        for (int i = 0; i <= (this.GV_Company1.Rows.Count - 1); i++)
        {
            CheckBox myCB = this.GV_Company1.Rows[i].FindControl("CB") as CheckBox;
            if (myCB.Checked == true)
            {
                sfind1 = true;
                break; // TODO: might not be correct. Was : Exit For
            }
        }
        if (sfind1 == false)
            return;

        Session.Remove("check1");
        Session.Remove("check2");
        string[] a = new string[200];
        string[] b = new string[200];
        int icount = -1;
        int xloop = -1;
        for (int i = 0; i <= (this.GV_Company1.Rows.Count - 1); i++)
        {
            if (this.GV_Company1.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
            {
                break; // TODO: might not be correct. Was : Exit For
            }
            CheckBox myCB = this.GV_Company1.Rows[i].FindControl("CB") as CheckBox;
            if (myCB.Checked == true)
            {
                xloop += 1;
            }
        }
        icount = xloop;
        if (xloop > -1)
            xloop = 0;
        for (int i = 0; i <= (this.GV_Company2.Rows.Count - 1); i++)
        {
            if (this.GV_Company2.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
            {
                break; // TODO: might not be correct. Was : Exit For
            }
            xloop += 1;
        }
        icount = icount + xloop;

        if (icount > -1)
        {
            // ERROR: Not supported in C#: ReDimStatement

            // ERROR: Not supported in C#: ReDimStatement

            xloop = 0;
            for (int i = 0; i <= (this.GV_Company1.Rows.Count - 1); i++)
            {
                if (this.GV_Company1.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
                {
                    break; // TODO: might not be correct. Was : Exit For
                }
                CheckBox myCB = this.GV_Company1.Rows[i].FindControl("CB") as CheckBox;
                if (myCB.Checked == true)
                {
                    a[xloop] = this.GV_Company1.Rows[i].Cells[1].Text.Trim().Replace("&nbsp;", "").Replace("&amp;", "&").Replace(" ", " ");
                    b[xloop] = this.GV_Company1.Rows[i].Cells[2].Text.Trim().Replace("&nbsp;", "").Replace("&amp;", "&").Replace(" ", " ");
                    xloop += 1;
                }
            }
            for (int i = 0; i <= (this.GV_Company2.Rows.Count - 1); i++)
            {
                if (this.GV_Company2.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&nbsp;", "").Replace("&amp;", "&").Trim() == "")
                {
                    break; // TODO: might not be correct. Was : Exit For
                }
                a[xloop] = this.GV_Company2.Rows[i].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ");
                b[xloop] = this.GV_Company2.Rows[i].Cells[2].Text.Trim().Replace("&", "&").Replace(" ", " ");
                xloop += 1;
            }

            DataTable dt = new DataTable();
            DataRow dr;
            for (int i = 0; i <= 1; i++)
            {
                dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
            }


            for (int i = 0; i <= (xloop - 1); i++)
            {
                dr = dt.NewRow();

                dr[0] = a[i].Replace("&", "&").Replace(" ", " ");
                dr[1] = b[i].Replace("&", "&").Replace(" ", " ");

                dt.Rows.Add(dr);

            }

            DataView dv = new DataView(dt);
            System.Collections.ICollection di = dv;

            this.GV_Company2.DataSource = di;
            this.GV_Company2.DataBind();

            //GV_Company2============================================================
            string[] c = new string[200];
            string[] d = new string[200];
            if ((this.GV_Company1.Rows.Count + xloop) > 2)
            {
                icount = (this.GV_Company1.Rows.Count + xloop) - 2;
            }
            else if ((this.GV_Company1.Rows.Count + xloop) > 1)
            {
                icount = (this.GV_Company1.Rows.Count + xloop) - 1;
            }
            else
            {
                return;
            }

            // ERROR: Not supported in C#: ReDimStatement

            // ERROR: Not supported in C#: ReDimStatement

            int xloop2 = 0;

            for (int ii = 0; ii <= (this.GV_Company1.Rows.Count - 1); ii++)
            {
                bool sfind = false;

                for (int i = 0; i <= (xloop - 1); i++)
                {
                    if (a[i] == this.GV_Company1.Rows[ii].Cells[1].Text.Trim())
                    {
                        sfind = true;
                    }

                }
                if (sfind == false)
                {
                    c[xloop2] = this.GV_Company1.Rows[ii].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    d[xloop2] = this.GV_Company1.Rows[ii].Cells[2].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    xloop2 += 1;
                }
            }

            dt = new DataTable();
            for (int i = 0; i <= 1; i++)
            {
                dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
            }


            for (int i = 0; i <= (xloop2 - 1); i++)
            {
                dr = dt.NewRow();

                dr[0] = c[i].Replace("&", "&").Replace(" ", " ");
                dr[1] = d[i].Replace("&", "&").Replace(" ", " ");

                dt.Rows.Add(dr);

            }



            if (dt.Rows.Count == 0)
            {
                dr = dt.NewRow();

                dr[0] = "";
                dr[1] = "";

                dt.Rows.Add(dr);


            }

            dv = new DataView(dt);
            System.Collections.ICollection dii = dv;

            this.GV_Company1.DataSource = dii;
            this.GV_Company1.DataBind();

            Saved_User_Company();
        }
    }

    protected void btnUnSelect_Click(object sender, System.EventArgs e)
    {
        bool sfind1 = false;

        for (int i = 0; i <= (this.GV_Company2.Rows.Count - 1); i++)
        {
            CheckBox myCB = this.GV_Company2.Rows[i].FindControl("CB") as CheckBox;
            if (myCB.Checked == true)
            {
                sfind1 = true;
                break; // TODO: might not be correct. Was : Exit For
            }
        }
        if (sfind1 == false)
            return;

        Session.Remove("check1");
        Session.Remove("check2");
        string[] a = new string[200];
        string[] b = new string[200];
        int icount = -1;
        int xloop = -1;
        for (int i = 0; i <= (this.GV_Company2.Rows.Count - 1); i++)
        {
            if (this.GV_Company2.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
            {
                break; // TODO: might not be correct. Was : Exit For
            }
            CheckBox myCB = this.GV_Company2.Rows[i].FindControl("CB") as CheckBox;
            if (myCB.Checked == true)
            {
                xloop += 1;
            }
        }
        icount = xloop;
        if (xloop > -1)
            xloop = 0;
        for (int i = 0; i <= (this.GV_Company1.Rows.Count - 1); i++)
        {
            if (this.GV_Company1.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
            {
                break; // TODO: might not be correct. Was : Exit For
            }
            xloop += 1;
        }
        icount = icount + xloop;

        if (icount > -1)
        {
            // ERROR: Not supported in C#: ReDimStatement

            // ERROR: Not supported in C#: ReDimStatement

            xloop = 0;
            for (int i = 0; i <= (this.GV_Company2.Rows.Count - 1); i++)
            {
                if (this.GV_Company2.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&", "&").Trim() == "")
                {
                    break; // TODO: might not be correct. Was : Exit For
                }
                CheckBox myCB = this.GV_Company2.Rows[i].FindControl("CB") as CheckBox;
                if (myCB.Checked == true)
                {
                    a[xloop] = this.GV_Company2.Rows[i].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    b[xloop] = this.GV_Company2.Rows[i].Cells[2].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    xloop += 1;
                }
            }
            for (int i = 0; i <= (this.GV_Company1.Rows.Count - 1); i++)
            {
                if (this.GV_Company1.Rows[i].Cells[1].Text.Replace(" ", " ").Replace("&nbsp;", "&").Replace("&amp;", "&").Trim() == "")
                {
                    break; // TODO: might not be correct. Was : Exit For
                }
                a[xloop] = this.GV_Company1.Rows[i].Cells[1].Text.Trim().Replace("&nbsp;", "&").Replace("&amp;", "&").Replace(" ", " ");
                b[xloop] = this.GV_Company1.Rows[i].Cells[2].Text.Trim().Replace("&nbsp;", "&").Replace("&amp;", "&").Replace(" ", " ");
                xloop += 1;
            }

            DataTable dt = new DataTable();
            DataRow dr;
            for (int i = 0; i <= 1; i++)
            {
                dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
            }


            for (int i = 0; i <= (xloop - 1); i++)
            {
                dr = dt.NewRow();

                dr[0] = a[i].Replace("&", "&").Replace(" ", " ");
                dr[1] = b[i].Replace("&", "&").Replace(" ", " ");

                dt.Rows.Add(dr);

            }

            DataView dv = new DataView(dt);
            System.Collections.ICollection di = dv;

            this.GV_Company1.DataSource = di;
            this.GV_Company1.DataBind();

            //GV_Company2============================================================
            string[] c = new string[200];
            string[] d = new string[200];
            if ((this.GV_Company2.Rows.Count + xloop) > 2)
            {
                icount = (this.GV_Company2.Rows.Count + xloop) - 2;
            }
            else if ((this.GV_Company2.Rows.Count + xloop) > 1)
            {
                icount = (this.GV_Company2.Rows.Count + xloop) - 1;
            }
            else
            {
                return;
            }

            // ERROR: Not supported in C#: ReDimStatement

            // ERROR: Not supported in C#: ReDimStatement


            int xloop2 = 0;

            for (int ii = 0; ii <= (this.GV_Company2.Rows.Count - 1); ii++)
            {
                bool sfind = false;

                for (int i = 0; i <= (xloop - 1); i++)
                {
                    if (a[i] == this.GV_Company2.Rows[ii].Cells[1].Text.Trim())
                    {
                        sfind = true;
                    }

                }
                if (sfind == false)
                {
                    c[xloop2] = this.GV_Company2.Rows[ii].Cells[1].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    d[xloop2] = this.GV_Company2.Rows[ii].Cells[2].Text.Trim().Replace("&", "&").Replace(" ", " ");
                    xloop2 += 1;
                }
            }

            dt = new DataTable();
            for (int i = 0; i <= 1; i++)
            {
                dt.Columns.Add(new DataColumn("x" + i, typeof(string)));
            }


            for (int i = 0; i <= (xloop2 - 1); i++)
            {
                dr = dt.NewRow();

                dr[0] = c[i].Replace("&", "&").Replace(" ", " ");
                dr[1] = d[i].Replace("&", "&").Replace(" ", " ");

                dt.Rows.Add(dr);

            }



            if (dt.Rows.Count == 0)
            {
                dr = dt.NewRow();

                dr[0] = "";
                dr[1] = "";

                dt.Rows.Add(dr);


            }

            dv = new DataView(dt);
            System.Collections.ICollection dii = dv;

            this.GV_Company2.DataSource = dii;
            this.GV_Company2.DataBind();

            Saved_User_Company();
        }

    }
}