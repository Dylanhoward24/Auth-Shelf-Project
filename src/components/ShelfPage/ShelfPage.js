import axios from 'axios';
import React from 'react';
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import AddShelfItem from '../AddShelfItem/AddShelfItem';
import ShelfItem from '../ShelfItem/ShelfItem';


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
      <AddShelfItem 

      />

      <ul>
        {shelf.map((item, i) => (
          <div key={i}>
            <ShelfItem
              item={item}
              /> 
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ShelfPage;
