<template>
  <div id="box">
    <div id="header">
      <div class="header_box">
        <img :src="merchant.avatar" alt />
        <div class="header_box_right">
          <p class="p1">
            <img :src="imgUrl1" class="img" alt />
            <span class="span1" is-link @click="showPopup">{{merchant.name}}</span>
          </p>
          <p>
            <span>{{merchant.description}} /</span>
            <span>{{merchant.deliveryTime}}分钟送达</span>
          </p>
          <p class="p2">
            <img :src="imgUrl2" alt />
            <span>在线支付满28-5,满50减10</span>
          </p>
        </div>
      </div>
      <div class="header_bottom">
        <van-notice-bar color="#B7B5B2" background="#47403A" :text="merchant.bulletin" />
      </div>
    </div>
    <div id="main">
      <router-link to="/">商品</router-link>
      <router-link to="/evaluate">评论</router-link>
      <router-link to="/merchant">商家</router-link>
    </div>
    <router-view></router-view>
    <div @click="showboard=!showboard" id="box_bottom">
      <div class="radious">
        <div class="radious1">
          <img :src="img" alt="">
        </div>
      </div>
      <div class="right">
        <div class="right_box">
          ￥
          <span class="span1">{{allprice}}</span>
           <p class="right_p">
          另需配送费￥
          <span>{{merchant.deliveryPrice}}</span>
        </p>
        </div>
        <van-button class="spancolor" color="#FFC030">
          ￥
          <span >{{merchant.minPrice}}</span>起送
        </van-button>
      </div>
    </div>
    <transition id="shopcar" name="slide-fade">
      <div v-show="showboard" class="shop-board">
        <shopcar></shopcar>
      </div>
    </transition>
  </div>
</template>

<script>
import { API_seller, IP } from "@/API/apis";
import shopcar from "./Shopcar";

export default {
  data() {
    return {
      imgUrl: require("../assets/images/5.jpg"),
      imgUrl1: require("../assets/images/brand@2x.png"),
      imgUrl2: require("../assets/images/decrease_1@2x.png"),
      //   导航
      active: 0,
      showboard: false,

      //   弹出层
      show: false,
      merchant: []
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    // activebtn(e){
    //  console.log(e.target);
    shopbtn() {
      this.showboard = true;
    }
    // }
  },
  created() {
    API_seller().then(res => {
      res.data.data.avatar = res.data.data.avatar.replace(
        "http://127.0.0.1:5000",
        IP
      );
      // console.log( res.data.data.avatar);
      this.merchant = res.data.data;
    });
  },
  components: {
    shopcar
  },
  computed:{
      allprice(){
          let totalprice=0
          for(let obj of this.$store.getters.shoplist){
               totalprice+=obj.num*obj.price
            
          } 
          return  totalprice.toFixed(2)
      },
      img(){
        if(this.$store.getters.shoplist.length>0){
            return require("../assets/images/shopcar.png")
        }
         return require("../assets/images/shopcar1.png")
      }
  }
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(300px);
  opacity: 0;
}
#box {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
  #header {
    padding-top: 20px;
    background: url(../assets/images/3.jpg) no-repeat;
    background-size: 100% 100%;
    height: 180px;
    .header_box {
      display: flex;
      margin-left: 15px;
      img {
        width: 100px;
        height: 120px;
      }
      .header_box_right {
        padding-left: 15px;

        .p1 {
          display: flex;
          .span1 {
            font-size: 20px;
            font-weight: bold;
          }
          .img {
            width: 40px;
            height: 25px;
            margin-right: 5px;
          }
        }
        .p2 {
          display: flex;
          img {
            width: 24px;
            height: 24px;
            margin-right: 5px;
          }
          span {
            font-size: 15px;
          }
        }
      }
    }
    .header_bottom {
      background: #463f39;
      line-height: 30px;
      color: #fff;
      // display: flex;
      align-items: center;

      img {
        margin-left: 20px;
        height: 20px;
        width: 30px;
        margin-right: 10px;
      }
    }
  }
  #main {
    display: flex;
    justify-content: space-around;
    line-height: 40px;
    border-bottom: 1px solid #e4e4e4;
    a {
      color: #5e666c;
    }
  }
  #box_bottom {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background: #141c27;
    display: flex;
    justify-content: flex-end;
    z-index: 100;
    .radious {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 55px;
      width: 55px;
      border-radius: 50%;
      background: #141c27;
      position: absolute;
      top: -10px;
      left: 12px;
      .radious1 {
        justify-content: center;
        align-items: center;
        display: flex;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        // background: #2b343d;
      }
    }
     .right {
       display: flex; 
      align-items: center;
      .right_box {
          display: flex;
         align-items: center;
        justify-content: space-around;
        color: #fff;
        font-size: 25px;
        
        .span1{
          margin-right: 10px;
          border-right: 1px solid #929397;
          padding-right: 5px;
        }
      }
      .right_p {
        color: #929397;
        font-size: 12px;
        margin-right: 5px;
      }
      .spancolor{
        color:#333333;
      }
      button {
        height: 100%;
        flex: 1 1 auto;
      }
    }
  }
  #shopcar {
    bottom: 60px;
    position: fixed;
    width: 100%;
    background-color: beige;
  }
}
</style>