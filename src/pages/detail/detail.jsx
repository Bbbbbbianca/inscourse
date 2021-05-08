import React, { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'
// import Taro from '@tarojs/taro'
import './detail.scss'
import heatPic from '../../assets/images/heat.png'

// TO DO:
// function getCourseDetail (id) {
// }

// TO DO:
// function getCourseId () {
//   if (Taro.getCurrentInstance().router.params.id) {
//       return(Taro.getCurrentInstance().router.params.id)
//     } else {
//     }
// }

// TO DO:
// function getresources (id) {
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
        description: '好学好学好学真的很好学，一学就会真的不是盖的', 
        heat: 234,
        level: 9,
        category: 1
      },
    // resources: getresources(course_id)
      resources: [
        {
          resource_id: 1,
          resource_key: '一份学习笔记',
          description: '学习整理了第二章的内容，欢迎取用～',
          author_id: 1,
          heat: 577,
          content_type: 1,
          content: '1.数学分析是学不会的 2.数学分析是听不懂的 3.数学分析是要人命的',
        },
        {
          resource_id: 2,
          resource_key: '教材资料',
          description: '第三版的pdf版本，拿下留赞',
          author_id: 8,
          heat: 9,
          content_type: 2,
          content: '复制这段话粘贴到百度网盘···',
        },
        {
          resource_id: 3,
          resource_key: '交大网课',
          description: '交大教授讲第四章很好的视频',
          author_id: 11,
          heat: 1109,
          content_type: 2,
          content: 'http://jiaodanb.com',
        }
      ],
    };
  }
  
  toJoinCourse(id) {
    console.log('join' + id)
    // TO DO
  }


  render () {
    let resources = this.state.resources.map((resource)=>{ 
      return (
        <View
          key={resource.course_id}
          className='detail-resource-item'
          onClick={()=>{this.onViewDetail(resource.resource_id)}}
        >
          <View className='detail-resource-item-title'>
            {resource.resource_key}
          </View>
          <View className='detail-resource-item-dct'>
            {resource.description}
          </View>
          <View className='detail-resource-item-bottom'>
            <View className='detail-resource-item-heat'>
              {resource.heat}
            </View>
            <Image
              src={heatPic}
              className='detail-resource-item-heat-img'
            />
          </View>
        </View>
      )
    });
    return (
      <View className='detail'>
        <View className='detail-msg'>
          <Image
            src={this.state.course.image_path}
            className='detail-msg-img'
          />
          <View className='detail-msg-text'>
            <View className='detail-msg-text-top'>
              <View className='detail-msg-title'>
                {this.state.course.name}
              </View>
              <Button 
                onClick={()=>{this.toJoinCourse(this.state.course.course_id)}}
                className='detail-msg-button-join'
              > 
                加入
              </Button>
            </View>
            <View className='detail-msg-dct'>
              {this.state.course.description}
            </View>
            <View className='detail-msg-text-bottom'>
              <View className='detail-msg-heat'>
                {this.state.course.heat}
              </View>
              <Image
                src={heatPic}
                className='detail-msg-heat-img'
              />
            </View>
          </View>
        </View>
        <View className='detail-relevant'>
          <View className='detail-choice'>
            <View className='detail-choice-resource'>
              资源
            </View>
            <View className='detail-choice-car'>
              课友
            </View>
          </View>
          <View className='detail-resource'>
            <View className='detail-resource-type'>

            </View>
            <View className='detail-resource-list'>
              { resources }
            </View>
          </View>
          <View className='detail-car'>
          
          </View>  
        </View>
      </View>
    )
  }
}
