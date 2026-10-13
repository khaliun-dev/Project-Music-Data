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
