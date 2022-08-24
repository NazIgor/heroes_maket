
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useState } from "react";
import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { filterUpdate } from "../../actions";
import { useDispatch, useSelector} from "react-redux";


const HeroesFilters = () => {
    const [filters, setFilters]=useState([]);
    const {filter}=useSelector(state=>state);
    const {request}=useHttp();
    const dispatch=useDispatch();
    console.log(filter);
    useEffect(()=>{ 
        request("http://localhost:3001/filters")
        .then(data=>{setFilters(data); console.log(data)});
        // eslint-disable-next-line
    },[])  
    const setFilter=(id)=>{
        dispatch(filterUpdate(id));
    }
    const renderFilters=()=>{
        if (!filters){ return null}
        const elements=filters.map(item=>{
            
            return <button 
                        key={`filter_${item.id}`} 
                        className={`${item.class} ${filter===item.id?" active":""}`}
                        onClick={()=>setFilter(item.id)}>{item.title}</button>
        })
        return elements;
    }  
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilters()}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
