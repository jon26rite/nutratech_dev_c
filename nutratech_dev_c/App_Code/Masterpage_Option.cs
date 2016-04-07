using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Microsoft.VisualBasic;
using System.Collections;
using System.Data;
using System.Diagnostics;
using System.Data.SqlClient;
public class Masterpage_Option : ConnectionManager
{

    public DataTable UserAssignCompany(string xusername)
    {
        SqlCommand oCommand = new SqlCommand();
        oCommand.Connection = this.Connection;

        string sql = "SELECT        cfs_user_company.company_code as code, cf_company.descs ";
        sql = sql + "FROM            cfs_user_company INNER JOIN ";
        sql = sql + "cf_company ON cfs_user_company.company_code = cf_company.code ";
        sql = sql + "WHERE        (cfs_user_company.username = '" + xusername + "') ";
        sql = sql + "ORDER BY cf_company.descs ";

        oCommand.CommandText = sql;

        DataSet ds = new DataSet();
        SqlDataAdapter oAdapter = new SqlDataAdapter();
        oAdapter.SelectCommand = oCommand;
        oAdapter.Fill(ds);

        return ds.Tables[0];

    }

    public DataTable UserProgramMenu(string group_access_code)
    {
        SqlCommand oCommand = new SqlCommand();
        oCommand.Connection = this.Connection;

        string sql = "SELECT  cf_program_menu.descs, cf_program_menu.navigation_url, cf_program_menu.menu_index, cf_program_menu.menu_index_1, cf_program_menu.glyph_icon, cf_program_menu.glyph_icon_caret ";
        sql = sql + "FROM            cfs_user_group_access_menu INNER JOIN ";
        sql = sql + "cf_program_menu ON cfs_user_group_access_menu.menu_cd = cf_program_menu.code ";
        sql = sql + "WHERE        (cfs_user_group_access_menu.group_access_cd = '" + group_access_code + "') ";
        sql = sql + "AND (cf_program_menu.status = 1) ";
        sql = sql + "AND (cf_program_menu.menu_index_1 = 0) ";
        sql = sql + "AND (cf_program_menu.menu_index_2 = 0) ";
        sql = sql + "ORDER BY cf_program_menu.menu_index, cf_program_menu.menu_index_1, cf_program_menu.menu_index_2 ";

        oCommand.CommandText = sql;

        DataSet ds = new DataSet();
        SqlDataAdapter oAdapter = new SqlDataAdapter();
        oAdapter.SelectCommand = oCommand;
        oAdapter.Fill(ds);

        return ds.Tables[0];

    }

    public DataTable UserProgramMenu_sub1(string group_access_code, int index)
    {
        SqlCommand oCommand = new SqlCommand();
        oCommand.Connection = this.Connection;

        string sql = "SELECT cfs_user_group_access_menu.menu_cd, cf_program_menu.descs, cf_program_menu.navigation_url, cf_program_menu.menu_index, cf_program_menu.menu_index_1, ";
        sql = sql + "cf_program_menu.menu_index_2, cf_program_menu.glyph_icon, cf_program_menu.glyph_icon_caret ";
        sql = sql + "FROM            cfs_user_group_access_menu INNER JOIN ";
        sql = sql + "cf_program_menu ON cfs_user_group_access_menu.menu_cd = cf_program_menu.code ";
        sql = sql + "WHERE        (cfs_user_group_access_menu.group_access_cd = '" + group_access_code + "') ";
        sql = sql + "AND (cf_program_menu.status = 1) ";
        sql = sql + "AND (cf_program_menu.menu_index = " + index + ") ";
        sql = sql + "AND (cf_program_menu.menu_index_1 > 0) ";
        sql = sql + "AND (cf_program_menu.menu_index_2 = 0) ";
        sql = sql + "ORDER BY cf_program_menu.menu_index, cf_program_menu.menu_index_1, cf_program_menu.menu_index_2 ";

        oCommand.CommandText = sql;

        DataSet ds = new DataSet();
        SqlDataAdapter oAdapter = new SqlDataAdapter();
        oAdapter.SelectCommand = oCommand;
        oAdapter.Fill(ds);

        return ds.Tables[0];

    }

    public DataTable UserProgramMenu_sub2(string group_access_code, int index, int index_1)
    {
        SqlCommand oCommand = new SqlCommand();
        oCommand.Connection = this.Connection;

        string sql = "SELECT cfs_user_group_access_menu.menu_cd, cf_program_menu.descs, cf_program_menu.navigation_url, cf_program_menu.menu_index, cf_program_menu.menu_index_1, ";
        sql = sql + "cf_program_menu.menu_index_2, cf_program_menu.glyph_icon, cf_program_menu.glyph_icon_caret ";
        sql = sql + "FROM            cfs_user_group_access_menu INNER JOIN ";
        sql = sql + "cf_program_menu ON cfs_user_group_access_menu.menu_cd = cf_program_menu.code ";
        sql = sql + "WHERE        (cfs_user_group_access_menu.group_access_cd = '" + group_access_code + "') ";
        sql = sql + "AND (cf_program_menu.status = 1) ";
        sql = sql + "AND (cf_program_menu.menu_index = " + index + ") ";
        sql = sql + "AND (cf_program_menu.menu_index_1 = " + index_1 + ") ";
        sql = sql + "AND (cf_program_menu.menu_index_2 > 0) ";
        sql = sql + "ORDER BY cf_program_menu.menu_index, cf_program_menu.menu_index_1, cf_program_menu.menu_index_2 ";

        oCommand.CommandText = sql;

        DataSet ds = new DataSet();
        SqlDataAdapter oAdapter = new SqlDataAdapter();
        oAdapter.SelectCommand = oCommand;
        oAdapter.Fill(ds);

        return ds.Tables[0];

    }

}
