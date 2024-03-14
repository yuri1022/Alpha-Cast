


function CategoryInput({ onChange, value }) {
  return (
    <div  style={{height:'3.375rem',width:'25rem'}}>
      <input
        className="form-control form-control-lg"
        style={{backgroundColor:'var(--grey-light)',border:'none',fontSize:'0.875rem',height:'100%',width:'100%'}}
        type="text"
        placeholder="請輸入新的分類名稱（可變更 emoji）"
        value={value}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default CategoryInput;