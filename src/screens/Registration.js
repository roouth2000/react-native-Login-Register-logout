import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPw: '',
      secureTextEntry: true,
      confirmSecureTextEntry: true
    };
  }

  updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  }

  updateConfirmSecureTextEntry = () => {
    this.setState({
      confirmSecureTextEntry: !this.state.confirmSecureTextEntry
    });
  }

  InsertRecord=()=>{
    var Email = this.state.email;
    var Password = this.state.password;
    var ConfirmPw = this.state.confirmPw;
    var checkEmail = RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i);
  
    if ((Email.length==0) || (Password.length==0) || (ConfirmPw.length==0)){
      alert("Required Field Is Missing!!!");
    }else if (!(checkEmail).test(Email)){
      alert("invalid email!!!");
    }
    // Password validations
    else if (Password.length<8){
      alert("Minimum 08 characters required!!!");
    }else if (!((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(Password))){
      alert("Use atleast 01 special character!!!");
    }else if (((/[ ]/).test(Password))){
      alert("Don't include space in password!!!");
    }else if(Password !== ConfirmPw){
      alert("Password doesnot match!!!");
    }
    
    
    else{
      var InsertAPIURL = "http://192.168.8.119/reactcheck/SignUp.php";   //API to render signup

      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      var Data ={
        Email: Email,
        Password: Password
      };

    // FETCH func ------------------------------------
    fetch(InsertAPIURL,{
        method:'POST',
        headers:headers,
        body: JSON.stringify(Data) //convert data to JSON
    })
    .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
    .then((response)=>{
      alert(response[0].Message);       // If data is in JSON => Display alert msg
      this.props.navigation.navigate("Login"); //Navigate to next screen if authentications are valid
    })
    .catch((error)=>{
        alert("Error Occured" + error);
    })
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerBack}>
              <FeatherIcon
                color="#1D2A32"
                name="chevron-left"
                size={30}
                onPress={() => {
                  // Navigate to the main screen when the CTA is tapped
                  navigation.navigate('Login')
                }}
              />
            </View>

            <Text style={styles.title}>Let's Get Started!</Text>

            <Text style={styles.subtitle}>
              Fill in the fields below to get started with your new account.
            </Text>
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
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordInput}>
                <TextInput
                  autoCorrect={false}
                  onChangeText={password => this.setState({ password })}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl1}
                  secureTextEntry={this.state.secureTextEntry}
                />
                <TouchableOpacity
                  onPress={this.updateSecureTextEntry}
                >
                  <FeatherIcon
                    name={this.state.secureTextEntry ? "eye-off" : "eye"}
                    color="grey"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.passwordInput}>
                <TextInput
                  autoCorrect={false}
                  onChangeText={confirmPw => this.setState({ confirmPw })}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl1}
                  secureTextEntry={this.state.confirmSecureTextEntry}
                />
                <TouchableOpacity
                  onPress={this.updateConfirmSecureTextEntry}
                >
                  <FeatherIcon
                    name={this.state.confirmSecureTextEntry ? "eye-off" : "eye"}
                    color="grey"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={this.InsertRecord}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign up</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                // Navigate to the main screen when the CTA is tapped
                navigation.navigate('Login')
              }}>
              <Text style={styles.formFooter}>
                All ready have an account?{' '}
                <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
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
    flex: 1,
    backgroundColor: '#e8ecf4',
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
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
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
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
