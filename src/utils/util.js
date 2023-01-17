import moment from 'moment'

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '箭在弦上，不得不发', '我猜你可能累了']
  const index = Math.floor((Math.random() * arr.length))
  return arr[index]
}

export function removeLoadingAnimate (id = '', timeout = 2000) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.getElementById(id).remove()
  }, timeout)
}

export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function format (date, format = 'YYYY-MM-DD HH:MM:SS') {
  if (date) return moment(date).format(format)
  else return moment().format(format)
}
