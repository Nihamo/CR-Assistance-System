

const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb+srv://rifahb03:y12FgL6D3BQJBhse@hackathon.tvx7w.mongodb.net/?retryWrites=true&w=majority&appName=Hackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully!');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Teacher', 'Admin'], required: true },
    contact_number: { type: String }
});

const User = mongoose.model('User', userSchema);

// Class Schema and Model
const classSchema = new mongoose.Schema({
    class_name: { type: String, required: true },
    cr_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Class = mongoose.model('Class', classSchema);

// Teacher Schema and Model
const teacherSchema = new mongoose.Schema({
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

// Subject Schema and Model
const subjectSchema = new mongoose.Schema({
    subject_name: { type: String, required: true },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }
});

const Subject = mongoose.model('Subject', subjectSchema);

// Student Schema and Model
const studentSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }
});

const Student = mongoose.model('Student', studentSchema);

// Admin Schema and Model
const adminSchema = new mongoose.Schema({
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    admin_type: { type: String, enum: ['Teacher', 'CR', 'Management'], required: true }
});

const Admin = mongoose.model('Admin', adminSchema);

// Announcement Schema and Model
const announcementSchema = new mongoose.Schema({
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    content: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

// Polls Schema and Model
const pollSchema = new mongoose.Schema({
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    poll_question: { type: String, required: true },
    options: [String]
});

const Poll = mongoose.model('Poll', pollSchema);

// Poll Responses Schema and Model
const pollResponseSchema = new mongoose.Schema({
    poll_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    selected_option: { type: String }
});

const PollResponse = mongoose.model('PollResponse', pollResponseSchema);

// Feedback Schema and Model
const feedbackSchema = new mongoose.Schema({
    submitted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    feedback_text: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Resolved'], default: 'Pending' }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Connecting the schemas with the database
async function createSampleData() {
    try {
        // Create Users (Students, Teachers, Admins)
        const user1 = new User({ name: "John Doe", email: "john@example.com", password_hash: "hashedpassword", role: "Student", contact_number: "1234567890" });
        const user2 = new User({ name: "Jane Smith", email: "jane@example.com", password_hash: "hashedpassword", role: "Teacher", contact_number: "0987654321" });
        
        await user1.save();
        await user2.save();

        // Create Classes
        const class1 = new Class({ class_name: "B.Tech CS Sem 3", cr_id: user1._id });
        const class2 = new Class({ class_name: "B.Tech IT Sem 5", cr_id: user1._id });

        await class1.save();
        await class2.save();

        // Create Subjects
        const subject1 = new Subject({ subject_name: "Data Structures", class_id: class1._id });
        const subject2 = new Subject({ subject_name: "Algorithms", class_id: class2._id });

        await subject1.save();
        await subject2.save();

        // Assign Teachers to Classes and Subjects
        const teacher1 = new Teacher({ teacher_id: user2._id, subject_id: subject1._id, class_id: class1._id });
        const teacher2 = new Teacher({ teacher_id: user2._id, subject_id: subject2._id, class_id: class2._id });

        await teacher1.save();
        await teacher2.save();

        console.log("Sample data created successfully!");
    } catch (error) {
        console.error("Error creating sample data:", error);
    }
}

// Uncomment to populate the database with sample data
createSampleData();

module.exports = {
    User,
    Class,
    Teacher,
    Subject,
    Student,
    Admin,
    Announcement,
    Poll,
    PollResponse,
    Feedback
};
