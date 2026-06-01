
//importer le module 'fs' pour la manipulation de fichiers
import * as fs from 'fs';

interface Qcd {
  qualityScore: number;
  costScore: number;
  deliveryScore: number;
}

interface Safety {
  incidents: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface DeliveryAnomalies {
  damagedPackages: number;
  rescheduledPackages: number;
  failedPackages: number;
  latePackages: number;
}

interface SortProcess {
  complianceRate: number;
  pickingTimeMinutes: number;
}

interface RepackProcess {
  successRate: number;
  customerReturns: number;
}

interface Kaizen {
  visualManagementUsed: boolean;
  acesStandardApplied: boolean;
}

interface Performance {
  outputThroughput: number;
  costPerDelivery: number;
}

interface Shift {
  shiftId: string;
  date: string;
  team: string;
  zone: string;
  qcd: Qcd;
  safety: Safety;
  deliveryAnomalies: DeliveryAnomalies;
  sortProcess: SortProcess;
  repackProcess: RepackProcess;
  kaizen: Kaizen;
  performance: Performance;
}

interface FinalJsonStructure {
  generatedAt: string;
  site: string;
  totalShifts: number;
  shifts: Shift[];
}


// Choix aléatoire d'un nombre total de shifts à générer (Règle : entre 20 et 100)
const totalShiftsToGenerate = Math.floor(Math.random() * (100 - 20 + 1)) + 20;

const TEAMS = ['Team A', 'Team B', 'Team C', 'Team D'];
const ZONES = ['Sort A', 'Sort B', 'Sort C', 'Repack', 'Outbound', 'Inbound'];


// Génère un nombre entier aléatoire entre min et max 
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Génère un nombre à virgule aléatoire avec un nombre de décimales défini
function getRandomFloat(min: number, max: number, decimals: number): number {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}


//creer un tableau pour stocker les shifts générés
const shiftsArray: Shift[] = [];

//iniitialiser les variables d'accumulation pour les statistiques terminales
let totalQualityScore = 0;
let totalCostScore = 0;
let totalDeliveryScore = 0;
let totalSortComplianceRate = 0;
let totalPickingTimeMinutes = 0;
let totalRepackSuccessRate = 0;
let totalDamagedPackages = 0;
let totalRescheduledPackages = 0;
let totalFailedPackages = 0;
let totalLatePackages = 0;
let totalCustomerReturns = 0;
let totalOutputThroughput = 0;
let totalCostPerDelivery = 0;
let highRiskShiftsCount = 0;



for (let i = 0; i < totalShiftsToGenerate; i++) {
  // 1. Identifiant unique incrémental
  const shiftId = `SHIFT-${1001 + i}`;
    // 2. Date décroissante à partir d'aujourd'hui
    //    On utilise une date de base (aujourd'hui) et on soustrait i jours pour créer une séquence de dates décroissantes
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() - i);
  const dateStr = dateObj.toISOString().split('T')[0];

  // 3. Sélection aléatoire dans nos listes
  const team = TEAMS[Math.floor(Math.random() * TEAMS.length)];
  const zone = ZONES[Math.floor(Math.random() * ZONES.length)];

  // 4. Génération des incidents et détermination du niveau de risque
  const incidents = getRandomInt(0, 3);
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (incidents === 1) riskLevel = 'medium';
  if (incidents > 1) {
    riskLevel = 'high';
    highRiskShiftsCount++; // On incrémente notre indicateur spécifique
  }

  // 5. Génération des blocs de données selon tes plages de règles
  const qualityScore = getRandomInt(80, 100);
  const costScore = getRandomInt(80, 100);
  const deliveryScore = getRandomInt(80, 100);

  const damagedPackages = getRandomInt(0, 10);
  const rescheduledPackages = getRandomInt(0, 15);
  const failedPackages = getRandomInt(0, 5);
  const latePackages = getRandomInt(0, 12);

  const complianceRate = getRandomFloat(90, 100, i % 2 === 0 ? 1 : 2); // Simule des .4 ou .85
  const pickingTimeMinutes = getRandomInt(12, 35);

  const successRate = getRandomInt(85, 100);
  const customerReturns = getRandomInt(0, 40);

  const visualManagementUsed = Math.random() > 0.5;
  const acesStandardApplied = Math.random() > 0.5;

  const outputThroughput = getRandomInt(700, 1500);
  const costPerDelivery = getRandomFloat(3, 7, 2);

  // 6. Accumulation immédiate pour les statistiques du terminal
  totalQualityScore += qualityScore;
  totalCostScore += costScore;
  totalDeliveryScore += deliveryScore;
  totalSortComplianceRate += complianceRate;
  totalPickingTimeMinutes += pickingTimeMinutes;
  totalRepackSuccessRate += successRate;
  totalDamagedPackages += damagedPackages;
  totalRescheduledPackages += rescheduledPackages;
  totalFailedPackages += failedPackages;
  totalLatePackages += latePackages;
  totalCustomerReturns += customerReturns;
  totalOutputThroughput += outputThroughput;
  totalCostPerDelivery += costPerDelivery;

  // 7. Construction de l'objet Shift structuré et injection dans le tableau
  const newShift: Shift = {
    shiftId,
    date: dateStr,
    team,
    zone,
    qcd: { qualityScore, costScore, deliveryScore },
    safety: { incidents, riskLevel },
    deliveryAnomalies: { damagedPackages, rescheduledPackages, failedPackages, latePackages },
    sortProcess: { complianceRate, pickingTimeMinutes },
    repackProcess: { successRate, customerReturns },
    kaizen: { visualManagementUsed, acesStandardApplied },
    performance: { outputThroughput, costPerDelivery }
  };

  shiftsArray.push(newShift);
}

const outputData: FinalJsonStructure = {
  generatedAt: new Date().toISOString(),
  site: "Amazon Operations Training Site",
  totalShifts: totalShiftsToGenerate,
  shifts: shiftsArray
};

fs.writeFileSync('generated-shifts.json', JSON.stringify(outputData, null, 2), 'utf-8');

// ÉTAPE 6 : CALCUL DES MOYENNES ET AFFICHAGE TERMINAL

const avgQuality = totalQualityScore / totalShiftsToGenerate;
const avgCost = totalCostScore / totalShiftsToGenerate;
const avgDelivery = totalDeliveryScore / totalShiftsToGenerate;
const avgSortCompliance = totalSortComplianceRate / totalShiftsToGenerate;
const avgPickingTime = totalPickingTimeMinutes / totalShiftsToGenerate;
const avgRepackSuccess = totalRepackSuccessRate / totalShiftsToGenerate;
const avgOutputThroughput = totalOutputThroughput / totalShiftsToGenerate;
const avgCostPerDelivery = totalCostPerDelivery / totalShiftsToGenerate;

console.log(`Operations shift data generated successfully\n`);
console.log(`Generated shifts: ${totalShiftsToGenerate}`);
console.log(`Output file: generated-shifts.json\n`);

console.log(`Average quality score: ${avgQuality.toFixed(1)}`);
console.log(`Average cost score: ${avgCost.toFixed(1)}`);
console.log(`Average delivery score: ${avgDelivery.toFixed(1)}`);
console.log(`Average sort compliance rate: ${avgSortCompliance.toFixed(1)}%`);
console.log(`Average picking time: ${Math.round(avgPickingTime)} minutes`);
console.log(`Average repack success rate: ${avgRepackSuccess.toFixed(1)}%`);
console.log(`Total damaged packages: ${totalDamagedPackages}`);
console.log(`Total rescheduled packages: ${totalRescheduledPackages}`);
console.log(`Total failed packages: ${totalFailedPackages}`);
console.log(`Total late packages: ${totalLatePackages}`);
console.log(`Total customer returns: ${totalCustomerReturns}`);
console.log(`Average output throughput: ${Math.round(avgOutputThroughput)}`);
console.log(`Average cost per delivery: $${avgCostPerDelivery.toFixed(2)}`);
console.log(`High risk shifts: ${highRiskShiftsCount}`);