<%@ WebHandler Language="C#" Class="Fileuploader" %>

using System;
using System.Web;
using System.IO;

public class Fileuploader : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        if (context.Request.Files.Count > 0)
        {
            HttpFileCollection files = context.Request.Files;
            for (int i = 0; i <= files.Count - 1; i++)
            {
                HttpPostedFile file = files[i];
                string extension;
                extension = Path.GetExtension(file.FileName);
                string fname = context.Server.MapPath("pdf/" + HttpContext.Current.Session["username"] + "/Nutratech_DTR" + extension);
                file.SaveAs(fname);
            }
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}