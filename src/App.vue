<template>
  <a-locale-provider :locale="zhCN">
    <div
      id="app"
      flex="main-cross:center"
    >
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'app',
  data () {
    return {
      zhCN
    }
  }
}
</script>
