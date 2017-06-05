1.编译工程 mvn compile
2.测试工厂 mvn test
3.创建表结构 mvn hibernate3:hbm2ddl
4.初始化数据 mvn dbunit:operation
5.本地启动工程 mvn tomcat:run -Dmaven.test.skip=true -Djava.net.preferIPv4Stack=true 

分析类库依赖 mvn dependency:tree --> tree.txt
生成API文档 mvn javadoc:javadoc

生成测试环境war包 mvn clean install -Dmaven.test.skip=true -Puat
生成正式环境war包 mvn clean install -Dmaven.test.skip=true -Pprd

