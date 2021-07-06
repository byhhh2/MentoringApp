import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

//navigation
import {useNavigation} from '@react-navigation/native';

//axios
import axios from 'axios';

//screen
import EditBio from './EditBio';

//redux
import {connect} from 'react-redux';

const ProfileScreen = (props) => {
  const navigation = useNavigation();
  const student_id = props.student_id;

  const [bio, setBio] = useState('소개가 없습니다.');
  const [gender, setGender] = useState('여성');
  const [major, setMajor] = useState('');
  const [name, setName] = useState([]);
  const [reputation, setReputation] = useState(36.5);

  useEffect(() => {
    getProfile();
    //console.log(props.socket);
  }, []);

  const getProfile = () => {
    axios
      .get(`${axios.defaults.baseURL}/profile/${student_id}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        setBio(
          response.data.data[0].bio == null
            ? '소개가 없습니다.'
            : response.data.data[0].bio,
        );
        setGender(
          response.data.data[0].gender == null
            ? '여성'
            : response.data.data[0].gender,
        );
        setMajor(response.data.data[0].major);
        setName(response.data.data[0].name);
        setReputation(response.data.data[0].reputation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* User's Profile */}
      <View style={styles.profile}>
        <View style={styles.direction_row}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{name}</Text>
          <Text style={{margin: 10}}>{gender}</Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text>#{student_id}</Text>
          <Text>{major}</Text>
        </View>
        <View style={styles.bio}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>소개 |</Text> {bio}
          </Text>
        </View>
      </View>
      {/* User's mentoring temperature */}
      <ScrollView style={{height: '100%'}}>
        <View style={styles.manner}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#498C5A'}}>
            멘토링 온도
          </Text>
          <Temperature reputation={reputation} />
        </View>
        {/* review */}
        <View style={styles.list}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#498C5A'}}>
            {name}님의 한줄평
          </Text>
          <Review text="친절하고, 설명을 잘해주세요." />
          <Review text="시간 약속을 잘 지켜요." />
          <Review text="쉬운 방식으로 설명해요." />
        </View>
        {/* my contents */}
        <View style={styles.my_contents}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('내 게시물', {
                student_id: student_id,
              });
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#498C5A'}}>
              게시글 {'  >'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {props.flag == true ? (
        <EditBio
          flag={props.flag}
          setFlag={props.setFlag}
          student_id={student_id}
          setBio={setBio}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const Temperature = ({reputation}) => {
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
          width: `${reputation}%`,
          height: 30,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{reputation}도</Text>
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
    height: 'auto',
    backgroundColor: '#AFDCBD',
    padding: '7%',
  },
  manner: {
    height: 'auto',
    padding: '7%',
    borderBottomWidth: 1,
    borderBottomColor: '#AFDCBD',
    justifyContent: 'center',
  },
  list: {
    height: 'auto',
    padding: '7%',
    borderBottomWidth: 1,
    borderBottomColor: '#AFDCBD',
    justifyContent: 'center',
  },
  my_contents: {
    height: 'auto',
    padding: '7%',
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

const mapStateToProps = (state) => ({
  socket: state.userReducer.socket,
});

export default connect(mapStateToProps)(ProfileScreen);
