const birthDate = "2007-02-16";

function getAge(birthDate: string): string {
  const [year, month, day] = birthDate.split("-").map(Number);

  const today = new Date();
  let age = today.getFullYear() - year;

  const birthdayHasPassed =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!birthdayHasPassed) {
    age--;
  }

  return `${age} anos`;
}

export const stylist = {
  name: "Marília Ribeiro dos Anjos",
  role: "Estilista em formação",
  introduction:
    "A moda é uma forma de expressão, identidade e liberdade. Estou construindo minha trajetória criativa explorando formas, referências e possibilidades para transformar ideias em peças e narrativas visuais.",
  photo: "/profile/Mari.jpeg",
  photoAlt: "Foto de perfil",
  details: [
    {
      label: "Idade",
      value: getAge(birthDate),
    },
    {
      label: "Faculdade",
      value: "Centro Universitário Senac",
    },
    {
      label: "Curso",
      value: "Design de Moda",
    },
    {
      label: "Localização",
      value: "São Paulo, SP",
    },
    {
      label: "WhatsApp",
      value: "+55 11 94643-6557",
    },
    {
      label: "E-mail",
      value: "maanjos1602@gmail.com",
    },
  ],
};