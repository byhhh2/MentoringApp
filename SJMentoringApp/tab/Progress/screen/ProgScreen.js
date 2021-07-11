import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import axios from 'axios';
export default class ProgScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      DATA: [],
      page: 1,
    };
    this.getMatchedMentoring = this.getMatchedMentoring.bind(this);
  }
  backAction = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    this.backHandler.remove();
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    this.getMatchedMentoring();
  }
  getMatchedMentoring() {
    this.setState({DATA: []});
    axios
      .get(`${axios.defaults.baseURL}/mentoring?page=${this.state.page}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({DATA: this.state.DATA.concat(response.data.data)});
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
            <Text style={[styles.text, {color: 'gray'}]}>
              진행 중인 멘토링이 없습니다.
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.DATA}
            renderItem={(item) => {
              return renderList({item}, this.props.navigation);
            }}
            keyExtractor={(item) => item.id}
            onEndReached={() => {
              this.setState({page: this.state.page + 1});
            }}
          />
        )}
      </View>
    );
  }
}

const renderList = ({item}, navigation) => {
  return <MentoringList item={item} navi={navigation} />;
};

class MentoringList extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navi.navigate('멘토링 일지', {
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
            <Text
              style={styles.nameText}
              numberOfLines={1}
              ellipsizeMode="tail">
              📝 {this.props.item.item.subject}
            </Text>
            <Text style={styles.list_text}>
              🐥 멘토 : {this.props.item.item.mentor}
            </Text>
            <Text style={styles.list_text}>
              🐣 멘티 : {this.props.item.item.mentee}
            </Text>
          </View>
          <View style={styles.timeView}>
            <Text style={[styles.text, {textAlign: 'center', fontSize: 12}]}>
              {this.props.item.item.end === 1 ? (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navi.navigate('Review', {
                      mentoring_id: this.props.item.item.id,
                      mentor_name: this.props.item.item.mentor,
                      mentee_name: this.props.item.item.mentee,
                    })
                  }>
                  <View style={styles.ReviewButton}>
                    <Text
                      style={{
                        fontFamily: 'GmarketSansTTFMedium',
                        color: '#498C5A',
                      }}>
                      평가하기
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                `${this.props.item.item.start_date.slice(
                  0,
                  10,
                )}\n~\n${this.props.item.item.end_date.slice(0, 10)}`
              )}
            </Text>
          </View>
        </View>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    height: 95,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingLeft: '3%',
    paddingRight: '3%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //paddingVertical: 30,
  },
  contentView: {
    width: '72%',
  },
  timeView: {
    width: '21%',
  },
  nameText: {
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 18,
    marginBottom: '2%',
  },
  ReviewButton: {
    backgroundColor: '#AFDCBD',
    borderRadius: 10,
    width: 70,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list_text: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 14,
    marginVertical: 2,
  },
});
