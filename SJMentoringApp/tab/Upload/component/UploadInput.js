import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

//Components
import TimeModal from './TimeModal';
import DateModal from './DateModal';
import LevelButton from './LevelButton';
import DaysButton from './DaysButton';

const buttons = ['상', '중', '하'];
const days = ['월', '화', '수', '목', '금', '토', '일'];
export default class UploadInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectedLevel: [false, false, false],
      selectedDays: [false, false, false, false, false, false, false],
    };
  }
  inputType(type) {
    switch (type) {
      case '과목':
        return (
          <View
            style={{
              width: '85%',
            }}>
            <TextInput
              placeholder={`과목을 입력하세요.`}
              onChangeText={(text) => this.setState({value: text})}
            />
          </View>
        );
        break;
      case '수준':
        return (
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              flex: 1,
            }}>
            {buttons.map((type, i) => (
              <LevelButton
                level={type}
                key={i}
                id={i}
                callback={(id) => {
                  let array = this.state.selectedLevel;
                  if (array[id] == false) array[id] = !array[id];
                  for (let j = 0; j < 3; j++) {
                    if (id != j) {
                      if (array[j]) array[j] = false;
                    } else {
                      array[j] = true;
                    }
                  }
                  this.setState({selectedLevel: array});
                }}
                click={this.state.selectedLevel}
              />
            ))}
          </View>
        );
        break;
      case '기간':
        return <DateModal />;
        break;
      case '시간대':
        return <TimeModal />;
        break;
      case '요일':
        return (
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              flex: 1,
            }}>
            {days.map((type, i) => (
              <DaysButton
                day={type}
                key={i}
                id={i}
                callback={(id) => {
                  let array = this.state.selectedDays;
                  array[id] = !array[id];
                  this.setState({selectedDays: array});
                }}
                click={this.state.selectedDays}
              />
            ))}
          </View>
        );
    }
  }
  render() {
    return (
      <View style={styles.inputView}>
        <Text style={{fontSize: 19}}>{this.props.type} : </Text>
        {this.inputType(this.props.type)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputView: {
    height: '13%',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
});
