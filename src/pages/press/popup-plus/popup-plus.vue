<template>
  <div class="demo-wrap">
    <div>
      <demo-block :title="t('basicUsage')">
        <PressCell
          :title="t('closeIcon')"
          is-link
          @click="onShowPopup('normal')"
        />
        <PressCell
          :title="t('cancelIcon')"
          is-link
          @click="onShowPopup('cancel')"
        />
        <PressCell
          :title="t('noCloseOrCancel')"
          is-link
          @click="onShowPopup('noClose')"
        />
      </demo-block>

      <demo-block :title="t('customStyle')">
        <PressCell
          :title="t('plainButtonConfirm')"
          is-link
          @click="onShowPopup('borderBtn')"
        />
        <PressCell
          :title="t('disabledButton')"
          is-link
          @click="onShowPopup('disabledButton')"
        />
        <PressCell
          :title="t('horizontal')"
          is-link
          @click="onShowPopup('hor')"
        />
        <PressCell
          :title="t('buttonSlot')"
          is-link
          @click="showSlotPopup = true"
        />
      </demo-block>

      <demo-block :title="t('asyncClose')">
        <PressCell
          :title="t('notPromiseFunction')"
          is-link
          @click="onShowAsyncClosePopup(TYPE_MAP.ASYNC_NORMAL)"
        />
        <PressCell
          :title="t('promiseFunction')"
          is-link
          @click="onShowAsyncClosePopup(TYPE_MAP.ASYNC_PROMISE)"
        />
      </demo-block>

      <demo-block :title="t('useWay')">
        <PressCell
          :title="t('controlledPopup')"
          is-link
          @click="onShowControlledPopup"
        />
        <PressCell
          :title="t('functional')"
          is-link
          @click="onShowFunctionalPicker"
        />
      </demo-block>
    </div>

    <PressPopupPlus
      v-if="curPicker.show"
      :is-showpopup-close="curPicker.isShowpopuoClose"
      :show-back-arrow="curPicker.showBackArrow"
      :is-cross-slab="curPicker.isCrossSlab"
      :is-border-btn="curPicker.isBorderBtn"
      :disabled-button="curPicker.disabledButton"
      :width-number="54"
      :custom-style="curPicker.customStyle"
      :popup-title="curPicker.title"
      :popup-title-btn="curPicker.popupTitleBtn"
      :async-confirm="asyncConfirm"
      :async-close="asyncCancel"
      @onConfirm="curPicker.onConfirm"
      @onCancel="curPicker.onCancel"
    >
      <div class="content">
        {{ t('SomeContent') }}
      </div>
    </PressPopupPlus>

    <PressPopupPlus
      :is-show="showSlotPopup"
      @confirm="showSlotPopup = false"
      @cancel="showSlotPopup = false"
    >
      <template #icon>
        <PressIcon
          name="gem-o"
          size="22px"
        />
      </template>

      <!-- v-slot:title -->
      <template #title>
        <div>
          {{ t('wayToWin') }}
          <PressIcon
            name="like-o"
            size="16"
          />
        </div>
      </template>

      <template #button>
        <PressIcon
          name="setting-o"
          size="22px"
        />
      </template>

      <div class="content">
        {{ t('SomeContent') }}
      </div>
    </PressPopupPlus>

    <PressPopupPlus
      :is-show="showControlledPopup"
      :button="t('confirm')"
      :title="t('controlledPopup')"
      @confirm="showControlledPopup = false"
      @cancel="showControlledPopup = false"
    >
      <div class="content">
        {{ t('SomeContent') }}
      </div>
    </PressPopupPlus>

    <PressPopupPlus
      :id="PRESS_PICKER_ID"
      :ref="PRESS_PICKER_ID"
      mode="functional"
    >
      <scroll-view
        scroll-y
        :style="{maxHeight: '200px', padding: '0 20px'}"
      >
        <div class="content__inner">
          {{ t('SomeScrollContent') }}
        </div>
        <div class="content__inner">
          {{ t('SomeScrollContent') }}
        </div>
        <div class="content__inner">
          {{ t('SomeScrollContent') }}
        </div>
      </scroll-view>
    </PressPopupPlus>
  </div>
</template>
<script>
import { showFunctionalComponent } from 'press-ui/common/functional-component/index';
import { ScrollViewPureMixin } from 'press-ui/mixins/pure/scroll-view';
import PressCell from 'press-ui/press-cell/press-cell.vue';
import PressIcon from 'press-ui/press-icon/press-icon.vue';
import PressPopupPlus from 'press-ui/press-popup-plus/press-popup-plus.vue';


const PRESS_PICKER_ID = 'press-picker-functional';
const TYPE_MAP = {
  ASYNC_NORMAL: 'async-normal',
  ASYNC_PROMISE: 'async-promise',
};

function asyncClose({
  t,
  type,
  onTip,
  onGShowLoading,
}) {
  return new Promise((resolve) => {
    onGShowLoading(t('asyncConfirm'), {
      mask: true,
      duration: 3000,
    });
    setTimeout(() => {
      if (type === 'confirm') {
        onTip(t('asyncConfirmSuccess'));
        resolve(true);
      } else {
        resolve(false);
        onTip(t('asyncConfirmFail'));
      }
    }, 500);
  });
}
let that;

export default {
  i18n: {
    'zh-CN': {
      wayToWin: '决胜方式',
      SomeContent: '一些内容',
      SomeScrollContent: '一些可以滚动的内容',
      controlledPopup: '受控组件',
      functional: '函数式调用',
      check: '查看',
      closeIcon: '关闭图标',
      customStyle: '自定义样式',
      buttonSlot: '使用插槽',
      cancelIcon: '取消图标',
      noCloseOrCancel: '没有关闭/取消',
      plainButtonConfirm: '线框按钮',
      disabledButton: '禁用状态',
      horizontal: '横版',
      asyncClose: '异步关闭',
      asyncConfirm: '异步确认中...',
      asyncConfirmSuccess: '异步确认后可以关闭',
      asyncConfirmFail: '异步确认后禁止关闭',
      useWay: '使用方式',
      notPromiseFunction: 'Not Promise',
      promiseFunction: 'Promise',
    },
    'en-US': {
      wayToWin: 'Bo Number',
      SomeContent: 'Some Content',
      controlledPopup: 'Controlled Popup',
      functional: 'Functional Mode',
      check: 'Check',
      customStyle: 'Custom Style',
      buttonSlot: 'Use Slot',
      closeIcon: 'Close Ion',
      cancelIcon: 'Cancel Icon',
      noCloseOrCancel: 'No Close Or Cancel',
      plainButtonConfirm: 'Plain Button',
      disabledButton: 'Disabled Button',
      horizontal: 'Horizontal Version',
      asyncClose: 'Async Close',
      asyncConfirm: 'Async Confirm ...',
      asyncConfirmSuccess: 'Async Confirm Success',
      asyncConfirmFail: 'Async Confirm Fail',
      useWay: 'Use Way',
      notPromiseFunction: 'Not Promise',
      promiseFunction: 'Promise',
    },
  },
  components: {
    PressCell,
    PressPopupPlus,
    PressIcon,
  },
  mixins: [ScrollViewPureMixin],
  data() {
    that = this;
    const commonOptions = {
      title: this.t('wayToWin'),
      popupTitleBtn: this.t('confirm'),
      isCrossSlab: false,
      isShowpopuoClose: false,
      showBackArrow: false,
      isBorderBtn: false,
      disabledButton: false,
      customStyle: '',
      onConfirm: () => {
        // this.onTip('confirm');
        this.curPicker.show = false;
      },
      onCancel: () => {
        // this.onTip('cancel');
        this.curPicker.show = false;
      },
    };

    const popupCustomStyle = '';

    // #ifdef H5
    // popupCustomStyle = 'top: 44px;';
    // #endif

    return {
      type: '',
      customStyle: '',
      popupOptions: {
        normal: {
          isShowpopuoClose: true,
        },
        cancel: {
          showBackArrow: true,
        },
        noClose: {},
        hor: {
          popupTitleBtn: '',
          isCrossSlab: true,
          isShowpopuoClose: true,
          customStyle: popupCustomStyle,
        },
        borderBtn: {
          isShowpopuoClose: true,
          isBorderBtn: true,
        },
        disabledButton: {
          isShowpopuoClose: true,
          disabledButton: true,
        },
      },
      commonOptions,
      curPicker: {
        ...commonOptions,
      },
      pressPickerFunctionalData: {},
      PRESS_PICKER_ID,
      showControlledPopup: false,
      showSlotPopup: false,
      TYPE_MAP,
    };
  },
  computed: {
  },
  methods: {
    onShowPopup(type) {
      this.onGHideToast();
      this.type = type;
      if (type === 'disabledButton') {
        setTimeout(() => {
          this.curPicker.disabledButton = false;
        }, 3000);
      }

      this.curPicker = {
        ...this.commonOptions,
        ...this.popupOptions[type],
        show: true,
      };
    },
    // validateConfirm 没有用了，被 asyncCancel/asyncConfirm 拦截
    // validateConfirm() {
    //   if (['noClose', 'borderBtn'].indexOf(this.type) <= -1) return true;
    //   return asyncClose({
    //     t: this.t,
    //     type: this.type === 'noClose' ? 'confirm' : 'cancel',
    //     onTip: this.onTip,
    //   });
    // },
    onTip(title) {
      this.onGTip(title);
    },
    onShowFunctionalPicker() {
      showFunctionalComponent.call(this, {
        context: this,
        selector: `#${PRESS_PICKER_ID}`,
        title: this.t('wayToWin'),
        button: this.t('confirm'),
        horizontal: false,
        closeIcon: false,
        arrowIcon: true,
        borderButton: false,
        customStyle: '',
      }).then(() => {
        this.onTip('confirm');
      })
        .catch(() => {
          this.onTip('cancel');
        });
    },
    onConfirm() {
      this.onTip('confirm');
    },
    onCancel() {
      this.onTip('cancel');
    },
    onShowControlledPopup() {
      this.showControlledPopup = true;
    },
    onShowAsyncClosePopup(type) {
      this.type = type;
      this.curPicker = {
        ...this.commonOptions,
        isShowpopuoClose: true,
        show: true,
      };
    },
    asyncConfirm() {
      if (that.type === TYPE_MAP.ASYNC_PROMISE) {
        return asyncClose({
          t: that.t,
          type: 'confirm',
          onTip: that.onTip,
          onGShowLoading: that.onGShowLoading,
        });
      }
      if (that.type === TYPE_MAP.ASYNC_NORMAL) {
        that.onTip('Can Close');
        return true;
      }
      return true;
    },
    asyncCancel() {
      if (that.type === TYPE_MAP.ASYNC_PROMISE) {
        return asyncClose({
          t: that.t,
          type: 'cancel',
          onTip: that.onTip,
          onGShowLoading: that.onGShowLoading,
        });
      }
      if (that.type === TYPE_MAP.ASYNC_NORMAL) {
        that.onTip('Can not close');
        return false;
      }
      return true;
    },

  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  // height: calc(100vh + 80px);
  padding-bottom: 400px;
}

.content {
  font-size: 16px;
  padding: 20px;

  &__inner {
    height: 200px;
    font-size: 14px;
  }
}
</style>
