const express = require("express");
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res)=> {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    }).with('name');

    const result =schema.validate(req.body);

    if(result.error){
        res.status(400).send(result.error);
        return ;
    }

    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //if not exsisting, return 404

    //validate
    //if invalid, return 400 - Bad request

    //Update course
    //Return the updated course
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course not exist')
    }
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/posts/:day', (req, res) =>{
    res.send(req.query)
});

//PORT
const port =process.env.PORT || 3000
app.listen(port, () => console.log(`Server Listening at port ${port}`));