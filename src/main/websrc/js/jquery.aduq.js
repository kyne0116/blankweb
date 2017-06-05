//声明字典命名空间
if(!window.web){ web={}; }
if(!window.dictionary){ dictionary={}; }
if(!window.dictionarys){ dictionarys={}; }
var btn_sure=1;
var aonclick={};
web.rootdir="/blankweb/";
//加载表格
function loadGrid(pageparam) {
	/**模糊查询
	var search_txt = "";
	for (var i = 0; i <= $(".search_txt").length; i++) {
		if ($(".search_txt:eq(" + i + ")").val())
			search_txt += $(".search_txt:eq(" + i + ")").val() + ",";
	}
	search_txt = search_txt.substr(0, search_txt.length - 1);
	$(".search_txt").val("");//如果点击查询后不想清空文本框可以把这一句删除
	**/
	if(pageparam.dialogform){
		$(pageparam.dialogform.dialogid).dialog("close");//关闭对话框
	}
	if(pageparam.dialoglisttable){
		$(pageparam.dialoglisttable.dialogid).dialog("close");//关闭对话框
	}
	var tableopts={
        method: "post",//请求远程数据的 method 类型,默认post
        striped: true,//奇偶行使用不同背景色,默认false
		nowrap:true,//把数据显示在一行里,默认true
        collapsible: true,//表格可折叠
        //url: pageparam.listtable.querycmd,//"从远程站点请求数据的URL，模糊查询例子：${path}/sys/shdstOrderAjax?search_txt="+search_txt
        //sortName: "lastUpdateTime",//定义可以排序的列
        //sortOrder: "desc",//定义列的排序顺序，只能用asc(默认)或desc
        remoteSort: false,//是否从服务器给数据排序,默认true
        idField: "id",//标识字段
        checkOnSelect:false,//true点击当行有效，false点击复选框有效
        fitColumns: false,//自动扩大或缩小列的尺寸以适应表格的宽度并且防止水平滚动,默认false
        frozenColumns: pageparam.listtable.frozenColumns,
        columns: pageparam.listtable.columns,
		onLoadSuccess:function(data){//在数据加载成功的时候触发
			if(data.responseid==200){//登录超时
				top.location.href=web.rootdir+"action/login";
			}
			if(data.responseid==0){
				//$.messager.show({
				//	title:"提示信息",
				//	msg:data.message,
				//	timeout:2500,
				//	showType:"slide",
				//	style:{
				//		right:'',
				//		top:10,
				//		bottom:''
				//	}
				//});
				$.messager.alert("提示信息",data.message, 'error');
			}else{
				if(pageparam.listtable.onLoadSuccess){
					eval(pageparam.listtable.onLoadSuccess(data));
				}
			}
	    },
		onLoadError:function(){//在载入远程数据产生错误的时候触发
			top.location.href=web.rootdir+"action/login";
			$.messager.alert("提示信息","操作失败", 'error');
		},
        pagination: true,//在 datagrid 的底部显示分页栏
        rownumbers: true//显示行号
    };
	if(pageparam.listtable.contentType){
		tableopts.contentType=pageparam.listtable.contentType;//传值方式
	}
	if(!pageparam.listtable.noload){//是否默认查询数据
		if(pageparam.listtable.querycmd){
			tableopts.url=web.rootdir+pageparam.listtable.querycmd;//查询命令
		}else{
			if(pageparam.listtable.data){
				tableopts.data=pageparam.listtable.data;//如果不用查询数据直接设置data也可以
			}
		}
	}
	if(pageparam.listtable.queryParams){
		tableopts.queryParams=pageparam.listtable.queryParams;//传额外值
	}
	if(pageparam.listtable.nowrap+""){
		tableopts.nowrap=pageparam.listtable.nowrap;//把数据显示在一行里
	}
	if(pageparam.listtable.toolbar){
		tableopts.toolbar=pageparam.listtable.toolbar;//新增按钮
	}
	if(pageparam.listtable.footer){
		tableopts.footer=pageparam.listtable.footer;//底部栏，一般用来放合计
	}
    $(pageparam.listtable.listname).datagrid(tableopts);
	var pageopts={
		pageSize: 10,//每页显示的记录条数，默认为10  
		pageList: [10, 20, 30, 40],//可以设置每页记录条数的列表  
		beforePageText: "第",//页数文本框前显示的汉字  
		afterPageText: "页    共 {pages} 页",
		displayMsg: "当前显示 {from} - {to} 条记录，共 {total} 条记录"
	};
	if(pageparam.listtable.pagerbar){
		pageopts.buttons=pageparam.listtable.pagerbar;//分页栏加按钮
	}
	var p = $(pageparam.listtable.listname).datagrid("getPager");//返回页面对象
	$(p).pagination(pageopts);
	if(pageparam.dialogform){//初始化form表单的文件上传控件
		$(pageparam.dialogform.formname).find("input.cselectorImageUpload").each(function(i,v){
			initfileupload($(v));
		});
	}
	if(!aonclick[pageparam.listtable.listname]){//为防止重复绑定a标签
		aonclick[pageparam.listtable.listname]=1;
		//条件搜索
		$(pageparam.listtable.listname + "QueryForm").on("click", ".searchtable", function () {
			var listnameF=$(this).parents("form").attr("id");
			var listname=listnameF.replace("QueryForm","");//.substr(0,listnameF.length-9);
			var params = $("#"+listname).datagrid("options").queryParams;//先取得 datagrid 的查询参数
			if(pageparam.listtable.noload){//是否默认查询数据
				$("#"+listname).datagrid("options").url=web.rootdir+pageparam.listtable.querycmd;//接口命令
			}
			if ($("#" + listnameF).form("validate")) {//查询条件需要校验
			    if (pageparam.listtable.searchvalidate) {//遇到奇葩检验需要单独写时请加searchvalidate，为一个函数必须返回值true或者false
			        if (eval(pageparam.listtable.searchvalidate())) {//只有奇葩校验规则返回值为true时才查询
			            searchtable(listnameF,listname,params);
			        }
			    }else{
			        searchtable(listnameF,listname,params);
				}
			}else{
				$.messager.alert("提示信息","查询条件校验失败！", 'warning');
			}
		});
		var listtable=pageparam.listtable.listname.substr(1,pageparam.listtable.listname.length-1);
		//删除单条数据
		$("."+listtable).on("click","a[delete]",function(){
			var $t=$(this);
			var id=$t.attr("deleteid");
			var url=$t.attr("delete");
			$.messager.confirm("删除","确定删除吗？",function(r){
				if(r){
					var ajaxopts={
						url:url,
						data:{"id":id},
						success:function(data){
							$.messager.show({
								title:"提示信息",
								msg:data.message,
								timeout:800,
								showType:"slide",
								style:{
									right:'',
									top:10,
									bottom:''
								}
							});
							$(pageparam.listtable.listname).datagrid("reload").datagrid("unselectAll");//刷新table
						}
					};
					if($t.attr("contentType")){
						ajaxopts.contentType=$t.attr("contentType");
					}
					web.ajaxgeneral(ajaxopts);
				}
			});
		});
		//批量删除数据参考sysUserList.html
		if(pageparam.listtable.deleteall){
			$("."+listtable).on("click","a#"+pageparam.listtable.deleteall.id,function(){
				var datas=$(pageparam.listtable.listname).datagrid("getChecked");
				var ids=[];
				for(var i in datas){
					ids.push(datas[i].id);
				}
				if(ids.length>0){
					$.messager.confirm("删除","确定删除吗？",function(r){
						if(r){
							var ajaxopts={
								url:pageparam.listtable.deleteall.url,
								data:ids,
								success:function(data){
									$.messager.show({
										title:"提示信息",
										msg:data.message,
										timeout:800,
										showType:"slide",
										style:{
											right:'',
											top:10,
											bottom:''
										}
									});
									$(pageparam.listtable.listname).datagrid("reload").datagrid("unselectAll");//刷新table
								}
							};
							if(pageparam.listtable.deleteall.contentType){
								ajaxopts.contentType=pageparam.listtable.deleteall.contentType;
							}
							web.ajaxgeneral(ajaxopts);
						}
					});
				}else{
					$.messager.alert("提示信息","请选择要删除的行！", 'info');
				}
			});
		}
		//打开新增或修改对话框
		$("."+listtable+","+pageparam.listtable.listname + "QueryForm").on("click","a.showDialog",function(){
			$(pageparam.listtable.listname).datagrid("unselectAll");//取消选择所有当前页中所有的行
			$(pageparam.dialogform.formname).form("reset").find("input").removeClass("validatebox-invalid");//把对话框里面的值重置
			$(pageparam.dialogform.formname).find("input.cselectorImageUpload").each(function(i,v){//重置form之后文件上传控件变形或者重置
				$(v).trigger("change");
			});
			//重置form之后如果下拉框有需要特殊处理就特殊处理一下
			$(pageparam.dialogform.formname).find("select.easyui-combobox").each(function(i,v){
				if($(v).attr("conchange")){//赋值之后对其他影响
					if ($(v).attr("conchange").indexOf("()") > -1)
						eval($(v).attr("conchange").replace("()", "") +"('"+$(v).val()+"')");
					else
						eval($(v).attr("conchange")+"('"+$(v).val()+"')");
				}
			});
			var index=parseInt($(this).attr("showDialogindex"));
			if(index>=0){
				//如果是修改就给对话框传要修改的记录数据
				$(pageparam.listtable.listname).datagrid("selectRow", index);//选择一行，行索引从0开始
				var row = $(pageparam.listtable.listname).datagrid("getSelected");//返回第一个被选中的行或如果没有选中的行则返回null
				if(row){
					//数据赋值之前要干什么
					if($(pageparam.dialogform.formname).attr("beforerender")){
						if ($(pageparam.dialogform.formname).attr("beforerender").indexOf("()") > -1)
							eval($(pageparam.dialogform.formname).attr("beforerender").replace("()", "(row,true)"));
						else
							eval($(pageparam.dialogform.formname).attr("beforerender")+"(row,true)");
					}
					//把取到的数据赋值到对应form表单
					for(var di in row){
						var $did=$(pageparam.dialogform.formname).find("#" + di + ",." + di);
						$did.each(function(i,v){
							switch (v.nodeName) {
								case "I"://普通i展示 i用于展示时间 前5个展示类
								case "SPAN"://普通input展示
								case "DIV"://普通textarea展示
									$(v).html(row[di]);
									break;
								case "IMG"://图片展示
									$(v).attr("src", row[di]);
									break;
								case "EMBED"://语音文件
									var urlh=window.location.href;
									var urlhz=urlh.split(web.rootdir);
									$(v).attr("src",urlhz[0]+row[di]);
									break;
								case "AUDIO"://语音文件
									var urlh=window.location.href;
									var urlhz=urlh.split(web.rootdir);
									$(v).attr("src",urlhz[0]+row[di]);
									break;
								case "A"://超链接展示
									$(v).attr("href", row[di]);
									break;
								case "TEXTAREA"://普通textarea 管理类
									$(v).val(row[di]).height($(v).height()-1);
									break;
								case "SELECT"://select管理类
									if($(v).hasClass("easyui-combobox")){
										$(v).combobox("select",row[di]+"");//+""是为了配合有true、false或者数值型数据的情况，如果是true、false或者数值型数据建议使用input转换select的方式使用
										if($(v).attr("conchange")){//赋值之后对其他影响
											if ($(v).attr("conchange").indexOf("()") > -1)
												eval($(v).attr("conchange").replace("()", "") +"('"+row[di]+"')");
											else
												eval($(v).attr("conchange")+"('"+row[di]+"')");
										}
									}else if($(v).hasClass("easyui-combogrid")){
										$(v).combogrid("setValue",row[di]+"");
									}else{
										$(v).val(row[di]+"").trigger("change");
									}
									break;
								case "INPUT"://input管理类
									if($(v).hasClass("easyui-combobox")){
										$(v).combobox("select",row[di]);
									}else if($(v).hasClass("cselectorImageUpload")){//文件上传
										$(v).val(row[di]).trigger("change");
										if($(v).attr("inputrely")){//传值依赖其他字段来判断是否显示变形，用法：inputrely="type:android"表示当type字段的值为android时隐藏变形
											var inputrely=$(v).attr("inputrely").split(":");
											if(inputrely[1].indexOf(row[inputrely[0]])>-1){
												$(v).show().next(".cselectorImageUL").hide();
											}else{
												$(v).hide().next(".cselectorImageUL").show();
											}
										}
									}else{
										$(v).val(row[di]);
									}
									break;
								default://普通input select
									$(v).val(row[di]);
									break;
							};
						});
					}
				}
			}else{
				//打开对话框之前要干什么
				if($(pageparam.dialogform.formname).attr("beforerender")){
					if ($(pageparam.dialogform.formname).attr("beforerender").indexOf("()") > -1)
						eval($(pageparam.dialogform.formname).attr("beforerender").replace("()", "({},false)"));
					else
						eval($(pageparam.dialogform.formname).attr("beforerender")+"({},false)");
				}
			}
			btn_sure=1;
			var dialogformopts={
				modal:true,//是否将窗体显示为模式化窗口
				closed:false
			};
			if(!pageparam.dialogform.dialognobutton){//判断是否需要对话框按钮
				dialogformopts.buttons=[{
						text:"确认",
						handler:function(){
							if(btn_sure==1){
								if($(pageparam.dialogform.formname).form("validate")){//表单检验是否成功
									var uploadv=1;
									$(pageparam.dialogform.formname).find("input.cselectorImageUpload").each(function(i,v){
										if($(v).attr("rule") && $(v).val()==""){
											uploadv=0;
											//alert("请"+$(v).attr("btnmsg"));
											$.messager.alert("提示信息","请"+$(v).attr("btnmsg"), 'warning');
											return false;
										}
									});
									if(uploadv==1){
										btn_sure=2;
										if($(pageparam.dialogform.formname).attr("contentType")){//设置contentType表示不用form表单方式提交，支持json和kv，设置什么就以什么方式传值
											var data={};
											$(pageparam.dialogform.formname).find("input,select,textarea").each(function(i,v){//取表单要提交的参数，以name为准，password会用md5加密
												if($(v).attr("name")){
													if($(v).attr("type")=="password"){
														data[v.name]=hex_md5(v.value);
													}else{
														data[v.name]=v.value;
													}
												}
											});
											var submitval=true;
											if(pageparam.dialogform.onSubmit){//如果提交之前需要额外传参或者其他操作可在页面上配置onSubmit函数，要求有return true;或者return false;(说明中断提交)
												submitval=eval(pageparam.dialogform.onSubmit(data));
											}
											if(submitval){
												web.ajaxgeneral({
													url:index>=0?pageparam.dialogform.updatacmd:pageparam.dialogform.insertcmd,
													contentType:$(pageparam.dialogform.formname).attr("contentType"),
													data:data,
													success:function(data){
														btn_sure=1;
														$.messager.show({
															title:"提示信息",
															msg:data.message,
															timeout:2500,
															showType:"slide",
															style:{
																right:'',
																top:10,
																bottom:''
															}
														});
														$(pageparam.dialogform.dialogid).dialog("close");//关闭对话框
														$(pageparam.listtable.listname).datagrid("reload").datagrid("unselectAll");//刷新table
													},sError:function(data){
														btn_sure=1;
													},error:function(data){
														btn_sure=1;
													}
												});
											}
										}else{//原始form表单提交方式
											var formopts={
												url:index>=0?web.rootdir+pageparam.dialogform.updatacmd:web.rootdir+pageparam.dialogform.insertcmd,
												dataType:"json",
												success:function(data){//成功
													btn_sure=1;
													data=$.evalJSON(data);
													if(data.responseid==1){
														$.messager.show({
															title:"提示信息",
															msg:data.message,
															timeout:2500,
															showType:"slide",
															style:{
																right:'',
																top:10,
																bottom:''
															}
														});
														$(pageparam.dialogform.dialogid).dialog("close");//关闭对话框
														$(pageparam.listtable.listname).datagrid("reload").datagrid("unselectAll");//刷新table
													}else{
														$.messager.alert("提示信息", data.message, 'error');
														btn_sure=1;
													}
												},error:function(data){
													if(data.responseText.indexOf("登录")>-1){
														top.location.href=web.rootdir+"action/login";
													}else{
														$.messager.alert("提示信息","操作失败", 'error');
														btn_sure=1;
													}
												}
											};
											if(pageparam.dialogform.onSubmit){
												formopts.onSubmit=pageparam.dialogform.onSubmit;
											}
											$(pageparam.dialogform.formname).form("submit",formopts);
										}
									}
								}else{//校验不成功，如果有提示信息弹出提示信息
									$(pageparam.dialogform.formname).find(".easyui-validatebox").each(function(i,v){
										if(!$(v).validatebox("isValid")){
											if($(v).attr("validatemes")){
												$.messager.alert("提示信息", $(v).attr("validatemes"), 'error');
												btn_sure=1;
											}
											return false;
										}
									});
								}
							}
						}
					},{
						text:"关闭",
						handler:function(){
							$(pageparam.dialogform.dialogid).dialog("close");
						}
					}];
			}
			$(pageparam.dialogform.dialogid).dialog(dialogformopts);
		});
		//以对话框的形式打开url路径
		$("."+listtable).on("click","a.openDialog",function(){
			if(pageparam.dialoglisttable){
				$(pageparam.listtable.listname).datagrid("unselectAll");//取消选择所有当前页中所有的行
				var dtopts={    
					//title: 'My Dialog',    
					//width: 400,    
					//height: 200,    
					closed: false,    
					cache: false,    
					modal: true,  
					queryParams:{},
					href: pageparam.dialoglisttable.dialogurl
				};
				if($(this).attr("id")){
					dtopts.queryParams[$(this).attr("idname")]=$(this).attr("id");
				}
				if(pageparam.dialoglisttable.buttons){//以对话框的形式打开页面，如果设置buttons说明对话框有按钮操作
					btn_sure=1;
					dtopts.buttons=pageparam.dialoglisttable.buttons;
				}
				$(pageparam.dialoglisttable.dialogid).dialog(dtopts);  
			}
		});
	}
};
//查询datagrid
function searchtable(listnameF,listname,params){
	var fields = $("#" + listnameF).serializeArray();//自动序列化表单元素为JSON对象
	$.each(fields, function (i, field) {
	    params[field.name] = field.value;//设置查询参数
	});
	$("#" + listname).datagrid("options").pageNumber = 1;
	$("#" + listname).datagrid("load").datagrid("unselectAll");//设置好查询参数 reload 一下就可以了
};
//email:匹配E-Mail的正则表达式规则  url:匹配URL的正则表达式规则  length[0,100]:允许在x到x之间个字符。
$.extend($.fn.validatebox.defaults.rules,{
	startDateCheck:{//开始时间跟结束时间对比，用法：validType="startDateCheck['eeDate','ssDate']"  ssDate为开始时间，eeDate为结束时间
		validator:function(value,param){
			var e=$("input[name="+param[0]+"]").val();
			if(e!=""){
				if(value<=e){
					$("input[id="+param[0]+"]").next().removeClass('textbox-invalid');
					$("input[id="+param[0]+"]").next().find("input").removeClass("validatebox-invalid");
					$("input[id="+param[1]+"]").next().removeClass('textbox-invalid');
					$("input[id="+param[1]+"]").next().find("input").removeClass("validatebox-invalid");
				}
				return value<=e;
			}else{
				return true;
			}
		},
		message:"起始时间要大于截止时间"
	},
	endDateCheck:{//结束时间跟开始时间对比，用法：validType="endDateCheck['ssDate','eeDate']"  ssDate为开始时间，eeDate为结束时间
		validator:function(value,param){
			var s=$("input[name="+param[0]+"]").val();
			if(s!=""){
				if(value>=s){
					$("input[id="+param[0]+"]").next().removeClass('textbox-invalid');
					$("input[id="+param[0]+"]").next().find("input").removeClass("validatebox-invalid");
					$("input[id="+param[1]+"]").next().removeClass('textbox-invalid');
					$("input[id="+param[1]+"]").next().find("input").removeClass("validatebox-invalid");
				}
				return value>=s;
			}else{
				return true;
			}
		},
		message:"截止时间要小于起始时间"
	},
	equals:{//验证输入是否一致，一般用于密码与重复密码（validType="equals['#password']"）password为密码的id
        validator: function(value,param){    
            return value == $(param[0]).val();    
        },    
        message:"输入不一致"   
    },
	minLength: {//validType="minLength[5]"
        validator: function(value, param){    
            return value.length >= param[0];    
        },    
        message:"至少输入 {0} 个字符"   
    },
	maxLength: {//validType="maxLength[5]"
        validator: function(value, param){    
            return value.length <= param[0];    
        },    
        message:"至多输入 {0} 个字符"   
    },
	password:{//validType="password"
		validator:function(value,param){
			return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*,.\w]{8,}$/.test(value);
		},
		message:"不能小于8位，至少包含大小写字母和数字"
	},
	isCardNo:{//validType="isCardNo"
		validator:function(value,param){
			return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value);
		},
		message:"身份证输入不合法"
	},
	phone:{//validType="phone"
		validator:function(value,param){
			return /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{7,27})((x|ext|extension)[ ]?[0-9]{1,4})?$/.test(value);
		},
		message:"无效的电话号码"
	},
	integer:{//validType="integer"
		validator:function(value,param){
			return /^[\-\+]?\d+$/.test(value);
		},
		message:"不是有效的整数"
	},
	zinteger:{//validType="zinteger"
		validator:function(value,param){
			return /^\d+$/.test(value);
		},
		message:"不是有效的正整数"
	},
	number:{//validType="number"
		validator:function(value,param){
			return /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/.test(value);
		},
		message:"无效的数字"
	},
	znumber:{//validType="znumber"
		validator:function(value,param){
			return /^(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/.test(value);
		},
		message:"无效的数字"
	},
	date:{//validType="date"
		validator:function(value,param){
			return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
		},
		message:"无效的日期，格式必需为 YYYY-MM-DD"
	},
	ipv4:{//validType="ipv4"
		validator:function(value,param){
			return /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/.test(value);
		},
		message:"无效的 IP 地址"
	},
	million:{//validType="million"
		validator:function(value,param){
			return /^\d{1,10}(?:\.\d{1,6})?$/.test(value);
		},
		message:"金额输入错误，以万元为单位保留6位小数点"
	},
	money:{//validType="money"
		validator:function(value,param){
			return /^\d{1,10}(?:\.\d{1,2})?$/.test(value);
		},
		message:"金额输入错误，以元为单位保留2位小数点"
	}
});
dictionary.sysname="oa|OA门户,plan|计划管理,budget|预算管理,hrLeave|人力资源出国护照审批,application|管理后台,car|车辆管理,ccpn|协作配合,contract|合同管理,document|档案管理,record|登陆日志,accesstoke|访问令牌,unify|统一代理,urmp|需求管理,authoriz|认证授权";
dictionary.deleteprocess="1|action/delete";
dictionary.headerurl="1|updatepassword";
//转字典
function getvals(name,val){
	if(dictionarys[name]){
		if (dictionarys[name][val])///如果字典匹配 就显示字典值
			return dictionarys[name][val];
		else
			return "";
	}else{
		var tmp = dictionary[name].split(',');
		dictionarys[name]={};
		for (var i = 0; i < tmp.length; i++) {
			var t1 = tmp[i].split('|')[0];
			var t2 = tmp[i].split('|')[1];
			dictionarys[name][t1] = t2;
		}
		if (dictionarys[name][val])///如果字典匹配 就显示字典值
			return dictionarys[name][val];
		else
			return "";
	}
};
//ajax通用
web.ajaxgeneral=function(opts){
	var ajaxpara={
		success:function(data){//成功
			if(data.responseid==1){
				opts.success(data);
			}else{
				$.messager.alert("提示信息",data.message, 'error');
				if(opts.sError){//当data.responseid=0时要做什么可传可不传
					opts.sError(data);
				}
			}
		},error:function(data){
			if(data.responseText.indexOf("登录")>-1){
				top.location.href=web.rootdir+"action/login";
			}else{
				$.messager.alert("提示信息","操作失败", 'error');
				if(opts.error){//当ajax失败时要做什么可传可不传
					opts.error(data);
				}
			}
		}
	};
	if(opts.async){//同步还是异步，默认异步
		ajaxpara.async=opts.async;
	}else{
		ajaxpara.async=true;
	}
	if(opts.type){//post还是get，默认post
		ajaxpara.type=opts.type;
	}else{
		ajaxpara.type="POST";
	}
	if(opts.dataType){//返回数据格式，默认json
		ajaxpara.dataType=opts.dataType;
	}else{
		ajaxpara.dataType="json";
	}
	if(opts.url){//请求接口
		ajaxpara.url=web.rootdir+opts.url;
	}
	if(opts.data){//传参
		ajaxpara.data=opts.data;
	}
	if(opts.contentType){//传参方式及传值
		ajaxpara.contentType=opts.contentType;
		if(ajaxpara.contentType.indexOf("json")>-1 && ajaxpara.data){
			ajaxpara.data=$.toJSON(ajaxpara.data);
		}
	}
	$.ajax(ajaxpara);
};