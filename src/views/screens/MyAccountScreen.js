import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import lessons from "../../consts/lessons";
import { PrimaryButton } from "../components/Button";
import constants from "../../consts/constants";
import { AsyncStorage } from 'react-native';
import axios from "axios"
const { width } = Dimensions.get("screen");

const card = width;

const MyAccount = ({ navigation }) => {

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [studentDetails, setStudentsDeatils] = useState([]);

  useEffect(() => {
    retrieveUserData();
  }, [])

  const getUserDetails = (id) => {
    try {
      axios.get(constants.backend_url + "/student/studentaccountdetails/" + id)
        .then(res => {
          console.log(res.data);
          setStudentsDeatils(res.data);
        })

    } catch (err) {
      console.log(err.response.data.msg)
    }
  }



  const retrieveUserData = async () => {
    try {
      const getToken = await AsyncStorage.getItem('token');
      const getUserId = await AsyncStorage.getItem('userId');
      if (getToken !== null && getUserId !== null) {
        setToken(getToken);
        setUserId(getUserId);
        getUserDetails(getUserId);
      }
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
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>My Account</Text>
      </View>
      <ScrollView>
        {
          studentDetails.map((item, index) => {
            return (
              <View style={styles.container} key={index}>
                <View style={styles.header2}></View>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/profile.png")}
                />
                <View style={styles.body}>
                  <View style={styles.bodyContent}>
                    <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
                    <Text style={styles.info}>{item.email}</Text>
                    <Text style={styles.description}>First Name : {item.first_name}</Text>
                    <Text style={styles.description}>Last Name : {item.last_name}</Text>
                    <Text style={styles.description}>Email:{item.email}</Text>
                    <Text style={styles.description}>Gender:{item.gender}</Text>
                    <Text style={styles.description}>NIC:{item.nic}</Text>
                    <Text style={styles.description}>Date of Birth:{item.date_of_birth}</Text>


                    <TouchableOpacity onPress={() => navigation.navigate("EditAccountScreen")} style={styles.buttonContainer}>
                      <Text
                        style={{
                          color: COLORS.white,
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        <Icon name="edit" size={20} />
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })
        }
      </ScrollView>


    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  header2: {
    backgroundColor: COLORS.primary,
    height: 150,
  },
  lessonCard: {
    height: card * 1.1,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    //alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 80,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 3,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    color: COLORS.white
  },
});

export default MyAccount;
