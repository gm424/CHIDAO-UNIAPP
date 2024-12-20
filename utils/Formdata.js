export function formatNumber(num) {
  let number = Number(num)
  console.log('处理', num, number >= 10000, typeof number)
  if (num >= 10000 && num < 100000000) {
    return (num / 10000).toFixed(2) + '万'
  }

  if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + '亿'
  }
  return num
}


