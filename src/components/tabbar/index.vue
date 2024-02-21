<template>
    <div class="index_nav">
        <van-tabbar v-model="active">
            <van-tabbar-item name="home" to="/" icon="home-o">首页</van-tabbar-item>
<!--            <van-tabbar-item name="classify" to="/classify" icon="apps-o">分类</van-tabbar-item>-->
            <van-tabbar-item name="orders" to="/orders" icon="orders-o">订单</van-tabbar-item>
            <van-tabbar-item name="cart" to="/cart" icon="cart-o">购物车</van-tabbar-item>
            <van-tabbar-item name="mine" to="/mine" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "MyTabbar",
        data() {
            return {
                active: this.$store.getters.GET_ACTIVETABBAR,
            };
        },
    }
</script>

<style scoped>
    .index_nav{
        background-color: #ffffff;
    }
</style>