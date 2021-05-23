import React, { Component } from 'react'
import {Button, Form, Input, Picker, Text, Textarea, View} from '@tarojs/components'
import './addcourse.scss'
import UtilService from "../../services/utils";
import Taro from "@tarojs/taro";
import {APP_ROUTES} from "../../base/constant";

export default class addCourse extends Component {
  formSubmit = e => {
    console.log(e.detail.value)
    let request = e.detail.value;
    let token = UtilService.fetchToken();
    Taro.request({
      url: UtilService.BASE_URL + '/course/uploadCourse',
      header: {
        'Token': token
      },
      data: request,
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          UtilService.showHint(res.data.message, '', 'success', 1200)
          Taro.switchTab({
            url: APP_ROUTES.MINE
          })
        } else {
          UtilService.showHint(res.data, '', 'none')
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('新建课程失败', '请稍后再试', 'none');
      }
    })
  }

  formReset () {
    console.log('form reset')
  }

  state = {
    // (0->计算机, 1->数学, 2->法律, 3->医学, 4->其他)
    selector: ['计算机', '数学', '法律', '医学','其他'], // TODO
    selectorChecked: '点击选择类别'
  }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  render () {
    return (
      <View className='addcourse'>
        <View className='add-form'>
          <Form onSubmit={this.formSubmit} onReset={this.formReset}>
            <View className='display-row'>
              <View className='tips'>课程名称:</View>
              <View className='input-items'> <Input type='text' name='name' maxlength='20' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>课程简称:</View>
              <View className='input-items'> <Input type='text' name='short_name' maxlength='4' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>课程类别:</View>
              <View className='input-items'>
                <Picker mode='selector' name='category' range={this.state.selector} onChange={this.onChange}>
                  {this.state.selectorChecked}
                </Picker>
              </View>
            </View>
            <Text className='area'>课程简介:</Text>
            <Textarea name='description' autoFocus />
            <Button size='mini' type='primary' formType='submit'>提交</Button>
            <Button size='mini' formType='reset' >重置</Button>
          </Form>
        </View>
      </View>
    )
  }
}
