import React from 'react'
import {StyleSheet, View, TextInput, Text, Alert, Pressable, Keyboard, TouchableWithoutFeedback, ScrollView, ActivityIndicator} from 'react-native'
import firebase from '../api/firebase/firebase'
import * as Font from 'expo-font';

let customFonts = {
    'Cassanet': require('../assets/fonts/cassannet_plus_regular.ttf'),
    'Mont-Bold' : require("../assets/fonts/Montserrat-Bold.ttf"),
    'Montserrat' : require("../assets/fonts/Montserrat-Medium.ttf"),
    'Superstar-M54' : require("../assets/fonts/Superstar-M54.ttf"),
    'Robinson' : require("../assets/fonts/Robinson-Regular.otf"),
    'numb3rs' : require("../assets/fonts/numbrs-regular-webfont.ttf"),
    'Leaner' : require("../assets/fonts/Leaner-Thin.ttf"),
    'RobOut' : require("../assets/fonts/Robinson-Outline.otf"),
  };
  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
export default class SignIn extends React.Component {
    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        fontsLoaded: false,
    };
    
    _loadFontsAsync = async () => {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    
    componentDidMount() {
        this._loadFontsAsync();
    }

    emailHandler = email => {
        this.setState({email})
    };

    passwordHandler = password => {
        this.setState({password})
    };

    emailValidation = () => {
        if (this.state.email === '') {
            this.setState({emailError: true});
            return false
        }
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let reCheck = re.test(this.state.email);
        if (reCheck) {
            this.setState({emailError: false});
            return true
        } else {
            this.setState({emailError: true});
            return false
        }
    };

    passwordValidation = () => {
        if (this.state.password.length < 8) {
            this.setState({passwordError: true});
            return false
        } else {
            this.setState({passwordError: false});
            return true
        }
    };

    onLogin = () => {
        const email = this.emailValidation();
        const password = this.passwordValidation();
        if (email && password) {
            this.setState({
                isLoading: true,
            });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res);
                    console.log('Successful login.');
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    });
                    this.props.navigation.navigate('App')
                })
                .catch(error => {
                    Alert.alert(
                        "Error",
                        `${error}`,
                        [
                            { text: "OK", onPress: () => this.props.navigation.navigate('Auth') }
                        ],
                        { cancelable: true }
                    );
                })
        } else {
            if (!email) {
                this.setState({emailError: true})
                console.log('emailError')
            }
            if (!password) {
                this.setState({passwordError: true})
                console.log('passwordError')
            }
        }
    };

    userLogin = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to sign in!')
        } else {
            this.setState({
                isLoading: true,
            });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res);
                    console.log('Successful login.');
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    });
                    this.props.navigation.navigate('Home')
                })
                .catch(error => this.setState({errorMessage: error.message}))
        }
    }

    goToSignup = () => this.props.navigation.navigate('SignUp');

    render() {
        // if (this.state.fontsLoaded) {
        //     return (
        //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //         <Text>Platform Default</Text>
        //         <Text style={{ fontFamily: 'RobOut' }}>Inter Black</Text>
        //         {/* <Text style={{ fontFamily: 'Inter-SemiBoldItalic' }}>Inter SemiBoldItalic</Text> */}
        //       </View>
        //     );
        //   } else {
        //     return <AppLoading />;
        //   }
        
        if(!this.state.fontsLoaded){
            return(
              <View style={styles.container}>
                <ActivityIndicator />
              </View>
            )
          }

        return (   
            // <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' style={styles.container}>
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.topText}>2048</Text>
                </View>
                <DismissKeyboard>
                <View style={styles.bottom}>
                    <TextInput
                    style={styles.inputView}
                        keyboardAppearance='dark'
                        name='email'
                        value={this.state.email}
                        placeholder='email...'
                        placeholderTextColor="#7d7d7d"
                        autoCapitalize='none'
                        onChangeText={this.emailHandler}
                        onBlur={() => this.emailValidation()}
                    />
                    <Text
                        style={styles.error}>
                        {this.state.emailError ? 'wrong input' : ''}
                    </Text>
                    <TextInput
                        keyboardAppearance='dark'
                        style={styles.inputView}
                        name='password'
                        value={this.state.password}
                        placeholder='password...'
                        placeholderTextColor="#7d7d7d"
                        secureTextEntry
                        onChangeText={this.passwordHandler}
                        osnBlur={() => this.passwordValidation()}
                    />
                    <Text
                        style={styles.error}>
                        {this.state.passwordError ? 'wrong input' : ''}
                    </Text>
                <Pressable style={styles.signInBtn} onPress={this.onLogin}>
                    <Text style={styles.signInText}>SIGN IN</Text>
                </Pressable>
                <Pressable style={styles.signUpBtn} onPress={this.goToSignup}>
                    <Text style={styles.signUpText}>sign up</Text>
                </Pressable>
            </View>
            </DismissKeyboard>
        </View>
        // </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e252d',
        // alignItems: 'center',
        // justifyContent: 'center',
        flexDirection : "column",
    },
    top : {
        flex : 3,
        justifyContent : "center",
        alignItems : "center",
      },
    bottom : {
        flex : 3,
        // justifyContent : "center",
        alignItems : "center"
    },
    topText: {
        fontSize: 150,
        // fontFamily: 'Cassanet',
        // fontFamily: 'Superstar-M54',
        fontFamily: 'Leaner',
        // fontFamily: 'Robinson',
        // fontFamily: 'RobOut',
        // fontFamily: 'numb3rs',
        color: "#f42a71"
    },
    inputView: {
        width: "80%",
        backgroundColor: "#1a1f26",
        borderRadius: 5,
        height: 50,
        marginBottom: 5,
        justifyContent: "center",
        padding: 15,
        color: '#fff',
        fontFamily: 'Montserrat'
    },
    signInBtn: {
        width: "80%",
        backgroundColor: "#f42a71",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10,
    },
    signUpBtn: {
        width: "20%",
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        marginBottom: 10,
    },
    signInText: {
        fontFamily: 'Montserrat'
    },
    signUpText: {
        color: '#f42a71',
        fontFamily: 'Montserrat'
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
});