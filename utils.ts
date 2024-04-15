export namespace bnmlExpCalc_util {
    interface termOfBinExp {
        aExp: number;
        bExp: number;
        coeff: number
    }

    /**
     * Returns an array representing a single layer of Pascal's triangle.
     *
     * @param {number} rowIndex - The index of the layer to be built (start from 0).
     * @return {number[]} An array representing the layer of Pascal's triangle.
     */
    export function buildLayerOfPascalTri(rowIndex: number): number[] {
        return new Array(rowIndex + 1).fill(0).map((v, i) => { return getBnmlCoeff(rowIndex, i) });
    }

    /**
     * Calculates the binomial coefficient for the given values of n and r.
     *
     * @param {number} n - The total number of items.
     * @param {number} r - The number of items to be selected.
     * @return {number} The binomial coefficient of n and r.
     */
    export function getBnmlCoeff(n: number, r: number): number {
        // coeff = n!/(r!(n-r)!)
        let a = 0; // a < b
        let b = 0;

        if (r > n - r) {
            a = n - r;
            b = r;
        } else {
            a = r;
            b = n - r;
        }

        let fn = 1;
        for (let i = n; i > b; i--) {
            fn *= i;
        }
        let fd = 1;
        for (let i = 1; i <= a; i++) {
            fd *= i;
        }
        return fn / fd;
    }

    /**
     * Expands the given binomial expression.
     *
     * @param {number} exp - the exponent of the binomial expression
     * @return {termOfBinExp[]} an array of objects representing the expanded terms of the binomial expression
     */
    export function expandBinomialExp(exp: number): termOfBinExp[]{
        const coeffs = buildLayerOfPascalTri(exp);
        const expansion: termOfBinExp[] = new Array(exp+1).fill(null).map((v, i) => {
            const term: termOfBinExp = {
                aExp: exp-i,
                bExp: i,
                coeff: coeffs[i]
            };
            return term;
        }); 

        return expansion;
    }

}