import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GlobalState } from "./src/global/Context"
import { View, StatusBar, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Logout from 'react-native-vector-icons/AntDesign'
import Login from "./src/pages/login/Login"
import CreateUser from "./src/pages/createUser/CreateUser"
import Home from "./src/pages/home/Home"
import Cardapio from "./src/pages/cardapio/Cardapio"
import Pedido from "./src/pages/pedido/Pedido"
import Perfil from "./src/pages/perfil/Perfil"



const Stack = createNativeStackNavigator()



export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='rgba(0, 0, 0, 0.9)'/>
      <GlobalState>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: '#ae8625',                                  
            },
            headerTintColor: 'whitesmoke',
          }}>

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'My point'
            }}/>

          <Stack.Screen
            name="CreateUser"
            component={CreateUser}
            options={{
              title: 'Registrar usuário'
            }}/>

          <Stack.Screen
            name="Home"
            component={Home}
            options={({navigation})=>({
              title: 'Lista de locais',
              headerLeft: ()=>(
                <View/>
              ),
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Perfil')}>
                  <Icon name="person" size={30} color='whitesmoke'/>
                </TouchableOpacity>
              )
            })}/>

          <Stack.Screen
            name="Cardapio"
            component={Cardapio}
            options={({navigation})=>({
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Perfil')}>
                  <Icon name="person" size={30} color='whitesmoke'/>
                </TouchableOpacity>
              )
            })}/>

          <Stack.Screen
            name="Pedido"
            component={Pedido}
            options={({navigation})=>({
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Perfil')}>
                  <Icon name="person" size={30} color='whitesmoke'/>
                </TouchableOpacity>
              )
            })}/>

          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={({navigation})=>({
              title: 'Cliente',
              headerRight: ()=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                  <Logout name="logout" size={25} color='whitesmoke'/>
                </TouchableOpacity>
              )
            })} />

        </Stack.Navigator>
      </GlobalState>
    </NavigationContainer>
  )
}
