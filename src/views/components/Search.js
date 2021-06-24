import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";



const Search = (props) => {
  const [keyword, setKeyword] = useState("");
  return (
    <View
      style={{
        marginTop: 40,
        flexDirection: "row",
        paddingHorizontal: 20,
        marginVertical: 20
      }}
    >
      <View style={style.inputContainer}>
        <Icon name="search" size={28} />
        <TextInput
          style={{ flex: 1, fontSize: 18 }}
          placeholder="Search for lesson"
          onChangeText={text => { setKeyword(text) }}
        />
      </View>
      <TouchableOpacity style={style.sortBtn}
        onPress={() => props.getSearchedLessons(keyword)}>
        <Icon name="search" size={28} color={COLORS.white} />
      </TouchableOpacity>
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
