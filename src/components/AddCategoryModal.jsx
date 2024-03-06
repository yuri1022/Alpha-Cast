import { useState } from "react";
import CategoryModal from "./CategoryModal";
import CategoryInput from "./CategoryInput";
import EmojiInput from "./EmojiInput";
import { getCategory, createCategory } from "../api/script";
import useApi from "../context/useApi";
import Swal from "sweetalert2";

export default function AddNewCategoryModal() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [categoryEmoji, setCategoryEmoji] = useState("1f642");
  const { setMyCategory } = useApi();

  const handleCreateClick = async () => {
    setShowModal(false);
    const categoryName = input.concat(",", categoryEmoji);
    try {
const updatedCategory = await createCategory(categoryName);

  if (updatedCategory.success) {
      const categoryData = await getCategory();
      console.log(categoryData)
      setMyCategory(categoryData);
    }
    } catch (err) {
      console.log(`${err}`);
      Swal.fire({
        title: err,
        icon: "error",
        timer: 1800,
        showConfirmButton: false,
      });
    } finally {
      setInput("");
      setCategoryEmoji("1f642");
    }
  };
  return (
    <div className="add-category" style={{zIndex:'5'}}>
      <button
        className="btn btn-outline-info col-12 mt-4"
        style={{
        color:'var(--main-blue)',
        height:'rem',
        border:'0.125rem solid var(--main-blue)', 
        borderRadius:'0.75rem'
        }}
       
        onClick={() => {
          setShowModal(true);
        }}
      >
        <div className="d-flex align-items-center gap-3 " style={{marginLeft:'1rem'}}>
          <p style={{fontSize:'2rem'}}>&#43;</p>
          <p style={{fontSize:'0.875rem',fontWeight:'500'}}>新增分類</p>
        </div>
      </button>
      <CategoryModal
        show={showModal}
        handleClose={() => {
          setInput("");
          setShowModal(false);
        }}
        input={input}
        title="新增分類"
        body={
          <div className="d-flex gap-3">
            <EmojiInput
              value={categoryEmoji}
              text="請輸入圖示文字:"
              setEmoji={setCategoryEmoji}
            />

            <div className="w-100">
              <CategoryInput
                input={input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
        }
        handleSaveClick={handleCreateClick}
      />
    </div>
  );
}