import React, {Component, PureComponent} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const buttons = ['인기', '멘토', '멘티'];
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [true, false, false],
      data: [
        {
          id: 1,
          name: '김익명1',
          lecture: '알고리즘',
          score: 'A',
          gender: '여성',
          time: '15시 00분',
          term: '2021월 6월 23일 - 2021년 6월 30일',
          category: '멘토',
          text: '같이 알고리즘 알아봐요~',
          level: '상',
        },
        {
          id: 2,
          name: '김익명2',
          lecture: '알고리즘',
          score: 'B',
          gender: '남성',
          time: '15시 00분',
          term: '2021월 6월 23일 - 2021년 6월 30일',
          category: '멘토',
          text: '알고리즘 너무 재밌어요.',
          level: '상',
        },
        {
          id: 3,
          name: '김익명3',
          lecture: '알고리즘',
          score: 'C',
          gender: '여성',
          time: '15시 00분',
          term: '2021월 6월 23일 - 2021년 6월 30일',
          category: '멘티',
          text: '알고리즘 알고싶다',
          level: '하',
        },
        {
          id: 4,
          name: '김익명4',
          lecture: '알고리즘',
          score: 'D',
          gender: '남성',
          time: '15시 00분',
          term: '2021월 6월 23일 - 2021년 6월 30일',
          category: '멘티',
          text: '알고리즘 알려주세요 ㅠㅠ',
          level: '하',
        },
        {
          id: 5,
          name: '김익명5',
          lecture: '알고리즘',
          score: 'D',
          gender: '여성',
          time: '15시 00분',
          term: '2021월 6월 23일 - 2021년 6월 30일',
          category: '멘티',
          text: '알고리즘 ㅗ~',
          level: '하',
        },
        {
          id: 6,
          name: '김익명6',
          lecture: '알고리즘',
          score: 'D',
          gender: '남성',
          time: '15시 00분',
          term: '2021월 6월 23일 - 2021년 6월 30일',
          category: '멘티',
          text: '알고리즘이 뭐에요?',
          level: '하',
        },
        {
          id: 7,
          name: '김익명7',
          lecture: '알고리즘',
          score: 'D',
          gender: '여성',
          time: '15시 00분',
          term: '2021월 6월 23일 - 2021년 6월 30일',
          category: '멘티',
          text: '같이 알고리즘 알아봐요~',
          level: '하',
        },
        {
          id: 8,
          name: '김익명8',
          lecture: '알고리즘',
          score: 'D',
          gender: '여성',
          time: '15시 00분',
          term: '2021월 6월 23일 - 2021년 6월 30일',
          category: '멘티',
          text: '알고리즘 거져~',
          level: '하',
        },
      ],
    };
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
          let array = this.state.selected;
          if (array[id] == false) array[id] = !array[id];
          for (let j = 0; j < 3; j++) {
            if (id != j) {
              if (array[j] == true) array[j] = false;
            } else {
              array[j] = true;
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
              data={this.state.data}
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
          score: item.item.score,
          user_info: item.item,
        });
      }}>
      <View style={styles.list}>
        <Text>과목 : {item.item.lecture}</Text>
        <Text>이름 : {item.item.name}</Text>
        <Text>학점 : {item.item.score}</Text>
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
