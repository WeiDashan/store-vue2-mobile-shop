<template>
    <div class="mine">
        <div class="mine_top" @click="toSetting">
            <div class="top_img">
                <div v-if="!haslogin">
                    <img src="../../../image/defaultUserPic.png" alt=""/>
                </div>

                <van-image v-if="haslogin" :src="this.$store.getters.GET_USERINFO.icon"></van-image>
            </div>
            <div v-if="haslogin" class="top_name">{{this.$store.getters.GET_USERINFO.nickyName}}</div>
            <div v-else class="top_name" @click="toLogin">登录/注册</div>
        </div>
        <div class="mine_body">
            <div class="body_top">
                <div class="top_one">
                    <div class="topimg">
                        <img src="../../../image/mine/collect.png" alt=""/>
                    </div>
<!--                    <div class="topname" @click="toCollect">商品收藏</div>-->
                    <div class="topname">商品收藏</div>
<!--                    <div v-if="haslogin&&collectionNum>0">{{collectionNum}}</div>-->
                </div>
                <div class="top_one">
                    <div class="topimg">
                        <img src="../../../image/mine/store.png" alt=""/>
                    </div>
                    <div class="topname">店铺关注</div>
                </div>
                <div class="top_one" @click="toHistory">
                    <div class="topimg">
                        <img src="../../../image/mine/history.png" alt=""/>
                    </div>
                    <div class="topname">浏览记录</div>
<!--                    <div v-if="haslogin&&historyNum>0">{{historyNum}}</div>-->
                </div>
            </div>
            <div class="body_body">
                <div class="body_one">
                    <div class="bodyimg">
                        <img src="../../../image/mine/waitpay.png" alt=""/>
<!--                        <div v-if="haslogin" class="biaoji">11</div>-->
                    </div>
                    <div class="bodyname">待付款</div>
                </div>
                <div class="body_one">
                    <div class="bodyimg">
                        <img src="../../../image/mine/waitreceive.png" alt=""/>
<!--                        <div v-if="haslogin" class="biaoji">11</div>-->
                    </div>
                    <div class="bodyname">待收货</div>
                </div>
                <div class="body_one">
                    <div class="bodyimg">
                        <img src="../../../image/mine/waitcomment.png" alt=""/>
<!--                        <div v-if="haslogin" class="biaoji">11</div>-->
                    </div>
                    <div class="bodyname">待评价</div>
                </div>
                <div class="body_one">
                    <div class="bodyimg">
                        <img src="../../../image/mine/afterpay.png" alt=""/>
<!--                        <div v-if="haslogin" class="biaoji">11</div>-->
                    </div>
                    <div class="bodyname">退换/售后</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Mine",
        data(){
            return{
                haslogin: false,
                collectionNum: 0,
                historyNum: 0,
            }
        },
        methods:{
            toCollect(){
                // this.$router.push({
                //     path:'/collect'
                // })
            },
            toHistory(){
                // this.$router.push({
                //     path: '/history'
                // })
            },
            toLogin(){
                this.$router.push({
                    path:"/login"
                })
            },
            toSetting(){
                // if (this.haslogin){
                //     this.$router.push({
                //         path:"/setting"
                //     })
                // }
            }
        },
        created() {
            this.$store.commit("SET_ACTIVETABBAR",'mine');
            if (this.$store.getters.GET_USERID>0){
                this.haslogin=true;
                // axios.get(this.common.baseUrl+'/ums-collection/getNumber?userId='+this.$store.getters.GET_USERID).then(response=>{
                //     console.log(response)
                //     if(response.data.obj!=null){
                //         this.collectionNum = response.data.obj;
                //     }
                // })
                // axios.get(this.common.baseUrl+'/ums-footprint/getNumber?userId='+this.$store.getters.GET_USERID).then(response=>{
                //     console.log(response)
                //     if(response.data.obj!=null){
                //         this.historyNum = response.data.obj;
                //     }
                // })

            }else {
                this.haslogin=false;
            }

        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    @bordercolor: #f5f5f5;
    @redcolor: #fd3535;
    .mine{
        height: 100vh;
        width: 100%;
        background-color: @maincolor;
        padding: 20px 10px;
        box-sizing: border-box;
        .mine_top{
            display: flex;
            flex-direction: row;
            align-items: center;
            .top_img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid #cccccc;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
                .van-image{
                    width: 100%;
                    height: 100%;
                }
            }
            .top_name{
                font-weight: bold;
                margin-left: 20px;
            }
        }
        .mine_body{
            background-color: #ffffff;
            border-radius: 10px;
            padding: 6px 6px;
            margin-top: 16px;
            .body_top{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                border-bottom: 1px solid @bordercolor;
                /*background-color: pink;*/
                .top_one:first-child,
                .top_one:nth-child(2){
                    border-right: 1px solid @bordercolor;
                }
                .top_one{
                    /*background-color: greenyellow;*/
                    display: flex;
                    flex-direction: row;
                    font-size: 12px;
                    align-items: center;
                    margin: 10px 0;
                    width: 33%;
                    text-align: center;
                    justify-content: center;
                    .topimg{
                        width: 14px;
                        height: 14px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .topname{
                        padding: 0 2px;
                        /*background-color: red;*/
                    }
                }
            }
            .body_body{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                font-size: 12px;
                padding-bottom: 10px;
                .body_one{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .bodyimg{
                        width: 30px;
                        height: 30px;
                        padding: 16px 0 6px;
                        position: relative;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .biaoji{
                            background-color: @redcolor;
                            position: absolute;
                            right: -4px;
                            top: 12px;
                            color: #ffffff;
                            width: 14px;
                            height: 14px;
                            text-align: center;
                            line-height: 14px;
                            font-size: 10px;
                            border-radius: 50%;
                        }
                    }
                    .bodyname{

                    }
                }

            }
        }
    }
</style>