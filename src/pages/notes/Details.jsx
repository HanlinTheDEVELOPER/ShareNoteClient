import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../lib/noteApi";
const Details = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["note"],
    queryFn: () => getNoteById(id),
  });
  console.log(data, error, isLoading);
  return (
    <section className="px-10 mt-10">
      <div className="text-right">
        <Link
          to={"/"}
          className=" text-teal-600 font-medium border border-teal-600 px-3 py-2"
        >
          Back
        </Link>
      </div>
      <div className="border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
        <h3 className="text-3xl font-medium">{data?.data.title}</h3>
        <p className="text-base mt-2">{data?.data.content}</p>
      </div>
    </section>
  );
};

export default Details;
