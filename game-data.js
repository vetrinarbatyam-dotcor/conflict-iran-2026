/* ========================================
   CONFLICT 2026 - GAME DATA
   All countries, units, events, briefings
   ======================================== */

const GAME_DATA = {
    months: ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'],
    monthsEn: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    startMonth: 2, // March (0-indexed)
    startYear: 2026,

    // ---- LEADERS ----
    leaders: {
        israel: {
            flag: '🇮🇱',
            title: 'ראש ממשלת ישראל',
            titleEn: 'Prime Minister of Israel',
            intelAgency: 'מוסד / Mossad',
            currency: 'USD',
            startBudget: 18,
            monthlyIncome: 1.5,
            usAid: 3.8, // annual
            startApproval: 62,
            startMilitary: 7,
            nuclearProgress: 100, // Israel already has nukes
            color: '#3b82f6'
        },
        saudi: {
            flag: '🇸🇦',
            title: 'יורש העצר של ערב הסעודית',
            titleEn: 'Crown Prince of Saudi Arabia',
            intelAgency: 'GIP / המודיעין הסעודי',
            currency: 'USD',
            startBudget: 50,
            monthlyIncome: 4.0,
            usAid: 0,
            oilRevenue: 3.5,
            startApproval: 70,
            startMilitary: 5,
            nuclearProgress: 15, // Early stages
            vision2030: 45, // Progress percentage
            color: '#22c55e'
        }
    },

    // ---- COUNTRIES ----
    countries: {
        iran: {
            id: 'iran', flag: '🇮🇷', name: 'איראן', nameEn: 'Iran',
            military: 8, nuclear: 85, stability: 55,
            mapPos: { top: '35%', left: '70%' },
            isEnemy: true
        },
        usa: {
            id: 'usa', flag: '🇺🇸', name: 'ארה"ב', nameEn: 'USA',
            military: 50, nuclear: 100, stability: 75,
            mapPos: { top: '10%', left: '10%' },
            isSuperpower: true
        },
        russia: {
            id: 'russia', flag: '🇷🇺', name: 'רוסיה', nameEn: 'Russia',
            military: 30, nuclear: 100, stability: 60,
            mapPos: { top: '10%', left: '50%' },
            isSuperpower: true
        },
        china: {
            id: 'china', flag: '🇨🇳', name: 'סין', nameEn: 'China',
            military: 35, nuclear: 100, stability: 80,
            mapPos: { top: '15%', left: '80%' },
            isSuperpower: true
        },
        syria: {
            id: 'syria', flag: '🇸🇾', name: 'סוריה', nameEn: 'Syria',
            military: 3, nuclear: 0, stability: 30,
            mapPos: { top: '30%', left: '42%' }
        },
        lebanon: {
            id: 'lebanon', flag: '🇱🇧', name: 'לבנון/חיזבאללה', nameEn: 'Lebanon/Hezbollah',
            military: 2, nuclear: 0, stability: 25,
            mapPos: { top: '28%', left: '38%' }
        },
        iraq: {
            id: 'iraq', flag: '🇮🇶', name: 'עיראק', nameEn: 'Iraq',
            military: 4, nuclear: 0, stability: 35,
            mapPos: { top: '38%', left: '55%' }
        },
        turkey: {
            id: 'turkey', flag: '🇹🇷', name: 'טורקיה', nameEn: 'Turkey',
            military: 7, nuclear: 0, stability: 55,
            mapPos: { top: '20%', left: '40%' }
        },
        egypt: {
            id: 'egypt', flag: '🇪🇬', name: 'מצרים', nameEn: 'Egypt',
            military: 6, nuclear: 0, stability: 50,
            mapPos: { top: '55%', left: '30%' }
        },
        jordan: {
            id: 'jordan', flag: '🇯🇴', name: 'ירדן', nameEn: 'Jordan',
            military: 2, nuclear: 0, stability: 60,
            mapPos: { top: '45%', left: '38%' }
        },
        uae: {
            id: 'uae', flag: '🇦🇪', name: 'איחוד האמירויות', nameEn: 'UAE',
            military: 3, nuclear: 0, stability: 80,
            mapPos: { top: '55%', left: '65%' }
        },
        yemen: {
            id: 'yemen', flag: '🇾🇪', name: 'תימן/חות\'ים', nameEn: 'Yemen/Houthis',
            military: 2, nuclear: 0, stability: 15,
            mapPos: { top: '70%', left: '55%' }
        },
        qatar: {
            id: 'qatar', flag: '🇶🇦', name: 'קטאר', nameEn: 'Qatar',
            military: 1, nuclear: 0, stability: 75,
            mapPos: { top: '50%', left: '60%' }
        },
        palestine: {
            id: 'palestine', flag: '🇵🇸', name: 'פלסטין/חמאס', nameEn: 'Palestine/Hamas',
            military: 1, nuclear: 0, stability: 20,
            mapPos: { top: '42%', left: '33%' }
        }
    },

    // ---- STARTING RELATIONS (per leader) ----
    startRelations: {
        israel: {
            iran: -90, usa: 75, russia: 10, china: 15, syria: -60,
            lebanon: -80, iraq: -30, turkey: -20, egypt: 40,
            jordan: 50, uae: 55, yemen: -50, qatar: 0, palestine: -70
        },
        saudi: {
            iran: -50, usa: 60, russia: 20, china: 40, syria: -20,
            lebanon: -10, iraq: 20, turkey: 30, egypt: 60,
            jordan: 65, uae: 80, yemen: -70, qatar: 30, palestine: 10
        }
    },

    // ---- MILITARY UNITS ----
    units: {
        infantry: { name: 'חטיבות רגלים', nameEn: 'Infantry Brigades', icon: '🪖', cost: 0.5, power: 2, delivery: 1 },
        tanks: { name: 'טנקים', nameEn: 'Tanks (x100)', icon: '🛡️', cost: 1.0, power: 4, delivery: 1 },
        aircraft: { name: 'מטוסי קרב', nameEn: 'Fighter Jets (x10)', icon: '✈️', cost: 2.0, power: 5, delivery: 2 },
        sam: { name: 'מערכות נ"מ', nameEn: 'SAM Batteries', icon: '🚀', cost: 1.5, power: 3, delivery: 1 },
        missiles: { name: 'טילים בליסטיים', nameEn: 'Ballistic Missiles', icon: '🎯', cost: 2.5, power: 6, delivery: 2 },
        navy: { name: 'ספינות קרב', nameEn: 'Naval Vessels', icon: '🚢', cost: 3.0, power: 4, delivery: 3 },
        drones: { name: 'כטב"מ', nameEn: 'Combat Drones (x20)', icon: '🤖', cost: 1.0, power: 3, delivery: 1 },
        cyber: { name: 'יחידות סייבר', nameEn: 'Cyber Units', icon: '💻', cost: 0.8, power: 2, delivery: 0 },
        specialForces: { name: 'כוחות מיוחדים', nameEn: 'Special Forces', icon: '🎖️', cost: 1.2, power: 5, delivery: 1 },
        ironDome: { name: 'כיפת ברזל', nameEn: 'Iron Dome Batteries', icon: '🛡️', cost: 2.0, power: 0, defense: 8, delivery: 2 }
    },

    // ---- STARTING FORCES ----
    startForces: {
        israel: { infantry: 7, tanks: 15, aircraft: 8, sam: 5, missiles: 4, navy: 2, drones: 10, cyber: 3, specialForces: 3, ironDome: 10 },
        saudi: { infantry: 5, tanks: 10, aircraft: 6, sam: 3, missiles: 6, navy: 3, drones: 5, cyber: 1, specialForces: 2, ironDome: 2 }
    },

    // ---- INTELLIGENCE OPERATIONS ----
    intelOps: {
        spy: {
            name: 'ריגול', nameEn: 'Espionage',
            desc: 'איסוף מודיעין על מדינת יעד - גרעין, צבא, יציבות פנימית',
            cost: 0.3, risk: 'low', successRate: 75
        },
        sabotage: {
            name: 'חבלה', nameEn: 'Sabotage',
            desc: 'חבלה במתקנים צבאיים או גרעיניים של האויב',
            cost: 0.8, risk: 'med', successRate: 55
        },
        cyberAttack: {
            name: 'מתקפת סייבר', nameEn: 'Cyber Attack',
            desc: 'תקיפת תשתיות קריטיות - רשתות חשמל, מערכות שליטה',
            cost: 0.5, risk: 'low', successRate: 65
        },
        fundRebels: {
            name: 'מימון מורדים', nameEn: 'Fund Rebels',
            desc: 'תמיכה במורדים וקבוצות אופוזיציה במדינת יעד',
            cost: 1.0, risk: 'med', successRate: 60
        },
        assassination: {
            name: 'חיסול ממוקד', nameEn: 'Targeted Assassination',
            desc: 'חיסול מנהיג צבאי או מדיני של האויב',
            cost: 1.5, risk: 'high', successRate: 40
        },
        propaganda: {
            name: 'לוחמה פסיכולוגית', nameEn: 'Propaganda Campaign',
            desc: 'הפצת תעמולה לערעור יציבות פנימית של האויב',
            cost: 0.4, risk: 'low', successRate: 70
        },
        nuclearSabotage: {
            name: 'חבלה גרעינית', nameEn: 'Nuclear Sabotage',
            desc: 'סטוקסנט 2.0 - מתקפת סייבר על צנטריפוגות',
            cost: 2.0, risk: 'high', successRate: 35
        }
    },

    // ---- BRIEFINGS ----
    briefings: {
        israel: {
            title: '🇮🇱 תדריך מודיעין - ראש ממשלת ישראל',
            content: `
                <p><strong>תאריך: מרץ 2026</strong></p>
                <p>אדוני ראש הממשלה, המצב הביטחוני חמור מתמיד.</p>
                <p><strong>☢️ הגרעין האיראני:</strong> המודיעין מעריך שאיראן הגיעה להעשרה של 90% ונמצאת חודשים ספורים מפצצה גרעינית מבצעית.</p>
                <p><strong>⚔️ מבצע Epic Fury:</strong> ארה"ב וישראל תקפו מתקנים באיראן בפברואר 2026. איראן נשבעה נקמה ותקפה בטילים ומל"טים מטרות בישראל, ירדן וסעודיה.</p>
                <p><strong>🚀 חזית הצפון:</strong> חיזבאללה מאיים בטילים מדויקים. סוריה לא יציבה.</p>
                <p><strong>🇵🇸 החזית הפלסטינית:</strong> חמאס ממשיך בלחימה מעזה. המצב ביהודה ושומרון רגיש.</p>
                <p><strong>🇺🇸 ברית ארה"ב:</strong> ממשל טראמפ תומך אך דורש תוצאות. הקונגרס שוקל סיוע נוסף.</p>
                <p>המשימה שלך: נטרל את האיום הגרעיני האיראני, הגן מפני פרוקסים, שמור על יציבות פנימית ועל הברית עם ארה"ב.</p>
            `
        },
        saudi: {
            title: '🇸🇦 תדריך מודיעין - יורש העצר מוחמד בן סלמאן',
            content: `
                <p><strong>תאריך: מרץ 2026</strong></p>
                <p>הוד מעלתך, הממלכה ניצבת בפני אתגרים חסרי תקדים.</p>
                <p><strong>🇮🇷 האיום האיראני:</strong> איראן תקפה מתקנים בסעודיה עם מל"טים בפברואר 2026. שגרירות ארה"ב בריאד הותקפה. טהרן מאיימת על תשתיות נפט.</p>
                <p><strong>🇾🇪 החות'ים:</strong> תימן נשלטת בצפון על ידי החות'ים הנתמכים באיראן. הם ממשיכים לירות טילים ומל"טים לעבר ערי הממלכה ולתקוף ספינות בים האדום.</p>
                <p><strong>💰 Vision 2030:</strong> תוכנית הטרנספורמציה הכלכלית חיונית לעתיד הממלכה. מתחי המלחמה מסכנים השקעות זרות ופרויקטים כמו NEOM.</p>
                <p><strong>☢️ גרעין:</strong> הממלכה שוקלת פיתוח תוכנית גרעינית עצמאית כהרתעה מול איראן.</p>
                <p><strong>⚖️ איזון מעצמות:</strong> ארה"ב, סין ורוסיה מתחרות על השפעה. הממלכה חייבת לנווט בזהירות.</p>
                <p>המשימה שלך: הגן על הממלכה, בלום את איראן והחות'ים, קדם את Vision 2030, ושמור על איזון בין המעצמות.</p>
            `
        }
    },

    // ---- EVENTS ----
    events: {
        // Events that can trigger for both leaders
        common: [
            {
                id: 'iran_nuke_advance',
                title: '☢️ התקדמות גרעינית איראנית',
                text: 'דו"ח מודיעיני חדש מגלה שאיראן הגיעה לשלב חדש בהעשרת אורניום. הערכה: עוד 3-6 חודשים לפצצה.',
                month: 1, // relative to game start
                choices: [
                    { text: '💣 תקוף מתקנים גרעיניים', effect: { iranRelation: -30, usRelation: 5, approval: 10, military: -1, budget: -5 } },
                    { text: '🕵️ הגבר ריגול וחבלה', effect: { budget: -2, iranNuclear: -10 } },
                    { text: '🤝 דרוש סנקציות דרך האו"ם', effect: { iranRelation: -10, usRelation: 10 } },
                    { text: '⏳ המשך מעקב', effect: { iranNuclear: 10 } }
                ]
            },
            {
                id: 'iran_missile_attack',
                title: '🚀 מתקפת טילים איראנית!',
                text: 'איראן שיגרה גל טילים בליסטיים לעבר מטרות במדינתך. מערכות ההגנה יירטו חלק.',
                month: 2,
                choices: [
                    { text: '⚔️ תקיפת תגמול מיידית', effect: { iranRelation: -20, approval: 15, military: -1, budget: -3 } },
                    { text: '🛡️ חזק הגנות ודחה תגובה', effect: { approval: -5, budget: -2 } },
                    { text: '📢 פנה למועצת הביטחון', effect: { usRelation: 5, iranRelation: -5 } }
                ]
            },
            {
                id: 'us_pressure',
                title: '🇺🇸 לחץ אמריקאי',
                text: 'הנשיא האמריקאי דורש הסדר אזורי. ארה"ב מאיימת לצמצם סיוע אם לא תהיה התקדמות דיפלומטית.',
                month: 4,
                choices: [
                    { text: '🤝 קבל דרישות', effect: { usRelation: 15, approval: -10 } },
                    { text: '🗣️ משא ומתן', effect: { usRelation: 5, budget: -1 } },
                    { text: '✋ סרב בנימוס', effect: { usRelation: -15, approval: 5 } }
                ]
            },
            {
                id: 'oil_crisis',
                title: '🛢️ משבר נפט',
                text: 'התקפות על מתקני נפט במפרץ גרמו לזינוק חד במחירי הנפט. השווקים הגלובליים בפאניקה.',
                month: 3,
                choices: [
                    { text: '⚓ שלח חיל הים להגן על מסלולי שיט', effect: { budget: -2, military: -1, approval: 5 } },
                    { text: '📞 תאם עם ארה"ב סיור משותף', effect: { usRelation: 10, budget: -1 } },
                    { text: '💰 נצל את עליית המחירים', effect: { budget: 3, approval: -5 } }
                ]
            },
            {
                id: 'un_resolution',
                title: '🏛️ החלטת האו"ם',
                text: 'מועצת הביטחון מצביעה על החלטה להטלת סנקציות חדשות על איראן. רוסיה וסין מאיימות בווטו.',
                month: 5,
                choices: [
                    { text: '📢 לובי אגרסיבי בעד', effect: { usRelation: 5, russiaRelation: -10, chinaRelation: -10, iranRelation: -15 } },
                    { text: '🤫 פעל מאחורי הקלעים', effect: { budget: -1, iranRelation: -5 } },
                    { text: '⏳ חכה לתוצאות', effect: {} }
                ]
            },
            {
                id: 'cyber_war',
                title: '💻 מתקפת סייבר',
                text: 'האקרים איראניים תקפו תשתיות קריטיות - רשתות חשמל ומערכות בנקאיות הושבתו לשעות.',
                month: 6,
                choices: [
                    { text: '💻 תקיפת סייבר נגדית', effect: { iranRelation: -10, budget: -1 } },
                    { text: '🛡️ חזק הגנות סייבר', effect: { budget: -2 } },
                    { text: '📢 גנה פומבית', effect: { usRelation: 5 } }
                ]
            },
            {
                id: 'china_offer',
                title: '🇨🇳 הצעה סינית',
                text: 'סין מציעה עסקת נשק ושיתוף פעולה כלכלי בתמורה לגישה לנמלים אסטרטגיים.',
                month: 7,
                choices: [
                    { text: '🤝 קבל את ההצעה', effect: { chinaRelation: 25, usRelation: -20, budget: 5 } },
                    { text: '🗣️ משא ומתן מוגבל', effect: { chinaRelation: 10, usRelation: -5, budget: 2 } },
                    { text: '✋ סרב', effect: { chinaRelation: -10, usRelation: 10 } }
                ]
            },
            {
                id: 'russia_mediation',
                title: '🇷🇺 תיווך רוסי',
                text: 'רוסיה מציעה לתווך בין מדינתך לאיראן. פוטין מזמין לפגישה בקרמלין.',
                month: 8,
                choices: [
                    { text: '✈️ קבל הזמנה', effect: { russiaRelation: 15, iranRelation: 10, usRelation: -10 } },
                    { text: '📞 שלח שליח', effect: { russiaRelation: 5, iranRelation: 5 } },
                    { text: '✋ סרב', effect: { russiaRelation: -15, usRelation: 5 } }
                ]
            }
        ],

        // Israel-specific events
        israel: [
            {
                id: 'hezbollah_rockets',
                title: '🚀 רקטות מלבנון!',
                text: 'חיזבאללה שיגר מטח טילים מדויקים לעבר חיפה ותל אביב. כיפת ברזל יירטה 90%.',
                month: 1,
                choices: [
                    { text: '⚔️ מבצע קרקעי בלבנון', effect: { lebanonRelation: -30, approval: 15, military: -2, budget: -5 } },
                    { text: '✈️ תקיפה אווירית מוגבלת', effect: { lebanonRelation: -15, approval: 10, budget: -2 } },
                    { text: '🛡️ הגבר יירוט והרתעה', effect: { approval: -5, budget: -3 } }
                ]
            },
            {
                id: 'intifada',
                title: '🇵🇸 גל טרור',
                text: 'גל פיגועים בערים ישראליות. מחאות אלימות בגדה המערבית. הלחץ הבינלאומי גובר.',
                month: 3,
                choices: [
                    { text: '🔒 עוצר וסגר מלא', effect: { palestineRelation: -20, approval: 5, usRelation: -5 } },
                    { text: '⚔️ מבצע צבאי ממוקד', effect: { palestineRelation: -15, approval: 10, budget: -2 } },
                    { text: '🤝 שיחות עם הרשות', effect: { palestineRelation: 10, approval: -10, usRelation: 10 } }
                ]
            },
            {
                id: 'abraham_accords',
                title: '🤝 הרחבת הסכמי אברהם',
                text: 'סעודיה רומזת לנורמליזציה עם ישראל. ארה"ב מקדמת. האם תקבל את התנאים?',
                month: 6,
                choices: [
                    { text: '🤝 קבל תנאים כולל ויתורים פלסטיניים', effect: { approval: -15, usRelation: 20, budget: 3 } },
                    { text: '🗣️ משא ומתן קשוח', effect: { usRelation: 5 } },
                    { text: '✋ סרב לתנאים', effect: { approval: 10, usRelation: -15 } }
                ]
            },
            {
                id: 'iran_proxy_attack',
                title: '💥 התקפת פרוקסי',
                text: 'מיליציות שיעיות מעיראק שיגרו מל"טים תופת לעבר בסיס צבאי ישראלי בגולן.',
                month: 5,
                choices: [
                    { text: '✈️ תקוף בסיסי מיליציה בעיראק', effect: { iraqRelation: -20, iranRelation: -10, approval: 10 } },
                    { text: '🕵️ מבצע מודיעיני חשאי', effect: { budget: -1 } },
                    { text: '📢 גינוי ודרישה מעיראק', effect: { iraqRelation: -5 } }
                ]
            }
        ],

        // Saudi-specific events
        saudi: [
            {
                id: 'houthi_attack',
                title: '🚀 התקפת חות\'ים!',
                text: 'החות\'ים שיגרו טילים בליסטיים ומל"טים לעבר מתקני ארמקו בדמאם. נזק למתקני נפט.',
                month: 1,
                choices: [
                    { text: '⚔️ מבצע אווירי ביתמן', effect: { yemenRelation: -30, approval: 10, budget: -4, oilDamage: true } },
                    { text: '🛡️ חזק הגנות + Patriot', effect: { budget: -3, usRelation: 5 } },
                    { text: '📞 דרוש הפסקת אש', effect: { yemenRelation: 5, approval: -5 } }
                ]
            },
            {
                id: 'neom_crisis',
                title: '🏗️ משבר NEOM',
                text: 'משקיעים זרים מושכים כסף מפרויקט NEOM בגלל חוסר יציבות אזורית. Vision 2030 בסכנה.',
                month: 2,
                choices: [
                    { text: '💰 השקע תקציב ממשלתי', effect: { budget: -5, vision2030: 10, approval: 5 } },
                    { text: '🤝 הצע תנאים טובים יותר למשקיעים', effect: { budget: -2, vision2030: 5 } },
                    { text: '⏳ דחה לזמן יציב יותר', effect: { vision2030: -10, approval: -5 } }
                ]
            },
            {
                id: 'oil_weapon',
                title: '🛢️ נשק הנפט',
                text: 'יועצים מציעים להשתמש בייצור הנפט ככלי לחץ - הגבר ייצור להוריד מחירים ולפגוע באיראן.',
                month: 4,
                choices: [
                    { text: '🛢️ הגבר ייצור לפגוע באיראן', effect: { iranRelation: -15, budget: -2, approval: 5 } },
                    { text: '📉 צמצם ייצור להעלות מחירים', effect: { budget: 5, usRelation: -10 } },
                    { text: '⚖️ שמור על רמות נוכחיות', effect: {} }
                ]
            },
            {
                id: 'internal_dissent',
                title: '🏛️ אופוזיציה פנימית',
                text: 'אנשי דת בכירים מתנגדים לרפורמות. יש רמזים לקנוניה בתוך המשפחה המלכותית.',
                month: 5,
                choices: [
                    { text: '🔒 מעצר מתנגדים', effect: { approval: -10, stability: -5, usRelation: -10 } },
                    { text: '🤝 דיאלוג ופשרות', effect: { approval: 5, vision2030: -5 } },
                    { text: '🕵️ מעקב חשאי', effect: { budget: -1 } }
                ]
            },
            {
                id: 'red_sea_crisis',
                title: '⚓ משבר ים סוף',
                text: 'החות\'ים מגבירים תקיפות ספינות בים סוף. הסחר הבינלאומי מושפע, לחץ על הממלכה לפעול.',
                month: 3,
                choices: [
                    { text: '⚓ מבצע ימי משולב עם ארה"ב', effect: { usRelation: 15, yemenRelation: -20, budget: -3, approval: 10 } },
                    { text: '🚢 סיור ימי סעודי עצמאי', effect: { approval: 15, budget: -4 } },
                    { text: '📞 משא ומתן דרך עומאן', effect: { yemenRelation: 10, approval: -5 } }
                ]
            },
            {
                id: 'normalization_israel',
                title: '🇮🇱 נורמליזציה עם ישראל?',
                text: 'ארה"ב לוחצת על הסכם נורמליזציה עם ישראל. התנאי: פתרון פלסטיני. הרחוב הערבי מתנגד.',
                month: 7,
                choices: [
                    { text: '🤝 חתום על הסכם', effect: { usRelation: 25, approval: -20, iranRelation: -15, budget: 5 } },
                    { text: '🗣️ משא ומתן על תנאים', effect: { usRelation: 10, approval: -5 } },
                    { text: '✋ דחה כרגע', effect: { usRelation: -15, approval: 10, iranRelation: 5 } }
                ]
            }
        ]
    },

    // ---- NEWS HEADLINES ----
    newsPool: {
        common: [
            'משבר מזון במזרח התיכון מחמיר | Food crisis worsens',
            'מחירי הנפט זינקו ב-15% | Oil prices surge 15%',
            'פליטים חוצים גבולות | Refugee crisis escalates',
            'האו"ם קורא לשיחות שלום | UN calls for peace talks',
            'רעידת אדמה באיראן | Earthquake hits Iran',
            'פיגוע באיסטנבול | Attack in Istanbul',
            'סערה דיפלומטית באו"ם | Diplomatic storm at UN',
            'רוסיה מתערבת בסוריה | Russia intervenes in Syria',
            'סין מגבירה נוכחות ימית | China increases naval presence',
            'מחאות באיראן | Protests erupt in Iran'
        ],
        israel: [
            'כיפת ברזל יירטה 95% מהרקטות | Iron Dome intercepts 95%',
            'צה"ל מגביר כוננות בצפון | IDF raises northern alert',
            'מפגינים בתל אביב | Protests in Tel Aviv',
            'סיוע אמריקאי חדש אושר | New US aid package approved',
            'עליה חדשה מצרפת | New immigration wave from France'
        ],
        saudi: [
            'NEOM: שלב חדש בבנייה | NEOM: New construction phase',
            'תיירות: שיא מבקרים | Tourism hits record numbers',
            'ארמקו: רווחים שיא | Aramco reports record profits',
            'סופת חול פוגעת בריאד | Sandstorm hits Riyadh',
            'הג\'ז 2026: מיליוני צליינים | Hajj 2026: Millions of pilgrims'
        ]
    }
};
