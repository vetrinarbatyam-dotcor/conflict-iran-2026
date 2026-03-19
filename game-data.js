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
        },
        iran: {
            flag: '🇮🇷',
            title: 'נשיא איראן',
            titleEn: 'President of Iran',
            intelAgency: 'VAJA / ואג\'ה',
            currency: 'USD',
            startBudget: 25,
            monthlyIncome: 2.0,
            oilRevenue: 2.0,
            startApproval: 55,
            startMilitary: 8,
            nuclearProgress: 85,
            color: '#ef4444'
        },
        usa: {
            flag: '🇺🇸',
            title: 'נשיא ארה"ב',
            titleEn: 'President of the United States',
            intelAgency: 'CIA / סי.איי.איי',
            currency: 'USD',
            startBudget: 100,
            monthlyIncome: 8.0,
            startApproval: 48,
            startMilitary: 50,
            nuclearProgress: 100,
            color: '#1d4ed8'
        },
        hezbollah: {
            flag: '🇱🇧',
            title: 'מנהיג חיזבאללה',
            titleEn: 'Leader of Hezbollah',
            intelAgency: 'מודיעין חיזבאללה',
            currency: 'USD',
            startBudget: 5,
            monthlyIncome: 0.5,
            iranAid: 1.0, // annual
            startApproval: 65,
            startMilitary: 2,
            nuclearProgress: 0,
            color: '#facc15'
        },
        turkey: {
            flag: '🇹🇷',
            title: 'נשיא טורקיה',
            titleEn: 'President of Turkey',
            intelAgency: 'MIT / מיט',
            currency: 'USD',
            startBudget: 30,
            monthlyIncome: 2.5,
            startApproval: 52,
            startMilitary: 7,
            nuclearProgress: 0,
            color: '#dc2626'
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
        },
        iran: {
            usa: -80, russia: 50, china: 60, syria: 70, lebanon: 80,
            iraq: 40, turkey: -10, egypt: -20, jordan: -30,
            uae: -40, yemen: 60, qatar: 20, palestine: 50
        },
        usa: {
            iran: -80, russia: -30, china: -20, syria: -40, lebanon: -50,
            iraq: 20, turkey: 40, egypt: 50, jordan: 60,
            uae: 70, yemen: -30, qatar: 40, palestine: -10
        },
        hezbollah: {
            iran: 90, usa: -90, russia: 40, china: 20, syria: 60,
            iraq: 30, turkey: -20, egypt: -30, jordan: -40,
            uae: -50, yemen: 50, qatar: 0, palestine: 70
        },
        turkey: {
            iran: -10, usa: 40, russia: -20, china: 30, syria: -50,
            lebanon: -20, iraq: -10, egypt: 20, jordan: 40,
            uae: 30, yemen: 0, qatar: 50, palestine: 30
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
        saudi: { infantry: 5, tanks: 10, aircraft: 6, sam: 3, missiles: 6, navy: 3, drones: 5, cyber: 1, specialForces: 2, ironDome: 2 },
        iran: { infantry: 8, tanks: 12, aircraft: 4, sam: 6, missiles: 10, navy: 2, drones: 8, cyber: 2, specialForces: 4, ironDome: 0 },
        usa: { infantry: 15, tanks: 20, aircraft: 20, sam: 10, missiles: 15, navy: 12, drones: 15, cyber: 8, specialForces: 8, ironDome: 5 },
        hezbollah: { infantry: 3, tanks: 1, aircraft: 0, sam: 2, missiles: 8, navy: 0, drones: 5, cyber: 1, specialForces: 3, ironDome: 0 },
        turkey: { infantry: 7, tanks: 10, aircraft: 6, sam: 4, missiles: 3, navy: 4, drones: 12, cyber: 2, specialForces: 3, ironDome: 1 }
    },

    // ---- INTELLIGENCE OPERATIONS ----
    intelOps: {
        spy: {
            name: 'ריגול', nameEn: 'Espionage',
            desc: 'איסוף מודיעין על מדינת יעד - גרעין, צבא, יציבות פנימית',
            descEn: 'Gather intelligence on a target country - nuclear, military, internal stability',
            cost: 0.3, risk: 'low', successRate: 75
        },
        sabotage: {
            name: 'חבלה', nameEn: 'Sabotage',
            desc: 'חבלה במתקנים צבאיים או גרעיניים של האויב',
            descEn: 'Sabotage enemy military or nuclear facilities',
            cost: 0.8, risk: 'med', successRate: 55
        },
        cyberAttack: {
            name: 'מתקפת סייבר', nameEn: 'Cyber Attack',
            desc: 'תקיפת תשתיות קריטיות - רשתות חשמל, מערכות שליטה',
            descEn: 'Attack critical infrastructure - power grids, control systems',
            cost: 0.5, risk: 'low', successRate: 65
        },
        fundRebels: {
            name: 'מימון מורדים', nameEn: 'Fund Rebels',
            desc: 'תמיכה במורדים וקבוצות אופוזיציה במדינת יעד',
            descEn: 'Support rebels and opposition groups in a target country',
            cost: 1.0, risk: 'med', successRate: 60
        },
        assassination: {
            name: 'חיסול ממוקד', nameEn: 'Targeted Assassination',
            desc: 'חיסול מנהיג צבאי או מדיני של האויב',
            descEn: 'Eliminate an enemy military or political leader',
            cost: 1.5, risk: 'high', successRate: 40
        },
        propaganda: {
            name: 'לוחמה פסיכולוגית', nameEn: 'Propaganda Campaign',
            desc: 'הפצת תעמולה לערעור יציבות פנימית של האויב',
            descEn: 'Spread propaganda to undermine the enemy\'s internal stability',
            cost: 0.4, risk: 'low', successRate: 70
        },
        nuclearSabotage: {
            name: 'חבלה גרעינית', nameEn: 'Nuclear Sabotage',
            desc: 'סטוקסנט 2.0 - מתקפת סייבר על צנטריפוגות',
            descEn: 'Stuxnet 2.0 - cyber attack on centrifuges',
            cost: 2.0, risk: 'high', successRate: 35
        }
    },

    // ---- BRIEFINGS ----
    briefings: {
        israel: {
            title: '🇮🇱 תדריך מודיעין - ראש ממשלת ישראל',
            titleEn: '🇮🇱 Intelligence Briefing - Prime Minister of Israel',
            content: `
                <p><strong>תאריך: מרץ 2026</strong></p>
                <p>אדוני ראש הממשלה, המצב הביטחוני חמור מתמיד.</p>
                <p><strong>☢️ הגרעין האיראני:</strong> המודיעין מעריך שאיראן הגיעה להעשרה של 90% ונמצאת חודשים ספורים מפצצה גרעינית מבצעית.</p>
                <p><strong>⚔️ מבצע Epic Fury:</strong> ארה"ב וישראל תקפו מתקנים באיראן בפברואר 2026. איראן נשבעה נקמה ותקפה בטילים ומל"טים מטרות בישראל, ירדן וסעודיה.</p>
                <p><strong>🚀 חזית הצפון:</strong> חיזבאללה מאיים בטילים מדויקים. סוריה לא יציבה.</p>
                <p><strong>🇵🇸 החזית הפלסטינית:</strong> חמאס ממשיך בלחימה מעזה. המצב ביהודה ושומרון רגיש.</p>
                <p><strong>🇺🇸 ברית ארה"ב:</strong> ממשל טראמפ תומך אך דורש תוצאות. הקונגרס שוקל סיוע נוסף.</p>
                <p>המשימה שלך: נטרל את האיום הגרעיני האיראני, הגן מפני פרוקסים, שמור על יציבות פנימית ועל הברית עם ארה"ב.</p>
            `,
            contentEn: `
                <p><strong>Date: March 2026</strong></p>
                <p>Mr. Prime Minister, the security situation is more dire than ever.</p>
                <p><strong>☢️ Iranian Nuclear Program:</strong> Intelligence estimates that Iran has reached 90% enrichment and is just months away from an operational nuclear weapon.</p>
                <p><strong>⚔️ Operation Epic Fury:</strong> The US and Israel struck facilities in Iran in February 2026. Iran vowed revenge and attacked targets in Israel, Jordan, and Saudi Arabia with missiles and drones.</p>
                <p><strong>🚀 Northern Front:</strong> Hezbollah threatens with precision missiles. Syria is unstable.</p>
                <p><strong>🇵🇸 Palestinian Front:</strong> Hamas continues fighting from Gaza. The situation in Judea and Samaria is sensitive.</p>
                <p><strong>🇺🇸 US Alliance:</strong> The Trump administration is supportive but demands results. Congress is considering additional aid.</p>
                <p>Your mission: Neutralize the Iranian nuclear threat, defend against proxies, maintain internal stability, and preserve the alliance with the US.</p>
            `
        },
        saudi: {
            title: '🇸🇦 תדריך מודיעין - יורש העצר מוחמד בן סלמאן',
            titleEn: '🇸🇦 Intelligence Briefing - Crown Prince Mohammed bin Salman',
            content: `
                <p><strong>תאריך: מרץ 2026</strong></p>
                <p>הוד מעלתך, הממלכה ניצבת בפני אתגרים חסרי תקדים.</p>
                <p><strong>🇮🇷 האיום האיראני:</strong> איראן תקפה מתקנים בסעודיה עם מל"טים בפברואר 2026. שגרירות ארה"ב בריאד הותקפה. טהרן מאיימת על תשתיות נפט.</p>
                <p><strong>🇾🇪 החות'ים:</strong> תימן נשלטת בצפון על ידי החות'ים הנתמכים באיראן. הם ממשיכים לירות טילים ומל"טים לעבר ערי הממלכה ולתקוף ספינות בים האדום.</p>
                <p><strong>💰 Vision 2030:</strong> תוכנית הטרנספורמציה הכלכלית חיונית לעתיד הממלכה. מתחי המלחמה מסכנים השקעות זרות ופרויקטים כמו NEOM.</p>
                <p><strong>☢️ גרעין:</strong> הממלכה שוקלת פיתוח תוכנית גרעינית עצמאית כהרתעה מול איראן.</p>
                <p><strong>⚖️ איזון מעצמות:</strong> ארה"ב, סין ורוסיה מתחרות על השפעה. הממלכה חייבת לנווט בזהירות.</p>
                <p>המשימה שלך: הגן על הממלכה, בלום את איראן והחות'ים, קדם את Vision 2030, ושמור על איזון בין המעצמות.</p>
            `,
            contentEn: `
                <p><strong>Date: March 2026</strong></p>
                <p>Your Royal Highness, the Kingdom faces unprecedented challenges.</p>
                <p><strong>🇮🇷 The Iranian Threat:</strong> Iran attacked facilities in Saudi Arabia with drones in February 2026. The US Embassy in Riyadh was attacked. Tehran threatens oil infrastructure.</p>
                <p><strong>🇾🇪 The Houthis:</strong> Northern Yemen is controlled by Iran-backed Houthis. They continue firing missiles and drones at Kingdom cities and attacking ships in the Red Sea.</p>
                <p><strong>💰 Vision 2030:</strong> The economic transformation plan is vital for the Kingdom's future. War tensions endanger foreign investments and projects like NEOM.</p>
                <p><strong>☢️ Nuclear:</strong> The Kingdom is considering developing an independent nuclear program as a deterrent against Iran.</p>
                <p><strong>⚖️ Balancing Superpowers:</strong> The US, China, and Russia compete for influence. The Kingdom must navigate carefully.</p>
                <p>Your mission: Defend the Kingdom, contain Iran and the Houthis, advance Vision 2030, and maintain balance between the superpowers.</p>
            `
        },
        iran: {
            title: '🇮🇷 תדריך מודיעין - נשיא איראן',
            titleEn: '🇮🇷 Intelligence Briefing - President of Iran',
            content: `
                <p><strong>תאריך: מרץ 2026</strong></p>
                <p>כבוד הנשיא, הרפובליקה האסלאמית ניצבת בפני רגע גורלי.</p>
                <p><strong>☢️ התוכנית הגרעינית:</strong> ההעשרה הגיעה ל-90%. אנחנו חודשים ספורים מפצצה מבצעית. ארה"ב וישראל מאיימות בתקיפה צבאית - יש להגן על המתקנים בכל מחיר.</p>
                <p><strong>🛡️ סנקציות:</strong> הסנקציות המערביות פוגעות בכלכלה. הנפט הוא קו החיים שלנו. יש למצוא דרכים לעקוף את המגבלות.</p>
                <p><strong>⚔️ ציר ההתנגדות:</strong> חיזבאללה, החות'ים וחמאס הם הזרועות שלנו באזור. יש לספק להם נשק, מימון והכוונה כדי להרתיע את ישראל וארה"ב.</p>
                <p><strong>🏛️ מחאות פנימיות:</strong> האופוזיציה מארגנת הפגנות ברחובות. יש לשמור על יציבות פנימית מבלי לעורר גינוי בינלאומי נוסף.</p>
                <p><strong>🤝 ברית רוסיה-סין:</strong> שיתוף הפעולה עם מוסקבה ובייג'ינג חיוני. מכירות נפט, עסקאות נשק ותמיכה במועצת הביטחון.</p>
                <p>המשימה שלך: הגן על התוכנית הגרעינית, נהל את הפרוקסים, עמוד בסנקציות, דכא מחאות ושמור על הברית עם רוסיה וסין.</p>
            `,
            contentEn: `
                <p><strong>Date: March 2026</strong></p>
                <p>Mr. President, the Islamic Republic faces a fateful moment.</p>
                <p><strong>☢️ Nuclear Program:</strong> Enrichment has reached 90%. We are just months away from an operational weapon. The US and Israel threaten military strikes - the facilities must be protected at all costs.</p>
                <p><strong>🛡️ Sanctions:</strong> Western sanctions are hurting the economy. Oil is our lifeline. We must find ways to circumvent the restrictions.</p>
                <p><strong>⚔️ Axis of Resistance:</strong> Hezbollah, the Houthis, and Hamas are our arms in the region. We must supply them with weapons, funding, and guidance to deter Israel and the US.</p>
                <p><strong>🏛️ Internal Protests:</strong> The opposition is organizing street demonstrations. Internal stability must be maintained without provoking further international condemnation.</p>
                <p><strong>🤝 Russia-China Alliance:</strong> Cooperation with Moscow and Beijing is vital. Oil sales, arms deals, and support in the Security Council.</p>
                <p>Your mission: Protect the nuclear program, manage the proxies, withstand sanctions, suppress protests, and maintain the alliance with Russia and China.</p>
            `
        },
        usa: {
            title: '🇺🇸 תדריך מודיעין - נשיא ארה"ב',
            titleEn: '🇺🇸 Intelligence Briefing - President of the United States',
            content: `
                <p><strong>תאריך: מרץ 2026</strong></p>
                <p>אדוני הנשיא, המזרח התיכון דורש את תשומת לבך המלאה.</p>
                <p><strong>☢️ הגרעין האיראני:</strong> איראן על סף פצצה גרעינית. המודיעין מעריך 3-6 חודשים. כל האפשרויות על השולחן - דיפלומטיה, סנקציות, או פעולה צבאית.</p>
                <p><strong>🤝 בעלי ברית:</strong> ישראל וסעודיה דורשים פעולה נחרצת. מצרים וירדן מבקשים יציבות. ניהול הציפיות של בעלי הברית קריטי.</p>
                <p><strong>⚔️ אפשרויות צבאיות:</strong> קבוצת נושאות מטוסים במפרץ מוכנה לפעולה. אבל מלחמה נוספת במזרח התיכון תהיה יקרה פוליטית וכלכלית.</p>
                <p><strong>🏛️ הקונגרס:</strong> לחץ מהרפובליקנים לפעול בנחישות. הדמוקרטים חוששים ממלחמה. בחירות האמצע מתקרבות.</p>
                <p><strong>🗳️ שיקולי בחירות:</strong> כל החלטה במזרח התיכון משפיעה על סיכויי הבחירות. הציבור עייף ממלחמות אבל דורש ביטחון.</p>
                <p><strong>🇨🇳🇷🇺 תחרות מעצמות:</strong> סין ורוסיה מנסות להרחיב השפעה באזור. יש לשמור על הדומיננטיות האמריקאית.</p>
                <p>המשימה שלך: נטרל את האיום הגרעיני האיראני, שמור על בעלי ברית, נהל את הקונגרס, ושמור על יתרון מול סין ורוסיה.</p>
            `,
            contentEn: `
                <p><strong>Date: March 2026</strong></p>
                <p>Mr. President, the Middle East demands your full attention.</p>
                <p><strong>☢️ Iranian Nuclear Program:</strong> Iran is on the verge of a nuclear weapon. Intelligence estimates 3-6 months. All options are on the table - diplomacy, sanctions, or military action.</p>
                <p><strong>🤝 Allies:</strong> Israel and Saudi Arabia demand decisive action. Egypt and Jordan seek stability. Managing allies' expectations is critical.</p>
                <p><strong>⚔️ Military Options:</strong> An aircraft carrier group in the Gulf is ready for action. But another war in the Middle East would be costly politically and economically.</p>
                <p><strong>🏛️ Congress:</strong> Pressure from Republicans to act decisively. Democrats fear war. Midterm elections are approaching.</p>
                <p><strong>🗳️ Election Considerations:</strong> Every Middle East decision affects election prospects. The public is war-weary but demands security.</p>
                <p><strong>🇨🇳🇷🇺 Superpower Competition:</strong> China and Russia are trying to expand influence in the region. American dominance must be maintained.</p>
                <p>Your mission: Neutralize the Iranian nuclear threat, maintain allies, manage Congress, and maintain an advantage over China and Russia.</p>
            `
        },
        hezbollah: {
            title: '🇱🇧 מנהיג חיזבאללה',
            titleEn: '🇱🇧 Leader of Hezbollah',
            content: `
                <p><strong>תאריך: מרץ 2026</strong></p>
                <p>אח יקר, ההתנגדות ניצבת בפני מבחן היסטורי.</p>
                <p><strong>⚔️ המלחמה עם ישראל:</strong> הצפון בוער. ישראל מאיימת במבצע קרקעי בלבנון. יש להפעיל את מאגר הטילים המדויקים ולהרתיע את האויב הציוני.</p>
                <p><strong>🇮🇷 התמיכה האיראנית:</strong> טהרן היא עמוד השדרה שלנו. משלוחי נשק, מימון והכוונה חיוניים. יש לשמור על ציר האספקה דרך סוריה ועיראק.</p>
                <p><strong>🇱🇧 שליטה בלבנון:</strong> המצב הפוליטי בלבנון שברירי. יש לשמור על כוח פוליטי וצבאי כדי להבטיח את מעמדנו.</p>
                <p><strong>🚀 ארסנל הרקטות:</strong> יותר מ-100,000 רקטות וטילים, כולל טילים מדויקים שיכולים לפגוע בכל נקודה בישראל. זו ההרתעה שלנו.</p>
                <p><strong>🕳️ רשת המנהרות:</strong> המנהרות הן קו ההגנה שלנו. יש להרחיב ולחזק אותן מפני חדירה ישראלית.</p>
                <p><strong>✈️ תקיפות אוויריות:</strong> חיל האוויר הישראלי מבצע תקיפות יומיות. יש לפזר כוחות, להסוות ולחזק את ההגנה האווירית.</p>
                <p>המשימה שלך: לחם נגד ישראל, שמור על התמיכה האיראנית, שלוט בלבנון, ושרוד את התקיפות הישראליות.</p>
            `,
            contentEn: `
                <p><strong>Date: March 2026</strong></p>
                <p>Dear brother, the Resistance faces a historic test.</p>
                <p><strong>⚔️ War with Israel:</strong> The north is burning. Israel threatens a ground operation in Lebanon. We must deploy our precision missile arsenal and deter the Zionist enemy.</p>
                <p><strong>🇮🇷 Iranian Support:</strong> Tehran is our backbone. Arms shipments, funding, and guidance are vital. The supply route through Syria and Iraq must be maintained.</p>
                <p><strong>🇱🇧 Control of Lebanon:</strong> The political situation in Lebanon is fragile. Political and military power must be maintained to secure our position.</p>
                <p><strong>🚀 Rocket Arsenal:</strong> Over 100,000 rockets and missiles, including precision missiles that can hit any point in Israel. This is our deterrence.</p>
                <p><strong>🕳️ Tunnel Network:</strong> The tunnels are our line of defense. They must be expanded and reinforced against Israeli infiltration.</p>
                <p><strong>✈️ Airstrikes:</strong> The Israeli Air Force conducts daily strikes. Forces must be dispersed, concealed, and air defenses strengthened.</p>
                <p>Your mission: Fight against Israel, maintain Iranian support, control Lebanon, and survive Israeli strikes.</p>
            `
        },
        turkey: {
            title: '🇹🇷 תדריך מודיעין - נשיא טורקיה',
            titleEn: '🇹🇷 Intelligence Briefing - President of Turkey',
            content: `
                <p><strong>תאריך: מרץ 2026</strong></p>
                <p>אדוני הנשיא, טורקיה ניצבת בצומת דרכים אסטרטגי.</p>
                <p><strong>⚔️ האיום הכורדי:</strong> ה-PKK ממשיך בפיגועים בדרום-מזרח טורקיה. הכוחות הכורדיים בצפון סוריה מהווים איום על הביטחון הלאומי. יש לנטרל.</p>
                <p><strong>🏛️ נאט"ו:</strong> חברות בנאט"ו מספקת ערבויות ביטחוניות, אבל המערב לוחץ בנושאי זכויות אדם ומדיניות חוץ עצמאית. איזון עדין.</p>
                <p><strong>🇷🇺 רוסיה:</strong> היחסים עם מוסקבה מורכבים - עסקת ה-S400, האנרגיה הרוסית, אבל גם חיכוכים בסוריה ובקווקז.</p>
                <p><strong>🇸🇾 הגבול הסורי:</strong> מיליוני פליטים סורים בטורקיה. הכוחות שלנו בצפון סוריה מול אסד, הכורדים והרוסים.</p>
                <p><strong>💰 משבר כלכלי:</strong> הלירה הטורקית ממשיכה להיחלש. אינפלציה גבוהה. הציבור דורש שיפור כלכלי.</p>
                <p><strong>🤖 טכנולוגיית מל"טים:</strong> מל"טי Bayraktar הם כרטיס הביקור שלנו. ביקוש עולמי גובר. יצוא הנשק מחזק את מעמדנו.</p>
                <p>המשימה שלך: נטרל את האיום הכורדי, אזן בין נאט"ו לרוסיה, ייצב את הכלכלה, וחזק את מעמד טורקיה כמעצמה אזורית.</p>
            `,
            contentEn: `
                <p><strong>Date: March 2026</strong></p>
                <p>Mr. President, Turkey stands at a strategic crossroads.</p>
                <p><strong>⚔️ The Kurdish Threat:</strong> The PKK continues attacks in southeastern Turkey. Kurdish forces in northern Syria pose a threat to national security. They must be neutralized.</p>
                <p><strong>🏛️ NATO:</strong> NATO membership provides security guarantees, but the West pressures on human rights and independent foreign policy. A delicate balance.</p>
                <p><strong>🇷🇺 Russia:</strong> Relations with Moscow are complex - the S-400 deal, Russian energy, but also friction in Syria and the Caucasus.</p>
                <p><strong>🇸🇾 Syrian Border:</strong> Millions of Syrian refugees in Turkey. Our forces in northern Syria face Assad, the Kurds, and the Russians.</p>
                <p><strong>💰 Economic Crisis:</strong> The Turkish lira continues to weaken. High inflation. The public demands economic improvement.</p>
                <p><strong>🤖 Drone Technology:</strong> Bayraktar drones are our calling card. Global demand is growing. Arms exports strengthen our standing.</p>
                <p>Your mission: Neutralize the Kurdish threat, balance between NATO and Russia, stabilize the economy, and strengthen Turkey's position as a regional power.</p>
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
                titleEn: '☢️ Iranian Nuclear Advancement',
                text: 'דו"ח מודיעיני חדש מגלה שאיראן הגיעה לשלב חדש בהעשרת אורניום. הערכה: עוד 3-6 חודשים לפצצה.',
                textEn: 'A new intelligence report reveals that Iran has reached a new stage in uranium enrichment. Estimate: 3-6 months to a bomb.',
                month: 1, // relative to game start
                choices: [
                    { text: '💣 תקוף מתקנים גרעיניים', textEn: '💣 Strike nuclear facilities', effect: { iranRelation: -30, usRelation: 5, approval: 10, military: -1, budget: -5 } },
                    { text: '🕵️ הגבר ריגול וחבלה', textEn: '🕵️ Increase espionage and sabotage', effect: { budget: -2, iranNuclear: -10 } },
                    { text: '🤝 דרוש סנקציות דרך האו"ם', textEn: '🤝 Demand sanctions through the UN', effect: { iranRelation: -10, usRelation: 10 } },
                    { text: '⏳ המשך מעקב', textEn: '⏳ Continue monitoring', effect: { iranNuclear: 10 } }
                ]
            },
            {
                id: 'iran_missile_attack',
                title: '🚀 מתקפת טילים איראנית!',
                titleEn: '🚀 Iranian Missile Attack!',
                text: 'איראן שיגרה גל טילים בליסטיים לעבר מטרות במדינתך. מערכות ההגנה יירטו חלק.',
                textEn: 'Iran launched a wave of ballistic missiles at targets in your country. Defense systems intercepted some.',
                month: 2,
                choices: [
                    { text: '⚔️ תקיפת תגמול מיידית', textEn: '⚔️ Immediate retaliatory strike', effect: { iranRelation: -20, approval: 15, military: -1, budget: -3 } },
                    { text: '🛡️ חזק הגנות ודחה תגובה', textEn: '🛡️ Strengthen defenses and delay response', effect: { approval: -5, budget: -2 } },
                    { text: '📢 פנה למועצת הביטחון', textEn: '📢 Appeal to the Security Council', effect: { usRelation: 5, iranRelation: -5 } }
                ]
            },
            {
                id: 'us_pressure',
                title: '🇺🇸 לחץ אמריקאי',
                titleEn: '🇺🇸 American Pressure',
                text: 'הנשיא האמריקאי דורש הסדר אזורי. ארה"ב מאיימת לצמצם סיוע אם לא תהיה התקדמות דיפלומטית.',
                textEn: 'The American president demands a regional agreement. The US threatens to reduce aid if there is no diplomatic progress.',
                month: 4,
                choices: [
                    { text: '🤝 קבל דרישות', textEn: '🤝 Accept demands', effect: { usRelation: 15, approval: -10 } },
                    { text: '🗣️ משא ומתן', textEn: '🗣️ Negotiate', effect: { usRelation: 5, budget: -1 } },
                    { text: '✋ סרב בנימוס', textEn: '✋ Politely refuse', effect: { usRelation: -15, approval: 5 } }
                ]
            },
            {
                id: 'oil_crisis',
                title: '🛢️ משבר נפט',
                titleEn: '🛢️ Oil Crisis',
                text: 'התקפות על מתקני נפט במפרץ גרמו לזינוק חד במחירי הנפט. השווקים הגלובליים בפאניקה.',
                textEn: 'Attacks on oil facilities in the Gulf caused a sharp surge in oil prices. Global markets are in panic.',
                month: 3,
                choices: [
                    { text: '⚓ שלח חיל הים להגן על מסלולי שיט', textEn: '⚓ Send the navy to protect shipping lanes', effect: { budget: -2, military: -1, approval: 5 } },
                    { text: '📞 תאם עם ארה"ב סיור משותף', textEn: '📞 Coordinate a joint patrol with the US', effect: { usRelation: 10, budget: -1 } },
                    { text: '💰 נצל את עליית המחירים', textEn: '💰 Exploit the price surge', effect: { budget: 3, approval: -5 } }
                ]
            },
            {
                id: 'un_resolution',
                title: '🏛️ החלטת האו"ם',
                titleEn: '🏛️ UN Resolution',
                text: 'מועצת הביטחון מצביעה על החלטה להטלת סנקציות חדשות על איראן. רוסיה וסין מאיימות בווטו.',
                textEn: 'The Security Council votes on a resolution to impose new sanctions on Iran. Russia and China threaten a veto.',
                month: 5,
                choices: [
                    { text: '📢 לובי אגרסיבי בעד', textEn: '📢 Aggressive lobbying in favor', effect: { usRelation: 5, russiaRelation: -10, chinaRelation: -10, iranRelation: -15 } },
                    { text: '🤫 פעל מאחורי הקלעים', textEn: '🤫 Work behind the scenes', effect: { budget: -1, iranRelation: -5 } },
                    { text: '⏳ חכה לתוצאות', textEn: '⏳ Wait for results', effect: {} }
                ]
            },
            {
                id: 'cyber_war',
                title: '💻 מתקפת סייבר',
                titleEn: '💻 Cyber Attack',
                text: 'האקרים איראניים תקפו תשתיות קריטיות - רשתות חשמל ומערכות בנקאיות הושבתו לשעות.',
                textEn: 'Iranian hackers attacked critical infrastructure - power grids and banking systems were disrupted for hours.',
                month: 6,
                choices: [
                    { text: '💻 תקיפת סייבר נגדית', textEn: '💻 Counter cyber attack', effect: { iranRelation: -10, budget: -1 } },
                    { text: '🛡️ חזק הגנות סייבר', textEn: '🛡️ Strengthen cyber defenses', effect: { budget: -2 } },
                    { text: '📢 גנה פומבית', textEn: '📢 Public condemnation', effect: { usRelation: 5 } }
                ]
            },
            {
                id: 'china_offer',
                title: '🇨🇳 הצעה סינית',
                titleEn: '🇨🇳 Chinese Offer',
                text: 'סין מציעה עסקת נשק ושיתוף פעולה כלכלי בתמורה לגישה לנמלים אסטרטגיים.',
                textEn: 'China offers an arms deal and economic cooperation in exchange for access to strategic ports.',
                month: 7,
                choices: [
                    { text: '🤝 קבל את ההצעה', textEn: '🤝 Accept the offer', effect: { chinaRelation: 25, usRelation: -20, budget: 5 } },
                    { text: '🗣️ משא ומתן מוגבל', textEn: '🗣️ Limited negotiations', effect: { chinaRelation: 10, usRelation: -5, budget: 2 } },
                    { text: '✋ סרב', textEn: '✋ Refuse', effect: { chinaRelation: -10, usRelation: 10 } }
                ]
            },
            {
                id: 'russia_mediation',
                title: '🇷🇺 תיווך רוסי',
                titleEn: '🇷🇺 Russian Mediation',
                text: 'רוסיה מציעה לתווך בין מדינתך לאיראן. פוטין מזמין לפגישה בקרמלין.',
                textEn: 'Russia offers to mediate between your country and Iran. Putin invites you to a meeting at the Kremlin.',
                month: 8,
                choices: [
                    { text: '✈️ קבל הזמנה', textEn: '✈️ Accept the invitation', effect: { russiaRelation: 15, iranRelation: 10, usRelation: -10 } },
                    { text: '📞 שלח שליח', textEn: '📞 Send an envoy', effect: { russiaRelation: 5, iranRelation: 5 } },
                    { text: '✋ סרב', textEn: '✋ Refuse', effect: { russiaRelation: -15, usRelation: 5 } }
                ]
            }
        ],

        // Israel-specific events
        israel: [
            {
                id: 'hezbollah_rockets',
                title: '🚀 רקטות מלבנון!',
                titleEn: '🚀 Rockets from Lebanon!',
                text: 'חיזבאללה שיגר מטח טילים מדויקים לעבר חיפה ותל אביב. כיפת ברזל יירטה 90%.',
                textEn: 'Hezbollah launched a barrage of precision missiles toward Haifa and Tel Aviv. Iron Dome intercepted 90%.',
                month: 1,
                choices: [
                    { text: '⚔️ מבצע קרקעי בלבנון', textEn: '⚔️ Ground operation in Lebanon', effect: { lebanonRelation: -30, approval: 15, military: -2, budget: -5 } },
                    { text: '✈️ תקיפה אווירית מוגבלת', textEn: '✈️ Limited airstrike', effect: { lebanonRelation: -15, approval: 10, budget: -2 } },
                    { text: '🛡️ הגבר יירוט והרתעה', textEn: '🛡️ Increase interception and deterrence', effect: { approval: -5, budget: -3 } }
                ]
            },
            {
                id: 'intifada',
                title: '🇵🇸 גל טרור',
                titleEn: '🇵🇸 Wave of Terror',
                text: 'גל פיגועים בערים ישראליות. מחאות אלימות בגדה המערבית. הלחץ הבינלאומי גובר.',
                textEn: 'A wave of attacks in Israeli cities. Violent protests in the West Bank. International pressure is mounting.',
                month: 3,
                choices: [
                    { text: '🔒 עוצר וסגר מלא', textEn: '🔒 Full curfew and lockdown', effect: { palestineRelation: -20, approval: 5, usRelation: -5 } },
                    { text: '⚔️ מבצע צבאי ממוקד', textEn: '⚔️ Targeted military operation', effect: { palestineRelation: -15, approval: 10, budget: -2 } },
                    { text: '🤝 שיחות עם הרשות', textEn: '🤝 Talks with the Palestinian Authority', effect: { palestineRelation: 10, approval: -10, usRelation: 10 } }
                ]
            },
            {
                id: 'abraham_accords',
                title: '🤝 הרחבת הסכמי אברהם',
                titleEn: '🤝 Expanding the Abraham Accords',
                text: 'סעודיה רומזת לנורמליזציה עם ישראל. ארה"ב מקדמת. האם תקבל את התנאים?',
                textEn: 'Saudi Arabia hints at normalization with Israel. The US is pushing. Will you accept the terms?',
                month: 6,
                choices: [
                    { text: '🤝 קבל תנאים כולל ויתורים פלסטיניים', textEn: '🤝 Accept terms including Palestinian concessions', effect: { approval: -15, usRelation: 20, budget: 3 } },
                    { text: '🗣️ משא ומתן קשוח', textEn: '🗣️ Tough negotiations', effect: { usRelation: 5 } },
                    { text: '✋ סרב לתנאים', textEn: '✋ Reject the terms', effect: { approval: 10, usRelation: -15 } }
                ]
            },
            {
                id: 'iran_proxy_attack',
                title: '💥 התקפת פרוקסי',
                titleEn: '💥 Proxy Attack',
                text: 'מיליציות שיעיות מעיראק שיגרו מל"טים תופת לעבר בסיס צבאי ישראלי בגולן.',
                textEn: 'Shiite militias from Iraq launched suicide drones at an Israeli military base in the Golan.',
                month: 5,
                choices: [
                    { text: '✈️ תקוף בסיסי מיליציה בעיראק', textEn: '✈️ Strike militia bases in Iraq', effect: { iraqRelation: -20, iranRelation: -10, approval: 10 } },
                    { text: '🕵️ מבצע מודיעיני חשאי', textEn: '🕵️ Covert intelligence operation', effect: { budget: -1 } },
                    { text: '📢 גינוי ודרישה מעיראק', textEn: '📢 Condemnation and demand from Iraq', effect: { iraqRelation: -5 } }
                ]
            }
        ],

        // Saudi-specific events
        saudi: [
            {
                id: 'houthi_attack',
                title: '🚀 התקפת חות\'ים!',
                titleEn: '🚀 Houthi Attack!',
                text: 'החות\'ים שיגרו טילים בליסטיים ומל"טים לעבר מתקני ארמקו בדמאם. נזק למתקני נפט.',
                textEn: 'The Houthis launched ballistic missiles and drones at Aramco facilities in Dammam. Damage to oil facilities.',
                month: 1,
                choices: [
                    { text: '⚔️ מבצע אווירי ביתמן', textEn: '⚔️ Air operation in Yemen', effect: { yemenRelation: -30, approval: 10, budget: -4, oilDamage: true } },
                    { text: '🛡️ חזק הגנות + Patriot', textEn: '🛡️ Strengthen defenses + Patriot', effect: { budget: -3, usRelation: 5 } },
                    { text: '📞 דרוש הפסקת אש', textEn: '📞 Demand a ceasefire', effect: { yemenRelation: 5, approval: -5 } }
                ]
            },
            {
                id: 'neom_crisis',
                title: '🏗️ משבר NEOM',
                titleEn: '🏗️ NEOM Crisis',
                text: 'משקיעים זרים מושכים כסף מפרויקט NEOM בגלל חוסר יציבות אזורית. Vision 2030 בסכנה.',
                textEn: 'Foreign investors are pulling money from the NEOM project due to regional instability. Vision 2030 is at risk.',
                month: 2,
                choices: [
                    { text: '💰 השקע תקציב ממשלתי', textEn: '💰 Invest government budget', effect: { budget: -5, vision2030: 10, approval: 5 } },
                    { text: '🤝 הצע תנאים טובים יותר למשקיעים', textEn: '🤝 Offer better terms to investors', effect: { budget: -2, vision2030: 5 } },
                    { text: '⏳ דחה לזמן יציב יותר', textEn: '⏳ Postpone to a more stable time', effect: { vision2030: -10, approval: -5 } }
                ]
            },
            {
                id: 'oil_weapon',
                title: '🛢️ נשק הנפט',
                titleEn: '🛢️ The Oil Weapon',
                text: 'יועצים מציעים להשתמש בייצור הנפט ככלי לחץ - הגבר ייצור להוריד מחירים ולפגוע באיראן.',
                textEn: 'Advisors suggest using oil production as leverage - increase production to lower prices and hurt Iran.',
                month: 4,
                choices: [
                    { text: '🛢️ הגבר ייצור לפגוע באיראן', textEn: '🛢️ Increase production to hurt Iran', effect: { iranRelation: -15, budget: -2, approval: 5 } },
                    { text: '📉 צמצם ייצור להעלות מחירים', textEn: '📉 Cut production to raise prices', effect: { budget: 5, usRelation: -10 } },
                    { text: '⚖️ שמור על רמות נוכחיות', textEn: '⚖️ Maintain current levels', effect: {} }
                ]
            },
            {
                id: 'internal_dissent',
                title: '🏛️ אופוזיציה פנימית',
                titleEn: '🏛️ Internal Opposition',
                text: 'אנשי דת בכירים מתנגדים לרפורמות. יש רמזים לקנוניה בתוך המשפחה המלכותית.',
                textEn: 'Senior religious figures oppose reforms. There are hints of a conspiracy within the royal family.',
                month: 5,
                choices: [
                    { text: '🔒 מעצר מתנגדים', textEn: '🔒 Arrest dissenters', effect: { approval: -10, stability: -5, usRelation: -10 } },
                    { text: '🤝 דיאלוג ופשרות', textEn: '🤝 Dialogue and compromises', effect: { approval: 5, vision2030: -5 } },
                    { text: '🕵️ מעקב חשאי', textEn: '🕵️ Covert surveillance', effect: { budget: -1 } }
                ]
            },
            {
                id: 'red_sea_crisis',
                title: '⚓ משבר ים סוף',
                titleEn: '⚓ Red Sea Crisis',
                text: 'החות\'ים מגבירים תקיפות ספינות בים סוף. הסחר הבינלאומי מושפע, לחץ על הממלכה לפעול.',
                textEn: 'The Houthis are intensifying ship attacks in the Red Sea. International trade is affected, pressure on the Kingdom to act.',
                month: 3,
                choices: [
                    { text: '⚓ מבצע ימי משולב עם ארה"ב', textEn: '⚓ Joint naval operation with the US', effect: { usRelation: 15, yemenRelation: -20, budget: -3, approval: 10 } },
                    { text: '🚢 סיור ימי סעודי עצמאי', textEn: '🚢 Independent Saudi naval patrol', effect: { approval: 15, budget: -4 } },
                    { text: '📞 משא ומתן דרך עומאן', textEn: '📞 Negotiations through Oman', effect: { yemenRelation: 10, approval: -5 } }
                ]
            },
            {
                id: 'normalization_israel',
                title: '🇮🇱 נורמליזציה עם ישראל?',
                titleEn: '🇮🇱 Normalization with Israel?',
                text: 'ארה"ב לוחצת על הסכם נורמליזציה עם ישראל. התנאי: פתרון פלסטיני. הרחוב הערבי מתנגד.',
                textEn: 'The US is pushing for a normalization agreement with Israel. The condition: a Palestinian solution. The Arab street is opposed.',
                month: 7,
                choices: [
                    { text: '🤝 חתום על הסכם', textEn: '🤝 Sign the agreement', effect: { usRelation: 25, approval: -20, iranRelation: -15, budget: 5 } },
                    { text: '🗣️ משא ומתן על תנאים', textEn: '🗣️ Negotiate terms', effect: { usRelation: 10, approval: -5 } },
                    { text: '✋ דחה כרגע', textEn: '✋ Reject for now', effect: { usRelation: -15, approval: 10, iranRelation: 5 } }
                ]
            }
        ],

        // Iran-specific events
        iran: [
            {
                id: 'iran_sanctions_pressure',
                title: '💰 לחץ סנקציות',
                titleEn: '💰 Sanctions Pressure',
                text: 'הסנקציות החדשות של ארה"ב פוגעות קשות בכלכלה. יצוא הנפט ירד ב-30%. הריאל האיראני צונח.',
                textEn: 'New US sanctions are severely hurting the economy. Oil exports dropped by 30%. The Iranian rial is plummeting.',
                month: 1,
                choices: [
                    { text: '🇨🇳 הגבר מכירות נפט לסין', textEn: '🇨🇳 Increase oil sales to China', effect: { chinaRelation: 10, usRelation: -10, budget: 3 } },
                    { text: '💰 הדפסת כסף ותקציב חירום', textEn: '💰 Print money and emergency budget', effect: { approval: -10, budget: 2 } },
                    { text: '🤝 הצע משא ומתן עם ארה"ב', textEn: '🤝 Offer negotiations with the US', effect: { usRelation: 10, approval: -15 } }
                ]
            },
            {
                id: 'iran_proxy_management',
                title: '⚔️ ניהול פרוקסים',
                titleEn: '⚔️ Proxy Management',
                text: 'חיזבאללה דורש משלוח נשק מתקדם דחוף. החות\'ים מבקשים מימון נוסף. המשאבים מוגבלים.',
                textEn: 'Hezbollah demands an urgent advanced weapons shipment. The Houthis request additional funding. Resources are limited.',
                month: 2,
                choices: [
                    { text: '🚀 שלח נשק מתקדם לחיזבאללה', textEn: '🚀 Send advanced weapons to Hezbollah', effect: { lebanonRelation: 15, usRelation: -10, budget: -3 } },
                    { text: '💰 חלק משאבים בין כל הפרוקסים', textEn: '💰 Distribute resources among all proxies', effect: { budget: -4, yemenRelation: 10, lebanonRelation: 5 } },
                    { text: '✋ צמצם תמיכה זמנית', textEn: '✋ Temporarily reduce support', effect: { lebanonRelation: -15, yemenRelation: -10, budget: 2 } }
                ]
            },
            {
                id: 'iran_nuclear_inspectors',
                title: '☢️ מפקחי סבב"א',
                titleEn: '☢️ IAEA Inspectors',
                text: 'סוכנות האנרגיה הבינלאומית דורשת גישה למתקנים חשודים. סירוב יגביר סנקציות. שיתוף פעולה יחשוף סודות.',
                textEn: 'The International Atomic Energy Agency demands access to suspected facilities. Refusal will increase sanctions. Cooperation will expose secrets.',
                month: 4,
                choices: [
                    { text: '🚫 סרב לגישה', textEn: '🚫 Deny access', effect: { usRelation: -20, russiaRelation: -5, nuclearProgress: 5 } },
                    { text: '🤝 אפשר גישה מוגבלת', textEn: '🤝 Allow limited access', effect: { usRelation: 5, nuclearProgress: -5 } },
                    { text: '🕵️ הצג מתקנים מזויפים', textEn: '🕵️ Present fake facilities', effect: { budget: -2, nuclearProgress: 3 } }
                ]
            },
            {
                id: 'iran_internal_protests',
                title: '🏛️ מחאות פנימיות',
                titleEn: '🏛️ Internal Protests',
                text: 'הפגנות ענק בטהרן ואיספהאן. המפגינים דורשים חופש ושיפור כלכלי. משטרת המוסר מתקשה.',
                textEn: 'Massive demonstrations in Tehran and Isfahan. Protesters demand freedom and economic improvement. The morality police are struggling.',
                month: 5,
                choices: [
                    { text: '🔒 דיכוי אלים', textEn: '🔒 Violent suppression', effect: { approval: -20, usRelation: -15, stability: -10 } },
                    { text: '🤝 רפורמות קוסמטיות', textEn: '🤝 Cosmetic reforms', effect: { approval: 5, budget: -2 } },
                    { text: '📡 ניתוק אינטרנט וסגירת רשתות', textEn: '📡 Internet shutdown and network closure', effect: { approval: -10, budget: -1 } }
                ]
            }
        ],

        // USA-specific events
        usa: [
            {
                id: 'usa_congressional_vote',
                title: '🏛️ הצבעה בקונגרס',
                titleEn: '🏛️ Congressional Vote',
                text: 'הקונגרס מצביע על חבילת סיוע צבאית לישראל וסעודיה. האופוזיציה מתנגדת להוצאה.',
                textEn: 'Congress votes on a military aid package for Israel and Saudi Arabia. The opposition objects to the spending.',
                month: 1,
                choices: [
                    { text: '📢 לובי אגרסיבי בעד', textEn: '📢 Aggressive lobbying in favor', effect: { approval: -5, budget: -5, usRelation: 10 } },
                    { text: '⚖️ פשרה - חבילה מצומצמת', textEn: '⚖️ Compromise - reduced package', effect: { budget: -3 } },
                    { text: '✋ דחה להצבעה עתידית', textEn: '✋ Postpone to a future vote', effect: { approval: 5 } }
                ]
            },
            {
                id: 'usa_ally_pressure',
                title: '🤝 לחץ מבעלי ברית',
                titleEn: '🤝 Pressure from Allies',
                text: 'ישראל וסעודיה דורשות פעולה אמריקאית נחרצת נגד איראן. אירופה מעדיפה דיפלומטיה.',
                textEn: 'Israel and Saudi Arabia demand decisive American action against Iran. Europe prefers diplomacy.',
                month: 3,
                choices: [
                    { text: '⚔️ הכרז על "קו אדום" ברור', textEn: '⚔️ Declare a clear "red line"', effect: { iranRelation: -20, approval: 10 } },
                    { text: '🗣️ דיפלומטיה עם לחץ', textEn: '🗣️ Diplomacy with pressure', effect: { iranRelation: -5 } },
                    { text: '⏳ דחה החלטה', textEn: '⏳ Postpone decision', effect: { approval: -5 } }
                ]
            },
            {
                id: 'usa_carrier_deployment',
                title: '⚓ פריסת קבוצת נושאות',
                titleEn: '⚓ Carrier Group Deployment',
                text: 'הפנטגון מציע לשלוח קבוצת נושאות מטוסים נוספת למפרץ הפרסי כהרתעה.',
                textEn: 'The Pentagon proposes sending an additional aircraft carrier group to the Persian Gulf as a deterrent.',
                month: 4,
                choices: [
                    { text: '⚓ שלח שתי קבוצות נושאות', textEn: '⚓ Send two carrier groups', effect: { iranRelation: -15, approval: 5, budget: -8, military: 2 } },
                    { text: '⚓ שלח קבוצה אחת', textEn: '⚓ Send one carrier group', effect: { iranRelation: -10, budget: -4, military: 1 } },
                    { text: '✋ הסתפק בכוחות קיימים', textEn: '✋ Make do with existing forces', effect: { approval: -5 } }
                ]
            },
            {
                id: 'usa_election_impact',
                title: '🗳️ השפעה על הבחירות',
                titleEn: '🗳️ Election Impact',
                text: 'סקרים מראים שהציבור מחולק לגבי המדיניות במזרח התיכון. בחירות האמצע מתקרבות.',
                textEn: 'Polls show the public is divided on Middle East policy. Midterm elections are approaching.',
                month: 6,
                choices: [
                    { text: '💪 הצג עמדה חזקה', textEn: '💪 Show a strong stance', effect: { approval: 10, iranRelation: -10, budget: -3 } },
                    { text: '🕊️ הדגש דיפלומטיה', textEn: '🕊️ Emphasize diplomacy', effect: { approval: 5, iranRelation: 5 } },
                    { text: '🏠 התמקד בנושאים פנימיים', textEn: '🏠 Focus on domestic issues', effect: { approval: 15 } }
                ]
            }
        ],

        // Hezbollah-specific events
        hezbollah: [
            {
                id: 'hezbollah_israeli_airstrike',
                title: '✈️ תקיפה אווירית ישראלית!',
                titleEn: '✈️ Israeli Airstrike!',
                text: 'חיל האוויר הישראלי תקף מחסני נשק ומרכזי פיקוד בדרום לבנון. נזק כבד לתשתיות.',
                textEn: 'The Israeli Air Force struck weapons depots and command centers in southern Lebanon. Heavy damage to infrastructure.',
                month: 1,
                choices: [
                    { text: '🚀 תקיפת תגמול - מטח טילים', textEn: '🚀 Retaliatory strike - missile barrage', effect: { approval: 15, budget: -2, military: -1 } },
                    { text: '🕳️ פנה למנהרות וסמן', textEn: '🕳️ Retreat to tunnels and regroup', effect: { approval: -5, military: 0 } },
                    { text: '📢 גינוי בינלאומי + שיקום', textEn: '📢 International condemnation + rehabilitation', effect: { iranRelation: 5, budget: -1 } }
                ]
            },
            {
                id: 'hezbollah_iranian_shipment',
                title: '🚢 משלוח נשק איראני',
                titleEn: '🚢 Iranian Arms Shipment',
                text: 'איראן מציעה משלוח גדול של טילים מדויקים ומל"טים מתקדמים דרך סוריה.',
                textEn: 'Iran offers a large shipment of precision missiles and advanced drones through Syria.',
                month: 2,
                choices: [
                    { text: '✅ קבל את המשלוח המלא', textEn: '✅ Accept the full shipment', effect: { iranRelation: 10, military: 2, usRelation: -10 } },
                    { text: '🔀 פצל למשלוחים קטנים', textEn: '🔀 Split into smaller shipments', effect: { iranRelation: 5, military: 1 } },
                    { text: '✋ דחה - הסיכון גבוה מדי', textEn: '✋ Reject - the risk is too high', effect: { iranRelation: -15 } }
                ]
            },
            {
                id: 'hezbollah_lebanon_crisis',
                title: '🇱🇧 משבר ממשלתי בלבנון',
                titleEn: '🇱🇧 Government Crisis in Lebanon',
                text: 'ראש הממשלה הלבנוני מנסה לפרק את הזרוע הצבאית של חיזבאללה. לחץ בינלאומי גובר.',
                textEn: 'The Lebanese Prime Minister is trying to dismantle Hezbollah\'s military wing. International pressure is growing.',
                month: 4,
                choices: [
                    { text: '💪 הפגנת כוח - סגור את ביירות', textEn: '💪 Show of force - shut down Beirut', effect: { approval: 10, usRelation: -15 } },
                    { text: '🗣️ משא ומתן פוליטי', textEn: '🗣️ Political negotiations', effect: { approval: -5 } },
                    { text: '🕵️ לחץ חשאי על פוליטיקאים', textEn: '🕵️ Covert pressure on politicians', effect: { budget: -1 } }
                ]
            },
            {
                id: 'hezbollah_tunnel_discovery',
                title: '🕳️ גילוי מנהרה',
                titleEn: '🕳️ Tunnel Discovery',
                text: 'צה"ל גילה מנהרה חוצת גבול. יש חשש שהם יודעים על רשת המנהרות המלאה.',
                textEn: 'The IDF discovered a cross-border tunnel. There is concern they know about the full tunnel network.',
                month: 5,
                choices: [
                    { text: '💣 פוצץ את המנהרה שנחשפה', textEn: '💣 Blow up the exposed tunnel', effect: { military: -1 } },
                    { text: '🔀 שנה מסלולי מנהרות', textEn: '🔀 Change tunnel routes', effect: { budget: -2 } },
                    { text: '🎭 הכחש ופעל כרגיל', textEn: '🎭 Deny and continue as usual', effect: { approval: 5 } }
                ]
            }
        ],

        // Turkey-specific events
        turkey: [
            {
                id: 'turkey_pkk_attack',
                title: '💥 פיגוע PKK',
                titleEn: '💥 PKK Attack',
                text: 'פיגוע של ה-PKK בדיארבקיר - 15 חיילים נהרגו. הציבור דורש תגובה קשה.',
                textEn: 'A PKK attack in Diyarbakir - 15 soldiers killed. The public demands a harsh response.',
                month: 1,
                choices: [
                    { text: '⚔️ מבצע צבאי בצפון עיראק', textEn: '⚔️ Military operation in northern Iraq', effect: { iraqRelation: -20, approval: 15, budget: -3 } },
                    { text: '✈️ תקיפות אוויריות ממוקדות', textEn: '✈️ Targeted airstrikes', effect: { iraqRelation: -10, approval: 10, budget: -2 } },
                    { text: '🔒 הגבר ביטחון פנים', textEn: '🔒 Increase domestic security', effect: { approval: 5, budget: -1 } }
                ]
            },
            {
                id: 'turkey_nato_pressure',
                title: '🏛️ לחץ נאט"ו',
                titleEn: '🏛️ NATO Pressure',
                text: 'נאט"ו דורש מטורקיה לבחור - מערכת ה-S400 הרוסית או מטוסי F-35 אמריקאיים.',
                textEn: 'NATO demands Turkey to choose - the Russian S-400 system or American F-35 jets.',
                month: 3,
                choices: [
                    { text: '🇺🇸 ויתור על S400 לטובת F-35', textEn: '🇺🇸 Give up S-400 in favor of F-35', effect: { usRelation: 20, russiaRelation: -25, military: 2 } },
                    { text: '🇷🇺 שמור על S400', textEn: '🇷🇺 Keep the S-400', effect: { russiaRelation: 15, usRelation: -20 } },
                    { text: '⚖️ נסה לשמור על שניהם', textEn: '⚖️ Try to keep both', effect: { usRelation: -5, russiaRelation: -5 } }
                ]
            },
            {
                id: 'turkey_syria_offensive',
                title: '🇸🇾 מבצע בסוריה',
                titleEn: '🇸🇾 Operation in Syria',
                text: 'הכוחות הכורדיים בצפון סוריה מתחזקים. הצבא מציע מבצע חוצה-גבול נוסף.',
                textEn: 'Kurdish forces in northern Syria are growing stronger. The military proposes another cross-border operation.',
                month: 4,
                choices: [
                    { text: '⚔️ מבצע קרקעי רחב', textEn: '⚔️ Large-scale ground operation', effect: { syriaRelation: -20, russiaRelation: -10, approval: 10, budget: -5 } },
                    { text: '🤖 הפעלת מל"טים בלבד', textEn: '🤖 Drone operations only', effect: { syriaRelation: -10, approval: 5, budget: -2 } },
                    { text: '🛡️ חזק עמדות קיימות', textEn: '🛡️ Strengthen existing positions', effect: { budget: -1 } }
                ]
            },
            {
                id: 'turkey_economic_crisis',
                title: '💰 משבר כלכלי',
                titleEn: '💰 Economic Crisis',
                text: 'הלירה הטורקית צנחה ב-20%. אינפלציה של 60%. מחאות כלכליות ברחובות.',
                textEn: 'The Turkish lira plunged 20%. Inflation at 60%. Economic protests in the streets.',
                month: 5,
                choices: [
                    { text: '💰 העלאת ריבית דרסטית', textEn: '💰 Drastic interest rate hike', effect: { approval: -10, budget: -3 } },
                    { text: '🇶🇦 בקש הלוואה מקטאר', textEn: '🇶🇦 Request a loan from Qatar', effect: { qatarRelation: 10, budget: 4 } },
                    { text: '📢 האשם גורמים חיצוניים', textEn: '📢 Blame external factors', effect: { approval: 5, usRelation: -5 } }
                ]
            },
            {
                id: 'turkey_drone_exports',
                title: '🤖 יצוא מל"טים',
                titleEn: '🤖 Drone Exports',
                text: 'מדינות רבות מבקשות לרכוש מל"טי Bayraktar. הזדמנות כלכלית ודיפלומטית.',
                textEn: 'Many countries are requesting to purchase Bayraktar drones. An economic and diplomatic opportunity.',
                month: 7,
                choices: [
                    { text: '🌍 מכור לכל דורש', textEn: '🌍 Sell to all buyers', effect: { budget: 5, usRelation: -10 } },
                    { text: '🤝 מכור רק לבעלי ברית', textEn: '🤝 Sell only to allies', effect: { budget: 3, usRelation: 5 } },
                    { text: '🏭 השקע בפיתוח דור הבא', textEn: '🏭 Invest in next-gen development', effect: { budget: -3, military: 2 } }
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
        ],
        iran: [
            'סנקציות חדשות פוגעות בכלכלה | New sanctions hit economy',
            'מחאות בטהרן נגד המשטר | Protests in Tehran against regime',
            'התקדמות בהעשרת אורניום | Uranium enrichment advances',
            'משמרות המהפכה מגבירים פעילות | IRGC increases operations',
            'יצוא נפט לסין עולה | Oil exports to China increase',
            'ניסוי טילים בליסטיים חדש | New ballistic missile test'
        ],
        usa: [
            'הפנטגון מעריך איומים באזור | Pentagon assesses regional threats',
            'הקונגרס דן בתקציב הביטחון | Congress debates defense budget',
            'סקרים: הבחירות מתקרבות | Polls: Elections approaching',
            'קבוצת נושאות במפרץ הפרסי | Carrier group in Persian Gulf',
            'דיפלומטיה אמריקאית במזרח התיכון | US diplomacy in Middle East',
            'CIA: דו"ח מודיעין חדש על איראן | CIA: New intel report on Iran'
        ],
        hezbollah: [
            'מטח רקטות לעבר צפון ישראל | Rocket barrage toward northern Israel',
            'רשת מנהרות חדשה נחשפת | New tunnel network exposed',
            'לבנון על סף קריסה כלכלית | Lebanon on brink of economic collapse',
            'משלוח נשק איראני הגיע | Iranian arms shipment arrives',
            'נסראללה: לא נכנע | Nasrallah: We will not surrender',
            'מל"טים חדשים בארסנל חיזבאללה | New drones in Hezbollah arsenal'
        ],
        turkey: [
            'הלירה הטורקית ממשיכה לצנוח | Turkish lira continues to fall',
            'מל"טי Bayraktar: עסקאות חדשות | Bayraktar drones: New deals',
            'נאט"ו דן בתפקיד טורקיה | NATO discusses Turkey\'s role',
            'ארדואן: טורקיה מעצמה אזורית | Erdogan: Turkey is a regional power',
            'עימותים עם PKK בדרום-מזרח | Clashes with PKK in southeast',
            'מבצע צבאי בצפון סוריה | Military operation in northern Syria'
        ]
    }
};
