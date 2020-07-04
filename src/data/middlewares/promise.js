export default function promiseMiddleware(){
    return function(next){
        return function(action){
            const { promise, type, ...rest } = action;
            
            if(!promise || typeof promise.then !== 'function'){
                return next(action);
            }
    
            const SUCCESS = `${type}_SUCCESS`;
            const FAILURE = `${type}_FAILURE`;
            const REQUEST = `${type}_REQUEST`;
    
            next({ type: REQUEST, ...rest });

            return promise
                .then(response => response.json())
                .then(data => {
                    if(data.error) throw new Error(data.message);

                    console.log(`User ${data.username} added!`)
                    next({ 
                        ...rest,
                        type: SUCCESS,
                        payload: data
                    })
                })
                .catch(error => {
                    console.log(error.message);
                    next({
                        ...rest,
                        type: FAILURE,
                        payload: error.message,
                        failureMessage: error.message
                    })
                });
        }
    }
}