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
    this.inputType = this.inputType.bind(this);
  }
  inputType(type) {
    //console.log(this.props.refresh);
    switch (type) {
      case '과목':
        return (
          <View
            style={{
              width: '85%',
            }}>
            <TextInput
              placeholder={
                this.props.value ? `${this.props.value}` : `과목을 입력하세요.`
              }
              onChangeText={(text) => {
                this.setState({value: text});
                //this.props.info(this.state.value);
              }}
              onEndEditing={() => {
                this.props.info(this.state.value);
              }}
              value={this.props.refresh ? '' : this.state.value}
              style={{fontFamily: 'GmarketSansTTFMedium'}}
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
                refresh={this.props.refresh}
                selectedAlready={this.props.value}
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
                  this.props.info(this.state.selectedLevel);
                }}
                click={this.state.selectedLevel}
              />
            ))}
          </View>
        );
        break;
      case '기간':
        return (
          <DateModal
            info={this.props.info}
            refresh={this.props.refresh}
            startValue={this.props.startValue}
            endValue={this.props.endValue}
          />
        );
        break;
      case '시간대':
        return (
          <TimeModal
            info={this.props.info}
            refresh={this.props.refresh}
            initValue={this.props.value}
          />
        );
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
                refresh={this.props.refresh}
                selectedAlready={this.props.value}
                callback={(id) => {
                  let array = this.state.selectedDays;
                  if (array[id] === false) array[id] = days[id];
                  else array[id] = false;
                  this.setState({selectedDays: array});
                  this.props.info(this.state.selectedDays);
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
        <Text style={[styles.text, {fontSize: 19}]}>
          {this.props.type} {'  '}
        </Text>
        {this.inputType(this.props.type)}
      </View>
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
  inputView: {
    height: '13%',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 2,
  },
});
