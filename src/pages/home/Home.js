import { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import Context from '../../global/Context'



const Home = (props)=>{
    const { requests, states } = useContext(Context)
    const places = states.places



    useEffect(()=>{
        requests.getAllUsers()
    }, [])


    return(
        <View>
            {places && places.map(place=>{
                return(
                    <View key={place.id}>
                        <Text>{place.nome}</Text>
                    </View>
                )
            })}
        </View>
    )
}
export default Home