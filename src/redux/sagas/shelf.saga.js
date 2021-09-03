import axios from "axios"
import {put, takeLastest} from "../../../server/routes/shelf.router"

export default function* shelfSaga(){
    yield takeLastest('FETCH_SHELF', fetchShelfList)
}

function* fetchShelfList(){
    const res = yield axios.get('/api/shelf')
    yield put({
        type: 'SET_SHELF_LIST',
        payload: res.data

    })
}

