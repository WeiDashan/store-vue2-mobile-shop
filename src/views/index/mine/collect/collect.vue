<template>
    <div class="collect">
        <div class="inputCode_top">
            <div>商品收藏</div>
            <div class="left-arrow" @click="goback">
                <img src="../../../../image/leftarrow.png" />
            </div>
            <div class="operator">
                <div>清空</div>
                <div>编辑</div>
            </div>
        </div>
        <div class="search_mid">
            <div v-for="(item,index) in products" class="oneRow">
                <div class="productImg">
                    <van-image :src="item.img"></van-image>
                </div>
                <div class="productRight">
                    <div class="name">{{item.name}}</div>
                    <div class="price">
                        <span>￥</span>
                        {{item.price}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "collect",
        data(){
            return{
                collectionIds:[],
                products:[
                    {
                        productId: 10,
                        img: "https://img1.baidu.com/it/u=3475924869,3749433407&fm=26&fmt=auto&gp=0.jpg",
                        name: "衬衣衬衣衬衣衬衣衬衣衬衣衬衣衬衣",
                        price: 100,
                    },
                    {
                        productId: 10,
                        img: "https://img1.baidu.com/it/u=3475924869,3749433407&fm=26&fmt=auto&gp=0.jpg",
                        name: "衬衣衬衣衬衣衬衣衬衣衬衣衬衣衬衣",
                        price: 100,
                    },
                    {
                        productId: 10,
                        img: "https://img1.baidu.com/it/u=3475924869,3749433407&fm=26&fmt=auto&gp=0.jpg",
                        name: "衬衣衬衣衬衣衬衣衬衣衬衣衬衣衬衣",
                        price: 100,
                    },
                ]
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            }
        },
        created() {
            if (this.$store.getters.GET_USERID>0){
                axios.get(this.common.baseUrl+"/ums-collection/list?userId="+this.$store.getters.GET_USERID).then(response=>{
                    console.log(response)
                    this.collectionIds=response.data.obj.collectionIds;
                    this.products = response.data.obj.products;
                    for (let i=0;i<this.products.length;i++){
                        this.products[i].img = this.$store.getters.GET_IMGSRC+this.products[i].img;
                    }
                })
            }else{
                this.$router.push({
                    path:'/login'
                })
            }

        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    @bordercolor: #f5f5f5;
    @redcolor: #fd3535;
    .collect{
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
        .search_mid{
            padding: 10px;

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
                    margin: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .name{
                        font-size: 16px;
                        font-weight: bold;
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
    }
</style>