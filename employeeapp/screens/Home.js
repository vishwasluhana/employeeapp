import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { Card, FAB } from 'react-native-paper'


const Home = ({ navigation }) => {

    const [data, setData] = useState([]);

    const getEmployees = async () => {
        try {
            const response = await fetch('http://192.168.100.42:8000/api/employees/', {
                method: 'GET'
            })
            const json = await response.json()
            setData(json)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getEmployees();
        });
        return focusHandler;
    }, [navigation]);

    const renderList = ((item) => {
        return (
            <Card style={styles.mycard} key={item.id} onPress={() => navigation.navigate('Profile', { item: item })}>
                <View style={styles.cardView}>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 25, borderColor: "#082443", borderWidth: 1 }}
                        source={{ uri: `${item.picture}` }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text>{item.position}</Text>
                    </View>
                </View>
            </Card>
        )
    })
    return (
        <View style={styles.root}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
            />
            <FAB
                icon="plus"
                color='#082443'
                style={styles.fab}
                onPress={() => navigation.navigate("Create")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#082443'
    },
    mycard: {
        margin: 5,
        padding: 5,
        backgroundColor: "#ffffff",
    },
    cardView: {
        flexDirection: "row",
        padding: 5,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 30,
        backgroundColor: 'white',
    },
})

export default Home