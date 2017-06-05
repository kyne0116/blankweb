package com.simbest.blankweb.utils;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;

/**
 * 读取系统配置属性
 * 
 * @author lishuyi
 *
 */

@Configuration
@PropertySources(value = {@PropertySource("classpath:config.properties")})
public class AppConfig {
	public final Log log = LogFactory.getLog(AppConfig.class);
	
	@Autowired
	Environment environment;
    
	@PostConstruct
	public void init() {			
		log.debug(environment.getProperty("app.url"));
	}
	
	public String getValue(String key) {
		return environment.getProperty(key);
	}
}
