<template>
    <Loading v-if="showLoading"/>
    <PopUpDelete v-if="showConfirmDelete" content="Bạn có chắn chắn muốn xoá quyền này?"
        @action-cancel="cancelDelete" @action-done="deleteFromRow"
    />
    <ToastMessage title="" :text="textMessage" :typeAlert="typeMessage" :max-width="300" v-if="showMessage"/>
    <div class="manage-profile">
        <div class="title">Phân quyền truy cập</div>
        <div class="main-manage-profile m-t-12 p-b-12">
            <v-row class="filter-manage-profile justify-space-between">
                <v-col cols="4">
                    <VueInput
                        placeholder="Tìm kiếm theo mã, tên nhân viên"
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
                        @click="addDepartment"
                    >
                        <template v-slot:prepend>
                            <i class="fa fa-plus" style="color: white" aria-hidden="true"></i>
                        </template>
                    </button-vue>
                </v-col>
            </v-row>
            <!-- class="table-manage-profile" -->
            <table-vue
                keyTable="AccountID"
                :totalRecord="totalRecord"
                :pagingControl="pagingControl"
                :dataApiTable="dataApiTable" 
                :headers="HEADERR_TABLE.PERMISSION" 
                :showPaging="true"
                :showSelect="true"
                :showBorder="false"
                @edit="editFromRow"
                @page-change="pagingControlChange"
                @delete="confirmDeleteFromRow"
                :key="keyTable"
                :emptyTable="false"
                >
            </table-vue>
        </div>
    </div>
    <AddAndEdit v-if="showAddAndEdit"
        @action-cancel="cancelAddAndEdit"
        @action-done="afterAddAndEdit"
        @data-exist="dataExist"
        :mode="mode"
        :formEdit="formEdit"
        :accountID="AccountID"
    ></AddAndEdit>
</template>

<script>

import input from '@/components/input.vue';
import tableVue from '@/components/table.vue';
import ENUMS from '@/enum/enums';
import buttonVue from '@/components/button.vue';
import HEADERR_TABLE from '@/js/header-table.js';
import PermissionAPI from "@/js/api/permissionAPI.js";
import AddAndEdit from "@/views/permission/addAndEdit.vue"
export default{
    name: "ManageContract",
    components:{
        VueInput: input,
        'table-vue': tableVue,
        'button-vue': buttonVue,
        AddAndEdit: AddAndEdit
    }, 
    data(){
        return {
            showLoading: false,
            showConfirmDelete: false,
            showAddAndEdit: false,
            showMessage : false,
            keySearch: null,
            dataApiTable:[], 
            pagingControl:{
                filter: null, 
                PageIndex: 1,
                PageSize: 15 
            },
            totalRecord: 0,
            keyTable: 0,
            mode: 1,
            formEdit: {},
            idDelete: null, 
            AccountID: null
        }
    },
    async created(){
        this.ENUMS = ENUMS;
        this.HEADERR_TABLE = HEADERR_TABLE;
        await this.getDataPaging();
    },
    methods:{
        /**
         * Lấy danh sách phòng ban
         */
        async getDataPaging(){
            this.showLoading = true;
            var res = await PermissionAPI.getPagingContract(this.pagingControl);
            if(res && res.data.Success){
                this.totalRecord = res.data.Data.Total;
                this.dataApiTable = res.data.Data.PageData;
                this.keyTable ++;
            }
            setTimeout(() => {
                this.showLoading = false;
            }, 500);
        },
        async search(){
            this.pagingControl.filter = this.keySearch;
            await this.getDataPaging();
        },

        /**
         * hiển thị form thêm mới
         */
         addDepartment(){
            this.mode = ENUMS.ACTION_TYPE[2].value;
            this.showAddAndEdit = true;
        },

        /**
         * Đóng form thêm mới
         */
        cancelAddAndEdit(){
            this.showAddAndEdit = false;
        },


        async editFromRow(val){
            var res = await PermissionAPI.getPermissionByAccountID(val);
            if(res && res.data.Success){
                var formData = {
                    ManageSalary: false,
                    ManagePosition: false, 
                    ManageDepartment: false, 
                    ManageProfile: false, 
                    ManageContract: false, 
                    ManageTimeSheets: false
                };
                //1 ManageSalary
                // 2 ManagePosition
                // 3 ManageDepartment
                // 4 ManageProfile
                // 5 ManageContract
                // 6 ManageTimeSheets
                res.data.Data.forEach(element => {
                    if(element.PermissionID == 1){
                        formData.ManageSalary = true;
                    }
                    if(element.PermissionID == 2){
                        formData.ManagePosition = true;
                    }
                    if(element.PermissionID == 3){
                        formData.ManageDepartment = true;
                    }
                    if(element.PermissionID == 4){
                        formData.ManageProfile = true;
                    }
                    if(element.PermissionID == 5){
                        formData.ManageContract = true;
                    }
                    if(element.PermissionID == 6){
                        formData.ManageTimeSheets = true;
                    }
                });
                formData = JSON.parse(JSON.stringify(formData));
                this.formEdit = formData;
            }
            this.AccountID = val;
            this.mode = ENUMS.ACTION_TYPE[0].value;
            this.showAddAndEdit = true;
        },

         /**
         * Thay đổi pagingControl
         */
        async pagingControlChange(val){
            this.pagingControl.PageIndex = val.PageIndex;
            this.pagingControl.PageSize = val.PageSize;
            this.pagingControl = JSON.parse(JSON.stringify(this.pagingControl));
            await this.getDataPaging();
        },
        
        /**
         * hiển thị form xoá
         */
        confirmDeleteFromRow(val){
            this.showConfirmDelete = true;
            this.idDelete = val;
        },
        
        /**
         * Huỷ xoá
         */
        cancelDelete(){
            this.showConfirmDelete = false;
            this.idDelete = null;
        },

        /**
         * Xoá phòng ban
         */
        async deleteFromRow(){
            this.showConfirmDelete = false;
            if(this.idDelete){
                var res = await PermissionAPI.deletePermission(this.idDelete);
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
            }
            else{
                this.textMessage = "Có lỗi xảy ra";
                    this.typeMessage = "error";
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false; 
                    }, 2000);
                    this.idDelete = null;
            }
        },
        async afterAddAndEdit(val){
            this.showAddAndEdit = false;
            if(val){
                if(this.mode == ENUMS.ACTION_TYPE[0].value){
                    this.textMessage = "Chỉnh sửa thành công";
                }
                else {
                    this.textMessage = "Thêm mới thành công";
                }
                this.typeMessage = "success";
                this.showMessage = true;
                setTimeout(async() => {
                    this.showMessage = false; 
                    await this.getDataPaging();
                }, 2000);
            }
            else{
                this.textMessage = "Có lỗi xảy ra?";
                this.typeMessage = "error";
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false; 
                }, 2000);
            }
        },
        dataExist(val){
            this.showAddAndEdit = false;
            if(val){
                this.textMessage = "Đã tồn tại quyền của nhân viên!";
                this.typeMessage = "warning";
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false; 
                }, 2000);
            }
        },
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