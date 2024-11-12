import { useState } from "react";
import RatingArea from "../RatingArea/RatingArea";
import Comments from "../Comments/Comments";
import { session } from "../../hooks/usesession.js";

const BookComments = ({ _id }) => {
  const [comments, setComments] = useState([]);

  return (
    <div>
      <RatingArea _id={_id} setComments={setComments} comments={comments} />
      <Comments _id={session._id} comments={comments} />
    </div>
  );
};

export default BookComments;
