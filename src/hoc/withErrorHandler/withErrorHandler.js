import React from 'react';
import useHttpErrorHandler from '../../hooks/httpErrorHandler'

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios)
            return (
                <React.Fragment>
                    <Modal 
                        show={error}
                        modalClosed={clearError}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </React.Fragment>
            )
    }
}

export default withErrorHandler;