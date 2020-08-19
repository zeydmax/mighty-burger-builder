import {put} from 'redux-saga/effects'
import * as actions from '../builder/actions'
import { fetchIngredients } from '../../services/requests'

export function* getIngredientsSaga(action) {
    yield put (actions.getIngredientsInit())
    try {
        const response = yield fetchIngredients()
        if (response) {
            yield put(actions.getIngredientsSuccess(response))
        }
    }
    catch(error) {
        yield put(actions.getIngredientsFailed())
    }
}