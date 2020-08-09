const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // inset data
    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "553599760853", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    }

    classValue = {
        subject: 1, 
        cost: "20", 
        // The proffy ID will come from the database
    }

    classScheduleValues = [
        // Class ID will come from the database after we register the class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }

    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Check data inserted

    // All proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // get classes of an specific proffy
    // and bring his data 
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys 
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectedClassesAndProffys)

    // The time that the client works, for instance, from 8h to 18h
    // time_from (8h) needs to be less or equal to the requested time
    // time_to needs to be above
    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "420"
        AND class_schedule.time_to > "1300"

    `)

    // console.log(selectedClassesSchedules)
})