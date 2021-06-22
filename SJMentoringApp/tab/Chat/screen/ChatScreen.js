import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

/**
 * ChatList Screen
 * 21.06.15 by 예리
 */
export default class ChatScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          name: '익명이에오~',
          text: '어쩌구저쩌구',
          time: '21.06.15',
        },
        {
          id: 1,
          name: '익명이에오~1',
          text: '어쩌구저쩌구',
          time: '21.06.15',
        },
        {
          id: 2,
          name: '익명이에오~2',
          text: '어쩌구저쩌구',
          time: '21.06.15',
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
            return renderList({item});
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const renderList = ({item}) => {
  return <ChatList item={item} />;
};

class ChatList extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.list}>
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
