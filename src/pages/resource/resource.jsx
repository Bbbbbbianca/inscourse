import Taro from '@tarojs/taro';
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
import {APP_ROUTES} from "../../base/constant";
import UtilService from "../../services/utils";

function getResourseId () {
  let resource_id = Taro.getCurrentInstance().router.params.id
  if (resource_id) {
      return resource_id
  } else {
    Taro.navigateTo({
      url: APP_ROUTES.COURSE
    })
  }
}

export default class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // resource: getResourceDetail(resourse_id)
      resource: {}
    };
    this.getResourseDetail(getResourseId())
  }

  getResourseDetail (id) {
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/resource/queryCertainResource',
      header: {
        'Token': token
      },
      data: {
        'resource_id': id
      },
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data.resource)
          that.setState({
            resource: res.data.resource
          });
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('获取资源信息失败', '请稍后重试', 'fail');
      }
    })
  }

  toShareResource() {
    console.log('to share resource')
    // TO DO
  }

  toStarResource() {
    console.log('to star resource')
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/resource/resourceFav',
      header: {
        'Token': token
      },
      data: {
        'resource_id': that.state.resource.resource_id
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data.message)
          UtilService.showHint(res.data.message, '', 'success')
          that.setState({
            resource: {
              resource_id: that.state.resource.resource_id,
              resource_key: that.state.resource.resource_key,
              description: that.state.resource.description,
              author_name: that.state.resource.author_name,
              favors: that.state.resource.favors + 1,
              prefers: that.state.resource.prefers,
              is_favored: true,
              is_preferred: that.state.resource.is_preferred,
              content_type: that.state.resource.content_type,
              content: that.state.resource.content,
            }
          })
        } else {
          console.log(res)
          UtilService.showHint(res.data.message, '', 'none')
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('收藏资源失败', '请稍后重试', 'fail');
      }
    })
  }
  toCancelStarResource() {
    console.log('to cancel star resource')
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/resource/cancelResourceFav',
      header: {
        'Token': token
      },
      data: {
        'resource_id': that.state.resource.resource_id
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data.message)
          UtilService.showHint(res.data.message, '', 'success')
          that.setState({
            resource: {
              resource_id: that.state.resource.resource_id,
              resource_key: that.state.resource.resource_key,
              description: that.state.resource.description,
              author_name: that.state.resource.author_name,
              favors: that.state.resource.favors - 1,
              prefers: that.state.resource.prefers,
              is_favored: false,
              is_preferred: that.state.resource.is_preferred,
              content_type: that.state.resource.content_type,
              content: that.state.resource.content,
            }
          })
        } else {
          console.log(res)
          UtilService.showHint(res.data.message, '', 'none')
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('取消收藏资源失败', '请稍后重试', 'fail');
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
        author_name: this.state.resource.author_name,
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
        author_name: this.state.resource.author_name,
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
              {' 发布者：' + this.state.resource.author_name}
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
