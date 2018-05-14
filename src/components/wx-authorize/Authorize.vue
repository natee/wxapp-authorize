<style lang="less">
.wx-authorize {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;

  .wx-authorize__modal {
    position: relative;

    // 宽高一定要是偶数
    width: 316px;
    height: 206px;

    // 切角效果
    background: #fff;
    background: linear-gradient(135deg, transparent 15px, #fff 0) top left,
      linear-gradient(-135deg, transparent 15px, #fff 0) top right,
      linear-gradient(-45deg, transparent 15px, #fff 0) bottom right,
      linear-gradient(45deg, transparent 15px, #fff 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
  }

  .wx-authorize__modal::before,
  .wx-authorize__modal::after,
  .wx-authorize__hook::before,
  .wx-authorize__hook::after {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
  }
  .wx-authorize__modal::before,
  .wx-authorize__modal::after {
    height: 23px;
    left: 50%;
  }
  .wx-authorize__modal::before {
    width: 193px;
    background: url("./wx-auth-head.png") 0 0 no-repeat;
    background-size: cover;
    top: -23px;
    margin-left: -96.5px;
  }
  .wx-authorize__modal::after {
    width: 133px;
    background: url("./wx-auth-foot.png") 0 0 no-repeat;
    background-size: cover;
    bottom: -23px;
    margin-left: -66.5px;
  }

  .wx-authorize__hook::before,
  .wx-authorize__hook::after {
    width: 34px;
    height: 34px;
    transform: rotate(45deg);
    background: #67d87e;
    top: 50%;
    margin-top: -24px;
  }
  .wx-authorize__hook::before {
    left: -10px;
  }
  .wx-authorize__hook::after {
    right: -10px;
  }

  .wx-authorize__logo {
    width: 86px;
    height: 86px;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: -43px;
    left: 50%;
    margin-left: -43px;
    z-index: 2;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .wx-authorize__body {
    padding: 70px 30px;
    p {
      font-size: 18px;
      color: #000;
    }
    .tip {
      font-size: 15px;
      color: #888;
      border-top: 1px solid #e5e5e5;
      padding: 10px 0;
      margin-top: 10px;
    }
  }
  .wx-authorize__foot {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
  }
  .wx-authorize__btn {
    background: transparent;
    flex: 1;
    border-top: 1px solid #e5e5e5;
    border-radius: 0;
  }
  .wx-authorize__btn::after {
    border: 0;
  }
  .wx-authorize__btn-plain {
    color: rgba(0, 0, 0, 0.54);
    border-right: 1px solid #e5e5e5;
  }
  .wx-authorize__btn-primary {
    color: #02bb00;
  }
}
</style>
<template>
  <div class="wx-authorize">
    <div class="wx-authorize__modal">
      <div class="wx-authorize__logo">
        <img v-bind:src="logo" mode="aspectFit">
      </div>
      <div class="wx-authorize__body">
        <div><label style="text-decoration:underline;">{{mpName}}</label>申请获得以下授权：</div>
        <div class="tip">获得你的公开信息（昵称、头像等）</div>
      </div>
      <div class="wx-authorize__foot">
        <button class="wx-authorize__btn wx-authorize__btn-plain" @click="cancel">取消</button>
        <button open-type="getUserInfo" class="wx-authorize__btn wx-authorize__btn-primary" @click="confirm">确定</button>
      </div>

      <div class="wx-authorize__hook"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "authorize-modal",
  props: {
    logo: {
      type: String
    },
    mpName: {
      type: String,
      default: "小程序"
    },

    onCancel: {
      type: Function
    },
    onConfirm: {
      type: Function
    }
  },

  methods: {
    cancel() {
      this.$emit("on-cancel");
      wx.navigateBack();
    },
    confirm() {
      this.$emit("on-confirm");
    }
  }
};
</script>
