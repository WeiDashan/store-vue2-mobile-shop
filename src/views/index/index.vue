<template>
    <div class="index">
        <div class="main">
            <router-view></router-view>
        </div>
        <MyTabbar></MyTabbar>
    </div>
</template>

<script>
    import MyTabbar from "../../components/tabbar"
    export default {
        name: "index",
        components:{
            MyTabbar
        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    .index{
        background-color: @maincolor;
        .main{
            background-color: @maincolor;
        }
    }
</style>