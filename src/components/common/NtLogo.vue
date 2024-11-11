<template>
  <div class="nt-logo" @click="clickLogo" >
    <img :src="logo" alt="logo">
  </div>
</template>

<script setup>
import logo from '@/assets/img/logo/logo.png';

// 定义点击事件的触发器
const clickLogo = () => {
  //可以添加点击事件
  console.log("跳转到网站信息首页");
};
</script>

<style lang="scss" scoped>
.nt-logo {
  display: flex;
  justify-content: left;
  height: 100%; /* 父元素度为 100% */
}
img {
  height: 100%;
  object-fit: contain;  /* 确保图片按比例缩放 */
}
</style>
