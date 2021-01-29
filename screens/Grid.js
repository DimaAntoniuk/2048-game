import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Font from 'expo-font';

export default class GameClone extends Component {
 
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: '#1e252d',
      shadowColor: 'transparent',
    },
    // headerTitleStyle: {
    //     color: '#f42a71',
    //     fontWeight: 'bold',
    // }, 
 }


  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      backgroundColors : ["#616C6F", "#3a4ae7","#5343e6", "#7442dd","#9942db", "#b93ee3","#d23be1", "#e237d1","#ec36ba", "#f433a0",
      "#f73087","#ff2f79","#487EB0"],
      gameOver : false,
      numRows : 4,
      score : 0,
      fontLoaded : false,
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
    if(indexes.length == 0){
      this.setState({ gameOver : true })
      Alert.alert(
        'Game Over!!!',
        `Your score is ${this.state.score} `
      )
    }
    var randomIndex = Math.floor(Math.random() * indexes.length)
    randomIndex = indexes[randomIndex]
    return randomIndex
  }

  componentDidMount(){
    var values = [null]
    for(var i = 1; i <= 16 ; i++){
      values[i] = null;
    }
    var randomIndex = this.returnIndexForNew(values)
    values[randomIndex] = 2
    this.setState({ 
      positionValues : values,
      loading : false, 
      score : 0,
    })
    this.loadFonts()
  }

  loadFonts = async() => {
    await Font.loadAsync({
      'Mont-Bold' : require("../assets/fonts/Montserrat-Bold.ttf"),
      'Montserrat' : require("../assets/fonts/Montserrat-Medium.ttf"),
      'Roboto' : require("../assets/fonts/Roboto-Regular.ttf"),
      'SFProDisplay' : require("../assets/fonts/SFProDisplay-Regular.ttf"),
    })
    this.setState({ fontLoaded : true })
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
          }else{ // we need to +1
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
          if(valueFoundBeforeTermination){ //if loop stopped for which value of check
            if( values[check] == values[currentPositionNumber] && !newlyMerged.includes(check) ){
              values[check] *= 2
              values[currentPositionNumber] = null
              score += values[check]
              newlyMerged.push(check)
            }else{ //if values are not equal -> just make currentPosition to check-1
                if(check-1 != currentPositionNumber){
                  values[check-1] = values[currentPositionNumber]
                  values[currentPositionNumber] = null 
                }
            }
          }else{ // loop terminates -> then check will be pointing to what -> pointing to 1 more so -> make it to check - 1
            values[check-1] = values[currentPositionNumber]
            values[currentPositionNumber] = null
          }
        }
      }
    }
    var randomIndex = this.returnIndexForNew(values)
    values[randomIndex] = 2
    this.setState({ positionValues : values ,score })
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
        //for value of check -> we need same boxNumber but for different rows
        if(values[currentPositionNumber] != null){
          valueFoundBeforeTermination = false
          for(check = rowNumber - 1 ; check >= 0 ; check-- ){
            positionToBeChecked = check * numRow + boxNumber
            if( values[positionToBeChecked] != null ){
              valueFoundBeforeTermination = true;
              break;
            }
          }
          if(valueFoundBeforeTermination){ // loop has been stopped before completion 
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
          }else{ //loop completes itself -> need to add 1 to get correctPosition
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
        //for value of check -> we need same boxNumber but for different rows
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
      <View style={styles.row}>
        <View style={[styles.eachBox,{ backgroundColor : Colors[values[0].exponent] }]}>
          <Text style={styles.boxText}> { values[0].value } </Text>      
        </View>

        <View style={[styles.eachBox,{ backgroundColor : Colors[values[1].exponent] }]}>
          <Text style={styles.boxText}> { values[1].value } </Text>
        </View>

        <View style={[styles.eachBox,{ backgroundColor : Colors[values[2].exponent] }]}>
          <Text style={styles.boxText}> { values[2].value } </Text>       
        </View>
        
        <View style={[styles.eachBox,{ backgroundColor : Colors[values[3].exponent] }]}>
          <Text style={styles.boxText}> { values[3].value } </Text>
        </View>
      </View>
    )
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
              {/* <Text style={styles.score}>Join the numbers and get to the 2048 tile!</Text> */}
          </View>
          <View style={styles.middle}>
            <View style={styles.box}>
              {this.returnRow(0)}
              {this.returnRow(1)}
              {this.returnRow(2)}
              {this.returnRow(3)}
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
    // position : "absolute",
    // right : 20,
    // top : 120,
    color : "#f42a71",
  },
  scoreCount: {
    fontSize : 40,
    fontFamily : "Leaner",
    color : "#f42a71",
  }
})