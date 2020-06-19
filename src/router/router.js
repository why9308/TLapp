import Vue from "vue"
import Router from "vue-router"
import goods from "../pages/index/Goods"

Vue.use(Router)
const router=new Router({
    routes:[{
        path:"/",
        name:"goods",
        component:goods
    },
    {
        path:"/evaluate",
        name:"evaluate",
        component:()=>import("../pages/index/Evaluate")
    },{
        path:"/merchant",
        name:"merchant",
        component:()=>import("../pages/index/Merchant")
    }]
})
export default router