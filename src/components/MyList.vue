<template>
  <div>
    <el-card class="card" v-for="art in arts" :key="art.id">
      <el-tooltip placement="top">
        <div slot="content">画名:{{ art.name }}<br />作者:{{ art.artist }}<br />发布时间:{{ art.date }}</div>
        <div @click="showArt(art.id)">
          <a target="_blank">
            <el-image style="width: 200px; height: 250px " :src="art.image"></el-image>
          </a>
          <p class="card-text">{{ art.name }}</p>
        </div>
      </el-tooltip>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import VueRouter from 'vue-router'
export default {
  name: 'MyList',
  data() {
    return {
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
      input: ''
    }
  },
  mounted() {
    this.getArts()
    this.$bus.$on('searchByStyle', (style) => {
      this.searchByStyle(style)
    })

    this.$bus.$on('searchByName', (arts) => {
      console.log(arts);
      this.arts = arts
    })

    this.$bus.$on('zhuye', () => {
      this.getArts()
    })
  },
  methods: {
    getArts() {
      axios.get('http://localhost:8081/painting').then(res => {
        this.arts = res.data.data
      })
    },

    showArt(PaintingId) {
      this.$router.push({
        name: 'detail',
        query: {
          id: PaintingId
        }
      })
    },

    searchByStyle(style) {
      const formData = new FormData();
      formData.append('style', style);
      axios.post('http://localhost:8081/painting/searchByStyle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          console.log(res);
          this.arts = res.data.data
        })

    },
  }
}

</script>

<style scoped>
.album {
  min-height: 50rem;
  /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {

  float: left;
  width: 300px;
  height: 400px;
  padding: .75rem;
  border: 1px solid #efefef;
  text-align: center;
  margin-left: 100px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;

}



.card-text {
  font-size: 20px;
}
</style>
