<template>
    <div class="cart">
        <div class="cart_top">
            <div class="cartTopMid" @click="toManageAddress">
                <div class="cartTitle">
                    <div>购物车</div>
                    <div>
                        <van-icon name="location-o" />
                    </div>
                </div>
                <div class="cartAddress" v-if="haslogin">
                    {{this.$store.getters.GET_DEFAULTADDRESS.addressDetail}}
                </div>
            </div>
            <div class="cartTopEdit" v-if="haslogin===true&&cartList.length>0" @click="edit">编辑</div>
        </div>
        <div class="cart_Body">
            <div class="cart_Body_Body" v-if="haslogin&&cartList.length>0">
                <van-checkbox-group v-model="result" ref="checkboxGroup" @change="checkboxchange">
                    <div v-for="(item,index) in cartList" class="checkOneRow">
                        <div>
                            <van-checkbox :name="index"></van-checkbox>
                        </div>
                        <div class="oneItem">
                            <div class="itemImg">
                                <van-image :src="item.productIcon"></van-image>
                            </div>
                            <div class="itemdetail">
                                <div class="name">{{item.productName}}</div>
                                <div class="sku">
                                        <span v-for="(item2,index2) in item.skuDetail">
                                            {{item2.value}}
                                        </span>
                                </div>
                                <div class="priceAndNum">
                                    <div class="price">
                                        <span>￥</span>{{item.productPrice*item.productNum/100}}
                                    </div>
                                    <div class="num">
                                        <van-stepper v-model="item.productNum" @change="changeNum(item)" />
<!--                                        <van-icon name="minus" />-->
<!--                                        {{item.num}}-->
<!--                                        <van-icon name="plus" />-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-checkbox-group>
            </div>
            <div class="cartEmpty" v-if="cartList.length===0">
                <div class="cartEmpty_login" v-if="haslogin===false">
                    <div @click="toLogin">登录</div>
                    <div>登陆后显示移动端购物车中的商品</div>
                </div>
                <div class="cartEmpty_body">
                    <div>
                        <van-icon color="#aaaaaa" size="30px" name="shopping-cart" />
                    </div>
                    <div>
                        购物车是空的
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!editFlag&&haslogin">
            <van-submit-bar :price="price" button-text="提交订单" @submit="submit">
                <van-checkbox v-model="checked" @click="toggleAll">全选</van-checkbox>
            </van-submit-bar>
        </div>
        <div v-if="editFlag&&haslogin">
            <div class="edit">
                <van-checkbox v-model="checked" @click="toggleAll">全选</van-checkbox>
                <div class="delbtn">
                    <div class="detbtndiv">
                        <van-button type="danger" @click="delCart">删除</van-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading" class="shadow">
            <div class="loadingDiv">
                <div>
                    <van-loading color="#808080" type="spinner" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import { Dialog } from 'vant';
    import {AppCartUrl} from "@/plugins/api"
    export default {
        name: "Cart",
        components: {
            [Dialog.Component.name]: Dialog.Component,
        },
        methods:{
            toLogin(){
                this.$router.push({
                    path: '/login'
                })
            },
            toManageAddress(){
              Toast("修改地址")
                // this.$router.push({
                //     path:'/manageaddress'
                // })
            },
            toggleAll() {
                this.$refs.checkboxGroup.toggleAll(this.checked);
            },
            edit(){
                if (this.haslogin){
                    this.editFlag = !this.editFlag;
                }
            },
            submit(){
                // Toast("提交订单")
                if (this.selectArr.length===0){
                    Toast("请先选择商品")
                }else{
                    const arr = [];
                    for (let i=0;i<this.selectArr.length;i++){
                      const item = this.cartList[this.selectArr[i]];
                      arr.push(item)
                    }
                    for (let i=0;i<arr.length;i++){
                      this.post(AppCartUrl.orderByCarts,arr[i],response=>{
                        this.getCartInit()
                      })
                    }
                    this.selectArr=[];
                }

            },
            delCart(){
              if (this.selectArr.length===0){
                Toast("请先选择商品")
              }else{
                for (let i=0;i<this.selectArr.length;i++){
                  this.post(AppCartUrl.delCartById, {
                    id: this.cartList[this.selectArr[i]].id
                  },response=>{
                    this.getCartInit()
                  })
                }
                this.selectArr=[];
              }
            },
            checkboxchange(item){
                // console.log(item)
                this.selectArr = item;
                if(this.selectArr.length===this.cartList.length&&this.checked===false){
                    this.checked = true;
                }else if (this.selectArr.length<this.cartList.length&&this.checked===true){
                    this.checked = false;
                }
                let money = 0;
                for(let i=0;i<this.selectArr.length;i++){
                    money += this.cartList[this.selectArr[i]].productPrice*this.cartList[this.selectArr[i]].productNum;
                }
                // console.log(this.selectArr);
                this.price = money;
            },
            getCartInit(){
                this.selectArr=[];
                this.get(AppCartUrl.getAllCartByUserId,{
                  userId: this.userId
                },response=>{
                  for (let i=0;i<response.length;i++){
                    response[i].skuDetail = JSON.parse(response[i].skuDetail)
                  }
                  this.cartList = response;
                })
            },
            changeNum(item){
              this.loading = true
              this.post(AppCartUrl.updateProductNumByCartId,{
                cartId: item.id,
                productNum: item.productNum
              }, ()=>{
                this.getCartInit()
                this.loading=false;
              })
            }

        },
        data(){
            return{
                cartList:[

                ],
                loading: false,
                userId: 0,
                address:'',
                name:'',
                phone:'',
            // {
            //     id: 1,
            //         img: "http://139.196.126.28:9000/images/20210709160225162124248.webp",
            //     name: "衬衣",
            //     num: 10,
            //     price: 34,
            //     productId: 10,
            //     skuList:[
            //     {name: "尺码", value: "XXL"},
            //     {name: "颜色", value: "粉色"}
            // ]
            // }
            // {
            //     id: 1,
            //         img: "http://139.196.126.28:9000/images/20210709160225162124248.webp",
            //     name: "衬衣",
            //     num: 10,
            //     price: 34,
            //     productId: 10,
            //     skuList:[
            //     {name: "尺码", value: "XXL"},
            //     {name: "颜色", value: "粉色"}
            // ]
            // }
                haslogin: false,
                result: [],
                checked: false,
                editFlag: false,
                selectArr:[],
                price: 0,
            }
        },
        created() {
            this.$store.commit("SET_ACTIVETABBAR",'cart');
            this.userId = this.$store.getters.GET_USERID;
            if (this.userId>0){
                this.haslogin = true;
                this.getCartInit();
            }
        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    .cart{
        min-height: 100vh;
        background-color: @maincolor;
        .shadow{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: rgba(102, 102, 102, 0.1);
            .loadingDiv{
                margin: auto;
                display: flex;
                height: 100%;
                flex-direction: row;
                align-items: center;
                justify-content: center;

            }
        }
        .van-checkbox__icon{
            font-size: 12px;
        }
        .cart_top{
            position: relative;
            .cartTopMid{
                margin: 0 auto;
                padding: 6px 0;
                width: 60%;
                text-align: center;
                .cartTitle{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-bottom: 2px;
                    align-items: center;
                    align-content: center;
                    div:first-child{
                        margin-right: 4px;
                    }
                    div:last-child{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }
                }
                .cartAddress{
                    font-size: 10px;
                    color: #aaaaaa;
                }
            }
            .cartTopEdit{
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 12px;
            }
        }
        .cart_Body{
            background-color: #ffffff;
            border-radius: 16px;
            padding: 10px;
            .cartEmpty{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #aaaaaa;
                .cartEmpty_login{
                    margin-top: 10px;
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
                    margin: 20px 0 10px;
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
            .checkAll{
                padding-left: 10px;
                font-size: 14px;
                .checkAll_span{
                    padding-left: 6px;
                }
            }
            .cart_Body_Body{
                width: 100%;
                .checkOneRow{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-top: 10px;
                    background-color: #f8f6f6;
                    border-radius: 10px;
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
                                /*background-color: greenyellow;*/
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                .price{
                                    color: #fd3535;
                                    /*color: white;*/
                                    font-weight: bold;
                                    font-size: 14px;
                                    /*background-color: red;*/
                                    display: flex;
                                    flex-direction: row;
                                    align-items: center;
                                    span{
                                        font-size: 12px;
                                    }
                                }
                                .num{
                                    /*background-color: pink;*/
                                    /*font-size: 12px;*/
                                    /*color: #808080;*/
                                    /*span{*/
                                    /*    color: #aaaaaa;*/
                                    /*    padding: 0 2px;*/
                                    /*    font-size: 10px;*/
                                    /*}*/

                                }
                            }
                        }
                    }
                }


            }
        }
        .van-submit-bar{
            bottom: 50px;
            background-color: #f8f6f6;
            border-radius: 10px;
        }
        .edit{
            position: fixed;
            bottom: 50px;
            width: 100%;
            height: 50px;
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
            justify-content: space-between;
            padding: 0 20px;
            background-color: #f8f6f6;

            .delbtn{
                height: 100%;
                width: 110px;
                display: flex;
                align-items: center;
                justify-items: center;
                .detbtndiv{
                    height: 80%;
                    width: 100%;
                    border-radius: 20px;
                    overflow: hidden;
                    .van-button{
                        height: 100%;
                        width: 100%;
                    }
                }
            }
            /*.van-button{*/
            /*    height: 20px;*/
            /*}*/
        }
    }
</style>