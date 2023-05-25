import styled from "styled-components"
import { popularProducts } from "../data"
import { Product } from "./Product"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const Products = ({ category, filter, sort }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  // const products = useSelector(async(state) => await state.product.products)
  // console.log(products);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:5000/api/products?category=${category}`
            : "http://localhost:5000/api/products"
        )
        setProducts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
  }, [category])

  useEffect(() => {
    category && setFilteredProducts(
      products.filter(item => Object.entries(filter).every(([key, value]) =>
        item[key].includes(value))))
  }, [products, category, filter])

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    }
    else if (sort === 'asc') {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    }
    else if (sort === 'desc') {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <Container>
      {category
        ? filteredProducts.map(item => <Product key={item._id} item={item} />)
        : products.slice(0, 8).map(item => <Product key={item._id} item={item} />)
      }
    </Container>
  )
}
