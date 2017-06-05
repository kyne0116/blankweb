function initfileupload($id) {
	var $ul = $('<div class="cselectorImageUL"></div>'); 
	var id = "cform_" + $id.attr("id") + new Date().getTime();
	var href;
	if($id.attr("href")){
		href = $id.attr("href"); //接收上传文件的路径
	}else{
		href="/maip/action/app/file/uploadFile";
	}
	
	var timer;//上传进度控制
	var loding = false;//上传状态
	var isuploading = false;//如果是主动上传 而不是默认加载模式下 才考虑提示问题
	var btnmsg = "选择上传";
	if ($id.attr("btnmsg")) {
		btnmsg = $id.attr("btnmsg");
	}
	var $form = $("<form class='customize' id='fomimg_" + id + "' name='fomimg_" + id + "' target='ifrmimg_" + id + "' action='" + href + "' enctype='multipart/form-data' method='POST'></form>");
	var $file = $("<input type='file' id='fileimg_" + id + "' name='fileimg_" + id + "'/>");
	if (typeof FormData == "function" && $id.attr("mulaccept")) {//FormData是HTML5新增的函数 如果支持这个函数 就使用HTML5上传方式 
		$file = $("<input type='file' id='fileimg_" + id + "' name='fileimg_" + id + "'  multiple='multiple' accept='" + $id.attr("mulaccept") + "'/>");
	}
	var $submit = $("<input id='fomsubmit_" + id + "' type='submit' style='display:none;'/>");
	var $upload = $("<a class='btn'>" + btnmsg + "</a>");
	var $ifrm = $("<iframe id='ifrmimg_" + id + "' name='ifrmimg_" + id + "' style='display:none;'></iframe>");
	var $divu = $("<div id='uploadImg_" + id + "' class='uploadImage'></div>");

	$ul.append($divu).append($form.append($upload).append($file).append($submit)).append($ifrm);
	$id.hide().after($ul);  

	function filechange() {
		if (loding)
			return;
		loding = true;
		if ($file.val() == "") {
			loding = false;
			return;
		}
		if ($id.attr("beforesubmit")) {
			if ($id.attr("beforesubmit").indexOf("()") > -1)
				eval($id.attr("beforesubmit").replace("()", "") + "($id,$form)");
			else if ($id.attr("beforesubmit").indexOf("(") > -1)//如果没有（）但是有（就说明有自己的函数加自己的参数 就直接执行
				eval($id.attr("beforesubmit"));
			else
				eval($id.attr("beforesubmit") + "($id,$form)");
		}

		//验证通过后 发送请求 
		if ($id.attr("beforevalidator")) {
			var re = true;
			if ($id.attr("beforevalidator").indexOf("()") > -1)
				re = eval($id.attr("beforevalidator").replace("()", "") + "($id,$form,$file)");
			else if ($id.attr("beforevalidator").indexOf("(") > -1)//如果没有（）但是有（就说明有自己的函数加自己的参数 就直接执行
				re = eval($id.attr("beforevalidator"));
			else
				re = eval($id.attr("beforevalidator") + "($id,$form,$file)");
			if (!re) {
				loding = false;
				return re;
			}
		}

		var fileName = $file.val();
		if ($id.attr("noextension")) {//如果配置的有不校验
		} else {
			var message = "格式不正确,只支持 压缩包 图片 文档 视频 等";
			var extensionArray = ["rar", "jpg", "png", "bmp", "jpeg", "gif", "js", "css", "pdf",
				 "doc", "docx", "xls", "xlsx", "ppt", "pptx", "apk",
				   "mp4", "rm", "rmvb", "flv", "csv", "mp3"];
			if ($id.attr("extension")) {//如果有自定义文件类型 设置即可
				extensionArray = $id.attr("extension").split(",");
				message = "格式不正确,只支持 " + $id.attr("extension") + " 文件";
			}
			var fileExtensionArray = fileName.split('.'),
			fileExtension = fileExtensionArray[fileExtensionArray.length - 1].toLowerCase();
			if ($.inArray(fileExtension, extensionArray) == -1 && fileName != "") {
				alert(message);
				loding = false;
				return;
			}
			try {
				if ($id.attr("sizelength")) {//如果有要求大小检验
					if ($file[0].files[0].size > $id.attr("sizelength")) {
						alert($id.attr("sizemsg"));
						loding = false;
						return;
					}
				}
			} catch (ex) { }

		}
		isuploading = true;
		window.imageupload = null;
		if (typeof FormData == "function") {//FormData是HTML5新增的函数 如果支持这个函数 就使用HTML5上传方式 
			var fd = new FormData();
			for (var fi = 0; fi < $file[0].files.length; fi++) {
				fd.append("fileToUpload", $file[0].files[fi]);//设置要上传的文件
			}
			var xhr = new XMLHttpRequest();//声明一下上传控制器
			xhr.upload.addEventListener("progress", function (evt) {//加一个进度条变更事件
				if (evt.lengthComputable) {
					var idx = Math.round(evt.loaded * 100 / evt.total).toString() + '%';
					if ($id.attr("lock")) {//计算上传进度
						zjs.lhgtips("请稍候,已上传 " + idx + "...", 100, "loading.gif", true);
					} else {
						$divu.html("请稍候,已上传 " + idx + "...");
					}
				}
			}, false);
			xhr.addEventListener("load", function (evt) {//上传完成后的事件
				try {
					var jsstr = $(evt.target.responseText).html();
					jsstr = jsstr.replace(new RegExp("parent", 'g'), "window");
					eval(jsstr);
				} catch (ex) {
					$file.val("");
					if ($id.attr("lock")) {
						zjs.lhgtips("上传失败", 1.5, "error.gif", true);
					} else {
						$divu.html("上传失败");
					}
				}
				//$ifrm.html(evt.target.responseText);
				$ifrm.trigger("load");
			}, false);
			xhr.addEventListener("error", function (evt) {
				alert("上传失败");
			}, false);
			xhr.open("POST", $form.attr("action").toString());
			xhr.send(fd);
		} else {//如果不支持HTML5 就还用老的方式
			var idx = 0;
			timer = setInterval(function () {
				idx += (100 - idx) * .01;
				if ($id.attr("lock")) {
					zjs.lhgtips("请稍候,已上传 " + idx.toFixed(2) + "%...", 100, "loading.gif", true);
				} else {
					$divu.html("请稍候,已上传 " + idx.toFixed(2) + "%...");
				}
			}, 500);
			$submit.trigger("click");
		}
		$("#submit").addClass("loading");
	};
	function fileclear() {
		var $newfile = $file.clone();
		$file.after($newfile);
		$file.remove();
		$file = $newfile;
		$file.bind("change", filechange);
	};
	$file.bind("change", filechange);

	$ifrm.bind("load", function () {
		loding = false;
		fileclear();

		clearInterval(timer);
		if (isuploading) {//如果是主动上传 而不是默认加载模式下 才考虑提示问题
			if (window.imageMessage) {//如果有系统级错误 就提示
				zjs.lhgtips(window.imageMessage, 2.5);
				window.imageMessage = null;
				$divu.html("");
			} else {//没有的情况下考虑几种
				if ($id.attr("lock")) {
					if (window.imageupload) {//lock情况下 如果有文件就提示成功 没有就提示失败
						zjs.lhgtips("上传完成", 1.0, "success.gif", true);
					} else {
						zjs.lhgtips("上传失败", 1.5, "error.gif", true);
					}
				} else {
					if (!window.imageupload) {//不是lock情况下 如果没有文件就提示失败
						$divu.html("上传失败");
					}
				}
			}
		}

		if (window.imageupload) {//如果上传完成后 路径就会放在window.imageupload中
			$id.val(window.imageupload);
			$id.trigger("change");
			if ($id.attr("callback")) {
				if ($id.attr("callback").indexOf("(") > -1)
					eval($id.attr("callback"));
				else
					eval($id.attr("callback") + "()");
			}
			window.imageupload = null;
		}

		if (window.imageOtherInfo) {
			if ($id.attr("OtherInfo")) {
				if ($id.attr("OtherInfo").indexOf("()") > -1)
					eval($id.attr("OtherInfo").replace("()", "") + "(window.imageOtherInfo,$id)");
				else if ($id.attr("OtherInfo").indexOf("(") > -1)//如果没有（）但是有（就说明有自己的函数加自己的参数 就直接执行
					eval($id.attr("OtherInfo"));
				else
					eval($id.attr("OtherInfo") + "(window.imageOtherInfo,$id)");
			}
			window.imageOtherInfo = null;
		}
		$("#submit").removeClass("loading");
	});
     
	$id.bind("change", function () {//如果被赋值 就同步变更UL
		var ival = $(this).val();
		if (ival) {
			if ($id.attr("file"))
				$divu.empty().append("<a target='_blank' href='" + ival + "'>" + ($id.attr("filemsg") || "查看文件") + "</a>");
			else
				$divu.empty().append("<a class='meitucrop'><img id='img_" + id + "' src='" + ival + "' alt='' /></a>");

			if (true) {
				var $del = $("<a class='uploadImage_del icon-remove'></a>");
				$del.click(function () {
					fileclear();
					$id.val("");
					$id.trigger("change");
				});
				$divu.append($del);

			}
		} else {
			$divu.empty();
		}
	}); 
};