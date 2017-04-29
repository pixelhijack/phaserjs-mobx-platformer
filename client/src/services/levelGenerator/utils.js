
export const flatten = multidimensional => {
    return multidimensional.reduce((res, row) => {
        return res.concat(row);
    }, []);
};

export const applyMatrix = (big, small, x, y) => {
    for (let row = 0; row < small.length; row++) {
        for (let col = 0; col < small[row].length; col++) {
            big[x + col][y + row] = small[row][col];
        }
    }
    return big;
};

export const createMatrix = (rows, cols, tile) => {
    let res = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(tile);
        }
        res.push(row);
    }
    return res;
};

export const layerToMatrix = layer => {
    return layer.data.reduce((result, tile, i) => {
        if (i % layer.width === 0) {
            result.push([tile]);
        } else {
            result[result.length - 1].push(tile);
        }
        return result;
    }, []);
};

export const checkIfAreaIsCovered = (matrix, x, y, width, height) => {
    let res = 0;
    for (let row = x; row < x + width; row++) {
        for (let col = y; col < y + height; col++) {
            res += matrix[row][col];
        }
    }
    return res === 0;
};

export const putMatrixAtPoint = (big, small, points) => {
    points.forEach(point => {
        applyMatrix(big, small, point[0], point[1])
    });
    return big;
};
