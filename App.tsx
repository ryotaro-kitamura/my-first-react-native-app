import React from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import Today from './component/date'
import { createAppContainer,　createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation'; // ←追記部分
import HomeScreen from './screens/HomeScreen'; // ←追記部分
import AddScreen from './screens/AddScreen'; // ←追記部分
import DetailScreen from './screens/DetailScreen'; // ←追記部分
import ProfileScreen from './screens/ProfileScreen'; // ←追記部分
//import WelcomeScreen from './screens/WelcomeScreen'; // ←追記部分
import Setting1Screen from './screens/Setting1Screen'; // ←追記部分
import Setting2Screen from './screens/Setting2Screen'; // ←追記部分

export default class App extends React.Component {
  render(){
    const headerNavigationOptions = {
      headerStyle:{
        backgroundColor: 'deepskyblue',
        marginTop: (Platform.OS === 'android' ? 24 : 0 )
      },
      headerTitleStyle: { color: 'white' },
      headerTintStyle: 'white',
    }

    const HomeStack = createStackNavigator({
      home: { 
        screen: HomeScreen,
        navigationOptions:{
          ...headerNavigationOptions,
          headerTitle: 'Treco',
          headerBackTitle: 'Home'
        },
       },
      detail: { 
        screen: DetailScreen,
        navigationOptions:{
          ...headerNavigationOptions,
          headerTitle: 'Detail',
        }

       },
    });

    HomeStack.navigationOptions = ({ navigation }) => {
      return{
        tabBarVisible: (navigation.state.index === 0)
      };
    }

    const AddStack = createStackNavigator({
      add: { screen: AddScreen }
    });

    AddStack.navigationOptions = ({ navigation }) => {
      return{
        tabBarVisible: (navigation.state.index === -1)
      }
    }

    const ProfileStack = createStackNavigator({
      profile: { screen: ProfileScreen },
      setting1: { screen: Setting1Screen },
      setting2: { screen: Setting2Screen },
    });

    ProfileStack.navigationOptions = ({ navigation }) => {
      return{
        tabBarVisible: (navigation.state.index === 0)
      };
    }


    const MainTab = createBottomTabNavigator(
      {
        homeStack: { screen: HomeStack },
        addStack: { screen: AddStack },
        profileStack: { screen: ProfileStack },
      });

    const NavigatorTab = createAppContainer(
      createSwitchNavigator({
        //welcome: { screen: WelcomeScreen },
        main: { screen: MainTab }
      })
    )
    return (
    <View style={styles.container}>
      <NavigatorTab />
    </View>
  )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // ↓この文消さないと`react-navigation`が上手く動かず、画面真っ白になっちゃう
    //alignItems: 'center',
    justifyContent: 'center',
  },
});