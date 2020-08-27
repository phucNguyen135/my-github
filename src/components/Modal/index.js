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
    <div aria-label="modal">
      <Modal dimmer="blurring" open={modal.open} onClose={_onClose}>
        <Modal.Header>{modal.header}</Modal.Header>
        <Modal.Content>{modal.message}</Modal.Content>
        <Modal.Actions>
          <Button positive onClick={_onClose}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default MyModal;
