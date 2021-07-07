import React, {Component, PureComponent, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

const SpeechBubble = () => {
  return (
    <View style={styles.speech_bubble}>
      <Text style={{fontFamily: 'GmarketSansTTFMedium'}}>안녕</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  speech_bubble: {
    width: 'auto',
    height: 40,
    backgroundColor: '#AFDCBD',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
});

export default SpeechBubble;
