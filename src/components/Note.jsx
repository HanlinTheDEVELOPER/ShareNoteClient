import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Note = () => {
  return (
    <div className=" w-full border-t-4 border-t-teal-600 shadow-lg p-3">
      <h3 className="text-xl font-medium">Lorem ipsum, dolor sit amet.</h3>
      <p className="text-sm text-gray-700 mt-1">
        lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sapiente
        necessitatibus molestiae
      </p>
      <div className="mt-2 flex items-center justify-end gap-4">
        <TrashIcon width={20} className=" text-red-600" />
        <Link to={"/edit/1"}>
          <PencilSquareIcon width={20} className="text-teal-600" />
        </Link>
        <Link to={"/notes/1"}>
          <EyeIcon width={20} className=" text-gray-500" />
        </Link>
      </div>
    </div>
  );
};

export default Note;
