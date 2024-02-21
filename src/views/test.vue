<template>
    <div>
<!--        <van-image-->
<!--                width="100"-->
<!--                height="100"-->
<!--                src="http://139.196.126.28:9000/images/20210709160225162124248.webp"-->
<!--        />-->
<!--        <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">-->
<!--        </mescroll-vue>-->
<!--        <van-tree-select-->
<!--                :items="items"-->
<!--                :active-id.sync="activeId"-->
<!--                :main-active-index.sync="activeIndex"-->
<!--        />-->
        <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1"/>
    </div>
</template>

<script>
    import MescrollVue from 'mescroll.js/mescroll.vue'
    export default {
        name: "test",
        components: {
            MescrollVue
        },
        data () {
            return {
                fileList: [

                ],
                // mescroll: null,
                // mescrollUp: {
                //     callback: this.upCallback
                // },
                // items: [
                //     { text: '浙江', children: [
                //         {
                //            text: '温州',
                //            id: 1,
                //         }
                //     ] },
                //     { text: '江苏', children: [] },
                // ],
                // activeId: 1,
                // activeIndex: 0,
            }
        },
        methods: {
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
            },
            // mescrollInit(mescroll) {
            //     this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            // },
            // upCallback(page, mescroll) {
            //     mescroll.endSuccess(111)
            //     console.log(111)
            // }
        }
    }
</script>

<style scoped>
    .mescroll {
        position: fixed;
        top: 44px;
        bottom: 0;
        height: auto;
    }
</style>