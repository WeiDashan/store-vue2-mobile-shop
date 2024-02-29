<template>
  <div class="productDetail">
    <van-loading v-if="orderLoading" color="#0094ff" vertical>正在生成订单，请稍后</van-loading>
    <div class="operator">
      <div class="back" @click="goback">
        <div>
          <van-icon color="#ffffff" size="20" name="arrow-left" />
        </div>
      </div>
    </div>
    <div class="swiper">
      <van-swipe
          class="my-swipe"
          :autoplay="3000"
          indicator-color="white"
          width="100%"
          height="100%">
        <van-swipe-item v-for="(picItem,index) in pics">
          <van-image :src=picItem />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="detail">
      <div class="top">
        <div class="price">
          <div class="price_icon">￥</div>
          <div class="priceNum">{{product.price}}</div>
        </div>
        <div class="collect" @click="clickCollect">
          <div v-if="!hasCollect" class="collectimg">
            <img src='../../image/mine/collect.png' alt=""/>
          </div>
          <div v-if="hasCollect" class="collectimg">
            <img src='../../image/collect-o.png' alt=""/>
          </div>
          <div v-if="!hasCollect" class="collectname">收藏</div>
          <div v-if="hasCollect" class="collectname">已收藏</div>
        </div>
      </div>
      <div class="productName">
        {{product.name}}{{product.skuList}}
      </div>
    </div>
    <div class="details">
      <div class="details_title">详情</div>
      <div>
        <div class="details_rule">规格参数</div>
        <div >
          <div class="details_oneRow" v-for="(item,index) in spuValues">
            <div class="details_oneRow_title">{{item.name}}</div>
            <div class="details_oneRow_content">{{item.value}}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="toCart" />
        <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" />
        <van-goods-action-button
            type="danger"
            text="立即抢购"
            @click="buyNow"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import {Dialog, Toast} from 'vant';
import {AppOrderUrl, AppCartUrl,SecKillUrl, SpuValueUrl} from "@/plugins/api"
export default {
  name: "SecKillDetail",

  data(){
    return{
      productId: 10,
      orderLoading: false,
      pics:[
        "http://49.233.51.52:9000/images/20231106201951638003234.jpg",
        "http://49.233.51.52:9000/images/20231106201951638003234.jpg",
        "http://49.233.51.52:9000/images/20231106201951638003234.jpg"
      ],
      show: false,
      addCartBtn: false,
      buyNowBtn: false,
      goods: {
        // 默认商品 sku 缩略图
        picture: 'http://49.233.51.52:9000/images/20231106201951638003234.jpg'
      },
      goodsId: 10,
      product:{
        active: 1,
        brandId: 1,
        hotStatus: 1,
        id: 10,
        img: "http://49.233.51.52:9000/images/20231106201951638003234.jpg",
        keywords: "",
        name: "衬衣",
        newStatus: 0,
        pics:
            ["http://49.233.51.52:9000/images/20231106201951638003234.jpg",
              "http://49.233.51.52:9000/images/20231106201951638003234.jpg",
              "http://49.233.51.52:9000/images/20231106201951638003234.jpg"],
        price: 111,
        publishStatus: 0,
      },
      skuValues:[
        {
          id: 5,
          name: "尺码",
          productId: 10,
          value: ["XXL"],
        },
        {
          id: 6,
          name: "颜色",
          productId: 10,
          value: ["粉色","西瓜红"],
        }
      ],
      spuValues:[
        {
          id: 11,
          name: "商品名称",
          productId: 10,
          value: "衬衣",
        },
        {
          id: 13,
          name: "上市时间",
          productId: 10,
          value: "1111",
        },
        {
          id: 14,
          name: "材质",
          productId: 10,
          value: "111",
        },
        {
          id: 15,
          name: "袖长",
          productId: 10,
          value: "111",
        }
      ],
      address : '',
      name : "",
      phone : "",
      userId : 105,
      hasCollect: false,
    }
  },
  created() {
    if (this.$route.query.product.id===undefined){
      Toast("未获取到商品ID，请先选择商品，再进入该页面")
      this.$router.push({
        path:'/'
      })
    }else {
      this.product = this.$route.query.product
      let arr = JSON.parse(this.product.skuList);
      let str = " "
      arr.forEach(obj=>{
        str += obj.value+" ";
      })
      this.product.skuList = str
      this.product.pics = this.product.pics.split(",")
      this.product.pics.forEach((item,index)=>{
        this.product.pics[index] = this.$store.getters.GET_IMGSRC+item.trim()
      })
      this.pics = this.product.pics
      this.get(SpuValueUrl.getSpuValuesByProductId,{productId: this.product.id},response=>{
        this.spuValues = response;
      })
    }
  },
  methods:{
    goback(){
      this.$router.go(-1)
    },

    toCart(){
      this.$router.push({
        path: '/cart',
        query:{
        }
      })
    },
    onClickIcon() {
      Toast('点击图标');
    },
    getOrderBySecKillIdAndUserId(){
      this.get(SecKillUrl.getOrderBySecKillIdAndUserId,{
        secKillId: this.product.secKillId,
        userId: this.$store.getters.GET_USERID,
      }, response=>{
        // console.log(response)
        if (response===1){
          this.orderLoading = false
          this.$router.push({
            path:'/orders'
          })
        }
      })
    },
    buyNow(){
      if (this.$store.getters.GET_USERID<0){
        this.$router.push({
          path:'/login'
        })
      }else{
        this.orderLoading = true
        this.post(SecKillUrl.secKillNow,{
          userId: this.$store.getters.GET_USERID,
          secKillId: this.product.secKillId,
          stockId: this.product.stockId
        }, ()=>{
          setTimeout(this.getOrderBySecKillIdAndUserId, 2000)
        })
        setTimeout(()=>{
          this.orderLoading = false
        },4000)
      }
    },
    createOrder(item){

    },
    clickCollect(){

    },
    define(item){
      // console.log(item)
      if (this.$store.getters.GET_USERID<=0){
        this.$router.push({
          path:'/login'
        })
      }else{
        this.createOrder(item)
      }

    }
  }
}
</script>

<style scoped lang="less">
@maincolor: #f7f8fa;
.productDetail{
  background-color: @maincolor;
  .operator{
    .back{
      height: 30px;
      width: 30px;
      border-radius: 50%;
      opacity: 0.5;
      background-color: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      z-index: 99;
      left: 10px;
      top: 16px;
      .van-icon{
        width: 100%;
        height: 100%;
      }
      .van-icon-arrow-left{
        width: 100%;
        height: 100%;
      }
    }
  }
  .swiper{
    width: 100%;
    height: 300px;
    overflow: hidden;
    .my-swipe{
      width: 100%;
      height: 100%;
      .van-image{
        width: 100%;
        height: 100%;
      }
    }
  }
  .detail{
    padding: 14px;
    background-color: #ffffff;
    .top{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 10px;
      .price{
        display: flex;
        flex-direction: row;
        align-items: center;
        /*background-color: red;*/
        color: red;
        .price_icon{
          font-size: 14px;
          font-weight: bold;
        }
        .priceNum{
          font-size: 20px;
          font-weight: bolder;
        }
      }
      .collect{
        display: flex;
        flex-direction: column;
        align-items: center;
        .collectimg{
          height: 14px;
          width: 14px;
          margin-bottom: 2px;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .collectname{
          font-size: 10px;
          color: #4b4b4b;
        }
      }
    }
    .productName{
      font-size: 16px;
      font-weight: bold;
      text-align: justify;
    }
  }
  .skuDiv{

  }
  .details{
    background-color: #ffffff;
    padding: 0 10px 10px;
    margin-bottom: 50px;
    margin-top: 10px;
    .details_title{
      font-size: 12px;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
    }
    .details_rule{
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-weight: bolder;
      color: #494949;
      border-top: 1px solid #808080;
      border-left: 1px solid #808080;
      border-right: 1px solid #808080;
    }
    .details_oneRow:last-child {
      border-bottom: 1px solid #808080;
    }
    .details_oneRow{
      display: flex;
      flex-direction: row;
      border-top: 1px solid #808080;
      border-left: 1px solid #808080;
      border-right: 1px solid #808080;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: #808080;
      .details_oneRow_title{
        padding-left: 20px;
        width: 25%;
        /*background-color: pink;*/
      }
      .details_oneRow_content{
        /*width: 75%;*/
        padding-left: 10px;
        border-left: 1px solid #808080;
        /*background-color: red;*/
      }
    }
  }
}

</style>