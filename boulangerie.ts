
import { Gateau } from './baker/recettes.js';
import { cuireLeGateau } from './baker/four.js';

const nomBoulangerie: string = "Chez Elfathi";
const prixDesCroissants: number[] = [1.20, 1.50, 2.00];

const monEclair: Gateau = { 
    saveur: "Chocolat",
    prix: 3.50
};

function ouvrirBoulangerie(nom: string): void {
    console.log(`🏪 Bienvenue chez ${nom} ! La boutique est ouverte.`);
}
async function main() {
    ouvrirBoulangerie(nomBoulangerie);
    console.log(`Le premier croissant coûte ${prixDesCroissants[0]}€.`);
    
    // On appelle la fonction qui vient du fichier 'four.ts'
    await cuireLeGateau();

    console.log("✨ Fin de la journée !");
}

main();