const _ = require('lodash');
const Poll = require('../models/pollModel');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of polls
exports.index = (req, res) => {
  Poll.find((err, polls) => {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json({
      status: 'success',
      results: polls.length,
      data: {
        polls
      }
    });
  });
};

// Get a single poll
exports.show = (req, res) => {
  Poll.findById(req.params.id, (err, poll) => {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    return res.json(poll);
  });
};

// Get polls by username
exports.find = (req, res) => {
  Poll.find(
    {
      author: req.params.name
    },
    (err, polls) => {
      if (err) {
        return handleError(res, err);
      }
      return res.json({
        status: 'success',
        results: polls.length,
        author: req.params.name,
        data: {
          polls
        }
      });
    }
  );
};

// Creates a new poll in the DB.
exports.create = (req, res) => {
  const poll = req.body;
  poll.votes = [];
  console.log(req.body);
  poll.options.forEach(() => {
    // Add a vote initialized to 1 for each option
    poll.votes.push(1);
  });

  Poll.create(poll, (err, poll) => {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(poll);
  });
};

// Increment the vote number of an option of a poll
// Returns a 403 if the user already voted
exports.addVote = (req, res) => {
  const { id } = req.params;
  const optionIndex = req.params.option;
  const username = req.user.name;

  Poll.findById(id, (err, poll) => {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    if (poll.users_voted.indexOf(username) !== -1) {
      return res.status(403).send('User already cast vote');
    }
    poll.users_voted.push(username);
    poll.votes[optionIndex] = poll.votes[optionIndex] + 1;
    poll.markModified('votes');
    poll.save((err, newPoll) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(newPoll);
    });
  });
};

// Updates an existing poll in the DB.
exports.update = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }
  Poll.findById(req.params.id, (err, poll) => {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    const updated = _.extend(poll, req.body);
    updated.save(err => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = (req, res) => {
  Poll.findById(req.params.id, (err, poll) => {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    poll.remove(err => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};
