<template>
    <div class="table-container">
        <v-table class="main-table">
            <thead>
                <tr >
                    <th style="width: 40px; padding: 0;">
                        <Checkbox 
                            v-model:valueCheckBox="isSelectAll"
                            @value-change="selectAllChange"
                            class="checkbox-custom"
                        />
                    </th>
                    <th v-for="item in headers" :key="item.value" :style="{'width': item.width + 'px'}" class="font-weight-bold text-center">
                        {{item.name}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in dataApiTable"
                    :key="item.value"
                >
                    <td style="padding: 0;">
                        <!-- <Checkbox v-model:valueCheckBox="itemSelected" :value="item.id" /> -->
                        <div class="v-check-box">
                            <v-checkbox
                                v-model="itemSelected"
                                color="secondary"
                                hide-details
                                :value="item.id"
                            ></v-checkbox>
                        </div>
                    </td>
                    <td v-for="header in headers" :key="header.value" class="text-center">{{ item[header.value] }}</td>
                </tr>
            </tbody>
        </v-table>

        <div class="table-page-number d-flex justify-space-between">
            <div class="page-number-sum">Tổng: <span class="font-weight-bold">{{ totalRecord }}</span> bản ghi</div>
            <div class="page-number-control d-flex">
                <Selectbox 
                    :value="pagingControl.PageSize" 
                    label="Chọn số bản ghi/trang" 
                    :items="ENUMS.TABLE_PAGE_SIZE"
                    @value-change="pageSizeChange"
                />
                <div class="page-number">
                    <div class="font-weight-bold">{{ recordStart }} -
                        {{ dataApiTable.length }} bản ghi
                    </div>
                </div>
                <div class="page-pre-next d-flex">
                    <div class="page-left" @click="pageLeftOnClick">
                        <i class="fa fa-chevron-left" :class="{ 'opacity-2' : recordStart <= 1}"  aria-hidden="true"></i>
                    </div>
                    <div class="page-left" @click="pageRightOnClick">
                      <i class="fa fa-chevron-right" :class="{ 'opacity-2' : dataApiTable.length == totalRecord}" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Selectbox from "@/components/selectbox.vue"
import Checkbox from "./checkbox.vue"
import ENUMS from "@/enum/enums.js"
export default {
    name: "Table-v1",
    components:{
        Selectbox, 
        Checkbox
    },
    props:{
        headers:{
            type: Array, 
            default: () => {}
        }, 
        dataApiTable:{
            type: Array, 
            default: () => {}
        },
        totalRecord: {
            type: Number,
            default: 0
        }, 
        pagingControl: {
            type: Object
        }
    },
    data(){
        return {
            recordStart: 0,
            itemSelected: [], 
            isSelectAll: false
        }
    },
    created() {
        this.ENUMS = ENUMS;
        this.recordStart = this.dataApiTable.length == 0 ? 0 : ((this.pagingControl.PageIndex - 1) * this.pagingControl.PageSize ) + 1;
    },
    methods:{
        // PageSize thay đổi
        pageSizeChange(val){
            let pagingClone = JSON.parse(JSON.stringify(this.pagingControl));
            pagingClone.PageSize = val;
            this.$emit('page-change', pagingClone);
        },
        pageLeftOnClick(){
            if(this.recordStart > 1){
                let pagingClone = JSON.parse(JSON.stringify(this.pagingControl));
                pagingClone.PageIndex -= 1;
                this.$emit('page-change', pagingClone);
            }
        },
        pageRightOnClick(){
            if(this.dataApiTable.length != this.totalRecord){
                let pagingClone = JSON.parse(JSON.stringify(this.pagingControl));
                pagingClone.PageIndex += 1;
                this.$emit('page-change', pagingClone);
            }
        },
        itemSelectChange(val, valueCheckBox){
            if(val){
                if(!this.itemSelected.includes(val))
                    this.itemSelected.push(val);
            } else{
                this.itemSelected = this.itemSelected.filter(x => x != valueCheckBox);
            }
        }, 
        selectAllChange(val){
            if(val){
                let itemNoneSeleted = this.dataApiTable.filter(x => !this.itemSelected.includes(x.id)).map(x => x.id);
                this.itemSelected.push(...itemNoneSeleted);
            }
            else{
                this.itemSelected = [];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table-container{
    .main-table{
        tbody{
            tr{
                td{
                    height: 48px !important;
                }
            }
            tr:hover{
                background-color: #e6fff2 !important;
            }
        }
    }
    .table-page-number{
        border-radius: 4px;
        margin-left: 10px;
        margin-right: 10px;
        padding: 5px 10px;
        background-color: #f5f5f0;
        .page-number-sum{
            line-height: 36px;
        }
        .page-number-control{
            .page-number{
                .font-weight-bold{
                    margin-left: 16px;
                    margin-right: 32px;
                    line-height: 36px;
                }
            }
            .page-pre-next {
                margin-top: 2px;
                .page-left{
                    cursor: pointer;
                    .fa{
                        padding: 10px;
                    }
                }
                .page-right{
                    cursor: pointer;
                    .fa{
                        padding: 10px;
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss">
.table-container{
    .h-select{
        width: 90px;
        background-color: #fff;
    }
    .v-check-box{
        .checkbox-custom{
            .mdi-minus-box{
                color: #6e6e6e;
            }
        }
    }
}
</style>