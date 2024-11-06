
const routes = {
  signin: () => "/api/auth/signin",
  edit: (curriculumId: string, subjectId: string) =>
    `/edit/${curriculumId}/${subjectId}`,
  create: (curriculumId: string) => `./create/${curriculumId}`,
  catalogulMeu: () => "/catalogul-meu"
};

export default routes;
