import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, Text, Keyboard, StyleSheet } from "react-native";
import styles from "./Styles"; // Ensure you have defined your styles

const Content = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const scrollviewRef = useRef(null);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardWillShow
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardWillHide
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const keyboardWillShow = () => {
    setIsVisible(false);
    if (scrollviewRef.current) {
      scrollviewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const keyboardWillHide = () => {
    setIsVisible(true);
  };

  const getStyle = () => {
    const { style } = props;
    const tmpStyle = [styles.content];
    if (style) {
      tmpStyle.push(style);
    }
    return tmpStyle;
  };

  const getContentContainerStyle = () => {
    const { contentContainerStyle, hasHeader } = props;
    const style = [styles.contentContainerStyle];
    if (contentContainerStyle) {
      style.push(contentContainerStyle);
    }
    if (hasHeader === false) {
      style.push({ paddingTop: 0 });
    }
    return style;
  };

  return (
    <ScrollView
      ref={scrollviewRef}
      style={getStyle()}
      contentContainerStyle={getContentContainerStyle()}
      showsVerticalScrollIndicator={false}
    >
      {props.children}
    </ScrollView>
  );
};

export default Content;
