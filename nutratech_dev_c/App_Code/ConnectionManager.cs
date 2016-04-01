using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Diagnostics;
using System.Data.SqlClient;


using ClosedXML.Excel;
using System.Net;


public class ConnectionManager
{

    public static string SQL_CN = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
    private SqlConnection _CONNECTION = new SqlConnection();
    public SqlConnection Connection
    {
        get { return _CONNECTION; }
        set { _CONNECTION = value; }
    }
    public SqlException Open()
    {
        try
        {
            _CONNECTION.ConnectionString = SQL_CN;
            _CONNECTION.Open();

            return null;
        }
        catch (SqlException ex)
        {
            _CONNECTION.Dispose();
            return ex;
        }
    }
    public SqlException Close()
    {
        try
        {
            _CONNECTION.Close();

            return null;
        }
        catch (SqlException ex)
        {
            return ex;
        }
        finally
        {
            _CONNECTION.Dispose();
        }
    }

}

public class MasterfileField
{
    public string _Code
    {
        get { return m_Code; }
        set { m_Code = value; }
    }
    private string m_Code;
    public string _Description
    {
        get { return m_Description; }
        set { m_Description = value; }
    }
    private string m_Description;
    public string _Status
    {
        get { return m_Status; }
        set { m_Status = value; }
    }

    private string m_Status;
    public string _Username
    {
        get { return m_Username; }
        set { m_Username = value; }
    }
    private string m_Username;
    public string _Name
    {
        get { return m_Name; }
        set { m_Name = value; }
    }
    private string m_Name;
    public string _Department
    {
        get { return m_Department; }
        set { m_Department = value; }
    }
    private string m_Department;
    public string _Group_Access
    {
        get { return m_Group_Access; }
        set { m_Group_Access = value; }
    }

    private string m_Group_Access;
    public string _UOM
    {
        get { return m_UOM; }
        set { m_UOM = value; }
    }

    private string m_UOM;
    public string _Standard_Cost
    {
        get { return m_Standard_Cost; }
        set { m_Standard_Cost = value; }
    }
    private string m_Standard_Cost;
    public string _Latest_Cost
    {
        get { return m_Latest_Cost; }
        set { m_Latest_Cost = value; }
    }
    private string m_Latest_Cost;
    public string _Weight
    {
        get { return m_Weight; }
        set { m_Weight = value; }
    }

    private string m_Weight;
    public string _Type
    {
        get { return m_Type; }
        set { m_Type = value; }
    }

    private string m_Type;
    public string _Class
    {
        get { return m_Class; }
        set { m_Class = value; }
    }
    private string m_Class;
    public string _Category
    {
        get { return m_Category; }
        set { m_Category = value; }
    }

    private string m_Category;
    public string _UOM_To
    {
        get { return m_UOM_To; }
        set { m_UOM_To = value; }
    }

    private string m_UOM_To;

    public string _trx_type
    {
        get { return m_trx_type; }
        set { m_trx_type = value; }
    }

    private string m_trx_type;
    public string _doc_no
    {
        get { return m_doc_no; }
        set { m_doc_no = value; }
    }

    private string m_doc_no;
    public string _doc_date
    {
        get { return m_doc_date; }
        set { m_doc_date = value; }
    }

    private string m_doc_date;
    public string _doc_descs
    {
        get { return m_doc_descs; }
        set { m_doc_descs = value; }
    }

    private string m_doc_descs;
    public string _item_cd
    {
        get { return m_item_cd; }
        set { m_item_cd = value; }
    }

    private string m_item_cd;
    public string _descs
    {
        get { return m_descs; }
        set { m_descs = value; }
    }

    private string m_descs;
    public string _item_weight
    {
        get { return m_item_weight; }
        set { m_item_weight = value; }
    }

    private string m_item_weight;
    public string _qty
    {
        get { return m_qty; }
        set { m_qty = value; }
    }

    private string m_qty;
    public string _receiving_receipt
    {
        get { return m_receiving_receipt; }
        set { m_receiving_receipt = value; }
    }

    private string m_receiving_receipt;
    public string _control_no
    {
        get { return m_control_no; }
        set { m_control_no = value; }
    }

    private string m_control_no;
    public string _lot_no
    {
        get { return m_lot_no; }
        set { m_lot_no = value; }
    }

    private string m_lot_no;
    public string _mfg_date
    {
        get { return m_mfg_date; }
        set { m_mfg_date = value; }
    }

    private string m_mfg_date;
    public string _expiry_date
    {
        get { return m_expiry_date; }
        set { m_expiry_date = value; }
    }

    private string m_expiry_date;
}

public class List_Item
{
    public string Code
    {
        get { return m_Code; }
        set { m_Code = value; }
    }
    private string m_Code;
    public string Descs
    {
        get { return m_Descs; }
        set { m_Descs = value; }
    }

    private string m_Descs;

}

public class ExcelReport
{
    public static int get_end_day(int month, int year)
    {
        int day = 30;

        switch (month)
        {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                day = 31;
                break;
            case 2:
                if ((year % 4) == 0)
                {
                    day = 29;
                }
                else if ((year % 4) > 0)
                {
                    day = 28;
                }
                break;
        }

        return day;
    }
    public static int xstr_excelfile(IXLWorksheet worksheet, string department_code, string _date, int xrow)
    {
       
        string sql = "SELECT        strEmployeeID, ";
        sql = sql + "CASE WHEN LastName IS NOT NULL THEN rtrim(LastName) + ', ' ELSE '' END + ";
        sql = sql + "CASE WHEN FirstName IS NOT NULL THEN rtrim(FirstName) + ' ' ELSE '' END + ";
        sql = sql + "CASE WHEN MiddleInitial IS NOT NULL THEN rtrim(MiddleInitial) + '. ' ELSE '' END + ";
        sql = sql + "CASE WHEN ExtentionName IS NOT NULL THEN rtrim(ExtentionName) ELSE '' END AS name ";
        sql = sql + "FROM            Employees ";
        sql = sql + "WHERE        (Department = " + department_code + ") AND (Deactivated = 0) ";
        sql = sql + "ORDER BY LastName, FirstName, MiddleInitial ";

        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionStringEDS"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr = null;

        cn.Open();
        dtr = cmd.ExecuteReader();

        int index = 1;
        int xcol = 1;


        while (dtr.Read())
        {
            xcol = 1;

            worksheet.Cell(xrow, xcol).SetValue(index + ".");
            worksheet.Cell(xrow, xcol).Style.Font.FontSize = 10;
            worksheet.Cell(xrow, xcol).Style.Font.FontName = "Calibri";
            worksheet.Cell(xrow, xcol).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;
            worksheet.Cell(xrow, xcol).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            worksheet.Cell(xrow, xcol).Style.Border.TopBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.RightBorder = XLBorderStyleValues.Thin;

            xcol = 2;

            worksheet.Cell(xrow, xcol).SetValue(dtr["strEmployeeID"].ToString().Trim());
            worksheet.Cell(xrow, xcol).Style.Font.FontSize = 10;
            worksheet.Cell(xrow, xcol).Style.Font.FontName = "Calibri";
            worksheet.Cell(xrow, xcol).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            worksheet.Cell(xrow, xcol).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            worksheet.Cell(xrow, xcol).Style.Border.TopBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.RightBorder = XLBorderStyleValues.Thin;

            xcol = 3;

            worksheet.Cell(xrow, xcol).SetValue(dtr["name"].ToString().Trim().ToUpper());
            worksheet.Cell(xrow, xcol).Style.Font.FontSize = 10;
            worksheet.Cell(xrow, xcol).Style.Font.FontName = "Calibri";
            worksheet.Cell(xrow, xcol).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;
            worksheet.Cell(xrow, xcol).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            worksheet.Cell(xrow, xcol).Style.Border.TopBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.RightBorder = XLBorderStyleValues.Thin;

            xstr_excelfile_employee(worksheet, dtr["strEmployeeID"].ToString().Trim(), _date, xrow);


            for (int i = 10; i <= 10; i++)
            {
                worksheet.Cell(xrow, i).SetValue("");
                worksheet.Cell(xrow, i).Style.Font.FontSize = 10;
                worksheet.Cell(xrow, i).Style.Font.FontName = "Calibri";
                worksheet.Cell(xrow, i).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;
                worksheet.Cell(xrow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
                worksheet.Cell(xrow, i).Style.Border.TopBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(xrow, i).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(xrow, i).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
                worksheet.Cell(xrow, i).Style.Border.RightBorder = XLBorderStyleValues.Thin;

            }

            xrow += 1;
            index += 1;

        }
        dtr.Close();
        cn.Close();
        cn.Dispose();



        return xrow;

    }
    public static int xstr_excelfile_employee(IXLWorksheet worksheet, string employee_id, string _date, int xrow)
    {

        string sql = "SELECT        MAX(Count) AS max_count ";
        sql = sql + "FROM            Timedata ";
        sql = sql + "WHERE        (Timedata BETWEEN '" + _date + " 00:01:00' AND '" + _date + " 23:23:59') ";
        sql = sql + "AND (strEmployeeID IN ('" + employee_id + "')) ";
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionStringEDS"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr = null;
        int max_count = 0;
        cn.Open();
        dtr = cmd.ExecuteReader();
         if (dtr.Read())
            {
                if (!dtr.IsDBNull(dtr.GetOrdinal("max_count")))
                {
                    max_count = dtr.GetOrdinal("max_count");
                } 
            }
       
        dtr.Close();
        cn.Close();



        sql = "SELECT        Timedata, Count, InOut, Remarks ";
        sql = sql + "FROM            Timedata ";
        sql = sql + "WHERE        (Timedata BETWEEN '" + _date + " 00:01:00' AND '" + _date + " 23:23:59') ";
        sql = sql + "AND (strEmployeeID IN ('" + employee_id + "')) ";
        sql = sql + "ORDER BY strEmployeeID, Timedata, Count ";

        cmd = new SqlCommand(sql, cn);

        cn.Open();
        dtr = cmd.ExecuteReader();

        int xcol = 4;
        string log_type = "";
        string remarks = "";
        while (dtr.Read())
        {
            log_type = dtr["Remarks"].ToString().Trim();
            if (log_type.IndexOf("OB") > -1)
            {
                log_type = "OB";
            }
            else if (log_type.IndexOf("CT") > -1)
            {
                log_type = "CT";
            }
            else
            {
                log_type = "";
            }
            string x = log_type + " - ";
            if (!string.IsNullOrEmpty(log_type))
            {
                remarks = dtr["Remarks"].ToString().Trim().Substring(x.Length).Trim();
            }
            else
            {
                remarks = dtr["Remarks"].ToString().Trim();
            }

            if (max_count == 2)
            {
                if (Convert.ToInt32(dtr["Count"].ToString().Trim()) == 1)
                {
                    xcol = 4;

                }
                else if (Convert.ToInt32(dtr["Count"].ToString().Trim()) == 2)
                {
                    if (Convert.ToDateTime(_date + " " + Convert.ToDateTime(dtr["Timedata"].ToString().Trim()).ToShortTimeString()) < Convert.ToDateTime(_date + " 1:00:01 PM"))
                    {
                        xcol = 5;
                    }
                    else if (Convert.ToDateTime(_date + " " + Convert.ToDateTime(dtr["Timedata"].ToString().Trim()).ToShortTimeString()) > Convert.ToDateTime(_date + " 1:00:01 PM"))
                    {
                        xcol = 7;
                    }
                    else
                    {
                        xcol = 5;
                    }
                }

            }
            else
            {
                if (Convert.ToInt32(dtr["Count"].ToString().Trim()) == 1)
                {
                    xcol = 4;
                }
                else if (Convert.ToInt32(dtr["Count"].ToString().Trim()) == 2)
                {
                    xcol = 5;
                }
                else if (Convert.ToInt32(dtr["Count"].ToString().Trim()) == 3)
                {
                    xcol = 6;
                }
                else if (Convert.ToInt32(dtr["Count"].ToString().Trim()) == 4)
                {
                    xcol = 7;
                }

            }

            worksheet.Cell(xrow, xcol).SetValue(Convert.ToDateTime(dtr["Timedata"].ToString().Trim()).ToShortTimeString());
            worksheet.Cell(xrow, xcol).Style.Font.FontSize = 10;
            worksheet.Cell(xrow, xcol).Style.Font.FontName = "Calibri";
            worksheet.Cell(xrow, xcol).Style.Fill.BackgroundColor = XLColor.Yellow;
            worksheet.Cell(xrow, xcol).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            worksheet.Cell(xrow, xcol).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            worksheet.Cell(xrow, xcol).Style.Border.TopBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, xcol).Style.Border.RightBorder = XLBorderStyleValues.Thin;


        }
        dtr.Close();
        cn.Close();
        cn.Dispose();

        xcol = 8;
        worksheet.Cell(xrow, xcol).SetValue(log_type);
        worksheet.Cell(xrow, xcol).Style.Font.FontSize = 10;
        worksheet.Cell(xrow, xcol).Style.Font.FontName = "Calibri";
        worksheet.Cell(xrow, xcol).Style.Fill.BackgroundColor = XLColor.Yellow;
        worksheet.Cell(xrow, xcol).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;
        worksheet.Cell(xrow, xcol).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
        worksheet.Cell(xrow, xcol).Style.Border.TopBorder = XLBorderStyleValues.Thin;
        worksheet.Cell(xrow, xcol).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
        worksheet.Cell(xrow, xcol).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
        worksheet.Cell(xrow, xcol).Style.Border.RightBorder = XLBorderStyleValues.Thin;

        xcol = 9;
        worksheet.Cell(xrow, xcol).SetValue(remarks);
        worksheet.Cell(xrow, xcol).Style.Font.FontSize = 10;
        worksheet.Cell(xrow, xcol).Style.Font.FontName = "Calibri";
        worksheet.Cell(xrow, xcol).Style.Fill.BackgroundColor = XLColor.Yellow;
        worksheet.Cell(xrow, xcol).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;
        worksheet.Cell(xrow, xcol).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
        worksheet.Cell(xrow, xcol).Style.Border.TopBorder = XLBorderStyleValues.Thin;
        worksheet.Cell(xrow, xcol).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
        worksheet.Cell(xrow, xcol).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
        worksheet.Cell(xrow, xcol).Style.Border.RightBorder = XLBorderStyleValues.Thin;



        for (int i = 4; i <= 9; i++)
        {
            worksheet.Cell(xrow, i).Style.Font.FontSize = 10;
            worksheet.Cell(xrow, i).Style.Font.FontName = "Calibri";
            worksheet.Cell(xrow, i).Style.Fill.BackgroundColor = XLColor.Yellow;
            worksheet.Cell(xrow, i).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            worksheet.Cell(xrow, i).Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            worksheet.Cell(xrow, i).Style.Border.TopBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, i).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, i).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
            worksheet.Cell(xrow, i).Style.Border.RightBorder = XLBorderStyleValues.Thin;

        }


        return 0;

    }
    public static string hr_department_Descs(string department_code)
    {

        string sql = "SELECT        DepartmentNumber AS code, DepartmentName AS descs        FROM Departments        WHERE (DepartmentNumber = " + department_code + ") ";


        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionStringEDS"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr = null;

        cn.Open();
        dtr = cmd.ExecuteReader();

        string x = "";



        while (dtr.Read())
        {
            x = dtr["descs"].ToString().Trim().ToUpper();

        }
        dtr.Close();
        cn.Close();
        cn.Dispose();

        return x;

    }

    public static void delete_efile()
    {
        string sql = "DELETE FROM temp_TimeLog ";

        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);

        cn.Open();
        cmd.ExecuteNonQuery();
        cn.Close();
        cn.Dispose();

    }
    public static string verifytime_day_efile(string employeeid, string _date, int _count)
    {

        string sql = "SELECT Timedata FROM Timedata ";
        sql = sql + "WHERE        (strEmployeeID = '" + employeeid + "') ";
        sql = sql + "AND (Timedata BETWEEN '" + _date + " 00:01:00' AND '" + _date + " 23:59:59') ";
        sql = sql + "AND (Count = " + _count + ") ";
        sql = sql + "ORDER BY strEmployeeID, Timedata, Count";
        string x = "";
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionStringEDS"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr = null;


        cn.Open();
        dtr = cmd.ExecuteReader();
        if (dtr.Read())
        {
            x = dtr["Timedata"].ToString().Trim();
        }
        cn.Close();
        cn.Dispose();
        return x;
    }
    public static void insert_efile(string Timedata, int EmployeeID, int PIN, string strEmployeeID, int Count, string InOut, string Remarks, bool Append, string WorkStation, int Approval,
    bool Encoded, string Type, string DateStamp, string Name, string Constring)
    {
        string sql = "";
        if (string.IsNullOrEmpty(Name))
        {
            sql = "INSERT INTO Timedata ";
            sql = sql + "(Timedata, EmployeeID, PIN, strEmployeeID, Count, InOut, Remarks, Append, WorkStation, Approval, Encoded, Type, DateStamp) ";
            sql = sql + "VALUES(";
            sql = sql + "'" + Timedata + "', ";
            sql = sql + "" + EmployeeID + ", ";
            sql = sql + "" + PIN + ", ";
            sql = sql + "'" + strEmployeeID + "', ";
            sql = sql + "" + Convert.ToInt32(Count) + ", ";
            sql = sql + "'" + InOut + "', ";
            sql = sql + "'" + Remarks + "', ";
            sql = sql + "" + Convert.ToInt32(Append) + ", ";
            sql = sql + "'" + WorkStation + "', ";
            sql = sql + "" + Convert.ToInt32(Approval) + ", ";
            sql = sql + "" + Convert.ToInt32(Encoded) + ", ";
            sql = sql + "'" + Type + "', ";
            sql = sql + "'" + DateStamp + "' ";
            sql = sql + ") ";
        }
        else
        {
            sql = "INSERT INTO temp_TimeLog ";
            sql = sql + "(Timedata, EmployeeID, PIN, strEmployeeID, Count, InOut, Remarks, Append, WorkStation, Approval, Encoded, Type, DateStamp, name) ";
            sql = sql + "VALUES(";
            sql = sql + "'" + Timedata + "', ";
            sql = sql + "" + EmployeeID + ", ";
            sql = sql + "" + PIN + ", ";
            sql = sql + "'" + strEmployeeID + "', ";
            sql = sql + "" + Convert.ToInt32(Count) + ", ";
            sql = sql + "'" + InOut + "', ";
            sql = sql + "'" + Remarks + "', ";
            sql = sql + "" + Convert.ToInt32(Append) + ", ";
            sql = sql + "'" + WorkStation + "', ";
            sql = sql + "" + Convert.ToInt32(Approval) + ", ";
            sql = sql + "" + Convert.ToInt32(Encoded) + ", ";
            sql = sql + "'" + Type + "', ";
            sql = sql + "'" + DateStamp + "', ";
            sql = sql + "'" + Name + "' ";
            sql = sql + ") ";
        }

        SqlConnection cn = new SqlConnection(Constring);
        SqlCommand cmd = new SqlCommand(sql, cn);

        cn.Open();
        cmd.ExecuteNonQuery();
        cn.Close();
        cn.Dispose();

    }
    public static void update_efile(string Timedata, int EmployeeID, int PIN, string strEmployeeID, int Count, string InOut, string Remarks, bool Append, string WorkStation, int Approval,
    bool Encoded, string Type, string DateStamp, string Name, string Constring)
    {
        string sql = "";
        if (string.IsNullOrEmpty(Name))
        {
            sql = "UPDATE Timedata ";
            sql = sql + "SET ";
            sql = sql + "Timedata = '" + Timedata + "', ";
            sql = sql + "Remarks = '" + Remarks + "', ";
            sql = sql + "Append = " + Convert.ToInt32(Append) + ", ";
            sql = sql + "WorkStation = '" + WorkStation + "', ";
            sql = sql + "Approval = " + Convert.ToInt32(Approval) + ", ";
            sql = sql + "Encoded = " + Convert.ToInt32(Encoded) + ", ";
            sql = sql + "Type = '" + Type + "', ";
            sql = sql + "DateStamp = '" + DateStamp + "' ";

            sql = sql + "WHERE        (EmployeeID = '" + EmployeeID + "') ";
            sql = sql + "AND (CONVERT(VARCHAR(10), Timedata, 101)  = '" + Convert.ToDateTime(Timedata).ToString("MM/dd/yyyy") + "') ";
            sql = sql + "AND (Count = " + Convert.ToInt32(Count) + ") ";
            sql = sql + "AND (InOut = '" + InOut + "') ";

        }

        SqlConnection cn = new SqlConnection(Constring);
        SqlCommand cmd = new SqlCommand(sql, cn);

        cn.Open();
        cmd.ExecuteNonQuery();
        cn.Close();
        cn.Dispose();

    }


    public static void read_textfile_db()
    {
        string sql = "SELECT        employee_id, TimeData FROM temp_Offsite_Log ";
        sql = sql + "WHERE        (TimeData > '9/1/2015 00:00:00') ";
        sql = sql + "ORDER BY employee_id, TimeData ";
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        SqlCommand cmd = new SqlCommand(sql, cn);
        SqlDataReader dtr = null;
        cn.Open();
        dtr = cmd.ExecuteReader();
        string _date = "";
        int _pin = -1;
        int _employeeid = -1;
        string _stremployeeid = "";
        string _name = "ok";
        string _constring = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        string _Timedata = "";
        string _InOut = "";


        bool _Append = true;
        string _WorkStation = "HRD07";
        int _Approval = 4;
        bool _Encode = false;
        string _Type = "MO";
        string _DateStamp = System.DateTime.Now.ToString();
        string _remarks = "No AMPS available in location";

        int _Count = 1;
        //int _hour = -1;

        while (dtr.Read())
        {

            if (_pin != Convert.ToInt32(dtr["employee_id"].ToString().Trim()))
            {
                _pin = Convert.ToInt32(dtr["employee_id"].ToString().Trim());

                sql = "SELECT EmployeeID, PIN, strEmployeeID, ";
                sql = sql + "CASE WHEN LastName IS NOT NULL THEN rtrim(LastName) + ', ' ELSE '' END + ";
                sql = sql + "CASE WHEN FirstName IS NOT NULL THEN rtrim(FirstName) + ' ' ELSE '' END + ";
                sql = sql + "CASE WHEN MiddleInitial IS NOT NULL THEN rtrim(MiddleInitial) + '. ' ELSE '' END + ";
                sql = sql + "CASE WHEN ExtentionName IS NOT NULL THEN rtrim(ExtentionName) ELSE '' END AS name ";
                sql = sql + "FROM Employees WHERE        (PIN = " + _pin + ") ";

                SqlConnection cn_eds = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionStringEDS"].ConnectionString);
                SqlCommand cmd_eds = new SqlCommand(sql, cn_eds);
                SqlDataReader dtr_eds = null;

                cn_eds.Open();
                dtr_eds = cmd_eds.ExecuteReader();

                if (dtr_eds.Read())
                {
                    _employeeid = Convert.ToInt32(dtr_eds["EmployeeID"].ToString().Trim());
                    _stremployeeid = dtr_eds["strEmployeeID"].ToString().Trim();
                    _name = dtr_eds["name"].ToString().Trim();

                }
                dtr_eds.Close();
                cn_eds.Close();
                cn_eds.Dispose();

            }


            if (_date != Convert.ToDateTime(dtr["TimeData"].ToString().Trim()).ToShortDateString())
            {
                _date = Convert.ToDateTime(dtr["TimeData"].ToString().Trim()).ToShortDateString();

                //sql = "SELECT         MIN(TimeData) AS time_in, MAX(TimeData) AS time_out FROM temp_Offsite_Log ";
                //sql = sql + "WHERE        (TimeData BETWEEN '" + _date + " 00:00:00' AND '" + _date + " 23:59:59') ";
                //sql = sql + "AND (employee_id = " + _pin + ") ";

                sql = "SELECT         MIN(DATEADD(mi, DATEDIFF(mi, 0, TimeData), 0)) AS time_in, MAX(DATEADD(mi, DATEDIFF(mi, 0, TimeData), 0)) AS time_out FROM temp_Offsite_Log ";
                sql = sql + "WHERE        (TimeData BETWEEN '" + _date + " 00:00:00' AND '" + _date + " 23:59:59') ";
                sql = sql + "AND (employee_id = " + _pin + ") ";

                SqlConnection cn_time = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
                SqlCommand cmd_time = new SqlCommand(sql, cn_time);
                SqlDataReader dtr_time = null;

                string _time_in = "";
                string _time_out = "";
                cn_time.Open();
                dtr_time = cmd_time.ExecuteReader();

                if (dtr_time.Read())
                {
                    _time_in = dtr_time["time_in"].ToString().Trim();
                    _time_out = dtr_time["time_out"].ToString().Trim();

                }
                dtr_time.Close();
                cn_time.Close();
                cn_time.Dispose();

                string _verify_time = ExcelReport.verifytime_day_efile(_stremployeeid, Convert.ToDateTime(_date).ToShortDateString(), 1);
                if (string.IsNullOrEmpty(_verify_time))
                {
                    if (_time_in != _time_out)
                    {
                        _Count = 1;
                        _Timedata = _time_in;
                        _InOut = "IN";
                        ExcelReport.insert_efile(_Timedata, _employeeid, _pin, _stremployeeid, _Count, _InOut, _remarks, _Append, _WorkStation, _Approval,
                        _Encode, _Type, _DateStamp, _name, _constring);

                        _Count = 2;
                        _Timedata = _time_out;
                        _InOut = "OUT";
                        ExcelReport.insert_efile(_Timedata, _employeeid, _pin, _stremployeeid, _Count, _InOut, _remarks, _Append, _WorkStation, _Approval,
                        _Encode, _Type, _DateStamp, _name, _constring);
                    }
                }
            }
        }
        dtr.Close();
        cn.Close();
        cn.Dispose();

    }

    public static void get_ftp(string filename)
    {
        //FTP Server URL.
        string ftp = "ftp://38.98.52.232/";

        //FTP Folder name. Leave blank if you want to list files from root folder.
        string ftpFolder = "attendance_log/";


        //Create FTP Request.
        FtpWebRequest objFTP = (FtpWebRequest)WebRequest.Create(ftp + ftpFolder + filename);

        string pathnfile = HttpContext.Current.Server.MapPath("~\\pdf\\" + HttpContext.Current.Session["username"]) + "\\" + filename;

        try
        {

            objFTP.Method = WebRequestMethods.Ftp.DownloadFile;

            //Enter FTP Server credentials.
            objFTP.Credentials = new NetworkCredential("nutratechcom", "QOgipAr^Hk5q");
            objFTP.UsePassive = true;
            objFTP.UseBinary = true;
            objFTP.EnableSsl = false;

            FileStream outputStream = new FileStream(pathnfile, FileMode.Create);
            FtpWebResponse response = (FtpWebResponse)objFTP.GetResponse();
            Stream ftpStream = response.GetResponseStream();
            long cl = response.ContentLength;
            int bufferSize = 2048;
            int readCount;
            byte[] buffer = new byte[bufferSize];

            readCount = ftpStream.Read(buffer, 0, bufferSize);
            while (readCount > 0)
            {
                outputStream.Write(buffer, 0, readCount);
                readCount = ftpStream.Read(buffer, 0, bufferSize);
            }

            ftpStream.Close();
            outputStream.Close();
            response.Close();

            //using (FtpWebResponse response = (FtpWebResponse)objFTP.GetResponse())//get file from ftp
            //{
            //    using (Stream ftpStream = response.GetResponseStream())
            //    {


            //        int contentLen;
            //        // save file in buffer
            //        using (FileStream fs = new FileStream(pathnfile, FileMode.Create))
            //        {
            //            byte[] buff = new byte[2048];
            //            contentLen = ftpStream.Read(buff, 0, buff.Length);
            //            while (contentLen != 0)
            //            {
            //                fs.Write(buff, 0, buff.Length);
            //                contentLen = ftpStream.Read(buff, 0, buff.Length);
            //            }
            //            objFTP = null;
            //        }
            //    }
            //}

        }
        catch (Exception Ex)
        {
            if (objFTP != null)
            {
                objFTP.Abort();
            }
            throw Ex;
        }

        
    }
}
