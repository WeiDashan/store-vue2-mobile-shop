<template>
    <div class="settingaddress">
        <div class="settingaddress_top">
            <div>
                <span v-if="currentState===0">地址管理</span>
                <span v-if="currentState===1">修改地址</span>
                <span v-if="currentState===2">新增地址</span>
            </div>
            <div class="left-arrow" @click="goback">
                <img src="../../../../image/leftarrow.png"  alt=""/>
            </div>
        </div>
        <div v-if="currentState===0">
            <van-address-list
                    v-model="chosenAddressId"
                    :list.sync="list"
                    default-tag-text="默认"
                    @add="onAdd"
                    @edit="onEdit"
                    @select="onSelect"
            />
        </div>
        <div v-if="currentState===1">
            <van-address-edit
                    :area-list="areaList"
                    show-delete
                    show-set-default
                    show-search-result
                    :address-info.sync="editAddress"
                    :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave"
                    @delete="onDelete"
            />
        </div>
        <div v-if="currentState===2">
            <van-address-edit
                    :area-list="areaList"
                    show-set-default
                    show-search-result
                    :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onAddAddress"
            />
        </div>
    </div>

</template>

<script>
    import { Toast } from 'vant';
    import area from '../../../../plugins/area'
    export default {
        name: "Manageaddress",
        data() {
            return {
                // 0表示地址管理，1表示修改地址，2表示新增地址
                currentState:0,
                currentEditIndex:-1,
                chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        areaCode: "140212",
                        address: '山西省大同市新荣区民主小区123',
                        province:'山西省',
                        city:'大同市',
                        county:'新荣区',
                        addressDetail:'民主小区123',
                        isDefault: 1,
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        areaCode: "140212",
                        address: '山西省大同市新荣区民主小区123',
                        province:'山西省',
                        city:'大同市',
                        county:'新荣区',
                        addressDetail:'民主小区123',
                        isDefault: 0,
                    },
                    {
                        id: '3',
                        name: '王五',
                        tel: '1320000000',
                        areaCode: "140212",
                        address: '山西省大同市新荣区民主小区123',
                        province:'山西省',
                        city:'大同市',
                        county:'新荣区',
                        addressDetail:'民主小区123',
                        isDefault: 0,
                    },
                ],
                editAddress:{},
                areaList:{},
                userId:105,
                query:{},
            };
        },
        created() {
            this.query = this.$route.query;
            this.areaList=area.AddressInfo;
            this.userId = this.$store.getters.GET_USERID;
            this.getAddressList();
        },
        methods: {
            getAddressList(){
                const that = this;
                axios.get(this.common.baseUrl+"/ums-address/list?userId="+this.userId).then(function (response) {
                    that.list=response.data.obj;
                    // console.log(that.list)
                    for (let i=0;i<that.list.length;i++){
                        if (that.list[i].isDefault===1){
                            let defaultAddress={};
                            defaultAddress.addressDetail = that.list[i].addressDetail;
                            defaultAddress.addressCity = that.list[i].province+that.list[i].city+that.list[i].county;
                            // console.log(defaultAddress)
                            that.$store.commit("SET_DEFAULTADDRESS",defaultAddress);
                            // console.log(that.$store.getters.GET_DEFAULTADDRESS)
                            break;
                        }
                    }
                })
            },
            onAdd() {
                this.currentState=2;
                Toast('新增地址');
            },
            onEdit(item, index) {
                this.currentState=1;
                this.editAddress=item;
                this.currentEditIndex=index;
            },
            goback(){
                if (this.currentState===0){
                    if(this.query==={}){
                        this.$router.go(-1)
                    }else{
                        this.$router.push({
                            path:"/paypage",
                            query: this.query,
                        })
                    }

                }else{
                    if (this.addAddress===1){
                        this.editAddress={}
                    }else{
                        this.addAddress={}
                    }
                    this.currentState=0;
                }
            },
            onSelect(item,index){
                // for (let i=0;i<this.list.length;i++){
                //     this.list[i].isDefault=0;
                // }
                // this.list[index].isDefault=1;
                //
                if (this.list[index].isDefault===0){
                    const formData = new FormData()
                    item.isDefault=1;
                    for (let key in item){
                        formData.append(key,item[key])
                        // console.log(key+":"+item[key])
                    }
                    formData.append("userId",this.userId);
                    axios.post(this.common.baseUrl+"/ums-address/update",formData).then(()=>{
                        Toast("修改地址成功")
                        this.getAddressList();
                        // this.currentState=0;
                    })
                    for (let i=0;i<this.list.length;i++){
                       this.list[i].isDefault=0;
                    }
                    this.list[index].isDefault=1;
                }

            },
            onSave(item) {
                item.address=item.province+item.city+item.county+item.addressDetail;
                if (item.isDefault){
                    item.isDefault=1;
                }else{
                    item.isDefault=0;
                }
                const formData = new FormData()
                for (let key in item){
                    formData.append(key,item[key])
                    console.log(key+":"+item[key])
                }
                formData.append("userId",this.userId);
                axios.post(this.common.baseUrl+"/ums-address/update",formData).then(()=>{
                    Toast("修改成功")
                    this.getAddressList();
                    this.currentState=0;
                })
                this.editAddress={};
            },
            onDelete(item) {
                const formData = new FormData();
                formData.append("id",item.id);
                // console.log(item.id);
                axios.post(this.common.baseUrl+"/ums-address/del",formData).then(()=>{
                    Toast("删除成功")
                    this.getAddressList();
                    this.currentState=0;
                })
            },
            onAddAddress(item){
                item.address=item.province+item.city+item.county+item.addressDetail;
                if (item.isDefault){
                    item.isDefault=1;
                }else{
                    item.isDefault=0;
                }
                const formData = new FormData()
                for (let key in item){
                    formData.append(key,item[key])
                    // console.log(key+":"+item[key])
                }
                formData.append("userId",this.userId);
                axios.post(this.common.baseUrl+"/ums-address/add",formData).then(()=>{
                    Toast("添加成功")
                    this.getAddressList();
                    this.currentState=0;
                })


            }
        },
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    .settingaddress{
        background-color: @maincolor;
        height: 100vh;
        .settingaddress_top{
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
    }
</style>