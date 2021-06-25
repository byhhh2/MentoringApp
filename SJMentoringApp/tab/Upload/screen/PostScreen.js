import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        {/* user info */}
        <View style={styles.user_info_view}>
          <Text style={styles.green_font}>
            {this.props.route.params.role === 1 ? '멘토' : '멘티'}
            {'   ✔'}
          </Text>
          <Text style={styles.base_font}>
            김익명
            <Text style={styles.white_font}>
              {'     '}
              여성
            </Text>
          </Text>
        </View>
        {/* class info */}
        <View style={styles.base_view}>
          <View style={styles.flex_direction_row}>
            <Text style={styles.class_font}>
              {this.props.route.params.lecture}
            </Text>
            <Text style={styles.small_font}>수준</Text>
            <Text style={styles.green_font}>
              {this.props.route.params.level}
            </Text>
            <Text style={styles.small_font}>학점</Text>
            <Text style={styles.green_font}>C</Text>
          </View>
          <View>
            <View style={styles.flex_direction_row}>
              <Text style={styles.green_font}>기간 </Text>
              <Text style={styles.small_font}>
                {this.props.route.params.start_date}~
                {this.props.route.params.end_date}
              </Text>
            </View>
            <View style={styles.flex_direction_row}>
              <Text style={styles.green_font}>시간 </Text>
              <Text style={styles.small_font}>
                {this.props.route.params.time}
              </Text>
            </View>
          </View>
        </View>
        {/* text */}
        <View style={styles.text_view}>
          <Text style={styles.base_font}>
            {this.props.route.params.content}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //margin: 10,
  },
  base_font: {
    fontSize: 20,
    margin: 10,
  },
  small_font: {
    fontSize: 18,
    margin: 10,
  },
  base_view: {
    //borderBottomColor: '#99BFA5',
    //borderBottomWidth: 1,
    padding: 20,
  },
  green_font: {
    fontSize: 20,
    color: '#498C5A',
    fontWeight: 'bold',
    margin: 10,
  },
  user_info_view: {
    backgroundColor: '#AFDCBD',
    //padding: 10,
    padding: 20,
    //alignItems: 'center',
  },
  flex_direction_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  class_font: {
    fontSize: 25,
    margin: 10,
    fontWeight: 'bold',
  },
  pink_font: {
    color: '#F2BBBB',
    fontSize: 20,
    margin: 10,
  },
  white_font: {
    color: '#498C5A',
    fontSize: 15,
    margin: 10,
    fontWeight: 'bold',
  },
  text_view: {
    padding: 20,
    borderRadius: 20,
    borderColor: '#498C5A',
    borderWidth: 1,
    //backgroundColor: '#F0F2AE',
    width: '97%',
    height: '40%',
    marginLeft: 5,
    marginRight: 5,
  },
});
