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
import lessonImage from "../../consts/lessonImage";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("screen");
import { Rating } from "react-native-elements";
import constants from "../../consts/constants";
import axios from "axios"
const card = width;

const LessonCard = ({ navigation, lesson }) => {

    const [img, setImg] = useState();
    const [rate, setRate] = useState(0);
    const [allCount, setAllCount] = useState(0);

    const getLessonImage = () => {
        var cardSubject = lesson.subject;

        if (lessonImage.find(element => element.subject === lesson.subject)) {
            var index = lessonImage.findIndex(element => element.subject === lesson.subject)
            setImg(lessonImage[index].image)
        } else {
            setImg(lessonImage[11].image)
        }

    }

    useEffect(() => {
        setImg()
        getLessonImage()
        getRatings();
    }, [])




    const getRatings = () => {
        try {
            axios.get(constants.backend_url + "/rating/get-rate/" + lesson._id)
                .then(res => {
                    var total = res.data.total;
                    var count = res.data.count;
                    var actualRate = (total / count).toFixed(1);
                    if (total != 0 && count != 0) {
                        setRate(actualRate);
                        setAllCount(count);
                    }
                })

        } catch (err) {
            console.log(err.response.data.msg)
        }
    }


    return (
        <TouchableHighlight
            underlayColor={COLORS.white}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("DetailsScreen", { lesson: lesson })}
            key={lesson._id}
        >
            <View style={style.lessonCard}>
                <Image source={img} style={{ height: 90, width: 90 }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: -5,
                        flex: 1,
                        marginTop: -30
                    }}
                >
                    <Text
                        style={{ fontWeight: "bold", fontSize: 15, textAlign: "left" }}
                    >
                        {lesson.lesson}
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                        <Text style={style.commonText}>
                            {lesson.subject}
                        </Text>
                        <Text style={style.grade}>
                            {lesson.grade}
                        </Text>
                    </View>
                    <Text
                        style={{ fontSize: 16, color: COLORS.grey, fontWeight: "bold" }}
                    >
                        {lesson.master_id.first_name} {lesson.master_id.last_name}
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 0 }}>
                        <Text style={style.rate}>({rate})</Text>
                        <Rating
                            style={{ marginTop: 12, paddingHorizontal: 5 }}
                            imageSize={20}
                            startingValue={rate}
                            readonly={true}
                        />
                        <Text style={style.rate} >({allCount})</Text>
                    </View>

                </View>
            </View>
        </TouchableHighlight>

    );
}
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
        color: COLORS.grey,
        fontWeight: "bold",
    },
    grade: {
        fontSize: 16,
        color: COLORS.grey,
        fontWeight: "bold",
        marginLeft: 15
    },
    rate: {
        marginTop: 12,
        fontSize: 15,
        color: COLORS.grey,
        fontWeight: "bold",
        marginLeft: 0
    }
});
export default LessonCard;

