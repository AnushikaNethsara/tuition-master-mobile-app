import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions } from "react-native";
import { Rating } from "react-native-elements";
import constants from "../../consts/constants";
import axios from "axios"
const { width } = Dimensions.get("screen");
const card = width;

const RatingModel = ({ closeModel, studentId, lessonId}) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [value, setValue] = React.useState(0);
    const [review, setReview] = React.useState("");

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        setValue(rating)
    }

    const AddRating = (e) => {

        var dateUtc = new Date().toISOString();
        let data = {
            lesson_id: lessonId,
            student_id: studentId,
            review: review,
            rate: value,
            date: dateUtc,
        };
        axios.post(constants.backend_url + "/rating/add", data)
            .then((response) => {
                closeModel();
                // if (response.data.msg === "Successfully Rated!") {
                //     closeModel();
                // } else {
                //     console.log(response.data.msg);
                // }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Review & Rate Lesson</Text>
                <View style={{ marginTop: -10}}>
                    <Rating
                        style={{ marginTop: 8, paddingHorizontal: 8 }}
                        imageSize={20}
                        startingValue={0}
                        //readonly={true}
                        onFinishRating={ratingCompleted}
                    />
                </View>
                <View style={{ marginTop: 5, marginBottom: 20 }}>
                    <TextInput
                        multiline={true}
                        onChangeText={text => setReview(text)}
                        maxLength={50}
                        numberOfLines={3}
                        placeholder="Add Your Review Here" />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, padding: 3 }} >
                        <Pressable
                            style={[styles.modelButton, styles.buttonClose]}
                            onPress={() => AddRating()}
                        >
                            <Text style={styles.textStyle}>Done</Text>
                        </Pressable>
                    </View>
                    <View style={{ flex: 1, padding: 3}} >
                        <Pressable
                            style={[styles.modelButton, styles.buttonClose]}
                            onPress={() => closeModel()}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        width: card / 1.3,
        height: card / 1.7,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modelButton: {
        borderRadius: 20,
        padding: 8,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        marginTop:-20,
        textAlign: "center",
        fontSize:19
    }
});

export default RatingModel;