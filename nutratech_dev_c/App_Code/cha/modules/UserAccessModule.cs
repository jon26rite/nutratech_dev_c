using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;




/// <summary>
/// Summary description for UserAccessModule
/// </summary>
public class UserAccessModule : Module
{
	public UserAccessModule()
	{
	}

    public UserAccessModule(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public bool isUserAuthorized(string username, string itemCategory) {

        List<String> authorized_warehouse_list = getUserAuthorizedWarehouse(username);
        foreach (string warehouse_code in authorized_warehouse_list) {
            if (isItemCategoryInWarehouse(itemCategory, warehouse_code))
            {
                return true;
            }

        }
        return false;
    }



    private List<String> getUserAuthorizedWarehouse(string username) {
        List<String> result = new List<String>();

        if (connectionString != null)
        {
            using (connection = new SqlConnection(connectionString))
            {

                DataTable dt = new DataTable();
                string q = @"Select warehouse_code from cfs_user_warehouse where username = @username";
                SqlDataAdapter adapter = new SqlDataAdapter(q, connection);
                adapter.SelectCommand.Parameters.AddWithValue("@username", username);
                adapter.SelectCommand.CommandType = CommandType.Text;
                adapter.Fill(dt);

                foreach (DataRow dr in dt.Rows)
                {
                    
                    string w = dr["warehouse_code"].ToString();
                    result.Add(w);
                }
            }

        }
        else
        {
            //throw exception here when connection string is not set...
            throw new System.InvalidOperationException("Connection string for this module is not yet set.");
        }

        return result;

    }

    
  
    private bool isItemAccessible(string username, string warehouse_cd, string item_category_cd) {
        bool warehouse_accessible = isWarehouseAccessible(username, warehouse_cd);
        bool item_category_accessible = isItemCategoryInWarehouse( item_category_cd, warehouse_cd);

        return warehouse_accessible && item_category_accessible;
    }

    private bool isWarehouseAccessible(string username, string warehouse_cd)
    {
        if (connectionString != null)
        {
            using (connection = new SqlConnection(connectionString))
            {
                
                DataTable dt = new DataTable();
                string q = @"Select count(*) as result from cfs_user_warehouse where username = @username and warehouse_cd = @warehouse_cd;";
                SqlDataAdapter adapter = new SqlDataAdapter(q, connection);
                adapter.SelectCommand.Parameters.AddWithValue("@username", username);
                adapter.SelectCommand.Parameters.AddWithValue("@warehouse_cd", warehouse_cd);
                adapter.SelectCommand.CommandType = CommandType.Text;
                adapter.Fill(dt);

                foreach(DataRow dr in dt.Rows){
                    int result = Convert.ToInt16(dr["result"].ToString());
                    return true ? result>0 : false;
                }
            }

        }
        else
        {
            //throw exception here when connection string is not set...
            throw new System.InvalidOperationException("Connection string for this module is not yet set.");
        }
        return false;
    }

    private bool isItemCategoryInWarehouse(string item_category_cd, string warehouse_cd)
    {
        if (connectionString != null)
        {
            using (connection = new SqlConnection(connectionString))
            {

                DataTable dt = new DataTable();
                string q = @"Select count(*) as result from cfs_warehouse_item_category where warehouse_cd = @warehouse_cd and item_category_cd = @item_category_cd;";
                SqlDataAdapter adapter = new SqlDataAdapter(q, connection);
                adapter.SelectCommand.Parameters.AddWithValue("@item_category_cd", item_category_cd);
                adapter.SelectCommand.Parameters.AddWithValue("@warehouse_cd", warehouse_cd);
                adapter.SelectCommand.CommandType = CommandType.Text;
                adapter.Fill(dt);

                foreach (DataRow dr in dt.Rows)
                {
                    int result = Convert.ToInt16(dr["result"].ToString());
                    return true ? result > 0 : false;
                }
            }

        }
        else
        {
            //throw exception here when connection string is not set...
            throw new System.InvalidOperationException("Connection string for this module is not yet set.");
        }
        return false;
    }
}