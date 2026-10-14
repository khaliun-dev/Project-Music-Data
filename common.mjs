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

export function getMostListenedSongOnFridayNight(userID) {
  const events = getListenEvents(userID);

  const fridayNightEvents = events.filter((event) => {
    const date = new Date(event.timestamp);
    const day = date.getDay();
    const hour = date.getHours();

    return (
      (day === 5 && hour >= 17) ||
      (day === 6 && hour < 4)
    );
  });

  if (fridayNightEvents.length === 0) {
    return null;
  }

  const songCounts = {};

  for (const event of fridayNightEvents) {
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


export function getMostListenedSongByTime(userID) {
  const events = getListenEvents(userID);

  if (events.length === 0) {
    return null;
  }

  const songTimes = {};

  for (const event of events) {
    const songID = event.song_id;
    const song = getSong(songID);

    if (songTimes[songID] === undefined) {
      songTimes[songID] = 0;
    }

    songTimes[songID] =
      songTimes[songID] + song.duration_seconds;
  }

  let mostListenedSongID = null;
  let highestTime = 0;

  for (const [songID, totalSeconds] of Object.entries(songTimes)) {
    if (totalSeconds > highestTime) {
      highestTime = totalSeconds;
      mostListenedSongID = songID;
    }
  }

  return {
    ...getSong(mostListenedSongID),
    totalListeningSeconds: highestTime,
  };
}


export function getMostListenedArtistByTime(userID) {
  const events = getListenEvents(userID);

  if (events.length === 0) {
    return null;
  }

  const artistTimes = {};

  for (const event of events) {
    const songID = event.song_id;
    const song = getSong(songID);
    const artist = song.artist;

    if (artistTimes[artist] === undefined) {
      artistTimes[artist] = 0;
    }

    artistTimes[artist] =
      artistTimes[artist] + song.duration_seconds;
  }

  let mostListenedArtist = null;
  let highestTime = 0;

  for (const [artist, totalSeconds] of Object.entries(artistTimes)) {
    if (totalSeconds > highestTime) {
      highestTime = totalSeconds;
      mostListenedArtist = artist;
    }
  }

  return {
    artist: mostListenedArtist,
    totalListeningSeconds: highestTime,
  };
}

export function getMostListenedSongOnFridayNightByTime(userID) {
  const events = getListenEvents(userID);

  const fridayNightEvents = events.filter((event) => {
    const date = new Date(event.timestamp);
    const day = date.getDay();
    const hour = date.getHours();

    return (
      (day === 5 && hour >= 17) ||
      (day === 6 && hour < 4)
    );
  });

  if (fridayNightEvents.length === 0) {
    return null;
  }

  const songTimes = {};

  for (const event of fridayNightEvents) {
    const songID = event.song_id;
    const song = getSong(songID);

    if (songTimes[songID] === undefined) {
      songTimes[songID] = 0;
    }

    songTimes[songID] =
      songTimes[songID] + song.duration_seconds;
  }

  let mostListenedSongID = null;
  let highestTime = 0;

  for (const [songID, totalSeconds] of Object.entries(songTimes)) {
    if (totalSeconds > highestTime) {
      highestTime = totalSeconds;
      mostListenedSongID = songID;
    }
  }

  return {
    ...getSong(mostListenedSongID),
    totalListeningSeconds: highestTime,
  };
}

export function getLongestSongStreak(userID) {
  const events = getListenEvents(userID);

  if (events.length === 0) {
    return null;
  }

  let currentSongID = null;
  let currentStreak = 0;
  let longestSongID = null;
  let longestStreak = 0;

  for (const event of events) {
    const songID = event.song_id;

    if (songID === currentSongID) {
      currentStreak = currentStreak + 1;
    } else {
      currentSongID = songID;
      currentStreak = 1;
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
      longestSongID = currentSongID;
    }
  }

  return {
    ...getSong(longestSongID),
    streakLength: longestStreak,
  };
}

export function getSongsListenedEveryDay(userID) {
  const events = getListenEvents(userID);

  if (events.length === 0) {
    return [];
  }

  const listeningDays = new Set();
  const songDays = {};

  for (const event of events) {
    const songID = event.song_id;
    const day = event.timestamp.slice(0, 10);

    listeningDays.add(day);

    if (songDays[songID] === undefined) {
      songDays[songID] = new Set();
    }

    songDays[songID].add(day);
  }

  const songsListenedEveryDay = [];

  for (const [songID, days] of Object.entries(songDays)) {
    if (days.size === listeningDays.size) {
      songsListenedEveryDay.push(getSong(songID));
    }
  }

  return songsListenedEveryDay;
}