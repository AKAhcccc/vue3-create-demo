<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 95%;
  height: $base-menu-logo-height;
  padding-left: 17px;
  overflow: hidden;
  font-size: $base-menu-logo-title-size;
  font-weight: 700;
  color: #959ea6;

  img {
    display: inline-block;
    height: 30px;
    margin-right: 15px;
    border-radius: 10px;
    widows: 30px;
  }

  .title {
    display: inline-block;
    height: 32px;
    margin: 2px 0 0 18px;
    overflow: hidden;
    font-size: 18px;
    font-weight: 600;
    line-height: 32px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
