//filter 
export const typeDeContract = ["ALL", "CDI", "CDD"]
export const alternance = ["ALL", "false", "true"]
export const experienceExige = ["ALL", "D", "E"]

//End filter Constants




/**
 * Retourne un tableau filtres si un paramètre est renseigné
 * @param item - the item to be filtered
 * @param [contrat=ALL] - The type of contract you want to filter by.
 */
export const filterByTypeContrat = (item, contrat) => {
    return contrat == "ALL" ? item : item.typeContrat === contrat?item:null
}



/**
 * Retourne un tableau filtres si un paramètre est renseigné
 * @param item - the item to filter
 * @param [alternance=ALL] - alternance type (ALL, OUI, NON)
 * @returns the item if the alternance is equal to "ALL" or if the item.alternance is equal to
 * alternance.
 */
export const filterByAlternance = (item, alternance) => {
    return alternance == "ALL" ? item : item.alternance.toString() == alternance
}


/**
 * Retourne un tableau filtres si un paramètre est renseigné
 * @param item - the current item in the array
 * @param [experienceExige=ALL] - The experience level that the user has selected.
 */
export const filterByExperienceExige = (item, experienceExige) => {
    return experienceExige == "ALL" ? item : item.experienceExige == experienceExige
}


/**
 * Retourne un tableau filtres si un paramètre est renseigné
 * 
 * description matches the value
 * @param item - The item that we are searching for.
 * @param [value=ALL] - The value of the search input
 */
export const SearchValue = ()=>{

}

export const Search = (item, value = null) => {   
    if (value && typeof (value) == "string" && value.trim() !== '') {
        const regex = new RegExp(value, 'i')
        return item.description.match(regex)
    } else {
        return item
    }

}



