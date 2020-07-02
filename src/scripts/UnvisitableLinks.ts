class UnvisitableLinks {
  memo: {};
  constructor() {
    this.memo = {};
  }
  has(href) {
    return href in this.memo;
  }
  add (href) {
    this.memo[href] = true;
  }
}

export default UnvisitableLinks;
