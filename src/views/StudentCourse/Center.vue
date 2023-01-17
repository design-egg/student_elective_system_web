<template>
  <page-layout>
    <operation
      @add="add"
      @submit="handleSubmit"
      :form="form"
      :showAdd="false"
    >
      <a-form-item>
        <a-select
          size="large"
          v-decorator="[ 'is_publish',{ initialValue: '' } ]"
        >
          <a-select-option value>全部(未公布、已公布)</a-select-option>
          <a-select-option value="未公布">未公布</a-select-option>
          <a-select-option value="已公布">已公布</a-select-option>
        </a-select>
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
    </operation>

    <s-table
      :columns="columns"
      :data="tableData"
      :loading="loading"
      :tableSlot="tableSlot"
      editID="c_id"
      :isEdit="isEdit"
      :isDel="isDel"
      :pagination="pagination"
      @handlerEdit="handlerEdit($event, STUDENT_COURSE)"
      @handlePagination="handlePagination($event, STUDENT_COURSE)"
      isMore
      @showMore="showMore"
      :showRowSelection="false"
    ></s-table>

    <a-modal
      title="学生选课信息"
      :visible="showModal"
      :footer="null"
      @cancel="showModal=false"
    >
      <c-card
        :data="moreData"
        type="course"
        titleProp="c_name"
      ></c-card>
    </a-modal>
  </page-layout>
</template>

<script>
import columns from './config.json'
import { STUDENT_COURSE } from '@/api/url'
import centerMixin from '@/mixin/centerMixin'

export default {
  name: 'StudentCourseCenter',
  mixins: [centerMixin],
  data () {
    return {
      showModal: false,
      moreData: {},
      columns,
      STUDENT_COURSE,
      tableSlot: ['score', 'second_score', 'is_publish'],
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.getInfo({
      url: STUDENT_COURSE
    })
  },
  watch: {
    $route: {
      handler (val) {
        if (val.name === 'StudentCourseCenter') {
          this.getInfo({
            url: STUDENT_COURSE
          })
        }
      },
      deep: true
    }
  },
  methods: {
    showMore (val) {
      this.moreData = val
      this.showModal = true
    },
    handleSubmit (e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getInfo({
            url: STUDENT_COURSE,
            isPublish: values.is_publish
          })
        } else {
          this.loading = false
          this.form.resetFields()
        }
      })
    }
  }
}
</script>
