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
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  height: 100%;
  white: 100%;

  .tabber_left {
    display: flex;
    align-content: center;
    margin: 20px;
  }

  .tabber-right {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
  }
}
</style>
