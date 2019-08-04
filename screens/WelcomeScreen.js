import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDE_DATA = [
  { title: 'Step: 1', text: 'aaa' },
  { title: 'Step: 2', text: 'bbb' },
  { title: 'Step: 3', text: 'ccc' },
];


class WelcomeScreen extends React.Component {
  onStartButtonPress = () => {
    this.props.navigation.navigate('main');
  }
  // renderSlides() {
  //   return SLIDE_DATA.map((slide, index) => {
  //     return (
  //       <View
  //         key={index}
  //         style={{ flex: 1, backgroundColor: 'skyblue', width: SCREEN_WIDTH }}
  //       >
  //         <Text>{slide.title}</Text>
  //         <Text>{slide.text}</Text>
  //       </View>
  //     );
  //   });
  // }
}

export default WelcomeScreen;