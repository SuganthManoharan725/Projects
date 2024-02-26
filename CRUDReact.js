import React, { useState } from 'react';
import './Additem.css'; 

const generateUniqueId = () => {
  const timestamp = new Date().getTime().toString(16);
  const randomPart = Math.random().toString(16).substring(2);
  return `${timestamp}${randomPart}`;
};

const CRUDComponent = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    radiovalue: '',
  });
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault(); 
    const newId = generateUniqueId();
    
  setItems([...items,{id:newId, name:formData.name, age:formData.age , radiovalue:formData.radiovalue}])
  }

  const handleUpdate = (item) => {
    setFormData({
      name: item.name,
      age: item.age,
      radiovalue: item.radiovalue,
    });
    setSelectedItemId(item.id);
  };

  const handleUpdateSubmit = () => {
    const updatedItems = items.map((item) =>
      item.id === selectedItemId
        ? {
            ...item,
            name: formData.name,
            age: formData.age,
            radiovalue: formData.radiovalue,
          }
        : item
    )

    setItems(updatedItems);
    setFormData({
      name: '',
      age: '',
      radiovalue: '',
    });
    setSelectedItemId(null);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div className="crud-container">
      <h1>CRUD Operations</h1>
      <div className="form-group">
        <label className='label-form'>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className='label-form'>Age</label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </div>
      <div className="form-group">
    <div className="radio-group">
        <label className='label-form'>Gender</label>
        <div className='.ratio-center'>
            <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.radiovalue === 'male'}
                onChange={(e) => setFormData({ ...formData, radiovalue: e.target.value })}
            />
            <label>Male</label>
        </div>
        <div className='.ratio-center'>
            <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.radiovalue === 'female'}
                onChange={(e) => setFormData({ ...formData, radiovalue: e.target.value })}
            />
            <label>Female</label>
        </div>
    </div>
</div>

      {selectedItemId ? (
        <div className="button-group">
          <button onClick={handleUpdateSubmit}>Update Item</button>
          <button onClick={() => setSelectedItemId(null)}>Cancel Update</button>
        </div>
      ) : (
        <button onClick={handleCreate}>Create Item</button>
      )}
      <div className="table-container">
        <h2>Item List</h2>
        <table className="table table-striped table-hover">
  <thead className="table-dark">
    <tr>
      <th scope="col">NAME</th>
      <th scope="col">AGE</th>
      <th scope="col">GENDER</th>
      <th scope="col">ACTIONS</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.radiovalue}</td>
        <td>
          <button onClick={() => handleUpdate(item)}>Update</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
      
    </div>
  );
};

export default CRUDComponent;
