<style>

</style>
<template>
  <div>
    <authorize-modal v-if="needAuthorize"
      logo="/static/img/logo.png" 
      mp-name="小程序名称" 
      @on-cancel="closeAuthorizeModal" 
      @on-confirm="authorize()"></authorize-modal>
  </div>
</template>
<script>
// 忽略这里的@，webpack配置
import AuthorizeModal from '@/components/wx-authorize/Authorize'
import Authorize from '@/components/wx-authorize/oauth'
export default {
  components: { AuthorizeModal },
  data(){
    return {
      needAuthorize: false
    }
  },
  mounted(){
    this.authorize();
  },
  methods: {
    closeAuthorizeModal(){
      this.needAuthorize = false
    },
    authorize(){
      const self = this
      const wxAuth = new Authorize()
      wxAuth.authroize({
        success: self.init,
        fail: function(){
          self.needAuthorize = true
        }
      })
    },

    // 授权成功后，初始化
    init(code, data){
      this.closeAuthorizeModal();
      console.log('wx.login return code:', code);
      console.log('getUserInfo:', data);
    }
  }
}
</script>
