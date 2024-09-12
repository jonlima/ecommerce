interface Input {
  name: string;
  link: string;
}

export const confirmEmail = (input: Input) => {
  return `
    Olá ${input.name},

    Obrigado por se cadastrar em nossa plataforma! Para confirmar seu e-mail, por favor, clique abaixo:

    <a href="${input.link}">Confirmar meu e-mail</a>
  `;
};
