import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './course.scss'

// function getCourses () {
//   // TO DO
// }

export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCourse: '',
      courses: [
        {courseId: 1, courseImg: '', courseName: '数学分析', courseDct: '好学', courseHeat: 234},
        {courseId: 2, courseImg: '', courseName: '线性代数', courseDct: '好学', courseHeat: 834},
        {courseId: 3, courseImg: '', courseName: '大学物理', courseDct: '好学', courseHeat: 254}
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
          <View
            className='course-item-title'
          >
            {course.courseName}
          </View>
          <View
            className='course-item-dct'
          >
            {course.courseDct}
          </View>
          <View
            className='course-item-heat'
          >
            {course.courseHeat}
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
