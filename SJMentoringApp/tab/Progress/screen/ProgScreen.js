import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
export default class ProgScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      DATA: [],
    };
    this.getMatchedMentoring = this.getMatchedMentoring.bind(this);
  }
  componentDidMount() {
    this.getMatchedMentoring();
  }
  getMatchedMentoring() {
    let page = 1;
    this.setState({DATA: []});
    axios
      .get(`${axios.defaults.baseURL}/mentoring?page=${page}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({DATA: this.state.DATA.concat(response.data.data)});
        page++;
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error.response);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.DATA.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'gray'}}>진행 중인 멘토링이 없습니다.</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.DATA}
            renderItem={(item) => {
              return renderList({item}, this.props.navigation);
            }}
            keyExtractor={(item) => item.id}
          />
        )}
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
            lecture: this.props.item.item.subject,
            mentor: this.props.item.item.mentor,
            mentee: this.props.item.item.mentee,
            start: this.props.item.item.start_date,
            end: this.props.item.item.end_date,
            finished: this.props.item.item.end,
            id: this.props.item.item.id,
          })
        }>
        <View style={styles.list}>
          <View style={styles.contentView}>
            <Text style={styles.nameText}>{this.props.item.item.subject}</Text>
            <Text>멘토 : {this.props.item.item.mentor}</Text>
            <Text>멘티 : {this.props.item.item.mentee}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={{textAlign: 'center', fontSize: 13}}>
              {this.props.item.item.end === 1
                ? '완료'
                : `${this.props.item.item.start_date.slice(
                    0,
                    10,
                  )}\n~\n${this.props.item.item.end_date.slice(0, 10)}`}
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
    width: '72%',
  },
  timeView: {
    width: '21%',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
