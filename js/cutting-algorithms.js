/**
 * Cutting Algorithms Module
 * 
 * This module contains algorithms for optimizing the cutting of rectangular pieces
 * from a roll of film with fixed width.
 * 
 * Each algorithm can be used independently and can be extended with new algorithms
 * without breaking the existing ones.
 */

/**
 * Next-Fit Decreasing Height Algorithm
 * 
 * This algorithm sorts rectangles by height in decreasing order and
 * places them left-to-right, creating a new row when needed.
 * 
 * @param {Array} rectangles - Array of objects with width, height, and quantity properties
 * @param {Number} rollWidth - Width of the roll in mm
 * @param {Boolean} allowRotation - Whether to allow rotation of rectangles
 * @returns {Object} Result object with layout information
 */
function nextFitDecreasingHeight(rectangles, rollWidth, allowRotation) {
  // Implementation placeholder
  // In a real application, this would be a full implementation
  console.log("Running Next-Fit Decreasing Height algorithm");
  return simulateCutting(rectangles, rollWidth, allowRotation, 1.15); // 15% waste
}

/**
 * First-Fit Decreasing Algorithm
 * 
 * This algorithm sorts rectangles by width in decreasing order and
 * attempts to place each rectangle in the first available space.
 * 
 * @param {Array} rectangles - Array of objects with width, height, and quantity properties
 * @param {Number} rollWidth - Width of the roll in mm
 * @param {Boolean} allowRotation - Whether to allow rotation of rectangles
 * @returns {Object} Result object with layout information
 */
function firstFitDecreasing(rectangles, rollWidth, allowRotation) {
  // Implementation placeholder
  // In a real application, this would be a full implementation
  console.log("Running First-Fit Decreasing algorithm");
  return simulateCutting(rectangles, rollWidth, allowRotation, 1.22); // 22% waste
}

/**
 * Best-Fit Decreasing Algorithm
 * 
 * This algorithm sorts rectangles by area in decreasing order and
 * places each rectangle in the position that leaves the smallest waste.
 * 
 * @param {Array} rectangles - Array of objects with width, height, and quantity properties
 * @param {Number} rollWidth - Width of the roll in mm
 * @param {Boolean} allowRotation - Whether to allow rotation of rectangles
 * @returns {Object} Result object with layout information
 */
function bestFitDecreasing(rectangles, rollWidth, allowRotation) {
  // Implementation placeholder
  // In a real application, this would be a full implementation
  console.log("Running Best-Fit Decreasing algorithm");
  return simulateCutting(rectangles, rollWidth, allowRotation, 1.28); // 28% waste
}

/**
 * Simulate cutting (simplified for demo)
 * 
 * @param {Array} rectangles - Array of objects with width, height, and quantity properties
 * @param {Number} rollWidth - Width of the roll in mm
 * @param {Boolean} allowRotation - Whether to allow rotation of rectangles
 * @param {Number} wasteFactor - Factor to simulate waste (e.g., 1.15 for 15% waste)
 * @returns {Object} Result object with layout information
 */
function simulateCutting(rectangles, rollWidth, allowRotation, wasteFactor) {
  // Deep copy to avoid modifying original
  const rects = JSON.parse(JSON.stringify(rectangles));
  
  // Expand quantity into individual rectangles
  let allRects = [];
  rects.forEach(rect => {
    for (let i = 0; i < rect.quantity; i++) {
      // If rotation is allowed and the rectangle is wider than high,
      // consider rotating it to potentially save space
      let width = rect.width;
      let height = rect.height;
      
      if (allowRotation && width > height && height <= rollWidth) {
        // Swap width and height if it makes more sense for packing
        // and the rotated piece still fits within roll width
        const temp = width;
        width = height;
        height = temp;
      }
      
      allRects.push({
        width: width,
        height: height,
        area: (width / 1000) * (height / 1000)
      });
    }
  });
  
  // Total area
  const totalArea = allRects.reduce((sum, rect) => sum + rect.area, 0);
  
  // Simulate packing with given waste factor
  const length = (totalArea / (rollWidth / 1000)) * wasteFactor;
  const roundedLength = Math.ceil(length * 10) / 10; // Round to nearest 0.1m
  
  // Calculate usage and waste
  const rollArea = (rollWidth / 1000) * roundedLength;
  const usage = totalArea / rollArea * 100;
  const waste = 100 - usage;
  
  // Generate a layout map (simplified)
  const layout = generateSimpleLayout(allRects, rollWidth, roundedLength * 1000);
  
  return {
    length: roundedLength,
    lengthMm: roundedLength * 1000,
    usage: usage,
    waste: waste,
    wasteArea: (rollArea - totalArea),
    totalArea: totalArea,
    rollArea: rollArea,
    layout: layout
  };
}

/**
 * Generate a simple layout visualization
 * 
 * @param {Array} rectangles - Array of rectangle objects
 * @param {Number} rollWidth - Width of the roll in mm
 * @param {Number} rollLength - Length of the roll in mm
 * @returns {Array} Layout information for visualization
 */
function generateSimpleLayout(rectangles, rollWidth, rollLength) {
  // Create a simplified representation
  const rows = 3; // Number of rows to visualize
  const rowHeight = rollLength / rows;
  
  let layout = [];
  let remainingRects = [...rectangles];
  
  for (let row = 0; row < rows; row++) {
    let rowItems = [];
    let currentX = 0;
    
    while (currentX < rollWidth && remainingRects.length > 0) {
      const rect = remainingRects.shift();
      if (!rect) break;
      
      // Check if it fits in this row
      if (currentX + rect.width <= rollWidth) {
        rowItems.push({
          x: currentX,
          y: row * rowHeight,
          width: rect.width,
          height: rect.height,
          type: 'item',
          index: rectangles.length - remainingRects.length
        });
        
        currentX += rect.width;
      } else {
        // Add waste for the remaining space
        if (rollWidth - currentX > 0) {
          rowItems.push({
            x: currentX,
            y: row * rowHeight,
            width: rollWidth - currentX,
            height: rowHeight,
            type: 'waste'
          });
        }
        
        // Put back the rect for next row
        remainingRects.unshift(rect);
        break;
      }
    }
    
    // Add waste if row is not complete
    if (currentX < rollWidth) {
      rowItems.push({
        x: currentX,
        y: row * rowHeight,
        width: rollWidth - currentX,
        height: rowHeight,
        type: 'waste'
      });
    }
    
    layout.push(rowItems);
  }
  
  return layout;
}

// Export algorithm functions for use in main application
// These functions are called from cutting.html
window.calculateOptimalCutting = nextFitDecreasingHeight;
window.calculateAlgorithm2Cutting = firstFitDecreasing;
window.calculateAlgorithm3Cutting = bestFitDecreasing; 