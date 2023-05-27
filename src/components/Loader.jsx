import { ColorRing } from "react-loader-spinner"
import styled from "styled-components"

const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Loader = () => {
    return (
        <Container>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['teal', 'teal', 'teal', 'teal', 'teal']}
            />
        </Container>
    )
}
