// Home.js

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  logout = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to the Home Page!</Text>
        <Button title="Logout" onPress={this.logout} />
      </View>
    );
  }
}
