import EditSubjectForm from "@/components/EditSubjectForm";
import { getSubjectById } from "@/server-utils/curriculum-functions";

type Params = {
  curriculumId: string;
  subjectId: string;
};
export default async function EditSubjectPage({ params }: { params: Params }) {
  const { result: subject, error } = await getSubjectById(
    params.curriculumId,
    params.subjectId
  );
  if (error || !subject) return;

  return (
    <div className={`px-[32px] w-full h-fit flex flex-col items-center`}>
      <br />
      <br />
      <EditSubjectForm subject={subject} curriculumId={params.curriculumId} />
    </div>
  );
}
