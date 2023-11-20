<template>
    <el-container style="height: 2000px; border: 1px solid #eee">
        <el-container>
            <el-header style="height: 80px;">
                <Menu></Menu>
                <Search></Search>
                <div>
                    <el-dropdown @command="handleCommand">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <span>{{ user.username }}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="info">个人信息</el-dropdown-item>
                            <el-dropdown-item command="pr">购买记录</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <span>SuperArtwork</span>
            </el-header>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="个人信息" :visible.sync="infoVisible">
            <Information></Information>
        </el-dialog>
        <el-dialog title="购买记录" :visible.sync="PRVisible">
            <PurchaseRecords v-if="tableShow"></PurchaseRecords>
        </el-dialog>

    </el-container>
</template>
<script>
import Search from '../components/Search.vue';
import Menu from '../components/Menu.vue';
import Aside from '../components/Aside.vue';
import Information from '../components/Information.vue';
import PurchaseRecords from '../components/PurchaseRecords.vue';
import { RouterView } from 'vue-router';
import axios from 'axios'
export default {
    data() {
        return {
            user: {
                username: '未登陆',
                id: 0,
            },
            infoVisible: false,
            PRVisible: false,
            tableShow: true,
        }
    },
    methods: {
        handleCommand(command) {
            if (command === 'logout') {
                this.logout()
            } else if (command === 'info') {
                this.infoVisible = true
            } else if (command === 'pr') {
                this.PRVisible = true
                this.updateTable()
            }

        },
        logout() {
            this.$router.push('/')
            this.$cookies.remove('userId');
        },
        updateTable() {
            // 卸载
            this.tableShow = false
            // 建议加上 nextTick 微任务 
            // 否则在同一事件内同时将tableShow设置false和true有可能导致组件渲染失败
            this.$nextTick(function () {
                // 加载
                this.tableShow = true
            })
        },
    },
    mounted() {
        // this.username = this.$route.query.username
        // this.user = this.$store.getters.getUser

        this.user.id = this.$cookies.get('userId')

        axios.get(`http://localhost:8081/users/${this.user.id}`).then(res => {

            // console.log(res);
            this.user.username = res.data.data.username
            // console.log(res.data.data)
        })
        // console.log(this.user.username)
    },
    components: {
        Aside,
        Search,
        Menu,
        Information,
        PurchaseRecords,
    },

}
</script>

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