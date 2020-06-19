<template>
  <div id="goods">
    <div class="goods_left">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="item in list" :key="item.name" :title="item.name" badge />
      </van-sidebar>
    </div>
    <div class="goods_right">
      <div v-for="item in list" :key="item.name">
        <p>{{item.name}}</p>
        <van-card 
          v-for="item1 in item.foods" :key="item1.id"
          :price="item1.price"
          :desc='"月销量"+item1.sellCount+"  好评率"+item1.rating+"%"'
          :title="item1.name"
          :thumb="item1.imgUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { API_list} from "@/API/apis";
export default {
  data() {
    return {
      //   侧栏
      list: [
        {
          name: "",
          foods: ""
        }
      ],
      activeKey: 0
    };
  },
  methods: {},
  created() {
    API_list().then(res => {
      this.list = res.data.goodsList;
    });
  }
};
</script>

<style lang="scss" scoped>
#goods {
  display: flex;
  flex: 1;
  height: 100%;
  overflow-y:scroll;
  .goods_left {   
    padding-left: 10px;
    height: 100%;
    overflow-y: scroll;
  }
  .goods_right {
    flex: 1;
    overflow: scroll;
    height:100%;
    p{
      background: #F4F5F7;
      color: #A8ACB0;
      line-height: 30px;
      margin-top:0px;
      font-size: 12px;
    }
    .van-card__title{
      color: #283139;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .van-card__price{
      color:red;
    }
  }
}
</style>