export const courses = {
    "fse": {
        id: "fse",
        revision: "2025-12-04",
        title: {
            no: "FSE & Sikkerhetskurs",
            en: "FSE & Safety Training"
        },
        content: {
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
                            <li><strong>ModuPower</strong> høyspent strømforsyninger (SMPS).</li>
                            <li><strong>Høyspent utgang</strong> mot ESP og ModuPlasma reaktorkamre.</li>
                            <li>Farene ved lagret energi (kondensatorer) og indusert spenning.</li>
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
                        <li><strong>Ditt ansvar:</strong> Sikkerheten på selve <strong>ModuPower</strong>-enheten, DC-link og tilkoblet last (ESP/ModuPlasma).</li>
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
                    
                    <h3>Spesifikk risiko for ModuPower & Reaktorer</h3>
                    <p>Vi møter farer som en vanlig husinstallatør sjelden ser:</p>
                    <ul>
                        <li><strong>Høy Energitetthet (Inntak):</strong> 400V/480V 3-fase har enorm kortslutningsytelse. Lysbuer her er eksplosive.</li>
                        <li><strong>Lagret Energi (Internt):</strong> DC-linken i ModuPower kan inneholde dødelig spenning i flere minutter etter at sikringen er ute.</li>
                        <li><strong>Reaktor/ESP (Utgang):</strong> Selve reaktorkammeret/filteret fungerer som en stor kondensator. Det kan holde på ladning, plukke opp statisk elektrisitet, eller ha indusert spenning fra nabofelt.</li>
                    </ul>
                    
                    <div class="danger-box">
                        <strong>Viktig om Induksjon:</strong> I store filteranlegg kan "døde" deler bli spenningssatt av elektromagnetiske felt fra naboseksjoner som er i drift. Utstyret <strong>MÅ</strong> jordes før berøring.
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
                        <li><strong>Jorde og kortslutte:</strong> <span style="color:red; font-weight:bold">KRITISK FOR MODUPOWER/ESP.</span> Du må jorde både utgangen fra PSU og selve reaktorkammeret for å fjerne statisk/lagret ladning.</li>
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
                    <p>Ikke ta på en person som henger fast i strømmen! Kutt strømmen umiddelbart. Hvis ikke mulig: Bruk en isolert stang eller en tørr gjenstand til å slå personen løs.</p>
        
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
                            q: "Hvorfor må ESP/ModuPlasma-kammeret jordes selv om strømmen er av?",
                            options: ["For å forbedre signalet", "Pga. fare for lagret energi, statisk elektrisitet og induksjon", "Det er ikke nødvendig"],
                            ans: 1
                        },
                        {
                            q: "En kollega fikk et støt (230V) gjennom armen, men sier han er OK. Hva gjør du?",
                            options: ["Sender ham til lege/sykehus for EKG-sjekk", "Gir ham en kopp kaffe", "Ber ham gå hjem og sove"],
                            ans: 0
                        },
                        {
                            q: "Hvor ofte må FSE-kurset fornyes?",
                            options: ["Hvert 2. år", "Hvert 5. år", "Hver 12. måned"],
                            ans: 2
                        },
                        {
                            q: "Hva innebærer de 5 sikkerhetsreglene?",
                            options: ["Jobb raskt så ingen ser deg", "Bruk hansker og vernebriller", "Frakoble, LOTO, Prøve, Jorde, Beskytte"],
                            ans: 2
                        },
                        {
                            q: "Hvorfor kan det være farlig å jobbe på en frakoblet ESP-seksjon?",
                            options: ["Induksjon fra nabofelt og statisk ladning", "Fordi metallet er glatt", "Det er aldri farlig hvis sikringen er ute"],
                            ans: 0
                        },
                        {
                            q: "Hva er korrekt behandling av brannskader?",
                            options: ["Iskaldt vann i 5 minutter", "Lunkent vann (20°C) i 20 minutter", "Aloe vera med en gang"],
                            ans: 1
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
                        <li><strong>ModuPower</strong> High Voltage power supplies (SMPS).</li>
                        <li><strong>HV Output</strong> to ESP and ModuPlasma reactor chambers.</li>
                        <li>Dangers of stored energy, static charge, and induction.</li>
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
                        <li><strong>Your responsibility:</strong> Safety of the <strong>ModuPower</strong> unit, DC-Link, and the connected load (ESP/ModuPlasma).</li>
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
                    
                    <h3>Specific Risks: ModuPower & Reactors</h3>
                    <p>We face hazards that domestic electricians rarely see:</p>
                    <ul>
                        <li><strong>High Energy Density (Input):</strong> 400V/480V 3-phase has massive short-circuit potential. Arc flashes here are explosive.</li>
                        <li><strong>Stored Energy (Internal):</strong> The DC-link in ModuPower can hold lethal voltage for minutes after LOTO.</li>
                        <li><strong>Reactor/ESP (Output):</strong> The reactor chamber acts as a massive capacitor. It can retain charge, build up static electricity, or hold induced voltage from neighboring fields.</li>
                    </ul>
                    
                    <div class="danger-box">
                        <strong>Induction Hazard:</strong> In large filter plants, "dead" parts can become energized by electromagnetic fields from neighboring sections still in operation. The equipment <strong>MUST</strong> be grounded before touch.
                    </div>
                `
                },
                {
                    title: "Module 3: Physics of Injury",
                    html: `
                    <h2>Shock vs Arc Flash</h2>
                    
                    <h3>Electric Shock</h3>
                    <p>With 400V AC, there is a high risk of muscle tetany (freezing to the line). Current flows through the body causing:</p>
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
                        <li><strong>Ground and Short-circuit:</strong> <span style="color:red">CRITICAL FOR MODUPOWER/ESP.</span> You must ground both the PSU output and the reactor chamber itself to discharge static/stored energy.</li>
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
                    
                    <div class="warning-box">
                        <strong>Reporting Duty:</strong> All accidents involving personal injury and "near-misses" must be reported in Seid's HMS system.
                    </div>
        
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
                            q: "Why must the ESP/ModuPlasma chamber be grounded even if power is off?",
                            options: ["To improve signal quality", "Risk of stored energy, static charge, and induction", "It is not necessary"],
                            ans: 1
                        },
                        {
                            q: "A colleague got a shock (230V) but feels fine. What do you do?",
                            options: ["Send to hospital for checkup", "Give them coffee", "Tell them to go home"],
                            ans: 0
                        },
                        {
                            q: "How often must FSE training be renewed?",
                            options: ["Every 2 years", "Every 5 years", "Every 12 months"],
                            ans: 2
                        },
                        {
                            q: "What are the 5 safety rules?",
                            options: ["Work fast", "Use gloves", "Disconnect, LOTO, Verify, Ground, Protect"],
                            ans: 2
                        },
                        {
                            q: "Why can touching a disconnected ESP section still be dangerous?",
                            options: ["Induction from neighboring fields and static charge", "It is not dangerous if the fuse is pulled", "Because the metal is hot"],
                            ans: 0
                        },
                        {
                            q: "How should electrical burns be treated?",
                            options: ["Lukewarm water (20°C) for 20 minutes", "Ice cold water for 5 minutes", "Apply ointment immediately"],
                            ans: 0
                        }
                    ]
                },
                {
                    title: "Completed",
                    type: "cert"
                }
            ]
        }
    },
    "fse_first_aid_seid": {
        id: "fse_first_aid_seid",
        revision: "2025-12-09",
        title: {
            no: "Grunnleggende førstehjelp og strømulykker",
            en: "Basic First Aid & Electrical Accidents"
        },
        content: {
            no: [
                {
                    title: "Hvorfor førstehjelp?",
                    html: "<h2>Du er den viktigste brikken</h2><p>Mange tror at det viktigste i en ulykke er hvor raskt ambulansen kommer, men realiteten er at innsatsen som gjøres <em>før</em> nødetatene ankommer, ofte avgjør om pasienten overlever. I Norge kan det ta tid før ambulansen når frem, spesielt utenfor bykjernene.</p><h3>Hjernen dør raskt</h3><p>Hjernen er ekstremt sårbar for oksygenmangel. Allerede etter 3–4 minutter uten oksygentilførsel begynner hjerneceller å dø. Etter 10 minutter er sjansen for å overleve minimal uten livreddende tiltak.</p><h3>Din innsats teller</h3><p>Statistikk viser at umiddelbar førstehjelp kan mangedoble sjansen for overlevelse. Din rolle er å kjøpe tid – å holde en minimal blodsirkulasjon i gang slik at hjernen får nok oksygen til at helsepersonell kan ta over. Det er bedre å gjøre litt feil enn å ikke gjøre noe som helst.</p>"
                },
                {
                    title: "Kjeden som redder liv",
                    html: "<h2>Fire kritiske steg</h2><p>Internasjonalt bruker man begrepet 'The Chain of Survival'. Hvis ett av disse leddene brytes, synker overlevelsessjansen dramatisk.</p><ol><li><strong>Tidlig varsling (113):</strong> Jo raskere nø sentralen vet om hendelsen, jo raskere kommer hjelpen. Operatøren kan også veilede deg i HLR over telefonen mens du venter.</li><li><strong>Tidlig HLR:</strong> Brystkompresjoner og innblåsninger erstatter hjertets pumpefunksjon mekanisk. Dette starter ikke hjertet, men det forsyner hjernen med oksygenrikt blod.</li><li><strong>Tidlig defibrillering:</strong> Ved hjertestans er hjertet ofte i 'kaos' (ventrikkelflimmer). Et strømstøt fra en hjertestarter er det eneste som kan nullstille hjertet slik at det slår normalt igjen.</li><li><strong>Etterbehandling:</strong> Dette skjer på sykehuset, men kvaliteten på denne behandlingen avhenger av hvor godt jobb du gjorde i de tre første stegene.</li></ol>"
                },
                {
                    title: "Varsling",
                    html: "<h2>Ring 113 - Medisinsk Nødtelefon</h2><p>I en stresset situasjon kan det være vanskelig å huske nummeret eller forklare hvor man er. Vi anbefaler sterkt at du laster ned appen <strong>'Hjelp 113'</strong> fra Norsk Luftambulanse.</p><h3>Hvorfor bruke appen?</h3><p>Når du ringer via appen, sender telefonen din automatisk nøyaktige GPS-koordinater til nødsentralen. Dette sparer verdifull tid, spesielt hvis du er på en byggeplass, i et stort anlegg eller på ukjent adresse.</p><h3>Samtalen</h3><ul><li><strong>Hva:</strong> Fortell kort hva som har skjedd (f.eks. 'strømgjennomgang', 'fall', 'bevisstløs person').</li><li><strong>Hvem:</strong> Si navnet ditt og hvilket nummer du ringer fra.</li><li><strong>Hvor:</strong> Beskriv adressen eller møtepunktet nøyaktig.</li></ul><p>Sett telefonen på høyttaler og legg den ved siden av deg. Ikke legg på før operatøren sier at du kan gjøre det.</p>"
                },
                {
                    title: "Sikkerhet ved strømulykker",
                    html: "<h2>Tenk egensikkerhet!</h2><p>Strømulykker skiller seg fra andre ulykker fordi skadestedet kan være livsfarlig for førstehjelperen. Hvis en person henger fast i en lavspentkilde, eller ligger nær en høyspentkilde, kan strømmen overføres til deg hvis du berører dem.</p><div class=\"warning-box\"><strong>FARE - STOPP OPP:</strong><br>Ditt instinkt vil være å løpe bort for å hjelpe, men du må bekjempe dette. Bruk 5 sekunder på å overskue situasjonen. Er strømmen brutt?</div><h3>Hvordan sikre stedet?</h3><p>Ved lavspent: Trekk ut støpselet eller slå av sikringen. Hvis dette ikke er mulig, bruk en ikke-ledende gjenstand (tørt treverk, plast) til å skyve personen vekk fra strømkilden. Ved høyspent: Hold stor avstand og vent på fagfolk. Du kan ikke redde noen hvis du selv blir et offer.</p>"
                },
                {
                    title: "Undersøkelse av pasient",
                    html: "<h2>Sjekk bevissthet og pust</h2><p>Når stedet er sikret, må du raskt avklare pasientens tilstand. Følg denne prosedyren:</p><h3>1. Bevissthet</h3><p>Rop høyt til personen: 'Hører du meg?'. Rist forsiktig i skuldrene. Hvis det ikke er noen reaksjon, er personen bevisstløs. Da slapper all muskulatur av, inkludert tungen, som kan falle bakover og blokkere luftveiene.</p><h3>2. Frie luftveier</h3><p>Legg en hånd på pannen og to fingre under haken. Bøy hodet forsiktig bakover og løft haken frem. Dette trekker tungen vekk fra svelget.</p><h3>3. Pust</h3><p>Hold luftveiene åpne. Legg kinnet ditt over pasientens munn og nese. Se ned langs brystkassen. Bruk inntil 10 sekunder:<br>– <strong>Se:</strong> Beveger brystkassen seg?<br>– <strong>Lytt:</strong> Hører du pustelyder?<br>– <strong>Føl:</strong> Kjenner du pust mot kinnet?</p>"
                },
                {
                    title: "Sideleie",
                    html: "[Image of recovery position diagram]<h2>Bevisstløs, men puster</h2><p>Hvis du etter 10 sekunders sjekk er sikker på at personen puster normalt, men er bevisstløs, er det kritisk å sikre at luftveiene <em>forblir</em> åpne. En bevisstløs person som ligger på ryggen kan kveles av sin egen tunge eller av oppkast.</p><h3>Slik gjør du det:</h3><ul><li>Plasser armen nærmest deg i en 90-graders vinkel oppover.</li><li>Legg den andre hånden mot pasientens kinn (baksiden av hånden mot kinnet).</li><li>Ta tak i kneet lengst unna deg og dra pasienten mot deg slik at de ruller over på siden.</li><li>Juster hodet bakover for å sikre frie luftveier.</li></ul><p><strong>Viktig:</strong> Selv om personen ligger i sideleie, må du sjekke pusten kontinuerlig (hvert minutt). Tilstanden kan raskt forverres til hjertestans.</p>"
                },
                {
                    title: "Hjerte- og lungeredning (HLR)",
                    html: "[Image of CPR hand placement]<h2>30:2 - Start umiddelbart</h2><p>Hvis pasienten <strong>ikke</strong> puster, eller puster unormalt (rare gispelyder), skal du anta hjertestans. Start HLR med en gang. Ikke bruk tid på å lete etter puls.</p><h3>Kompresjoner (30 stk)</h3><p>Plasser hendene midt på brystkassen, mellom brystvortene. Flett fingrene. Hold armene strake og bruk kroppsvekten din. Trykk brystkassen ned 5–6 cm. Takten skal være høy (100–120 trykk i minuttet – tenk 'Stayin' Alive'). Slipp brystkassen helt opp mellom hvert trykk for at hjertet skal fylles med blod.</p><h3>Innblåsninger (2 stk)</h3><p>Etter 30 trykk: Sikre frie luftveier, klem igjen nesen, og blås rolig inn i munnen til brystkassen hever seg. Gjenta syklusen 30:2 uten stans til ambulansepersonell ber deg stoppe.</p>"
                },
                {
                    title: "Hjertestarter (AED)",
                    html: "<h2>Din beste venn i nøden</h2><p>En hjertestarter (AED) er en maskin som kan analysere hjerterytmen og avgjøre om et elektrisk sjokk er nødvendig for å restarte hjertet. Moderne hjertestartere er laget for at hvem som helst skal kunne bruke dem, helt uten opplæring.</p><h3>Fremgangsmåte</h3><ol><li><strong>Slå på maskinen:</strong> Dette er det viktigste steget. Maskinen vil umiddelbart begynne å snakke til deg.</li><li><strong>Følg stemmen:</strong> Den vil be deg feste elektrodene på pasientens brystkasse. Det er tegninger på elektrodene som viser nøyaktig hvor de skal sitte (én oppe til høyre, én nede til venstre).</li><li><strong>Analyse:</strong> Maskinen vil be deg ikke røre pasienten mens den analyserer.</li><li><strong>Sjokk:</strong> Hvis maskinen anbefaler sjokk, sørg for at ingen tar på pasienten, og trykk på sjokk-knappen (eller vent på at den gjør det automatisk).</li></ol>"
                },
                {
                    title: "Hvor er hjertestarteren?",
                    html: "<h2>Hvert sekund teller</h2><p>Sjansen for å overleve en hjertestans reduseres med ca. 10% for hvert minutt som går uten strømstøt. Hvis du må bruke 5 minutter på å lete etter hjertestarteren, er sjansen for overlevelse halvert. Derfor må du vite hvor den er <em>før</em> ulykken skjer.</p><div class=\"warning-box\"><strong>LOKASJON:</strong><br>I dette bygget henger hjertestarteren synlig montert på veggen <strong>rett innenfor hovedinngangen</strong>.</div><p>Hvis dere er flere til stede: Én starter HLR (30:2) umiddelbart, mens den andre løper for å hente hjertestarteren. Ikke stopp kompresjonene mens den andre henter utstyret.</p>"
                },
                {
                    title: "Brannskader ved strøm",
                    html: "<h2>Den usynlige skaden</h2><p>Strømgjennomgang forårsaker ofte brannskader. Det skumle med strøm er at strømmen følger blodårer, nerver og muskler gjennom kroppen. Derfor kan huden se nesten uskadd ut (kanskje bare små inn- og utgangsmerker), mens det er store skader innvendig.</p><h3>Behandling: Kjøling</h3><p>Kjøling begrenser skadeomfanget og lindrer smerte. Bruk lunkent vann (ca. 20 grader) i 20 minutter. Ikke bruk iskaldt vann eller snø, da dette får blodårene til å trekke seg sammen, noe som reduserer blodsirkulasjonen til det skadde vevet og kan forverre skaden.</p><p><strong>Husk:</strong> Alle som har hatt strømgjennomgang gjennom kroppen skal til sykehus for sjekk av hjerterytme og nyrefunksjon, selv om de føler seg helt friske.</p>"
                },
                {
                    type: "quiz",
                    questions: [
                        {
                            q: "Hva er nødnummeret for medisinsk nødmeldetjeneste i Norge?",
                            options: [
                                "110",
                                "112",
                                "113"
                            ],
                            ans: 2
                        },
                        {
                            q: "Hvor er hjertestarteren plassert i dette bygget?",
                            options: [
                                "På lageret",
                                "Rett innenfor hovedinngangen",
                                "I kantinen"
                            ],
                            ans: 1
                        },
                        {
                            q: "Hva er forholdet mellom brystkompresjoner og innblåsninger ved HLR?",
                            options: [
                                "30:2",
                                "15:2",
                                "20:5"
                            ],
                            ans: 0
                        },
                        {
                            q: "Hva er det første du må gjøre ved en strømulykke?",
                            options: [
                                "Starte HLR umiddelbart",
                                "Sikre at strømmen er koblet fra",
                                "Gi pasienten vann"
                            ],
                            ans: 1
                        },
                        {
                            q: "Hva gjør du med en person som er bevisstløs men puster normalt?",
                            options: [
                                "Legger i stabilt sideleie",
                                "Starter HLR",
                                "Setter personen opp i en stol"
                            ],
                            ans: 0
                        },
                        {
                            q: "Hvor lenge skal du kjøle en brannskade?",
                            options: [
                                "2 minutter med isvann",
                                "20 minutter med lunkent vann",
                                "Kjøling er ikke nødvendig"
                            ],
                            ans: 1
                        },
                        {
                            q: "Hvor lenge skal du sjekke om en person puster?",
                            options: [
                                "Maks 10 sekunder",
                                "Minst 1 minutt",
                                "Så lenge som mulig"
                            ],
                            ans: 0
                        },
                        {
                            q: "Må man til lege etter strømgjennomgang selv om man føler seg bra?",
                            options: [
                                "Nei, ikke hvis man ikke har brannskader",
                                "Ja, alltid",
                                "Kun hvis man besvimte"
                            ],
                            ans: 1
                        }
                    ]
                },
                {
                    title: "Completed",
                    type: "cert"
                }
            ],
            en: [
                {
                    title: "Why First Aid?",
                    html: "<h2>You are the most important link</h2><p>Many believe the most critical factor in an accident is how fast the ambulance arrives. In reality, the efforts made <em>before</em> emergency services arrive often determine survival. In Norway, ambulance response times vary, especially outside city centers.</p><h3>The Brain Dies Quickly</h3><p>The brain is extremely vulnerable to lack of oxygen. After just 3–4 minutes without oxygen, brain cells begin to die. After 10 minutes, the chance of survival is minimal without life-saving measures.</p><h3>Your Actions Count</h3><p>Statistics show that immediate first aid can multiply survival chances. Your role is to buy time—to maintain minimal blood circulation so the brain gets enough oxygen until medical professionals take over. It is far better to do something slightly imperfectly than to do nothing at all.</p>"
                },
                {
                    title: "The Chain of Survival",
                    html: "<h2>Four Critical Steps</h2><p>Internationally, the concept 'The Chain of Survival' is used. If one of these links breaks, the chance of survival drops dramatically.</p><ol><li><strong>Early Access (113):</strong> The sooner the dispatch center knows, the sooner help arrives. The operator can also guide you in CPR over the phone while you wait.</li><li><strong>Early CPR:</strong> Chest compressions and rescue breaths mechanically replace the heart's pumping function. This doesn't restart the heart, but it supplies the brain with oxygenated blood.</li><li><strong>Early Defibrillation:</strong> In cardiac arrest, the heart is often in 'chaos' (ventricular fibrillation). An electric shock from an AED is the only thing that can reset the heart to beat normally again.</li><li><strong>Post-resuscitation Care:</strong> This happens at the hospital, but the quality of this care depends entirely on how well you performed the first three steps.</li></ol>"
                },
                {
                    title: "Alerting",
                    html: "<h2>Call 113 - Medical Emergency</h2><p>In a stressful situation, it can be hard to remember the number or explain your location. We strongly recommend downloading the app <strong>'Hjelp 113'</strong> from the Norwegian Air Ambulance.</p><h3>Why use the app?</h3><p>When you call via the app, your phone automatically sends precise GPS coordinates to the emergency center. This saves valuable time, especially if you are on a construction site, in a large facility, or at an unknown address.</p><h3>The Conversation</h3><ul><li><strong>What:</strong> Briefly state what happened (e.g., 'electric shock', 'fall', 'unconscious person').</li><li><strong>Who:</strong> State your name and the number you are calling from.</li><li><strong>Where:</strong> Describe the address or meeting point exactly.</li></ul><p>Put the phone on speaker and place it next to you. Do not hang up until the operator tells you to.</p>"
                },
                {
                    title: "Electrical Safety",
                    html: "<h2>Personal Safety First!</h2><p>Electrical accidents differ from others because the scene can be lethal to the first aider. If a person is stuck to a low-voltage source, or lying near high voltage, current can transfer to you if you touch them.</p><div class=\"warning-box\"><strong>DANGER - STOP:</strong><br>Your instinct will be to run over to help, but you must fight this. Take 5 seconds to assess the situation. Is the power disconnected?</div><h3>How to secure the scene?</h3><p>For low voltage: Unplug the device or flip the fuse/breaker. If impossible, use a non-conductive object (dry wood, plastic) to push the person away from the source. For high voltage: Keep a safe distance and wait for professionals. You cannot save anyone if you become a victim yourself.</p>"
                },
                {
                    title: "Patient Assessment",
                    html: "<h2>Check consciousness and breathing</h2><p>Once the scene is safe, quickly determine the patient's condition. Follow this procedure:</p><h3>1. Consciousness</h3><p>Shout loudly: 'Can you hear me?'. Shake their shoulders gently. If there is no reaction, they are unconscious. Muscles relax, including the tongue, which can fall back and block the airway.</p><h3>2. Open Airways</h3><p>Place one hand on the forehead and two fingers under the chin. Gently tilt the head back and lift the chin forward. This pulls the tongue away from the throat.</p><h3>3. Breathing</h3><p>Keep airways open. Place your cheek over the patient's mouth/nose. Look down along the chest. Spend up to 10 seconds:<br>– <strong>Look:</strong> Is the chest moving?<br>– <strong>Listen:</strong> Do you hear breathing sounds?<br>– <strong>Feel:</strong> Do you feel breath against your cheek?</p>"
                },
                {
                    title: "Recovery Position",
                    html: "[Image of recovery position illustration]<h2>Unconscious but breathing</h2><p>If, after a 10-second check, you are sure the person is breathing normally but is unconscious, it is critical to keep the airway open. An unconscious person on their back can choke on their tongue or vomit.</p><h3>How to do it:</h3><ul><li>Place the arm nearest you at a 90-degree angle upwards.</li><li>Place the other hand against the patient's cheek (back of hand to cheek).</li><li>Grab the knee furthest from you and pull the patient towards you so they roll onto their side.</li><li>Adjust the head back to ensure open airways.</li></ul><p><strong>Important:</strong> Even in the recovery position, check breathing continuously (every minute). Their condition can quickly deteriorate to cardiac arrest.</p>"
                },
                {
                    title: "CPR (Cardiopulmonary Resuscitation)",
                    html: "<h2>30:2 - Start Immediately</h2><p>If the patient is <strong>not</strong> breathing, or breathing abnormally (strange gasping sounds), assume cardiac arrest. Start CPR immediately. Do not waste time looking for a pulse.</p><h3>Compressions (30)</h3><p>Place hands in the center of the chest, between the nipples. Interlock fingers. Keep arms straight and use your body weight. Push the chest down 5–6 cm. The tempo should be fast (100–120 beats per minute – think 'Stayin' Alive'). Let the chest recoil completely up between pushes to let the heart fill with blood.</p><h3>Breaths (2)</h3><p>After 30 pushes: Open airway, pinch the nose, and blow calmly into the mouth until the chest rises. Repeat the 30:2 cycle without stopping until paramedics take over.</p>"
                },
                {
                    title: "Defibrillator (AED)",
                    html: "<h2>Your Best Friend</h2><p>An AED is a machine that analyzes heart rhythm and decides if an electric shock is needed to restart the heart. Modern AEDs are designed so anyone can use them without training.</p><h3>Procedure</h3><ol><li><strong>Turn it on:</strong> This is the most important step. The machine will immediately start talking to you.</li><li><strong>Follow the voice:</strong> It will tell you to attach pads to the patient's chest. Diagrams on the pads show exactly where (one top right, one bottom left).</li><li><strong>Analyze:</strong> The machine will tell you not to touch the patient while it analyzes.</li><li><strong>Shock:</strong> If the machine advises a shock, ensure no one is touching the patient, and press the shock button (or wait if it's fully automatic).</li></ol>"
                },
                {
                    title: "Where is the AED?",
                    html: "<h2>Every Second Counts</h2><p>The chance of surviving cardiac arrest drops by approx. 10% for every minute that passes without a shock. If you spend 5 minutes looking for the AED, survival chances are halved. You must know where it is <em>before</em> the accident.</p><div class=\"warning-box\"><strong>LOCATION:</strong><br>In this building, the defibrillator is mounted on the wall <strong>just inside the main entrance</strong>.</div><p>If multiple people are present: One starts CPR (30:2) immediately, while the other runs to get the AED. Do not stop compressions while the other retrieves the equipment.</p>"
                },
                {
                    title: "Electrical Burns",
                    html: "<h2>The Invisible Injury</h2><p>Electric shock often causes burns. The danger with electricity is that current follows blood vessels, nerves, and muscles through the body. The skin might look mostly fine (perhaps just small entry/exit marks), while there is massive internal damage.</p><h3>Treatment: Cooling</h3><p>Cooling limits damage and relieves pain. Use lukewarm water (approx. 20°C) for 20 minutes. Do not use ice-cold water or snow, as this causes blood vessels to constrict, reducing circulation to the injured tissue and potentially worsening the injury.</p><p><strong>Remember:</strong> Anyone who has had electricity pass through their body must go to the hospital to check heart rhythm and kidney function, even if they feel fine.</p>"
                },
                {
                    type: "quiz",
                    questions: [
                        {
                            q: "What is the number for medical emergencies in Norway?",
                            options: [
                                "110",
                                "112",
                                "113"
                            ],
                            ans: 2
                        },
                        {
                            q: "Where is the defibrillator located in this building?",
                            options: [
                                "In the warehouse",
                                "Just inside the main entrance",
                                "In the canteen"
                            ],
                            ans: 1
                        },
                        {
                            q: "What is the ratio of chest compressions to breaths in CPR?",
                            options: [
                                "30:2",
                                "15:2",
                                "20:5"
                            ],
                            ans: 0
                        },
                        {
                            q: "What is the first thing you must do in an electrical accident?",
                            options: [
                                "Start CPR immediately",
                                "Ensure the power is disconnected",
                                "Give the patient water"
                            ],
                            ans: 1
                        },
                        {
                            q: "What do you do with a person who is unconscious but breathing normally?",
                            options: [
                                "Place in recovery position",
                                "Start CPR",
                                "Sit them up in a chair"
                            ],
                            ans: 0
                        },
                        {
                            q: "How long should you cool a burn injury?",
                            options: [
                                "2 minutes with ice water",
                                "20 minutes with lukewarm water",
                                "Cooling is not necessary"
                            ],
                            ans: 1
                        },
                        {
                            q: "How long should you check if a person is breathing?",
                            options: [
                                "Max 10 seconds",
                                "At least 1 minute",
                                "As long as possible"
                            ],
                            ans: 0
                        },
                        {
                            q: "Must you see a doctor after an electric shock even if you feel fine?",
                            options: [
                                "No, not if you don't have burns",
                                "Yes, always",
                                "Only if you fainted"
                            ],
                            ans: 1
                        }
                    ]
                },
                {
                    title: "Completed",
                    type: "cert"
                }
            ]
        }
    },
    "refleks_sikkerhet_2025": {
        id: "refleks_sikkerhet_2025",
        revision: "2025-12-09",
        title: {
            no: "Refleks og Sikkerhet i Mørketiden (Utvidet)",
            en: "Reflectors and Safety in the Dark Season (Extended)"
        },
        content: {
            no: [
                {
                    title: "Introduksjon",
                    html: `
                <h1>Velkommen til mørketiden</h1>
                <p>Når vinteren kommer, blir dagene kortere og mørkere. Dette kurset gir deg viktig kunnskap om synlighet, kulde og sikkerhet.</p>
                <p>Bruk av refleks er den enkleste og mest effektive måten å unngå ulykker på i mørket.</p>
            `
                },
                {
                    title: "Synlighet redder liv",
                    html: `
                <h2>Ser bilisten deg?</h2>
                <p>Uten refleks er du nesten usynlig i mørket, selv med gatebelysning.</p>
                <div class="highlight-box">
                    <strong>Fakta:</strong> En bilist som kjører med nærlys oppdager deg først på <strong>25–30 meters</strong> avstand uten refleks. Med refleks er du synlig på <strong>140 meters</strong> avstand.
                </div>
            `
                },
                {
                    title: "1. Optimal Plassering",
                    html: `
                <h2>Hvor skal refleksen henge?</h2>
                <p>En refleks som beveger seg er mer synlig enn en som henger stille.</p>
                <ul>
                    <li>Fest henge-refleksen i <strong>knehøyde</strong>. Bilens lykter treffer lavt først.</li>
                    <li>Bruk refleks på <strong>begge sider</strong> av kroppen for å bli sett fra flere vinkler.</li>
                    <li>Bruk av "slapwrap"-reflekser på armer og ben synliggjør bevegelsene dine.</li>
                </ul>
            `
                },
                {
                    title: "2. Refleks er ferskvare",
                    html: `
                <h2>Sjekk utstyret ditt</h2>
                <p>Reflekser varer ikke evig. Riper og slitasje reduserer refleksjonen betydelig.</p>
                <div class="warning-box">
                    <strong>Advarsel:</strong> Refleksvester tåler kun et visst antall vask. Sjekk vaskelappen (ofte maks 25 ganger). Er vesten blass eller refleksbåndet ripete? <strong>Bytt den ut.</strong>
                </div>
            `
                },
                {
                    title: "3. Kulde og Konsentrasjon",
                    html: `
                <h2>Kle deg riktig</h2>
                <p>Når du fryser, bruker kroppen energi på å holde varmen i stedet for å fokusere på oppgaven. Dette øker risikoen for feilhandlinger.</p>
                <div class="highlight-box">
                    <strong>Tips:</strong> Bruk trelagsprinsippet:
                    <ol>
                        <li>Ull innerst (transporterer fukt).</li>
                        <li>Mellomlag (isolerer).</li>
                        <li>Ytterlag (vind- og vanntett).</li>
                    </ol>
                </div>
            `
                },
                {
                    title: "4. Glatt underlag",
                    html: `
                <h2>Unngå fallskader</h2>
                <p>Is og snø er blant de vanligste årsakene til personskader om vinteren.</p>
                <p>Vær spesielt oppmerksom på "svart is" på asfalt; den ser våt ut, men er i realiteten frossen.</p>
                <div class="danger-box">
                    <strong>FARE:</strong> Ikke hopp ned fra lastebiler eller maskiner. Bruk alltid <strong>trepunktsgrep</strong> og sjekk underlaget før du setter ned foten. Bruk brodder ved behov.
                </div>
            `
                },
                {
                    title: "5. Kjøretøysjekk",
                    html: `
                <h2>Før du kjører</h2>
                <p>Sikkerhet gjelder også når du er sjåfør. I mørketiden er godt lys og fri sikt kritisk.</p>
                <ul>
                    <li>Sjekk at alle lys fungerer (husk baklysene!).</li>
                    <li>Skrap <strong>alle</strong> ruter isfrie – ikke lag bare et lite "kikkhull".</li>
                    <li>Fjern snø fra taket – det kan skli ned på frontruten ved oppbremsing eller blåse av og treffe bilen bak.</li>
                </ul>
            `
                },
                {
                    title: "Advarsler og Risiko",
                    html: `
                <h2>Oppsummering av risiko</h2>
                <p>Kombinasjonen av mørke, kulde og nedbør krever ekstra årvåkenhet.</p>
                <div class="danger-box">
                    <strong>FARE:</strong> Aldri anta at en maskinfører eller sjåfør ser deg i mørket, selv om du ser dem. Opprett alltid øyekontakt eller bruk signal før du beveger deg inn i kjørebanen.
                </div>
            `
                },
                {
                    title: "Kunnskapstest",
                    type: "quiz",
                    questions: [
                        {
                            q: "Hvor mye lenger unna kan en bilist se deg hvis du bruker refleks?",
                            options: ["Omtrent samme avstand", "Ca. 5 ganger så langt (140m vs 25m)", "Dobbelt så langt"],
                            ans: 1
                        },
                        {
                            q: "Hvor bør en hengerefleks ideelt sett plasseres?",
                            options: ["I skulderhøyde", "I knehøyde", "På ryggen"],
                            ans: 1
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
                    title: "Introduction",
                    html: `
                <h1>Welcome to the Dark Season</h1>
                <p>As winter arrives, days get shorter and darker. This course provides vital knowledge on visibility, cold weather, and safety.</p>
                <p>Using a reflector is the simplest and most effective way to avoid accidents in the dark.</p>
            `
                },
                {
                    title: "Visibility Saves Lives",
                    html: `
                <h2>Can the driver see you?</h2>
                <p>Without a reflector, you are nearly invisible in the dark, even with streetlights.</p>
                <div class="highlight-box">
                    <strong>Fact:</strong> A driver using dipped headlights will only detect you at <strong>25–30 meters</strong> without a reflector. With a reflector, you are visible at <strong>140 meters</strong>.
                </div>
            `
                },
                {
                    title: "1. Optimal Placement",
                    html: `
                <h2>Where should the reflector hang?</h2>
                <p>A reflector that moves is more visible than one that is stationary.</p>
                <ul>
                    <li>Attach the hanging reflector at <strong>knee height</strong>. Car headlights illuminate the lower ground first.</li>
                    <li>Use reflectors on <strong>both sides</strong> of your body to be seen from multiple angles.</li>
                    <li>Using slap-wrap reflectors on arms and legs highlights your body's movement.</li>
                </ul>
            `
                },
                {
                    title: "2. Reflectors Wear Out",
                    html: `
                <h2>Check your equipment</h2>
                <p>Reflectors do not last forever. Scratches and wear significantly reduce reflective capacity.</p>
                <div class="warning-box">
                    <strong>Warning:</strong> High-visibility vests can only withstand a certain number of washes. Check the label (often max 25 times). If the vest is faded or the reflective tape is scratched, <strong>replace it immediately.</strong>
                </div>
            `
                },
                {
                    title: "3. Cold and Concentration",
                    html: `
                <h2>Dress Correctly</h2>
                <p>When you are cold, your body uses energy to maintain heat rather than focusing on the task. This increases the risk of error.</p>
                <div class="highlight-box">
                    <strong>Tip:</strong> Use the three-layer principle:
                    <ol>
                        <li>Wool base layer (transports moisture).</li>
                        <li>Middle layer (insulates).</li>
                        <li>Outer layer (wind and waterproof).</li>
                    </ol>
                </div>
            `
                },
                {
                    title: "4. Slippery Surfaces",
                    html: `
                <h2>Prevent Falls</h2>
                <p>Ice and snow are among the most common causes of injuries during winter.</p>
                <p>Be especially aware of "black ice" on asphalt; it looks wet but is actually frozen solid.</p>
                <div class="danger-box">
                    <strong>DANGER:</strong> Do not jump down from trucks or machines. Always use <strong>three-point contact</strong> and verify the ground conditions before placing your foot. Use ice cleats if necessary.
                </div>
            `
                },
                {
                    title: "5. Vehicle Check",
                    html: `
                <h2>Before You Drive</h2>
                <p>Safety also applies when you are behind the wheel. Good lighting and visibility are critical in the dark season.</p>
                <ul>
                    <li>Check that all lights work (including tail lights!).</li>
                    <li>Scrape <strong>all</strong> windows free of ice – do not just make a small "peephole".</li>
                    <li>Remove snow from the roof – it can slide onto the windshield when braking or blow onto the vehicle behind you.</li>
                </ul>
            `
                },
                {
                    title: "Warnings and Risks",
                    html: `
                <h2>Risk Summary</h2>
                <p>The combination of darkness, cold, and precipitation requires extra vigilance.</p>
                <div class="danger-box">
                    <strong>DANGER:</strong> Never assume a machine operator or driver sees you in the dark, even if you see them. Always establish eye contact or signal before crossing their path.
                </div>
            `
                },
                {
                    title: "Knowledge Test",
                    type: "quiz",
                    questions: [
                        {
                            q: "How much further away can a driver see you if you use a reflector?",
                            options: ["About the same distance", "Approx. 5 times further (140m vs 25m)", "Twice as far"],
                            ans: 1
                        },
                        {
                            q: "Where should a hanging reflector ideally be placed?",
                            options: ["At shoulder height", "At knee height", "On your back"],
                            ans: 1
                        }
                    ]
                },
                {
                    title: "Completed",
                    type: "cert"
                }
            ]
        }
    }
};