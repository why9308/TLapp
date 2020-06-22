<template>
  <div class="merchant">
    <div class="merchant_header">
      <div class="merchant_header_box">
        <div>
          <h3>{{merchant.name}}</h3>
          <van-rate
            class="star"
            v-model="merchant.score"
            allow-half
            void-icon="star"
            void-color="#eee"
          />
          <span>(661)</span>
          <span>月售661单</span>
        </div>
        <div class="collect">
          <van-icon name="like" color="red" size="30px" />
          <p>已收藏</p>
        </div>
      </div>
      <div class="merchant_header_bottom">
        <van-row type="flex" justify="space-around">
          <van-col span="6">
            起送价
            <p>
              <span>{{merchant.minPrice}}</span>元
            </p>
          </van-col>
          <van-col span="6">
            配送费
            <p>
              <span>{{merchant.deliveryPrice}}</span>元
            </p>
          </van-col>
          <van-col span="6">
            平均配送时间
            <p>
              <span>{{merchant.deliveryTime}}</span>分钟
            </p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="merchant_notice">
      <h3>公告与活动</h3>
      <p>{{merchant.bulletin}}</p>
      <ul>
        <li v-for="item in merchant.supports" :key="item">
          <van-tag type="danger">减</van-tag>
          {{item}}
        </li>
        <li>
          <van-tag color="#7232dd">票</van-tag>该商家支持开发票，请在下单时填好发票抬头
        </li>
        <li>
          <van-tag type="success">保</van-tag>已加入"外卖保"计划，食品安全保障
        </li>
      </ul>
    </div>
    <div class="merchant_liveAction">
      <h3>商家实景</h3>
      <van-row>
        <van-col v-for="item1 in merchant.pics" :key="item1.index">
          <img :src="item1" alt />
        </van-col>
      </van-row>
    </div>
    <div class="merchant_information">
      <h3>商家信息</h3>
      <ul>
        <li>该商家支持开发票，请在下单时填好发票抬头</li>
        <li>品类：其他菜系，包子粥店</li>
        <li>地址：北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340</li>
        <li>营业时间:{{merchant.date}}</li>
      </ul>
    </div>
    <!-- <div @click="btn">{{name}}</div> -->
  </div>
</template>

<script>
import { API_seller, IP } from "@/API/apis";
export default {
  data() {
    return {
      merchant: []
    };
  },
  created() {
    API_seller().then(res => {
      var arr = [];
      res.data.data.pics.forEach(i => {
        arr.push(i.replace("http://127.0.0.1:5000", IP));
      });
      res.data.data.pics = arr;
      this.merchant = res.data.data;
      this.merchant.date =
        this.merchant.date[0].slice(10) + "-" + this.merchant.date[1].slice(10);
    });
  },
 
};
</script>

<style lang="scss" scoped>
.merchant {
  display: flex;
  flex-direction: column;
  background: #f4f5f7;
  overflow-y: scroll;
  height: 100%;
  flex: 1;
  padding-bottom: 60px;
  .merchant_header {
    background: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
    .merchant_header_box {
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      justify-content: space-between;
      h3 {
        margin: 5px 0px;
        color: #09131d;
      }
      .star {
        margin: 10px 10px 20px 0px;
      }
      span {
        margin-right: 15px;
      }
      .collect {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        padding-top: 5px;
        p {
          margin: 0px;
        }
      }
    }
    .merchant_header_bottom {
      padding: 15px 0px 0px;
      .van-col--6 {
        color: #a2a2a3;
        border-right: 1px solid #e8e8e8;
        font-size: 10px;
      }
      p {
        margin: 0px;
        color: #212c35;
        span {
          font-size: 30px;
        }
      }
    }
  }
  .merchant_notice {
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
    h3 {
      margin: 0px;
    }
    p {
      color: #ea1318;
      border-bottom: 1px solid #e8e8e8;
      margin: 0px;
      line-height: 30px;
      padding-bottom: 20px;
      padding-top: 15px;
    }
    ul {
      li {
        border-bottom: 1px solid #e8e8e8;
        line-height: 40px;
        span {
          margin-right: 5px;
        }
      }
    }
  }
  .merchant_liveAction {
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
    h3 {
      margin: 0px;
      margin-bottom: 10px;
    }
    img {
      width: 110px;
      height: 100px;
      padding: 5px;
    }
  }
  .merchant_information {
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
    h3 {
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 15px;
      margin: 0px;
    }
    li {
      line-height: 40px;
      border-bottom: 1px solid #e8e8e8;
      color: #080b14;
    }
  }
}
</style>