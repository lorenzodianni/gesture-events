export class Touch {
  public readonly clientX: number;
  public readonly clientY: number;
  public readonly pageX: number;
  public readonly pageY: number;
  public readonly screenX: number;
  public readonly screenY: number;
  public readonly identifier: number;

  constructor(x: number, y: number, identifier: number) {
    this.clientX = x;
    this.clientY = y;
    this.pageX = x;
    this.pageY = y;
    this.screenX = x;
    this.screenY = y;
    this.identifier = identifier;
  }
}
