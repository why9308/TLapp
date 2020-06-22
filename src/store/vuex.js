import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
// 创建一个Vuex实例仓库
const store = new Vuex.Store({
    state: {
        goodslist: []
    },

    mutations: {
        changegoods(state, arr) {
            state.goodslist = arr
        },
        countnum(state, parms) {
            for (let obj of state.goodslist) {
                for (let obj1 of obj.foods) {
                  if(obj1.id==parms.id){
                    obj1.num+=parms.val
                    return
                  }
                }
            }
                
        }

    },
    getters: {
        shoplist(state) {
            let arr1 = []
            for (let obj of state.goodslist) {
                for (let obj1 of obj.foods) { 
                    if (obj1.num > 0) {
                        arr1.push(obj1)                 
                    }                 
                }  
            }                    
            return arr1
        }
        

    }
})
// console.log(state.goodslist);

export default store