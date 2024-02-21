<template>
    <div class="history">
        <div class="inputCode_top">
            <div>历史纪录</div>
            <div class="left-arrow" @click="goback">
                <img src="../../../../image/leftarrow.png" />
            </div>
            <div class="operator">
                <div>清空</div>
                <div>编辑</div>
            </div>
        </div>
        <div class="search_mid">
            <div v-for="(dateitem,dateindex) in dates">
                <div>{{dateitem}}</div>
                <div v-for="(item,index) in footprint[dateitem]" class="oneRow">
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
    </div>
</template>

<script>
    export default {
        name: "history",
        methods:{
            goback(){
                this.$router.go(-1);
            }
        },
        data(){
            return{
                dates:[],
                footprint: {},
            }
        },
        created() {
            axios.get(this.common.baseUrl+"/ums-footprint/getByDateDes?userId="+this.$store.getters.GET_USERID).then(response=>{
                for (let key in response.data.obj.footprint){
                    let arr = response.data.obj.footprint[key];
                    for (let i=0;i<response.data.obj.footprint[key].length;i++){
                        response.data.obj.footprint[key][i].img = this.$store.getters.GET_IMGSRC + response.data.obj.footprint[key][i].img;
                    }
                }
                this.dates = response.data.obj.date;
                this.footprint = response.data.obj.footprint;
                // console.log(response);
                // {
                //     active: 1
                //     brandId: 1
                //     categoryId: "1,2,32"
                //     detailHtml: "<p class=\"ql-align-center\"><span style=\"background-color: rgb(240, 102, 102);\"><img src=\"http://139.196.126.28:9000/images/20210709162726303311988.webp\"></span></p><p class=\"ql-align-center\"><span style=\"background-color: rgb(240, 102, 102);\">dhajdahoida</span></p>"
                //     hotStatus: 1
                //     id: 11
                //     img: "20210711001922071191946.webp"
                //     keywords: ""
                //     name: "T恤"
                //     newStatus: 1
                //     pics: "20210709160225162124248.webp, 20210711001922071191946.webp, 20210711001923024416349.webp, 20210709161309631225421.webp, 20210709162726303311988.webp"
                //     price: 111
                //     publishStatus: 1
                // }
            })
        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    @bordercolor: #f5f5f5;
    @redcolor: #fd3535;
    .history{
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
                    margin: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .name{
                        font-size: 16px;
                        /*font-weight: bold;*/
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