import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bolder;
`

export const Announcement = () => {
  return (
    <div>
        <Container>
            Super Deal! Free Shopping on Orders Over $50
        </Container>
    </div>
  )
}
