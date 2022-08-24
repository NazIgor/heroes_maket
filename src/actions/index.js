export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroAdded = (hero) => {
    return {
        type: 'HERO_ADDED',
        payload: hero
    }
}
export const heroDelete = (id) => {
    return {
        type: 'HERO_DELETE',
        payload: id
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filterUpdate = (filter) => {
    return {
        type: 'FILTER_UPDATE',
        payload: filter
    }
}
export const filterClear = () => {
    return {
        type: 'FILTER_CLEAR',
    }
}