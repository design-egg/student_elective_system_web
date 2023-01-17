import Vue from 'vue'
import {
  Pagination,
  Button,
  LocaleProvider,
  Form,
  Input,
  Icon,
  Checkbox,
  Radio,
  notification,
  Layout,
  Drawer,
  Menu,
  Dropdown,
  Avatar,
  Modal,
  Breadcrumb,
  Row,
  Col,
  Card,
  Select,
  Table,
  Popconfirm,
  InputNumber,
  AutoComplete,
  Tooltip
} from 'ant-design-vue'

Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm

Vue.use(Pagination)
Vue.use(Button)
Vue.use(Form)
Vue.use(LocaleProvider)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Layout)
Vue.use(Drawer)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Select)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Modal)
Vue.use(InputNumber)
Vue.use(AutoComplete)
Vue.use(Tooltip)
