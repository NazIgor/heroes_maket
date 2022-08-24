import { useDispatch } from "react-redux";
import { heroDelete, heroesFetching } from "../../actions";
import { useHttp } from "../../hooks/http.hook";


const HeroesListItem = ({name, description, element, id}) => {
    const dispatch=useDispatch();
    const {request}=useHttp();
    let elementClassName;

    switch (+element) {
        case 2:
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 3:
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 4:
            elementClassName = 'bg-success bg-gradient';
            break;
        case 5:
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }
    const deleteHero=()=>{
        const method="DELETE";
        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes/${id}`,method)
        .then(result=>{
            dispatch(heroDelete(id));
        })
    }
    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white  ${elementClassName}`}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body ">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" className="btn-close btn-close" aria-label="Close" onClick={deleteHero}></button>
            </span>
        </li>
    )
}

export default HeroesListItem;