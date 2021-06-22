import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

/**
 * Days Button
 * 21.06.17 by 예리
 */
export default class DaysButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={
          this.props.click[this.props.id]
            ? styles.daysButtonSelected
            : styles.daysButton
        }
        onPress={() => this.props.callback(this.props.id)}>
        <Text style={{fontSize: 17}}>{this.props.day}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  daysButton: {
    borderColor: '#AFDCBD',
    borderWidth: 2,
    width: '12%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingBottom: '2%',
  },
  daysButtonSelected: {
    backgroundColor: '#AFDCBD',
    borderColor: '#AFDCBD',
    borderWidth: 2,
    width: '12%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingBottom: '2%',
  },
});
