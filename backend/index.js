const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const port = 3004;
const cors = require('cors');

const client = new MongoClient('mongodb://localhost:27017');

let db = null;

client.connect((err, client) => {
  if (err) console.error(err);
  db = client.db('devcon_2019');
});

const dataWrapper = (req, res, next) => {
  return next();
};

app.use(cors());

app.get('/genders', async (req, res, next) => {
  try {
    const result = await db
    .collection('conversationprofiles')
    .aggregate([
      {
        $match: {
          projectId: "bd363baf-fcdd-4928-a287-982c1c78dd93",
        }
      },
      {
        $project: {
          _id: '$_id',
          gender: '$customerInfo.gender',
        },
      },
      {
        $group: {
          _id: null,
          male: {
            $sum: {
              $toInt: {
                $eq: ['$gender', 'female'],
              }
            }
          },
          female: {
            $sum: {
              $toInt: {
                $eq: ['$gender', 'female'],
              }
            }
          },
          others: {
            $sum: {
              $toInt: {
                $and: [
                  { $ne: ["$gender", "male"] },
                  { $ne: ["$gender", "female"] },
                ]
              }
            }
          }
        }
      },
    ], { allowDiskUse: true })
    .toArray();

    return res.json(result[0]);
  } catch (err) {
    console.error(err);
  }
  return next();
});

app.get('/languages', async (req, res, next) => {
  try {
    const result = await db
      .collection('conversationprofiles')
      .aggregate([
        {
          $project: {
            _id: '$_id',
            language: '$language',
          }
        },
        {
          $group: {
            _id: '$language',
            count: { $sum: 1 },
          }
        },
        {
          $project: {
            _id: 0,
            language: '$_id',
            count: '$count'
          }
        }], { allowDiskUse: true })
      .toArray();
      return res.json(result);
  } catch (err) {
    console.error(err);
  }
});

// 404
app.use((req, res, next) => {
  res.status(404).send("404 - Not Found");
});

app.listen(port, () => console.log('Running on port', port));
