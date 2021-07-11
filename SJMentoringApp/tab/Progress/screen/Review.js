import React, {Component, PureComponent, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

//axios
import axios from 'axios';

//redux
import {connect} from 'react-redux';

const Review = (props) => {
  const [reviewArray, setRiviewArray] = useState([]);

  //useEffect(() => {
  //connectSocket();
  //console.log(props.navigation);
  //props.user_name
  //props.route.params.mentor_name
  //console.log(props.route.params.mentoring_id);
  //}, []);
  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const postReview = () => {
    axios
      .post(
        `${axios.defaults.baseURL}/mentoring/${props.route.params.mentoring_id}/review`,
        {
          review: reviewArray,
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        상대방의 좋았던 점과, 나빴던 점을 선택해주세요!
      </Text>
      {props.route.params.mentee_name == props.user_name ? (
        <ScrollView style={styles.scrollbox}>
          <Text style={styles.title_text}>긍정적 평가 ✔</Text>
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="친절하고, 설명을 잘해주세요."
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(1);
              } else {
                var index = reviewArray.indexOf(1);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="시간 약속을 잘 지켜요."
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(2);
              } else {
                var index = reviewArray.indexOf(2);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="쉬운 방식으로 설명해요."
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(3);
              } else {
                var index = reviewArray.indexOf(3);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <Text style={styles.title_text}>부정적 평가 ✔</Text>
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="친절하진 않아요."
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(4);
              } else {
                var index = reviewArray.indexOf(4);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="시간 약속을 잘 지키진 않아요."
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(5);
              } else {
                var index = reviewArray.indexOf(5);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="설명을 이해하기 쉽지 않아요."
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(6);
              } else {
                var index = reviewArray.indexOf(6);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <TouchableOpacity
            style={styles.click_ok}
            onPress={() => {
              postReview();
              console.log(reviewArray);
              props.navigation.goBack();
            }}>
            <Text style={styles.ok_text}>완료</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollbox}>
          <Text style={styles.title_text}>긍정적 평가 ✔</Text>
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="시간 약속을 잘 지켜요."
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(11);
              } else {
                var index = reviewArray.indexOf(11);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="노력과 의지가 돋보입니다."
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(12);
              } else {
                var index = reviewArray.indexOf(12);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="멘토와의 과제를 성실히 수행해요. "
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(13);
              } else {
                var index = reviewArray.indexOf(13);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <Text style={styles.title_text}>부정적 평가 ✔</Text>
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="시간 약속을 잘 지키진 않아요."
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(14);
              } else {
                var index = reviewArray.indexOf(14);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="노력이 부족해요. "
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(15);
              } else {
                var index = reviewArray.indexOf(15);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <BouncyCheckbox
            size={27}
            fillColor="#AFDCBD"
            unfillColor="white"
            text="과제 수행력이 부족해요."
            iconStyle={{borderColor: '#AFDCBD', marginVertical: 15}}
            textStyle={{fontFamily: 'GmarketSansTTFMedium', marginVertical: 15}}
            onPress={(isChecked) => {
              if (isChecked == true) {
                reviewArray.push(16);
              } else {
                var index = reviewArray.indexOf(16);
                reviewArray.splice(index, 1);
              }
            }}
          />
          <TouchableOpacity
            style={styles.click_ok}
            onPress={() => {
              postReview();
              console.log(reviewArray);
              props.navigation.goBack();
            }}>
            <Text style={styles.ok_text}>완료</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 16,
    color: '#498C5A',
  },
  bold: {
    fontFamily: 'GmarketSansTTFBold',
  },
  container: {
    flex: 1,
    backgroundColor: '#AFDCBD',
    display: 'flex',
    //justifyContent: 'center',
    padding: '5%',
    alignItems: 'center',
  },
  scrollbox: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: '100%',
    marginTop: 10,
    padding: 20,
  },
  title_text: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 16,
    color: '#498C5A',
    marginVertical: 20,
    alignSelf: 'center',
  },
  click_ok: {
    alignSelf: 'center',
    backgroundColor: '#AFDCBD',
    width: 100,
    marginVertical: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  ok_text: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 16,
    color: '#498C5A',
  },
});

const mapStateToProps = (state) => ({
  socket: state.userReducer.socket,
  user_id: state.userReducer.user_id,
  user_name: state.userReducer.user_name,
});

export default connect(mapStateToProps, null)(Review);
