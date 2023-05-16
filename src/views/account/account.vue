<template>
    <Loading v-if="showLoading"/>
    <PopUpDelete v-if="showConfirmDelete" content="Bạn có chắn chắn muốn xoá tài khoản này?"
        @action-cancel="cancelDelete" @action-done="deleteFromRow"
    />
    <account-add-edit v-if="showAddAndEdit"
        @action-cancel="cancelAddAndEdit"
        @action-done="afterAddAndEdit"
        :mode="mode"
        :formEdit="formEdit"
    ></account-add-edit>
    <ToastMessage title="" :text="textMessage" :typeAlert="typeMessage" :max-width="300" v-if="showMessage"/>
    <div class="manage-profile">
        <div class="title">Quản lý tài khoản</div>
        <div class="main-manage-profile m-t-12 p-b-12">
            <v-row class="filter-manage-profile justify-space-between">
                <v-col cols="4">
                    <VueInput
                        placeholder="Tìm kiếm theo tên nhân viên, email"
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
                :headers="HEADERR_TABLE.ACCOUNT" 
                :showPaging="true"
                :showSelect="true"
                :showBorder="false"
                @edit="editFromRow"
                @page-change="pagingControlChange"
                @page-size-change="pageSizeChange"
                @delete="confirmDeleteFromRow"
                :key="keyTable"
                :emptyTable="false"
                >
            </table-vue>
        </div>
    </div>
</template>

<script>

import input from '@/components/input.vue';
import tableVue from '@/components/table.vue';
import ENUMS from '@/enum/enums';
import buttonVue from '@/components/button.vue';
import HEADERR_TABLE from '@/js/header-table.js';
import AccountAPI from "@/js/api/accountAPI.js";
import AccountAddAndEdit from '@/views/account/addAndEdit.vue';
export default{
    name: "ManageDepartment",
    components:{
        VueInput: input,
        'table-vue': tableVue,
        'button-vue': buttonVue,
        'account-add-edit': AccountAddAndEdit
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
            idDelete: null
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
            var res = await AccountAPI.getPagingAccount(this.pagingControl);
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

        /**
         * Sau khi thêm mới hoặc chỉnh sửa
         */
        async afterAddAndEdit(val){
            this.showAddAndEdit = false;
            if(val == true){
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
            else if(val?.IsExsits == true)
            {
                this.textMessage = "Nhân viên đã có tài khoản";
                this.typeMessage = "warning";
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false; 
                }, 2000);
            }
            else
            {
                this.textMessage = "Có lỗi xảy ra!";
                this.typeMessage = "error";
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false; 
                }, 2000);
            }
        },

        editFromRow(val){
            this.formEdit = this.dataApiTable.find(x => x.AccountID == val);
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

        async pageSizeChange(val){
            this.pagingControl.PageIndex = 1;
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
                var res = await AccountAPI.deleteAccount(this.idDelete);
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
                    this.textMessage = "Có lỗi xảy ra";
                    this.typeMessage = "error";
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false; 
                    }, 2000);
                    this.idDelete = null;
                }
            }
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