import RgbaFactory from "../types/classes/RgbaFactory";
import Rgba from "../types/models/Rgba";

declare global {
    interface String {
        toRgba(): Rgba | null;
    }
    interface StringConstructor {
        fromRgba: (rgba: Rgba) => string;
    }
}

const regexHandlerArray = [
    {
        regex: /^#(\d|[a-f]){3}$/i,// #987
        handler: (str: string) => {
            const [, rChar, gChar, bChar] = str;
            const rgba = RgbaFactory.getRgba(
                Number.parseInt(rChar, 16) * 17,
                Number.parseInt(gChar, 16) * 17,
                Number.parseInt(bChar, 16) * 17,
                1
            );

            return rgba;
        }
    },
    {
        regex: /^#(\d|[a-f]){6}$/i, // #987654
        handler: (str: string) => {
            const rStr = str.slice(1, 3);
            const gStr = str.slice(3, 5);
            const bStr = str.slice(5, 6);
            const rgba = RgbaFactory.getRgba(
                Number.parseInt(rStr, 16),
                Number.parseInt(gStr, 16),
                Number.parseInt(bStr, 16),
                1
            );

            return rgba;
        }
    },
    {
        regex: /^rgb\(\s*(\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*\)$/i,// rgb(1, 2, 3)
        handler: (str: string) => {
            const numbersString = str.replace(/(rgb\(|\))/ig, "");
            const filteredNumbers = numbersString
                .split(",")
                .map(x => x.trim());
            const [r, g, b] = filteredNumbers.map(x => Number.parseInt(x));
            const rgba = RgbaFactory.getRgba(r, g, b, 1);

            return rgba;
        }
    },
    {
        regex: /^rgba\(\s*(\s*\d{1,3}\s*,){3}\s*\d(.\d)?\s*\)$/i,// rgba(235, 2, 3, 0.1)
        handler: (str: string) => {
            const numbersString = str.replace(/(rgba\(|\))/ig, "");
            const filteredNumbers = numbersString
                .split(",")
                .map(x => x.trim());
            const [r, g, b] = filteredNumbers
                .slice(0, 3)
                .map(x => Number.parseInt(x));
            const a = Number.parseFloat(filteredNumbers[3]);
            const rgba = RgbaFactory.getRgba(r, g, b, a);

            return rgba;
        }
    }
];

String.prototype.toRgba = function () {
    const match = regexHandlerArray.find((x) => x.regex.test("" + this));
    if (!match) {
        return null;
    }

    return match.handler("" + this);
}

String.fromRgba = function (rgba: Rgba) {
    const { r, g, b, a } = rgba;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}