import styled from "styled-components"
import { Navbar } from '../components/Navbar'
import { Announcement } from '../components/Announcement'
import { Footer } from "../components/Footer"
import { Products } from "../components/Products"
import { Newsletter } from "../components/Newsletter"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useState } from "react"

const Container = styled.div`

`
const Title = styled.h1`
    margin: 20px;
    text-transform: capitalize;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({
        marginLeft: '0px 20px',
        display: 'flex',
        flexDirection: 'column'
    })}
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({
        marginRight: '0px'
    })}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 10px;
    ${mobile({
        margin: '10px 0px'
    })}
`
const Option = styled.option`

`
export const ProductList = () => {
    const location = useLocation()
    const category = location.pathname.split('/')[2]
    const [filter, setFilter] = useState({})
    const [sort, setSort] = useState('newest')
    const handleFilter = (ev) => {
        const value = ev.target.value
        setFilter({
            ...filter,
            [ev.target.name]: value
        })
    }
    const handleSort = (ev) => {
        setSort(ev.target.value)
    }
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{category}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name='color' onChange={handleFilter}>
                        <Option disabled>Color</Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>yellow</Option>
                        <Option>green</Option>
                    </Select>
                    <Select name='size' onChange={handleFilter}>
                        <Option disabled>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={handleSort}>
                        <Option value='newest'>Newest</Option>
                        <Option value='asc'>Price (asc)</Option>
                        <Option value='desc'>Price (desc)</Option>
                    </Select>
                    </Filter>
            </FilterContainer>
            <Products category={category} filter={filter} sort={sort}/>
            <Newsletter />
            <Footer />
        </Container>
    )
}
