import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Image, TextInput, Button, Clipboard, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Camera, Permissions, ImagePicker, Expo } from 'expo';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
			image: require('../assets/Profile.png'),
			uploading: false,
			visibleModal: false
		}
		// this.takePhoto = this.takePhoto.bind(this);
		// this.pickPhoto = this.pickPhoto.bind(this);
		// this.handlePicture = this.handlePicture.bind(this);
		this.showModal = this.showModal.bind(this);
	}

	// async componentWillMount() {
	// 	console.log('MOUNTED!')
	// 	const { status } = await Permissions.getAsync(Permissions.CAMERA);
	// 	if (status !== 'granted') {
	// 		alert('ITS NOT ACCEPTED!')
	// 	} else {
	// 		this.takePhoto()
	// 	}
	// }
	uploadImageAsync = async (uri) => {
  let apiUrl = 'http://10.16.1.218:3000/profile/picture';
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
		aspect: [4, 3]
	});
	this.handlePicture(picture);
	}

	takePhoto = async () => {
		console.log('Invoked!!')
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' })
    let picture = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3]
		})
		.catch(err => console.log(err, 'ERR!!!'))
		this.handlePicture(picture);
	}

	handlePicture = async picture => {
		try {
			this.setState({ image: picture.uri });
			if (!picture.cancelled) {
			console.log(picture)
			}
		} catch (e) {
			console.log({ e }, 'error!');
			alert('This is not working');
		} finally {
			this.setState({ uploading: false });
		}
	}

	showModal(stat) {
		console.log(stat, 'working')
		this.setState({ visibleModal: stat })
	}

	uploadPhoto = () => {
		let { image } = this.state;
		if (!image) alert('you dont have image!');
			else {return (
	      <View
	        style={{
	          marginTop: 30,
	          width: 250,
	          borderRadius: 3,
	          elevation: 2,
	          shadowColor: 'rgba(0,0,0,1)',
	          shadowOpacity: 0.2,
	          shadowOffset: { width: 4, height: 4 },
	          shadowRadius: 5,
	        }}>
	        <View
	          style={{
	            borderTopRightRadius: 3,
	            borderTopLeftRadius: 3,
	            overflow: 'hidden',
	          }}>
	          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
	        </View>
	        <Text
	        	// onPress={this.CameraPermission.bind(this)}
	          // onPress={this.takePhoto}
	          // onLongPress={this.share}
	          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
	          {image}
	        </Text>
	      </View>
		    );
			}
		};

  // addPhoto = () => {
  // 	Clipboard.setString(this.state.image);
  // 		alert('Hi');
  // };

	// UploadPhoto(event) {
		// console.log('clicked', event)
	// 	const { status } = await Permissions.askAsync(Permissions.CAMERA);
	// 	this.setState({ hasCameraPermission: status === 'granted'	});
	// }

  
 	render() {
 		// let Hidden = () => {
 		// 	return this.state.showDiv ? <View style={{marignRight: 10, position: 'absolute' }}>
 		// 		<Button onPress={this.takePhoto} title={`Take a Photo`}/>
 		// 		<Button onPress={this.pickPhoto} title={`Select from Library`}/>
 		// 	</View> : null;
 		// }
    return (
	 
      <View style={{flex: 1, backgroundColor: 'yellow', alignItems: 'center'}}>
				<View style={{margin: 20, alignItems: 'flex-start', alignSelf: 'left'}}>
          <Button
            onPress={() => this.props.navigation.navigate('DrawerToggle')}
            title="&#9776;"
          />
        </View>
      	<View style={{flex: 1}}>
      		<Image style={styles.photo} source={{uri: `${this.state.image}`}} />
     			<Button onPress={() => this.showModal(!this.state.visibleModal)} title={'Edit'} style={{flex: 1}}/>
	      </View>

				
	      <View style={styles.location}>
	      	<TextInput style={styles.input} placeholder="Make a title" placeholderTextColor="rgba(255, 255, 255, 0.7)"
	      	onChangeText={(title) => {this.setState({title: title})}} />
	      	<TextInput style={styles.input} placeholder="Add Location Name" placeholderTextColor="rgba(255, 255, 255, 0.7)"
	      	onChange={(locationName) => {this.setState({locationName})}} />
	      	<TextInput style={styles.input} placeholder="Add Location Address" placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
		backgroundColor: 'blue',
		width: '100%',
		alignItems: 'center'
	},
	map: {
		flex: 1,
		backgroundColor: 'red',
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
