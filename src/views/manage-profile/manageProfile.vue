<template>
    <Loading v-if="showLoading"/>
    <div class="manage-profile" v-if="!showAddAndEdit" ref="manage-profile">
        <div class="title">Quản lý hồ sơ nhân viên</div>
        <div class="main-manage-profile m-t-12 p-b-12">
            <v-row class="filter-manage-profile justify-space-between">
                <v-col cols="4">
                    <VueInput
                        placeholder="Tìm kiếm tên, mã nhân viên, MST"
                        :clearable="false"
                    />
                </v-col>
                <v-col cols="4" class="text-right">
                    <button-vue
                        text="Thêm mới"
                        color="#4095F5"
                        class="text-white"
                        @click="addProfile"
                    >
                        <template v-slot:prepend>
                            <i class="fa fa-plus" style="color: white" aria-hidden="true"></i>
                        </template>
                    </button-vue>
                </v-col>
            </v-row>
            <!-- class="table-manage-profile" -->
            <table-vue
                ref="table-manage-profile"
                keyTable="EmployeeID"
                :totalRecord="totalRecord"
                :pagingControl="ENUMS.PagingControl"
                :dataApiTable="dataApiTable" 
                :headers="HEADERR_TABLE.PROFILE_EMPLOYEE" 
                :showPaging="true"
                :showSelect="true"
                :showBorder="false"
                @dbClickRow="rowClick"
                @edit="editFromRow"
                :key="keyTable"
            >
            </table-vue>
        </div>
    </div>
    <AddAndEditProfile v-if="showAddAndEdit"/>
</template>

<script>
import input from '@/components/input.vue';
import tableVue from '@/components/table.vue';
import ENUMS from '@/enum/enums';
import buttonVue from '@/components/button.vue';
import HEADERR_TABLE from '@/js/header-table.js';
import AddAndEditProfile from '@/views/manage-profile/addProfileEmployee.vue'
import ProfileAPI from '@/js/api/profileAPI';
export default {
    name: "ManageProfile",
    components:{
        VueInput: input,
        'table-vue': tableVue,
        'button-vue': buttonVue,
        AddAndEditProfile: AddAndEditProfile
    }, 
    data(){
        return{
            headers: [
                {
                    value: "FullName",
                    name: "Họ và tên",
                    width: 400
                },
                {
                    value: "Gender",
                    name: "Giới tính",
                    width: 400
                }, 
                {
                    value: "DateOfBirth",
                    name: "Ngày sinh",
                    width: 400
                }, 
                {
                    value: "Ethnicity",
                    name: "Dân tộc", width: 400
                }, 
                {
                    value: "PhoneNumber",
                    name: "Số điện thoại liên hệ", width: 400
                }
            ],
            dataApiTable:[
                // {
                //     id: 1,
                //     EmployeeCode: "NV10078",
                //     FullName: "Khuất Quang Hoàng", 
                //     GenderID: "Nam",
                //     DateOfBirth: "24/01/2002",
                //     TaxCode: "4312432432",
                //     PhoneNumber: "0984868532",
                //     IdentifyNumber: "543543534"

                // }
            ], 
            pagingControl:{
                filter: null, 
                pageSize: 15,
                pageIndex: 1  
            },
            keyTable: 0,
            totalRecord: 0,
            showAddAndEdit: false,
            showLoading: false
        }
    },
    async created(){
        this.ENUMS = ENUMS;
        this.HEADERR_TABLE = HEADERR_TABLE;
        await this.getDataPaging();
    },
    methods:{
        addProfile(){
            this.$router.push({ name: 'AddProfileEmployee'});
        }, 
        rowClick(val){
            this.$router.push({ name: 'ViewProfileEmployee', params: { id: val }, query: {editMode : 2}});
        },
        editFromRow(val){
            this.$router.push({ name: 'ViewProfileEmployee', params: { id: val }, query: {editMode : 1}});
        },
        async getDataPaging(){
            this.showLoading = true;
            var res = await ProfileAPI.getPagingProfile(this.pagingControl);
            if(res && res.data.Success){
                this.totalRecord = res.data.Data.Total;
                this.dataApiTable = res.data.Data.PageData;
                this.keyTable ++;
            }
            setTimeout(() => {
                this.showLoading = false;
            }, 500);
        }
    }
}
</script>
<style lang="scss" scoped>
.manage-profile{
    height: 100%;
    overflow: hidden;
    .main-manage-profile{
        height: calc(100% - 42px);
        padding: 24px;
        width: 100%;
        border-radius: 4px;
        background-color: #ffffff;
        
    }
}
</style>
<style lang="scss">
.manage-profile{
    .table-container{
        height: calc(100% - 60px);
        .main-table{
            height: calc(100% - 45px);
        }
    }
}
</style>
