/**
 * 
 */
package com.simbest.blankweb.web;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.simbest.cores.exceptions.SSOLoginFailedException;
import com.simbest.cores.utils.Digests;
import com.simbest.cores.utils.configs.CoreConfig;
import com.simbest.cores.web.filter.SSOAuthentication;

/**
 * @author lishuyi
 *
 */
@Component
public class SimpleNameSSOAuthentication implements SSOAuthentication{
	private static transient final Log log = LogFactory.getLog(SimpleNameSSOAuthentication.class);
	
	@Autowired
	private CoreConfig coreConfig;
	
	@Override
	public String authenticate(HttpServletRequest request)
			throws SSOLoginFailedException {
		String username = request.getParameter("username");
		String token = request.getParameter("token");
		log.debug("request token:"+token);
		String source = StringUtils.removeEnd(username+coreConfig.getValue("app.root"), ".root");
		String actual =Digests.encryptMD5(source);
		log.debug("actual token:"+actual);
		if(StringUtils.isEmpty(username)||StringUtils.isEmpty(token)||!token.trim().equals(actual))
			throw new SSOLoginFailedException("30006", "Error Token!");
		return username;
	}
	
	public static void main(String[] args) {
		System.out.println(Digests.encryptMD5("admin"+"onegym"));
	}
}
