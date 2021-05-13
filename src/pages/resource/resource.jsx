import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import './resource.scss'
import sharePic from '../../assets/images/share.png'
import starPic from '../../assets/images/star.png'
import heartPic from '../../assets/images/heart.png'

// TO DO:
// function getResourseId () {
//   if (Taro.getCurrentInstance().router.params.id) {
//       return(Taro.getCurrentInstance().router.params.id)
//     } else {
//     }
// }

// TO DO:
// function getResourseDetail (id) {
// }

export default class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // resource_id: getResourceId(),
      // resource: getResourceDetail(resourse_id)
      resource: {
        resource_id: 3,
        resource_key: '交大网课',
        description: '交大教授讲第四章很好的视频',
        author_id: 11,
        heat: 1109,
        content_type: 2,
        content: 'http://jiaodanb.com',
      }
    };
  }

  toShareResource() {
    console.log('to share resource')
    // TO DO
  }

  toStarResource() {
    console.log('to star resource')
    // TO DO
  }
  toPraiseResource() {
    console.log('to praise resource')
    // TO DO
  }

  render () {
    return (
      <View className='resource'>
        <View className='resource-top'>
          <View className='resource-title'>
            {this.state.resource.resource_key}
          </View>
          <Image
            src={sharePic}
            className='resource-share'
            onClick={()=>{this.toShareResource()}}
          />
        </View>
        <View className='resource-mid'>
          <View className='resource-author'>
            {this.state.resource.author_id}
          </View>
          <View className='resource-dct'>
            {this.state.resource.description}
          </View>
        </View>
        <View className='resource-bottom'>
          <View className='resource-content'>
            {this.state.resource.content}
          </View>
        </View>
        <AtFab className='resource-star'>
          <Image
            src={starPic}
            className='resource-star-img'
            onClick={()=>{this.toStarResource()}}
          />
        </AtFab>
        <AtFab className='resource-praise'>
          <Image
            src={heartPic}
            className='resource-praise-img'
            onClick={()=>{this.toPraiseResource()}}
          />
        </AtFab>
      </View>
    )
  }
}
