import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import axios from "axios";

const Skelton = () => {
  return (
    <View>
      <SkeletonPlaceholder>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 60, height: 60, borderRadius: 50 }} />
          <View style={{ marginLeft: 20 }}>
            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
}


const BlogList = (props) => {
  return (
    <View>
      <Text>{props.item.title}</Text>
    </View>
  );
}

const Example = () => {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timing = setTimeout(() => {
      try {
        axios.get("https://jsonplaceholder.typicode.com/todos/")
          .then(res => {
            setData(res.data)
          })
        setLoading(false);

      } catch (err) {
        console.log(err)
      }

    }, 4000);
    return () => clearTimeout(timing);
  }, []);



  return (
    <View>
      {loading && <Skelton />}
      {!loading &&
        data.map((item, index) => {
          return (
            <BlogList item={item} key={index} />
          )
        })
      }
    </View>
  );
};
export default Example;


// import * as React from "react";
// import { View, StyleSheet, Button, Text, Image } from "react-native";
// import { Video, AVPlaybackStatus } from "expo-av";
// import axios from "axios";

// export default function Player() {
//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});
//   const [test, setTest] = React.useState();
//   React.useEffect(() => {
//     fetch("http://192.168.1.11:3333/api/videoList")
//       .catch((error) => {
//         console.error(error);
//         alert(error.message);
//       });

//   });
//   return (
//     <View>
//       <Text>Player{test}</Text>
//       <View>
//         <Video
//           ref={video}
//           style={{ width: "90%", height: "90%" }}
//           source={{
//             uri: "http://192.168.1.11:3333/api/videos/file_-1623253341251.mp4",
//           }}
//           useNativeControls
//           resizeMode="contain"
//           isLooping
//           onPlaybackStatusUpdate={(status) => setStatus(() => status)}
//         />
//         <Button
//           title={status.isPlaying ? "Pause" : "Play"}
//           onPress={() =>
//             status.isPlaying
//               ? video.current.pauseAsync()
//               : video.current.playAsync()
//           }
//         />
//       </View>
//     </View>
//   );
// }

// var styles = StyleSheet.create({
//   backgroundVideo: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
// });
