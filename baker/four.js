"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cuireLeGateau = cuireLeGateau;
const attendreCuisson = () => new Promise(resolve => setTimeout(resolve, 1500));
async function cuireLeGateau() {
    console.log("👨‍🍳 Le gâteau est mis au four...");
    await attendreCuisson();
    console.log("🎂 Le gâteau est prêt, tout chaud !");
}
