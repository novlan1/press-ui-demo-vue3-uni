<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <PressEmpty :description="t('description')" />
    </demo-block>

    <demo-block
      :title="t('imageType')"
      :section-style="sectionStyle"
    >
      <PressTabs>
        <PressTab
          v-for="(item, index) of imgTypeList"
          :key="index"
          :title="item.title"
        >
          <PressEmpty
            :image="item.name"
            :description="t('description')"
          />
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('customImage')"
      :section-style="sectionStyle"
    >
      <PressEmpty
        custom-class="custom-image"
        image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fcustom-empty-image.png"
        image-custom-style="width:90px;height:90px"
        :description="t('description')"
      />
    </demo-block>

    <demo-block
      :title="t('bottomContent')"
      :section-style="sectionStyle"
    >
      <PressEmpty :description="t('description')">
        <PressButton
          round
          type="danger"
          custom-class="bottom-button"
        >
          {{ t('button') }}
        </PressButton>
      </PressEmpty>
    </demo-block>

    <!-- #ifdef H5 || MP-WEIXIN || MP-QQ -->

    <demo-block
      title="E-SPORT"
      :section-style="sectionStyle"
    >
      <PressEmpty
        type="e-sport"
        :description="t('description')"
        custom-style="height: 300px;"
      />
    </demo-block>
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <demo-block
      title="HOR"
      header-style="background: #f7f8fa;"
      section-style="background: #192841;color: #fff;margin: 0;padding: 10px 0;"
    >
      <PressEmpty
        type="hor"
        :description="t('description')"
      />
    </demo-block>
    <!-- #endif -->
  </div>
</template>
<script>
import PressButton from 'press-ui/press-button/press-button.vue';
import PressEmpty from 'press-ui/press-empty/press-empty.vue';
import PressTab from 'press-ui/press-tab/press-tab.vue';
import PressTabs from 'press-ui/press-tabs/press-tabs.vue';


export default {
  i18n: {
    'zh-CN': {
      error: '通用错误',
      search: '搜索提示',
      network: '网络错误',
      imageType: '图片类型',
      description: '描述文字',
      customImage: '自定义图片',
      bottomContent: '底部内容',
    },
    'en-US': {
      error: 'Error',
      search: 'Search',
      network: 'Network',
      imageType: 'Image Type',
      description: 'Description',
      customImage: 'Custom Image',
      bottomContent: 'Bottom Content',
    },
  },

  components: {
    PressTabs,
    PressTab,
    PressEmpty,
    PressButton,
  },
  data() {
    return {
      sectionStyle: '',
      imgTypeList: [
        {
          name: 'error',
          title: this.t('error'),
        },
        {
          name: 'network',
          title: this.t('network'),
        },
        {
          name: 'search',
          title: this.t('search'),
        },
      ],
    };
  },
  methods: {

  },
};
</script>
<style lang="scss">
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
