<template>
    <div class="userinfo">
        <div class="userinfo_top">
            <div v-if="!editNickNameFlag">个人信息</div>
            <div v-if="editNickNameFlag">修改昵称</div>
            <div class="left-arrow" @click="goback">
                <img src="../../../../image/leftarrow.png" />
            </div>
            <div class="top_yes" v-if="editNickNameFlag" @click="checkNickName">确定</div>
        </div>
        <div style="position: relative">
            <div class="userinfo_body" v-if="!editNickNameFlag" >
                <div class="body_one">
                    <div class="one_name">头像</div>
                    <div class="one_img">
                        <van-image :src="umsUser.icon"></van-image>
                    </div>
                    <div class="rightarrowimg">
                        <img src="../../../../image/rightarrow.png" />
                    </div>
                </div>
                <div class="body_one" @click="editUserName">
                    <div class="one_name">用户名</div>
                    <div class="one_detail">{{umsUser.loginName}}</div>
                </div>
                <div class="body_one" @click="editEmail">
                    <div class="one_name">邮箱</div>
                    <div class="one_detail">{{umsUser.email}}</div>
                </div>
                <div class="body_one" @click="editNickName">
                    <div class="one_name">昵称</div>
                    <div class="one_detail">{{umsUser.nickyName}}</div>
                    <div class="rightarrowimg">
                        <img src="../../../../image/rightarrow.png" />
                    </div>
                </div>
                <div class="body_one" @click="editPhone">
                    <div class="one_name">手机号</div>
                    <div class="one_detail">{{umsUser.phone}}</div>
                    <div class="rightarrowimg">
                        <img src="../../../../image/rightarrow.png" />
                    </div>
                </div>
            </div>
            <div v-if="editNickNameFlag">
                <div class="editNickNameInput">
                    <van-cell-group>
                        <van-field v-model="value" clearable />
                    </van-cell-group>
                </div>
                <div class="message">4-20个字符，可由中英文、数字组成</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "Userinfo",
        data(){
            return{
                editNickNameFlag: false,
                editBirthdayFlag: false,
                editSexFlag: false,
                umsUser:{
                    active: 1,
                    email: "767708152@qq.com",
                    icon: "20210702155821466279482.jpg",
                    id: 105,
                    loginName: "zzz11",
                    nickyName: "郑煌志",
                    phone: "13421421151",
                },
                value: '',
                nickNameRule: /^([a-zA-Z0-9\u4e00-\u9fa5\·]{4,20})$/,

            }
        },
        methods:{
            goback(){
                if (this.editNickNameFlag){
                    this.editNickNameFlag=false;
                    this.value='';
                }else {
                    this.$router.go(-1)
                }
            },
            editEmail(){
                Toast('邮箱不支持修改呦~');
            },
            editUserName(){
                Toast('用户名不支持修改呦~');
            },
            editPhone(){

            },
            editNickName(){
                this.editNickNameFlag=true;
                this.value=this.umsUser.nickyName;
            },
            checkNickName(){
                const nicknameRe = new RegExp(this.nickNameRule);
                if (nicknameRe.test(this.value)){
                    const formData = new FormData();
                    formData.append("nickyName",this.value);
                    formData.append("id",this.umsUser.id);
                    axios.post(this.common.baseUrl+'/ums-user/update',formData).then(response=>{
                        Toast(response.data.message);
                        if (response.data.obj===true){
                            let userinfo = this.$store.getters.GET_USERINFO;
                            userinfo.nickyName = this.value;
                            this.$store.commit("SET_USERINFO",userinfo);
                            this.umsUser.nickyName=this.value;
                            this.value='';
                            this.editNickNameFlag = false;
                        }
                    })
                }else{
                    Toast("昵称格式不正确");
                }
            },
        },
        created() {
            console.log(this.$store.getters.GET_USERID)
            if (this.$store.getters.GET_USERID>0){
                axios.get(this.common.baseUrl+"/ums-user/getone?id="+this.$store.getters.GET_USERID).then(response=>{
                    this.umsUser = response.data.obj;
                    this.umsUser.icon = this.$store.getters.GET_IMGSRC+this.umsUser.icon;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    .userinfo{
        background-color: @maincolor;
        height: 100vh;
        .sexPicker{
            z-index: 99;
            position: absolute;
            border-bottom: 0;
            left: 0;
            width: 100%;
            background-color: #ffffff;
        }
        .birthdayPicker{
            z-index: 99;
            position: absolute;
            border-bottom: 0;
            left: 0;
            width: 100%;
            background-color: #ffffff;
        }
        .shadow{
            height: 100vh;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
            background-color: rgba(0,0,0,0.6);
        }
        .userinfo_top{
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
            .top_yes{
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .userinfo_body{
            padding-top: 10px;
            background-color: #ffffff;
            .body_one{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                position: relative;
                padding: 10px;
                border-bottom: 1px solid @maincolor;
                .one_name{
                    font-size: 12px;
                }
                .one_detail{
                    margin-right: 20px;
                    font-size: 12px;
                    color: #808080;
                    display: flex;
                    align-items: center;
                }
                .one_img{
                    height: 50px;
                    width: 50px;
                    margin-right: 20px;
                    border: 1px solid #aaaaaa;
                    border-radius: 50%;
                    overflow: hidden;
                    .van-image{
                        height: 100%;
                        width: 100%;
                    }
                }
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
            }
        }
        .editNickNameInput{
            font-size: 14px;
        }
        .message{
            padding: 16px 10px;
            color: #a7a7a7;
            font-size: 12px;
        }
    }
</style>