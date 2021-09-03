import axios from "axios";

const shelfListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SHELF_LIST':
            return action.payload
        case 'ADD_SHELF_ITEM':
            return [...state, action.payload]
        default:
            return state;
    }
}

export default shelfListReducer;