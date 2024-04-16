import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
    };
  }

  componentDidMount() {
    this.getUserEmail();
  }

  getUserEmail = async () => {
    const userEmail = await AsyncStorage.getItem('userEmail');
    this.setState({ userEmail });
  };

  logout = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    this.props.navigation.navigate('Login');
  };

  render() {
    const { userEmail } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to the Home Page!</Text>
        <Text>User Email: {userEmail}</Text>
        <Button title="Logout" onPress={this.logout} />
      </View>
    );
  }
}
