import React from 'react';
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import AddShelfItem from '../AddShelfItem/AddShelfItem';

function ShelfPage() {
  //Set up dispatch 
  const dispatch = useDispatch();

  const shelf = useSelector(store => store.shelf)

  // Get logged-in user info on page load
  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    //send dispatch 
    dispatch({
      type: 'FETCH_SHELF'
    });
  }

  return (
    <div className="container">
      <h2>Shelf</h2>

      {/* form to add another item to shelf */}
      <AddShelfItem />

      <ul>
        {shelf.map((item, i) => (
          <div key={i}>
            <li>
              <p>{item.username}</p>
              <p>{item.description}</p>
              <img src={item.image_url}/>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ShelfPage;
