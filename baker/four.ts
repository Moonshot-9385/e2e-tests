
const attendreCuisson = () => new Promise(resolve => setTimeout(resolve,1500));
export async function cuireLeGateau(): Promise<void> {
    console.log("👨‍🍳 Le gâteau est mis au four...");
    await attendreCuisson(); 
    console.log("🎂 Le gâteau est prêt, tout chaud !");
}