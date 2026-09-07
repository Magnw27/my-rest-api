export const jokes = [
  { id: 1, type: 'programming', setup: 'Why do developers prefer dark mode?', punchline: 'Because light attracts bugs.' },
  { id: 2, type: 'programming', setup: 'Why did the function break up with the loop?', punchline: 'It felt like it was going in circles.' },
  { id: 3, type: 'general', setup: 'What do you call a sleeping bull?', punchline: 'A bulldozer.' },
  { id: 4, type: 'general', setup: 'Why was the calendar popular?', punchline: 'It had a lot of dates.' },
  { id: 5, type: 'programming', setup: 'What is a programmer’s favorite place?', punchline: 'The cache register.' },
  { id: 6, type: 'general', setup: 'Why did the computer go to the doctor?', punchline: 'It had a virus.' },
  { id: 7, type: 'programming', setup: 'Why was the JavaScript developer sad?', punchline: 'Because they did not know how to console themselves.' },
  { id: 8, type: 'general', setup: 'What has many keys but cannot open a door?', punchline: 'A piano.' }
] as const;

export const quotes = [
  { id: 1, text: 'Small progress is still progress.', author: 'Wick API' },
  { id: 2, text: 'Build it simple, then make it powerful.', author: 'Wick API' },
  { id: 3, text: 'Great software is improved one iteration at a time.', author: 'Wick API' },
  { id: 4, text: 'Consistency beats complexity.', author: 'Wick API' },
  { id: 5, text: 'Learn, ship, measure, improve.', author: 'Wick API' }
] as const;

export const facts = [
  { id: 1, category: 'science', text: 'Water expands when it freezes, making ice less dense than liquid water.' },
  { id: 2, category: 'space', text: 'A day on Venus is longer than a Venusian year.' },
  { id: 3, category: 'nature', text: 'Octopuses have three hearts.' },
  { id: 4, category: 'technology', text: 'The first widely recognized computer mouse prototype was made of wood.' },
  { id: 5, category: 'science', text: 'Light travels through vacuum at about 299,792 kilometers per second.' }
] as const;

export const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#74B9FF', '#A29BFE'
] as const;

export const httpStatus = [
  [200, 'OK'], [201, 'Created'], [204, 'No Content'], [400, 'Bad Request'],
  [401, 'Unauthorized'], [403, 'Forbidden'], [404, 'Not Found'], [429, 'Too Many Requests'], [500, 'Internal Server Error']
] as const;
