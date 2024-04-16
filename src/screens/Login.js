import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true,
    };
  }

  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.props.navigation.navigate('Home');
    }
  };

  InsertRecord = async () => {
    var Email = this.state.email;
    var Password = this.state.password;

    if (Email.length === 0 || Password.length === 0) {
      alert('Required Field Is Missing!!!');
    } else {
      var APIURL = 'http://192.168.8.119/reactcheck/login.php';

      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      var Data = {
        Email: Email,
        Password: Password,
      };

      fetch(APIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((Response) => Response.json())
        .then(async (Response) => {
          alert(Response[0].Message);
          if (Response[0].Message == 'Success') {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('userEmail', Email);
            this.props.navigation.navigate('Home', { userEmail: Email });
          }
        })
        .catch((error) => {
          console.error('ERROR FOUND' + error);
        });
    }
  };

  updateSecureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome back!</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                onChangeText={(email) => this.setState({ email })}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  autoCorrect={false}
                  onChangeText={(password) => this.setState({ password })}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl1}
                  secureTextEntry={this.state.secureTextEntry ? true : false}
                />
                <TouchableOpacity
                  style={{ marginLeft: -30 }}
                  onPress={this.updateSecureTextEntry.bind(this)}>
                  {this.state.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="black" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={() => {
                  this.InsertRecord();
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                // Navigate to the main screen when the CTA is tapped
                navigation.navigate('Registration');
              }}>
              <Text style={styles.formFooter}>
                Don't have an account?{' '}
                <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Form */
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputControl1: {
    height: 44,
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});
