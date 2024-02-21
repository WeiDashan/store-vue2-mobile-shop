<template>
    <div class="classify_index">
        <div v-if="list.length>0" class="classify_top">
            <!--        搜索框-->
            <div class="home_search" @click="toSearch">
                <div class="search_left">
                    <div class="searchicon">
                        <van-icon color="#fd3535" size="24px" name="search" />
                    </div>
                    <div class="searchinput">
                        搜索商品
                    </div>
                </div>
                <div class="search_right">
                    <van-icon color="#fd3535" size="24px"  name="scan" />
                </div>
            </div>
        </div>
        <div v-if="list.length===0" class="holder"></div>
        <div class="classify_body">
<!--            <div class="body_left">-->
<!--                <component-->
<!--                    :is="classifyLeft.component"-->
<!--                ></component>-->
<!--            </div>-->
            <div v-if="list.length>0" class="classifyLeft">
                <van-sidebar v-model="currentOneIndex" class="left_sidebar">
                    <van-sidebar-item v-for="(item,index) in list" :title="item.name" />
                </van-sidebar>
            </div>
            <div v-if="list.length>0" class="body_right">
<!--                <component-->
<!--                    :is="classifyRight.component"-->
<!--                ></component>-->
                <div v-for="(item2,index2) in list[currentOneIndex].children"
                    class="twoRow">
                    <div class="twoName">{{item2.name}}</div>
                    <div class="threeRow">
                        <div v-for="(item3,index3) in item2.children"
                        class="threeItem">
                            <div class="threeImg">
                                <van-image :src="item3.img"></van-image>
                            </div>
                            <div class="threeName">{{item3.name}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="weberror" class="lostWeb">
                <div class="lostWebImg">
                    <img src="../../../image/lostWeb.png" />
                </div>
                <div>
                    网络请求失败
                </div>
                <div>
                    请检查您的网络
                </div>
                <div @click="initList">
                    重新加载
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
    export default {
        name: "Classify",
        data(){
            return{
                // classifyLeft: {
                //     component: ()=>import('./classifyLeft/classifyLeft')
                // },
                // classifyRight: {
                //     component: ()=>import('./classifyRight/classifyRight')
                // },
                currentOneIndex: 0,
                list:[],
                loading: false,
                weberror: false,
                // list:[
                //     {
                //         id:1,
                //             name:"服装",
                //         children:[
                //         {
                //             id:4,
                //             name:"衬衣",
                //             children:[
                //                 {
                //                     id:7,
                //                     name:"长袖衬衣",
                //                     children:[]
                //                 },
                //                 {
                //                     id:8,
                //                     name:"短袖衬衣",
                //                     children:[]
                //                 },
                //                 {
                //                     id:9,
                //                     name:"格子衬衣",
                //                     children:[]
                //                 },
                //                 {
                //                     id:19,
                //                     name:"长袖衬衣",
                //                     children:[]
                //                 },
                //             ]
                //         },
                //         {
                //             id:5,
                //             name:"工装裤",
                //             children:[
                //             ]
                //         },
                //         {
                //             id:6,
                //             name:"T恤",
                //             children:[
                //             ]
                //         },
                //     ]
                //     },
                //     {
                //         id:2,
                //             name:"电器",
                //         children:[
                //         {
                //             id:10,
                //             name:"冰箱",
                //             children:[
                //                 {
                //                     id:13,
                //                     name:"双开门",
                //                     children:[]
                //                 },
                //                 {
                //                     id:14,
                //                     name:"单开门",
                //                     children:[]
                //                 },
                //                 {
                //                     id:15,
                //                     name:"冰柜",
                //                     children:[]
                //                 }
                //             ]
                //         },
                //         {
                //             id:11,
                //             name:"吹风机",
                //             children:[
                //             ]
                //         },
                //         {
                //             id:12,
                //             name:"抽烟机",
                //             children:[
                //             ]
                //         },
                //     ]
                //     },
                //     {
                //         id:3,
                //             name:"家具",
                //         children:[
                //     ]
                //     }
                // ]


            }
        },
        methods:{
            toSearch(){
                this.$router.push({
                    path: '/search',
                    query:{}
                })
            },
            initList(){
                this.loading = true;
                console.log(this.loading)
                let that = this;
                axios.get(this.common.baseUrl+"/pms-category/list")
                    .then((response)=>{
                        // console.log(response)
                        this.list = response.data.obj;
                        for (let i=0;i<this.list.length;i++){
                            for (let j=0;j<this.list[i].children.length;j++){
                                for (let k=0;k<this.list[i].children[j].children.length;k++){
                                    this.list[i].children[j].children[k].img=this.$store.getters.GET_IMGSRC+this.list[i].children[j].children[k].img;
                                }
                            }
                        }
                        this.weberror = false;
                        that.loading = false;
                    }).catch(error=>{

                        console.log(error.request);
                        console.log(error.message);
                        this.weberror=true;
                        if (error.message==="Network Error"){
                            Toast("网络异常")
                        }
                        this.loading = false;
                        // console.log(that.loading)
                    })

            }
        },
        created() {
            this.$store.commit("SET_ACTIVETABBAR",'classify');
            this.initList();
        }
    }
</script>

<style scoped lang="less">
    @searchHeight:40px;
    @searchHeight-2:20px;
    @searchHeight-4:10px;
    @searchSize: 12px;
    @width: 90%;
    @classifyHeight: 30px;
    @footholderheight: 50px;
    @maincolor: #f7f8fa;
    @searchColor: #b2b2b2;
    @codebordercolor: #efefef;
    .classify_index{
        background-color: @maincolor;
        margin-bottom: 50px;
        min-height: calc(100vh - 50px);
        position: relative;
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

        .holder{
            background-color: @maincolor;
            height: 50px;
        }
        .classify_top{
            padding: 10px 0;
            position: fixed;
            z-index: 3;
            left: 0;
            top: 0;
            width: 100%;
            background-color: @maincolor;
            .home_search{
                width: @width;
                margin: 0 auto;
                background-color: #ffffff;
                height: @searchHeight;
                border-radius: @searchHeight-2;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .search_left{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    .searchicon{
                        /*background-color: coral;*/
                        width: @searchHeight;
                        height: @searchHeight;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin-left: @searchHeight-4;
                    }
                    .searchinput{
                        line-height: @searchHeight;
                        size: @searchSize;
                        color: @searchColor;
                    }
                }
                .search_right{
                    /*background-color: coral;*/
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0 15px;
                    border-left: 1px solid @codebordercolor;
                }
            }
        }
        .classify_body{
            margin-top: 60px;
            display: flex;
            flex-direction: row;
            .lostWeb{
                display: flex;
                flex-direction: column;
                text-align: center;
                /*background-color: pink;*/
                margin:  auto;
                .lostWebImg{
                    margin: 30px 0 20px;
                    width: 100px;
                    height: 100px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                div:nth-child(2){
                    color: #aaaaaa;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                div:nth-child(3){
                    color: #aaaaaa;
                    font-size: 14px;
                    margin-bottom: 30px;
                }
                div:last-child{
                    width: 100px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 12px;
                    color: #646566;
                    border: 1px solid #aaaaaa;
                    text-align: center;
                }
            }
            .classifyLeft{
                overflow-y: auto;
                width: 20%;
                .left_sidebar{
                    width: 100%;
                    text-align: center;
                    .van-sidebar-item{
                        font-size: 12px;
                    }
                    .van-sidebar-item--select{
                        font-size: 14px;
                        font-weight: bold;
                        border-top-left-radius: 16px;
                        border-bottom-left-radius: 16px;
                    }

                }
            }
            .body_right{
                background-color: #ffffff;
                border-top-right-radius: 16px;
                border-bottom-right-radius: 16px;
                width: 80%;
                height: 100%;
                padding: 10px;
                box-sizing: border-box;
                .twoRow{
                    clear: left;
                    .twoName{
                        font-size: 14px;
                        font-weight: bold;
                        /*background-color: pink;*/
                        margin-left: 10%;
                    }
                    .threeRow{
                        margin: 10px 0;
                        .threeItem{
                            width: 33%;
                            min-width: 33%;
                            padding: 10px;
                            float: left;
                            box-sizing: border-box;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .threeImg{
                                height: 40px;
                                width: 40px;
                                .van-image{
                                    width: 100%;
                                    height: 100%;
                                    /*img{*/
                                    /*    object-fit: cover;*/
                                    /*}*/
                                }
                            }
                            .threeName{
                                font-size: 12px;
                                text-align: center;
                                margin-top: 10px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>