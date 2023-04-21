<template>
    <div class="employee">
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
                <div class="v-row">

                </div>
            </div> 
        </v-row>    
    </div>
</template>

<script>
import button from '@/components/button.vue';
export default{
    name: "ViewEmployee",
    components:{
        Button: button
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
