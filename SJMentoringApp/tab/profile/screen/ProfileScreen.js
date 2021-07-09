import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SectionList,
  VirtualizedList,
} from 'react-native';

//navigation
import {useNavigation} from '@react-navigation/native';

//axios
import axios from 'axios';

//screen
import EditBio from './EditBio';

//redux
import {connect} from 'react-redux';

var key = 0;

const ProfileScreen = (props) => {
  const navigation = useNavigation();
  const student_id = props.student_id;

  const [bio, setBio] = useState('소개가 없습니다.');
  const [gender, setGender] = useState('여성');
  const [major, setMajor] = useState('');
  const [name, setName] = useState([]);
  const [reputation, setReputation] = useState(36.5);
  const [point, setPoint] = useState(0);

  const [mentor_review, setMentor_review] = useState([]);
  const [mentee_review, setMentee_review] = useState([]);
  const [test, setTest] = useState([]);

  var mentor_list;
  var mentee_list;

  const menus = [{m: 'm1'}, {m: 'm2'}, {m: 'm3'}];
  const ml = menus.map((menu) => (
    <View>
      <Text>{menu.m}</Text>
    </View>
  ));

  // const mentor_review_test = [
  //   {
  //     title: "mentor",
  //     item:
  //   }
  // ]

  useEffect(() => {
    getProfile();
    //console.log(props.socket);
    getReview();
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
        setPoint(response.data.data[0].point);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getReview = () => {
    axios
      .get(`${axios.defaults.baseURL}/profile/${student_id}/reviews`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        // //console.log(response.data);
        // setMentor_review([{title: 'mentor', data: response.data.data.mentor}]);
        // setMentee_review([{title: 'mentee', data: response.data.data.mentee}]);
        setMentor_review(response.data.data.mentor);
        setMentee_review(response.data.data.mentee);
        //console.log(mentor_review);
        // mentor_list = mentor_review.map((item) => (
        //   // <View style={{backgroundColor: 'red'}}>
        //   //   <Text>{item.cnt}</Text>
        //   //   <Text>test</Text>
        //   // </View>
        //   <View>
        //     <Text>test</Text>
        //   </View>
        // ));
        // console.log(mentor_list);
        //console.log(response.data.data.mentor);s
        //console.log(mentee_review);
        //setTest([{title: 'test', item: ['test', 'test']}]);
        //console.log(test);
        // console.log(mentor_list);
        // if (mentor_list.length == 0) {
        //   console.log('nul임');
        // }
        //mentor_list.length == 0
      })
      .catch((error) => {
        console.log('error', error.response);
      });
  };

  return (
    <View style={styles.container}>
      {/* User's Profile */}
      <View style={styles.profile}>
        <View style={styles.direction_row}>
          <Text style={[styles.bold, {fontSize: 20}]}>{props.user_name}</Text>
          <Text style={[styles.text, {margin: 10}]}>{gender}</Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>#{student_id}</Text>
          <Text style={styles.text}>{major}</Text>
        </View>
        <View style={styles.bio}>
          <Text style={styles.text}>
            <Text style={styles.bold}>소개 |</Text> {bio}
          </Text>
        </View>
      </View>
      {/*  */}
      <ScrollView style={{height: '100%'}} nestedScrollEnabled={true}>
        {/* User's mentoring temperature */}
        <View style={styles.manner}>
          <Text style={[styles.text, {fontSize: 15, color: '#498C5A'}]}>
            멘토링 온도
          </Text>
          <Temperature reputation={reputation} />
        </View>
        {/* review */}
        <View style={styles.list}>
          <Text
            style={[
              styles.text,
              {fontSize: 15, color: '#498C5A', marginBottom: 5},
            ]}>
            {props.user_name}님의 한줄평
          </Text>
          {/* <FlatList /> */}
          <Text style={styles.review_section}>멘토 한줄평 |</Text>
          <View>
            {
              (mentor_list = mentor_review.map((item) => (
                <View key={key++}>
                  {item.review_num == 1 ? (
                    <Review
                      text="친절하고, 설명을 잘해주세요."
                      cnt={item.cnt}
                    />
                  ) : (
                    <></>
                  )}
                  {item.review_num == 2 ? (
                    <Review text="시간 약속을 잘 지켜요." cnt={item.cnt} />
                  ) : (
                    <></>
                  )}
                  {item.review_num == 3 ? (
                    <Review text="쉬운 방식으로 설명해요." cnt={item.cnt} />
                  ) : (
                    <></>
                  )}
                  {item.review_num == 4 ? (
                    <Review text="친절하진 않아요." cnt={item.cnt} />
                  ) : (
                    <></>
                  )}
                  {item.review_num == 5 ? (
                    <Review
                      text="시간 약속을 잘 지키진 않아요."
                      cnt={item.cnt}
                    />
                  ) : (
                    <></>
                  )}
                  {item.review_num == 6 ? (
                    <Review
                      text="설명을 이해하기 쉽지 않아요."
                      cnt={item.cnt}
                    />
                  ) : (
                    <></>
                  )}
                </View>
              )))
            }
          </View>
          <View>
            {mentor_list.length == 0 ? (
              <View style={{marginVertical: 5}}>
                <Text
                  style={[styles.text, {fontSize: 16, alignSelf: 'center'}]}>
                  한줄평이 존재하지 않습니다.
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
          <Text style={styles.review_section}>멘티 한줄평 |</Text>
          <View>
            {
              (mentee_list = mentee_review.map((item) => (
                <View key={key++}>
                  {item.review_num == 11 ? (
                    <Review text="시간 약속을 잘 지켜요." cnt={item.cnt} />
                  ) : (
                    <></>
                  )}
                  {item.review_num == 12 ? (
                    <Review text="노력과 의지가 돋보입니다." cnt={item.cnt} />
                  ) : (
                    <></>
                  )}
                  {item.review_num == 13 ? (
                    <Review
                      text="멘토와의 과제를 성실히 수행해요."
                      cnt={item.cnt}
                    />
                  ) : (
                    <></>
                  )}
                  {item.review_num == 14 ? (
                    <Review
                      text="시간 약속을 잘 지키진 않아요."
                      cnt={item.cnt}
                    />
                  ) : (
                    <></>
                  )}
                  {item.review_num == 15 ? (
                    <Review text="노력이 부족해요." cnt={item.cnt} />
                  ) : (
                    <></>
                  )}
                  {item.review_num == 16 ? (
                    <Review text="과제 수행력이 부족해요." cnt={item.cnt} />
                  ) : (
                    <></>
                  )}
                </View>
              )))
            }
          </View>
          <View>
            {mentee_list.length == 0 ? (
              <View style={{marginVertical: 5}}>
                <Text
                  style={[styles.text, {fontSize: 16, alignSelf: 'center'}]}>
                  한줄평이 존재하지 않습니다.
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
        {/* my contents */}
        <View style={styles.my_contents}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('내 게시물', {
                student_id: student_id,
              });
            }}>
            <Text style={[styles.text, {fontSize: 15, color: '#498C5A'}]}>
              게시글 {'  >'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.point_section}>
          <Text style={[styles.text, {fontSize: 15, color: '#498C5A'}]}>
            내 포인트 <Text>💰 {point}</Text>
          </Text>
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
        <Text style={[styles.bold, {color: 'white'}]}>
          {reputation.toFixed(1)}도
        </Text>
      </View>
    </View>
  );
};

const Review = ({text, cnt}) => {
  return (
    <View style={styles.review}>
      <Text style={[styles.text, {fontSize: 18}]}>{text}</Text>
      <View style={{right: 0, position: 'absolute'}}>
        <Text style={[styles.text, {fontSize: 18}]}>
          {'👍🏻'} {cnt}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GmarketSansTTFMedium',
  },
  bold: {
    fontFamily: 'GmarketSansTTFBold',
  },
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
    flexDirection: 'row',
  },
  review_section: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 16,
    marginVertical: 13,
    color: 'gray',
  },
  point_section: {
    height: 'auto',
    padding: '7%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#AFDCBD',
  },
});

const mapStateToProps = (state) => ({
  socket: state.userReducer.socket,
  user_id: state.userReducer.user_id,
  user_name: state.userReducer.user_name,
});

export default connect(mapStateToProps)(ProfileScreen);
