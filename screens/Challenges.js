import React, { Component } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList, TouchableOpacity, Image } from 'react-native';


export default class Challenges extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '',
        headerStyle: {
            backgroundColor: '#1e252d',
            shadowColor: 'transparent',
        },
        gestureEnabled: false,
        headerLeft: () => (
            <TouchableOpacity
                onPress={() => {navigation.goBack()}}
            >
                <Image
                    style={{width: 35, height: 35, marginLeft: 10}}
                    source={require('../assets/hamburger.png')}
                />  
            </TouchableOpacity>
            
        ),
    })

    constructor(props) {
        super(props);
        this.state = {
            gameModes: [
                {
                    numRows: 3,
                    gameMode: 'timer',
                    time: 90,
                },
                {
                    numRows: 3,
                    gameMode: 'turns',
                    turns: 10,
                },
                {
                    numRows: 4,
                    gameMode: 'timer',
                    time: 90,
                },
                {
                    numRows: 4,
                    gameMode: 'turns',
                    turns: 10,
                },
                {
                    numRows: 5,
                    gameMode: 'timer',
                    time: 90,
                },
                {
                    numRows: 5,
                    gameMode: 'turns',
                    turns: 10,
                },
            ],
        };
    }
    renderButton = ({item, index, separators}) => {
        return (
            <View style={styles.challengeContainer}>
                <Pressable style={styles.chalBtn} onPress={() => {this.props.navigation.navigate('Grid', item)}}>
                    <Text style={styles.chalText}>Challenge {index + 1}</Text>
                </Pressable>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.gameModes}
                    renderItem={this.renderButton}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e252d',
        justifyContent: 'center'
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
        margin: 15
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