<template>
  <div class="footer">
    <!-- <div class="links">
      <a href="https://pro.ant.design/" target="_blank">Pro 首页</a>
      <a href="https://github.com/ant-design/ant-design-pro" target="_blank">
        <a-icon type="github"/>
      </a>
      <a href="https://ant.design/">Ant Design</a>
      <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/">Vue Antd</a>
      <a>Antd-Vue Version@{{ version }}</a>
    </div> -->
    <div class="copyright">
      Copyright
      <a-icon type="copyright" />
      {{ getYear }} {{ $root.title }}
    </div>
  </div>
</template>

<script>
import { version } from 'ant-design-vue'
export default {
  name: 'GlobalFooter',
  data () {
    return {
      version
    }
  },
  computed: {
    getYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, 0.45);

        &:hover {
          color: rgba(0, 0, 0, 0.65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }

    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
</style>
