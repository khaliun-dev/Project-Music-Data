import assert from "node:assert";
import test from "node:test";
import {
  countUsers,
  getMostListenedSong,
  getMostListenedArtist,
  getMostListenedSongOnFridayNight,
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

test("Returns null when user 4 has no listening events on Friday night", () => {
  assert.equal(getMostListenedSongOnFridayNight("4"), null);
});