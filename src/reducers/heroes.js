import { createReducer } from "@reduxjs/toolkit"
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroAdded,
    heroDelete
} from '../actions'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}
const heroes=createReducer(initialState, builder=>{
    builder
        .addCase(heroesFetching, state=>{
            state.heroesLoadingStatus='loading';
        })
        .addCase(heroesFetched, (state,action)=>{
            state.heroesLoadingStatus='idle';
            state.heroes=action.payload;
        })
        .addCase(heroesFetchingError, state=>{
            state.heroesLoadingStatus='error';
        })
        .addCase(heroAdded, (state, action)=>{
            state.heroesLoadingStatus='idle';
            state.heroes.push(action.payload);
        })
        .addCase(heroDelete, (state,action)=>{
            state.heroes=state.heroes.filter(item=>item.id!==action.payload);
            state.heroesLoadingStatus='idle';
        })
        .addDefaultCase(()=>{})
})


export default heroes;