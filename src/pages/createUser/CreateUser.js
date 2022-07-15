import { useContext, useEffect, useState } from "react"
import Context from "../../global/Context"
import Eye from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { url } from "../../constants/url"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from "react-native"



const CreateUser = (props)=>{
    const { states, setters } = useContext(Context)
    const placeholderBakcground = 'rgba(255, 255, 255, 0.4)'       
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [icone, setIcone] = useState('eye-with-line')
    const [icone2, setIcone2] = useState('eye-with-line')
    const [visivel, setVisivel] = useState(true)
    const [visivel2, setVisivel2] = useState(true)


    
    const visibilidade = ()=>{
        if(icone === 'eye-with-line'){
            setVisivel(false)
            setIcone('eye')
        }else if(icone === 'eye'){
            setVisivel(true)
            setIcone('eye-with-line')
        }
    }

    const visibilidade2 = ()=>{
        if(icone2 === 'eye-with-line'){
            setVisivel2(false)
            setIcone2('eye')
        }else if(icone2 === 'eye'){
            setVisivel2(true)
            setIcone2('eye-with-line')
        }
    }

    
    
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
                setters.getToken(res.data)
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
                        placeholderTextColor={placeholderBakcground}/>
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
                    
                    <TextInput style={styles.input}
                        onChangeText={setConfSenha}
                        value={confSenha}
                        secureTextEntry={visivel2}
                        placeholder='Confirme sua senha'
                        placeholderTextColor={placeholderBakcground}/>
                    <TouchableOpacity style={styles.eye2}
                        onPress={visibilidade2}>
                        <Eye name={icone2} size={25} color='whitesmoke'/>
                    </TouchableOpacity>
                    
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
        width: '95%',
        height: 50,
        color: 'whitesmoke'
    },
    eye: {
        position: 'absolute',
        right: '7%',
        top: '47%'
    },
    eye2: {
        position: 'absolute',
        right: '7.%',
        top: '68%'
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