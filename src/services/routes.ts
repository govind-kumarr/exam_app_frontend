
type METHOD = 'GET' | 'POST';

const methods: {[key: string]: METHOD}=  {
    GET: 'GET',
    POST: 'POST'
}

const Routes: {[ROUTE: string]: {METHOD: METHOD, URL: string}} = {
    GET_MCQS: {
        METHOD: methods.GET,
        URL: "/mcqs" 
    },
    ADD_MCQS: {
        METHOD: methods.POST,
        URL: "/mcqs" 
    }
}

export {Routes}