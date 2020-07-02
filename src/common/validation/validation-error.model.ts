export class ValidationError<T> {
  public readonly errorMessage: {
    text: string;
  };
  constructor(public readonly field: keyof T, text: string) {
    this.errorMessage = {
      text,
    };
  }
}
