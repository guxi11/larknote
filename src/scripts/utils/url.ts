function isNote (url: string): boolean {
  return ['docs'].some(word => url.indexOf(word) >= 0);
}

export default {
  isNote
}
