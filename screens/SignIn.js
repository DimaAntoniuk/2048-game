import React from 'react'
import {StyleSheet, View, TextInput, Text, Alert, Pressable } from 'react-native'
import firebase from '../api/firebase/firebase'


export default class SignIn extends React.Component {
    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
    };

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
        return (
            <View style={styles.container}>
                    <TextInput
                    style={styles.inputView}
                        name='email'
                        value={this.state.email}
                        placeholder='email...'
                        placeholderTextColor="#D3D3D3"
                        autoCapitalize='none'
                        onChangeText={this.emailHandler}
                        onBlur={() => this.emailValidation()}
                    />
                    <Text
                        style={styles.error}>
                        {this.state.emailError ? 'wrong input' : ''}
                    </Text>
                    <TextInput
                        style={styles.inputView}
                        name='password'
                        value={this.state.password}
                        placeholder='password...'
                        placeholderTextColor="#D3D3D3"
                        secureTextEntry
                        onChangeText={this.passwordHandler}
                        onBlur={() => this.passwordValidation()}
                    />
                    <Text
                        style={styles.error}>
                        {this.state.passwordError ? 'wrong input' : ''}
                    </Text>
                <Pressable style={styles.signInBtn} onPress={this.onLogin}>
                    <Text>SIGN IN</Text>
                </Pressable>
                <Pressable style={styles.signUpBtn} onPress={this.goToSignup}>
                    <Text>sign up</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7395AE',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        width: "80%",
        backgroundColor: "#557A95",
        borderRadius: 5,
        height: 50,
        marginBottom: 10,
        justifyContent: "center",
        padding: 15,
        color: '#fff'
    },
    signInBtn: {
        width: "80%",
        backgroundColor: "#E5989B",
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
    error: {
        color: "#e83810",
        marginBottom: 10,
    },
});