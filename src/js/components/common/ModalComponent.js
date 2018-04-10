import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';


class ModalComponent extends React.Component {
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

/* By default size of Bootstrap Modal component is "medium" 
    and optional sizes are "large" and "small"
*/
ModalComponent.defaultProps = {
    show: false,
    onHide: function () { return null; },
    modalheading: '',
    modalbody: '',
    modalfooter: '',
    closeButton: true,
    modalInContainer: false,
    backdrop: true,
    scope: this
};

module.exports = ModalComponent;

