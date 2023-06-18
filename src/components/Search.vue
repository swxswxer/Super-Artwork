<template>
    <div class="search">
        <el-input prefix-icon="el-icon-search" v-model="input" placeholder="搜索画作"
            style="  margin-right: 5px; width: 600px; "></el-input>
        <el-button @click="search">搜索</el-button>
    </div>
</template>
<script>
import axios from "axios";


export default {
    name: 'Search',


    data() {
        return {
            input: '',


        }
    },


    methods: {
        search() {
            // console.log(this.input);
            const formData = new FormData();
            formData.append('name', this.input);
            axios.post('http://localhost:8081/painting/searchByName', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res);

                    this.$bus.$emit('searchByName', res.data.data)
                    this.$router.push('/')
                })
            this.input = ''
        }
    }
}

</script>

<style>
.search {}

.searchInput {
    height: 52px;
}
</style>