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
        content: 'hthghhjhasjdas是的撒打算打算打打算的撒打算打算的算法设计风格和救死扶伤就会发觉哈是撒国际法肌肤更加丰富噶肌肤水分感觉啊放个假啊飞就啊会发觉萨法华经发局双方哈哈就放寒假啊算法撒娇还放寒假啊刷手机结束的办法就是东方半山酒店发生大部分还都是不会变粉红色的发布会好的腹背受敌基本都是v北戴河v北戴河v不好的v不到v是绝对不会对该不会是独家发布时间都比较少的好不好都是阿时间撒肌肤撒很烦噶放个假撒过发放给撒回复结果还是哈哈时间发噶海景房噶手机发局双方感觉啊放个假啊飞噶就会更发觉哈是个哈是法国阿时间恢复光滑撒肌肤规划建设法规和撒个哈撒肌肤噶是否感受过会发生感觉啊大家会感觉啊的噶就打电话叫阿说的话就撒都会感觉啊是感动和撒个哈建设规划设计更加伤感的时间大概就是大国家党时光就是感觉海地共和国但还是觉得更好的故事睡觉啊噶姐姐啊干啥就发个红色复古红色不会都是不会的不会打扮更好的不好的不够好hjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaodanb.comhhdshjfsjfhsjfsjdfhksfjhkshfksckjsdhjksjkdh',
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
              {' 发布者：' + this.state.resource.author_id}
            </View>
            <View className='resource-dct'>
              {' 简介：' + this.state.resource.description}
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
