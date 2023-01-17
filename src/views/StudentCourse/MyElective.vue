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
            v-decorator="[ 'name',{ initialValue: '' } ]"
          />
        </a-form-item>
        <a-form-item>
          <a-select
            size="large"
            v-decorator="[ 'is_publish',{ initialValue: '' } ]"
          >
            <a-select-option value>全部(未公布、已公布)</a-select-option>
            <a-select-option value="未公布">未公布课程成绩</a-select-option>
            <a-select-option value="已公布">已公布课程成绩</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item>
          <a-select
            size="large"
            v-decorator="[ 'is_pass',{ initialValue: '' } ]"
          >
            <a-select-option value>全部(未通过、已通过)</a-select-option>
            <a-select-option value="-1">未通过课程</a-select-option>
            <a-select-option value="1">已通过课程</a-select-option>
          </a-select>
        </a-form-item> -->
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
      showElective
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
import { STUDENT_COURSE } from '@/api/url'
import config from '@/defaultSettings'

export default {
  name: 'MyElective',
  mounted () {
    this.getInfo({
      url: STUDENT_COURSE
    })
  },
  watch: {
    $route: {
      handler (val) {
        if (val.name === 'MyElective') {
          this.getInfo({
            url: STUDENT_COURSE
          })
        }
      },
      deep: true
    }
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
  methods: {
    handleSubmit (e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getInfo({
            url: STUDENT_COURSE,
            cName: values.name,
            isPublish: values.is_publish,
            isPass: values.is_pass
          })
        } else {
          this.loading = false
          this.form.resetFields()
        }
      })
    },
    onChangeElective (val) {
      this.loading = true
      this.$DELETE(STUDENT_COURSE, val)
        .then(res => {
          if (res.code) {
            this.$notification.success({
              message: res.message,
              description: 'Successfully'
            })
            this.getInfo({
              url: STUDENT_COURSE
            })
          } else {
            this.loading = false
          }
        })
        .catch(_ => {
          this.loading = false
          this.$notification.error({
            message: '退选失败，请重试 !!!',
            description: 'Error'
          })
          this.getInfo({
            url: STUDENT_COURSE
          })
        })
    },
    getInfo ({
      url,
      current = 1,
      pageSize = 10,
      cName = '',
      isPublish = '',
      isPass = ''
    } = {}) {
      this.loading = true
      this.$GET(
        `${url}?current=${current}&pageSize=${pageSize}&name=${cName}&is_publish=${isPublish}&is_pass=${isPass}`
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
          this.getInfo({ url, current, pageSize })
        })
    },
    onChange (current) {
      this.pagination.current = current
      this.getInfo({ url: STUDENT_COURSE, current })
    },
    showSizeChange (current, pageSize) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.getInfo({ url: STUDENT_COURSE, current, pageSize })
    }
  },
  components: {
    PageLayout,
    CCard
  }
}
</script>
