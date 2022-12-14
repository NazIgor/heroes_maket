import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHeroes } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';



const HeroesList = (props) => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state.heroes);
    const {filter}=useSelector(state=>state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));

        // eslint-disable-next-line
    }, []);


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        const newArr=filterHeroes(arr);
        return newArr.map(({id, ...props}) => {
            
            return <HeroesListItem key={id} {...props } id={id}/>
        })
    }
    const filterHeroes=(heroes)=>{
        if (filter===1) return heroes;
        return heroes.filter(item=> +item.element===filter)
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul >
            {elements}
        </ul>
    )
}

export default HeroesList;