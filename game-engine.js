/* ========================================
   CONFLICT 2026 - GAME ENGINE
   Core logic, AI, turn processing
   ======================================== */

class GameEngine {
    constructor() {
        this.state = null;
        this.turnActions = [];
    }

    initState(leader) {
        const leaderData = GAME_DATA.leaders[leader];
        const startRels = GAME_DATA.startRelations[leader];
        const startForce = GAME_DATA.startForces[leader];

        // Build relations object
        const relations = {};
        for (const [countryId, value] of Object.entries(startRels)) {
            relations[countryId] = {
                value: value,
                trend: 0, // -1, 0, 1
                atWar: countryId === 'iran' ? false : false,
                treaty: false
            };
        }

        // Build forces object
        const forces = {};
        for (const [unitId, count] of Object.entries(startForce)) {
            forces[unitId] = { count: count, deployed: 0, incoming: 0, incomingTurns: 0 };
        }

        this.state = {
            leader: leader,
            month: GAME_DATA.startMonth,
            year: GAME_DATA.startYear,
            turn: 1,
            maxTurns: 24, // 2 years

            // Core stats
            budget: leaderData.startBudget,
            monthlyIncome: leaderData.monthlyIncome,
            usAid: leaderData.usAid || 0,
            oilRevenue: leaderData.oilRevenue || 0,
            iranAid: leaderData.iranAid || 0,
            approval: leaderData.startApproval,
            stability: 65,

            // Military
            forces: forces,
            totalMilitary: leaderData.startMilitary,
            defenseLevel: 0,
            atWar: [],

            // Nuclear
            nuclearProgress: leaderData.nuclearProgress,
            nuclearFunding: 0, // monthly allocation

            // Iran tracking
            iranNuclear: 85,
            iranMilitary: 8,
            iranStability: 55,

            // Relations
            relations: relations,

            // Intelligence
            intelBudget: 0,
            activeOps: [],
            intelReports: [],

            // Leader-specific
            vision2030: leaderData.vision2030 || 0,

            // Events
            firedEvents: [],
            pendingEvents: [],
            newsLog: [],

            // Scores
            militaryVictories: 0,
            diplomaticWins: 0,
            assassinationAttempts: 0,

            // Game state
            gameOver: false,
            gameResult: null
        };

        return this.state;
    }

    // ---- DIPLOMACY ----
    improveRelations(countryId) {
        if (this.state.budget < 0.5) return { success: false, msg: t('budget_insufficient') };
        this.state.budget -= 0.5;
        const change = Math.floor(Math.random() * 10) + 5;
        this.state.relations[countryId].value = Math.min(100, this.state.relations[countryId].value + change);
        this.state.relations[countryId].trend = 1;
        return { success: true, msg: t('relations_improved').replace('{0}', getName(GAME_DATA.countries[countryId])).replace('{1}', change) };
    }

    worsenRelations(countryId) {
        const change = Math.floor(Math.random() * 15) + 5;
        this.state.relations[countryId].value = Math.max(-100, this.state.relations[countryId].value - change);
        this.state.relations[countryId].trend = -1;
        return { success: true, msg: t('relations_worsened').replace('{0}', getName(GAME_DATA.countries[countryId])).replace('{1}', change) };
    }

    declareWar(countryId) {
        if (this.state.relations[countryId].atWar) return { success: false, msg: t('already_at_war') };
        this.state.relations[countryId].atWar = true;
        this.state.relations[countryId].value = -100;
        this.state.atWar.push(countryId);
        this.state.approval += 5; // Rally around the flag
        // Diplomatic costs
        if (countryId !== 'iran') {
            this.state.relations.usa && (this.state.relations.usa.value -= 10);
        }
        return { success: true, msg: t('war_declared').replace('{0}', getName(GAME_DATA.countries[countryId])) };
    }

    seekPeace(countryId) {
        if (!this.state.relations[countryId].atWar) return { success: false, msg: t('not_at_war') };
        const chance = 30 + (this.state.relations.usa ? this.state.relations.usa.value / 4 : 0);
        if (Math.random() * 100 < chance) {
            this.state.relations[countryId].atWar = false;
            this.state.atWar = this.state.atWar.filter(c => c !== countryId);
            this.state.relations[countryId].value = -20;
            return { success: true, msg: t('ceasefire_accepted').replace('{0}', getName(GAME_DATA.countries[countryId])) };
        }
        return { success: false, msg: t('ceasefire_rejected').replace('{0}', getName(GAME_DATA.countries[countryId])) };
    }

    // ---- MILITARY ----
    purchaseUnit(unitId, quantity) {
        const unit = GAME_DATA.units[unitId];
        const cost = unit.cost * quantity;
        if (this.state.budget < cost) return { success: false, msg: t('budget_insufficient') };
        this.state.budget -= cost;
        if (unit.delivery === 0) {
            this.state.forces[unitId].count += quantity;
        } else {
            this.state.forces[unitId].incoming += quantity;
            this.state.forces[unitId].incomingTurns = unit.delivery;
        }
        this.recalcMilitary();
        return { success: true, msg: t('units_ordered').replace('{0}', quantity).replace('{1}', getName(unit)).replace('{2}', unit.delivery) };
    }

    recalcMilitary() {
        let total = 0;
        for (const [id, f] of Object.entries(this.state.forces)) {
            const unit = GAME_DATA.units[id];
            total += f.count * (unit.power || 0);
        }
        this.state.totalMilitary = Math.round(total / 10);

        let defense = 0;
        for (const [id, f] of Object.entries(this.state.forces)) {
            const unit = GAME_DATA.units[id];
            defense += f.count * (unit.defense || 0);
        }
        this.state.defenseLevel = Math.round(defense / 5);
    }

    attack(countryId) {
        if (!this.state.relations[countryId].atWar) {
            this.declareWar(countryId);
        }
        const myPower = this.state.totalMilitary;
        const enemyPower = GAME_DATA.countries[countryId].military * 5;
        const roll = Math.random() * (myPower + enemyPower);
        const success = roll < myPower;

        // Losses
        const losses = Math.floor(Math.random() * 3) + 1;
        this.state.budget -= losses * 2;

        // Reduce random force
        const forceKeys = Object.keys(this.state.forces);
        const lossUnit = forceKeys[Math.floor(Math.random() * forceKeys.length)];
        this.state.forces[lossUnit].count = Math.max(0, this.state.forces[lossUnit].count - 1);
        this.recalcMilitary();

        if (success) {
            GAME_DATA.countries[countryId].military = Math.max(0, GAME_DATA.countries[countryId].military - 2);
            this.state.militaryVictories++;
            this.state.approval = Math.min(100, this.state.approval + 8);
            return { success: true, msg: t('attack_success').replace('{0}', getName(GAME_DATA.countries[countryId])) };
        } else {
            this.state.approval = Math.max(0, this.state.approval - 10);
            return { success: false, msg: t('attack_failed').replace('{0}', getName(GAME_DATA.countries[countryId])) };
        }
    }

    airStrike(countryId) {
        const aircraft = this.state.forces.aircraft.count;
        if (aircraft < 2) return { success: false, msg: t('not_enough_aircraft') };

        this.state.budget -= 1.5;
        const chance = 50 + aircraft * 3;
        const success = Math.random() * 100 < chance;

        if (success) {
            GAME_DATA.countries[countryId].military = Math.max(0, GAME_DATA.countries[countryId].military - 1);
            this.state.relations[countryId].value = Math.max(-100, this.state.relations[countryId].value - 20);
            return { success: true, msg: t('airstrike_success').replace('{0}', getName(GAME_DATA.countries[countryId])) };
        } else {
            this.state.forces.aircraft.count--;
            this.recalcMilitary();
            return { success: false, msg: t('airstrike_failed') };
        }
    }

    // ---- INTELLIGENCE ----
    executeIntelOp(opId, targetCountry) {
        const op = GAME_DATA.intelOps[opId];
        if (this.state.budget < op.cost) return { success: false, msg: t('budget_insufficient') };
        this.state.budget -= op.cost;

        const bonusFromCyber = this.state.forces.cyber ? this.state.forces.cyber.count * 3 : 0;
        const bonusFromSF = this.state.forces.specialForces ? this.state.forces.specialForces.count * 2 : 0;
        const chance = op.successRate + bonusFromCyber + bonusFromSF;
        const success = Math.random() * 100 < chance;
        const detected = Math.random() * 100 < (op.risk === 'high' ? 60 : op.risk === 'med' ? 35 : 15);

        let result = { success, detected, msg: '' };

        if (success) {
            switch (opId) {
                case 'spy':
                    const intel = this.generateIntelReport(targetCountry);
                    this.state.intelReports.push(intel);
                    result.msg = t('spy_success').replace('{0}', intel);
                    break;
                case 'sabotage':
                    GAME_DATA.countries[targetCountry].military = Math.max(0, GAME_DATA.countries[targetCountry].military - 1);
                    result.msg = t('sabotage_success').replace('{0}', getName(GAME_DATA.countries[targetCountry]));
                    break;
                case 'cyberAttack':
                    GAME_DATA.countries[targetCountry].stability -= 5;
                    result.msg = t('cyber_success').replace('{0}', getName(GAME_DATA.countries[targetCountry]));
                    break;
                case 'fundRebels':
                    GAME_DATA.countries[targetCountry].stability -= 10;
                    result.msg = t('rebels_success').replace('{0}', getName(GAME_DATA.countries[targetCountry]));
                    break;
                case 'assassination':
                    GAME_DATA.countries[targetCountry].stability -= 20;
                    GAME_DATA.countries[targetCountry].military -= 1;
                    result.msg = t('assassination_success').replace('{0}', getName(GAME_DATA.countries[targetCountry]));
                    break;
                case 'propaganda':
                    GAME_DATA.countries[targetCountry].stability -= 8;
                    result.msg = t('propaganda_success').replace('{0}', getName(GAME_DATA.countries[targetCountry]));
                    break;
                case 'nuclearSabotage':
                    if (targetCountry === 'iran') {
                        this.state.iranNuclear = Math.max(0, this.state.iranNuclear - 20);
                        result.msg = t('nuclear_sabotage_success');
                    }
                    break;
            }
        } else {
            result.msg = t('op_failed').replace('{0}', getName(op));
        }

        if (detected) {
            this.state.relations[targetCountry].value = Math.max(-100, this.state.relations[targetCountry].value - 15);
            if (this.state.relations.usa) this.state.relations.usa.value -= 5;
            result.msg += ' ' + t('op_exposed');
        }

        return result;
    }

    generateIntelReport(countryId) {
        const country = GAME_DATA.countries[countryId];
        const reports = [
            t('intel_report_1').replace('{0}', getName(country)).replace('{1}', country.military).replace('{2}', country.stability),
            t('intel_report_2').replace('{0}', getName(country)),
            t('intel_report_3').replace('{0}', getName(country)).replace('{1}', country.stability),
        ];
        if (countryId === 'iran') {
            reports.push(t('intel_report_4').replace('{0}', this.state.iranNuclear));
        }
        return reports[Math.floor(Math.random() * reports.length)];
    }

    // ---- NUCLEAR ----
    fundNuclear(amount) {
        if (this.state.budget < amount) return { success: false, msg: t('budget_insufficient') };
        if (this.state.nuclearProgress >= 100) return { success: false, msg: t('nuclear_complete') };
        this.state.budget -= amount;
        this.state.nuclearFunding = amount;

        // Random advance based on funding
        let advanceChance = amount * 15; // Higher funding = higher chance
        if (Math.random() * 100 < advanceChance) {
            const advance = Math.floor(Math.random() * 8) + 3;
            this.state.nuclearProgress = Math.min(100, this.state.nuclearProgress + advance);
            return { success: true, msg: t('nuclear_advance').replace('{0}', advance).replace('{1}', this.state.nuclearProgress) };
        }
        return { success: true, msg: t('nuclear_no_progress') };
    }

    // ---- TURN PROCESSING ----
    processTurn() {
        const results = [];

        // 1. Income
        let income = this.state.monthlyIncome;
        if (this.state.usAid > 0) income += this.state.usAid / 12;
        if (this.state.oilRevenue > 0) income += this.state.oilRevenue;
        if (this.state.iranAid > 0) income += this.state.iranAid / 12;
        this.state.budget += income;

        // 2. War costs
        this.state.atWar.forEach(c => {
            this.state.budget -= 2;
            results.push(t('war_cost').replace('{0}', getName(GAME_DATA.countries[c])));
        });

        // 3. Deliveries
        for (const [id, f] of Object.entries(this.state.forces)) {
            if (f.incoming > 0) {
                f.incomingTurns--;
                if (f.incomingTurns <= 0) {
                    f.count += f.incoming;
                    results.push(t('units_arrived').replace('{0}', getName(GAME_DATA.units[id])).replace('{1}', f.incoming));
                    f.incoming = 0;
                }
            }
        }
        this.recalcMilitary();

        // 4. Iran nuclear progress (AI) - only if player is NOT Iran
        if (this.state.leader !== 'iran') {
            if (this.state.iranNuclear < 100) {
                const advance = Math.floor(Math.random() * 5) + 1;
                this.state.iranNuclear = Math.min(100, this.state.iranNuclear + advance);
                if (this.state.iranNuclear >= 100) {
                    results.push(t('iran_nuke_complete_warning'));
                }
            }
        } else {
            // When playing Iran, nuclear progress = player's own progress
            this.state.iranNuclear = this.state.nuclearProgress;
        }

        // 5. AI actions
        const aiResults = this.processAI();
        results.push(...aiResults);

        // 6. Stability changes
        if (this.state.atWar.length > 0) {
            this.state.stability -= 2;
            this.state.approval -= 1;
        }
        if (this.state.budget < 0) {
            this.state.stability -= 5;
            this.state.approval -= 5;
            results.push(t('budget_deficit'));
        }

        // Saudi: Vision 2030 natural progress
        if (this.state.leader === 'saudi') {
            if (this.state.atWar.length === 0 && this.state.stability > 50) {
                this.state.vision2030 = Math.min(100, this.state.vision2030 + 1);
            } else {
                this.state.vision2030 = Math.max(0, this.state.vision2030 - 1);
            }
        }

        // 7. Random events
        if (Math.random() < 0.15) {
            const randomApproval = Math.floor(Math.random() * 10) - 5;
            this.state.approval = Math.max(0, Math.min(100, this.state.approval + randomApproval));
        }

        // 8. Assassination attempt
        if (this.state.turn > 6 && this.state.approval < 30) {
            if (Math.random() < 0.1) {
                this.state.assassinationAttempts++;
                if (Math.random() < 0.3) {
                    this.state.gameOver = true;
                    this.state.gameResult = 'assassinated';
                    results.push(t('assassination_success_turn'));
                } else {
                    this.state.approval += 15; // Sympathy
                    results.push(t('assassination_failed_turn'));
                }
            }
        }

        // 9. Advance turn
        this.state.turn++;
        this.state.month++;
        if (this.state.month > 11) {
            this.state.month = 0;
            this.state.year++;
        }

        // 10. Check win/lose
        this.checkGameEnd();

        // Clamp values
        this.state.approval = Math.max(0, Math.min(100, this.state.approval));
        this.state.stability = Math.max(0, Math.min(100, this.state.stability));

        return results;
    }

    processAI() {
        const results = [];

        // Iran AI
        if (this.state.relations.iran && this.state.relations.iran.value < -60) {
            // Iran might attack
            if (Math.random() < 0.2) {
                const damage = Math.floor(Math.random() * 3) + 1;
                const intercepted = this.state.defenseLevel > 5 ? Math.floor(damage * 0.8) : Math.floor(damage * 0.4);
                const actualDamage = damage - intercepted;
                if (actualDamage > 0) {
                    this.state.budget -= actualDamage;
                    this.state.approval -= 3;
                }
                results.push(t('iran_missiles').replace('{0}', damage).replace('{1}', intercepted).replace('{2}', actualDamage));
            }
        }

        // Houthi AI (for Saudi)
        if (this.state.leader === 'saudi' && this.state.relations.yemen && this.state.relations.yemen.value < -40) {
            if (Math.random() < 0.25) {
                const intercepted = this.state.forces.ironDome ? this.state.forces.ironDome.count > 0 : false;
                if (intercepted) {
                    results.push(t('houthi_intercepted'));
                } else {
                    this.state.budget -= 1;
                    results.push(t('houthi_hit'));
                }
            }
        }

        // Hezbollah AI (for Israel)
        if (this.state.leader === 'israel' && this.state.relations.lebanon && this.state.relations.lebanon.value < -50) {
            if (Math.random() < 0.2) {
                const rockets = Math.floor(Math.random() * 50) + 10;
                const interceptRate = Math.min(95, 60 + (this.state.forces.ironDome ? this.state.forces.ironDome.count * 3 : 0));
                const hits = Math.floor(rockets * (1 - interceptRate / 100));
                if (hits > 2) {
                    this.state.approval -= 3;
                    this.state.budget -= 0.5;
                }
                results.push(t('hezbollah_rockets').replace('{0}', rockets).replace('{1}', interceptRate));
            }
        }

        // US relations decay
        if (this.state.relations.usa) {
            if (this.state.atWar.length > 2) {
                this.state.relations.usa.value -= 3;
                results.push(t('us_concern'));
            }
        }

        // Country stability changes
        for (const [id, country] of Object.entries(GAME_DATA.countries)) {
            if (country.stability < 20 && Math.random() < 0.1) {
                country.stability -= 10;
                if (country.stability <= 0) {
                    results.push(t('country_collapsed').replace('{0}', getName(country)));
                    if (this.state.relations[id]) {
                        this.state.relations[id].value = 0;
                        this.state.relations[id].atWar = false;
                        this.state.atWar = this.state.atWar.filter(c => c !== id);
                    }
                }
            }
        }

        return results;
    }

    checkGameEnd() {
        // Check lose conditions
        if (this.state.approval <= 0) {
            this.state.gameOver = true;
            this.state.gameResult = 'voted_out';
            return;
        }
        if (this.state.stability <= 0) {
            this.state.gameOver = true;
            this.state.gameResult = 'collapse';
            return;
        }
        if (this.state.budget < -20) {
            this.state.gameOver = true;
            this.state.gameResult = 'bankrupt';
            return;
        }

        // Iran gets nukes = danger
        if (this.state.iranNuclear >= 100 && this.state.turn > 12) {
            if (this.state.relations.iran && this.state.relations.iran.value < -80) {
                if (Math.random() < 0.05) {
                    this.state.gameOver = true;
                    this.state.gameResult = 'nuked';
                    return;
                }
            }
        }

        // Check win conditions
        if (this.state.turn >= this.state.maxTurns) {
            // Score-based ending
            this.state.gameOver = true;
            const score = this.calculateScore();
            this.state.gameResult = score > 70 ? 'victory' : score > 40 ? 'draw' : 'defeat';
            this.state.finalScore = score;
            return;
        }

        // Decisive victory: Iran neutralized
        if (this.state.iranNuclear <= 0 && this.state.iranMilitary <= 0) {
            this.state.gameOver = true;
            this.state.gameResult = 'total_victory';
            return;
        }

        // Iran destabilized
        if (GAME_DATA.countries.iran.stability <= 0) {
            this.state.gameOver = true;
            this.state.gameResult = 'iran_collapsed';
            return;
        }
    }

    calculateScore() {
        let score = 0;
        score += this.state.approval * 0.3;
        score += this.state.stability * 0.2;
        score += Math.max(0, this.state.budget) * 0.5;
        score += this.state.militaryVictories * 5;
        score += this.state.diplomaticWins * 3;
        score -= this.state.atWar.length * 10;
        if (this.state.iranNuclear < 50) score += 20;
        if (this.state.relations.usa && this.state.relations.usa.value > 50) score += 10;
        if (this.state.leader === 'saudi') {
            score += this.state.vision2030 * 0.2;
        }
        return Math.min(100, Math.max(0, Math.round(score)));
    }

    getEvent() {
        const turnNum = this.state.turn - 1;
        const allEvents = [
            ...GAME_DATA.events.common,
            ...(GAME_DATA.events[this.state.leader] || [])
        ];

        for (const event of allEvents) {
            if (event.month === turnNum && !this.state.firedEvents.includes(event.id)) {
                this.state.firedEvents.push(event.id);
                return event;
            }
        }

        // Random event chance for unfired events
        if (Math.random() < 0.3) {
            const unfired = allEvents.filter(e => !this.state.firedEvents.includes(e.id));
            if (unfired.length > 0) {
                const event = unfired[Math.floor(Math.random() * unfired.length)];
                this.state.firedEvents.push(event.id);
                return event;
            }
        }

        return null;
    }

    applyEventEffect(effect) {
        if (!effect) return;
        for (const [key, value] of Object.entries(effect)) {
            switch (key) {
                case 'approval': this.state.approval += value; break;
                case 'budget': this.state.budget += value; break;
                case 'stability': this.state.stability += value; break;
                case 'military': this.state.totalMilitary += value; break;
                case 'iranNuclear': this.state.iranNuclear += value; break;
                case 'vision2030': this.state.vision2030 = (this.state.vision2030 || 0) + value; break;
                case 'nuclearProgress': this.state.nuclearProgress += value; break;
                default:
                    // Relation changes (e.g. usRelation, iranRelation)
                    if (key.endsWith('Relation')) {
                        const country = key.replace('Relation', '').toLowerCase();
                        if (this.state.relations[country]) {
                            this.state.relations[country].value = Math.max(-100, Math.min(100, this.state.relations[country].value + value));
                        }
                    }
                    break;
            }
        }
        // Clamp
        this.state.approval = Math.max(0, Math.min(100, this.state.approval));
        this.state.stability = Math.max(0, Math.min(100, this.state.stability));
        this.state.iranNuclear = Math.max(0, Math.min(100, this.state.iranNuclear));
    }

    getRandomNews() {
        const pool = [...GAME_DATA.newsPool.common, ...(GAME_DATA.newsPool[this.state.leader] || [])];
        const news = [];
        for (let i = 0; i < 3; i++) {
            news.push(pool[Math.floor(Math.random() * pool.length)]);
        }
        return news.join(' ◆ ');
    }
}
