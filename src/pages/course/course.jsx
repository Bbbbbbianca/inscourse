import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
import { APP_ROUTES } from "../../base/constant"
import './course.scss'
import heatPic from '../../assets/images/heat.png'

// TO DO:
// function getCourses () {
// }

export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCourse: '',
      // courses: getCourses(),
      courses: [
        {
          course_id: 1, 
          author_id: 1, 
          status: 1,
          image_path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg', 
          name: '数学分析', 
          description: '好学', 
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

  onViewDetail (id) {
    console.log('view detail of activity' + id)
    Taro.navigateTo({
      url: APP_ROUTES.DETAIL +'?id=' + id
    })
  }

  render () {
    let courses = this.state.courses.map((course)=>{ 
      return (
        <View
          key={course.course_id}
          className='course-item'
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
            <View className='course-item-heat-part'>
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
