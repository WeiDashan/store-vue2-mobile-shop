<template>
    <div class="home_index">
        <mescroll-vue class="home_index_mescroll" ref="mescroll" :up="mescrollUp" @init="mescrollInit">
            <div class="home">
                <!--        搜索框-->
                <div class="home_search">
<!--                <div class="home_search" @click="toSearch">-->
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
                <!--        轮播图-->
                <div class="head_swiper">
                    <van-swipe
                            class="my-swipe"
                            :autoplay="3000"
                            indicator-color="white"
                            width="90%"
                    >
                        <van-swipe-item v-for="(item,index) in myimages"  :key="index">
<!--                          @click="toProductDetail(item)"-->
                            <van-image :src=item.img />
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <!--       商品推荐 -->
                <div class="head_product">
                    <van-tabs v-model="active">
                        <van-tab title="精品热卖">
                            <component
                                    :is="hotproduct.component"
                                    :mydataHotLeft="mydataHotLeft"
                                    :mydataHotRight="mydataHotRight"
                            ></component>
                        </van-tab>
                        <van-tab title="新品推荐">
                            <component
                                    :is="newproduct.component"
                                    :mydataNewLeft="mydataNewLeft"
                                    :mydataNewRight="mydataNewRight"
                            ></component>
                        </van-tab>
                    </van-tabs>
                </div>
                <div class="footplaceholder"></div>
            </div>
        </mescroll-vue>
    </div>
</template>

<script>
    import MescrollVue from 'mescroll.js/mescroll.vue'
    const module = '/pms-product'
    export default {
        name: "Home",
        components: {
            MescrollVue
        },

        data(){
           return{
               mescroll: null,
               mescrollDown:{},
               mescrollUp: {
                   callback: this.upCallback,
                   toTop: {
                       //回到顶部按钮
                       src: 'https://img1.baidu.com/it/u=3475924869,3749433407&fm=26&fmt=auto&gp=0.jpg', //图片路径,默认null,支持网络图
                       offset: 1000 //列表滚动1000px才显示回到顶部按钮
                   },
               },
               active: 0,
               myimages:[],
               mydataHotLeft:[],
               mydataHotRight:[],
               mydataNewLeft:[],
               mydataNewRight:[],
               hotproduct: {
                  component: () => import('./hotproduct/hotproduct')
               },
               newproduct: {
                   component: () => import('./newproduct/newproduct')
               },
               num: 1,
               url:{
                 list: module + '/list'
               },
               pageHotSize:8,
               pageHotNo:1,
               pageNewNo:1,
               pageNewSize:8,
               orderNoMore: false,
               loading: false,
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
            toSearch(){
                this.$router.push({
                    path: '/search',
                    query:{
                    }
                })
            },
            initPageData(){
                this.mydataHotLeft=[]
                this.mydataHotRight=[]
                this.mydataNewLeft=[]
                this.mydataNewRight=[]
                this.pageHotNo=1
                this.pageNewNo=1
                this.orderNoMore=false
                this.initProduct()
            },
            mescrollInit(mescroll) {
                this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            },
            initProduct(){
              this.get(this.common.baseUrl+this.url.list,
                  {
                      pageNo: 0,
                      pageSize: 6,
                  },
                  (response)=>{
                    console.log(response)
                    for (let i=0;i<response.records.length;i++){
                      if(i%2!==0){
                        response.records[i].img = this.$store.getters.GET_IMGSRC + response.records[i].img;
                        this.mydataNewLeft.push(response.records[i]);
                        this.mydataHotRight.push(response.records[i]);
                      }else{
                        response.records[i].img = this.$store.getters.GET_IMGSRC + response.records[i].img;
                        this.mydataNewRight.push(response.records[i]);
                        this.mydataHotLeft.push(response.records[i]);
                      }
                    }
                    console.log(this.mydataHotLeft);
                    console.log(this.mydataHotRight);
                    this.loading = false;
                  }
              )

            },
            addHotProduct(){
                axios.get(this.common.baseUrl+this+this.pageHotNo+"&pageSize="+this.pageHotSize)
                    .then((response)=>{
                        if (response.data.obj.records.length<6){
                            this.orderNoMore=true;
                        }
                        for (let i=0;i<response.data.obj.records.length;i++){
                            if(i%2===0){
                                response.data.obj.records[i].img = this.$store.getters.GET_IMGSRC + response.data.obj.records[i].img;
                                this.mydataHotLeft.push(response.data.obj.records[i]);
                            }else{
                                response.data.obj.records[i].img = this.$store.getters.GET_IMGSRC + response.data.obj.records[i].img;
                                this.mydataHotRight.push(response.data.obj.records[i]);
                            }
                        }
                        this.pageHotNo++;
                        this.loading = false;
                                    // console.log(this.mydataHotLeft);
                    })
            },
            addNewProduct(){
                axios.get(this.common.baseUrl+this.url.list+
                    {
                        pageNo: this.pageNewNo,
                        pageSize: this.pageNewSize,
                    })
                    .then((response)=>{
                        // console.log(response.data.obj.records);
                        // if (response.data.obj.records.length<6){
                        //     this.orderNoMore=true;
                        // }
                        this.orderNoMore=true;
                        for (let i=0;i<response.data.obj.records.length;i++){
                            if(i%2===0){
                                response.data.obj.records[i].img = this.$store.getters.GET_IMGSRC + response.data.obj.records[i].img;
                                this.mydataNewLeft.push(response.data.obj.records[i]);

                            }else{
                                response.data.obj.records[i].img = this.$store.getters.GET_IMGSRC + response.data.obj.records[i].img;
                                this.mydataNewRight.push(response.data.obj.records[i]);
                            }
                        }
                        // console.log(this.mydataHotLeft);
                        this.pageNewNo++;
                        this.loading = false;
                    })
            },
            upCallback(page, mescroll) {
                // if (!this.loading){
                //     this.loading = true;
                //     if (this.active===0){
                //         if (!this.orderNoMore){
                //             this.addHotProduct();
                //         }
                //         this.$nextTick(() => {
                //             mescroll.endSuccess()
                //         });
                //
                //     }else {
                //         if (!this.orderNoMore){
                //             this.addNewProduct();
                //         }
                //         this.$nextTick(() => {
                //             mescroll.endSuccess()
                //         });
                //     }
                // }
            },
            initLunBo(){
                // axios.get(this.common.baseUrl+"/pms-product/getLunBo").then((response)=>{
                //     this.myimages= response.data.obj;
                //
                //     for (let i=0;i<this.myimages.length;i++){
                //         this.myimages[i].img=this.$store.getters.GET_IMGSRC+this.myimages[i].img;
                //     }
                // })
                this.myimages = [
                  {img: this.$store.getters.GET_IMGSRC+"O1CN01j6IfYe1imRMgpNMNM.jpg"},
                  {img: this.$store.getters.GET_IMGSRC+"O1CN01npl1rB1EcscddgzVu.jpg"},
                  {img: this.$store.getters.GET_IMGSRC+"O1CN01pzn0xQ1aKwf3Vt769.jpg"},
                  {img: this.$store.getters.GET_IMGSRC+"O1CN01QrjR36201sB0sLw6O.jpg"},
                ]
            }
        },
        created() {
            this.initPageData();
            this.initLunBo();
        },
        // watch:{
        //     active(active){
        //         if (active===0){
        //             this.initPageData();
        //             this.addHotProduct()
        //         }else{
        //             this.initPageData();
        //             this.addNewProduct();
        //         }
        //     }
        // }
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

    .home_index .home_index_mescroll .mescroll-totop{
        bottom: 70px;
    }
    .home_index{
        background-color: @maincolor;
    }
    .mescroll {
        position: fixed;
        top: 0;
        bottom: 0;
        height: auto;
    }
    .home{
        width: 100%;
        padding-top: 10px;
        background-color: @maincolor;
        .footplaceholder{
            height: @footholderheight;
        }
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
        .head_swiper{
            width: 90%;
            margin: 10px auto;
            height: 200px;
            overflow: hidden;
            border-radius: 10px;
            .my-swipe{
                width: 100%;
                height: 100%;
                .van-image{
                    width: 100%;
                    height: 100%;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: fill;
                    }
                }
            }
        }
        .head_product{
        }

    }
</style>