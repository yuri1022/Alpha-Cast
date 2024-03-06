import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import { Emoji } from "emoji-picker-react";
import Dropdown from "react-bootstrap/Dropdown";
import CategoryModal from "./CategoryModal";
import CategoryInput from "./CategoryInput";
import EmojiInput from "./EmojiInput";
// import AddPodcastModal from "../podcast/AddPodcastModal";
import { deleteCategory, editCategory, getCategory } from "../api/script";
import useApi from "../context/useApi";
import Swal from "sweetalert2";

export default function EditCategoryBtn({ icon, name, id }) {
  let { categoryId } = useParams();
  const navigate = useNavigate();
  const btnActive = {
    background: `${categoryId === id ? "black" : ""}`,
    color: `${categoryId === id ? "white" : ""}`,
    stroke: "white",
  };

  return (
    <>
      <div
        className="w-100 d-flex justify-content-between py-3 btn btn-outline-dark border-0 border-rounded-lg"
        onClick={() => {
          navigate(`/mypage/show/${id}`);
        }}
      >
        <div className="d-flex fs-4 align-items-center gap-3 ">
          <Emoji unified={icon} size="20" />
          <div style={{fontSize:'0.875rem',fontWeight:'500'}}>{name}</div>
        </div>
        <CategoryDropdown icon={icon} name={name} id={id} />
      </div>
    </>
  );
}

function CategoryDropdown({ icon, name, id }) {
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [addShow, setAddShow] = useState(false);

  const dropdownClass = "menu-item h4 mb-2 mt-2 py-2 px-5 ";
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle bsPrefix="none" variant="none" style={{marginRight:'-0.78rem',color:'var(--main-blue-grey)'}}>
          <FiMoreVertical className="fs-5" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="py-0 border-0 shadow-sm " >
          <Dropdown.Item
            className={dropdownClass}
            style={{ fontSize:'1rem' }}
          >
            <p onClick={() => setEditShow(true)}>編輯名稱</p>
          </Dropdown.Item>
          <Dropdown.Divider style={{ borderColor: "#EBEBEB" }} />
          <Dropdown.Item className={dropdownClass}
           style={{ fontSize:'1rem' }}>
            <p onClick={() => setDeleteShow(true)}>刪除分類</p>
          </Dropdown.Item>
          <Dropdown.Divider style={{ borderColor: "#EBEBEB" }} />
          <Dropdown.Item className={dropdownClass}
          style={{ fontSize:'1rem' }}>
            <p onClick={() => setAddShow(true)}>新增Podcast</p>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="visually-hidden">
        <DeleteCategoryModal
          show={deleteShow}
          setDeleteShow={setDeleteShow}
          name={name}
          icon={icon}
          id={id}
        />
        <EditCategoryModal
          show={editShow}
          setEditShow={setEditShow}
          name={name}
          icon={icon}
          id={id}
        />
        {/* <AddPodcastModal show={addShow} setShowModal={setAddShow} /> */}
      </div>
    </>
  );
}

function DeleteCategoryModal({ show, setDeleteShow, name, icon, id }) {
  const { setMyCategory } = useApi();

  const onDeleteClick = () => {
    setDeleteShow(false);
    const handleDelete = async () => {
      try {
        const success = await deleteCategory(id);
        if (success) {
          const updatedCategory = await getCategory();
          setMyCategory(updatedCategory);
        }
      } catch (err) {
        console.log(`Delete Category Failed ${err}`);
      }
    };
    handleDelete();
  };

  return (
    <CategoryModal
      show={show}
      handleClose={() => setDeleteShow(false)}
      handleSaveClick={onDeleteClick}
      title="刪除分類"
      input="1"
      body={
        <div>
          <span>您確定要繼續刪除 </span>
          <span style={{ fontWeight: 700 }}>
            <Emoji unified={icon} size="20" />
            {name}
          </span>
          <span> 的分類嗎？</span>
        </div>
      }
    />
  );
}

function EditCategoryModal({ show, setEditShow, name, icon, id }) {
  const [inputText, setInputText] = useState(name);
  const [inputEmoji, setInpuEmoji] = useState(icon);
  const { setMyCategory, myCategory } = useApi();

  const onEditClick = () => {
    setEditShow(false);
    const handleEditClick = async () => {
      const categoryName = inputText.concat(",", inputEmoji);
      try {
        const success = await editCategory({ id, name: categoryName });
        if (success) {
          setMyCategory(
            myCategory.map((item) => {
              if (id === item.id) {
                return { ...item, name: categoryName };
              } else return item;
            })
          );
        }
      } catch (err) {
        console.log(`${err}`);
        Swal.fire({
          title: err,
          icon: "error",
          timer: 1800,
          showConfirmButton: false,
        });
      }
    };
    handleEditClick();
  };

  return (
    <CategoryModal
      show={show}
      handleClose={() => setEditShow(false)}
      handleSaveClick={onEditClick}
      title="編輯名稱"
      input={inputText}
      body={
        <div className="d-flex gap-3">
          <EmojiInput value={inputEmoji} setEmoji={setInpuEmoji} />
          <CategoryInput
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
      }
    />
  );
}