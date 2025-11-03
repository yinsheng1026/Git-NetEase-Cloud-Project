export function formatCount(count: number) {
  if (count > 100000) {
    return `${Math.floor(count / 10000)}万`
  } else return count
}

export function getImageSize(
  imgeUrl: string,
  wide: number,
  height: number = wide
) {
  return imgeUrl + `?param=${height}×${wide}`
}
