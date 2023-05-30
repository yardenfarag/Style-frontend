import styled from "styled-components"
import { Product } from "./Product"
import { useEffect, useState } from "react"
import { query } from "../store/product"
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from "./Loader"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const Products = ({ filter, sort }) => {
  const dispatch = useDispatch()
  const [filteredProducts, setFilteredProducts] = useState([])
  const products = useSelector(state => state.product.products)

  useEffect(() => {
    dispatch(query())
  }, [dispatch])

  useEffect(() => {
    if (filter) {
      if (filter.color) {
        setFilteredProducts(
          products?.filter(product => {
            return product.color && product.color.includes(filter.color)
          })
        )
      } else if (filter.size) {
        setFilteredProducts(
          products?.filter(product => {
            return product.size && product.size.includes(filter.size)
          })
        )
      }
      else {
        setFilteredProducts(products);
      }
    } else {
      setFilteredProducts(products);
    }
  }, [products, filter]);


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

  if (!products) {
    return <Loader />
  }

  else return (
    <Container>
      {!products && <Loader/>}
      {filteredProducts.map(item => <Product key={item._id} item={item} />)}
    </Container>
  )
}
