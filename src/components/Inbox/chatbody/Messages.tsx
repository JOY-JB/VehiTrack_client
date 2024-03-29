import { useState } from "react";
import { useDispatch } from "react-redux";
// import { messagesApi } from "../../../features/messages/messagesApi";
import { getUserInfo } from "@/services/auth.service";
import Message from "./Message";

export default function Messages({
  messages,
  totalCount,
}: {
  messages?: any;
  totalCount: any;
}) {
  // const newMessages = messages
  //   .slice()
  //   .sort((a, b) => a.timestamp - b.timestamp);

  // const { user } = useSelector((state) => state.auth);
  const user = getUserInfo() as any;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  console.log(messages);

  // const fetchMoreData = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };

  // useEffect(() => {
  //   if (page > 1) {
  //     dispatch(
  //       messagesApi.endpoints.getMoreMessages.initiate({
  //         id: messages[0].conversationId,
  //         page,
  //       })
  //     );
  //   }
  // }, [page, dispatch, messages]);

  // console.log(hasMore, page, totalCount);

  // useEffect(() => {
  //   if (totalCount > 0) {
  //     const more =
  //       Math.ceil(
  //         totalCount / Number(process.env.REACT_APP_MESSAGES_PER_PAGE)
  //       ) > page;
  //     setHasMore(more);
  //   }
  // }, [totalCount, page]);

  // console.log(messages);
  return (
    <div
      id="scrollableDiv"
      className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse"
    >
      {/* <InfiniteScroll
        dataLength={messages.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        // height={window.innerHeight - 197}
        // style={{ display: "flex", flexDirection: "column-reverse" }}
        inverse={true}
        scrollableTarget="scrollableDiv"
      >
        {messages
          .slice()
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((message) => {
            const justify =
              message.sender.email !== user.email ? "start" : "end";
            return (
              <Message
                key={message.id}
                justify={justify}
                message={message.message}
              />
            );
          })}
      </InfiniteScroll> */}

      {messages
        .slice()
        .sort((a: any, b: any) => a.createdAt - b.createdAt)
        .map((message: any) => {
          const justify = message.senderId !== user.id ? "start" : "end";
          return (
            <Message
              key={message.id}
              justify={justify}
              message={message.message}
            />
          );
        })}
    </div>
  );
}
