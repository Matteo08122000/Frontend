import { useState, useEffect, useContext } from "react";
import { fetchComments, deleteComment, updateComment } from "../../Api/api";
import { ListGroup, Button, Form, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Comments = ({ _id }) => {
  const [comments, setComments] = useState([]);
  const [localComments, setLocalComments] = useState([]);
  const [editedComment, setEditedComment] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [error, setError] = useState(null);

  const getComments = async () => {
    try {
      const result = await fetchComments(_id);

      setComments(result.comments || []);
      setLocalComments(result.comments || []);
    } catch (err) {
      setError("Errore nel caricamento dei commenti");
    }
  };

  const handleEditComment = (comment) => {
    setEditedComment(comment);
    setNewCommentText(comment.comment);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteComment(commentId);
      if (response.statusCode === 200) {
        const updatedComments = comments.filter(
          (comment) => comment._id !== commentId
        );
        setComments(updatedComments);
        setLocalComments(updatedComments);
        setError(null);
      } else if (response.statusCode === 404) {
        setError("Commento non trovato");
      } else {
        setError("Errore nella cancellazione del commento");
      }
    } catch (err) {
      setError("Errore nella cancellazione del commento");
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const response = await updateComment(commentId, newCommentText);
      if (response.statusCode === 200) {
        const updatedComments = comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, comment: newCommentText }
            : comment
        );
        setComments(updatedComments);
        setLocalComments(updatedComments);
        setEditedComment(null);
        setNewCommentText("");
        setError(null);
      } else {
        setError("Errore nell'aggiornamento del commento");
      }
    } catch (err) {
      setError("Errore nell'aggiornamento del commento");
    }
  };

  useEffect(() => {
    getComments();
  }, [_id]);

  return (
    <div className="mb-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup variant="flush" className="mb-5 d-flex justify-content-center">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <ListGroup.Item key={comment._id}>
              <div className="d-flex flex-column gap-1">
                <div>{comment.author}</div>
                {editedComment && editedComment._id === comment._id ? (
                  <>
                    <Form.Control
                      className="mt-2"
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                    />
                    <Button
                      data-testid="save-button"
                      className="mt-2"
                      onClick={() => handleUpdateComment(comment._id)}
                      variant="success"
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </Button>
                    <Button
                      data-testid="cancel-button"
                      onClick={() => setEditedComment(null)}
                      variant="danger"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </>
                ) : (
                  <>
                    <div>{comment.comment}</div>
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        data-testid="edit-button"
                        onClick={() => handleEditComment(comment)}
                        variant="warning"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        data-testid="delete-button"
                        onClick={() => handleDeleteComment(comment._id)}
                        variant="danger"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Nessun Commento per Questo libro</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default Comments;
