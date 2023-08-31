// UpdateForm.js
import { useState } from 'react';

function UpdateForm({ onClose }) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateClick = async () => {
    try {
      // Perform the update logic using formData
      // You might need to construct the updatedData object based on the formData fields
  
      const updatedData = {
        description: formData.description,
        location: formData.location,
        technician_type: formData.technician_type,
        image: formData.image,
        address: formData.address,
      };
  
      // Call the updateResource function with the resourceId and updatedData
      await updateResource(resourceId, updatedData);
  
      // If the update is successful, you can close the popup
      onClose();
    } catch (error) {
      // Handle error
      console.error("Error updating resource:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <form>
  <label>
    Description:
    <input
      type="text"
      name="description"
      value={formData.description || ''}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Location:
    <input
      type="text"
      name="location"
      value={formData.location || ''}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Technician Type:
    <input
      type="text"
      name="technician_type"
      value={formData.technician_type || ''}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Image:
    <input
      type="text"
      name="image"
      value={formData.image || ''}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Address:
    <input
      type="text"
      name="address"
      value={formData.address || ''}
      onChange={handleInputChange}
    />
  </label>
  <button type="button" onClick={handleUpdateClick}>
    Update
  </button>
</form>
  );
}

export default UpdateForm;