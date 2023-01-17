<template>
  <a-card
    :title="title"
    :tabList="tabList"
    :activeTabKey="activeTabKey"
    @tabChange="key => onTabChange(key)"
    hoverable
  >

    <span
      slot="dept"
      slot-scope="item"
    >
      <icon-font type="icon-zhuanye1" />
      {{ item.title }}
    </span>

    <a-card-meta v-if="item.dept.d_info">
      <template slot="description">
        <p>
          <span class="fw-b">院系简介：</span>
          <span>{{ item.dept.d_info }}</span>
        </p>
      </template>
    </a-card-meta>
    <div v-if="activeTabKey==='dept'">
      <p>
        <span class="fw-b">院系编号：</span>
        <span>{{ item.dept.d_id }}</span>
      </p>
      <p>
        <span class="fw-b">院系名字：</span>
        <span>{{ item.dept.d_name }}</span>
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
  name: 'deptCard',
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
      activeTabKey: 'dept',
      tabList: [
        {
          key: 'dept',
          title: '院系所在院系信息',
          scopedSlots: { tab: 'dept' }
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
