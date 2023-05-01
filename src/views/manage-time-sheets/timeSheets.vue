<template>
    <Loading v-if="showLoading"/>
    <time-sheets-add-edit v-if="showAddAndEdit"
        @action-cancel="cancelAddAndEdit"
        @action-done="afterAddAndEdit"
        :mode="mode"
        :formEdit="formEdit"
    ></time-sheets-add-edit>
    <PopUpDelete v-if="showConfirmDelete" @action-cancel="cancelDelete" @action-done="deleteFromRow"/>
    <ToastMessage title="" :text="textMessage" :typeAlert="typeMessage" :max-width="300" v-if="showMessage"/>
    <div class="manage-profile">
        <div class="title">Quản lý chấm công</div>
        <div class="main-manage-profile m-t-12 p-b-12">
            <v-row class="filter-manage-profile justify-space-between">
                <v-col cols="8" class="d-flex p-0">
                    <v-col cols="7">  
                        <VueInput
                            placeholder="Tìm kiếm theo tên, mã nhân viên"
                            :clearable="false"
                            v-model:value="keySearch"
                            @keydown.enter="search()"
                        />
                    </v-col>
                    <v-col cols="3"> 
                        <select-vue
                            v-model:value="month"
                            :clearable="false"
                            :items="ENUMS.PICK_LIST_MONTH"
                            item-title="value"
                            item-value="value"
                            @value-change="monthChange"
                        ></select-vue>
                    </v-col>
                    <v-col cols="3"> 
                        <select-vue
                            v-model:value="year"
                            :clearable="false"
                            :items="ENUMS.PICK_LIST_YEAR"
                            item-title="value"
                            item-value="value"
                            @value-change="yearChange"
                        ></select-vue>
                    </v-col>
                </v-col>
                <v-col cols="4" class="text-right">
                    <button-vue
                        text="Thêm mới"
                        color="#4095F5"
                        class="text-white"
                        @click="addTimeSheets"
                    >
                        <template v-slot:prepend>
                            <i class="fa fa-plus" style="color: white" aria-hidden="true"></i>
                        </template>
                    </button-vue>
                </v-col>
            </v-row>
            <!-- class="table-manage-profile" -->
            <table-vue
                keyTable="TimeSheetsID"
                :totalRecord="totalRecord"
                :pagingControl="pagingControl"
                :dataApiTable="dataApiTable" 
                :headers="HEADERR_TABLE.MANAGE_TIMESHEETS" 
                :showPaging="true"
                :showBorder="false"
                @edit="editFromRow"
                @delete="confirmDeleteFromRow"
                @page-change="pagingControlChange"
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
import TimeSheetsAPI from "@/js/api/timeSheetsAPI.js";
import TimeSheetsAddAndEdit from '@/views/manage-time-sheets/addAndEdit.vue';
import vueSelect from '@/components/selectbox.vue'
export default{
    name: "ManagePosition",
    components:{
        VueInput: input,
        'table-vue': tableVue,
        'button-vue': buttonVue,
        'time-sheets-add-edit': TimeSheetsAddAndEdit,
        'select-vue': vueSelect
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
                PageSize: 15,
                CustomFilter: {
                    month: (new Date()).getMonth() + 1,
                    year: (new Date()).getFullYear(),
                }
            },
            totalRecord: 0,
            keyTable: 0,
            mode: 1,
            formEdit: {},
            idDelete: null,
            month: (new Date()).getMonth() + 1,
            year: (new Date()).getFullYear(),
        }
    },
    async created(){
        this.ENUMS = ENUMS;
        this.HEADERR_TABLE = HEADERR_TABLE;
        await this.getDataPaging();
    },
    methods:{
        /**
         * Lấy danh sách chấm công theo tháng
         */
        async getDataPaging(){
            this.showLoading = true;
            var res = await TimeSheetsAPI.getPagingTimeSheets(this.pagingControl);
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

        async yearChange(value){
            var customFilter = {
                month: this.month,
                year: value
            };
            this.pagingControl.CustomFilter = customFilter;
            await this.getDataPaging();
        },
        async monthChange(value){
            console.log("úi", value);
            var customFilter = {
                month: value,
                year: this.year
            };
            this.pagingControl.CustomFilter = customFilter;
            await this.getDataPaging();
        },

        /**
         * hiển thị form thêm mới
         */
         addTimeSheets(){
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

        editFromRow(val){
            this.formEdit = this.dataApiTable.find(x => x.PositionID == val);
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
         * huỷ xoá
         */
        cancelDelete(){
            this.showConfirmDelete = false;
            this.idDelete = null;
        },

        /**
         * Xoá dữ liệu
         */
        async deleteFromRow(){
            if(this.idDelete){
                var res = await TimeSheetsAPI.deleteTimeSheets(this.idDelete);
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