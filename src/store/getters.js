const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  accessToken: state => state.user.accessToken,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  nickname: state => state.user.info.user_name || state.user.info.s_name || state.user.info.t_name,
  welcome: state => state.user.welcome,
  roleTitle: state => {
    const roles = state.user.roles
    switch (roles) {
      case 'ADMIN':
        return '管理员'
      case 'STUDENT':
        return '学生'
      case 'TEACHER':
        return '教师'
    }
  },
  accountTitle: state => {
    const roles = state.user.roles
    switch (roles) {
      case 'ADMIN':
        return '账号'
      case 'STUDENT':
        return '学号'
      case 'TEACHER':
        return '工号'
    }
  }
}
export default getters
