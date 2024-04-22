/* eslint-disable no-unused-vars */
import { IconArrowRightFromArc } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import StyledErrorMessage from "../common/StyledErrorMessage";
import Lexical from "../lexical/Editor.jsx";
import { useState } from "react";
import UserInterestInput from "../user/UserInterestInput.jsx";
import TagsModel from "../common/Model.jsx";
import { Button, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../lib/Api/noteApi.js";
import { useUserStore } from "../../store/userStore.js";

const NoteForm = ({ isCreate }) => {
  const user = useUserStore((state) => state.user);
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["note"],
    mutationFn: (data) => createNote(data),
  });

  const toast = useToast();
  const navigate = useNavigate();

  const [body, setBody] = useState({
    title: "",
    content: "",
    tags: [],
  });

  const { title, content, tags } = body;
  const isDisabled =
    title.length === 0 && content.length === 0 && tags.length === 0
      ? true
      : false;

  const NoteFormSchema = Yup.object({
    // title: Yup.string()
    //   .required("Title is required")
    //   .min(5, "Title must be at least 5 characters")
    //   .max(25, "Title must be less than 25 characters"),
    // content: Yup.string()
    //   .required("Content is required")
    //   .min(10, "Content must be at least 10 characters")
    //   .max(1000, "Content must be less than 1000 characters"),
  });

  const handleCreateSubmit = async (values) => {
    try {
      await mutateAsync({ ...body, user: user._id });
      toast({
        title: "Note Created",
        status: "success",
        duration: 1000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Upload Failed",
        status: "error",
        duration: 1000,
      });
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5 text-white">
          {isCreate ? "Create a new note." : "Edit your note."}
        </h1>
        <Link to={"/"}>
          <IconArrowRightFromArc />
        </Link>
      </div>
      <Formik
        initialValues={body}
        validationSchema={NoteFormSchema}
        onSubmit={handleCreateSubmit}
      >
        <Form>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Title"
              name="title"
              id="title"
              value={body.title}
              onChange={(e) =>
                setBody((prev) => ({ ...prev, title: e.target.value }))
              }
              className=" text-lg border-2 border-teal-600 py-1 w-full indent-6 rounded-lg bg-[#262626]"
            />
            <StyledErrorMessage name="title" />
          </div>
          <div>
            <div>
              {tags?.map((tag) => (
                <span>{tag} |</span>
              ))}
            </div>
            <TagsModel
              toggleElement={<div>Select Tags</div>}
              type="button"
              isSubmitModel={false}
            >
              <UserInterestInput
                isLimitedTagsLength={false}
                tags={body.tags}
                setBody={setBody}
                isFromModal={false}
              />
            </TagsModel>
          </div>
          <div className="">
            <Lexical setContent={setBody} />
          </div>
          <Button
            type="submit"
            isDisabled={isDisabled}
            bg="brand.900"
            _hover={{ bg: "brand.900" }}
            className=" text-white bg-teal-600 py-3 font-medium w-full text-center rounded-lg"
          >
            Save
          </Button>
        </Form>
      </Formik>
    </section>
  );
};

NoteForm.propTypes = {
  isCreate: PropTypes.bool,
};

export default NoteForm;
