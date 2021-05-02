import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './course.scss'
import heatPic from '../../assets/images/heat.png'

// function getCourses () {
//   // TO DO
// }

export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCourse: '',
      // courses: getCourses(),
      courses: [
        {courseId: 1, courseImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg', courseName: '数学分析', courseDct: '好学', courseHeat: 234},
        {courseId: 2, courseImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg', courseName: '线性代数', courseDct: '学得很快乐', courseHeat: 834},
        {courseId: 3, courseImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg', courseName: '大学物理', courseDct: '这你不能不会吧', courseHeat: 254}
      ],
    }
  }

  onSearchValueChange (value) {
    this.setState({
      searchCourse: value
    })
    console.log(this.state.searchCourse)
  }

  onSearchClick () {
    // TO DO
    console.log('开始搜索')
  }

  render () {
    let courses = this.state.courses.map((course)=>{ 
      return (
        <View
          key={course.courseId}
          className='course-item'
        >
          <Image
            src={course.courseImg}
            className='course-item-img'
          />
          <View className='course-item-text'>
            <View className='course-item-title'>
              {course.courseName}
            </View>
            <View className='course-item-dct'>
              {course.courseDct}
            </View>
            <View className='course-item-heat-part'>
              <Image
                src={heatPic}
                className='course-item-heat-img'
              />
              <View className='course-item-heat'>
                {course.courseHeat}
              </View>
            </View>
          </View>
        </View>  
      )
    });
    return (
      <View className='course'>
        <AtSearchBar
          className='course-search'
          showActionButton
          placeholder='输入课程名称'
          value={this.state.searchCourse}
          onChange={this.onSearchValueChange.bind(this)}
          onActionClick={this.onSearchClick.bind(this)}
        />
        <View
          className='course-list'
        >
          { courses }
        </View>
      </View>
    )
  }
}
