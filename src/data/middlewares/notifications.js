import { toast } from 'react-toastify';

const notificationsMiddleware = () => next => action =>{    
    if(action.successMessage && /(.*)_(SUCCESS)/.test(action.type)){
        toast.success(action.successMessage);
    }

    if(action.failureMessage && /(.*)_(FAILURE)/.test(action.type)){
        toast.error(action.failureMessage)
    }

    next(action);
}

export default notificationsMiddleware;