function calculateWater() {
  const blockHeightsInput = document.getElementById('blockHeights')
  const waterResult = document.getElementById('waterResult')
  const waterChart = document.getElementById('waterChart')
  waterResult.innerHTML = ''

  const blockHeights = blockHeightsInput.value.trim().split(',').map(Number)
  const waterUnits = computeWaterStorage(blockHeights)

  if (waterUnits >= 0) {
    waterResult.textContent = `Water Storage: ${waterUnits} Units`
    drawWaterChart(blockHeights, waterChart)
  } else {
    waterResult.textContent = 'Invalid input! Please enter valid block heights.'
    waterChart.innerHTML = ''
  }
}

function computeWaterStorage(heights) {
  let left = 0
  let right = heights.length - 1
  let leftMax = 0
  let rightMax = 0
  let waterUnits = 0

  while (left < right) {
    if (heights[left] < heights[right]) {
      if (heights[left] >= leftMax) {
        leftMax = heights[left]
      } else {
        waterUnits += leftMax - heights[left]
      }
      left++
    } else {
      if (heights[right] >= rightMax) {
        rightMax = heights[right]
      } else {
        waterUnits += rightMax - heights[right]
      }
      right--
    }
  }

  return waterUnits
}

function drawWaterChart(heights, svgElement) {
  const chartWidth = 500
  const chartHeight = 200
  const barWidth = chartWidth / heights.length

  svgElement.innerHTML = ''

  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttributeNS(null, 'width', chartWidth)
  svg.setAttributeNS(null, 'height', chartHeight)

  let xOffset = 0
  for (let i = 0; i < heights.length; i++) {
    const barHeight = chartHeight - heights[i] * 10
    const rect = document.createElementNS(svgNS, 'rect')
    rect.setAttributeNS(null, 'x', xOffset)
    rect.setAttributeNS(null, 'y', barHeight)
    rect.setAttributeNS(null, 'width', barWidth)
    rect.setAttributeNS(null, 'height', heights[i] * 10)
    rect.setAttributeNS(null, 'fill', '#007BFF')
    svg.appendChild(rect)
    xOffset += barWidth
  }

  svgElement.appendChild(svg)
}
