import * as fs from 'fs';

interface ShiftRow {
    shiftId: string;
    date: string;
    zone: string;
    qcdScore: string;
    safetyIncidents: string;
    sortComplianceRate: string;
    pickingTimeMinutes: string;
    damagedPackages: string;
    rescheduledPackages: string;
    failedPackages: string;
    latePackages: string;
    customerReturns: string;
    repackSuccessRate: string;
    outputThroughput: string;
    costPerDelivery: string;
}

interface InvalidShift extends ShiftRow {
    errors: string[];
}

const INPUT_FILE = 'shifts.csv';
const INVALID_FILE = 'invalid-shifts.json';

function parseCsv(csv: string): ShiftRow[] {
    const lines = csv
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    const headers = lines[0].split(',').map((h) => h.trim());
    const rows: ShiftRow[] = [];

    for (let i = 1; i < lines.length; i += 1) {
        const values = lines[i].split(',').map((value) => value.trim());
        const row: any = {};

        headers.forEach((header, index) => {
            row[header] = values[index] ?? '';
        });

        rows.push(row as ShiftRow);
    }

    return rows;
}

function toNumber(value: string): number {
    return Number(value.replace(',', '.'));
}

function isValidDate(value: string): boolean {
    return !Number.isNaN(new Date(value).getTime());
}

function validateShift(shift: ShiftRow): string[] {
    const errors: string[] = [];
    const qcdScore = toNumber(shift.qcdScore);
    const safetyIncidents = toNumber(shift.safetyIncidents);
    const sortComplianceRate = toNumber(shift.sortComplianceRate);
    const pickingTimeMinutes = toNumber(shift.pickingTimeMinutes);
    const damagedPackages = toNumber(shift.damagedPackages);
    const rescheduledPackages = toNumber(shift.rescheduledPackages);
    const failedPackages = toNumber(shift.failedPackages);
    const latePackages = toNumber(shift.latePackages);
    const customerReturns = toNumber(shift.customerReturns);
    const repackSuccessRate = toNumber(shift.repackSuccessRate);
    const outputThroughput = toNumber(shift.outputThroughput);
    const costPerDelivery = toNumber(shift.costPerDelivery);

    if (!shift.shiftId.startsWith('SHIFT-')) {
        errors.push('shiftId doit commencer par SHIFT-');
    }

    if (!isValidDate(shift.date)) {
        errors.push('Date est invalide');
    }

    if (!shift.zone) {
        errors.push('Zone est vide');
    }

    if (Number.isNaN(qcdScore) || qcdScore < 0 || qcdScore > 100) {
        errors.push('QCD score doit être entre 0 et 100');
    }

    if (Number.isNaN(safetyIncidents) || safetyIncidents < 0) {
        errors.push('Safety incidents ne peut pas être négatif');
    }

    if (Number.isNaN(sortComplianceRate) || sortComplianceRate < 0 || sortComplianceRate > 100) {
        errors.push('Sort compliance rate doit être entre 0 et 100');
    }

    if (Number.isNaN(pickingTimeMinutes) || pickingTimeMinutes <= 0) {
        errors.push('Picking time doit être > 0');
    }

    if (Number.isNaN(damagedPackages) || damagedPackages < 0) {
        errors.push('Damaged packages ne peut pas être négatif');
    }

    if (Number.isNaN(rescheduledPackages) || rescheduledPackages < 0) {
        errors.push('Rescheduled packages ne peut pas être négatif');
    }

    if (Number.isNaN(failedPackages) || failedPackages < 0) {
        errors.push('Failed packages ne peut pas être négatif');
    }

    if (Number.isNaN(latePackages) || latePackages < 0) {
        errors.push('Late packages ne peut pas être négatif');
    }

    if (Number.isNaN(customerReturns) || customerReturns < 0) {
        errors.push('Customer returns ne peut pas être négatif');
    }

    if (Number.isNaN(repackSuccessRate) || repackSuccessRate < 0 || repackSuccessRate > 100) {
        errors.push('Repack success rate doit être entre 0 et 100');
    } else if (repackSuccessRate < 97) {
        errors.push('Repack success rate est inférieur à 97%');
    }

    if (Number.isNaN(outputThroughput) || outputThroughput <= 0) {
        errors.push('Output throughput doit être > 0');
    }

    if (Number.isNaN(costPerDelivery) || costPerDelivery <= 0) {
        errors.push('Cost per delivery doit être > 0');
    }

    return errors;
}

function formatPercent(value: number): string {
    return `${value.toFixed(2)}%`;
}

function formatMoney(value: number): string {
    return `$${value.toFixed(2)}`;
}

const csv = fs.readFileSync(INPUT_FILE, 'utf-8');
const rows = parseCsv(csv);

const validRows: ShiftRow[] = [];
const invalidRows: InvalidShift[] = [];

for (const row of rows) {
    const errors = validateShift(row);
    if (errors.length === 0) {
        validRows.push(row);
    } else {
        invalidRows.push({ ...row, errors });
    }
}

const summary = {
    averageQcdScore: 0,
    averageSortComplianceRate: 0,
    averagePickingTime: 0,
    totalDamagedPackages: 0,
    totalRescheduledPackages: 0,
    totalFailedPackages: 0,
    totalLatePackages: 0,
    totalCustomerReturns: 0,
    averageRepackSuccessRate: 0,
    averageOutputThroughput: 0,
    averageCostPerDelivery: 0,
};

for (const row of validRows) {
    summary.averageQcdScore += toNumber(row.qcdScore);
    summary.averageSortComplianceRate += toNumber(row.sortComplianceRate);
    summary.averagePickingTime += toNumber(row.pickingTimeMinutes);
    summary.totalDamagedPackages += toNumber(row.damagedPackages);
    summary.totalRescheduledPackages += toNumber(row.rescheduledPackages);
    summary.totalFailedPackages += toNumber(row.failedPackages);
    summary.totalLatePackages += toNumber(row.latePackages);
    summary.totalCustomerReturns += toNumber(row.customerReturns);
    summary.averageRepackSuccessRate += toNumber(row.repackSuccessRate);
    summary.averageOutputThroughput += toNumber(row.outputThroughput);
    summary.averageCostPerDelivery += toNumber(row.costPerDelivery);
}

if (validRows.length > 0) {
    summary.averageQcdScore /= validRows.length;
    summary.averageSortComplianceRate /= validRows.length;
    summary.averagePickingTime /= validRows.length;
    summary.averageRepackSuccessRate /= validRows.length;
    summary.averageOutputThroughput /= validRows.length;
    summary.averageCostPerDelivery /= validRows.length;
}

console.log('Shift Operations Validation Report\n');
console.log(`Total shifts analyzed: ${rows.length}`);
console.log(`Valid shifts: ${validRows.length}`);
console.log(`Invalid shifts: ${invalidRows.length}\n`);

if (invalidRows.length > 0) {
    console.log('Detected issues:');
    for (const row of invalidRows) {
        for (const error of row.errors) {
            console.log(`${row.shiftId}: ${error}`);
        }
    }
    console.log('');
}

console.log('Operational summary:');
console.log(`Average QCD score: ${summary.averageQcdScore.toFixed(1)}`);
console.log(`Average sort compliance rate: ${formatPercent(summary.averageSortComplianceRate)}`);
console.log(`Average picking time: ${summary.averagePickingTime.toFixed(1)} minutes`);
console.log(`Total damaged packages: ${summary.totalDamagedPackages}`);
console.log(`Total rescheduled packages: ${summary.totalRescheduledPackages}`);
console.log(`Total failed packages: ${summary.totalFailedPackages}`);
console.log(`Total late packages: ${summary.totalLatePackages}`);
console.log(`Total customer returns: ${summary.totalCustomerReturns}`);
console.log(`Average repack success rate: ${formatPercent(summary.averageRepackSuccessRate)}`);
console.log(`Average output throughput: ${Math.round(summary.averageOutputThroughput)}`);
console.log(`Average cost per delivery: ${formatMoney(summary.averageCostPerDelivery)}\n`);

fs.writeFileSync(INVALID_FILE, JSON.stringify(invalidRows, null, 2), 'utf-8');
console.log(`Invalid shifts exported to ${INVALID_FILE}`);
