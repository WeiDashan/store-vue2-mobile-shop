<template>
    <div class="search_main">
        <div class="search_top">
            <div class="top_img" @click="backToHome">
                <img src='../../image/leftarrow.png'/>
            </div>
            <div class="search_input">
                <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    shape="round"
                    background="#f7f8fa"
                    @input="inputchange"
                />
            </div>
            <div class="search_btn" @click="toList">
                搜索
            </div>
        </div>
        <div class="search_body">
            <div class="search_history">
                <div class="history_title">
                    <div>搜索历史</div>
                    <div class="trash_img" @click="clearhistory">
                        <img src='../../image/trashcase.png'/>
                    </div>

                </div>
                <div class="history_tag">
                    <div v-for="historyitem in historyList">{{historyitem}}</div>
                </div>
                <div class="history_info" v-if="historyList.length===0">—————暂无搜索历史—————</div>
            </div>
            <div class="search_hot">
                <div class="hot_title">热搜榜</div>
                <div class="hot_col">
                    <div class="col_one">
                        <div v-for="(hotitem,hotindex) in hotList">
                            <div v-if="hotindex<4">{{hotitem}}</div>
                        </div>
                    </div>
                    <div class="col_one">
                        <div v-for="(hotitem,hotindex) in hotList">
                            <div v-if="hotindex>3">{{hotitem}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="show" class="search_list">
                <div v-for="searchitem in searchList" class="list_onerow">
                    <div>
                        {{searchitem.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    export default {
        name: "Search",
        data() {
            return {
                value: '',
                show: false,
                historyList:[
                    "鼠标","华为手机","T恤","鼠标123131","华为手机123","1","13","124","11234"
                ],
                hotList:[
                    "脱脂牛奶","京东啤酒节","进口脱脂牛拿","pinggguoerji","脱脂牛奶","京东啤酒节","进口脱脂牛拿","pinggguoerji"
                ],
                searchList:[
                    {
                        name: "12",
                        skuList:[
                            '苹果','小米','美版'
                        ]
                    },
                    {
                        name: "12123",
                        skuList:[
                            '苹果111','小米22','美版33'
                        ]
                    },
                    {
                        name: "1222",
                        skuList:[
                            '苹果','小米11','美版'
                        ]
                    },
                    {
                        name: "12222333333",
                        skuList:[
                            '苹果','小米','美版33'
                        ]
                    },
                    {
                        name: "12222",
                        skuList:[
                            '苹果11','小米','美版'
                        ]
                    },
                    {
                        name: "12",
                        skuList:[
                            '苹果','小米223','美版1'
                        ]
                    }
                ]
            };
        },
        components: {
            [Dialog.Component.name]: Dialog.Component,
        },
        methods:{
            toList(){
                this.$router.push({
                    path:'/list',
                    query:{
                        value: this.value
                    }
                })
            },
            clearhistory(){
                Dialog.confirm({
                    // title: '标题',
                    message: '您是否要清空搜索历史',
                }).then(() => {
                    this.historyList = []
                }).catch(()=>{

                })
            },
            backToHome(){
                this.$router.push({
                    path:"/"
                })
            },
            inputchange(){
                if (this.value===''){
                    this.show=false
                }else{
                    this.show = true;
                }
            }
        },
        watch:{
            value(value){
                axios.get(this.common.baseUrl+"/pms-product/search?keywords="+this.value+"&pageNum="+1+"&pageSize="+10).then(response=>{
                    console.log(response)
                    this.searchList = response.data.obj;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    @redcolor:#fd3535;
    .search_main{
        height: 100vh;
        background-color: @maincolor;
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
        .search_body{
            position: relative;
            width: 100%;
            height: 100%;
            .search_history{
                padding: 0 20px;
                .history_title{
                    font-weight: bold;
                    font-size: 14px;
                    margin: 10px 0;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .trash_img{
                        width: 16px;
                        height: 16px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .history_tag{
                    margin-top: 10px;

                    div{
                        background-color: #ffffff;
                        display: inline-block;
                        margin: 0 10px 10px;
                        font-size: 12px;
                        padding: 2px 8px;
                        border-radius: 8px;
                    }
                }
                .history_info{
                    font-size: 12px;
                    color: #aaaaaa;
                    text-align: center;
                }
            }
            .search_hot{
                padding: 0 20px;
                .hot_title{
                    font-weight: bold;
                    font-size: 14px;
                    margin: 10px 0;
                }
                .hot_col{
                    display: flex;
                    flex-direction: row;
                    .col_one{
                        width: 50%;
                        div{
                            line-height: 30px;
                            font-size: 12px;
                        }
                    }
                }
            }
            .search_list{
                background-color: @maincolor;
                z-index: 8;
                height: 100%;
                width: 100%;
                position: absolute;
                left: 0;
                top: 0;
                padding: 0 20px;
                line-height: 40px;
                box-sizing: border-box;
                font-size: 12px;
                .list_onerow{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    border-bottom: 1px solid #eeeeee;
                    overflow: hidden;
                    /*background-color: red;*/
                    /*height: 40px;*/
                    /*line-height: 40px;*/
                    .search_skulist{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        span{
                            background-color: #ffffff;
                            margin: 0 6px;
                            height: 16px;
                            line-height: 16px;
                            padding: 2px 4px;
                            border-radius: 8px;
                        }

                    }
                }
            }
        }
    }
</style>