export const content = {
    no: [
        {
            title: "Velkommen til FSE & Sikkerhetskurs",
            html: `
            <h1>Årlig FSE-Oppdatering</h1>
            <p>Dette kurset er obligatorisk for alle som arbeider på eller nær ved elektriske anlegg i <strong>Seid AS</strong>. Kurset dekker myndighetskravene i <em>Forskrift om sikkerhet ved arbeid i og drift av elektriske anlegg (FSE)</em>.</p>
            
            <div class="highlight-box">
                <strong>Fokusområder for Seid AS:</strong>
                <ul style="margin-bottom:0; margin-top: 10px;">
                    <li>Internasjonale oppdrag og fremmede nettsystemer.</li>
                    <li>SMPS høyspent strømforsyninger (400V 3-fase input).</li>
                    <li>Farene ved DC-link og kondensatorer (Lagret energi).</li>
                </ul>
            </div>

            <p><strong>Merk:</strong> Dette kurset dekker teoridelen. Praktisk øvelse i hjerte-lungeredning (HLR) og gjennomgang av førstehjelpsutstyr må gjennomføres separat for full godkjenning.</p>
            
            <p>Vennligst skriv inn ditt fulle navn slik det skal stå på kursbeviset:</p>
            <input type="text" id="inputName" class="name-input" placeholder="Ditt fulle navn" oninput="window.updateName(this.value)">
        `
        },
        {
            title: "Modul 1: Ansvar og Roller",
            html: `
            <h2>Hvem bestemmer på anlegget?</h2>
            <p>FSE § 6 og § 7 definerer tydelige roller for å ivareta sikkerheten. Når vi reiser ut til kunder i Europa, Asia eller USA, møter vi ofte komplekse ansvarsforhold.</p>
            
            <h3>Anleggseier vs. Seid AS</h3>
            <p>Grensesnittet er kritisk. Vi leverer utstyret, men <strong>lokal installatør/elektriker</strong> kobler ofte nettet (grid) til våre klemmer.</p>
            <ul>
                <li><strong>Leder for sikkerhet (LFS):</strong> Skal alltid være utpekt for arbeidet. Hvis ingen andre er utpekt, er DU ansvarlig for din egen sikkerhet.</li>
                <li><strong>Ditt ansvar:</strong> Sikkerheten på selve SMPS-enheten, DC-link og tilkoblet last.</li>
                <li><strong>Grensesnitt:</strong> Inntaksklemmer. Anta alltid at tilførselskabelen er spenningssatt inntil du selv har målt.</li>
            </ul>
            <div class="warning-box">
                <strong>Scenario:</strong> Elektrikeren sier "Power is Off". <br>
                <strong>Handling:</strong> Stol aldri på muntlige beskjeder. Verifiser alltid selv med spenningsprøver før du berører noe. FSE krever at du forsikrer deg om at anlegget er spenningsløst.
            </div>
        `
        },
        {
            title: "Modul 2: Planlegging og SJA",
            html: `
            <h2>Sikker Jobb Analyse (SJA)</h2>
            <p>FSE § 10 krever planlegging av alt arbeid. Ulykker skjer ofte ved "rutinearbeid" der vi hopper over planleggingen.</p>
            
            <h3>Spesifikk risiko for Seid-utstyr</h3>
            <p>Når vi jobber med Switch Mode Power Supplies, har vi farer som en vanlig husinstallatør ikke møter:</p>
            <ul>
                <li><strong>Høy Energitetthet:</strong> 400V/480V 3-fase har enorm kortslutningsytelse. Lysbuer her er eksplosive.</li>
                <li><strong>Lagret Energi (Kondensatorer):</strong> Dette er vår største interne fare. Selv om sikringen er ute (LOTO), kan DC-linken inneholde dødelig spenning i flere minutter.</li>
                <li><strong>HF-støy/Lekkasjestrøm:</strong> Kan lure vanlige multimetere. Bruk egnet måleutstyr.</li>
            </ul>
            
            <div class="highlight-box">
                <strong>SJA i praksis:</strong> Stopp opp i 2 minutter før du åpner skapet. Er det vått? Er det trangt? Har jeg riktig verneutstyr? Hvis uhellet er ute, hvordan kommer jeg meg vekk?
            </div>
        `
        },
        {
            title: "Modul 3: Lysbue og Strømgjennomgang",
            html: `
            <h2>Skademekanismer</h2>
            
            <h3>1. Strømgjennomgang (Sjokk)</h3>
            <p>Ved 400V AC risikerer vi krampe (tetanus) hvor du ikke klarer å slippe lederen. Strømmen går gjennom kroppen og kan skade:</p>
            <ul>
                <li>Nervesystemet (umiddelbart eller senskader).</li>
                <li>Hjertet (Rytmeforstyrrelser/Flimmer).</li>
                <li>Indre organer (Brannskader innvendig).</li>
            </ul>

            <h3>2. Lysbue (Arc Flash)</h3>
            <p>En kortslutning på inntaket til våre skap kan skape temperaturer opp mot 20 000 °C. Konsekvenser:</p>
            <ul>
                <li>Trykkbølge (kan kaste deg bakover).</li>
                <li>Smeltet metall (kobber fordamper og ekspanderer 67 000 ganger).</li>
                <li>Blindhet (intens UV-stråling) og alvorlige brannskader.</li>
            </ul>
            <div class="danger-box">
                <strong>Krav til verneutstyr (PPE):</strong> Bruk <strong>alltid</strong> visir og flammehemmende bekledning ved spenningsprøving, betjening av effektbrytere eller arbeid nær spenningssatte deler. Bomull innerst, aldri syntetisk som smelter mot huden.
            </div>
        `
        },
        {
            title: "Modul 4: Arbeidsmetoder",
            html: `
            <h2>De 3 Arbeidsmetodene (FSE § 14-16)</h2>
            <ol>
                <li><strong>Arbeid på frakoblet anlegg</strong> (Standard for oss).</li>
                <li><strong>Arbeid nær ved spenningssatte deler</strong> (Ofte under testing).</li>
                <li><strong>Arbeid under spenning - AUS</strong> (Kun for spesifikk feilsøking i styreskap < 50V eller med spesialopplæring).</li>
            </ol>

            <h3>De 5 Sikkerhetsreglene (Ved frakoblet arbeid)</h3>
            <p>Disse må følges slavisk i rekkefølge:</p>
            <ol>
                <li><strong>Frakoble:</strong> Åpne bryter/sikring. Sørg for synlig brudd om mulig.</li>
                <li><strong>Sikre mot innkobling:</strong> Bruk hengelås (LOTO) og skilt "Må ikke betjenes". Ta med nøkkelen!</li>
                <li><strong>Prøve spenning:</strong> Mål at det er dødt. Test instrumentet på kjent kilde før og etter måling.</li>
                <li><strong>Jorde og kortslutte:</strong> <span style="color:red; font-weight:bold">KRITISK FOR SEID UTSTYR.</span> Dette tømmer kondensatorer og beskytter mot feilinnkobling.</li>
                <li><strong>Beskytte mot andre deler:</strong> Dekk til nabokomponenter som har strøm (f.eks. tilførsel før hovedbryter).</li>
            </ol>
        `
        },
        {
            title: "Modul 5: Førstehjelp og Beredskap",
            html: `
            <h2>Akutt Førstehjelp ved Strømulykker</h2>
            <p>Husk kjeden som redder liv: <em>Tidlig varsling -> Tidlig HLR -> Tidlig defibrillering.</em></p>

            <h3>1. Frigjøring (Ivareta egen sikkerhet)</h3>
            <p>Ikke ta på en person som henger fast i strømmen! Kutt strømmen umiddelbart. Hvis ikke mulig: Bruk vår isolerstang eller en tørr gjenstand til å slå personen løs.</p>

            <h3>2. Varsling</h3>
            <ul>
                <li>Norge: <strong>113</strong></li>
                <li>Europa (EU): <strong>112</strong></li>
                <li>USA: <strong>911</strong></li>
            </ul>

            <h3>3. Behandling</h3>
            <ul>
                <li><strong>Bevisstløs uten pust:</strong> Start HLR (30 kompresjoner, 2 innblåsinger). Ikke stopp før ambulanse overtar.</li>
                <li><strong>Bevisstløs med pust:</strong> Stabilt sideleie. Overvåk pusten kontinuerlig.</li>
                <li><strong>Brannskader:</strong> Kjøl ned med lunkent vann (ca 20°C) i 20 minutter. Ikke bruk iskaldt vann (fare for hypotermi/sjokk).</li>
            </ul>
            
            <div class="warning-box">
                <strong>Meldeplikt:</strong> Alle ulykker med personskade og tilløp til ulykker (nestenulykker) skal rapporteres i Seid sitt HMS-system og potensielt til DSB.
            </div>

            <div class="danger-box">
                <strong>Viktig regel:</strong> Alle som har fått strøm gjennom kroppen (hånd-til-hånd eller hånd-til-fot) SKAL til sykehus for EKG-overvåkning, selv om de føler seg bra. Hjerteflimmer kan oppstå opptil 24 timer senere.
            </div>
        `
        },
        {
            title: "Kunnskapstest (Eksamen)",
            type: "quiz",
            questions: [
                {
                    q: "Hva er det første du gjør hvis en kollega 'henger fast' i strømmen?",
                    options: ["Drar ham løs med bare hendene", "Kutter strømmen eller bruker isolert gjenstand", "Ringer 113"],
                    ans: 1
                },
                {
                    q: "Hvor ofte må FSE-kurset fornyes?",
                    options: ["Hvert 2. år", "Hvert 5. år", "Hver 12. måned"],
                    ans: 2
                },
                {
                    q: "Hvorfor er jording og kortslutning spesielt viktig på Seid SMPS-utstyr?",
                    options: ["For å bedre signalet", "For å tømme kondensatorer (lagret energi) og sikre mot innkobling", "Det er ikke viktig"],
                    ans: 1
                },
                {
                    q: "En kollega fikk et støt (230V) gjennom armen, men sier han er OK. Hva gjør du?",
                    options: ["Sender ham til lege/sykehus for EKG-sjekk", "Gir ham en kopp kaffe", "Ber ham gå hjem og sove"],
                    ans: 0
                },
                {
                    q: "Hva innebærer de 5 sikkerhetsreglene?",
                    options: ["Jobb raskt så ingen ser deg", "Bruk hansker og vernebriller", "Frakoble, LOTO, Prøve, Jorde, Beskytte"],
                    ans: 2
                }
            ]
        },
        {
            title: "Fullført",
            type: "cert"
        }
    ],
    en: [
        {
            title: "Welcome to FSE & Safety Training",
            html: `
            <h1>Annual FSE Update</h1>
            <p>This course is tailored for employees of <strong>Seid AS</strong>. It covers the regulatory requirements in <em>Safety regulations related to work on and operation of electrical installations (FSE)</em>, with a focus on our specific context:</p>
            <ul>
                <li>International assignments and foreign grid systems.</li>
                <li>SMPS High Voltage power supplies (400V 3-phase input).</li>
                <li>Dangers of DC-link and capacitors.</li>
            </ul>
            <div class="highlight-box">
                <strong>Requirement:</strong> This course must be completed every 12 months. Note: Practical First Aid (CPR) training is required in addition to this theory module.
            </div>
            <p>Please enter your name to initialize the certificate:</p>
            <input type="text" id="inputName" class="name-input" placeholder="Your full name" oninput="window.updateName(this.value)">
        `
        },
        {
            title: "Module 1: Roles and Responsibilities",
            html: `
            <h2>Who is in charge?</h2>
            <p>When working globally, roles can be confusing. Norwegian law defines specific roles (Operations Manager, Safety Lead), but local laws vary.</p>
            
            <h3>Seid AS vs. Local Electrician</h3>
            <p>The interface is critical. We supply the equipment, but the <strong>local electrician</strong> connects the grid to our terminals.</p>
            <ul>
                <li><strong>Your responsibility:</strong> Safety of the SMPS unit, DC-Link and commissioning.</li>
                <li><strong>Local responsibility:</strong> Safety of the supply cable up to the input terminals.</li>
            </ul>
            <div class="warning-box">
                <strong>Scenario:</strong> The electrician says "Power is Off". Do you trust him? <br>
                <strong>Answer:</strong> No. You must <em>always</em> verify with your own instrument. Under FSE, you are responsible for your own safety (LFS) unless otherwise documented.
            </div>
        `
        },
        {
            title: "Module 2: Planning & SJA",
            html: `
            <h2>Safe Job Analysis (SJA)</h2>
            <p>Accidents often happen during "routine work". An SJA must be performed <em>before</em> opening the toolbox.</p>
            
            <h3>Risk Assessment for Seid Equipment</h3>
            <p>Working with SMPS units introduces hazards that domestic electricians don't face:</p>
            <ul>
                <li><strong>High Energy Density:</strong> 400V 3-phase has massive short-circuit potential. Arc flashes here are explosive.</li>
                <li><strong>Stored Energy (Capacitors):</strong> Even if the fuse is pulled (LOTO), the DC-link can hold lethal voltage for minutes.</li>
                <li><strong>HF Noise/Leakage:</strong> Can affect measurement instruments if not rated correctly.</li>
            </ul>
            <p>The SJA form must be filled out on-site, considering the environment (wet? confined? other workers nearby?).</p>
        `
        },
        {
            title: "Module 3: Physics of Injury",
            html: `
            <h2>Shock vs Arc Flash</h2>
            
            <h3>Electric Shock</h3>
            <p>With 400V AC, there is a high risk of muscle tetanus (freezing to the line). Current flows through the body causing:</p>
            <ul>
                <li>Nerve damage.</li>
                <li>Cardiac Arrhythmia.</li>
                <li>Internal organ burns.</li>
            </ul>

            <h3>Arc Flash</h3>
            <p>A short circuit at our input terminals can create temps up to 20,000 °C. This causes:</p>
            <ul>
                <li>Pressure waves (blast).</li>
                <li>Molten metal (copper expands 67,000 times).</li>
                <li>Blindness (UV radiation).</li>
            </ul>
            <div class="danger-box">
                <strong>PPE Requirement:</strong> Always use a visor and flame-retardant clothing when voltage testing or switching main power.
            </div>
        `
        },
        {
            title: "Module 4: Work Methods",
            html: `
            <h2>The 3 Work Methods</h2>
            <ol>
                <li>Work on de-energized systems (Our standard).</li>
                <li>Work near live parts.</li>
                <li>Live working (AUS) - (Only for troubleshooting control circuits < 50V or specialized tasks).</li>
            </ol>

            <h3>The 5 Safety Rules (For de-energizing)</h3>
            <p>Must be followed in order:</p>
            <ol>
                <li><strong>Disconnect:</strong> Open the breaker/fuse.</li>
                <li><strong>Lock Out / Tag Out (LOTO):</strong> Use a padlock and sign. Keep the key!</li>
                <li><strong>Verify absence of voltage:</strong> Test your instrument before and after.</li>
                <li><strong>Ground and Short-circuit:</strong> <span style="color:red">CRITICAL FOR SEID UNITS.</span> This discharges capacitors.</li>
                <li><strong>Protect adjacent live parts:</strong> Cover nearby components.</li>
            </ol>
        `
        },
        {
            title: "Module 5: First Aid",
            html: `
            <h2>Acute First Aid</h2>
            <p>Remember the Chain of Survival: <em>Early Call -> Early CPR -> Early Defibrillation.</em></p>

            <h3>1. Safety First</h3>
            <p>Do not touch a victim attached to the power! Cut power or use an insulated stick to push them away.</p>

            <h3>2. Alert</h3>
            <ul>
                <li>Norway: <strong>113</strong></li>
                <li>EU: <strong>112</strong></li>
                <li>USA: <strong>911</strong></li>
            </ul>

            <h3>3. Treatment</h3>
            <ul>
                <li><strong>Unconscious, no breathing:</strong> Start CPR (30 compressions, 2 breaths).</li>
                <li><strong>Unconscious, breathing:</strong> Recovery position. Monitor breathing.</li>
                <li><strong>Burns:</strong> Cool with lukewarm water (20°C) for 20 minutes. Avoid ice cold water.</li>
            </ul>
            
            <div class="danger-box">
                <strong>Rule:</strong> Anyone who receives a shock through the body MUST go to the hospital for ECG monitoring, even if they feel fine. 
            </div>
        `
        },
        {
            title: "Final Exam",
            type: "quiz",
            questions: [
                {
                    q: "What is the first step if a colleague is 'frozen' to a live wire?",
                    options: ["Pull them off with bare hands", "Cut power or use insulated stick", "Call 911"],
                    ans: 1
                },
                {
                    q: "How often must FSE training be renewed?",
                    options: ["Every 2 years", "Every 5 years", "Every 12 months"],
                    ans: 2
                },
                {
                    q: "Why is Grounding & Short-circuiting vital on Seid SMPS units?",
                    options: ["To improve signals", "To discharge capacitors (stored energy)", "It's not important"],
                    ans: 1
                },
                {
                    q: "A colleague got a shock (230V) but feels fine. What do you do?",
                    options: ["Send to hospital for checkup", "Give them coffee", "Tell them to go home"],
                    ans: 0
                },
                {
                    q: "What are the 5 safety rules?",
                    options: ["Work fast", "Use gloves", "Disconnect, LOTO, Verify, Ground, Protect"],
                    ans: 2
                }
            ]
        },
        {
            title: "Completed",
            type: "cert"
        }
    ]
};
