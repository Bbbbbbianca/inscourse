export default {
  pages: [
    'pages/index/index',
    'pages/detail/detail',
    'pages/course/course',
    'pages/resource/resource',
    'pages/mine/mine',
    'pages/group/group',
    'pages/dailytask/dailytask',
    'pages/schedule/schedule',
    'pages/addres/addres',
    'pages/addcourse/addcourse'
  ],
  tabBar: {
    backgroundColor: '#E6CEAC',
    list: [
      {
        pagePath: 'pages/mine/mine',
        iconPath: './assets/images/ic_mine_normal.png',
        selectedIconPath: './assets/images/ic_mine_selected.png'
      },
      {
        pagePath: 'pages/course/course',
        iconPath: './assets/images/ic_course_normal.png',
        selectedIconPath: './assets/images/ic_course_selected.png'
      },
      {
        pagePath: 'pages/group/group',
        iconPath: './assets/images/ic_plan_normal.png',
        selectedIconPath: './assets/images/ic_plan_selected.png'
      }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#E6CEAC',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
}
