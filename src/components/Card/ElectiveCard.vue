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
      :disabled="item.is_publish === '已公布' || item.is_publish === '1'"
    >{{ item.is_publish === '已公布' || item.is_publish === '1'?'已出成绩':'退选' }}</a-button>
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
    <span
      slot="elective"
      slot-scope="item"
    >
      <icon-font type="icon-chengji" />
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
        <span>{{ item.course.count - item.course.current }} 人</span>
      </p>
    </div>
    <div v-else-if="activeTabKey==='teacher'">
      <p>
        <span class="fw-b">授课教师：</span>
        <span>{{ item.course.teacher.t_name }}</span>
      </p>
      <p>
        <span class="fw-b">授课教师性别：</span>
        <span>{{ item.course.teacher.sex }}</span>
      </p>
      <p>
        <span class="fw-b">授课教师职称：</span>
        <span>{{ item.course.teacher.job }}</span>
      </p>
      <p>
        <span class="fw-b">授课教师联系电话：</span>
        <span>{{ item.course.teacher.phone }}</span>
      </p>
    </div>
    <div v-else-if="activeTabKey==='elective'">
      <p>
        <span class="fw-b">成绩：</span>
        <span>{{ item.score }}</span>
      </p>
      <p>
        <span class="fw-b">补考成绩：</span>
        <span>{{ item.second_score }}</span>
      </p>
      <p>
        <span class="fw-b">是否已公布成绩：</span>
        <span>{{ item.is_publish }}</span>
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
  name: 'ElectiveCard',
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
      activeTabKey: 'elective',
      tabList: [
        {
          key: 'elective',
          title: '成绩信息',
          scopedSlots: { tab: 'elective' }
        },
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
    onClick () {
      this.$emit('onClick')
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
