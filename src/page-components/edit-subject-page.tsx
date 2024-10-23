import EditSubjectForm from "@/components/EditSubjectForm";
import {
  getSubjectById,
  updateSubject
} from "@/server-utils/curriculum-functions";
import { Subject } from "@/types/curriculum-types";

type Params = {
  curriculumId: string;
  subjectId: string;
};
export default async function EditSubjectPage({ params }: { params: Params }) {
  const { result: subject, error } = await getSubjectById(
    params.curriculumId,
    params.subjectId
  );
  console.log("edit page server log: ", subject, error);
  if (error || !subject) return;

  return (
    <div className={`px-[32px] w-full h-fit flex flex-col items-center`}>
      <br />
      <br />
      <EditSubjectForm subject={subject} curriculumId={params.curriculumId} />
    </div>
  );
}
