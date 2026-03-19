/* ========================================
   CONFLICT 2026 - MAIN GAME CONTROLLER
   ======================================== */

const LEADER_CARDS_DATA = {
    israel: {
        cssClass: 'israel',
        flag: '🇮🇱',
        name: 'ראש ממשלת ישראל',
        nameEn: 'Prime Minister of Israel',
        stats: ['💰 תקציב: $18B', '⚔️ צבא: 7 חטיבות', '☢️ גרעין: מתקדם', '🕵️ מודיעין: מוסד'],
        statsEn: ['💰 Budget: $18B', '⚔️ Army: 7 Brigades', '☢️ Nuclear: Advanced', '🕵️ Intel: Mossad'],
        challenge: 'נטרל את הגרעין האיראני, הגן מפרוקסים, שמור על ברית ארה"ב',
        challengeEn: 'Neutralize Iranian nuclear program, defend from proxies, maintain US alliance',
        difficulty: '★★★☆☆'
    },
    saudi: {
        cssClass: 'saudi',
        flag: '🇸🇦',
        name: 'יורש העצר של סעודיה',
        nameEn: 'Crown Prince of Saudi Arabia',
        stats: ['💰 תקציב: $50B', '⚔️ צבא: 5 חטיבות', '☢️ גרעין: בפיתוח', '🕵️ מודיעין: GIP'],
        statsEn: ['💰 Budget: $50B', '⚔️ Army: 5 Brigades', '☢️ Nuclear: Developing', '🕵️ Intel: GIP'],
        challenge: 'הכל את החות\'ים, בלום את איראן, קדם Vision 2030, אזן בין ארה"ב לסין',
        challengeEn: 'Contain the Houthis, block Iran, advance Vision 2030, balance US and China',
        difficulty: '★★★★☆'
    },
    iran: {
        cssClass: 'iran',
        flag: '🇮🇷',
        name: 'נשיא איראן',
        nameEn: 'President of Iran',
        stats: ['💰 תקציב: $25B', '⚔️ צבא: 8 חטיבות', '☢️ גרעין: 85%', '🕵️ מודיעין: VAJA'],
        statsEn: ['💰 Budget: $25B', '⚔️ Army: 8 Brigades', '☢️ Nuclear: 85%', '🕵️ Intel: VAJA'],
        challenge: 'הגן על תוכנית הגרעין, נהל פרוקסים, שרוד סנקציות, בלום את ארה"ב וישראל',
        challengeEn: 'Protect nuclear program, manage proxies, survive sanctions, block US and Israel',
        difficulty: '★★★★☆'
    },
    usa: {
        cssClass: 'usa',
        flag: '🇺🇸',
        name: 'נשיא ארה"ב',
        nameEn: 'President of the United States',
        stats: ['💰 תקציב: $100B', '⚔️ צבא: 50 חטיבות', '☢️ גרעין: מתקדם', '🕵️ מודיעין: CIA'],
        statsEn: ['💰 Budget: $100B', '⚔️ Army: 50 Brigades', '☢️ Nuclear: Advanced', '🕵️ Intel: CIA'],
        challenge: 'נטרל גרעין איראני, נהל בריתות, אזן בית/חוץ, בחירות 2028',
        challengeEn: 'Neutralize Iranian nuclear, manage alliances, balance domestic/foreign, 2028 elections',
        difficulty: '★★☆☆☆'
    },
    hezbollah: {
        cssClass: 'hezbollah',
        flag: '🇱🇧',
        name: 'מנהיג חיזבאללה',
        nameEn: 'Leader of Hezbollah',
        stats: ['💰 תקציב: $5B', '⚔️ צבא: 2 חטיבות', '☢️ גרעין: אין', '🕵️ מודיעין: חיזבאללה'],
        statsEn: ['💰 Budget: $5B', '⚔️ Army: 2 Brigades', '☢️ Nuclear: None', '🕵️ Intel: Hezbollah'],
        challenge: 'שרוד תקיפות ישראליות, שמור על תמיכת איראן, שלוט בלבנון, לחם בגרילה',
        challengeEn: 'Survive Israeli strikes, maintain Iranian support, control Lebanon, guerrilla warfare',
        difficulty: '★★★★★'
    },
    turkey: {
        cssClass: 'turkey',
        flag: '🇹🇷',
        name: 'נשיא טורקיה',
        nameEn: 'President of Turkey',
        stats: ['💰 תקציב: $30B', '⚔️ צבא: 7 חטיבות', '☢️ גרעין: אין', '🕵️ מודיעין: MIT'],
        statsEn: ['💰 Budget: $30B', '⚔️ Army: 7 Brigades', '☢️ Nuclear: None', '🕵️ Intel: MIT'],
        challenge: 'אזן בין נאט"ו לרוסיה, הכל את הכורדים, שלוט בסוריה, ייצא מל"טים',
        challengeEn: 'Balance NATO and Russia, contain Kurds, control Syria, export drones',
        difficulty: '★★★☆☆'
    }
};

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
        this.renderLeaderCards();
        this.showScreen('screen-leader');
    },

    renderLeaderCards() {
        const container = document.getElementById('leader-cards-container');
        const selectTitle = document.querySelector('.select-title');
        if (selectTitle) selectTitle.textContent = t('select_leader');
        container.innerHTML = Object.entries(LEADER_CARDS_DATA).map(([id, card]) => {
            const stats = LANG === 'en' ? (card.statsEn || card.stats) : card.stats;
            const challenge = LANG === 'en' ? (card.challengeEn || card.challenge) : card.challenge;
            const name = LANG === 'en' ? card.nameEn : card.name;
            return `
            <div class="leader-card ${card.cssClass}" onclick="Game.selectLeader('${id}')">
                <div class="leader-flag">${card.flag}</div>
                <div class="leader-name">${name}</div>
                ${LANG === 'he' ? `<div class="leader-name-en">${card.nameEn}</div>` : ''}
                <div class="leader-desc">
                    ${stats.map(s => `<div class="stat-mini">${s}</div>`).join('')}
                </div>
                <div class="leader-challenge"><strong>${t('challenge')}:</strong> ${challenge}</div>
                <div class="difficulty">${t('difficulty')}: ${card.difficulty}</div>
            </div>`;
        }).join('');
    },

    // ---- LEADER SELECTION ----
    selectLeader(leader) {
        this.engine.initState(leader);
        const briefing = GAME_DATA.briefings[leader];
        document.getElementById('briefing-title').textContent = LANG === 'en' ? (briefing.titleEn || briefing.title) : briefing.title;
        document.getElementById('briefing-content').innerHTML = LANG === 'en' ? (briefing.contentEn || briefing.content) : briefing.content;
        document.querySelector('.classified-stamp').textContent = t('classified');
        document.querySelector('#screen-briefing .btn-main .btn-text').textContent = t('assume_command');
        this.showScreen('screen-briefing');
    },

    // ---- START GAME ----
    startGame() {
        this.showScreen('screen-game');
        updateGameNav();
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
                if (s.budget < 1) { UI.showNotification(t('budget_insufficient'), 'error'); return; }
                s.budget -= 1;
                s.approval = Math.min(100, s.approval + 8);
                UI.showNotification(t('rally_success'), 'success');
                break;
            case 'invest':
                if (s.budget < 2) { UI.showNotification(t('budget_insufficient'), 'error'); return; }
                s.budget -= 2;
                s.stability = Math.min(100, s.stability + 10);
                if (s.leader === 'saudi') s.vision2030 = Math.min(100, s.vision2030 + 3);
                UI.showNotification(t('invest_success'), 'success');
                break;
            case 'security':
                if (s.budget < 1.5) { UI.showNotification(t('budget_insufficient'), 'error'); return; }
                s.budget -= 1.5;
                s.stability = Math.min(100, s.stability + 8);
                s.approval = Math.max(0, s.approval - 3);
                UI.showNotification(t('security_success'), 'warning');
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
        const choiceText = LANG === 'en' ? (choice.textEn || choice.text) : choice.text;
        UI.showNotification(t('chose').replace('{0}', choiceText), 'info');
        UI.updateTopbar();
        UI.renderCurrentTab();
        this.currentEvent = null;
    },

    // ---- END TURN ----
    endTurn() {
        const results = this.engine.processTurn();

        // Show results
        if (results.length > 0) {
            const monthName = LANG === 'en' ? GAME_DATA.monthsEn[this.engine.state.month] : GAME_DATA.months[this.engine.state.month];
            const summaryTitle = t('monthly_summary').replace('{0}', monthName).replace('{1}', this.engine.state.year);
            UI.showEvent({
                title: summaryTitle,
                text: results.map(r => `<div style="padding:4px 0;border-bottom:1px solid var(--border-color)">${r}</div>`).join(''),
                choices: [{ text: t('continue_btn'), effect: {} }]
            });
            this.currentEvent = {
                choices: [{ text: t('continue_btn'), effect: {} }]
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
            if (this.currentEvent) return;
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
