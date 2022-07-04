import { useContext, useState } from "react"
import Context from "../../global/Context"
import axios from 'axios'
import { url } from "../../constants/url"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from "react-native"



const CreateUser = (props)=>{
    const { setters } = useContext(Context)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')



    const signUp = ()=>{
        const body={
            nome,
            email,
            senha
        }
        if(senha !== confSenha){
            alert('As senhas não correspondem')
        }else{
            axios.post(`${url}/user`, body).then(res=>{
                setters.setToken(res.data)
                props.navigation.navigate('Home')
            }).catch(e=>{
                alert(e.response.data)
            })
        }
    }


    const limpar = ()=>{
        setConfSenha('')
        setEmail('')
        setNome('')
        setSenha('')
    }



    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <TextInput style={styles.input}
                        onChangeText={setNome}
                        value={nome}
                        placeholder="Nome"
                        placeholderTextColor='whitesmoke'/>
                    <TextInput style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="nome@email.com"
                        placeholderTextColor='whitesmoke'/>

                    <TextInput style={styles.input}
                        onChangeText={setSenha}
                        value={senha}
                        secureTextEntry={true}
                        placeholder='Sua senha'
                        placeholderTextColor='whitesmoke'/>
                    
                    <TextInput style={styles.input}
                        onChangeText={setConfSenha}
                        value={confSenha}
                        secureTextEntry={true}
                        placeholder='Confirme sua senha'
                        placeholderTextColor='whitesmoke'/>
                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={signUp}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>Registrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={limpar}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>Limpar</Text>
                        </TouchableOpacity>
                    </View>
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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ae8625',
        paddingLeft: 15,
        fontSize: 20,
        margin: 13,
        width: 350,
        height: 50,
        color: 'whitesmoke'
    },
    btnContainer: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#ae8625',
        borderWidth: 1,
        borderColor: 'goldenrod',
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 15
    }
})


export default CreateUser