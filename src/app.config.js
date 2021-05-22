export default {
  pages: [
    'pages/addcourse/addcourse',
    'pages/addres/addres',
    'pages/modifymineinfo/modifymineinfo',
    'pages/mine/mine',
    'pages/detail/detail',
    'pages/course/course',
    'pages/resource/resource',
    'pages/index/index',
    'pages/group/group',
    'pages/dailytask/dailytask',
    'pages/schedule/schedule',
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
