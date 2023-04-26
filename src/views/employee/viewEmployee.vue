<template>
    <Loading v-if="showLoading"/>
    <div class="employee" v-if="!editMode">
        <v-row class="employee-header-info justify-space-between d-flex align-center">
            <v-col >
                <v-row class="employee-name-and-code align-center">
                    <div class="employee-name">
                        Khuất Quang Hoàng
                    </div>
                    <div class="employee-code">
                        (B-1065)
                    </div>
                    <i class="fa fa-check d-flex align-center justify-center" aria-hidden="true"></i>
                </v-row>
                <v-row>
                    <span>Lập trình viên - Dự án Ivan</span>
                </v-row>
            </v-col>
            <v-col class="text-right">
                <Button
                    text="Cập nhật thông tin"
                    color="#E8EAEF"
                    @click="handelShowEdit"
                >
                    <template v-slot:prepend>
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </template>
                </Button>
            </v-col>
        </v-row>
        <v-row class="row-employee-main-info">
            <div class="employee-main-info">
                <span class="title">
                    Thông tin cơ bản
                </span>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        Thông tin chung
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Mã nhân viên</v-col>
                        <v-col cols="7" class="employee-info">B-1065</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">MST cá nhân</v-col>
                        <v-col cols="7" class="employee-info">8763485621</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Họ và tên</v-col>
                        <v-col cols="7" class="employee-info">Khuất Quang Hoàng</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Dân tộc</v-col>
                        <v-col cols="7" class="employee-info">Kinh</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Ngày sinh</v-col>
                        <v-col cols="7" class="employee-info">24/01/2001</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Giới tính</v-col>
                        <v-col cols="7" class="employee-info">Nam</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        CMND/Thẻ căn cước
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Loại giấy tờ</v-col>
                        <v-col cols="7" class="employee-info">CCCD</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Ngày cấp (CMND/CCCD)</v-col>
                        <v-col cols="7" class="employee-info">13/11/2021</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Số CMND/CCCD</v-col>
                        <v-col cols="7" class="employee-info">001201029364</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Nơi cấp (CMND/CCCD)</v-col>
                        <v-col cols="7" class="employee-info">Cục Cảnh sát quản lý hành chính về trật tự xã hội</v-col>
                    </v-col>
                </div>

                <div class="title m-t-60">
                    Thông tin liên hệ
                </div>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        Số điện thoại/Email
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">ĐT di động
                    </v-col>
                        <v-col cols="7" class="employee-info">0984868532</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Email cá nhân</v-col>
                        <v-col cols="7" class="employee-info">quanghoang8532@gmail.com</v-col>
                    </v-col>
                </div>

                <div class="v-row m-t-24">
                    <span class="text-child">
                        Địa chỉ
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Quốc gia</v-col>
                        <v-col cols="7" class="employee-info">Việt Nam</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Phường/Xã</v-col>
                        <v-col cols="7" class="employee-info">Xã Thạch Hòa</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Tỉnh/Thành phố</v-col>
                        <v-col cols="7" class="employee-info">Hà Nội</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Số nhà, đường phố</v-col>
                        <v-col cols="7" class="employee-info">Thôn 4</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Quận/Huyện</v-col>
                        <v-col cols="7" class="employee-info">Huyện Thạch Thất</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Địa chỉ</v-col>
                        <v-col cols="7" class="employee-info">Thôn 4,Xã Thạch Hòa, Huyện Thạch Thất, Hà Nội, Việt Nam</v-col>
                    </v-col>
                </div>

                <div class="title m-t-60">
                    Thông tin công việc
                </div>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        Thông tin nhân viên
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Đơn vị công tác</v-col>
                        <v-col cols="7" class="employee-info">Dự án iVAN</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Địa điểm làm việc</v-col>
                        <v-col cols="7" class="employee-info">Tòa N03-T1, Khu Ngoại Giao đoàn, Phường Xuân Tảo, Quận Bắc Từ Liêm, Hà Nội (Tầng lửng, 2, 4)</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Vị trí công việc</v-col>
                        <v-col cols="7" class="employee-info">Lập trình viên</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Loại hợp đồng</v-col>
                        <v-col cols="7" class="employee-info">Hợp đồng xác định thời hạn</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Vị trí công việc</v-col>
                        <v-col cols="7" class="employee-info">Lập trình viên</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Quản lý trực tiếp</v-col>
                        <v-col cols="7" class="employee-info">Hợp đồng xác định thời hạn</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Lương cơ bản</v-col>
                        <v-col cols="7" class="employee-info">5.050.000 VND</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Lương đóng BH</v-col>
                        <v-col cols="7" class="employee-info">5.050.000 VND</v-col>
                    </v-col>
                </div>

                <div class="title m-t-60 m-b-24">
                    Thông tin gia đình
                </div>
                <Table :dataApiTable="dataApiTable" :headers="headers" :showPaging="false"
                    :showSelect="false" :editRow="false" :deleteRow="false" :showBorder="true"
                />

                <div class="title m-t-60 m-b-24">
                    Hợp đồng lao động
                </div>
                <Table :dataApiTable="dataApiTable" :headers="headers" :showPaging="false"
                    :showSelect="false" :editRow="false" :deleteRow="false" :showBorder="true"
                />

                <div class="title m-t-60 m-b-24">
                    Lịch sử lương
                </div>
                <Table :dataApiTable="dataApiTable" :headers="headers" :showPaging="false"
                    :showSelect="false" :editRow="false" :deleteRow="false" :showBorder="true"
                />
            </div> 
        </v-row>  
    </div>
    <EditEmployee v-if="editMode" @cancelEdit="this.editMode = $event"/>
</template>

<script>
import button from '@/components/button.vue';
import table from "@/components/table.vue";
import EmployeeEdit from "@/views/employee/editEmployee.vue";
import ENUMS from "@/enum/enums.js"
// import loading from "@/components/loading.vue"
export default{
    name: "ViewEmployee",
    components:{
        Button: button, 
        Table: table, 
        EditEmployee: EmployeeEdit,
        // Loading: loading
    }, 
    data(){
        return{
            a: "úi",
            editMode: null,
            showLoading: false,
            headers: [
                {
                    value: "FullName",
                    name: "Họ và tên"
                },
                {
                    value: "Gender",
                    name: "Giới tính"
                }, 
                {
                    value: "DateOfBirth",
                    name: "Ngày sinh"
                }, 
                {
                    value: "Ethnicity",
                    name: "Dân tộc"
                }, 
                {
                    value: "PhoneNumber",
                    name: "Số điện thoại liên hệ"
                }
            ],
            dataApiTable:[
                {
                    id: 1,
                    FullName: "Khuất Quang Hoàng", 
                    Gender: "Nam",
                    DateOfBirth: "24/01/2002",
                    Ethnicity: "Kinh",
                    PhoneNumber: "0984868532"
                }
            ]
        }
    },
    created(){
        this.showLoading = true;
        this.ENUMS = ENUMS;
        var query = this.$route.query;
        if(query && query?.editmode == ENUMS.ACTION_TYPE[0].value){
            this.editMode = true;
        }
        else{
            this.editMode = false;
        }
        setTimeout(() => {
            this.showLoading = false;
        }, 500);
    },
    methods:{
        handelShowEdit(){
            this.editMode = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.employee{
    height: 100%;
    overflow: hidden;
    .employee-header-info{
        background-color: #ffffff;
        border-radius: 8px;
        height: 75px;
        overflow: hidden;
        .employee-name-and-code{
            .employee-name{
                font-size: 20px;
            }
            .employee-code{
                margin-left: 6px;
                margin-right: 6px;
                font-size: 20px;
            }
            .fa{
                width: 24px;
                height: 24px;
                background-color: #17A562;
                border-radius: 50%;
            }
        }
    }
    .row-employee-main-info{
            width: 100%;
            height: calc(100% - 75px);
            overflow: auto;
            border-radius: 4px;
            margin-top: 12px !important;
        .employee-main-info{
            padding: 24px;
            width: 100%;
            border-radius: 4px;
            background-color: #ffffff;
        }
    }
}
</style>
