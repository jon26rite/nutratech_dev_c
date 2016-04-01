using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;


namespace cha.utils
{

    /// <summary>
    /// Represents one table for the ending inventory.
    /// </summary>
    public class EndingInventoryDataTable : DataTable
    {


        public enum Details { Summarized, Complete }
        public Details ReportType;

        public EndingInventoryDataTable()
            : base()
        {
            generateDefaultColumns();
            ReportType = Details.Complete;
        }



        /// <summary>
        /// Generates default columns with exact structure to the CostingDataSet stock_inventory datatable.
        /// </summary>
        private void generateDefaultColumns()
        {
            
            this.Columns.Add(new DataColumn("company_cd", typeof(string)));
            this.Columns.Add(new DataColumn("warehouse_cd", typeof(string)));
            this.Columns.Add(new DataColumn("doc_no", typeof(string)));
            this.Columns.Add(new DataColumn("doc_date", typeof(DateTime)));
            this.Columns.Add(new DataColumn("stk_descs", typeof(string)));
            this.Columns.Add(new DataColumn("trx_type", typeof(string)));
            this.Columns.Add(new DataColumn("item_type_cd", typeof(string)));
            this.Columns.Add(new DataColumn("item_class_cd", typeof(string)));
            this.Columns.Add(new DataColumn("item_category_cd", typeof(string)));
            this.Columns.Add(new DataColumn("item_cd", typeof(string)));
            this.Columns.Add(new DataColumn("qty", typeof(decimal)));
            this.Columns.Add(new DataColumn("unit_cost", typeof(decimal)));
            this.Columns.Add(new DataColumn("total_cost", typeof(decimal)));
            this.Columns.Add(new DataColumn("lot_no", typeof(string)));
            this.Columns.Add(new DataColumn("mfg_date", typeof(DateTime)));
            this.Columns.Add(new DataColumn("expiry_date", typeof(DateTime)));
            this.Columns.Add(new DataColumn("control_no", typeof(string)));
            this.Columns.Add(new DataColumn("uom", typeof(string)));
            this.Columns.Add(new DataColumn("item_weight", typeof(decimal)));
            this.Columns.Add(new DataColumn("po_no", typeof(string)));
            this.Columns.Add(new DataColumn("receiving_receipt", typeof(string)));
            this.Columns.Add(new DataColumn("item_descs", typeof(string)));
            this.Columns.Add(new DataColumn("status", typeof(string)));
            this.Columns.Add(new DataColumn("ref_no", typeof(string)));
            this.Columns.Add(new DataColumn("company_name", typeof(string)));
            this.Columns.Add(new DataColumn("warehouse_name", typeof(string)));
            this.Columns.Add(new DataColumn("remarks", typeof(string)));
            this.Columns.Add(new DataColumn("complete_item_cd", typeof(string)));
            this.Columns.Add(new DataColumn("item_category_descs", typeof(string)));
            this.Columns.Add(new DataColumn("month_cd", typeof(int)));
            this.Columns.Add(new DataColumn("inout_mode", typeof(string)));
          //  this.Columns.Add(new DataColumn("month_name", typeof(string)));
            this.Columns.Add(new DataColumn("c_uom_conversion", typeof(string)));
            this.Columns.Add(new DataColumn("uom_conversion_factor", typeof(decimal)));
            this.Columns.Add(new DataColumn("total_received", typeof(decimal)));
            this.Columns.Add(new DataColumn("total_issued", typeof(decimal)));
        }


        private EIDataRow convertToTableRow(DataRow dr)
        {
            EIDataRow newDataRow = this.CreateNewRow();

            string company_cd = dr["company_cd"].ToString();
            string warehouse_cd = dr["warehouse_cd"].ToString();
            string doc_no = dr["doc_no"].ToString();
            DateTime doc_date = Convert.ToDateTime(dr["doc_date"]);
            string stk_descs = dr["stk_descs"].ToString();
            string trx_type = dr["trx_type"].ToString();
            string item_type_cd = dr["item_type_cd"].ToString();
            string item_class_cd = dr["item_class_cd"].ToString();
            string item_category_cd = dr["item_category_cd"].ToString();
            string item_cd = dr["item_cd"].ToString();
            decimal qty = Convert.ToDecimal(dr["qty"]);
            decimal unit_cost = Convert.ToDecimal(dr["unit_cost"]);
            decimal total_cost = Convert.ToDecimal(dr["total_cost"]);
            string lot_no = dr["lot_no"].ToString();
            DateTime mfg_date;
            DateTime expiry_date;

            if (dr["mfg_date"] == (object)DBNull.Value || dr["expiry_date"] == (object)DBNull.Value)
            {
                mfg_date = Convert.ToDateTime("1900-01-01");
                expiry_date = Convert.ToDateTime("1900-01-01");
            }
            else
            {
                mfg_date = Convert.ToDateTime(dr["mfg_date"]);
                expiry_date = Convert.ToDateTime(dr["expiry_date"]);
            }

            string control_no = dr["control_no"].ToString();
            string uom = dr["uom"].ToString();
            decimal item_weight = Convert.ToDecimal(dr["item_weight"]);
            string po_no = dr["po_no"].ToString();
            string receiving_receipt = dr["receiving_receipt"].ToString();
            string item_descs = dr["item_descs"].ToString();
            string status = dr["status"].ToString();
            string ref_no = dr["ref_no"].ToString();
            string company_name = dr["company_name"].ToString();
            string warehouse_name = dr["warehouse_name"].ToString();
            string remarks = dr["remarks"].ToString();
            string complete_item_cd = dr["complete_item_cd"].ToString();
            string item_category_descs = dr["item_category_descs"].ToString();
            int month_cd = Convert.ToInt32(dr["month_cd"]);
            string inout_mode = dr["inout_mode"].ToString();
        //    string month_name = dr["month_name"].ToString();
            string c_uom_conversion = dr["c_uom_conversion"].ToString();
            decimal uom_conversion_factor;
            if (dr["uom_conversion_factor"].ToString() == "" || dr["uom_conversion_factor"] == (object)DBNull.Value)
            {
                uom_conversion_factor = 1;
            }
            else
            {
                uom_conversion_factor = Convert.ToDecimal(dr["uom_conversion_factor"]);
            }

            newDataRow.c_uom_conversion = c_uom_conversion;
            newDataRow.company_cd = company_cd;
            newDataRow.company_name = company_name;
            newDataRow.complete_item_cd = complete_item_cd;
            newDataRow.control_no = control_no;
            newDataRow.doc_date = doc_date;
            newDataRow.doc_no = doc_no;
            newDataRow.expiry_date = expiry_date;
            newDataRow.inout_mode = inout_mode;
            newDataRow.item_category_cd = item_category_cd;
            newDataRow.item_category_descs = item_category_descs;
            newDataRow.item_cd = item_cd;
            newDataRow.item_class_cd = item_class_cd;
            newDataRow.item_descs = item_descs;
            newDataRow.item_type_cd = item_type_cd;
            newDataRow.lot_no = lot_no;
            newDataRow.mfg_date = mfg_date;
            newDataRow.month_cd = month_cd;
           // newDataRow.month_name = month_name;
            newDataRow.po_no = po_no;
            newDataRow.qty = qty;
            newDataRow.receiving_receipt = receiving_receipt;
            newDataRow.ref_no = ref_no;
            newDataRow.remarks = remarks;
            newDataRow.status = status;
            newDataRow.stk_descs = stk_descs;
            newDataRow.total_cost = total_cost;
            newDataRow.trx_type = trx_type;
            newDataRow.unit_cost = unit_cost;
            newDataRow.uom = uom;
            newDataRow.uom_conversion_factor = uom_conversion_factor;
            newDataRow.warehouse_cd = warehouse_cd;
            newDataRow.warehouse_name = warehouse_name;
            newDataRow.total_received = 0;
            newDataRow.total_issued = 0;

          
            return newDataRow;
        }
      

        /// <summary>
        /// Insert row data to the datatable and automatically calculate the used quantity.
        /// </summary>
        public void addRow(DataRow dr)
        {

            EIDataRow eiRow = convertToTableRow(dr);

         
            if (ReportType == EndingInventoryDataTable.Details.Summarized)
            {
              
                    EIDataRow existingDataRow = null;
                    //findInRows will throw an InvalidOperationException when there are rows with the same receipting details.
                    existingDataRow = findInRows(eiRow);


                    if (existingDataRow == null)
                    {
                        this.Rows.Add(eiRow);
                        existingDataRow = eiRow;
                    }

                    decimal qty = Convert.ToDecimal(existingDataRow.qty);
                    decimal uom_conversion_factor = Convert.ToDecimal(existingDataRow.uom_conversion_factor);
                    decimal total_received = existingDataRow.total_received;
                    decimal total_issued = existingDataRow.total_issued;
                   
                    if (eiRow.inout_mode == "I")
                    {
                        
                        total_received = (qty * (1 / uom_conversion_factor));
                        existingDataRow.total_received = total_received;
                    }
                    else
                    {
                        existingDataRow.total_issued += (eiRow.qty * (1 / eiRow.uom_conversion_factor)); 
                    }
               
            }
            else
            {
                this.Rows.Add(eiRow);
            }
            
        }

        private EIDataRow findInRows(EIDataRow row)
        {
            foreach (EIDataRow dr in this.Rows)
            {
                bool conditions_match = true;
                bool month_cd_match = dr.month_cd == row.month_cd;
                bool complete_item_cd_match = dr.complete_item_cd == row.complete_item_cd;
                bool warehouse_cd_match = dr.warehouse_cd == row.warehouse_cd;
                bool lot_no_match = dr.lot_no == row.lot_no;
                bool control_no_match = dr.control_no == row.control_no;
                bool receiving_receipt_match = dr.receiving_receipt == row.receiving_receipt;
                bool mfg_date_match = dr.mfg_date == row.mfg_date;
                bool expiry_date_match = dr.expiry_date== row.expiry_date;
                bool is_not_valid = (dr.inout_mode == "I" && row.inout_mode == "I");

                //check row receipting details
                    conditions_match = conditions_match && complete_item_cd_match;
                    conditions_match = conditions_match && month_cd_match;
                    conditions_match = conditions_match && warehouse_cd_match;
                    conditions_match = conditions_match && lot_no_match;
                    conditions_match = conditions_match && control_no_match;
                    conditions_match = conditions_match && receiving_receipt_match;
                    conditions_match = conditions_match && mfg_date_match;
                    conditions_match = conditions_match && expiry_date_match;
                    if (conditions_match && is_not_valid)
                    {
                        throw new System.InvalidOperationException("Cannot generate summarized ending inventory. All records must have unique receipting details (RR No: "+row.receiving_receipt+", Item: "+row.item_descs+", Control No: "+row.control_no+", Lot No: "+row.lot_no+")");
                    }
                    else if(conditions_match)
                    {
                        return dr;
                    }
                        
              
            }

            return null;

        }
      

        protected override Type GetRowType()
        {
            return typeof(EIDataRow);
        }

        protected override DataRow NewRowFromBuilder(DataRowBuilder builder)
        {
            return new EIDataRow(builder);
        }

        public EIDataRow CreateNewRow()
        {
            EIDataRow row = (EIDataRow)NewRow();
            return row;
        }

        public double getTotalCostSum()
        {
            double total_cost_sum = 0;
            foreach (EIDataRow dr in this.Rows)
            {
                total_cost_sum += Convert.ToDouble(dr.total_cost);
            }
            return total_cost_sum;

        }

        public string toJsonFormat()
        {
            return DataTableToJSONWithJSONNet(this);

        }



        private string DataTableToJSONWithJSONNet(DataTable table)
        {
            string JsonString = string.Empty;
            JsonString = JsonConvert.SerializeObject(table, Formatting.None, new IsoDateTimeConverter() { DateTimeFormat = "MM/dd/yyyy" });
            return JsonString;
        }

  
        public class EIDataRow : DataRow
        {

            internal EIDataRow(DataRowBuilder rb)
                : base(rb)
            {
            }

            public string c_uom_conversion {
                get { return (string)base["c_uom_conversion"]; }
                set { base["c_uom_conversion"] = value; }
            }
            public string company_cd {
                get { return (string)base["company_cd"]; }
                set { base["company_cd"] = value; }
            }
            public string complete_item_cd {
                get { return (string)base["complete_item_cd"]; }
                set { base["complete_item_cd"] = value; }
            }
            public string company_name
            {
                get { return (string)base["company_name"]; }
                set { base["company_name"] = value; }
            }
            public string control_no
            {
                get { return (string)base["control_no"]; }
                set { base["control_no"] = value; }
            }
            public DateTime doc_date
            {
                get { return (DateTime)base["doc_date"]; }
                set { base["doc_date"] = value; }
            }
            public string doc_no
            {
                get { return (string)base["doc_no"]; }
                set { base["doc_no"] = value; }
            }

            public DateTime expiry_date
            {
                get { return (DateTime)base["expiry_date"]; }
                set { base["expiry_date"] = value; }
            }

            public string inout_mode
            {
                get { return (string)base["inout_mode"]; }
                set { base["inout_mode"] = value; }
            }
            public string item_class_cd
            {
                get { return (string)base["item_class_cd"]; }
                set { base["item_class_cd"] = value; }
            }
            public string item_category_cd
            {
                get { return (string)base["item_category_cd"]; }
                set { base["item_category_cd"] = value; }
            }
            public string item_category_descs
            {
                get { return (string)base["item_category_descs"]; }
                set { base["item_category_descs"] = value; }
            }
            public string item_cd
            {
                get { return (string)base["item_cd"]; }
                set { base["item_cd"] = value; }
            }
            public string item_descs
            {
                get { return (string)base["item_descs"]; }
                set { base["item_descs"] = value; }
            }
            public string item_type_cd
            {
                get { return (string)base["item_type_cd"]; }
                set { base["item_type_cd"] = value; }
            }

            public string lot_no
            {
                get { return (string)base["lot_no"]; }
                set { base["lot_no"] = value; }
            }

            public DateTime mfg_date
            {
                get { return (DateTime)base["mfg_date"]; }
                set { base["mfg_date"] = value; }
            }
            public int month_cd
            {
                get { return (int)base["month_cd"]; }
                set { base["month_cd"] = value; }
            }
         

            public string po_no {
                get { return (string)base["po_no"]; }
                set { base["po_no"] = value; }
            }

            public decimal qty
            {
                get { return (decimal)base["qty"]; }
                set { base["qty"] = value; }
            }

            public string receiving_receipt
            {
                get { return (string)base["receiving_receipt"]; }
                set { base["receiving_receipt"] = value; }
            }
            public string ref_no
            {
                get { return (string)base["ref_no"]; }
                set { base["ref_no"] = value; }
            }
            public string remarks
            {
                get { return (string)base["remarks"]; }
                set { base["remarks"] = value; }
            }

            public string stk_descs
            {
                get { return (string)base["stk_descs"]; }
                set { base["stk_descs"] = value; }
            }
            public string status
            {
                get { return (string)base["status"]; }
                set { base["status"] = value; }
            }

            public decimal total_cost
            {
                get { return (decimal)base["total_cost"]; }
                set { base["total_cost"] = value; }
            }
            public string trx_type
            {
                get { return (string)base["trx_type"]; }
                set { base["trx_type"] = value; }
            }

            public decimal unit_cost
            {
                get { return (decimal)base["unit_cost"]; }
                set { base["unit_cost"] = value; }
            }
            public string uom
            {
                get { return (string)base["uom"]; }
                set { base["uom"] = value; }
            }
            public decimal uom_conversion_factor
            {
                get { return (decimal)base["uom_conversion_factor"]; }
                set { base["uom_conversion_factor"] = value; }
            }

            public string warehouse_cd
            {
                get { return (string)base["warehouse_cd"]; }
                set { base["warehouse_cd"] = value; }
            }
            public string warehouse_name
            {
                get { return (string)base["warehouse_name"]; }
                set { base["warehouse_name"] = value; }
            }

            public decimal total_received
            {
                get { return (decimal)base["total_received"]; }
                set { base["total_received"] = value; }
            }

            public decimal total_issued
            {
                get { return (decimal)base["total_issued"]; }
                set { base["total_issued"] = value; }
            }

        }


      

    }
}
