import { useState } from "react";
import { useDispatch } from "react-redux";
// import {
//   conversationsApi,
//   useAddConversationMutation,
//   useEditConversationMutation,
// } from "../../features/conversations/conversationsApi";
// import { useGetUserQuery } from "../../features/users/usersApi";
// import isValidEmail from "../../utils/isValidEmail";
// import Error from "../ui/Error";

export default function Modal({
  open,
  control,
}: {
  open?: any;
  control?: any;
}) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [userCheck, setUserCheck] = useState(false);
  // const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const dispatch = useDispatch();
  const [resError, setResError] = useState("");
  const [conversation, setConversation] = useState(undefined);

  // const { data: participant } = useGetUserQuery(to, { skip: !userCheck });

  // const [addConversation, { isSuccess: isAddConversationSuccess }] =
  //   useAddConversationMutation();
  // const [editConversation, { isSuccess: isEditConversationSuccess }] =
  //   useEditConversationMutation();

  // useEffect(() => {
  //   if (
  //     participant?.length > 0 &&
  //     participant[0].email !== loggedInUser.email
  //   ) {
  //     // check conversation existing
  //     dispatch(
  //       conversationsApi.endpoints.getConversation.initiate({
  //         userEmail: loggedInUser.email,
  //         participantEmail: to,
  //       })
  //     )
  //       .unwrap()
  //       .then((data) => {
  //         setConversation(data);
  //       })
  //       .catch((err) => {
  //         setResError("There was an error");
  //       });
  //   }
  // }, [participant, loggedInUser.email, dispatch, to]);

  // // listen conversation add/edit success
  // useEffect(() => {
  //   if (isAddConversationSuccess || isEditConversationSuccess) {
  //     control();
  //   }
  // }, [isAddConversationSuccess, isEditConversationSuccess]);

  // const debounce = (fn, delay) => {
  //   let timeoutId;
  //   return (...args) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       fn(...args);
  //     }, delay);
  //   };
  // };

  // const doSearch = (e) => {
  //   if (isValidEmail(e.target.value)) {
  //     setTo(e.target.value);
  //     setUserCheck(true);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (conversation?.length > 0) {
  //     editConversation({
  //       sender: loggedInUser.email,
  //       id: conversation[0].id,
  //       data: {
  //         participants: `${loggedInUser.email}-${participant[0].email}`,
  //         users: [loggedInUser, participant[0]],
  //         message,
  //         timestamp: new Date().getTime(),
  //       },
  //     });
  //   } else if (conversation?.length === 0) {
  //     addConversation({
  //       sender: loggedInUser.email,
  //       data: {
  //         participants: `${loggedInUser.email}-${participant[0].email}`,
  //         users: [loggedInUser, participant[0]],
  //         message,
  //         timestamp: new Date().getTime(),
  //       },
  //     });
  //   }
  // };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send message
          </h2>
          <form
            className="mt-8 space-y-6"
            // onSubmit={handleSubmit}
            method="POST"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  // onChange={debounce(doSearch, 500)}
                  id="to"
                  name="to"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Send to"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="message"
                  name="message"
                  //@ts-ignore
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Message"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                // disabled={
                //   conversation === undefined ||
                //   (participant?.length > 0 &&
                //     participant[0].email === loggedInUser.email)
                // }
              >
                Send Message
              </button>
            </div>

            {/* {participant?.length === 0 && (
              <Error message="This user does not exist!" />
            )}
            {participant?.length > 0 &&
              participant[0].email === loggedInUser.email && (
                <Error message="You can not send message to yourself" />
              )}
            {resError !== "" && <Error message={resError} />} */}
          </form>
        </div>
      </>
    )
  );
}
