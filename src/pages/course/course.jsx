import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
import { APP_ROUTES } from "../../base/constant"
import './course.scss'
import heatPic from '../../assets/images/heat.png'
import CourseService from '../../services/course.service'
import addPic from '../../assets/images/add.png'

export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCourse: '',
      courses: [],
    };
    this.onSearchClick();
  }

  onSearchValueChange (value) {
    this.setState({
      searchCourse: value
    })
  }

  onSearchClick () {
	  console.log('开始搜索');
		CourseService.fetchOpenCourses(this.state.searchCourse, 1, 'default', 1, 5,
                  this)
  }

  updateCourses (courses) {
    this.setState({
      courses: courses
    });
  }

  onViewDetail (id) {
    console.log('view detail of activity' + id)
    Taro.navigateTo({
      url: APP_ROUTES.DETAIL +'?id=' + id
    })
  }

  toAddCourse () {
    console.log('to add course')
    Taro.navigateTo({
      url: APP_ROUTES.ADDCOURSE
    })
  }

  toUnfoldAction() {
    this.setState({
    })
  }
  render () {
    let courses = this.state.courses.map((course)=>{
      return (
        <View
          key={course.course_id}
          className='course-item'
          onClick={()=>{this.onViewDetail(course.course_id)}}
        >
          <Image
            src={'http://localhost:8000/api/course/getCourseIcon?course_id=' + course.course_id}
            className='course-item-img'
          />
          <View className='course-item-text'>
            <View className='course-item-title'>
              {course.name}
            </View>
            <View className='course-item-dct'>
              {course.description}
            </View>
            <View className='course-item-text-bottom'>
              <View className='course-item-heat'>
                {course.heat}
              </View>
              <Image
                src={heatPic}
                className='course-item-heat-img'
              />
            </View>
          </View>
        </View>
      )
    });
    return (
      <View className='course'>
        <View className='course-top'>
          <AtSearchBar
            className='course-search'
            placeholder='输入课程名称'
            value={this.state.searchCourse}
            onChange={this.onSearchValueChange.bind(this)}
            onActionClick={this.onSearchClick.bind(this)}
          />
          <Image
            src={addPic}
            className='course-add'
            onClick={()=>{this.toAddCourse()}}
          />
        </View>
        <View
          className='course-list'
        >
          { courses }
        </View>
      </View>
    )
  }
}
