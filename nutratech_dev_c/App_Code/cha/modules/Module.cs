using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Module
/// </summary>
public class Module
{
    public string connectionString {get; set;}
    public SqlConnection connection { get; set; }

    public Module()
	{
		
	}

    
}