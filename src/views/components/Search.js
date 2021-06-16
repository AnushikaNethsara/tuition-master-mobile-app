import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";



const Search = () => {
  return (
    <View
      style={{
        marginTop: 40,
        flexDirection: "row",
        paddingHorizontal: 20,
        marginVertical:20
      }}
    >
      <View style={style.inputContainer}>
        <Icon name="search" size={28} />
        <TextInput
          style={{ flex: 1, fontSize: 18 }}
          placeholder="Search for lesson"
        />
      </View>
      <View style={style.sortBtn}>
        <Icon name="search" size={28} color={COLORS.white} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Search;
