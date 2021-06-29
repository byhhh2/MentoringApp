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

//navigation
import {useNavigation} from '@react-navigation/native';

//axios
import axios from 'axios';

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

const MyContentsList = (props) => {
  const [contentList, setContentList] = useState([]);
  const navigation = useNavigation();
  const [student_id, setStudent_id] = useState('');
  const [myContents, setMyContents] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    axios
      .get(
        `http://34.64.111.90:8080/api/v1/profile/${props.route.params.student_id}/posts`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        setMyContents(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myContents}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Contents', {
                  user_id: student_id,
                  user_info: item,
                });
              }}>
              <View style={styles.content_container}>
                <Text style={styles.bold_font}>
                  <Text style={{color: '#498C5A'}}>{item.id} | </Text>
                  {item.subject} {item.role == 1 ? '멘토' : '멘티'}
                </Text>
                <Text>
                  {item.start_date.replace('T15:00:00.000Z', '')} ~{' '}
                  {item.end_date.replace('T15:00:00.000Z', '')}
                </Text>
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
