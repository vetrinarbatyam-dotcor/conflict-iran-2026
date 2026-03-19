/* ========================================
   CONFLICT 2026 - MAIN GAME CONTROLLER
   ======================================== */

const Game = {
    engine: new GameEngine(),
    currentEvent: null,

    // ---- SCREEN MANAGEMENT ----
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    showHowToPlay() {
        this.showScreen('screen-howtoplay');
    },

    showLeaderSelect() {
        this.showScreen('screen-leader');
    },

    // ---- LEADER SELECTION ----
    selectLeader(leader) {
        this.engine.initState(leader);
        const briefing = GAME_DATA.briefings[leader];
        document.getElementById('briefing-title').textContent = briefing.title;
        document.getElementById('briefing-content').innerHTML = briefing.content;
        this.showScreen('screen-briefing');
    },

    // ---- START GAME ----
    startGame() {
        this.showScreen('screen-game');
        UI.updateTopbar();
        this.switchTab('tab-overview');

        // Check for first turn event
        setTimeout(() => {
            const event = this.engine.getEvent();
            if (event) {
                this.currentEvent = event;
                UI.showEvent(event);
            }
        }, 500);
    },

    // ---- TAB SWITCHING ----
    switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');
        UI.renderCurrentTab();
    },

    // ---- DIPLOMACY ACTIONS ----
    diplomacyAction(action, countryId) {
        let result;
        switch (action) {
            case 'improve': result = this.engine.improveRelations(countryId); break;
            case 'worsen': result = this.engine.worsenRelations(countryId); break;
            case 'war': result = this.engine.declareWar(countryId); break;
            case 'peace': result = this.engine.seekPeace(countryId); break;
            case 'attack': result = this.engine.attack(countryId); break;
            case 'airstrike': result = this.engine.airStrike(countryId); break;
        }
        if (result) {
            UI.showNotification(result.msg, result.success ? 'success' : 'warning');
        }
        UI.updateTopbar();
        UI.renderCurrentTab();
    },

    // ---- MILITARY ACTIONS ----
    buyUnit(unitId, quantity) {
        const result = this.engine.purchaseUnit(unitId, quantity);
        UI.showNotification(result.msg, result.success ? 'success' : 'error');
        UI.updateTopbar();
        UI.renderCurrentTab();
    },

    // ---- INTELLIGENCE ACTIONS ----
    intelOp(opId, targetCountry) {
        const result = this.engine.executeIntelOp(opId, targetCountry);
        const type = result.success ? (result.detected ? 'warning' : 'success') : 'error';
        UI.showNotification(result.msg, type);
        UI.updateTopbar();
        UI.renderCurrentTab();
    },

    // ---- NUCLEAR ----
    fundNuclear(amount) {
        const result = this.engine.fundNuclear(amount);
        UI.showNotification(result.msg, result.success ? 'success' : 'error');
        UI.updateTopbar();
        UI.renderCurrentTab();
    },

    // ---- DOMESTIC ----
    domesticAction(action) {
        const s = this.engine.state;
        switch (action) {
            case 'rally':
                if (s.budget < 1) { UI.showNotification('תקציב לא מספיק', 'error'); return; }
                s.budget -= 1;
                s.approval = Math.min(100, s.approval + 8);
                UI.showNotification('עצרת תמיכה הצליחה! +8 אישור ציבורי', 'success');
                break;
            case 'invest':
                if (s.budget < 2) { UI.showNotification('תקציב לא מספיק', 'error'); return; }
                s.budget -= 2;
                s.stability = Math.min(100, s.stability + 10);
                if (s.leader === 'saudi') s.vision2030 = Math.min(100, s.vision2030 + 3);
                UI.showNotification('השקעה בתשתיות! +10 יציבות', 'success');
                break;
            case 'security':
                if (s.budget < 1.5) { UI.showNotification('תקציב לא מספיק', 'error'); return; }
                s.budget -= 1.5;
                s.stability = Math.min(100, s.stability + 8);
                s.approval = Math.max(0, s.approval - 3);
                UI.showNotification('ביטחון פנים הוגבר! +8 יציבות, -3 אישור', 'warning');
                break;
        }
        UI.updateTopbar();
        UI.renderCurrentTab();
    },

    // ---- EVENTS ----
    handleEventChoice(choiceIndex) {
        if (!this.currentEvent) return;
        const choice = this.currentEvent.choices[choiceIndex];
        this.engine.applyEventEffect(choice.effect);
        UI.hideEvent();
        UI.showNotification(`בחרת: ${choice.text}`, 'info');
        UI.updateTopbar();
        UI.renderCurrentTab();
        this.currentEvent = null;
    },

    // ---- END TURN ----
    endTurn() {
        const results = this.engine.processTurn();

        // Show results
        if (results.length > 0) {
            const resultText = results.join('\n');
            // Show as event popup
            UI.showEvent({
                title: `📋 סיכום חודשי - ${GAME_DATA.months[this.engine.state.month]} ${this.engine.state.year}`,
                text: results.map(r => `<div style="padding:4px 0;border-bottom:1px solid var(--border-color)">${r}</div>`).join(''),
                choices: [{ text: '✅ המשך', effect: {} }]
            });
            this.currentEvent = {
                choices: [{ text: '✅ המשך', effect: {} }]
            };
        }

        // Check game over
        if (this.engine.state.gameOver) {
            setTimeout(() => {
                UI.hideEvent();
                UI.showGameOver(this.engine.state.gameResult, this.engine.state.finalScore || 0);
            }, 1500);
            return;
        }

        // Update UI
        UI.updateTopbar();
        UI.renderCurrentTab();

        // Check for event
        setTimeout(() => {
            if (this.currentEvent) return; // Still showing results
            const event = this.engine.getEvent();
            if (event) {
                this.currentEvent = event;
                UI.showEvent(event);
            }
        }, 1000);
    }
};

// ---- INITIALIZATION ----
document.addEventListener('DOMContentLoaded', () => {
    Game.showScreen('screen-title');
});
