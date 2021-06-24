import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

export default class ProgScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          lecture: '알고리즘',
          mentor: '김멘토',
          mentee: '이멘티',
          period: '21.06.25-21.06.30',
          finished: false,
        },
        {
          id: 1,
          lecture: '자료구조',
          mentor: '김멘토',
          mentee: '이멘티',
          period: '21.06.01-21.06.15',
          finished: true,
        },
        {
          id: 2,
          lecture: '일반C프로그래밍',
          mentor: '김멘토',
          mentee: '이멘티',
          period: '21.06.11-21.06.17',
          finished: false,
        },
      ],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={(item) => {
            return renderList({item}, this.props.navigation);
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const renderList = ({item}, navigation) => {
  return <ChatList item={item} navi={navigation} />;
};

class ChatList extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navi.navigate('멘토링일지', {
            lecture: this.props.item.item.lecture,
            mentor: this.props.item.item.mentor,
            mentee: this.props.item.item.mentee,
            period: this.props.item.item.period,
            finished: this.props.item.item.finished,
          })
        }>
        <View style={styles.list}>
          <View style={styles.contentView}>
            <Text style={styles.nameText}>{this.props.item.item.lecture}</Text>
            <Text>멘토 : {this.props.item.item.mentor}</Text>
            <Text>멘티 : {this.props.item.item.mentee}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={{textAlign: 'center'}}>
              {this.props.item.item.finished
                ? '완료'
                : this.props.item.item.period}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    height: 75,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingLeft: '3%',
    paddingRight: '3%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentView: {
    width: '80%',
  },
  timeView: {
    width: '18%',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
