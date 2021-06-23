import { searchLocalBreeds } from "../../Actions"
import { SEARCH_BREEDS } from "../../Actions/actions"

export function localSearch(elem, array){
    let find = array.filter(dog => dog.name.toLowerCase().includes(elem.toLowerCase()))
    if (find.length > 0) {
        return searchLocalBreeds(find)
    }
    return {type: SEARCH_BREEDS, payload: null}
}