<template>
    <div>
        <div>
            <el-card class="scroll">
                <el-image class="image-container" :src="art.image" :preview-src-list="srcList"></el-image>
            </el-card>
            <el-card v-if="tableShow" class="scroll2">
                <div slot="header" class="clearfix">
                    <span style="font-size: 30px;">{{ art.name }}</span>
                </div>
                <div style="float: left;" class="text item">作者 :
                </div>
                <div class="text item" @click="goAuthor(art.artist)" style="font-weight:bold">{{ art.artist }}</div>
                <div class="text item">画风 :{{ ' ' + art.style }} </div>
                <div class="text item">发布时间 :{{ ' ' + art.date }} </div>
                <div class="text item" v-if="art.owner === null">所有者 : 无</div>
                <div class="text item" v-if="art.owner != null">所有者 : {{ art.owner }}</div>
                <div class="text item">参考价 : {{ art.price }}</div>
            </el-card>
            <el-card class="scroll2">
                <div slot="header" class="clearfix">
                    <span style="font-size: 20px;">画作描述</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                </div>
                <div class="text item">{{ art.description }} </div>

                <el-tooltip content="该画已被人购买" placement="top">
                    <el-button v-if="art.owner != null" disabled class="scrollg" type="primary" round>无法购买</el-button>
                </el-tooltip>
                <el-button v-if="art.owner === null" class="scrollg" type="primary" round @click="goumai">购买</el-button>
            </el-card>
            <!-- <el-card class="'scrollg'">123</el-card> -->
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
                price: '',
                owner: '',
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
            input: '',
            tableShow: true,

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
        },
        goumai() {
            this.$confirm('您将购买该画作 请确认购买', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '购买成功!'
                });
                const formData = new FormData();
                formData.append('paintingId', this.$route.query.id);
                formData.append('userId', this.$cookies.get('userId'));
                axios.post('http://localhost:8081/Recording/addRecording', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        this.$router.go(0)
                    })
                this.updataOwner()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消购买'
                });
            });

        },
        updataOwner() {
            const formData = new FormData();
            formData.append('paintingId', this.$route.query.id);
            formData.append('userId', this.$cookies.get('userId'));
            axios.post('http://localhost:8081/painting/updataOwner', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    this.updateTable()

                })
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
    position: relative;
    float: left;
    width: 750px;
    height: 330px;
    padding: .75rem;
    margin-left: 20px;
    margin-top: 40px;
    border-radius: 20px;

    border: 1px solid rgb(255, 255, 255);
}

.scrollg {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    min-width: 100px;
    min-height: 50px;
    margin-top: 120px;
    margin-left: 300px;
}





.text {
    font-size: 20px;
}

.item {
    margin-bottom: 18px;
    margin-top: 20px;
}
</style>



