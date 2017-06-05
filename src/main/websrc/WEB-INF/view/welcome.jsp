<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>


<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>河南移动OA手机办公管理平台首页</title>  
    <script src="${ctx}/js/echarts-all.js" type="text/javascript"></script>
    <script type="text/javascript">    
		$(function () {
			$("#userName").html($("#userName",parent.document).val());
			$("#orgName").html($("#orgName",parent.document).val());
			$("#phone").html($("#phone",parent.document).val());
			$("#headUrl").attr("src",$("#logo",parent.document).attr("src"));
			//--- 饼 ---
			var myChart = echarts.init(document.getElementById('scheduling'));
			var labelTop = {
				normal : {
					label : {
						show : true,
						position : 'center',
						formatter : '{b}',
						textStyle: {
							baseline : 'bottom'
						}
					},
					labelLine : {
						show : false
					}
				}
			};
			var labelFromatter = {
				normal : {
					label : {
						formatter : function (params){
							return 100 - params.value + '%'
						},
						textStyle: {
							baseline : 'top'
						}
					}
				}
			};
			var labelBottom = {
				normal : {
					color: '#eee',
					label : {
						show : true,
						position : 'center'
					},
					labelLine : {
						show : false
					}
				},
				emphasis: {
					color: 'rgba(0,0,0,0)'
				}
			};
			var radius = [20, 30];
			myChart.setOption({
				legend: {
					x : 'center',
					y : '88%',
					data:[
						'A','B','C','D'
					]
				},
				title : {
					//text: 'The App World',
					//subtext: 'from global web index',
					//x: 'center'
				},
				//toolbox: {
				//	show : true,
				//	feature : {
				//		dataView : {show: true, readOnly: false},
				//		magicType : {
				//			show: true, 
				//			type: ['pie', 'funnel'],
				//			option: {
				//				funnel: {
				//					width: '20%',
				//					height: '30%',
				//					itemStyle : {
				//						normal : {
				//							label : {
				//								formatter : function (params){
				//									return 'other\n' + params.value + '%\n'
				//								},
				//								textStyle: {
				//									baseline : 'middle'
				//								}
				//							}
				//						},
				//					} 
				//				}
				//			}
				//		},
				//		restore : {show: true},
				//		saveAsImage : {show: true}
				//	}
				//},
				series : [
					{
						type : 'pie',
						center : ['10%', '45%'],
						radius : radius,
						x: '0%', // for funnel
						y: '55%',
						itemStyle : labelFromatter,
						data : [
							{name:'other', value:46, itemStyle : labelBottom},
							{name:'A', value:54,itemStyle : labelTop}
						]
					},
					{
						type : 'pie',
						center : ['35%', '45%'],
						radius : radius,
						x:'20%', // for funnel
						y: '55%',
						itemStyle : labelFromatter,
						data : [
							{name:'other', value:56, itemStyle : labelBottom},
							{name:'B', value:44,itemStyle : labelTop}
						]
					},
					{
						type : 'pie',
						center : ['60%', '45%'],
						radius : radius,
						x:'40%', // for funnel
						y: '55%',
						itemStyle : labelFromatter,
						data : [
							{name:'other', value:65, itemStyle : labelBottom},
							{name:'C', value:35,itemStyle : labelTop}
						]
					},
					{
						type : 'pie',
						center : ['85%', '45%'],
						radius : radius,
						x:'60%', // for funnel
						y: '55%',
						itemStyle : labelFromatter,
						data : [
							{name:'other', value:70, itemStyle : labelBottom},
							{name:'D', value:30,itemStyle : labelTop}
						]
					}
				]
			});
			//--- 日志登陆 ---
			//--- 操作 ---
			//待办个数
			//zjs.cmd({
			//	cmd:"action/myProcess/queryMyTaskCount",
			//	callback:function(data){
			//		$("#task").html(data);
			//		//if(data>0){					
			//			//$("<font class='todo'></font>").insertBefore(".left_menu span#aboutMe i.i_right");
			//			//$("#processTask").parent("li").append("<font class='todo'>"+data+"</font>");
			//			//$("#processTask").trigger("click");
			//		//}
			//	}
			//});
			////申请个数
			//zjs.cmd({
			//	cmd:"action/myProcess/queryMyApplyCount",
			//	callback:function(data){
			//		$("#apply").html(data);
			//		//if(data>0){					
			//			//$("<font class='todo'></font>").insertBefore(".left_menu span#aboutMe i.i_right");
			//			//$("#processTask").parent("li").append("<font class='todo'>"+data+"</font>");
			//			//$("#processTask").trigger("click");
			//		//}
			//	}
			//});
			////草稿个数
			//zjs.cmd({
			//	cmd:"action/myProcess/queryMyDraftCount",
			//	callback:function(data){
			//		$("#draft").html(data);
			//		//if(data>0){					
			//			//$("<font class='todo'></font>").insertBefore(".left_menu span#aboutMe i.i_right");
			//			//$("#processTask").parent("li").append("<font class='todo'>"+data+"</font>");
			//			//$("#processTask").trigger("click");
			//		//}
			//	}
			//});
			////近期归档文件获取个数
			//zjs.cmd({
			//	cmd:"action/document/getDocumentNumber",
			//	callback:function(data){
			//		$("#excel").html(data.excel);
			//		$("#folder").html(data.folder);
			//		$("#word").html(data.word);
			//	}
			//});
			//--- 操作 ---
			//图表  
			var psLineChar = echarts.init(document.getElementById('hostoperate2'));  
			//查询  
			function loadDrugs() {  
				psLineChar.clear();  
				psLineChar.showLoading({text: '正在努力的读取数据中...'}); 
				//zjs.cmd({
				//	cmd:"action/chart/chart/getChangeBarh",
				//	para:{},
				//	callback:function(data){	
				//		psLineChar.setOption($.evalJSON(data.Dates), true);  
				//		psLineChar.hideLoading(); 
				//	}
				//});
			}  
			//载入图表  
			loadDrugs();
			//图表  
			var psLineChar3 = echarts.init(document.getElementById('hostoperate3'));  
			//查询  
			function loadDrugs3() {  
				psLineChar3.clear();  
				psLineChar3.showLoading({text: '正在努力的读取数据中...'}); 
				//zjs.cmd({
				//	cmd:"action/chart/chart/getChangePie",
				//	para:{},
				//	callback:function(data){	
				//		psLineChar3.setOption($.evalJSON(data.Dates), true);  
				//		psLineChar3.hideLoading(); 
				//	}
				//});
			}  
			//载入图表  
			loadDrugs3();
			//图表  
			var psLineChar4 = echarts.init(document.getElementById('hostoperate4'));  
			//查询  
			function loadDrugs4() {  
				psLineChar4.clear();  
				psLineChar4.showLoading({text: '正在努力的读取数据中...'}); 
				//zjs.cmd({
				//	cmd:"action/chart/chart/getChange",
				//	para:{},
				//	callback:function(data){	
				//		psLineChar4.setOption($.evalJSON(data.Dates), true);  
				//		psLineChar4.hideLoading(); 
				//	}
				//});
			}  
			//载入图表  
			loadDrugs4();
		});			
    </script>
	<style type="text/css">
	.dialog{width:32%;#width:28%;*width:28%;margin:20px 0px 0px 1%;position:relative;float:left;min-height:145px;overflow:hidden;border:1px solid #eee;bakcground:#fff;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-moz-box-shadow:0 2px 3px #eee;-webkit-box-shadow:0 2px 3px #eee;box-shadow:0 2px 3px #eee;}
	/**user**/
	.dialog_user{padding:20px 0px 0px 0px;position:relative;}
	.dialog_user a{color:#0080FF;}
	.dialog_user a:hover{text-decoration:none;}
	.dia_i{color:#b7dbfe;width:54px;height:54px;display:inline-block;border:2px solid #fff;vertical-align:middle;margin-right:8px;-moz-border-radius:50%;-webkit-border-radius:50%;border-radius:50%;-moz-box-shadow:0 2px 3px #ddd;-webkit-box-shadow:0 2px 3px #ddd;box-shadow:0 2px 3px #ddd;}
	.dia_user{font-size:16px;display:inline-block;vertical-align:middle;color:#555;font-weight:normal;position:absolute;left:65px;top:26px;}
	.dia_bottom{width:100%;border-top:1px solid #eee;position:absolute;z-index:6;bottom:0px;white-space: nowrap;left:0px;}
	.dia_bottom a{width:33%;#width:32%;*width:32%;border-right:1px solid #eee;text-align:center;float:left;line-height:42px;color:#999;font-size:12px;}
	.dia_bottom a b{color:#0080FF;padding:0px 5px;}
	.dia_bottom a.last_a{border:0px none;width:34%;#width:33%;*width:33%;}
	.dia_bottom a:hover{background:#f8f8f8;color:#0080FF;text-decoration:none;}
	/**file**/
	.dialog_file{padding:12px 10px 0px 15px;}
	a.dia_tit{display:inline-block;color:#55666d;}
	a.dia_tit:hover{color:#0080FF;text-decoration:none;}
	.dia_file{width:100%;padding:20px 0px 0px;display:inline-block;height:88px;}
	.dia_file a{width:33%;text-align:center;float:left;}
	.dia_file a i{width:50px;height:50px;display:inline-block;line-height:26px;font-size:30px;padding:10px;*height:30px;color:#fff;background:#7cbcfc;-moz-border-radius:50%;-webkit-border-radius:50%;border-radius:50%;}
	.dia_file a span{width:100%;text-align:center;display:inline-block;padding-top:10px;color:#999;}
	.dia_file a b{color:#0080FF;padding:0px 5px;}
	.dia_file a:hover{text-decoration:none;}
	.dia_file a.excel i{background:#7cc987;}
	.dia_file a.excel b{color:#34AB46;}
	.dia_file a.folder i{background:#e9d275;}
	.dia_file a.folder b{color:#f3d34e;}
	</style>
</head>
<body class="wel_body" style="background:#fff;">
<!--用户信息-->
<div class="dialog dialog_file">
<div class="dialog_user">
<img class="f50 dia_i" src="../images/users_images.png" id="headUrl"/>
<strong class="dia_user"><b id="userName">郭芙蓉</b>&nbsp;&nbsp;&nbsp;&nbsp;<font class="f12">角色－<font id="orgName">管理员</font></font>&nbsp;&nbsp;&nbsp;&nbsp;<font class="f12">电话－<font id="phone"></font></font></strong>
<a href="/blankweb/html/updatepassword.html" class="fr"><i class="iconfont">&#xe682;</i></a>
</div>
<div class="dia_bottom">
<a href="/blankweb/html/app/process/processTask.html"><i class="iconfont">&#xe658;</i>&nbsp;待办<b id="task">10</b>条</a>
<a href="/blankweb/html/app/process/processApply.html"><i class="iconfont">&#xe65d;</i>&nbsp;申请<b id="apply">0</b>条</a>
<a href="/blankweb/html/app/process/processDraft.html" class="last_a"><i class="iconfont">&#xe6b4;</i>&nbsp;草稿<b id="draft">0</b>条</a>
</div>
</div>
<!--近期归档文件-->
<div class="dialog dialog_file">
<a href="#" class="dia_tit"><i class="iconfont">&#xe64c;</i>&nbsp;&nbsp;<b>近期归档文件</b></a>
<div class="dia_file">
<a href="#"><i class="iconfont">&#xe6db;</i><span>word归档<b id="word">12</b>个</span></a>
<a class="excel" href="#"><i class="iconfont">&#xe6da;</i><span>excel归档<b id="excel">12</b>个</span></a>
<a class="folder" href="#"><i class="iconfont">&#xe64c;</i><span>文件夹创建<b id="folder">12</b>个</span></a>
</div>
</div>
<!--作业调度执行情况-->
<div class="dialog dialog_file">
<a href="#" class="dia_tit"><i class="iconfont">&#xe612;</i>&nbsp;&nbsp;<b>作业调度执行情况</b></a>
<div id="scheduling" style="height:100px;"></div>
</div>
<!--主机操作日志趋势-->
<div class="dialog dialog_file">
<a href="#" class="dia_tit"><i class="iconfont">&#xe649;</i>&nbsp;&nbsp;<b>OA人员每日同步类型分布</b></a>
<div id="hostoperate2" style="height:350px;"></div>
</div>
<div class="dialog dialog_file">
<a href="#" class="dia_tit"><i class="iconfont">&#xe649;</i>&nbsp;&nbsp;<b>OA人员变更日志总量占比</b></a>
<div id="hostoperate3" style="height:350px;"></div>
</div>
<div class="dialog dialog_file">
<a href="#" class="dia_tit"><i class="iconfont">&#xe649;</i>&nbsp;&nbsp;<b>OA人员变更趋势分布</b></a>
<div id="hostoperate4" style="height:350px;"></div>
</div>
</body>
</html>
