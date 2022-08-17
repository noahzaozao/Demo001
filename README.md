# 实例001

## 克隆本项目到本地

```
git clone https://github.com/noahzaozao/Demo001.git
```

## 构建

```
npm run build
```

## 运行

```
npm run start
```

# 实例001讲解

## 从空目录创建创建npm项目结构

```
npm init
```

## 打开生成的package.json

在scripts节点内添加如下配置

```
"start": "webpack serve --open",
"build": "webpack",
"build:watch": "webpack -w",
"clean": "rm ./dist/*"
```

## 安装开发依赖库

```
npm install -D typescript pixi.js @types/node @types/pixi.js
npm install -D ts-loader webpack webpack-dev-server
npm install -D html-webpack-plugin
```

## 从空目录创建Typescript项目结构

```
tsc --init
```

## 打开生成的tsconfig.json

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "strictNullChecks": true,
    "noImplicitThis": true,
    "skipLibCheck": true
  },
  "include": [
    "./src/*",
  ],
  "exclude": [
    "./node_modules"
  ]
}
```

## 新建index.html

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Hello World, Pixi!!</title>
    </head>
    <body>
        <div style="border: 1px solid #CCCCCC; background-color: #CCCCCC;">
            Test
        </div>
    </body>
    <style>
        body {
            margin: 0;
            padding: 0;
            left: 0;
            top: 0;
        }
    </style>
</html>
```

## 新建src目录

### 新建main.ts

```
import * as PIXI from "pixi.js";
import { Loader } from "pixi.js";

var renderer = new PIXI.Application({
    width: 256,
    height: 256,
    backgroundColor: 0x000000,
})
document.body.appendChild(renderer.view)
var stage = renderer.stage

Loader.shared.add('pickaxe', 'images/pickaxe.png')
Loader.shared.load((info: any, resources: any) => {
    console.log(info, resources)

    var image = new PIXI.Sprite(Loader.shared.resources.pickaxe.texture)
    image.x = 100
    image.y = 100
    stage.addChild(image)
    
    setInterval(function(){
        image.rotation += 0.05
    }, 20)
})

console.log("Demo001 Started")
```

## 新建webpack.config.js 

```
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: {
        main: "./src/main.ts",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
    },
    optimization: {
        runtimeChunk: 'single',
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            file: path.join(__dirname, 'dist', 'index.html'),
            template: './index.html'
        }),
    ],
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["ts-loader"],
                exclude: /node_modules/
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8080
    },
    // Omit "externals" if you don't have any. Just an example because it's
    // common to have them.
    externals: {
        // Don't bundle giant dependencies, instead assume they're available in
        // the html doc as global variables node module name -> JS global
        // through which it is available
    //    "pixi.js": "PIXI"
    }
};
```

## 构建

```
npm run build
```

## 运行

```
npm run start
```
