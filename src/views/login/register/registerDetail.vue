<template>
    <div class="registerDetail">
        <div class="register_top">
            <div class="left-arrow" @click="quitregister">
                <img src="../../../image/leftarrow.png" />
            </div>
            <div>注册信息填写</div>
        </div>
        <div>
            <van-form @submit="onSubmit">
                <div class="headimg">
                    <div class="headTitle">头像</div>
                    <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1"/>
                </div>
                <van-field
                        v-model="umsUser.loginName"
                        name="loginName"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                        v-model="umsUser.nickyName"
                        name="nickyName"
                        label="昵称"
                        placeholder="昵称"
                        :rules="[{ required: true, message: '请填写昵称' }]"
                />
                <van-field
                        v-model="umsUser.rawPassword"
                        type="password"
                        name="rawPassword"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                        v-model="confirmpassword"
                        type="password"
                        name="confirmpassword"
                        label="确认密码"
                        placeholder="确认密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                        v-model="umsUser.phone"
                        name="phone"
                        label="手机号"
                        placeholder="手机号"
                        :rules="[{ required: true, message: '请输入手机号' }]"
                />

                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    import { Toast } from 'vant';
    export default {
        name: "RegisterDetail",
        components: {
            [Dialog.Component.name]: Dialog.Component,
        },
        data() {
            return {
                fileList: [

                ],
                umsUser:{
                    loginName: '',
                    rawPassword: '',
                    nickyName:'',
                    phone:'',
                    email:'',
                },
                confirmpassword:'',
                phonepattern: /^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/,
                loginNamePattern: /^[a-zA-Z0-9]{4,20}$/,
            };
        },
        methods: {
            testForm(){
                if (this.umsUser.rawPassword===this.confirmpassword){
                    const loginNameRe = new RegExp(this.loginNamePattern);
                    if (loginNameRe.test(this.umsUser.loginName)){
                        const phoneRe = new RegExp(this.phonepattern);
                        if(phoneRe.test(this.umsUser.phone)){
                            return true;
                        }else{
                            Toast('请输入正确的手机号');
                            return false;
                        }
                    }else{
                        Toast('用户名只能为4至20位的数字或大小写字母');
                        return false;
                    }
                }else {
                    Toast('密码和确认密码不匹配');
                    return false;
                }
            },
            onSubmit(values) {
                if (this.testForm()){
                    // console.log(this.fileList[0])
                    // console.log(this.umsUser);
                    const formData = new FormData();
                    for (let key in this.umsUser){
                        formData.append(key,this.umsUser[key]);
                    }
                    formData.append("file",this.fileList[0].file);
                    axios.post(this.common.baseUrl+"/ums-user/add",formData).then(response=>{
                        // console.log(response);
                        Toast(response.data.message)
                        if(response.data.code === 200){
                            this.$router.push({
                                path:'/login'
                            })
                        }
                    })
                }
                // console.log(this.fileList[0].file)
                // console.log(typeof this.fileList[0].file)
            },
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                // console.log(file);
            },
            quitregister(){
                Dialog.confirm({
                    title: '中止注册',
                    message: '您确定要中止注册吗',
                })
                    .then(() => {
                        this.$router.push({
                            path:'/login'
                        })
                    })
                    .catch(() => {

                    });
            }
        },
        created() {
            if (this.$route.query===""){
                Toast("未获取到邮箱，请重新输入")
                this.$router.push({
                    path:"/login"
                })
            }else{
                this.umsUser.email = this.$route.query.email;
            }

        }
    }
</script>

<style scoped lang="less">
    .registerDetail{
        padding: 10px;
        .register_top{
            /*background-color: pink;*/
            text-align: center;
            .left-arrow{
                position: absolute;
                left: 10px;
                top: 12px;
                width: 16px;
                height: 16px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .headimg{
            display: flex;
            flex-direction: row;
            margin-left: 16px;
            align-items: center;
            margin-top: 20px;
            .headTitle{
                color: #646566;
                margin-right: 66px;
            }
        }
    }
</style>