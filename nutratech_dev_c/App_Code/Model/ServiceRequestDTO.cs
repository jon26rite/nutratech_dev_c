using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ServiceRequestDTO
/// </summary>
public class ServiceRequestDTO
{
    public String vehicle_id { get; set; }
    public String driver_username { get; set; }
    public Double mileage { get; set; }
    public String service_type { get; set; }
    public String request_date { get; set; }
    public String request_descs { get; set; }
    public String action_taken { get; set; }
    public String remarks { get; set; }
    public String date_started { get; set; }
    public String date_completed { get; set; }
    public String audit_user { get; set; }
    public String audit_date { get; set; }
    public String is_new_entry { get; set; }	
      
}