import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import MyLessonsScreen from "../screens/MyLessonsScreen";
import MyAccount from "../screens/MyAccountScreen";
import SearchScreen from "../screens/SearchScreen";
import AllLessonsScreen from "../screens/AllLessonsScreen";
import ProfileScreen from "../screens/Example";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="MyLessons2"
        component={AllLessonsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="library-books" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5,
              }}
            >
              <Icon name="search" color={COLORS.primary} size={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyLessons"
        component={MyLessonsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="book" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
