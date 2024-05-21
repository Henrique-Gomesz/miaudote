export class Document {
  private document: string;

  public constructor(document: string) {
    this.document = this.removeMask(document);
  }

  public validate(): boolean {
    return this.validateCPF(this.document);
  }

  public validateCPF(cpf: string): boolean {
    // Remove non-numeric characters
    cpf = cpf.replace(/\D/g, '');

    // Check if the CPF has 11 digits
    if (cpf.length !== 11) {
      return false;
    }

    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(9))) {
      return false;
    }

    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  }

  public formatWithMask(): string {
    // Remove non-numeric characters
    const document = this.document.replace(/\D/g, '');

    // Check if the CPF has 11 digits
    if (document.length !== 11) {
      return this.document;
    }

    // Format the CPF
    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  public removeMask(document: string): string {
    return document.replace(/\D/g, '');
  }

  public static validateStatic(cpf: string): boolean {
    const document = new Document(cpf);
    return document.validate();
  }

  public toString(): string {
    return this.document;
  }
}
