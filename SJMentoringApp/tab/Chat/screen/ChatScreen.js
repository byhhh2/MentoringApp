import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

export default class ChatScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          name: '김멘토',
          role: '멘토',
          text: '알고리즘 알려드려요~',
          time: '21.06.15',
          lecture: '알고리즘',
          matched: true,
        },
        {
          id: 1,
          name: '김멘티',
          role: '멘티',
          text: '자료구조 너무 어려워요 알려주세요~!',
          time: '21.06.15',
          lecture: '자료구조',
          matched: false,
        },
        {
          id: 2,
          name: '김익명',
          role: '멘티',
          text: '어쩌구저쩌구',
          time: '21.06.15',
          lecture: '일반c프로그래밍',
          matched: true,
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
        onPress={() => {
          this.props.navi.navigate('Chat', {
            lecture: this.props.item.item.lecture,
            name: this.props.item.item.name,
            role: this.props.item.item.role,
            text: this.props.item.item.text,
            matched: this.props.item.item.matched,
          });
        }}>
        <View style={styles.list}>
          <View style={styles.matchedView}>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
              {this.props.item.item.matched ? '매칭 완료' : '모집중'}
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.nameText}>{this.props.item.item.name}</Text>
            <Text>{this.props.item.item.text}</Text>
          </View>
          <View style={styles.timeView}>
            <Text>{this.props.item.item.time}</Text>
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
    height: 70,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginLeft: '3%',
    marginRight: '3%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  matchedView: {
    width: '15%',
    height: '80%',
    marginRight: '2%',
    borderRadius: 100,
    borderColor: '#AFDCBD',
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    width: '63%',
    marginRight: '1%',
  },
  timeView: {
    width: '15%',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
