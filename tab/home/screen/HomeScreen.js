import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
/**
 * HomeScreen
 * Mentor, Mentee List
 * by 예리
 * 21.06.09
 */
export default class HomeScreen extends PureComponent {
  render() {
    this.state = {
      data: [
        {
          name: '김익명1',
          lecture: '알고리즘',
          score: 'A',
        },
        {
          name: '김익명2',
          lecture: '알고리즘',
          score: 'B',
        },
        {
          name: '김익명3',
          lecture: '알고리즘',
          score: 'C',
        },
        {
          name: '김익명4',
          lecture: '알고리즘',
          score: 'D',
        },
        {
          name: '김익명5',
          lecture: '알고리즘',
          score: 'D',
        },
        {
          name: '김익명6',
          lecture: '알고리즘',
          score: 'D',
        },
        {
          name: '김익명7',
          lecture: '알고리즘',
          score: 'D',
        },
        {
          name: '김익명8',
          lecture: '알고리즘',
          score: 'D',
        },
      ],
    };
    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Text style={{fontSize: 40, color: 'white', fontWeight: 'bold'}}>
            Sejong Mentoring
          </Text>
        </View>
        <View style={styles.mainView}>
          <View style={styles.filterView}>
            <FilterButton text="인기" />
            <FilterButton text="멘토" />
            <FilterButton text="멘티" />
          </View>
          <View style={styles.listView}>
            <FlatList
              data={this.state.data}
              renderItem={(item) => {
                return renderList({item});
              }}
              numColumns={2} //한줄에 두개
              keyExtractor={(index) => index.toString()}
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
  return (
    <TouchableOpacity>
      <View style={styles.list}>
        <Text>과목 : {item.item.lecture}</Text>
        <Text>이름 : {item.item.name}</Text>
        <Text>학점 : {item.item.score}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FilterButton = (props) => {
  return (
    <TouchableOpacity style={styles.filterButton}>
      <View>
        <Text style={{fontSize: 20}}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

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
