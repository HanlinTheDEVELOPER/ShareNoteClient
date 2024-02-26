/* eslint-disable no-unused-vars */
import { IconArrowRightFromArc } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import StyledErrorMessage from "../common/StyledErrorMessage";

const NoteForm = ({ isCreate }) => {
  const initialValues = {
    title: "",
    content: "",
  };

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Title must be at least 5 characters")
      .max(25, "Title must be less than 25 characters"),
    content: Yup.string()
      .required("Content is required")
      .min(10, "Content must be at least 10 characters")
      .max(1000, "Content must be less than 1000 characters"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create a new note." : "Edit your note."}
        </h1>
        <Link to={"/"}>
          <IconArrowRightFromArc />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="title" className=" font-medium block">
              Note title
            </label>
            <Field
              type="text"
              name="title"
              id="title"
              className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <StyledErrorMessage name="title" />
          </div>
          <div className="">
            <label htmlFor="description" className=" font-medium block">
              Note description
            </label>
            <Field
              as="textarea"
              rows={4}
              type="text"
              name="content"
              id="description"
              className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <StyledErrorMessage name="content" />
          </div>
          <button
            type="submit"
            className=" text-white bg-teal-600 py-3 font-medium w-full text-center"
          >
            Save
          </button>
        </Form>
      </Formik>
    </section>
  );
};

NoteForm.propTypes = {
  isCreate: PropTypes.bool,
};

export default NoteForm;
