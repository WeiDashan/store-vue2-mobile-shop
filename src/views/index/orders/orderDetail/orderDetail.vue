<template>
    <div class="orderDetail">
        <div class="inputCode_top">
            <div>订单详细信息</div>
            <div class="left-arrow" @click="goback">
                <img src="../../../../image/leftarrow.png" />
            </div>
<!--            <div class="operator">-->
<!--                <div>清空</div>-->
<!--                <div>编辑</div>-->
<!--            </div>-->
        </div>
        <div class="addressMessage">
            <div class="addressUser">
                <div class="userName">
                    {{order.username}}
                </div>
                <div class="phone">
                    {{order.tel}}
                </div>
            </div>
            <div class="address">
                <span>地址：</span>
                <span>{{order.address}}</span>
            </div>
            <div >
                <div class="oneRow">
                    <div class="productImg">
                        <van-image :src="order.img"></van-image>
                    </div>
                    <div class="productRight">
                        <div class="name">{{order.name}}</div>
                        <div class="priceAndNum">
                            <div class="price">
                                <span>￥</span>
                                {{order.price}}
                            </div>
                            <div class="num">
                                共
                                {{order.num}}
                                件
                            </div>
                        </div>

                    </div>
                </div>
                <div class="oneitem_bottom">
                    <!--   //status 1待付款 2待收货 3已完成 4已取消-->
                    <div  v-if="order.status===3" class="bottom_btn">评价晒单</div>
                    <div  v-if="order.status===3" class="bottom_btn">退换/售后</div>
                    <div  class="bottom_btn_pay" @click="buyAgain(order)">再次购买</div>
                    <div  v-if="order.status===2" class="bottom_btn">申请退款</div>
                    <div  v-if="order.status===1" class="bottom_btn">取消订单</div>
                    <div  v-if="order.status===1" class="bottom_btn_pay" @click="toPay(order)">去支付</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderDetail",
        data(){
            return{
                order:{
                    id: 1,
                    productId: 10,
                    img: '',
                    price: 0,
                    num: 10,
                    name:'111111111111111',
                    status: 1,
                    address:"",
                    username:'',
                    tel:''
                }
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
            buyAgain(item){
                let productId = item.productId;
                this.$router.push({
                    path: '/productDetail',
                    query:{
                        productId: productId
                    }
                })
            },
            toPay(item){
                this.$router.push({
                    path:'/pay',
                    query:{
                        "price":item.payment,
                        "orderId":item.id,
                        "orderInfo":item.name
                    }
                })
            },
        },
        created() {
            if (this.$route.query==={}){

            }else{
                console.log(this.$route.query)
                axios.get(this.common.baseUrl+"/tb-order/getOrderDetail?orderId="+this.$route.query.orderId).then(response=>{
                    this.order.id = response.data.obj.orderId;
                    this.order.productId = response.data.obj.order.productId;
                    this.order.img = this.$store.getters.GET_IMGSRC + response.data.obj.product.img;
                    this.order.price = response.data.obj.order.payment;
                    this.order.num = response.data.obj.item.num;
                    this.order.name = response.data.obj.product.name;
                    this.order.status = response.data.obj.order.status;
                    this.order.address = response.data.obj.order.receiveAddress;
                    this.order.username = response.data.obj.order.receiveName;
                    this.order.tel = response.data.obj.order.receivePhone;
                    console.log(response)
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    @bordercolor: #f5f5f5;
    @redcolor: #fd3535;
    .orderDetail{
        background-color: @maincolor;
        min-height: 100vh;
        .inputCode_top{
            text-align: center;
            position: relative;
            background-color: #ffffff;
            padding: 10px;
            font-size: 16px;
            .left-arrow{
                width: 16px;
                height: 16px;
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .operator{
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                flex-direction: row;
                font-size: 14px;
                div{
                    padding: 6px;
                }
            }
        }
        .addressMessage{
            margin-top: 10px;
            padding: 16px 20px;
            background-color: #ffffff;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            .addressUser{
                font-weight: bold;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 14px;
                line-height: 14px;
                /*background-color: cornflowerblue;*/
                margin-bottom: 10px;

                .userName{
                    /*background-color: pink;*/
                    margin-right: 20px;
                }
                .phone{
                    /*background-color: chocolate;*/
                }
            }
            .address{
                font-size: 10px;
                color: #aaaaaa;
            }
            .oneRow{
                display: flex;
                flex-direction: row;
                background-color: #ffffff;
                margin: 16px 0;
                border-radius: 6px;
                box-sizing: border-box;
                .productImg{
                    width: 100px;
                    height: 100px;
                    overflow: hidden;
                    border-radius: 6px;
                    .van-image{
                        width: 100%;
                        height: 100%;
                    }
                }
                .productRight{
                    margin-left: 20px;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 54%;
                    .name{
                        font-size: 16px;
                        /*font-weight: bold;*/
                    }
                    .priceAndNum{
                        display:flex;
                        flex-direction: row;
                        justify-content: space-between;
                        .num{
                            font-size: 12px;
                        }
                    }
                    .price{
                        font-weight: bold;
                        color: @redcolor;
                        font-size: 16px;
                        span{
                            font-size: 12px;
                        }
                    }
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
</style>