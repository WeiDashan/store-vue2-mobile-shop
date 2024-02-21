<template>
    <div class="list">
        <div class="search_top">
            <div class="top_img" @click="backToHome">
                <img src='../../image/leftarrow.png' alt=""/>
            </div>
            <div class="search_input">
                <van-search
                        v-model="value"
                        placeholder="请输入搜索关键词"
                        shape="round"
                        background="#f7f8fa"
                        @click="toSearch"
                />
            </div>
            <div class="search_btn">
                搜索
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
        <div class="search_bottom">
            没有更多了呦~
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data(){
            return{
                value:'',
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
            backToHome(){
                this.$router.push({
                    path:"/"
                })
            },
            toSearch(){
                this.$router.push({
                    path:'/search'
                })
            }
        },
        created() {
            if (this.$route.query==={}){
                this.$router.push({
                    path:'/search'
                })
            }else{
                this.value = this.$route.query.value;
                axios.get(this.common.baseUrl+"/pms-product/search?keywords="+this.value+"&pageNum="+1+"&pageSize="+10).then(response=>{
                    console.log(response)
                    // this.searchList = response.data.obj;
                    this.products=response.data.obj;
                    for (let i=0;i<this.products.length;i++){
                        this.products[i].img = this.$store.getters.GET_IMGSRC+this.products[i].img;
                    }
                })
                //调用接口模糊查询  value，获取product[] products;
            }

        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    @fontcolor: #808080;
    @redcolor:#fd3535;
    .list{
        background-color: @maincolor;
        height: 100vh;
        .search_top{
            display: flex;
            flex-direction: row;
            align-items: center;
            .top_img{
                width: 16px;
                height: 16px;
                margin-left: 16px;
                margin-right: 4px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .search_input{
                width: 75%;
                .van-search__content{
                    background-color: #ffffff;
                    border: 1px solid @redcolor;
                }
            }
            .search_btn{
                font-size: 14px;
                margin-left: 4px;
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
        .search_bottom{
            text-align: center;
            font-size: 12px;
            color: #646566;
            width: 200px;
            overflow: hidden;
            margin: auto;
        }
    }

</style>