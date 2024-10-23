import Joi from "joi";
import { Grade, Absence, Activity } from "@/types/curriculum-types";

// Define a Joi schema for grades
const gradeSchema = Joi.object<Grade>({
  score: Joi.number().min(1).max(10).required(), // Assuming score is between 1 and 10
  date: Joi.string().isoDate().required(), // ISO string for the date
  id: Joi.object({ $oid: Joi.string() })
});

// Define a Joi schema for absences
const absenceSchema = Joi.object<Absence>({
  date: Joi.string().isoDate().required(), // ISO string for the date
  excused: Joi.boolean().required(),
  id: Joi.object({ $oid: Joi.string() })
});

// Define a Joi schema for activity
const activitySchema = Joi.object<Activity>({
  good: Joi.number().min(0).required(),
  bad: Joi.number().min(0).required(),
});

// Define a Joi schema for the form
const formSchema = Joi.object({
  subjectName: Joi.string().min(1).required(),
  absences: Joi.array().items(absenceSchema),
  grades: Joi.array().items(gradeSchema),
  activity: activitySchema,
  conduit: Joi.number().min(0).max(10).required() // Assuming conduit is between 0 and 10
});

// Function to validate the form
export const validateSubjectForm = (formData: {
  subjectName: string;
  absences: Absence[];
  grades: Grade[];
  activity: Activity;
  conduit: number;
}) => {
  const { error } = formSchema.validate(formData, { abortEarly: false });
  if (error) {
    return error.details.map((err) => err.message); // Return an array of error messages
  }
  return null; // No errors
};
