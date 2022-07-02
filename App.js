import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GlobalState } from "./src/global/Context"
import Login from "./src/pages/login/Login"
import CreateUser from "./src/pages/createUser/CreateUser"
import Home from "./src/pages/home/Home"


const Stack = createNativeStackNavigator()



export default function App() {
  return (
    <NavigationContainer>
      <GlobalState>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center'
          }}>

          <Stack.Screen
            name="Login"
            component={Login}/>

          <Stack.Screen
            name="CreateUser"
            component={CreateUser}
            options={{
              title: 'Registrar usuário'
            }}/>

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Lista de locais'
            }}/>

        </Stack.Navigator>
      </GlobalState>
    </NavigationContainer>
  )
}
