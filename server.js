// Import npm packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');
var session = require('express-session');

require('dotenv').config();
const app = express();
app.disable('etag');

// Configure port
const PORT = process.env.PORT || 3000;

// Passport Config
require('./config/passport.local')(passport);

// DB Config
mongoose
	.connect(process.env.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB database connection established successfully'))
	.catch((err) => {
		console.log(process.env.mongoURI);
		console.log(err)
	});

// Express body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(
	session({
		secret: process.env.JWTkeys || require('./config/keys').secretOrKey,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('client', 'build', 'index.html'));
	});
}

// HTTP request logger
app.use(morgan('tiny'));

// Routes
const usersRouter = require('./routes/api/users');
const positionsRouter = require('./routes/api/positions');
const dutiesRouter = require('./routes/api/duties');
const employeesRouter = require('./routes/api/employees');
const payrollsRouter = require('./routes/api/payrolls');
app.use('/users', usersRouter);
app.use('/positions', positionsRouter);
app.use('/duties', dutiesRouter);
app.use('/employees', employeesRouter);
app.use('/payrolls', payrollsRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
