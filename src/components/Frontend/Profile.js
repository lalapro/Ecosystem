import React, { Component } from 'react';
import { AsyncStorage, Modal, ImageStore, StyleSheet, Text, View, Image, TextInput, Button, Clipboard, TouchableOpacity, TouchableHighlight } from 'react-native';
import Expo, { Asset, Camera, Permissions, ImagePicker } from 'expo';
import axios from 'axios';
// import base from 'base-64';
// import utf8 from 'utf8';
// import RNFetchBlob from 'react-native-fetch-blob';
// import imgPicker from 'react-native-image-picker';
// import RNFS from 'react-native-fs'
// import Cameras from 'react-native-camera';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            image: require('../assets/Profile.png'),
            uploading: false,
            visibleModal: false,
            username: 'Minwoo'
        }
        // this.takePhoto = this.takePhoto.bind(this);
        // this.pickPhoto = this.pickPhoto.bind(this);
        // this.handlePicture = this.handlePicture.bind(this)
        this.showModal = this.showModal.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);

        // this.SaveURI = this.SaveURI.bind(this);
    }

		componentDidMount() {
        axios({
            method: 'get',
            url: 'http://10.16.1.152:3000/pictures',
            params: {
              username: this.state.username
            }
        })
        .then(res => {
            let jpg = 'data:image/jpg;base64,' + res.data.picture;
            this.setState({
                image: jpg
            })
        })
    }
    // async componentWillMount() {
    //  console.log('MOUNTED!')
    //  const { status } = await Permissions.getAsync(Permissions.CAMERA);
    //  if (status !== 'granted') {
    //      alert('ITS NOT ACCEPTED!')
    //  } else {
    //      this.takePhoto()
    //  }
    // }
    // Picker() {
    //     var options = {
    //       title: 'Select Avatar',
    //       customButtons: [
    //         {name: 'fb', title: 'Choose Photo from Facebook'},
    //       ],
    //       storageOptions: {
    //         skipBackup: true,
    //         path: 'images'
    //       }
    //     };
    //     imgPicker.launchCamera(options, res => {
    //         console.log(res);
    //     })
    // }
    uploadImageAsync = async (uri) => {
    let apiUrl = 'http://10.16.1.152:3000/pictures';
    let uriParts = uri.split('.');
    let fileType = uri[uri.length - 1];
    let formData = new FormData();
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });
    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };
        return fetch(apiUrl, options);
    }
    pickPhoto = async () => {
    let picture = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
    });
    this.handlePicture(picture);
    }
    takePhoto = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
        let picture = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        })
        .catch(err => console.log(err, 'ERR!!!'))
        this.handlePicture(picture);
    }
    handlePicture = async picture => {
        try {
            // this.setState({ image: picture.uri });
            this.setState({ visibleModal: !this.state.visibleModal });
            if (!picture.cancelled) {
            }
        } catch (e) {
            console.log({ e }, 'error!');
            alert('This is not working');
        } finally {
            this.setState({ uploading: false });
            this.uploadPhoto(picture);
        }
    }
    // SaveURI(uri) {
    //  ImageStore.getBase64ForTag(uri, (success) => {
    //      axios.post('http://10.16.1.218:3000/pictures', { Picture: uri })
    //          .then(res => {
    //              console.log(res.data);
    //              let decoded = 'data:image/jpg;base64,' + success;
    //              this.setState({ image: decoded });
    //          })
    //  }, (failure) => {console.log(failure)})
    // }
    uploadPhoto(picture) {
        // console.log(picture)
        let uri = picture.base64;
        console.log(!!uri)
        // let stringified = JSON.stringify(uri);
        // var image = new Image(),
        // containerWidth = null,
        // containerHeight = null;
        // image.onload = function() {
        //  containerWidth = image.width;
        //  containerHeight = image.height;
        // }

        // image.src = 'data:image/jpg;base64,' + uri;
        // this.setState({
        //  image: image.src
        // })
        let pictureText = 'data:image/jpg;base64,' + uri;
        // console.log(stringified)
        // console.log(pictureText.split(/,(.+)/)[1] === uri)
        axios.post('http://10.16.1.152:3000/pictures', { picture: uri, username: 'Minwoo' })
            .then(res => {
								let jpg = 'data:image/jpg;base64,' + res.data.picture

								this.setState({
									image: jpg
								})
                // let pictureText = 'data:image/jpg;base64' + res.data.Picture;
                // this.setState({
                //  image: pictureText
                // })
            })
        // ImageStore.addImageFromBase64(uri, (success) => { this.SaveURI(success) },
        //      (failure) => { console.log(failure) });
    }
    showModal(stat) {
        this.setState({ visibleModal: stat })
    }
    // uploadPhoto = () => {
    //  let { image } = this.state;
    //  if (!image) alert('you dont have image!');
    //      else {return (
    //       <View
    //         style={{
    //           marginTop: 30,
    //           width: 250,
    //           borderRadius: 3,
    //           elevation: 2,
    //           shadowColor: 'rgba(0,0,0,1)',
    //           shadowOpacity: 0.2,
    //           shadowOffset: { width: 4, height: 4 },
    //           shadowRadius: 5,
    //         }}>
    //         <View
    //           style={{
    //             borderTopRightRadius: 3,
    //             borderTopLeftRadius: 3,
    //             overflow: 'hidden',
    //           }}>
    //           <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
    //         </View>
    //         <Text
    //          // onPress={this.CameraPermission.bind(this)}
    //           // onPress={this.takePhoto}
    //           // onLongPress={this.share}
    //           style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
    //           {image}
    //         </Text>
    //       </View>
    //      );
    //      }
    //  };
    // addPhoto = () => {
    //  Clipboard.setString(this.state.image);
    //      alert('Hi');
    // };

    render() {
        // let Hidden = () => {
        //  return this.state.showDiv ? <View style={{marignRight: 10, position: 'absolute' }}>
        //      <Button onPress={this.takePhoto} title={`Take a Photo`}/>
        //      <Button onPress={this.pickPhoto} title={`Select from Library`}/>
        //  </View> : null;
        // }
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{flex: 1}}>
                    <Image style={styles.photo} source={{uri: `${this.state.image}`}} />
                    <Button onPress={() => this.showModal(!this.state.visibleModal)} title={'Edit'} style={{flex: 1}}/>
                </View>
                <View style={styles.location}>
                    <TextInput style={styles.input} placeholder="Make a title" placeholderTextColor="rgba(0, 0, 0, 0.7)"
                    onChangeText={(title) => {this.setState({title: title})}} />
                    <TextInput style={styles.input} placeholder="Add Location Name" placeholderTextColor="rgba(0, 0, 0, 0.7)"
                    onChange={(locationName) => {this.setState({locationName})}} />
                    <TextInput style={styles.input} placeholder="Add Location Address" placeholderTextColor="rgba(0, 0, 0, 0.7)"
                    onChange={(locationAddress) => {this.setState({locationAddress})}} />
                </View>
                <View style={styles.map} />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.visibleModal}
                        onRequestClosed={() => {alert('Photo is not selected!!')}}
                    >
                     <View>
                            <View style={{height: 470, opacity: 0.7, backgroundColor: '#ddd'}}>
                                <Image source={require('../assets/toastlogo.png')} style={{height: '100%', width: '100%', opacity: 0.8}}/>
                            </View>
                            <View style={{height: '100%', backgroundColor: '#ddd', opacity: 0.7}}>
                                <View style={styles.button} >
                                    <Button title={`Take a photo`} onPress={this.takePhoto}/>
                                </View>
                                <View style={styles.button} >
                                    <Button title={`Photo from library`} onPress={this.pickPhoto} />
                                </View>
                                <View style={styles.button} >
                                    <Button title={`Close`} onPress={() => {this.showModal(!this.state.visibleModal)}} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    photo: {
        backgroundColor: 'black',
        flex: 9,
        marginTop: 10,
        width: 200,
        borderRadius: 70,
        opacity: 0.7,
        borderBottomLeftRadius: 50,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 5
    },
    location: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    map: {
        flex: 1,
        width: '100%',
    },
    input: {
        height: 30,
        width: 220,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginTop: 5,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: '#ddd',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: 'black',
        width: 250,
        alignItems: 'center',
        marginLeft: 60,
        marginTop: 5,
        marginBottom: 5
    }
})
