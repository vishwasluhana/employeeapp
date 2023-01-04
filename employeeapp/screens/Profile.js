import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Linking, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';

const Profile = (props) => {
    const emp_id = props.route.params.item.emp_id

    const [data, setData] = useState([]);

    const getEmployee = async () => {
        try {
            const response = await fetch(`http://192.168.100.42:8000/api/employees/${emp_id}`, {
                method: 'GET'
            })
            const json = await response.json()
            setData(json)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const focusHandler = props.navigation.addListener('focus', () => {
            getEmployee();
        });
        return focusHandler;
    }, [props.navigation]);

    const { name, email, position, picture, phone, salary } = data

    const confirmDelete = (name) => {
        Alert.alert(
            "Delete",
            `Are you sure you want to delete ${name}?`,
            [
                { text: 'Cancel' },
                {
                    text: "Delete",
                    onPress: () => deleteEmployee(),
                    style: 'destructive'
                }
            ])
    }

    const deletedAlert = () => {
        Alert.alert(
            "Success",
            `${name} has been deleted`,
            [
                { text: "OK", }
            ])
    }

    const deleteEmployee = async () => {
        try {
            await fetch(`http://192.168.100.42:8000/api/employees/delete/${emp_id}`, {
                method: 'DELETE'
            })
            deletedAlert()
            props.navigation.goBack()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={['#082443', '#e6e9ec']}
                style={{ height: '20%' }}
            />

            <View style={{ alignItems: "center", marginTop: -50 }}>
                <Image
                    style={{ width: 150, height: 150, borderRadius: 75, borderColor: "#082443", borderWidth: 3 }}
                    source={{ uri: picture }}
                />
            </View>

            <View style={{ alignItems: "center", margin: 15 }}>
                <Title style={{ fontSize: 40, paddingTop: 20 }}>{name}</Title>
                <Text style={{ fontSize: 20, }}>{position}</Text>
            </View>

            <Card style={styles.card}
                onPress={() => {
                    Linking.openURL(`mailto:${email}`)
                }}>
                <View style={styles.cardContent}>
                    <MaterialIcons
                        name="email"
                        size={32}
                        color="#082443"
                    />
                    <Text style={styles.text}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.card}
                onPress={() => {
                    Linking.openURL(`tel:${phone}`)
                }}>
                <View style={styles.cardContent}>
                    <MaterialIcons
                        name="phone"
                        size={32}
                        color="#082443"
                    />
                    <Text style={styles.text}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    <MaterialIcons
                        name="attach-money"
                        size={32}
                        color="#082443"
                    />
                    <Text style={styles.text}>{salary}</Text>
                </View>
            </Card>
            <View style={styles.buttonView}>
                <Button
                    buttonColor="#082443"
                    icon="account-edit"
                    mode="contained"
                    onPress={() => props.navigation.navigate('Update', { item: props.route.params.item })}>
                    Edit
                </Button>
                <Button
                    buttonColor="#082443"
                    icon="delete"
                    mode="contained"
                    onPress={() => confirmDelete(name)}>
                    Delete
                </Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    card: {
        margin: 3,
    },
    cardContent: {
        flexDirection: 'row',
        padding: 5,
    },
    text: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 5,
    },
    buttonView: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
    },

})

export default Profile