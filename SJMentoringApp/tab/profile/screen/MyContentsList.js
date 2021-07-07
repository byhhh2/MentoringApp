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
        `${axios.defaults.baseURL}/profile/${props.route.params.student_id}/posts`,
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
                  <Text style={[styles.text, {color: '#498C5A'}]}>
                    {' '}
                    {'📄 '}{' '}
                  </Text>
                  {item.subject} {item.role == 1 ? '- 멘토' : '- 멘티'}
                </Text>
                <Text style={styles.text}>
                  {item.start_date.substring(2, 10)} ~{' '}
                  {item.end_date.substring(2, 10)}
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
  text: {
    fontFamily: 'GmarketSansTTFMedium',
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content_container: {
    padding: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#AFDCBD',
    height: 80,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  bold_font: {
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 15,
    marginBottom: 5,
  },
});

export default MyContentsList;
