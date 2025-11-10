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

export function getImageSize_right(
  imgeUrl: string,
  wide: number,
  height: number = wide
) {
  return imgeUrl + `?param=${height}y${wide}`
}

export function formatTime(time: number) {
  //转成秒钟
  const timeSecondes = time / 1000
  //获取分钟和秒钟
  const minue = Math.floor(timeSecondes / 60)
  const Secondes = Math.floor(timeSecondes) % 60
  //格式化时间
  const formatMinute = String(minue).padStart(2, '0')
  const formatSecondes = String(Secondes).padStart(2, '0')

  return formatMinute + ':' + formatSecondes
}
