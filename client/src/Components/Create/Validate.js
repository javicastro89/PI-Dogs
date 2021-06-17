
export function validate(input, breeds) {
        let find = breeds.find(e => e.name.toLowerCase() === input.name.toLowerCase())
        let error = {}
        if (!input.name) {
            error.name = 'Breed name is required'
        }
        if (find) {
            error.name = 'Breed already exist'
        }
        if(input.temperament.length === 0) {
            error.temperament = 'Temperament is required'
        }
        if(!input.weight || input.weight < 1) {
            error.weight = 'Weight is required and must be at least 1 kg'
        }
        if(!input.height || input.height < 1) {
            error.height = 'Height is required and must be at least 1 cm'
        }
        if(!input.life_span || input.life_span < 1) {
            error.life_span = 'Life span is required and must be at least 1 year'
        }
        return error
    }
