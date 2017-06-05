/**
 * 
 */
package com.simbest.blankweb.web;

import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import com.mochasoft.portal.encrypt.EncryptorUtil;
import com.simbest.cores.exceptions.SSOLoginFailedException;
import com.simbest.cores.web.filter.SSOAuthentication;

/**
 * @author lishuyi
 *
 */
@Component
public class MokaSSOAuthentication implements SSOAuthentication {

	@Override
	public String authenticate(HttpServletRequest request)
			throws SSOLoginFailedException {
		// 通过OA跳转过来的待办请求
		String uid = request.getParameter("uid");
		String username = testDecode("SBKJ_RZGL_SSO", uid, 1800);
		return username;
//        return request.getParameter("username");
	}

	/**
	 * 解密方法
	 * 
	 * @param secretKey
	 *            解密密钥
	 * @param ciphertext
	 *            密文
	 * @param outTime
	 *            密文失效时间，以秒为单位
	 * @return 解密后的字符串
	 */
	public static String testDecode(String secretKey, String ciphertext,
			int outTime) {
		String uid = null;
		try {
			uid = EncryptorUtil.decode(secretKey, ciphertext, outTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return uid;
	}
}
