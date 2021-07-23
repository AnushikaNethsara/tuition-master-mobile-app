import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    Alert, Modal, Pressable
} from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import lessons from "../../consts/lessons";
import axios from "axios";
import { AsyncStorage } from 'react-native';
import constants from "../../consts/constants";
import lessonImage from "../../consts/lessonImage";
import { PrimaryButton } from "../components/Button";
import LessonCardSkelton from "../components/loading/LessonCardSkelton";
import playButon from "../../assets/play.png";
import pdfButton from "../../assets/filePdf.png";
import HomeCard from "../components/HomeCard";
import RatingModel from "../components/RatingModel";
import * as OpenAnything from 'react-native-openanything';
import FeedbackCard from "../components/FeedbackCard";
const { width } = Dimensions.get("screen");
const card = width;
//
const FeedbacksScreen = ({ navigation, route }) => {

    const { lessonId } = route.params;

    const [ratingsList, setRatingsList] = useState([]);


    useEffect(() => {
        try {
            axios.get(constants.backend_url + "/rating/get-rating-details/" + lessonId)
                .then(res => {
                    setRatingsList(res.data)
                })
        } catch (err) {
            console.log(err)
        }
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 28, fontWeight: "bold" }}> Feedbacks</Text>
            </View>
            {
                ratingsList.length === 0 ? (
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={style.commonText}>
                            No Reviews
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        data={ratingsList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <FeedbackCard feedback={item} navigation={navigation} key={item._id} />
                        )}
                    />
                )
            }


        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
    },
    commonText: {
        fontSize: 20,
        color: COLORS.grey,
        fontWeight: "bold"
    },
});

export default FeedbacksScreen;
