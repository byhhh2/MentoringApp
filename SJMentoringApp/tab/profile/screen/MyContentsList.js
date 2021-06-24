import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: 1,
    name: '김익명',
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
    name: '김익명',
    lecture: '알고리즘',
    score: 'A',
    gender: '여성',
    time: '15시 00분',
    term: '2021월 6월 23일 - 2021년 6월 30일',
    category: '멘토',
    text: '같이 알고리즘 알아봐요~',
    level: '상',
  },
];

const MyContentsList = () => {
  const [contentList, setContentList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setContentList(data);
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={contentList}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Contents', {
                  user_info: item,
                });
              }}>
              <View style={styles.content_container}>
                <Text style={styles.bold_font}>
                  <Text style={{color: '#498C5A'}}>{item.id} | </Text>
                  {item.lecture} {item.category}
                </Text>
                <Text>{item.term}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content_container: {
    padding: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#AFDCBD',
    height: 70,
    justifyContent: 'center',
  },
  bold_font: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
});

export default MyContentsList;
