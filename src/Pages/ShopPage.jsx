import React, { useEffect, useState } from 'react'
import BreadCrum from '../Components/BreadCrum'

import SingleProduct from '../Components/SingleProduct'

import { getProduct } from '../Redux/ActionCreators/ProductActionCreator'
import { getMainCategory } from '../Redux/ActionCreators/MainCategoryActionCreator'
import { getSubCategory } from '../Redux/ActionCreators/SubCategoryActionCreator'
import { getBrand } from '../Redux/ActionCreators/BrandActionCreator'
import { useDispatch, useSelector } from 'react-redux'

const colors = ["Black", "White", "Blue", "Red", "Orange", "Gray", "Green", "Pink", "Yellow", "Purple", "Magenta", "N/A"]
const sizes = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "NB", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]
const selectedOption = () => ({
  maincategory: [],
  subcategory: [],
  brand: [],
  color: [],
  size: []
})

export default function ShopPage() {
  let [data, setData] = useState([])
  let [selected, setSelected] = useState(selectedOption)

  let [sortFilter, setSortFilter] = useState("1")      //for item filter
  let [search, setSearch] = useState("")               //for search item filter
  let [min, setMin] = useState(-1)                     //for price filter MIN                  
  let [max, setMax] = useState(-1)                     //for price filter MAX

  let MainCategoryStateData = useSelector(state => state.MainCategoryStateData)
  let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)

  let dispatch = useDispatch()

  function getInput(key, value) {
    let arr = selected[key]
    if (arr.includes(value)) {
      arr = arr.filter(x => x !== value)
    }
    else {
      arr.push(value)
    }
    setSelected({ ...selected, [key]: arr })
    filter({ ...selected, [key]: arr })
  }

  //This function is make for apply filter in the Shop section.
  function filter(selected) {
    setSearch("")
    let filteredData = ProductStateData.filter(x =>
      x.status &&
      (selected.maincategory.length === 0 ||
        selected.maincategory.includes(x.maincategory))
      &&
      (selected.subcategory.length === 0 ||
        selected.subcategory.includes(x.subcategory))
      &&
      (selected.brand.length === 0 ||
        selected.brand.includes(x.brand))
      &&
      (selected.color.length === 0 ||
        selected.color.some(color => x.color.includes(color)))
      &&
      (selected.size.length === 0 ||
        selected.size.some(size => x.size.includes(size)))
    )
    applySortFilter(filteredData, sortFilter)
  }

  function applySortFilter(data, value) {
    if (min !== -1 && max !== -1) {
      data = data.filter(x => x.finalPrice >= min && x.finalPrice <= max)
    }
    if (value == "1")
      setData(data.sort((x, y) => y.id.localeCompare(x.id)))
    else if (value == "2")
      setData(data.sort((x, y) => x.finalPrice - y.finalPrice))
    else
      setData(data.sort((x, y) => y.finalPrice - x.finalPrice))

    setSortFilter(value)
  }

  function postSearch() {
    setSelected(selectedOption)
    let ch = search.toLocaleLowerCase()
    let data = ProductStateData.filter(x => x.status && (
      (x.name.toLocaleLowerCase().includes(ch)) ||
      (x.maincategory.toLocaleLowerCase() === ch) ||
      (x.subcategory.toLocaleLowerCase() === ch) ||
      (x.brand.toLocaleLowerCase() === ch) ||
      (x.color.find(p => p.toLocaleLowerCase() === ch)) ||
      (x.size.find(p => p.toLocaleLowerCase() === ch))
    ))
    applySortFilter(data, sortFilter)
  }

  useEffect(() => {
    dispatch(getMainCategory())
    dispatch(getSubCategory())
    dispatch(getBrand())
    dispatch(getProduct())
  }, [])

  useEffect(() => {
    if (ProductStateData.length) {
      setData(ProductStateData.filter(x => x.status))
    }
  }, [ProductStateData])

  return (
    <>
      <BreadCrum title="Shop" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <ul className="list-group mb-3">
              <li className="list-group-item active" aria-current="true">MainCategory</li>
              {MainCategoryStateData.filter(x => x.status).map((item, index) => {
                return <li key={index} className="list-group-item" onClick={() => getInput('maincategory', item.name)}>
                  <span>{item.name}</span>
                  {selected.maincategory?.includes(item.name) ? <i className='bi bi-check float-end'></i> : null}
                </li>
              })}
            </ul>

            <ul className="list-group mb-3">
              <li className="list-group-item active" aria-current="true">SubCategory</li>
              {SubCategoryStateData.filter(x => x.status).map((item, index) => {
                return <li key={index} className="list-group-item" onClick={() => getInput('subcategory', item.name)}>
                  <span>{item.name}</span>
                  {selected.subcategory?.includes(item.name) ? <i className='bi bi-check float-end'></i> : null}
                </li>
              })}
            </ul>

            <ul className="list-group mb-3">
              <li className="list-group-item active" aria-current="true">Brand</li>
              {BrandStateData.filter(x => x.status).map((item, index) => {
                return <li key={index} className="list-group-item" onClick={() => getInput('brand', item.name)}>
                  <span>{item.name}</span>
                  {selected.brand?.includes(item.name) ? <i className='bi bi-check float-end'></i> : null}
                </li>
              })}
            </ul>

            <ul className="list-group mb-3">
              <li className="list-group-item active" aria-current="true">Colors</li>
              {colors.map((item, index) => {
                return <li key={index} className="list-group-item" onClick={() => getInput('color', item)}>
                  <span>{item}</span>
                  {selected.color?.includes(item) ? <i className='bi bi-check float-end'></i> : null}
                </li>
              })}
            </ul>

            <ul className="list-group mb-3">
              <li className="list-group-item active" aria-current="true">Sizes</li>
              {sizes.map((item, index) => {
                return <li key={index} className="list-group-item" onClick={() => getInput('size', item)}>
                  <span>{item}</span>
                  {selected.size?.includes(item) ? <i className='bi bi-check float-end'></i> : null}
                </li>
              })}
            </ul>

            <div className="my-3">
              <form onSubmit={(e) => {
                e.preventDefault();
                if (search !== "") {
                  postSearch()
                }
                else {
                  filter(selected)
                }
              }}>
                <div className="row mb-3">
                  <div className="col-6">
                    <label>Min. Amount</label>
                    <input type="number"
                      name='min'
                      onChange={(e) => setMin(e.target.value === "" ? -1 : Number(e.target.value))}
                      value={min === -1 ? "" : min}
                      className='form-control'
                      placeholder='Min. Amount' />
                  </div>
                  <div className="col-6">
                    <label>Max. Amount</label>
                    <input type="number"
                      name='max'
                      onChange={(e) => setMax(e.target.value === "" ? -1 : Number(e.target.value))}
                      value={max === -1 ? "" : max}
                      className='form-control'
                      placeholder='Max. Amount' />
                  </div>
                  <div className="col-12">
                    <button className='btn btn-primary mt-2 w-100' type='submit'>Apply Filter</button>
                  </div>
                </div>
              </form>
            </div>

          </div>

          <div className="col-md-9">
            <div className="row">
              <div className="col-xl-9 col-md-6 mb-3">
                <form onSubmit={(e) => {
                  e.preventDefault()
                  postSearch()
                }}>
                  <div className="btn-group w-100">
                    <input type="search" name='search' value={search} className='form-control' onChange={(e) => setSearch(e.target.value)} placeholder='Search Product By Name,Category,Brand,Color,Size, etc..' />
                    <button className='btn btn-primary'>Search</button>
                  </div>
                </form>
              </div>
              <div className="col-xl-3 col-md-6 mb-3">
                <select
                  className='form-select'
                  value={sortFilter}
                  onChange={(e) => applySortFilter(data, e.target.value)}>
                  <option value="1">Latest</option>
                  <option value="2">Price : Low to High</option>
                  <option value="3">Price : High to Low</option>
                </select>
              </div>
            </div>
            <div className="row">
              {data.map((item, index) => {
                return <div className="col-md-6 col-lg-4 wow fadeIn" key={index} >
                  <SingleProduct item={item} />
                </div>
              })}
            </div>
          </div>

        </div>
      </div >
    </>
  )
}
