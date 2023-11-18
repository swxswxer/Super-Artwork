import Vue from 'vue'
import VueRouter from 'vue-router'
import MyList from '../components/MyList'
import Detail from '../components/Detail'
import AuthorList from '../components/AuthorList'
import authorDetail from '../components/authorDetail'
import Login from '../views/loginRegister.vue'
import HomePage from '../views/HomePage.vue'
import test from '../views/test.vue'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [


  // {
  //   path: '/',
  //   redirect: '/allart'
  // },
  {
    path: '/',
    namee: 'Login',
    component: Login
  },
  {
    path: '/login',
    namee: 'Login',
    component: Login
  },

  {
    path: '/home',
    name: 'home',
    component: HomePage,
    children: [
      {
        path: '/',
        component: MyList,
      },
      {
        name: 'detail',
        path: '/detail',
        component: Detail
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

  },


  // {
  //   name: 'login',
  //   path: '/login',
  //   component: Login
  // },
  {
    path: '/test',
    name: 'test',
    component: test
  },


]

const router = new VueRouter({
  routes
})

export default router
