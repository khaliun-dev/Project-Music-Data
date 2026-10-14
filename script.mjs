import { getUserIDs } from "./data.mjs";

import {
  getMostListenedSong,
  getMostListenedArtist,
  getMostListenedSongOnFridayNight,
  getMostListenedSongByTime,
  getMostListenedArtistByTime,
  getMostListenedSongOnFridayNightByTime,
  getLongestSongStreak,
  getSongsListenedEveryDay,
  getTopGenres,
} from "./common.mjs";


const userNames = {
  "1": "Mum",
  "2": "Dad",
  "3": "Son",
  "4": "Daughter",
};


const userSelect = document.querySelector("#user-select");
const status = document.querySelector("#status");
const resultsList = document.querySelector("#results-list");


const userIDs = getUserIDs();

for (const userID of userIDs) {
  const option = document.createElement("option");

  option.value = userID;
  option.textContent = userNames[userID] ?? `User ${userID}`;

  userSelect.append(option);
}


function formatListenCount(count) {
  return `${count} ${count === 1 ? "listen" : "listens"}`;
}


function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  }

  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} ${seconds === 1 ? "second" : "seconds"}`);
  }

  return parts.join(", ");
}


function addAnswer(question, answer) {
  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const paragraph = document.createElement("p");

  heading.textContent = question;
  paragraph.textContent = answer;

  article.append(heading, paragraph);
  resultsList.append(article);
}


function addListAnswer(question, items) {
  if (items.length === 0) {
    return;
  }

  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const list = document.createElement("ul");

  heading.textContent = question;

  for (const item of items) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.append(listItem);
  }

  article.append(heading, list);
  resultsList.append(article);
}


function displayUserResults(userID) {
  const userName = userNames[userID] ?? `User ${userID}`;


  resultsList.replaceChildren();

 
  const mostListenedSong = getMostListenedSong(userID);

  if (mostListenedSong === null) {
    status.textContent = `${userName} didn't listen to any songs.`;
    return;
  }

  status.textContent = `Showing listening insights for ${userName}.`;


  addAnswer(
    "Most-listened-to song by play count",
    `${mostListenedSong.artist} — ${mostListenedSong.title} (${formatListenCount(mostListenedSong.listenCount)})`
  );

 
  const mostListenedArtist = getMostListenedArtist(userID);

  if (mostListenedArtist !== null) {
    addAnswer(
      "Most-listened-to artist by play count",
      `${mostListenedArtist.artist} (${formatListenCount(mostListenedArtist.listenCount)})`
    );
  }


  const fridayNightSong = getMostListenedSongOnFridayNight(userID);

  if (fridayNightSong !== null) {
    addAnswer(
      "Most-listened-to song on Friday night by play count",
      `${fridayNightSong.artist} — ${fridayNightSong.title} (${formatListenCount(fridayNightSong.listenCount)})`
    );
  }


  const songByTime = getMostListenedSongByTime(userID);

  if (songByTime !== null) {
    addAnswer(
      "Most-listened-to song by listening time",
      `${songByTime.artist} — ${songByTime.title} (${formatDuration(songByTime.totalListeningSeconds)})`
    );
  }


  const artistByTime = getMostListenedArtistByTime(userID);

  if (artistByTime !== null) {
    addAnswer(
      "Most-listened-to artist by listening time",
      `${artistByTime.artist} (${formatDuration(artistByTime.totalListeningSeconds)})`
    );
  }

  
  const fridaySongByTime =
    getMostListenedSongOnFridayNightByTime(userID);

  if (fridaySongByTime !== null) {
    addAnswer(
      "Most-listened-to song on Friday night by listening time",
      `${fridaySongByTime.artist} — ${fridaySongByTime.title} (${formatDuration(fridaySongByTime.totalListeningSeconds)})`
    );
  }

 
  const longestStreak = getLongestSongStreak(userID);

  if (longestStreak !== null) {
    addAnswer(
      "Longest consecutive-song streak",
      `${longestStreak.artist} — ${longestStreak.title} (${longestStreak.streakLength} consecutive listens)`
    );
  }

  
  const everydaySongs = getSongsListenedEveryDay(userID);

  addListAnswer(
    "Songs listened to every day",
    everydaySongs.map((song) => `${song.artist} — ${song.title}`)
  );

  
  const topGenres = getTopGenres(userID);

  if (topGenres.length > 0) {
    const genreHeading =
      topGenres.length === 1
        ? "Top genre"
        : `Top ${topGenres.length} genres`;

    addListAnswer(
      genreHeading,
      topGenres.map(
        (item) => `${item.genre} (${formatListenCount(item.listenCount)})`
      )
    );
  }
}


userSelect.addEventListener("change", () => {
  const selectedUserID = userSelect.value;

  if (selectedUserID === "") {
    resultsList.replaceChildren();
    status.textContent = "Choose a user to view their listening insights.";
    return;
  }

  displayUserResults(selectedUserID);
});