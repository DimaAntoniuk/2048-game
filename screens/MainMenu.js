import React, { Component } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import firebase from '../api/firebase/firebase'


export default class MainMenu extends Component {
    state = {
        uid: '',
        displayName: ''
    };

    static navigationOptions = {
        title: 'Main Menu',
        headerStyle: {
          backgroundColor: '#557A95'
        },
        headerTitleStyle: {
            color: 'white'
        }
     }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('SignIn')
        })
            .catch(error => this.setState({ errorMessage: error.message }))
    };

    startGame = () => {
        this.props.navigation.navigate('Grid', {uid: firebase.auth().currentUser.uid, username: firebase.auth().currentUser.displayName})
    }

    render() {
        this.state = {
            displayName: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid
        };

        return (
            <View style={styles.container}>
                <Text style = {styles.welcomeText}>
                    Welcome, {this.state.displayName}
                </Text>
                <Pressable style={styles.signOutBtn} onPress={this.signOut}>
                    <Text style={styles.btnText}>Sign me out!</Text>
                </Pressable>
                <Pressable style={styles.signOutBtn} onPress={this.startGame}>
                    <Text style={styles.btnText}>Play</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7395AE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 35,
    },
    signOutBtn: {
        width: "80%",
        backgroundColor: "#E5989B",
        borderRadius: 5,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10,
    },
    btnText: {
        fontSize:20,

    },
    welcomeText: {
        color: '#fff',
        fontSize: 30,
    },
});