import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { allCategoriesSelector, allProductsSelector, fetchCategories, fetchProducts } from "store/productSlice";
import { PRODUCT_TABLE_HEAD } from "constants/Table";

import DropDown from "components/DropDown";
import Search from "components/Search";
import Loader from "components/Loader";
import AddProducts from "modals/Product/Add";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Button from '@mui/material/Button';

import "components/Product/index.scss"

function Product() {

  const dispatch = useDispatch()
  const products = useSelector(allProductsSelector);
  const categories = useSelector(allCategoriesSelector)
  const setTimeoutRef = useRef(null)

  const [filteredProducts,setFilteredProducts] = useState([])
  const [productSearchText, setProductSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [isLoader, setIsLoader] = useState(true);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, []);

  useEffect(() => {
    if (products.length) {
      setFilteredProducts(products);
      storeBrands();
    }
  }, [products.length]);

  useEffect(() => {
    if (products.length && categories.length) {
      setIsLoader(false)
    }
  }, [products.length, categories.length]);

  useEffect(() => {
    if (filteredProducts) {
      if (setTimeoutRef.current) {
        clearTimeout(setTimeoutRef.current)
      }
      setTimeoutRef.current = setTimeout(() => {
        applyFilters();
      }, 400)
    }
  }, [productSearchText, selectedBrand, selectedCategory, filteredProducts.length]);

  function storeBrands() {
    const allBrands = products.map(product => product.brand);
    const uniqueBrands = [...new Set(allBrands)];
    setBrands(uniqueBrands);
  }

  function applyFilters() {
    let filtered = products;

    if (productSearchText.trim() !== '') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(productSearchText.toLowerCase().trim())
      );
    }

    if (selectedBrand !== 'All') {
      filtered = filtered.filter(product => product.brand === selectedBrand)
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }

  function onPriceSort(direction) {
    const sortedProducts = [...filteredProducts];
    sortedProducts.sort((a, b) => {
      return direction === 'up' ? b.price - a.price : a.price - b.price;
    })
    setFilteredProducts(sortedProducts);
  }

  const comp = 'ArrowUpwardIcon';

  return (
    <div className="product">
      {isLoader ?
        <Loader /> :
        <>
          <div className="product-filters">
            <div className="product-search">
              <Search placeholder="products title" text={productSearchText} onChangeInput={(val) => setProductSearchText(val)} />
            </div>
            <div className="product-drop-down">
              <div className="product-drop-down-brand">
                <DropDown key={'Brands'} placeholder={'Brands'} items={brands} onChangeItem={(brand) => setSelectedBrand(brand)} />
              </div>
              <div className="product-drop-down-category">
                <DropDown key={'Categories'} placeholder={'Categories'} items={categories} onChangeItem={(category) => setSelectedCategory(category)} />
              </div>
              <div className="add-product-button">
                <Button variant="contained" onClick={() => setIsAddProductModalOpen(true)} startIcon={<AddSharpIcon />}>Add</Button>
              </div>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {PRODUCT_TABLE_HEAD.map(({ name, isContainsSortIcons }) => (
                    <TableCell key={name}>
                      <div className="table-head">
                        {name}
                        {isContainsSortIcons &&
                          <div className="product-price-sort">
                            <ArrowUpwardIcon className="price-arrow price-arrow-up" onClick={() => onPriceSort('up')} />
                            <ArrowDownwardIcon className="price-arrow price-arrow-down" onClick={() => onPriceSort('down')} />
                          </div>
                        }
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={PRODUCT_TABLE_HEAD.length} align="center">No Products</TableCell>
                  </TableRow>
                ) : (
                  filteredProducts?.map(({ id, title, brand, category, rating, price }) => (
                    <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>{title}</TableCell>
                      <TableCell>{brand}</TableCell>
                      <TableCell>{category}</TableCell>
                      <TableCell>{rating}</TableCell>
                      <TableCell>{price}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isAddProductModalOpen ? <AddProducts isAddProductModalOpen={isAddProductModalOpen} onClose={() => setIsAddProductModalOpen(false)} /> : null}
        </>
      }
    </div>
  )
}

export default Product;