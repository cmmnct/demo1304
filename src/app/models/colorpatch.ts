export class ColorPatch {
  constructor(
  
    private _r: number,
    private _g: number,
    private _b: number,
    private _a: number,
    private _name: string,
    private _id?: number
  ) {}

  public get id() {
    return this._id;
  }

  public get r() {
    return this._r;
  }
  public get g() {
    return this._g;
  }
  public get b() {
    return this._b;
  }
  public get a() {
    return this._a;
  }
  public get name() {
    return this._name;
  }
  public get rgba() {
    return `rgba(${this._r},${this._g},${this._b},${this._a})`;
  }

  public set r (r: number) {
    this._r = r;
  }
  public set g (g: number) {
    this._g = g;
  }
  public set b (b: number) {
    this._b = b;
  }
  public set a (a: number) {
    this._a = a;
  }
  public set name (name:string) {
    this._name = name;
  }
}
