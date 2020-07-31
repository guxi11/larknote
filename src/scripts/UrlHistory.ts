class UrlHistory {
  history: string[];
  constructor() {
    this.history = [];
  }
  push(href) {
    this.history.push(href);
    this.show()
  }
  top() {
    return this.history[this.history.length - 1];
  }
  pop() {
    return this.history.pop();
  }
  length() {
    return this.history.length;
  }
  show(msg = 'push') {
    alert(msg + ': ' + this.history.join(','))
  }
}
export default UrlHistory;
