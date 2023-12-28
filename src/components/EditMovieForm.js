import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import useAxios from "../hooks/useAxios";

const EditMovieForm = (props) => {
  const { id } = useParams();

  const {
    data: movie,
    sendRequest: movieRequest,
    setData: setMovie,
    METHODS,
  } = useAxios({
    initialData: {
      title: "",
      director: "",
      genre: "",
      metascore: 0,
      description: "",
    },
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    movieRequest({ url: `/movies/${id}`, method: METHODS.GET });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    movieRequest({
      url: `/movies/${id}`,
      method: METHODS.PUT,
      redirect: `/movies/${id}`,
      callbackSuccess: props.updateMovies,
      data: movie,
    });
  };

  const { title, director, genre, metascore, description } = movie;

  return (
    <div className="bg-white dark:bg-slate-700 rounded-md shadow flex-1 dark:bg-slate-700">
      <form onSubmit={handleSubmit}>
        <div className="p-5 pb-3 border-b border-zinc-200 dark:border-zinc-900">
          <h4 className="text-xl font-bold">
            Düzenleniyor <strong>{movie.title}</strong>
          </h4>
        </div>

        <div className="px-5 py-3">
          <div className="py-2">
            <label className="block pb-1 text-lg">Title</label>
            <input
              value={title}
              onChange={handleChange}
              name="title"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Director</label>
            <input
              value={director}
              onChange={handleChange}
              name="director"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Genre</label>
            <input
              value={genre}
              onChange={handleChange}
              name="genre"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Metascore</label>
            <input
              value={metascore}
              onChange={handleChange}
              name="metascore"
              type="number"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Description</label>
            <textarea
              value={description}
              onChange={handleChange}
              name="description"
            ></textarea>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-zinc-200 dark:border-zinc-900 flex justify-end gap-2">
          <Link to={`/movies/${id}`} className="myButton bg-zinc-500">
            Vazgeç
          </Link>
          <button
            type="submit"
            className="myButton bg-green-700 hover:bg-green-600"
          >
            Düzenle
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;
