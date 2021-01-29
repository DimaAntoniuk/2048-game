import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Font from 'expo-font';

export default class GameClone extends Component {
 
  static navigationOptions = ({navigation}) => ({
    title: '',
    gestureEnabled: false,
    headerStyle: {
      backgroundColor: '#1e252d',
      shadowColor: 'transparent',
    },
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
      loading : true,
      backgroundColors : ["#616C6F", "#3a4ae7","#5343e6", "#7442dd","#9942db", "#b93ee3","#d23be1", "#e237d1","#ec36ba", "#f433a0",
      "#f73087","#ff2f79","#ff005b"],
      score : 0,
      fontLoaded : false,
      gameOver: false,
      ...this.props.navigation.state.params
    };
  }

  returnIndexForNew = values => {
    var indexes = []
    var i = 0;
    values.forEach( eachValue => {
      if(eachValue == null && i != 0){
        indexes.push(i)
      }
      i++;
    } )
    var randomIndex = Math.floor(Math.random() * indexes.length)
    randomIndex = indexes[randomIndex]
    return randomIndex
  }

  componentDidMount(){
    var values = [null]
    var numRow = this.state.numRows;
    for(var i = 1; i <= numRow*numRow ; i++){
      values[i] = null;
    }
    var randomIndex = this.returnIndexForNew(values)
    values[randomIndex] = 2
    this.setState({ 
      positionValues : values,
      loading : false, 
      score : 0,
      gameOver: false,
      ...this.props.navigation.state.params
    })
    this.loadFonts()

    if (this.state.gameMode == 'timer') {
      var timer = setInterval(() => {
        if (this.state.time == 0) {
          this.gameOver();
        }
        if (this.state.gameOver) {
          clearInterval(timer);
        }
        if (this.state.time > 0 && !this.state.gameOver) {
          this.setState(prevState => ({time:(prevState.time-1)}))
        }
      }, 1000);
    }
  }

  loadFonts = async() => {
    await Font.loadAsync({
      'Mont-Bold' : require("../assets/fonts/Montserrat-Bold.ttf"),
      'Montserrat' : require("../assets/fonts/Montserrat-Medium.ttf"),
    })
    this.setState({ fontLoaded : true })
  }

  isGameOver = () => {
    var values = this.state.positionValues;
    var numRow = this.state.numRows;
    var gameOver = true;
    var abort = false;
    for(var rowNumber = 0; rowNumber < numRow && !abort; rowNumber++){
      
      for(var boxNumber = 1; boxNumber <= numRow && !abort; boxNumber++){
        if (values[rowNumber * numRow + boxNumber] == null){
          gameOver = false;
          abort = true;
          break;
        }

        if (rowNumber > 0 && values[rowNumber * numRow + boxNumber] == values[(rowNumber - 1) * numRow + boxNumber]) {
          gameOver = false;
          abort = true;
          break;
        }

        if (rowNumber < (numRow - 1) && values[rowNumber * numRow + boxNumber] == values[(rowNumber + 1) * numRow + boxNumber]) {
          gameOver = false;
          abort = true;
          break;
        }

        if (boxNumber > 1 && values[rowNumber * numRow + boxNumber] == values[rowNumber * numRow + (boxNumber - 1)]) {
          gameOver = false;
          abort = true;
          break;
        }

        if (boxNumber < numRow && values[rowNumber * numRow + boxNumber] == values[rowNumber * numRow + (boxNumber + 1)]) {
          gameOver = false;
          abort = true;
          break;
        }
      }
    }
    return gameOver;
  }

  gameOver = () => {
    this.setState({
      gameOver: true,
    })
    Alert.alert(
      'Game Over!!!',
      `Your score is ${this.state.score}`,
      [
        {text: 'Restart game', onPress: () => {this.setState({loading:true}); this.componentDidMount();}},
        {text: 'Go to menu', onPress: () => {this.props.navigation.navigate('MainMenu')}},
      ],
      {cancelable: false}
    )
  }

  checkLeftSwipe = () => {
    var values = this.state.positionValues
    var numRow = this.state.numRows
    var score = this.state.score;
    var currentPositionNumber, newlyMerged = [], valueFoundBeforeTermination;
    var check;
    for(var rowNumber = 0 ; rowNumber < numRow ; rowNumber++){
      for(var boxNumber = 2 ; boxNumber <= numRow ; boxNumber++){
        currentPositionNumber = rowNumber * numRow + boxNumber
        if(values[currentPositionNumber] != null){
          valueFoundBeforeTermination = false
          for(check = currentPositionNumber - 1 ; check % numRow != 0 ; check--){
            if(values[check] != null){
              valueFoundBeforeTermination = true;
              break;
            }
          }
          if(valueFoundBeforeTermination){
            if( values[check] == values[currentPositionNumber] && !newlyMerged.includes(check) ){
              values[check] *= 2
              values[currentPositionNumber] = null
              score += values[check]
              newlyMerged.push(check)
            }else if( check + 1 != currentPositionNumber ) {
              values[check+1] = values[currentPositionNumber]
              values[currentPositionNumber] = null
            }
          }else{
            if( check + 1 != currentPositionNumber ){
              values[check+1] = values[currentPositionNumber]
              values[currentPositionNumber] = null
            }
          }
        }      
      }
    }
    var randomIndex = this.returnIndexForNew(values)
    values[randomIndex] = 2
    this.setState({ positionValues : values, score })

    if (this.state.gameMode == 'turns') {
      var newTurns = this.state.turns - 1 + newlyMerged.length
      if (newTurns == 0) {
        this.gameOver();
      }
      this.setState({turns:newTurns})
    }

    if (this.isGameOver()) {
      this.gameOver();
    }
  }

  checkRightSwipe = () => {
    var values = this.state.positionValues
    var currentPositionNumber ;
    var check,valueFoundBeforeTermination;
    var newlyMerged = []
    var numRow = this.state.numRows
    var score = this.state.score
    for(var rowNumber = 0 ; rowNumber < numRow ; rowNumber++){
      for(var boxNumber = numRow - 1 ; boxNumber >= 1 ; boxNumber--){
        currentPositionNumber = rowNumber * numRow + boxNumber
        if( values[currentPositionNumber] != null ){
          valueFoundBeforeTermination = false;
          for(check = currentPositionNumber + 1 ; check % numRow != 1; check++ ){
            if( values[check] != null ){
              valueFoundBeforeTermination = true
              break;
            }
          }
          if(valueFoundBeforeTermination){
            if( values[check] == values[currentPositionNumber] && !newlyMerged.includes(check) ){
              values[check] *= 2
              values[currentPositionNumber] = null
              score += values[check]
              newlyMerged.push(check)
            }else{
                if(check-1 != currentPositionNumber){
                  values[check-1] = values[currentPositionNumber]
                  values[currentPositionNumber] = null 
                }
            }
          }else{
            values[check-1] = values[currentPositionNumber]
            values[currentPositionNumber] = null
          }
        }
      }
    }
    var randomIndex = this.returnIndexForNew(values)
    values[randomIndex] = 2
    this.setState({ positionValues : values ,score })

    if (this.state.gameMode == 'turns') {
      var newTurns = this.state.turns - 1 + newlyMerged.length
      if (newTurns == 0) {
        this.gameOver();
      }
      this.setState({turns:newTurns})
    }

    if (this.isGameOver()) {
      this.gameOver();
    }
  }

  checkUpSwipe = () => {
    var values = this.state.positionValues
    var numRow = this.state.numRows
    var currentPositionNumber ;
    var check,valueFoundBeforeTermination,positionToBeChecked;
    var newlyMerged = [];
    var score = this.state.score
    for(var rowNumber = 1 ; rowNumber < numRow ; rowNumber++){
      for(var boxNumber = 1 ; boxNumber <= numRow ; boxNumber++){
        currentPositionNumber = rowNumber * numRow + boxNumber
        if(values[currentPositionNumber] != null){
          valueFoundBeforeTermination = false
          for(check = rowNumber - 1 ; check >= 0 ; check-- ){
            positionToBeChecked = check * numRow + boxNumber
            if( values[positionToBeChecked] != null ){
              valueFoundBeforeTermination = true;
              break;
            }
          }
          if(valueFoundBeforeTermination){
            var pos2 = check * numRow + boxNumber
            if( values[pos2] == values[currentPositionNumber] && !newlyMerged.includes(pos2) ){
              values[pos2] *= 2;
              values[currentPositionNumber] = null
              score += values[pos2]
              newlyMerged.push(pos2)
            }else if( (pos2 + numRow ) != currentPositionNumber ) {
              values[pos2+numRow] = values[currentPositionNumber]
              values[currentPositionNumber] = null
            }
          }else{
            var pos2 = ( check + 1 ) * numRow + boxNumber
            if(pos2 != currentPositionNumber){
              values[pos2] = values[currentPositionNumber]
              values[currentPositionNumber] = null
            }
          }
        }
      }
    }
    var randomIndex = this.returnIndexForNew(values)
    values[randomIndex] = 2
    this.setState({ positionValues : values , score })

    if (this.state.gameMode == 'turns') {
      var newTurns = this.state.turns - 1 + newlyMerged.length
      if (newTurns == 0) {
        this.gameOver();
      }
      this.setState({turns:newTurns})
    }

    if (this.isGameOver()) {
      this.gameOver();
    }
  }

  checkDownSwipe = () => {
    var values = this.state.positionValues
    var numRow = this.state.numRows
    var currentPositionNumber ;
    var check,valueFoundBeforeTermination,positionToBeChecked;
    var newlyMerged = []
    var score = this.state.score
    for(var rowNumber = numRow - 2 ; rowNumber >= 0 ; rowNumber--){
      for(var boxNumber = 1 ; boxNumber <= numRow ; boxNumber++){
        currentPositionNumber = rowNumber * numRow + boxNumber
        if(values[currentPositionNumber] != null){  
          valueFoundBeforeTermination = false
          for( check = rowNumber + 1 ; check < numRow ; check++ ){
            positionToBeChecked = check * numRow + boxNumber
            if( values[positionToBeChecked] != null ){
              valueFoundBeforeTermination = true;
              break;
            }
          }
          if(valueFoundBeforeTermination){
            var pos2 = check * numRow + boxNumber
            if( values[pos2] == values[currentPositionNumber] && !newlyMerged.includes(pos2) ){
              values[pos2] *= 2
              values[currentPositionNumber] = null
              score += values[pos2]
              newlyMerged.push(pos2)
            }else if( pos2 - numRow != currentPositionNumber ){
              values[pos2-numRow] = values[currentPositionNumber]
              values[currentPositionNumber] = null
            }
          }else{
            var pos2 = (check - 1 ) * numRow + boxNumber
            if( pos2 != currentPositionNumber ){
              values[pos2] = values[currentPositionNumber]
              values[currentPositionNumber] = null
            }
          }
        }
      }
    }
    var randomIndex = this.returnIndexForNew(values)
    values[randomIndex] = 2
    this.setState({ positionValues : values , score })

    if (this.state.gameMode == 'turns') {
      var newTurns = this.state.turns - 1 + newlyMerged.length
      if (newTurns == 0) {
        this.gameOver();
      }
      this.setState({turns:newTurns})
    }

    if (this.isGameOver()) {
      this.gameOver();
    }
  }

  returnRow = rowNumber => {
    var val = this.state.positionValues
    var numRow = this.state.numRows
    var Colors = this.state.backgroundColors
    var values = [];
    for(var i = 1 ; i <= numRow ; i++){
      values.push({
        value :  val[ rowNumber * numRow + i ],
        exponent : Math.log(val[ rowNumber * numRow + i ])/Math.log(2)
      })
    }
    return(
      <View key={rowNumber} style={styles.row}>
        {
          values.map((item, key) => (
            <View key={rowNumber*numRow+key} style={[styles.eachBox,{ backgroundColor : Colors[item.exponent] }]}>
              <Text style={styles.boxText}> { item.value } </Text>      
            </View>
          ))
        }
      </View>
    )
  }

  getTimerTime = () => {
    var minutes = this.state.time / 60 | 0
    var seconds = this.state.time % 60
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  render() {
 
    if(this.state.loading || !this.state.fontLoaded){
      return(
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <GestureRecognizer
        onSwipeUp={this.checkUpSwipe}
        onSwipeDown={this.checkDownSwipe}
        onSwipeLeft={this.checkLeftSwipe}
        onSwipeRight={this.checkRightSwipe}
        style={styles.container}
      >
        <View style={styles.top}>
            <Text style={styles.score}>SCORE</Text>
            <Text style={styles.scoreCount}>{this.state.score}</Text>
            {this.state.gameMode == 'timer' ? <Text style={styles.score}>{this.getTimerTime()}</Text> : <></>}
            {this.state.gameMode == 'turns' ? <Text style={styles.score}>{this.state.turns}</Text> : <></>}
        </View>
        <View style={styles.middle}>
          <View style={styles.box}>
            {
              [...Array(this.state.numRows).keys()].map((item, key) => (
                this.returnRow(item)
              ))
            }
          </View>
        </View>
        <View style={styles.bottom}>
        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent : "center",
    flexDirection : "column",
    backgroundColor : "#1e252d",
  },
  top : {
    flex : 2,
    justifyContent : "center",
    alignItems : "center"
  },
  middle : {
    flex : 5,
    backgroundColor : "#2F363F",
    margin: 15
  },
  bottom : {
    flex : 3,
    alignItems : "center",
    justifyContent : "center",
    flexDirection : "row"
  },
  box : {
    flex : 1,
    flexDirection : "column",
    backgroundColor : "#1e252d",
    // margin: 2                ///border outside tiles box
  },
  row : {
    flex : 1,
    flexDirection : "row"
  },
  eachBox : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center",
    borderRadius : 10,
    margin : 2,
    borderWidth: 1,
  },
  // eachBox : {
  //   flex : 1,
  //   alignItems : "center",
  //   justifyContent : "center",
  //   width: 85,
  //   height: 85,
  //   borderRadius: 85 / 2,
  //   margin : 1,
  //   borderWidth: 1,
  // },
  boxText : {
    fontSize : 30,
    color : "#0c0309",
  },
  topText : {
    fontSize : 35,
    fontFamily : "Mont-Bold",
    color : "#EAF0F1",
  },
  score : {
    fontSize : 25,
    fontFamily : "Montserrat",
    color : "#f42a71",
  },
  scoreCount: {
    fontSize : 40,
    fontFamily : "Leaner",
    color : "#f42a71",
  }
})