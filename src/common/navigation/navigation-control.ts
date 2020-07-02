export class NavigationControl {
  constructor(private readonly previousUri: string, private readonly nextUri: string) {}
  public next = (f: (_: string) => string = a => a): string => {
    return f(this.nextUri);
  };
  public previous = (f: (_: string) => string = a => a): string => {
    return f(this.previousUri);
  };
}
