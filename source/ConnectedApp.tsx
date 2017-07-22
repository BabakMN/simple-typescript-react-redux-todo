import { connect } from "react-redux";
import App from "./App";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import mergeProps from "./mergeProps";

const connector = connect<any, any, any, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
);

const connectedApp = connector(App);

export default connectedApp;
