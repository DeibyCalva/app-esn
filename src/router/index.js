import Vue from 'vue'
import VueRouter from 'vue-router'
import cookie from "../cookie/inicio_sesion";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Iniciar Sesion',
    component: () => import('../views/inicio_sesion.vue'),
  },
  {
    path: '/inicio',
    name: 'Inicio',
    props: true,
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/producto',
        name: 'Producto',
        props: true,
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/fragmentos/producto.vue')
      },
      {
        path: '/perfil',
        name: 'Perfil',
        props: true,
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/fragmentos/perfil.vue')
      }
    ]
  },
]

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  cookie.checkAuth();
  if (to.path != '/' && to.meta.requiresAuth) {
    //console.log(cookie.auth)
    if (cookie.auth == false) {
      next('/');
    } else {
      next();
    }
  } else {
    //console.log("== Login")
    if (cookie.auth == true) {
      next('/producto');
    } else {
      next();
    }
  }
})


export default router
