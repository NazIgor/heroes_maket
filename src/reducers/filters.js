const initialState = {
    filters: [],
    filter:1
}
const filters = (state = initialState, action) => {
    switch (action.type) {
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

export default filters;