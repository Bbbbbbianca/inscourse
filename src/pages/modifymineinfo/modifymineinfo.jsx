import React, { Component } from 'react'
import {Button, Form, Input, Textarea, View} from '@tarojs/components'
import './mine.scss'

export default class Mine extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit () {
    console.log('form submit')
  }

  formReset () {
    console.log('form reset')
  }

  // state = {
  //   selector: ['语文', '数学', '英语', '计算机','其他'],
  //   selectorChecked: '点击选择类别'
  // }

  // onChange = e => {
  //   this.setState({
  //     selectorChecked: this.state.selector[e.detail.value]
  //   })
  // }

  render () {
    return (
      <View className='modifymineinfo'>
        <View className='modify-form'>
          <Form onSubmit={this.formSubmit} onReset={this.formReset}>
            {/*<Text className='title'>发布资源：</Text>*/}
            <Input type='text' placeholder='输入用户名' maxlength='20' />
            <Input type='text' placeholder='输入电子邮箱' maxlength='255' />
            <Input type='text' placeholder='输入学校' maxlength='20' />
            {/*<Picker mode='selector' range={this.state.selector} onChange={this.onChange}>*/}
            {/*  <View className='picker'>*/}
            {/*    <Text className='classification'>选择类别：{this.state.selectorChecked}</Text>*/}
            {/*  </View>*/}
            {/*</Picker>*/}
            {/*<Text className='area'>资源内容:</Text>*/}
            <Textarea autoFocus />
            <Button size='mini' type='primary' formType='submit'>修改</Button>
            <Button size='mini' formType='reset' >重置</Button>
          </Form>
        </View>
      </View>
    )
  }
}
