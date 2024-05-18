import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, COMMOM, IMAGES} from '../../../constants';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {Header} from '../../../components/Header';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, How can I help you',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: IMAGES.ProfilePicture,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = props => {
    return (
      <View style={styles.sendComponent}>
        <TouchableOpacity>
          <Image source={IMAGES.paperPin} style={styles.selectFilesIcon} />
        </TouchableOpacity>
        <Send {...props}>
          <Image source={IMAGES.send} style={styles.sendIcon} />
        </Send>
      </View>
    );
  };

  return (
    <>
      <View style={{paddingHorizontal: 20, backgroundColor: 'white'}}>
        <Header
          openDrawer={() => navigation.goBack()}
          iconName={'chevron-small-left'}
        />
      </View>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderSend={renderSend}
          alwaysShowSend
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  selectFilesIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 15,
    tintColor: COLORS.black,
  },
  sendIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  sendComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default ChatScreen;
