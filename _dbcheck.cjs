const D = require('better-sqlite3');
const db = new D('./data/app.db');
console.log('user_progress:', JSON.stringify(db.prepare('SELECT email,activeJourneyId,currentDay,streakCount,lastSessionDate FROM user_progress').all()));
console.log('completions:', JSON.stringify(db.prepare('SELECT email,journeyId,dayNumber,frequencyId FROM journey_day_completions').all()));
