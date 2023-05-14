<template>
    <Loading v-if="showLoading"/>
    <div class="manage-profile manage-salary">
        <v-row>
            <v-col class="title p-0">Phiếu lương
                
            </v-col>
            <v-col class="d-flex p-0 justify-end">
                <!-- <v-col > -->
                    <button-vue
                        v-if="hasData"
                        text="Xuất khẩu"
                        color="#4095F5"
                        class="text-white"
                        @click="exportSalary"
                    >
                        <template v-slot:prepend>
                            <i class="fa fa-download" style="color: white" aria-hidden="true"></i>
                        </template>
                    </button-vue>
                    <select-vue
                        class="m-r-16 m-l-16 bg-white"
                        v-model:value="customFilter.month"
                        :clearable="false"
                        :items="ENUMS.PICK_LIST_MONTH"
                        item-title="name"
                        item-value="value"
                        @value-change="monthChange"
                    ></select-vue>
                <!-- </v-col>
                <v-col > -->
                    <select-vue
                        class="bg-white"
                        v-model:value="customFilter.year"
                        :clearable="false"
                        :items="ENUMS.PICK_LIST_YEAR"
                        item-title="name"
                        item-value="value"
                        @value-change="yearChange"
                    ></select-vue>

                <!-- </v-col> -->
            </v-col>
        </v-row>
        
        <div class="main-manage-profile m-t-12 p-b-12" v-if="hasData">
            <div class="v-row m-t-8 m-b-24">
                <v-col class="label-info d-flex align-center m-r-60" cols="5">
                    <v-col cols="12" class="label title-custom">Thông tin lương</v-col>
                </v-col>
                <v-col class="label-info d-flex align-center" cols="5">
                    <v-col cols="12" class="label title-custom">Thông tin khác</v-col>
                </v-col>
            </div>
            <div class="v-row m-t-8 m-b-24">
                <v-col class="label-info d-flex align-center m-r-60" cols="5">
                    <v-col cols="5" class="label">Lương cơ bản</v-col>
                    <v-col cols="7" class="label font-bold">{{ formatMoney(this.salary.BasicPay) }} đ</v-col>
                </v-col>
                <v-col class="label-info d-flex align-center" cols="5">
                    <v-col cols="8" class="label">Tổng công hưởng lương</v-col>
                    <v-col cols="4" class="label font-bold">{{ this.salaryPeriod.TotalWorkDay }}</v-col>
                </v-col>
            </div>
            <div class="v-row m-t-8 m-b-24">
                <v-col class="label-info d-flex align-center m-r-60" cols="5">
                    <v-col cols="5" class="label">BHXH</v-col>
                    <v-col cols="7" class="label font-bold">{{ formatMoney(this.salary.SocialInsurance) }} đ</v-col>
                </v-col>
                <v-col class="label-info d-flex align-center" cols="5">
                    <v-col cols="8" class="label">Tổng công tăng ca</v-col>
                    <v-col cols="4" class="label font-bold">{{ this.timeSheets.OverTime }}</v-col>
                </v-col>
            </div>
            <div class="v-row m-t-8 m-b-24">
                <v-col class="label-info d-flex align-center m-r-60" cols="5">
                    <v-col cols="5" class="label">Thuế</v-col>
                    <v-col cols="7" class="label font-bold">{{ formatMoney(this.salary.TaxMoney) }} đ</v-col>
                </v-col>
                <v-col class="label-info d-flex align-center" cols="5">
                    <v-col cols="8" class="label">Số ngày đi muộn/ về sớm</v-col>
                    <v-col cols="4" class="label font-bold">{{ this.timeSheets.DateLate }}</v-col>
                </v-col>
            </div>

            <div class="v-row m-t-8 m-b-24">
                <v-col class="label-info d-flex align-center m-r-60" cols="5">
                    <v-col cols="12" class="label title-custom">Thông chi trả lương</v-col>
                </v-col>
            </div>
            <div class="v-row m-t-8 m-b-24">
                <v-col class="label-info d-flex align-center m-r-60" cols="5">
                    <v-col cols="5" class="label">Tổng thu nhập (1)</v-col>
                    <v-col cols="7" class="label font-bold">{{ formatMoney(this.salary.TaxMoney + this.salary.SocialInsurance + this.salaryPeriod.TotalReceive) }} đ</v-col>
                </v-col>
                <v-col class="label-info d-flex align-center" cols="5">
                    <v-col cols="5" class="label">Tiền thưởng</v-col>
                    <v-col cols="7" class="label font-bold">{{ formatMoney(this.salaryPeriod.Bonus) }} đ</v-col>
                </v-col>
            </div>
            <div class="v-row m-t-8 m-b-24">
                <v-col class="label-info d-flex align-center m-r-60" cols="5">
                    <v-col cols="5" class="label">Khấu trừ (2)</v-col>
                    <v-col cols="7" class="label font-bold">{{ formatMoney(this.salary.TaxMoney + this.salary.SocialInsurance) }} đ</v-col>
                </v-col>
                <v-col class="label-info d-flex align-center" cols="5">
                    <v-col cols="5" class="label">Tiền phạt (3)</v-col>
                    <v-col cols="7" class="label font-bold">{{ formatMoney(20000 * this.timeSheets.DateLate) }} đ</v-col>
                </v-col>
            </div>
            <div class="v-row m-t-8 m-b-24">
                <v-col class="label-info d-flex align-center m-r-60" cols="7">
                    <v-col cols="5" class="label">Thực lĩnh (4) = (1) - (2) - (3)</v-col>
                    <v-col cols="5" class="label title-custom" style="color: #11aa7a;">{{ formatMoney(this.salaryPeriod.TotalReceive) }} đ</v-col>
                </v-col>
            </div>
        </div>
        <div class="main-manage-profile m-t-12 p-b-12 d-flex align-center" v-if="!hasData">
            <div class="title-custom" style="text-align: center; width: 100%;">
                Không có dữ liệu
            </div>
        </div>
    </div>
</template>

<script>

import ENUMS from '@/enum/enums';
import vueSelect from '@/components/selectbox.vue';
import SalaryAPI from "@/js/api/salaryAPI.js";
import Convert from "@/js/format.js"
import buttonVue from '@/components/button.vue';
export default{
    name: "ManagePosition",
    components:{
        'select-vue': vueSelect,
        'button-vue': buttonVue,
    }, 
    data(){
        return {
            showLoading: false,
            mode: 1,
            formData: {},
            idDelete: null,
            customFilter:{
                month: (new Date()).getMonth() + 1,
                year: (new Date()).getFullYear(),
            },
            id: null,
            salary: {},
            salaryPeriod: {},
            timeSheets: {},
            hasData: true
        }
    },
    async created(){
        this.tab = 1;
        this.ENUMS = ENUMS;
        if(this.$route.params.id){
            this.id = this.$route.params.id;
        }
        await this.getPeriodSalaryEmployee();
    },
    methods:{
        async getPeriodSalaryEmployee(){
            this.showLoading = true;
            var res = await SalaryAPI.getForPersonal(this.id, this.customFilter);
             if(res && res.data.Success){
                this.formData = res.data.Data;
                this.salary = this.formData.Salary;
                this.salaryPeriod = this.formData.SalaryPeriod;
                if(this.salaryPeriod == null){
                    this.hasData = false;
                }
                else{
                    this.hasData = true;
                }
                this.timeSheets = this.formData.TimeSheets;
             }
             setTimeout(() => {
                this.showLoading = false;
             }, 1000);
        },
        async yearChange(value){
            var customFilter = {
                month: this.customFilter.month,
                year: value
            };
            this.customFilter = customFilter;
            await this.getPeriodSalaryEmployee();
        },
        async monthChange(value){
            var customFilter = {
                month: value,
                year: this.customFilter.year,
            };
            this.customFilter = customFilter;
            await this.getPeriodSalaryEmployee();
        },
        formatMoney(value){
            if(value){
                var value1 = value;
                var valueString = value1?.toString();
                return Convert.formatCash2(valueString);
            }
            return 0;
        },
        exportSalary(){
            window.open(SalaryAPI.export(this.id, this.customFilter));
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
        overflow: auto;
        
        .title-custom{
            font-size: 17px;
            font-weight: 700;
        }
        .font-bold{
            font-weight: 500;
        }
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