<template>
    <Loading v-if="showLoading"/>
    <PopUpDelete v-if="showConfirmDelete" @action-cancel="cancelDelete" @action-done="deleteFromRow"/>
    <ToastMessage title="" :text="textMessage" :typeAlert="typeMessage" :max-width="300" v-if="showMessage"/>
    <div class="personal-time-sheet">
        <div class="title">Danh sách chấm công</div>
        <div class="main-manage-profile m-t-12 p-b-12">
            <v-row class="filter-manage-profile justify-space-between">
                <v-col cols="12" class="d-flex p-0 justify-end">
                    <!-- <v-col > -->
                        <select-vue
                            class="m-r-16"
                            v-model:value="month"
                            :clearable="false"
                            :items="ENUMS.PICK_LIST_MONTH"
                            item-title="name"
                            item-value="value"
                            @value-change="monthChange"
                        ></select-vue>
                    <!-- </v-col>
                    <v-col > -->
                        <select-vue
                            v-model:value="year"
                            :clearable="false"
                            :items="ENUMS.PICK_LIST_YEAR"
                            item-title="name"
                            item-value="value"
                            @value-change="yearChange"
                        ></select-vue>
                    <!-- </v-col> -->
                </v-col>
                <!-- <v-col cols="4" class="text-right">
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
                </v-col> -->
            </v-row>
            <!-- class="table-manage-profile" -->
            <table-vue
                keyTable="TimeSheetsID"
                :totalRecord="totalRecord"
                :pagingControl="pagingControl"
                :dataApiTable="dataApiTable" 
                :headers="HEADERR_TABLE.MANAGE_TIMESHEETS" 
                :showPaging="false"
                :showBorder="false"
                :deleteRow="false"
                :editRow="false"
                :showSelect="false"
                :key="keyTable"
                :emptyTable="false"
                >
            </table-vue>
        </div>
    </div>
</template>

<script>

import tableVue from '@/components/table.vue';
import ENUMS from '@/enum/enums';
import HEADERR_TABLE from '@/js/header-table.js';
import PersonalTimeSheetsAPI from "@/js/api/personalTimeSheetsAPI.js";
import vueSelect from '@/components/selectbox.vue'
export default{
    name: "ManagePosition",
    components:{
        'table-vue': tableVue,
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
                    month: (new Date()).getMonth(),
                    year: (new Date()).getFullYear(),
                }
            },
            customFilter: {
                month: (new Date()).getMonth(),
                year: (new Date()).getFullYear(),
            },
            totalRecord: 0,
            keyTable: 0,
            mode: 1,
            month: (new Date()).getMonth(),
            year: (new Date()).getFullYear(),
            id: null
        }
    },
    async created(){
        this.ENUMS = ENUMS;
        this.HEADERR_TABLE = HEADERR_TABLE;
        if(this.$route.params?.id){
            this.id = this.$route.params?.id;
        }
        await this.getDataPaging();
    },
    methods:{
        /**
         * Lấy danh sách chấm công theo tháng
         */
        async getDataPaging(){
            this.showLoading = true;
            var res = await PersonalTimeSheetsAPI.getAllTimeSheets(this.id, this.customFilter);
            if(res && res.data.Success){
                this.dataApiTable = res.data.Data;
                this.keyTable ++;
            }
            setTimeout(() => {
                this.showLoading = false;
            }, 500);
        },

        async yearChange(value){
            var customFilter = {
                month: this.month,
                year: value
            };
            this.customFilter = customFilter;
            await this.getDataPaging();
        },
        async monthChange(value){
            var customFilter = {
                month: value,
                year: this.year
            };
            this.customFilter = customFilter;
            await this.getDataPaging();
        },
        
    }
}
</script>

<style lang="scss" scoped>
.personal-time-sheet{
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
.personal-time-sheet{
    .table-container{
        height: 100%;
        // height: calc(100% - 60px);
        .main-table{
            height: calc(100% - 45px);
        }
    }
}
</style>