<template>
    <div class="hotproduct">
        <div class="hotproduct_left">
            <div v-for="(item,index) in mydataHotLeft"
                 class="leftone"  @click="toProductDetail(item)">
                <div class="productimg">
                    <van-image :src="item.img"/>
                </div>
                <div class="productname">
                    <span v-if="item.new_status===1" class="productTag">新品推荐</span>
                    <span class="productname_name">{{item.name}}</span>
                </div>
                <div class="productprice"><span>￥</span>{{item.price}}</div>
            </div>
        </div>
        <div class="hotproduct_right">
            <div v-for="(item,index) in mydataHotRight"
                 class="rightone"  @click="toProductDetail(item)">
                <div class="productimg">
                    <van-image :src="item.img"/>
                </div>
                <div class="productname">
                    <span v-if="item.new_status===1" class="productTag">新品推荐</span>
                    <span class="productname_name">{{item.name}}</span>
                </div>
                <div class="productprice"><span>￥</span>{{item.price}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hotproduct",
        props: {
            mydataHotLeft: {
                type: Array,
                default: () => { return []}
            },
            mydataHotRight: {
                type: Array,
                default: () => { return []}
            }
        },
        data(){
            return{

            }
        },
        methods:{
            toProductDetail(item){
                this.$router.push({
                    path:'/productdetail',
                    query:{
                        productId: item.id
                    }
                })
            },
        }
    }
</script>

<style scoped lang="less">
    @midsnapwidth:6px;
    @productNameHeigth: 20px;
    @productNameMaxHeight:40px;
    @priceColor: #fd3535;
    @productFontPadding: 10px;
    .hotproduct{
        width: calc(90% + 12px);
        /*background-color: #000000;*/
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        .hotproduct_left{
            margin-right: @midsnapwidth;
        }
        .hotproduct_right,
        .hotproduct_left{
            width: 50%;
            .rightone,
            .leftone{
                width: 100%;
                background-color: #ffffff;
                border-radius: 6px;
                box-sizing: border-box;
                margin-top: 10px;
                overflow: hidden;
                .productimg{
                    width: 100%;
                    img{
                        object-fit: contain;
                        width: 100%;
                    }
                }
                .productname{
                    line-height: @productNameHeigth;
                    max-height: @productNameMaxHeight;
                    font-weight: bold;
                    padding: 0 @productFontPadding;
                    overflow: hidden;
                    justify-items: center;
                    .productTag{
                        display: inline-block;
                        background-color: @priceColor;
                        vertical-align: middle;
                        color: #ffffff;
                        font-weight: normal;
                        font-size: 10px;
                        padding: 0 2px;
                        border-radius: 6px;
                        text-align: center;
                        margin-right: 2px;
                        margin-bottom: 2px;
                    }
                    .productname_name::before{
                        display: inline-block;
                        content: "";
                        height: 100%;
                        vertical-align: middle;
                    }
                }
                .productprice{
                    padding: 4px @productFontPadding;
                    color: @priceColor;
                    font-weight: bold;
                    font-size: 20px;
                    span{
                        font-size: 14px;
                    }
                }

            }
        }
    }
</style>