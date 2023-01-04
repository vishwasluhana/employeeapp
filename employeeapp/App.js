import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import UpdateEmployee from './screens/UpdateEmployee';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{
            title: "Add Employee"
          }}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen
          name="Update"
          component={UpdateEmployee}
          options={{
            title: "Update Employee"
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e9ec',
    marginTop: Constants.statusBarHeight,
  },
});
