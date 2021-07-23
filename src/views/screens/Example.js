import React, { useState, Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview';

class Example extends Component {
  state = {
    showModal: false,
    status: "Pending"
  };
  handleResponse = data => {
    if (data.title === "success") {
      this.setState({ showModal: false, status: "Complete" });
    } else if (data.title === "cancel") {
      this.setState({ showModal: false, status: "Cancelled" });
    } else {
      return;
    }
  };
  render() {
    return (
      <View style={{ marginTop: 100 }}>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <WebView
            source={{ uri: "http://192.168.1.11:5008/paypal" }}
            onNavigationStateChange={data =>
              this.handleResponse(data)
            }
            injectedJavaScript={`document.f1.submit()`}
          />
        </Modal>
        <TouchableOpacity
          style={{ width: 300, height: 100 }}
          onPress={() => this.setState({ showModal: true })}
        >
          <Text>Pay with Paypal</Text>
        </TouchableOpacity>
        <Text>Payment Status: {this.state.status}</Text>
      </View>
    );
  }
}

export default Example;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  }
});





// import React, { useState, useEffect } from "react";
// import { View, Text, SafeAreaView } from "react-native";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// import SkeletonContent from 'react-native-skeleton-content';
// import axios from "axios";

// const Skelton = () => {
//   return (

//     <View>
//       <View>
//         {Array(9)
//           .fill()
//           .map((item, index) => (
//             <View key={index}>
//               <SkeletonPlaceholder >
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                   <View style={{ width: 60, height: 60, borderRadius: 50 }} />
//                   <View style={{ marginLeft: 20 }}>
//                     <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//                     <View
//                       style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
//                     />
//                   </View>
//                 </View>
//               </SkeletonPlaceholder>
//             </View>
//           ))}
//       </View>
//     </View>
//   )
// }


// const BlogList = (props) => {
//   return (
//     <View>
//       <Text>{props.item.title}</Text>
//     </View>
//   );
// }

// const Example = () => {

//   const [data, setData] = useState([]);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const timing = setTimeout(() => {
//       try {
//         axios.get("https://jsonplaceholder.typicode.com/todos/")
//           .then(res => {
//             setData(res.data)
//           })
//         setLoading(false);

//       } catch (err) {
//         console.log(err)
//       }

//     }, 100);
//     return () => clearTimeout(timing);
//   }, []);



//   return (
//     <View>
//       {loading && <Skelton />}
//       {!loading &&
//         data.map((item, index) => {
//           return (
//             <BlogList item={item} key={index} />
//           )
//         })
//       }
//     </View>
//   );
// };
// export default Example;


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
