import styled from "styled-components"
import { Navbar } from "../components/Navbar"
import { Announcement } from "../components/Announcement"
import { Newsletter } from "../components/Newsletter"
import { Footer } from "../components/Footer"
import { Add, Remove } from "@mui/icons-material"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cartActions } from "../store/cart"
import { getById } from "../store/product"
import { Loader } from "../components/Loader"
import { ToastyMessage } from "../components/ToastyMessage"
import { toast } from "react-toastify"

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({
    padding: '10px',
    flexDirection: 'column',
})}
`
const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({
    height: '40vh'
})}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({
    padding: '10px'
})}
`
const Title = styled.h1`
    font-weight: 200;
`
const Description = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({
    width: '100%'
})}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilerColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
    border: 1px solid #c4c3c3;
    transition: all .2s ease-in-out;
    &.selected {
        transform: scale(1.2);
        border: 2px solid teal;
    }
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option`

`
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({
    width: '100%'
})}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
    cursor: pointer;
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: #f8f4f4;
    }
`

export const ProductDetails = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const product = useSelector(state => state.product.currProduct)
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getById(id))
        setColor(product?.color[0])
        setSize(product?.size[0])
    }, [id, location])

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1)
        }
        else if (type === 'inc') {
            setQuantity(quantity + 1)
        }
    }

    const addToCartHandler = () => {
        if (!color) {
            toast('Please select a color!')
            return
        }
        if (!size) {
            toast('Please select a size!')
            return
        }
        dispatch(cartActions.addProduct({...product, quantity, color, size}))
        toast('Item added to cart!')
    }

    if (!product) {
        return (
            <Loader/>
        )
    } else {
        return (
            <Container>
                <ToastyMessage/>
                <Navbar />
                <Announcement />
                <Wrapper>
                    {!product && <Loader/>}
                    <ImgContainer>
                        <Image src={product.img}></Image>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{product.title}</Title>
                        <Description>{product.description}</Description>
                        <Price>${product.price}</Price>
                        <FilterContainer>
                            <Filter>
                                <FilterTitle>Color</FilterTitle>
                                {product.color?.map(c => (
                                    <FilerColor color={c} key={c} onClick={()=>setColor(c)} className={color === c ? 'selected' : ''}/>
                                ))}
                            </Filter>
                            <Filter>
                                <FilterTitle>Size</FilterTitle>
                                <FilterSize onChange={(ev)=>setSize(ev.target.value)}>
                                    {product.size?.map(size => (
                                        <FilterSizeOption key={size}>{size}</FilterSizeOption>
                                    ))}
                                </FilterSize>
                            </Filter>
                        </FilterContainer>
                        <AddContainer>
                            <AmountContainer>
                                <Remove onClick={()=>handleQuantity('dec')} style={{cursor: 'pointer'}}/>
                                <Amount>{quantity}</Amount>
                                <Add onClick={()=>handleQuantity('inc')} style={{cursor: 'pointer'}}/>
                            </AmountContainer>
                            <Button onClick={addToCartHandler}>Add to cart</Button>
                        </AddContainer>
                    </InfoContainer>
                </Wrapper>
                <Newsletter />
                <Footer />
            </Container>
        )
    }
}
