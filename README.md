# student_elective_system_client

> 学生网上自主选课系统-客户端

## 系统简介

学生网上自主选课系统是一个前后端分离的学生选课系统, 项目采用 Egg.js + Vue.js 框架进行 开发。旨在实现一个学生能够在网上自主选课（选修课）的微系统。该系统分为三个角色：管理员, 学生, 教师；每一个角色的权限不同, 待操作项不同, 其中管理员能够对用户（学生、教师）和课程、专业、院系等信息进行增删改查；学生能进行选课、退选、查看成绩等操作；教师能够对学生的成绩进行评定, 能够查询到学生的选课状况等操作。

## 特色

- 前后端分离
- MVVM 模式、MVC 模式
- 前端采用最新的前端开发框架 Vue.js、Webpack 构建技术
- UI 框架采用 [Ant-Design-Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/)
- 后端采用 egg.js 框架、Webpack 构建技术来构建一个 API 服务
- 跨域身份验证采用 JWT（JSON Web Token）
- API 接口规范遵守 RESTful 定义的规范
- 数据库采用 MySQL 数据库
- 采用 AJAX 异步请求方案
- 是一个 PC 端的 WEB 应用
- 分布式版本控制采用 Git
- 单元测试（目前只覆盖 GET 接口, PS：单元测试将临时关闭权限验证）

## 技术栈

- Vue.js
- Vuex.js
- Vue-Router.js
- axios.js
- Egg.js
- MySQL
- JSON Web Token
- Node.js
- Git
- Mockjs

## Project setup

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn run serve
```

### Compiles and minifies for production

```bash
yarn run build
```

### Run your tests

```bash
yarn run test
```

### Lints and fixes files

```bash
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).