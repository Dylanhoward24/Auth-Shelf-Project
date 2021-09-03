import { useDispatch } from "react-redux";
import axios from "axios";


export default function ShelfItem({item}){

    const dispatch = useDispatch()
    
    const id = item.id

    const deleteShelfItems = () => { 
        axios.delete(`/api/shelf/${id}`)
            .then(res => {
                console.log('delete Item');
            })
            .catch(err => {
                console.log('delete item failed', err);
            })
            dispatch({
                type: 'FETCH_SHELF',
            })
    }

    return(
        <li>
            <p>{item.username}</p>
            <p>{item.description}</p>
            <img src={item.image_url} />
            <button onClick={deleteShelfItems}>Delete</button>
        </li>

    )
}