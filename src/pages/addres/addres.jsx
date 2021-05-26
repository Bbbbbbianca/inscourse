import React, { Component } from 'react'
import { View, Form, Button, Input, Textarea, Text, Picker } from '@tarojs/components'
import './addres.scss'
import UtilService from "../../services/utils";
import Taro from "@tarojs/taro";
import {APP_ROUTES} from "../../base/constant";

function getCourseId() {
  let course_id = Taro.getCurrentInstance().router.params.id
  if (course_id)
    return course_id
  else {
    Taro.navigateTo({
      url: APP_ROUTES.COURSE
    })
  }
}

export default class addRes extends Component {
  state = {
    selector: ['笔记', '视频', 'pdf', '其他'],
    selectorChecked: ' 点击选择类别',
    addForm: {
      name: '',
      description: '',
      content: ''
    }
  }

  formSubmit = e => {
    // console.log(e.detail.value)
    let request = e.detail.value;
    let token = UtilService.fetchToken();
    let course_id = getCourseId();
    Taro.request({
      url: UtilService.BASE_URL + '/resource/releaseResource',
      header: {
        'Token': token
      },
      data: {
        course_id: course_id,
        resource_key: request.resource_key,
        description: request.description,
        content_type: request.content_type,
        content: request.content
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          UtilService.showHint(res.data.message, '', 'success', 1200)
          Taro.switchTab({
            url: APP_ROUTES.DETAIL + '?id=' + course_id
          })
        } else {
          UtilService.showHint(res.data, '', 'none')
        }
      },
      fail: function (res) {
        // console.log(res);
        UtilService.showHint('发布资源失败', '请稍后再试', 'none');
      }
    })
  }

  formReset () {
    // console.log('bbb')
  }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  render () {
    return (
      <View className='addres'>
        <View className='add-form'>
          <Form onSubmit={this.formSubmit} onReset={this.formReset}>
            <View className='display-row'>
              <View className='tips'>资源名称:</View>
              <View className='input-items'> <Input type='text' name='resource_key' maxlength='20' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>资源介绍:</View>
              <View className='input-items'> <Input type='text' name='description' maxlength='255' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>资源类别:</View>
              <View className='input-items'>
                <Picker mode='selector' name='content_type' range={this.state.selector} onChange={this.onChange}>
                  {this.state.selectorChecked}
                </Picker>
              </View>
            </View>


            <Text className='area'>资源内容:</Text>
            <Textarea name='content' autoFocus />
            <Button size='mini' type='primary' formType='submit'>提交</Button>
            <Button size='mini' formType='reset' >重置</Button>
          </Form>
        </View>
      </View>
    )
  }
}
