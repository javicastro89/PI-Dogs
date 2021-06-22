import { GET_BREEDS, GET_BREED_DETAIL, ADD_BREED, GET_TEMPERAMENT, SEARCH_BREEDS } from './actions'
import axios from 'axios'


export function getBreeds() {
    return function (dispatch) {
        axios.get('http://localhost:3001/dogs')
            .then(result => dispatch({
                type: GET_BREEDS,
                payload: result.data
            }))
            .catch(() => console.log('Problema en el GET /dogs'))
    }
}

export function getBreedDetail(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then(result => dispatch({
                type: GET_BREED_DETAIL,
                payload: result.data
            }))
    }
}

export function addBreed(payload) {
    return function (dispatch) {
        axios.post('http://localhost:3001/dog', payload)
        .then(result => dispatch({
            type: ADD_BREED,
            payload: result.data
        }))
    }
}

export function getTemperament() {
    return function (dispatch) {
        axios.get('http://localhost:3001/temperament')
        .then(result => dispatch({
            type: GET_TEMPERAMENT,
            payload: result.data
        }))
    }
}

export function searchBreeds(name){
    return function(dispatch) {
        axios.get(`http://localhost:3001/dogs?name=${name}`)
        .then(result => dispatch({
            type: SEARCH_BREEDS,
            payload: result.data
        })).catch(error => {
            if(error.response?.status !== 400) alert("Algo salió mal 😅")
            dispatch({
                type: SEARCH_BREEDS,
                payload: null
            })
        })
    }
}

export function clearDetail(){
    return {
        type: GET_BREED_DETAIL,
        payload: undefined
    }
}

export function clearSearch() {
    return {
        type: SEARCH_BREEDS,
        payload: undefined
    }
}