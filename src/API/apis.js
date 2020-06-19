import axios from "axios"
//设置服务器IP地址
 axios.defaults.baseURL="http://localhost:5000"
// axios.defaults.baseURL="http://192.168.101.206:5000"

// 获取商品数据
export const API_list=()=>axios.get("/goods/goods_list")
//获取商家
export const API_seller=()=>axios.get("/shop/seller")