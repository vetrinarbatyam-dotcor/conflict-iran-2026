/* ========================================
   CONFLICT 2026 - TRANSLATIONS / i18n
   Hebrew and English language support
   ======================================== */

let LANG = 'he'; // Default language

function t(key) {
    return (TRANSLATIONS[LANG] && TRANSLATIONS[LANG][key]) || (TRANSLATIONS.he[key]) || key;
}

function getName(obj) {
    return LANG === 'en' ? (obj.nameEn || obj.name) : obj.name;
}

function getTitle(obj) {
    return LANG === 'en' ? (obj.titleEn || obj.title) : obj.title;
}

function setLang(lang) {
    LANG = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';

    // Update toggle buttons
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.textContent = lang === 'he' ? 'EN' : 'עב';
    });

    // Re-render current screen
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen) {
        switch (activeScreen.id) {
            case 'screen-title':
                updateTitleScreen();
                break;
            case 'screen-howtoplay':
                updateHowToPlay();
                break;
            case 'screen-leader':
                Game.renderLeaderCards();
                break;
            case 'screen-game':
                UI.updateTopbar();
                UI.renderCurrentTab();
                updateGameNav();
                break;
        }
    }
}

function updateTitleScreen() {
    const btnMain = document.querySelector('#screen-title .btn-main');
    if (btnMain) {
        btnMain.innerHTML = `<span class="btn-text">${t('start_new_game')}</span><span class="btn-sub">${t('start_new_game_sub')}</span>`;
    }
    const btnHow = document.querySelector('#screen-title .btn-secondary');
    if (btnHow) {
        btnHow.innerHTML = `<span>${t('how_to_play_btn')}</span>`;
    }
}

function updateHowToPlay() {
    const panel = document.querySelector('#screen-howtoplay .panel-full');
    if (!panel) return;
    panel.querySelector('h1').textContent = t('how_to_play_title');
    const cards = panel.querySelectorAll('.howto-card');
    const howtoKeys = ['objective', 'turns', 'diplomacy_hw', 'military_hw', 'intelligence_hw', 'nuclear_hw'];
    cards.forEach((card, i) => {
        if (howtoKeys[i]) {
            card.querySelector('h3').textContent = t('howto_' + howtoKeys[i] + '_title');
            card.querySelector('p').textContent = t('howto_' + howtoKeys[i] + '_text');
        }
    });
    const backBtn = panel.querySelector('.btn-main');
    if (backBtn) backBtn.textContent = t('back');
}

function updateGameNav() {
    const labels = document.querySelectorAll('.game-nav .nav-label');
    const navKeys = ['nav_overview', 'nav_diplomacy', 'nav_military', 'nav_intelligence', 'nav_nuclear', 'nav_budget', 'nav_domestic'];
    labels.forEach((label, i) => {
        if (navKeys[i]) label.textContent = t(navKeys[i]);
    });
    const endTurnLabel = document.querySelector('.end-turn-btn .nav-label');
    if (endTurnLabel) endTurnLabel.textContent = t('end_turn');

    // Update tab headers
    const tabHeaders = {
        'tab-overview-title': 'tab_overview',
        'tab-diplomacy-title': 'tab_diplomacy',
        'tab-military-title': 'tab_military',
        'tab-intelligence-title': 'tab_intelligence',
        'tab-nuclear-title': 'tab_nuclear',
        'tab-budget-title': 'tab_budget',
        'tab-domestic-title': 'tab_domestic'
    };
    for (const [id, key] of Object.entries(tabHeaders)) {
        const el = document.getElementById(id);
        if (el) el.textContent = t(key);
    }

    // Update threats title
    const threatsTitle = document.getElementById('threats-title');
    if (threatsTitle) threatsTitle.textContent = t('active_threats');

    // Update news ticker label
    const tickerLabel = document.querySelector('.ticker-label');
    if (tickerLabel) tickerLabel.textContent = t('news_label');
}

const TRANSLATIONS = {
    he: {
        // Title screen
        start_new_game: 'התחל משחק חדש',
        start_new_game_sub: 'START NEW GAME',
        how_to_play_btn: 'איך משחקים? | HOW TO PLAY',
        how_to_play_title: '📖 HOW TO PLAY | איך משחקים',
        back: 'חזור | BACK',

        // How to play
        howto_objective_title: '🎯 מטרה | OBJECTIVE',
        howto_objective_text: 'בתור מנהיג מדינה במזרח התיכון, עליך לנהל דיפלומטיה, צבא, מודיעין ומשק כדי להשיג דומיננטיות אזורית ולנטרל את האיום האיראני.',
        howto_turns_title: '⏱️ תורות | TURNS',
        howto_turns_text: 'כל תור מייצג חודש אחד. בכל תור תקבל החלטות בתחומי דיפלומטיה, צבא, מודיעין ותקציב. אחר כך ה-AI של המדינות האחרות פועל.',
        howto_diplomacy_hw_title: '🤝 דיפלומטיה | DIPLOMACY',
        howto_diplomacy_hw_text: 'שפר או הרע יחסים עם מדינות. יחסים טובים = סחר ובריתות. יחסים רעים = הצדקה למלחמה.',
        howto_military_hw_title: '⚔️ צבא | MILITARY',
        howto_military_hw_text: 'רכוש טנקים, מטוסים, טילים ומערכות הגנה. פרוס כוחות בגבולות. פלוש לשטח אויב או הגן על שלך.',
        howto_intelligence_hw_title: '🕵️ מודיעין | INTELLIGENCE',
        howto_intelligence_hw_text: 'הפעל סוכנים לריגול, חבלה, תמיכה במורדים, וחיסולים ממוקדים. פעולות מסוכנות אך יעילות.',
        howto_nuclear_hw_title: '☢️ גרעין | NUCLEAR',
        howto_nuclear_hw_text: 'פתח או נטרל תוכניות גרעין. נשק גרעיני = הרתעה אולטימטיבית, אבל בעלות דיפלומטית כבדה.',

        // Leader select
        select_leader: 'בחר מנהיג | SELECT YOUR LEADER',
        challenge: 'אתגר',
        difficulty: 'קושי',

        // Briefing
        classified: 'CLASSIFIED // סודי ביותר',
        assume_command: 'קבל פיקוד | ASSUME COMMAND',

        // Nav
        nav_overview: 'סקירה',
        nav_diplomacy: 'דיפלומטיה',
        nav_military: 'צבא',
        nav_intelligence: 'מודיעין',
        nav_nuclear: 'גרעין',
        nav_budget: 'תקציב',
        nav_domestic: 'פנים',
        end_turn: 'סיים תור',

        // Tab headers
        tab_overview: '🗺️ סקירה אזורית | Regional Overview',
        tab_diplomacy: '🤝 דיפלומטיה | Diplomacy',
        tab_military: '⚔️ צבא | Military',
        tab_intelligence: '🕵️ מודיעין | Intelligence',
        tab_nuclear: '☢️ גרעין | Nuclear Program',
        tab_budget: '💰 תקציב | Budget',
        tab_domestic: '🏛️ פנים | Domestic Affairs',

        // Overview
        active_threats: '🚨 איומים פעילים | Active Threats',
        critical: 'קריטי',
        high: 'גבוה',
        war: 'מלחמה',
        warning: 'אזהרה',
        stable: 'יציב',
        at_war: '⚔️ מלחמה',
        no_threats: 'אין איומים מיידיים',
        iran_nuke_threat: '☢️ איראן: {0}% לפצצה גרעינית',
        usa_attack_threat: '🇺🇸 ארה"ב מאיימת בתקיפה!',
        active_war_with: '⚔️ מלחמה פעילה עם {0}',
        low_approval: '📊 אישור ציבורי נמוך: {0}%',
        low_budget: '💰 תקציב נמוך: ${0}B',
        vision_danger: '🏗️ Vision 2030 בסכנה: {0}%',

        // Diplomacy
        alliance: '🤝 ברית',
        friendly: '😊 ידידותי',
        neutral_status: '😐 נייטרלי',
        hostile: '😠 עוין',
        enemy: '🔥 אויב',
        improve_relations: '🤝 שפר יחסים ($0.5B)',
        worsen_relations: '😠 הרע יחסים',
        declare_war: '⚔️ הכרז מלחמה',
        seek_ceasefire: '🕊️ בקש הפסקת אש',
        military_op: '💥 מבצע צבאי',
        airstrike: '✈️ תקיפה אווירית',
        army: 'צבא',

        // Military
        current_forces: '🪖 כוחות נוכחיים | Current Forces',
        incoming: 'בדרך',
        total_military: '💪 כוח צבאי כולל',
        defense_level: '🛡️ רמת הגנה',
        procurement: '🛒 רכש נשק | Procurement',
        available_budget: '💰 תקציב זמין',
        buy_1: 'קנה 1',
        buy_5: 'קנה 5',
        deployment: '📍 פריסה | Deployment',
        active_fronts: 'חזיתות פעילות:',
        enemy_army: 'צבא אויב',
        attack: '💥 תקוף',
        airstrike_btn: '✈️ תקיפה אווירית',
        no_fronts: 'אין חזיתות פעילות. השתמש בדיפלומטיה להכרזת מלחמה.',

        // Intelligence
        intel_desc: 'בחר מבצע ומדינת יעד. כל מבצע עולה כסף ויש סיכון לחשיפה.',
        risk_high: 'סיכון גבוה',
        risk_med: 'סיכון בינוני',
        risk_low: 'סיכון נמוך',
        success_rate: 'הצלחה',
        intel_reports: '📋 דו"חות מודיעין',

        // Nuclear
        nuclear_program_complete: '✅ תוכנית הושלמה - יש לך הרתעה גרעינית!',
        nuclear_advanced: '🔬 שלב מתקדם - קרוב להשלמה',
        nuclear_mid: '⚗️ שלב ביניים - העשרה מתקדמת',
        nuclear_early: '🏗️ שלב מוקדם - בניית תשתיות',
        nuclear_planning: '📋 שלב תכנון ראשוני',
        fund_nuclear: '💰 מימון מחקר גרעיני',
        fund_nuclear_desc: 'השקע בתוכנית הגרעין. השקעה גבוהה = סיכוי גבוה יותר להתקדמות.',
        fund_basic: '$1B - בסיסי',
        fund_accelerated: '$3B - מואץ',
        fund_max: '$5B - מרבי',
        iran_nuclear_title: '🇮🇷 תוכנית גרעינית איראנית',
        iran_nuke_complete: '☢️ אזהרה! איראן השיגה נשק גרעיני!',
        iran_nuke_critical: '🔴 סכנה קריטית - חודשים מפצצה!',
        iran_nuke_progress: '🟡 התקדמות משמעותית',
        iran_nuke_early: '🟢 בשלב מוקדם',
        nuclear_sabotage: '💻 חבלה גרעינית ($2B)',
        strike_nuclear: '✈️ תקיפת מתקנים גרעיניים',

        // Budget
        budget_summary: '💰 סיכום תקציבי | Budget Summary',
        current_budget: '💵 תקציב נוכחי',
        monthly_income: '📈 הכנסה חודשית',
        us_aid: '🇺🇸 סיוע אמריקאי (שנתי)',
        month_label: '/חודש',
        oil_revenue: '🛢️ הכנסות נפט',
        war_costs: '⚔️ עלויות מלחמה',
        net_monthly: '📊 מאזן חודשי נטו',

        // Domestic
        public_approval: '📊 אישור ציבורי',
        internal_stability: '🏛️ יציבות פנימית',
        military_power: '⚔️ כוח צבאי',
        defense: '🛡️ רמת הגנה',
        us_relations: '🇺🇸 יחסים עם ארה"ב',
        domestic_actions: '🏛️ פעולות פנימיות',
        rally: '📢 עצרת תמיכה ($1B, +אישור)',
        invest_infra: '🏗️ השקעה בתשתיות ($2B, +יציבות)',
        security: '🔒 הגבר ביטחון פנים ($1.5B, +יציבות -אישור)',

        // Game over
        gameover_victory: '🏆 ניצחון!',
        gameover_total_victory: '🏆🏆 ניצחון מוחלט!',
        gameover_iran_collapsed: '🏆 איראן קרסה!',
        gameover_draw: '🤝 תיקו',
        gameover_defeat: '❌ הפסד',
        gameover_assassinated: '💀 חוסלת!',
        gameover_voted_out: '📉 הודחת מתפקידך!',
        gameover_collapse: '🏚️ המדינה קרסה!',
        gameover_bankrupt: '💸 פשיטת רגל!',
        gameover_nuked: '☢️ מתקפה גרעינית!',
        gameover_default: '🏁 סוף המשחק',
        gameover_msg_victory: 'סיימת את תקופת כהונתך בהצלחה. ציון סופי: {0}/100',
        gameover_msg_total_victory: 'איראן מנוטרלת לחלוטין! תוכנית הגרעין הושמדה וצבאה נחלש.',
        gameover_msg_iran_collapsed: 'המשטר האיראני קרס תחת לחץ פנימי וחיצוני. המזרח התיכון משתנה.',
        gameover_msg_draw: 'הכהונה הסתיימה ללא הכרעה. ציון: {0}/100. האיזור עדיין לא יציב.',
        gameover_msg_defeat: 'נכשלת להשיג את מטרותיך. ציון: {0}/100',
        gameover_msg_assassinated: 'ניסיון התנקשות הצליח. כהונתך הסתיימה בטרגדיה.',
        gameover_msg_voted_out: 'האישור הציבורי ירד לאפס. הודחת מתפקידך.',
        gameover_msg_collapse: 'היציבות הפנימית קרסה. המדינה בכאוס.',
        gameover_msg_bankrupt: 'התקציב התרוקן. המדינה פושטת רגל.',
        gameover_msg_nuked: 'איראן השתמשה בנשק גרעיני. אסון.',
        gameover_msg_default: 'המשחק הסתיים.',
        new_game: 'משחק חדש | NEW GAME',

        // Topbar
        turn_of: 'תור {0} מתוך {1}',
        news_label: '⚡ חדשות',

        // Engine messages
        budget_insufficient: 'תקציב לא מספיק',
        already_at_war: 'כבר במלחמה',
        not_at_war: 'לא במלחמה',
        relations_improved: 'יחסים עם {0} השתפרו ב-{1}',
        relations_worsened: 'יחסים עם {0} הורעו ב-{1}',
        war_declared: 'הוכרזה מלחמה על {0}!',
        ceasefire_accepted: 'הסכם הפסקת אש עם {0}!',
        ceasefire_rejected: '{0} דוחה הצעת שלום',
        units_ordered: 'הוזמנו {0} {1}. אספקה: {2} חודשים',
        not_enough_aircraft: 'אין מספיק מטוסי קרב',
        attack_success: 'מבצע צבאי נגד {0} הצליח! צבא האויב נפגע.',
        attack_failed: 'מבצע צבאי נגד {0} נכשל. נגרמו אבדות.',
        airstrike_success: 'תקיפה אווירית על {0} הצליחה!',
        airstrike_failed: 'תקיפה אווירית נכשלה. מטוס הופל.',
        nuclear_complete: 'תוכנית גרעינית הושלמה',
        nuclear_advance: 'התקדמות גרעינית! +{0}% (סה"כ {1}%)',
        nuclear_no_progress: 'מחקר נמשך. אין פריצת דרך החודש.',
        op_failed: 'מבצע {0} נכשל.',
        op_exposed: '⚠️ המבצע נחשף! יחסים הורעו.',
        spy_success: 'ריגול הצליח! {0}',
        sabotage_success: 'חבלה הצליחה! צבא {0} נפגע.',
        cyber_success: 'מתקפת סייבר הצליחה! תשתיות {0} נפגעו.',
        rebels_success: 'מימון מורדים הצליח! אי-יציבות ב{0} גוברת.',
        assassination_success: 'חיסול ממוקד הצליח! מנהיג צבאי של {0} חוסל.',
        propaganda_success: 'לוחמה פסיכולוגית הצליחה! מחאות ב{0}.',
        nuclear_sabotage_success: 'חבלה גרעינית הצליחה! תוכנית הגרעין האיראנית נפגעה קשות!',

        // Turn results
        war_cost: '💸 עלות מלחמה עם {0}: -$2B',
        units_arrived: '📦 {0}: {1} יחידות הגיעו!',
        iran_nuke_complete_warning: '☢️ אזהרה קריטית: איראן השלימה פצצה גרעינית!',
        budget_deficit: '⚠️ גירעון תקציבי! יציבות ואישור יורדים.',
        assassination_success_turn: '💀 ניסיון התנקשות הצליח!',
        assassination_failed_turn: '🎯 ניסיון התנקשות נכשל! גל אהדה.',
        iran_missiles: '🚀 איראן שיגרה {0} טילים. {1} יורטו. נזק: ${2}B',
        houthi_intercepted: '🛡️ חות\'ים שיגרו מל"טים. הגנות אוויריות יירטו.',
        houthi_hit: '💥 חות\'ים פגעו במתקן נפט! נזק: $1B',
        hezbollah_rockets: '🚀 חיזבאללה שיגר {0} רקטות. כיפת ברזל יירטה {1}%.',
        us_concern: '🇺🇸 ארה"ב מבעת דאגה ממספר החזיתות.',
        country_collapsed: '🏴 {0} קרסה! הממשלה נפלה.',
        monthly_summary: '📋 סיכום חודשי - {0} {1}',
        continue_btn: '✅ המשך',
        chose: 'בחרת: {0}',

        // Domestic actions
        rally_success: 'עצרת תמיכה הצליחה! +8 אישור ציבורי',
        invest_success: 'השקעה בתשתיות! +10 יציבות',
        security_success: 'ביטחון פנים הוגבר! +8 יציבות, -3 אישור',

        // Intel reports
        intel_report_1: '{0}: צבא ברמה {1}, יציבות {2}%',
        intel_report_2: '{0}: מתכננים רכש נשק חדש',
        intel_report_3: '{0}: מתחים פנימיים גוברים, יציבות {1}%',
        intel_report_iran: 'איראן: תוכנית גרעינית ב-{0}% התקדמות',

        // Leader card stats
        stat_budget: '💰 תקציב',
        stat_army: '⚔️ צבא',
        stat_nuclear: '☢️ גרעין',
        stat_intel: '🕵️ מודיעין',
    },

    en: {
        // Title screen
        start_new_game: 'START NEW GAME',
        start_new_game_sub: 'Begin your campaign',
        how_to_play_btn: 'HOW TO PLAY',
        how_to_play_title: '📖 HOW TO PLAY',
        back: 'BACK',

        // How to play
        howto_objective_title: '🎯 OBJECTIVE',
        howto_objective_text: 'As a Middle East leader, manage diplomacy, military, intelligence and economy to achieve regional dominance and neutralize the Iranian threat.',
        howto_turns_title: '⏱️ TURNS',
        howto_turns_text: 'Each turn represents one month. Make decisions in diplomacy, military, intelligence and budget. Then the AI of other nations acts.',
        howto_diplomacy_hw_title: '🤝 DIPLOMACY',
        howto_diplomacy_hw_text: 'Improve or worsen relations with nations. Good relations = trade and alliances. Bad relations = justification for war.',
        howto_military_hw_title: '⚔️ MILITARY',
        howto_military_hw_text: 'Purchase tanks, aircraft, missiles and defense systems. Deploy forces at borders. Invade enemy territory or defend yours.',
        howto_intelligence_hw_title: '🕵️ INTELLIGENCE',
        howto_intelligence_hw_text: 'Deploy agents for espionage, sabotage, rebel support, and targeted assassinations. Dangerous but effective operations.',
        howto_nuclear_hw_title: '☢️ NUCLEAR',
        howto_nuclear_hw_text: 'Develop or neutralize nuclear programs. Nuclear weapons = ultimate deterrence, but at a heavy diplomatic cost.',

        // Leader select
        select_leader: 'SELECT YOUR LEADER',
        challenge: 'Challenge',
        difficulty: 'Difficulty',

        // Briefing
        classified: 'CLASSIFIED // TOP SECRET',
        assume_command: 'ASSUME COMMAND',

        // Nav
        nav_overview: 'Overview',
        nav_diplomacy: 'Diplomacy',
        nav_military: 'Military',
        nav_intelligence: 'Intel',
        nav_nuclear: 'Nuclear',
        nav_budget: 'Budget',
        nav_domestic: 'Domestic',
        end_turn: 'End Turn',

        // Tab headers
        tab_overview: '🗺️ Regional Overview',
        tab_diplomacy: '🤝 Diplomacy',
        tab_military: '⚔️ Military',
        tab_intelligence: '🕵️ Intelligence',
        tab_nuclear: '☢️ Nuclear Program',
        tab_budget: '💰 Budget',
        tab_domestic: '🏛️ Domestic Affairs',

        // Overview
        active_threats: '🚨 Active Threats',
        critical: 'Critical',
        high: 'High',
        war: 'War',
        warning: 'Warning',
        stable: 'Stable',
        at_war: '⚔️ At War',
        no_threats: 'No immediate threats',
        iran_nuke_threat: '☢️ Iran: {0}% to nuclear bomb',
        usa_attack_threat: '🇺🇸 USA threatens attack!',
        active_war_with: '⚔️ Active war with {0}',
        low_approval: '📊 Low public approval: {0}%',
        low_budget: '💰 Low budget: ${0}B',
        vision_danger: '🏗️ Vision 2030 at risk: {0}%',

        // Diplomacy
        alliance: '🤝 Alliance',
        friendly: '😊 Friendly',
        neutral_status: '😐 Neutral',
        hostile: '😠 Hostile',
        enemy: '🔥 Enemy',
        improve_relations: '🤝 Improve Relations ($0.5B)',
        worsen_relations: '😠 Worsen Relations',
        declare_war: '⚔️ Declare War',
        seek_ceasefire: '🕊️ Seek Ceasefire',
        military_op: '💥 Military Operation',
        airstrike: '✈️ Air Strike',
        army: 'Military',

        // Military
        current_forces: '🪖 Current Forces',
        incoming: 'incoming',
        total_military: '💪 Total Military Power',
        defense_level: '🛡️ Defense Level',
        procurement: '🛒 Weapons Procurement',
        available_budget: '💰 Available Budget',
        buy_1: 'Buy 1',
        buy_5: 'Buy 5',
        deployment: '📍 Deployment',
        active_fronts: 'Active fronts:',
        enemy_army: 'Enemy military',
        attack: '💥 Attack',
        airstrike_btn: '✈️ Air Strike',
        no_fronts: 'No active fronts. Use diplomacy to declare war.',

        // Intelligence
        intel_desc: 'Choose an operation and target country. Each operation costs money and carries risk of exposure.',
        risk_high: 'High Risk',
        risk_med: 'Medium Risk',
        risk_low: 'Low Risk',
        success_rate: 'Success',
        intel_reports: '📋 Intelligence Reports',

        // Nuclear
        nuclear_program_complete: '✅ Program complete - you have nuclear deterrence!',
        nuclear_advanced: '🔬 Advanced stage - near completion',
        nuclear_mid: '⚗️ Intermediate stage - enrichment progressing',
        nuclear_early: '🏗️ Early stage - building infrastructure',
        nuclear_planning: '📋 Initial planning stage',
        fund_nuclear: '💰 Fund Nuclear Research',
        fund_nuclear_desc: 'Invest in the nuclear program. Higher investment = higher chance of progress.',
        fund_basic: '$1B - Basic',
        fund_accelerated: '$3B - Accelerated',
        fund_max: '$5B - Maximum',
        iran_nuclear_title: '🇮🇷 Iranian Nuclear Program',
        iran_nuke_complete: '☢️ Warning! Iran has achieved nuclear weapons!',
        iran_nuke_critical: '🔴 Critical danger - months from a bomb!',
        iran_nuke_progress: '🟡 Significant progress',
        iran_nuke_early: '🟢 Early stages',
        nuclear_sabotage: '💻 Nuclear Sabotage ($2B)',
        strike_nuclear: '✈️ Strike Nuclear Facilities',

        // Budget
        budget_summary: '💰 Budget Summary',
        current_budget: '💵 Current Budget',
        monthly_income: '📈 Monthly Income',
        us_aid: '🇺🇸 US Aid (annual)',
        month_label: '/month',
        oil_revenue: '🛢️ Oil Revenue',
        war_costs: '⚔️ War Costs',
        net_monthly: '📊 Net Monthly Balance',

        // Domestic
        public_approval: '📊 Public Approval',
        internal_stability: '🏛️ Internal Stability',
        military_power: '⚔️ Military Power',
        defense: '🛡️ Defense Level',
        us_relations: '🇺🇸 US Relations',
        domestic_actions: '🏛️ Domestic Actions',
        rally: '📢 Support Rally ($1B, +Approval)',
        invest_infra: '🏗️ Infrastructure Investment ($2B, +Stability)',
        security: '🔒 Boost Internal Security ($1.5B, +Stability -Approval)',

        // Game over
        gameover_victory: '🏆 Victory!',
        gameover_total_victory: '🏆🏆 Total Victory!',
        gameover_iran_collapsed: '🏆 Iran Collapsed!',
        gameover_draw: '🤝 Draw',
        gameover_defeat: '❌ Defeat',
        gameover_assassinated: '💀 Assassinated!',
        gameover_voted_out: '📉 Removed from Office!',
        gameover_collapse: '🏚️ State Collapsed!',
        gameover_bankrupt: '💸 Bankruptcy!',
        gameover_nuked: '☢️ Nuclear Attack!',
        gameover_default: '🏁 Game Over',
        gameover_msg_victory: 'You completed your term successfully. Final score: {0}/100',
        gameover_msg_total_victory: 'Iran completely neutralized! Nuclear program destroyed and military weakened.',
        gameover_msg_iran_collapsed: 'The Iranian regime collapsed under internal and external pressure. The Middle East is changing.',
        gameover_msg_draw: 'Your term ended without a decisive outcome. Score: {0}/100. The region remains unstable.',
        gameover_msg_defeat: 'You failed to achieve your objectives. Score: {0}/100',
        gameover_msg_assassinated: 'An assassination attempt succeeded. Your term ended in tragedy.',
        gameover_msg_voted_out: 'Public approval dropped to zero. You were removed from office.',
        gameover_msg_collapse: 'Internal stability collapsed. The nation is in chaos.',
        gameover_msg_bankrupt: 'The budget ran out. The nation is bankrupt.',
        gameover_msg_nuked: 'Iran used nuclear weapons. Catastrophe.',
        gameover_msg_default: 'The game has ended.',
        new_game: 'NEW GAME',

        // Topbar
        turn_of: 'Turn {0} of {1}',
        news_label: '⚡ News',

        // Engine messages
        budget_insufficient: 'Insufficient budget',
        already_at_war: 'Already at war',
        not_at_war: 'Not at war',
        relations_improved: 'Relations with {0} improved by {1}',
        relations_worsened: 'Relations with {0} worsened by {1}',
        war_declared: 'War declared on {0}!',
        ceasefire_accepted: 'Ceasefire agreement with {0}!',
        ceasefire_rejected: '{0} rejects peace offer',
        units_ordered: 'Ordered {0} {1}. Delivery: {2} months',
        not_enough_aircraft: 'Not enough fighter jets',
        attack_success: 'Military operation against {0} succeeded! Enemy military damaged.',
        attack_failed: 'Military operation against {0} failed. Casualties suffered.',
        airstrike_success: 'Air strike on {0} succeeded!',
        airstrike_failed: 'Air strike failed. Aircraft shot down.',
        nuclear_complete: 'Nuclear program complete',
        nuclear_advance: 'Nuclear progress! +{0}% (total {1}%)',
        nuclear_no_progress: 'Research continues. No breakthrough this month.',
        op_failed: 'Operation {0} failed.',
        op_exposed: '⚠️ Operation exposed! Relations worsened.',
        spy_success: 'Espionage succeeded! {0}',
        sabotage_success: 'Sabotage succeeded! {0} military damaged.',
        cyber_success: 'Cyber attack succeeded! {0} infrastructure damaged.',
        rebels_success: 'Rebel funding succeeded! Instability in {0} growing.',
        assassination_success: 'Targeted assassination succeeded! Military leader of {0} eliminated.',
        propaganda_success: 'Propaganda campaign succeeded! Protests in {0}.',
        nuclear_sabotage_success: 'Nuclear sabotage succeeded! Iranian nuclear program severely damaged!',

        // Turn results
        war_cost: '💸 War cost with {0}: -$2B',
        units_arrived: '📦 {0}: {1} units arrived!',
        iran_nuke_complete_warning: '☢️ Critical warning: Iran has completed a nuclear bomb!',
        budget_deficit: '⚠️ Budget deficit! Stability and approval declining.',
        assassination_success_turn: '💀 Assassination attempt succeeded!',
        assassination_failed_turn: '🎯 Assassination attempt failed! Wave of sympathy.',
        iran_missiles: '🚀 Iran fired {0} missiles. {1} intercepted. Damage: ${2}B',
        houthi_intercepted: '🛡️ Houthis launched drones. Air defenses intercepted.',
        houthi_hit: '💥 Houthis hit oil facility! Damage: $1B',
        hezbollah_rockets: '🚀 Hezbollah fired {0} rockets. Iron Dome intercepted {1}%.',
        us_concern: '🇺🇸 US expresses concern over number of fronts.',
        country_collapsed: '🏴 {0} collapsed! Government fell.',
        monthly_summary: '📋 Monthly Summary - {0} {1}',
        continue_btn: '✅ Continue',
        chose: 'You chose: {0}',

        // Domestic actions
        rally_success: 'Support rally succeeded! +8 public approval',
        invest_success: 'Infrastructure investment! +10 stability',
        security_success: 'Internal security boosted! +8 stability, -3 approval',

        // Intel reports
        intel_report_1: '{0}: Military level {1}, stability {2}%',
        intel_report_2: '{0}: Planning new weapons procurement',
        intel_report_3: '{0}: Internal tensions rising, stability {1}%',
        intel_report_iran: 'Iran: Nuclear program at {0}% progress',

        // Leader card stats
        stat_budget: '💰 Budget',
        stat_army: '⚔️ Army',
        stat_nuclear: '☢️ Nuclear',
        stat_intel: '🕵️ Intelligence',
    }
};
