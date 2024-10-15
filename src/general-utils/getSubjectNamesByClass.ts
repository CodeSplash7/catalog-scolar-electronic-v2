import { UserClass } from "@/types/user-types";

// todo: I'll do(finish) this at school..
export const getSubjectNamesByClass = (userClass: UserClass) => {
  switch (userClass.gradeLevel) {
    case "V":
      return [
        "Limba și literatura română",
        "Matematică",
        "Limba germană (germana_gimn)",
        "Limba engleză (engleza_gimn)",
        "Educație tehnologică",
        "Educație fizică și sport",
        "Biologie",
        "Istorie",
        "Educație plastică",
        "Religie ortodoxă",
        "Educație socială",
        "Informatică",
        "Geografie",
        "Educație muzicală",
        "Dirigenție"
      ];
    case "VI":
      return [
        "Limba și literatura română",
        "Matematică",
        "Limba germană (germana_gimn)",
        "Limba engleză (engleza_gimn)",
        "Educație fizică și sport",
        "Fizică",
        "Educație tehnologică",
        "Educație socială",
        "Educație plastică",
        "Religie ortodoxă",
        "Geografie",
        "Istorie",
        "Biologie",
        "Informatică",
        "Educație muzicală",
        "Dirigenție"
      ];
    case "VII":
      return [
        "Limba și literatura română",
        "Matematică",
        "Limba germană (germana_gimn)",
        "Limba engleză (engleza_gimn)",
        "Chimie",
        "Fizică",
        "Biologie",
        "Istorie",
        "Geografie",
        "Educație fizică și sport",
        "Limba latină",
        "Informatică",
        "Educație plastică",
        "Religie ortodoxă",
        "Educație socială",
        "Educație tehnologică",
        "Educație muzicală",
        "Dirigenție"
      ];
    case "VIII":
      return [
        "Limba și literatura română",
        "Matematică",
        "Limba germană (germana_gimn)",
        "Limba engleză (engleza_gimn)",
        "Chimie",
        "Fizică",
        "Biologie",
        "Istorie",
        "Geografie",
        "Educație fizică și sport",
        "Educație plastică",
        "Informatică",
        "Educație tehnologică",
        "Educație muzicală",
        "Dirigenție",
        "Religie ortodoxă"
      ];
    default:
      return [];
  }
};
