import CreateSubjectForm from "@/components/CreateSubjectForm";

type Params = {
  curriculumId: string;
};
export default async function CreateSubjectPage({
  params
}: {
  params: Params;
}) {
  return (
    <div className={`px-[32px] w-full h-fit flex flex-col items-center`}>
      <br />
      <br />
      <CreateSubjectForm curriculumId={params.curriculumId} />
    </div>
  );
}
