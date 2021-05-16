import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import './resource.scss'
import sharePic from '../../assets/images/share.png'
import starPic from '../../assets/images/star.png'
import heartPic from '../../assets/images/heart.png'
import preferPic from '../../assets/images/prefer.png'
import favorPic from '../../assets/images/favor.png'
import starSelectedPic from '../../assets/images/star_selected.png'
import heartSelectedPic from '../../assets/images/heart_selected.png'

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
        description: '较大时间和大家是否感觉撒发噶看到时代峰峻华盛顿附近算法算法大家看哈就是废话即使对方是否接受',
        author_id: 11,
        favors: 1109,
        prefers: 111,
        is_favored: false,
        is_preferred: false,
        content_type: 2,
        content: 'hthghhjhjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaodanb.comhhdshjfsjfhsjfsjdfhksfjhkshfksckjsdhjksjkdh',
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
    this.setState({
      resource: {
        resource_id: this.state.resource.resource_id,
        resource_key: this.state.resource.resource_key,
        description: this.state.resource.description,
        author_id: this.state.resource.author_id,
        favors: this.state.resource.favors + 1,
        prefers: this.state.resource.prefers,
        is_favored: true,
        is_preferred: this.state.resource.is_preferred,
        content_type: this.state.resource.content_type,
        content: this.state.resource.content,
      }
    })
  }
  toCancelStarResource() {
    console.log('to cancel star resource')
    // TO DO
    this.setState({
      resource: {
        resource_id: this.state.resource.resource_id,
        resource_key: this.state.resource.resource_key,
        description: this.state.resource.description,
        author_id: this.state.resource.author_id,
        favors: this.state.resource.favors - 1,
        prefers: this.state.resource.prefers,
        is_favored: false,
        is_preferred: this.state.resource.is_preferred,
        content_type: this.state.resource.content_type,
        content: this.state.resource.content,
      }
    })
  }
  toPraiseResource() {
    console.log('to praise resource')
    // TO DO
    this.setState({
      resource: {
        resource_id: this.state.resource.resource_id,
        resource_key: this.state.resource.resource_key,
        description: this.state.resource.description,
        author_id: this.state.resource.author_id,
        favors: this.state.resource.favors,
        prefers: this.state.resource.prefers + 1,
        is_favored: this.state.resource.is_favored,
        is_preferred: true,
        content_type: this.state.resource.content_type,
        content: this.state.resource.content,
      }
    })
  }
  toCancelPraiseResource() {
    console.log('to cancel praise resource')
    // TO DO
    this.setState({
      resource: {
        resource_id: this.state.resource.resource_id,
        resource_key: this.state.resource.resource_key,
        description: this.state.resource.description,
        author_id: this.state.resource.author_id,
        favors: this.state.resource.favors,
        prefers: this.state.resource.prefers - 1,
        is_favored: this.state.resource.is_favored,
        is_preferred: false,
        content_type: this.state.resource.content_type,
        content: this.state.resource.content,
      }
    })
  }

  render () {
    return (
      <View className='resource'>
        <View className='resource-card'>
          <View className='resource-top'>
            <View className='resource-title'>
              {this.state.resource.resource_key}
            </View>
            <View className='resource-author'>
              {'发布者：' + this.state.resource.author_id}
            </View>
            <View className='resource-dct'>
              {'简介：' + this.state.resource.description}
            </View>
          </View>
          <View className='resource-mid'>
            <View className='resource-content'>
              {this.state.resource.content}
            </View>
          </View>
          <View className='resource-bottom'>
            <View className='resource-heat'>
              <View className='resource-heat-num'>
                {this.state.resource.prefers}
              </View>
              <Image
                src={preferPic}
                className='resource-heat-img'
              />
              <View className='resource-heat-num'>
                {this.state.resource.favors}
              </View>
              <Image
                src={favorPic}
                className='resource-heat-img'
              />
            </View>
          </View>
        </View>
        
        <AtFab className='resource-share'>
          <Image
            src={sharePic}
            className='resource-share-img'
            onClick={()=>{this.toShareResource()}}
          />
        </AtFab>
        {
          this.state.resource.is_favored
          ?
          <AtFab className='resource-star'>
            <Image
              src={starSelectedPic}
              className='resource-star-img'
              onClick={()=>{this.toCancelStarResource()}}
            />
          </AtFab>
          :
          <AtFab className='resource-star'>
            <Image
              src={starPic}
              className='resource-star-img'
              onClick={()=>{this.toStarResource()}}
            />
          </AtFab>
        }
        {
          this.state.resource.is_preferred
          ?
          <AtFab className='resource-praise'>
            <Image
              src={heartSelectedPic}
              className='resource-praise-img'
              onClick={()=>{this.toCancelPraiseResource()}}
            />
          </AtFab>
          :
          <AtFab className='resource-praise'>
            <Image
              src={heartPic}
              className='resource-praise-img'
              onClick={()=>{this.toPraiseResource()}}
            />
          </AtFab>
        }
      </View>
    )
  }
}
