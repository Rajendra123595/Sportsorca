async function fetchMatches() {
  const response = await fetch('http://localhost:3000/api/matches');
  const matches = await response.json();
  const tableBody = document.getElementById("match-table-body");

  tableBody.innerHTML = "";

  matches.forEach(match => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${match.date} – ${match.time}</td>
      <td>${match.homeTeam} vs ${match.awayTeam}</td>
      <td>${match.venue}</td>
      <td>${match.winRatio}</td>
    `;
    tableBody.appendChild(row);
  });
}

fetchMatches();
