import { GET_BREEDS, GET_BREED_DETAIL, ADD_BREED, GET_TEMPERAMENT } from './actions'
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

export function getBreedsDetail(id) {
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