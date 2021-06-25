import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
} from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import COLORS from "../../../consts/colors";
const { width } = Dimensions.get("screen");
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const cardWidth = width / 1.8



const HomeCardSkelton = () => {
    return (

        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.categoriesListContainer}>
                {Array(4)
                    .fill()
                    .map((item, index) => (
                        <View style={style.card} key={index}>
                            <SkeletonPlaceholder >
                                <View style={{ alignItems: "center", top: -60}}>
                                    <View style={{ width: 120, height: 120, borderRadius: 120 }} />
                                </View>
                                <View style={{ marginHorizontal: 15, top: -40, alignItems: "center",height:"100%" }}>
                                    <View style={{ width: 180, height: 20, borderRadius: 2 }} />
                                    <View style={{ width: 150, height: 15, borderRadius: 2,marginTop:10 }} />
                                    <View style={{ width: 150, height: 15, borderRadius: 2, marginTop: 10 }} />
                                    <View style={{ width: 150, height: 15, borderRadius: 2, marginTop: 10 }} />
                                    <View style={{ width: 150, height: 15, borderRadius: 2, marginTop: 10 }} />
                                </View>
                            </SkeletonPlaceholder>
                        </View>
                    ))}
            </ScrollView>
        </View>
    )
}

export default HomeCardSkelton;

const style = StyleSheet.create({
    card: {
        height: 250,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    categoriesListContainer: {
        paddingVertical: 10,
        alignItems: "center",
        paddingHorizontal: 5,
    },
    commonText: {
        justifyContent: 'flex-start'
    },
    grade: {
        justifyContent: 'flex-end'
    },
    rate: {
        marginTop: 12,
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 0
    }
});

