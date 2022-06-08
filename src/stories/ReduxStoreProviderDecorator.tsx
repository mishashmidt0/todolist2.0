import React from 'react';
import {Provider} from "react-redux";
import {store} from "../store/redux";

const ReduxStoreProviderDecorator = (story: any) => {
    return (
        <Provider store={store}>
            {story()}
        </Provider>
    )

};

export default ReduxStoreProviderDecorator;