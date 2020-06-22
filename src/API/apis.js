import axios from "axios"
//设置服务器IP地址

// axios.defaults.baseURL="http://localhost:5000"
// export const IP="http://localhost:5000"

//  export const IP="http://172.20.10.9:5000"
 export const IP="http://192.168.101.91:5000"
 axios.defaults.baseURL=IP

// 获取商品数据
export const API_list=()=>axios.get("/goods/goods_list")
//获取商家
export const API_seller=()=>axios.get("/shop/seller")
//获取评价
export const API_ratings=()=>axios.get("/shop/ratings")
