import React, { useState } from "react";
import { Text, ScrollView, View, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import constants from "../../consts/constants";
import axios from "axios"
import { AsyncStorage } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("luca@a.com");
  const [password, setPassword] = useState("luca@a.com");
  const [error, setError] = useState("");


  const onSubmit = async () => {
    try {
      setError("");
      const loginRes = await axios.post(
        constants.backend_url + "/student/login",
        {
          email,
          password,
        }
      );
      storeUserData(loginRes.data.token, loginRes.data.user.id)
      navigation.navigate("Home")
    } catch (err) {
      setError(err.response.data.msg)
    }
  }

  const storeUserData = async (token, id) => {
    try {
      await AsyncStorage.setItem(
        'token',
        token
      );
      await AsyncStorage.setItem(
        'userId',
        id
      );
    } catch (error) {
      Alert.alert(
        "Alert",
        "Something went wrong!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  };



  return (
    <View style={{ backgroundColor: "#FFF", height: "100%" }}>
      <Image
        source={require("../../assets/logo5.png")}
        style={{ width: "100%", height: "43%" }}
      />
      <Text
        style={{
          marginTop: -10,
          fontSize: 30,
          alignSelf: "center",
        }}
      >
        Get the Skills
      </Text>

      <View >
        <Text
          style={{
            marginHorizontal: 55,
            textAlign: "center",
            marginTop: 1,
            opacity: 0.4,
          }}
        >
          Welcome to the Tuition Master website. 
          Your favorite tuition master is now finger tip away. 
          We support Over 1000 video courses on school grades with multi medium
        </Text>
        <Text style={{
          marginHorizontal: 55,
          textAlign: "center",
          marginTop: 3,
          color: "red"
        }}>
          {error}
        </Text>
      </View>

      <ScrollView>
        <View style={style.mailView}>
          <Icon name="mail" color="#00716F" size={24} />
          <TextInput placeholder="Email" style={{ paddingHorizontal: 10, height: 45, fontSize: 18 }} onChangeText={text => setEmail(text)} />
        </View>
        <View style={style.passwordView}>
          <Icon name="lock" color="#00716F" size={24} />
          <TextInput
            secureTextEntry={true}
            placeholder="Password" style={{ paddingHorizontal: 10, height: 45, fontSize: 18 }} onChangeText={text => setPassword(text)} />
        </View>

        <TouchableOpacity onPress={onSubmit}>
          <View
            style={style.loginButton}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Login
            </Text>
          </View>
        </TouchableOpacity>

        <Text
          onPress={() => navigation.navigate("SignUpScreen")}
          style={{
            alignSelf: "center",
            color: "#00716F",
            paddingVertical: 30,
          }}
        >
          New User
        </Text>
      </ScrollView>
    </View>
  );
};

export default Login;

const style = StyleSheet.create({
  mailView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
  },
  passwordView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
  },
  loginButton: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 23,
  },
  paragrapgh: {
    marginHorizontal: 55,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.4,
  },
});
