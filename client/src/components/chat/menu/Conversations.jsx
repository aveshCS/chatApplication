import { useState, useEffect, useContext } from 'react';

import { Box, styled, Divider } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider';


import Conversation from './Conversation';
import { getUsers } from '../../../service/api';

const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Conversations = ({ text }) => {
    const [users, setUsers] = useState([]);
    
    const { account, socket, setActiveUsers } = useContext(AccountContext);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getUsers();
          if (Array.isArray(response)) {
            const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filteredData);
          } else {
            console.error("Invalid response format from getUsers:", response);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchData();
    }, [text]);
    useEffect(() => {
      socket.current.emit('addUser', account);
      socket.current.on("getUsers", (updatedUsers) => {
          setActiveUsers(updatedUsers);
      });
  }, [account, socket, setActiveUsers]);

    return (
        <Component>
            {
                users && users.map((user, index) => (
                    user.sub !== account.sub && 
                        <>
                            <Conversation user={user} />
                            {
                                users.length !== (index + 1)  && <StyledDivider />
                            }
                        </>
                ))
            }
        </Component>
    )
}

export default Conversations;