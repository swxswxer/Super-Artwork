<template>
  <el-container style="height: 2000px; border: 1px solid #eee">

    <el-container>
      <!-- header -->

      <el-header style="height: 80px;">
        <Menu></Menu>
        <Search></Search>
        <span>SuperArtwork</span>
      </el-header>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
.el-aside {
  color: #333;
}

.el-header {
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #060606;
  font-size: 30px;

  >div {
    display: flex;

  }
}
</style>

<script>
import Aside from './components/Aside.vue'
import Search from './components/Search.vue'
import Menu from './components/Menu.vue'

import { RouterView } from 'vue-router';
export default {
  components: {
    Aside,
    Search,
    Menu,
  }

}
</script>



