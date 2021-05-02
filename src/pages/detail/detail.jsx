import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
// import Taro from '@tarojs/taro'
import './detail.scss'
import heatPic from '../../assets/images/heat.png'

// TO DO:
// function getCourseDetail (id) {
// }

// function getCourseId () {
//   if (Taro.getCurrentInstance().router.params.id) {
//       return(Taro.getCurrentInstance().router.params.id)
//     } else {
//     }
// }

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   course_id: getCourseId(),
    //   course: getCourseDetail(course_id),
      course: {
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
    };
  }
  


  render () {
    return (
      <View className='detail'>
        <View className='detail-course-msg'>
          <Image
            src={this.state.course.image_path}
            className='course-course-msg-img'
          />
          <View className='course-course-msg-text'>
            <View className='course-course-msg-top-part'>
              <View className='course-course-msg-title'>
                {this.state.course.name}
              </View>
            </View>
            <View className='course-course-msg-dct'>
              {this.state.course.description}
            </View>
            <View className='course-course-msg-bottom-part'>
              <View className='course-item-heat'>
                {this.state.course.heat}
              </View>
              <Image
                src={heatPic}
                className='course-item-heat-img'
              />
            </View>
          </View>
        </View>
        <View className='detail-relevant'>
          <View className='detail-choice'>

          </View>
          <View className='detail-material'>
          
          </View>
          <View className='detail-car'>
          
          </View>  
        </View>
      </View>
    )
  }
}
