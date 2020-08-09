const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // inset data
    proffyValue = {
        name: "Pedro Lopes",
        avatar: "https://avatars0.githubusercontent.com/u/18017083?s=460&u=efa162ed5c88f927283a47e2e304c5f6b7fe65a8&v=4", 
        whatsapp: "12819651214", 
        bio: "Full-Stack Developer from Houston, TX passionate about teachnology and cyber security. Pedro loves to help others and collablerate with the commumnity on projects.", 
    }

    classValue = {
        subject: 10, 
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