import React from 'react';
import PropTypes from 'prop-types';
// import { ModalFooter, ModalHeader, ModalBody, ModalTitle } from 'react-bootstrap/lib/Modal';
import Modal from 'react-bootstrap/lib/Modal';


class ModalComponent extends React.Component {

    componentWillMount() {
        // mounted before rendering
    }

    componentDidMount() {
        // executed after first render
        // ajax calls, action calls, should be called here.
        /** other life cycle methods can be triggered by
        setting the state here (applied to state full component)
        */
    }

    componentWillReceiveProps(newProps) {
        // when the props are updated, this method is invoked before the render of the component.
    }
    shouldComponentUpdate(newProps, newState) {
        // returns boolean value.
        // returns true by default.
        // if there is no needed to re-render even after the state or props updated, then return false
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        // called before rendering
    }
    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
        // its an unmounting fron the dom
    }
    render() {
        return (
            <Modal
                show={this.props.show}
                className={this.props.customClass}
                onHide={this.props.onHide}
                bsSize={this.props.bsSize}
                modalheading={this.props.modalheading}
                modalfooter={this.props.modalfooter}
                container={this.props.scope}
                backdrop={this.props.backdrop}
                >
                <Modal.Header className="c-modal__header" closeButton={this.props.closeButton}>
                    <Modal.Title componentClass="h2" className="c-modal__title" id="contained-modal-title-lg">{this.props.modalheading}</Modal.Title>
                </Modal.Header>
                
                <Modal.Body className={this.props.modalheading == "" && this.props.modalfooter == "" ? "c-modal__body" : "c-modal__body c-modal__body--padding"} >
                    {this.props.modalbody}
                </Modal.Body>
               
                <Modal.Footer className="c-modal__footer">
                    {this.props.modalfooter}
                </Modal.Footer>
            </Modal>

        );
    }
}


ModalComponent.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    bsSize: PropTypes.string,
    modalheading: PropTypes.string,
    modalbody: PropTypes.object,
    modalfooter: PropTypes.object,
    customClass: PropTypes.string,
    closeButton: PropTypes.bool,
};

ModalComponent.defaultProps = {
    show: false,
    onHide: function () { return null; },
    bsSize: 'medium',
    modalheading: '',
    modalbody: '',
    modalfooter: '',
    closeButton: true,
    modalInContainer: false,
    backdrop: true,
    scope: this
};

module.exports = ModalComponent;

