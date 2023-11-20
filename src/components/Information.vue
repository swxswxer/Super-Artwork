<template>
    <el-descriptions class="margin-top" title="" :column="2" border>
        <template slot="extra">
            <el-button v-if="IsDisplay" type="primary" size="small" @click="updata">修改</el-button>
        </template>
        <template slot="extra">
            <el-button v-if="IsUpdata" type="primary" size="small" @click="save">保存</el-button>
        </template>
        <el-descriptions-item label="用户名">
            <div>{{ user.username }}</div>
            <!-- <el-input v-if="IsUpdata" v-model="user.username"></el-input> -->
        </el-descriptions-item>
        <el-descriptions-item label="手机号">
            <div v-if="IsDisplay">{{ user.phoneNumber }}</div>
            <el-input v-if="IsUpdata" v-model="user.phoneNumber"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="居住地">
            <div v-if="IsDisplay">{{ user.city }}</div>
            <el-input v-if="IsUpdata" v-model="user.city"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="备注">
            <div v-if="IsDisplay">{{ user.remark }}</div>
            <el-input v-if="IsUpdata" v-model="user.remark"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">
            <div v-if="IsDisplay">{{ user.contactAddress }}</div>
            <el-input v-if="IsUpdata" v-model="user.contactAddress"></el-input>
        </el-descriptions-item>
    </el-descriptions>
</template>
<script>
import axios from 'axios';
export default {

    data() {
        return {
            user: {
                username: '',
                id: 0,
                phoneNumber: '',
                city: '',
                remark: '',
                contactAddress: '',
            },


            IsDisplay: true,
            IsUpdata: false,
            buttonName: '修改',


        }
    },
    methods: {
        updata() {
            this.IsDisplay = !this.IsDisplay
            this.IsUpdata = !this.IsUpdata
        },
        save() {
            this.IsDisplay = !this.IsDisplay
            this.IsUpdata = !this.IsUpdata
            const formData = new FormData();
            axios({
                method: 'post',
                url: 'http://localhost:8081/users/updata',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: JSON.stringify(this.user) // 2
            }).then((res) => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });

            });






        }

    },
    mounted() {
        axios.get(`http://localhost:8081/users/${this.$cookies.get('userId')}`).then(res => {

            console.log(res.data.data);
            this.user = res.data.data
            console.log(this.user)

        })
    }

}
</script>