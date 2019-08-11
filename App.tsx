import React from 'react';
import { StyleSheet, Text, View, Button, Platform, Image, StatusBar } from 'react-native';
import Today from './component/date'
import { createAppContainer,　createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation'; // ←追記部分
import HomeScreen from './screens/HomeScreen'; 
import AddScreen from './screens/AddScreen'; 
import DetailScreen from './screens/DetailScreen'; 
import ProfileScreen from './screens/ProfileScreen'; 
//import WelcomeScreen from './screens/WelcomeScreen'; 
import Setting1Screen from './screens/Setting1Screen'; 
import Setting2Screen from './screens/Setting2Screen'; 

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
      add: { 
        screen: AddScreen,
        navigationOptions: {
          header: null
        }
      }
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
        homeStack: { 
          screen: HomeStack,
          navigationOptions: {
            tabBarIcon: ({ tintColor: tintColor }) => (
              <Image 
                style = {{height: 25, width: 25, tintColor: tintColor}}
                source={require('./assets/home.png')}
              />
            ),
            title: 'Home'
          }

        },
        addStack: {
          screen: AddStack,
          navigationOptions: {
            tabBarIcon: () => (
              <Image 
                style = {{height: 60, width: 60, tintColor: 'deepskyblue'}}
                source = {require('./assets/add.png')}
              />
            ),
            title: ''
          }
        },
        profileStack: {
          screen: ProfileStack,
          navigationOptions: {
            tabBarIcon: ({ tintColor: tintColor }) => (
              <Image
                style = {{height: 25, width: 25, tintColor: tintColor}}
                source = {require('./assets/profile.png')}
              />
            ),
            title: 'profileStack'
          },
          swipeEnabled: false,
      },
      });

    const NavigatorTab = createAppContainer(
      createSwitchNavigator({
        //welcome: { screen: WelcomeScreen },
        main: { screen: MainTab }
      })
    )
    return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content'/>
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