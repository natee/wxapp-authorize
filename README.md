# wxapp-authorize
微信小程序授权，拒绝授权后重新授权

## 使用方法
mpvue开发，src目录下有main.js，同级新建wx-oauth目录。（这都不重要）

```
├── main.js
└── wx-oauth
    ├── config
    │   ├── some config file
    └── authorize.js
```

main.js中，你也可以写在其它需要授权的页面

```javascript
import {mpAuthorize} from './wx-oauth/authorize'
mpAuthorize()
```
