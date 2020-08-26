import React, { useCallback } from "react";
import { Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { actionCloseModal } from "../../redux/actions/modal";

const MyModal = (props) => {
  return (
    <div>
      <Modal dimmer="blurring" open={props.open} onClose={actionCloseModal}>
        <Modal.Header>{props.header}</Modal.Header>
        <Modal.Content>{props.message}</Modal.Content>
        <Modal.Actions>
          <Button positive onClick={actionCloseModal}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    open: state.modal.open,
    header: state.modal.header,
    message: state.modal.message,
  };
};

export default connect(mapStateToProps)(MyModal);
