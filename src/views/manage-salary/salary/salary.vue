<template>
    <Loading v-if="showLoading"/>
    <PopUpDelete v-if="showConfirmDelete" @action-cancel="cancelDelete" @action-done="deleteFromRow"/>
    <ToastMessage title="" :text="textMessage" :typeAlert="typeMessage" :max-width="300" v-if="showMessage"/>
    <div class="main-manage-profile m-t-12 p-b-12">
        <v-row class="filter-manage-profile justify-space-between">
            <v-col cols="4">
                <VueInput
                    placeholder="Tìm kiếm theo tên, mã nhân viên"
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
            keyTable="SalaryID"
            :totalRecord="totalRecord"
            :pagingControl="pagingControl"
            :dataApiTable="dataApiTable" 
            :headers="HEADERR_TABLE.MANAGE_SALARY" 
            :showPaging="true"
            :showSelect="false"
            :deleteRow="true"
            @delete="confirmDeleteFromRow"
            :showBorder="false"
            @edit="editFromRow"
            @page-change="pagingControlChange"
            :key="keyTable"
            :emptyTable="false"
            >
        </table-vue>
    </div>
    <AddAndEdit v-if="showAddAndEdit"
        @action-cancel="cancelAddAndEdit"
        @action-done="afterAddAndEdit"
        :mode="mode"
        :formEdit="formEdit"
    ></AddAndEdit>
</template>

<script>
import input from '@/components/input.vue';
import tableVue from '@/components/table.vue';
import ENUMS from '@/enum/enums';
import buttonVue from '@/components/button.vue';
import HEADERR_TABLE from '@/js/header-table.js';
import ManageSalary from "@/js/api/manageSalary.js";
import AddAndEdit from "@/views/manage-salary/salary/addAndEdit.vue"
export default {
    name: "ManageSalary",
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
            tab: 1
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
            var res = await ManageSalary.getPagingSalary(this.pagingControl);
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

        async editFromRow(val){
            var res = await ManageSalary.checkReferenceSalary(val);
            if(res && res.data.Success){
                if(res.data.Data == true){
                    this.formEdit = this.dataApiTable.find(x => x.SalaryID == val);
                    this.mode = ENUMS.ACTION_TYPE[0].value;
                    this.showAddAndEdit = true;
                }
                else{
                    this.textMessage = "Đã phát sinh lương không thể sửa!";
                    this.typeMessage = "warning";
                    this.showMessage = true;
                    setTimeout(async() => {
                        this.showMessage = false; 
                    }, 2000);
                }
            }
            else{
                this.textMessage = "Có lỗi xảy ra!";
                this.typeMessage = "error";
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false; 
                }, 2000);
            }
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
        async confirmDeleteFromRow(val){
            var res = await ManageSalary.checkReferenceSalary(val);
            if(res && res.data.Success){
                if(res.data.Data == true){
                    this.showConfirmDelete = true;
                    this.idDelete = val;
                }
                else{
                    this.textMessage = "Đã phát sinh lương không thể xoá!";
                    this.typeMessage = "warning";
                    this.showMessage = true;
                    setTimeout(async() => {
                        this.showMessage = false; 
                    }, 2000);
                }
            }
            else{
                this.textMessage = "Có lỗi xảy ra!";
                this.typeMessage = "error";
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false; 
                }, 2000);
            }
        },

        /**
         * Xoá dữ liệu
         */
         async deleteFromRow(){
            if(this.idDelete){
                var res = await ManageSalary.deleteSalary(this.idDelete);
                if(res && res.data.Success){
                    this.showConfirmDelete = false;
                    this.textMessage = "Xoá thành công";
                    this.typeMessage = "success";
                    this.showMessage = true;
                    this.idDelete = null;
                    setTimeout(async() => {
                        this.showMessage = false; 
                        await this.getDataPaging();
                    }, 2000);
                }
                else{
                    this.showConfirmDelete = false;
                    this.textMessage = "Có lỗi xảy ra?";
                    this.typeMessage = "error";
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false; 
                    }, 2000);
                }
            }
        },

        /**
         * huỷ xoá
         */
         cancelDelete(){
            this.showConfirmDelete = false;
            this.idDelete = null;
        },

        onListRowSelect(val){
            console.log("val", val);
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
.manage-salary{
    .v-radio-group{
        height: 30px;
        line-height: 30px;
    }
    .v-selection-control-group{
        flex-direction: row;
        font-size: 14px;
    }
    .v-label{
        font-size: 14px;
    }
}
.manage-profile{
    .table-container{
        height: calc(100% - 60px);
        .main-table{
            height: calc(100% - 45px);
        }
    }
}
</style>

