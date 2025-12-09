export const courses = {
    "sample_course_id": {
        id: "sample_course_id",
        revision: "2025-01-01",
        title: {
            no: "Eksempelkurs",
            en: "Sample Course"
        },
        content: {
            no: [
                {
                    title: "Introduksjon",
                    html: `
                    <h1>Velkommen</h1>
                    <p>Dette er et <strong>eksempelkurs</strong> for å vise strukturen.</p>
                    <div class="highlight-box">
                        <strong>Info:</strong> Dette er en informasjonsboks.
                    </div>
                `
                },
                {
                    title: "Advarsler",
                    html: `
                    <h2>Sikkerhet</h2>
                    <div class="warning-box">
                        <strong>Advarsel:</strong> Dette er en advarsel.
                    </div>
                    <div class="danger-box">
                        <strong>FARE:</strong> Dette er en faremelding.
                    </div>
                `
                },
                {
                    title: "Test",
                    type: "quiz",
                    questions: [
                        {
                            q: "Er dette et spørsmål?",
                            options: ["Ja", "Nei", "Kanskje"],
                            ans: 0
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
                    <h1>Welcome</h1>
                    <p>This is a <strong>sample course</strong> to demonstrate the structure.</p>
                    <div class="highlight-box">
                        <strong>Info:</strong> This is an info box.
                    </div>
                `
                },
                {
                    title: "Warnings",
                    html: `
                    <h2>Safety</h2>
                    <div class="warning-box">
                        <strong>Warning:</strong> This is a warning.
                    </div>
                    <div class="danger-box">
                        <strong>DANGER:</strong> This is a danger message.
                    </div>
                `
                },
                {
                    title: "Test",
                    type: "quiz",
                    questions: [
                        {
                            q: "Is this a question?",
                            options: ["Yes", "No", "Maybe"],
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
    }
};
