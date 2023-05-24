import React from 'react'
import styled from 'styled-components'
import { Search, ShoppingCart } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { mobile } from '../responsive'

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
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding:  5px;
`
const Input = styled.input`
    border: none; 
    ${mobile({
        width: '50px',
    })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({
        fontSize: '24px'
    })}
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({
        flex: '2',
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
        marginLeft: '10px'
    })}
    &:hover {
        opacity: 0.5;
      }
`

export const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <Input placeholder='Search'/>
                        <Search style={{color: 'gray', fontSize: '16px'}}/>
                    </SearchContainer>
                </Left>
                <Center><Logo>Style.</Logo></Center>
                <Right>
                    <MenuItem>Register</MenuItem>
                    <MenuItem>Log in</MenuItem>
                    <MenuItem>
                        <Badge badgeContent={4} color='primary'>
                            <ShoppingCart/>
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}
