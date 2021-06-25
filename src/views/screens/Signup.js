import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Picker,
  Platform,
  Button
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError] = useState("");

  //**************//
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  //**************//


  const onSubmit = async () => {
    let first_name = firstName;
    let last_name = lastName;
    let date_of_birth = date.toISOString().split("T")[0];
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
          <Icon name="user" color="#00716F" size={24} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10, height: 45, fontSize:18 }}
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View style={style.inputView}>
          <Icon name="user" color="#00716F" size={24} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10, height:45,fontSize:18 }}
            onChangeText={text => setLastName(text)}
          />
        </View>
        <View style={style.inputView}>
          <Icon name="mail" color="#00716F" size={24} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10, height:45,fontSize:18 }}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={style.inputView}>
          <Icon name="idcard" color="#00716F" size={24} />
          <TextInput
            placeholder="NIC"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10, height:45,fontSize:18 }}
            onChangeText={text => setNic(text)}
          />
        </View>
        <View style={style.inputView}>
          <Icon name="user" color="#00716F" size={24} />
          <Picker
            selectedValue={gender}
            placeholder="Gender"
            style={{ height: 50, width: "90%", fontSize: 18, color:"#00716F"}}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
          {/* <TextInput
            placeholder="Gender"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10, height:45,fontSize:18 }}
            onChangeText={text => setGender(text)}
          /> */}
        </View>
        <TouchableOpacity onPress={showDatepicker} activeOpacity={1}>
          <View style={style.inputView}>
            <Icon name="calendar" color="#00716F" size={24} />
            <TextInput
              editable={false}
              placeholder="Date of Birth"
              value={date.toISOString().split("T")[0]}
              placeholderTextColor="#00716F"
              style={{ paddingHorizontal: 10, height: 45, fontSize: 18 }}
              onChangeText={text => setDateOfBirth(text)}
            />
            <View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        

        <View style={style.inputView}>
          <Icon name="lock" color="#00716F" size={24} />
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10, height:45,fontSize:18 }}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={style.inputView}>
          <Icon name="lock" color="#00716F" size={24} />
          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="#00716F"
            style={{ paddingHorizontal: 10, height:45,fontSize:18 }}
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
