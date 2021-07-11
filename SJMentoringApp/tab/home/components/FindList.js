import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  BackHandler,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import {connect} from 'react-redux';

class FindList extends Component {
  constructor(props) {
    super(props);
    this.findPost = this.findPost.bind(this);
    this.state = {DATA: [], page: 1};
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
    this.findPost(this.props.route.params.findThis);
  }
  findPost(search) {
    this.setState({DATA: []});
    axios
      .get(
        `${axios.defaults.baseURL}/search/?search=${search}&page=${this.state.page}`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        this.setState({
          DATA: this.state.DATA.concat(response.data.data),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.findThisView}>
          <Text style={[styles.text, {fontSize: 18, marginRight: '2%'}]}>
            💡 검색결과 :{' '}
          </Text>
          <Text style={[styles.bold, {fontSize: 20}]}>
            " {this.props.route.params.findThis} "
          </Text>
        </View>
        <View style={styles.listView}>
          {this.state.DATA.length === 0 ? (
            <View style={styles.noneView}>
              <Text style={[styles.bold, {fontSize: 18, color: 'gray'}]}>
                " {this.props.route.params.findThis} "
              </Text>
              <Text style={[styles.text, {color: 'gray'}]}>검색결과 없음.</Text>
            </View>
          ) : (
            <FlatList
              data={this.state.DATA}
              renderItem={({item}) => {
                return renderList({item}, this.props.user_id);
              }}
              keyExtractor={(item) => item.id}
              onEndReached={() => {
                this.setState({page: this.state.page + 1});
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const renderList = ({item}, user_id_) => {
  return <List item={item} user_id_={user_id_} />;
};

const List = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('업로드한 게시물', {
          lecture: props.item.lecture,
          name: props.item.name,
          level: props.item.level,
          user_info: props.item,
          user_id: props.user_id_,
        });
      }}>
      <View style={styles.list}>
        <View style={styles.info}>
          <View style={styles.lecture}>
            <Text
              style={[styles.text, {fontSize: 18}]}
              numberOfLines={1}
              ellipsizeMode="tail">
              📝 {props.item.subject}
            </Text>
          </View>
          <View style={styles.nameView}>
            <Text style={styles.text}>
              {props.item.name} {props.item.role === 1 ? '멘토' : '멘티'}
            </Text>
          </View>

          <Text style={styles.text}>수준 : {props.item.level}</Text>
          <Text
            style={[styles.text, {color: 'gray'}]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {props.item.content}
          </Text>
        </View>
        <View style={styles.timeView}>
          <Text style={[styles.text, {fontSize: 11}]}>
            {props.item.start_date.toString().slice(0, 10)}~
            {props.item.end_date.toString().slice(0, 10)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GmarketSansTTFMedium',
    marginVertical: 3,
  },
  bold: {
    fontFamily: 'GmarketSansTTFBold',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  findThisView: {
    height: '8%',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '3%',
    paddingRight: '3%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  listView: {
    //marginTop: '2%',
    height: '91%',
  },
  noneView: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  list: {
    height: 125,
    paddingLeft: '2%',
    paddingRight: '2%',
    borderBottomColor: '#AFDCBD',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: '3%',
  },
  info: {
    width: '80%',
    height: '90%',
  },
  lecture: {
    height: '32%',
    flexDirection: 'row',
  },
  nameView: {
    height: '23%',
    flexDirection: 'row',
  },
  timeView: {
    width: '20%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  user_id: state.userReducer.user_id,
});

export default connect(mapStateToProps, null)(FindList);
