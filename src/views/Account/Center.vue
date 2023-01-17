<template>
  <page-layout showDetail>
    <div slot="headerContent">
      <div class="title">
        {{ timeFix }}，{{ nickname }}
        <span class="welcome-text">，{{ welcome }}</span>
      </div>
      <div>{{ roleTitle }} | {{ $root.title }}</div>
    </div>

    <div
      flex="main:around "
      class="account-card"
    >
      <a-card
        hoverable
        title="个人信息"
      >
        <a-icon
          type="edit"
          slot="extra"
          @click="isInputDisabled=false"
        />

        <a-form
          ref="infoForm"
          id="infoForm"
          :form="infoForm"
          @submit="handleInfoSubmit"
          hideRequiredMark
        >
          <a-form-item
            :label="accountTitle"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              size="large"
              type="text"
              autocomplete="off"
              :defaultValue="userInfo.account || userInfo.s_id || userInfo.t_id"
              disabled
            ></a-input>
          </a-form-item>
          <a-form-item
            label="名字"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-if="nickname !== undefined"
          >
            <a-input
              size="large"
              type="text"
              placeholder="请输入修改之后的名字"
              autocomplete="off"
              :disabled="isInputDisabled"
              v-decorator="[
              'name',
                {
                  rules: [{ required: true, message: '请输入修改之后的名字', trigger: 'blur' }, { min: 2, max: 10, message: '名字长度 2~10'}],
                  initialValue: nickname
                }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="职称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-if="userInfo.job"
          >
            <a-select
              size="large"
              autocomplete="off"
              :disabled="isInputDisabled"
              v-decorator="[ 'job', { initialValue: userInfo.job } ]"
            >
              <a-select-option
                v-for="(item, index) in jobs"
                :key="index"
                :value="item"
              >{{ item }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="可供开课数"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-if="userInfo.count"
          >
            <a-input
              size="large"
              type="text"
              autocomplete="off"
              :defaultValue="userInfo.count"
              disabled
            ></a-input>
          </a-form-item>
          <a-form-item
            label="已开课数"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-if="userInfo.current"
          >
            <a-input
              size="large"
              type="text"
              autocomplete="off"
              :defaultValue="userInfo.current"
              disabled
            ></a-input>
          </a-form-item>
          <a-form-item
            label="专业"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-if="userInfo.major && userInfo.major.m_name !== undefined"
          >
            <a-input
              size="large"
              type="text"
              autocomplete="off"
              :defaultValue="userInfo.major.m_name"
              disabled
            ></a-input>
          </a-form-item>
          <a-form-item
            label="性别"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-if="userInfo.sex !== undefined"
          >
            <a-radio-group
              :options="sex"
              v-decorator="[ 'sex', { initialValue: userInfo.sex } ]"
              :disabled="isInputDisabled"
            />
          </a-form-item>
          <a-form-item
            label="电话"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-if="userInfo.phone !== undefined"
          >
            <a-input
              size="large"
              type="text"
              placeholder="请输入修改之后的电话"
              autocomplete="off"
              :disabled="isInputDisabled"
              v-decorator="[
              'phone',
                {
                  rules: [{ required: false, message: '请输入修改之后的电话', trigger: 'blur' }, { validator: validatePhoneNumber }],
                  initialValue: userInfo.phone
                }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="权限"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              size="large"
              type="text"
              autocomplete="off"
              :defaultValue="roleTitle"
              disabled
            ></a-input>
          </a-form-item>
          <a-form-item
            label="上一次登录时间"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              size="large"
              type="text"
              autocomplete="off"
              :defaultValue="formatTime(userInfo.login_time)"
              disabled
            ></a-input>
          </a-form-item>
          <a-form-item
            label="上一次登录 IP"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              size="large"
              type="text"
              autocomplete="off"
              :defaultValue="userInfo.login_ip"
              disabled
            ></a-input>
          </a-form-item>
          <a-form-item
            v-if="!isInputDisabled"
            class="tr"
          >
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              :loading="isSaveInfo"
              @click.stop.prevent="handleInfoSubmit"
            >保存</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <a-card
        hoverable
        title="密码修改"
      >
        <a-form
          ref="pwdForm"
          id="pwdForm"
          :form="pwdForm"
          @submit="handlePwdSubmit"
        >
          <a-form-item
            label="旧密码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              size="large"
              type="password"
              placeholder="请输入旧密码"
              autocomplete="off"
              v-decorator="[
              'old_password',
                {
                  rules: [{ required: true, message: '请输入旧密码', trigger: 'blur'  }]
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-form-item
            label="新密码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              size="large"
              type="password"
              placeholder="请输入新密码"
              autocomplete="off"
              v-decorator="[
              'new_password',
                {
                  rules: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { validator: validateToNextPassword }]
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-form-item
            label="确认密码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              size="large"
              type="password"
              placeholder="请再次输入新密码"
              autocomplete="off"
              v-decorator="[
              'repeat_password',
                {
                  rules: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }, { validator: compareToFirstPassword }]
                }
              ]"
              @blur="handleConfirmBlur"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>
          <a-form-item class="tr">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              :loading="isSavePwd"
              @click.stop.prevent="handlePwdSubmit"
            >保存</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </page-layout>
</template>

<script>
import { timeFix, format } from '@/utils/util'
import PageLayout from '@/components/Page/PageLayout'
import { mapGetters, mapActions } from 'vuex'
import { CURRENT, REST_PWD } from '@/api/url'

export default {
  name: 'AccountCenter',
  data () {
    return {
      confirmDirty: false,
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 12
      },
      sex: ['男', '女'],
      jobs: ['讲师', '副教授', '教授'],
      timeFix: timeFix(),
      user: {},
      infoForm: this.$form.createForm(this),
      pwdForm: this.$form.createForm(this),
      isInputDisabled: true,
      isSaveInfo: false,
      isSavePwd: false
    }
  },
  computed: {
    ...mapGetters([
      'nickname',
      'welcome',
      'roleTitle',
      'userInfo',
      'accountTitle'
    ])
  },
  mounted () {
    this.user = this.userInfo
  },
  methods: {
    ...mapActions(['Logout']),
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
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
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.pwdForm
      if (value && this.confirmDirty) {
        form.validateFields(['repeat_password'], {
          force: true
        })
      }
      callback()
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.pwdForm
      if (value && value !== form.getFieldValue('new_password')) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    },
    handleInfoSubmit (e) {
      this.isSaveInfo = true
      e.preventDefault()
      this.infoForm.validateFields((err, values) => {
        if (!err) {
          let payload = {}
          switch (this.userInfo.role) {
            case 'ADMIN':
              payload.user_name = values.name
              payload.pwd = this.userInfo.pwd
              payload.account = this.userInfo.account
              break
            case 'STUDENT':
              payload = this.userInfo
              payload.s_name = values.name
              payload.sex = values.sex
              payload.phone = values.phone
              break
            case 'TEACHER':
              payload = this.userInfo
              payload.t_name = values.name
              payload.job = values.job
              payload.sex = values.sex
              payload.phone = values.phone
              break
            default:
              payload = {}
          }

          this.$PUT(CURRENT, payload)
            .then(res => {
              this.isSaveInfo = false
              if (res.code === 200) {
                this.$notification.success({
                  message: res.message,
                  description: 'Successfully'
                })
                this.$store.dispatch('GetCurrent')
                this.isInputDisabled = true
              }
            })
            .catch(_ => {
              this.isSaveInfo = false
              this.$store.dispatch('GetCurrent')
              this.isInputDisabled = true
            })
        } else {
          this.isSaveInfo = false
          this.isInputDisabled = true
        }
      })
    },
    formatTime (date) {
      return format(date)
    },
    handlePwdSubmit (e) {
      this.isSavePwd = true
      e.preventDefault()
      this.pwdForm.validateFields((err, values) => {
        if (!err) {
          const payload = values
          this.$PATCH(REST_PWD, payload)
            .then(data => {
              if (data.code === 200) {
                this.$notification.success({
                  message: data.message,
                  description: 'Successfully, 请重新登录'
                })
                setTimeout(() => {
                  this.Logout()
                }, 1000)
              }
              this.isSavePwd = false
            })
            .catch(_ => {
              this.isSavePwd = false
            })
        } else {
          this.isSavePwd = false
        }
      })
    }
  },
  components: {
    PageLayout
  }
}
</script>

<style lang="less" scoped>
  .account-card > div {
    width: 45%;
    height: max-content;
  }
</style>
