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
                <div class="country-name">${getName(c)}</div>
                <div class="rel-value ${relClass}">${rel.value > 0 ? '+' : ''}${rel.value}</div>
                ${rel.atWar ? `<div style="color:#ef4444;font-weight:700">${t('at_war')}</div>` : ''}
                <div class="rel-bar"><div class="rel-bar-fill" style="width:${barWidth}%;background:${barColor}"></div></div>
            </div>`;
        }).join('');
    },

    renderMap() {
        const s = Game.engine.state;
        let html = '<div style="position:relative;width:100%;height:100%;min-height:380px;">';

        // Player country position on map
        const playerPositions = {
            israel: { top: '40%', left: '35%', name: 'ישראל', nameEn: 'Israel' },
            saudi: { top: '60%', left: '50%', name: 'סעודיה', nameEn: 'Saudi Arabia' },
            iran: { top: '35%', left: '70%', name: 'איראן', nameEn: 'Iran' },
            usa: { top: '10%', left: '10%', name: 'ארה"ב', nameEn: 'USA' },
            hezbollah: { top: '28%', left: '38%', name: 'חיזבאללה', nameEn: 'Hezbollah' },
            turkey: { top: '20%', left: '40%', name: 'טורקיה', nameEn: 'Turkey' }
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
            <span class="mc-name">${LANG === 'en' ? playerPos.nameEn : playerPos.name}</span>
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
                <span class="mc-name">${getName(country)}</span>
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
                threats.push({ level: '', levelIcon: '🔴', levelText: t('critical'), text: t('iran_nuke_threat').replace('{0}', s.iranNuclear) });
            } else if (s.iranNuclear > 50) {
                threats.push({ level: 'low', levelIcon: '🟡', levelText: t('high'), text: t('iran_nuke_threat').replace('{0}', s.iranNuclear) });
            }
        } else {
            // Iran player sees threats from Israel/USA
            if (s.relations.usa && s.relations.usa.value < -50) {
                threats.push({ level: '', levelIcon: '🔴', levelText: t('critical'), text: t('usa_attack_threat') });
            }
        }

        if (s.atWar.length > 0) {
            s.atWar.forEach(c => {
                threats.push({ level: '', levelIcon: '🔴', levelText: t('war'), text: t('active_war_with').replace('{0}', getName(GAME_DATA.countries[c])) });
            });
        }

        if (s.approval < 30) {
            threats.push({ level: '', levelIcon: '🔴', levelText: t('critical'), text: t('low_approval').replace('{0}', s.approval) });
        }

        if (s.budget < 3) {
            threats.push({ level: 'low', levelIcon: '🟡', levelText: t('warning'), text: t('low_budget').replace('{0}', s.budget.toFixed(1)) });
        }

        if (s.leader === 'saudi' && s.vision2030 < 30) {
            threats.push({ level: 'low', levelIcon: '🟡', levelText: t('warning'), text: t('vision_danger').replace('{0}', s.vision2030) });
        }

        if (threats.length === 0) {
            threats.push({ level: 'info', levelIcon: '🔵', levelText: t('stable'), text: t('no_threats') });
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
            const statusText = rel.atWar ? t('at_war') : rel.value > 50 ? t('alliance') : rel.value > 20 ? t('friendly') : rel.value > -20 ? t('neutral_status') : rel.value > -50 ? t('hostile') : t('enemy');

            let actions = '';
            if (!rel.atWar) {
                actions += `<button class="btn-action positive" onclick="Game.diplomacyAction('improve','${k}')">🤝 ${t('improve_relations')} ($0.5B)</button>`;
                actions += `<button class="btn-action negative" onclick="Game.diplomacyAction('worsen','${k}')">😠 ${t('worsen_relations')}</button>`;
                if (rel.value < -30 && !c.isSuperpower) {
                    actions += `<button class="btn-action negative" onclick="Game.diplomacyAction('war','${k}')">⚔️ ${t('declare_war')}</button>`;
                }
            } else {
                actions += `<button class="btn-action positive" onclick="Game.diplomacyAction('peace','${k}')">🕊️ ${t('seek_ceasefire')}</button>`;
                actions += `<button class="btn-action negative" onclick="Game.diplomacyAction('attack','${k}')">💥 ${t('military_op')}</button>`;
                actions += `<button class="btn-action warning" onclick="Game.diplomacyAction('airstrike','${k}')">✈️ ${t('airstrike')}</button>`;
            }

            return `<div class="diplo-card">
                <div class="diplo-flag">${c.flag}</div>
                <div class="diplo-info">
                    <div class="diplo-name">${getName(c)}</div>
                    <div class="diplo-status">
                        <span class="rel-value ${relClass}">${rel.value > 0 ? '+' : ''}${rel.value}</span>
                        <span style="margin:0 8px">${statusText}</span>
                        <span style="color:var(--text-dim)">${t('army')}: ${c.military}</span>
                    </div>
                </div>
                <div class="diplo-actions">${actions}</div>
            </div>`;
        }).join('');
    },

    renderMilitary() {
        const s = Game.engine.state;

        // Current forces
        let forcesHtml = `<h3>🪖 ${t('current_forces')}</h3>`;
        for (const [id, f] of Object.entries(s.forces)) {
            const unit = GAME_DATA.units[id];
            const incoming = f.incoming > 0 ? ` <span style="color:var(--accent-yellow)">(+${f.incoming} ${t('incoming')})</span>` : '';
            forcesHtml += `<div class="force-row">
                <span class="force-name">${unit.icon} ${getName(unit)}</span>
                <span class="force-count">${f.count}${incoming}</span>
            </div>`;
        }
        forcesHtml += `<div class="force-row" style="border-top:2px solid var(--accent-cyan);margin-top:8px;padding-top:12px">
            <span style="color:var(--accent-cyan);font-weight:700">💪 ${t('total_military')}</span>
            <span class="force-count" style="font-size:1.3rem">${s.totalMilitary}</span>
        </div>`;
        forcesHtml += `<div class="force-row">
            <span style="color:var(--accent-green)">🛡️ ${t('defense_level')}</span>
            <span class="force-count">${s.defenseLevel}</span>
        </div>`;
        document.getElementById('forces-panel').innerHTML = forcesHtml;

        // Procurement
        let procHtml = `<h3>🛒 ${t('procurement')}</h3>`;
        procHtml += `<div style="margin-bottom:10px;color:var(--accent-yellow)">💰 ${t('available_budget')}: $${s.budget.toFixed(1)}B</div>`;
        for (const [id, unit] of Object.entries(GAME_DATA.units)) {
            procHtml += `<div class="buy-row">
                <span class="buy-item">${unit.icon} ${getName(unit)}</span>
                <span class="buy-cost">$${unit.cost}B</span>
                <button class="btn-action neutral" onclick="Game.buyUnit('${id}', 1)" ${s.budget < unit.cost ? 'disabled' : ''}>${t('buy_1')}</button>
                <button class="btn-action neutral" onclick="Game.buyUnit('${id}', 5)" ${s.budget < unit.cost * 5 ? 'disabled' : ''}>${t('buy_5')}</button>
            </div>`;
        }
        document.getElementById('procurement-panel').innerHTML = procHtml;

        // Deployment info
        let deployHtml = `<h3>📍 ${t('deployment')}</h3>`;
        if (s.atWar.length > 0) {
            deployHtml += `<div style="margin-bottom:10px">${t('active_fronts')}:</div>`;
            s.atWar.forEach(c => {
                const country = GAME_DATA.countries[c];
                deployHtml += `<div class="threat-item">
                    <div>${country.flag} ${getName(country)} - ${t('enemy_army')}: ${country.military}</div>
                    <button class="btn-action negative" onclick="Game.diplomacyAction('attack','${c}')">💥 תקוף</button>
                    <button class="btn-action warning" onclick="Game.diplomacyAction('airstrike','${c}')">✈️ תקיפה אווירית</button>
                </div>`;
            });
        } else {
            deployHtml += `<div style="color:var(--text-dim)">${t('no_fronts')}</div>`;
        }
        document.getElementById('deployment-panel').innerHTML = deployHtml;
    },

    renderIntelligence() {
        const s = Game.engine.state;
        const agency = GAME_DATA.leaders[s.leader].intelAgency;

        let html = `<div class="panel"><h3>🕵️ ${agency}</h3>
            <p style="color:var(--text-secondary);margin-bottom:16px">${t('intel_desc')}</p>
        </div>`;

        // Intel operations
        const targets = Object.keys(s.relations).filter(k =>
            GAME_DATA.countries[k] && !GAME_DATA.countries[k].isSuperpower
        );

        for (const [opId, op] of Object.entries(GAME_DATA.intelOps)) {
            const riskClass = op.risk === 'high' ? 'risk-high' : op.risk === 'med' ? 'risk-med' : 'risk-low';
            const riskText = op.risk === 'high' ? t('risk_high') : op.risk === 'med' ? t('risk_med') : t('risk_low');

            html += `<div class="intel-op">
                <h4>${LANG === 'en' ? op.nameEn : op.name}</h4>
                <div class="intel-desc">${op.desc}</div>
                <div style="display:flex;gap:16px;align-items:center;margin-bottom:10px">
                    <span class="intel-cost">💰 $${op.cost}B</span>
                    <span class="intel-risk ${riskClass}">⚠️ ${riskText}</span>
                    <span style="color:var(--text-dim)">${t('success_rate')}: ${op.successRate}%</span>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:4px">
                    ${targets.map(t => {
                        const c = GAME_DATA.countries[t];
                        const disabled = s.budget < op.cost ? 'disabled' : '';
                        return `<button class="btn-action warning" onclick="Game.intelOp('${opId}','${t}')" ${disabled}>
                            ${c.flag} ${getName(c)}
                        </button>`;
                    }).join('')}
                </div>
            </div>`;
        }

        // Intel reports
        if (s.intelReports.length > 0) {
            html += `<div class="panel"><h3>📋 ${t('intel_reports')}</h3>`;
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

        const nuclearTitlesHe = {
            israel: '🇮🇱 תוכנית גרעינית ישראלית',
            saudi: '🇸🇦 תוכנית גרעינית סעודית',
            iran: '🇮🇷 תוכנית גרעינית איראנית',
            usa: '🇺🇸 ארסנל גרעיני אמריקאי',
            hezbollah: '🇱🇧 חיזבאללה - אין תוכנית גרעינית',
            turkey: '🇹🇷 תוכנית גרעינית טורקית'
        };
        const nuclearTitlesEn = {
            israel: '🇮🇱 Israeli Nuclear Program',
            saudi: '🇸🇦 Saudi Nuclear Program',
            iran: '🇮🇷 Iranian Nuclear Program',
            usa: '🇺🇸 American Nuclear Arsenal',
            hezbollah: '🇱🇧 Hezbollah - No Nuclear Program',
            turkey: '🇹🇷 Turkish Nuclear Program'
        };
        const nuclearTitles = LANG === 'en' ? nuclearTitlesEn : nuclearTitlesHe;

        // Player's nuclear program
        html += `<div class="nuclear-progress">
            <h3>${nuclearTitles[s.leader] || (LANG === 'en' ? 'Nuclear Program' : 'תוכנית גרעינית')}</h3>
            <div class="progress-bar">
                <div class="progress-fill" style="width:${s.nuclearProgress}%"></div>
            </div>
            <div class="progress-label">${s.nuclearProgress}%</div>
            <div style="color:var(--text-secondary);margin-top:8px">
                ${s.nuclearProgress >= 100 ? t('nuclear_program_complete') :
                  s.nuclearProgress >= 75 ? t('nuclear_advanced') :
                  s.nuclearProgress >= 50 ? t('nuclear_intermediate') :
                  s.nuclearProgress >= 25 ? t('nuclear_early') :
                  t('nuclear_planning')}
            </div>
        </div>`;

        // Fund nuclear (only if not complete)
        if (s.nuclearProgress < 100) {
            html += `<div class="panel">
                <h3>💰 ${t('fund_nuclear')}</h3>
                <p style="color:var(--text-secondary);margin-bottom:12px">${t('fund_nuclear_desc')}</p>
                <div style="display:flex;gap:8px">
                    <button class="btn-action neutral" onclick="Game.fundNuclear(1)" ${s.budget < 1 ? 'disabled' : ''}>$1B - ${t('fund_basic')}</button>
                    <button class="btn-action warning" onclick="Game.fundNuclear(3)" ${s.budget < 3 ? 'disabled' : ''}>$3B - ${t('fund_accelerated')}</button>
                    <button class="btn-action negative" onclick="Game.fundNuclear(5)" ${s.budget < 5 ? 'disabled' : ''}>$5B - ${t('fund_max')}</button>
                </div>
            </div>`;
        }

        // Iran's nuclear program - only show if NOT playing as Iran
        if (s.leader === 'iran') {
            document.getElementById('nuclear-panel').innerHTML = html;
            return;
        }
        html += `<div class="nuclear-progress" style="border-color:var(--accent-red)">
            <h3>${t('iran_nuclear_title')}</h3>
            <div class="progress-bar">
                <div class="progress-fill" style="width:${s.iranNuclear}%;background:linear-gradient(90deg,#f97316,#ef4444,#991b1b)"></div>
            </div>
            <div class="progress-label" style="color:var(--accent-red)">${s.iranNuclear}%</div>
            <div style="color:var(--text-secondary);margin-top:8px">
                ${s.iranNuclear >= 100 ? t('iran_nuke_complete') :
                  s.iranNuclear >= 80 ? t('iran_nuke_critical') :
                  s.iranNuclear >= 50 ? t('iran_nuke_significant') :
                  t('iran_nuke_early')}
            </div>
            <div style="margin-top:12px">
                <button class="btn-action negative" onclick="Game.intelOp('nuclearSabotage','iran')" ${s.budget < 2 ? 'disabled' : ''}>
                    💻 ${t('nuclear_sabotage')} ($2B)
                </button>
                <button class="btn-action warning" onclick="Game.diplomacyAction('airstrike','iran')" ${s.forces && s.forces.aircraft && s.forces.aircraft.count < 2 ? 'disabled' : ''}>
                    ✈️ ${t('strike_nuclear')}
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
            <h3>💰 ${t('budget_summary')}</h3>
            <div class="budget-row">
                <span class="budget-category">💵 ${t('current_budget')}</span>
                <span class="budget-amount balance">$${s.budget.toFixed(1)}B</span>
            </div>
            <div class="budget-row">
                <span class="budget-category">📈 ${t('monthly_income')}</span>
                <span class="budget-amount income">+$${s.monthlyIncome.toFixed(1)}B</span>
            </div>`;

        if (s.usAid > 0) {
            html += `<div class="budget-row">
                <span class="budget-category">🇺🇸 ${t('us_aid')}</span>
                <span class="budget-amount income">+$${(s.usAid / 12).toFixed(1)}B${t('month_label')}</span>
            </div>`;
        }
        if (s.oilRevenue > 0) {
            html += `<div class="budget-row">
                <span class="budget-category">🛢️ ${t('oil_revenue')}</span>
                <span class="budget-amount income">+$${s.oilRevenue.toFixed(1)}B</span>
            </div>`;
        }
        if (warCosts > 0) {
            html += `<div class="budget-row">
                <span class="budget-category">⚔️ ${t('war_costs')}</span>
                <span class="budget-amount expense">-$${warCosts}B</span>
            </div>`;
        }
        html += `<div class="budget-row" style="border-top:2px solid var(--accent-cyan);padding-top:16px">
            <span class="budget-category" style="font-weight:700">📊 ${t('net_monthly')}</span>
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
            { name: `📊 ${t('public_approval')}`, value: s.approval, color: s.approval > 50 ? '#22c55e' : s.approval > 30 ? '#eab308' : '#ef4444' },
            { name: `🏛️ ${t('internal_stability')}`, value: s.stability, color: s.stability > 50 ? '#22c55e' : s.stability > 30 ? '#eab308' : '#ef4444' },
            { name: `⚔️ ${t('military_power')}`, value: Math.min(100, s.totalMilitary * 5), color: '#3b82f6' },
            { name: `🛡️ ${t('defense')}`, value: Math.min(100, s.defenseLevel * 10), color: '#06b6d4' },
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
                <span>🇺🇸 ${t('us_relations')}</span>
                <div class="domestic-bar">
                    <div class="domestic-fill" style="width:${(usVal + 100) / 2}%;background:${usColor}"></div>
                </div>
                <span style="font-family:'Share Tech Mono';color:${usColor}">${usVal > 0 ? '+' : ''}${usVal}</span>
            </div>`;
        }

        // Actions
        html += `<div class="panel" style="margin-top:16px">
            <h3>🏛️ ${t('domestic_actions')}</h3>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
                <button class="btn-action positive" onclick="Game.domesticAction('rally')" ${s.budget < 1 ? 'disabled' : ''}>
                    📢 ${t('rally')}
                </button>
                <button class="btn-action neutral" onclick="Game.domesticAction('invest')" ${s.budget < 2 ? 'disabled' : ''}>
                    🏗️ ${t('invest_infra')}
                </button>
                <button class="btn-action warning" onclick="Game.domesticAction('security')" ${s.budget < 1.5 ? 'disabled' : ''}>
                    🔒 ${t('security')}
                </button>
            </div>
        </div>`;

        document.getElementById('domestic-panel').innerHTML = html;
    },

    showEvent(event) {
        document.getElementById('event-header').innerHTML = `<div>${LANG === 'en' ? (event.titleEn || event.title) : event.title}</div>`;
        document.getElementById('event-body').innerHTML = `<p>${LANG === 'en' ? (event.textEn || event.text) : event.text}</p>`;
        document.getElementById('event-choices').innerHTML = event.choices.map((choice, i) =>
            `<button class="btn-action ${i === 0 ? 'negative' : i === 1 ? 'warning' : 'neutral'}"
                onclick="Game.handleEventChoice(${i})">
                ${LANG === 'en' ? (choice.textEn || choice.text) : choice.text}
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
        document.getElementById('player-title').textContent = LANG === 'en' ? leader.titleEn : leader.title;
        document.getElementById('game-date').textContent = LANG === 'en' ? `${GAME_DATA.monthsEn[s.month]} ${s.year}` : `${GAME_DATA.months[s.month]} ${s.year}`;
        document.getElementById('game-turn').textContent = t('turn_of').replace('{0}', s.turn).replace('{1}', s.maxTurns);
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
        document.getElementById('gameover-title').textContent = t('gameover_' + result) || (LANG === 'en' ? 'Game Over' : 'סוף המשחק');
        document.getElementById('gameover-title').style.color = ['victory', 'total_victory', 'iran_collapsed'].includes(result) ? 'var(--accent-green)' : ['draw'].includes(result) ? 'var(--accent-yellow)' : 'var(--accent-red)';
        document.getElementById('gameover-content').innerHTML = `<p style="font-size:1.2rem">${t('gameover_msg_' + result).replace('{0}', score) || (LANG === 'en' ? 'The game has ended.' : 'המשחק הסתיים.')}</p>`;
        Game.showScreen('screen-gameover');
    }
};
