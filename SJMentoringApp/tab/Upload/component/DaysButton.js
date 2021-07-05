import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

/**
 * Days Button
 * by 예리
 */
export default class DaysButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let array = [false, false, false, false, false, false, false];
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    if (this.props.selectedAlready) {
      let arr_days = Array.from(this.props.selectedAlready);
      arr_days = arr_days.filter((e) => e != ' ');
      days.map((element, i) => {
        arr_days.map((e) => {
          if (element === e) array[i] = true;
        });
      });
    }
    return (
      <TouchableOpacity
        style={
          this.props.click[this.props.id] || array[this.props.id]
            ? [styles.daysButton, styles.daysButtonSelected]
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
  },
});
