import React from 'react'
import styled from 'styled-components'
import { Search, ShoppingCart } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from '../store/auth'

const Container = styled.div`
    height: 60px;
    overflow: hidden;
    ${mobile({
    height: '50px'
})}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({
    padding: '10px 0px'
})}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Logo = styled.h1`
    font-weight: bold;
    color: black;
    ${mobile({
    fontSize: '24px',
    paddingInlineStart: '22px'
})}
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({
    flex: '1',
    justifyContent: 'center'
})}
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    transition: all .3s ease-in-out;
    ${mobile({
    fontSize: '12px',
    marginLeft: '12px'
})}
    &:hover {
        opacity: 0.5;
      }
`

export const Navbar = () => {
    const dispatch = useDispatch()
    const cartQuantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.auth.user)
    const logoutHandler = () => {
        dispatch(authActions.logout())
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to='/' style={{ textDecoration: 'none' }}><Logo>Style.</Logo></Link>
                </Left>
                <Right>
                    {!user && <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}><MenuItem>Register</MenuItem></Link>}
                    {!user && <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}><MenuItem>Log in</MenuItem></Link>}
                    {user && <MenuItem onClick={logoutHandler}>Log out</MenuItem>}
                    <Link to='/cart' style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuItem>
                            <Badge badgeContent={cartQuantity} color='primary'>
                                <ShoppingCart />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}
