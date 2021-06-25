import React, {Component, PureComponent} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import axios from 'axios';

const buttons = ['인기', '멘토', '멘티'];
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.getPost = this.getPost.bind(this);
    this.state = {
      selected: [true, false, false],
      DATA: [],
    };
  }
  componentDidMount() {
    this.getPost('popular');
  }
  getPost(role) {
    this.setState({DATA: []});
    let page = 1;
    axios
      .get(`http://34.64.111.90:8080/api/v1/post/${role}/list?page=${page}`, {
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
          this.setState({selected: array});
        }}
        click={this.state.selected}
      />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Text
            style={{
              fontSize: 40,
              color: 'white',
              fontWeight: 'bold',
            }}>
            멘 토 스
          </Text>
        </View>
        <View style={styles.mainView}>
          <View style={styles.filterView}>{filtering}</View>
          <View style={styles.listView}>
            <FlatList
              data={this.state.DATA}
              renderItem={(item) => {
                return renderList({item});
              }}
              numColumns={2} //한줄에 두개
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
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
        });
      }}>
      <View style={styles.list}>
        <Text>📝 과목 : {item.item.subject}</Text>
        <Text>이름 : {item.item.name}</Text>
        <Text>수준 : {item.item.level}</Text>
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
            ? styles.filterButtonClicked
            : styles.filterButton
        }
        onPress={() => {
          this.props.callback(this.props.id);
        }}>
        <Text style={{fontSize: 20}}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFDCBD',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logoView: {
    alignSelf: 'center',
    marginBottom: '10%',
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
    //backgroundColor: 'orange',
    height: '10%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8%',
  },
  filterButtonClicked: {
    width: '30%',
    backgroundColor: '#AFDCBD',
    borderRadius: 20,
    borderColor: '#AFDCBD',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
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
    //backgroundColor: 'orange',
    height: '84%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  list: {
    backgroundColor: 'white',
    width: 160,
    height: 130,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    flexGrow: 0,
    marginHorizontal: 10,
    elevation: 3,
  },
});
