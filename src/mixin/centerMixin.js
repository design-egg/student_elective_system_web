import PageLayout from '@/components/Page/PageLayout'
import STable from '@/components/Table/StandardTable'
import Operation from '@/components/Operation/Operation'
import CCard from '@/components/Card/CourseCard'
import config from '@/defaultSettings.js'
import {
  mapGetters
} from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      isEdit: true,
      isDel: false,
      pagination: config.pagination,
      infoForm: this.$form.createForm(this),
      showAddModal: false,
      confirmLoading: false,
      addInfoDisabled: true,
      disabledDel: true,
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 12
      },
      delData: []
    }
  },
  watch: {
    delData: {
      handler (val) {
        val.length ? this.disabledDel = false : this.disabledDel = true
      },
      deep: true
    }
  },
  components: {
    PageLayout,
    STable,
    Operation,
    CCard
  },
  computed: {
    ...mapGetters(['roles', 'userInfo'])
  },
  methods: {
    validateID (rule, value, callback) {
      const patt = /^[1-9]\d*$/
      if (value) {
        if (patt.test(value)) {
          callback()
        } else {
          callback(new Error('必须为数字,且首位不能为0'))
        }
      } else {
        callback()
      }
    },
    getInfoById ({
      url,
      id
    }) {
      this.loading = true
      this.$GET(`${url}/${id}`)
        .then(res => {
          if (_.size(res.data)) {
            this.tableData = []
            this.tableData.push(res.data)
          } else {
            this.tableData = []
          }

          this.loading = false
        })
        .catch(_ => {
          this.$notification.error({
            message: '拉取信息失败，请重试 !!!',
            description: 'Error'
          })
          this.getInfoById({
            url,
            id
          })
          this.loading = false
        })
    },
    del (key, url) {
      let delData = this.delData
      let payload = []
      _.forEach(delData, item => {
        payload.push(item[key])
      })
      this.loading = true
      this.$DELETE(url, {
        [key]: payload
      })
        .then(res => {
          this.$notification.success({
            message: res.message,
            description: 'Successful'
          })
          this.getInfo({
            url
          })
          this.loading = false
          this.disabledDel = true
        })
        .catch(_ => {
          this.$notification.error({
            message: '删除信息失败，请重试 !!!',
            description: 'Error'
          })
          this.loading = false
        })
    },

    getInfoByName ({
      url,
      name = ''
    } = {}) {
      this.loading = true
      this.$GET(`${url}?name=${name}`)
        .then(res => {
          this.dataByName = res.data.rows
          this.loading = false
        })
        .catch(_ => {
          this.$notification.error({
            message: '拉取信息失败，请重试 !!!',
            description: 'Error'
          })
          this.getInfoByName({
            url,
            name
          })
          this.loading = false
        })
    },
    handleIdBlur (e, url) {
      const id = e.target.value
      if (id) {
        this.loading = true
        this.$GET(`${url}/${id}`)
          .then(res => {
            if (res.data && !res.data.length) {
              this.$notification.warning({
                message: `已存在的编号 ${id},换一个吧 !!!`,
                description: 'Warning'
              })
              this.addInfoDisabled = true
              this.loading = false
            } else {
              this.addInfoDisabled = false
              this.loading = false
            }
          })
      }
    },
    add () {
      this.showAddModal = true
      this.addInfoDisabled = true
    },
    handleCancel () {
      this.showAddModal = false
      this.confirmLoading = false
      this.infoForm.resetFields()
      this.addInfoDisabled = false
      this.setOperation()
    },
    setOperation () {
      if (this.roles === 'TEACHER') {
        if (this.userInfo.count === this.userInfo.current) {
          this.disabledAdd = true
        } else {
          this.disabledAdd = false
        }
      } else {
        this.disabledAdd = false
      }
    },
    handleOk (e, url) {
      this.confirmLoading = true
      e.preventDefault()
      this.infoForm.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          this.$POST(url, values)
            .then(res => {
              if (res.code === 200) {
                this.showAddModal = false
                this.confirmLoading = false
                this.getInfo({
                  url
                })
                this.infoForm.resetFields()
                this.addInfoDisabled = true
                this.setOperation()
                this.loading = false
              }
            })
            .catch(_ => {
              this.confirmLoading = false
              this.addInfoDisabled = false
              this.$notification.error({
                message: '添加信息失败，请重试 !!!',
                description: 'Error'
              })
              this.getInfo({
                url
              })
              this.setOperation()
              this.loading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    getInfo ({
      url,
      current = 1,
      pageSize = 10,
      name = '',
      isPublish = ''
    } = {}) {
      this.loading = true
      let url_ = `${url}?current=${current}&pageSize=${pageSize}`
      if (name) url_ = `${url_}&name=${name}`
      if (isPublish) url_ = `${url_}&is_publish=${isPublish}`

      this.$GET(`${url_}`)
        .then(res => {
          if (res.code === 200) {
            this.pagination.total = res.data.count
            this.tableData = res.data.rows
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
    handlerDel (val) {
      if (val.length) {
        this.disabledDel = false
      }
      this.delData = val
    },
    handlePagination (val, url) {
      let payload = Object.assign(val, {
        url
      })
      this.getInfo(payload)
      this.pagination = val
    },
    handlerEdit (val, url) {
      this.loading = true
      this.$PUT(url, val)
        .then(res => {
          if (res.code === 200) {
            this.getInfo({
              url
            })

            this.$notification.success({
              message: '修改信息成功 !!!',
              description: 'Successfully'
            })
          }
        })
        .catch(_ => {
          this.loading = false
          this.$notification.error({
            message: '修改信息失败，请重试 !!!',
            description: 'Error'
          })
          this.getInfo({
            url
          })
        })
    },
    validatePhoneNumber (rule, value, callback) {
      const patt = /^(13[0-9]|14[579]|15([0-3]|[5-9])|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (value) {
        if (patt.test(value)) {
          callback()
        } else {
          callback(new Error('不是正确的电话号码'))
        }
      } else {
        callback()
      }
    }
  }
}
