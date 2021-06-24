import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

//로그인 정보 가져올 것

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* User's Profile */}
      <View style={styles.profile}>
        <View style={styles.direction_row}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>김익명</Text>
          <Text style={{margin: 10}}>여성</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text>#18011000</Text>
          <Text>컴퓨터공학과</Text>
        </View>
        <View style={styles.bio}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>소개 |</Text> 좋은 개발자가 되는
            것이 목표입니다.
          </Text>
        </View>
      </View>
      {/* User's mentoring temperature */}
      <View style={styles.manner}>
        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#498C5A'}}>
          멘토링 온도
        </Text>
        <Temperature />
      </View>
      {/* review */}
      <View style={styles.list}>
        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#498C5A'}}>
          {'익명'}님의 한줄평
        </Text>
        <Review text="친절하고, 설명을 잘해주세요." />
        <Review text="시간 약속을 잘 지켜요." />
        <Review text="쉬운 방식으로 설명해요." />
      </View>
      {/* my contents */}
      <View style={styles.my_contents}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('내 게시물');
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#498C5A'}}>
            게시글 {'  >'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Temperature = () => {
  return (
    <View
      style={{
        backgroundColor: '#AFDCBD',
        width: '100%',
        height: 30,
        borderRadius: 20,
        marginTop: 25,
        opacity: 0.7,
      }}>
      <View
        style={{
          backgroundColor: '#498C5A',
          width: `${40}%`,
          height: 30,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          //opacity: 1,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{40}도</Text>
      </View>
    </View>
  );
};

const Review = ({text}) => {
  return (
    <View style={styles.review}>
      <Text style={{fontSize: 18}}>👍🏻 {text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    height: '30%',
    backgroundColor: '#AFDCBD',
    padding: '7%',
  },
  manner: {
    height: '20%',
    paddingLeft: '7%',
    paddingRight: '7%',
    borderBottomWidth: 1,
    borderBottomColor: '#AFDCBD',
    justifyContent: 'center',
  },
  list: {
    height: '30%',
    paddingLeft: '7%',
    paddingRight: '7%',
    borderBottomWidth: 1,
    borderBottomColor: '#AFDCBD',
    justifyContent: 'center',
  },
  my_contents: {
    height: '10%',
    paddingLeft: '7%',
    paddingRight: '7%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#AFDCBD',
  },
  direction_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bio: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 7,
  },
  review: {
    marginTop: 10,
  },
});

export default ProfileScreen;
