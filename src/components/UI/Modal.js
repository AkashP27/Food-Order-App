import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
 return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const Overlays = (props) => {
 return (
  <div className={classes.modal}>
   <div className={classes.content}>{props.children}</div>
  </div>
 );
};

const Modal = (props) => {
 return (
  <React.Fragment>
   {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById("portals"))}
   {ReactDOM.createPortal(
    <Overlays>{props.children}</Overlays>,
    document.getElementById("portals")
   )}
  </React.Fragment>
 );
};

export default Modal;
