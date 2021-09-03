import react, {useState} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function AddShelfItem() {

    // set const to allow us to use above feature dispatch
    const dispatch = useDispatch();

    let [description, setDescription] = useState('');
    let [image_url, setImage_url] = useState('');

    function submitItem() {
        axios.post('/api/shelf', {
            description, image_url
        }).catch(err => console.error(err));

        dispatch({
            type: 'FETCH_SHELF'
        });
    }

    return(
        <form onSubmit={submitItem}>
            <input
                type="text"
                placeholder="desciption"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <input
                type="text"
                maxLength="2083"
                placeholder="image url"
                value={image_url}
                onChange={(event) => setImage_url(event.target.value)}
            />
            <button>Add</button>
        </form>
    );
}