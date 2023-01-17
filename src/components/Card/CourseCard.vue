<template>
  <a-row
    :gutter="16"
    v-if="isArray(data)"
  >
    <a-col
      v-for="(item, index) in data"
      :key="index"
      :span="8"
      class="mb15"
    >
      <elective-card
        v-if="showElective"
        :title="item.course[titleProp]"
        :item="item"
        @onClick="onClick(item)"
      ></elective-card>
      <card-body
        v-else
        :title="item[titleProp]"
        :item="item"
        @onClick="onClick(item)"
      ></card-body>
    </a-col>
  </a-row>
  <student-elective
    v-else-if="isObject(data) && type==='course'"
    :title="data.course[titleProp]"
    :item="data"
  ></student-elective>
  <teacher-card
    v-else-if="isObject(data) && type==='teacher'"
    :title="data.teacher[titleProp]"
    :item="data"
  ></teacher-card>
  <major-card
    v-else-if="isObject(data) && type==='major'"
    :title="data.major[titleProp]"
    :item="data"
  ></major-card>
  <dept-card
    v-else-if="isObject(data) && type==='dept'"
    :title="data.dept[titleProp]"
    :item="data"
  ></dept-card>
</template>

<script>
import CardBody from './CardBody'
import ElectiveCard from './ElectiveCard'
import StudentElective from './StudentElective'
import TeacherCard from './TeacherCard'
import MajorCard from './MajorCard'
import DeptCard from './DeptCard'
import _ from 'lodash'

export default {
  name: 'CourseCard',
  props: {
    data: {
      type: [Array, Object],
      default: () => {
        return []
      }
    },
    titleProp: {
      type: String,
      default: 'name'
    },
    showElective: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null,
      validator: value => {
        return ['course', 'teacher', 'major'].indexOf(value) !== -1
      }
    }
  },
  methods: {
    onClick (val) {
      this.$emit('onClick', val)
    },
    isArray (val) {
      return _.isArray(val)
    },
    isObject (val) {
      return _.isObject(val)
    }
  },
  components: {
    CardBody,
    ElectiveCard,
    StudentElective,
    TeacherCard,
    MajorCard,
    DeptCard
  }
}
</script>
