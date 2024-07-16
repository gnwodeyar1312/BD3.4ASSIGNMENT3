const express = require("express");
const app = express();
const port = 3000;

let cors = require("cors");
app.use(cors());

let activities = [
  { activityId: 1, type: "Running", duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: "Swimming", duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: "Cycling", duration: 60, caloriesBurned: 500 },
];

app.get("/", (req, res) => {
  res.send("Welcome to Fitness Tracker");
});

//Endpoint 1: Add an Activity
function addToActivities(activity, activityId, type, duration, caloriesBurned) {
  activity.push({ activityId, type, duration, caloriesBurned });
  return activity;
}

app.get("/activities/add", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);

  let result = addToActivities(
    activities,
    activityId,
    type,
    duration,
    caloriesBurned,
  );
  res.json({ activities: result });
});

//Endpoint 2: Sort Activities by Duration
function sortActivitiesInAscending(activity1, activity2) {
  return activity1.duration - activity2.duration;
}

app.get("/activities/sort-by-duration", (req, res) => {
  let activitesCopy = activities.slice();
  let result = activitesCopy.sort(sortActivitiesInAscending);

  res.json({ activities: result });
});

//Endpoint 3: Filter Activities by Type
function filterActivityByType(activity, type) {
  return activity.type === type;
}

app.get("/activities/filter-by-type", (req, res) => {
  let type = req.query.type;
  let result = activities.filter((activity) =>
    filterActivityByType(activity, type),
  );

  res.json({ activities: result });
});

//Endpoint 4: Calculate Total Calories Burned
function totalCaloriesBurned(activity) {
  let totalSum = 0
  for(let i = 0; i < activity.length ;i++) {
    totalSum = totalSum + activity[i].caloriesBurned
  }
  return totalSum
}

app.get('/activities/total-calories', (req, res) => {
  let result = totalCaloriesBurned(activities)
  res.json({totalCaloriesBurned : result})
});

//Endpoint 5: Update Activity Duration by ID
function updteDurationByItId(activity, duration, activityId) {
  for(let i = 0; i < activity.length; i++) {
    if(activity[i].activityId === activityId) {
      activity[i].duration = duration
    }
  }
  return activity
}
app.get('/activities/update-duration', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  let result = updteDurationByItId(activities, duration, activityId);

  res.json({ activities : result })
});

//Endpoint 6: Delete Activity by ID
function deleteActivityById(activity, activityId) {
  return activity.activityId !== activityId
}
app.get('/activities/delete', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let result = activities.filter(activity => deleteActivityById(activity, activityId));

  res.json({ activities: result})
});

//Endpoint 7: Delete Activities by Type
function deleteActivityByType(activity, type) {
  return activity.type !== type
}
app.get('/activities/delete-by-type', (req, res) => {
  let type = req.query.type;
  let result = activities.filter(activity => deleteActivityByType(activity, type));

  res.json({ activities: result})
});



app.listen(port, () => {
  console.log("Server is running on port https://localhost:" + port);
});
