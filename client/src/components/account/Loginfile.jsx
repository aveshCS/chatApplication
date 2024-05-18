import { useContext } from "react";
import { Dialog, Box, Typography, styled } from "@mui/material";
import { qrCodeImage } from "../../constants/data";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import MyLogo from "./MyLogo";

const Component = styled(Box)`
  display: flex;
`;

const QRCode = styled("img")({
  height: "264px",
  width: "274px",
  margin: "226px 0 0 19px",
});
const Mimage = styled("img")({
    height: "671px",
    
});

const Container = styled(Box)`
  
`;



const Textlogin = styled(Typography)`
  position: absolute;
  top: 12%;  
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 45px;
  color: #fff;
  font-weight: bold;
  font-family: 'Your Font', sans-serif;
  background-color: #00a884;
  padding: 1px 4px 1px 4px;
  border-radius: 18px;
`;
const Mylo= styled(Box)`
    position: absolute;
    top: 6%;
    left: 13%;
    transform: translate(-50%, -50%);
   

` 
  const dialogstyle = {
    height: "96%",
    marginTop: "12%",
    width: "1000px",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    overflow: "hidden",
  };
const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    const decoded = jwt_decode(res.credential);
    setAccount(decoded);
    await addUser(decoded);
  };

  const onLoginError = (err) => {
    console.log(err);
  };
  return (
    <Dialog open={true} PaperProps={{ sx: dialogstyle }} hideBackdrop={true}>
      <Component>
        <Container>
           <Mimage src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*hgEjtnKsxAP4Cl8ZW6qjnQ.jpeg" alt="connect to internet" />
           <Mylo>
             <MyLogo/>
           </Mylo>
        </Container>

        <Box style={{ position: "relative" }}>
            <Textlogin>Login</Textlogin>
          <QRCode src={qrCodeImage} alt="QR Code" />
          <Box
            style={{
              position: "absolute",
              top: "23%",
              width: "10%",
              transform: "translateX(108%) translateY(-25%)",
            }}
          >
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
          </Box>
        </Box>
        <MyLogo/>
                
      </Component>
    </Dialog>
  );
};

export default LoginDialog;

