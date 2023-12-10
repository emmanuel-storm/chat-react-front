import Message, { IMessage } from "./Message";

export interface Props {
    messages: IMessage[];
    user: any;
}

const Messages = ({ messages, user }: Props) => {
    return (
      <div>
          {messages.map((msg, i) => (
            <div key={`${msg.timeSent}-${user.id}`}>
                <Message message={msg} user={user}/>
            </div>
          ))}
      </div>
    );
};

export default Messages;