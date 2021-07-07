import React, {Component, PureComponent} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

//Icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//axios
import axios from 'axios';
import {TextInput} from 'react-native-gesture-handler';

const buttons = ['인기', '멘토', '멘티'];
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.getPost = this.getPost.bind(this);
    this.state = {
      selected: [true, false, false],
      filter: 'popular',
      DATA: [],
      findValue: '',
    };
  }
  componentDidMount() {
    this._rerender = this.props.navigation.addListener('focus', () => {
      this.getPost('popular');
      this.setState({selected: [true, false, false]});
    });
  }
  /*componentWillUnmount() {
    this._rerender();
  }
  componentDidMount() {
    this.getPost('popular');
  }*/
  getPost(role) {
    this.setState({DATA: []});
    let page = 1;
    axios
      .get(`${axios.defaults.baseURL}/post/${role}/list?page=${page}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        //console.log(response.data);
        this.setState({DATA: this.state.DATA.concat(response.data.data)});
        page++;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const filtering = buttons.map((type, i) => (
      <FilterButton
        text={type}
        key={i}
        id={i}
        callback={(id) => {
          /**filtering Button function
           * by 예리
           **/
          let role = '';
          let array = this.state.selected;
          if (array[id] == false) array[id] = !array[id];
          for (let j = 0; j < 3; j++) {
            if (id != j) {
              if (array[j] == true) array[j] = false;
            } else {
              array[j] = true;
              if (buttons[id] === '인기') role = 'popular';
              else if (buttons[id] === '멘토') role = 'mentor';
              else role = 'mentee';
              this.getPost(role);
            }
          }
          this.setState({selected: array, filter: role});
        }}
        click={this.state.selected}
      />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 45,
                color: 'white',
                fontFamily: 'GmarketSansTTFBold',
              }}>
              MENTORS
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                fontFamily: 'GmarketSansTTFMedium',
              }}>
              멘 토 스
            </Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.find}>
            <TextInput
              placeholder={'전체 게시물 검색'}
              style={{
                width: '90%',
                marginRight: '2%',
              }}
              value={this.state.findValue}
              onChangeText={(text) => this.setState({findValue: text})}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('FindList', {
                  findThis: this.state.findValue,
                });
                this.setState({findValue: ''});
              }}>
              <MaterialCommunityIcons name={'magnify'} size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.filterView}>{filtering}</View>
          <View>
            <Text style={[styles.text, {color: 'gray'}]}>
              {this.state.filter === 'popular'
                ? '인기 멘토 게시물'
                : this.state.filter === 'mentor'
                ? '멘토 게시물'
                : '멘티 게시물'}
            </Text>
          </View>
          <View style={styles.listView}>
            <ImageBackground
              source={require('../../../image/로고main.png')}
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              resizeMode="center">
              <FlatList
                data={this.state.DATA}
                renderItem={({item}) => {
                  return renderList({item}, this.props.student_id);
                }}
                numColumns={2} //한줄에 두개
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}

const renderList = ({item}, student_id) => {
  return <List item={item} id={student_id} />;
};

const List = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Contents', {
          lecture: props.item.lecture,
          name: props.item.name,
          level: props.item.level,
          user_info: props.item,
          user_id: props.id,
        });
      }}>
      <View style={styles.list}>
        <Text style={styles.bold}>{props.item.subject}</Text>
        <Text style={styles.text}>{props.item.name}</Text>
        <Text style={styles.text}>{props.item.level}</Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {props.item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

class FilterButton extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={
          this.props.click[this.props.id]
            ? [styles.filterButton, styles.filterButtonClicked]
            : styles.filterButton
        }
        onPress={() => {
          this.props.callback(this.props.id);
        }}>
        <Text style={[styles.text, {fontSize: 20}]}>{this.props.text}</Text>
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
    //flex: 1,
    height: 700,
    backgroundColor: '#AFDCBD',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logoView: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '7%',
  },
  imageLogo: {
    width: 120,
    height: 120,
  },
  mainView: {
    //하얀 배경 View
    backgroundColor: 'white',
    height: '80%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: '8%',
    display: 'flex',
    alignItems: 'center',
  },
  filterView: {
    width: '90%',
    height: '10%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  filterButtonClicked: {
    backgroundColor: '#AFDCBD',
  },
  filterButton: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#AFDCBD',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  listView: {
    marginTop: '1%',
    height: '65%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  list: {
    backgroundColor: 'white',
    paddingRight: '5%',
    paddingLeft: '5%',
    width: 160,
    height: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    //alignItems: 'center',
    marginVertical: 8,
    flexGrow: 0,
    marginHorizontal: 15,
    elevation: 10,
  },
  find: {
    width: '85%',
    height: '10%',
    marginBottom: '4%',
    borderColor: '#AFDCBD',
    borderWidth: 2,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '6%',
    paddingRight: '3%',
    flexDirection: 'row',
  },
});
