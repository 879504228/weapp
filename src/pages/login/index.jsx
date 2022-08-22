import { View, Text, Input, Button } from '@tarojs/components'
import { useState, createRef } from 'react'
//import styles from "./index.module.scss";
import './index.less'



const Login = () => {

  const [disabled, setDisabled] = useState(false);
  const [txt, setTxt] = useState('获取验证码');
  const [msg] = useState('已发送至');

  const ref = createRef();

  const getCode = async () => {

    //不能多次提交
    if (disabled) return;
    console.log(ref.current)
    //发送请求
    await request();
    //倒计时（参数一：计时多少秒 参数二：计时结束的回调）
    timer(3);
    return;
  }

  //模拟请求
  const request = async () => {
    console.log('1')
    //setLoading(true);
    await sleep(1000);
    setDisabled(true);
    console.log('2')
  }

  //倒计时
  const timer = (t) => {
    let time = setInterval(() => {
      if (t == 0) {
        setDisabled(false);
        setTxt('获取验证码');
        clearInterval(time);
        return
      }
      setTxt(t + '秒后重新获取');
      t--;
    }, 1000);
  }

  //工具函数，睡眠，暂时放一个文件内
  const sleep = (timeountMS) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeountMS);
    });
  }

  const [focus, setFocus] = useState(1);



  const change = () => {
    if (focus < 5) {
      setFocus(focus + 1)
      console.log(focus)
    }
  }

  document.onkeydown = function (event) {
    if (event.detail.keyCode == 8) {
      setFocus(focus - 1)
    }
  }

  return (
    <View className='content'>
      <Text>验证码</Text>
      <View className='input'>
        <Input className='iphone' ref={ref}></Input>
        <Button className='bnt'
          onClick={getCode}
          disabled={disabled}
          plain={disabled}
        >{txt}</Button>
      </View>
      <Text className='msg'>{msg}</Text>
      <View className='codeBox'>
        <Input className='codeText' onInput={change} focus={focus == 1}></Input>
        <Input className='codeText' onInput={change} focus={focus == 2} ></Input>
        <Input className='codeText' onInput={change} focus={focus == 3}></Input>
        <Input className='codeText' maxlength='1' onInput={change} focus={focus == 4}></Input>
      </View>
    </View>
  )
}

export default Login