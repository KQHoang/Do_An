<template>
    <div class="main-date-picker d-flex">
        <div class="label-date-picker" v-if="label">
            {{ label }}
            <span v-if="force" style="color: red"> *</span>
        </div>
        <v-col>
            <VueDatePicker 
                class="date-picker"
                :class="{'date-picker-error': isError && force}"
                v-model="date"
                :clearable="true"
                auto-apply 
                :max-date="new Date()"
                :enable-time-picker=" false"
                :year-picker="false"
                :placeholder="placeholder"
                :format="format"
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
        if(this.value){
            this.date = new Date(this.value);
        }
        if(this.error){
            this.isError = true;
        }
    }, 
    methods:{
        valueChange(val){
            var dateEmit = `${val.getMonth() + 1}/${val.getDate()}/${val.getFullYear()}`;
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
            this.$emit('update:value', dateEmit)
        }
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
      }
    }
  }
</style>
