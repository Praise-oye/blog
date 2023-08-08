export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken'); // Retrieve the access token from the session storage
}

export const getRefreshToken = () => {
    return sessionStorage.getItem('refreshToken'); // Retrieve the refresh token from the session storage
}

export const setAccessToken = (accessToken) => {
    sessionStorage.setItem('accessToken', `Bearer ${accessToken}`); // Set the access token in the session storage with the "Bearer" prefix
}

export const setRefreshToken = (refreshToken) => {
    sessionStorage.setItem('refreshToken', `Bearer ${refreshToken}`); // Set the refresh token in the session storage with the "Bearer" prefix
}

export const getType = (value, body) => {
    if (value.params) {
        return { params: body }; // Return an object with the body as the params property if value.params is truthy
    } else if (value.query) {
        if (typeof body === 'object') {
            return { query: body._id }; // If body is an object, return an object with the _id property of body as the query property
        } else {
            return { query: body }; // If body is not an object, return an object with body as the query property
        }
    }
    return {}; // Return an empty object if neither value.params nor value.query is truthy
}
