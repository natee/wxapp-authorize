# wxapp-authorize
微信小程序授权，拒绝授权后重新授权

## 使用方法
mpvue开发，src目录下有main.js，同级新建wx-oauth目录。（这都不重要）

```
├── pages
│   ├── home
│   │   ├── home.vue
│   │   └── main.js
├── main.js
└── wx-oauth
    ├── config
    │   ├── some config file
    └── authorize.js
```

如在home页授权

```javascript
import Authorize from '@/wx-oauth/oauth'

export default {
  mounted(){
    const wxAuth = new Authorize()
    wxAuth.authroize(this.init)
  },
  methods: {
    init(){}
  }
}
```
