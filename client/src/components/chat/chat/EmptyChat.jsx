
import { Box, Typography, styled, Divider } from "@mui/material";
import MyLogo from "../../account/MyLogo";

const Component = styled(Box)`
  background: #f8f9fa;
  padding: 30px 0;
  text-align: center;
  height: 100vh;
`;
const Container = styled(Box)`
  pading: 0 200px;
`;

const Mylogog =styled(Box)`
  margin-top: 17%;
  margin-left: 30%;
  margin-right: 37%;
  border-radius: 10px;
  padding: 30px 30px  30px 30px;
  background-color: #55C9BA;

`

const Title = styled(Typography)`
  font-size: 27px;
  margin-top: 10px;
  margin-left: -80px;
  font-family: inherit;
  font-weight: 300;
  color: #41525d;
`;


const StyledDivider = styled(Divider)`
  margin: 400px 0;
  opacity: 0.4;
`;
const EmptyChat = () => {
  return (
    <Component>
      <Container>
        <Mylogog>
        <MyLogo/>
        </Mylogog>
        <Title>Chat with anyone, anywhere, anytime</Title>
        
        <StyledDivider/>
      </Container>
    </Component>
  );
};

export default EmptyChat;
