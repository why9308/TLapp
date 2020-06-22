<template>
  <div class="evaluate">
    <div class="evaluate_header">
      <div>
        <div class="evaluate_header_left">
          <p>{{average}}</p>
          <h5>综合评分</h5>
          <div>高于周边商家69.%</div>
        </div>
        <div class="evaluate_header_right">
          <div>
            服务态度
            <van-rate class="start" v-model="value" allow-half void-icon="star" void-color="#eee" />
            <span>4.0</span>
          </div>
          <div>
            服务态度
            <van-rate class="start" v-model="value1" allow-half void-icon="star" void-color="#eee" />
            <span>4.0</span>
          </div>
          <p>
            送达时间：
            <span>38分钟</span>
          </p>
        </div>
      </div>
    </div>
    <div class="evaluate_bottom">
      <div class="top">
        <van-tag type="primary">全部</van-tag>
        <van-tag class="span" color="#CCECF7">满意</van-tag>
        <van-tag class="span" color="#EAEBED">不满意</van-tag>
        <div class="box">
          <van-radio-group v-model="radio">
            <van-radio name="1">只看有内容的评价</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="bottom">
        <div class="cont" v-for="(item,index) in evaluate" :key="index">
          <div class="cont_box1">
            <van-image round width="2rem" height="2rem" :src="item.avatar" />
          </div>
          <div class="cont_box2">
            <div>{{item.username}}</div>
            <van-rate v-model="item.score" allow-half void-icon="star" void-color="#eee" />
            <span class="cont_box2_span">{{item.deliveryTime+"分钟送达"}}</span>
            <p>{{item.text}}</p>
            <van-row type="flex">
              <van-col class="good" v-for="(item1, index) in item.recommend" :key="index">{{item1}},</van-col>
            </van-row>
            <div class="cont_box3">{{(new Date(item.rateTime).toLocaleString())}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_ratings } from "@/API/apis";
export default {
  data() {
    return {
      evaluate: [],
      value: 4.0,
      value1: 4.0,
      radio: "1",
      value2: 4
    };
  },
  created() {
    API_ratings().then(res => {
      this.evaluate = res.data.data;
    });
  },
  computed: {
    average: function() {
      var newscore = this.evaluate.map(item => item.score);
      var num = 0;
      for (let i = 0; i < newscore.length; i++) {
        num += newscore[i];
      }
      return (num / newscore.length).toFixed(1);
    }
  }
};
</script>
    
<style lang="scss" scoped>
.evaluate {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  padding-bottom: 60px;
  background: #f4f5f7;
  overflow-y: scroll;
  .evaluate_header {
    background: #fff;
    padding: 10px;
    margin-bottom: 20px;
    div {
      display: flex;
      justify-content: space-between;
      .evaluate_header_left {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid #e8e8e8;
        padding-right: 20px;
        p {
          margin: 0px;
          font-size: 25px;
          color: #ff9e0c;
        }
        h5 {
          margin: 0px;
        }
        div {
          margin-top: 5px;
          color: #91969c;
        }
      }
      .evaluate_header_right {
        display: flex;
        flex-direction: column;
        div {
          .start{
              margin-left: 10px;
          }
          span {
            color: #ff9e0c;
          }
        }
        p {
          margin: 0;
          span {
            color: #91969c;
          }
        }
      }
    }
  }
  .evaluate_bottom {
    padding: 20px;
    background: #fff;
    .top {
      padding-bottom: 30px;
      border-bottom: 1px solid #e8e8e8;
      span {
        display: inline-block;
        text-align: center;
        line-height: 30px;
        width: 50px;
        margin-right: 10px;
      }
      .span {
        color: #526069;
      }
      .box {
        padding-top: 20px;
      }
    }
    .bottom {
      .cont {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 1px solid #e8e8e8;
        margin-top: 10px;
        .cont_box1 {
          width: 30px;
        }
        .cont_box2 {
          flex: 1;
          margin-left: 5px;

          .cont_box3 {
            position: absolute;
            right: 0px;
            top: 0px;
            color: #909598;
          }
        }
        div {
          line-height: 20px;
        }
        .cont_box2_span {
          margin-left: 5px;
          color: #909598;
        }
        p {
          margin: 0;
          font-size: 17px;
        }
        .good {
          font-size: 13px;
          border: 1px solid #909598;
          margin-left: 3px;
        }
      }
    }
  }
}
</style>