import React, { Component } from 'react';
import { Text } from 'react-native';

export class Today extends Component{
 render() {
  const now = new Date()
  const year = now.getFullYear();
  const mon = now.getMonth()+1; //１を足すこと
  const day = now.getDate();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const today = year + "年" + mon + "月" + day + "日" + hour + "時" + min + "分" + sec + "秒"; 
  return(
    <Text>{today}</Text>
   )
  }
}
export default Today;