<template>
    <div>
        <div>
            <el-card class="scroll">
                <el-image class="image-container" :src="art.image" :preview-src-list="srcList"></el-image>
            </el-card>
            <el-card class="scroll2">
                <div slot="header" class="clearfix">
                    <span style="font-size: 30px;">{{ art.name }}</span>
                </div>
                <div style="float: left;" class="text item">作者 :
                </div>
                <div class="text item" @click="goAuthor(art.artist)" style="font-weight:bold">{{ art.artist }}</div>
                <div class="text item">画风 :{{ ' ' + art.style }} </div>
                <div class="text item">发布时间 :{{ ' ' + art.date }} </div>
                <div class="text item">所有者 : test</div>
                <div class="text item">参考价 : test</div>
            </el-card>
            <el-card class="scroll2">
                <div slot="header" class="clearfix">
                    <span style="font-size: 20px;">画作描述</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                </div>
                <div class="text item">{{ art.description }} </div>
            </el-card>
            <comment></comment>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import comment from './comment.vue';
export default {
    name: 'Detail',
    data() {
        return {
            art: {
                name: '',
                id: '',
                artist: '',
                image: '',
                style: '',
                description: '',
                date: '',
            },
            srcList: [
                ''
            ],
            comments: [
                // {
                //     comment: '',
                //     commentId: '',
                //     paintingId: '',
                //     userId: '',
                //     date: ''
                // }
            ],
            input: ''
        }
    },
    mounted() {
        const id = this.$route.query.id
        axios.get(`http://localhost:8081/painting/${id}`).then(res => {

            // console.log(res);
            this.art = res.data.data
            this.srcList[0] = this.art.image
        })
        // console.log(id);
        this.$bus.$emit('getPaintingId', id)


    },
    methods: {
        goAuthor(name) {
            const formData = new FormData();
            formData.append('name', name);
            axios.post('http://localhost:8081/author/searchByName', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    this.$router.push({
                        name: 'authorDetail',
                        query: {
                            id: res.data.data[0].id
                        }
                    })
                })
        }
    },
    components: {
        comment
    }

}
</script>

<style scoped>
.scroll {
    float: left;
    width: 750px;
    height: 750px;
    padding: .75rem;
    margin-left: 200px;
    margin-top: 50px;
    border: 1px solid rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
}

.image-container {
    max-width: 100%;
    max-height: 100%;
}

.scroll2 {
    float: left;
    width: 750px;
    height: 330px;
    padding: .75rem;
    margin-left: 20px;
    margin-top: 50px;
    border-radius: 20px;

    border: 1px solid rgb(255, 255, 255);
}





.text {
    font-size: 20px;
}

.item {
    margin-bottom: 18px;
    margin-top: 20px;
}
</style>



