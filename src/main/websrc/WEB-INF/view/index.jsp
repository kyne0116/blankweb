<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>管理平台</title>  
    <script type="text/javascript">
        $(function () {	
			$.ajax({//获取自己可以显示的菜单
                url: "admin/authority/syspermission/getMenu",
				type:"post",
                success: function (datas) {
                    var userinfo = datas.data.shiroUser;
                    $(".userName").text(userinfo.userName);
					if(userinfo.headUrl){
						$("#logo").attr("src", '${ctx}/' + userinfo.headUrl);
					}
					$(".orgName").html(userinfo.orgName);
					$("#userCode").val(userinfo.userCode);
					$("#roleIds").val(userinfo.roleIds);
					$("#userName").val(userinfo.userName);
					$("#phone").val(userinfo.phone);
					$("#orgName").val(userinfo.orgName);
            
                    //for (var datai in data.Datas) {
                    //    if (data.Datas[datai].icon == null) data.Datas[datai].icon = "";
					//	if(data.Datas[datai].parentId && data.Datas[datai].parentId!=1){
					//		var html="<li><a id='"+data.Datas[datai].name+"' path='"+data.Datas[datai].url+"'>"+data.Datas[datai].description+"</a></li>";
					//		$(html).appendTo($("#ul"+data.Datas[datai].parent.id));
					//	}else{
					//		if(data.Datas[datai].parentId!=null){
					//			var spantit="<span path='0' id='"+data.Datas[datai].name+"'><i class='i_left'></i>"+data.Datas[datai].description+"<i class='i_right "+data.Datas[datai].icon+"'></i></span><ul id='ul"+data.Datas[datai].id+"'></ul>";
					//			$(spantit).appendTo($(".left_menu"));
					//		}
					//	}
                    //}
					//打开首页计算高度
					$(".right").css("width", $(window).width() - 218);
					calculateHeight();
					$(".top_left").css("width", ($(".top").width() - $(".top_right").width() - 21));
					//菜单事件
				$(".nav1 a").on("click",function (e) {
					var path = $(this).attr("path");
					//为空表示有多级菜单
					var $sib = $(this).parent().siblings();
					$(".nav1 a").removeClass("a_active");
					$sib.children("a").removeClass("a_hover").children("i.down").html("&#xe673;");
					$sib.children("ul").hide();
					$(this).addClass("a_active a_hover");
					if (path != "") {
						$(this).parents("ul").prev("a").addClass("a_hover");
						//if ($("#li_" + $(this).attr("id")).length > 0) {
						//	//$(".left_menu a").removeClass("a_hover");
						//	//$(this).addClass("a_hover");
		                //
						//	$("#li_" + $(this).attr("id")).addClass("li_hover").siblings().removeClass("li_hover");
						//	$("#li_" + $(this).attr("id") + "_if").show().siblings().hide();
						//	$(".right_tit li i").removeClass("i_color");
						//	$("#li_" + $(this).attr("id") + " i").addClass("i_color");
		                //
						//	$("#li_" + $(this).attr("id")).insertAfter("#li_hy");							
						//	var tourl = path + (path.indexOf("?") > 0 ? "&" : "?") + "tm=" + (new Date()).getTime();
						//	$("#li_" + $(this).attr("id") + "_if").insertAfter("#li_hy_if").attr("src","${ctx}/" +tourl);
						//}
						//else {
						//	//$(".left_menu a").removeClass("a_hover");
						//	//$(this).addClass("a_hover");
						//	$(".right iframe").hide();
						//	//IE6、IE7样式
						//	if ($.support.msie) {//($.browser.msie && ($.browser.version == "6.0") && !$.support.style) || ($.browser.msie && ($.browser.version == "7.0"))
						//		$("<li id='li_" + $(this).attr("id") + "' class='li_hover'><i class='iconfont i_color'>&#xe690;</i><b>" + $(this).children("font").text() + "</b></li>").insertAfter("#li_hy");
						//		$("#li_" + $(this).attr("id")).css("width", ($(this).children("font").text().length) * 18 + 15);
						//	} else {
						//		$("<li id='li_" + $(this).attr("id") + "' class='li_hover'>" + $(this).children("font").text() + "<i class='iconfont i_color'>&#xe690;</i></li>").insertAfter("#li_hy");
						//	}
						//	$("#li_" + $(this).attr("id")).addClass("li_hover").siblings().removeClass("li_hover");
						//	$(".right_tit li i").removeClass("i_color");
						//	$("#li_" + $(this).attr("id") + " i").addClass("i_color");
							var url = $(this).attr("path");
							var tourl = url + (url.indexOf("?") > 0 ? "&" : "?") + "tm=" + (new Date()).getTime();
							//$("<iframe id='li_" + $(this).attr("id") + "_if' src='${ctx}/" + tourl + "' frameborder='0'></iframe>").insertAfter("#li_hy_if");
							$("#rightiframe").attr("src","${ctx}/" + tourl);
						//}
					} else {
						$(this).children("i.down").html("&#xe674;");
						var $nextli = $(this).next("ul").children("li");
						$nextli.children("ul").hide();
						$nextli.children("a").removeClass("a_hover").children("i.down").html("&#xe674;");
						$next = $(this).next("ul");
						$next.slideDown(600, function () {
							$next.show();
						});
					}
					e.stopPropagation();
				});
					//点击设置和修改密码
					$(".top_right i").on("click", function (e) {
						if ($(this).attr("path") != null) {
							//if ($("#li_" + $(this).attr("id")).length > 0) {
							//	$("#li_" + $(this).attr("id")).trigger("click");
							//	$("#li_" + $(this).attr("id")).insertAfter("#li_hy");
							//	
							//	var path = $(this).attr("path");						
							//	var tourl = path + (path.indexOf("?") > 0 ? "&" : "?") + "tm=" + (new Date()).getTime();
							//	$("#li_" + $(this).attr("id") + "_if").insertAfter("#li_hy_if").attr("src","${ctx}/" +tourl);
							//}
							//else {
							//	$(".right_nr iframe").hide();
							//	//$("<li id='li_" + $(this).attr("id") + "' class='li_hover'>" + $(this).attr("title") + "<i class='iconfont i_color'>&#xe690;</i></li>").insertAfter("#li_hy");
							//	//IE6、IE7样式
							//	if ($.browser.msie) {
							//		$("<li id='li_" + $(this).attr("id") + "' class='li_hover'><i class='iconfont i_color'>&#xe690;</i><b>" + $(this).attr("title") + "</b></li>").insertAfter("#li_hy");
							//		$("#li_" + $(this).attr("id")).css("width", ($(this).attr("title").length) * 18 + 15);
							//	} else {
							//		$("<li id='li_" + $(this).attr("id") + "' class='li_hover'>" + $(this).attr("title") + "<i class='iconfont i_color'>&#xe690;</i></li>").insertAfter("#li_hy");
							//	}
							//	$("#li_" + $(this).attr("id")).addClass("li_hover").siblings().removeClass("li_hover");
							//	$(".right_tit li i").removeClass("i_color");
							//	$("#li_" + $(this).attr("id") + " i").addClass("i_color");
							//	$(".right iframe").hide();
								var url = $(this).attr("path");
								var tourl = url + (url.indexOf("?") > 0 ? "&" : "?") + "tm=" + (new Date()).getTime();
								//$("<iframe id='li_" + $(this).attr("id") + "_if' src='${ctx}/" + tourl + "' frameborder='0'></iframe>").insertAfter("#li_hy_if");
								$("#rightiframe").attr("src","${ctx}/" + tourl);
							//}
							e.stopPropagation();
						}
					});
					//单击右侧顶部菜单选项
					//$(".right_tit li").on("click", function () {	
					//	$(".nav1 a").removeClass("a_hover");
					//	$(".nav1 a#" + $(this).attr("id").substr(3)).addClass("a_hover");
					//	$(".nav1 li ul").hide();
					//	$(".nav1 a#" + $(this).attr("id").substr(3)).parents("ul").show();
					//	$(".nav1 a#" + $(this).attr("id").substr(3)).parents("ul").prev().addClass("a_hover");
					//	$(this).addClass("li_hover").siblings().removeClass("li_hover");
					//	$(".right_tit li i").removeClass("i_color");
					//	$("#" + $(this).attr("id") + " i").addClass("i_color");
					//	$("#" + $(this).attr("id") + "_if").show().siblings().hide();	
					//	$(".nav1 a#" + $(this).attr("id").substr(3)).trigger("click");
					//});
					//单击右侧顶部菜单关闭按钮
					//$(".right_tit li i").on("click", function (e) {
					//	if ($(".right iframe:visible").attr("id") == $(this).parent().attr("id") + "_if") {
					//		if ($(this).parent().next().length > 0) {
					//			$(this).parent().next().trigger("click");
					//		}
					//		else if ($(this).parent().prev().length > 0) {
					//			$(this).parent().prev().trigger("click");
					//		}
					//	}
					//	$(this).parent().remove();
					//	$("#" + $(this).parent().attr("id") + "_if").remove();
					//	e.stopPropagation();
					//});
				}
            });
        });
        //计算高度
        function calculateHeight() {
            //var a = $(".left").height();
            var a = 335;
            var b = $(".right").height();
            var c = $(window).height() - 85;
            if (c < a || c < b) {
                if (a < b) {
                    $(".center").css("height", b);
                    $(".left").css("height", b);
                    $(".left_menu").css("height", b-10);
                    $(".right").css("height", b);
					$("#rightiframe").css("height", b-10);
                } else {
                    $(".center").css("height", a);
                    $(".left").css("height", a);
                    $(".left_menu").css("height", a-10);
                    $(".right").css("height", a);
					$("#rightiframe").css("height", a-10);
                }
            } else {
                $(".center").css("height", c);
                $(".left").css("height", c);
                $(".left_menu").css("height", c-10);
                $(".right").css("height", c);
				$("#rightiframe").css("height", c-10);
            }
        };
        $(window).resize(function () {
            $(".right").css("width", $(window).width() - 218);
            calculateHeight();
            $(".top_left").css("width", ($(".top").width() - $(".top_right").width() - 21));
        });	
    </script>
</head>
<body>
<!--top-->
<div class="top">
<div class="top_left">
<div class="top_left_top"><a href=""><img class="fl" src="${ctx}/images/logo.png" /></a><h1 class="fl">管理平台</h1></div>
</div>
<div class="top_right">
     <!-- <img id="logo" src="${ctx}/images/users_images.png" />-->
    <strong><font class="userName"></font>（<font class="orgName"></font>）</strong>    
	<input id="userCode" type="hidden"/><input id="roleIds" type="hidden"/><input id="userName" type="hidden"/><input id="phone" type="hidden"/><input id="orgName" type="hidden"/>
    <!--  <i class="iconfont" id="setup" path="setup.html" title="设置">&#xe62f;</i><span></span>-->
	<i class="iconfont" id="home" path="/action/welcome" title="首页">&#xe691;</i><span></span>
    <i class="iconfont" id="password" path="/html/updatepassword.html" title="修改密码">&#xe682;</i><span></span>
    <a href="${ctx}/action/logout" title="退出"><i class="iconfont" id="exit">&#xe68a;</i></a>
</div>
</div>
<!--center-->
<div class="center">
<!--left-->
<div class="left">
<div class="left_menu">
<ul class="nav1">
    <li class="work">
        <a path=""><i class="fr iconfont down">&#xe673;</i><i class="fl iconfont">&#xe649;</i><font>我的工作</font></a>
        <ul class="nav2">
			<li><a id="processTask" path="html/app/process/processTask.html"><i class="fl iconfont">&#xe604;</i><font>我的待办</font></a></li>
			<li><a id="processJoin" path="html/app/process/processJoin.html"><i class="iconfont">&#xe604;</i><font>我的已办</font></a></li>
			<li><a id="processApply" path="html/app/process/processApply.html"><i class="iconfont">&#xe604;</i><font>我的申请</font></a></li>
			<li><a id="processDraft" path="html/app/process/processDraft.html"><i class="iconfont">&#xe604;</i><font>我的草稿</font></a></li>
        </ul>
    </li>
    <!--
	<li class="work"><a id="dataAllList" path="html/apply/dataAllList.html"><i class="fl iconfont">&#xe645;</i><font>用户数据统计</font></a></li>-->
    <li class="work">
        <a path=""><i class="fr iconfont down">&#xe673;</i><i class="fl iconfont">&#xe637;</i><font>系统管理</font></a>
        <ul class="nav2">
			<li>
                <a path=""><i class="fr iconfont down">&#xe673;</i><i class="fl iconfont">&#xe604;</i><font>组织架构</font></a>
                <ul class="nav3">
					<li><a id="sysOrgList" path="html/sysorg/sysOrgList.html"><i class="fl iconfont">&#xe656;</i><font>组织信息</font></a></li>
					<li><a id="sysUserList" path="html/sysuser/sysUserList.html?userType=0"><i class="fl iconfont">&#xe656;</i><font>用户信息</font></a></li>
					<li><a id="sysRoleList" path="html/sysrole/sysRoleList.html"><i class="fl iconfont">&#xe656;</i><font>角色信息</font></a></li>
					<li><a id="sysAuthorizationList" path="html/sysauthorization/sysAuthorizationList.html"><i class="fl iconfont">&#xe656;</i><font>授权管理</font></a></li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
</div>
</div>
<!--right-->
<div class="right">
<iframe id="rightiframe" src="${ctx}/action/welcome" frameborder="0" scrolling="auto"></iframe>
</div>
</div>
</body>
</html>
