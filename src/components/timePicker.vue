<template>
    <div class="main-date-picker d-flex">
        <div class="label-date-picker" v-if="label">
            {{ label }}
            <span v-if="force" style="color: red"> *</span>
        </div>
        <v-col>
            <!-- auto-apply  -->

            <VueDatePicker 
                class="date-picker"
                :class="{'date-picker-error': isError && force}"
                v-model="date"
                :clearable="true"
                time-picker
                :placeholder="placeholder"
                @update:model-value="valueChange"
            ></VueDatePicker>
            <div v-if="isError && force" class="error-message">
                {{ errorMessage }}
            </div>
        </v-col>
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    name: "DatePicker", 
    components:{
        VueDatePicker
    },
    props:{
        label:{
            type: String,
            default: ""
        },
        force:{
          type: Boolean, 
          default: false
        }, 
        error:{
          type: Boolean, 
          default: false
        }, 
        errorMessage:{
          type: String, 
          default: ""
        }, 
        value:{
            type: String
        }, 
        placeholder:{
            type: String
        }, 
        format:{
            type: String, 
            default: "dd/MM/yyyy"
        }
    },
    data(){
        return{
            isError: false,
            date: null,
        }
    },
    created(){
        // if(this.value){
        //     var arr = this.value.split("/");
        //     var dateConvert = `${arr[1]}/${arr[0]}/${arr[2]}`;
        //     this.date = new Date(dateConvert);
        // }
        if(this.error){
            this.isError = true;
        }
    }, 
    methods:{
        valueChange(val){
            console.log(val);
            if(val){
                if(this.force){
                    this.isError = false;
                    this.$emit("update:error", this.isError);
                }
            } else {
                if(this.force){
                    this.isError = true;
                    this.$emit("update:error", this.isError);
                }
            }
                // this.$emit('update:value', dateEmit)
        }
    },
    computed:{
       
    }
}
</script>
<style lang="scss">
.main-date-picker{
    .label-date-picker{
      line-height: 36px;
      margin-right: 12px;
    }
    .date-picker{
        .dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg{
            border: 1px solid #e0e5e9;
        }
        &:hover{
            .dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg{
                border-color: #0073e6;
            }
        }
        &:active{
            .dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg{
                border-color: #0073e6;
            }
        }

    }
    .date-picker-error.date-picker{
        .dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg{
            border: 1px solid red;
        }
    }
    .v-col{
      padding: 0;
      .error-message{
        color: red;
        padding-top: 5px;
        padding-bottom: 10px;
      }
    }
  }
</style>
