import React from 'react';
import { PropTypes } from 'react';
import { ModalFooter, ModalHeader, ModalBody, ModalTitle } from 'react-bootstrap/lib/Modal';
import Modal from 'react-bootstrap/lib/Modal';


class PatternLibModalComponent extends React.Component {

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
            {this.props.customClass == "c-update-modal" ?
            (<Modal
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
            </Modal>)
            :(
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
                <Modal.Header className="c-modal__header" closeButton={this.props.closeButton}>
                    <Modal.Title componentClass="h2" className="c-modal__title" id="contained-modal-title-lg">{this.props.modalHeading}</Modal.Title>

                </Modal.Header>
                
                <Modal.Body className={this.props.modalHeading == "" && this.props.modalFooter == "" ? "c-modal__body" : "c-modal__body c-modal__body--padding"} >
                    {this.props.modalBody}
                </Modal.Body>
               
                    
                <Modal.Footer className="c-modal__footer">
                    {this.props.modalFooter}
                </Modal.Footer>
            </Modal>
            )}
            </div>
        );
    }
}


// PatternLibModalComponent.propTypes = {
//     show: React.PropTypes.bool,
//     onHide: React.PropTypes.func,
//     bsSize: React.PropTypes.string,
//     modalHeading: React.PropTypes.string,
//     modalBody: React.PropTypes.string,
//     modalFooter: React.PropTypes.string,
//     customClass: React.PropTypes.string,
//     closeButton: React.PropTypes.bool,
// };

// PatternLibModalComponent.defaultProps = {
//     show: false,
//     onHide: function () { return null; },
//     bsSize: 'medium',
//     modalHeading: '',
//     modalBody: '',
//     modalFooter: '',
//     closeButton: true,
//     modalInContainer: false,
//     backdrop: true,
//     scope: this
// };

module.exports = PatternLibModalComponent;

