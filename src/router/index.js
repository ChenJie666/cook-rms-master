import Vue from "vue"
import Router from "vue-router"
import App from "../App";


// 路由懒加载
const Login = () => import('../views/Login');
const Home = () => import('../views/Home');
const Index = () => import('../views/Index');
const ViewPage = () => import('../views/viewpager/ViewPage');
const AppEcharts =() => import('../views/echarts/AppEcharts');
const Menu =() => import('../views/menu/Menu');
const AddMenu =() => import('../views/menu/AddMenu');
const MenuDraft =() => import('../views/menu/MenuDraft');
const MenuDetail =() => import('../views/menu/MenuDetail');

const Clock =() => import('../views/application/Clock.vue');
const Weather =() => import('../views/application/Weather.vue');
const Festival =() => import('../views/application/Festival.vue');
const ShortMessage =() => import('../views/application/ShortMessage.vue');
const Voice =() => import('../views/application/Voice.vue');
const DevicePush =() => import('../views/application/DevicePush.vue');


Vue.use(Router);


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        children: [
            {path: '/', component: Index},
            {path: '/user', component: ViewPage},
            {path: '/echarts',component: AppEcharts},
            {path: '/menu',component: Menu},
            {path: '/menu/add',component: AddMenu},
            {path: '/menu/draft',component: MenuDraft},
            {path: '/menu/detail',component: MenuDetail},

            {path: '/application/clock',component: Clock},
            {path: '/application/weather',component: Weather},
            {path: '/application/festival',component: Festival},
            {path: '/application/shortmessage',component: ShortMessage},
            {path: '/application/voice',component: Voice},
            {path: '/application/devicepush',component: DevicePush}
        ]
    }
];


export default new Router({
    routes,
})
