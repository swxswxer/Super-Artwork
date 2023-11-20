<template>
    <el-table max-height="500" min-height="500" :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="画作名称">
                        <span>{{ props.row.paintingName }}</span>
                    </el-form-item>
                    <el-form-item label="所属作者">
                        <span>{{ props.row.artist }}</span>
                    </el-form-item>
                    <el-form-item label="画作 ID">
                        <span>{{ props.row.paintingId }}</span>
                    </el-form-item>
                    <el-form-item label="订单 ID">
                        <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="画作分类">
                        <span>{{ props.row.style }}</span>
                    </el-form-item>
                    <el-form-item label="参考价">
                        <span>{{ props.row.price }}</span>
                    </el-form-item>
                    <el-form-item label="画作描述">
                        <span>{{ props.row.description }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>

        <el-table-column label="画作 ID" prop="paintingId">
        </el-table-column>
        <el-table-column label="画作名称" prop="paintingName">
        </el-table-column>
        <el-table-column sortable label="购买日期" prop="date">
        </el-table-column>
    </el-table>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            resData: [

            ],
            tableData: [

            ],
            arts: [

            ],

        }
    },
    mounted() {
        const id = this.$cookies.get('userId')
        // const id = 1
        this.getRecordingByUserId(id)




    },
    methods: {
        getRecordingByUserId(id) {
            const formData = new FormData();
            formData.append('userId', id);
            axios.post('http://localhost:8081/Recording/getCommentByUserId', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res.data.data);
                    this.resData = res.data.data
                    // console.log(this.resData)

                    this.resData.forEach((item, index) => {
                        // console.log(item + '' + index)
                        axios.get(`http://localhost:8081/painting/${item.paintingId}`).then(res => {
                            // console.log(res.data.data);
                            // this.arts.push(res.data.data)
                            // this.tableData[index].paintingId = res.data.data.id
                            this.tableData.push({
                                paintingId: res.data.data.id,
                                paintingName: res.data.data.name,
                                description: res.data.data.description,
                                price: 1000,
                                style: res.data.data.style,
                                artist: res.data.data.artist,
                                id: item.id,
                                date: item.date

                            })
                            // console.log(this.tableData[index])
                        })

                    })


                })
        }
    }
}
</script>




<style>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>

  