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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Expires" content="0">
<meta http-equiv="kiben" content="no-cache">
    <link href="${ctx}/iconfont/iconfont.css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="${ctx}/js/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/js/themes/icon.css">
    <link rel="stylesheet" href="${ctx}/css/public.css" type="text/css" />
    <link rel="stylesheet" href="${ctx}/css/index.css" type="text/css" />
    <link rel="stylesheet" href="${ctx}/css/pages.css" type="text/css" />
    <script src="${ctx}/js/jquery.min.js" type="text/javascript"></script>
    <script src="${ctx}/js/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="${ctx}/js/easyui-lang-zh_CN.js" type="text/javascript"></script>
</head>