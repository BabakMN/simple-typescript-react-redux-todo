import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import ConnectedApp from "./ConnectedApp";
import reducer from "./reducer";
import "./stylesheet.scss";

function main() {

    const mountPointID = "app-mount-point";
    const mountPoint = document.getElementById(mountPointID);

    if (mountPoint === null) {
        throw new Error("Application mount point not found.");
    }
    
    let devtools = undefined;
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
        devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__();
    }

    const store = createStore(
        reducer,
        undefined,
        devtools,
    );

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedApp />
        </Provider>,
        mountPoint,
    );

}

main();
