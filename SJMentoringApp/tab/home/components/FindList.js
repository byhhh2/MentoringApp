import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default class FindList extends Component {
  constructor(props) {
    super(props);
    this.findPost = this.findPost.bind(this);
    this.state = {DATA: []};
  }
  componentDidMount() {
    this.findPost(this.props.route.params.findThis);
  }
  findPost(search) {
    let page = 1;
    this.setState({DATA: []});
    axios
      .get(
        `http://34.64.111.90:8080/api/v1/search/?search=${search}&page=${page}`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        this.setState({DATA: this.state.DATA.concat(response.data.data)});
        page++;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.findThisView}>
          <Text style={{fontSize: 18, marginRight: '2%'}}>💡 검색결과 : </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            " {this.props.route.params.findThis} "
          </Text>
        </View>
        <View style={styles.listView}>
          {this.state.DATA.length === 0 ? (
            <View style={styles.noneView}>
              <Text style={{fontWeight: 'bold', fontSize: 18, color: 'gray'}}>
                " {this.props.route.params.findThis} "
              </Text>
              <Text style={{color: 'gray'}}>검색결과 없음.</Text>
            </View>
          ) : (
            <FlatList
              data={this.state.DATA}
              renderItem={(item) => {
                return renderList({item});
              }}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    );
  }
}

const renderList = ({item}) => {
  return <List item={item} />;
};

const List = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Contents', {
          lecture: item.item.lecture,
          name: item.item.name,
          level: item.item.level,
          user_info: item.item,
          user_id: item.item.student_id,
        });
      }}>
      <View style={styles.list}>
        <View style={styles.info}>
          <View style={styles.lecture}>
            <Text style={{fontSize: 18}}>📝 과목 : {item.item.subject}</Text>
          </View>
          <View style={styles.nameView}>
            <Text
              style={{
                fontSize: 16,
                color: '#498C5A',
                fontWeight: 'bold',
                marginRight: '3%',
              }}>
              {item.item.role === 1 ? '멘토' : '멘티'}
            </Text>
            <Text>{item.item.name}</Text>
          </View>

          <Text>수준 : {item.item.level}</Text>
          <Text style={{color: 'gray'}}>{item.item.content}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={{fontSize: 13}}>
            {item.item.start_date.toString().slice(0, 10)}~
            {item.item.end_date.toString().slice(0, 10)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    marginTop: '2%',
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
    height: 90,
    paddingTop: '1%',
    paddingLeft: '2%',
    paddingRight: '2%',
    borderBottomColor: '#AFDCBD',
    borderBottomWidth: 1,
    flexDirection: 'row',
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
