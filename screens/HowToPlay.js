import React, { Component } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList, TouchableOpacity, Image } from 'react-native';


export default class HowToPlay extends Component {
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
                    style={{width: 27, height: 27, marginLeft: 15, marginTop: 5}}
                    source={require('../assets/hamburger.png')}
                />  
            </TouchableOpacity>
            
        ),
    })

    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.welcome}>
                    <Text style = {styles.welcomeText}>
                        How to play?
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>You just need to move the tiles and every time you move one, another tile pops up in a random manner anywhere in the box. 
                    </Text><Text style={styles.infoText}>When two tiles with the same number on them collide with one another as you move them, they will merge into one tile with the sum of the numbers written on them initially. Add them up and reach the 
                    </Text>
                    <Text style={styles.infoText2048}>2048</Text>
                </View>
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
        flex: 0.5,
        justifyContent : "center",
        alignItems : "center",
    },
    infoContainer: {
        flex: 5,
        justifyContent : "center",
        alignItems : 'center',
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
        color: '#f42a71',
        fontSize: 100,
        fontFamily: 'Leaner',
        textAlign: 'center',
        marginTop: 20 
    }
});