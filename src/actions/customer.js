import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formatData = data => ({
    ...data,
    phase: parseInt(data.phase) ? data.phase : 0,
    block: parseInt(data.block) ? data.block : 0,
    lot: parseInt(data.lot) ? data.lot : 0,
    createdBy: 'Creator',
    updatedBy: 'Updater'
})

export const fetchAll = () => dispatch => {
    api.customer().fetchAll()
        .then(
            response => {
                //console.log(response)
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
                    payload: response.data
                })
            }
        )
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data)
    api.customer().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formatData(data)
    api.customer().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }

            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, data, onSuccess) => dispatch => {
    api.customer().delete(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}