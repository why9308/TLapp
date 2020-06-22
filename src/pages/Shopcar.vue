<template>
    <div id="shopcar">
       <van-card
              v-for="(i,index) in shoplist"
              :key="index"
              :price="i.price"
              :num="i.num"
              :title="i.name"
              :thumb="i.imgUrl"
            >
              <template #footer>
                  <button class="countbtn1" v-show="i.num>0" @click="countbtn(-1,i.id)">-</button>
                  <label class="label"  v-show="i.num>0">{{i.num}}</label>
                  <button class="countbtn" @click="countbtn(+1,i.id)">+</button>
              </template>
            </van-card>
    </div>
</template>

<script>
    export default {
        
    computed:{
       shoplist(){        
           return  this.$store.getters.shoplist
       },
       subtotal(){
           return this.$store.getters.shoplist
       }
    },
    methods:{
        countbtn(val,id){              
            this.$store.commit("countnum",{id,val})       
        }
    } 
}
</script>

<style lang="scss" scoped>
#shopcar{
   height: 265px;
   overflow: auto;
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
</style>