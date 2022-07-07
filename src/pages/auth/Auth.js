import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/url'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    ScrollView,
    TouchableOpacity
} from 'react-native'



const Auth = (props)=>{
    const [senha, setSenha] = useState('')


    const auth = async()=>{
        const id = await AsyncStorage.getItem('token')
        const body = {
            senha
        }
        axios.post(`${url}/userauth/${id}`, body).then(res=>{
            props.navigation.navigate('EditPerfil')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.txtStyle}>Autenticação necessária</Text>
                    <TextInput style={styles.input}
                        onChangeText={setSenha}
                        value={senha}
                        secureTextEntry={true}
                        placeholder='Sua senha'
                        placeholderTextColor='whitesmoke'/>
                    <TouchableOpacity style={styles.button}
                        onPress={auth}>
                        <Text style={{color:'whitesmoke', fontSize:18}}>Verificar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center'
    },
    txtStyle: {
        color: 'whitesmoke',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 50
    },
    input: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ae8625',
        paddingLeft: 15,
        fontSize: 20,
        width: 350,
        height: 50,
        color: 'whitesmoke',
        marginTop: 20
    },
    button: {
        backgroundColor: '#ae8625',
        marginTop: 20,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }
})

export default Auth