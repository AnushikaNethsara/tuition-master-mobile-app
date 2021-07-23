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
const { width } = Dimensions.get("screen");
const card = width;
//
const LessonResourcesScreen = ({ navigation, route }) => {

    const { lesson, studentId } = route.params;
    const [mylessons, setMyLessons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        retrieveUserData();
    }, [])

    const closeModel = () => {
        setModalVisible(false)
    }
    const checkRate = () => {
        try {
            axios.get(constants.backend_url + "/rating/check-rate/" + studentId + "/" + lesson.lesson_id._id)
                .then(res => {
                    if (res.data.msg === "Not Rated") {
                        setTimeout(() => {
                            setModalVisible(true)
                        }, 1000);
                    } else {
                        return;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        } catch (err) {
            console.log(err)
        }
    }
    


    const retrieveUserData = async () => {
        try {
            const getToken = await AsyncStorage.getItem('token');
            const getUserId = await AsyncStorage.getItem('userId');
            if (getToken !== null && getUserId !== null) {
                setToken(getToken);
                setUserId(getUserId);
                checkRate();
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
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 28, fontWeight: "bold" }}>  {lesson.lesson_id.lesson}</Text>
            </View>

            {/* video card */}
            <View>
                <View>
                    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 25 }}>LECTURE</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                    </View>
                    <Text style={{ marginTop: 5, fontSize: 15, color: COLORS.grey, marginHorizontal: 20 }}>
                        {lesson.lesson_id.description}
                    </Text>
                    <TouchableHighlight
                        underlayColor={COLORS.white}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate("ViewLessonScreen", { lesson: lesson })}
                    >
                        <View style={style.lessonCard}>
                            <Image source={playButon} style={{ height: 90, width: 90 }} />
                            <View
                                style={{
                                    height: 100,
                                    marginLeft: 10,
                                    paddingVertical: 5,
                                    flex: 1,
                                }}
                            >
                                <Text
                                    style={{ fontWeight: "bold", fontSize: 20, textAlign: "left", marginTop: 10 }}
                                >
                                    {lesson.lesson_id.lesson}
                                </Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                                    <Text style={style.commonText}>
                                        {lesson.lesson_id.subject}
                                    </Text>
                                    <Text style={style.grade}>
                                        {lesson.lesson_id.grade}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            {/* end video card */}

            {/* pdf card */}
            <View>
                <View>
                    <View style={{ flexDirection: "row", marginHorizontal: 20, marginVertical: 35 }}>
                        <Text style={{ fontSize: 25 }}>PDF RESOURCES</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: -50 }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={style.categoriesListContainer}
                        >
                            {
                                lesson.lesson_id.pdf_paths.map((item, index) => {
                                    return (
                                        <Pressable style={style.pdfCard} key={index}>
                                            <Image source={pdfButton} style={{ height: 90, width: 90, marginTop: 15 }} />
                                            <View>
                                                <Text style={style.pdfTitle}>
                                                    {lesson.lesson_id.grade}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    )
                                })
                            }
                        </ScrollView>

                    </View>
                </View>
            </View>
            {/* end pdf card */}

            {/* model view */}
            <View style={style.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <RatingModel closeModel={closeModel} studentId={studentId} lessonId={lesson.lesson_id._id}/>
                </Modal>
            </View>
            {/* end model view */}


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
    lessonCard: {
        height: card / 4,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 15,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    pdfCard: {
        height: card / 2.5,
        width: card / 3,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: -20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    commonText: {
        fontSize: 16,
        color: COLORS.grey,
        fontWeight: "bold",
    },
    grade: {
        fontSize: 16,
        color: COLORS.grey,
        fontWeight: "bold",
        marginLeft: 15
    },
    pdfTitle: {
        fontSize: 16,
        color: COLORS.grey,
        fontWeight: "bold",
        padding: 5
    },
    categoriesListContainer: {
        height: card / 2,
        alignItems: "center",
        paddingHorizontal: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
});

export default LessonResourcesScreen;
