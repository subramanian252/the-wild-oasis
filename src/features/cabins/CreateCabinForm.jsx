import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseForm }) {
  const { id: editId, ...editDetails } = cabinToEdit;

  const editMode = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: editMode ? editDetails : {},
  });

  const { errors } = formState;

  const { isCreating, mutate } = useCreateCabin();

  const { isEditing, editMutate } = useEditCabin();

  const isWorking = isEditing || isCreating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (editMode)
      editMutate(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    else
      mutate(
        { ...data, image },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseForm ? "modal" : "regular"}
    >
      <FormRow label={"name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label={"maxCapacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this field is required",
            min: { value: 1, message: "value should be greater than 1" },
          })}
        />
      </FormRow>

      <FormRow label={"regularPrice"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "this field is required",
            min: { value: 1, message: "value should be greater than 1" },
          })}
        />
      </FormRow>

      <FormRow label={"discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label={"description"} error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label={"image"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: editMode ? "" : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseForm?.()}
        >
          Cancel
        </Button>
        <Button>{editMode ? "Edit cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
