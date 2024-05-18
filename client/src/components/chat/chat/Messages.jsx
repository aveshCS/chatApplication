import { useContext, useState, useEffect, useRef } from "react";
import { Box, styled } from "@mui/material";
import { AccountContext } from '../../../context/AccountProvider';
import { newMessage, getMessages } from "../../../service/api";
import Footer from "./Footer";
import Message from "./Message";

const Wrapper = styled(Box)`
    background-image: url(${'https://cdn1.vectorstock.com/i/1000x1000/00/15/apps-icon-seamless-background-vector-1000015.jpg'});
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 76vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 80px;
`;

const Messages = ({person, conversation}) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState();
    const [image, setImage] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);

    const scrollRef = useRef();

    const { account, socket, newMessageFlag, setnewMessageFlag, activeUsers } = useContext(AccountContext);

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        });
    }, [socket.current]);

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation._id);
            setMessages(data);
        }
        conversation._id && getMessageDetails();
    }, [person._id, conversation._id, newMessageFlag]);

    useEffect(() => {
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' }), 777);
    }, [messages]);

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
            setMessages(prev => [...prev, incomingMessage])
    }, [incomingMessage, conversation]);

    const sendText = async (e) => {
        const code =  e.keyCode || e.which;
        if(code === 13){
            let message = {};
            const isRecipientOnline = activeUsers?.some(user => user.sub === person.sub);

            if(!file){
                message = {
                    senderId : account.sub,
                    receiverId : person.sub,
                    conversationId : conversation._id,
                    type: 'text',
                    text: value,
                    isOnline: isRecipientOnline,
                    message_status: isRecipientOnline ? 'seen' : 'unseen' // Set message status
                }
            } else {
                message = {
                    senderId : account.sub,
                    receiverId : person.sub,
                    conversationId : conversation._id,
                    type: 'file',
                    text: image,
                    isOnline: isRecipientOnline,
                    message_status: isRecipientOnline ? 'seen' : 'unseen' // Set message status
                }
            }

            socket.current.emit('sendMessage', message);
            
            await newMessage(message);

            setValue('');
            setFile('');
            setImage('');
            setnewMessageFlag(prev => !prev);
        }
    }

    return(
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message => (
                        <Container ref={scrollRef} key={message._id}>
                            <Message message={message} />
                        </Container>
                    ))
                }
            </Component>
            <Footer
                sendText = {sendText}
                setValue = {setValue}
                value={value}
                file={file}
                setFile={setFile}
                setImage={setImage}
            />
        </Wrapper>
    )
}

export default Messages;
