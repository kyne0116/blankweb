<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>登录--管理平台</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href="${ctx}/iconfont/iconfont.css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="${ctx}/js/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/js/themes/icon.css">
    <link rel="stylesheet" href="${ctx}/css/public.css" type="text/css" />
    <link rel="stylesheet" href="${ctx}/css/login.css" type="text/css" />
    <script src="${ctx}/js/jquery.min.js" type="text/javascript"></script>
    <script src="${ctx}/js/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="${ctx}/js/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            $(".input_btn").click(function () {
                if ($("#username").val() == "" || $("#password").val() == "") {
                    if ($("#username").val() == "") {
                        //alert("请输入用户名！");
						$.messager.alert("提示信息","请输入用户名！", 'error');
                    } else {
                        if ($("#password").val() == "")
                            //alert("请输入密码！");
							$.messager.alert("提示信息","请输入密码！", 'error');
                    }
                } else {
					$.ajax({
						url:"login/submit",
						type:"POST",
						data:{"username":$("#username").val(),"password":hex_md5($("#password").val())},
						success:function(data){
							if(data.responseid==1){
								window.location.href = "${ctx}/action/";
							}else{
								$.messager.alert("提示信息",data.message, 'error');
							}
						},error:function(data){
							if(data.responseText.indexOf("登录")>-1){
								window.location.href="${ctx}/action/login";
							}else{
								$.messager.alert("提示信息","登录失败", 'error');
							}
						}
					});
                }
            });
            $("input").keydown(function (e) {
                if (e.keyCode == 13) {
                    $(".input_btn").trigger("click");
                }
            });
        });
    </script>
</head>
<body>
<form id="login" method="POST" >
<strong>用户登录&nbsp;/&nbsp;User&nbsp;Login</strong>
username<input id="username" name="username" value="${username}" type="text">
password<input id="password" name="password" value="${password}" type="password">
<a class="input_btn">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
</form>
</body>
</html>