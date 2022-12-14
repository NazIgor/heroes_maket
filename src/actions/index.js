import {createAction} from "@reduxjs/toolkit"

export const fetchHeroes=(request)=>(dispatch)=>{
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => {
            dispatch(heroesFetched(data))                
        })
        .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = createAction('HEROES_FETCHING')
// () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

export const heroesFetched = createAction('HEROES_FETCHED')
// (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroAdded = createAction('HERO_ADDED')
// (hero) => {
//     return {
//         type: 'HERO_ADDED',
//         payload: hero
//     }
// }
export const heroDelete = createAction('HERO_DELETE')
// (id) => {
//     return {
//         type: 'HERO_DELETE',
//         payload: id
//     }
// }

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')
// () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

export const filterUpdate = (filter) => {
    return {
        type: 'FILTER_UPDATE',
        payload: filter
    }
}
export const filterClear = () => {
    return {
        type: 'FILTER_CLEAR',
    }
}