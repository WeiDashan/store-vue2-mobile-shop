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
                {{product.name}}
            </div>
        </div>
        <div class="details">
            <div class="details_title">详情</div>
            <div>
                <div class="details_rule">规格参数</div>
                <div >
<!--                    <div class="details_oneRow">-->
<!--                        <div class="details_oneRow_title">商品编号</div>-->
<!--                        <div class="details_oneRow_content">{{productId}}</div>-->
<!--                    </div>-->
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
                        type="warning"
                        text="加入购物车"
                        @click="addcart"
                />
                <van-goods-action-button
                        type="danger"
                        text="立即购买"
                        @click="buyNow"
                />
            </van-goods-action>
        </div>
        <div class="skuDiv">
            <van-sku
                    v-model="show"
                    :sku="sku"
                    :goods="goods"
                    :goods-id="goodsId"
                    :hide-stock="sku.hide_stock"
                    :show-add-cart-btn="false"
                    buy-text="确定"
                    @buy-clicked="define"
            />
        </div>
    </div>
</template>

<script>
    import {Dialog, Toast} from 'vant';
    import {AppOrderUrl, AppCartUrl} from "@/plugins/api"
    export default {
        name: "productDetail",

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

                sku: {
                    tree: [
                        {
                            k: '颜色',// skuKeyName
                            k_s: '颜色',// skuKeyStr
                            v: [
                                {
                                    id: '粉色',// skuValueId
                                    name: '粉色', // skuValueName
                                },
                                {
                                    id: '西瓜红',
                                    name: '西瓜红',
                                }
                            ],
                        },
                        {
                            k: '尺寸',// skuKeyName
                            k_s: '尺寸',// skuKeyStr
                            v: [
                                {
                                    id: 'S',// skuValueId
                                    name: 'S', // skuValueName
                                }
                            ],
                        }
                    ],
                    list: [
                        {
                            id: 5,// skuId
                            '颜色': '粉色',// 规格类目 k_s 为 s1 的对应规格值 id
                            '尺寸': 'S',// 规格类目 k_s 为 s2 的对应规格值 id
                            price: 100,
                            stock_num: 110
                        },
                        {
                            id: 6,// skuId
                            '颜色': '西瓜红',// 规格类目 k_s 为 s1 的对应规格值 id
                            '尺寸': 'S',// 规格类目 k_s 为 s2 的对应规格值 id
                            price: 120,
                            stock_num: 120
                        }
                    ],
                    price: "1.00",
                    stock_num: 227,
                    hide_stock: false
                },
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
                stocks:[
                    {
                        id: 5,
                        price: 34,
                        productId: 10,
                        skuList: [
                            {
                                "name":"尺码",
                                "value":"XXL"
                            },
                            {
                                "name":"颜色",
                                "value":"粉色"
                            }
                        ],
                        stock: 10,
                    },
                    {
                        id: 6,
                        price: 23,
                        productId: 10,
                        skuList: [
                            {
                                "name":"尺码",
                                "value":"XXL",
                            },
                            {
                                "name":"颜色",
                                "value":"西瓜红",
                            }
                        ],
                        stock: 20,
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
            // console.log(this.$route.query);
            if (this.$route.query==={}){
                Toast("未获取到商品ID，请先选择商品，再进入该页面")
                this.$router.push({
                    path:'/'
                })
            }else {
                this.productId = this.$route.query.productId;
                this.post(this.common.baseUrl+"/pms-product/getOne",{id: this.productId}, response=>{
                  response.pmsProduct.img = this.$store.getters.GET_IMGSRC+response.pmsProduct.img;
                  for(let i=0;i<response.pmsSkuValue.length;i++){
                      response.pmsSkuValue[i].value = JSON.parse(response.pmsSkuValue[i].value)
                  }


                  for (let i=0;i<response.stock.length;i++){
                      response.stock[i].skuList = JSON.parse(response.stock[i].skuList);
                  }

                  this.skuValues = response.pmsSkuValue;
                  this.stocks = response.stock;
                  this.product = response.pmsProduct;
                  this.spuValues = response.pmsSpuValue;
                  this.goods.picture = this.product.img;
                  this.goodsId = this.product.id;
                  this.sku.price = this.product.price;

                  //总库存
                  let num = 0;
                  for (let i=0;i<this.stocks.length;i++){
                      num += this.stocks[i].stock;
                  }
                  this.sku.stock_num = num;
                  //sku.tree
                  this.sku.tree=[];
                  for (let i=0;i<this.skuValues.length;i++){
                      let obj = {
                          k: '',
                          k_s: '',
                          v: [
                          ],
                      };
                      obj.k = this.skuValues[i].name;
                      obj.k_s = this.skuValues[i].name;

                      this.sku.tree.push(obj);
                  }
                  //完善sku.tree.v
                  for(let i=0;i<this.sku.tree.length;i++){
                      //找到对应name

                      let name = this.sku.tree[i].k_s;
                      // console.log(name)
                      for (let j=0;j<this.skuValues.length;j++){
                          if (name===this.skuValues[j].name){
                              for (let k=0;k<this.skuValues[j].value.length;k++){
                                  let obj2 = {
                                      id:"",
                                      name: ""
                                  }
                                  obj2.id=this.skuValues[j].value[k];
                                  obj2.name=this.skuValues[j].value[k];
                                  this.sku.tree[i].v.push(obj2);
                              }
                              break;
                          }
                      }
                  }
                  //sku.list
                  this.sku.list = [];
                  for (let i=0;i<this.stocks.length;i++){
                      let obj = {
                          id: "",// skuId
                          price: 0,
                          stock_num: 0
                      }
                      obj.id = this.stocks[i].id;
                      obj.price = this.stocks[i].price*100;
                      obj.stock_num = this.stocks[i].stock;
                      for (let j = 0;j<this.sku.tree.length;j++){
                          let name = this.sku.tree[j].k_s;
                          let value = '';
                          for (let k=0;k<this.stocks[i].skuList.length;k++){
                              if (this.stocks[i].skuList[k].name===name){
                                  value = this.stocks[i].skuList[k].value;
                                  break;
                              }
                          }
                          obj[this.sku.tree[j].k_s] = value;
                      }
                      this.sku.list.push(obj)
                  }
                  // console.log(this.stocks)
                  // console.log(this.sku.tree);
                  // console.log(this.sku.list);
                })
            }
        },
        methods:{
            goback(){
                this.$router.go(-1)
            },
            clickCollect(){
                // if (this.userId>0){
                //     const formData = new FormData();
                //     formData.append("userId",this.userId);
                //     formData.append("productId",this.productId);
                //     formData.append("collected",this.hasCollect);
                //     axios.post(this.common.baseUrl+"/ums-collection/clickCollect",formData).then(response=>{
                //         Toast(response.data.message);
                //         this.ifCollected();
                //     })
                // }
            },

            // ifCollected(){
            //     if (this.$store.getters.GET_USERID>0){
            //         const formData = new FormData();
            //         formData.append("userId",this.userId);
            //         formData.append("productId",this.productId);
            //         axios.post(this.common.baseUrl+"/ums-collection/collected",formData).then(response=>{
            //             console.log(response)
            //             Toast(response.data.message);
            //             this.hasCollect = response.data.obj;
            //         })
            //     }
            // },
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
            buyNow(){
                this.show = true;
                this.buyNowBtn=true;
                this.addCartBtn=false;
            },
            addcart(){
                this.show = true;
                this.buyNowBtn=false;
                this.addCartBtn=true;
            },
            createOrder(item){
              let skuDetail=""
              this.stocks.forEach(stock=>{
                if (stock.id===item.selectedSkuComb.id){
                  skuDetail = JSON.stringify(stock.skuList)
                }
              })
              // console.log("skuDetail: "+skuDetail)
              this.show = false;
              let form = {
                userId: 1,
                stockId: item.selectedSkuComb.id,
                productId: item.goodsId,
                skuDetail: skuDetail,
                productNum: item.selectedNum,
                productPrice: item.selectedSkuComb.price,
                productIcon: this.product.img,
                productName: this.product.name
              }
              // console.log("form"+form.productIcon+form.productName)
              if (this.buyNowBtn){
                this.orderLoading = true
                this.post(this.common.baseUrl+AppOrderUrl.createOrder,form,()=>{
                  this.orderLoading = false
                  this.$router.push({
                    path:'/orders'
                  })
                })
                //下单需要继续完成支付部分才能成功
              }else {
                this.post(this.common.baseUrl+AppCartUrl.addCart,form,()=>{
                  this.$router.push({
                    path:'/cart'
                  })
                })
                // const formData = new FormData();
                // formData.append("userId",this.$store.getters.GET_USERID);
                // formData.append("quantity",selectedNum);
                // formData.append("stockId",stock.id);
                // formData.append("productId",productId);
                // axios.post(this.common.baseUrl+'/ums-shoppingcart/add',formData).then(response=>{
                //     console.log("加入购物车成功");
                //     console.log(response);
                //     Toast("成功加入购物车");
                //     this.$router.push({
                //         path:'/cart'
                //     })
                // })
              }
              // this.buyNowBtn=false;
              // this.addCartBtn=false;
            },
            define(item){
                // console.log(item)
                if (this.$store.getters.GET_USERID<0){
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