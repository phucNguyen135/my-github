import React, { useCallback } from "react";
import { Button, Modal } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { actionCloseModal } from "../../redux/actions/modal";

const MyModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const _onClose = useCallback(() => {
    dispatch(actionCloseModal());
  }, []);

  return (
    <Modal dimmer="blurring" open={modal.open} onClose={_onClose}>
      <div aria-label="modal">
        <Modal.Header aria-label="modal-header">{modal.header}</Modal.Header>
        <Modal.Content aria-label="modal-message">
          {modal.message}
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={_onClose} aria-label="modal-button">
            OK
          </Button>
        </Modal.Actions>
      </div>
    </Modal>
  );
};

export default MyModal;
