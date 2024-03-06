import { ModalDialog } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import '../styles/modal.scss'

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
        size="md"
        keyboard={false}
        centered 
        >
        <Modal.Dialog style={{borderRadius:'3rem',margin:'0'}}>
        <Modal.Header closeButton >
          <h4 className="modal-title" style={{fontSize:'1.125rem',fontWeight:'700'}}>{rest.title}</h4>
        </Modal.Header>
        <div style={{ height: "20rem" }} className="fs-4">
          <Modal.Body>{rest.body}</Modal.Body>
        </div>

        <div className="modal-bot d-flex" style={{justifyContent:'center',margin:'0 1.3rem 2rem 1.3rem'}}>

          <button
            className="btn fs-6 btn_lg border-rounded-lg col-6"
            onClick={handleClose} >
            取消
          </button>

          <button
            className="btn text-white fs-6 btn_lg border-rounded-lg col-6"
            onClick={handleSaveClick}
            disabled={!rest.input?.length ? true : false}
            style={{ backgroundColor: "#FF7F50" }}
          >
            儲存
          </button>

        </div>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}