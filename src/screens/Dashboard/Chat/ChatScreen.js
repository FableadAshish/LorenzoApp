import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, COMMOM, IMAGES} from '../../../constants';
// import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello, How can I help you today?',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: IMAGES.ProfilePicture,
  //       },
  //       sent: false, // incoming message
  //     },
  //     {
  //       _id: 2,
  //       text: 'I’m having trouble with my React Native app. It keeps crashing and I can’t figure out why.',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'You',
  //         avatar: IMAGES.YourProfilePicture,
  //       },
  //       sent: true, // outgoing message
  //     },
  //     {
  //       _id: 3,
  //       text: 'Have you tried running the app in debug mode to see if you can catch any error messages?',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: IMAGES.ProfilePicture,
  //       },
  //       sent: false, // incoming message
  //     },
  //     {
  //       _id: 4,
  //       text: 'Yes, I have. But the error messages are not very helpful.',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'You',
  //         avatar: IMAGES.YourProfilePicture,
  //       },
  //       sent: true, // outgoing message
  //     },
  //     {
  //       _id: 5,
  //       text: 'Can you share the error messages with me? I might be able to help you interpret them.',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: IMAGES.ProfilePicture,
  //       },
  //       sent: false, // incoming message
  //     },
  //     {
  //       _id: 6,
  //       text: 'Sure, here they are:',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'You',
  //         avatar: IMAGES.YourProfilePicture,
  //       },
  //       sent: true, // outgoing message
  //     },
  //     {
  //       _id: 7,
  //       text: 'It looks like you have a problem with one of your dependencies. Can you try updating them to the latest version?',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: IMAGES.ProfilePicture,
  //       },
  //       sent: false, // incoming message
  //     },
  //     {
  //       _id: 8,
  //       text: 'I’ll give that a try. Thanks for your help!',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'You',
  //         avatar: IMAGES.YourProfilePicture,
  //       },
  //       sent: true, // outgoing message
  //     },
  //     {
  //       _id: 9,
  //       text: 'You’re welcome! Let me know if you have any other questions.',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: IMAGES.ProfilePicture,
  //       },
  //       sent: false, // incoming message
  //     },
  //     {
  //       _id: 10,
  //       text: 'I will. Thanks again!',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'You',
  //         avatar: IMAGES.YourProfilePicture,
  //       },
  //       sent: true, // outgoing message
  //     }
  //   ]);
  // }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);

  // const renderSend = props => {
  //   return (
  //     <View style={styles.sendComponent}>
  //       <TouchableOpacity>
  //         <Image source={IMAGES.paperPin} style={styles.selectFilesIcon} />
  //       </TouchableOpacity>
  //       <Send {...props}>
  //         <Image source={IMAGES.send} style={styles.sendIcon} />
  //       </Send>
  //     </View>
  //   );
  // };

  return (
    <>
      <View style={{paddingHorizontal: 20, backgroundColor: 'white'}}>
        {/* <Header
          openDrawer={() => navigation.goBack()}
          iconName={'chevron-small-left'}
          title={'HubbbleVR@Support'}
        /> */}
      </View>
      {/* <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderSend={renderSend}
          alwaysShowSend
        />
      </View> */}
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
