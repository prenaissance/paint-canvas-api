import Rgba from "../models/Rgba";

/*static class*/
abstract class RgbaFactory {
    private static _cache = new Map<string, Rgba>;

    static getRgba(r: number, g: number, b: number, a: number = 1) {
        const hash = `${r}:${g}:${b}:${a}`;

        let rgba = this._cache.get(hash);
        if (!rgba) {
            rgba = new Rgba(r, g, b, a);
            this._cache.set(hash, rgba);
        }

        return rgba;
    }
}

export default RgbaFactory;