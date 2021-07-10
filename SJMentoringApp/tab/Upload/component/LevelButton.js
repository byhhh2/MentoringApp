import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

/**
 * Level Button
 * by 예리
 */
export default class LevelButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //console.log(this.props.refresh);
    let index = [false, false, false];
    if (this.props.selectedAlready === '상') index = [true, false, false];
    else if (this.props.selectedAlready === '중') index = [false, true, false];
    else if (this.props.selectedAlready === '하') index = [false, false, true];
    return (
      <TouchableOpacity
        style={
          (this.props.click[this.props.id] || index[this.props.id]) &&
          (this.props.refresh === false || this.props.refresh === undefined)
            ? [styles.levelButton, styles.levelButtonSelected]
            : styles.levelButton
        }
        onPress={() => this.props.callback(this.props.id)}>
        <Text style={[styles.text, {fontSize: 17}]}>{this.props.level}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GmarketSansTTFMedium',
  },
  bold: {
    fontFamily: 'GmarketSansTTFBold',
  },
  levelButton: {
    borderColor: '#AFDCBD',
    borderWidth: 2,
    width: '25%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingBottom: '2%',
  },
  levelButtonSelected: {
    backgroundColor: '#AFDCBD',
  },
});
