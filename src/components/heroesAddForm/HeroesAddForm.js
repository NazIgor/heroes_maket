
import { v4 as createUiid } from "uuid";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useEffect } from "react";
import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { heroesFetching, heroAdded } from "../../actions";

const HeroesAddForm = () => {
    const [filters, setFilters]=useState([]);
    const {request}=useHttp();
    const {register, handleSubmit,reset}=useForm();
    const dispatch=useDispatch();

    //console.log(heroesList);
    useEffect(()=>{
        request("http://localhost:3001/filters")
            .then(data => {
                setFilters(data);
            })
            .catch((e) => console.log('error: ', e))

        // eslint-disable-next-line
    },[])
    const onSubmit=(data)=>{
        data.id=createUiid();
        console.log(data);
        const body=JSON.stringify(data),
              method='POST';
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes/",
            method,
            body
        )
        .then(result=>{
            dispatch(heroAdded(result))
            reset();
        })
        .catch(e=>console.log(e));
    }
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    {...register("name")}
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    {...register("description") }
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    {...register("element")}>
                    {/* <option key={"choose_fil"}>Я владею элементом...</option> */}
                    {ElemUsed(filters)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}
const ElemUsed=(items)=>{
    const elements=items.map(item=>{
        return <option key={createUiid()} value={item.id} data-id={item.name}>{item.title}</option>  
    })
    return elements;
}

export default HeroesAddForm;
