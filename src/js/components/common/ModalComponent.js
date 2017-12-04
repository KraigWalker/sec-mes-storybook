import React from 'react';
import PropTypes from 'prop-types';
import { ModalFooter, ModalHeader, ModalBody, ModalTitle } from 'react-bootstrap/lib/Modal';
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
            <div>
            <Modal
                show={this.props.show}
                className={this.props.customClass}
                onHide={this.props.onHide}
                bsSize={this.props.bsSize}
                modalHeading={this.props.modalHeading}
                modalFooter={this.props.modalFooter}
                container={this.props.scope}
                backdrop={this.props.backdrop}
                >
                <Modal.Header className="c-update-modal__header" closeButton={this.props.closeButton}>
                    <Modal.Title className="c-update-modal__title" id="contained-modal-title-lg"> {this.props.modalHeading} </Modal.Title>

                </Modal.Header>
                <Modal.Body className="c-update-modal__body" > 
                    <div > {this.props.modalBody} </div>
                </Modal.Body>
                    
                <Modal.Footer className="c-update-modal__footer">
                    {this.props.modalFooter}
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}


ModalComponent.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    bsSize: PropTypes.string,
    modalHeading: PropTypes.string,
    modalBody: PropTypes.string,
    modalFooter: PropTypes.string,
    customClass: PropTypes.string,
    closeButton: PropTypes.bool,
};

ModalComponent.defaultProps = {
    show: false,
    onHide: function () { return null; },
    bsSize: 'medium',
    modalHeading: '',
    modalBody: '',
    modalFooter: '',
    closeButton: true,
    modalInContainer: false,
    backdrop: true,
    scope: this
};

module.exports = ModalComponent;

