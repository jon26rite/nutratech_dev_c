<%@ Page Language="C#" AutoEventWireup="false" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=0.9" />

    <meta name="description" content="Inventory System" />
    <meta name="author" content="Jon E. Negrite" />

    <title>Nutratech Biopharma Inc.</title>
    
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed' rel='stylesheet' type='text/css' />
    <!-- Latest compiled and minified CSS -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Optional theme -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css" />

    <!-- Bootstrap Flat -->
    <link rel="stylesheet" href="bower_components/bootstrap-flat/css/bootstrap-flat.css" />

    <!-- SLICK CAROUSEL -->
    <link rel="stylesheet" type="text/css" href="bower_components/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="bower_components/slick/slick-theme.css"/>
    
    <!-- MY STYLE SHEET -->
    <link rel="stylesheet" href="css/StyleSheet.css" />

</head>
<body>
      
    
    
    
    <div class="col-md-8 xleft">
        <div class="div-over1"><div class="span1"></div></div>
        <div class="div-over2"><div class="span1"></div></div>
        <div class="div-over3"><div class="span1"></div></div>
    </div>
    <div class="col-md-4 xright">
        <form id="form1" runat="server">
            <div class="row xrow my-log">
                <div class="logo"></div>
            </div>
            <div class="row xrow my-log">
		        <div class="company_name">
                    <asp:Label ID="lblProgramName" runat="server"></asp:Label>
		        </div>
            </div>
            <hr />
            <div class="row xrow my-log">
                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                    <input type="text" id="username" runat="server" class="form-control" placeholder="Username" required autofocus />
                </div>
            </div>
            <div class="row xrow my-log">
                <div class="input-group input-group-height">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                    <input type="password" id="Password" runat="server" class="form-control" placeholder="Password" required />
                </div>
            </div>
            <div class="row xrow my-log">
                <asp:Button ID="LoginButton" runat="server" Text="Sign in" class="btn btn-primary btn-block" OnClick="LoginButton_Click" />
            </div>
            <div class="row xrow failure my-log">
                <asp:Label ID="FailureText" CssClass="failure" runat="server" Text=""></asp:Label>
                <%--<asp:Literal ID="FailureText" runat="server" EnableViewState="False"></asp:Literal>--%>
            </div>
            <hr />
            
            <div class="row xrow my-log">
                <input type="text" id="txtConstring" runat="server" class="form-control" readonly />
            </div>

            <div class="div-scroll">
                <a href="#top"><i class="glyphicon glyphicon-triangle-top"></i></a>
            </div>

            <div id="footer">
                <div class="login-footer-pad"><%--login-footer-height --%>
                    <center><small><asp:Label ID="lblVersion" runat="server"></asp:Label></small></center>
                </div>
            </div>
        </form>
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="bower_components/slick/slick.js"></script>

    <script type="text/javascript">
        $('.xleft').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 2000,
        });

        $("a[href='#top']").click(function() {
          $("html, body").animate({ scrollTop: 0 }, "slow");
          return false;
        });

        $(document).scroll(function () {
            var y = $(this).scrollTop();
            if (y > 100) {
                $('.div-scroll').fadeIn();
            } else {
                $('.div-scroll').fadeOut();
            }

        });
    </script>
</body>
</html>
