import React, { Component } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import firebase from '../api/firebase/firebase'


export default class MainMenu extends Component {
    state = {
        uid: '',
        displayName: ''
    };

    static navigationOptions = {
        title: '',
        // headerShown: false,
        headerStyle: {
            backgroundColor: '#1e252d',
            shadowColor: 'transparent',
          },
     }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('SignIn')
        })
            .catch(error => this.setState({ errorMessage: error.message }))
    };

    startGame = () => {
        this.props.navigation.navigate('Grid')
    }

    render() {
        this.state = {
            displayName: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid
        };

        return (
            <View style={styles.container}>
                <View style={styles.welcome}>
                <Text style = {styles.welcomeText}>
                    Welcome, {this.state.displayName}
                </Text>
                {/* <Pressable style={styles.signOutBtn} onPress={this.signOut}>
                    <Text style={styles.btnText}>Sign me out!</Text>
                </Pressable> */}
                </View>
                <View style={styles.infoContainer}>
                <Text style={styles.infoText}>This is </Text><Text style={styles.infoText2048}>2048</Text>
                {/* <Text style={styles.infoText}>Match the numbers and get to the 2048 tile!</Text> */}
                </View>
                <View style={styles.btnsContainer}>
                    <Pressable style={styles.btnsHelp} > 
                    <Text style={styles.btnText}>How to Play</Text>
                    </Pressable>
                    <Pressable style={styles.btnsHelp} >
                    <Text style={styles.btnText}>Leaderboard</Text>
                    </Pressable>
                </View>
                <View style={styles.challengeContainer}>
                    <Pressable style={styles.chalBtn} >
                    <Text style={styles.chalText}>Challenges</Text>
                    </Pressable>
                </View>
                <View style={styles.bottom}>
                <Pressable style={styles.playBtn} onPress={this.startGame}>
                    <Text style={styles.btnTextPlay}>Play</Text>
                </Pressable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e252d',
    },
    welcome: {
        flex: 1.5,
        justifyContent : "center",
        alignItems : "center",
    },
    infoContainer: {
        flex: 3,
        justifyContent : "center",
        alignItems : 'center',
    },
    btnsContainer: {
        flex: 1.8,
        justifyContent : "center",
        flexDirection: 'row',
        alignItems : 'center',
    },
    challengeContainer: {
        flex: 0.1,
        justifyContent : "center",
        // flexDirection: 'row',
        alignItems : 'center',
    },
    bottom:{
        flex: 5,
        justifyContent : "center",
        alignItems : "center",
    },
    signOutBtn: {
        width: "30%",
        backgroundColor: "#f42a71",
        borderRadius: 5,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    playBtn: {
        width: 150,
        height: 150,
        backgroundColor: "#f42a71",
        borderRadius: 150 / 2,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    btnsHelp: {
        width: "30%",
        // backgroundColor: "#f42a71",
        borderRadius: 5,
        borderWidth:2,
        borderColor: '#f42a71',
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        margin: 15
    },
    chalBtn: {
        width: "40%",
        backgroundColor: "#f42a71",
        borderRadius: 5,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 10,
        // marginBottom: 10,
        // margin: 15
    },
    btnText: {
        fontSize: 14,
        fontFamily: 'Montserrat',
        color: '#f42a71'
        // color: '#fff'

    },
    chalText: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        // color: '#fff'
    },
    btnTextPlay: {
        fontSize:33,
        fontFamily: 'Montserrat',
        color: '#fff'

    },
    welcomeText: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Montserrat'
    },
    infoText: {
        width: '80%',
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Montserrat',
        textAlign: 'center' 
    },
    infoText2048: {
        color: '#fff',
        fontSize: 80,
        fontFamily: 'Leaner',
        textAlign: 'center' 
    }
});