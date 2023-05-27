import { FavoriteBorderOutlined, LocalMall, RemoveRedEye, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Info = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all .3s ease-in-out;
`
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info} {
        opacity: 1;
    }
`
const Image = styled.img`
    z-index: 2;
    height: 75%;
`
const Icon = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all .3s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1)
    }
    `
const Price = styled.span`
    color: teal;
`

export const Product = ({ item }) => {
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Icon>
                    <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'black', display: 'flex', flexDirection: 'column' }}>
                        <LocalMall style={{fill: 'teal', fontSize: '28px', paddingLeft: '2px'}}/>
                        <Price>${item.price}</Price>
                    </Link>
                </Icon>
            </Info>
        </Container>
    )
}
