function isPointWithinBox(point, center, size) {
    const left = center.x - size.x / 2
    const right = center.x + size.x / 2
    const up = center.y + size.y / 2
    const down = center.y - size.y / 2
    return point.x >= left && point.x <= right && point.y >= down && point.y <= up
}

function setEqual(a, b) {
    if (a.size !== b.size) return false;
    for (const i of b) {
        if (!a.has(i)) return false;
    }
    return true;
}
