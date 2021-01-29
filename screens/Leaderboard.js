import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import {db} from '../api/firebase/firebase'

export default class Leaderboard extends Component{

    state = {
        users: []
    };

    Item = ({ id, username, highScore }) => (
        <View style={styles.item}>
          <Text>{username}</Text>
          <Text>{highScore}</Text>
          <Button 
            title='report'
            onPress={() => Alert.alert('Reported user with id: ' + id)} 
          />
        </View>
    );
    
    componentDidMount(){
        db.collection('flex-users').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    this.state.users.push({
                        userename: data['username'],
                        highScore: data['highScore'],
                        id: data.id
                    })
                });
            }).catch(err => {
                console.log('Error getting documents', err);
            });
        this.state.users = this.state.users.sort((a, b) => a.highScore.localCompare(b.highScore))
    }

    renderItem = ({ item }) => (
        <Item 
            username={item.username}
            highscore={item.highScore}
            id={item.id} 
        />
    );

    return (){
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.users.slice(0, 10)}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <Text>Username</Text>
                    <Text>High Score</Text>
                    <Text>Report</Text>
                </View>
            )}
        </View>
    }
}