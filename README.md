# HMIS-Server

## Project setup
```
git clone git@github.com:lcdwhy/HMIS-Server.git
cd 进入文件目录
npm install
启动服务器 node ./bin/www
```



node服务器只用于医院后台管理系统的数据请求使用，采用的是express框架 。

医院后台管理系统的页面：https://github.com/lcdwhy/HMIS--hospital

![image-20200913095005128](C:\Users\luochaodong\AppData\Roaming\Typora\typora-user-images\image-20200913095005128.png)

分了几个模块：文章模块、医生模块、药品模块、个人信息模块、首页模块、病人模块。

接口直接看文件就知道了。

例如：

文章模块:localhost/admin/article/articlelist  ;

........