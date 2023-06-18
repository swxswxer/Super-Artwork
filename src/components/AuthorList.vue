<template>
    <div>

        <el-card class="card" v-for="author in authors" :key="author.id">
            <div @click="showAuthor(author.id)">
                <el-avatar :size="200" :src="author.avatar"></el-avatar>
                <p style="font-size: 20px ; margin-top: 120px; ">{{ author.name }}</p>
            </div>
        </el-card>



    </div>
</template>

<script>
import axios from 'axios'
export default {

    data() {
        return {
            authors: [
                {
                    name: '',
                    id: '',
                    bio: '',
                    avatar: '',
                }
            ],
        }
    },

    methods: {
        getAllAuthor() {

            axios.get('http://localhost:8081/author').then(res => {
                this.authors = res.data.data
                console.log(this.authors);
            })
        },
        showAuthor(id) {
            this.$router.push({
                name: 'authorDetail',
                query: {
                    id: id
                }
            })
        }

    },
    mounted() {
        this.getAllAuthor()
    }



}

</script>

<style scoped>
.el-avatar {
    /* float: top; */

}

.card {

    float: left;
    width: 300px;
    height: 400px;
    padding: .75rem;
    border: 1px solid #efefef;
    text-align: center;
    margin-left: 70px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    border-radius: 20px;

}
</style>