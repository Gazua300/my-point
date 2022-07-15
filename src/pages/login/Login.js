import { useContext, useEffect, useState } from "react"
import { url } from '../../constants/url'
import Eye from 'react-native-vector-icons/Entypo'
import Context from "../../global/Context"
import axios from 'axios'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"



const Login = (props)=>{
    const { setters } = useContext(Context)
    const placeholderBakcground = 'rgba(255, 255, 255, 0.4)'
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [visivel, setVisivel] = useState(true)
    const [icone, setIcone] = useState('eye-with-line')


    
    useEffect(()=>{
        
        const persistir = async()=>{
            const token = await AsyncStorage.getItem('token')
            if(token !== null){
                props.navigation.navigate('Home')
            }
        }
        persistir()
                
    }, [])



    const visibilidade = ()=>{
        if(icone === 'eye-with-line'){
            setVisivel(false)
            setIcone('eye')
        }else if(icone === 'eye'){
            setVisivel(true)
            setIcone('eye-with-line')
        }
    }


    const login = ()=>{
        const body = {
            email,
            senha
        }
        axios.post(`${url}/user/login`, body).then(res=>{
            setters.getToken(res.data)
            props.navigation.navigate('Home')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const limpar = ()=>{
        setEmail('')
        setSenha('')
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <TextInput style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="nome@email.com"
                        placeholderTextColor={placeholderBakcground}/>

                    <TextInput style={styles.input}
                        onChangeText={setSenha}
                        value={senha}
                        secureTextEntry={visivel}
                        placeholder='Sua senha'
                        placeholderTextColor={placeholderBakcground}/>
                    <TouchableOpacity style={styles.eye}
                        onPress={visibilidade}>
                        <Eye name={icone} size={25} color='whitesmoke'/>
                    </TouchableOpacity>
                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={limpar}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>
                                Limpar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={login}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>
                                Entrar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.txtStyle}>Ainda não tem cadastro? Clique
                        <Text style={{color:'blue', fontSize:20}}
                            onPress={()=> props.navigation.navigate('CreateUser')}> aqui</Text>
                    </Text>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 50
    },
    input: {
        borderWidth: 1,
        borderColor:'goldenrod',
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        margin: 20,
        width: '90%',
        height: 50,
        color: 'whitesmoke'
    },
    eye: {
        position: 'absolute',
        right: '8%',
        top: '44%'
    },
    txtStyle:{
        fontSize: 20,
        color: 'whitesmoke',
        textAlign: 'center'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ae8625',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        borderRadius: 10,
        margin: 15,
        borderWidth: 1,
        borderColor: 'goldenrod'
    }
})


export default Login