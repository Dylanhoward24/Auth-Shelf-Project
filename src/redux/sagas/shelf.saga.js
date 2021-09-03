import axios from "axios"
import {put, takeLatest} from "redux-saga/effects";

export default function* shelfSaga(){
    yield takeLatest('FETCH_SHELF', fetchShelfList);
}

function* fetchShelfList(){
    const res = yield axios.get('/api/shelf');
    console.log('res.data is', res.data);

    yield put({
        type: 'SET_SHELF_LIST',
        payload: res.data
    });
}