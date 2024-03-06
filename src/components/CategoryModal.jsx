import Modal from "react-bootstrap/Modal";

export default function CategoryModal({
  show,
  handleClose,
  handleSaveClick,
  ...rest
}) {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="md"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h3 className="modal-title fw-bold">{rest.title}</h3>
        </Modal.Header>
        <div style={{ height: "20rem" }} className="fs-4">
          <Modal.Body>{rest.body}</Modal.Body>
        </div>
        <Modal.Footer>
          <button
            className="btn fs-4 btn_lg border-rounded-lg"
            onClick={handleClose} >
            取消
          </button>

          <button
            className="btn text-white fs-4 btn_lg border-rounded-lg"
            onClick={handleSaveClick}
            disabled={!rest.input?.length ? true : false}
            style={{ backgroundColor: "#FF7F50" }}
          >
            儲存
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}