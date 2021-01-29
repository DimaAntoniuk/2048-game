import React from 'react'
import {StyleSheet, Text, View, TextInput, Alert, Pressable} from 'react-native'
import firebase from '../api/firebase/firebase'


export default class SignUp extends React.Component {
    state = {
        email: '',
        password: '',
        phone: '',
        name: '',
        emailError: false,
        passwordError: false,
        phoneError: false,
        nameError: false,
    };

    nameHandler = name => {
        this.setState({name})
    };

    phoneHandler = phone => {
        this.setState({phone})
    };

    emailHandler = email => {
        this.setState({email});
    };

    passwordHandler = password => {
        this.setState({password});
    };

    onSignup = () => {
        const email = this.emailValidation();
        const password = this.passwordValidation();
        const name = this.nameValidation();
        const phone = this.phoneValidation();
        if (email && password && name && phone) {
            this.setState({
                isLoading: true,
            });
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.name,
                        phone: this.state.phone
                    });
                    console.log('Successful registration.');
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(this.state.email, this.state.password)
                        .then((res) => {
                            console.log(res);
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
                        });
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: '',
                        name: '',
                        phone: ''
                    });
                })
                .catch(error =>
                    Alert.alert(
                        "Error",
                        `${error}`,
                        [
                            { text: "OK", onPress: () => this.props.navigation.navigate('Auth') }
                        ],
                        { cancelable: true }
                    )
                )
        } else {
            if (!email) { this.setState({emailError: true})}
            if (!password) { this.setState({passwordError: true})}
            if (!name) { this.setState({nameError: true})}
            if (!phone) { this.setState({phoneError: true})}
        }
    };

    registerUser = () => {
        if(this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to sign up!')
        } else {
            this.setState({
                isLoading: true,
            });
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.displayName
                    });
                    console.log('Successful registration.');
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    });
                    this.props.navigation.navigate('SignIn')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    };

    nameValidation = () => {
        if (this.state.name.trim().length < 1) {
            this.setState({nameError: true});
            return false
        } else {
            this.setState({nameError: false});
            return true
        }
    };

    phoneValidation = () => {
        console.log(this.state.phone, 'phone');
        if (this.state.phone.length < 10) {
            this.setState({phoneError: true});
            return false
        } else {
            this.setState({phoneError: false});
            return true
        }
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

    goToSignIn = () => this.props.navigation.navigate('SignIn');

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.signUpTitle}>Registration Form</Text>
                <Text style={styles.fieldTitle}>Enter Name</Text>
                    <TextInput style={styles.inputView}
                        name='name'
                        value={this.state.name}
                        placeholder='name...'
                        placeholderTextColor="#D3D3D3"
                        autoCapitalize='none'
                        onChangeText={this.nameHandler}
                        onBlur={() => this.nameValidation()}
                    />
                    <Text
                        style={styles.error}>
                        {this.state.nameError ? 'wrong input' : ''}
                    </Text>
                    <Text style={styles.fieldTitle}>Enter Phone</Text>
                    <TextInput style={styles.inputView}
                        name='phone'
                        value={this.state.phone}
                        placeholder='phone...'
                        placeholderTextColor="#D3D3D3"
                        autoCapitalize='none'
                        keyboardType='numeric'
                        onChangeText={this.phoneHandler}
                        onBlur={() => this.phoneValidation()}
                    />
                    <Text
                        style={styles.error}>
                        {this.state.phoneError ? 'wrong input' : ''}
                    </Text>
                    <Text style={styles.fieldTitle}>Enter Email</Text>
                    <TextInput style={styles.inputView}
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
                    <Text style={styles.fieldTitle}>Enter Password</Text>
                    <TextInput style={styles.inputView}
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
                <Pressable style={styles.signUpBtn} onPress={this.onSignup}>
                    <Text>SIGN UP</Text>
                </Pressable>
                <Text >Already have an account?</Text>
                <Pressable style={styles.signInBtn} onPress={this.goToSignIn}>
                    <Text style={styles.fieldTitle}>Sign In</Text>
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
    signUpTitle: {
        marginBottom: 40,
        color: '#fff',
        fontSize: 25,
    },
    fieldTitle: {
        marginBottom: 5,
        color: '#fff'
    },
    inputView: {
        width: "80%",
        backgroundColor: "#557A95",
        borderRadius: 5,
        height: 50,
        marginBottom: 5,
        justifyContent: "center",
        padding: 15,
        color: '#fff'
    },
    signUpBtn: {
        width: "80%",
        backgroundColor: "#E5989B",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    signInBtn: {
        // width: "100%",
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        marginBottom: 10,
        color: "#E5989B"
    },
    error: {
        color: "#e83810",
        marginBottom: 5,
    },
});