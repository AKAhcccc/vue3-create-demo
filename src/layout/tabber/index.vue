<template>
  <div class="tabber">
    <Breadcrumb></Breadcrumb>
    <Setting></Setting>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabber',
}
</script>

<style scoped lang="scss">
.tabber {
  height: 100%;
  white: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  background-color: #fff;
  .tabber_left {
    display: flex;
    align-content: center;
    margin: 20px;
  }

  .tabber-right {
    display: flex;
    align-content: center;
    flex-direction: row;
    align-content: center;
    flex-wrap: wrap;
  }
}
</style>
