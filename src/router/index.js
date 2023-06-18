import Vue from 'vue'
import VueRouter from 'vue-router'
import MyList from '../components/MyList'
import Detail from '../components/Detail'
import AuthorList from '../components/AuthorList'
import authorDetail from '../components/authorDetail'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    name: 'allart',
    path: '/allart',
    component: MyList,
  },
  {
    name: 'detail',
    path: '/detail',
    component: Detail
  },
  {
    path: '/',
    redirect: '/allart'
  },
  {
    name: 'authorList',
    path: '/authorList',
    component: AuthorList
  },
  {
    name: 'authorDetail',
    path: '/authorDetail',
    component: authorDetail
  },


]

const router = new VueRouter({
  routes
})

export default router
