<template>
  <a-card
    :title="`《${title}》`"
    :tabList="tabList"
    :activeTabKey="activeTabKey"
    @tabChange="key => onTabChange(key)"
    hoverable
  >

    <span
      slot="course"
      slot-scope="item"
    >
      <icon-font type="icon-kecheng" />
      {{ item.title }}
    </span>
    <span
      slot="student"
      slot-scope="item"
    >
      <icon-font type="icon-xuesheng" />
      {{ item.title }}
    </span>

    <a-card-meta v-if="item.course.c_info">
      <template slot="description">
        <p>
          <span class="fw-b">课程简介：</span>
          <span>{{ item.course.c_info }}</span>
        </p>
      </template>
    </a-card-meta>
    <div v-if="activeTabKey==='course'">
      <p>
        <span class="fw-b">课程编号：</span>
        <span>{{ item.course.c_id }}</span>
      </p>
      <p>
        <span class="fw-b">课程名称：</span>
        <span>{{ item.course.c_name }}</span>
      </p>
      <p>
        <span class="fw-b">课程学分：</span>
        <span>{{ item.course.credit }} 分</span>
      </p>
      <p>
        <span class="fw-b">该课程可供选课人数：</span>
        <span>{{ item.course.count }} 人</span>
      </p>
      <p>
        <span class="fw-b">该课程已选课人数：</span>
        <span>{{ item.course.current }} 人</span>
      </p>
      <p>
        <span class="fw-b">该课程剩余名额：</span>
        <span>{{ item.course.count-item.course.current }} 人</span>
      </p>
    </div>
    <div v-else-if="activeTabKey==='student'">
      <p>
        <span class="fw-b">学生学号：</span>
        <span>{{ item.student.s_id }}</span>
      </p>
      <p>
        <span class="fw-b">学生姓名：</span>
        <span>{{ item.student.s_name }}</span>
      </p>
      <p>
        <span class="fw-b">学生性别：</span>
        <span>{{ item.student.sex }}</span>
      </p>
      <p>
        <span class="fw-b">学生联系电话：</span>
        <span>{{ item.student.phone }}</span>
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
  name: 'StudentElective',
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
      activeTabKey: 'student',
      tabList: [
        {
          key: 'student',
          title: '学生信息',
          scopedSlots: { tab: 'student' }
        },
        {
          key: 'course',
          title: '课程信息',
          scopedSlots: { tab: 'course' }
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
