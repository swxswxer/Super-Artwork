<template>
    <el-card class="scroll3">
        <div>
            <span style="font-size: 30px;">评论</span>
        </div>
        <el-card class="scroll4">
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6 }" placeholder="请输入内容" v-model="input">
            </el-input>
            <el-button type="primary"
                style="min-width: 100px;
                                                                                                                                                 float: right; 
                                                                                                                                                 min-height: 50px;
                                                                                                                                                  margin-top: 10px; 
                                                                                                                                                  font-size: 15px; "
                @click="publishedComment">发表
            </el-button>
        </el-card>
        <el-card v-for="comment in comments" :key="comment.commentId" class="scroll4">
            <i class="el-icon-user"> 匿名用户:</i>
            <i class="el-icon-date" style="float: right;"> {{ comment.date }}</i>
            <div class="scroll5">{{ comment.comment }}</div>
        </el-card>
        <div v-if="comments.length < 1" class="scroll6">暂时没有评论,快来评论吧！</div>
    </el-card>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
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
            paintingId: 0
        }
    },
    methods: {
        getCommentByPaintingId(id) {
            const formData = new FormData();
            formData.append('paintingId', id);
            axios.post('http://localhost:8081/comment/getCommentByPaintingId', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    // console.log(res);
                    this.comments = res.data.data
                    console.log(this.comments);
                })
        },

        publishedComment() {

            const formData = new FormData();
            console.log(this.paintingId);
            console.log(this.input);
            formData.append('paintingId', this.paintingId);
            formData.append('comment', this.input);
            axios.post('http://localhost:8081/comment/publishedComment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.publishedSuccessAlert()
            this.input = ''
            setTimeout(() => {
                this.getCommentByPaintingId(this.paintingId)
            }, 500);

        },

        publishedSuccessAlert() {
            this.$alert('发表评论成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${action}`
                    });
                }
            });
        }
    },

    mounted() {
        this.$bus.$on('getPaintingId', (id) => {
            this.paintingId = id
            this.getCommentByPaintingId(id)
        })
    },


}


</script>
<style>
.scroll3 {
    float: left;
    width: 1545px;
    height: auto;
    padding: .75rem;
    margin-left: 200px;
    margin-top: 50px;
    border: 1px solid rgb(255, 255, 255);
    /* display: flex; */
    justify-content: center;
    align-items: center;
    border-radius: 20px;
}

.scroll4 {
    /* float: left; */
    width: 1450px;
    height: 200px;
    padding: .75rem;
    /* margin-left: 200px; */
    margin-top: 30px;
    border: 1px solid rgb(236, 234, 234);
    /* display: flex; */
    /* justify-content: center; */
    align-items: center;
    border-radius: 20px;
}

.scroll5 {
    /* float: left; */
    width: 1300px;
    height: 100px;
    padding: .75rem;
    /* margin-left: 60px; */
    margin-top: 30px;
    /* border: 1px solid rgb(221, 221, 221); */
    /* display: flex; */
    /* justify-content: center; */
    align-items: center;
    border-radius: 20px;
}

.scroll6 {
    /* float: left; */
    width: 1300px;
    height: 100px;
    padding: .75rem;
    margin-left: 70px;
    margin-top: 30px;
    /* border: 1px solid rgb(221, 221, 221); */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    font-size: 15px;
    color: #757575;

}
</style>