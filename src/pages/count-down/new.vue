<template>
  <div class="demo-wrap">
    <PressField
      v-model="form.name"
      label="名称"
      placeholder="请输入名称"
      input-align="right"
    />
    <press-cell
      title="单元格"
      is-link
      :value="computedTime"
      @click="onShowFunctionalPicker"
    />

    <div class="button-wrap">
      <PressButton
        v-if="isModify"
        type="default"
        size="small"
        custom-style="margin: 0 50px 0 0;width: 80px;"
        @click="onDelete"
      >
        删除
      </PressButton>

      <PressButton
        type="primary"
        size="small"
        custom-style="margin: 0;width: 80px;"
        @click="onConfirm"
      >
        确认
      </PressButton>
    </div>

    <PressDatetimePickerPopup
      :id="DATE_TIME_PICKER_ID"
      :ref="DATE_TIME_PICKER_ID"
      mode="functional"
    />
    <PressDialogPlus id="tip-match-comm-tips-dialog" />
  </div>
</template>
<script>
import { timeStampFormat } from 'press-ui/common/format/time';
import { showFunctionalComponent } from 'press-ui/common/functional-component/index';
import { routerBack } from 'press-ui/common/utils/router';

import PressButton from 'press-ui/press-button/press-button.vue';
import PressDatetimePickerPopup from 'press-ui/press-datetime-picker/press-datetime-picker-popup.vue';
import DialogPlus from 'press-ui/press-dialog-plus';
import PressDialogPlus from 'press-ui/press-dialog-plus/press-dialog-plus.vue';
import PressField from 'press-ui/press-field/press-field.vue';


import {
  addCountDown,
  getCountDownDetail,
  modifyCountDown,
  deleteCountDown,
} from './count-down-logic';


const DATE_TIME_PICKER_ID = 'press-picker-functional';
const ONE_YEAR_MIL_SECONDS = 1000 * 60 * 60 * 24 * 365;
let that;

export default {
  components: {
    PressField,
    PressButton,
    PressDatetimePickerPopup,
    PressDialogPlus,
  },
  data() {
    that = this;

    return {
      DATE_TIME_PICKER_ID,
      isModify: false,
      curId: '',
      form: {
        name: '',
        time: Date.now(),
      },

    };
  },
  computed: {
    computedTime() {
      return `${timeStampFormat(this.form.time, 'yyyy-MM-dd')}`;
    },
  },
  onLoad(params) {
    this.curId = params.id || '';

    if (this.curId) {
      this.isModify = true;
      this.onGetCountDownDetail();
    }
  },
  mounted() {
  },
  methods: {
    onGetCountDownDetail() {
      getCountDownDetail(this.curId).then((res) => {
        this.form = {
          ...this.form,
          ...res,
        };
      });
    },
    onInput(event) {
      this.form.time = event;
    },
    onShowFunctionalPicker() {
      let inputValue = '';
      showFunctionalComponent.call(this, {
        context: this,
        selector: `#${DATE_TIME_PICKER_ID}`,
        title: '选择日期',
        button: '确认',
        horizontal: false,
        closeIcon: false,
        arrowIcon: false,
        borderButton: false,
        customStyle: '',
        datetimePicker: {
          type: 'date',
          formatter: that.formatter,
          value: this.form.time,
          minDate: new Date().getTime() - ONE_YEAR_MIL_SECONDS * 10,
          maxDate: new Date().getTime() + ONE_YEAR_MIL_SECONDS * 100,
          input(event) {
            inputValue = event;
          },
        },
      }).then((resp = {}) => {
        const { context } = resp;
        that.onInput(inputValue);
        context.innerShow = false;
      })
        .catch((err = {}) => {
          const { context } = err;
          context.innerShow = false;
        });
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } if (type === 'month') {
        return `${val}月`;
      } if (type === 'day') {
        return `${val}日`;
      } if (type === 'hour') {
        return `${val}时`;
      } if (type === 'minute') {
        return `${val}分`;
      }
    },
    onConfirm() {
      if (!this.form.name) {
        this.onGTip('请输入名称');
        return;
      }

      if (!this.form.time) {
        this.onGTip('请选择时间');
        return;
      }

      if (this.isModify) {
        modifyCountDown(this.curId, this.form)
          .then(() => {
            this.successCB();
          });

        return;
      }

      addCountDown({
        name: this.form.name,
        time: this.form.time,
      })
        .then(() => {
          this.successCB();
        });
    },
    successCB() {
      this.onGTip('操作成功');
      setTimeout(() => {
        routerBack();
      }, 500);
    },
    onDelete() {
      Dialog.show({
        title: '提示',
        content: '确认删除，不可恢复？',
        confirmText: '确认',
        cancelText: '取消',
      }).then(() => {
        deleteCountDown(this.curId).then(() => {
          this.successCB();
        });
      })
        .catch(() => {});
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  --field-label-color: #323233;
  --cell-value-color: #09134e;
}
.button-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
</style>
