import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addNewProduct } from "store/productSlice";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";

import "modals/Product/Add/index.scss"

function AddProducts({ isAddProductModalOpen, onClose }) {

  const dispatch = useDispatch();

  const defaultProducts = {
    title: '',
    brand: '',
    category: '',
    rating: '',
    price: ''
  }

  const [addProduct, setAddProduct] = useState(defaultProducts);

  function onChangeProduct({ target: { name, value } }) {
    setAddProduct({...addProduct, [name]: value})
  }

  function createProduct() {
    const isValid = Object.values(addProduct).every(val => val.toString().trim());
    if (!isValid) return;
    dispatch(addNewProduct(addProduct));
    onClose();
  }

  return (
    <Modal
      open={isAddProductModalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="add-product-modal">
        <Typography id="modal-modal-title" sx={{ textAlign: 'center' }} variant="h6" component="h2">
          Add product
        </Typography>
        <Typography id="modal-modal-description" component="div" sx={{ textAlign: 'center'}}>
          <TextField variant="outlined" className="inputs" placeholder="Title" label="Title" name="title" value={addProduct.title} onChange={onChangeProduct} />
          <TextField variant="outlined" className="inputs" placeholder="Brand" label="Brand" name="brand" value={addProduct.brand} onChange={onChangeProduct} />
          <TextField variant="outlined" className="inputs" placeholder="Category" label="Category" name="category" value={addProduct.category} onChange={onChangeProduct} />
          <TextField variant="outlined" className="inputs" placeholder="Rating" label="Rating" name="rating" value={addProduct.rating} onChange={onChangeProduct} />
          <TextField variant="outlined" className="inputs" placeholder="Price" label="Price" name="price" value={addProduct.price} onChange={onChangeProduct} />
        </Typography>
        <div className="add-product-button">
          <Button variant="contained" onClick={createProduct}>Add</Button>
        </div>
      </Box>
    </Modal>
  )
}

export default AddProducts;