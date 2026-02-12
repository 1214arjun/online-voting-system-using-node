const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'election-platform-secret',
    resave: false,
    saveUninitialized: false
}));

// Temporary data store (replace with MongoDB later)
const elections = [];
const users = [];

// Helper function to find election by ID
const findElection = (id) => elections.find(e => e.id === parseInt(id));

// Routes
app.get('/', (req, res) => {
    res.render('index', { elections });
});

// List all elections
app.get('/elections', (req, res) => {
    res.render('elections/list', { elections });
});

// Show election creation form
app.get('/elections/new', (req, res) => {
    res.render('elections/new');
});

// Create new election
app.post('/elections', (req, res) => {
    const election = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        candidates: [],
        votes: []
    };
    elections.push(election);
    res.redirect('/elections');
});

// View election details
app.get('/elections/:id', (req, res) => {
    const election = findElection(req.params.id);
    if (!election) {
        return res.status(404).send('Election not found');
    }
    res.render('elections/view', { election });
});

// Show voting form
app.get('/elections/:id/vote', (req, res) => {
    const election = findElection(req.params.id);
    if (!election) {
        return res.status(404).send('Election not found');
    }
    res.render('elections/vote', { election });
});

// Submit vote
app.post('/elections/:id/vote', (req, res) => {
    const election = findElection(req.params.id);
    if (!election) {
        return res.status(404).send('Election not found');
    }

    const vote = {
        electionId: election.id,
        candidateId: parseInt(req.body.candidateId),
        voterId: parseInt(req.body.voterId),
        timestamp: new Date()
    };

    // Check if user has already voted
    const hasVoted = election.votes.some(v => v.voterId === vote.voterId);
    if (hasVoted) {
        return res.status(400).send('You have already voted in this election');
    }

    election.votes.push(vote);
    res.redirect(`/elections/${election.id}/results`);
});

// View election results
app.get('/elections/:id/results', (req, res) => {
    const election = findElection(req.params.id);
    if (!election) {
        return res.status(404).send('Election not found');
    }
    res.render('elections/results', { election });
});

// Show add candidate form
app.get('/elections/:id/candidates/new', (req, res) => {
    const election = findElection(req.params.id);
    if (!election) {
        return res.status(404).send('Election not found');
    }
    res.render('elections/add-candidate', { election });
});

// Add candidate to election
app.post('/elections/:id/candidates', (req, res) => {
    const election = findElection(req.params.id);
    if (!election) {
        return res.status(404).send('Election not found');
    }

    const candidate = {
        id: Date.now(),
        name: req.body.name,
        description: req.body.description
    };

    election.candidates.push(candidate);
    res.redirect(`/elections/${election.id}`);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
