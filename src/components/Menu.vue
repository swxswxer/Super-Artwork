<template>
    <el-menu mode="horizontal" default-active="1" background-color="#f5f5f5" @select="handleSelect">
        <el-menu-item index="1">主页</el-menu-item>
        <el-submenu index="2">
            <template slot="title">分类</template>
            <el-menu-item index="2-1">国风</el-menu-item>
            <el-menu-item index="2-2">水彩</el-menu-item>
            <el-menu-item index="2-3">漫画</el-menu-item>
            <el-menu-item index="2-4">油画</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">作者</el-menu-item>
    </el-menu>
</template>

<script>
import { RouterView } from 'vue-router';
import axios from 'axios';
export default {


    methods: {
        handleSelect(key) {
            console.log(key);
            if (key == 1) {
                // this.$router.push({
                //     name: 'allart',
                // })
                this.$router.push({ path: '/home' })
                this.$bus.$emit('zhuye')
            } else if (key == '2-1') {
                const style = '国风'
                // this.searchByStyle(style)
                // this.$router.push({
                //     name: 'allart',
                // })
                this.$bus.$emit('searchByStyle', style)
            } else if (key == '2-2') {
                const style = '水彩'
                // this.searchByStyle(style)
                this.$bus.$emit('searchByStyle', style)
            } else if (key == '2-3') {
                const style = '漫画'
                // this.searchByStyle(style)
                this.$bus.$emit('searchByStyle', style)
            } else if (key == '2-4') {
                const style = '油画'
                // this.searchByStyle(style)
                this.$bus.$emit('searchByStyle', style)
            } else if (key == '3') {
                this.$router.push({
                    name: 'authorList',
                })
            }
        }
    },




}



</script>
