<template>
  <a-card
    :title="title"
    :tabList="tabList"
    :activeTabKey="activeTabKey"
    @tabChange="key => onTabChange(key)"
    hoverable
  >

    <span
      slot="teacher"
      slot-scope="item"
    >
      <icon-font type="icon-jiaoshi" />
      {{ item.title }}
    </span>

    <div v-if="activeTabKey==='teacher'">
      <p>
        <span class="fw-b">授课教师工号：</span>
        <span>{{ item.teacher.t_id }}</span>
      </p>
      <p>
        <span class="fw-b">授课教师姓名：</span>
        <span>{{ item.teacher.t_name }}</span>
      </p>
      <p>
        <span class="fw-b">授课教师性别：</span>
        <span>{{ item.teacher.sex }}</span>
      </p>
      <p>
        <span class="fw-b">授课教师职称：</span>
        <span>{{ item.teacher.job }}</span>
      </p>
      <p>
        <span class="fw-b">授课教师联系电话：</span>
        <span>{{ item.teacher.phone }}</span>
      </p>
      <p>
        <span class="fw-b">授课教师允许开设课程数：</span>
        <span>{{ item.teacher.current }} 门</span>
      </p>
      <p>
        <span class="fw-b">授课教师已开设课程数：</span>
        <span>{{ item.teacher.current }} 门</span>
      </p>
      <p>
        <span class="fw-b">授课教师还剩开设课程数：</span>
        <span>{{ item.teacher.count - item.teacher.current }} 门</span>
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
  name: 'TeacherCard',
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
      activeTabKey: 'teacher',
      tabList: [
        {
          key: 'teacher',
          title: '教师信息',
          scopedSlots: { tab: 'teacher' }
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
