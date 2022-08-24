const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filter:1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_ADDED':            
            return{
                ...state,
                heroes:[...state.heroes, action.payload], 
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_DELETE':  
            return{
                ...state,
                heroes:heroDel(state.heroes, action.payload), 
                heroesLoadingStatus: 'idle'
        }
        case 'FILTER_CLEAR':  
            return{
                ...state,
                filter:initialState.filter
            }
        case 'FILTER_UPDATE':  
            return{
                ...state,
                filter:action.payload
        }
        default: return state
    }
}
const heroDel=(heroes, id)=>{
    let position;
    heroes.forEach((item,i)=>{
        if (item.id===id) {position=i}
    })
    return [...heroes.slice(0,position), ...heroes.slice(position+1)]
}

export default reducer;