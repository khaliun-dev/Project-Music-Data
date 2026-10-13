import { getUserIDs, getListenEvents, getSong } from "./data.mjs";

export const countUsers = () => getUserIDs().length;

export function getMostListenedSong(userID) {
  const events = getListenEvents(userID);

  if (events.length === 0) {
    return null;
  }

  const songCounts = {};

  for (const event of events) {
    const songID = event.song_id;

    if (songCounts[songID] === undefined) {
      songCounts[songID] = 0;
    }

    songCounts[songID] = songCounts[songID] + 1;
  }

  let mostListenedSongID = null;
  let highestCount = 0;

  for (const [songID, count] of Object.entries(songCounts)) {
    if (count > highestCount) {
      highestCount = count;
      mostListenedSongID = songID;
    }
  }

  return {
    ...getSong(mostListenedSongID),
    listenCount: highestCount,
  };
}

export function getMostListenedArtist(userID) {
  const events = getListenEvents(userID);

  if (events.length === 0) {
    return null;
  }

  const artistCounts = {};

  for (const event of events) {
    const songID = event.song_id;
    const song = getSong(songID);
    const artist = song.artist;

    if (artistCounts[artist] === undefined) {
      artistCounts[artist] = 0;
    }

    artistCounts[artist] = artistCounts[artist] + 1;
  }

  let mostListenedArtist = null;
  let highestCount = 0;

  for (const [artist, count] of Object.entries(artistCounts)) {
    if (count > highestCount) {
      highestCount = count;
      mostListenedArtist = artist;
    }
  }

  return {
    artist: mostListenedArtist,
    listenCount: highestCount,
  };
}