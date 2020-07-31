class DocStack {
  depth: 0;
  constructor() {
    this.depth = 0;
  }
  push() {
    this.depth++;
  }
  pop() {
    if (this.depth)
      this.depth--;
  }
  getDepth() {
    return this.depth;
  }
  clear() {
    this.depth = 0;
  }
}
export default DocStack;
