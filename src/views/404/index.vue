<template>
  <div class="box">
    <img src="../../assets/images/404.png" alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background-color: rgb(237, 239, 232);
  display: flex;
  justify-content: center;

  img {
    position: fixed;
    top: 35%;
    left: 35%;
    width: 900px;
    height: 400px;
  }
}
</style>
