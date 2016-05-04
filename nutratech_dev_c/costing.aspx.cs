using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class stock : System.Web.UI.Page
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

            MultiView1.SetActiveView(View_StockReport);
            BindDropDownList(DD_Po_No);
            BindDropDownList(DD_RR_No);
            BindDropDownList(DD_Control_No);
            BindDropDownList(DD_ByRefNo);

            DD_Po_No.SelectedIndexChanged += new EventHandler(selectedIndexChange);
            DD_RR_No.SelectedIndexChanged += new EventHandler(selectedIndexChange);
            DD_Control_No.SelectedIndexChanged += new EventHandler(selectedIndexChange);
            /*
            foreach (string key in Session.Keys)
            {
                Response.Write(key + " - " + Session[key] + "<br />");
            }*/
        }

       
    }

    public void selectedIndexChange(object sender, EventArgs e)
    {
       
        if (HttpContext.Current.Session["company_code"] == null || Session.IsNewSession == true || User.Identity.Name == "")
        {
            Session.Clear();
            Response.Redirect("Logout.aspx");
        }
    }
    private void BindDropDownList(DropDownList ddl)
    {
        String company_cd = HttpContext.Current.Session["company_code"].ToString();
        String poNo = DD_Po_No.SelectedValue;
        String receivingReceipt = DD_RR_No.SelectedValue;
        String controlNo = DD_Control_No.SelectedValue;
        string ref_no = DD_ByRefNo.SelectedValue;

        using (SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString))
        {
            ListItem listItem = new ListItem();
            listItem.Text = "All";
            listItem.Value = "%%";
            DataTable dtDocNum = new DataTable();
            String selection = "";
            string queryString = "";
            switch (ddl.ID)
            {
                case "DD_Po_No":
                    selection = "po_no";
                    queryString = @"SELECT DISTINCT stock_card.po_no from stock_card 
                                        WHERE 
                                            stock_card.company_cd = @companyCd and 
                                            stock_card.po_no LIKE @poNo and
                                           stock_card.po_no NOT LIKE '' and
                                            stock_card.status = 'Approved' and
                                            stock_card.inout_mode = 'I' and
                                            dbo.fn_is_stock_accessible(stock_card.company_cd, stock_card.warehouse_cd, stock_card.item_category_cd,@username ) = 1
                                        UNION
                                     SELECT DISTINCT stock_card_posted.po_no from stock_card_posted
                                        WHERE
                                            stock_card_posted.company_cd = @companyCd and 
                                            stock_card_posted.po_no LIKE @poNo and
                                           stock_card_posted.po_no NOT LIKE '' and
                                             stock_card_posted.inout_mode = 'I' and
                                            dbo.fn_is_stock_accessible(stock_card_posted.company_cd, stock_card_posted.warehouse_cd, stock_card_posted.item_category_cd,@username ) = 1
                                        order by po_no asc;";
                    break;
                case "DD_RR_No":
                    selection = "receiving_receipt";
                    queryString = @"SELECT DISTINCT stock_card.receiving_receipt from stock_card 
                                        WHERE 
                                            stock_card.company_cd = @companyCd and 
                                            stock_card.receiving_receipt like @receivingReceipt and
                                            stock_card.receiving_receipt NOT LIKE '' and
                                            stock_card.status = 'Approved' and
                                            dbo.fn_is_stock_accessible(stock_card.company_cd, stock_card.warehouse_cd, stock_card.item_category_cd,@username ) = 1
                                        UNION
                                     SELECT DISTINCT stock_card_posted.receiving_receipt from stock_card_posted
                                        WHERE
                                            stock_card_posted.company_cd = @companyCd and 
                                             stock_card_posted.receiving_receipt like @receivingReceipt and
                                            stock_card_posted.receiving_receipt NOT LIKE '' and
                                            dbo.fn_is_stock_accessible(stock_card_posted.company_cd, stock_card_posted.warehouse_cd, stock_card_posted.item_category_cd,@username ) = 1
                                        order by receiving_receipt asc;";
                    break;
                case "DD_Control_No":
                    selection = "control_no";
                    queryString = @"SELECT DISTINCT stock_card.control_no from stock_card 
                                        WHERE 
                                            stock_card.company_cd = @companyCd and 
                                           stock_card.control_no LIKE @controlNo and
                                           stock_card.control_no NOT LIKE '' and
                                            stock_card.status = 'Approved' and
                                            dbo.fn_is_stock_accessible(stock_card.company_cd, stock_card.warehouse_cd, stock_card.item_category_cd,@username ) = 1
                                        UNION
                                     SELECT DISTINCT stock_card_posted.control_no from stock_card_posted
                                        WHERE
                                            stock_card_posted.company_cd = @companyCd and 
                                             stock_card_posted.control_no LIKE @controlNo and
                                            stock_card_posted.control_no NOT LIKE '' and
                                            dbo.fn_is_stock_accessible(stock_card_posted.company_cd, stock_card_posted.warehouse_cd, stock_card_posted.item_category_cd,@username ) = 1
                                        order by control_no asc;";
                    break;
                case "DD_ByRefNo":
                    selection = "ref_no";
                    queryString = @"SELECT DISTINCT stock_card.ref_no from stock_card 
                                        WHERE 
                                            stock_card.company_cd = @companyCd and 
                                           stock_card.ref_no LIKE @ref_no and
                                           stock_card.ref_no NOT LIKE '' and
                                            stock_card.status = 'Approved' and
                                            dbo.fn_is_stock_accessible(stock_card.company_cd, stock_card.warehouse_cd, stock_card.item_category_cd,@username ) = 1
                                        UNION
                                     SELECT DISTINCT stock_card_posted.ref_no from stock_card_posted
                                        WHERE
                                            stock_card_posted.company_cd = @companyCd and 
                                             stock_card_posted.ref_no LIKE @ref_no and
                                            stock_card_posted.ref_no NOT LIKE '' and
                                           
                                            dbo.fn_is_stock_accessible(stock_card_posted.company_cd, stock_card_posted.warehouse_cd, stock_card_posted.item_category_cd,@username ) = 1
                                        order by ref_no asc;";
                    break;
                default:
                    break;

            }
         
           
                SqlDataAdapter adapter = new SqlDataAdapter(queryString, con);
                adapter.SelectCommand.Parameters.AddWithValue("@companyCd", company_cd);
                adapter.SelectCommand.Parameters.AddWithValue("@username", HttpContext.Current.Session["username"].ToString());
                adapter.SelectCommand.Parameters.AddWithValue("@poNo", '%'+poNo+'%');
                adapter.SelectCommand.Parameters.AddWithValue("@receivingReceipt", '%'+receivingReceipt+'%');
                adapter.SelectCommand.Parameters.AddWithValue("@controlNo", '%'+controlNo+'%');
                adapter.SelectCommand.Parameters.AddWithValue("@ref_no", '%' + ref_no + '%');
                adapter.Fill(dtDocNum);

                ddl.DataSource = dtDocNum;
                ddl.DataTextField = selection;
                ddl.DataValueField = selection;
                ddl.DataBind();
                ddl.Items.Insert(0, listItem);
            
           



        }

    }


}