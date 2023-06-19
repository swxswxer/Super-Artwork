<template>
    <el-card class="card3">
        <div class="div1">
            <div class="card">
                <el-avatar :size="200" :src="this.author.avatar" class="avatar"></el-avatar>
            </div>
        </div>
        <div class="div2">
            <p style="font-size: 30px; margin-top: 8px; font-weight:bold">{{ author.name }}</p>
            <div class="div2">
                <h3>作者介绍</h3>
                <h1>{{ author.bio }}</h1>
            </div>

        </div>
        <div style="font-size: 30px; margin-left: 80px;">
            作者作品
        </div>
        <div>
            <el-card v-for=" art  in  arts " :key="art.id" class="card2">
                <div @click="showPainting(art.id)">
                    <a target="_blank">
                        <el-image style="width: 200px; height: 250px " :src="art.image"></el-image>
                    </a>
                    <p class="card-text">{{ art.name }}</p>
                </div>
            </el-card>


        </div>
    </el-card>
</template>

<style>
.avatar {
    margin-top: 95px;
    border: 4px solid #efefef;
}

.div1 {
    /* background-color: rgb(23, 22, 22); */
    width: auto;
    height: 300px;
}

.div2 {
    width: auto;
    /* border: 1px solid #ff0000; */
    /* height: 500px; */
    text-align: center
}

.card {
    text-align: center;
}

.card2 {

    float: left;
    width: 300px;
    height: 400px;
    padding: .75rem;
    border: 1px solid #efefef;
    text-align: center;
    margin-left: 65px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;

}

.card-text {
    margin-top: 50px;
    font-size: 20px;
}

.card3 {

    height: auto;
    border: 1px solid #efefef;



    border-radius: 20px;

}
</style>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            id: '',
            author: {
                id: '',
                name: '',
                bio: '',
                avatar: ''
            },
            arts: [
                {
                    name: '',
                    id: '',
                    artist: '',
                    image: '',
                    style: '',
                    description: '',
                    date: '1',
                }
            ],


        }
    },

    methods: {
        getAuthorById(id) {
            axios.get(`http://localhost:8081/author/${id}`).then(res => {

                this.author = res.data.data
            })
        },

        getPaintingByAuthor(authorName) {
            const formData = new FormData();
            formData.append('author', authorName);
            axios.post('http://localhost:8081/painting/searchByAuthor', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    this.arts = res.data.data
                })
        },

        showPainting(id) {
            this.$router.push({
                name: 'detail',
                query: {
                    id: id
                }
            })

        }
    },

    mounted() {
        const id = this.$route.query.id
        this.id = id
        this.getAuthorById(this.id)
        setTimeout(() => {
            this.getPaintingByAuthor(this.author.name)
        }, 200);

    },


}

</script>