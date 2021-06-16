import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import COLORS from "../../consts/colors";
import { PrimaryButton } from '../components/Button';
import constants from "../../consts/constants";
import axios from "axios"

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nic, setNic] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError] = useState("");


  const onSubmit = async () => {
    console.log("Ko: " + firstName);
    let first_name = firstName;
    let last_name = lastName;
    let date_of_birth = dateOfBirth;
    let passwordCheck = conPassword;
    let ban_status = false;
    let newStudent = {
      first_name,
      last_name,
      email,
      password,
      passwordCheck,
      date_of_birth,
      gender,
      nic,
      ban_status,
    };
    try {
      setError("");
      const loginRes = await axios.post(
        constants.backend_url + "/student/signup",
        newStudent
      );
      navigation.navigate("LoginScreen")
    } catch (err) {
      setError(err.response.data.msg)
    }
  }




  return (
    <View style={{ backgroundColor: "#FFF", height: "100%" }}>
      <Image
        source={require("../../assets/logo5.png")}
        style={{ width: "50%", height: "30%", marginHorizontal: "20%" }}
      />
      <Text
        style={{
          fontSize: 30,
          alignSelf: "center",
        }}
      >
        Learn for your future
      </Text>
      <View >
        <Text
          style={{
            marginHorizontal: 55,
            textAlign: "center",
            marginTop: 5,
            opacity: 0.4,
          }}
        >
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </Text>
        <Text style={{
          marginHorizontal: 55,
          textAlign: "center",
          marginTop: 5,
          marginBottom: "5%",
          color: "red"
        }}>
          {error}
        </Text>
      </View>


      <ScrollView>
        <View style={style.mail}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10 }}
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10 }}
            onChangeText={text => setLastName(text)}
          />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10 }}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="NIC"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10 }}
            onChangeText={text => setNic(text)}
          />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="Gender"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10 }}
            onChangeText={text => setGender(text)}
          />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="Date of Birth"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10 }}
            onChangeText={text => setDateOfBirth(text)}
          />
        </View>

        <View style={style.inputView}>
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10 }}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={style.inputView}>
          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10 }}
            onChangeText={text => setConPassword(text)}
          />
        </View>

        <TouchableOpacity onPress={onSubmit}>
          <View style={style.regButton}>
            <Text
              style={{
                color: "white",
              }}
            >
              Register
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate("LoginScreen")}
          style={{
            alignSelf: "center",
            color: "#00716F",
            paddingVertical: 30,
            marginBottom: "15%",
          }}
        >
          Already have an account
        </Text>
      </ScrollView>
    </View>
  );
};

export default Register;

const style = StyleSheet.create({
  inputView: {
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
  regButton: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 23,

  },
  mail: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 50,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
  },
});
