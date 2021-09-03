import React from 'react';
import {useEffect} from "react"
import {useDispatch} from "react-redux"
function ShelfPage() {
  //Set up dispatch 
  const dispatch = useDispatch();

  // Get logged-in user info on page load
  useEffect(() => {
    fetchShelf();
  }, []);


  const fetchShelf = () => {
    //send dispatch 
    dispatch({
      type: 'FETCH_SHELF'
    })

  }
  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
