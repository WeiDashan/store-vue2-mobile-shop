<template>
    <div class="orders_index">
        <div class="orders_top">
            <div>
                <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    @search="onSearch">
                    <template #action>
                        <div @click="onSearch">搜索</div>
                    </template>
                </van-search>
            </div>
        </div>
        <div>
            <mescroll-vue class="home_index_mescroll" ref="mescroll" :up="mescrollUp" @init="mescrollInit">
                <div class="updateorder">
                    <van-tabs v-model="active" @change="tabsChange">
                        <van-tab title="全部">
                            <div v-if="haslogin&&orders.length>0"
                                 class="oneitem"
                                 v-for="(ordersitem,index) in orders"
                                 >
                                <div class="oneitem_top" @click="toOrderDetail(ordersitem)">
                                    <div class="productImg">
                                        <van-image :src="ordersitem.img" />
                                    </div>
                                    <div class="productName">{{ordersitem.name}}</div>
                                    <div class="productDetail">
                                        <div class="productPrice">
                                            <span>￥</span>
                                            {{ordersitem.payment*ordersitem.num/100}}
                                        </div>
                                        <div class="productNum">共{{ordersitem.num}}件</div>
                                    </div>
                                  <div class="productStatus">
                                    <!-- 0未付款，1待发货，2待收货，3待评价，4交易成功，5已取消，6退款中;-->
                                    <span v-if="ordersitem.status===0">未付款</span>
                                    <span v-if="ordersitem.status===1">待发货</span>
                                    <span v-if="ordersitem.status===2">待收货</span>
                                    <span v-if="ordersitem.status===3">待评价</span>
                                    <span v-if="ordersitem.status===4">交易成功</span>
                                    <span v-if="ordersitem.status===5">已取消</span>
                                    <span v-if="ordersitem.status===6">退款中</span>
                                  </div>
                                </div>
                              <div class="oneitem_bottom">
                                <!-- 0未付款，1待发货，2待收货，3待评价，4交易成功，5已取消，6退款中;-->
                                <div  v-if="ordersitem.status===3" class="bottom_btn">评价晒单</div>
                                <div  v-if="ordersitem.status===3" class="bottom_btn">退换/售后</div>
                                <div  class="bottom_btn_pay" @click="buyAgain(ordersitem)">再次购买</div>
                                <div  v-if="ordersitem.status===2" class="bottom_btn">申请退款</div>
                                <div  v-if="ordersitem.status===1" class="bottom_btn">取消订单</div>
                                <div  v-if="ordersitem.status===0" class="bottom_btn_pay" @click="toPay(ordersitem)">去支付</div>
                              </div>
                            </div>
                            <div class="cartEmpty" v-if="orders.length===0">
                                <div class="cartEmpty_login" v-if="!haslogin">
                                    <div @click="toLogin">登录</div>
                                    <div>登陆后显示订单</div>
                                </div>
                                <div class="cartEmpty_body">
                                    <div>
                                        <van-icon color="#aaaaaa" size="30px" name="coupon" />
                                    </div>
                                    <div>
                                        您还没有相关的订单
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="待付款">
                            <div v-if="haslogin&&orders.length>0"
                                 class="oneitem"
                                 v-for="(ordersitem,index) in orders"
                                 >
                                <div class="oneitem_top" @click="toOrderDetail(ordersitem)">
                                    <div class="productImg">
                                        <van-image :src="ordersitem.img" />
                                    </div>
                                    <div class="productName">{{ordersitem.name}}</div>
                                    <div class="productDetail">
                                        <div class="productPrice">
                                            <span>￥</span>
                                            {{ordersitem.payment*ordersitem.num/100}}
                                        </div>
                                        <div class="productNum">共{{ordersitem.num}}件</div>
                                    </div>
                                  <div class="productStatus">
                                    <!-- 0未付款，1待发货，2待收货，3待评价，4交易成功，5已取消，6退款中;-->
                                    <span v-if="ordersitem.status===0">未付款</span>
                                    <span v-if="ordersitem.status===1">待发货</span>
                                    <span v-if="ordersitem.status===2">待收货</span>
                                    <span v-if="ordersitem.status===3">待评价</span>
                                    <span v-if="ordersitem.status===4">交易成功</span>
                                    <span v-if="ordersitem.status===5">已取消</span>
                                    <span v-if="ordersitem.status===6">退款中</span>
                                  </div>
                                </div>
                              <div class="oneitem_bottom">
                                <!-- 0未付款，1待发货，2待收货，3待评价，4交易成功，5已取消，6退款中;-->
                                <div  v-if="ordersitem.status===3" class="bottom_btn">评价晒单</div>
                                <div  v-if="ordersitem.status===3" class="bottom_btn">退换/售后</div>
                                <div  class="bottom_btn_pay" @click="buyAgain(ordersitem)">再次购买</div>
                                <div  v-if="ordersitem.status===2" class="bottom_btn">申请退款</div>
                                <div  v-if="ordersitem.status===1" class="bottom_btn">取消订单</div>
                                <div  v-if="ordersitem.status===0" class="bottom_btn_pay" @click="toPay(ordersitem)">去支付</div>
                              </div>
                            </div>
                            <div class="cartEmpty" v-if="orders.length===0">
                                <div class="cartEmpty_login" v-if="!haslogin">
                                    <div @click="toLogin">登录</div>
                                    <div>登陆后显示订单</div>
                                </div>
                                <div class="cartEmpty_body">
                                    <div>
                                        <van-icon color="#aaaaaa" size="30px" name="coupon" />
                                    </div>
                                    <div>
                                        您还没有相关的订单
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="待收货">
                            <div v-if="haslogin&&orders.length>0"
                                 class="oneitem"
                                 v-for="(ordersitem,index) in orders"
                                 >
                                <div class="oneitem_top" @click="toOrderDetail(ordersitem)">
                                    <div class="productImg">
                                        <van-image :src="ordersitem.img" />
                                    </div>
                                    <div class="productName">{{ordersitem.name}}</div>
                                    <div class="productDetail">
                                        <div class="productPrice">
                                            <span>￥</span>
                                            {{ordersitem.payment*ordersitem.num/100}}
                                        </div>
                                        <div class="productNum">共{{ordersitem.num}}件</div>
                                    </div>
                                  <div class="productStatus">
                                    <!-- 0未付款，1待发货，2待收货，3待评价，4交易成功，5已取消，6退款中;-->
                                    <span v-if="ordersitem.status===0">未付款</span>
                                    <span v-if="ordersitem.status===1">待发货</span>
                                    <span v-if="ordersitem.status===2">待收货</span>
                                    <span v-if="ordersitem.status===3">待评价</span>
                                    <span v-if="ordersitem.status===4">交易成功</span>
                                    <span v-if="ordersitem.status===5">已取消</span>
                                    <span v-if="ordersitem.status===6">退款中</span>
                                  </div>
                                </div>
                              <div class="oneitem_bottom">
                                <!-- 0未付款，1待发货，2待收货，3待评价，4交易成功，5已取消，6退款中;-->
                                <div  v-if="ordersitem.status===3" class="bottom_btn">评价晒单</div>
                                <div  v-if="ordersitem.status===3" class="bottom_btn">退换/售后</div>
                                <div  class="bottom_btn_pay" @click="buyAgain(ordersitem)">再次购买</div>
                                <div  v-if="ordersitem.status===2" class="bottom_btn">申请退款</div>
                                <div  v-if="ordersitem.status===1" class="bottom_btn">取消订单</div>
                                <div  v-if="ordersitem.status===0" class="bottom_btn_pay" @click="toPay(ordersitem)">去支付</div>
                              </div>
                            </div>
                            <div class="cartEmpty" v-if="orders.length===0">
                                <div class="cartEmpty_login" v-if="!haslogin">
                                    <div @click="toLogin">登录</div>
                                    <div>登陆后显示订单</div>
                                </div>
                                <div class="cartEmpty_body">
                                    <div>
                                        <van-icon color="#aaaaaa" size="30px" name="coupon" />
                                    </div>
                                    <div>
                                        您还没有相关的订单
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="已完成">
                            <div v-if="haslogin&&orders.length>0"
                                 class="oneitem"
                                 v-for="(ordersitem,index) in orders"
                                 >
                                <div class="oneitem_top" @click="toOrderDetail(ordersitem)">
                                    <div class="productImg">
                                        <van-image :src="ordersitem.img" />
                                    </div>
                                    <div class="productName">{{ordersitem.name}}</div>
                                    <div class="productDetail">
                                        <div class="productPrice">
                                            <span>￥</span>
                                            {{ordersitem.payment*ordersitem.num/100}}
                                        </div>
                                        <div class="productNum">共{{ordersitem.num}}件</div>
                                    </div>
                                  <div class="productStatus">
                                    <!-- 0未付款，1待发货，2待收货，3待评价，4交易成功，5已取消，6退款中;-->
                                    <span v-if="ordersitem.status===0">未付款</span>
                                    <span v-if="ordersitem.status===1">待发货</span>
                                    <span v-if="ordersitem.status===2">待收货</span>
                                    <span v-if="ordersitem.status===3">待评价</span>
                                    <span v-if="ordersitem.status===4">交易成功</span>
                                    <span v-if="ordersitem.status===5">已取消</span>
                                    <span v-if="ordersitem.status===6">退款中</span>
                                  </div>
                                </div>
                              <div class="oneitem_bottom">
                                <!-- 0未付款，1待发货，2待收货，3待评价，4交易成功，5已取消，6退款中;-->
                                <div  v-if="ordersitem.status===3" class="bottom_btn">评价晒单</div>
                                <div  v-if="ordersitem.status===3" class="bottom_btn">退换/售后</div>
                                <div  class="bottom_btn_pay" @click="buyAgain(ordersitem)">再次购买</div>
                                <div  v-if="ordersitem.status===2" class="bottom_btn">申请退款</div>
                                <div  v-if="ordersitem.status===1" class="bottom_btn">取消订单</div>
                                <div  v-if="ordersitem.status===0" class="bottom_btn_pay" @click="toPay(ordersitem)">去支付</div>
                              </div>
                            </div>
                            <div class="cartEmpty" v-if="orders.length===0">
                                <div class="cartEmpty_login" v-if="!haslogin">
                                    <div @click="toLogin">登录</div>
                                    <div>登陆后显示订单</div>
                                </div>
                                <div class="cartEmpty_body">
                                    <div>
                                        <van-icon color="#aaaaaa" size="30px" name="coupon" />
                                    </div>
                                    <div>
                                        您还没有相关的订单
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="已取消">
                            <div v-if="haslogin&&orders.length>0"
                                 class="oneitem"
                                 v-for="(ordersitem,index) in orders"
                                 >
                                <div class="oneitem_top" @click="toOrderDetail(ordersitem)">
                                    <div class="productImg">
                                        <van-image :src="ordersitem.img" />
                                    </div>
                                    <div class="productName">{{ordersitem.name}}</div>
                                    <div class="productDetail">
                                        <div class="productPrice">
                                            <span>￥</span>
                                            {{ordersitem.payment*ordersitem.num/100}}
                                        </div>
                                        <div class="productNum">共{{ordersitem.num}}件</div>
                                    </div>
                                    <div class="productStatus">
                                        <!-- 0未付款，1待发货，2待收货，3待评价，4交易成功，5已取消，6退款中;-->
                                        <span v-if="ordersitem.status===0">未付款</span>
                                        <span v-if="ordersitem.status===1">待发货</span>
                                        <span v-if="ordersitem.status===2">待收货</span>
                                        <span v-if="ordersitem.status===3">待评价</span>
                                        <span v-if="ordersitem.status===4">交易成功</span>
                                      <span v-if="ordersitem.status===5">已取消</span>
                                      <span v-if="ordersitem.status===6">退款中</span>
                                    </div>
                                </div>
                                <div class="oneitem_bottom">
                                    <!-- 0未付款，1待发货，2待收货，3待评价，4交易成功，5已取消，6退款中;-->
                                    <div  v-if="ordersitem.status===3" class="bottom_btn">评价晒单</div>
                                    <div  v-if="ordersitem.status===3" class="bottom_btn">退换/售后</div>
                                    <div  class="bottom_btn_pay" @click="buyAgain(ordersitem)">再次购买</div>
                                    <div  v-if="ordersitem.status===2" class="bottom_btn">申请退款</div>
                                    <div  v-if="ordersitem.status===1" class="bottom_btn">取消订单</div>
                                    <div  v-if="ordersitem.status===0" class="bottom_btn_pay" @click="toPay(ordersitem)">去支付</div>
                                </div>
                            </div>
                            <div class="cartEmpty" v-if="orders.length===0">
                                <div class="cartEmpty_login" v-if="!haslogin">
                                    <div @click="toLogin">登录</div>
                                    <div>登陆后显示订单</div>
                                </div>
                                <div class="cartEmpty_body">
                                    <div>
                                        <van-icon color="#aaaaaa" size="30px" name="coupon" />
                                    </div>
                                    <div>
                                        您还没有相关的订单
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
                <div v-if="orderNoMore" class="noMore">没有更多的记录了~</div>
            </mescroll-vue>
        </div>
    </div>
</template>

<script>
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import {AppOrderUrl, SecKillUrl} from "@/plugins/api"
    import {Toast} from "vant";
    export default {
        name: "Orders",
        components: {
            MescrollVue
        },
        data(){
            return{
                //01234
                active: 0,
                mescroll: null,
                mescrollDown:{},
                mescrollUp: {
                    callback: this.upCallback,
                    toTop: {
                        src: 'https://img1.baidu.com/it/u=3475924869,3749433407&fm=26&fmt=auto&gp=0.jpg',
                        offset: 1000
                    },
                },
                value: '',
                orders:[

                ],
                currentPage:1,
                currentSize:100,
                myupdating: false,
                userId: 0,
                haslogin: false,
                orderNoMore: false,
            }
        },
        methods:{
            toOrderDetail(item){
                // this.$router.push({
                //     path:'/orderDetail',
                //     query:{
                //         orderId: item.id
                //     }
                // })
            },
            toPay(item){
                let arr=[];
                arr.push(item.id);
                let pay = {
                    "price":item.payment,
                    "orderIds":arr,
                    "orderInfo":item.name
                }
                Toast("支付")
                // this.$store.commit("SET_PAY",pay);
                // this.$router.push({
                //     path:'/pay',
                // })
            },
            toLogin(){
                this.$router.push({
                    path:'/login'
                })
            },
            buyAgain(item){
                console.log(item)
                if (item.secKillId>0){
                  this.get(SecKillUrl.getSecKillById,{
                    id: item.secKillId
                  }, response1=>{
                    // console.log(response1)
                    if (response1!==null){
                      this.get(SecKillUrl.getSecKillDetailById,{
                        id: item.secKillId
                      }, response=>{
                        response.product.img = this.$store.getters.GET_IMGSRC + response.product.img;
                        response.product.stockId = response.stock.id;
                        response.product.price = response.stock.price;
                        response.product.skuList = response.stock.skuList;
                        response.product.secKillId = response.secKill.id;
                        response.product.startTime = response.secKill.startTime;
                        response.product.endTime = response.secKill.endTime;
                        response.product.saleAmount = response.secKill.saleAmount;
                        let product = response.product
                        this.$router.push({
                          path: '/secKillDetail',
                          query:{
                            product: product
                          }
                        })
                      })

                    }
                    else{
                      Toast("秒杀已过期")
                    }
                  })
                }else{
                  let productId = item.productId;
                  this.$router.push({
                    path: '/productDetail',
                    query:{
                      productId: productId
                    }
                  })
                }

            },
            mescrollInit(mescroll) {
                this.mescroll = mescroll;
            },
            tabsChange(){
                this.myupdating = false;
                this.currentPage = 1;
                this.orders=[]
                this.orderNoMore=false;
            },
            getOrderData(){

                if (!this.myupdating){
                    this.myupdating = true;
                  // -1全部, 0未付款，2待收货，4交易成功，5已取消
                    if (this.active===0){
                        this.getAllOrders()
                    }else if(this.active===1){
                      this.getOrdersByStatus(0)
                    }else if(this.active===2){
                      this.getOrdersByStatus(2)
                    }else if(this.active===3){
                      this.getOrdersByStatus(4)
                    }else if(this.active===4){
                      this.getOrdersByStatus(5)
                    }
                }

            },
            upCallback(page, mescroll) {

                if (!this.myupdating && !this.orderNoMore){
                    this.myupdating=true;
                    this.currentPage++;
                    console.log("pageNo:"+this.currentPage)
                    this.getOrderData();
                }
                this.$nextTick(() => {
                    mescroll.endSuccess(111);
                });
            },
            onSearch(){
                console.log("搜搜")
            },
          getAllOrders(){
            this.post(AppOrderUrl.getAllOrdersByUserId,{userId: this.userId},response=>{
              let arr = [];
              for (let i=0;i<response.length;i++){
                let oneItem={
                  id: 1,
                  productId: 10,
                  img: "http://49.233.51.52:9000/images/20231026212808719066296.jpg",
                  name: '短袖T恤男衬衣',
                  payment: 9.9,
                  num: 1,
                  status: 1,
                  secKillId: 0,
                };
                oneItem.id = response[i].id;
                oneItem.productId = response[i].productId;
                oneItem.img = response[i].productIcon;
                oneItem.name = response[i].productName;
                oneItem.payment = response[i].productPrice;
                oneItem.num = response[i].productNum;
                oneItem.status = response[i].orderStatus;
                oneItem.secKillId = response[i].secKillId;
                arr.push(oneItem);
              }
              this.orders = arr;
              // console.log(response)
            })
          },
          getOrdersByStatus(status){
            // -1全部, 0未付款，2待收货，4交易成功，5已取消
            this.post(AppOrderUrl.getAllOrdersByUserIdAndStatus,
                {userId: this.userId, orderStatus: status},response=>{
              let arr = [];
              for (let i=0;i<response.length;i++){
                let oneItem={
                  id: 1,
                  productId: 10,
                  img: "http://49.233.51.52:9000/images/20231026212808719066296.jpg",
                  name: '短袖T恤男衬衣',
                  payment: 9.9,
                  num: 1,
                  status: 1,
                };
                oneItem.id = response[i].id;
                oneItem.productId = response[i].productId;
                oneItem.img = response[i].productIcon;
                oneItem.name = response[i].productName;
                oneItem.payment = response[i].productPrice;
                oneItem.num = response[i].productNum;
                oneItem.status = response[i].orderStatus;
                arr.push(oneItem);
              }
              this.orders = arr;
              // console.log(response)
            })
          },
        },
        created() {
            this.$store.commit("SET_ACTIVETABBAR",'orders');
            this.userId = this.$store.getters.GET_USERID;
            if (this.userId>0){
                this.haslogin = true;
                this.myupdating=true;
                this.getAllOrders();
            }
        },
        watch:{
            active(active){
              // -1全部, 0未付款，2待收货，4交易成功，5已取消
                if (active===0){
                    this.tabsChange()
                    this.getAllOrders()
                }else if(active===1){
                    this.tabsChange()
                    this.getOrdersByStatus(0)
                }else if(active===2){
                    this.tabsChange()
                  this.getOrdersByStatus(2)
                }else if(active===3){
                    this.tabsChange()
                  this.getOrdersByStatus(4)
                }else if(active===4){
                    this.tabsChange()
                  this.getOrdersByStatus(5)
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    .orders_index{
        .orders_top{
        }
        .updateorder{
            background-color: @maincolor;
            min-height: calc(100vh - 140px);
            .cartEmpty{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 10px;
                background-color: #ffffff;
                border-radius: 16px;
                color: #aaaaaa;
                .cartEmpty_login{
                    margin-top: 20px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    div:first-child{
                        font-size: 12px;
                        border: 1px solid #aaaaaa;
                        padding: 2px 16px;
                        margin-right: 10px;
                        border-radius: 10px;
                        text-align: center;
                    }
                    div:last-child{
                        font-size: 10px;
                    }
                }
                .cartEmpty_body{
                    margin: 20px 0 20px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    div:first-child{
                        margin-right: 10px;
                    }
                    div:last-child{
                        font-size: 12px;

                    }
                }
            }
        }
        .noMore{
            /*background-color: red;*/
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #a7a7a7;
        }
        .oneitem{
            background-color: #ffffff;
            border-radius: 16px;
            padding: 10px;
            margin: 10px;
            .oneitem_top{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                margin-top: 10px;
                padding: 0 10px;
                position: relative;
                .productStatus{
                    position: absolute;
                    right: 10px;
                    top: -10px;
                    font-size: 12px;
                    color: #a7a7a7;
                }
                .productImg{
                    width: 60px;
                    height: 60px;
                    overflow: hidden;
                    border-radius: 4px;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .productName{
                    /*margin-left: 10px;*/
                    width: 140px;
                    font-size: 14px;
                    overflow: hidden;
                    line-height: 40px;
                    height: 40px;
                    /*background-color: pink;*/
                }
                .productDetail{
                    text-align:right;
                    /*background-color: grey;*/
                    .productPrice{
                        font-weight: bold;
                        font-size: 16px;
                        width: 80px;
                        padding: 0;
                        margin: 0;
                        span{
                            font-size: 10px;
                            font-weight: normal;
                        }
                    }
                    .productNum{
                        font-size: 12px;
                        color: #808080;
                    }
                }
            }
            .oneitem_bottom{
                margin: 10px 0;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                font-size: 12px;
                .bottom_btn{
                    border: 1px solid #808080;
                    padding: 4px 10px;
                    border-radius: 16px;
                }
                .bottom_btn_pay{
                    border: 1px solid #fd3535;
                    padding: 4px 10px;
                    border-radius: 16px;
                    color: #fd3535;
                }
            }
        }
    }
</style>