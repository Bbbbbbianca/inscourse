import React, { Component } from 'react'
import {Button, Form, Input, Textarea, View} from '@tarojs/components'
import './modifymineinfo.scss'
import Taro from "@tarojs/taro";
import {APP_ROUTES} from "../../base/constant";
import UtilService from "../../services/utils";

function getParameters() {
  let instance = Taro.getCurrentInstance();
  let email = instance.router.params.email
  let workspace = instance.router.params.workspace
  let username = instance.router.params.username
  if (workspace && email && username)
    return {
      username: username,
      workspace: workspace,
      email: email
    }
  else {
    Taro.navigateTo({
      url: APP_ROUTES.COURSE
    })
  }
}

export default class Mine extends Component {

  state = {
    username: getParameters().username,
    workspace: getParameters().workspace,
    email: getParameters().email
  }

  formSubmit=e=>{
    // console.log(e.detail.value)
    let request = e.detail.value;
    let token = UtilService.fetchToken();
    Taro.request({
      url: UtilService.BASE_URL + '/sys/changeUserInfo',
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
        // console.log(res);
        UtilService.showHint('修改个人信息失败', '请稍后再试', 'none');
      }
    })
  }

  formReset () {
    // console.log('form reset')
  }

  render () {
    return (
      <View className='modifymineinfo'>
        <View className='modify-form'>
          <Form onSubmit={this.formSubmit} onReset={this.formReset}>
            <View className='display-row'>
              <View className='tips'>用户名：</View>
              <View className='input-items'>
                <Input type='text' name='username' maxlength='20' value={this.state.username} />
              </View>
            </View>
            <View className='display-row'>
              <View className='tips'>邮箱：</View>
              <View className='input-items'>
                <Input type='text' name='email' maxlength='255' value={this.state.email} />
              </View>
            </View>
            <View className='display-row'>
              <View className='tips'>学校/公司：</View>
              <View className='input-items'>
                <Input type='text' name='workspace' maxlength='20' value={this.state.workspace} />
              </View>
            </View>
            <Button size='mini' type='primary' formType='submit'>修改</Button>
            <Button size='mini' formType='reset' >重置</Button>
          </Form>
        </View>
      </View>
    )
  }
}
