# my-app

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### 

```bash
# 安装依赖
$ npm install

# 开启开发服务和 Electron 程序
$ npm start

# 开启 Electron 程序预览生产构建
$ npm preview
```


### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

### 项目目录
    - src/main：electron创建窗口化配置文件，桌面程序入口文件
    - preload/index：公开electron内的Api供渲染进程使用
    - src/index：项目入口文件
    - src/components：公共类文件或组件
    - assets：图片/静态资源