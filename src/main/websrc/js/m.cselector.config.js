/*!
* 基础JS模型 及JS选择器组件 表格、表单/usr/local/tomcat/webapps/root/
*/
//声明zjs命名空间
if (!window.zjs) { zjs = {} };
if (!window.zjss) { zjss = {} };

//zjs.cmdurl = "/ajax/Handler.ashx";                //默认命令指向地址  .net使用
//zjs.cmdurl = "/front/ApiInterface/doApi";         //默认命令指向地址  java集中分发使用
zjs.cmdurl = "";                                    //默认命令指向地址  直接分发使用


//zjs.fileurl = "/front/baecontroller/baeupload";     //文件上传地址    java使用

zjs.cmdtype = "POST";                   //默认命令以POST方式处理
zjs.jsonpara = false;                   //参数是否以JSON体方式传 false时 参数按参数名一个一个传
zjs.cachePage = 10;                    //表格默认缓存页数 100页 设置为1即可不缓存
zjs.isredirect = false;                 //是否有伪静态 有伪静态时需要处理参数 没有就不需要处理
zjs.treeroot = "";                       //树根节点默认值 .NET里用的是0 JAVA用的是1 特殊的用的是null
zjs.rootdir = "/blankweb/";                       //静态资源根目录
//zjs.fileurl = "/ajax/uploadfile.ashx";              //文件上传地址    .net使用      
zjs.fileurl = zjs.rootdir + "action/app/file/uploadFile";              //文件上传地址    .net使用      
zjs.checkrep = function (rep) {         //判断返回的code .NET是>0 特殊的是==0
    if (rep == 0)
        return true;
    else
        return false;
};
//异常处理函数
zjs.message = function (data) {
    var rep = data.responseid == undefined ? data.ResponseID : data.responseid;
    var meg = data.message == undefined ? data.Message : data.message;
    var dat = data.data == undefined ? data.Data : data.data;
    if (rep == 200) {
        zjs.getparent().location.href = zjs.rootdir + "/action/login";
    } else {
        zjs.tips(meg, rep);
    }
};
zjs.openidlogin = function () {//使用openid登录 处理登录逻辑 这一块内容每个项目不一样 所以需要写到config里
    if (zjs.getQueryStr().token) {
        //如果URL里有OPENID 就先用OPENID登录一次 其他的操作务必都等OPENID回来以后进行 所以此操作为同步而非异步
        zjs.cmd({
            async: false,
            cmd: "/action/login/ssologin",
            para: zjs.getQueryStr() 
        });
    }; 
};

//常用字典 字典格式:0值|1文本|2样式|3数据|4前图片|5后图片, 
zjs.yesno = '1|是,0|否,2|k,3|ss,4|aa,5|bb,6|cc';
zjs.yesnoy = 'false|否,true|是';
zjs.sex = '1|男,2|女';
zjs.sextype = '|不限,' +zjs.sex;
zjs.isdefaultaddress = '1|设为默认地址,0|不常用';
zjs.userstate = '1|启用,0|禁用';
zjs.menutype = '2|菜单,1|接口';
zjs.ssmenutype = '|全部,' + zjs.menutype;
zjs.productstate = '1|在售,0|停售';
zjs.productstyle = '|无,new|新品,hot|热卖,bargain|特价';
zjs.deliverytype = "0|送货上门,1|自提";
zjs.invoice = "0|个人,1|公司";
zjs.orderstate = "10|已下单,11|待支付,12|支付完成,20|已发货,30|已签收,90|已撤销";
zjs.ssorderstate = "|全部," + zjs.orderstate;
zjs.degree = '|全部,1|特急,2|特提,3|加急,4|平急';
zjs.level = '|全部,1|内部,2|外部';
zjs.suggestionstype = '1|建议,2|缺货';
zjs.state = '|全部,1|已归档|icon-search|ygd,2|编报,3|初审未通过,4|初审通过';
//是否回访
zjs.returnVisit = '1|是,0|否';
//员工状态
zjs.employeestate = 'true|在职,false|离职';
//系统资源类型
zjs.permissionType = 'module|模块,menu|菜单,submenu|子菜单,button|按钮';
//系统资源类型
zjs.dictType = 'varchar|字符型,integer|整型数字,number|浮点数字,price|货币,date|日期,datetime|时间';
//民族
zjs.national = '1|汉族,2|回族,3|壮族,4|苗族,5|其它';
//组织
zjs.orgacertificatetype = '1|组织机构代码,2|营业执照,3|其它';
zjs.monthstatus="miapdFailed|文档生成失败,miapd|文档已生成,startOfficeFailed|启动Office失败,convertedFailed|文档转码失败,converted|文档已转码,renderedFailed|文档渲染失败,rendered|文档已渲染,confirmed|文档已确认";
//证件类型
zjs.idType = "1|身份证,2|护照,3|军官证,4|港澳通行证,5|台胞证,6|户口簿,7|其他";
zjs.idTypeC = "|请选择," + zjs.idType;
//婚否
zjs.married = "1|已婚,2|未婚";
//版本管理需要文档
zjs.versionDocument = "1|软件需求说明书,2|系统设计说明书,3|数据库设计说明书,4|用户界面设计说明书,5|模块设计说明书,6|测试用例,7|缺陷报告,8|部署说明书,9|产品说明书.10|其他";
//版本级别
zjs.versionLevel= "2|低,0|高,1|中";
//需求变更管理需要文档
zjs.changeInDemandDocument="1|需求变更确认书,2|系统设计说明书,3|数据库设计说明书,4|用户界面设计说明书,5|模块设计说明书,6|测试用例,7|缺陷报告,8|部署说明书,9|产品说明书,10|其他";
//变更需求级别
zjs.changeRequestLevel = "2|低,0|高,1|中";
//满意度
zjs.satisfaction = "3|一般,0|非常满意,1|很满意,2|满意,4|不满意";
//变更类型
zjs.changeType = "3|其他,0|新增需求,1|故障BUG,2|优化改造";
//故障改造管理需要文档
zjs.changeInBugDocument = "1|故障申请确认书,2|故障分析书,3|故障处理说明书,4|测试用例,5|其他";
//故障级别
zjs.failureLevel = "2|一般事故,0|重大事故,1|严重事故";
//故障类型
zjs.failureType = "5|其他,0|系统操作,1|流程方案,2|业务处理,3|技术,4|硬件";
//处理优先级
zjs.dealPriority = "3|低,0|紧急,1|高,2|中";
//矫正措施
zjs.changeMeasure = "2|无需修复,0|永久修复,1|临时修复,3|临时修复";
//完成状态
zjs.finishStatus = "3|无需修复,0|仅修改程序,1|未修改程序,2|修改程序及数据,4|搁置";
//故障程度
zjs.failureDegree = "3|低,0|极严重,1|高,2|中";
//安全事件管理需要文档
zjs.securityEventDocument = "1|事件事故记录单,2|安全事件调查处理报告,3|纠正/预防措施表,4|安全事件分析书,5|安全事件处理说明书,6|其他";
//安全事件级别
zjs.securityEventLevel = "1|一般,0|严重,2|低";
//影响业务种类
zjs.businessRecoveryType = "1|种类1,2|种类1,3|种类3,4|种类4";
//是否可以重现
zjs.isRepeat = '1|否,0|是';
//是否频繁
zjs.isFrequent = '1|否,0|是';
//是否备份
zjs.isBackup = '0|是,1|否';
//迁移数据是否完整
zjs.migrationDataIsFull = '0|完整,1|不完整';
//故障是否频繁
zjs.failureIsFrequent = '1|是,2|否';
//系统数据迁移需要文档
zjs.dataMoveDocument = "1|系统数据迁移说明书,2|数据迁移备份文件,3|数据迁移审核确认说明书,4|数据迁移测试用例,5|系统迁移操作命令记录,6|其他";
//操作命令级别
zjs.commondLevel = "common|常规命令,risk|关键命令,warn|警告命令";
zjs.commondLevelC="|请选择," + zjs.commondLevel;
zjs.optType="SSH|主机操作命令,DML|数据操作命令,DDL|数据对象定义命令,DCL|数据对象权限控制命令,TCL|数据事务控制命令,DBMS|数据库管理系统命令,DBMSL|数据库管理系统命令";
zjs.optTypeC="|请选择," + zjs.optType;
//学历
zjs.education = "1|博士,2|硕士,3|本科,4|大专,5|中专或高中,6|其他";
zjs.educationC = "|请选择," + zjs.education;
// 是否是部门领导  
zjs.ismanager = "1|是,0|否";
//决策
zjs.decisionMake = "pass|请协助办理,fail|请领导审批,refuse|废除归档";
//所属系统
zjs.sys_mark = "|不限,mis|MIS系统,yqhl|银企互联系统,ras|营收稽核系统,laas|日志管理系统,aaaa|4A系统";
//审核
zjs.result = 'pass|同意,fail|退回,refuse|废除';
zjs.resultopinion = zjs.result + ',created|已提交,updated|已修改,continued|转领导审批';
//审核
zjs.subjectType = 'audit_role|基于角色,audit_user|基于用户';
//待办、已办、申请
zjs.headerurl = "1|monthLogReport,2|InterLogAudit,3|ERPLogAudit,4|departureAccountReport,5|transferAccountReport,6|addAccountReport,7|changeDemandAdd,8|breakdownChangeAdd,9|securityEventAdd," +
    "10|responsibilityCheckReport,11|builtinNumReport,12|superNumReport,13|versionAdd,14|sysDataMoveAdd";
zjs.deleteprocess = "1|/action/process/ar/delete,2|action/monthly/yphl/delete," +
    "3|action/monthly/erp/delete,4|action/staff/turnover/header/delete," +
    "5|action/staff/change/header/delete,6|action/new/staff/header/delete,7|action/requirement/change/delete,8|action/malfunction/repair/delete,9|action/security/event/delete," +
    "10|action/abnormal/responsibility/header/delete,11|action/process/internel/header/delete,12|action/super/user/header/delete,13|action/version/manager/delete,14|/action/systemsata/migration/delete";
zjs.deletedraft = "1|/action/process/ar/deleteDraft,2|/action/monthly/yphl/deleteDraft," +
    "3|/action/monthly/erp/deleteDraft,4|action/staff/turnover/header/deleteDraft," +
    "5|action/staff/change/header/deleteDraft,6|action/new/staff/header/deleteDraft,7|action/requirement/change/deleteDraft,8|/action/malfunction/repair/deleteDraft,9|/action/security/event/deleteDraft," +
    "10|action/abnormal/responsibility/header/deleteDraft,11|action/process/internel/header/deleteDraft,12|action/super/user/header/deleteDraft,13|/action/version/manager/deleteDraft,14|/action/systemsata/migration/deleteDraft";
//流程名称汉字
zjs.headerDesc = "1|系统日志审计报告,2|银企互联应用操作日志审计,3|ERP应用操作日志审计,4|离职账号审核,5|转岗账号审核,6|新增账号审核,7|需求变更流程," +
    "8|故障修复流程,9|安全事件流程,10|职责兼容性检查,11|内置账号审批,12|超级用户审批,13|版本发布流程,14|数据迁移流程";
//常用正则表达式
zjs.validatorRules = {
    "required": {
        "alertText": "* 必填 "
    },
    "equals": {
        "alertText": "* 输入不一致"
    },
    "length": {
        "alertText": "* 应输入　@v　个字"
    },
	"password":{
		"regex":/^(?![0-9]+$)(?!^[A-Z]+$)(?!^[a-z]+$)(?!^[0-9A-Z]+$)(?!^[0-9a-z]+$)(?!^[A-Za-z]+$)[0-9A-Za-z]{8,}$/,
		"alertText":"* 不能小于8位，包含大小写字母和数字"
	},
	"isCardNo":{
		"regex":/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
		"alertText":"* 身份证输入不合法"
	},
    "phone": {
        "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{7,27})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
        "alertText": "* 无效的电话号码"
    },
    "integer": {
        "regex": /^[\-\+]?\d+$/,
        "alertText": "* 不是有效的整数"
    },
    "zinteger": {
        "regex": /^\d+$/,
        "alertText": "* 不是有效的正整数"
    },
    "number": {
        "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
        "alertText": "* 无效的数字"
    },
    "znumber": {
        "regex": /^(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
        "alertText": "* 无效的数字"
    },
    "date": {
        "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
        "alertText": "* 无效的日期，格式必需为 YYYY-MM-DD"
    },
    "ipv4": {
        "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
        "alertText": "* 无效的 IP 地址"
    },
    "code": {
        "regex": /\d{17}[\d|X]|\d{15}/,
        "alertText": "* 身份证号格式不正确"
    },
    "money": {
        "regex": /^\d{1,10}(?:\.\d{1,2})?$/,
        "alertText": "* 金额输入错误"
    },
    "email": {
        "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
        "alertText": "* 邮件地址无效"
    },
    "url": {
        "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
        "alertText": "* URL错误 如：http://www.baidu.com"
    }
};
