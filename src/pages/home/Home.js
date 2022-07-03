import axios from 'axios'
import { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { url } from '../../constants/url'
import Context from '../../global/Context'



const Home = (props)=>{
    const { requests, setters, states } = useContext(Context)
    const places = states.places



    useEffect(()=>{
        requests.getAllUsers()
    }, [])


    const cardapio = (id)=>{
        axios.get(`${url}/cardapio/place/${id}`).then(res=>{
            setters.setCardapio(res.data)
            setters.setPlaceId(id)
            props.navigation.navigate('Cardapio')
        }).catch(e=>{
            alert(e.response.data)
        })
    }



    return(
        <View>
            {places && places.map(place=>{
                return(
                    <View key={place.id}
                        style={styles.card}>
                        <Text style={styles.txtStyle}>
                            {place.nome}{'\n'}
                            <Text style={{fontSize:15}}>{place.servico}</Text>
                        </Text>
                        <TouchableOpacity style={styles.button}
                            onPress={()=> cardapio(place.id)}>
                            <Text style={{color:'whitesmoke'}}>Cardapio</Text>
                        </TouchableOpacity>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        margin: 15,
        padding: 15,
        borderRadius: 10
    },
    txtStyle: {
        fontSize: 25,
        lineHeight: 30
    },
    button: {
        backgroundColor: 'blue',
        width: 100,
        padding: 5,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center'
    }
})

export default Home