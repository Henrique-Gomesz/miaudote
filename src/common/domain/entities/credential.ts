const MIN_LENGTH = 9;
const MAX_LENGTH = 256;
const REQUIRE_UPPERCASE = true;
const REQUIRE_LOWERCASE = true;
const REQUIRE_DIGIT = true;
const REQUIRE_SPECIAL_CHARACTER = true;
const SPECIAL_CHARACTERS = '!@#$%&';

export class Password {
  public constructor(public credential: string) {
    this.credential = credential;
  }

  validate(): string[] {
    const errors: string[] = [];

    if (this.credential.length < MIN_LENGTH) {
      errors.push(`A senha deve ter pelo menos ${MIN_LENGTH} caracteres.`);
    }

    if (this.credential.length > MAX_LENGTH) {
      errors.push(`A senha deve ter no máximo ${MAX_LENGTH} caracteres.`);
    }

    if (REQUIRE_UPPERCASE && !/[A-Z]/.test(this.credential)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula.');
    }

    if (REQUIRE_LOWERCASE && !/[a-z]/.test(this.credential)) {
      errors.push('A senha deve conter pelo menos uma letra minúscula.');
    }

    if (REQUIRE_DIGIT && !/\d/.test(this.credential)) {
      errors.push('A senha deve conter pelo menos um dígito.');
    }

    if (
      REQUIRE_SPECIAL_CHARACTER &&
      !new RegExp(
        `[${SPECIAL_CHARACTERS.split('')
          .map((c) => `\\${c}`)
          .join('')}]`,
      ).test(this.credential)
    ) {
      errors.push(`A senha deve conter pelo menos um caractere especial: ${SPECIAL_CHARACTERS}`);
    }

    return errors;
  }

  static validateStatic(password: string): string[] {
    const credential = new Password(password);

    return credential.validate();
  }
}
