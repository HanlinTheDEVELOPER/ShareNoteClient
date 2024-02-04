/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Note = ({ note }) => {
  return (
    <Link to={"/notes/1"}>
      <div className=" w-full border-t-4 border-t-teal-600 shadow-lg p-3">
        <div className="flex items-center justify-start gap-4">
          <img
            src={note.sender.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-xl font-medium">{note.title}</h3>
            <h5 className="text-xs text-gray-500">{note.sender.name}</h5>
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-1">
          {note.content.substr(0, 100)} ...
        </p>
        <div className="mt-2 flex items-center justify-end gap-4"></div>
      </div>
    </Link>
  );
};

export default Note;
