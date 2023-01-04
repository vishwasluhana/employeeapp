import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


const CreateEmployee = (props) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState("")
    const [position, setPosition] = useState("")
    const [picture, setPicture] = useState(
        {
            uri: "http://192.168.100.42:8000/media/pictures/default.png",
            type: 'image/jpeg',
            name: 'photo.jpg',
        })
    const [modal, setModal] = useState(false)

    const showPermissionsAlert = () => {
        Alert.alert(
            "Can not access camera",
            "Camera access permissions are not granted. Please grant permissions from settings",
            [
                { text: "OK", }
            ])
    }

    const openGallery = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setPicture({
                uri: result.assets[0].uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            })
            setModal(false)
        }
    }

    const openCamera = async () => {
        const permissionResult = ImagePicker.requestCameraPermissionsAsync();
        if ((await permissionResult).granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            if (!result.canceled) {
                setPicture({
                    uri: result.assets[0].uri,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                })
                setModal(false)
            }
        }
        else {
            showPermissionsAlert()
        }
    }

    const savedAlert = () => {
        Alert.alert(
            "Success",
            "Employee has been saved",
            [
                { text: "OK", }
            ])
    }

    const saveEmployee = async () => {
        let data = new FormData();
        data.append('name', name)
        data.append('email', email)
        data.append('phone', phone)
        data.append('salary', salary)
        data.append('position', position)
        if (!picture == null) {
            data.append('picture', picture)
        }

        const response = await fetch('http://192.168.100.42:8000/api/employees/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
        });

        const json = await response.json()

        if (json == 'success') {
            savedAlert()
            props.navigation.goBack()
        } else {
            Alert.alert(
                "Error",
                "There is some error in the data. Please try again",
                [
                    { text: 'OK' }
                ]
            )
        }
    }

    return (
        <View style={styles.root}>
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <View style={{ alignItems: "center", marginTop: -50 }}>
                    <Image
                        style={{ width: 150, height: 150, borderRadius: 75, borderColor: "#082443", borderWidth: 3, marginTop: 60 }}
                        source={{ uri: picture.uri }}
                    />
                </View>

                <View style={{ alignSelf: 'center', margin: 5 }}>
                    <Button
                        icon="upload"
                        mode="text"
                        textColor='#082443'
                        onPress={() => setModal(true)}>
                        Upload Image
                    </Button>
                </View>

                <TextInput
                    label="Name"
                    value={name}
                    placeholder="Enter your name"
                    mode="outlined"
                    onChangeText={text => setName(text)}
                    style={styles.inputStyle}
                    outlineColor='#082443'
                    activeOutlineColor='#082443'
                />

                <TextInput
                    label="Email"
                    value={email}
                    placeholder="Enter your email"
                    mode="outlined"
                    keyboardType='email-address'
                    onChangeText={text => setEmail(text)}
                    style={styles.inputStyle}
                    outlineColor='#082443'
                    activeOutlineColor='#082443'
                />

                <TextInput
                    label="Phone"
                    value={phone}
                    placeholder="Enter your Phone Number"
                    mode="outlined"
                    keyboardType='phone-pad'
                    onChangeText={text => setPhone(text)}
                    style={styles.inputStyle}
                    outlineColor='#082443'
                    activeOutlineColor='#082443'
                />

                <TextInput
                    label="Position"
                    value={position}
                    placeholder="Enter your position"
                    mode="outlined"
                    onChangeText={text => setPosition(text)}
                    style={styles.inputStyle}
                    outlineColor='#082443'
                    activeOutlineColor='#082443'
                />

                <TextInput
                    label="Salary"
                    value={salary}
                    placeholder="Enter your salary"
                    mode="outlined"
                    onChangeText={text => setSalary(text)}
                    style={styles.inputStyle}
                    outlineColor='#082443'
                    activeOutlineColor='#082443'
                />

                <Button
                    style={styles.inputStyle}
                    buttonColor='#082443'
                    icon="check"
                    mode="contained"
                    onPress={() => saveEmployee()}>
                    Save
                </Button>
            </ScrollView>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(false)
                }}>
                <TouchableOpacity onPress={() => { setModal(false) }} style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button
                                buttonColor='#082443'
                                icon="camera"
                                mode="contained"
                                onPress={openCamera}>
                                Camera
                            </Button>
                            <Button
                                buttonColor='#082443'
                                icon="image"
                                mode="contained"
                                onPress={openGallery}>
                                Gallery
                            </Button>
                        </View>
                        <Button
                            style={{ alignSelf: "center" }}
                            textColor='#082443'
                            icon="close"
                            onPress={() => setModal(false)}>
                            Close
                        </Button>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputStyle: {
        margin: 5
    },
    modalButtonView: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
    modalView: {
        bottom: 1,
        position: 'absolute',
        width: '100%',
        backgroundColor: "#e8eef5",
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
    }
})

export default CreateEmployee