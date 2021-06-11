import { GET_BREEDS, GET_BREED_DETAIL, ADD_BREED, GET_TEMPERAMENT } from '../Actions/actions'

const initialState = {
    breeds: [],
    temperament: [],
    breedDetail: {}
}


export default function reducer (state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS: 
        return {
            ...state,
            breeds: [...state.breeds, ...action.payload]
        };

        case GET_TEMPERAMENT: 
        return {
            ...state,
            temperament: [...state.temperament, ...action.payload]
        }

        case ADD_BREED:
            return {
                ...state,
                breeds: [...state.breeds, ...action.payload]
            }

        default: return state
    }

}