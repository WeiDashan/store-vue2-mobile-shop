<template>
    <div class="paypage">
        <div class="paypage_top">
            <div class="leftarrow" @click="goback">
                <van-icon size="20px" color="#000000" name="arrow-left" />
            </div>
            <div class="top_title">
                填写订单
            </div>
        </div>
        <div class="address">
            <div class="address_top" @click="toManageAddress">
                <div class="address_addr">
                    <div class="city">{{address.province+address.city+address.county}}</div>
                    <div class="details">{{address.addressDetail}}</div>
                </div>
                <div class="rightarrow">
                    <van-icon color="#aaaaaa" name="arrow" />
                </div>
            </div>
            <div class="address_user">
                <div>{{address.name}}</div>
                <div>{{address.tel}}</div>
            </div>
        </div>
        <div class="showorders">
            <div v-for="(item,index) in orders" class="checkOneRow">
                <div class="oneItem">
                    <div class="itemImg">
                        <van-image :src="item.img"></van-image>
                    </div>
                    <div class="itemdetail">
                        <div class="name">{{item.name}}</div>
                        <div class="sku">
                             <span v-for="(item2,index2) in item.skuList">
                                  {{item2.value}}
                             </span>
                        </div>
                        <div class="priceAndNum">
                            <div class="price"><span>￥</span>{{item.price}}</div>
                            <div class="num"><span>共</span>{{item.num}}<span>件</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit" />
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "Paypage",
        data(){
            return{
                orders:[
                    {
                        id: 1,
                        img: "http://139.196.126.28:9000/images/20210709160225162124248.webp",
                        name: "衬衣",
                        num: 10,
                        price: 34,
                        productId: 10,
                        skuList:[
                            {name: "尺码", value: "XXL"},
                            {name: "颜色", value: "粉色"}
                        ]
                    },
                    {
                        id: 1,
                        img: "http://139.196.126.28:9000/images/20210709160225162124248.webp",
                        name: "衬衣",
                        num: 10,
                        price: 34,
                        productId: 10,
                        skuList:[
                            {name: "尺码", value: "XXL"},
                            {name: "颜色", value: "粉色"}
                        ]
                    }
                ],
                address:{
                    id: '3',
                    name: '王五',
                    tel: '1320000000',
                    areaCode: "140212",
                    address: '山西省大同市新荣区民主小区123',
                    province:'山西省',
                    city:'大同市',
                    county:'新荣区',
                    addressDetail:'民主小区123',
                    isDefault: 0,
                },
                price: 0,
            }
        },
        created() {
            if (this.$route.query==={}){

            }else{
                this.orders = this.$route.query.orders;
                this.getDefaultAddress();
                let money = 0;
                for (let i=0;i<this.orders.length;i++){
                    money += this.orders[i].price*this.orders[i].num;
                }
                this.price = money*100;
            }
        },
        methods:{
            goback(){
                this.$router.push({
                    path:'/cart'
                });
            },
            toManageAddress(){
                this.$router.push({
                    path:'/manageaddress',
                    query: this.$route.query,
                })
            },
            onSubmit(){

            },
            getDefaultAddress(){
                axios.get(this.common.baseUrl+"/ums-address/default?userId="+this.$store.getters.GET_USERID).then(response=>{
                    this.address = response.data.obj;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    .paypage{
        position: relative;
        background-color: @maincolor;
        min-height: 100vh;
        .paypage_top{
            position: relative;
            line-height: 50px;
            height: 50px;
            background-color: #ffffff;
            .leftarrow{
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-20px);
                z-index: 2;
                width: 20px;
                height: 20px;
                .van-icon{
                    width: 100%;
                    height: 100%;
                }
            }
            .top_title{
                /*background-color: pink;*/
                margin: auto;
                width: 100px;
                text-align: center;
            }
        }
        .address{
            padding: 10px 16px ;
            margin-top: 10px;
            background-color: #ffffff;
            margin-bottom: 10px;
            .address_top{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                .address_addr{
                    .city{
                        padding: 4px 0;
                        font-size: 12px;
                        color: #393939;
                    }
                    .details{
                        padding: 4px 0;
                        font-size: 16px;
                        font-weight: bolder;
                        letter-spacing: 1px;
                    }
                }
            }
            .address_user{
                padding: 6px 0;
                font-size: 10px;
                display: flex;
                flex-direction: row;
                color: #636363;
                div:first-child{
                    letter-spacing: 1px;
                }
                div{
                    margin-right: 10px;
                    /*background-color: pink;*/
                    line-height: 16px;
                }
            }
        }
        .showorders{
            background-color: #ffffff;
            border-radius: 16px;
            padding: 10px 0 20px;
            .checkOneRow{
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 10px;

                padding-left: 10px;
                .oneItem{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 10px;
                    width: 100%;
                    .itemImg{
                        width: 80px;
                        height: 80px;
                        border-radius: 6px;
                        overflow: hidden;
                        .van-image{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .itemdetail{
                        margin-left: 10px;
                        width: 64%;
                        height: 80px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .name{
                            font-size: 14px;
                        }
                        .sku{
                            font-size: 10px;
                            color: #aaaaaa;
                            span{
                                background-color: #eaeaea;
                                padding: 2px 6px;
                                border-radius: 10px;
                                text-align: center;
                                margin-right: 4px;
                            }
                        }
                        .priceAndNum{
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            .price{
                                color: #fd3535;
                                font-weight: bold;
                                font-size: 14px;
                                span{
                                    font-size: 12px;
                                }
                            }
                            .num{
                                font-size: 12px;
                                color: #808080;
                                span{
                                    color: #aaaaaa;
                                    padding: 0 2px;
                                    font-size: 10px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>