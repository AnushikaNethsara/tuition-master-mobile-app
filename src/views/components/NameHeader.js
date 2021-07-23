import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import COLORS from "../../consts/colors";
import Search from "../components/Search";
import { TouchableHighlight } from "react-native-gesture-handler";
import user from "../../assets/user.png";
import constants from "../../consts/constants";

const NameHeader = ({ navigation, userName, photo }) => {

  return (
    <View>
      <View style={style.header}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 28 }}>Hello,</Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginLeft: 10 }}>
              {userName}
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>
            What do you want today
          </Text>
        </View>
        <TouchableHighlight
          underlayColor={COLORS.white}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("MyAccount")}
        >
          {
            photo === "" ? (
              <Image
                source={user}
                style={{ height: 50, width: 50, borderRadius: 25 }}
              />
            ) : (
              <Image
                source={{ uri: constants.backend_url + photo }}
                style={{ height: 50, width: 50, borderRadius: 25 }}
              />
            )
          }
        </TouchableHighlight>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 30,
  },
});

export default NameHeader;
