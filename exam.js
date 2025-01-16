const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/SDN');

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    // grade: String
});

const questionSchema = new mongoose.Schema({
    numberOfQuestions: Number,
    questions: [String],
    answers: [Number],
    numberOfAnswers: Number,
});

const testSchema = new mongoose.Schema({
    title: String,
    date: Date,
    question: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] 
});

const scoreSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    score: Number
});

const Student = mongoose.model('Student', studentSchema);
const Question = mongoose.model('Question', questionSchema);
const Test = mongoose.model('Test', testSchema);
const Score = mongoose.model('Score', scoreSchema);

console.log('Database connected and schemas created');

const createStudents = async () => {
    const student1 = new Student({
        name: 'John Doe',
        age: 20,
        grade: 'A'
    });
    const student2 = new Student({
        name: 'Jane Smith',
        age: 22,
        grade: 'B'
    });
    await student1.save();
    await student2.save();
    console.log('Students created');
};
const createQuestions = async () => {
    const question1 = new Question({
        numberOfQuestions: 3,
        questions: ['What is 2+2?', 'What is the capital of France?', 'Who is the CEO of Tesla?'],
        answers: [1, 2],
        numberOfAnswers: 2
    });
    const question2 = new Question({
        numberOfQuestions: 2,
        questions: ['What is 5+5?', 'What is the square root of 16?'],
        answers: [0],
        numberOfAnswers: 1
    });
    await question1.save();
    await question2.save();
    console.log('Questions created');
};

const createTests = async () => {
    const questions = await Question.find(); 
    const test1 = new Test({
        title: 'Math and General Knowledge Test',
        date: new Date(),
        question: [questions[0]._id, questions[1]._id] 
    });
    const test2 = new Test({
        title: 'Basic Math Test',
        date: new Date(),
        question: [questions[1]._id] 
    });
    await test1.save();
    await test2.save();
    console.log('Tests created');
};

const createScores = async () => {
    const students = await Student.find(); 
    const tests = await Test.find(); 
    const score1 = new Score({
        student: students[0]._id,
        test: tests[0]._id,
        score: 80
    });
    const score2 = new Score({
        student: students[1]._id,
        test: tests[1]._id,
        score: 90
    });
    await score1.save();
    await score2.save();
    console.log('Scores created');
};

const createSampleData = async () => {
    await createStudents();
    await createQuestions();
    await createTests();
    await createScores();
};

createSampleData()
    .then(() => mongoose.disconnect())
    .catch(err => console.error(err));