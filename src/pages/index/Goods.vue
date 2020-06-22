<template>
  <div class="goodss">
    <div v-show="loading" id="goods">
      <div id="goods_left_box" class="goods_left">
        <div>
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              @click="btn(index)"
              v-for="(item,index) in goodslist"
              :key="item.name"
              :title="item.name"
              badge
            />
          </van-sidebar>
        </div>
      </div>
      <div id="goods_right_box" class="goods_right">
        <div>
          <div v-for="(item,index) in goodslist" :id="index" :key="item.name">
            <p>{{item.name}}</p>
            <van-card
              v-for="(i,index) in item.foods"
              :key="index"
              :price="i.price"
              :desc="'月销量'+i.sellCount+  '好评率'+i.rating+'%'"
              :title="i.name"
              :thumb="i.imgUrl"
            >
              <template #footer>
                  <button class="countbtn1" v-show="i.num>0" @click="countbtn(-1,i.id)">-</button>
                  <label class="label" v-show="i.num>0">{{i.num}}</label>
                  <button class="countbtn"  @click="countbtn(+1,i.id)">+</button>
              </template>
            </van-card>
          </div>
        </div>
      </div>
    </div>
    <!-- 提升用户体验,默认占位 -->
    <img  v-show="!loading" src="@/assets/images/66.jpg" alt />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { API_list, IP } from "@/API/apis";
export default {
  data() {
    return {
      activeKey: 0,
      // 默认占位
      loading:false,
    };
  },
  methods: {
    btn(index) {
      this.boxright.scrollToElement(document.getElementById(index), 1000);
    },
    countbtn(val,id){    
        this.$store.commit("countnum",{id,val})       
    }
  },
  created() {
    API_list().then(res => {
      // 模拟网络延迟      
      // setTimeout(() => {
        this.loading=true
       for( let obj of res.data.goodsList){       
         for(let obj1 of obj.foods){
             obj1.num=0
            obj1.imgUrl= obj1.imgUrl.replace("http://127.0.0.1:5000", IP)
         }
       }     
        this.$store.commit("changegoods",res.data.goodsList)  
       
      // }, 1000);
    });
  },
  mounted() {
    var boxleft = new BScroll("#goods_left_box", {
      click: true
    });
    this.boxright = new BScroll("#goods_right_box", {
      click: true,
      probeType: 3
    });
    this.boxright.on("scroll", obj => {
      // 总滚动距离
      var num = Math.abs(obj.y);
      //  取整
      var num1 = Math.floor(num);
      for (let obj of this.get) {
        if (num1 >= obj.min && num1 < obj.max) {
          this.activeKey = obj.index;
          break;
        }
      }
    });
    console.log(boxleft);
  },
  computed: {
    get() {
      var heightarr = [];
      var totalheight = 0;
      for (let i = 0; i < this.goodslist.length; i++) {
        var height = document.getElementById(i).offsetHeight;
        heightarr.push({
          index: i,
          max: height + totalheight,
          min: totalheight
        });
        totalheight = totalheight + height;
      }
      return heightarr;
    },
    goodslist(){
      // console.log(this.$store.state.goodslist);
      return this.$store.state.goodslist
      
      
    }
  }
};
</script>

<style lang="scss" scoped>
.goodss {
   flex: 1;
   height: 100%;
   padding-bottom: 80px;
    overflow: auto;
  #goods {
    display: flex;
   
    height: 100%;
    overflow-y: scroll;
   
    .goods_left {
      padding-left: 10px;
      height: 100%;
      overflow-y: scroll;
    }
    .goods_right {
      flex: 1;
      overflow-y: scroll;
      height: 100%;
      .goods_right_show {
        button {
          border-radius: 50%;
          background: skyblue;
          height: 30px;
          width: 30px;
        }
      }
      p {
        background: #f4f5f7;
        color: #a8acb0;
        line-height: 30px;
        margin-top: 0px;
        font-size: 12px;
      }
      .van-card__title {
        color: #283139;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .van-card__price {
        color: red;
      }
    }
    .countbtn{
      background: #FFCA4F;
      border-radius: 50%;
      border: none;
      width: 22px;
      height: 22px;
      color: #373633;
      font-size: 20px;
      margin-left: 5px;
       padding-top:1px;
    }
     .countbtn1{
      background: #FFFFFF;
      border-radius: 50%;
      border: none;
      width: 22px;
      height: 22px;
      color: #B0B0B0;
      font-size: 20px;
      border: 1px solid #B0B0B0;
      margin-right: 5px;
      padding: 0px;
    }
    .label{
      font-size: 15px;
    }
  }
  img{
    width: 100%;
  }
}
</style>