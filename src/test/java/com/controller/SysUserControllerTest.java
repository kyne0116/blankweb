/**
 * 
 */
package com.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.springframework.test.web.servlet.ResultActions;

import com.simbest.cores.admin.authority.model.SysUser;
import com.simbest.cores.test.AbstractControllerTester;

/**
 * 运行测试前，将app.mock.admin设置为true
 * 
 * @author lishuyi
 */ 
public class SysUserControllerTest extends AbstractControllerTester{
 
    @Test
    public void testCreate() throws Exception {
    	SysUser user = new SysUser();
    	user.setOpenid("of9VnwKvtiaXHCXVXs-5I4IO7k30");
    	user.setHeadimgurl("http://wx.qlogo.cn/mmopen/zboVz665BxYickLwom88gbcTbZdN5XKDTRFYUt2Af2ibfvVSBEZo6MwIJQianwSobs1ov61mEMVjVqINhNVsGKAB2KyF1iaNJpZZ/0");
    	user.setPhone("18661198585");
    	user.setNickname("Kyne");
        String requestJsonString = json(user);
        ResultActions result = getMockMvc().perform(post("/action/admin/authority/sysuser/create")
                .contentType(getJsonContentType())
                .content(requestJsonString));
        result.andExpect(status().isOk());
        String responseJsonString = result.andReturn().getResponse().getContentAsString();
        System.out.println(responseJsonString);
        
    }
}
