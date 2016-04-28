using cha.utils;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for AdminReport
/// </summary>
public class AdminReport
{

    private string connectionString;
    private SqlConnection connection;

    /// <summary>
    /// Creates new instance of CostingModule.
    /// </summary>
    public AdminReport()
    {
    }

    /// <summary>
    /// Creates new instance of CostingModule with connection string.
    /// </summary>
    public AdminReport(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public EndingInventoryDataTable getItems(string company_cd, string inout_mode)
    {
        CostingDataSet stk_ds = new CostingDataSet();
        DataTable source = stk_ds.Tables["stock_inventory"];
        EndingInventoryDataTable costingDataTable = new EndingInventoryDataTable(source);
        if (connectionString != null)
        {
            using (connection = new SqlConnection(connectionString))
            {

                SqlDataAdapter adapter = new SqlDataAdapter("sp_inventory_os_search_by_inout_mode", connection);
                adapter.SelectCommand.Parameters.AddWithValue("@companyCd", company_cd);
                adapter.SelectCommand.Parameters.AddWithValue("@inOutMode", inout_mode);
                adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapter.Fill(costingDataTable);
            }

        }
        else
        {
            //throw exception here when connection string is not set...
            throw new System.InvalidOperationException("Connection string for this module is not yet set.");
        }
        return costingDataTable;
    }



}