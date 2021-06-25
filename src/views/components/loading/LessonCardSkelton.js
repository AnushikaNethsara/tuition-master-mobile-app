import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import COLORS from "../../../consts/colors";
const { width } = Dimensions.get("screen");
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const card = width;



const LessonCardSkelton = () => {
    return (

        <View>
            <View>
                {Array(9)
                    .fill()
                    .map((item, index) => (
                        <View style={style.lessonCard} key={index}>
                            <SkeletonPlaceholder >
                                <View style={{ flexDirection: "row"}}>
                                    <View style={{ width: 90, height: 90, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 ,width:1000}}>
                                        <View style={{ width: 180, height: 20, borderRadius: 2}} />
                                        <View
                                            style={{ marginTop: 6, width: 150, height: 10, borderRadius: 2 }}
                                        />
                                        <View style={{ marginTop: 6,width: 100, height: 10, borderRadius: 2 }} />
                                        <View style={{ marginTop: 6, width: 100, height: 10, borderRadius: 2 }} />
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                        </View>
                    ))}
            </View>
        </View>
    )
}

export default LessonCardSkelton;

const style = StyleSheet.create({
    lessonCard: {
        height: card / 2.5,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",

        elevation: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    commonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    grade: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 15
    },
    rate: {
        marginTop: 12,
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 0
    }
});

