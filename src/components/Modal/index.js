import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { actionCloseModal } from "../../redux/actions/modal";

const MyModal = () => {
  const modal = useSelector((state) => state.modal);

  return (
    <div aria-label="modal">
      <Modal dimmer="blurring" open={modal.open} onClose={actionCloseModal}>
        <Modal.Header>{modal.header}</Modal.Header>
        <Modal.Content>{modal.message}</Modal.Content>
        <Modal.Actions>
          <Button positive onClick={actionCloseModal}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default MyModal;
