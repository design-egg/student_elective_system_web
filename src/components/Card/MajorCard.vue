<template>
  <a-card
    :title="title"
    :tabList="tabList"
    :activeTabKey="activeTabKey"
    @tabChange="key => onTabChange(key)"
    hoverable
  >

    <span
      slot="major"
      slot-scope="item"
    >
      <icon-font type="icon-zhuanye1" />
      {{ item.title }}
    </span>

    <a-card-meta v-if="item.major.m_info">
      <template slot="description">
        <p>
          <span class="fw-b">专业简介：</span>
          <span>{{ item.major.m_info }}</span>
        </p>
      </template>
    </a-card-meta>
    <div v-if="activeTabKey==='major'">
      <p>
        <span class="fw-b">专业编号：</span>
        <span>{{ item.major.m_id }}</span>
      </p>
      <p>
        <span class="fw-b">专业名字：</span>
        <span>{{ item.major.m_name }}</span>
      </p>
    </div>

  </a-card>
</template>

<script>
import config from '@/defaultSettings'
import { Icon } from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: config.iconfont
})

export default {
  name: 'majorCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      activeTabKey: 'major',
      tabList: [
        {
          key: 'major',
          title: '学生专业信息',
          scopedSlots: { tab: 'major' }
        }
      ]
    }
  },
  methods: {
    onTabChange (key) {
      this.activeTabKey = key
    }
  },
  components: {
    IconFont
  }
}
</script>
