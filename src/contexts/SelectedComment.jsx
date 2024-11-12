import { createContext, useState } from "react";

const SelectedComment = createContext();

const SelectedCommentProvider = ({ children }) => {
  const [commentCardAsin, setCommentCardAsin] = useState("");

  const toggleCardAsin = (_id) => {
    setCommentCardAsin((prev) => (prev === _id ? null : _id));
  };

  return (
    <SelectedComment.Provider value={{ commentCardAsin, toggleCardAsin }}>
      {children}
    </SelectedComment.Provider>
  );
};

export { SelectedComment, SelectedCommentProvider };
