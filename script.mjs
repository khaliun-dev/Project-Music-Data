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

// Find the elements in our HTML.
const userSelect = document.querySelector("#user-select");
const status = document.querySelector("#status");
const resultsList = document.querySelector("#results-list");

// Get the available users and add them to the dropdown.
const userIDs = getUserIDs();

for (const userID of userIDs) {
  const option = document.createElement("option");

  option.value = userID;
  option.textContent = `User ${userID}`;

  userSelect.append(option);
}

// Convert a number of listens into readable text.
function formatListenCount(count) {
  return `${count} ${count === 1 ? "listen" : "listens"}`;
}

// Convert total seconds into readable hours, minutes and seconds.
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

// Add a question and its answer to the webpage.
function addAnswer(question, answer) {
  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const paragraph = document.createElement("p");

  heading.textContent = question;
  paragraph.textContent = answer;

  article.append(heading, paragraph);
  resultsList.append(article);
}

// Add a question with a list of answers.
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

// Calculate and display the answers for one user.
function displayUserResults(userID) {
  // Remove the previous user's answers.
  resultsList.replaceChildren();

  // Check whether this user has any listening history.
  const mostListenedSong = getMostListenedSong(userID);

  if (mostListenedSong === null) {
    status.textContent = `User ${userID} didn't listen to any songs.`;
    return;
  }

  status.textContent = `Showing listening insights for User ${userID}.`;

  // 1. Most-listened-to song by play count.
  addAnswer(
    "Most-listened-to song by play count",
    `${mostListenedSong.artist} — ${mostListenedSong.title} (${formatListenCount(mostListenedSong.listenCount)})`
  );

  // 2. Most-listened-to artist by play count.
  const mostListenedArtist = getMostListenedArtist(userID);

  if (mostListenedArtist !== null) {
    addAnswer(
      "Most-listened-to artist by play count",
      `${mostListenedArtist.artist} (${formatListenCount(mostListenedArtist.listenCount)})`
    );
  }

  // 3. Most-listened-to song on Friday night by play count.
  const fridayNightSong = getMostListenedSongOnFridayNight(userID);

  if (fridayNightSong !== null) {
    addAnswer(
      "Most-listened-to song on Friday night by play count",
      `${fridayNightSong.artist} — ${fridayNightSong.title} (${formatListenCount(fridayNightSong.listenCount)})`
    );
  }

  // 4a. Most-listened-to song by total listening time.
  const songByTime = getMostListenedSongByTime(userID);

  if (songByTime !== null) {
    addAnswer(
      "Most-listened-to song by listening time",
      `${songByTime.artist} — ${songByTime.title} (${formatDuration(songByTime.totalListeningSeconds)})`
    );
  }

  // 4b. Most-listened-to artist by total listening time.
  const artistByTime = getMostListenedArtistByTime(userID);

  if (artistByTime !== null) {
    addAnswer(
      "Most-listened-to artist by listening time",
      `${artistByTime.artist} (${formatDuration(artistByTime.totalListeningSeconds)})`
    );
  }

  // 4c. Most-listened-to Friday-night song by listening time.
  const fridaySongByTime =
    getMostListenedSongOnFridayNightByTime(userID);

  if (fridaySongByTime !== null) {
    addAnswer(
      "Most-listened-to song on Friday night by listening time",
      `${fridaySongByTime.artist} — ${fridaySongByTime.title} (${formatDuration(fridaySongByTime.totalListeningSeconds)})`
    );
  }

  // 5. Longest consecutive-song streak.
  const longestStreak = getLongestSongStreak(userID);

  if (longestStreak !== null) {
    addAnswer(
      "Longest consecutive-song streak",
      `${longestStreak.artist} — ${longestStreak.title} (${longestStreak.streakLength} consecutive listens)`
    );
  }

  // 6. Songs listened to on every active day.
  const everydaySongs = getSongsListenedEveryDay(userID);

  addListAnswer(
    "Songs listened to every day",
    everydaySongs.map((song) => `${song.artist} — ${song.title}`)
  );

  // 7. Top genres by play count.
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

// Update the answers whenever the dropdown changes.
userSelect.addEventListener("change", () => {
  const selectedUserID = userSelect.value;

  if (selectedUserID === "") {
    resultsList.replaceChildren();
    status.textContent = "Choose a user to view their listening insights.";
    return;
  }

  displayUserResults(selectedUserID);
});

// Show User 1 by default.
if (userIDs.length > 0) {
  userSelect.value = userIDs[0];
  displayUserResults(userIDs[0]);
}