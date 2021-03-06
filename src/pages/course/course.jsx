import React, { Component } from 'react'
import { View, Image, Text, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
import { APP_ROUTES } from "../../base/constant"
import './course.scss'
import heatPic from '../../assets/images/heat.png'
import CourseService from '../../services/course.service'
import actionPic from '../../assets/images/action.png'

// TO DO:
// function getCourses () {
// }

export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCourse: '',
      unfoldActionVisible: false,
      acceptIvtDialogVisible: false,
      joinCode: '',
      // courses: getCourses(),
      courses: [
        {
          course_id: 1, 
          author_id: 1, 
          status: 1,
          image_path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg', 
          name: '数学分析', 
          description: '好学啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦', 
          heat: 234,
          level: 9,
          category: 1
        },
        {
          course_id: 2, 
          author_id: 2, 
          status: 1,
          image_path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg', 
          name: '线性代数', 
          description: '学得很快乐', 
          heat: 834,
          level: 7,
          category: 1
        },
        {
          course_id: 3, 
          author_id: 3, 
          status: 1,
          image_path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg', 
          name: '大学物理', 
          description: '这你不能不会吧', 
          heat: 254,
          level: 5,
          category: 1
        }
      ],
    };
  }

  onSearchValueChange(value) {
    this.setState({
      searchCourse: value
    })
    console.log(this.state.searchCourse)
  }

  onSearchClick() {
    // TO DO
	  console.log('开始搜索');
	  this.setState({
		  courses: CourseService.fetchOpenCourses('', 1, 'default', 1, 5)
	  });
  }

  onViewDetail(id) {
    console.log('view detail of activity' + id)
    Taro.navigateTo({
      url: APP_ROUTES.DETAIL +'?id=' + id
    })
  }

  toAddCoursePage() {
    console.log('to add course')
    Taro.navigateTo({
      url: APP_ROUTES.ADDCOURSE
    })
  }

  toAcceptIvtDialog() {
    console.log('to accept course')
    this.setState({
      unfoldActionVisible: false,
      acceptIvtDialogVisible: true,
      joinCode: ''
    })
  }

  tounfoldActionVisible() {
    this.setState({
      unfoldActionVisible: true
    })
  }

  handleActionClose() {
    this.setState({
      unfoldActionVisible: false
    })
  }

  onChangeJoinCode = e => {
    let value = e.detail.value
    this.setState({
      joinCode: value
    })
    console.log(this.state.joinCode)
  }

  toAcceptInvitation() {
    console.log('to accept invitation')
    this.setState({
      acceptIvtDialogVisible: false
    })
    // TO DO
    console.log(this.state.joinCode)
  }

  toCancelAcceptInvitation() {
    console.log('cancel accept invitation')
    this.setState({
      acceptIvtDialogVisible: false
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
            src={course.image_path}
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
            src={actionPic}
            className='course-action'
            onClick={this.tounfoldActionVisible.bind(this)}
          />
        </View>
        <View
          className='course-list'
        >
          { courses }
        </View>
        <View>
        {
          this.state.unfoldActionVisible
          ?
          <View onClick={this.handleActionClose.bind(this)}>
            <View className='course-mask' />
            <View className='course-layout'>
              <View
                className='course-layout-accept'
                onClick={this.toAcceptIvtDialog.bind(this)}
              >
                输入邀请码
              </View>
              <View
                className='course-layout-add'
                onClick={this.toAddCoursePage.bind(this)}
              >
                添加课程
              </View>
            </View>
          </View>
          :
          null
        }
        </View>
        <View>
        {
          this.state.acceptIvtDialogVisible
          ?
          <View>
          <View className='course-mask' />
          <View className='course-form'>
            <Text className='course-form-text'>
              请输入邀请码：
            </Text> 
            <Textarea
              className='course-form-input'
              value={this.state.joinCode}
              onInput={this.onChangeJoinCode}
            />
            <View className='course-form-button'>
              <View 
                className='course-form-comfirm'
                onClick={()=>{this.toAcceptInvitation()}}
              >
                确定
              </View> 
              <View className='course-form-cancel'
                onClick={()=>{this.toCancelAcceptInvitation()}}
              >
                取消
              </View> 
            </View>  
          </View>
          </View>
          :
          null
        }
        </View>
      </View>
    )
  }
}
