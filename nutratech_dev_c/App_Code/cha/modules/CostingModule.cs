using cha.utils;

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Web;


namespace cha.modules
{

    /// <summary>
    /// Contains methods for costing operations.
    /// </summary>
    public class CostingModule : Module
    {

       

        /// <summary>
        /// Creates new instance of CostingModule.
        /// </summary>
        public CostingModule()
        {
        }

        /// <summary>
        /// Creates new instance of CostingModule with connection string.
        /// </summary>
        public CostingModule(string connectionString)
        {
            this.connectionString = connectionString;
        }


        public EndingInventoryDataTable getStockCardItems(string company_cd, string po_no, string receiving_receipt, string control_no, string username, string inout_mode, string ref_no)
        {
            CostingDataSet stk_ds = new CostingDataSet();
            DataTable source = stk_ds.Tables["stock_inventory"];
            EndingInventoryDataTable costingDataTable = new EndingInventoryDataTable(source);
            if (connectionString != null)
            {
                using (connection= new SqlConnection(connectionString))
                {
                  
                    SqlDataAdapter adapter = new SqlDataAdapter("sp_inventory_stock_list", connection);
                    adapter.SelectCommand.Parameters.AddWithValue("@companyCd", company_cd);
                    adapter.SelectCommand.Parameters.AddWithValue("@poNo",  po_no );
                    adapter.SelectCommand.Parameters.AddWithValue("@receivingReceipt", receiving_receipt );
                    adapter.SelectCommand.Parameters.AddWithValue("@controlNo", control_no);
                    adapter.SelectCommand.Parameters.AddWithValue("@inOutMode", inout_mode);
                    adapter.SelectCommand.Parameters.AddWithValue("@username", username);
                    adapter.SelectCommand.Parameters.AddWithValue("@ref_no", ref_no);
                    adapter.SelectCommand.Parameters.AddWithValue("@itemCd", '%' + "" + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@itemTypeCd", '%' + "" + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@itemClassCd", '%' + "" + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@itemCategoryCd", '%' + "" + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@lotNo", '%'+""+'%' );
                    adapter.SelectCommand.Parameters.AddWithValue("@warehouseCd", '%' + "" + '%');
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

        public EndingInventoryDataTable getIssuedItemsByReceiptingDetails(Dictionary<string, string> selected_row, string username)
        {
            CostingDataSet stk_ds = new CostingDataSet();
            DataTable source = stk_ds.Tables["stock_inventory"];
            EndingInventoryDataTable costingDataTable = new EndingInventoryDataTable(source);
            if (connectionString != null)
            {
                using (connection = new SqlConnection(connectionString))
                {

                    SqlDataAdapter adapter = new SqlDataAdapter("sp_inventory_stock_list", connection);
                    adapter.SelectCommand.Parameters.AddWithValue("@companyCd", selected_row["company_cd"]);
                    
                    adapter.SelectCommand.Parameters.AddWithValue("@receivingReceipt", '%' + selected_row["receiving_receipt"] + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@controlNo", '%' + selected_row["control_no"] + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@warehouseCd", '%' + selected_row["warehouse_cd"] + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@itemCd", '%' + selected_row["item_cd"] + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@itemTypeCd", '%' + selected_row["item_type_cd"] + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@itemClassCd", '%' + selected_row["item_class_cd"] + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@itemCategoryCd", '%' + selected_row["item_category_cd"] + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@lotNo", '%' +selected_row["lot_no"] + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@inOutMode", '%' + "O" + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@username", username);
                    //the following parameters are not necessary to get the issuance entries
                    adapter.SelectCommand.Parameters.AddWithValue("@poNo", '%' + "" + '%');
                    adapter.SelectCommand.Parameters.AddWithValue("@ref_no", '%' + "" + '%');
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



        public EndingInventoryDataTable getSameRows(Dictionary<string, string> selected_row, string username) {
            EndingInventoryDataTable resultTable = new EndingInventoryDataTable();

            if (connectionString != null)
            {
                using (connection = new SqlConnection(connectionString))
                {
                    SqlDataAdapter adapter = new SqlDataAdapter("sp_inventory_costing_get_same_rows", connection);
                    adapter.SelectCommand.Parameters.AddWithValue("@companyCd", selected_row["company_cd"]);
                    adapter.SelectCommand.Parameters.AddWithValue("@controlNo", selected_row["control_no"] );
                    adapter.SelectCommand.Parameters.AddWithValue("@inOutMode", "I");
                    adapter.SelectCommand.Parameters.AddWithValue("@username", username);
                    adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                    adapter.Fill(resultTable);
                }
              
            }
            else
            {
                
                throw new System.InvalidOperationException("Connection string for this module is not yet set.");
            }
            return resultTable;
        }
     


        private void updateUnitCostByReceiptingDetails(decimal unit_cost,string company_cd,  
            string item_cd,
            string item_type_cd,
            string item_class_cd,
            string item_category_cd,
            string receiving_receipt, 
            string control_no,
            string lot_no,
            string warehouse_cd,
            string doc_no) {

              
                if (connectionString != null) {
                    using (connection = new SqlConnection(connectionString))
                    {
                        SqlCommand command = new SqlCommand("sp_inventory_update_unit_cost", connection);
                        command.CommandType = CommandType.StoredProcedure;
                        
                        command.Parameters.AddWithValue("@unitCost", unit_cost);
                        command.Parameters.AddWithValue("@companyCd", company_cd);
                        command.Parameters.AddWithValue("@itemCd", item_cd);
                        command.Parameters.AddWithValue("@itemTypeCd", item_type_cd);
                        command.Parameters.AddWithValue("@itemClassCd", item_class_cd);
                        command.Parameters.AddWithValue("@itemCategoryCd", item_category_cd);
                        command.Parameters.AddWithValue("@receivingReceipt",  receiving_receipt);
                        command.Parameters.AddWithValue("@controlNo", control_no==null?(object)DBNull.Value : control_no);
                        command.Parameters.AddWithValue("@lotNo", lot_no == null ? (object)DBNull.Value : lot_no);
                        command.Parameters.AddWithValue("@warehouseCd", warehouse_cd);
                        command.Parameters.AddWithValue("@docNo", '%'+doc_no+'%');
                      
                        try
                        {
                            connection.Open();
                            Int32 rowsAffected = command.ExecuteNonQuery();
                            System.Diagnostics.Debug.WriteLine("RowsAffected: {0}", rowsAffected);
                            connection.Close();
                        }
                        catch (SqlException ex)
                        {
                            throw ex;
                        }

                     
                    }
                }
                else
                {
                    throw new System.InvalidOperationException("Connection string for this module is not yet set.");
                }
        
        }
       
        public void updateUnitCost(Dictionary<string, string> selected_row, decimal value, int by_doc_no){
            decimal unit_cost = value;
           
            string item_cd = selected_row["item_cd"];
            string item_type_cd = selected_row["item_type_cd"];
            string item_class_cd = selected_row["item_class_cd"];
            string item_category_cd = selected_row["item_category_cd"];
            string po_no = selected_row["po_no"];
            string company_cd = selected_row["company_cd"];
            string doc_no = selected_row["doc_no"];
            string warehouse_cd = selected_row["warehouse_cd"];
            string receiving_receipt = selected_row["receiving_receipt"];
            string control_no = selected_row["control_no"];
            string lot_no = selected_row["lot_no"];
            EndingInventoryDataTable receivedItemsDataTable = new EndingInventoryDataTable();
                if (connectionString != null)
                {
                        using (connection = new SqlConnection(connectionString))
                        {
                                System.Diagnostics.Debug.WriteLine("Scanning received items");
                                System.Diagnostics.Debug.WriteLine("RECEIVED ITEM: " + selected_row["item_descs"].ToString());
                                if (by_doc_no != 1)
                                {
                                  
                                    updateUnitCostByReceiptingDetails(unit_cost, company_cd, item_cd, item_type_cd, item_class_cd, item_category_cd, receiving_receipt, control_no, lot_no, warehouse_cd, "");
                                  
                                }
                                else
                                {
                                    System.Diagnostics.Debug.WriteLine("updating by doc no unit cost :" + unit_cost);
                                    updateUnitCostByReceiptingDetails(unit_cost, company_cd, item_cd, item_type_cd, item_class_cd, item_category_cd, receiving_receipt, control_no, lot_no, warehouse_cd, doc_no);
                                }
                         
                        }
                  
                }
                else {
                    throw new System.InvalidOperationException("Connection string for this module is not yet set.");
                }
        
        }
      
      
    }
}
