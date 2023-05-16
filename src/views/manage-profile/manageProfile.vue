<template>
    <Loading v-if="showLoading"/>
    <PopUpDelete v-if="showConfirmDelete" content="Bạn có chắc chắn muốn xoá nhân viên đã chọn?" @action-cancel="cancelDelete" @action-done="deleteFromRow"/>
    <ToastMessage title="" :text="textMessage" :typeAlert="typeMessage" :max-width="300" v-if="showMessage"/>
    <div class="manage-profile" v-if="!showAddAndEdit" ref="manage-profile">
        <div class="title">Quản lý hồ sơ nhân viên</div>
        <div class="main-manage-profile m-t-12 p-b-12">
            <v-row class="filter-manage-profile justify-space-between">
                <v-col cols="4">
                    <VueInput
                        placeholder="Tìm kiếm tên, mã nhân viên, MST"
                        :clearable="false"
                        v-model:value="keySearch"
                        @keydown.enter="search()"
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
                :pagingControl="pagingControl"
                :dataApiTable="dataApiTable" 
                :headers="HEADERR_TABLE.PROFILE_EMPLOYEE" 
                :showPaging="true"
                :showSelect="true"
                :showBorder="false"
                @dbClickRow="rowClick"
                @edit="editFromRow"
                @delete="confirmDeleteFromRow"
                @page-change="pagingControlChange"
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
            ], 
            pagingControl:{
                filter: null, 
                PageSize: 15,
                PageIndex: 1  
            },
            keyTable: 0,
            totalRecord: 0,
            showAddAndEdit: false,
            showLoading: false, 
            showMessage: false,
            textMessage: null,
            typeMessage: null,
            keySearch: null,
            showConfirmDelete: false,
            idDelete: null
        }
    },
    async created(){
        this.ENUMS = ENUMS;
        this.HEADERR_TABLE = HEADERR_TABLE;
        await this.getDataPaging();
    },
    watch:{
        // keySearch(val){
        //     setTimeout(async () => {
        //         this.pagingControl.filter = val;
        //         await this.getDataPaging();
        //     }, 1000);
        // }
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
        },
        confirmDeleteFromRow(val){
            this.showConfirmDelete = true;
            this.idDelete = val
        },
        /**
         * Xoá
         */
         async deleteFromRow(){
            this.showConfirmDelete = false;
            if(this.idDelete){
                var res = await ProfileAPI.getDeleteByID(this.idDelete);
                if(res && res.data.Success){
                    this.textMessage = "Xoá thành công";
                    this.typeMessage = "success";
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false; 
                    }, 2000);
                    this.idDelete = null;
                    await this.getDataPaging();
                }
                else {
                    this.textMessage = "Xoá Thất bại";
                    this.typeMessage = "error";
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false; 
                    }, 2000);
                    this.idDelete = null;
                }
            }
         },
         cancelDelete(){
            this.idDelete = null;
            this.showConfirmDelete = false;
         },

         /**
          * Thay đổi pagingControl
          */
          async pagingControlChange(val){
            this.pagingControl.PageIndex = val.PageIndex;
            this.pagingControl.PageSize = val.PageSize;
            await this.getDataPaging();
          },
          async search(){
            this.pagingControl.filter = this.keySearch;
            await this.getDataPaging();
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
