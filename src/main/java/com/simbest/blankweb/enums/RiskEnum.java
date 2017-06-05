package com.simbest.blankweb.enums;

import com.simbest.cores.utils.enums.GenericEnum;

/**
 * 危险关键词
 * @author 芈氓   MiMang
 *
 */
public enum RiskEnum implements GenericEnum{	

	//风险操作
	删除("删除操作"), delete("delete操作"),drop("sql删除操作"),
	
	//关键用户
	root("超级管理员"),admin("超级用户"),管理员("管理员")
	;
	
	private String value;

	private RiskEnum(String value) {
		this.value = value;
	}

	/**
	 * @return the value
	 */
	public String getValue() {
		return value;
	}

	/**
	 * @param value
	 *            the value to set
	 */
	public void setValue(String value) {
		this.value = value;
	}
}
