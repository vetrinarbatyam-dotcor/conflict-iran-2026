/* ========================================
   CONFLICT 2026 - UI RENDERER
   All screen rendering logic
   ======================================== */

const UI = {
    renderOverview() {
        const s = Game.engine.state;
        // Map
        const mapHtml = this.renderMap();
        document.getElementById('map-container').innerHTML = mapHtml;

        // Threats
        const threats = this.getThreats();
        document.getElementById('threats-list').innerHTML = threats.map(t =>
            `<div class="threat-item ${t.level}">
                <div class="threat-level">${t.levelIcon} ${t.levelText}</div>
                <div>${t.text}</div>
            </div>`
        ).join('');

        // Relations summary
        const relKeys = Object.keys(s.relations).filter(k => GAME_DATA.countries[k]);
        document.getElementById('relations-summary').innerHTML = relKeys.map(k => {
            const c = GAME_DATA.countries[k];
            const rel = s.relations[k];
            const relClass = rel.value > 20 ? 'friendly' : rel.value < -20 ? 'hostile' : 'neutral';
            const barColor = rel.value > 20 ? '#22c55e' : rel.value < -20 ? '#ef4444' : '#eab308';
            const barWidth = (rel.value + 100) / 2;
            return `<div class="rel-card">
                <div class="country-flag">${c.flag}</div>
                <div class="country-name">${c.name}</div>
                <div class="rel-value ${relClass}">${rel.value > 0 ? '+' : ''}${rel.value}</div>
                ${rel.atWar ? '<div style="color:#ef4444;font-weight:700">⚔️ מלחמה</div>' : ''}
                <div class="rel-bar"><div class="rel-bar-fill" style="width:${barWidth}%;background:${barColor}"></div></div>
            </div>`;
        }).join('');
    },

    renderMap() {
        const s = Game.engine.state;
        let html = '<div style="position:relative;width:100%;height:100%;min-height:380px;">';

        // Player country position on map
        const playerPositions = {
            israel: { top: '40%', left: '35%', name: 'ישראל' },
            saudi: { top: '60%', left: '50%', name: 'סעודיה' },
            iran: { top: '35%', left: '70%', name: 'איראן' },
            usa: { top: '10%', left: '10%', name: 'ארה"ב' },
            hezbollah: { top: '28%', left: '38%', name: 'חיזבאללה' },
            turkey: { top: '20%', left: '40%', name: 'טורקיה' }
        };

        // Map player's leader to the country ID it represents in the countries list
        const leaderToCountryId = {
            iran: 'iran', usa: 'usa', hezbollah: 'lebanon', turkey: 'turkey'
        };
        const playerCountryId = leaderToCountryId[s.leader];

        const playerPos = playerPositions[s.leader];
        const playerFlag = GAME_DATA.leaders[s.leader].flag;
        html += `<div class="map-country player" style="top:${playerPos.top};left:${playerPos.left}">
            <span class="mc-flag">${playerFlag}</span>
            <span class="mc-name">${playerPos.name}</span>
        </div>`;

        // Other countries - skip the one the player IS
        for (const [id, country] of Object.entries(GAME_DATA.countries)) {
            if (id === playerCountryId) continue;
            const rel = s.relations[id];
            let cClass = 'neutral-c';
            if (rel) {
                if (rel.atWar) cClass = 'enemy';
                else if (rel.value > 30) cClass = 'ally';
                else if (rel.value < -30) cClass = 'enemy';
            }
            html += `<div class="map-country ${cClass}" style="top:${country.mapPos.top};left:${country.mapPos.left}"
                     onclick="Game.switchTab('tab-diplomacy')">
                <span class="mc-flag">${country.flag}</span>
                <span class="mc-name">${country.name}</span>
            </div>`;
        }

        html += '</div>';
        return html;
    },

    getThreats() {
        const s = Game.engine.state;
        const threats = [];

        if (s.leader !== 'iran') {
            if (s.iranNuclear > 80) {
                threats.push({ level: '', levelIcon: '🔴', levelText: 'קריטי', text: `☢️ איראן: ${s.iranNuclear}% לפצצה גרעינית` });
            } else if (s.iranNuclear > 50) {
                threats.push({ level: 'low', levelIcon: '🟡', levelText: 'גבוה', text: `☢️ איראן: ${s.iranNuclear}% לפצצה גרעינית` });
            }
        } else {
            // Iran player sees threats from Israel/USA
            if (s.relations.usa && s.relations.usa.value < -50) {
                threats.push({ level: '', levelIcon: '🔴', levelText: 'קריטי', text: '🇺🇸 ארה"ב מאיימת בתקיפה!' });
            }
        }

        if (s.atWar.length > 0) {
            s.atWar.forEach(c => {
                threats.push({ level: '', levelIcon: '🔴', levelText: 'מלחמה', text: `⚔️ מלחמה פעילה עם ${GAME_DATA.countries[c].name}` });
            });
        }

        if (s.approval < 30) {
            threats.push({ level: '', levelIcon: '🔴', levelText: 'קריטי', text: `📊 אישור ציבורי נמוך: ${s.approval}%` });
        }

        if (s.budget < 3) {
            threats.push({ level: 'low', levelIcon: '🟡', levelText: 'אזהרה', text: `💰 תקציב נמוך: $${s.budget.toFixed(1)}B` });
        }

        if (s.leader === 'saudi' && s.vision2030 < 30) {
            threats.push({ level: 'low', levelIcon: '🟡', levelText: 'אזהרה', text: `🏗️ Vision 2030 בסכנה: ${s.vision2030}%` });
        }

        if (threats.length === 0) {
            threats.push({ level: 'info', levelIcon: '🔵', levelText: 'יציב', text: 'אין איומים מיידיים' });
        }

        return threats;
    },

    renderDiplomacy() {
        const s = Game.engine.state;
        const countries = Object.keys(s.relations).filter(k => GAME_DATA.countries[k]);

        document.getElementById('diplomacy-panel').innerHTML = countries.map(k => {
            const c = GAME_DATA.countries[k];
            const rel = s.relations[k];
            const relClass = rel.value > 20 ? 'friendly' : rel.value < -20 ? 'hostile' : 'neutral';
            const statusText = rel.atWar ? '⚔️ מלחמה' : rel.value > 50 ? '🤝 ברית' : rel.value > 20 ? '😊 ידידותי' : rel.value > -20 ? '😐 נייטרלי' : rel.value > -50 ? '😠 עוין' : '🔥 אויב';

            let actions = '';
            if (!rel.atWar) {
                actions += `<button class="btn-action positive" onclick="Game.diplomacyAction('improve','${k}')">🤝 שפר יחסים ($0.5B)</button>`;
                actions += `<button class="btn-action negative" onclick="Game.diplomacyAction('worsen','${k}')">😠 הרע יחסים</button>`;
                if (rel.value < -30 && !c.isSuperpower) {
                    actions += `<button class="btn-action negative" onclick="Game.diplomacyAction('war','${k}')">⚔️ הכרז מלחמה</button>`;
                }
            } else {
                actions += `<button class="btn-action positive" onclick="Game.diplomacyAction('peace','${k}')">🕊️ בקש הפסקת אש</button>`;
                actions += `<button class="btn-action negative" onclick="Game.diplomacyAction('attack','${k}')">💥 מבצע צבאי</button>`;
                actions += `<button class="btn-action warning" onclick="Game.diplomacyAction('airstrike','${k}')">✈️ תקיפה אווירית</button>`;
            }

            return `<div class="diplo-card">
                <div class="diplo-flag">${c.flag}</div>
                <div class="diplo-info">
                    <div class="diplo-name">${c.name} | ${c.nameEn}</div>
                    <div class="diplo-status">
                        <span class="rel-value ${relClass}">${rel.value > 0 ? '+' : ''}${rel.value}</span>
                        <span style="margin:0 8px">${statusText}</span>
                        <span style="color:var(--text-dim)">צבא: ${c.military}</span>
                    </div>
                </div>
                <div class="diplo-actions">${actions}</div>
            </div>`;
        }).join('');
    },

    renderMilitary() {
        const s = Game.engine.state;

        // Current forces
        let forcesHtml = '<h3>🪖 כוחות נוכחיים | Current Forces</h3>';
        for (const [id, f] of Object.entries(s.forces)) {
            const unit = GAME_DATA.units[id];
            const incoming = f.incoming > 0 ? ` <span style="color:var(--accent-yellow)">(+${f.incoming} בדרך)</span>` : '';
            forcesHtml += `<div class="force-row">
                <span class="force-name">${unit.icon} ${unit.name}</span>
                <span class="force-count">${f.count}${incoming}</span>
            </div>`;
        }
        forcesHtml += `<div class="force-row" style="border-top:2px solid var(--accent-cyan);margin-top:8px;padding-top:12px">
            <span style="color:var(--accent-cyan);font-weight:700">💪 כוח צבאי כולל</span>
            <span class="force-count" style="font-size:1.3rem">${s.totalMilitary}</span>
        </div>`;
        forcesHtml += `<div class="force-row">
            <span style="color:var(--accent-green)">🛡️ רמת הגנה</span>
            <span class="force-count">${s.defenseLevel}</span>
        </div>`;
        document.getElementById('forces-panel').innerHTML = forcesHtml;

        // Procurement
        let procHtml = '<h3>🛒 רכש נשק | Procurement</h3>';
        procHtml += `<div style="margin-bottom:10px;color:var(--accent-yellow)">💰 תקציב זמין: $${s.budget.toFixed(1)}B</div>`;
        for (const [id, unit] of Object.entries(GAME_DATA.units)) {
            procHtml += `<div class="buy-row">
                <span class="buy-item">${unit.icon} ${unit.name}</span>
                <span class="buy-cost">$${unit.cost}B</span>
                <button class="btn-action neutral" onclick="Game.buyUnit('${id}', 1)" ${s.budget < unit.cost ? 'disabled' : ''}>קנה 1</button>
                <button class="btn-action neutral" onclick="Game.buyUnit('${id}', 5)" ${s.budget < unit.cost * 5 ? 'disabled' : ''}>קנה 5</button>
            </div>`;
        }
        document.getElementById('procurement-panel').innerHTML = procHtml;

        // Deployment info
        let deployHtml = '<h3>📍 פריסה | Deployment</h3>';
        if (s.atWar.length > 0) {
            deployHtml += '<div style="margin-bottom:10px">חזיתות פעילות:</div>';
            s.atWar.forEach(c => {
                const country = GAME_DATA.countries[c];
                deployHtml += `<div class="threat-item">
                    <div>${country.flag} ${country.name} - צבא אויב: ${country.military}</div>
                    <button class="btn-action negative" onclick="Game.diplomacyAction('attack','${c}')">💥 תקוף</button>
                    <button class="btn-action warning" onclick="Game.diplomacyAction('airstrike','${c}')">✈️ תקיפה אווירית</button>
                </div>`;
            });
        } else {
            deployHtml += '<div style="color:var(--text-dim)">אין חזיתות פעילות. השתמש בדיפלומטיה להכרזת מלחמה.</div>';
        }
        document.getElementById('deployment-panel').innerHTML = deployHtml;
    },

    renderIntelligence() {
        const s = Game.engine.state;
        const agency = GAME_DATA.leaders[s.leader].intelAgency;

        let html = `<div class="panel"><h3>🕵️ ${agency}</h3>
            <p style="color:var(--text-secondary);margin-bottom:16px">בחר מבצע ומדינת יעד. כל מבצע עולה כסף ויש סיכון לחשיפה.</p>
        </div>`;

        // Intel operations
        const targets = Object.keys(s.relations).filter(k =>
            GAME_DATA.countries[k] && !GAME_DATA.countries[k].isSuperpower
        );

        for (const [opId, op] of Object.entries(GAME_DATA.intelOps)) {
            const riskClass = op.risk === 'high' ? 'risk-high' : op.risk === 'med' ? 'risk-med' : 'risk-low';
            const riskText = op.risk === 'high' ? 'סיכון גבוה' : op.risk === 'med' ? 'סיכון בינוני' : 'סיכון נמוך';

            html += `<div class="intel-op">
                <h4>${op.name} | ${op.nameEn}</h4>
                <div class="intel-desc">${op.desc}</div>
                <div style="display:flex;gap:16px;align-items:center;margin-bottom:10px">
                    <span class="intel-cost">💰 $${op.cost}B</span>
                    <span class="intel-risk ${riskClass}">⚠️ ${riskText}</span>
                    <span style="color:var(--text-dim)">הצלחה: ${op.successRate}%</span>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:4px">
                    ${targets.map(t => {
                        const c = GAME_DATA.countries[t];
                        const disabled = s.budget < op.cost ? 'disabled' : '';
                        return `<button class="btn-action warning" onclick="Game.intelOp('${opId}','${t}')" ${disabled}>
                            ${c.flag} ${c.name}
                        </button>`;
                    }).join('')}
                </div>
            </div>`;
        }

        // Intel reports
        if (s.intelReports.length > 0) {
            html += `<div class="panel"><h3>📋 דו"חות מודיעין</h3>`;
            s.intelReports.slice(-5).reverse().forEach(r => {
                html += `<div style="padding:6px 0;border-bottom:1px solid var(--border-color);color:var(--text-secondary)">${r}</div>`;
            });
            html += '</div>';
        }

        document.getElementById('intel-panel').innerHTML = html;
    },

    renderNuclear() {
        const s = Game.engine.state;
        let html = '';

        const nuclearTitles = {
            israel: '🇮🇱 תוכנית גרעינית ישראלית',
            saudi: '🇸🇦 תוכנית גרעינית סעודית',
            iran: '🇮🇷 תוכנית גרעינית איראנית',
            usa: '🇺🇸 ארסנל גרעיני אמריקאי',
            hezbollah: '🇱🇧 חיזבאללה - אין תוכנית גרעינית',
            turkey: '🇹🇷 תוכנית גרעינית טורקית'
        };

        // Player's nuclear program
        html += `<div class="nuclear-progress">
            <h3>${nuclearTitles[s.leader] || 'תוכנית גרעינית'}</h3>
            <div class="progress-bar">
                <div class="progress-fill" style="width:${s.nuclearProgress}%"></div>
            </div>
            <div class="progress-label">${s.nuclearProgress}%</div>
            <div style="color:var(--text-secondary);margin-top:8px">
                ${s.nuclearProgress >= 100 ? '✅ תוכנית הושלמה - יש לך הרתעה גרעינית!' :
                  s.nuclearProgress >= 75 ? '🔬 שלב מתקדם - קרוב להשלמה' :
                  s.nuclearProgress >= 50 ? '⚗️ שלב ביניים - העשרה מתקדמת' :
                  s.nuclearProgress >= 25 ? '🏗️ שלב מוקדם - בניית תשתיות' :
                  '📋 שלב תכנון ראשוני'}
            </div>
        </div>`;

        // Fund nuclear (only if not complete)
        if (s.nuclearProgress < 100) {
            html += `<div class="panel">
                <h3>💰 מימון מחקר גרעיני</h3>
                <p style="color:var(--text-secondary);margin-bottom:12px">השקע בתוכנית הגרעין. השקעה גבוהה = סיכוי גבוה יותר להתקדמות.</p>
                <div style="display:flex;gap:8px">
                    <button class="btn-action neutral" onclick="Game.fundNuclear(1)" ${s.budget < 1 ? 'disabled' : ''}>$1B - בסיסי</button>
                    <button class="btn-action warning" onclick="Game.fundNuclear(3)" ${s.budget < 3 ? 'disabled' : ''}>$3B - מואץ</button>
                    <button class="btn-action negative" onclick="Game.fundNuclear(5)" ${s.budget < 5 ? 'disabled' : ''}>$5B - מרבי</button>
                </div>
            </div>`;
        }

        // Iran's nuclear program - only show if NOT playing as Iran
        if (s.leader === 'iran') {
            document.getElementById('nuclear-panel').innerHTML = html;
            return;
        }
        html += `<div class="nuclear-progress" style="border-color:var(--accent-red)">
            <h3>🇮🇷 תוכנית גרעינית איראנית</h3>
            <div class="progress-bar">
                <div class="progress-fill" style="width:${s.iranNuclear}%;background:linear-gradient(90deg,#f97316,#ef4444,#991b1b)"></div>
            </div>
            <div class="progress-label" style="color:var(--accent-red)">${s.iranNuclear}%</div>
            <div style="color:var(--text-secondary);margin-top:8px">
                ${s.iranNuclear >= 100 ? '☢️ אזהרה! איראן השיגה נשק גרעיני!' :
                  s.iranNuclear >= 80 ? '🔴 סכנה קריטית - חודשים מפצצה!' :
                  s.iranNuclear >= 50 ? '🟡 התקדמות משמעותית' :
                  '🟢 בשלב מוקדם'}
            </div>
            <div style="margin-top:12px">
                <button class="btn-action negative" onclick="Game.intelOp('nuclearSabotage','iran')" ${s.budget < 2 ? 'disabled' : ''}>
                    💻 חבלה גרעינית ($2B)
                </button>
                <button class="btn-action warning" onclick="Game.diplomacyAction('airstrike','iran')" ${s.forces && s.forces.aircraft && s.forces.aircraft.count < 2 ? 'disabled' : ''}>
                    ✈️ תקיפת מתקנים גרעיניים
                </button>
            </div>
        </div>`;

        document.getElementById('nuclear-panel').innerHTML = html;
    },

    renderBudget() {
        const s = Game.engine.state;
        let monthlyIncome = s.monthlyIncome;
        if (s.usAid > 0) monthlyIncome += s.usAid / 12;
        if (s.oilRevenue > 0) monthlyIncome += s.oilRevenue;
        const warCosts = s.atWar.length * 2;

        let html = `<div class="panel">
            <h3>💰 סיכום תקציבי | Budget Summary</h3>
            <div class="budget-row">
                <span class="budget-category">💵 תקציב נוכחי</span>
                <span class="budget-amount balance">$${s.budget.toFixed(1)}B</span>
            </div>
            <div class="budget-row">
                <span class="budget-category">📈 הכנסה חודשית</span>
                <span class="budget-amount income">+$${s.monthlyIncome.toFixed(1)}B</span>
            </div>`;

        if (s.usAid > 0) {
            html += `<div class="budget-row">
                <span class="budget-category">🇺🇸 סיוע אמריקאי (שנתי)</span>
                <span class="budget-amount income">+$${(s.usAid / 12).toFixed(1)}B/חודש</span>
            </div>`;
        }
        if (s.oilRevenue > 0) {
            html += `<div class="budget-row">
                <span class="budget-category">🛢️ הכנסות נפט</span>
                <span class="budget-amount income">+$${s.oilRevenue.toFixed(1)}B</span>
            </div>`;
        }
        if (warCosts > 0) {
            html += `<div class="budget-row">
                <span class="budget-category">⚔️ עלויות מלחמה</span>
                <span class="budget-amount expense">-$${warCosts}B</span>
            </div>`;
        }
        html += `<div class="budget-row" style="border-top:2px solid var(--accent-cyan);padding-top:16px">
            <span class="budget-category" style="font-weight:700">📊 מאזן חודשי נטו</span>
            <span class="budget-amount ${(monthlyIncome - warCosts) >= 0 ? 'income' : 'expense'}">
                ${(monthlyIncome - warCosts) >= 0 ? '+' : ''}$${(monthlyIncome - warCosts).toFixed(1)}B
            </span>
        </div>`;
        html += '</div>';

        document.getElementById('budget-panel').innerHTML = html;
    },

    renderDomestic() {
        const s = Game.engine.state;
        let html = '';

        const stats = [
            { name: '📊 אישור ציבורי', value: s.approval, color: s.approval > 50 ? '#22c55e' : s.approval > 30 ? '#eab308' : '#ef4444' },
            { name: '🏛️ יציבות פנימית', value: s.stability, color: s.stability > 50 ? '#22c55e' : s.stability > 30 ? '#eab308' : '#ef4444' },
            { name: '⚔️ כוח צבאי', value: Math.min(100, s.totalMilitary * 5), color: '#3b82f6' },
            { name: '🛡️ רמת הגנה', value: Math.min(100, s.defenseLevel * 10), color: '#06b6d4' },
        ];

        if (s.leader === 'saudi') {
            stats.push({ name: '🏗️ Vision 2030', value: s.vision2030, color: '#a855f7' });
        }

        stats.forEach(stat => {
            html += `<div class="domestic-stat">
                <span>${stat.name}</span>
                <div class="domestic-bar">
                    <div class="domestic-fill" style="width:${stat.value}%;background:${stat.color}"></div>
                </div>
                <span style="font-family:'Share Tech Mono';color:${stat.color}">${Math.round(stat.value)}%</span>
            </div>`;
        });

        // US Relations special
        if (s.relations.usa) {
            const usVal = s.relations.usa.value;
            const usColor = usVal > 30 ? '#22c55e' : usVal > 0 ? '#eab308' : '#ef4444';
            html += `<div class="domestic-stat" style="margin-top:16px">
                <span>🇺🇸 יחסים עם ארה"ב</span>
                <div class="domestic-bar">
                    <div class="domestic-fill" style="width:${(usVal + 100) / 2}%;background:${usColor}"></div>
                </div>
                <span style="font-family:'Share Tech Mono';color:${usColor}">${usVal > 0 ? '+' : ''}${usVal}</span>
            </div>`;
        }

        // Actions
        html += `<div class="panel" style="margin-top:16px">
            <h3>🏛️ פעולות פנימיות</h3>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
                <button class="btn-action positive" onclick="Game.domesticAction('rally')" ${s.budget < 1 ? 'disabled' : ''}>
                    📢 עצרת תמיכה ($1B, +אישור)
                </button>
                <button class="btn-action neutral" onclick="Game.domesticAction('invest')" ${s.budget < 2 ? 'disabled' : ''}>
                    🏗️ השקעה בתשתיות ($2B, +יציבות)
                </button>
                <button class="btn-action warning" onclick="Game.domesticAction('security')" ${s.budget < 1.5 ? 'disabled' : ''}>
                    🔒 הגבר ביטחון פנים ($1.5B, +יציבות -אישור)
                </button>
            </div>
        </div>`;

        document.getElementById('domestic-panel').innerHTML = html;
    },

    showEvent(event) {
        document.getElementById('event-header').innerHTML = `<div>${event.title}</div>`;
        document.getElementById('event-body').innerHTML = `<p>${event.text}</p>`;
        document.getElementById('event-choices').innerHTML = event.choices.map((choice, i) =>
            `<button class="btn-action ${i === 0 ? 'negative' : i === 1 ? 'warning' : 'neutral'}"
                onclick="Game.handleEventChoice(${i})">
                ${choice.text}
            </button>`
        ).join('');
        document.getElementById('event-overlay').classList.remove('hidden');
    },

    hideEvent() {
        document.getElementById('event-overlay').classList.add('hidden');
    },

    showNotification(msg, type = 'info') {
        const colors = { info: 'var(--accent-cyan)', success: 'var(--accent-green)', warning: 'var(--accent-yellow)', error: 'var(--accent-red)' };
        const notif = document.createElement('div');
        notif.style.cssText = `position:fixed;top:90px;left:50%;transform:translateX(-50%);background:var(--bg-panel);border:1px solid ${colors[type]};
            color:${colors[type]};padding:12px 24px;border-radius:8px;z-index:999;font-size:0.9rem;animation:popIn 0.3s;max-width:500px;text-align:center;`;
        notif.textContent = msg;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    },

    updateTopbar() {
        const s = Game.engine.state;
        const leader = GAME_DATA.leaders[s.leader];
        document.getElementById('player-flag').textContent = leader.flag;
        document.getElementById('player-title').textContent = leader.titleEn;
        document.getElementById('game-date').textContent = `${GAME_DATA.months[s.month]} ${s.year} | ${GAME_DATA.monthsEn[s.month]} ${s.year}`;
        document.getElementById('game-turn').textContent = `תור ${s.turn} מתוך ${s.maxTurns}`;
        document.getElementById('stat-budget').textContent = s.budget.toFixed(1);
        document.getElementById('stat-approval').textContent = Math.round(s.approval);
        document.getElementById('stat-military').textContent = s.totalMilitary;
        document.getElementById('stat-nuclear').textContent = s.nuclearProgress;
        document.getElementById('news-ticker').textContent = Game.engine.getRandomNews();
    },

    renderCurrentTab() {
        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab) return;
        switch (activeTab.id) {
            case 'tab-overview': this.renderOverview(); break;
            case 'tab-diplomacy': this.renderDiplomacy(); break;
            case 'tab-military': this.renderMilitary(); break;
            case 'tab-intelligence': this.renderIntelligence(); break;
            case 'tab-nuclear': this.renderNuclear(); break;
            case 'tab-budget': this.renderBudget(); break;
            case 'tab-domestic': this.renderDomestic(); break;
        }
    },

    showGameOver(result, score) {
        const titles = {
            'victory': '🏆 ניצחון!',
            'total_victory': '🏆🏆 ניצחון מוחלט!',
            'iran_collapsed': '🏆 איראן קרסה!',
            'draw': '🤝 תיקו',
            'defeat': '❌ הפסד',
            'assassinated': '💀 חוסלת!',
            'voted_out': '📉 הודחת מתפקידך!',
            'collapse': '🏚️ המדינה קרסה!',
            'bankrupt': '💸 פשיטת רגל!',
            'nuked': '☢️ מתקפה גרעינית!',
        };

        const messages = {
            'victory': `סיימת את תקופת כהונתך בהצלחה. ציון סופי: ${score}/100`,
            'total_victory': 'איראן מנוטרלת לחלוטין! תוכנית הגרעין הושמדה וצבאה נחלש.',
            'iran_collapsed': 'המשטר האיראני קרס תחת לחץ פנימי וחיצוני. המזרח התיכון משתנה.',
            'draw': `הכהונה הסתיימה ללא הכרעה. ציון: ${score}/100. האיזור עדיין לא יציב.`,
            'defeat': `נכשלת להשיג את מטרותיך. ציון: ${score}/100`,
            'assassinated': 'ניסיון התנקשות הצליח. כהונתך הסתיימה בטרגדיה.',
            'voted_out': 'האישור הציבורי ירד לאפס. הודחת מתפקידך.',
            'collapse': 'היציבות הפנימית קרסה. המדינה בכאוס.',
            'bankrupt': 'התקציב התרוקן. המדינה פושטת רגל.',
            'nuked': 'איראן השתמשה בנשק גרעיני. אסון.',
        };

        document.getElementById('gameover-title').textContent = titles[result] || '🏁 סוף המשחק';
        document.getElementById('gameover-title').style.color = ['victory', 'total_victory', 'iran_collapsed'].includes(result) ? 'var(--accent-green)' : ['draw'].includes(result) ? 'var(--accent-yellow)' : 'var(--accent-red)';
        document.getElementById('gameover-content').innerHTML = `<p style="font-size:1.2rem">${messages[result] || 'המשחק הסתיים.'}</p>`;
        Game.showScreen('screen-gameover');
    }
};
