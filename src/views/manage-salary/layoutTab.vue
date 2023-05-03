<template>
    <div class="manage-profile manage-salary">
        <div class="title d-flex">Quản lý lương
            <radio-button
                class="m-l-16"
                v-model:value="tab"
                :items="ENUMS.RADIO_SALARY"
            >
            </radio-button>
        </div>
        <ManageSalary v-if="tab == 1"/>
        <ManageSalaryPeriod v-if="tab ==2"/>
    </div>
</template>

<script>
import radiobutton from '@/components/radiobutton.vue';
import ManageSalary from "@/views/manage-salary/salary/salary.vue"
import ManageSalaryPeriod from "@/views/manage-salary/salary-period/salary-period.vue"
import ENUMS from '@/enum/enums';
export default{
    name: "ManagePosition",
    components:{
        'radio-button': radiobutton,
        ManageSalary: ManageSalary,
        ManageSalaryPeriod: ManageSalaryPeriod
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
        this.tab = 1;
        this.ENUMS = ENUMS;
    },
    methods:{
        
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