<template>
    <el-container style="height: 2000px; border: 1px solid #eee">

        <el-container>
            <el-header style="height: 80px;">
                <Menu></Menu>
                <Search></Search>
                <span>SuperArtwork</span>
                <span>Hello{{ user.username }}</span>
            </el-header>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
// import Aside from './components/Aside.vue'
import Search from '../components/Search.vue'
import Menu from '../components/Menu.vue'
import Aside from '../components/Aside.vue'
import { RouterView } from 'vue-router';
export default {
    data() {
        return {
            user:
            {
                id: '',
                username: '',
                userpwd: '',

            }
        }
    },
    components: {
        Aside,
        Search,
        Menu,
    },
    mounted() {

        this.$bus.$on('getUser', (user) => {
            console.log(user)
            this.user.username = user.username
            this.user.id = user.id

        })



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