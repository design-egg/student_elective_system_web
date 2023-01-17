<template>
  <a-card
    :title="`《${title}》`"
    :tabList="tabList"
    :activeTabKey="activeTabKey"
    @tabChange="key => onTabChange(key)"
    hoverable
  >
    <a-button
      @click="onClick"
      slot="extra"
      :disabled="item.count === item.current"
    >{{ item.count === item.current ? '已满人':'选课' }}</a-button>
    <span
      slot="course"
      slot-scope="item"
    >
      <icon-font type="icon-kecheng" />
      {{ item.title }}
    </span>
    <span
      slot="teacher"
      slot-scope="item"
    >
      <icon-font type="icon-jiaoshi" />
      {{ item.title }}
    </span>

    <a-card-meta v-if="item.c_info">
      <template slot="description">
        <p>
          <span class="fw-b">课程简介：</span>
          <span>{{ item.c_info }}</span>
        </p>
      </template>
    </a-card-meta>
    <div v-if="activeTabKey==='course'">
      <p>
        <span class="fw-b">课程编号：</span>
        <span>{{ item.c_id }}</span>
      </p>
      <p>
        <span class="fw-b">课程学分：</span>
        <span>{{ item.credit }} 分</span>
      </p>
      <p>
        <span class="fw-b">该课程可供选课人数：</span>
        <span>{{ item.count }} 人</span>
      </p>
      <p>
        <span class="fw-b">该课程已选课人数：</span>
        <span>{{ item.current }} 人</span>
      </p>
      <p>
        <span class="fw-b">该课程剩余名额：</span>
        <span>{{ item.count-item.current }} 人</span>
      </p>
    </div>
    <div v-else-if="activeTabKey==='teacher'">
      <p>
        <span class="fw-b">授课教师：</span>
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
  name: 'CardBody',
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
      activeTabKey: 'course',
      tabList: [
        {
          key: 'course',
          title: '课程信息',
          scopedSlots: { tab: 'course' }
        },
        {
          key: 'teacher',
          title: '教师信息',
          scopedSlots: { tab: 'teacher' }
        }
      ]
    }
  },
  methods: {
    onClick (e) {
      this.$emit('onClick', e.target.checked)
    },
    onTabChange (key) {
      this.activeTabKey = key
    }
  },
  components: {
    IconFont
  }
}
</script>
