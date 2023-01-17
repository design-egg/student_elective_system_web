<template>
  <page-layout>
    <div class="mb15">
      <a-form
        layout="inline"
        @submit="handleSubmit"
        :form="form"
      >
        <a-form-item>
          <a-input
            size="large"
            placeholder="输入课程名关键词"
            v-decorator="[ 'c_name',{ initialValue: '' } ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            placeholder="输入教师名关键词"
            v-decorator="[ 't_name',{ initialValue: '' } ]"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            size="large"
            htmlType="submit"
            type="primary"
            icon="search"
            @click.stop.prevent="handleSubmit"
          >查询</a-button>
        </a-form-item>
      </a-form>
    </div>

    <c-card
      :loading="loading"
      :data="cardData"
      titleProp="c_name"
      @onClick="onChangeElective"
    ></c-card>

    <div flex="dir:right">
      <a-pagination
        :defaultCurrent="pagination.defaultCurrent"
        :defaultPageSize="pagination.defaultPageSize"
        :current="pagination.current"
        :pageSize="pagination.pageSize"
        :showQuickJumper="pagination.showQuickJumper"
        :total="pagination.total"
        :showSizeChanger="pagination.showSizeChanger"
        :showTotal="pagination.showTotal"
        @showSizeChange="showSizeChange"
        @change="onChange"
      ></a-pagination>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/Page/PageLayout'
import CCard from '@/components/Card/CourseCard'
import { COURSE, STUDENT_COURSE } from '@/api/url'
import config from '@/defaultSettings'

export default {
  name: 'StudentCourseElective',
  mounted () {
    this.getInfo({
      url: COURSE
    })
  },
  data () {
    return {
      cardData: [],
      loading: false,
      total: 10,
      pagination: config.pagination,
      form: this.$form.createForm(this)
    }
  },
  watch: {
    $route: {
      handler (val) {
        if (val.name === 'StudentCourseElective') {
          this.getInfo({
            url: COURSE
          })
        }
      },
      deep: true
    }
  },
  methods: {
    handleSubmit (e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getInfo({
            url: COURSE,
            cName: values.c_name,
            tName: values.t_name
          })
        } else {
          this.loading = false
          this.form.resetFields()
        }
      })
    },
    onChangeElective (val) {
      this.$POST(STUDENT_COURSE, val).then(res => {
        this.$notification.success({
          message: '选课成功 !!!',
          description: 'Successfully'
        })
        this.getInfo({
          url: COURSE
        })
      })
    },
    getInfo ({ url, current = 1, pageSize = 10, cName = '', tName = '' } = {}) {
      this.loading = true
      this.$GET(
        `${url}?current=${current}&pageSize=${pageSize}&name=${cName}&t_name=${tName}`
      )
        .then(res => {
          if (res.code === 200) {
            this.pagination.total = res.data.count
            this.cardData = res.data.rows
            this.loading = false
          }
        })
        .catch(_ => {
          this.loading = false
          this.$notification.error({
            message: '拉取信息失败，请重试 !!!',
            description: 'Error'
          })
          this.getInfo({
            url,
            current,
            pageSize
          })
        })
    },
    onChange (current) {
      this.pagination.current = current
      this.getInfo({ url: COURSE, current })
    },
    showSizeChange (current, pageSize) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.getInfo({ url: COURSE, current, pageSize })
    }
  },
  components: {
    PageLayout,
    CCard
  }
}
</script>
