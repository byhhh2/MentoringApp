import React, {Component, PureComponent} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
/**
 * HomeScreen
 * Mentor, Mentee List
 * by 예리
 * 21.06.09
 */

const buttons = ['인기', '멘토', '멘티'];
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: 0,
      data: [
        {
          id: 1,
          name: '김익명1',
          lecture: '알고리즘',
          score: 'A',
        },
        {
          id: 2,
          name: '김익명2',
          lecture: '알고리즘',
          score: 'B',
        },
        {
          id: 3,
          name: '김익명3',
          lecture: '알고리즘',
          score: 'C',
        },
        {
          id: 4,
          name: '김익명4',
          lecture: '알고리즘',
          score: 'D',
        },
        {
          id: 5,
          name: '김익명5',
          lecture: '알고리즘',
          score: 'D',
        },
        {
          id: 6,
          name: '김익명6',
          lecture: '알고리즘',
          score: 'D',
        },
        {
          id: 7,
          name: '김익명7',
          lecture: '알고리즘',
          score: 'D',
        },
        {
          id: 8,
          name: '김익명8',
          lecture: '알고리즘',
          score: 'D',
        },
      ],
    };
  }
  render() {
    const filtering = buttons.map((type, i) => (
      <FilterButton text={type} key={i} id={i} />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Text style={{fontSize: 40, color: 'white', fontWeight: 'bold'}}>
            꿍시렁꿍시렁
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

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.list}>
          <Text>과목 : {this.props.item.item.lecture}</Text>
          <Text>이름 : {this.props.item.item.name}</Text>
          <Text>학점 : {this.props.item.item.score}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class FilterButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {isClicked: 0};
  }
  render() {
    return (
      <TouchableOpacity
        style={
          /**filtering Button function not completed yet
           * 21.06.10 by 예리
           **/
          this.state.isClicked == this.props.id
            ? styles.filterButtonClicked
            : styles.filterButton
        }
        onPress={() => {
          this.setState({isClicked: this.props.id});
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
