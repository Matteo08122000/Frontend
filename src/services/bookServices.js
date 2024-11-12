export const uploadFile = async (fileToUpload) => {
  const fileData = new FormData();
  fileData.append("img", fileToUpload);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/books/upload/cloud`,
      {
        method: "POST",
        body: fileData,
      }
    );

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.img;
  } catch (error) {
    console.error("Errore durante l'upload dell'immagine:", error.message);
    return null;
  }
};

export const createBook = async (formData, file) => {
  let urlImg = null;
  if (file) {
    urlImg = await uploadFile(file);
    if (!urlImg) {
      console.error("L'upload dell'immagine è fallito.");
      return;
    }
  }
  try {
    const postFormData = { ...formData, img: urlImg };
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/books/create`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postFormData),
      }
    );

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const createdBook = await response.json();
    return createdBook;
  } catch (error) {
    console.error("Errore durante la creazione del libro:", error.message);
  }
};
