<template>
  <div class="main">
    <a-form
      class="user-layout-login"
      ref="formLogin"
      id="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="帐号（学号或者工号）"
          autocomplete="off"
          v-decorator="[
          'account',
            {
              rules: [{ required: true, message: '账号长度在 5 到 20 个字符', min: 5, max: 20, trigger: 'blur'  }]
            }
          ]"
        >
          <a-icon
            slot="prefix"
            type="user"
            :style="{ color: 'rgba(0,0,0,.25)' }"
          />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="off"
          placeholder="密码"
          v-decorator="[
          'pwd',
            {
              rules: [{ required: true, message: '请输入密码', trigger: 'blur'  }]
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
        flex="dir:right"
        class="mb10"
      >
        <a-radio-group
          :options="roles"
          v-decorator="[ 'role', { initialValue: 'STUDENT' } ]"
        />
      </a-form-item>

      <a-form-item
        flex="dir:right"
        class="mb10"
      >
        <a-checkbox v-decorator="[ 'rememberMe', { initialValue: false } ]">7天内记住我</a-checkbox>
      </a-form-item>

      <a-form-item class="mt24">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="isLogin"
          @click.stop.prevent="handleSubmit"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      isLogin: false,
      form: null,
      roles: [
        {
          label: '系统管理员',
          value: 'ADMIN'
        },
        {
          label: '学生',
          value: 'STUDENT'
        },
        {
          label: '教师',
          value: 'TEACHER'
        }
      ]
    }
  },
  mounted () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit (e) {
      this.isLogin = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        // console.log(err, values)
        if (!err) {
          let payload = values
          this.Login(payload)
            .then(_ => {
              setTimeout(() => {
                // this.$router.push({
                //   name: 'Login'
                // })
                window.location.reload()
              }, 1000)
            })
            .catch(_ => {
              this.isLogin = false
            })
        } else {
          this.isLogin = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
