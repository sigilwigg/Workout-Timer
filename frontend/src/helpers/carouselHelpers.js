export function updateLeftRightIdx(dir, [leftIdx, rightIdx]) {
    if (dir == "PREV") {
        leftIdx == 0 ?
            leftIdx = 4
            : leftIdx -= 1
        rightIdx == 0 ?
            rightIdx = 4
            : rightIdx -= 1
        return [leftIdx, rightIdx];
    }

    if (dir == "NEXT") {
        leftIdx == 4 ?
            leftIdx = 0
            : leftIdx += 1
        rightIdx == 4 ?
            rightIdx = 0
            : rightIdx += 1
        return [leftIdx, rightIdx];
    }
};

export function updateLeftRightCards(cards, workouts, newPosition, newLeft, newRight) {
    // left most card
    cards[newLeft] = workouts[newPosition - 2];
    // right most card
    cards[newRight] = workouts[newPosition + 2];

    return cards;
}