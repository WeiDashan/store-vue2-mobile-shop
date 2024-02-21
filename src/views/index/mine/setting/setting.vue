<template>
    <div class="setting">
        <div class="setting_top">
            <div>账户设置</div>
            <div class="left-arrow" @click="goback">
                <img src="../../../../image/leftarrow.png" />
            </div>
        </div>
        <div class="setting_head">
            <div class="user_info" @click="toUserInfo">
                <div class="userimg">
<!--                    <img src="../../../../image/defaultUserPic.png" />-->
                    <van-image :src="userinfo.icon"></van-image>
                </div>
                <div class="name">
                    <div class="nickname">{{userinfo.nickyName}}</div>
                    <div class="username">用户名：{{userinfo.loginName}}</div>
                </div>
                <div class="rightarrowimg">
                    <img src="../../../../image/rightarrow.png" />
                </div>
            </div>
            <div class="address" @click="toAddAddress">
                <div>地址管理</div>
                <div class="rightarrowimg">
                    <img src="../../../../image/rightarrow.png" />
                </div>
            </div>
        </div>
        <div class="setting_mid">
            <div class="mid_one">
                <div class="midname">账户安全</div>
                <div class="rightarrowimg">
                    <img src="../../../../image/rightarrow.png" />
                </div>
            </div>
            <div class="mid_one">
                <div class="midname">功能反馈</div>
                <div class="rightarrowimg">
                    <img src="../../../../image/rightarrow.png" />
                </div>
            </div>
        </div>
        <div class="setting_quit" @click="quitLogin">
            退出登录
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "Setting",
        data(){
            return{
                userinfo: {
                    active: 1,
                    email: "zhhzh0629@icloud.com",
                    icon: "http://139.196.126.28:9000/images/20210718181630020217628.jpeg",
                    loginName: "ceshiquanxian",
                    nickyName: "ceshiquanxian",
                    phone: "13373367378",
                }
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
            toAddAddress(){
                this.$router.push({
                    path:'/manageaddress'
                })
            },
            toUserInfo(){
                this.$router.push({
                    path:'/userinfo'
                })
            },
            quitLogin(){
                Toast("退出登录");
                this.$store.commit("SET_USERID",0);
                this.$router.push({
                    path:'/mine'
                })
            }
        },
        created() {
            this.userinfo=this.$store.getters.GET_USERINFO;
        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    @borderRadiusSize: 12px;
    @settingnamefontsize: 14px;
    @quitheight: 44px;
    .rightarrowimg{
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .setting{
        background-color: @maincolor;
        height: 100vh;
        .setting_top{
            text-align: center;
            position: relative;
            background-color: #ffffff;
            padding: 10px;
            font-size: 14px;
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
        }
        .setting_head{
            background-color: #ffffff;
            border-bottom-left-radius: @borderRadiusSize;
            border-bottom-right-radius: @borderRadiusSize;
            .user_info{
                padding: 10px;
                border-bottom: 2px solid @maincolor;
                display: flex;
                flex-direction: row;
                align-items: center;
                position: relative;
                .userimg{
                    height: 60px;
                    width: 60px;
                    border-radius: 50%;
                    border: 1px solid #cccccc;
                    overflow: hidden;
                    .van-image{
                        width: 100%;
                        height: 100%;
                    }
                }
                .name{
                    margin-left: 10px;
                    line-height: 20px;
                    .nickname{
                        height: 20px;
                        color: #000000;
                        font-size: 14px;
                    }
                    .username{
                        font-size: 12px;
                        height: 20px;
                        color: #aaaaaa;
                    }
                }
            }
            .address{
                position: relative;
                padding: 10px;
                font-size: @settingnamefontsize;
            }
        }
        .setting_mid{
            margin-top: 12px;
            background-color: #ffffff;
            border-radius: @borderRadiusSize;
            .mid_one{
                padding: 10px;
                border-bottom: 2px solid @maincolor;
                position: relative;
                font-size: @settingnamefontsize;
                .midname{

                }
            }
        }
        .setting_quit{
            margin-top: 30px;
            background-color: #ffffff;
            text-align: center;
            height: @quitheight;
            line-height: @quitheight;
            font-size: @settingnamefontsize;
            border-radius: @borderRadiusSize;
        }
    }
</style>