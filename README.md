## 创建 页面模版文件 工具、支持 react、vue 、模版可自定义、可以采用内置、下面有说明

#### 全局安装脚手架

##### mac 用户

sudo npm i -g creattemplate

##### windows 用户

npm i -g creattemplate

#### 创建业务文件，命令行进入要创建文件的目录执行下面命令

creattemplate creat <pageName(文件夹名字)>

#### 可以选择是否采用本地模版、或者内置模版，内置模版较简单，建议采用自定义模版，可以根据自己项目配置各种公共 npm 包或者组件库，工具函数等等

本地自定义模版，在本地醒目根目录下，新建 tplconfig 文件夹，里面可以写自己的模版了
例如：tplconfig/index.vue, tplconfig/model.js, tplconfig/url.js, tplconfig/services.js
默认创建的文件会采用，模版的名称，到时候可以自行修改
内置 react 目前是采用 dva 为基础框架写的模版

#### 目前工具支持自定义创建和内置模版，内置模版目前支持，react、vue、react+ts,后面会增加 vue+ts

### 可以配合 react-ts-cli 脚手架

## react-ts-cli 脚手架

#### 全局安装脚手架

##### mac 用户

sudo npm i -g creat-react-ts

##### windows 用户

npm i -g creat-react-ts

#### 创建项目

creat-react-ts init projectName

#### 下载依赖

npm i

#### 启动服务

npm start

# 项目结构

├──Readme.md  
├── mock // mock 数据存放  
├── src  
│ ├── components // 组件  
│ ├── models // redux  
│ ├── pages // 页面  
│ ├── index.js // 服务配置  
│ ├── services // 后台接口请求  
│ ├── router.js // 路由  
│ └── utils // 公共方法  
├── global.d.ts // ts  
├── .roadhogrc.js // dva 配置  
├── .webpackrc.js // webpack 相关配置  
├── node_modules  
├── package.json  
├── tsconfig.json // ts 配置  
├── tslint.json // ts 校验配置  
###后续有时间会对项目工程做解释和问题点的解决方案都会形成文档
