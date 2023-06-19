import * as Yup from "yup";

export const projectValidationSchema = Yup.object({
  project_name: Yup.string().required("Project name is required!"),
});
