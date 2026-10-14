import assert from "node:assert";
import test from "node:test";
import {
  countUsers,
  getMostListenedSong,
  getMostListenedArtist,
  getMostListenedSongOnFridayNight,
  getMostListenedSongByTime,
  getMostListenedArtistByTime,
  getMostListenedSongOnFridayNightByTime,
  getLongestSongStreak,
  getSongsListenedEveryDay,
} from "./common.mjs";

test("User count is correct", () => {
  assert.equal(countUsers(), 4);
});

test("Finds the most listened-to song for user 1", () => {
  const result = getMostListenedSong("1");

  assert.equal(result.title, "When Your Mind's Made Up");
  assert.equal(result.artist, "The Swell Season");
  assert.ok(result.listenCount > 0);
});

test("Returns null when a user has no listening events", () => {
  assert.equal(getMostListenedSong("4"), null);
});

test("Finds the most listened-to artist for user 1", () => {
  const result = getMostListenedArtist("1");

  assert.equal(result.artist, "Frank Turner");
  assert.ok(result.listenCount > 0);
});

test("Returns null when a user has no listening events for artist", () => {
  assert.equal(getMostListenedArtist("4"), null);
});

test("Finds the most listened-to song on Friday night for user 1", () => {
  const result = getMostListenedSongOnFridayNight("1");

  assert.equal(result.title, "When Your Mind's Made Up");
  assert.equal(result.artist, "The Swell Season");
  assert.ok(result.listenCount > 0);
});

test("Returns null when user 3 has no Friday-night listens", () => {
  assert.equal(getMostListenedSongOnFridayNight("3"), null);
});

test("Returns null when user 4 has no Friday-night listens", () => {
  assert.equal(getMostListenedSongOnFridayNight("4"), null);
});

test("Finds the song with the most listening time for user 1", () => {
  const result = getMostListenedSongByTime("1");

  assert.equal(result.title, "Insomnia");
  assert.equal(result.artist, "Faithless");
  assert.ok(result.totalListeningSeconds > 0);
});

test("Returns null when user 4 has no song listening time", () => {
  assert.equal(getMostListenedSongByTime("4"), null);
});


test("Finds the artist with the most listening time for user 1", () => {
  const result = getMostListenedArtistByTime("1");

  assert.equal(result.artist, "Frank Turner");
  assert.ok(result.totalListeningSeconds > 0);
});

test("Returns null when user 4 has no artist listening time", () => {
  assert.equal(getMostListenedArtistByTime("4"), null);
});

test("Finds the song with the most listening time on Friday night", () => {
  const result = getMostListenedSongOnFridayNightByTime("1");

  assert.equal(result.title, "When Your Mind's Made Up");
  assert.equal(result.artist, "The Swell Season");
  assert.ok(result.totalListeningSeconds > 0);
});

test("Returns null when user 3 has no Friday-night listening time", () => {
  assert.equal(getMostListenedSongOnFridayNightByTime("3"), null);
});

test("Returns null when user 4 has no Friday-night listening time", () => {
  assert.equal(getMostListenedSongOnFridayNightByTime("4"), null);
});

test("Finds the longest song streak for user 1", () => {
  const result = getLongestSongStreak("1");

  assert.equal(result.title, "I Got Love");
  assert.equal(result.artist, "The King Blues");
  assert.equal(result.streakLength, 34);
});

test("Finds the longest song streak for user 2", () => {
  const result = getLongestSongStreak("2");

  assert.equal(result.title, "I Still Believe");
  assert.equal(result.artist, "Frank Turner");
  assert.equal(result.streakLength, 44);
});

test("Finds a longest song streak of 42 for user 3", () => {
  const result = getLongestSongStreak("3");

  assert.equal(result.streakLength, 42);

  const validWinners = [
    { title: "Tonight We Fly", artist: "The Divine Comedy" },
    { title: "Be More Kind", artist: "Frank Turner" },
  ];

  assert.ok(
    validWinners.some(
      (song) =>
        song.title === result.title &&
        song.artist === result.artist
    )
  );
});

test("Returns null when a user has no listening events for streak", () => {
  assert.equal(getLongestSongStreak("4"), null);
});

test("Finds songs listened to every active day for user 1", () => {
  const result = getSongsListenedEveryDay("1");

  assert.deepEqual(
    result.map((song) => `${song.artist} - ${song.title}`).sort(),
    ["The Swell Season - When Your Mind's Made Up"]
  );
});

test("Finds all songs listened to every active day for user 2", () => {
  const result = getSongsListenedEveryDay("2");

  assert.deepEqual(
    result.map((song) => `${song.artist} - ${song.title}`).sort(),
    [
      "The Divine Comedy - Tonight We Fly",
      "Frank Turner - Photosynthesis",
    ].sort()
  );
});

test("Returns an empty array when no song was played every active day for user 3", () => {
  assert.deepEqual(getSongsListenedEveryDay("3"), []);
});

test("Returns an empty array when user 4 has no listening events", () => {
  assert.deepEqual(getSongsListenedEveryDay("4"), []);
});