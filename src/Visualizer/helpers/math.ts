const VALUE_INCREMENT = 130;

export function makePositive(value: number) {
    value += VALUE_INCREMENT;

    return !value || value < 0 ? 0 : value;
}

export function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}