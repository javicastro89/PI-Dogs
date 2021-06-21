export function orderByAlpha(Alpha, array) {
    
      if (Alpha) {
        for (let i = 0; i < array.length - 1; i++) {
          for (let j = i + 1; j < array.length; j++) {
            if (array[i].name.toLowerCase() > array[j].name.toLowerCase()) {
              [array[i], array[j]] = [array[j], array[i]];
            }
          }
        }
        
      } else {
        for (let i = 0; i < array.length - 1; i++) {
          for (let j = i + 1; j < array.length; j++) {
            if (array[i].name.toLowerCase() < array[j].name.toLowerCase()) {
              [array[i], array[j]] = [array[j], array[i]];
            }
          }
        }
      }
      
  }

  export function orderByWeight(Ascendent, array) {

    if (Ascendent) {
        for (let i = 0; i < array.length - 1; i++) {
          
            for (let j = i + 1; j < array.length; j++) {
                if (parseFloat(array[i].weight) > parseFloat(array[j].weight)) {
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
        }
        
    } else {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i + 1; j < array.length; j++) {
                if (parseFloat(array[i].weight) < parseFloat(array[j].weight)) {
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
        }
    }
  }