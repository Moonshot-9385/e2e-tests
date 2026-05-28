"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const four_js_1 = require("./baker/four.js");
const nomBoulangerie = "Chez Elfathi";
const prixDesCroissants = [1.20, 1.50, 2.00];
const monEclair = {
    saveur: "Chocolat",
    prix: 3.50
};
function ouvrirBoulangerie(nom) {
    console.log(`🏪 welcome ${nom} ! the barkery is open.`);
}
async function main() {
    ouvrirBoulangerie(nomBoulangerie);
    console.log(`Le premier croissant coûte ${prixDesCroissants[0]}€.`);
    // On appelle la fonction qui vient du fichier 'four.ts'
    await (0, four_js_1.cuireLeGateau)();
    console.log("✨ Fin de la journée !");
}
main();
