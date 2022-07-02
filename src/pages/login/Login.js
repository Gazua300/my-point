import { useContext, useState } from "react"
import { url } from '../../constants/url'
import Context from "../../global/Context"
import axios from 'axios'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"



const Login = (props)=>{
    const { setters } = useContext(Context)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')



    const login = ()=>{
        const body = {
            email,
            senha
        }
        axios.post(`${url}/user/login`, body).then(res=>{
            setters.setToken(res.data)
            props.navigation.navigate('Home')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    return(
        <View style={styles.container}>
            
            <View style={{marginTop:80}}/>
                <TextInput style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="nome@email.com"/>

                <TextInput style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    secureTextEntry={true}
                    placeholder='Sua senha'/>
                
                <TouchableOpacity style={styles.button}
                    onPress={login}>
                    <Text style={{color:'whitesmoke'}}>Entrar</Text>
                </TouchableOpacity>
                <Text style={styles.txtStyle}>Ainda não tem cadastro? Clique
                    <Text style={{color:'blue'}}
                        onPress={()=> props.navigation.navigate('CreateUser')}> aqui</Text>
                </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        margin: 20,
        width: 300,
        height: 40
    },
    txtStyle:{
        fontSize: 20
    },
    button: {
        backgroundColor: 'blue',
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 15
    }
})


export default Login