export const fetchComments = async (_id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments/book/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Errore nella fetch dei commenti:",
        response.status,
        response.statusText
      );
      return { comments: [] };
    }

    const data = await response.json();
    console.log("Dati dei commenti ricevuti:", data);
    return data;
  } catch (error) {
    console.error("Errore di rete o di sistema durante la fetch:", error);
    return { comments: [] };
  }
};

export const postComment = async (comment) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/comments/create/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    }
  );
  const data = await response.json();
  return data.comment;
};

export const deleteComment = async (_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/comments/${_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const updateComment = async (_id, newCommentText) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/comments/${_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: newCommentText }),
    }
  );
  return response.json();
};
