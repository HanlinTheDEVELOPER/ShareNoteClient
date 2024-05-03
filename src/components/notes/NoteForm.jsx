/* eslint-disable no-unused-vars */
import { IconArrowRightFromArc } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useBackToPrev } from "../../hooks/useBackToPrev.js";
import { useCustomToast } from "../../hooks/useCustomToast.js";
import { createNote, updateNote } from "../../lib/Api/noteApi.js";
import { useUserStore } from "../../store/userStore.js";
import TagsModel from "../common/Model.jsx";
import StyledErrorMessage from "../common/StyledErrorMessage";
import Lexical from "../lexical/Editor.jsx";
import UserInterestInput from "../user/UserInterestInput.jsx";
import { queryClient } from "../../main.jsx";

const NoteForm = ({ isCreate, title = "", content = "", tags = [], slug }) => {
  const user = useUserStore((state) => state.user);
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["note"],
    mutationFn: (data) => createNote(data),
  });

  const { mutateAsync: updateMutateAsync, isPending: isUpdatePending } =
    useMutation({
      mutationKey: ["note"],
      mutationFn: (data) => updateNote(data),
      onSuccess: () => queryClient.invalidateQueries("note"),
    });

  const { fromUrl, fromUrlState } = useBackToPrev();
  const { successToast, errorToast } = useCustomToast();

  const navigate = useNavigate();

  const [body, setBody] = useState({
    title: title,
    content: content,
    tags: tags,
  });

  // const [onClose, setOnClose] = useState();

  const isDisabled =
    body.title.length === 0 &&
    body.content.length === 0 &&
    body.tags.length === 0
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
      const createNote = await mutateAsync({
        ...body,
        user: user._id,
      });
      successToast("Note Created");
      navigate("/notes/" + createNote?.data.slug);
    } catch (error) {
      console.log(error);
      errorToast("Upload Failed");
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const updateData = await updateMutateAsync({
        slug,
        data: { ...body },
      });
      console.log(updateData);
      successToast("Update Success");
      navigate("/notes/" + updateData?.data.slug);
    } catch (error) {
      console.log(error);
      errorToast("Update Failed");
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5 text-white">
          {isCreate ? "Create a new note." : "Edit your note."}
        </h1>
        <Link to={fromUrl ?? ".."}>
          <IconArrowRightFromArc />
        </Link>
      </div>
      <Formik
        initialValues={body}
        validationSchema={NoteFormSchema}
        onSubmit={isCreate ? handleCreateSubmit : handleUpdateSubmit}
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
              {body.tags?.map((tag) => (
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
            <Lexical
              setContent={setBody}
              content={isCreate ? null : body.content}
            />
          </div>
          <Button
            type="submit"
            isDisabled={isDisabled}
            isLoading={isPending || isUpdatePending}
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
